import { createResource, For, Suspense, Show } from 'solid-js';
import { useParams } from '@solidjs/router';
import { PcscBreadcrumb } from '~/pcsc/pcsc-breadcrumb';
import { PcscTitle } from '~/pcsc/pcsc-title';
import { PcscTrack } from '~/pcsc/pcsc-track';
import { fetchYearTracks } from '~/pcsc/server/years';

export default function PCSCOneYearDetail() {
  const params = useParams();
  const year = () => parseInt(params.year || '0', 10);

  const [tracks] = createResource(year, async (y) => {
    return await fetchYearTracks(y);
  });

  const trackCount = () => tracks()?.length ?? 0;

  const description = () => {
    const count = trackCount();
    return `${count} track${count !== 1 ? 's' : ''} from this year`;
  };

  return (
    <>
      <PcscBreadcrumb
        links={[
          { href: '/pcsc-one', label: 'Home' },
          { href: '/pcsc-one/years', label: 'Years' },
          {
            href: `/pcsc-one/years/${params.year}`,
            label: params.year || '',
          },
          {
            href: `/pcsc-one/years/${params.year}/distinct`,
            label: 'One per artist',
          },
        ]}
      />

      <Suspense
        fallback={
          <div class="mt-8">
            <PcscTitle
              headline="Loading Year..."
              description="... might take some seconds"
            />
          </div>
        }
      >
        <Show when={tracks()}>
          <PcscTitle headline={`Year ${year()}`} description={description()} />

          <div class="mt-8 space-y-4">
            <For each={tracks()}>
              {(track, index) => (
                <PcscTrack track={track} number={index() + 1} />
              )}
            </For>
          </div>
        </Show>
      </Suspense>
    </>
  );
}
