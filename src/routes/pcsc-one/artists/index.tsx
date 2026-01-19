import { createSignal, For, createResource, Suspense } from 'solid-js';
import { PcscBreadcrumb } from '~/pcsc/pcsc-breadcrumb';
import { PcscTitle } from '~/pcsc/pcsc-title';
import { PcscItem } from '~/pcsc/pcsc-item';
import { PcscSortNav, artistSortOptions } from '~/pcsc/pcsc-sort-nav';
import { fetchArtists } from '~/pcsc/server/artists';
import type { ArtistSortOption } from '~/routes/pcsc-api/artists';
import { TrackCollectionItem } from '~/pcsc/model/track-map';

export default function PCSCOneArtists() {
  const [sortOption, setSortOption] = createSignal<ArtistSortOption>('v3');

  const [artists] = createResource(sortOption, async (sort) => {
    return await fetchArtists(sort);
  });

  const description = () => {
    const count = artists.latest?.length ?? 0;
    return `${count} artists in the collection`;
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
    v3: (artist: TrackCollectionItem) => artist.v3,
    v5: (artist: TrackCollectionItem) => artist.v5,
    v7: (artist: TrackCollectionItem) => artist.v7,
    v9: (artist: TrackCollectionItem) => artist.v9,
    count: (artist: TrackCollectionItem) => artist.v3,
    name: (artist: TrackCollectionItem) => artist.v3,
  };

  return (
    <>
      <PcscBreadcrumb
        links={[
          { href: '/pcsc-one', label: 'Home' },
          { href: '/pcsc-one/artists', label: 'Artists' },
        ]}
      />
      <PcscTitle headline="Artists" description={description()} />

      <PcscSortNav
        options={artistSortOptions}
        current={sortOption()}
        onChange={setSortOption}
      />

      <Suspense
        fallback={<div class="mt-8 text-center opacity-50">Loading...</div>}
      >
        <div class="mt-8 space-y-4">
          <For each={artists()}>
            {(artist, index) => (
              <PcscItem
                number={index() + 1}
                headline={artist.name}
                description={`${artist.count} tracks`}
                secondaryDescription={`Top 3: ${
                  artist.v3 ? artist.v3.toFixed(1) : '-'
                } · Top 5:  ${artist.v5 ? artist.v5.toFixed(1) : '-'} · Top 7: ${
                  artist.v7 ? artist.v7.toFixed(1) : '-'
                } · Top 9: ${artist.v9 ? artist.v9.toFixed(1) : '-'}`}
                url={artist.url}
                ratingTitle={ratingTitles[sortOption()]}
                ratingValue={
                  ratingValues[sortOption()](artist)?.toFixed(1) || '-'
                }
              />
            )}
          </For>
        </div>
      </Suspense>
    </>
  );
}
