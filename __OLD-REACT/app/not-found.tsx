import Link from 'next/link';
import { LayoutFrame } from '../comp/layout-frame';
import { Section } from '../comp/sections';

export default function NotFound() {
  return (
    <LayoutFrame withTextLogo>
      <Section
        headline="404"
        subHeadline="This page slipped into the void."
        className="text-center"
      >
        <p className="text-lg font-serif text-decent-700 mb-6">
          The path you tried does not exist. Pick a new trail.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-5 text-lg">
          <Link className="underline underline-offset-4 text-main" href="/">
            Return home
          </Link>
          <Link className="underline underline-offset-4 text-complement" href="/tags">
            Browse tags
          </Link>
        </div>
      </Section>
    </LayoutFrame>
  );
}
