import Link from 'next/link';
import { FCC } from '../core/types';
import Octahedron from './octahedron';
import { Boxed } from './sections';
import { OctahedronText } from './octahedron-text';
import { TrackingPageView } from './tracking';

export const LayoutFrame: FCC<{
  withTextLogo?: boolean;
}> = ({ children, withTextLogo, className }) => {
  return (
    <body className={`bg-decent-200 text-decent-800 ${className}`}>
      <TrackingPageView />
      <div className={`rounded max-w-5xl mx-auto lg:my-6 bg-decent-100 pb-5`}>
        <Boxed>
          <header
            className={`flex items-center justify-end py-4 border-decent-400 gap-4 mb-5 text-decent-900`}
          >
            {withTextLogo && <OctahedronText />}
            <Link href="/" className={`text-main`}>
              <Octahedron className={`text-main`} />
            </Link>
          </header>
        </Boxed>
        {children}
      </div>
      <nav className="flex gap-5 items-center justify-center mt-6 mb-8">
        <LegalLink href="/more/about">About</LegalLink>

        <a
          className="underline underline-offset-2 text-decent-500 hover:text-decent-700"
          rel="me"
          href="https://norden.social/@matzee"
        >
          Mastodon
        </a>
        <LegalLink href="/more/privacy">Privacy Policy</LegalLink>
        <LegalLink href="/more/imprint">Imprint</LegalLink>
      </nav>
    </body>
  );
};

const LegalLink: FCC<{ href: string }> = (props) => (
  <Link
    {...props}
    className="underline underline-offset-2 text-decent-500 hover:text-decent-700"
  />
);
