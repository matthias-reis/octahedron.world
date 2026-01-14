import { Layout } from '~/types';
import { DefaultPlugin } from '~/components/plugins/default';
import { TextPlugin } from '~/components/plugins/text';
import { largeImageUrl } from '~/components/image-helpers';
import { A, createAsync } from '@solidjs/router';
import { ChevronLeft } from 'lucide-solid/icons/index';
import { LinkPlugin } from '~/components/plugins/link';
import { GroupPlugin } from '~/components/plugins/group';
import { CtaPlugin } from '~/components/plugins/cta';
import { getAllCompactRoutes } from '~/model/model';
import { For, Suspense } from 'solid-js';
import { Loading } from '~/components/loading';
import { LinkBox } from '~/components/link-box';

export const layout: Layout = {
  main: ({ children, item }) => {
    const routes = createAsync(() => getAllCompactRoutes());

    return (
      <div class={`${item.colorSpace} bg-neutral-150 min-h-screen`}>
        <main class="max-w-3xl mx-auto px-3 py-7">
          <A
            href={`/`}
            class="flex items-center justify-start text-decent-600 mb-6 gap-2 uppercase"
          >
            <ChevronLeft /> <span>home</span>
          </A>
          <h1 class="text-6xl md:text-8xl text-saturated-900 font-octa font-bold leading-none text-center mb-3">
            {item.title}
          </h1>
          <img
            src={largeImageUrl(item.image)}
            alt={item.title}
            class="mx-auto mb-6 aspect-image w-full object-contain"
          />
          <p class="text-center text-md font-sans text-decent-600 mb-6 mx-auto max-w-md">
            {item.description}
          </p>
          <Suspense
            fallback={
              <div class="h-9 my-5">
                <Loading />
              </div>
            }
          >
            {(() => {
              const relevantRoutes = Object.values(routes() || {})?.filter(
                (route) => route.group === item.slug && route.slug !== item.slug
              );
              if (relevantRoutes.length === 0) return null;
              return (
                <>
                  <p>Here's a list of related posts to look into:</p>
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
  },
  // section: ({ children }) => (
  //   <section class="mx-5 sm:mx-7 md:mx-8 lg:mx-9 mb-7">{children}</section>
  // ),
  plugins: {
    default: DefaultPlugin,
    link: LinkPlugin,
    group: GroupPlugin,
    cta: CtaPlugin,
    text: TextPlugin(),
  },
};
