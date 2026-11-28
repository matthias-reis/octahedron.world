import type { HastParseResult } from "hast-mds";
import type { JSX } from "solid-js";
import { transform } from "solid-mds";
import { canonicalComponents } from "~/components/canonical-components";
import { EditorialHero } from "~/components/editorial-hero";
import { colorSpaceStyle } from "~/color/palette";
import type { GlobalScope } from "~/types";

export default function createTemplate(props: {
  mds: HastParseResult<GlobalScope, {}>;
}): JSX.Element {
  const parsed = transform<GlobalScope, {}>(props.mds, canonicalComponents);
  const item = parsed.global;

  return (
    <div class="min-h-screen bg-cb" style={colorSpaceStyle(item?.colorSpace)}>
      <EditorialHero
        item={item}
        pageBackground="#000000"
        backHref="/"
        backLabel="home"
      />
      <main class="editorial-content max-w-5xl mx-auto px-3 pb-7 relative font-serif text-lg">
        <div class="mb-7">
          {Object.values(parsed.steps).map((step) => (
            <step.Body />
          ))}
        </div>
      </main>
    </div>
  );
}
