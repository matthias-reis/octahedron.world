import { Show } from 'solid-js';
import { A } from '@solidjs/router';
import { TrackModel, type CompactTrack } from './model/track';

export interface PcscItemProps {
  track: CompactTrack;
  number?: number;
}

export function PcscItem(props: PcscItemProps) {
  // Transform CompactTrack to TrackModel for convenience methods
  const trackModel = new TrackModel(props.track);

  return (
    <A
      href={trackModel.songUrl}
      class="relative block pcsc-bd bg-neutral-100/10 hover:bg-neutral-100/20 rounded-lg py-3 px-6 transition-colors overflow-hidden"
    >
      <div>
        {/* Optional number on the left */}
        <Show when={props.number !== undefined}>
          <div class="absolute w-5 h-5 bg-neutral-100 top-0 left-0 font-mono flex items-center justify-center">
            {props.number}
          </div>
        </Show>

        <h3 class="text-3xl font-octa font-bold mb-2">{trackModel.title}</h3>
        <div>{trackModel.artist}</div>

        {/* Action slot - album and year */}
        <div class="mt-4 opacity-50">
          {trackModel.album} • {trackModel.year}
        </div>
      </div>

      <div class="w-7 text-center absolute bottom-3 right-3 flex flex-col items-stretch justify-stretch">
        <span class="opacity-50 text-sm">Rating</span>
        <span class="text-xl font-mono font-bold bg-complement">
          {trackModel.storedVote}
        </span>
      </div>
    </A>
  );
}
