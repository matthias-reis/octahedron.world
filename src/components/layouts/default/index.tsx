import { Layout } from '~/types';
import { DefaultPlugin } from '~/components/plugins/default';
import { TextPlugin } from '~/components/plugins/text';
import { largeImageUrl } from '~/components/image-helpers';
import { CalendarDays, ChevronLeft } from 'lucide-solid';
import dayjs from 'dayjs';
import { A } from '@solidjs/router';

export const layout: Layout = {
  main: ({ children, item }) => (
    <div
      class={`${item.colorSpace} min-h-screen gradient bg-linear-to-b from-neutral-200 to-neutral-300 pb-20`}
    >
      <main class="max-w-5xl mx-auto bg-neutral-150 flex items-start gap-6 justify-stretch">
        <div class="w-1/2">
          <img
            src={largeImageUrl(item.image)}
            alt={item.title}
            class="w-full object-contain mb-5"
          />

          <p class="text-right text-lg font-sans text-decent-600 mt-8 w-1/2 text-balance ml-auto">
            {item.description}
          </p>
          <A
            href={`/${item.group}`}
            class="flex items-center justify-end text-decent-600 mt-6 gap-2 uppercase"
          >
            <ChevronLeft /> <span>{item.group.replace(/-/g, ' ')}</span>
          </A>
        </div>
        <div class="w-1/2 pt-8 px-6 pb-7">
          {item.superTitle && (
            <p class="uppercase text-decent-500 mb-3">{item.superTitle}</p>
          )}
          <h1 class="text-6xl text-saturated-800 font-octa font-bold text-balance">
            {item.title}
          </h1>
          {item.subTitle && (
            <p class="text-lg text-decent-400 text-right">{item.subTitle}</p>
          )}
          <p class="flex items-center text-decent-500 mt-6 mb-7 gap-2 text-sm">
            <CalendarDays />{' '}
            <span>{dayjs(item.date).format('YYYY-MM-DD')}</span>
            <span>·</span>
            <span>words {item.words.toLocaleString()}</span>
            <span>·</span>
            <span>chars {item.chars.toLocaleString()}</span>
          </p>
          {children}
        </div>
      </main>
    </div>
  ),
  section: ({ children }) => <section class="">{children}</section>,
  plugins: {
    default: DefaultPlugin,
    text: TextPlugin(),
  },
};
