import { A, createAsync } from '@solidjs/router';
import { For } from 'solid-js';
import { getAllCompactRoutes } from '~/model/model';

export default function AllRoutesPage() {
  const routes = createAsync(() => getAllCompactRoutes());
  const routesList = () => Object.values(routes() || {});

  return (
    <main class="mx-auto my-6 max-w-3xl p-4">
      <h1 class="mb-6 text-6xl font-bold">All Routes</h1>
      <ul class="space-y-2">
        <For each={routesList()}>
          {(route) => (
            <li>
              <A href={`/${route.slug}`} class="text-main-600 hover:underline">
                {route.title}
                <span class="text-decent-500 ml-2 text-sm">
                  ({route.group || '-'})
                </span>
                <span class="text-complement ml-2 text-sm">
                  ({route.layout || '-'})
                </span>
              </A>
            </li>
          )}
        </For>
      </ul>
    </main>
  );
}
