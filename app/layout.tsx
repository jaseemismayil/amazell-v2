import type { Metadata } from 'next';
import { Unbounded, Inter } from 'next/font/google';
import './globals.css';
import SmoothScrollProvider from '@/components/providers/SmoothScrollProvider';
import Cursor from '@/components/layout/Cursor';

const unbounded = Unbounded({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-unbounded',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.amazellpower.com'),
  title: 'AMAZELL — Power That Never Stops',
  description:
    'AMAZELL engineers high-performance tubular batteries built for Indian conditions.',
  openGraph: {
    title: 'AMAZELL — Power That Never Stops',
    description:
      'AMAZELL engineers high-performance tubular batteries built for Indian conditions.',
    type: 'website',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'AMAZELL — Power That Never Stops' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AMAZELL — Power That Never Stops',
    description:
      'AMAZELL engineers high-performance tubular batteries built for Indian conditions.',
    images: ['/og-image.jpg'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${unbounded.variable} ${inter.variable}`}>
      <body className="bg-black text-offwhite font-body antialiased">
        <Cursor />
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
