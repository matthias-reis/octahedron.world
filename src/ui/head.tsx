import { Meta, Title } from "@solidjs/meta";
import { type Component, For } from "solid-js";
import { getSite, type Site } from "~/site/context";
import { getSiteConfig } from "~/sites/config";

type IconLink = { rel: string; href: string; sizes?: string; type?: string };

/**
 * Per-site icon sets. Favicons are served by path, not by host, so the two
 * identities cannot share the root-level files — each gets its own folder
 * under `public/icons/`. Octahedron's legacy root-level files stay where they
 * are for anything still linking to them directly.
 */
const icons: Record<Site, IconLink[]> = {
  octahedron: [
    { rel: "icon", href: "/icons/octahedron/favicon.ico", sizes: "any" },
    {
      rel: "icon",
      href: "/icons/octahedron/favicon-32x32.png",
      type: "image/png",
      sizes: "32x32",
    },
    {
      rel: "apple-touch-icon",
      href: "/icons/octahedron/apple-touch-icon.png",
      sizes: "180x180",
    },
    { rel: "manifest", href: "/icons/octahedron/site.webmanifest" },
  ],
  mreis: [
    { rel: "icon", href: "/icons/mreis/favicon.ico", sizes: "any" },
    { rel: "icon", href: "/icons/mreis/favicon.svg", type: "image/svg+xml" },
    {
      rel: "icon",
      href: "/icons/mreis/favicon-96x96.png",
      type: "image/png",
      sizes: "96x96",
    },
    {
      rel: "apple-touch-icon",
      href: "/icons/mreis/apple-touch-icon.png",
      sizes: "180x180",
    },
    { rel: "manifest", href: "/icons/mreis/site.webmanifest" },
  ],
};

/**
 * The `<link rel="icon">` set for the requesting host.
 *
 * Rendered once into the document head rather than from `<Head>`: only a
 * handful of pages mount `<Head>`, and every page needs a favicon.
 */
export const SiteIcons: Component = () => (
  <For each={icons[getSite()]}>
    {(icon) => (
      <link
        rel={icon.rel}
        href={icon.href}
        sizes={icon.sizes}
        type={icon.type}
      />
    )}
  </For>
);

/**
 * Page metadata for both sites. Title suffix, fallback copy and the default
 * og:image come from the per-site config; everything else is per page.
 */
export const Head: Component<{
  title?: string;
  description?: string;
  /** Image reference — resolved through the site's image URL builder. */
  image?: string;
}> = (props) => {
  const config = getSiteConfig();
  const title = () => props.title ?? config.defaultTitle;
  const description = () => props.description ?? config.defaultDescription;
  const image = () => config.resolveImage(props.image ?? config.defaultImage);

  return (
    <>
      <Title>
        {title()}
        {config.titleSuffix}
      </Title>
      <Meta name="description" content={description()} />
      <Meta
        property="og:title"
        content={title() === config.defaultTitle ? config.brandTitle : title()}
      />
      <Meta property="og:description" content={description()} />
      <Meta property="og:image" content={image()} />
    </>
  );
};
