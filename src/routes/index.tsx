import { A } from '@solidjs/router';
import { For } from 'solid-js';
import { cx } from '~/components/cx';
import OctahedronLogo from '~/components/octahedron-logo';

export default function HomePage() {
  const items = Array(21).fill({
    title: 'Title',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.',
    image: 'reference',
    slug: 'all',
  });
  return (
    <div>
      <main class="mx-auto mb-7 max-w-6xl px-3">
        <div
          style={{ 'background-image': 'url(/img/_home/l.jpg)' }}
          class="bg-cover aspect-wide border border-transparent"
        >
          <div class="w-full h-full bg-center flex flex-col justify-center items-center text-center bg-linear-to-b from-transparent via-black to-transparent">
            <h1 class="font-octa flex justify-center items-center gap-2 text-neutral-500 text-4xl w-full">
              <span class="text-decent-600 font-bold ">OCTAHEDRON</span>
              <OctahedronLogo class="text-saturated-500 w-6 h-6" />
              <span class="text-decent-400 font-light">WORLD</span>
            </h1>
            <h2 class="text-decent-500 text-xl font-lighter font-sans mt-3">
              Ephemeral Thoughts about Life,
              <br />
              the Universe and Everything.
            </h2>
          </div>
        </div>
        <ul class="grid grid-cols-4 gap-0">
          <For each={items}>
            {(item, index) => {
              const isWide = index() % 5 === 0;
              const isTextTop = index() % 2 !== 0;
              const colorClass = [
                'bg-neutral-300',
                'bg-saturated-300',
                'bg-decent-300',
              ][index() % 3];
              const img = (
                <img
                  src={`/img/reference/s.jpg`}
                  alt="Reference"
                  class={cx(
                    'object-cover w-full',
                    isWide ? 'aspect-double' : 'aspect-square'
                  )}
                />
              );
              const text = (
                <div class="grow">
                  <h3
                    class={cx(
                      'font-octa font-bold px-4 mt-4 mb-2',
                      isWide ? 'text-5xl' : 'text-3xl'
                    )}
                  >
                    Title
                  </h3>
                  <p
                    class={cx(
                      'font-octa px-4 text-neutral-900 mb-4',
                      isWide && 'text-lg mr-8'
                    )}
                  >
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam.
                  </p>
                </div>
              );
              return (
                <li
                  class={cx(
                    'border border-transparent',
                    isWide && 'col-span-2'
                  )}
                >
                  <A
                    href={`/${item.slug}`}
                    class={cx(
                      `flex flex-col h-full outline-2 -outline-offset-8 outline-transparent hover:outline-saturated-500 transition-all duration-200`,
                      colorClass
                    )}
                  >
                    {isTextTop ? (
                      <>
                        {text}
                        {img}
                      </>
                    ) : (
                      <>
                        {img}
                        {text}
                      </>
                    )}
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
