import { A } from '@solidjs/router';
import { cx } from './cx';
import OctahedronLogo from './octahedron-logo';
import { createSignal } from 'solid-js';
import { X } from 'lucide-solid';

export default function Nav() {
  const [isOpen, setIsOpen] = createSignal<boolean>(false);
  return (
    <>
      <nav
        class={cx(
          'p-3 absolute top-0 right-0 w-xs',
          isOpen() && 'z-1 bg-neutral-100 h-full border-l border-neutral-300'
        )}
        onClick={() => setIsOpen(!isOpen())}
      >
        <h1 class="font-octa font-bold flex justify-end items-center gap-2 text-neutral-500 text-md w-full">
          <span class="text-neutral-600">OCTAHEDRON</span>
          <OctahedronLogo class="text-saturated-500 w-5 h-5" />
          <span class="text-neutral-400">WORLD</span>
        </h1>
        <div class={cx(!isOpen() && 'hidden')}>
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
        </div>
      </nav>
    </>
  );
}
