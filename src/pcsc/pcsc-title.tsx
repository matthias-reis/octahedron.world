import { JSX } from 'solid-js';

export interface PcscTitleProps {
  headline: JSX.Element;
  description?: JSX.Element;
}

export function PcscTitle(props: PcscTitleProps) {
  return (
    <div class="overflow-hidden">
      <h1 class="text-6xl font-octa font-bold uppercase leading-none">
        {props.headline}
      </h1>
      {props.description && <p class="text-lg">{props.description}</p>}
    </div>
  );
}
