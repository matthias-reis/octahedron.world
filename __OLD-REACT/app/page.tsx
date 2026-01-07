import { Metadata } from 'next';
import { Item } from '../comp/item';
import { LayoutFrame } from '../comp/layout-frame';
import { OctahedronText } from '../comp/octahedron-text';
import { Boxed, Grid, GridItem, Section } from '../comp/sections';
import { Tag, TagList } from '../comp/tag';
import { getTags, getTopItems } from '../core/data-layer';
import type { ItemMeta, TagMeta } from '../core/types';

export default function Page() {
  const items = getTopItems();

  const tags = getTags().filter((tag: TagMeta) => (tag.count ?? 0) > 1);
  return (
    <LayoutFrame>
      <div className="aspect-[3/1] relative flex items-center justify-center mb-7">
        <div className="text-center py-8 z-10 bg-darkened w-full">
          <OctahedronText className="text-4xl md:text-5xl lg:text-6xl" />
          <p className="text-decent-600 text-xl font-lighter">
            Ephemeral Thoughts about Life, the Universe and Everything.
          </p>
        </div>
        <img
          src="/detail/home.jpg"
          alt="Octahedron World"
          className="w-full absolute z-0"
        />
      </div>
      <div>
        <ul className="grid grid-cols-8 w-full gap-4 grid-flow-dense">
          {items.map(([item, size], i) => {
            if (size === 3) {
              return (
                <li key={i} className="col-span-8 md:col-span-4 row-span-2">
                  <Item meta={item} size={size} />
                </li>
              );
            }
            if (size === 2) {
              return (
                <li
                  key={i}
                  className="col-span-8 md:col-span-4 lg:col-span-3 row-span-2"
                >
                  <Item meta={item} size={size} />
                </li>
              );
            }
            return (
              <li key={i} className="col-span-4 md:col-span-2">
                <Item meta={item} size={size} />
              </li>
            );
          })}
        </ul>
      </div>

      <Section
        headline="Keywords"
        subHeadline="Skim through the most featured topics of these pages"
      >
        <TagList className="mt-5">
          {tags.map((tag) => (
            <Tag key={tag.slug} tag={tag} />
          ))}
        </TagList>
      </Section>
    </LayoutFrame>
  );
}

export const metadata: Metadata = {
  title: 'Welcome to OCTAHEDRON.WORLD',
};
