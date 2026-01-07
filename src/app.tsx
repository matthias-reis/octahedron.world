import { Route, Router } from '@solidjs/router';
import { FileRoutes } from '@solidjs/start/router';
import { For, Suspense } from 'solid-js';
import Nav from '~/components/nav';
import './app.css';
import { Octa } from './components/octa';
import routes from '../routes.json';

export default function App() {
  return (
    <Router
      root={(props) => (
        <>
          <Nav />
          <Suspense>{props.children}</Suspense>
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
