import { Menu, X } from "lucide-solid";
import type { Component } from "solid-js";
import { For, Show } from "solid-js";
import { Container } from "./ui";

export type Brand = {
  name: string;
  /** One to three characters shown in the logo mark; defaults to the initial. */
  mark?: string;
  tagline?: string;
};

export type NavItem = { id: string; label: string };

const Logo: Component<{ brand: Brand }> = (props) => {
  const mark = () => props.brand.mark ?? props.brand.name.charAt(0);
  return (
    <a
      href="#top"
      class="flex items-center gap-ssm font-ms-display text-xl font-semibold tracking-tight shrink-0"
    >
      <span
        aria-hidden="true"
        class={`min-w-[2.25rem] h-[2.25rem] px-[0.4rem] rounded-ms bg-ms-primary text-ms-primary-fg flex items-center justify-center ${mark().length > 1 ? "text-sm" : "text-lg"}`}
      >
        {mark()}
      </span>
      <span>{props.brand.name}</span>
    </a>
  );
};

const NavLinks: Component<{ nav: NavItem[]; class: string }> = (props) => (
  <ul class={props.class}>
    <For each={props.nav}>
      {(item) => (
        <li>
          <a
            href={`#${item.id}`}
            class="block text-ms-muted hover:text-ms-fg transition-colors"
          >
            {item.label}
          </a>
        </li>
      )}
    </For>
  </ul>
);

/**
 * Sticky header: logo left, section anchors right. Below `md` the anchors
 * fold into a <details> menu — works before hydration, no state to manage.
 */
export const SiteHeader: Component<{ brand: Brand; nav: NavItem[] }> = (
  props,
) => (
  <header class="sticky top-0 z-10 bg-ms-bg/90 backdrop-blur border-b border-ms-border">
    <Container class="flex items-center justify-between gap-slg h-[4rem]">
      <Logo brand={props.brand} />
      <nav aria-label="Sections" class="hidden md:block">
        <NavLinks
          nav={props.nav}
          class="flex gap-slg text-sm font-medium whitespace-nowrap"
        />
      </nav>
      {/* biome-ignore lint/a11y/useKeyWithClickEvents: delegated from the anchors, which fire click on Enter too */}
      <details
        class="md:hidden group"
        onClick={(e) => {
          // Close the menu once an anchor is picked.
          if ((e.target as HTMLElement).closest("a"))
            e.currentTarget.removeAttribute("open");
        }}
      >
        <summary
          aria-label="Menu"
          class="list-none cursor-pointer w-[2.5rem] h-[2.5rem] rounded-ms flex items-center justify-center hover:bg-ms-soft"
        >
          <Menu class="w-[1.4rem] h-[1.4rem] group-open:hidden" />
          <X class="w-[1.4rem] h-[1.4rem] hidden group-open:block" />
        </summary>
        <nav
          aria-label="Sections"
          class="absolute left-0 right-0 top-[4rem] bg-ms-bg border-b border-ms-border"
        >
          <Container>
            <NavLinks
              nav={props.nav}
              class="flex flex-col gap-smd py-slg text-lg font-medium"
            />
          </Container>
        </nav>
      </details>
    </Container>
  </header>
);

export const SiteFooter: Component<{ brand: Brand; legal: string[] }> = (
  props,
) => (
  <footer class="ms-variant-inverted py-sxl">
    <Container class="flex flex-col md:flex-row gap-smd md:items-center justify-between text-sm">
      <div class="flex flex-col gap-sxs">
        <span class="font-ms-display text-lg font-semibold text-ms-fg">
          {props.brand.name}
        </span>
        <Show when={props.brand.tagline}>
          <span class="text-ms-muted">{props.brand.tagline}</span>
        </Show>
      </div>
      <ul class="flex flex-wrap gap-slg text-ms-muted">
        <For each={props.legal}>
          {(label) => (
            <li>
              {/* Legal pages are not built yet — the links lead nowhere. */}
              <a
                href={`#${label.toLowerCase().replace(/\W+/g, "-")}`}
                class="hover:text-ms-fg transition-colors"
              >
                {label}
              </a>
            </li>
          )}
        </For>
        <li>
          © {new Date().getFullYear()} {props.brand.name}
        </li>
      </ul>
    </Container>
  </footer>
);
