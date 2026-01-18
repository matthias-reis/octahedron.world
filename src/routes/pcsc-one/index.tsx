import { createSignal, For, createMemo } from 'solid-js';
import { createAsync } from '@solidjs/router';
import { PcscBreadcrumb } from '~/pcsc/pcsc-breadcrumb';
import { PcscTitle } from '~/pcsc/pcsc-title';
import { PcscItem } from '~/pcsc/pcsc-item';
import { getAllTracks } from '~/pcsc/lib/track-utils';
import { TrackModel } from '~/pcsc/model/track';
import { TrackMapModel } from '~/pcsc/model/track-map';

export default function PCSCOneHome() {
  const [searchTerm, setSearchTerm] = createSignal('');

  // Fetch all tracks from the database
  const tracks = createAsync(async () => {
    const allTracks = await getAllTracks();
    return allTracks.map((t) => t.compact);
  });

  // Create track map for searching and sorting
  const trackMap = createMemo(() => {
    const trackData = tracks();
    if (!trackData) return null;
    return new TrackMapModel(trackData.map((t) => new TrackModel(t)));
  });

  // Get filtered or all tracks, limited to top 50
  const displayedTracks = createMemo(() => {
    const map = trackMap();
    if (!map) return [];

    const query = searchTerm();
    const trackCollection = query ? map.find(query) : map.all;

    // Return top 50 tracks sorted by rating
    return trackCollection.slice(0, 50);
  });

  const resultsCount = () => displayedTracks().length;

  const headline = () =>
    searchTerm().length > 0 ? `Search for "${searchTerm()}"` : 'PCSC One';

  const description = () =>
    searchTerm().length === 0
      ? 'Home of the music ratings database'
      : `Found ${resultsCount()} results.`;

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
          class="w-full px-6 py-4 rounded-full pcsc-bd border border-neutral-900/20 focus:border-neutral-900/40 focus:outline-none text-lg placeholder:opacity-80"
        />
      </div>

      <div class="mt-8 space-y-4">
        <For each={displayedTracks()}>
          {(track, index) => (
            <PcscItem
              href={track.songUrl}
              number={index() + 1}
              headline={track.title}
              description={track.artist}
              action={`${track.album} • ${track.year}`}
              rating={track.storedVote}
            />
          )}
        </For>
      </div>
    </>
  );
}
