import type { Metadata } from 'next';
import {
  Saira_Semi_Condensed,
  Saira_Extra_Condensed,
  Lora,
  Euphoria_Script,
} from 'next/font/google';
import './globals.css';
import { getThemeColor } from '../core/page-meta';
import { TrackingProvider } from '../comp/tracking';

const serifFont = Lora({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-serif',
  fallback: ['serif'],
});
const sansFont = Saira_Semi_Condensed({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
  weight: ['300', '700'],
  fallback: ['sans-serif'],
});
const condensedFont = Saira_Extra_Condensed({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-condensed',
  weight: ['300', '700'],
  fallback: ['sans-serif'],
});

const className = [serifFont, sansFont, condensedFont]
  .map((f) => f.variable)
  .join(' ');

export default function RootLayout<FC>({
  children,
  ...rest
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-GB" className={className}>
      <TrackingProvider>{children}</TrackingProvider>
    </html>
  );
}

export const metadata: Metadata = {
  title: {
    default: 'OCTAHEDRONWORLD',
    template: '%s | OCTAHEDRONWORLD',
  },

  alternates: { canonical: '/' },
  metadataBase: new URL('https://octahedron.world'),

  description:
    'Monthly magazine for Science Fiction, Science Fact and Fantasy.',

  creator: 'Matthias Reis',
  publisher: 'Matthias Reis',
  authors: [{ name: 'Matthias Reis' }],

  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },

  openGraph: {
    url: '/',
    title: 'OCTAHEDRONWORLD',
    siteName: 'OCTAHEDRONWORLD',
    description:
      'Monthly magazine for Science Fiction, Science Fact and Fantasy.',
    type: 'website',
    images: [
      {
        url: '/preview/home.jpg',
        width: 600,
        height: 200,
        alt: 'OCTAHEDRONWORLD',
      },
    ],
  },
};

export const viewport = {
  colorScheme: 'dark',
  themeColor: getThemeColor(),
};
