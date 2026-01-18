import { JSX, Show } from 'solid-js';
import { A } from '@solidjs/router';

export interface PcscItemProps {
  href: string;
  number?: number;
  headline: string;
  description?: JSX.Element;
  action?: JSX.Element;
  rating?: number | string;
}

export function PcscItem(props: PcscItemProps) {
  return (
    <A
      href={props.href}
      class="relative block pcsc-bd bg-neutral-100/10 hover:bg-neutral-100/20 rounded-lg py-3 px-6 transition-colors overflow-hidden"
    >
      <div>
        {/* Optional number on the left */}
        <Show when={props.number !== undefined}>
          <div class="absolute w-5 h-5 bg-neutral-100 top-0 left-0 font-mono flex items-center justify-center">
            {props.number}
          </div>
        </Show>

        <h3 class="text-3xl font-octa font-bold mb-2">{props.headline}</h3>
        <Show when={props.description}>
          <div>{props.description}</div>
        </Show>

        {/* Action slot */}
        <Show when={props.action}>
          <div class="mt-4 opacity-50">{props.action}</div>
        </Show>
      </div>

      <Show when={props.rating !== undefined}>
        <div class="w-7 text-center absolute bottom-3 right-3 flex flex-col items-stretch justify-stretch">
          <span class="opacity-50 text-sm">Rating</span>
          <span class="text-xl font-mono font-bold bg-complement">
            {props.rating}
          </span>
        </div>
      </Show>
    </A>
  );
}
