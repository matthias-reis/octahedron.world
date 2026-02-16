import { For, JSX, Suspense } from 'solid-js';
import { transform } from 'solid-mds';
import { HastParseResult } from 'hast-mds';
import type { GlobalScope } from '~/types';
import { A, createAsync } from '@solidjs/router';
import { ChevronLeft } from 'lucide-solid/icons/index';
import { largeImageUrl } from '~/components/image-helpers';
import { canonicalComponents } from '~/components/canonical-components';
import { getAllCompactRoutes } from '~/model/model';
import { Loading } from '~/components/loading';
import { LinkBox } from '~/components/link-box';

export default function createTemplate(props: {
  mds: HastParseResult<GlobalScope, {}>;
}): JSX.Element {
  const parsed = transform<GlobalScope, {}>(props.mds, canonicalComponents);
  const item = parsed.global;
  const routes = createAsync(() => getAllCompactRoutes());

  return (
    <div class={`${item?.colorSpace} bg-can9 min-h-screen`}>
      <main class="max-w-3xl mx-auto px-3 py-7">
        <A
          href={`/`}
          class="flex items-center justify-start text-cbd2 mb-6 gap-2 uppercase"
        >
          <ChevronLeft /> <span>home</span>
        </A>
        <h1 class="text-6xl md:text-8xl text-cad2 font-octa font-bold leading-none text-center mb-3">
          {item?.title}
        </h1>
        {item?.image && (
          <img
            src={largeImageUrl(item.image)}
            alt={item.title}
            class="mx-auto mb-6 aspect-image w-full object-contain"
          />
        )}
        <p class="text-center text-md font-sans text-cad4 mb-6 mx-auto max-w-md">
          {item?.description}
        </p>

        {/* Render any MDS content steps */}
        {Object.values(parsed.steps).map((step) => (
          <step.Body />
        ))}

        {/* Render the auto-discovered grid */}
        <Suspense
          fallback={
            <div class="h-9 my-5">
              <Loading />
            </div>
          }
        >
          {(() => {
            if (!item?.slug) return null;

            const relevantRoutes = Object.values(routes() || {})?.filter(
              (route) => route.group === item.slug && route.slug !== item.slug
            );
            if (!relevantRoutes || relevantRoutes.length === 0) return null;
            return (
              <>
                <nav class="grid gap-4 md:grid-cols-2 my-5">
                  <For each={relevantRoutes}>
                    {(item) => <LinkBox item={item} small />}
                  </For>
                </nav>
              </>
            );
          })()}
        </Suspense>
      </main>
    </div>
  );
}
