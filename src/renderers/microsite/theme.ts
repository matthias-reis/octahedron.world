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
} as const;

export type FontPairing = keyof typeof fontPairings;

/** The `theme` key of a microsite's global scope — every knob is optional. */
export type MicrositeTheme = {
  /** Primary hue, 0–360. */
  hue?: number;
  /** Accent hue; defaults to the complement of `hue`. */
  accentHue?: number;
  /** Hue the near-greys are tinted with; defaults to `hue`. */
  neutralHue?: number;
  /** Peak chroma of the primary/accent ramps, ~0.04 (muted) – 0.25 (loud). */
  chroma?: number;
  /** Chroma of the neutral ramp; 0 = pure grey. */
  neutralChroma?: number;
  /** Corner radius in rem. */
  radius?: number;
  fonts?: FontPairing;
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
  const accentHue = num(theme.accentHue);
  const neutralHue = num(theme.neutralHue);
  const chroma = num(theme.chroma);
  const neutralChroma = num(theme.neutralChroma);
  const radius = num(theme.radius);

  if (hue !== undefined) style["--ms-hue"] = String(hue);
  if (accentHue !== undefined) style["--ms-hue-accent"] = String(accentHue);
  if (neutralHue !== undefined) style["--ms-hue-neutral"] = String(neutralHue);
  if (chroma !== undefined) style["--ms-chroma"] = String(chroma);
  if (neutralChroma !== undefined)
    style["--ms-neutral-chroma"] = String(neutralChroma);
  if (radius !== undefined) style["--ms-radius"] = `${radius}rem`;

  const fonts = theme.fonts && fontPairings[theme.fonts];
  if (fonts) {
    style["--ms-font-display"] = fonts.display;
    style["--ms-font-body"] = fonts.body;
  }

  return style;
}
