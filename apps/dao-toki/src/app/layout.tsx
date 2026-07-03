import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import { daoTokiSiteConfig } from '@/site.config';

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-sans',
    display: 'swap',
});

const playfair = Playfair_Display({
    subsets: ['latin'],
    variable: '--font-serif',
    display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(daoTokiSiteConfig.baseUrl),
  title: daoTokiSiteConfig.name,
  description: 'Bilingual landing for Chinese Wisdom in toki pona.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body>{children}</body>
    </html>
  );
}
