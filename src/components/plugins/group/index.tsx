import { A, createAsyncStore } from '@solidjs/router';
import { type JSX, Suspense, ParentComponent, For } from 'solid-js';
import { smallImageUrl } from '~/components/image-helpers';
import { Loading } from '~/components/loading';
import { getAllCompactRoutes } from '~/model/model';
import { type Plugin } from '~/types';

export const GroupPlugin: Plugin = ({ payload, wrapper }) => {
  const Wrapper = wrapper || 'section';
  const items = createAsyncStore(() => getAllCompactRoutes());
  const visibleSlugs = payload?.split(',').map((s) => s.trim()) ?? [];

  return (
    <Suspense
      fallback={
        <Wrapper>
          <div class="h-8 my-5">
            <Loading />
          </div>
        </Wrapper>
      }
    >
      {(() => {
        const data = items();
        if (!data) return null;

        const visibleItems = visibleSlugs
          .map((slug) => items()![slug])
          .filter(Boolean);

        // Loaded but nothing found - display nothing
        if (visibleItems.length === 0) return null;

        // Loaded and found - display the link
        return (
          <Wrapper>
            <nav class="grid gap-4 md:grid-cols-2 my-5">
              <For each={visibleItems}>
                {(item) => (
                  <A
                    href={`/${item.slug}`}
                    class="flex justify-stretch gap-3  bg-decent-300 outline-2 -outline-offset-2 outline-transparent hover:outline-saturated-500"
                  >
                    <img
                      src={smallImageUrl(item.image)}
                      alt=""
                      class="aspect-image object-contain h-7"
                    />
                    <span class="m-3 flex flex-col">
                      <span class="font-octa font-bold text-2xl">
                        {item.title}
                      </span>
                      <span class="text-sm text-decent-500">
                        {item.description}
                      </span>
                    </span>
                  </A>
                )}
              </For>
            </nav>
          </Wrapper>
        );
      })()}
    </Suspense>
  );
};
