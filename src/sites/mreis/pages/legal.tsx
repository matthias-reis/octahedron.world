import { createAsync } from "@solidjs/router";
import { clientOnly } from "@solidjs/start";
import { Show } from "solid-js";
import { getRoute } from "~/model/model";
import { Head } from "~/ui/head";
import { H1 } from "../typography";

const LegalRenderer = clientOnly(() => import("../renderers/legal"));

/**
 * mreis.me's legal pages. Their text lives in the vault as `format: none`
 * pages (`mreis-impressum`, `mreis-datenschutz`); these routes give them the
 * German paths a visitor expects and mreis.me's layout.
 */
function LegalPage(props: { slug: string }) {
  const item = createAsync(() => getRoute(props.slug), { deferStream: true });

  return (
    <main class="max-w-3xl mx-auto px-smd pb-s3xl">
      <Head title={item()?.title} />
      <H1 class="mb-sxl">{item()?.title}</H1>
      <Show when={item()?.mds}>{(mds) => <LegalRenderer mds={mds()} />}</Show>
    </main>
  );
}

export function Impressum() {
  return <LegalPage slug="mreis-impressum" />;
}

export function Datenschutz() {
  return <LegalPage slug="mreis-datenschutz" />;
}
