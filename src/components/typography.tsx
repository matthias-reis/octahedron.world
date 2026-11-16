/** biome-ignore-all lint/suspicious/noExplicitAny: HAST passes untyped props */

/**
 * Octahedron's prose overrides — everything the shared map in `~/ui/prose`
 * cannot express through semantic tokens: this site's decent-chroma heading
 * colour, its numeric spacing scale, the pure-white `strong`, and the image
 * source rewriting for the editorial asset bucket.
 *
 * Spread on top of `proseComponents`; see `canonical-components.tsx`.
 */
import { largeImageUrl } from "~/components/image-helpers";

export const Typography = {
  h1: (props: any) => (
    <h3
      class="editorial-prose text-4xl text-cad2 font-octa font-bold mt-7 mb-6"
      {...props}
    />
  ),
  h2: (props: any) => (
    <h4
      class="editorial-prose text-3xl text-cad2 font-bold font-octa mt-5 mb-4"
      {...props}
    />
  ),
  h3: (props: any) => (
    <h5
      class="editorial-prose text-2xl text-cad2 font-bold font-octa mt-5 mb-4"
      {...props}
    />
  ),
  p: (props: any) => (
    <p class="editorial-prose my-sxs leading-relaxed text-can1" {...props} />
  ),
  ul: (props: any) => (
    <ul
      class="editorial-prose list-disc list-outside pl-6 text-can1"
      {...props}
    />
  ),
  ol: (props: any) => (
    <ol
      class="editorial-prose list-decimal list-outside pl-6 text-can1"
      {...props}
    />
  ),
  li: (props: any) => <li class="my-1 leading-relaxed" {...props} />,
  strong: (props: any) => <strong class="font-bold text-cw" {...props} />,
  hr: (props: any) => (
    <hr class="editorial-prose my-6 border-cad5" {...props} />
  ),
  // Deliberately unstyled: octahedron's long-form content has always rendered
  // blockquotes with browser defaults. Giving them a look is a visual decision
  // of its own, not part of the theming split.
  blockquote: (props: any) => <blockquote class="editorial-prose" {...props} />,
  img: (props: any) => (
    <img
      class="editorial-wide my-6 aspect-square w-full rounded-lg object-cover shadow-md select-none"
      src={props.src?.startsWith("http") ? props.src : largeImageUrl(props.src)}
      alt={props.alt}
      draggable={false}
    />
  ),
};
