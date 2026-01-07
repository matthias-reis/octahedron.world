import { parseMarkdown } from '~/components/markdown';
import type { HtmlComponents, Plugin } from '~/types';
import { baseComponents } from './base-components';

// payload is a markdown string. Render it as HTML.
export const TextPlugin: (components?: HtmlComponents) => Plugin =
  (components) =>
  ({ payload, wrapper }) => {
    const Wrapper =
      wrapper || (({ children }) => <section>{children}</section>);
    return (
      <Wrapper>
        {parseMarkdown(payload || '', components || baseComponents)}
      </Wrapper>
    );
  };
