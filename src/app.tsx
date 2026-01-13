import { Route, Router } from '@solidjs/router';
import { FileRoutes } from '@solidjs/start/router';
import { For, Suspense } from 'solid-js';
import Nav from '~/components/nav';
import './app.css';
import 'katex/dist/katex.min.css';
import { Octa } from './components/octa';
import routes from '../routes.json';

export default function App() {
  return (
    <Router
      root={(props) => (
        <>
          <Nav />
          <Suspense>
            <div class="border-t-4 border-yellow-400 sm:border-orange-400 md:border-purple-400 lg:border-blue-400 xl:border-green-400">
              {props.children}
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
