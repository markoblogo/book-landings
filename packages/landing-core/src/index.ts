export type LocaleCode = string;

export interface LocaleConfig {
  code: LocaleCode;
  label: string;
  hreflang?: string;
  direction?: "ltr" | "rtl";
  isDefault?: boolean;
}

export interface BookLink {
  label: string;
  href: string;
  kind?: "amazon-kindle" | "amazon-print" | "download-pdf" | "download-epub" | "video" | "external";
  external?: boolean;
  download?: boolean;
}

export interface AssetConfig {
  cover?: string;
  promo?: string;
  openGraph?: string;
  pdf?: string;
  epub?: string;
  videoPoster?: string;
}

export interface BookItem {
  id: string;
  slug?: string;
  title: string;
  subtitle?: string;
  description?: string;
  locale?: LocaleCode;
  type?: "commercial" | "gift" | "free" | "related";
  assets?: AssetConfig;
  links?: BookLink[];
  tags?: string[];
}

export interface LegalConfig {
  contactEmail?: string;
  publisherName?: string;
  legalPath?: string;
  privacyPath?: string;
}

export interface LandingFeatureFlags {
  bookDetails?: boolean;
  legalPages?: boolean;
  localizedLegalPages?: boolean;
  sitelenLayers?: boolean;
  sitelenLayer?: boolean;
  freeDownloads?: boolean;
  pdfAssets?: boolean;
  epubDownloads?: boolean;
  demoVideos?: boolean;
  relatedProjects?: boolean;
  runtimeVerificationDocs?: boolean;
  multilingualClassicalText?: boolean;
  demoVideo?: boolean;
  culturalEditorial?: boolean;
}

export interface SiteConfig {
  id: string;
  name: string;
  baseUrl: string;
  productionUrl?: string;
  previewUrls?: string[];
  canonicalLocaleStrategy?: "localized-prefix" | "root";
  defaultLocale: LocaleCode;
  locales: LocaleConfig[];
  assetBasePath?: string;
  legal?: LegalConfig;
  features?: LandingFeatureFlags;
  relatedProjects?: BookLink[];
}

export function stripTrailingSlash(value: string): string {
  return value.endsWith("/") ? value.slice(0, -1) : value;
}

export function siteUrl(site: SiteConfig, path = ""): string {
  const base = stripTrailingSlash(site.baseUrl);
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return normalizedPath === "/" ? base : `${base}${normalizedPath}`;
}

export function getDefaultLocale(site: SiteConfig): LocaleConfig {
  return site.locales.find((locale) => locale.code === site.defaultLocale) ?? site.locales[0];
}

export function isSupportedLocale(site: SiteConfig, locale: string): boolean {
  return site.locales.some((item) => item.code === locale);
}

export function resolveLocale(site: SiteConfig, locale: string | undefined): LocaleCode {
  return locale && isSupportedLocale(site, locale) ? locale : site.defaultLocale;
}
