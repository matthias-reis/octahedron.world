import type { HastParseResult } from "hast-mds";
import { For } from "solid-js";
import type { JSX } from "solid-js/jsx-runtime";
import { transform } from "solid-mds";
import type { GlobalScope } from "~/types";
import { proseComponents } from "~/ui/prose";

/**
 * The body of a legal page (Impressum, Datenschutz) in mreis.me's prose
 * style. Only the text: title and head are set by the hand-written page.
 */
export default function LegalRenderer(props: {
  mds: HastParseResult<GlobalScope, {}>;
}): JSX.Element {
  const parsed = transform<GlobalScope, {}>(props.mds, proseComponents);
  return (
    <div class="text-lg">
      <For each={Object.values(parsed.steps)}>
        {(step) => (
          <section>
            <step.Body />
          </section>
        )}
      </For>
    </div>
  );
}
