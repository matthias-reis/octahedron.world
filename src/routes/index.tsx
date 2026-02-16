import { A, createAsyncStore } from '@solidjs/router';
import { For } from 'solid-js';
import { cx } from '~/components/cx';
import { largeImageUrl, smallImageUrl } from '~/components/image-helpers';
import OctahedronLogo from '~/components/octahedron-logo';
import { sortRootItems } from '~/model/helpers';
import { getAllRootRoutes } from '~/model/model';
import { CompactItemMeta } from '~/types';
import { Head } from '~/components/head';
import { useI18n } from '~/i18n/context';

export default function HomePage() {
  const getItems = createAsyncStore(() => getAllRootRoutes());
  const { t } = useI18n();

  const items = () => sortRootItems(getItems() || []);

  return (
    <div>
      <Head />
      <main class="mx-auto mb-7 max-w-6xl">
        <div
          style={{ 'background-image': `url(${largeImageUrl('_home')})` }}
          class="bg-cover bg-center aspect-image md:aspect-wide border border-transparent"
        >
          <div class="w-full h-full bg-center flex flex-col justify-center items-center text-center bg-linear-to-b from-transparent via-black to-transparent">
            <h1 class="font-octa flex justify-center items-center gap-2 text-neutral-500 text-4xl w-full">
              <span class="text-decent-600 font-bold ">OCTAHEDRON</span>
              <OctahedronLogo class="text-saturated-500 w-6 h-6" />
              <span class="text-decent-400 font-light">WORLD</span>
            </h1>
            <h2 class="text-decent-500 text-xl max-w-md font-lighter font-sans mt-3 text-balance">
              {t('home.tagline')}
            </h2>
          </div>
        </div>
        <ul class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-0">
          <For each={items()}>
            {(item: CompactItemMeta, index) => {
              const isWide = index() % 5 === 0;
              const isTextTop = index() % 2 !== 0;
              const colorClass = [
                'bg-cas7',
                'bg-cad7',
                'bg-cbn7',
                'bg-cad8',
                'bg-cad7',
              ][index() % 5];

              return (
                <li
                  class={cx(
                    'border border-transparent p-3 md:p-0',
                    isWide && 'sm:col-span-2'
                  )}
                  data-weight={item.weight}
                >
                  <A
                    href={`/${item.slug}`}
                    class={cx(
                      `flex flex-col h-full outline-2 -outline-offset-2 outline-transparent hover:outline-cas4 transition-all duration-200`,
                      isTextTop && 'md:flex-col-reverse',
                      colorClass
                    )}
                  >
                    <img
                      src={smallImageUrl(item.image)}
                      alt="Reference"
                      class={cx(
                        'object-cover w-full',
                        isWide ? 'aspect-double' : 'aspect-square'
                      )}
                    />
                    <div class="grow">
                      <h3
                        class={cx(
                          'font-octa font-bold px-4 mt-4 mb-2 text-can2',
                          isWide ? 'text-5xl' : 'text-3xl'
                        )}
                      >
                        {item.title}
                      </h3>
                      <p
                        class={cx(
                          'font-sans px-4 text-can3 mb-4',
                          isWide && 'text-lg sm:mr-8'
                        )}
                      >
                        {item.description}
                      </p>
                    </div>
                  </A>
                </li>
              );
            }}
          </For>
        </ul>
      </main>
    </div>
  );
}
