import { JSX } from 'solid-js';
import { parse } from 'solid-mds';
import type { GlobalScope, LocalScope } from './types';
import { A } from '@solidjs/router';
import { largeImageUrl } from '~/components/image-helpers';
import { cx } from '~/components/cx';
import dayjs from 'dayjs';
import { canonicalComponents } from '~/components/canonical-components';

export default function createTemplate(props: {
  markdown: string;
}): JSX.Element {
  const parsed = parse<GlobalScope, LocalScope>(
    props.markdown,
    canonicalComponents
  );
  const item = parsed.global;

  return (
    <div
      class={cx(`min-h-screen gradient bg-neutral-100 pb-20`, item?.colorSpace)}
    >
      {item?.image && (
        <div class="justify-center items-center pt-5 pb-2 relative w-full h-[90vh]">
          <img
            src={largeImageUrl(item.image)}
            alt={item?.title}
            class="top-0 object-contain w-full h-full"
          />
        </div>
      )}
      <h1 class="text-4xl font-octa font-bold text-decent-900 text-center">
        {item?.title}
      </h1>
      <A
        href={`/${item?.group}`}
        class="flex justify-center uppercase text-decent-600 gap-3 text-sm"
      >
        <span>{dayjs(item?.date).format('YYYY-MM-DD')}</span>
        <span>·</span>
        <strong class="font-bold">{item?.group}</strong>
      </A>
      {item?.date && (
        <p class="uppercase text-center text-xs text-decent-600 tracking-wider"></p>
      )}

      {/* Render any MDS content steps */}
      <div class="max-w-3xl mx-auto px-3 py-7">
        {Object.values(parsed.steps).map((step) => (
          <step.Body />
        ))}
      </div>
    </div>
  );
}
