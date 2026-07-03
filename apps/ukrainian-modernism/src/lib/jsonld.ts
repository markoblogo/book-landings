import type { Book } from '@/data/books';
import { UKRAINIAN_MODERNISM_SITE_URL } from '@/site.config';

export const SITE_URL = UKRAINIAN_MODERNISM_SITE_URL;

export function orgJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'ABVX',
    url: 'https://abvx.xyz',
    sameAs: ['https://abvcreative.medium.com/', 'https://abvx.substack.com/'],
  };
}

export function websiteJsonLd(lang: 'fr' | 'uk') {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: lang === 'fr' ? 'Modernisme ukrainien' : 'Український модернізм',
    url: SITE_URL,
    inLanguage: lang,
  };
}

export function seriesJsonLd(lang: 'fr' | 'uk') {
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWorkSeries',
    name: lang === 'fr' ? 'Modernisme ukrainien' : 'Український модернізм',
    url: `${SITE_URL}/${lang}`,
    inLanguage: lang,
    publisher: {
      '@type': 'Organization',
      name: 'ABVX',
      url: 'https://abvx.xyz',
    },
  };
}

function identifiersFromBook(book: Book) {
  const ids: any[] = [];
  if (book.identifiers?.isbn13Print) {
    ids.push({
      '@type': 'PropertyValue',
      propertyID: 'ISBN-13',
      value: book.identifiers.isbn13Print,
    });
  }
  if (book.identifiers?.asinKindle) {
    ids.push({
      '@type': 'PropertyValue',
      propertyID: 'ASIN',
      value: book.identifiers.asinKindle,
    });
  }
  if (book.identifiers?.asinPrint) {
    ids.push({
      '@type': 'PropertyValue',
      propertyID: 'ASIN',
      value: book.identifiers.asinPrint,
    });
  }
  return ids.length ? ids : undefined;
}

export function bookJsonLd(lang: 'fr' | 'uk', book: Book) {
  const common: Record<string, any> = {
    '@context': 'https://schema.org',
    '@type': 'Book',
    '@id': `${SITE_URL}/${lang}#${book.id}`,
    name: book.title[lang],
    author: { '@type': 'Person', name: book.author[lang] },
    inLanguage: lang,
    translator: { '@type': 'Person', name: 'Anton Biletskiy-Volokh' },
    publisher: {
      '@type': 'Organization',
      name: 'ABVX',
      url: 'https://abvx.xyz',
    },
  };

  const identifier = identifiersFromBook(book);
  if (identifier) common.identifier = identifier;

  // Prefer print ISBN if available
  if (book.identifiers?.isbn13Print) {
    common.isbn = book.identifiers.isbn13Print;
  }

  // These fields are optional and safe
  if (book.print?.printLengthPages) common.numberOfPages = book.print.printLengthPages;
  else if (book.kindle?.printLengthPages) common.numberOfPages = book.kindle.printLengthPages;

  if (book.print?.publicationDate) common.datePublished = book.print.publicationDate;
  else if (book.kindle?.publicationDate) common.datePublished = book.kindle.publicationDate;

  if (book.kindle?.edition) common.bookEdition = book.kindle.edition;

  // Offers / sameAs
  const sameAs = [book.amazonKindleUrl, book.amazonPrintUrl].filter(Boolean);
  if (sameAs.length) common.sameAs = sameAs;

  const offers = [
    book.amazonKindleUrl
      ? {
          '@type': 'Offer',
          url: book.amazonKindleUrl,
          availability: 'https://schema.org/InStock',
        }
      : null,
    book.amazonPrintUrl
      ? {
          '@type': 'Offer',
          url: book.amazonPrintUrl,
          availability: 'https://schema.org/InStock',
        }
      : null,
  ].filter(Boolean);

  if (offers.length) common.offers = offers;

  return common;
}

export function giftBookJsonLd(lang: 'fr' | 'uk', book: Book) {
  const offers = [
    book.downloadPdfUrl
      ? {
          '@type': 'Offer',
          url: `${SITE_URL}${book.downloadPdfUrl}`,
          price: '0',
          priceCurrency: 'EUR',
          availability: 'https://schema.org/InStock',
        }
      : null,
    book.downloadEpubUrl
      ? {
          '@type': 'Offer',
          url: `${SITE_URL}${book.downloadEpubUrl}`,
          price: '0',
          priceCurrency: 'EUR',
          availability: 'https://schema.org/InStock',
        }
      : null,
  ].filter(Boolean);

  return {
    '@context': 'https://schema.org',
    '@type': 'Book',
    '@id': `${SITE_URL}/${lang}#${book.id}`,
    name: book.title[lang],
    author: { '@type': 'Person', name: book.author[lang] },
    inLanguage: lang,
    translator: { '@type': 'Person', name: 'Anton Biletskiy-Volokh' },
    publisher: { '@type': 'Organization', name: 'ABVX', url: 'https://abvx.xyz' },
    ...(offers.length ? { offers } : {}),
  };
}

export function jsonLdForBook(lang: 'fr' | 'uk', book: Book) {
  return book.type === 'gift' ? giftBookJsonLd(lang, book) : bookJsonLd(lang, book);
}
