import type { SiteConfig } from "@book-landings/landing-core";

export const stoicSiteConfig = {
  id: "stoic-wisdom-series",
  name: "Stoic Wisdom Series",
  baseUrl: "https://stoic.abvx.xyz",
  productionUrl: "https://stoic.abvx.xyz",
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
    freeDownloads: true,
    demoVideos: true,
    relatedProjects: true
  },
  legal: {
    publisherName: "ABVX",
    contactEmail: "a.biletskyi@gmail.com",
    legalPath: "/en/legal",
    privacyPath: "/en/privacy"
  },
  relatedProjects: [
    {
      label: "Toki Pona Free Kit",
      href: "https://toki-free.abvx.xyz/",
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

export type StoicLocale = "en" | "tp";
export const STOIC_SITE_URL = stoicSiteConfig.baseUrl;
