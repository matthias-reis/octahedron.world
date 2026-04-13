import { query } from '@solidjs/router';
import { fetchLocal } from '~/pcsc/server/fetch';
import type { TrafficResponse } from '~/server/traffic-stats';

export const fetchTrafficAll = query(
  async (): Promise<TrafficResponse> => fetchLocal('/api/traffic-stats'),
  'traffic-all',
);

export const fetchTrafficQuarter = query(
  async (q: string): Promise<TrafficResponse> =>
    fetchLocal(`/api/traffic-stats/quarter/${q}`),
  'traffic-quarter',
);

export const fetchTrafficWeek = query(
  async (w: string): Promise<TrafficResponse> =>
    fetchLocal(`/api/traffic-stats/week/${w}`),
  'traffic-week',
);

export const fetchTrafficDay = query(
  async (d: string): Promise<TrafficResponse> =>
    fetchLocal(`/api/traffic-stats/day/${d}`),
  'traffic-day',
);
