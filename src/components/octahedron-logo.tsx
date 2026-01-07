import { Component, type JSX } from 'solid-js';
import { cx } from './cx';

const OctahedronLogo: Component<JSX.SvgSVGAttributes<SVGSVGElement>> = (
  props
) => {
  const { class: cls, ...rest } = props;
  return (
    <svg
      viewBox="0 0 60 60"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
      class={cx('w-6 h-6', cls)}
    >
      <path d="M23.5 34 30 0l29.5 30.5-36 3.5Z" fill="currentColor" />
      <path
        d="M23.5 34 1 28.5 30 0l-6.5 34Z"
        fill="currentColor"
        fill-opacity={0.8}
      />
      <path
        d="M23.5 34 30 59 1 28.5 23.5 34Z"
        fill="currentColor"
        fill-opacity={0.4}
      />
      <path
        d="m23.5 34 36-3.5L30 59l-6.5-25Z"
        fill="currentColor"
        fill-opacity={0.55}
      />
    </svg>
  );
};

export default OctahedronLogo;
