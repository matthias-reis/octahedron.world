import { A, createAsyncStore, useLocation } from '@solidjs/router';
import { cx } from './cx';
import OctahedronLogo from './octahedron-logo';
import { createSignal, For, Show, Suspense } from 'solid-js';
import { House, X } from 'lucide-solid';
import { getAllRootRoutes } from '~/model/model';
import { smallImageUrl } from './image-helpers';
import { sortRootItems } from '~/model/helpers';

export default function Nav() {
  const [isOpen, setIsOpen] = createSignal<boolean>(false);
  const items = createAsyncStore(() => getAllRootRoutes());
  const itemsList = () => sortRootItems(Object.values(items() || {}));
  const location = useLocation();

  return (
    <Show when={location.pathname !== '/'}>
      <nav
        class={cx(
          'p-3 pr-4 fixed top-0 right-0 w-xs flex flex-col z-30 cursor-pointer',
          isOpen() && 'bg-can8 border-l border-can6 h-screen'
        )}
        onClick={() => setIsOpen(!isOpen())}
      >
        <h1 class="font-octa font-bold flex justify-end items-center gap-2 text-can5 text-lg w-full">
          <span class="text-decent-600 font-bold text-shadow-md text-shadow-textpop">
            OCTAHEDRON
          </span>
          <OctahedronLogo class="text-cas3 w-5 h-5" />
          <span class="text-can5 font-light text-shadow-md text-shadow-textpop">
            WORLD
          </span>
        </h1>
        <div class={cx('grow shrink overflow-y-auto', !isOpen() && 'hidden')}>
          <X class="absolute top-3 left-3 cursor-pointer" />
          <A
            href={`/`}
            class="flex items-center justify-stretch gap-3 outline-2 -outline-offset-2 outline-transparent hover:outline-cas5 mb-2"
          >
            <img
              src={smallImageUrl('_home')}
              alt=""
              class="aspect-image object-cover h-6"
            />
            <span class="font-octa font-bold text-xl leading-none text-cas4">
              <House />
            </span>
          </A>
          <Suspense>
            <For each={itemsList()}>
              {(item) => (
                <A
                  href={`/${item.slug}`}
                  class="flex items-center justify-stretch gap-3 outline-2 -outline-offset-2 outline-transparent hover:outline-cas5 mb-2"
                >
                  <img
                    src={smallImageUrl(item.image)}
                    alt=""
                    class="aspect-image object-contain h-6"
                  />
                  <span class="font-octa font-bold text-xl leading-none">
                    {item.title}
                  </span>
                </A>
              )}
            </For>
          </Suspense>
        </div>
      </nav>
    </Show>
  );
}
