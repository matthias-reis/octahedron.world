import { MetaProvider } from "@solidjs/meta";
import { Route, Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { For, lazy } from "solid-js";
import "./app.css";
import "katex/dist/katex.min.css";
import routes from "../routes.json";
import { MdsTemplate } from "./components/mds-template";
import { I18nProvider } from "./i18n/context";
import { getSite } from "./site/context";
import { MreisShell } from "./sites/mreis/shell";
import { OctahedronShell } from "./sites/octahedron/shell";

// mreis's static pages are not file routes: `src/routes/` is shared by both
// sites and these must never resolve on octahedron.
const mreisRoutes = [
  { path: "/cv", component: lazy(() => import("./sites/mreis/pages/cv")) },
  {
    path: "/portfolio",
    component: lazy(() => import("./sites/mreis/pages/portfolio")),
  },
  {
    path: "/contact",
    component: lazy(() => import("./sites/mreis/pages/contact")),
  },
];

export default function App() {
  const site = getSite();
  const siteRoutes = routes.filter((r) => (r.site ?? "octahedron") === site);
  const extraRoutes = site === "mreis" ? mreisRoutes : [];

  return (
    <MetaProvider>
      <I18nProvider>
        <Router
          root={(props) =>
            site === "mreis" ? (
              <MreisShell>{props.children}</MreisShell>
            ) : (
              <OctahedronShell>{props.children}</OctahedronShell>
            )
          }
        >
          <For each={siteRoutes}>
            {(route) => (
              <Route
                path={`/${route.slug}`}
                component={() => <MdsTemplate route={route.slug} />}
              />
            )}
          </For>
          <For each={extraRoutes}>
            {(route) => <Route path={route.path} component={route.component} />}
          </For>
          <FileRoutes />
        </Router>
      </I18nProvider>
    </MetaProvider>
  );
}
