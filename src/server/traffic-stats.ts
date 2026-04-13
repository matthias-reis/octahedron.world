import { existsSync, readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

// --- Types ---

export type StatusCounts = Record<string, number>;
export type PathCounts = Record<string, StatusCounts>;

export interface HostData {
  assets: StatusCounts;
  other: StatusCounts;
  [path: string]: StatusCounts;
}

export interface DayData {
  other: StatusCounts;
  [host: string]: StatusCounts | HostData;
}

export interface TrafficData {
  aggregations: Record<string, DayData>;
  parsedDocuments: string[];
}

export interface TrafficResponse {
  type: 'day' | 'week' | 'quarter' | 'all';
  firstDate: string;
  aggregations: Record<string, DayData>;
}

// --- Data loader ---

const PROJECT_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
const TRAFFIC_PATH =
  process.env.LOGS_DIR != null
    ? resolve(process.env.LOGS_DIR, 'traffic.json')
    : resolve(PROJECT_ROOT, 'logs/traffic.json');

export function loadTrafficData(): TrafficData {
  if (!existsSync(TRAFFIC_PATH)) {
    console.error(
      `[loadTrafficData] Traffic data not available at ${TRAFFIC_PATH}`
    );
    throw new Response(`Traffic data not available`, {
      status: 501,
    });
  }
  return JSON.parse(readFileSync(TRAFFIC_PATH, 'utf-8')) as TrafficData;
}

export function getFirstDate(aggregations: Record<string, DayData>): string {
  return Object.keys(aggregations).sort()[0] ?? '';
}

// --- Calendar helpers ---

export function getISOWeek(date: Date): { year: number; week: number } {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  // Thursday in current week decides the year
  d.setDate(d.getDate() + 3 - ((d.getDay() + 6) % 7));
  const year = d.getFullYear();
  const jan4 = new Date(year, 0, 4);
  const startOfWeek1 = new Date(jan4);
  startOfWeek1.setDate(jan4.getDate() - ((jan4.getDay() + 6) % 7));
  const week =
    Math.round((d.getTime() - startOfWeek1.getTime()) / 604800000) + 1;
  return { year, week };
}

export function getDatesInISOWeek(year: number, week: number): string[] {
  // Monday of week 1
  const jan4 = new Date(year, 0, 4);
  const monday = new Date(jan4);
  monday.setDate(jan4.getDate() - ((jan4.getDay() + 6) % 7) + (week - 1) * 7);

  const dates: string[] = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    dates.push(d.toLocaleDateString('en-CA'));
  }
  return dates;
}

export function weeksInYear(year: number): number {
  // Dec 28 is always in the last ISO week of the year
  const dec28 = new Date(year, 11, 28);
  return getISOWeek(dec28).week;
}

export function getWeeksInQuarter(year: number, quarter: number): number[] {
  const starts = [1, 14, 27, 40];
  const start = starts[quarter - 1];
  const end = quarter === 4 ? weeksInYear(year) : starts[quarter] - 1;
  const weeks: number[] = [];
  for (let w = start; w <= end; w++) weeks.push(w);
  return weeks;
}

// --- Merge helpers ---

export function mergeStatusCounts(
  a: StatusCounts,
  b: StatusCounts
): StatusCounts {
  const result: StatusCounts = { ...a };
  for (const [k, v] of Object.entries(b)) {
    result[k] = (result[k] ?? 0) + v;
  }
  return result;
}

export function mergeDayData(days: DayData[]): DayData {
  const result: DayData = { other: {} };

  for (const day of days) {
    result.other = mergeStatusCounts(
      result.other as StatusCounts,
      day.other as StatusCounts
    );

    for (const [key, value] of Object.entries(day)) {
      if (key === 'other') continue;

      const hostData = value as HostData;
      if (!result[key]) {
        result[key] = { assets: {}, other: {} } as HostData;
      }
      const rHost = result[key] as HostData;

      rHost.assets = mergeStatusCounts(rHost.assets, hostData.assets);
      rHost.other = mergeStatusCounts(rHost.other, hostData.other ?? {});

      for (const [path, pathCounts] of Object.entries(hostData)) {
        if (path === 'assets') continue;
        if (path === 'other') continue;
        rHost[path] = mergeStatusCounts(
          (rHost[path] as StatusCounts) ?? {},
          pathCounts as StatusCounts
        );
      }
    }
  }

  return result;
}

export function averageDayData(data: DayData, divisor: number): DayData {
  const avg = (counts: StatusCounts): StatusCounts => {
    const result: StatusCounts = {};
    for (const [k, v] of Object.entries(counts)) {
      result[k] = v / divisor;
    }
    return result;
  };

  const result: DayData = { other: avg(data.other as StatusCounts) };

  for (const [key, value] of Object.entries(data)) {
    if (key === 'other') continue;
    const hostData = value as HostData;
    const avgHost: HostData = {
      assets: avg(hostData.assets),
      other: avg(hostData.other ?? {}),
    };
    for (const [path, pathCounts] of Object.entries(hostData)) {
      if (path === 'assets') continue;
      if (path === 'other') continue;
      avgHost[path] = avg(pathCounts as StatusCounts);
    }
    result[key] = avgHost;
  }

  return result;
}
