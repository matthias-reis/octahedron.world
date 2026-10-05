/**
 * How a published editorial asset is referenced.
 *
 * Images used to be derived at build time by `scripts/imagine.ts` into
 * `public/img/<slug>/{l,s}.jpg`. They now live in the editorial bucket, which
 * life-brain uploads to — one folder per slug, holding the untouched original
 * plus jpg and webp at small (600), medium (900) and large (1280).
 *
 * Mirrored in life-brain's `src/editorial/asset-urls.ts`; keep the two in step.
 *
 *   <base>/<slug>/original.<ext>
 *   <base>/<slug>/{small,medium,large}.{jpg,webp}
 */

export type EditorialAssetSize = "small" | "medium" | "large";

/**
 * A public bucket URL, not a secret — inlined at build time because these
 * helpers run in the browser. Falls back to the production bucket so a build
 * without the var set still renders images rather than silently emitting
 * "undefined/..." paths.
 */
const PUBLIC_BASE: string = (
  import.meta.env["VITE_ASSET_PUBLIC_BASE_URL"] ??
  "https://octahedron.fsn1.your-objectstorage.com"
).replace(/\/+$/, "");

export function editorialAssetUrl(
  slug: string,
  size: EditorialAssetSize,
  format: "jpg" | "webp" = "jpg",
): string {
  return `${PUBLIC_BASE}/${slug}/${size}.${format}`;
}

/** The `srcset` for a `<picture>` source of one format, across all three sizes. */
export function editorialAssetSrcSet(slug: string, format: "jpg" | "webp"): string {
  return [
    `${editorialAssetUrl(slug, "small", format)} 600w`,
    `${editorialAssetUrl(slug, "medium", format)} 900w`,
    `${editorialAssetUrl(slug, "large", format)} 1280w`,
  ].join(", ");
}

export const largeImageUrl = (slug: string) => editorialAssetUrl(slug, "large");
export const smallImageUrl = (slug: string) => editorialAssetUrl(slug, "small");
