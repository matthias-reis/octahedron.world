import type { ItemMeta, Sec } from '~/types';
import { layouts } from './layouts';
import { For, JSX, ParentComponent, Show } from 'solid-js';
import { createAsync } from '@solidjs/router';
import { DefaultPlugin } from './plugins/default';
import { getRoute } from '~/model/model';

export const Octa = ({ route }: { route: string }) => {
  const meta = createAsync(() => getRoute(route));

  return (
    <Show when={meta()} fallback={<div>Loading...</div>}>
      {(resolvedMeta) => {
        const metaValue = resolvedMeta();
        if (!metaValue) {
          throw new Error(`Octa Route not found: ${route}`);
        }
        const layout =
          layouts[metaValue.layout || 'default'] || layouts.default;
        const Main = layout.main;
        return (
          <Main item={metaValue}>
            <For each={metaValue.sections}>
              {(section: Sec) => {
                const Plugin =
                  section.type in layout.plugins
                    ? layout.plugins![section.type]
                    : DefaultPlugin;
                const Section =
                  layout.section || (({ children }) => <>{children}</>);
                return (
                  <Plugin
                    type={section.type}
                    payload={section.payload}
                    wrapper={Section}
                  />
                );
              }}
            </For>
          </Main>
        );
      }}
    </Show>
  );
};
