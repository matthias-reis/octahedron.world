import { A, useLocation } from '@solidjs/router';
import { For } from 'solid-js';

export interface NavLink {
  href: string;
  label: string;
}

export interface PcscNavProps {
  links: NavLink[];
}

export function PcscNav(props: PcscNavProps) {
  return (
    <nav>
      <ul class="flex gap-4 justify-center mt-5 mb-6">
        <For each={props.links}>
          {(link) => (
            <li>
              <A
                href={link.href}
                class="pcsc-bd rounded-full px-4 py-2 bg-cbn1/5 hover:bg-cbn1/20 uppercase text-lg font-octa text-cbn2 hover:text-cw transition-colors"
              >
                {link.label}
              </A>
            </li>
          )}
        </For>
      </ul>
    </nav>
  );
}
