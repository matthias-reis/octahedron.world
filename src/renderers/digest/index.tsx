import { A } from "@solidjs/router";
import type { HastParseResult } from "hast-mds";
import { ChevronLeft } from "lucide-solid/icons/index";
import type { JSX } from "solid-js";
import { transform } from "solid-mds";
import { canonicalComponents } from "~/components/canonical-components";
import { detailImageClass, largeImageUrl } from "~/components/image-helpers";
import type { GlobalScope } from "~/types";

export default function createTemplate(props: {
  mds: HastParseResult<GlobalScope, {}>;
}): JSX.Element {
  const parsed = transform<GlobalScope, {}>(props.mds, canonicalComponents);
  const item = parsed.global;
  const description = Array.isArray(item?.description)
    ? item.description.join(" ")
    : item?.description;

  return (
    <div class={`${item?.colorSpace} bg-cbd9 min-h-screen`}>
      <header class="mx-auto flex h-16 max-w-6xl items-center px-6">
        <A href="/" class="flex items-center gap-2 text-cbs5 uppercase">
          <ChevronLeft /> <span>home</span>
        </A>
      </header>

      <section class="relative isolate overflow-hidden bg-can9">
        {item?.image && (
          <div
            aria-hidden="true"
            class="pointer-events-none absolute -inset-8 bg-cover bg-center blur-2xl brightness-50"
            style={{ "background-image": `url(${largeImageUrl(item.image)})` }}
          />
        )}
        <div class="pointer-events-none absolute inset-0 bg-black/50" />
        <div class="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-6 py-12 md:grid-cols-2 lg:gap-16 lg:py-16">
          <div>
            {item?.image && (
              <img
                src={largeImageUrl(item.image)}
                alt={item.title}
                class={`w-full ${detailImageClass(item.imageShape)}`}
              />
            )}
          </div>
          <div class="text-left text-white">
            {item?.superTitle && (
              <p class="mb-3 font-octa text-xl font-bold uppercase tracking-wide">
                {item.superTitle}
              </p>
            )}
            <h1 class="font-octa text-6xl font-bold leading-none text-white">
              {item?.title}
            </h1>
            {item?.subTitle && (
              <p class="mt-3 font-octa text-2xl text-white">{item.subTitle}</p>
            )}
            {description && (
              <p class="mt-6 max-w-prose font-sans text-lg leading-relaxed text-white">
                {description}
              </p>
            )}
          </div>
        </div>
      </section>

      <main class="max-w-3xl mx-auto px-3 py-7">
        {/* Render the content (single step) */}
        <div class="text-lg">
          {Object.values(parsed.steps).map((step) => (
            <step.Body />
          ))}
        </div>
      </main>
    </div>
  );
}
