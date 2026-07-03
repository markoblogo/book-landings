import type { SiteConfig } from "@book-landings/landing-core";

export const agroLibrarySiteConfig = {
  id: "agro-library",
  name: "Agro Library",
  baseUrl: "https://agro-library.abvx.xyz",
  productionUrl: "https://agro-library.abvx.xyz",
  previewUrls: [],
  canonicalLocaleStrategy: "localized-prefix",
  defaultLocale: "en",
  locales: [{ code: "en", label: "EN", hreflang: "en", isDefault: true }],
  features: {
    bookDetails: true,
    localizedLegalPages: true
  }
} satisfies SiteConfig;
