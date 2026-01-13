import { A, createAsyncStore, useLocation } from '@solidjs/router';
import { cx } from './cx';
import OctahedronLogo from './octahedron-logo';
import { createSignal, For, Show } from 'solid-js';
import { X } from 'lucide-solid';
import { getAllRootRoutes } from '~/model/model';
import { smallImageUrl } from './image-helpers';

export default function Nav() {
  const [isOpen, setIsOpen] = createSignal<boolean>(false);
  const items = createAsyncStore(() => getAllRootRoutes());
  const itemsList = () => Object.values(items() || {});
  const location = useLocation();

  return (
    <Show when={location.pathname !== '/'}>
      <nav
        class={cx(
          'p-3 absolute top-0 right-0 w-xs h-screen flex flex-col',
          isOpen() && 'z-1 bg-neutral-100 h-full border-l border-neutral-300'
        )}
        onClick={() => setIsOpen(!isOpen())}
      >
        <h1 class="font-octa font-bold flex justify-end items-center gap-2 text-neutral-500 text-lg w-full">
          <span class="text-decent-600 font-bold">OCTAHEDRON</span>
          <OctahedronLogo class="text-saturated-500 w-5 h-5" />
          <span class="text-decent-500 font-light">WORLD</span>
        </h1>
        <div class={cx('grow shrink overflow-y-auto', !isOpen() && 'hidden')}>
          <X class="absolute top-3 left-3 cursor-pointer" />
          <A href="/" class="block p-3">
            Home
          </A>
          <A href="/all" class="block p-3">
            All Pages
          </A>
          <A href="/vlad" class="block p-3">
            Vlad
          </A>
          <A href="/foo" class="block p-3">
            Not Found
          </A>
          <For each={itemsList}>
            {(item) => (
              <A
                href={`/${item.slug}`}
                class="flex justify-stretch gap-3 outline-2 -outline-offset-2 outline-transparent hover:outline-saturated-500 mb-2"
              >
                <img
                  src={smallImageUrl(item.image)}
                  alt=""
                  class="aspect-image object-contain h-7"
                />
                <span class="m-3 flex flex-col">
                  <span class="font-octa font-bold text-2xl">{item.title}</span>
                </span>
              </A>
            )}
          </For>
        </div>
      </nav>
    </Show>
  );
}
