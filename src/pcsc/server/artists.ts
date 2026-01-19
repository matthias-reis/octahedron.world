import { query } from '@solidjs/router';
import type { TrackCollectionItem } from '../model/track-map';
import type { CompactTrack } from '../model/track';
import type { ArtistSortOption } from '~/routes/pcsc-api/artists';
import { fetchLocal } from './fetch';

/**
 * Fetches all artists with the specified sorting.
 *
 * @param sort - Sort option: 'count', 'v3', 'v5', 'v7', 'v9', or 'name'
 * @returns Promise<TrackCollectionItem[]> - Array of artists sorted by the specified option
 */
export const fetchArtists = query(
  async (sort: ArtistSortOption = 'v3'): Promise<TrackCollectionItem[]> => {
    const artists = await fetchLocal(`/pcsc-api/artists?sort=${sort}`);
    return artists;
  },
  'fetchArtists'
);

/**
 * Fetches all tracks for a specific artist.
 *
 * @param artistName - The name of the artist
 * @returns Promise<CompactTrack[]> - Array of tracks sorted by rating
 */
export const fetchArtistTracks = query(
  async (artistName: string): Promise<CompactTrack[]> => {
    const tracks = await fetchLocal(
      `/pcsc-api/artists/${encodeURIComponent(artistName)}`
    );
    return tracks;
  },
  'fetchArtistTracks'
);
