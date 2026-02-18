import { createAsync, useParams } from '@solidjs/router';
import { For, Suspense, Show } from 'solid-js';
import { PcscBreadcrumb } from '~/pcsc/pcsc-breadcrumb';
import { PcscTitle } from '~/pcsc/pcsc-title';
import { fetchTrackDetail } from '~/pcsc/server/track-detail';
import { cx } from '~/components/cx';
import { A } from '@solidjs/router';

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

export default function PCSCOneTrackDetail() {
  const params = useParams<{ slug: string }>();

  const trackDetail = createAsync(() => fetchTrackDetail(params.slug));

  return (
    <>
      <Suspense
        fallback={<div class="mt-8 text-center opacity-50">Loading...</div>}
      >
        <Show when={trackDetail()}>
          {(detail) => (
            <>
              <PcscBreadcrumb
                links={[
                  { href: '/pcsc-one', label: 'Home' },
                  {
                    href: detail().track.artistUrl,
                    label: detail().track.artist,
                  },
                  {
                    href: detail().track.albumUrl,
                    label: detail().track.album,
                  },
                  { href: detail().track.songUrl, label: detail().track.title },
                ]}
              />
              <PcscTitle headline="Song" />

              {/* Track Information */}
              <div class="mt-7">
                <div class="flex gap-4">
                  {/* Vote History */}
                  <div>
                    <For each={detail().voteHistory}>
                      {(vote) => (
                        <div class="flex gap-2 items-stretch h-7">
                          <div class="w-8 border-l ml-4 relative">
                            <span
                              class={cx(
                                'w-5 h-5 rounded-full absolute -left-4 top-4 flex items-center justify-center font-mono font-bold text-lg',
                                vote.rating > 14 && 'bg-cbs4',
                                vote.rating > 9 &&
                                  vote.rating < 15 &&
                                  'bg-cas4',
                                vote.rating < 10 && 'bg-can5'
                              )}
                            >
                              {vote.rating}
                            </span>
                            <span class="ml-6 mt-4 flex flex-col text-sm">
                              <span>
                                {new Date(vote.date).getDate()}{' '}
                                {months[new Date(vote.date).getMonth()]}
                              </span>
                              <span class="font-bold">
                                {new Date(vote.date).getFullYear()}
                              </span>
                            </span>
                          </div>
                        </div>
                      )}
                    </For>
                  </div>
                  <div class="pcsc-bd flex flex-col gap-2 p-4 pr-6 relative grow">
                    <h2 class="text-5xl font-octa font-bold text-cw">
                      {detail().track.title}
                    </h2>
                    <A
                      href={detail().track.artistUrl}
                      class="text-lg hover:underline underline-offset-4 text-can2"
                    >
                      {detail().track.artist}
                    </A>
                    <A
                      href={detail().track.albumUrl}
                      class="text-sm hover:underline underline-offset-4 text-can4 mt-6"
                    >
                      {detail().track.album}
                    </A>
                    <A
                      href={detail().track.yearUrl}
                      class="text-sm hover:underline underline-offset-4 text-can4"
                    >
                      {detail().track.year}
                    </A>
                    <div class="w-12 text-center absolute bottom-3 right-3 flex flex-col items-stretch justify-stretch">
                      <span class="text-can4 text-sm">Rating</span>
                      <span class="text-xl font-mono font-bold bg-cbs4 text-cw">
                        {detail().track.vote?.toFixed(1) ?? '-'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </Show>
      </Suspense>
    </>
  );
}
