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
  /** Sign-painter's capitals: a wide geometric face, black (900), in open-tracked
   * capitals on top — like a painter's wordmark — over a humanist text sans;
   * the paragraph under each h2 runs a size up, so short headlines can carry
   * the longer text right below them (018-meyer). */
  meister: {
    display: '"Montserrat Variable", "Arial Black", sans-serif',
    body: '"Source Sans 3 Variable", system-ui, sans-serif',
    h1Weight: 900,
    headingWeight: 900,
    displayTracking: "0.045em",
    displayTransform: "uppercase",
    /** font-size of the first paragraph after an h2 (the hero keeps its own). */
    leadSize: "1.2rem",
  },
  /** Carpenter's sign: a heavy condensed grotesk on top, like a timber firm's
   * painted wordmark, over a warm book serif for the long copy (019-herbst). */
  fachwerk: {
    display: '"Roboto Condensed Variable", "Arial Narrow", sans-serif',
    body: '"Lora Variable", Georgia, serif',
    h1Weight: 850,
    headingWeight: 800,
    /** Condensed faces need their spacing back: no tight tracking. */
    displayTracking: "-0.005em",
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
  /** Buttons in a brand color (hex) instead of the button group — outside
   * the approved combinations, only on request. */
  buttonColor?: string;
  /** Copy color (hex) on `buttonColor` buttons, for a light brand color (a
   * lemon yellow): ink copy, a darker edge and a soft shadow instead of
   * white copy (019-herbst). */
  buttonInk?: string;
  /** Chroma scale for the near-neutral shades (b1–b3, m3, d1, d2), 0–1:
   * `0.3` greys the page further than the default. */
  neutrals?: number;
};

/** `ms-button-shade-m3` for `buttonShade: m3`, else nothing. */
export function buttonShadeClass(shade: unknown): string | undefined {
  return shade === "m3" ? "ms-button-shade-m3" : undefined;
}

/** `ms-lead` when the page's font pairing sets a lead size (`leadSize`). */
export function leadClass(fonts: unknown): string | undefined {
  const pairing = fontPairings[fonts as FontPairing];
  return pairing && "leadSize" in pairing ? "ms-lead" : undefined;
}

const hex = (value: unknown): value is string =>
  typeof value === "string" && /^#[0-9a-f]{3,8}$/i.test(value);

/** `ms-button-brand` when the page sets a hex `buttonColor`, plus
 * `ms-button-ink` when it also sets a hex `buttonInk`. */
export function buttonBrandClass(
  color: unknown,
  ink?: unknown,
): string | undefined {
  if (!hex(color)) return undefined;
  return hex(ink) ? "ms-button-brand ms-button-ink" : "ms-button-brand";
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
 * for `signal`), or a named shade (`accent-left-m2`).
 *
 * `{ shape: stripes, colors: [accent-left-m2, signal, main] }` sets three
 * short slanted bands, top to bottom, like the three brush strokes of a
 * painter's logo, and repeats them as a band under the header and over the
 * footer (018-meyer).
 *
 * `{ shape: fachwerk, color: adjacent-left-d3 }` sets one timber-frame panel
 * — a framed square with a St Andrew's cross — for a carpenter (019-herbst).
 */
export type Ornament =
  | {
      shape?: "square" | "stripes" | "fachwerk";
      color?: string;
      colors?: string[];
    }
  | "none";

const ornamentShapes = ["square", "stripes", "fachwerk"] as const;

/** `var(--ms-<palette>-<shade>)` for `main` or `main-m2`, the button color
 * for `button`, else undefined. */
function shadeVar(value: unknown): string | undefined {
  if (value === "button") return "var(--ms-button)";
  if (typeof value !== "string") return undefined;
  const match = /^(.+?)(?:-([bmd][123]))?$/.exec(value);
  if (!match || !isPalette(match[1])) return undefined;
  return `var(--ms-${match[1]}-${match[2] ?? "m1"})`;
}

function isPalette(value: unknown): value is GroupPalette {
  return groupPalettes.includes(value as GroupPalette);
}

/** `ms-ornament-<shape>` on the root when the page sets an ornament. */
export function ornamentClass(ornament: unknown): string | undefined {
  if (typeof ornament !== "object" || ornament === null) return undefined;
  const shape = (ornament as { shape?: unknown }).shape;
  return ornamentShapes.includes(shape as (typeof ornamentShapes)[number])
    ? `ms-ornament-${shape}`
    : undefined;
}

/** The ornament color(s) (and `none`) as inline custom properties. */
export function ornamentStyle(ornament: unknown): JSX.CSSProperties {
  if (ornament === "none") return { "--ms-ornament-display": "none" };
  if (typeof ornament !== "object" || ornament === null) return {};
  const { color, colors } = ornament as { color?: unknown; colors?: unknown };
  const style: JSX.CSSProperties = {};
  const list = Array.isArray(colors) ? colors.slice(0, 3) : [color];
  const keys = ["--ms-ornament", "--ms-ornament-2", "--ms-ornament-3"] as const;
  list.forEach((value, i) => {
    const css = shadeVar(value);
    if (css) style[keys[i]] = css;
  });
  return style;
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
  if (hex(theme.signal)) style["--ms-signal"] = theme.signal;
  if (hex(theme.buttonColor)) style["--ms-button-brand"] = theme.buttonColor;
  if (hex(theme.buttonInk)) style["--ms-button-ink"] = theme.buttonInk;
  const neutrals = num(theme.neutrals);
  if (neutrals !== undefined && neutrals >= 0 && neutrals <= 1)
    style["--ms-neutrals"] = String(neutrals);

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
    if ("leadSize" in fonts) style["--ms-lead-size"] = fonts.leadSize;
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
