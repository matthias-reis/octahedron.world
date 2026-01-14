import { Layout } from '~/types';
import { DefaultPlugin } from '~/components/plugins/default';
import { TextPlugin } from '~/components/plugins/text';
import { largeImageUrl } from '~/components/image-helpers';
import { A } from '@solidjs/router';
import { ChevronLeft } from 'lucide-solid/icons/index';
import { LinkPlugin } from '~/components/plugins/link';
import { GroupPlugin } from '~/components/plugins/group';
import { CtaPlugin } from '~/components/plugins/cta';

export const layout: Layout = {
  main: ({ children, item }) => (
    <div class={`${item.colorSpace} bg-neutral-150 min-h-screen`}>
      <main class="max-w-3xl mx-auto px-3 py-7">
        <A
          href={`/`}
          class="flex items-center justify-start text-decent-600 mb-6 gap-2 uppercase"
        >
          <ChevronLeft /> <span>home</span>
        </A>
        <h1 class="text-6xl md:text-8xl text-saturated-900 font-octa font-bold leading-none text-center mb-3">
          {item.title}
        </h1>
        <img
          src={largeImageUrl(item.image)}
          alt={item.title}
          class="mx-auto mb-6 aspect-image w-full object-contain"
        />
        <p class="text-center text-md font-sans text-decent-600 mb-6 mx-auto max-w-md">
          {item.description}
        </p>
        {children}
      </main>
    </div>
  ),
  // section: ({ children }) => (
  //   <section class="mx-5 sm:mx-7 md:mx-8 lg:mx-9 mb-7">{children}</section>
  // ),
  plugins: {
    default: DefaultPlugin,
    link: LinkPlugin,
    group: GroupPlugin,
    cta: CtaPlugin,
    text: TextPlugin(),
  },
};
