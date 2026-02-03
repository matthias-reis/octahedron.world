import { A, createAsyncStore } from '@solidjs/router';
import { type JSX, Suspense, ParentComponent, For, Component } from 'solid-js';
import { smallImageUrl } from '~/components/image-helpers';
import { LinkBox } from '~/components/link-box';
import { Loading } from '~/components/loading';
import { getAllCompactRoutes } from '~/model/model';
import { type Plugin } from '~/types';

export const TeaserGroup: Component<{ data: { slugs: string[] } }> = (
  props
) => {
  const items = createAsyncStore(() => getAllCompactRoutes());
  const visibleSlugs = props.data.slugs;

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
          <nav class="grid gap-4 md:grid-cols-2 my-5">
            <For each={visibleItems}>
              {(item) => <LinkBox item={item} small />}
            </For>
          </nav>
        );
      })()}
    </Suspense>
  );
};
