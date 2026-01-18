import { query } from '@solidjs/router';
import { type CompactTrack } from '../model/track';
import { fetchLocal } from './fetch';

/**
 * Fetches the top 100 tracks sorted by rating.
 *
 * @returns Promise<CompactTrack[]> - Array of top 100 tracks sorted by rating (highest first)
 */
export const fetchLeaderboard = query(async (): Promise<CompactTrack[]> => {
  const tracks = await fetchLocal('/pcsc-api/tracks/leaderboard');
  return tracks;
}, 'fetchLeaderboard');

/**
 * Fetches tracks matching a search query.
 *
 * @param query - Search term to filter tracks by (searches in title, artist, album)
 * @returns Promise<CompactTrack[]> - Array of matching tracks sorted by rating (highest first)
 */
export const fetchByQuery = query(
  async (searchQuery: string): Promise<CompactTrack[]> => {
    const tracks = await fetchLocal(
      `/pcsc-api/tracks/search/${encodeURIComponent(searchQuery)}`
    );
    return tracks;
  },
  'fetchByQuery'
);
