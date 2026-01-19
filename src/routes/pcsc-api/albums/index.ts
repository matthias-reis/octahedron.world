import type { APIEvent } from '@solidjs/start/server';
import { getAllTracks } from '~/pcsc/server/track-cache';
import type { TrackCollectionItem } from '~/pcsc/model/track-map';

export type AlbumSortOption = 'count' | 'v3' | 'v5' | 'v7' | 'v9' | 'name';

const sortAlbums = (
  albums: TrackCollectionItem[],
  sort: AlbumSortOption
): TrackCollectionItem[] => {
  switch (sort) {
    case 'count':
      return albums.sort((a, b) => b.count - a.count);
    case 'v3':
      return albums
        .filter((a) => a.v3 !== null)
        .sort((a, b) => (b.v3 ?? 0) - (a.v3 ?? 0));
    case 'v5':
      return albums
        .filter((a) => a.v5 !== null)
        .sort((a, b) => (b.v5 ?? 0) - (a.v5 ?? 0));
    case 'v7':
      return albums
        .filter((a) => a.v7 !== null)
        .sort((a, b) => (b.v7 ?? 0) - (a.v7 ?? 0));
    case 'v9':
      return albums
        .filter((a) => a.v9 !== null)
        .sort((a, b) => (b.v9 ?? 0) - (a.v9 ?? 0));
    case 'name':
      return albums.sort((a, b) => a.name.localeCompare(b.name));
    default:
      return albums;
  }
};

export async function GET({ request }: APIEvent) {
  const url = new URL(request.url);
  const sort = (url.searchParams.get('sort') as AlbumSortOption) || 'v3';

  const tracks = await getAllTracks();
  const albums = tracks.getAlbums();
  const sortedAlbums = sortAlbums(albums, sort);

  return sortedAlbums;
}
