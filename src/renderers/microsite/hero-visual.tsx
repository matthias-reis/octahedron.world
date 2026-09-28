import { type Component, Show } from "solid-js";
import { smallVariant, usePageAsset } from "./assets";
import { Icon, type IconName, isIconName } from "./ui";

/**
 * The hero's right column, from the hero section's local scope:
 *
 * ```yaml @
 * layout: hero
 * visual:
 *   src: hero.webp            # pnpm ms-image … hero
 *   alt: Beschreibung
 *   position: 40% 45%         # optional object-position
 *   badge: { icon: siren, title: Notdienst 24/7, text: Auch nachts }
 *   quote: { icon: wrench, label: Kleine Zeile, text: Großer Satz }
 *   style: bleed              # optional: photo runs to the viewport edge
 * ```
 *
 * Badge and quote are optional. `bleed` drops the framed card: the photo
 * fills the right half of the section edge to edge and full height (on
 * phones, full width under the copy); only the badge is shown on it. The quote card is an inverted section in
 * miniature, so it follows the page's color groups like any other.
 */
export type HeroVisualData = {
  src?: string;
  alt?: string;
  position?: string;
  badge?: { icon?: string; title?: string; text?: string };
  quote?: { icon?: string; label?: string; text?: string };
  style?: "card" | "bleed";
};

const iconOf = (name: unknown): IconName | undefined =>
  isIconName(name) ? name : undefined;

export const HeroVisual: Component<{ visual: HeroVisualData }> = (props) => {
  const src = usePageAsset(() => props.visual.src);
  const small = usePageAsset(() =>
    props.visual.src ? smallVariant(props.visual.src) : undefined,
  );

  if (props.visual.style === "bleed")
    return (
      <div class="relative mt-sxl aspect-[4/3] sm:aspect-[16/9] lg:mt-0 lg:aspect-auto lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 overflow-hidden bg-card">
        <Show when={src()}>
          {(url) => (
            <img
              src={url()}
              srcset={small() ? `${small()} 800w, ${url()} 1600w` : undefined}
              sizes="(min-width: 64rem) 50vw, 100vw"
              alt={props.visual.alt ?? ""}
              loading="eager"
              fetchpriority="high"
              decoding="async"
              class="absolute inset-0 w-full h-full object-cover"
              style={{ "object-position": props.visual.position ?? "50% 50%" }}
            />
          )}
        </Show>
        <Show when={props.visual.badge}>
          {(badge) => (
            <div class="absolute left-smd bottom-smd lg:left-slg lg:bottom-slg flex items-center gap-ssm rounded-ms bg-page py-ssm pl-ssm pr-smd shadow-xl">
              <Show when={iconOf(badge().icon)}>
                {(name) => (
                  <span class="w-[2.5rem] h-[2.5rem] rounded-ms bg-tint text-button flex items-center justify-center">
                    <Icon name={name()} class="w-[1.25rem] h-[1.25rem]" />
                  </span>
                )}
              </Show>
              <span class="flex flex-col leading-tight">
                <strong class="text-copy-strong">{badge().title}</strong>
                <Show when={badge().text}>
                  <span class="text-sm text-copy-soft">{badge().text}</span>
                </Show>
              </span>
            </div>
          )}
        </Show>
      </div>
    );

  return (
    <div class="relative min-h-[25rem] md:min-h-[35rem]">
      <div class="absolute inset-[0_0_4.5rem_0] md:inset-[0_0_3.5rem_2.5rem] rounded-[calc(var(--ms-radius)*2)] overflow-hidden bg-card shadow-2xl">
        <Show when={src()}>
          {(url) => (
            <img
              src={url()}
              srcset={small() ? `${small()} 800w, ${url()} 1600w` : undefined}
              sizes="(min-width: 64rem) 36rem, 100vw"
              alt={props.visual.alt ?? ""}
              loading="eager"
              fetchpriority="high"
              decoding="async"
              class="w-full h-full object-cover"
              style={{ "object-position": props.visual.position ?? "50% 50%" }}
            />
          )}
        </Show>
      </div>

      <Show when={props.visual.badge}>
        {(badge) => (
          <div class="absolute top-smd right-smd md:top-slg md:right-slg flex items-center gap-ssm rounded-ms bg-page py-ssm pl-ssm pr-smd shadow-xl">
            <Show when={iconOf(badge().icon)}>
              {(name) => (
                <span class="w-[2.5rem] h-[2.5rem] rounded-ms bg-tint text-button flex items-center justify-center">
                  <Icon name={name()} class="w-[1.25rem] h-[1.25rem]" />
                </span>
              )}
            </Show>
            <span class="flex flex-col leading-tight">
              <strong class="text-copy-strong">{badge().title}</strong>
              <Show when={badge().text}>
                <span class="text-sm text-copy-soft">{badge().text}</span>
              </Show>
            </span>
          </div>
        )}
      </Show>

      <Show when={props.visual.quote}>
        {(quote) => (
          <div class="ms-section ms-inverted absolute left-ssm right-ssm bottom-0 md:left-0 md:right-auto md:w-[min(22.5rem,78%)] rounded-ms p-slg shadow-xl">
            <p class="flex items-center gap-ssm text-sm font-semibold text-copy-soft">
              <Show when={iconOf(quote().icon)}>
                {(name) => (
                  <Icon
                    name={name()}
                    class="w-[1.1rem] h-[1.1rem] text-button"
                  />
                )}
              </Show>
              {quote().label}
            </p>
            <p class="mt-ssm font-ms-display text-xl md:text-2xl font-bold leading-tight text-copy-strong">
              {quote().text}
            </p>
          </div>
        )}
      </Show>
    </div>
  );
};
