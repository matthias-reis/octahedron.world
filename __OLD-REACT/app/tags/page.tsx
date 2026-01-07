import { Boxed } from '../../comp/sections';
import { Tag, TagList } from '../../comp/tag';
import { getTags } from '../../core/data-layer';

export default function Page() {
  const tags = getTags();
  return (
    <>
      <div className="aspect-[3/1] relative flex items-center justify-center mb-7">
        <div className="text-center py-8 z-10 bg-darkened w-full">
          <h1 className="text-4xl md:text-5xl lg:text-6xl">Tags & Keywords</h1>
        </div>
        <img
          src="/detail/home.jpg"
          alt="Octahedron World"
          className="w-full absolute z-0"
        />
      </div>
      <Boxed>
        <TagList className="mt-5">
          {tags.map((tag) => (
            <Tag key={tag.slug} tag={tag} />
          ))}
        </TagList>
      </Boxed>
    </>
  );
}
