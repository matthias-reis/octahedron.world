import { query } from '@solidjs/router';
import type { TrackCollectionItem } from '../model/track-map';
import type { Track } from '../model/track';
import type { YearSortOption } from '~/routes/pcsc-api/years';
import { fetchLocal } from './fetch';

/**
 * Fetches all years with the specified sorting.
 *
 * @param sort - Sort option: 'asc', 'desc', 'v3', 'v5', 'v7', or 'v9'
 * @returns Promise<TrackCollectionItem[]> - Array of years sorted by the specified option
 */
export const fetchYears = query(
  async (sort: YearSortOption = 'v3'): Promise<TrackCollectionItem[]> => {
    const years = await fetchLocal(`/pcsc-api/years?sort=${sort}`);
    return years;
  },
  'fetchYears'
);

/**
 * Fetches all tracks for a specific year.
 *
 * @param year - The year
 * @returns Promise<Track[]> - Array of tracks sorted by rating
 */
export const fetchYearTracks = query(
  async (year: number): Promise<Track[]> => {
    const tracks = await fetchLocal(`/pcsc-api/years/${year}`);
    return tracks;
  },
  'fetchYearTracks'
);

/**
 * Fetches distinct tracks for a specific year (one track per artist).
 *
 * @param year - The year
 * @returns Promise<Track[]> - Array of tracks sorted by rating, one per artist
 */
export const fetchYearTracksDistinct = query(
  async (year: number): Promise<Track[]> => {
    const tracks = await fetchLocal(`/pcsc-api/years/${year}/distinct`);
    return tracks;
  },
  'fetchYearTracksDistinct'
);
