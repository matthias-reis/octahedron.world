import { Meta, Title } from "@solidjs/meta";
import type { HastParseResult } from "hast-mds";
import { For, type JSX, Show } from "solid-js";
import { transform } from "solid-mds";
import { micrositeComponents } from "./blocks";
import { type Brand, type NavItem, SiteFooter, SiteHeader } from "./chrome";
import { type MicrositeTheme, themeStyle } from "./theme";
import { Section, toVariant } from "./ui";
import "./theme.css";

type MicrositeGlobal = {
  title: string;
  description?: string;
  brand?: Partial<Brand>;
  theme?: MicrositeTheme;
  legal?: string[];
};

type MicrositeLocal = {
  /** Header label; a section without one stays out of the nav. */
  nav?: string;
  variant?: string;
  /** `hero` gives the section display-size type and extra air. */
  layout?: string;
};

/**
 * One-pager for a small business, registered for `type: microsite` and served
 * under mreis.me/p/*. Standalone: no site shell, its own header and footer,
 * and a per-page palette + font pairing from the `theme` knobs.
 *
 * Every `+++step` is a page section; see `blocks.tsx` for the custom blocks.
 */
export default function MicrositeRenderer(props: {
  mds: HastParseResult;
}): JSX.Element {
  const parsed = transform<MicrositeGlobal, MicrositeLocal>(
    props.mds as HastParseResult<MicrositeGlobal, MicrositeLocal>,
    micrositeComponents,
  );
  const global = parsed.global;
  const brand: Brand = {
    name: global?.brand?.name ?? global?.title ?? "",
    mark: global?.brand?.mark,
    tagline: global?.brand?.tagline,
  };
  const sections = Object.values(parsed.steps);
  const nav: NavItem[] = sections.flatMap((s) =>
    typeof s.local.nav === "string" ? [{ id: s.id, label: s.local.nav }] : [],
  );

  return (
    <div
      id="top"
      class="ms-root min-h-screen"
      style={themeStyle(global?.theme)}
    >
      <Title>{brand.name}</Title>
      <Show when={global?.description}>
        {(d) => <Meta name="description" content={d()} />}
      </Show>

      <SiteHeader brand={brand} nav={nav} />
      <main>
        <For each={sections}>
          {(section) => (
            <Section
              id={section.id}
              variant={toVariant(section.local.variant)}
              hero={section.local.layout === "hero"}
              label={section.local.nav}
            >
              <section.Body />
            </Section>
          )}
        </For>
      </main>
      <SiteFooter brand={brand} legal={global?.legal ?? []} />
    </div>
  );
}
