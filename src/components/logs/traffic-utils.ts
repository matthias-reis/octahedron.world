import type { DayData, HostData, StatusCounts, TrafficResponse } from '~/server/traffic-stats';

export type { TrafficResponse };

export interface ParsedFilter {
  domain: string;
  path: string;
}

export interface TrafficListItem {
  key: string;
  label: string;
  href: string;
  value200: number;
  integer?: boolean;
  otherCodes?: Record<string, number>;
}

export interface TrafficInfoRow {
  label: string;
  total: number;
}

export interface TrafficPageData {
  viewLabel: string;
  filterLabel: string;
  kpi: number;
  items: TrafficListItem[];
  maxValue: number;
  non200: Record<string, number>;
  maxNon200: number;
  infoRows: TrafficInfoRow[];
  allQuarters: string[];
  allWeeks: string[];
  allDomains: string[];
}

// --- Filter ---

export function parseFilter(f: string): ParsedFilter {
  if (!f) return { domain: '', path: '' };
  const slashIdx = f.indexOf('/');
  if (slashIdx === -1) return { domain: f, path: '' };
  return { domain: f.slice(0, slashIdx), path: f.slice(slashIdx) };
}

export function buildFilterParam(domain: string, path: string): string {
  if (!domain) return '';
  if (!path) return domain;
  const p = path.startsWith('/') ? path : `/${path}`;
  return `${domain}${p}`;
}

export function withFilter(url: string, filter: ParsedFilter): string {
  const f = buildFilterParam(filter.domain, filter.path);
  return f ? `${url}?f=${encodeURIComponent(f)}` : url;
}

// --- Calendar helpers (client-safe) ---

export function getISOWeekClient(dateStr: string): { year: number; week: number } {
  const d = new Date(`${dateStr}T00:00:00`);
  d.setDate(d.getDate() + 3 - ((d.getDay() + 6) % 7));
  const year = d.getFullYear();
  const jan4 = new Date(year, 0, 4);
  const startOfWeek1 = new Date(jan4);
  startOfWeek1.setDate(jan4.getDate() - ((jan4.getDay() + 6) % 7));
  const week = Math.round((d.getTime() - startOfWeek1.getTime()) / 604800000) + 1;
  return { year, week };
}

export function weekToQuarter(week: number): number {
  if (week <= 13) return 1;
  if (week <= 26) return 2;
  if (week <= 39) return 3;
  return 4;
}

function weeksInYearClient(year: number): number {
  const dec28 = new Date(year, 11, 28);
  const str = dec28.toLocaleDateString('en-CA');
  return getISOWeekClient(str).week;
}

function todayStr(): string {
  return new Date().toLocaleDateString('en-CA');
}

export function generateQuarterRange(firstDate: string): string[] {
  const { year: sy, week: sw } = getISOWeekClient(firstDate);
  const { year: ey, week: ew } = getISOWeekClient(todayStr());
  const eq = weekToQuarter(ew);

  const result: string[] = [];
  let year = sy;
  let q = weekToQuarter(sw);

  while (year < ey || (year === ey && q <= eq)) {
    result.push(`${year}-${q}`);
    q++;
    if (q > 4) { q = 1; year++; }
  }
  return result;
}

export function generateWeekRange(firstDate: string): string[] {
  const { year: sy, week: sw } = getISOWeekClient(firstDate);
  const { year: ey, week: ew } = getISOWeekClient(todayStr());

  const result: string[] = [];
  let year = sy;
  let week = sw;

  while (year < ey || (year === ey && week <= ew)) {
    result.push(`${year}-${String(week).padStart(2, '0')}`);
    week++;
    if (week > weeksInYearClient(year)) { week = 1; year++; }
  }
  return result;
}

// --- Data helpers ---

export function getAllDomains(aggregations: Record<string, DayData>): string[] {
  const domains = new Set<string>();
  for (const dayData of Object.values(aggregations)) {
    for (const key of Object.keys(dayData)) {
      if (key !== 'other') domains.add(key);
    }
  }
  return [...domains].sort();
}

export function sum200(dayData: DayData, filter: ParsedFilter): number {
  let total = 0;
  for (const [host, hostValueRaw] of Object.entries(dayData)) {
    if (host === 'other') continue;
    if (filter.domain && host !== filter.domain) continue;
    const hostData = hostValueRaw as HostData;
    for (const [path, pathCountsRaw] of Object.entries(hostData)) {
      if (path === 'assets') continue;
      if (path === 'other') continue;
      if (filter.path && !path.startsWith(filter.path)) continue;
      total += (pathCountsRaw as StatusCounts)['200'] ?? 0;
    }
  }
  return total;
}

function sumNon200(dayData: DayData, filter: ParsedFilter): Record<string, number> {
  const result: Record<string, number> = {};
  for (const [host, hostValueRaw] of Object.entries(dayData)) {
    if (host === 'other') continue;
    if (filter.domain && host !== filter.domain) continue;
    const hostData = hostValueRaw as HostData;
    for (const [path, pathCountsRaw] of Object.entries(hostData)) {
      if (path === 'assets') continue;
      if (path === 'other') continue;
      if (filter.path && !path.startsWith(filter.path)) continue;
      const counts = pathCountsRaw as StatusCounts;
      for (const [code, n] of Object.entries(counts)) {
        if (code === '200') continue;
        result[code] = (result[code] ?? 0) + n;
      }
    }
  }
  return result;
}

function mergeStatusSums(
  a: Record<string, number>,
  b: Record<string, number>,
): Record<string, number> {
  const result = { ...a };
  for (const [k, v] of Object.entries(b)) {
    result[k] = (result[k] ?? 0) + v;
  }
  return result;
}

export function computeKpi(response: TrafficResponse, filter: ParsedFilter): number {
  const entries = Object.values(response.aggregations);
  if (entries.length === 0) return 0;
  const total200 = entries.reduce((sum, day) => sum + sum200(day, filter), 0);
  let effectiveDays: number;
  switch (response.type) {
    case 'day': effectiveDays = 1; break;
    case 'week': effectiveDays = entries.length; break;
    case 'quarter': case 'all': effectiveDays = entries.length * 7; break;
  }
  return total200 / effectiveDays;
}

export function formatGerman(n: number): string {
  return n.toLocaleString('de-DE', {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });
}

export function formatInt(n: number): string {
  return Math.round(n).toLocaleString('de-DE');
}

// --- List item builders ---

function buildAllItems(
  aggregations: Record<string, DayData>,
  filter: ParsedFilter,
): TrafficListItem[] {
  return Object.keys(aggregations)
    .sort()
    .map((key) => {
      const param = key.replace(/^q/, ''); // "q2026-1" → "2026-1"
      return {
        key,
        label: param,
        href: withFilter(`/logs/quarter/${param}`, filter),
        value200: sum200(aggregations[key], filter) / 7,
      };
    });
}

function buildQuarterItems(
  aggregations: Record<string, DayData>,
  filter: ParsedFilter,
): TrafficListItem[] {
  return Object.keys(aggregations)
    .sort()
    .map((key) => {
      const param = key.replace(/^w/, ''); // "w2026-01" → "2026-01"
      return {
        key,
        label: param,
        href: withFilter(`/logs/week/${param}`, filter),
        value200: sum200(aggregations[key], filter) / 7,
      };
    });
}

function buildWeekItems(
  aggregations: Record<string, DayData>,
  filter: ParsedFilter,
): { items: TrafficListItem[]; non200: Record<string, number> } {
  let non200: Record<string, number> = {};
  const items = Object.keys(aggregations)
    .sort()
    .map((key) => {
      non200 = mergeStatusSums(non200, sumNon200(aggregations[key], filter));
      return {
        key,
        label: key,
        href: withFilter(`/logs/day/${key}`, filter),
        value200: sum200(aggregations[key], filter),
      };
    });
  return { items, non200 };
}

function buildDayItems(
  aggregations: Record<string, DayData>,
  filter: ParsedFilter,
  currentPath: string,
): { items: TrafficListItem[]; non200: Record<string, number>; infoRows: TrafficInfoRow[] } {
  const items: TrafficListItem[] = [];
  let non200: Record<string, number> = {};

  for (const dayData of Object.values(aggregations)) {
    for (const [host, hostValueRaw] of Object.entries(dayData)) {
      if (host === 'other') continue;
      if (filter.domain && host !== filter.domain) continue;
      const hostData = hostValueRaw as HostData;

      for (const [path, pathCountsRaw] of Object.entries(hostData)) {
        if (path === 'assets') continue;
        if (path === 'other') continue;
        if (filter.path && !path.startsWith(filter.path)) continue;

        const counts = pathCountsRaw as StatusCounts;
        const count200 = counts['200'] ?? 0;
        const label = `${host}${path}`;
        const otherCodes: Record<string, number> = {};

        for (const [code, n] of Object.entries(counts)) {
          if (code === '200') continue;
          otherCodes[code] = (otherCodes[code] ?? 0) + n;
          non200[code] = (non200[code] ?? 0) + n;
        }

        items.push({
          key: label,
          label,
          href: `${currentPath}?f=${encodeURIComponent(label)}`,
          value200: count200,
          otherCodes,
        });
      }
    }
  }

  items.sort((a, b) => b.value200 - a.value200);

  // Normalize otherCodes: every item gets the full set of codes (0 if absent)
  const allCodes = Object.keys(non200).sort();
  for (const item of items) {
    const normalized: Record<string, number> = {};
    for (const code of allCodes) {
      normalized[code] = item.otherCodes?.[code] ?? 0;
    }
    item.otherCodes = normalized;
    item.integer = true;
  }

  // Informational totals for assets + other (only when no filter active)
  const infoRows: TrafficInfoRow[] = [];
  if (!filter.domain && !filter.path) {
    let assetsTotal = 0;
    let otherTotal = 0;
    for (const dayData of Object.values(aggregations)) {
      for (const n of Object.values(dayData.other as StatusCounts)) {
        otherTotal += n;
      }
      for (const [host, hostValueRaw] of Object.entries(dayData)) {
        if (host === 'other') continue;
        const hostData = hostValueRaw as HostData;
        for (const n of Object.values(hostData.assets)) {
          assetsTotal += n;
        }
      }
    }
    if (assetsTotal > 0) infoRows.push({ label: 'assets', total: assetsTotal });
    if (otherTotal > 0) infoRows.push({ label: 'other', total: otherTotal });

    const domainOtherTotals: Record<string, number> = {};
    for (const dayData of Object.values(aggregations)) {
      for (const [host, hostValueRaw] of Object.entries(dayData)) {
        if (host === 'other') continue;
        const hostData = hostValueRaw as HostData;
        if (hostData.other) {
          for (const n of Object.values(hostData.other)) {
            domainOtherTotals[host] = (domainOtherTotals[host] ?? 0) + n;
          }
        }
      }
    }
    for (const [domain, total] of Object.entries(domainOtherTotals).sort()) {
      if (total > 0) infoRows.push({ label: `${domain}/other`, total });
    }
  }

  return { items, non200, infoRows };
}

// --- Master builder ---

export function buildTrafficPageData(
  response: TrafficResponse,
  filter: ParsedFilter,
  viewType: TrafficResponse['type'],
  viewParam: string,
): TrafficPageData {
  let items: TrafficListItem[];
  let non200: Record<string, number> = {};
  let infoRows: TrafficInfoRow[] = [];

  switch (viewType) {
    case 'all': {
      items = buildAllItems(response.aggregations, filter);
      break;
    }
    case 'quarter': {
      items = buildQuarterItems(response.aggregations, filter);
      break;
    }
    case 'week': {
      const r = buildWeekItems(response.aggregations, filter);
      items = r.items;
      non200 = r.non200;
      break;
    }
    case 'day': {
      const currentPath = `/logs/day/${viewParam}`;
      const r = buildDayItems(response.aggregations, filter, currentPath);
      items = r.items;
      non200 = r.non200;
      infoRows = r.infoRows;
      break;
    }
  }

  const maxValue = items.length > 0 ? Math.max(...items.map((i) => i.value200)) : 0;
  const non200Vals = Object.values(non200);
  const maxNon200 = non200Vals.length > 0 ? Math.max(...non200Vals) : 0;

  const viewLabel = {
    all: 'All Stats',
    quarter: `Quarter ${viewParam}`,
    week: `Week ${viewParam}`,
    day: `Day ${viewParam}`,
  }[viewType];

  const filterLabel = buildFilterParam(filter.domain, filter.path) || 'All Entries';

  return {
    viewLabel,
    filterLabel,
    kpi: computeKpi(response, filter),
    items,
    maxValue,
    non200,
    maxNon200,
    infoRows,
    allQuarters: generateQuarterRange(response.firstDate),
    allWeeks: generateWeekRange(response.firstDate),
    allDomains: getAllDomains(response.aggregations),
  };
}
