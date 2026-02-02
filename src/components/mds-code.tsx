import { JSX } from 'solid-js';

export const MdsCode = {
  '@@|': () => {
    // Explicitly hide the global metadata block if it's being rendered
    return null;
  },
  // Also try overriding 'code' in case '@@|' isn't matched
  code: (props: any) => {
    const className = props.class || props.className || '';
    if (
      className.includes('language-@@|') ||
      className.includes('language-@@')
    ) {
      return null;
    }
    return <code {...props} />;
  },
  pre: (props: any) => {
    // Sometimes the class is on the pre
    const className = props.class || props.className || '';
    if (
      className.includes('language-@@|') ||
      className.includes('language-@@')
    ) {
      return null;
    }
    return <pre {...props} />;
  },
};
