import { type Component, createSignal, Show } from "solid-js";
import type { CustomBlockProps } from "solid-mds";
import { smallVariant, usePageAsset } from "./assets";
import { Icon } from "./ui";

/**
 * ```yaml video
 * youtube: 5BMB9xDXnok     # video id
 * poster: film.webp         # local still (pnpm ms-image), never a YouTube URL
 * title: Elektro Schuster GmbH
 * ```
 *
 * Two-click embed: until someone presses play, nothing is loaded from
 * YouTube — no request, no cookie. The click swaps the poster for a
 * youtube-nocookie iframe. Without JavaScript the poster links to YouTube.
 */
export const Video: Component<CustomBlockProps> = (props) => {
  const data = () => (props.data ?? {}) as Record<string, unknown>;
  const id = () => {
    const v = data().youtube;
    return typeof v === "string" && /^[\w-]{6,20}$/.test(v) ? v : undefined;
  };
  const title = () =>
    typeof data().title === "string" ? (data().title as string) : "Video";
  const poster = usePageAsset(() =>
    typeof data().poster === "string" ? (data().poster as string) : undefined,
  );
  const small = usePageAsset(() =>
    typeof data().poster === "string"
      ? smallVariant(data().poster as string)
      : undefined,
  );
  const [playing, setPlaying] = createSignal(false);

  return (
    <Show when={id()}>
      {(videoId) => (
        <figure class="ms-block my-sxl">
          <div class="relative aspect-video overflow-hidden rounded-[calc(var(--ms-radius)*1.5)] bg-card">
            <Show
              when={playing()}
              fallback={
                <a
                  href={`https://www.youtube.com/watch?v=${videoId()}`}
                  onClick={(e) => {
                    e.preventDefault();
                    setPlaying(true);
                  }}
                  class="group absolute inset-0 block"
                  aria-label={`Video abspielen: ${title()}`}
                >
                  <Show when={poster()}>
                    {(url) => (
                      <img
                        src={url()}
                        srcset={
                          small()
                            ? `${small()} 800w, ${url()} 1600w`
                            : undefined
                        }
                        sizes="(min-width: 72rem) 72rem, 100vw"
                        alt=""
                        loading="lazy"
                        decoding="async"
                        class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                      />
                    )}
                  </Show>
                  <span class="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
                  <span class="absolute left-slg bottom-slg md:left-sxl md:bottom-sxl flex items-center gap-smd">
                    <span class="w-[4.5rem] h-[4.5rem] md:w-[5.5rem] md:h-[5.5rem] rounded-full bg-button text-button-copy flex items-center justify-center shadow-2xl transition-transform group-hover:scale-105">
                      <Icon
                        name="play"
                        class="w-[2rem] h-[2rem] md:w-[2.4rem] md:h-[2.4rem] fill-current translate-x-[2px]"
                      />
                    </span>
                    <span class="font-ms-display text-2xl md:text-3xl font-bold text-white leading-tight">
                      {title()}
                    </span>
                  </span>
                </a>
              }
            >
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${videoId()}?autoplay=1&rel=0`}
                title={title()}
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
                class="absolute inset-0 w-full h-full border-0"
              />
            </Show>
          </div>
          <figcaption class="mt-ssm text-sm text-copy-soft">
            Beim Abspielen wird das Video von YouTube geladen.
          </figcaption>
        </figure>
      )}
    </Show>
  );
};
