import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { stoicSiteConfig } from "@/site.config";
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

const siteFontClass = `${inter.variable} ${playfair.variable}`;

export const metadata: Metadata = {
  metadataBase: new URL(stoicSiteConfig.baseUrl),
  title: "Stoic Wisdom Series",
  description: "Stoic classics reimagined in toki pona.",
  alternates: {
    canonical: stoicSiteConfig.baseUrl,
  },
  openGraph: {
    title: "Stoic Wisdom Series",
    description: "Stoic classics reimagined in toki pona.",
    url: stoicSiteConfig.baseUrl,
    siteName: stoicSiteConfig.name,
    type: "website",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Stoic Wisdom Series",
    description: "Stoic classics reimagined in toki pona.",
    images: ["/twitter-card.jpg"],
  },
};

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
