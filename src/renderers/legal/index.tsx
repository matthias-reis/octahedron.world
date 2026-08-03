import { A } from "@solidjs/router";
import type { HastParseResult } from "hast-mds";
import { ChevronLeft } from "lucide-solid/icons/index";
import type { JSX } from "solid-js";
import { transform } from "solid-mds";
import { canonicalComponents } from "~/components/canonical-components";
import type { GlobalScope } from "~/types";

export default function createTemplate(props: {
  mds: HastParseResult<GlobalScope, {}>;
}): JSX.Element {
  const parsed = transform<GlobalScope, {}>(props.mds, canonicalComponents);
  const item = parsed.global;

  return (
    <div class={`${item?.colorSpace || ""} min-h-screen`}>
      <main class="max-w-4xl mx-auto px-3 pb-7 relative">
        <A
          href={`/`}
          class="mt-3 flex items-center justify-start text-cad1 mb-6 gap-2 uppercase "
        >
          <ChevronLeft /> <span>Home</span>
        </A>
        <div class="text-center">
          {item?.superTitle && (
            <p class="text-lg uppercase text-cad1 mt-5 font-bold tracking-widest font-octa">
              {item.superTitle}
            </p>
          )}
          <h1 class="text-6xl md:text-8xl text-cad1 font-octa font-bold leading-none mb-7">
            {item?.title}
          </h1>
          {item?.subTitle && (
            <p class="text-lg text-cad1 mt-2 text-shadow-md text-shadow-neutral-500">
              {item.subTitle}
            </p>
          )}
        </div>

        <div class="mx-5 sm:mx-7 mb-7">
          {Object.values(parsed.steps).map((step) => (
            <step.Body />
          ))}
        </div>
      </main>
    </div>
  );
}
