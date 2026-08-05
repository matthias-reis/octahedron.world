import { largeImageUrl } from "~/components/image-helpers";
import { getSite, type Site } from "~/site/context";

/**
 * Per-site metadata. This is the only place the shared UI layer is allowed to
 * differ between identities — everything visual goes through design tokens.
 */
export type SiteConfig = {
  /** Appended to every page title, separator included. */
  titleSuffix: string;
  /** Title used when a page does not supply one. */
  defaultTitle: string;
  /** og:title for the entry page, where the page title is just a greeting. */
  brandTitle: string;
  defaultDescription: string;
  /** Raw default image reference, run through `resolveImage`. */
  defaultImage: string;
  /** Turns an image reference from content into a URL. */
  resolveImage: (image: string) => string;
};

const configs: Record<Site, SiteConfig> = {
  octahedron: {
    titleSuffix: " | OCTAHEDRON ◆ WORLD",
    defaultTitle: "Welcome",
    brandTitle: "OCTAHEDRON ◆ WORLD",
    defaultDescription:
      "Ephemeral Thoughts about Life, the Universe and Everything...",
    defaultImage: "_home",
    resolveImage: largeImageUrl,
  },
  mreis: {
    titleSuffix: " - Matthias Reis",
    defaultTitle: "Engineering Lead & Software Architect",
    brandTitle: "Matthias Reis",
    defaultDescription:
      "Engineering Lead & Software Architect with over 20 years of experience building and evolving high-traffic large scale web platforms.",
    defaultImage: "/reference/matze.jpg",
    resolveImage: (image) => image,
  },
};

export function getSiteConfig(site: Site = getSite()): SiteConfig {
  return configs[site];
}
