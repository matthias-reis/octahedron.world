import { createSignal } from 'solid-js';
import { PcscBreadcrumb } from '~/pcsc/pcsc-breadcrumb';
import { PcscTitle } from '~/pcsc/pcsc-title';
import { PcscItem } from '~/pcsc/pcsc-item';

export default function PCSCOneHome() {
  const [searchTerm, setSearchTerm] = createSignal('');

  // Mock results count - you can replace this with actual search logic
  const resultsCount = () => (searchTerm().length > 0 ? 123 : 0);

  const headline = () =>
    searchTerm().length > 0 ? `Search for <${searchTerm()}>` : 'PCSC One';

  const description = () =>
    searchTerm().length === 0
      ? 'Home of the music ratings database'
      : `Found ${resultsCount()} results."`;

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
        <PcscItem
          href="/pcsc-one/albums/dark-side-of-the-moon"
          number={1}
          headline="The Dark Side of the Moon"
          description="foo"
          action="more text"
          rating="9.5"
        />
      </div>
    </>
  );
}
