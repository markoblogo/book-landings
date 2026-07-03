import type { MetadataRoute } from 'next';
import { canonicalUrl, localeAlternates } from '@book-landings/landing-seo';
import { books } from '@/data/books';
import { daoTokiSiteConfig } from '@/site.config';

const lastModified = new Date('2026-07-03');
const locales = ['en', 'tp'] as const;

function entry(path: string, priority: number, changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'], alternatesPath?: string): MetadataRoute.Sitemap[number] {
  return {
    url: canonicalUrl(daoTokiSiteConfig, path),
    lastModified,
    changeFrequency,
    priority,
    alternates: {
      languages: localeAlternates(daoTokiSiteConfig, (locale) => `/${locale}${alternatesPath ?? path.replace(/^\/(en|tp)/, '')}`),
    },
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...locales.map((locale) => entry(`/${locale}`, 1, 'weekly', '')),
    ...locales.flatMap((locale) => [
      entry(`/${locale}/kit`, 0.7, 'monthly', '/kit'),
      entry(`/${locale}/legal`, 0.2, 'yearly', '/legal'),
      entry(`/${locale}/privacy`, 0.2, 'yearly', '/privacy'),
    ]),
    ...locales.flatMap((locale) =>
      books.map((book) => entry(`/${locale}/books/${book.slug}`, book.type === 'gift' ? 0.6 : 0.8, 'monthly', `/books/${book.slug}`))
    ),
  ];
}
