import { JSX } from 'solid-js';
import { transform } from 'solid-mds';
import { HastParseResult } from 'hast-mds';
import type { GlobalScope, LocalScope } from './types';
import { A } from '@solidjs/router';
import { largeImageUrl } from '~/components/image-helpers';
import { ChevronLeft } from 'lucide-solid/icons/index';
import { cx } from '~/components/cx';
import { canonicalComponents } from '~/components/canonical-components';
import { Related } from '~/components/related';

export default function createTemplate(props: {
  mds: HastParseResult;
}): JSX.Element {
  const parsed = transform<GlobalScope, LocalScope>(
    props.mds,
    canonicalComponents
  );
  const item = parsed.global;

  return (
    <div class={cx(`min-h-screen bg-neutral-150`, item?.colorSpace)}>
      <main class="max-w-5xl mx-auto px-3 py-7">
        <A
          href={`/${item?.group}`}
          class="flex items-center justify-start text-decent-600 mb-6 gap-2 uppercase"
        >
          <ChevronLeft /> <span>{item?.group?.replace(/-/g, ' ')}</span>
        </A>

        {/* Title Component */}
        <div class="text-center mb-5">
          <h1 class="text-7xl text-saturated-900 font-serif font-light leading-tight">
            {item?.title}
          </h1>
          {item?.subTitle && (
            <p class="text-lg text-decent-500 mt-2">{item.subTitle}</p>
          )}
          {item?.superTitle && (
            <p class="text-lg uppercase text-decent-500 mt-5 font-bold tracking-widest font-octa">
              {item.superTitle}
            </p>
          )}
        </div>

        {/* Image */}
        {item?.image && (
          <img
            src={largeImageUrl(item.image)}
            alt={item.title}
            class="mx-auto mb-6 aspect-image w-full object-contain max-w-3xl"
          />
        )}

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
            <section class="mx-5 sm:mx-7 md:mx-8 lg:mx-9">
              <step.Body />
            </section>
          ))}
        </div>

        <Related item={item} />
      </main>
    </div>
  );
}
