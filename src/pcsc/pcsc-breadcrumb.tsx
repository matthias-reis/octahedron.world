import { A } from '@solidjs/router';
import { For } from 'solid-js';

export interface BreadcrumbLink {
  href: string;
  label: string;
}

export interface PcscBreadcrumbProps {
  links: BreadcrumbLink[];
}

export function PcscBreadcrumb(props: PcscBreadcrumbProps) {
  return (
    <nav class="text-sm z-10">
      <ul class="flex gap-2 items-center">
        <For each={props.links}>
          {(link, index) => (
            <>
              <li>
                <A
                  href={link.href}
                  class="text-can4 hover:text-can1 transition-colors cursor-pointer"
                >
                  {link.label}
                </A>
              </li>
              {index() < props.links.length - 1 && (
                <li aria-hidden="true" class="text-can4 select-none">
                  //
                </li>
              )}
            </>
          )}
        </For>
      </ul>
    </nav>
  );
}
