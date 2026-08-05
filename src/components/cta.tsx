import { A } from "@solidjs/router";
import { type Component, type ParentComponent, Show } from "solid-js";
import type { CustomBlockProps } from "solid-mds";
import { resolveCtaPayload } from "~/ui/cta";

// Octahedron renders the CTA through the `.cta` compatibility class rather than
// the shared <ButtonLink>: hundreds of content files and the dica renderer
// reference that class directly and it carries octahedron's own palette. Only
// the payload contract is shared — `{url, text}` with `{href, label}` aliases.
const CtaAnchor: ParentComponent<{ href: string }> = (props) => (
  <>
    {props.href.startsWith("/") ? (
      <A class="cta" href={props.href}>
        {props.children}
      </A>
    ) : (
      <a class="cta" href={props.href}>
        {props.children}
      </a>
    )}
  </>
);

export const Cta: Component<CustomBlockProps> = (props) => {
  const payload = () => {
    const resolved = resolveCtaPayload(props.data);
    if (!resolved) {
      console.warn("Cta component: url or text is missing", {
        data: props.data,
      });
    }
    return resolved;
  };

  return (
    <Show when={payload()}>
      {(cta) => (
        <div class="my-6 text-center">
          <CtaAnchor href={cta().url}>{cta().text}</CtaAnchor>
        </div>
      )}
    </Show>
  );
};
