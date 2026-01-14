import { Layout } from '~/types';
import { Title } from './title';
import { DefaultPlugin } from '~/components/plugins/default';
import { TextPlugin } from '~/components/plugins/text';
import { largeImageUrl } from '~/components/image-helpers';
import { A } from '@solidjs/router';
import { ChevronLeft } from 'lucide-solid/icons/index';
import { LanguageLink } from '~/components/language-link';
import { Related } from '~/components/related';

export const layout: Layout = {
  main: ({ children, item }) => (
    <div class={`${item.colorSpace} bg-neutral-150 min-h-screen`}>
      <main class="max-w-5xl mx-auto px-3 py-7">
        <A
          href={`/${item.group}`}
          class="flex items-center justify-start text-decent-600 mb-6 gap-2 uppercase"
        >
          <ChevronLeft /> <span>{item.group.replace(/-/g, ' ')}</span>
        </A>
        <Title {...item} />
        <img
          src={largeImageUrl(item.image)}
          alt={item.title}
          class="mx-auto mb-6 aspect-image w-full object-contain max-w-3xl"
        />
        <p class="text-center text-md font-sans text-decent-600 mb-2 mx-auto max-w-md">
          {item.description}
        </p>
        <p class="text-center text-sm font-sans text-decent-500 mb-6">
          Read: {Math.round(item.words / 200)} min ✧ Words:{' '}
          {item.words.toLocaleString()} ✧ Chars: {item.chars.toLocaleString()}
        </p>
        <LanguageLink item={item} />
        {children}
        <Related item={item} />
      </main>
    </div>
  ),
  section: ({ children }) => (
    <section class="mx-5 sm:mx-7 md:mx-8 lg:mx-9 mb-7">{children}</section>
  ),
  plugins: {
    default: DefaultPlugin,
    text: TextPlugin(),
  },
};
