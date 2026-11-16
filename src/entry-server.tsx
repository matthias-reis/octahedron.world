// @refresh reload
import { createHandler, StartServer } from "@solidjs/start/server";
import { Show } from "solid-js";
import { getLocale } from "./i18n/context";
import { getSite, type Site } from "./site/context";
import { SiteIcons } from "./ui/head";

/** Umami website per site; a site missing here is not tracked. */
const UMAMI: Partial<Record<Site, { id: string; domains: string }>> = {
  mreis: {
    id: "f55d69bc-b2d5-4751-b16b-8386ddb037b8",
    domains: "mreis.me,www.mreis.me",
  },
  octahedron: {
    id: "d90f1d78-ae60-4f2d-9bff-e6514fcdfc36",
    domains: "octahedron.world,www.octahedron.world",
  },
};

export default createHandler(() => (
  <StartServer
    document={({ assets, children, scripts }) => (
      // The site class carries the whole visual identity: color-scheme, root
      // font-size and every design token hang off it. It has to sit on <html>
      // (UA background, rem base) and be set during SSR so there is no theme
      // flash and no hydration mismatch.
      // seiten (client previews) borrows mreis's tokens for its overview and
      // login pages; the microsites themselves paint their own `.ms-root`.
      <html
        lang={getSite() === "seiten" ? "de" : getLocale()}
        class={getSite() === "seiten" ? "site-mreis site-seiten" : `site-${getSite()}`}
      >
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <SiteIcons />
          {/* Umami (self-hosted, cookieless) on mreis.me and octahedron.world;
              the seiten previews stay untracked. data-domains keeps local
              previews out of the stats. */}
          <Show when={UMAMI[getSite()]}>
            {(umami) => (
              <script
                defer
                src="https://stats.neustart.studio/script.js"
                data-website-id={umami().id}
                data-domains={umami().domains}
              />
            )}
          </Show>
          {assets}
        </head>
        <body>
          <div id="app">{children}</div>
          {scripts}
        </body>
      </html>
    )}
  />
));
