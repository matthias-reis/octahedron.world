import Link from 'next/link';
import { ReadBoxed } from '../../comp/sections';
import { Tag, TagList } from '../../comp/tag';
import { getTagsByTagSlugs } from '../../core/data-layer';
import { getFormattedDate } from '../../core/date-helpers';
import type { Layout } from './types';
import Octahedron from '../../comp/octahedron';

export const imageLayout: Layout = {
  components: {},
  Main: ({ item }) => (
    <body>
      <Link href="/" className={`text-decent-500 absolute top-4 right-4 z-10`}>
        <Octahedron />
      </Link>
      <div className="justify-center items-center p-4 relative w-full h-[90vh]">
        <img
          src={`/img/${item.image}-l.jpg`}
          alt={item.title}
          className="top-[0] object-contain w-full h-full"
        />
      </div>
      <h1 className="text-2xl font-condensed text-center">{item.title}</h1>
      {item.category && (
        <p className="uppercase text-center text-decent-600 tracking-wider">
          in category <strong className="font-bold">{item.category}</strong>
        </p>
      )}
      {item.date && (
        <p className="uppercase text-center text-xs text-decent-600 tracking-wider">
          {getFormattedDate(new Date(item.date))}
        </p>
      )}
      {item.tags && (
        <ReadBoxed className="mt-7">
          <TagList className="mt-5">
            {getTagsByTagSlugs(item.tags).map((tag) => (
              <Tag key={tag.slug} tag={tag} />
            ))}
          </TagList>
        </ReadBoxed>
      )}
    </body>
  ),
};
