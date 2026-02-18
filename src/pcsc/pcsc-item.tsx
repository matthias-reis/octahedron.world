import { Show } from 'solid-js';
import { A } from '@solidjs/router';

export interface PcscItemProps {
  number?: string | number;
  url: string;
  headline: string;
  description?: string;
  secondaryDescription?: string;
  ratingTitle?: string;
  ratingValue?: string;
}

export function PcscItem(props: PcscItemProps) {
  return (
    <A
      href={props.url}
      class="relative block pcsc-bd bg-cw/5 hover:bg-cw/15 rounded-lg py-3 px-6 transition-colors overflow-hidden"
    >
      <div>
        {/* Optional number on the left */}
        <Show when={props.number !== undefined}>
          <div class="absolute min-w-5 px-2 h-5 bg-can7 text-cad1 top-0 left-0 font-mono flex items-center justify-center">
            {props.number}
          </div>
        </Show>
        <h3 class="text-3xl font-octa font-bold mb-2 text-cw">
          {props.headline}
        </h3>
        <div class="text-can2">{props.description}</div>
        <Show when={props.secondaryDescription}>
          <div class="mt-4 text-sm text-can4">{props.secondaryDescription}</div>
        </Show>
      </div>

      <div class="w-12 text-center absolute bottom-3 right-3 flex flex-col items-stretch justify-stretch">
        <span class="text-sm text-can4">{props.ratingTitle}</span>
        <span class="text-xl font-mono font-bold bg-cbs4 text-cw">
          {props.ratingValue}
        </span>
      </div>
    </A>
  );
}
