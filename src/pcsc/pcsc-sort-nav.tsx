import { For } from 'solid-js';

export interface SortOption {
  value: string;
  label: string;
  description?: string;
}

export const albumSortOptions: SortOption[] = [
  { value: 'v3', label: 'Top 3', description: 'Average of top 3 tracks' },
  { value: 'v5', label: 'Top 5', description: 'Average of top 5 tracks' },
  { value: 'v7', label: 'Top 7', description: 'Average of top 7 tracks' },
  { value: 'v9', label: 'Top 9', description: 'Average of top 9 tracks' },
  { value: 'count', label: 'Tracks', description: 'Number of tracks' },
  { value: 'name', label: 'A-Z', description: 'Alphabetical order' },
];

export const artistSortOptions: SortOption[] = [
  { value: 'v3', label: 'Top 3', description: 'Average of top 3 tracks' },
  { value: 'v5', label: 'Top 5', description: 'Average of top 5 tracks' },
  { value: 'v7', label: 'Top 7', description: 'Average of top 7 tracks' },
  { value: 'v9', label: 'Top 9', description: 'Average of top 9 tracks' },
  { value: 'count', label: 'Tracks', description: 'Number of tracks' },
  { value: 'name', label: 'A-Z', description: 'Alphabetical order' },
];

export interface PcscSortNavProps {
  options: SortOption[];
  current: string;
  onChange: (sort: string) => void;
}

export function PcscSortNav(props: PcscSortNavProps) {
  return (
    <nav class="mt-4">
      <span class="text-sm opacity-60 mr-3">Sort by:</span>
      <ul class="inline-flex gap-1 flex-wrap">
        <For each={props.options}>
          {(option) => (
            <li>
              <button
                onClick={() => props.onChange(option.value)}
                class={`px-3 py-1 rounded-full text-sm transition-colors ${
                  props.current === option.value
                    ? 'bg-neutral-100 text-neutral-900 font-medium'
                    : 'bg-neutral-100/10 hover:bg-neutral-100/20'
                }`}
                title={option.description}
              >
                {option.label}
              </button>
            </li>
          )}
        </For>
      </ul>
    </nav>
  );
}
