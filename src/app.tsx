import { Route, Router } from '@solidjs/router';
import { FileRoutes } from '@solidjs/start/router';
import { For, Suspense } from 'solid-js';
import Nav from '~/components/nav';
import './app.css';
import 'katex/dist/katex.min.css';
import { MdsTemplate } from './components/mds-template';
import routes from '../routes.json';
import { Footer } from './components/footer';
import { MetaProvider } from '@solidjs/meta';
import { I18nProvider } from './i18n/context';
import { colorSpace, setColorSpace } from './store/color-space';
import { createEffect } from 'solid-js';
import { useLocation } from '@solidjs/router';

export default function App() {
  return (
    <MetaProvider>
      <I18nProvider>
        <Router
          root={(props) => {
            const location = useLocation();
            createEffect(() => {
              // Set colorSpace based on pathname to avoid flicker from a
              // two-step reset→override pattern. Add more routes here as needed.
              if (location.pathname.startsWith('/pcsc-one')) {
                setColorSpace('pcsc-one');
              } else {
                setColorSpace('petrol');
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
          <For each={routes}>
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
