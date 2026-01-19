import { createResource, For, Suspense, Show } from 'solid-js';
import { useParams } from '@solidjs/router';
import { PcscBreadcrumb } from '~/pcsc/pcsc-breadcrumb';
import { PcscTitle } from '~/pcsc/pcsc-title';
import { PcscTrack } from '~/pcsc/pcsc-track';
import { fetchAlbumTracks } from '~/pcsc/server/albums';
import type { CompactTrack } from '~/pcsc/model/track';

export default function PCSCOneAlbumDetail() {
  const params = useParams();
  const albumName = () => decodeURIComponent(params.name || '');

  const [tracks] = createResource(albumName, async (name) => {
    return await fetchAlbumTracks(name);
  });

  const trackCount = () => tracks()?.length ?? 0;
  const firstTrack = (): CompactTrack | undefined => tracks()?.[0];
  const artist = () => firstTrack()?.artist ?? '';
  const year = () => firstTrack()?.year ?? '';

  const description = () => {
    const count = trackCount();
    const yearStr = year() ? ` · ${year()}` : '';
    return `${count} track${count !== 1 ? 's' : ''}${yearStr}`;
  };

  return (
    <>
      <PcscBreadcrumb
        links={[
          { href: '/pcsc-one', label: 'Home' },
          { href: '/pcsc-one/albums', label: 'Albums' },
          {
            href: `/pcsc-one/albums/${encodeURIComponent(params.name || '')}`,
            label: albumName(),
          },
        ]}
      />

      <Suspense
        fallback={
          <div class="mt-8">
            <PcscTitle
              headline="Loading.Album ..."
              description="... might take some seconds"
            />
          </div>
        }
      >
        <Show when={tracks()}>
          <PcscTitle
            headline={`${artist()} · ${albumName()}`}
            description={description()}
          />

          <div class="mt-8 space-y-4">
            <For each={tracks()}>
              {(track) => (
                <PcscTrack track={track} number={track.compactTrackNumber} />
              )}
            </For>
          </div>
        </Show>
      </Suspense>
    </>
  );
}
