import { transform } from 'solid-mds';
import { HastParseResult } from 'hast-mds';
import { A } from '@solidjs/router';
import { ChevronLeft } from 'lucide-solid';
import { largeImageUrl } from '~/components/image-helpers';
import { canonicalComponents } from '~/components/canonical-components';
import type { GlobalScope } from '~/types';
import type { JSX } from 'solid-js/jsx-runtime';
import { Related } from '~/components/related';

export default function createTemplate(props: {
  mds: HastParseResult<GlobalScope, {}>;
}): JSX.Element {
  const parsed = transform<GlobalScope, {}>(props.mds, canonicalComponents);
  const item = parsed.global;

  return (
    <div
      class={`${item?.colorSpace} bg-cbs9 min-h-screen bg-linear-to-b from-cbn9 to-cbs9`}
    >
      <main class="max-w-4xl mx-auto px-3 pb-7 mb-7 relative bg-cbn9">
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
          class="absolute top-3 left-3 flex items-center justify-start text-cbd2 mb-6 gap-2 uppercase text-shadow-md text-shadow-cbn9"
        >
          <ChevronLeft /> <span>{item?.group?.replace(/-/g, ' ')}</span>
        </A>

        {/* Title Section */}
        <div class="text-center relative -top-9 md:-top-10 -mb-8">
          {item?.superTitle && (
            <p class="text-lg uppercase text-can1 mt-5 font-bold tracking-widest font-octa text-shadow-md text-shadow-can9">
              {item.superTitle}
            </p>
          )}
          <h1 class="text-6xl md:text-8xl text-can1 font-octa font-bold leading-none text-shadow-md text-shadow-can9">
            {item?.title}
          </h1>
          {item?.subTitle && (
            <p class="text-lg text-can1 mt-2 text-shadow-md text-shadow-can9">
              {item.subTitle}
            </p>
          )}
        </div>

        {/* Description */}
        {item?.description && (
          <p class="text-center text-md font-sans text-cad4 mb-6 mx-auto max-w-md">
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
        <div class="my-6">
          {Object.values(parsed.steps).map((step) => (
            <section class="mx-5 sm:mx-7 mb-7 text-lg">
              <step.Body />
            </section>
          ))}
        </div>
      </main>

      <aside class="max-w-4xl mx-auto pb-7">
        {/* Related Content */}
        {item && <Related item={item} />}
      </aside>
    </div>
  );
}
