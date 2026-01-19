import type { APIEvent } from '@solidjs/start/server';
import { getAllTracks } from '~/pcsc/server/track-cache';
import type { TrackCollectionItem } from '~/pcsc/model/track-map';

export type YearSortOption = 'asc' | 'desc' | 'v3' | 'v5' | 'v7' | 'v9';

const sortYears = (
  years: TrackCollectionItem[],
  sort: YearSortOption
): TrackCollectionItem[] => {
  switch (sort) {
    case 'asc':
      return years.sort((a, b) => a.name.localeCompare(b.name));
    case 'desc':
      return years.sort((a, b) => b.name.localeCompare(a.name));
    case 'v3':
      return years
        .filter((y) => y.v3 !== null)
        .sort((a, b) => (b.v3 ?? 0) - (a.v3 ?? 0));
    case 'v5':
      return years
        .filter((y) => y.v5 !== null)
        .sort((a, b) => (b.v5 ?? 0) - (a.v5 ?? 0));
    case 'v7':
      return years
        .filter((y) => y.v7 !== null)
        .sort((a, b) => (b.v7 ?? 0) - (a.v7 ?? 0));
    case 'v9':
      return years
        .filter((y) => y.v9 !== null)
        .sort((a, b) => (b.v9 ?? 0) - (a.v9 ?? 0));
    default:
      return years;
  }
};

export async function GET({ request }: APIEvent) {
  const url = new URL(request.url);
  const sort = (url.searchParams.get('sort') as YearSortOption) || 'v3';

  const tracks = await getAllTracks();
  const years = tracks.getYears();
  const sortedYears = sortYears(years, sort);

  return sortedYears;
}
