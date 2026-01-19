import { createSignal, For, createResource, Suspense } from 'solid-js';
import { PcscBreadcrumb } from '~/pcsc/pcsc-breadcrumb';
import { PcscTitle } from '~/pcsc/pcsc-title';
import { PcscItem } from '~/pcsc/pcsc-item';
import { PcscSortNav } from '~/pcsc/pcsc-sort-nav';
import { fetchYears } from '~/pcsc/server/years';
import type { YearSortOption } from '~/routes/pcsc-api/years';
import type { TrackCollectionItem } from '~/pcsc/model/track-map';

const yearSortOptions = [
  { label: 'By Best 30', value: 'v3' as const },
  { label: 'By Best 50', value: 'v5' as const },
  { label: 'By Best 70', value: 'v7' as const },
  { label: 'By Best 90', value: 'v9' as const },
  { label: 'By Name (A-Z)', value: 'asc' as const },
  { label: 'By Name (Z-A)', value: 'desc' as const },
];

export default function PCSCOneYears() {
  const [sortOption, setSortOption] = createSignal<YearSortOption>('v3');

  const [years] = createResource(sortOption, async (sort) => {
    return await fetchYears(sort);
  });

  const description = () => {
    const count = years.latest?.length ?? 0;
    return `${count} years in the collection`;
  };

  const ratingTitles = {
    v3: 'Top 30',
    v5: 'Top 50',
    v7: 'Top 70',
    v9: 'Top 90',
    asc: 'Top 30',
    desc: 'Top 30',
  };

  const ratingValues = {
    v3: (year: TrackCollectionItem) => year.v3,
    v5: (year: TrackCollectionItem) => year.v5,
    v7: (year: TrackCollectionItem) => year.v7,
    v9: (year: TrackCollectionItem) => year.v9,
    asc: (year: TrackCollectionItem) => year.v3,
    desc: (year: TrackCollectionItem) => year.v3,
  };

  return (
    <>
      <PcscBreadcrumb
        links={[
          { href: '/pcsc-one', label: 'Home' },
          { href: '/pcsc-one/years', label: 'Years' },
        ]}
      />
      <PcscTitle headline="Years" description={description()} />

      <PcscSortNav
        options={yearSortOptions}
        current={sortOption()}
        onChange={setSortOption}
      />

      <Suspense
        fallback={<div class="mt-8 text-center opacity-50">Loading...</div>}
      >
        <div class="mt-8 space-y-4">
          <For each={years()}>
            {(year, index) => (
              <PcscItem
                number={index() + 1}
                headline={year.name}
                description={`${year.count} tracks`}
                secondaryDescription={`Top 30: ${
                  year.v3 ? year.v3.toFixed(1) : '-'
                } · Top 50:  ${year.v5 ? year.v5.toFixed(1) : '-'} · Top 70: ${
                  year.v7 ? year.v7.toFixed(1) : '-'
                } · Top 90: ${year.v9 ? year.v9.toFixed(1) : '-'}`}
                url={year.url}
                ratingTitle={ratingTitles[sortOption()]}
                ratingValue={
                  ratingValues[sortOption()](year)?.toFixed(1) || '-'
                }
              />
            )}
          </For>
        </div>
      </Suspense>
    </>
  );
}
