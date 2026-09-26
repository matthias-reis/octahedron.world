import { Meta, Title } from "@solidjs/meta";
import { LockKeyhole } from "lucide-solid";
import { type Component, Show } from "solid-js";

/**
 * What a seiten page shows without access: a code field and nothing else —
 * no title, no hint which business the page is for. Also shown for slugs
 * that don't exist, so the page tells nobody what exists.
 *
 * The form is a plain GET to the same page with `?k=`: works without
 * JavaScript, and a valid code is turned into a page cookie by the
 * middleware.
 */
export const LockedPage: Component<{
  slug: string;
  reason?: "missing" | "invalid" | "expired";
}> = (props) => (
  <main class="min-h-screen flex items-center justify-center px-smd py-s2xl bg-col-bg text-col-fg font-sans">
    <Title>Geschützte Vorschau</Title>
    <Meta name="robots" content="noindex,nofollow" />
    <Meta property="og:title" content="Geschützte Vorschau" />
    <Meta
      property="og:description"
      content="Diese Konzeptvorschau ist nur mit einem Zugangscode erreichbar."
    />

    <form
      method="get"
      action={`/${props.slug}`}
      class="w-full max-w-md flex flex-col gap-smd rounded-lg border border-col-border bg-col-surface p-sxl"
    >
      <LockKeyhole class="w-[2rem] h-[2rem] text-col-hi-bg" />
      <h1 class="font-display text-4xl leading-tight">Geschützte Vorschau</h1>
      <p class="leading-relaxed text-col-fg-muted">
        Diese Seite ist eine persönliche Konzeptvorschau und nur mit einem
        Zugangscode erreichbar.
      </p>
      <Show when={props.reason === "expired"}>
        <p class="rounded-md border border-col-hi-bg px-smd py-ssm">
          Dieser Zugang ist abgelaufen. Bitte fragen Sie einen neuen Code an.
        </p>
      </Show>
      <Show when={props.reason === "invalid"}>
        <p class="rounded-md border border-col-hi-bg px-smd py-ssm">
          Dieser Code passt nicht. Bitte prüfen Sie die Eingabe.
        </p>
      </Show>
      <label class="flex flex-col gap-sxs">
        <span class="text-sm font-semibold">Zugangscode</span>
        <input
          name="k"
          required
          autocomplete="off"
          autocapitalize="characters"
          spellcheck={false}
          placeholder="XXXX-XXXX-XXXX-XXXX"
          class="rounded-md border border-col-border bg-col-bg px-smd py-ssm font-mono tracking-wider text-lg outline-offset-2 outline-col-hi-bg focus:outline-2"
        />
      </label>
      <button
        type="submit"
        class="rounded-md bg-col-hi-bg text-col-hi-fg px-smd py-ssm font-semibold hover:opacity-90 transition-opacity"
      >
        Vorschau öffnen
      </button>
    </form>
  </main>
);
