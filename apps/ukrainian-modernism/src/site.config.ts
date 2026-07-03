import type { SiteConfig } from "@book-landings/landing-core";

export const ukrainianModernismSiteConfig = {
  id: "ukrainian-modernism",
  name: "Ukrainian Modernism",
  baseUrl: "https://ukrmodernism.abvx.xyz",
  productionUrl: "https://ukrmodernism.abvx.xyz",
  previewUrls: [],
  canonicalLocaleStrategy: "localized-prefix",
  assetBasePath: "/assets",
  defaultLocale: "fr",
  locales: [
    { code: "fr", label: "FR", hreflang: "fr", isDefault: true },
    { code: "uk", label: "UK", hreflang: "uk" }
  ],
  features: {
    sitelenLayers: false,
    sitelenLayer: false,
    bookDetails: true,
    legalPages: true,
    localizedLegalPages: true,
    demoVideo: true,
    demoVideos: true,
    culturalEditorial: true,
    freeDownloads: true,
    epubDownloads: true
  },
  legal: {
    publisherName: "ABVX",
    contactEmail: "a.biletskyi@gmail.com",
    legalPath: "/fr/legal",
    privacyPath: "/fr/privacy"
  },
  relatedProjects: [
    {
      label: "ABVX",
      href: "https://abvx.xyz",
      kind: "external",
      external: true
    }
  ]
} satisfies SiteConfig;

export const UKRAINIAN_MODERNISM_SITE_URL = ukrainianModernismSiteConfig.baseUrl;
