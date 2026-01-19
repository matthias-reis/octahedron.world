import { query } from '@solidjs/router';
import { fetchLocal } from './fetch';
import type { TrackDetail } from '~/routes/pcsc-api/songs/[slug]';

/**
 * Fetches a track with its full vote history.
 * This bypasses the cache and queries Firebase directly for real-time data.
 *
 * @param slug - The unique track ID
 * @returns Promise<TrackDetail> - Track with full metadata and vote history
 */
export const fetchTrackDetail = query(
  async (slug: string): Promise<TrackDetail> => {
    const track = await fetchLocal(`/pcsc-api/songs/${slug}`);
    return track;
  },
  'fetchTrackDetail'
);
