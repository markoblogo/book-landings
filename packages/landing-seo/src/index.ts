import type { BookItem, LocaleCode, SiteConfig } from "@book-landings/landing-core";
import { siteUrl } from "@book-landings/landing-core";

export interface MetadataInput {
  site: SiteConfig;
  locale?: LocaleCode;
  path?: string;
  title: string;
  description: string;
  image?: string;
}

export function canonicalUrl(site: SiteConfig, path = ""): string {
  return siteUrl(site, path);
}

export function localeAlternates(site: SiteConfig, pathForLocale: (locale: LocaleCode) => string): Record<string, string> {
  return Object.fromEntries(
    site.locales.map((locale) => [locale.hreflang ?? locale.code, siteUrl(site, pathForLocale(locale.code))])
  );
}

export function openGraphImage(site: SiteConfig, image?: string): string | undefined {
  if (!image) return undefined;
  return image.startsWith("http") ? image : siteUrl(site, image);
}

export function websiteJsonLd(site: SiteConfig) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.name,
    url: site.baseUrl
  };
}

export function bookJsonLd(site: SiteConfig, book: BookItem, path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Book",
    name: book.title,
    description: book.description,
    url: siteUrl(site, path),
    image: openGraphImage(site, book.assets?.cover)
  };
}

export function metadataBase(input: MetadataInput) {
  const image = openGraphImage(input.site, input.image);
  return {
    title: input.title,
    description: input.description,
    alternates: {
      canonical: canonicalUrl(input.site, input.path)
    },
    openGraph: {
      title: input.title,
      description: input.description,
      url: canonicalUrl(input.site, input.path),
      images: image ? [{ url: image }] : undefined
    },
    twitter: {
      card: "summary_large_image",
      title: input.title,
      description: input.description,
      images: image ? [image] : undefined
    }
  };
}
