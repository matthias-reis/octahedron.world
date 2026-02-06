import { JSX } from 'solid-js';
import { transform } from 'solid-mds';
import { HastParseResult } from 'hast-mds';
import type { GlobalScope, LocalScope } from './types';
import { A } from '@solidjs/router';
import { ChevronLeft } from 'lucide-solid/icons/index';
import { largeImageUrl } from '~/components/image-helpers';
import { canonicalComponents } from '~/components/canonical-components';

export default function createTemplate(props: {
  mds: HastParseResult;
}): JSX.Element {
  const parsed = transform<GlobalScope, LocalScope>(
    props.mds,
    canonicalComponents
  );
  const item = parsed.global;

  return (
    <div class={`${item?.colorSpace} bg-neutral-150 min-h-screen`}>
      <main class="max-w-3xl mx-auto px-3 py-7">
        <A
          href={`/`}
          class="flex items-center justify-start text-decent-600 mb-6 gap-2 uppercase"
        >
          <ChevronLeft /> <span>home</span>
        </A>
        <h1 class="text-6xl md:text-8xl text-saturated-900 font-octa font-bold leading-none text-center mb-3">
          {item?.title}
        </h1>
        {item?.image && (
          <img
            src={largeImageUrl(item.image)}
            alt={item.title}
            class="mx-auto mb-6 aspect-image w-full object-contain"
          />
        )}
        <p class="text-center text-md font-sans text-decent-600 mb-6 mx-auto max-w-md">
          {item?.description}
        </p>

        {/* Render the content (single step) */}
        {Object.values(parsed.steps).map((step) => (
          <step.Body />
        ))}
      </main>
    </div>
  );
}
