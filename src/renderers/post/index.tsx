import { A } from "@solidjs/router";
import dayjs from "dayjs";
import type { HastParseResult } from "hast-mds";
import { ChevronLeft } from "lucide-solid";
import type { JSX } from "solid-js/jsx-runtime";
import { transform } from "solid-mds";
import { canonicalComponents } from "~/components/canonical-components";
import { largeImageUrl } from "~/components/image-helpers";
import { Related } from "~/components/related";
import type { GlobalScope, ItemMeta } from "~/types";

export default function createTemplate(props: {
  mds: HastParseResult<GlobalScope, {}>;
}): JSX.Element {
  const parsed = transform<GlobalScope, {}>(props.mds, canonicalComponents);
  const item = parsed.global as ItemMeta;

  const description = Array.isArray(item?.description)
    ? item.description.join(" ")
    : item?.description;

  const metaItems: JSX.Element[] = [];
  if (item?.group) {
    metaItems.push(
      <A href={`/${item.group}`} class="hover:text-cad2">
        {item.group.replace(/-/g, " ")}
      </A>,
    );
  }
  if (item?.date) {
    metaItems.push(<span>{dayjs(item.date).format("YYYY-MM-DD")}</span>);
  }
  if (item?.ref && item?.language) {
    metaItems.push(
      <A href={`/${item.ref}`} class="normal-case hover:text-cad2">
        {item.language === "en" ? "🇩🇪 Auf deutsch" : "🇬🇧 In English"}
      </A>,
    );
  }

  return (
    <div
      class={`${item?.colorSpace} min-h-screen gradient bg-linear-to-b from-cbn9 to-cbs9 pb-8`}
    >
      <main class="max-w-3xl mx-auto px-3 py-7">
        <A
          href="/"
          class="flex w-fit items-center gap-1 text-cad4 hover:text-cad2 uppercase text-sm mb-6"
        >
          <ChevronLeft class="size-4" /> <span>home</span>
        </A>

        {item?.image && (
          <img
            src={largeImageUrl(item.image)}
            alt={item.title}
            class="mx-auto mb-6 aspect-image w-full object-cover"
          />
        )}

        {item?.superTitle && (
          <p class="uppercase text-can5 text-center mb-3">{item.superTitle}</p>
        )}
        <h1 class="text-5xl md:text-7xl text-cad1 font-octa font-bold leading-none text-center text-balance mb-3">
          {item?.title}
        </h1>
        {item?.subTitle && (
          <p class="text-lg text-can5 text-center mb-3">{item.subTitle}</p>
        )}

        {description && (
          <p class="text-center text-md font-sans text-cad4 mb-4 mx-auto max-w-md text-balance">
            {description}
          </p>
        )}

        {/* Meta: group · date · language */}
        {metaItems.length > 0 && (
          <nav class="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-can5 uppercase text-xs mb-8">
            {metaItems.map((entry, index) => (
              <>
                {index > 0 && (
                  <span
                    aria-hidden="true"
                    class="size-1 shrink-0 rounded-full bg-current opacity-60"
                  />
                )}
                {entry}
              </>
            ))}
          </nav>
        )}

        {/* MDS Content Steps */}
        <div class="text-lg">
          {Object.values(parsed.steps).map((step) => (
            <step.Body />
          ))}
        </div>
      </main>

      <aside class="max-w-4xl mt-5 mx-auto">
        <Related item={item as ItemMeta} />
      </aside>
    </div>
  );
}
