import { type Component, For, Show } from "solid-js";
import { smallVariant, usePageAsset } from "./assets";

/**
 * A section's full-bleed background image, from its local scope:
 *
 * ```yaml @
 * backdrop:
 *   src: backdrop.webp     # pnpm ms-image … --wide (2400 + 1200 px)
 *   position: 80% 50%      # optional object-position — keep the subject clear
 *   style: cover           # optional: magazine cover instead of the panel
 *   align: right           # optional: copy on the right half (default left)
 *   valign: top            # optional, cover only: copy at the top (default bottom)
 *   slides:                # optional: 1–5 more photos that cross-fade over `src`
 *     - b.webp             #   (pnpm ms-image … --wide), 7 s each, CSS only
 * ```
 *
 * Decorative (empty alt): the section's text carries the content. By default
 * Section puts its copy on a frosted panel (`backdrop-blur`); `cover` sets
 * it straight onto the photo, bottom left, over a gradient that rises from
 * the page color — use it on an `inverted` section. `align` and `valign` put
 * the copy where the photo has calm space (sky, motion blur); the gradient
 * follows the copy. With `slides` the backdrop becomes a slow slideshow: `src`
 * lies still underneath, the slides fade in over it in turn (theme.css,
 * `ms-slide`); reduced motion shows `src` only.
 */
export type BackdropData = {
  src?: string;
  position?: string;
  style?: "panel" | "cover";
  align?: "left" | "right";
  valign?: "top" | "bottom";
  slides?: string[];
};

/** One full-bleed photo with its 1200 px variant. */
const Photo: Component<{
  file: string;
  position?: string;
  index?: number;
  count?: number;
}> = (props) => {
  const src = usePageAsset(() => props.file);
  const small = usePageAsset(() => smallVariant(props.file));
  const slide = () => props.index !== undefined;
  return (
    <Show when={src()}>
      {(url) => (
        <img
          src={url()}
          srcset={small() ? `${small()} 1200w, ${url()} 2400w` : undefined}
          sizes="100vw"
          alt=""
          loading="eager"
          fetchpriority={slide() ? "low" : "high"}
          decoding="async"
          class={`absolute inset-0 h-full w-full object-cover ${slide() ? "ms-slide" : ""}`}
          style={{
            "object-position": props.position ?? "50% 50%",
            ...(slide()
              ? {
                  "--ms-slide": String(props.index),
                  "--ms-slides": String(props.count),
                }
              : {}),
          }}
        />
      )}
    </Show>
  );
};

export const Backdrop: Component<{ backdrop: BackdropData }> = (props) => {
  const src = usePageAsset(() => props.backdrop.src);
  // Up to five slides: the keyframes in theme.css cover 2–6 photos.
  const slides = () =>
    (Array.isArray(props.backdrop.slides) ? props.backdrop.slides : [])
      .filter((f): f is string => typeof f === "string" && f.length > 0)
      .slice(0, 5);
  const right = () => props.backdrop.align === "right";
  const top = () => props.backdrop.valign === "top";

  return (
    <Show when={src()}>
      {(_url) => (
        <div
          aria-hidden="true"
          class={`absolute inset-0 -z-10 overflow-hidden ${slides().length > 0 ? `ms-slides-${slides().length + 1}` : ""}`}
        >
          <Photo
            file={props.backdrop.src as string}
            position={props.backdrop.position}
          />
          <For each={slides()}>
            {(file, index) => (
              <Photo
                file={file}
                position={props.backdrop.position}
                index={index() + 1}
                count={slides().length + 1}
              />
            )}
          </For>
          <Show
            when={props.backdrop.style === "cover"}
            fallback={
              // Darken towards the text side; the subject side stays clear.
              <div
                class={`absolute inset-0 ${right() ? "bg-linear-to-l" : "bg-linear-to-r"} from-page/75 via-page/30 to-transparent`}
              />
            }
          >
            <Show
              when={top()}
              fallback={
                <>
                  <div class="absolute inset-0 bg-linear-to-t from-page via-page/70 to-page/5 lg:via-page/45" />
                  <div
                    class={`absolute inset-0 ${right() ? "bg-linear-to-l" : "bg-linear-to-r"} from-page/60 via-page/10 to-transparent`}
                  />
                </>
              }
            >
              {/* Copy in the sky: fade out early so the subject stays clear. */}
              <div class="absolute inset-0 bg-linear-to-b from-page from-15% via-page/60 via-45% to-transparent to-70%" />
            </Show>
          </Show>
        </div>
      )}
    </Show>
  );
};
