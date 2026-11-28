/**
 * octahedron's colour space: a page's `colorSpace` → the 54 `c*` palette
 * tokens as sRGB hex.
 *
 * - `colorSpace` is either a preset name (`carmine`, `sky`, …) or a hue
 *   string: `170+` / `170-` = main hue 170, counter hue 170 ± 137.5 (the
 *   golden angle). Anything else — typos included — falls back to petrol.
 * - Tokens: `c{a|b}{s|d|n}{1–9}` — hue `a` (main) or `b` (counter),
 *   chroma saturated / desaturated / neutral, lightness 1 (bright) to 9 (dark).
 * - Colours are fitted into sRGB here, not by the browser: a token outside
 *   sRGB loses chroma (binary search) while lightness and hue stay fixed.
 *   Browsers clip per channel instead, which shifts the hue. CSS receives
 *   finished hex values and never computes a colour itself, so the hex on
 *   `/color` is exactly what renders — on P3 screens too.
 */

export const GOLDEN_ANGLE = 137.5;

/** Lightness per step, 1 = bright … 9 = dark (OKLCH L). */
export const LIGHTNESS = [
  0.97, 0.9, 0.8, 0.7, 0.6, 0.5, 0.3, 0.2, 0.12,
] as const;

/** Chroma per level (OKLCH C, before fitting into sRGB). */
export const CHROMA = { s: 0.21, d: 0.095, n: 0.02 } as const;

export type ChromaLevel = keyof typeof CHROMA;
export type HueSlot = "a" | "b";
export type Step = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
export type Token = `c${HueSlot}${ChromaLevel}${Step}`;

export const HUE_SLOTS: readonly HueSlot[] = ["a", "b"];
export const CHROMA_LEVELS: readonly ChromaLevel[] = ["s", "d", "n"];
export const STEPS: readonly Step[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export const TOKENS: readonly Token[] = HUE_SLOTS.flatMap((h) =>
  CHROMA_LEVELS.flatMap((c) => STEPS.map((s): Token => `c${h}${c}${s}`)),
);

/** The hand-picked pairs octahedron shipped with: [main, counter]. */
export const PRESETS = {
  petrol: [195, 15],
  berry: [350, 200],
  carmine: [15, 170],
  sky: [240, 50],
  wood: [155, 20],
  tangerine: [40, 180],
  lemon: [100, 300],
  pcsc: [350, 260],
  "pcsc-one": [260, 350],
} as const satisfies Record<string, readonly [number, number]>;

export type PresetName = keyof typeof PRESETS;
export const DEFAULT_PRESET: PresetName = "petrol";

export interface HuePair {
  a: number;
  b: number;
  /** The preset the pair came from, if any. */
  preset?: PresetName;
}

const HUE_STRING = /^(\d+(?:\.\d+)?)([+-])$/;

export const wrapHue = (h: number): number => ((h % 360) + 360) % 360;

const isPreset = (value: string): value is PresetName =>
  Object.hasOwn(PRESETS, value);

/** `170+` → { a: 170, b: 307.5 }; a preset → its pair; anything else → petrol. */
export function parseColorSpace(value: string | undefined | null): HuePair {
  const v = (value ?? "").trim();
  const m = HUE_STRING.exec(v);
  if (m) {
    const a = wrapHue(Number(m[1]));
    const b = wrapHue(a + (m[2] === "+" ? GOLDEN_ANGLE : -GOLDEN_ANGLE));
    return { a, b };
  }
  const name = isPreset(v) ? v : DEFAULT_PRESET;
  const [a, b] = PRESETS[name];
  return { a, b, preset: name };
}

/** The `colorSpace` string for a main hue and a direction. */
export const hueString = (hue: number, direction: "+" | "-"): string =>
  `${Math.round(wrapHue(hue) * 10) / 10}${direction}`;

// --- OKLCH ↔ sRGB -----------------------------------------------------------

type Rgb = [number, number, number];

function oklchToLinearRgb(l: number, c: number, h: number): Rgb {
  const rad = (h * Math.PI) / 180;
  const a = c * Math.cos(rad);
  const b = c * Math.sin(rad);
  const l_ = (l + 0.3963377774 * a + 0.2158037573 * b) ** 3;
  const m_ = (l - 0.1055613458 * a - 0.0638541728 * b) ** 3;
  const s_ = (l - 0.0894841775 * a - 1.291485548 * b) ** 3;
  return [
    4.0767416621 * l_ - 3.3077115913 * m_ + 0.2309699292 * s_,
    -1.2684380046 * l_ + 2.6097574011 * m_ - 0.3413193965 * s_,
    -0.0041960863 * l_ - 0.7034186147 * m_ + 1.707614701 * s_,
  ];
}

const EPS = 1e-6;
const inGamut = (rgb: Rgb) => rgb.every((x) => x >= -EPS && x <= 1 + EPS);

const toGamma = (x: number) =>
  x <= 0.0031308 ? 12.92 * x : 1.055 * x ** (1 / 2.4) - 0.055;
const toLinear = (x: number) =>
  x <= 0.04045 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4;

const clamp01 = (x: number) => Math.min(1, Math.max(0, x));

/** The largest chroma ≤ `c` that keeps (l, h) inside sRGB. */
export function fitChroma(l: number, c: number, h: number): number {
  if (inGamut(oklchToLinearRgb(l, c, h))) return c;
  let lo = 0;
  let hi = c;
  for (let i = 0; i < 24; i++) {
    const mid = (lo + hi) / 2;
    if (inGamut(oklchToLinearRgb(l, mid, h))) lo = mid;
    else hi = mid;
  }
  return lo;
}

export interface Swatch {
  hex: string;
  rgb: Rgb;
  /** OKLCH after fitting: `c` may be below the requested chroma. */
  l: number;
  c: number;
  h: number;
}

/** An OKLCH colour fitted into sRGB. */
export function swatch(l: number, c: number, h: number): Swatch {
  const fitted = fitChroma(l, c, h);
  const rgb = oklchToLinearRgb(l, fitted, h).map((x) =>
    Math.round(clamp01(toGamma(x)) * 255),
  ) as Rgb;
  const hex = `#${rgb.map((x) => x.toString(16).padStart(2, "0")).join("")}`;
  return { hex, rgb, l, c: fitted, h };
}

/** A hex colour's OKLCH, e.g. to take a hue from a picked colour. */
export function hexToOklch(
  hex: string,
): { l: number; c: number; h: number } | null {
  const m = /^#?([0-9a-f]{6}|[0-9a-f]{3})$/i.exec(hex.trim());
  if (!m) return null;
  const digits =
    m[1].length === 3 ? [...m[1]].map((d) => d + d).join("") : m[1];
  const [r, g, b] = [0, 2, 4].map((i) =>
    toLinear(Number.parseInt(digits.slice(i, i + 2), 16) / 255),
  );
  const l_ = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b);
  const m_ = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b);
  const s_ = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b);
  const L = 0.2104542553 * l_ + 0.793617785 * m_ - 0.0040720468 * s_;
  const A = 1.9779984951 * l_ - 2.428592205 * m_ + 0.4505937099 * s_;
  const B = 0.0259040371 * l_ + 0.7827717662 * m_ - 0.808675766 * s_;
  return {
    l: L,
    c: Math.hypot(A, B),
    h: wrapHue((Math.atan2(B, A) * 180) / Math.PI),
  };
}

// --- The palette ------------------------------------------------------------

export type Palette = Record<Token, Swatch>;

export function palette({ a, b }: { a: number; b: number }): Palette {
  const hues = { a, b };
  const out = {} as Palette;
  for (const slot of HUE_SLOTS)
    for (const level of CHROMA_LEVELS)
      for (const step of STEPS)
        out[`c${slot}${level}${step}`] = swatch(
          LIGHTNESS[step - 1],
          CHROMA[level],
          hues[slot],
        );
  return out;
}

const cache = new Map<string, Record<string, string>>();

/**
 * The inline style that themes a subtree: one `--p-<token>` custom property
 * per palette token. `app.css` maps `--color-<token>` onto these.
 */
export function colorSpaceStyle(
  value: string | undefined | null,
): Record<string, string> {
  const key = (value ?? "").trim();
  const hit = cache.get(key);
  if (hit) return hit;
  const p = palette(parseColorSpace(key));
  const style: Record<string, string> = {};
  for (const t of TOKENS) style[`--p-${t}`] = p[t].hex;
  cache.set(key, style);
  return style;
}
