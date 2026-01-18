import { JSX } from 'solid-js';

export const PcscLogo = (props: JSX.SvgSVGAttributes<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    viewBox="0 0 200 200"
    fill="none"
    {...props}
  >
    <path
      fill="currentColor"
      d="M6 96.18C6 29.928 76.597-9.751 127.575 2.076 65.073 7.653 38.431 58.681 38.431 96.18c0 24.833 13.683 95.053 98.95 99.331C80.053 213.086 6 178.869 6 96.18Z"
    />
    <path
      fill="currentColor"
      d="M190.081 96.06c-2.068-36.817-32.836-67.57-69.128-70.157 22.755 9.776 35.14 37.666 36.292 65.844 1.152 28.178-4.32 62.395-30.243 83.672 34.276-6.613 65.353-38.863 63.079-79.359Z"
    />
  </svg>
);
