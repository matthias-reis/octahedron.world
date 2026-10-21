import type { JSX } from "solid-js";

/**
 * Repeating motifs a section can set behind its content:
 *
 * ```yaml @
 * pattern: roof
 * ```
 *
 * Each is one SVG tile, used as a CSS mask over a layer in the section's
 * text color (`bg-copy-strong`, low opacity — see `Section` in ui.tsx), so it
 * follows the section's variant and color groups without any color of its
 * own. The mask fades out towards the bottom so it never fights the copy.
 */
const tiles = {
  /** Asymmetric gable roofs, staggered — after the Eilermann roof mark. */
  roof: {
    // Proportions of the logo: ~3.2 : 1, shallow left slope, flat ridge
    // right of centre, the steep right slope as a line past the solid roof.
    size: "240px 140px",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="240" height="140" viewBox="0 0 240 140"><g fill="#000"><path d="M16 56 L36 30 L81 30 L65 56 Z"/><path d="M136 126 L156 100 L201 100 L185 126 Z"/></g><g stroke="#000" stroke-width="3.5" fill="none" stroke-linecap="square"><path d="M81 30 L100 55"/><path d="M201 100 L220 125"/></g></svg>`,
  },
  /** Loose water lines, two staggered rows — for water and sanitary trades. */
  wave: {
    // One wave period is 80 px, so the 160 px tile repeats seamlessly; the
    // second row runs half a period behind the first.
    size: "160px 72px",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="160" height="72" viewBox="0 0 160 72"><g stroke="#000" stroke-width="2.5" fill="none" stroke-linecap="round"><path d="M0 18 Q20 8 40 18 T80 18 T120 18 T160 18"/><path d="M-40 54 Q-20 44 0 54 T40 54 T80 54 T120 54 T160 54 T200 54"/></g></svg>`,
  },
  /** Wood grain: long drifting lines bending round a knot — for joiners. */
  grain: {
    // The lines start and end at the same height, so the 320 px tile
    // repeats sideways; the knot sits in every other row by the y offset.
    size: "320px 120px",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="320" height="120" viewBox="0 0 320 120"><g stroke="#000" stroke-width="1.6" fill="none" stroke-linecap="round"><path d="M0 14 C80 8 160 22 240 12 S300 10 320 14"/><path d="M0 34 C70 30 120 26 150 40 C176 52 210 30 260 32 S310 36 320 34"/><path d="M0 54 C60 54 110 46 140 58 C160 66 196 66 214 56 C240 44 290 52 320 54"/><path d="M0 76 C50 80 112 70 150 76 C190 82 250 88 320 76"/><path d="M0 98 C90 104 170 92 250 100 S300 102 320 98"/><ellipse cx="176" cy="54" rx="13" ry="6"/></g></svg>`,
  },
  /** Loose squares in three sizes, like the square marks of a logo — for a
   * brand built on squares (016-moeller). */
  squares: {
    // Every square lies fully inside the tile, so it repeats without cuts.
    size: "240px 200px",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="240" height="200" viewBox="0 0 240 200"><g fill="#000"><rect x="20" y="24" width="30" height="30"/><rect x="132" y="12" width="12" height="12"/><rect x="176" y="70" width="44" height="44"/><rect x="70" y="120" width="18" height="18"/><rect x="150" y="164" width="10" height="10"/><rect x="18" y="168" width="8" height="8"/></g></svg>`,
  },
} as const;

export type PatternName = keyof typeof tiles;

/** Mask styles for a pattern name; undefined for anything unknown. */
export function patternMask(name: unknown): JSX.CSSProperties | undefined {
  if (typeof name !== "string" || !(name in tiles)) return undefined;
  const tile = tiles[name as PatternName];
  const url = `url("data:image/svg+xml,${encodeURIComponent(tile.svg)}")`;
  const fade = "linear-gradient(to bottom, #000 0%, #000 35%, transparent 95%)";
  return {
    "mask-image": `${url}, ${fade}`,
    "mask-size": `${tile.size}, 100% 100%`,
    "mask-repeat": "repeat, no-repeat",
    "mask-composite": "intersect",
    "-webkit-mask-image": `${url}, ${fade}`,
    "-webkit-mask-size": `${tile.size}, 100% 100%`,
    "-webkit-mask-repeat": "repeat, no-repeat",
    "-webkit-mask-composite": "source-in",
  };
}
