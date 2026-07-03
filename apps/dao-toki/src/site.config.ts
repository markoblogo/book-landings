import type { SiteConfig } from "@book-landings/landing-core";

export const daoTokiSiteConfig = {
  id: "dao-toki",
  name: "Chinese Wisdom in toki pona",
  baseUrl: "https://dao-toki.abvx.xyz",
  productionUrl: "https://dao-toki.abvx.xyz",
  previewUrls: [],
  canonicalLocaleStrategy: "localized-prefix",
  assetBasePath: "/assets",
  defaultLocale: "en",
  locales: [
    { code: "en", label: "EN", hreflang: "en", isDefault: true },
    { code: "tp", label: "TP", hreflang: "tok" }
  ],
  features: {
    sitelenLayers: true,
    sitelenLayer: true,
    bookDetails: true,
    legalPages: true,
    localizedLegalPages: true,
    relatedProjects: true,
    multilingualClassicalText: true,
    demoVideos: true,
    freeDownloads: true,
    pdfAssets: true
  },
  legal: {
    publisherName: "ABVX",
    contactEmail: "a.biletskyi@gmail.com",
    legalPath: "/en/legal",
    privacyPath: "/en/privacy"
  },
  relatedProjects: [
    {
      label: "Toki Pona Translator",
      href: "https://toki.abvx.xyz/",
      kind: "external",
      external: true
    },
    {
      label: "Toki Pona Free Kit",
      href: "https://toki-free.abvx.xyz/",
      kind: "external",
      external: true
    },
    {
      label: "Stoic Wisdom in Toki Pona",
      href: "https://stoic.abvx.xyz/",
      kind: "external",
      external: true
    }
  ]
} satisfies SiteConfig;

export const DAO_TOKI_SITE_URL = daoTokiSiteConfig.baseUrl;
