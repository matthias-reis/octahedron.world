import { CompactItemMeta } from '~/types';
import { smallImageUrl } from './image-helpers';
import { A } from '@solidjs/router';
import { cx } from './cx';
import { Component } from 'solid-js';

export const LinkBox: Component<{ item: CompactItemMeta; small?: boolean }> = ({
  item,
  small,
}) => {
  return (
    <A
      href={`/${item.slug}`}
      class="bg-decent-300 min-h-8 flex flex-col sm:flex-row justify-stretch gap-3 outline-2 -outline-offset-2 outline-transparent hover:outline-saturated-500"
    >
      <img
        src={smallImageUrl(item.image)}
        alt=""
        class={cx('aspect-image object-contain', small ? 'h-8 md:h-7' : 'h-8')}
      />
      <span class="m-3 flex flex-col">
        <span class="font-octa font-bold text-2xl">{item.title}</span>
        <span class="text-sm text-decent-500">{item.description}</span>
      </span>
    </A>
  );
};
