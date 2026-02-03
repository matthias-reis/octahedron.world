import { A } from '@solidjs/router';
import { Component, ParentComponent } from 'solid-js';

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
export const Cta: Component<{ data: { url: string; text: string } }> = ({
  data,
}) => {
  const { url, text } = data;

  const Comp = url.startsWith('/') ? A : 'a';

  return (
    <div class="my-6 text-center">
      <Button href={url}>{text}</Button>
    </div>
  );
};
