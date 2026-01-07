import { A } from '@solidjs/router';
import { HtmlComponents } from '~/types';

export const baseComponents: HtmlComponents = {
  p: (props) => (
    <p class="py-2 font-serif leading-loose text-neutral-700" {...props} />
  ),
  h1: (props) => (
    <h2
      class="text-4xl font-sans font-bold mt-6 mb-4 text-saturated-700"
      {...props}
    />
  ),
  h2: (props) => (
    <h3
      class="text-3xl font-sans font-bold mt-5 mb-3 text-saturated-700"
      {...props}
    />
  ),
  ul: (props) => (
    <ul
      class="font-serif mb-4 list-outside list-disc text-decent-700"
      {...props}
    />
  ),
  code: (props) => <code class="font-mono text-md text-main" {...props} />,
  li: (props) => <li class="mb-3 ml-4 leading-loose" {...props} />,
  a: (props) => {
    if (props.href.startsWith('/')) {
      return (
        <A class="underline underline-offset-4 text-saturated-700" {...props} />
      );
    }
    return (
      <a class="underline underline-offset-4 text-saturated-700" {...props} />
    );
  },
  strong: (props) => <strong class="font-bold text-decent-900" {...props} />,
  blockquote: (props) => (
    <blockquote
      class="border-l-4 border-decent-400 text-decent-600 pl-4 font-sans text-sm w-3/4 [&_p]:font-sans [&_p]:text-sm [&_p]:text-decent-600 [&_strong]:text-decent-700 [&_p]:leading-relaxed"
      {...props}
    />
  ),
  sub: (props) => <sub class="align-sub" {...props} />,
};
