import { Meta, Title } from "@solidjs/meta";
import type { HastParseResult } from "hast-mds";
import { For, type JSX, Show } from "solid-js";
import { transform } from "solid-mds";
import { absoluteUrl, assetUrl, PageContext } from "./assets";
import { Backdrop, type BackdropData } from "./backdrop";
import { micrositeComponents } from "./blocks";
import {
  type Brand,
  type FooterOptions,
  type HeaderActions,
  type NavItem,
  NoticeBar,
  QuickBar,
  type QuickLink,
  SiteFooter,
  SiteHeader,
} from "./chrome";
import { HeroVisual, type HeroVisualData } from "./hero-visual";
import { patternMask } from "./patterns";
import {
  type ColorAssignment,
  colorClasses,
  type MicrositeTheme,
  themeStyle,
} from "./theme";
import { isIconName, type Kicker, Section, toLayout, toVariant } from "./ui";
import "./theme.css";

type MicrositeGlobal = {
  slug: string;
  title: string;
  description?: string;
  /** Sharing card. `image` is a JPEG next to the page (`pnpm ms-image … --og`). */
  og?: { title?: string; description?: string; image?: string };
  brand?: Partial<Brand>;
  theme?: MicrositeTheme;
  legal?: string[];
  language?: "de" | "en";
  /** Keep search engines out, e.g. for a concept preview of a real business. */
  noindex?: boolean;
  /** Thin strip above the header. */
  notice?: { text: string; short?: string };
  header?: HeaderActions;
  footer?: FooterOptions;
  /** Fixed action bar on phones: `[{ icon, text, url }]`, first = primary. */
  quickbar?: QuickLink[];
};

type MicrositeLocal = {
  /** Header label; a section without one stays out of the nav. */
  nav?: string;
  variant?: string;
  /** Section-level group override, e.g. `{ copy: main }`. */
  colors?: ColorAssignment;
  /** `hero` · `split` · `side` · `band`, see `SectionLayout` in ui.tsx. */
  layout?: string;
  /** Small label above the headline: a string, or `{ text, icon, tone }`. */
  kicker?: string | { text?: string; icon?: string; tone?: string };
  /** Subtle repeating motif behind the section, see `patterns.ts`. */
  pattern?: string;
  /** Hero image column (layout: hero), see hero-visual.tsx. */
  visual?: HeroVisualData;
  /** Full-bleed background image, see backdrop.tsx. */
  backdrop?: BackdropData;
};

function toKicker(value: MicrositeLocal["kicker"]): Kicker | undefined {
  if (typeof value === "string") return { text: value };
  if (value?.text)
    return {
      text: value.text,
      icon: isIconName(value.icon) ? value.icon : undefined,
      tone: value.tone === "copy" ? "copy" : undefined,
    };
  return undefined;
}

/**
 * One-pager for a small business, registered for `type: microsite` and served
 * under mreis.me/p/*. Standalone: no site shell, its own header and footer,
 * and a per-page palette + font pairing from the `theme` knobs.
 *
 * Every `+++step` is a page section; see `blocks.tsx` for the custom blocks.
 */
export default function MicrositeRenderer(props: {
  mds: HastParseResult;
  /** The `?k=` code that opened the page, carried into asset URLs. */
  accessCode?: string;
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
    logo: global?.brand?.logo,
    sub: global?.brand?.sub,
  };
  const slug = global?.slug ?? "";
  const ogTitle = global?.og?.title ?? global?.title ?? brand.name;
  const ogDescription = global?.og?.description ?? global?.description;
  const code = props.accessCode;
  const ogImage = global?.og?.image && assetUrl(slug, global.og.image, code);
  const sections = Object.values(parsed.steps);
  const quickbar = (global?.quickbar ?? []).filter((l) => isIconName(l.icon));
  const nav: NavItem[] = sections.flatMap((s) =>
    typeof s.local.nav === "string" ? [{ id: s.id, label: s.local.nav }] : [],
  );

  return (
    <div
      id="top"
      lang={global?.language ?? "de"}
      class={[
        "ms-root min-h-screen",
        ...colorClasses(global?.theme?.colors),
      ].join(" ")}
      style={themeStyle(global?.theme)}
    >
      <Title>{global?.title ?? brand.name}</Title>
      <Show when={global?.description}>
        {(d) => <Meta name="description" content={d()} />}
      </Show>
      <Show when={global?.noindex}>
        <Meta name="robots" content="noindex,nofollow" />
      </Show>
      <Meta property="og:type" content="website" />
      <Meta property="og:site_name" content={brand.name} />
      <Meta
        property="og:locale"
        content={global?.language === "en" ? "en_US" : "de_DE"}
      />
      {/* With the code: Facebook/LinkedIn re-fetch og:url for the preview. */}
      <Meta
        property="og:url"
        content={absoluteUrl(
          `/${slug}${code ? `?k=${encodeURIComponent(code)}` : ""}`,
        )}
      />
      <Meta property="og:title" content={ogTitle} />
      <Show when={ogDescription}>
        {(d) => <Meta property="og:description" content={d()} />}
      </Show>
      <Show when={ogImage}>
        {(url) => (
          <>
            <Meta property="og:image" content={absoluteUrl(url())} />
            <Meta property="og:image:width" content="1200" />
            <Meta property="og:image:height" content="630" />
            <Meta name="twitter:card" content="summary_large_image" />
          </>
        )}
      </Show>

      <PageContext.Provider value={{ slug, code }}>
        <Show when={global?.notice}>
          {(notice) => (
            <NoticeBar
              text={notice().text}
              short={notice().short}
              colors={global?.footer?.colors}
            />
          )}
        </Show>
        <SiteHeader brand={brand} nav={nav} actions={global?.header} />
        <main>
          <For each={sections}>
            {(section) => (
              <Section
                id={section.id}
                variant={toVariant(section.local.variant)}
                layout={toLayout(section.local.layout)}
                label={section.local.nav}
                kicker={toKicker(section.local.kicker)}
                visual={
                  section.local.visual ? (
                    <HeroVisual visual={section.local.visual} />
                  ) : undefined
                }
                backdrop={
                  section.local.backdrop ? (
                    <Backdrop backdrop={section.local.backdrop} />
                  ) : undefined
                }
                colors={colorClasses(section.local.colors)}
                pattern={patternMask(section.local.pattern)}
                backdropStyle={
                  section.local.backdrop?.style === "cover" ? "cover" : "panel"
                }
                visualStyle={
                  section.local.visual?.style === "bleed" ? "bleed" : "card"
                }
              >
                <section.Body />
              </Section>
            )}
          </For>
        </main>
        <SiteFooter
          brand={brand}
          legal={global?.legal ?? []}
          options={global?.footer}
          quickbar={quickbar.length > 0}
        />
        <Show when={quickbar.length > 0}>
          <QuickBar links={quickbar} colors={global?.footer?.colors} />
        </Show>
      </PageContext.Provider>
    </div>
  );
}
