import Link from 'next/link';
import { FCC, ItemMeta } from '../core/types';
import { cx } from '../core/cx';

const PostItem: FCC<{ meta: ItemMeta }> = ({ meta }) => (
  <article className="font-condensed">
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <p className="font-light text-sm uppercase text-decent-600 tracking-wider text-right mb-1">
      {meta.category}
    </p>
    <img
      src={`/img/posts/${slugify(meta.category || 'general')}-s.jpg`}
      alt={`${meta.title} - title image`}
      width="600"
      height="200"
    />
    <h3 className="text-2xl font-bold mt-4">{meta.title}</h3>
    {meta.description && (
      <p className="mt-1 font-sans text-sm text-decent-700">
        {meta.description}
      </p>
    )}
  </article>
);

const StorylineItem: FCC<{ meta: ItemMeta; size: 1 | 2 | 3 }> = ({
  meta,
  size,
}) => (
  <article className="font-condensed">
    <p className="font-light uppercase text-decent-600 tracking-wider text-center">
      {meta.superTitle || meta.category}
    </p>
    <h3
      className={cx(
        'font-bold text-center mb-3',
        size != 1 && 'text-5xl',
        size === 1 && 'text-3xl'
      )}
    >
      {meta.title}
    </h3>
    <img
      src={`/img/${meta.image || meta.slug}-s.jpg`}
      alt={`${meta.title} - Title Image`}
      className="aspect-storyline"
      width="600"
      height="400"
    />
    {meta.description && (
      <p className="mt-3 text-sm text-center font-sans text-decent-700">
        {meta.description}
      </p>
    )}
  </article>
);

const ImageItem: FCC<{ meta: ItemMeta; size: 1 | 2 | 3 }> = ({
  meta,
  size,
}) => (
  <article className="font-condensed flex flex-col justify-center h-full p-4">
    <img
      src={`/img/${meta.image}-s.jpg`}
      alt={`${meta.description}`}
      width="600"
      height="200"
      className="border-4 border-decent-900"
    />
    <h3
      className={cx(
        'font-light mt-1 text-center uppercase tracking-wider text-decent-900',
        size === 1 && 'text-md',
        size === 2 && 'text-md',
        size === 3 && 'text-xl'
      )}
    >
      {meta.title}
    </h3>
    <p className="font-light text-xs text-center uppercase text-decent-600 tracking-wider">
      {meta.category}
    </p>
  </article>
);

export const Item: FCC<{ meta: ItemMeta; size?: 1 | 2 | 3 }> = ({
  meta,
  size = 1,
}) => {
  if (!meta || typeof meta === 'string') return null;
  return (
    <Link
      href={`/${meta.slug}`}
      className="w-full h-full p-3 hover:bg-decent-300 block"
    >
      {meta.type === 'post' && <PostItem meta={meta} />}
      {meta.type === 'storyline' && <StorylineItem meta={meta} size={size} />}
      {meta.type === 'image' && <ImageItem meta={meta} size={size} />}
    </Link>
  );
};

function slugify(s: string) {
  return s.toLowerCase().replace(/ /g, '-');
}
