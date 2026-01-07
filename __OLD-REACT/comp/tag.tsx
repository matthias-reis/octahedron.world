import { FC } from 'react';
import type { FCC, TagMeta } from '../core/types';
import Link from 'next/link';

export const TagList: FCC = ({ children, className }) => (
  <div className={`flex gap-4 flex-wrap ${className}`}>{children}</div>
);

export const Tag: FC<{ tag: TagMeta }> = ({ tag }) => (
  <Link
    className="flex gap-3 items-center bg-decent-300 hover:bg-decent-400 h-5 rounded-xl text-decent-600 hover:text-decent-800 pl-4 pr-2"
    href={`/tags/${tag.slug}`}
  >
    <span>{tag.name}</span>{' '}
    <span className="text-decent-500 flex bg-decent-200 px-3 rounded-xl">
      {tag.count}
    </span>
  </Link>
);
