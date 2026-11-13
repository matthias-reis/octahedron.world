import { A } from "@solidjs/router";
import dayjs from "dayjs";
import { ChevronLeft } from "lucide-solid";
import type { Component } from "solid-js";
import type { GlobalScope } from "~/types";
import { detailImageClass, largeImageUrl } from "./image-helpers";

/** Shared title area for Octahedron's editorial pages. */
export const EditorialHero: Component<{
  item: GlobalScope | null | undefined;
  pageBackground: string;
  backHref?: string;
  backLabel?: string;
  showGroup?: boolean;
}> = (props) => {
  const description = () =>
    Array.isArray(props.item?.description)
      ? props.item.description.join(" ")
      : props.item?.description;
  const parent = () =>
    props.item?.group && props.item.group !== props.item.slug
      ? props.item.group
      : undefined;

  return (
    <>
      <section
        class="relative isolate overflow-hidden"
        style={{ "background-color": props.pageBackground }}
      >
        {props.item?.image && (
          <div
            aria-hidden="true"
            class="pointer-events-none absolute -inset-8 bg-cover bg-center blur-xl brightness-50"
            style={{
              "background-image": `url(${largeImageUrl(props.item.image)})`,
            }}
          />
        )}
        <div
          aria-hidden="true"
          class="pointer-events-none absolute inset-0"
          style={{
            background: `linear-gradient(to bottom, color-mix(in srgb, ${props.pageBackground} 10%, transparent) 0%, color-mix(in srgb, ${props.pageBackground} 30%, transparent) 55%, ${props.pageBackground} 100%)`,
          }}
        />
        <div class="relative mx-auto grid max-w-6xl grid-cols-1 items-start gap-x-12 gap-y-0 px-6 pb-12 pt-16 sm:grid-cols-2 sm:items-center sm:pb-12 lg:gap-x-16 lg:pb-16 lg:pt-20">
          <div class="min-w-0">
            {props.item?.image && (
              <img
                src={largeImageUrl(props.item.image)}
                alt={props.item.title}
                class={`block w-full ${detailImageClass(props.item.imageShape)}`}
              />
            )}
          </div>
          <div class="min-w-0 pt-2 text-left text-white sm:pt-0">
            <A
              href={props.backHref ?? (parent() ? `/${parent()}` : "/")}
              class="mb-1 inline-flex items-center gap-2 font-sans text-sm uppercase text-white/80 hover:text-white sm:mb-4"
            >
              <ChevronLeft class="size-4" />
              <span>
                {props.backLabel ?? parent()?.replace(/-/g, " ") ?? "home"}
              </span>
            </A>
            {props.item?.superTitle && (
              <p class="mb-3 font-octa text-xl font-bold uppercase tracking-wide">
                {props.item.superTitle}
              </p>
            )}
            <h1 class="font-octa text-5xl font-bold leading-none text-balance break-words text-white sm:text-6xl">
              {props.item?.title}
            </h1>
            {props.item?.subTitle && (
              <p class="mt-3 font-octa text-2xl text-white">
                {props.item.subTitle}
              </p>
            )}
            {description() && (
              <p class="mt-4 max-w-prose font-sans text-lg leading-relaxed text-white sm:mt-6">
                {description()}
              </p>
            )}
            {(props.showGroup || props.item?.date || props.item?.words) && (
              <p class="mt-5 font-sans text-sm text-white/80">
                {props.showGroup && props.item?.group?.replace(/-/g, " ")}
                {props.showGroup && props.item?.date && " · "}
                {props.item?.date &&
                  dayjs(props.item.date).format("YYYY-MM-DD")}
                {(props.showGroup || props.item?.date) &&
                  props.item?.words &&
                  " · "}
                {props.item?.words &&
                  `${Math.round(props.item.words / 200)} min read · ${props.item.words.toLocaleString()} words`}
                {props.item?.words &&
                  props.item?.chars &&
                  ` · ${props.item.chars.toLocaleString()} chars`}
              </p>
            )}
            {props.item?.ref && props.item?.language && (
              <A
                href={`/${props.item.ref}`}
                class="mt-4 inline-block font-sans text-sm text-white/80 hover:text-white"
              >
                {props.item.language === "en"
                  ? "🇩🇪 Deutsche Version"
                  : "🇬🇧 English Version"}
              </A>
            )}
          </div>
        </div>
      </section>
    </>
  );
};
