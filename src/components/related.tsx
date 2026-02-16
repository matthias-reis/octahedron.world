import { createAsyncStore } from '@solidjs/router';
import { Component, For, Suspense } from 'solid-js';
import { getAllCompactRoutes } from '~/model/model';
import { Loading } from './loading';
import { LinkBox } from './link-box';
import { cx } from './cx';
import { GlobalScope } from '~/types';

export const Related: Component<{ item: GlobalScope }> = ({ item }) => {
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
        const allItems = items();
        if (!allItems) return null;

        const related = item.related || [];

        const relatedItems = related
          .map((slug) => allItems[slug])
          .filter(Boolean);

        const groupedItems = Object.values(allItems).filter(
          (otherItem) =>
            otherItem.group === item.group && !related.includes(otherItem.slug)
        );

        // Loaded but nothing found - display nothing
        if (relatedItems.length === 0 && groupedItems.length === 0) return null;

        // Loaded and found - display the link
        return (
          <div class="px-3">
            {relatedItems.length > 0 && (
              <>
                <h3 class="font-octa text-4xl font-bold text-cbn6">
                  Recommended Read
                </h3>
                <nav
                  class={cx(
                    'grid gap-4 md:grid-cols-3 my-5',
                    relatedItems.length === 1 && 'md:grid-cols-1'
                  )}
                >
                  <For each={relatedItems}>
                    {(item) => (
                      <LinkBox item={item} small={relatedItems.length > 1} />
                    )}
                  </For>
                </nav>
              </>
            )}
            {groupedItems.length > 0 && (
              <>
                <h3 class="font-octa text-4xl font-bold text-cbn6">
                  All Posts on This Topic
                </h3>
                <nav
                  class={cx(
                    'grid gap-4 md:grid-cols-3 my-5',
                    groupedItems.length === 1 && 'md:grid-cols-1'
                  )}
                >
                  <For each={groupedItems}>
                    {(item) => (
                      <LinkBox item={item} small={groupedItems.length > 1} />
                    )}
                  </For>
                </nav>
              </>
            )}
          </div>
        );
      })()}
    </Suspense>
  );
};
