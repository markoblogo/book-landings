import type { Metadata } from "next";
import type { ReactNode } from "react";
import { agroLibrarySiteConfig } from "../site.config";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(agroLibrarySiteConfig.baseUrl),
  title: "Agro Library",
  description: "Placeholder for the future Agro Library landing app.",
  alternates: {
    canonical: agroLibrarySiteConfig.baseUrl
  }
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
