// @refresh reload
import { createHandler, StartServer } from "@solidjs/start/server";
import { getLocale } from "./i18n/context";
import { getSite } from "./site/context";
import { SiteIcons } from "./ui/head";

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
