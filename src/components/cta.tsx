import { A } from '@solidjs/router';
import { Component, ParentComponent } from 'solid-js';
import type { CustomBlockProps } from 'solid-mds';

const Button: ParentComponent<{ href: string }> = ({ children, href }) => {
  if (href.startsWith('/')) {
    return (
      <A class="cta" href={href}>
        {children}
      </A>
    );
  }
  return (
    <a class="cta" href={href}>
      {children}
    </a>
  );
};

// payload is the link, then space, then the text to show
export const Cta: Component<CustomBlockProps> = ({ data }) => {
  // Defensive checks: ensure data exists and has the required properties
  if (!data) {
    console.warn('Cta component: data is missing');
    return null;
  }

  const url = Array.isArray(data.url) ? data.url[0] : data.url;
  const text = Array.isArray(data.text) ? data.text[0] : data.text;

  if (!url || !text) {
    console.warn('Cta component: url or text is missing', { data });
    return null;
  }

  return (
    <div class="my-6 text-center">
      <Button href={url}>{text}</Button>
    </div>
  );
};
