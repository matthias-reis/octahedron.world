import { FC, SVGProps } from 'react';

const Octahedron: FC<SVGProps<SVGSVGElement>> = ({ ...props }) => (
  <svg
    viewBox="0 0 60 60"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
    className={`w-6 h-6 ${props.className}`}
  >
    <path d="M23.5 34 30 0l29.5 30.5-36 3.5Z" fill="currentColor" />
    <path
      d="M23.5 34 1 28.5 30 0l-6.5 34Z"
      fill="currentColor"
      fillOpacity={0.8}
    />
    <path
      d="M23.5 34 30 59 1 28.5 23.5 34Z"
      fill="currentColor"
      fillOpacity={0.4}
    />
    <path
      d="m23.5 34 36-3.5L30 59l-6.5-25Z"
      fill="currentColor"
      fillOpacity={0.55}
    />
  </svg>
);

export default Octahedron;
