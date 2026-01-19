import { query } from '@solidjs/router';
import type { TrackCollectionItem } from '../model/track-map';
import type { CompactTrack } from '../model/track';
import type { AlbumSortOption } from '~/routes/pcsc-api/albums';
import { fetchLocal } from './fetch';

/**
 * Fetches all albums with the specified sorting.
 *
 * @param sort - Sort option: 'count', 'v3', 'v5', 'v7', 'v9', or 'name'
 * @returns Promise<TrackCollectionItem[]> - Array of albums sorted by the specified option
 */
export const fetchAlbums = query(
  async (sort: AlbumSortOption = 'v3'): Promise<TrackCollectionItem[]> => {
    const albums = await fetchLocal(`/pcsc-api/albums?sort=${sort}`);
    return albums;
  },
  'fetchAlbums'
);

/**
 * Fetches all tracks for a specific album.
 *
 * @param albumName - The name of the album
 * @returns Promise<CompactTrack[]> - Array of tracks sorted by disc/track number
 */
export const fetchAlbumTracks = query(
  async (albumName: string): Promise<CompactTrack[]> => {
    const tracks = await fetchLocal(
      `/pcsc-api/albums/${encodeURIComponent(albumName)}`
    );
    return tracks;
  },
  'fetchAlbumTracks'
);
