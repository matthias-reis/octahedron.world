import type { APIEvent } from '@solidjs/start/server';
import type { TrafficData, TrafficResponse } from '~/server/traffic-stats';

import { getFirstDate, loadTrafficData } from '~/server/traffic-stats';

export async function GET({
  params,
}: APIEvent): Promise<Response | TrafficResponse> {
  const day = params.d;
  if (!day || !/^\d{4}-\d{2}-\d{2}$/.test(day)) {
    return new Response('Invalid date format. Use: YYYY-MM-DD', {
      status: 400,
    });
  }

  let traffic: TrafficData | undefined;
  try {
    traffic = loadTrafficData();
  } catch (e) {
    return e as Response;
  }

  const dayData = traffic.aggregations[day];
  if (!dayData) {
    return new Response('No data found for this date', { status: 404 });
  }

  return { type: 'day', firstDate: getFirstDate(traffic.aggregations), aggregations: { [day]: dayData } };
}
