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
    defaultTitle: "Digital infrastructure for events and communities",
    brandTitle: "Matthias Reis",
    defaultDescription:
      "Co-founder and CTO of commonspace. 20 years of building large web platforms, eleven of them at XING. Articles on architecture, AI-assisted engineering and the software behind events.",
    defaultImage: "/reference/matze.jpg",
    resolveImage: (image) => image,
  },
  // Microsites set their own title and meta; this only covers the overview
  // and login pages.
  seiten: {
    titleSuffix: " – Seiten",
    defaultTitle: "Konzeptvorschauen",
    brandTitle: "Seiten",
    defaultDescription: "Konzeptvorschauen von Matthias Reis.",
    defaultImage: "/reference/matze.jpg",
    resolveImage: (image) => image,
  },
};

export function getSiteConfig(site: Site = getSite()): SiteConfig {
  return configs[site];
}
