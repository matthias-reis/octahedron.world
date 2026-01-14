import { Layout } from '~/types';
import { DefaultPlugin } from '~/components/plugins/default';
import { TextPlugin } from '~/components/plugins/text';
import { largeImageUrl } from '~/components/image-helpers';
import { CalendarDays, ChevronLeft } from 'lucide-solid';
import dayjs from 'dayjs';
import { A } from '@solidjs/router';
import { cx } from '~/components/cx';

export const layout: Layout = {
  main: ({ children, item }) => (
    <div
      class={cx(` min-h-screen gradient bg-neutral-100 pb-20`, item.colorSpace)}
    >
      <div class="justify-center items-center pt-5 pb-2 relative w-full h-[90vh]">
        <img
          src={largeImageUrl(item.image)}
          alt={item.title}
          class="top-0 object-contain w-full h-full"
        />
      </div>
      <h1 class="text-4xl font-octa font-bold text-decent-900 text-center">
        {item.title}
      </h1>
      <A
        href={`/${item.group}`}
        class="flex justify-center uppercase text-decent-600 gap-3 text-sm"
      >
        <span>{dayjs(item.date).format('YYYY-MM-DD')}</span>
        <span>·</span>
        <strong class="font-bold ">{item.group}</strong>
      </A>
      {item.date && (
        <p class="uppercase text-center text-xs text-decent-600 tracking-wider"></p>
      )}
    </div>
  ),
  section: ({ children }) => <section class="">{children}</section>,
  plugins: {
    default: DefaultPlugin,
    text: TextPlugin(),
  },
};
