import { Component } from 'solid-js';
import { ItemMeta } from '~/types';

export const Title: Component<ItemMeta> = ({ title, subTitle, superTitle }) => (
  <div class="text-center mb-5">
    <h1 class="text-7xl text-saturated-900 font-serif font-light leading-tight">
      {title}
    </h1>
    {subTitle && <p class="text-lg text-decent-500 mt-2">{subTitle}</p>}
    {superTitle && (
      <p class="text-lg uppercase text-decent-500 mt-5 font-bold tracking-widest font-octa">
        {superTitle}
      </p>
    )}
  </div>
);
