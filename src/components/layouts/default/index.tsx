import { Layout } from '~/types';
import { DefaultPlugin } from '~/components/plugins/default';
import { TextPlugin } from '~/components/plugins/text';
import { largeImageUrl } from '~/components/image-helpers';
import { CalendarDays, ChevronLeft } from 'lucide-solid';
import dayjs from 'dayjs';
import { A } from '@solidjs/router';
import { LinkPlugin } from '~/components/plugins/link';
import { LanguageLink } from '~/components/language-link';
import { Related } from '~/components/related';

export const layout: Layout = {
  main: ({ children, item }) => (
    <div
      class={`${item.colorSpace} min-h-screen gradient bg-linear-to-b from-neutral-200 to-neutral-300 pb-20`}
    >
      <main class="max-w-2xl xl:max-w-5xl mx-auto bg-neutral-150 grid grid-cols-1 xl:grid-cols-2 items-start gap-6 justify-stretch">
        <div class="relative">
          <img
            src={largeImageUrl(item.image)}
            alt={item.title}
            class="aspect-double xl:aspect-auto w-full object-cover mb-5"
          />
          <p class="hidden xl:block text-right text-lg font-sans text-decent-600 mt-8 w-1/2 text-balance ml-auto">
            {item.description}
          </p>
          <A
            href={`/${item.group}`}
            class="absolute top-3 left-3 flex items-center justify-start text-decent-900 mb-6 gap-2 uppercase  text-shadow-md text-shadow-neutral-500"
          >
            <ChevronLeft /> <span>{item.group.replace(/-/g, ' ')}</span>
          </A>
        </div>
        <div class="xl:pt-8 px-6 pb-7">
          {item.superTitle && (
            <p class="uppercase text-decent-500 mb-3">{item.superTitle}</p>
          )}
          <h1 class="text-6xl text-saturated-800 font-octa font-bold text-balance">
            {item.title}
          </h1>
          {item.subTitle && (
            <p class="text-lg text-decent-400 text-right">{item.subTitle}</p>
          )}
          <p class="xl:hidden text-lg font-sans text-decent-600  w-3/4 text-balance">
            {item.description}
          </p>
          <p class="flex items-center text-decent-500 mt-6 mb-7 gap-2 text-sm">
            <CalendarDays />{' '}
            <span>{dayjs(item.date).format('YYYY-MM-DD')}</span>
            <span>✧</span>
            <span>Read: {Math.round(item.words / 200)} min</span>
            <span>✧</span>
            <span>Words: {item.words.toLocaleString('en-GB')}</span>
            <span>✧</span>
            <span>Chars: {item.chars.toLocaleString('en-GB')}</span>
          </p>
          <LanguageLink item={item} />
          {children}
        </div>
      </main>
      <aside class="max-w-4xl mt-5 mx-auto">
        <Related item={item} />
      </aside>
    </div>
  ),
  section: ({ children }) => <section class="">{children}</section>,
  plugins: {
    default: DefaultPlugin,
    link: LinkPlugin,
    text: TextPlugin(),
  },
};
