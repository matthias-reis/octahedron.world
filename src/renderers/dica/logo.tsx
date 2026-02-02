import { JSX } from 'solid-js';

export const LogoHorizontal = (props: JSX.SvgSVGAttributes<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="600px"
    height="600px"
    viewBox="0 0 600 600"
    fill="none"
    {...props}
  >
    <g clip-path="url(#a)">
      {/* <path fill="#000000" d="M0 0h1568v600H0z" /> */}
      <path
        fill="currentColor"
        d="M210 50h50v500h-50zM50.031 49.869h50L180 300 98.927 549.958h-50L130 300 50.031 49.869ZM419.987 49.869h-49.181L292.146 300l79.746 249.958h49.181L341.328 300l78.659-250.131ZM548.915 49.869h-49.182L421.073 300l79.746 249.958h49.182L470.255 300l78.66-250.131Z"
      />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M0 0h1568v600H0z" />
      </clipPath>
    </defs>
  </svg>
);
