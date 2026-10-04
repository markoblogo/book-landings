import type { Metadata } from 'next';
import { inter, playfair } from '@/fonts';
import { ukrainianModernismSiteConfig } from '@/site.config';
import '../globals.css';

// Keep root metadata minimal; per-language metadata is generated in /[lang]/layout.tsx
export const metadata: Metadata = {
  metadataBase: new URL(ukrainianModernismSiteConfig.baseUrl),
  applicationName: 'Ukrainian Modernism',
  title: 'Ukrainian Modernism',
  description: 'French and Ukrainian editorial landing for Ukrainian modernist literature.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${inter.variable} ${playfair.variable}`}>
      <body>{children}</body>
    </html>
  );
}
