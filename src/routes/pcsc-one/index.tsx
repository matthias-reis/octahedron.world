import { createSignal, For, createResource, Suspense } from 'solid-js';
import { PcscBreadcrumb } from '~/pcsc/pcsc-breadcrumb';
import { PcscTitle } from '~/pcsc/pcsc-title';
import { PcscTrack } from '~/pcsc/pcsc-track';
import { fetchLeaderboard, fetchByQuery } from '~/pcsc/server/tracks';
export default function PCSCOneHome() {
  const [searchTerm, setSearchTerm] = createSignal('');

  const [tracks] = createResource(searchTerm, async (query) => {
    if (query.length === 0) {
      return await fetchLeaderboard();
    } else {
      return await fetchByQuery(query);
    }
  });

  const headline = () =>
    searchTerm().length > 0 ? `Search for "${searchTerm()}"` : 'PCSC One';

  const description = () => {
    const term = searchTerm();
    if (term.length === 0) {
      return 'Home of the music ratings database';
    }
    const count = tracks.latest?.length ?? 0;
    return `Found ${count} results.`;
  };

  return (
    <>
      <PcscBreadcrumb links={[{ href: '/pcsc-one', label: 'Home' }]} />
      <PcscTitle headline={headline()} description={description()} />

      <div class="mt-5">
        <input
          type="text"
          placeholder="Filter by albums, artists, title..."
          value={searchTerm()}
          onInput={(e) => setSearchTerm(e.currentTarget.value)}
          class="w-full px-6 py-4 rounded-full pcsc-bd border border-cw/30 focus:border-cw/50 focus:outline-none text-lg placeholder:opacity-80"
        />
      </div>

      <Suspense
        fallback={<div class="mt-8 text-center opacity-50">Loading...</div>}
      >
        <div class="mt-8 space-y-4">
          <For each={tracks()}>
            {(track, index) => <PcscTrack track={track} number={index() + 1} />}
          </For>
        </div>
      </Suspense>
    </>
  );
}
