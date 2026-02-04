import { createAsync } from '@solidjs/router';
import { Show } from 'solid-js';
import { clientOnly } from '@solidjs/start';
import { getRoute } from '~/model/model';

const renderers: Record<string, ReturnType<typeof clientOnly>> = {
  dica: clientOnly(() => import('~/renderers/dica/create-template')),
  entry: clientOnly(() => import('~/renderers/entry')),
  grid: clientOnly(() => import('~/renderers/grid')),
  album: clientOnly(() => import('~/renderers/album')),
  legal: clientOnly(() => import('~/renderers/legal')),
  lightbox: clientOnly(() => import('~/renderers/lightbox')),
  storyline: clientOnly(() => import('~/renderers/storyline')),
};

export const MdsTemplate = ({ route }: { route: string }) => {
  const item = createAsync(() => getRoute(route));

  return (
    <Show when={item()}>
      {(data) => {
        const type = data().type;
        const raw = data().raw;
        const Renderer = type ? renderers[type] : undefined;

        if (!Renderer || !raw) {
          return (
            <section class="max-w-4xl mx-auto p-8">
              <h1 class="text-2xl font-bold mb-4">{data().title}</h1>
              <p class="text-red-500">
                Unknown renderer type: {type ?? 'none'}
              </p>
            </section>
          );
        }

        return <Renderer markdown={raw} />;
      }}
    </Show>
  );
};
