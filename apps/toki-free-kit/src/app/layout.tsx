import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { tokiFreeSiteConfig } from "@/site.config";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

const siteUrl = tokiFreeSiteConfig.baseUrl;

export const metadata: Metadata = {
  title: "toki pona - free kit",
  description:
    "Free toki pona learning materials and translations: starter kit, practice texts, and community resources.",
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    title: "toki pona - free kit",
    description:
      "Free toki pona learning materials and translations: starter kit, practice texts, and community resources.",
    url: siteUrl,
    siteName: tokiFreeSiteConfig.name,
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "toki pona - free kit",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "toki pona - free kit",
    description:
      "Free toki pona learning materials and translations: starter kit, practice texts, and community resources.",
    images: ["/twitter-card.jpg"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      // TODO: replace with branded favicon assets for toki-free.abvx.xyz
    ],
  },
};

const siteFontClass = `${inter.variable} ${playfair.variable}`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={siteFontClass}>
      <body>{children}</body>
    </html>
  );
}
