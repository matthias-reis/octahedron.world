import { Meta, Title } from "@solidjs/meta";
import { useSearchParams } from "@solidjs/router";
import { Show } from "solid-js";
import { H1 } from "~/sites/mreis/typography";

/** Admin login for seiten.mreis.me. The POST is handled by the middleware. */
export default function SeitenLogin() {
  const [params] = useSearchParams();

  return (
    <main class="max-w-md mx-auto px-smd py-s3xl">
      <Title>Anmelden – Seiten</Title>
      <Meta name="robots" content="noindex,nofollow" />
      <H1 class="mb-slg">Anmelden</H1>
      <form method="post" action="/login" class="flex flex-col gap-smd">
        <Show when={params.fehler}>
          <p class="rounded-md border border-col-hi-bg px-smd py-ssm">
            Das Passwort stimmt nicht.
          </p>
        </Show>
        <label class="flex flex-col gap-sxs">
          <span class="text-sm font-semibold">Passwort</span>
          <input
            type="password"
            name="passwort"
            required
            autocomplete="current-password"
            class="rounded-md border border-col-border bg-col-bg px-smd py-ssm outline-offset-2 outline-col-hi-bg focus:outline-2"
          />
        </label>
        <button
          type="submit"
          class="rounded-md bg-col-hi-bg text-col-hi-fg px-smd py-ssm font-semibold"
        >
          Anmelden
        </button>
      </form>
    </main>
  );
}
