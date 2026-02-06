import { JSX, Suspense, For } from 'solid-js';
import { transform } from 'solid-mds';
import { HastParseResult } from 'hast-mds';
import { A, createAsync } from '@solidjs/router';
import { ChevronLeft } from 'lucide-solid/icons';
import { smallImageUrl } from '~/components/image-helpers';
import { getAllCompactRoutes } from '~/model/model';
import { cx } from '~/components/cx';
import { canonicalComponents } from '~/components/canonical-components';
import { Loading } from '~/components/loading';
import { GlobalScope } from '~/types';

export default function AlbumRenderer(props: {
  mds: HastParseResult<GlobalScope, {}>;
}): JSX.Element {
  const parsed = transform<GlobalScope, {}>(props.mds, canonicalComponents);

  const item = parsed.global;
  const routes = createAsync(() => getAllCompactRoutes());

  return (
    <div class={`${item?.colorSpace} bg-neutral-150 min-h-screen`}>
      <main class="max-w-6xl mx-auto px-3 py-7">
        <A
          href={`/`}
          class="flex items-center justify-start text-decent-600 mb-6 gap-2 uppercase"
        >
          <ChevronLeft /> <span>home</span>
        </A>
        <h1 class="text-6xl md:text-8xl text-saturated-900 font-octa font-bold leading-none text-center mb-3">
          {item?.title}
        </h1>
        <Suspense
          fallback={
            <div class="h-9 my-5">
              <Loading />
            </div>
          }
        >
          {(() => {
            const relevantRoutes = Object.values(routes() || {})?.filter(
              (route) => route.group === item?.slug && route.slug !== item?.slug
            );
            if (relevantRoutes.length === 0) return null;
            return (
              <>
                <nav class="grid gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 my-5">
                  <For each={relevantRoutes}>
                    {(subItem) => (
                      <A
                        href={`/${subItem.slug}`}
                        class="aspect-image relative bg-decent-300 min-h-8 sm:flex-row justify-stretch gap-3 outline-2 -outline-offset-2 outline-transparent hover:outline-saturated-500"
                      >
                        <img
                          src={smallImageUrl(subItem.image)}
                          alt=""
                          class={cx('h-full aspect-image object-cover')}
                        />
                        <span class="absolute bottom-3 right-3 font-octa font-bold text-lg">
                          {subItem.title}
                        </span>
                      </A>
                    )}
                  </For>
                </nav>
              </>
            );
          })()}
        </Suspense>

        {/* Render content if any, following entry renderer pattern */}
        {Object.values(parsed.steps).map((step) => (
          <step.Body />
        ))}
      </main>
    </div>
  );
}
