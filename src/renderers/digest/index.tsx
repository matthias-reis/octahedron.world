import type { HastParseResult } from "hast-mds";
import type { JSX } from "solid-js";
import { transform } from "solid-mds";
import { canonicalComponents } from "~/components/canonical-components";
import { EditorialHero } from "~/components/editorial-hero";
import type { GlobalScope } from "~/types";

export default function createTemplate(props: {
  mds: HastParseResult<GlobalScope, {}>;
}): JSX.Element {
  const parsed = transform<GlobalScope, {}>(props.mds, canonicalComponents);
  const item = parsed.global;

  return (
    <div class={`${item?.colorSpace} bg-cbd9 min-h-screen`}>
      <EditorialHero
        item={item}
        pageBackground="oklch(var(--l-9) var(--s-d) var(--h-b))"
      />

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
