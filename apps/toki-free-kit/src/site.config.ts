import type { SiteConfig } from "@book-landings/landing-core";

export const tokiFreeSiteConfig = {
  id: "toki-free-kit",
  name: "toki pona free kit",
  baseUrl: "https://toki-free.abvx.xyz",
  productionUrl: "https://toki-free.abvx.xyz",
  previewUrls: [],
  canonicalLocaleStrategy: "localized-prefix",
  assetBasePath: "/books",
  defaultLocale: "en",
  locales: [
    { code: "en", label: "EN", hreflang: "en", isDefault: true },
    { code: "tp", label: "TP", hreflang: "tok" }
  ],
  features: {
    sitelenLayers: true,
    sitelenLayer: true,
    bookDetails: true,
    freeDownloads: true,
    pdfAssets: true,
    legalPages: true,
    localizedLegalPages: true,
    demoVideos: true,
    relatedProjects: true,
    runtimeVerificationDocs: true
  },
  legal: {
    publisherName: "ABVX",
    contactEmail: "a.biletskyi@gmail.com",
    legalPath: "/en/legal",
    privacyPath: "/en/privacy"
  },
  relatedProjects: [
    {
      label: "Stoic Wisdom in toki pona",
      href: "https://stoic.abvx.xyz/",
      kind: "external",
      external: true
    },
    {
      label: "Chinese Wisdom in toki pona",
      href: "https://dao-toki.abvx.xyz/",
      kind: "external",
      external: true
    }
  ]
} satisfies SiteConfig;

export const TOKI_FREE_SITE_URL = tokiFreeSiteConfig.baseUrl;
