import { createAsyncStore } from '@solidjs/router';
import { Component, For, Suspense } from 'solid-js';
import { getAllCompactRoutes } from '~/model/model';
import { Loading } from './loading';
import { LinkBox } from './link-box';
import { cx } from './cx';

export const Related: Component<{ slugs?: string[] }> = ({ slugs }) => {
  if (!slugs || slugs.length === 0) return null;
  const items = createAsyncStore(() => getAllCompactRoutes());

  return (
    <Suspense
      fallback={
        <nav class="h-8 my-5">
          <Loading />
        </nav>
      }
    >
      {(() => {
        const data = items();
        if (!data) return null;

        const visibleItems = slugs
          .map((slug) => items()![slug])
          .filter(Boolean);

        // Loaded but nothing found - display nothing
        if (visibleItems.length === 0) return null;

        // Loaded and found - display the link
        return (
          <nav
            class={cx(
              'grid gap-4 md:grid-cols-2 my-5',
              visibleItems.length === 1 && 'md:grid-cols-1'
            )}
          >
            <h3 class="font-octa text-3xl font-bold text-saturated-700">
              Related Post{visibleItems.length > 1 ? 's' : ''}
            </h3>
            <For each={visibleItems}>
              {(item) => (
                <LinkBox item={item} small={visibleItems.length > 1} />
              )}
            </For>
          </nav>
        );
      })()}
    </Suspense>
  );
};
