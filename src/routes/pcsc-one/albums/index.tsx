import { createSignal, For, createResource, Suspense } from 'solid-js';
import { PcscBreadcrumb } from '~/pcsc/pcsc-breadcrumb';
import { PcscTitle } from '~/pcsc/pcsc-title';
import { PcscItem } from '~/pcsc/pcsc-item';
import { PcscSortNav, albumSortOptions } from '~/pcsc/pcsc-sort-nav';
import { fetchAlbums } from '~/pcsc/server/albums';
import type { AlbumSortOption } from '~/routes/pcsc-api/albums';
import { TrackCollectionItem } from '~/pcsc/model/track-map';

export default function PCSCOneAlbums() {
  const [sortOption, setSortOption] = createSignal<AlbumSortOption>('v3');

  const [albums] = createResource(sortOption, async (sort) => {
    return await fetchAlbums(sort);
  });

  const description = () => {
    const count = albums.latest?.length ?? 0;
    return `${count} albums in the collection`;
  };

  const ratingTitles = {
    v3: 'Top 3',
    v5: 'Top 5',
    v7: 'Top 7',
    v9: 'Top 9',
    count: 'Top 3',
    name: 'Top 3',
  };

  const ratingValues = {
    v3: (album: TrackCollectionItem) => album.v3,
    v5: (album: TrackCollectionItem) => album.v5,
    v7: (album: TrackCollectionItem) => album.v7,
    v9: (album: TrackCollectionItem) => album.v9,
    count: (album: TrackCollectionItem) => album.v3,
    name: (album: TrackCollectionItem) => album.v3,
  };

  return (
    <>
      <PcscBreadcrumb
        links={[
          { href: '/pcsc-one', label: 'Home' },
          { href: '/pcsc-one/albums', label: 'Albums' },
        ]}
      />
      <PcscTitle headline="Albums" description={description()} />

      <PcscSortNav
        options={albumSortOptions}
        current={sortOption()}
        onChange={setSortOption}
      />

      <Suspense
        fallback={<div class="mt-8 text-center opacity-50">Loading...</div>}
      >
        <div class="mt-8 space-y-4">
          <For each={albums()}>
            {(album, index) => (
              <PcscItem
                number={index() + 1}
                headline={album.name}
                description={`${album.sub}`}
                secondaryDescription={`${album.count} tracks · Top 3: ${
                  album.v3 ? album.v3.toFixed(1) : '-'
                } · Top 5:  ${album.v5 ? album.v5.toFixed(1) : '-'} · Top 7: ${
                  album.v7 ? album.v7.toFixed(1) : '-'
                } · Top 9: ${album.v9 ? album.v9.toFixed(1) : '-'}`}
                url={album.url}
                ratingTitle={ratingTitles[sortOption()]}
                ratingValue={
                  ratingValues[sortOption()](album)?.toFixed(1) || '-'
                }
              />
            )}
          </For>
        </div>
      </Suspense>
    </>
  );
}
