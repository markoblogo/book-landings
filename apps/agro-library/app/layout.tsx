import type { Metadata } from "next";
import type { ReactNode } from "react";
import { agroLibrarySiteConfig } from "../site.config";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(agroLibrarySiteConfig.baseUrl),
  title: "AMI Team Publishing | Professional books for physical commodity markets",
  description: "Free professional editions for physical commodity brokers, traders, farmers, and market operators.",
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
