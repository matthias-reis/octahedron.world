import type { HastParseResult } from "hast-mds";
import type { JSX } from "solid-js/jsx-runtime";
import { transform } from "solid-mds";
import { canonicalComponents } from "~/components/canonical-components";
import { EditorialHero } from "~/components/editorial-hero";
import type { ComponentMap } from "~/components/hast-to-solid";
import { Related } from "~/components/related";
import type { GlobalScope } from "~/types";

export default function createTemplate(
  props: {
    mds: HastParseResult<GlobalScope, {}>;
  },
  components: ComponentMap = canonicalComponents,
): JSX.Element {
  const parsed = transform<GlobalScope, {}>(props.mds, components as any);
  const item = parsed.global;

  return (
    <div class={`${item?.colorSpace} min-h-screen bg-cbn9`}>
      <EditorialHero
        item={item}
        pageBackground="oklch(var(--l-9) var(--s-n) var(--h-b))"
      />
      <div class="bg-linear-to-b from-cbn9 to-cbs9">
        <main class="max-w-4xl mx-auto px-3 pb-7 mb-7 relative bg-cbn9">
          {/* MDS Content Steps */}
          <div class="my-6">
            {Object.values(parsed.steps).map((step) => (
              <section class="mx-5 sm:mx-7 mb-7 text-lg">
                <step.Body />
              </section>
            ))}
          </div>
        </main>

        <aside class="max-w-4xl mx-auto pb-7">
          {/* Related Content */}
          {item && <Related item={item} />}
        </aside>
      </div>
    </div>
  );
}
