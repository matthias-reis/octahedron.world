import { createAsync } from "@solidjs/router";
import { clientOnly } from "@solidjs/start";
import { type Component, createEffect, lazy, Show } from "solid-js";
import { getRoute } from "~/model/model";
import { LockedPage } from "~/sites/seiten/locked";
import { setColorSpace } from "~/store/color-space";

// biome-ignore lint/suspicious/noExplicitAny: renderers take differently typed MDS props
const renderers: Record<string, Component<any>> = {
  dica: clientOnly(() => import("~/renderers/dica/create-template")),
  digest: clientOnly(() => import("~/renderers/digest")),
  grid: clientOnly(() => import("~/renderers/grid")),
  album: clientOnly(() => import("~/renderers/album")),
  legal: clientOnly(() => import("~/renderers/legal")),
  lightbox: clientOnly(() => import("~/renderers/lightbox")),
  storyline: clientOnly(() => import("~/renderers/storyline")),
  report: clientOnly(() => import("~/renderers/report")),
  "population-simulation": clientOnly(
    () => import("~/renderers/population-simulation"),
  ),
  world2: clientOnly(() => import("~/renderers/world2")),
  post: clientOnly(() => import("~/renderers/post")),
  default: clientOnly(() => import("~/renderers/default")),
  // mreis.me's long-form renderer — token-driven, no octahedron palette.
  article: clientOnly(() => import("~/sites/mreis/renderers/article")),
  // Microsites (seiten.mreis.me) are server-rendered: first paint is the page.
  microsite: lazy(() => import("~/renderers/microsite")),
};

export const MdsTemplate = ({ route }: { route: string }) => {
  // deferStream: hold the first flush until the page data is there, so the
  // <title> and og:* tags a renderer sets end up in the server-rendered
  // <head> — link-preview crawlers do not run JavaScript.
  const item = createAsync(() => getRoute(route), { deferStream: true });

  createEffect(() => {
    const data = item();
    if (data && data.colorSpace) {
      setColorSpace(data.colorSpace);
    }
  });

  return (
    <Show when={item()}>
      {(data) => {
        if (data().locked) {
          return <LockedPage slug={data().slug} reason={data().lockReason} />;
        }

        const type = data().type;
        const mds = data().mds;
        const Renderer = type ? renderers[type] : undefined;

        if (!Renderer || !mds) {
          return (
            <section class="max-w-4xl mx-auto p-8">
              <h1 class="text-2xl font-bold mb-4">{data().title}</h1>
              <p class="text-cbs5">Unknown renderer type: {type ?? "none"}</p>
            </section>
          );
        }

        return <Renderer mds={mds} accessCode={data().accessCode} />;
      }}
    </Show>
  );
};
