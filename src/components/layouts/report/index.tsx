import { Layout } from '~/types';
import { DefaultPlugin } from '~/components/plugins/default';
import { TextPlugin } from '~/components/plugins/text';
import { largeImageUrl } from '~/components/image-helpers';

export const layout: Layout = {
  main: ({ children, item }) => (
    <div class={`${item.colorSpace} bg-neutral-150 min-h-screen`}>
      <main class="max-w-4xl mx-auto px-3 pb-7">
        <img
          src={largeImageUrl(item.image)}
          alt={item.title}
          class="mx-auto mb-6 w-full object-contain"
        />
        <div class="text-center relative -top-10 -mb-8">
          {item.superTitle && (
            <p class="text-lg uppercase text-decent-900 mt-5 font-bold tracking-widest font-octa text-shadow-md text-shadow-neutral-500">
              {item.superTitle}
            </p>
          )}
          <h1 class="text-8xl text-decent-900 font-octa font-bold leading-none text-shadow-md text-shadow-neutral-500">
            {item.title}
          </h1>
          {item.subTitle && (
            <p class="text-lg text-decent-900 mt-2 text-shadow-md text-shadow-neutral-500">
              {item.subTitle}
            </p>
          )}
        </div>
        <p class="text-center text-md font-sans text-decent-600 mb-6 mx-auto w-md">
          {item.description}
        </p>
        {children}
      </main>
    </div>
  ),
  section: ({ children }) => (
    <section class="mx-5 sm:mx-7 mb-7">{children}</section>
  ),
  plugins: {
    default: DefaultPlugin,
    text: TextPlugin(),
  },
};
