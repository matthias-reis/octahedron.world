import type { Options } from 'hast-util-to-jsx-runtime';
import { unified, type Plugin } from 'unified';
import parse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeReact from 'rehype-react';
import { type JSX } from 'solid-js';
import { jsx, jsxs, Fragment } from 'solid-jsx/jsx-runtime';

export function parseMarkdown(s: string, components?: Options['components']) {
  const processed = unified()
    .use(parse)
    .use(remarkRehype as unknown as Plugin)
    .use(rehypeReact, {
      Fragment,
      jsx,
      jsxs,
      components,
    })
    .processSync(s);

  return processed.result as JSX.Element;
}
