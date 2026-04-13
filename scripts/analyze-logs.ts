import {
  createReadStream,
  existsSync,
  readFileSync,
  writeFileSync,
} from 'node:fs';
import { createInterface } from 'node:readline';
import { createGunzip } from 'node:zlib';
import { basename, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { glob } from 'glob';

const PROJECT_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const LOGS_DIR = process.env.LOGS_DIR ?? resolve(PROJECT_ROOT, 'logs');
const TRAFFIC_PATH = `${LOGS_DIR}/traffic.json`;

// --- Config ---

const CANONICAL_HOSTS = [
  'mreis.me',
  'octahedron.world',
  'beta.soundsvegan.com',
  'soundsvegan.com',
];

const ASSET_PATH_GLOBS = ['/_next/**', '/favicon.ico', '/robots.txt'];

const BOT_PATH_GLOBS = ['**/*.php', '**/wp-*', '/cgi-bin/**', '/xmlrpc'];

// --- Types ---

type StatusCounts = Record<string, number>;
type PathCounts = Record<string, StatusCounts>;

interface HostData {
  assets: StatusCounts;
  other: StatusCounts;
  [path: string]: StatusCounts | PathCounts;
}

interface DayData {
  other: StatusCounts;
  [host: string]: StatusCounts | HostData;
}

interface TrafficData {
  aggregations: Record<string, DayData>;
  parsedDocuments: string[];
}

interface LogLine {
  RequestHost?: string;
  RequestMethod?: string;
  RequestPath?: string;
  DownstreamStatus?: number;
  StartLocal?: string;
}

// --- Helpers ---

function canonicalName(filePath: string): string {
  return basename(filePath).replace(/\.gz$/, '');
}

function extractDay(isoTimestamp: string): string {
  const d = new Date(isoTimestamp);
  return d.toLocaleDateString('en-CA', { timeZone: 'Europe/Berlin' });
}

function isAssetPath(reqPath: string): boolean {
  return ASSET_PATH_GLOBS.some((pattern) => {
    if (pattern.endsWith('/**')) {
      const prefix = pattern.slice(0, -3);
      return reqPath === prefix || reqPath.startsWith(`${prefix}/`);
    }
    return reqPath === pattern;
  });
}

function isBotPath(reqPath: string): boolean {
  // Strip query string and normalize case for matching
  const normalized = reqPath.split('?')[0].toLowerCase();

  return BOT_PATH_GLOBS.some((pattern) => {
    if (pattern.startsWith('**/')) {
      const tail = pattern.slice(3).toLowerCase();
      if (tail.startsWith('*.')) {
        // **/*.ext → path contains .ext anywhere (catches .php, .php7, etc.)
        return normalized.includes(tail.slice(1));
      }
      // **/segment* → path contains /segment anywhere
      const segPrefix = tail.replace(/\*.*$/, '');
      return normalized.includes(`/${segPrefix}`);
    }
    if (pattern.endsWith('/**')) {
      const prefix = pattern.slice(0, -3).toLowerCase();
      return normalized === prefix || normalized.startsWith(`${prefix}/`);
    }
    // Literal prefix: /foo matches /foo, /foo/, /foo.ext, /foo?query
    const p = pattern.toLowerCase();
    return (
      normalized === p ||
      normalized.startsWith(`${p}/`) ||
      normalized.startsWith(`${p}.`) ||
      normalized.startsWith(`${p}?`)
    );
  });
}

function ensureDay(
  aggregations: Record<string, DayData>,
  day: string
): DayData {
  if (!aggregations[day]) {
    aggregations[day] = { other: {} };
  }
  return aggregations[day];
}

function ensureHost(dayData: DayData, host: string): HostData {
  if (!dayData[host]) {
    dayData[host] = { assets: {}, other: {} };
  }
  return dayData[host] as HostData;
}

function incStatus(bucket: StatusCounts, status: string): void {
  bucket[status] = (bucket[status] ?? 0) + 1;
}

function incPath(bucket: PathCounts, path: string, status: string): void {
  if (!bucket[path]) bucket[path] = {};
  incStatus(bucket[path], status);
}

// --- File parsing ---

async function parseFile(
  filePath: string,
  aggregations: Record<string, DayData>
): Promise<void> {
  const fileStream = createReadStream(filePath);
  const input = filePath.endsWith('.gz')
    ? fileStream.pipe(createGunzip())
    : fileStream;
  const rl = createInterface({ input, crlfDelay: Infinity });

  let lineNum = 0;
  let skipped = 0;

  for await (const line of rl) {
    lineNum++;
    const trimmed = line.trim();
    if (!trimmed) continue;

    let parsed: LogLine;
    try {
      parsed = JSON.parse(trimmed) as LogLine;
    } catch {
      skipped++;
      console.warn(
        `[LOG] Malformed line ${lineNum} in ${basename(filePath)}, skipping`
      );
      continue;
    }

    const host = parsed.RequestHost ?? '';
    const reqPath = parsed.RequestPath ?? '';
    const status = String(parsed.DownstreamStatus ?? 0);
    const timestamp = parsed.StartLocal ?? '';

    if (!host || !timestamp) continue;

    const day = extractDay(timestamp);
    const dayData = ensureDay(aggregations, day);

    if (!CANONICAL_HOSTS.includes(host)) {
      incStatus(dayData.other as StatusCounts, status);
    } else {
      const hostData = ensureHost(dayData, host);
      if (isAssetPath(reqPath)) {
        incStatus(hostData.assets, status);
      } else if (isBotPath(reqPath)) {
        incStatus(hostData.other, status);
      } else {
        incPath(hostData as PathCounts, reqPath, status);
      }
    }
  }

  if (skipped > 0) {
    console.log(
      `[LOG] ${basename(filePath)}: ${lineNum} lines, ${skipped} skipped`
    );
  } else {
    console.log(`[LOG] ${basename(filePath)}: ${lineNum} lines parsed`);
  }
}

// --- Main ---

async function run(): Promise<void> {
  let existing: TrafficData = { aggregations: {}, parsedDocuments: [] };
  if (existsSync(TRAFFIC_PATH)) {
    existing = JSON.parse(readFileSync(TRAFFIC_PATH, 'utf-8')) as TrafficData;
    console.log(
      `[LOG] Loaded existing traffic.json (${existing.parsedDocuments.length} docs already parsed)`
    );
  }

  const aggregations = existing.aggregations;
  const parsedDocuments = new Set<string>(existing.parsedDocuments);

  const files = await glob(`${LOGS_DIR}/*.log*`);
  const newFiles = files.filter((f) => !parsedDocuments.has(canonicalName(f)));

  if (newFiles.length === 0) {
    console.log('[LOG] No new files to parse.');
    return;
  }

  console.log(`[LOG] Found ${newFiles.length} new file(s) to parse`);

  for (const file of newFiles) {
    await parseFile(file, aggregations);
    parsedDocuments.add(canonicalName(file));
  }

  const output: TrafficData = {
    aggregations,
    parsedDocuments: Array.from(parsedDocuments),
  };

  writeFileSync(TRAFFIC_PATH, JSON.stringify(output, null, 2));
  const dayCount = Object.keys(aggregations).length;
  console.log(`[LOG] Written to ${TRAFFIC_PATH} (${dayCount} day(s))`);
}

run().catch((err) => {
  console.error('[LOG] Error:', err);
  process.exit(1);
});
