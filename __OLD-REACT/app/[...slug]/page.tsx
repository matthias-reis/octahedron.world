import type { FC, PropsWithChildren, ReactElement } from 'react';
import { notFound } from 'next/navigation';
import {
  getItem,
  getItemsByCategory,
  getItemsBySlugs,
} from '../../core/data-layer';
import { parseMarkdown } from '../../core/markdown';
import { DynamicPageProps } from '../../core/types';
import { Item } from '../../comp/item';
import { postLayout } from './post';
import { defaultLayout } from './default';
import { storylineLayout } from './storyline';
import { storylineTattooLayout } from './storylineTattoo';
import { storylineWorld2Layout } from './storylineWorld2';
import { imageLayout } from './image';
import { Metadata } from 'next';
import type { Layout } from './types';

const layouts: Record<string, Layout> = {
  post: postLayout,
  'storylines/tattoos': storylineTattooLayout,
  'storylines/world-2': storylineWorld2Layout,
  'storylines/vegan': storylineWorld2Layout,
  'storylines/traffic': storylineWorld2Layout,
  image: imageLayout,
  storyline: storylineLayout,
  default: defaultLayout,
};

const Page: FC<DynamicPageProps> = async (props) => {
  const params = await props.params;
  const slug = (params?.slug ?? []).join('/');
  const item = getItem(slug);
  if (!item) notFound();

  let { Main, components } =
    layouts[item.slug] || layouts[item.type || 'none'] || layouts.default;

  components = {
    p: ({ children }: PropsWithChildren) => (
      <p className="text-lg font-serif leading-loose text-decent-700 mb-4">
        {children}
      </p>
    ),
    ul: ({ children }: PropsWithChildren) => (
      <ul className="font-serif text-lg mb-4 list-outside list-disc text-decent-700">
        {children}
      </ul>
    ),
    code: ({ children }: PropsWithChildren) => (
      <code className="font-mono text-md text-main">{children}</code>
    ),
    li: ({ children }: PropsWithChildren) => (
      <li className="mb-3 ml-4 leading-loose">{children}</li>
    ),
    a: (props: PropsWithChildren) => (
      <a className="underline underline-offset-4" {...props} />
    ),
    strong: ({ children }: PropsWithChildren) => (
      <strong className="font-bold text-decent-900">{children}</strong>
    ),
    blockquote: ({ children }: PropsWithChildren) => (
      <blockquote className="border-l-2 border-decent-500 pl-4 font-sans text-sm [&_p]:font-sans [&_p]:text-sm [&_p]:leading-relaxed w-3/4">
        {children}
      </blockquote>
    ),
    sub: ({ children }: PropsWithChildren) => (
      <sub className="align-sub">{children}</sub>
    ),
    ...components,
    link: ({ payload }: PropsWithChildren<{ payload?: string }>) => {
      if (!payload) return null;
      const itemMeta = getItem(payload);

      if (!itemMeta)
        return (
          <p className="text-complement text-2xl my-4">
            Unknown link target: {payload}
          </p>
        );

      return (
        <div className="border-t border-b border-decent-300 my-4">
          <Item meta={itemMeta} />
        </div>
      );
    },
  };

  const relatedItems = getItemsBySlugs(item?.related ?? []);
  const categoryItems = getItemsByCategory(item?.category);
  const sections: ReactElement<any>[] = item.sections.map((section, i) => {
    if (typeof section !== 'string') {
      if (components[section.type]) {
        const Comp = components[section.type];
        return <Comp key={i} payload={section.payload} />;
      } else {
        return (
          <p key={i} className="text-complement text-2xl my-4">
            Unknown section type: {section.type}
          </p>
        );
      }
    } else {
      return parseMarkdown(section, components) as ReactElement;
    }
  });

  return (
    <Main
      item={item}
      sections={sections}
      categoryItems={categoryItems}
      relatedItems={relatedItems}
    />
  );
};

export default Page;

export async function generateMetadata(
  props: DynamicPageProps
): Promise<Metadata> {
  const params = await props.params;
  const slug = params?.slug?.join('/') || '';
  const item = getItem(slug);
  if (!item) return {};

  const description =
    typeof item.description === 'string'
      ? item.description
      : (item.description || []).join(' | ');
  return {
    title: item.title,
    description,
    alternates: { canonical: slug },
    openGraph: {
      url: slug,
      title: item.title,
      type: 'article',
      description,
      images: [
        {
          url: `/preview/${item.image || item.slug}.jpg`,
          width: 600,
          height: 200,
        },
      ],
    },
  };
}
