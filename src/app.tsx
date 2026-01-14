import { Route, Router } from '@solidjs/router';
import { FileRoutes } from '@solidjs/start/router';
import { For, Suspense } from 'solid-js';
import Nav from '~/components/nav';
import './app.css';
import 'katex/dist/katex.min.css';
import { Octa } from './components/octa';
import routes from '../routes.json';
import { Footer } from './components/footer';

export default function App() {
  return (
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
          <Route path={`/${route}`} component={() => <Octa route={route} />} />
        )}
      </For>
      <FileRoutes />
    </Router>
  );
}
