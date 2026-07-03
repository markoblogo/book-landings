import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import { ukrainianModernismSiteConfig } from '@/site.config';
import './globals.css';

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
  // IMPORTANT:
  // Do not use headers()/cookies() here.
  // Static routes (e.g. /[lang]/book/[id]) are prerendered and will fail with DYNAMIC_SERVER_USAGE.
  // We keep a safe default; language-specific metadata + hreflang handle SEO correctly.
  return (
    <html lang="fr" className={`${inter.variable} ${playfair.variable}`}>
      <body>{children}</body>
    </html>
  );
}
