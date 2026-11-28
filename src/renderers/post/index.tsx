import type { HastParseResult } from "hast-mds";
import type { JSX } from "solid-js/jsx-runtime";
import { transform } from "solid-mds";
import { canonicalComponents } from "~/components/canonical-components";
import { EditorialHero } from "~/components/editorial-hero";
import { Related } from "~/components/related";
import { colorSpaceStyle } from "~/color/palette";
import type { GlobalScope, ItemMeta } from "~/types";

export default function createTemplate(props: {
  mds: HastParseResult<GlobalScope, {}>;
}): JSX.Element {
  const parsed = transform<GlobalScope, {}>(props.mds, canonicalComponents);
  const item = parsed.global as ItemMeta;

  return (
    <div class="min-h-screen bg-cbn9" style={colorSpaceStyle(item?.colorSpace)}>
      <EditorialHero
        item={item}
        pageBackground="var(--color-cbn9)"
        backHref="/"
        backLabel="home"
        showGroup
      />
      <div class="bg-linear-to-b from-cbn9 to-cbs9 pb-8">
        <main class="editorial-content max-w-5xl mx-auto px-3 py-7 font-serif text-lg">
          {/* MDS Content Steps */}
          <div>
            {Object.values(parsed.steps).map((step) => (
              <step.Body />
            ))}
          </div>
        </main>

        <aside class="max-w-5xl mt-5 mx-auto px-3">
          <Related item={item as ItemMeta} />
        </aside>
      </div>
    </div>
  );
}
