import type { JSX } from "solid-js";

/**
 * Font pairings a microsite can pick by key. Each face must be declared in
 * `theme.css` (Fontsource @import) or already in app.css.
 */
export const fontPairings = {
  editorial: {
    display: '"Fraunces Variable", Georgia, serif',
    body: '"Inter Variable", system-ui, sans-serif',
  },
  geometric: {
    display: '"Space Grotesk Variable", system-ui, sans-serif',
    body: '"Inter Variable", system-ui, sans-serif',
  },
  classic: {
    display: '"DM Serif Display", Georgia, serif',
    body: '"DM Sans Variable", system-ui, sans-serif',
  },
  /** Sturdy, trustworthy trade: optical-size serif over a friendly sans. */
  craft: {
    display: '"Newsreader Variable", Georgia, serif',
    body: '"DM Sans Variable", system-ui, sans-serif',
    /** The h1 runs light; `**bold**` words inside it carry the emphasis. */
    h1Weight: 300,
  },
  /** Loud and direct, for trades: one grotesk, condensed and heavy on top. */
  industrial: {
    display: '"Archivo Variable", "Arial Narrow", sans-serif',
    body: '"Archivo Variable", system-ui, sans-serif',
    h1Weight: 850,
    headingWeight: 800,
    /** font-stretch for display type — Archivo runs 62–125 %. */
    displayStretch: "72%",
    /** Condensed faces need their spacing back: no tight tracking. */
    displayTracking: "0.005em",
    displayWordSpacing: "0.08em",
  },
  /** Northern, sober, trustworthy: an optical-size book serif over a crisp sans. */
  masonry: {
    display: '"Source Serif 4 Variable", Georgia, serif',
    body: '"Instrument Sans Variable", system-ui, sans-serif',
    h1Weight: 500,
    headingWeight: 600,
    displayTracking: "-0.015em",
  },
  /** One characterful grotesk for everything, narrow and heavy on top. */
  workshop: {
    display: '"Bricolage Grotesque Variable", "Arial Narrow", sans-serif',
    body: '"Bricolage Grotesque Variable", system-ui, sans-serif',
    h1Weight: 800,
    headingWeight: 750,
    displayStretch: "80%",
    displayTracking: "-0.01em",
  },
  /** Solid and geometric: a black display grotesk over its text cut. */
  solid: {
    display: '"Red Hat Display Variable", system-ui, sans-serif',
    body: '"Red Hat Text Variable", system-ui, sans-serif',
    h1Weight: 900,
    headingWeight: 800,
    displayTracking: "-0.03em",
  },
} as const;

export type FontPairing = keyof typeof fontPairings;

export const paletteNames = [
  "main",
  "adjacent-left",
  "adjacent-right",
  "accent-left",
  "accent-right",
  "complementary",
] as const;

export type PaletteName = (typeof paletteNames)[number];

export const colorGroups = ["copy", "background", "button"] as const;

export type ColorGroup = (typeof colorGroups)[number];

/**
 * Which palette each color group points at. Unset groups keep the defaults
 * from theme.css (copy + background → accent-left, button → main).
 */
export type ColorAssignment = Partial<Record<ColorGroup, PaletteName>>;

/** The `theme` key of a microsite's global scope — every knob is optional. */
export type MicrositeTheme = {
  /** Base hue, 0–360; all six palettes derive from it. */
  hue?: number;
  /** Corner radius in rem. */
  radius?: number;
  fonts?: FontPairing;
  /** Page-wide group assignment. */
  colors?: ColorAssignment;
};

function num(value: unknown): number | undefined {
  return typeof value === "number" && Number.isFinite(value)
    ? value
    : undefined;
}

/** Maps the page's theme knobs to the inline custom properties on `.ms-root`. */
export function themeStyle(
  theme: MicrositeTheme | undefined,
): JSX.CSSProperties {
  const style: JSX.CSSProperties = {};
  if (!theme) return style;

  const hue = num(theme.hue);
  const radius = num(theme.radius);

  if (hue !== undefined) style["--ms-hue"] = String(hue);
  if (radius !== undefined) style["--ms-radius"] = `${radius}rem`;

  const fonts = theme.fonts && fontPairings[theme.fonts];
  if (fonts) {
    style["--ms-font-display"] = fonts.display;
    style["--ms-font-body"] = fonts.body;
    if ("h1Weight" in fonts) style["--ms-h1-weight"] = String(fonts.h1Weight);
    if ("headingWeight" in fonts)
      style["--ms-heading-weight"] = String(fonts.headingWeight);
    if ("displayStretch" in fonts)
      style["--ms-display-stretch"] = fonts.displayStretch;
    if ("displayTracking" in fonts)
      style["--ms-display-tracking"] = fonts.displayTracking;
    if ("displayWordSpacing" in fonts)
      style["--ms-display-word-spacing"] = fonts.displayWordSpacing;
  }

  return style;
}

/**
 * `.ms-<group>-<palette>` classes for a group assignment — used on
 * `.ms-root` for the page and on a section for a section override.
 * Unknown groups or palettes are ignored.
 */
export function colorClasses(colors: unknown): string[] {
  if (typeof colors !== "object" || colors === null) return [];
  const assignment = colors as Record<string, unknown>;
  return colorGroups.flatMap((group) => {
    const palette = assignment[group];
    return paletteNames.includes(palette as PaletteName)
      ? [`ms-${group}-${palette}`]
      : [];
  });
}
