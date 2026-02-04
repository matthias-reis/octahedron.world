import { parse } from 'solid-mds';
import { A } from '@solidjs/router';
import { ChevronLeft } from 'lucide-solid';
import { largeImageUrl } from '~/components/image-helpers';
import { canonicalComponents } from '~/components/canonical-components';
import type { GlobalScope, LocalScope } from './types';
import type { JSX } from 'solid-js/jsx-runtime';

export default function createTemplate(props: {
  markdown: string;
}): JSX.Element {
  const parsed = parse<GlobalScope, LocalScope>(
    props.markdown,
    canonicalComponents
  );
  const item = parsed.global;

  return (
    <div class={`${item?.colorSpace} bg-neutral-150 min-h-screen`}>
      <main class="max-w-4xl mx-auto px-3 pb-7 relative">
        {/* Image */}
        {item?.image && (
          <img
            src={largeImageUrl(item.image)}
            alt={item.title}
            class="mx-auto mb-6 w-full object-contain"
          />
        )}

        {/* Back Navigation */}
        <A
          href={`/${item?.group}`}
          class="absolute top-3 left-3 flex items-center justify-start text-decent-900 mb-6 gap-2 uppercase text-shadow-md text-shadow-neutral-500"
        >
          <ChevronLeft /> <span>{item?.group?.replace(/-/g, ' ')}</span>
        </A>

        {/* Title Section */}
        <div class="text-center relative -top-9 md:-top-10 -mb-8">
          {item?.superTitle && (
            <p class="text-lg uppercase text-decent-900 mt-5 font-bold tracking-widest font-octa text-shadow-md text-shadow-neutral-500">
              {item.superTitle}
            </p>
          )}
          <h1 class="text-6xl md:text-8xl text-decent-900 font-octa font-bold leading-none text-shadow-md text-shadow-neutral-500">
            {item?.title}
          </h1>
          {item?.subTitle && (
            <p class="text-lg text-decent-900 mt-2 text-shadow-md text-shadow-neutral-500">
              {item.subTitle}
            </p>
          )}
        </div>

        {/* Description */}
        {item?.description && (
          <p class="text-center text-md font-sans text-decent-600 mb-2 mx-auto max-w-md">
            {Array.isArray(item.description)
              ? item.description.join(' ')
              : item.description}
          </p>
        )}

        {/* Reading Stats */}
        {item?.words && (
          <p class="text-center text-sm font-sans text-decent-500 mb-6">
            Read: {Math.round(item.words / 200)} min ✧ Words:{' '}
            {item.words.toLocaleString()} ✧ Chars:{' '}
            {item.chars?.toLocaleString()}
          </p>
        )}

        {/* Language Link */}
        {item?.ref && item?.language && (
          <div class="text-center mb-6">
            <A
              href={`/${item.group}/${item.ref}`}
              class="text-decent-600 hover:text-saturated-700"
            >
              {item.language === 'en'
                ? '🇩🇪 Deutsche Version'
                : '🇬🇧 English Version'}
            </A>
          </div>
        )}

        {/* MDS Content Steps */}
        <div class="space-y-7">
          {Object.values(parsed.steps).map((step) => (
            <section class="mx-5 sm:mx-7 mb-7">
              <step.Body />
            </section>
          ))}
        </div>

        {/* Related Content */}
        {item?.related && item.related.length > 0 && (
          <div class="mt-12 pt-6 border-t border-decent-300">
            <h3 class="text-lg font-bold text-decent-700 mb-4">Related</h3>
            <div class="flex flex-wrap gap-2">
              {item.related.map((rel) => (
                <A
                  href={`/${rel}`}
                  class="text-sm text-decent-600 hover:text-saturated-700 underline"
                >
                  {rel}
                </A>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
