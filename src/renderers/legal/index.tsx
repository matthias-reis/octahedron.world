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
    <div class={`${item?.colorSpace || ""} min-h-screen bg-cb`}>
      <EditorialHero
        item={item}
        pageBackground="#000000"
        backHref="/"
        backLabel="home"
      />
      <main class="max-w-4xl mx-auto px-3 pb-7 relative">
        <div class="mx-5 sm:mx-7 mb-7">
          {Object.values(parsed.steps).map((step) => (
            <step.Body />
          ))}
        </div>
      </main>
    </div>
  );
}
