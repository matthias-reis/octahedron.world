import { type Component, Show } from "solid-js";
import type { CustomBlockProps } from "solid-mds";
import { ButtonLink } from "./button";

type CtaPayload = { url: string; text: string };

function first(value: unknown): string | undefined {
  const v = Array.isArray(value) ? value[0] : value;
  return typeof v === "string" && v.length > 0 ? v : undefined;
}

/**
 * Normalises the `cta` MDS block payload.
 *
 * The canonical shape is `{ url, text }` — octahedron has hundreds of content
 * files using it. `{ href, label }` (the shape mreis.me used for its three
 * posts) is accepted as an alias so no content has to be rewritten.
 */
export function resolveCtaPayload(
  data: Record<string, unknown> | undefined,
): CtaPayload | null {
  if (!data) return null;

  const url = first(data.url) ?? first(data.href);
  const text = first(data.text) ?? first(data.label);

  if (!url || !text) return null;
  return { url, text };
}

/** Token-driven `cta` block for the shared prose map. */
export const Cta: Component<CustomBlockProps> = (props) => {
  const payload = () => resolveCtaPayload(props.data);

  return (
    <Show when={payload()}>
      {(cta) => (
        <div class="my-slg text-center">
          <ButtonLink href={cta().url} variant="primary">
            {cta().text}
          </ButtonLink>
        </div>
      )}
    </Show>
  );
};
