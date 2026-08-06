/** biome-ignore-all lint/suspicious/noExplicitAny: HAST passes untyped props */
import type { ComponentMap } from "~/components/hast-to-solid";
import { Cta } from "./cta";

/**
 * The shared MDS prose map — one set of long-form typography for both sites,
 * built on semantic tokens and the named spacing scale only.
 *
 * The one visible difference between the identities (octahedron sets headings
 * in a condensed display face, mreis in a serif) is carried by the
 * `font-display` token, not by a component fork.
 *
 * Site-specific renderers layer their own overrides on top by spreading this
 * map first — see `src/components/canonical-components.tsx`.
 */
export const proseComponents: ComponentMap = {
  h1: (props: any) => (
    <h1
      class="text-4xl font-display font-bold text-col-fg mt-sxl mb-slg"
      {...props}
    />
  ),
  h2: (props: any) => (
    <h2
      class="text-3xl font-display font-bold text-col-fg mt-slg mb-smd"
      {...props}
    />
  ),
  h3: (props: any) => (
    <h3
      class="text-2xl font-display font-bold text-col-fg mt-slg mb-ssm"
      {...props}
    />
  ),
  p: (props: any) => (
    <p class="my-sxs leading-relaxed text-col-fg" {...props} />
  ),
  ul: (props: any) => (
    <ul class="list-disc list-outside ml-slg text-col-fg" {...props} />
  ),
  ol: (props: any) => (
    <ol class="list-decimal list-outside ml-slg text-col-fg" {...props} />
  ),
  li: (props: any) => <li class="my-sxs leading-relaxed" {...props} />,
  strong: (props: any) => <strong class="font-bold text-col-fg" {...props} />,
  em: (props: any) => <em class="italic" {...props} />,
  a: (props: any) => <a class="text-col-accent underline" {...props} />,
  hr: (props: any) => (
    <hr class="my-slg w-2/3 mx-auto border-col-border" {...props} />
  ),
  blockquote: (props: any) => (
    <blockquote
      class="my-smd border-l-4 border-col-accent pl-smd text-col-fg-muted"
      {...props}
    />
  ),
  img: (props: any) => (
    <img
      class="my-slg mx-auto rounded-lg shadow-md select-none"
      src={props.src}
      alt={props.alt}
      draggable={false}
    />
  ),
  // Fenced code blocks. Octahedron layers its own `pre`/`code` handling on top
  // (see `canonical-components.tsx`, which spreads `MdsCode` after this map),
  // so this is the baseline both sites fall back to rather than a bare
  // unstyled `<pre>`.
  pre: (props: any) => (
    <pre
      class="my-smd p-smd overflow-x-auto rounded-lg bg-col-surface border border-col-border text-col-fg font-mono text-base"
      {...props}
    />
  ),
  code: (props: any) => <code class="font-mono text-[0.9em]" {...props} />,
  cta: Cta,
};
