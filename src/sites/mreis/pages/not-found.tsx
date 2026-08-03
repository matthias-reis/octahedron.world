import { useLocation } from "@solidjs/router";
import { HttpStatusCode } from "@solidjs/start";
import { ButtonLink } from "~/ui/button";
import { Head } from "~/ui/head";
import { H1 } from "../typography";

export default function MreisNotFound() {
  const location = useLocation();

  return (
    <main class="py-s2xl px-smd min-h-screen font-sans max-w-4xl mx-auto text-center">
      <HttpStatusCode code={404} />
      <Head
        title="Not Found"
        description={`The page ${location.pathname} was not found.`}
      />

      <p class="font-mono text-col-fg-muted mb-smd">{location.pathname}</p>
      <H1 class="mb-sxl">Not Found</H1>
      <p class="text-xl leading-relaxed max-w-xl mx-auto mb-s2xl">
        This page does not exist — it may have moved, or the link that brought
        you here was never right in the first place.
      </p>
      <div class="flex justify-center">
        <ButtonLink href="/">Back to the homepage</ButtonLink>
      </div>
    </main>
  );
}
