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

export default function App() {
  return (
    <MetaProvider>
      <I18nProvider>
        <Router
          root={(props) => (
            <>
              <Nav />
              <Suspense>
                <div class="bg-neutral-100">
                  {props.children}
                  <Footer />
                </div>
              </Suspense>
            </>
          )}
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
