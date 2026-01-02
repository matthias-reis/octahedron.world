import { PropsWithChildren } from 'react';
import { ReadBoxed } from '../../comp/sections';
import type { Layout } from './types';

export const defaultLayout: Layout = {
  components: {
    h1: ({ children }: PropsWithChildren) => (
      <h1 className="font-condensed font-bold text-5xl md:text-8xl text-decent-900 uppercase mb-3">
        {children}
      </h1>
    ),
    h2: ({ children }: PropsWithChildren) => (
      <h2 className="font-bold text-serif font-condensed text-4xl md:text-5xl text-decent-900 mt-7 mb-4">
        {children}
      </h2>
    ),
    p: ({ children }: PropsWithChildren) => (
      <p className="text-lg text-decent-700 mb-4">{children}</p>
    ),
    ul: ({ children }: PropsWithChildren) => (
      <ul className="text-lg mb-4 list-outside list-disc text-decent-700">
        {children}
      </ul>
    ),
    li: ({ children }: PropsWithChildren) => (
      <li className="mb-3 ml-4">{children}</li>
    ),
  },
  Main: ({ item, sections }) => (
    <body>
      <div className="flex justify-centerbg-decent-300 mb-7 aspect-wide relative w-full">
        <div className="text-center py-8 z-10 bg-darkened w-full">
          <p className="text-decent-600 text-xl font-light">
            {item.superTitle}
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl">{item.title}</h1>
        </div>
        <img
          src={`/preview/${item.image || item.slug}.jpg`}
          alt={item.title}
          className="object-contain w-full absolute z-0 max-h-[34rem] shadow-xl shadow-decent-100"
        />
      </div>
      {sections.map((section, i) => (
        <ReadBoxed key={i}>{section}</ReadBoxed>
      ))}
    </body>
  ),
};
