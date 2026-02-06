import { JSX } from 'solid-js';
import { transform } from 'solid-mds';
import { HastParseResult } from 'hast-mds';
import { A } from '@solidjs/router';
import { ChevronLeft } from 'lucide-solid/icons/index';
import { canonicalComponents } from '~/components/canonical-components';
import type { GlobalScope, LocalScope } from './types';

export default function createTemplate(props: {
  mds: HastParseResult;
}): JSX.Element {
  const parsed = transform<GlobalScope, LocalScope>(
    props.mds,
    canonicalComponents
  );
  const item = parsed.global;

  return (
    <div class={`${item?.colorSpace || ''} bg-neutral-150 min-h-screen`}>
      <main class="max-w-4xl mx-auto px-3 pb-7 relative">
        <A
          href={`/`}
          class="mt-3 flex items-center justify-start text-decent-900 mb-6 gap-2 uppercase "
        >
          <ChevronLeft /> <span>Home</span>
        </A>
        <div class="text-center">
          {item?.superTitle && (
            <p class="text-lg uppercase text-decent-900 mt-5 font-bold tracking-widest font-octa">
              {item.superTitle}
            </p>
          )}
          <h1 class="text-6xl md:text-8xl text-decent-900 font-octa font-bold leading-none mb-7">
            {item?.title}
          </h1>
          {item?.subTitle && (
            <p class="text-lg text-decent-900 mt-2 text-shadow-md text-shadow-neutral-500">
              {item.subTitle}
            </p>
          )}
        </div>

        <div class="mx-5 sm:mx-7 mb-7">
          {Object.values(parsed.steps).map((step) => (
            <step.Body />
          ))}
        </div>
      </main>
    </div>
  );
}
