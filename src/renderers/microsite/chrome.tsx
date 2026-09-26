import { Menu, X } from "lucide-solid";
import type { Component } from "solid-js";
import { For, Show } from "solid-js";
import { usePageAsset } from "./assets";
import { ButtonLink, Container, Icon, type IconName } from "./ui";

export type Brand = {
  name: string;
  /** One to three characters shown in the logo mark; defaults to the initial. */
  mark?: string;
  tagline?: string;
  /** Small caps line under the name in the header, e.g. the trades. */
  sub?: string;
  /** Logo file next to the page (`pnpm ms-image … --logo`); replaces the mark. */
  logo?: string;
};

export type NavItem = { id: string; label: string };

/** `header:` in the global scope — optional actions on the right. */
export type HeaderActions = {
  /** Shown as a phone button; icon-only on phones. */
  phone?: string;
  cta?: { text: string; url: string };
};

export type QuickLink = { icon: IconName; text: string; url: string };

const tel = (phone: string) => `tel:${phone.replace(/[^+\d]/g, "")}`;

/**
 * Wordmark: mark (or logo image) and name on one line, sized to each other;
 * `brand.sub` runs underneath across both.
 */
const Logo: Component<{ brand: Brand }> = (props) => {
  const mark = () => props.brand.mark ?? props.brand.name.charAt(0);
  const logo = usePageAsset(() => props.brand.logo);
  return (
    // Demo navigation: every wordmark leads back to the overview of all
    // microsites at /p.
    <a
      href="/p"
      title="Alle Microsites"
      class="flex flex-col shrink-0 min-w-0 font-ms-display text-copy-strong"
    >
      <Show
        when={logo()}
        fallback={
          <span class="flex items-center gap-ssm text-2xl font-semibold tracking-tight leading-none">
            <span
              aria-hidden="true"
              class={`min-w-[1.75rem] h-[1.75rem] px-[0.3rem] rounded-[calc(var(--ms-radius)*0.6)] bg-button text-button-copy flex items-center justify-center ${mark().length > 1 ? "text-xs" : "text-lg"}`}
            >
              {mark()}
            </span>
            <span>{props.brand.name}</span>
          </span>
        }
      >
        {/* A logo file is the whole wordmark: no name next to it. */}
        {(url) => (
          <img
            src={url()}
            alt={props.brand.name}
            class="h-[2.4rem] md:h-[2.9rem] w-auto"
            decoding="async"
          />
        )}
      </Show>
      <Show when={props.brand.sub}>
        <span class="mt-[0.4rem] font-ms-body text-[0.625rem] sm:text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-copy-soft whitespace-nowrap">
          {props.brand.sub}
        </span>
      </Show>
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
            class="block text-copy hover:text-copy-strong transition-colors"
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
export const SiteHeader: Component<{
  brand: Brand;
  nav: NavItem[];
  actions?: HeaderActions;
}> = (props) => (
  <header class="sticky top-0 z-20 bg-page/90 backdrop-blur border-b border-line">
    <Container class="flex items-center gap-slg h-[4rem] md:h-[4.75rem]">
      <Logo brand={props.brand} />
      <nav aria-label="Bereiche" class="hidden md:flex flex-1 justify-center">
        <NavLinks
          nav={props.nav}
          class="flex gap-slg text-[0.95rem] font-medium whitespace-nowrap"
        />
      </nav>
      <div class="ml-auto flex items-center gap-ssm">
        <Show when={props.actions?.phone}>
          {(phone) => (
            <a
              href={tel(phone())}
              aria-label={`${phone()} anrufen`}
              class="inline-flex items-center gap-ssm h-[2.75rem] px-[0.7rem] sm:px-smd rounded-ms border border-line bg-card font-semibold text-copy-strong whitespace-nowrap hover:border-copy-soft transition-colors"
            >
              <Icon name="phone" class="w-[1.2rem] h-[1.2rem] text-button" />
              <span class="hidden sm:inline">{phone()}</span>
            </a>
          )}
        </Show>
        <Show when={props.actions?.cta}>
          {(cta) => (
            <ButtonLink href={cta().url} class="hidden md:inline-flex">
              {cta().text}
            </ButtonLink>
          )}
        </Show>
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
            aria-label="Menü"
            class="list-none cursor-pointer w-[2.5rem] h-[2.5rem] rounded-ms flex items-center justify-center hover:bg-tint"
          >
            <Menu class="w-[1.4rem] h-[1.4rem] group-open:hidden" />
            <X class="w-[1.4rem] h-[1.4rem] hidden group-open:block" />
          </summary>
          <nav
            aria-label="Bereiche"
            class="absolute left-0 right-0 top-[4rem] bg-page border-b border-line"
          >
            <Container>
              <NavLinks
                nav={[
                  ...props.nav,
                  ...(props.actions?.cta?.url.startsWith("#")
                    ? [
                        {
                          id: props.actions.cta.url.slice(1),
                          label: props.actions.cta.text,
                        },
                      ]
                    : []),
                ]}
                class="flex flex-col gap-smd py-slg text-lg font-medium"
              />
            </Container>
          </nav>
        </details>
      </div>
    </Container>
  </header>
);

/** `footer:` in the global scope. */
export type FooterOptions = {
  /** Small print, e.g. a disclaimer. */
  note?: string;
  /** Short line with an icon on the right, e.g. "Kein Tracking". */
  meta?: { icon?: IconName; text: string };
  /** `plain` sits on the page background; default `inverted`. */
  variant?: "plain" | "inverted";
};

export const SiteFooter: Component<{
  brand: Brand;
  legal: string[];
  options?: FooterOptions;
  /** Leave room for the fixed quick bar on phones. */
  quickbar?: boolean;
}> = (props) => (
  <footer
    class={`ms-section py-sxl text-sm ${props.options?.variant === "plain" ? "" : "ms-inverted"} ${props.quickbar ? "pb-[7rem] lg:pb-sxl" : ""}`}
  >
    <Container class="flex flex-col md:flex-row gap-smd md:items-start justify-between">
      <div class="flex flex-col gap-sxs max-w-2xl">
        <span class="font-ms-display text-lg font-semibold text-copy-strong">
          {props.brand.name}
        </span>
        <Show when={props.options?.note ?? props.brand.tagline}>
          {(text) => (
            <span class="text-copy-soft leading-relaxed">{text()}</span>
          )}
        </Show>
      </div>
      <ul class="flex flex-wrap gap-x-slg gap-y-ssm text-copy-soft">
        <For each={props.legal}>
          {(label) => (
            <li>
              {/* Legal pages are not built yet — the links lead nowhere. */}
              <a
                href={`#${label.toLowerCase().replace(/\W+/g, "-")}`}
                class="hover:text-copy-strong transition-colors"
              >
                {label}
              </a>
            </li>
          )}
        </For>
        <Show when={props.options?.meta}>
          {(meta) => (
            <li class="flex items-center gap-ssm font-semibold whitespace-nowrap">
              <Show when={meta().icon}>
                {(name) => <Icon name={name()} class="w-[1rem] h-[1rem]" />}
              </Show>
              {meta().text}
            </li>
          )}
        </Show>
        <li>
          © {new Date().getFullYear()} {props.brand.name}
        </li>
      </ul>
    </Container>
  </footer>
);

/** Thin strip above the header, e.g. "Konzeptvorschau". */
export const NoticeBar: Component<{ text: string; short?: string }> = (
  props,
) => (
  <div class="ms-section ms-inverted px-smd py-ssm text-center text-xs leading-snug text-copy-soft">
    <span class={props.short ? "hidden sm:inline" : ""}>{props.text}</span>
    <Show when={props.short}>
      <span class="sm:hidden">{props.short}</span>
    </Show>
  </div>
);

/**
 * Fixed action bar at the bottom on phones and tablets: call, mail, route.
 * The first link is the primary action.
 */
export const QuickBar: Component<{ links: QuickLink[] }> = (props) => (
  <nav
    aria-label="Schnellkontakt"
    class="ms-section ms-inverted lg:hidden fixed left-ssm right-ssm bottom-ssm z-30 grid auto-cols-fr grid-flow-col gap-[0.25rem] p-[0.375rem] rounded-[calc(var(--ms-radius)*1.5)] shadow-2xl"
  >
    <For each={props.links}>
      {(link, index) => (
        <a
          href={link.url}
          target={link.url.startsWith("http") ? "_blank" : undefined}
          rel={link.url.startsWith("http") ? "noopener" : undefined}
          class={`h-[3.25rem] flex items-center justify-center gap-ssm rounded-ms text-sm font-semibold ${index() === 0 ? "bg-button text-button-copy" : "text-copy-strong hover:bg-card"}`}
        >
          <Icon name={link.icon} class="w-[1.15rem] h-[1.15rem]" />
          {link.text}
        </a>
      )}
    </For>
  </nav>
);
