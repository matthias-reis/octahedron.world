import { A } from '@solidjs/router';
import { ParentComponent } from 'solid-js';
import { type Plugin } from '~/types';

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
export const CtaPlugin: Plugin = ({ payload, wrapper }) => {
  const [link, ...text] = (payload || '').split(' ');
  const Wrapper = wrapper || 'section';

  const Comp = link.startsWith('/') ? A : 'a';

  return (
    <Wrapper>
      <div class="my-6 text-center">
        <Button href={link}>{text.join(' ')}</Button>
      </div>
    </Wrapper>
  );
};
