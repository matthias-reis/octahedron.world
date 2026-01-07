import { Metadata } from 'next';
import { Item } from '../../comp/item';
import { LayoutFrame } from '../../comp/layout-frame';
import { Boxed, Grid, GridItem } from '../../comp/sections';
import { getPublicItems } from '../../core/data-layer';
import type { ItemMeta } from '../../core/types';

export default function Page() {
  const items = getPublicItems();
  return (
    <LayoutFrame>
      <div className="aspect-[3/1] relative flex items-center justify-center mb-7">
        <div className="text-center py-8 z-10 bg-darkened w-full">
          <h1 className="text-4xl md:text-5xl lg:text-6xl">
            All Contributions
          </h1>
          <p className="text-decent-600 text-xl font-light">
            Found {items.length} Posts, Essays or Stories
          </p>
        </div>
        <img
          src="/detail/home.jpg"
          alt="Octahedron World"
          className="w-full absolute z-0"
        />
      </div>
      <Boxed>
        <Grid>
          {items.map((item: ItemMeta) => (
            <GridItem key={item.slug}>
              <Item meta={item} />
            </GridItem>
          ))}
        </Grid>
      </Boxed>
    </LayoutFrame>
  );
}

export const metadata: Metadata = {
  title: 'Welcome to OCTAHEDRON.WORLD',
};
