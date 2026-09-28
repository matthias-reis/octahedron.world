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
