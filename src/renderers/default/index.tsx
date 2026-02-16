import { transform } from 'solid-mds';
import { HastParseResult } from 'hast-mds';
import { A } from '@solidjs/router';
import { CalendarDays, ChevronLeft } from 'lucide-solid';
import dayjs from 'dayjs';
import { largeImageUrl } from '~/components/image-helpers';
import { canonicalComponents } from '~/components/canonical-components';
import type { GlobalScope } from '~/types';
import type { JSX } from 'solid-js/jsx-runtime';
import { Related } from '~/components/related';
import { ItemMeta } from '~/types';

export default function createTemplate(props: {
  mds: HastParseResult<GlobalScope, {}>;
}): JSX.Element {
  const parsed = transform<GlobalScope, {}>(props.mds, canonicalComponents);
  const item = parsed.global as ItemMeta;

  return (
    <div
      class={`${item?.colorSpace} min-h-screen gradient bg-linear-to-b from-cbn9 to-cbs9 pb-8`}
    >
      <main class="max-w-2xl xl:max-w-5xl mx-auto bg-neutral-150 grid grid-cols-1 xl:grid-cols-2 items-start gap-6 justify-stretch relative">
        <div class="relative xl:mr-7">
          {item?.image && (
            <img
              src={largeImageUrl(item.image)}
              alt={item.title}
              class="aspect-double xl:aspect-auto w-full object-cover mb-5"
            />
          )}
          {item?.description && (
            <p class="hidden xl:block text-right text-lg font-sans text-cad4 mt-8 w-1/2 text-balance ml-auto">
              {Array.isArray(item.description)
                ? item.description.join(' ')
                : item.description}
            </p>
          )}
          <A
            href={`/${item?.group}`}
            class="absolute top-3 left-3 xl:static flex items-center justify-start xl:justify-end xl:mt-7 text-decent-900 mb-6 gap-2 uppercase text-shadow-md text-shadow-neutral-500"
          >
            <ChevronLeft /> <span>{item?.group?.replace(/-/g, ' ')}</span>
          </A>
        </div>
        <div class="xl:pt-7 px-6 pb-7 xl:pl-0">
          {item?.superTitle && (
            <p class="uppercase text-cad5 mb-3">{item.superTitle}</p>
          )}
          <h1 class="text-6xl text-cad2 font-octa font-bold text-balance">
            {item?.title}
          </h1>
          {item?.subTitle && (
            <p class="text-lg text-cad5 text-right">{item.subTitle}</p>
          )}
          {item?.description && (
            <p class="xl:hidden text-lg font-sans text-cad4 w-3/4 text-balance">
              {Array.isArray(item.description)
                ? item.description.join(' ')
                : item.description}
            </p>
          )}
          {item?.date && (
            <p class="flex items-center text-cad5 mt-6 mb-7 gap-2 text-sm">
              <CalendarDays />{' '}
              <span>{dayjs(item.date).format('YYYY-MM-DD')}</span>
              {item.words && (
                <>
                  <span>✧</span>
                  <span>Read: {Math.round(item.words / 200)} min</span>
                  <span>✧</span>
                  <span>Words: {item.words.toLocaleString('en-GB')}</span>
                  <span>✧</span>
                  <span>Chars: {item.chars?.toLocaleString('en-GB')}</span>
                </>
              )}
            </p>
          )}
          {/* Language Link */}
          {item?.ref && item?.language && (
            <div class="mb-6">
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
          <div>
            {Object.values(parsed.steps).map((step) => (
              <section>
                <step.Body />
              </section>
            ))}
          </div>
        </div>
      </main>
      <aside class="max-w-4xl mt-5 mx-auto">
        <Related item={item as ItemMeta} />
      </aside>
    </div>
  );
}
