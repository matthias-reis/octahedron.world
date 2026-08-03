import { Route, Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { For, Suspense } from "solid-js";
import Nav from "~/components/nav";
import "./app.css";
import "katex/dist/katex.min.css";
import { MetaProvider } from "@solidjs/meta";
import { useLocation } from "@solidjs/router";
import { createEffect } from "solid-js";
import routes from "../routes.json";
import { Footer } from "./components/footer";
import { MdsTemplate } from "./components/mds-template";
import { I18nProvider } from "./i18n/context";
import { getSite } from "./site/context";
import { colorSpace, setColorSpace } from "./store/color-space";

export default function App() {
  const site = getSite();
  const siteRoutes = routes.filter((r) => (r.site ?? "octahedron") === site);

  return (
    <MetaProvider>
      <I18nProvider>
        <Router
          root={(props) => {
            if (site === "mreis") {
              // Bare shell for mreis — no octa chrome.
              return <Suspense>{props.children}</Suspense>;
            }

            const location = useLocation();
            createEffect(() => {
              // Set colorSpace based on pathname to avoid flicker from a
              // two-step reset→override pattern. Add more routes here as needed.
              if (location.pathname.startsWith("/pcsc-one")) {
                setColorSpace("pcsc-one");
              } else {
                setColorSpace("petrol");
              }
            });

            return (
              <div class={colorSpace()}>
                <Nav />
                <Suspense>
                  <div class="bg-cb">
                    {props.children}
                    <Footer />
                  </div>
                </Suspense>
              </div>
            );
          }}
        >
          <For each={siteRoutes}>
            {(route) => (
              <Route
                path={`/${route.slug}`}
                component={() => <MdsTemplate route={route.slug} />}
              />
            )}
          </For>
          <FileRoutes />
        </Router>
      </I18nProvider>
    </MetaProvider>
  );
}
