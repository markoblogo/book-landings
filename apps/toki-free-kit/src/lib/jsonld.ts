import type { Book } from '@/data/books';
import { TOKI_FREE_SITE_URL } from '@/site.config';

export const SITE_URL = TOKI_FREE_SITE_URL;

export function orgJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'ABVX',
    url: 'https://abvx.xyz',
    sameAs: ['https://github.com/markoblogo/toki-free-kit'],
  };
}

export function websiteJsonLd(lang: 'en' | 'tp') {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'toki pona free kit',
    url: SITE_URL,
    inLanguage: lang === 'tp' ? 'tok' : 'en',
  };
}

export function seriesJsonLd(lang: 'en' | 'tp') {
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWorkSeries',
    name: 'toki pona free kit',
    url: `${SITE_URL}/${lang}`,
    inLanguage: lang === 'tp' ? 'tok' : 'en',
    publisher: {
      '@type': 'Organization',
      name: 'ABVX',
      url: 'https://abvx.xyz',
    },
  };
}

export function jsonLdForBook(lang: 'en' | 'tp', book: Book) {
  return jsonLdForBookLocalized(lang, book, {
    title: book.id,
    author: 'ABVX',
  });
}

export function jsonLdForBookLocalized(
  lang: 'en' | 'tp',
  book: Book,
  localized: { title: string; author: string },
) {
  const inLanguage = lang === 'tp' ? 'tok' : 'en';

  const sameAs = [book.downloadPdfUrl, book.readOnlineUrl].filter(Boolean);

  return {
    '@context': 'https://schema.org',
    '@type': 'Book',
    '@id': `${SITE_URL}/${lang}#${book.id}`,
    name: localized.title,
    author: { '@type': 'Person', name: localized.author },
    inLanguage,
    publisher: { '@type': 'Organization', name: 'ABVX', url: 'https://abvx.xyz' },
    ...(sameAs.length ? { sameAs } : {}),
    offers: [
      ...(book.downloadPdfUrl
        ? [
            {
              '@type': 'Offer',
              url: book.downloadPdfUrl,
              price: '0',
              priceCurrency: 'USD',
              availability: 'https://schema.org/InStock',
            },
          ]
        : []),
      ...(book.readOnlineUrl
        ? [
            {
              '@type': 'Offer',
              url: book.readOnlineUrl,
              price: '0',
              priceCurrency: 'USD',
              availability: 'https://schema.org/InStock',
            },
          ]
        : []),
    ],
  };
}
