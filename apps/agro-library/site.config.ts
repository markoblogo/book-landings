import type { SiteConfig } from "@book-landings/landing-core";

export const agroLibrarySiteConfig = {
  id: "agro-library",
  name: "AMI Team Publishing",
  baseUrl: "https://books.1d3x.com",
  productionUrl: "https://books.1d3x.com",
  previewUrls: [],
  canonicalLocaleStrategy: "root",
  defaultLocale: "en",
  locales: [{ code: "en", label: "EN", hreflang: "en", isDefault: true }],
  features: {
    bookDetails: true,
    legalPages: true,
    freeDownloads: true,
    pdfAssets: true
  },
  legal: {
    contactEmail: "abv@mn7r.com",
    publisherName: "AMI team",
    legalPath: "/legal",
    privacyPath: "/privacy"
  }
} satisfies SiteConfig;
