import type { MetadataRoute } from 'next';
import { canonicalUrl, localeAlternates } from '@book-landings/landing-seo';
import { books } from '@/data/books';
import { getArticleRouteParams } from '@/lib/seo-articles';
import { ukrainianModernismSiteConfig } from '@/site.config';

const lastModified = new Date('2026-09-29');
const locales = ['fr', 'uk'] as const;
const articleIds = getArticleRouteParams().map(({ id }) => id);

function entry(path: string, priority: number, changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'], alternatesPath?: string): MetadataRoute.Sitemap[number] {
  return {
    url: canonicalUrl(ukrainianModernismSiteConfig, path),
    lastModified,
    changeFrequency,
    priority,
    alternates: {
      languages: localeAlternates(ukrainianModernismSiteConfig, (locale) => `/${locale}${alternatesPath ?? path.replace(/^\/(fr|uk)/, '')}`),
    },
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...locales.map((locale) => entry(`/${locale}`, 1, 'weekly', '')),
    ...locales.flatMap((locale) => [
      entry(`/${locale}/gift`, 0.7, 'monthly', '/gift'),
      entry(`/${locale}/legal`, 0.2, 'yearly', '/legal'),
      entry(`/${locale}/privacy`, 0.2, 'yearly', '/privacy'),
    ]),
    ...locales.flatMap((locale) =>
      books.map((book) => entry(`/${locale}/book/${book.id}`, book.type === 'gift' ? 0.6 : 0.8, 'monthly', `/book/${book.id}`))
    ),
    ...locales.flatMap((locale) =>
      articleIds.map((id) => entry(`/${locale}/article/${id}`, 0.7, 'monthly', `/article/${id}`))
    ),
  ];
}
