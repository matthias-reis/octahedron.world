import type { APIEvent } from '@solidjs/start/server';
import {
  loadTrafficData,
  getDatesInISOWeek,
  getFirstDate,
} from '~/server/traffic-stats';
import type {
  DayData,
  TrafficData,
  TrafficResponse,
} from '~/server/traffic-stats';

export async function GET({
  params,
}: APIEvent): Promise<Response | TrafficResponse> {
  const match = params.w?.match(/^(\d{4})-(\d{2})$/);
  if (!match) {
    return new Response(
      'Invalid week format. Use: {year}-{week} (zero-padded)',
      { status: 400 }
    );
  }

  const year = Number(match[1]);
  const week = Number(match[2]);

  let traffic: TrafficData | undefined;
  try {
    traffic = loadTrafficData();
  } catch (e) {
    return e as Response;
  }

  const { aggregations } = traffic;
  const dates = getDatesInISOWeek(year, week);
  const result: Record<string, DayData> = {};

  for (const date of dates) {
    if (aggregations[date]) {
      result[date] = aggregations[date];
    }
  }

  if (Object.keys(result).length === 0) {
    return new Response('No data found for this week', { status: 404 });
  }

  return {
    type: 'week',
    firstDate: getFirstDate(aggregations),
    aggregations: result,
  };
}
