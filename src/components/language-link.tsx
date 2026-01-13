import { A } from '@solidjs/router';
import { Component } from 'solid-js';
import { ItemMeta } from '~/types';

export const LanguageLink: Component<{ item: ItemMeta }> = ({ item }) => {
  if (!item.ref) return null;

  const text =
    item.language === 'en' ? '🇩🇪 German version' : '🇬🇧 English version';

  return (
    <p class="text-right mb-5">
      <A
        href={`/${item.ref}`}
        class="text-decent-500 hover:text-decent-700 underline underline-offset-4"
      >
        {text}
      </A>
    </p>
  );
};
