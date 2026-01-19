import { createResource, For, Suspense, Show } from 'solid-js';
import { useParams } from '@solidjs/router';
import { PcscBreadcrumb } from '~/pcsc/pcsc-breadcrumb';
import { PcscTitle } from '~/pcsc/pcsc-title';
import { PcscTrack } from '~/pcsc/pcsc-track';
import { fetchArtistTracks } from '~/pcsc/server/artists';

export default function PCSCOneArtistDetail() {
  const params = useParams();
  const artistName = () => decodeURIComponent(params.name || '');

  const [tracks] = createResource(artistName, async (name) => {
    return await fetchArtistTracks(name);
  });

  const trackCount = () => tracks()?.length ?? 0;

  const description = () => {
    const count = trackCount();
    return `${count} track${count !== 1 ? 's' : ''}`;
  };

  return (
    <>
      <PcscBreadcrumb
        links={[
          { href: '/pcsc-one', label: 'Home' },
          { href: '/pcsc-one/artists', label: 'Artists' },
          {
            href: `/pcsc-one/artists/${encodeURIComponent(params.name || '')}`,
            label: artistName(),
          },
        ]}
      />

      <Suspense
        fallback={
          <div class="mt-8">
            <PcscTitle
              headline="Loading Artist..."
              description="... might take some seconds"
            />
          </div>
        }
      >
        <Show when={tracks()}>
          <PcscTitle headline={artistName()} description={description()} />

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
