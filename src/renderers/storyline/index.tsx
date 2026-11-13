import type { HastParseResult } from "hast-mds";
import type { JSX } from "solid-js";
import { transform } from "solid-mds";
import { canonicalComponents } from "~/components/canonical-components";
import { cx } from "~/components/cx";
import { EditorialHero } from "~/components/editorial-hero";
import { Related } from "~/components/related";
import type { GlobalScope } from "~/types";

export default function createTemplate(props: {
  mds: HastParseResult<GlobalScope, {}>;
}): JSX.Element {
  const parsed = transform<GlobalScope, {}>(props.mds, canonicalComponents);
  const item = parsed.global;

  return (
    <div class={cx(`min-h-screen bg-can9`, item?.colorSpace)}>
      <EditorialHero
        item={item}
        pageBackground="oklch(var(--l-9) var(--s-n) var(--h-a))"
      />
      <main class="max-w-5xl mx-auto px-3 py-7">
        {/* MDS Content Steps */}
        <div class="my-7 text-lg font-serif">
          {Object.values(parsed.steps).map((step) => (
            <section class="mx-5 sm:mx-7 md:mx-8 lg:mx-9">
              <step.Body />
            </section>
          ))}
        </div>

        <Related item={item!} />
      </main>
    </div>
  );
}
