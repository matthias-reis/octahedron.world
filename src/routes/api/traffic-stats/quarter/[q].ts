import type { APIEvent } from '@solidjs/start/server';
import {
  loadTrafficData,
  getWeeksInQuarter,
  getDatesInISOWeek,
  getFirstDate,
  mergeDayData,
} from '~/server/traffic-stats';
import type { DayData, TrafficResponse } from '~/server/traffic-stats';

export async function GET({ params }: APIEvent): Promise<Response | TrafficResponse> {
  const match = params.q?.match(/^(\d{4})-([1-4])$/);
  if (!match) {
    return new Response('Invalid quarter format. Use: {year}-{1|2|3|4}', { status: 400 });
  }

  const year = Number(match[1]);
  const quarter = Number(match[2]);

  let traffic;
  try {
    traffic = loadTrafficData();
  } catch (e) {
    return e as Response;
  }

  const { aggregations } = traffic;
  const weeks = getWeeksInQuarter(year, quarter);
  const result: Record<string, DayData> = {};

  for (const week of weeks) {
    const dates = getDatesInISOWeek(year, week);
    const existingDays = dates.map((d) => aggregations[d]).filter(Boolean) as DayData[];
    if (existingDays.length === 0) continue;
    const weekKey = `w${year}-${String(week).padStart(2, '0')}`;
    result[weekKey] = mergeDayData(existingDays);
  }

  if (Object.keys(result).length === 0) {
    return new Response('No data found for this quarter', { status: 404 });
  }

  return { type: 'quarter', firstDate: getFirstDate(aggregations), aggregations: result };
}
