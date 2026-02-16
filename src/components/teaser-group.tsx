import { createAsyncStore } from '@solidjs/router';
import { Suspense, For, Component } from 'solid-js';
import { LinkBox } from '~/components/link-box';
import { Loading } from '~/components/loading';
import { getAllCompactRoutes } from '~/model/model';

export const TeaserGroup: Component<{ data?: Record<string, any> }> = (
  props
) => {
  const items = createAsyncStore(() => getAllCompactRoutes());
  const visibleSlugs = props.data?.slugs;

  if (!Array.isArray(visibleSlugs)) return null;

  return (
    <Suspense
      fallback={
        <div class="h-8 my-5">
          <Loading />
        </div>
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
          <nav class="grid gap-4 md:grid-cols-3 my-5">
            <For each={visibleItems}>
              {(item) => <LinkBox item={item} small />}
            </For>
          </nav>
        );
      })()}
    </Suspense>
  );
};
