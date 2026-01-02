import { Fragment, ReactNode } from 'react';
import type { Options } from 'hast-util-to-jsx-runtime';
import { unified, type Plugin } from 'unified';
import parse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeReact from 'rehype-react';
import { jsx, jsxs } from 'react/jsx-runtime';
import { FCC } from './types';

export function parseMarkdown(s: string, components?: Record<string, FCC>) {
  const processed = unified()
    .use(parse)
    .use(remarkRehype as unknown as Plugin)
    .use(rehypeReact, {
      Fragment,
      jsx,
      jsxs,
      components: components as Options['components'],
    })
    .processSync(s);

  return processed.result as ReactNode;
}
