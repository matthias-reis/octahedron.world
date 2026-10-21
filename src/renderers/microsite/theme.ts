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
  /** Hanseatic and direct: a newspaper grotesk, heavy on top, over a round sans. */
  hanse: {
    display: '"Schibsted Grotesk Variable", system-ui, sans-serif',
    body: '"Figtree Variable", system-ui, sans-serif',
    h1Weight: 800,
    headingWeight: 750,
    displayTracking: "-0.02em",
  },
  /** Showroom calm: a single-weight display serif over a clear geometric sans. */
  studio: {
    display: '"Instrument Serif", Georgia, serif',
    body: '"Plus Jakarta Sans Variable", system-ui, sans-serif',
    /** Instrument Serif has one weight: never let the browser fake bold. */
    h1Weight: 400,
    headingWeight: 400,
    displayTracking: "-0.01em",
  },
  /** Engineering: a wide technical display face over a plain grotesk. */
  technik: {
    display: '"Sora Variable", system-ui, sans-serif',
    body: '"IBM Plex Sans Variable", system-ui, sans-serif',
    h1Weight: 700,
    headingWeight: 650,
    displayTracking: "-0.035em",
  },
  /** Poster type: a tall condensed headline face over a sturdy sans. */
  poster: {
    display: 'Anton, "Arial Narrow", sans-serif',
    body: '"Work Sans Variable", system-ui, sans-serif',
    /** Anton has one weight. */
    h1Weight: 400,
    headingWeight: 400,
    displayTracking: "0.01em",
    displayWordSpacing: "0.04em",
  },
  /** Black geometric: one rounded-geometric family, black (900) and in capitals on top. */
  monolith: {
    display: '"Outfit Variable", system-ui, sans-serif',
    body: '"Outfit Variable", system-ui, sans-serif',
    h1Weight: 900,
    headingWeight: 900,
    /** Capitals need air: open tracking instead of the tight default. */
    displayTracking: "0.01em",
    /** h1 and h2 run in capitals; h3 and body keep their case. */
    displayTransform: "uppercase",
  },
  /** Standard and orderly, after DIN: a semi-condensed engineering grotesk over its text cut. */
  norm: {
    display: '"Barlow Semi Condensed", "Arial Narrow", sans-serif',
    body: "Barlow, system-ui, sans-serif",
    h1Weight: 700,
    headingWeight: 700,
    displayTracking: "-0.005em",
  },
  /** Rooted and clear: a warm mid-century serif over a plain modern sans. */
  quelle: {
    display: '"Young Serif", Georgia, serif',
    body: '"Onest Variable", system-ui, sans-serif',
    /** Young Serif has one weight: never let the browser fake bold. */
    h1Weight: 400,
    headingWeight: 400,
    displayTracking: "-0.01em",
  },
  /** Lapidary and calm: a flared-serif capital face over a quiet humanist sans. */
  lapidar: {
    display: "Marcellus, Georgia, serif",
    body: '"Source Sans 3 Variable", system-ui, sans-serif',
    /** Marcellus has one weight: never let the browser fake bold. */
    h1Weight: 400,
    headingWeight: 400,
    displayTracking: "0.005em",
  },
  /** Brush stroke: a wide, heavy italic grotesk on top (like a painted sign) over a crisp sans. */
  schwung: {
    display: '"Archivo Variable", "Arial Black", sans-serif',
    body: '"Instrument Sans Variable", system-ui, sans-serif',
    h1Weight: 850,
    headingWeight: 800,
    /** Archivo runs 62–125 % wide; the sign-writer's extended cut. */
    displayStretch: "118%",
    displayTracking: "-0.02em",
    /** h1 and h2 slant like the wordmark; h3 and body stay upright. */
    displayStyle: "italic",
  },
  /** Painter's hand: a round, sturdy sans for everything, plus a brush script
   * (`hand`) for the few headlines set with `headline: hand` and `callout.face: hand`. */
  pinsel: {
    display: '"Figtree Variable", system-ui, sans-serif',
    body: '"Figtree Variable", system-ui, sans-serif',
    hand: '"Caveat Brush", "Comic Sans MS", cursive',
    h1Weight: 800,
    headingWeight: 800,
    displayTracking: "-0.025em",
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

/**
 * Palettes a color group can point at: the six hue palettes plus `signal`,
 * built from the page's own brand color (`theme.signal`) and a dark ink
 * instead of from the hue — for a brand color the hue ladder can't reach
 * (a true yellow, a signal red).
 */
export const groupPalettes = [...paletteNames, "signal"] as const;

export type GroupPalette = (typeof groupPalettes)[number];

export const colorGroups = ["copy", "background", "button"] as const;

export type ColorGroup = (typeof colorGroups)[number];

/**
 * Which palette each color group points at. Unset groups keep the defaults
 * from theme.css (copy + background → accent-left, button → main).
 */
export type ColorAssignment = Partial<Record<ColorGroup, GroupPalette>>;

/** The `theme` key of a microsite's global scope — every knob is optional. */
export type MicrositeTheme = {
  /** Base hue, 0–360; all six palettes derive from it. */
  hue?: number;
  /** Corner radius in rem. */
  radius?: number;
  fonts?: FontPairing;
  /** Page-wide group assignment. */
  colors?: ColorAssignment;
  /** Brand color for the `signal` palette, as hex (`#efb814`). */
  signal?: string;
  /** Inverted sections on d1 (1, near black), d2 (2) or the full-chroma
   * mid shade m2 (`vivid`) instead of d3. */
  depth?: number | "vivid";
  /** A small mark in front of every h1/h2, e.g. the square of a logo. */
  ornament?: Ornament;
  /** Button background shade: `m3` (desaturated mid) instead of the default m2. */
  buttonShade?: "m3";
};

/** `ms-button-shade-m3` for `buttonShade: m3`, else nothing. */
export function buttonShadeClass(shade: unknown): string | undefined {
  return shade === "m3" ? "ms-button-shade-m3" : undefined;
}

/** `ms-depth-<n>` for a valid depth (1, 2 or `vivid`), else nothing. */
export function depthClass(depth: unknown): string | undefined {
  return depth === 1 || depth === 2 || depth === "vivid"
    ? `ms-depth-${depth}`
    : undefined;
}

/**
 * Headline ornament: `{ shape: square, color: signal }` page-wide; a section
 * re-colors it with `ornament: { color: main }` or drops it with
 * `ornament: none`. The color is a palette's m1 shade (the full brand tone
 * for `signal`).
 */
export type Ornament = { shape?: "square"; color?: GroupPalette } | "none";

function isPalette(value: unknown): value is GroupPalette {
  return groupPalettes.includes(value as GroupPalette);
}

/** `ms-ornament-square` on the root when the page sets a square ornament. */
export function ornamentClass(ornament: unknown): string | undefined {
  return typeof ornament === "object" &&
    ornament !== null &&
    (ornament as { shape?: unknown }).shape === "square"
    ? "ms-ornament-square"
    : undefined;
}

/** The ornament color (and `none`) as inline custom properties. */
export function ornamentStyle(ornament: unknown): JSX.CSSProperties {
  if (ornament === "none") return { "--ms-ornament-display": "none" };
  if (typeof ornament !== "object" || ornament === null) return {};
  const color = (ornament as { color?: unknown }).color;
  return isPalette(color) ? { "--ms-ornament": `var(--ms-${color}-m1)` } : {};
}

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
  if (
    typeof theme.signal === "string" &&
    /^#[0-9a-f]{3,8}$/i.test(theme.signal)
  )
    style["--ms-signal"] = theme.signal;

  Object.assign(style, ornamentStyle(theme.ornament));

  const fonts = theme.fonts && fontPairings[theme.fonts];
  if (fonts) {
    style["--ms-font-display"] = fonts.display;
    style["--ms-font-body"] = fonts.body;
    if ("hand" in fonts) style["--ms-font-hand"] = fonts.hand;
    if ("h1Weight" in fonts) style["--ms-h1-weight"] = String(fonts.h1Weight);
    if ("headingWeight" in fonts)
      style["--ms-heading-weight"] = String(fonts.headingWeight);
    if ("displayStretch" in fonts)
      style["--ms-display-stretch"] = fonts.displayStretch;
    if ("displayTracking" in fonts)
      style["--ms-display-tracking"] = fonts.displayTracking;
    if ("displayWordSpacing" in fonts)
      style["--ms-display-word-spacing"] = fonts.displayWordSpacing;
    if ("displayTransform" in fonts)
      style["--ms-display-transform"] = fonts.displayTransform;
    if ("displayStyle" in fonts)
      style["--ms-display-style"] = fonts.displayStyle;
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
    return groupPalettes.includes(palette as GroupPalette)
      ? [`ms-${group}-${palette}`]
      : [];
  });
}
