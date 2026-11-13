import type { HastParseResult } from "hast-mds";
import type { JSX } from "solid-js/jsx-runtime";
import { transform } from "solid-mds";
import { canonicalComponents } from "~/components/canonical-components";
import { EditorialHero } from "~/components/editorial-hero";
import { Related } from "~/components/related";
import type { GlobalScope, ItemMeta } from "~/types";

export default function createTemplate(props: {
  mds: HastParseResult<GlobalScope, {}>;
}): JSX.Element {
  const parsed = transform<GlobalScope, {}>(props.mds, canonicalComponents);
  const item = parsed.global as ItemMeta;

  return (
    <div class={`${item?.colorSpace} min-h-screen bg-cbn9`}>
      <EditorialHero
        item={item}
        pageBackground="oklch(var(--l-9) var(--s-n) var(--h-b))"
        backHref="/"
        backLabel="home"
        showGroup
      />
      <div class="bg-linear-to-b from-cbn9 to-cbs9 pb-8">
        <main class="max-w-3xl mx-auto px-3 py-7">
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
    </div>
  );
}
