import { FCC } from '../core/types';

import type { JSX } from "react";

export const Section: FCC<{
  headline: string;
  subHeadline?: string;
  className?: string;
}> = ({ children, headline, subHeadline, className }) => (
  <Boxed Component="div" className={className}>
    <div className="pb-4 my-3 text-center">
      <h2 className={`font-bold font-condensed text-decent-900 text-6xl`}>
        {headline}
      </h2>
      {subHeadline && (
        <p className="text-decent-700 text-xl font-light mt-1">{subHeadline}</p>
      )}
    </div>
    {children}
  </Boxed>
);

export const Grid: FCC = ({ children }) => (
  <ul className="grid gap-2 grid-cols-6">{children}</ul>
);

export const GridItem: FCC = ({ children }) => (
  <li className="bg-decent-100 flex items-stretch col-span-6 sm:col-span-3 lg:col-span-2">
    {children}
  </li>
);

export const Boxed: FCC<{ Component?: JSX.ElementType }> = ({
  children,
  className,
  Component = 'div',
}) => <Component className={`mx-3 md:mx-4 ${className}`}>{children}</Component>;

export const ReadBoxed: FCC<{ Component?: JSX.ElementType; id?: string }> = ({
  children,
  className,
  Component = 'div',
  ...props
}) => (
  <Component className={`mx-5 sm:mx-8 md:mx-9 mb-7 ${className}`} {...props}>
    {children}
  </Component>
);
