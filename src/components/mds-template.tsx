import { createAsync } from '@solidjs/router';
import { Show } from 'solid-js';
import { clientOnly } from '@solidjs/start';
import { getRoute } from '~/model/model';

const renderers: Record<string, ReturnType<typeof clientOnly>> = {
  dica: clientOnly(() => import('~/renderers/dica/create-template')),
  digest: clientOnly(() => import('~/renderers/digest')),
  grid: clientOnly(() => import('~/renderers/grid')),
  album: clientOnly(() => import('~/renderers/album')),
  legal: clientOnly(() => import('~/renderers/legal')),
  lightbox: clientOnly(() => import('~/renderers/lightbox')),
  storyline: clientOnly(() => import('~/renderers/storyline')),
  report: clientOnly(() => import('~/renderers/report')),
  world2: clientOnly(() => import('~/renderers/world2')),
  post: clientOnly(() => import('~/renderers/default')),
  default: clientOnly(() => import('~/renderers/default')),
};

export const MdsTemplate = ({ route }: { route: string }) => {
  const item = createAsync(() => getRoute(route));

  return (
    <Show when={item()}>
      {(data) => {
        const type = data().type;
        const mds = data().mds;
        const Renderer = type ? renderers[type] : undefined;

        if (!Renderer || !mds) {
          return (
            <section class="max-w-4xl mx-auto p-8">
              <h1 class="text-2xl font-bold mb-4">{data().title}</h1>
              <p class="text-red-500">
                Unknown renderer type: {type ?? 'none'}
              </p>
            </section>
          );
        }

        return <Renderer mds={mds} />;
      }}
    </Show>
  );
};
