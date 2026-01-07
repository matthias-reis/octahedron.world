import { getTagByTagSlug } from '../../../core/data-layer';
import { Item } from '../../../comp/item';
import { Boxed, Grid, GridItem } from '../../../comp/sections';
import type { DynamicPageProps, ItemMeta, TagMeta } from '../../../core/types';

export default async function Page(props: DynamicPageProps) {
  const params = await props.params;
  const tagSlug = params.tag || '';
  const { name, count, items } = getTagByTagSlug(tagSlug);
  const storylineItems = items.filter((i) => i.type === 'storyline');
  const imageItems = items.filter((i) => i.type === 'image');
  const postItems = items.filter((i) => i.type === 'post');

  return (
    <>
      <div className="aspect-[3/1] relative flex items-center justify-center mb-7">
        <div className="text-center py-8 z-10 bg-darkened w-full">
          <h1 className="text-4xl md:text-5xl lg:text-6xl">{name}</h1>
          <p className="text-decent-600 text-xl font-light">
            {count === 1 ? 'One Item Tagged' : `${count} Items Tagged`}
          </p>
        </div>
        <img
          src="/detail/home.jpg"
          alt="Octahedron World"
          className="w-full absolute z-0"
        />
      </div>

      <Boxed>
        {storylineItems.length > 0 && (
          <>
            <h2 className="text-5xl mb-4 mt-8 font-bold font-condensed">
              {storylineItems.length} Storyline
              {storylineItems.length !== 1 ? 's' : ''}
            </h2>
            <Grid>
              {storylineItems.map((item: ItemMeta) => (
                <GridItem key={item.slug}>
                  <Item meta={item} />
                </GridItem>
              ))}
            </Grid>
          </>
        )}
        {imageItems.length > 0 && (
          <>
            <h2 className="text-5xl mb-4 mt-8 font-bold font-condensed">
              {imageItems.length} Image
              {imageItems.length !== 1 ? 's' : ''}
            </h2>
            <Grid>
              {imageItems.map((item: ItemMeta) => (
                <GridItem key={item.slug}>
                  <Item meta={item} />
                </GridItem>
              ))}
            </Grid>
          </>
        )}
        {postItems.length > 0 && (
          <>
            <h2 className="text-5xl mb-4 mt-8 font-bold font-condensed">
              {postItems.length} Post
              {postItems.length !== 1 ? 's' : ''}
            </h2>
            <Grid>
              {postItems.map((item: ItemMeta) => (
                <GridItem key={item.slug}>
                  <Item meta={item} />
                </GridItem>
              ))}
            </Grid>
          </>
        )}
      </Boxed>
    </>
  );
}
