import { createResource, For, Suspense } from 'solid-js';
import { PcscBreadcrumb } from '~/pcsc/pcsc-breadcrumb';
import { PcscTitle } from '~/pcsc/pcsc-title';
import { fetchRatings } from '~/pcsc/server/ratings';
import { PcscTrack } from '~/pcsc/pcsc-track';
import { cx } from '~/components/cx';
const months = [
  'JAN',
  'FEB',
  'MAR',
  'APR',
  'MAY',
  'JUN',
  'JUL',
  'AUG',
  'SEP',
  'OCT',
  'NOV',
  'DEC',
];

export default function PCSCOneRatings() {
  const [ratings] = createResource(async () => {
    return await fetchRatings();
  });

  return (
    <>
      <PcscBreadcrumb
        links={[
          { href: '/pcsc-one', label: 'Home' },
          { href: '/pcsc-one/ratings', label: 'Ratings' },
        ]}
      />
      <PcscTitle headline="Ratings" description={'Recently voted tracks'} />

      <Suspense
        fallback={<div class="mt-8 text-center opacity-50">Loading...</div>}
      >
        <div class="mt-8 space-y-1">
          <For each={ratings()}>
            {(ratingItem) => (
              <div class="flex gap-2 items-stretch">
                <div class="w-8 border-l ml-4 relative">
                  <span
                    class={cx(
                      'w-5 h-5 rounded-full absolute -left-4 top-4 flex items-center justify-center font-mono font-bold text-lg',
                      ratingItem.rating > 14 && 'bg-cbs4',
                      ratingItem.rating > 9 &&
                        ratingItem.rating < 15 &&
                        'bg-cas4',
                      ratingItem.rating < 10 && 'bg-can5'
                    )}
                  >
                    {ratingItem.rating}
                  </span>
                  <span class="ml-5 mt-4 flex flex-col text-sm text-can1">
                    <span>
                      {new Date(ratingItem.ratingDate).getDate()}{' '}
                      {months[new Date(ratingItem.ratingDate).getMonth()]}
                    </span>
                    <span class="font-bold">
                      {new Date(ratingItem.ratingDate).getFullYear()}
                    </span>
                  </span>
                </div>
                <div class="grow py-2">
                  <PcscTrack track={ratingItem.track} />
                </div>
              </div>
            )}
          </For>
        </div>
      </Suspense>
    </>
  );
}
