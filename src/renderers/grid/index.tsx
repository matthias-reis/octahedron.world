import { createAsync } from "@solidjs/router";
import type { HastParseResult } from "hast-mds";
import { For, type JSX, Suspense } from "solid-js";
import { transform } from "solid-mds";
import { canonicalComponents } from "~/components/canonical-components";
import { EditorialHero } from "~/components/editorial-hero";
import { LinkBox } from "~/components/link-box";
import { Loading } from "~/components/loading";
import { getAllCompactRoutes } from "~/model/model";
import { colorSpaceStyle } from "~/color/palette";
import type { GlobalScope } from "~/types";

export default function createTemplate(props: {
  mds: HastParseResult<GlobalScope, {}>;
}): JSX.Element {
  const parsed = transform<GlobalScope, {}>(props.mds, canonicalComponents);
  const item = parsed.global;
  const routes = createAsync(() => getAllCompactRoutes());

  return (
    <div class="bg-can9 min-h-screen" style={colorSpaceStyle(item?.colorSpace)}>
      <EditorialHero
        item={item}
        pageBackground="var(--color-can9)"
      />
      <main class="editorial-content max-w-5xl mx-auto px-3 py-7 font-serif text-lg">
        {/* Render any MDS content steps */}
        {Object.values(parsed.steps).map((step) => (
          <step.Body />
        ))}

        {/* Render the auto-discovered grid */}
        <Suspense
          fallback={
            <div class="h-9 my-5">
              <Loading />
            </div>
          }
        >
          {(() => {
            if (!item?.slug) return null;

            const relevantRoutes = Object.values(routes() || {})?.filter(
              (route) => route.group === item.slug && route.slug !== item.slug,
            );
            if (!relevantRoutes || relevantRoutes.length === 0) return null;
            return (
              <>
                <nav class="editorial-wide grid gap-4 md:grid-cols-2 my-5">
                  <For each={relevantRoutes}>
                    {(item) => <LinkBox item={item} layout="group" />}
                  </For>
                </nav>
              </>
            );
          })()}
        </Suspense>
      </main>
    </div>
  );
}
