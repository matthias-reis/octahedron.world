import { type Component, Show } from "solid-js";
import { smallVariant, usePageAsset } from "./assets";

/**
 * A section's full-bleed background image, from its local scope:
 *
 * ```yaml @
 * backdrop:
 *   src: backdrop.webp     # pnpm ms-image … --wide (2400 + 1200 px)
 *   position: 80% 50%      # optional object-position — keep the subject clear
 * ```
 *
 * Decorative (empty alt): the section's text carries the content. Section
 * puts its copy on a frosted panel (`backdrop-blur`) so it stays readable.
 */
export type BackdropData = { src?: string; position?: string };

export const Backdrop: Component<{ backdrop: BackdropData }> = (props) => {
  const src = usePageAsset(() => props.backdrop.src);
  const small = usePageAsset(() =>
    props.backdrop.src ? smallVariant(props.backdrop.src) : undefined,
  );

  return (
    <Show when={src()}>
      {(url) => (
        <div aria-hidden="true" class="absolute inset-0 -z-10">
          <img
            src={url()}
            srcset={small() ? `${small()} 1200w, ${url()} 2400w` : undefined}
            sizes="100vw"
            alt=""
            loading="eager"
            fetchpriority="high"
            decoding="async"
            class="h-full w-full object-cover"
            style={{ "object-position": props.backdrop.position ?? "50% 50%" }}
          />
          {/* Darken towards the text side; the subject side stays clear. */}
          <div class="absolute inset-0 bg-linear-to-r from-page/75 via-page/30 to-transparent" />
        </div>
      )}
    </Show>
  );
};
