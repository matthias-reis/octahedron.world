import type { DayData, TrafficResponse } from "~/server/traffic-stats";
import {
  averageDayData,
  getFirstDate,
  getISOWeek,
  getWeeksInQuarter,
  loadTrafficData,
  mergeDayData,
} from "~/server/traffic-stats";

export async function GET(): Promise<TrafficResponse> {
  const traffic = loadTrafficData();
  const { aggregations } = traffic;

  // Group days into ISO weeks
  const weekMap = new Map<string, DayData[]>();
  for (const [day, dayData] of Object.entries(aggregations)) {
    const date = new Date(day);
    const { year, week } = getISOWeek(date);
    const key = `w${year}-${String(week).padStart(2, "0")}`;
    const existing = weekMap.get(key) ?? [];
    existing.push(dayData);
    weekMap.set(key, existing);
  }

  // Group weeks into quarters → weekly average per quarter
  const quarterMap = new Map<string, DayData[]>();
  for (const [weekKey, days] of weekMap) {
    const match = weekKey.match(/^w(\d{4})-(\d{2})$/);
    if (!match) continue;
    const year = Number(match[1]);
    const week = Number(match[2]);

    let quarter: number;
    if (week <= 13) quarter = 1;
    else if (week <= 26) quarter = 2;
    else if (week <= 39) quarter = 3;
    else quarter = 4;

    const qKey = `q${year}-${quarter}`;
    const existing = quarterMap.get(qKey) ?? [];
    // Add merged week data as a single entry for averaging later
    existing.push(mergeDayData(days));
    quarterMap.set(qKey, existing);
  }

  // Build result: average week data per quarter
  const result: TrafficResponse = { type: "all", firstDate: getFirstDate(aggregations), aggregations: {} };
  for (const [qKey, weeks] of quarterMap) {
    const match = qKey.match(/^q(\d{4})-(\d)$/);
    if (!match) continue;
    const year = Number(match[1]);
    const quarter = Number(match[2]);
    const expectedWeeks = getWeeksInQuarter(year, quarter).length;
    const merged = mergeDayData(weeks);
    result.aggregations[qKey] = averageDayData(merged, expectedWeeks);
  }

  return result;
}
