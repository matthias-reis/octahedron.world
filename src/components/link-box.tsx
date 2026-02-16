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
      class={cx(
        'bg-can7 min-h-8 flex flex-col sm:flex-row justify-stretch gap-3 outline-2 -outline-offset-2 outline-transparent hover:outline-cas5',
        small && 'md:flex-col'
      )}
    >
      <img
        src={smallImageUrl(item.image)}
        alt={item.title}
        class={cx('aspect-image object-cover', small ? 'h-8 md:h-auto' : 'h-8')}
      />
      <span class="m-3 flex flex-col">
        <span class="font-octa font-bold text-3xl text-can2 mb-2">
          {item.title}
        </span>
        <span class="text-can4 text-lg">{item.description}</span>
      </span>
    </A>
  );
};
