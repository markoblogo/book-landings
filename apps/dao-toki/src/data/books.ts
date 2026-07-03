export interface LocalizedString {
  en: string;
  tp: string;
}

export interface BookIdentifiers {
  asinKindle?: string;
  asinPrint?: string;
  isbn13Print?: string;
}

export interface BookAssets {
  cover: string;
  promo: string;
}

export interface BookLinks {
  learnMore: string;
  amazonKindle?: string | null;
  amazonPrint?: string | null;
  downloadPdf?: string | null;
  downloadEpub?: string | null;
  teaserUrl?: string | null;
}

export interface BookFlags {
  isFree: boolean;
  isPublished: boolean;
}

export interface BookMeta {
  dictionaryKey: string;
  seoTitleKey: string;
  seoDescriptionKey: string;
}

export interface Book {
  slug: string;
  id: string;
  type: 'commercial' | 'gift';
  title: LocalizedString;
  author: LocalizedString;
  shortDescription: LocalizedString;
  longDescription: LocalizedString;
  assets: BookAssets;
  links: BookLinks;
  flags: BookFlags;
  meta: BookMeta;
  identifiers?: BookIdentifiers;

  coverImage: string;
  promoImage: string;
  amazonKindleUrl?: string;
  amazonPrintUrl?: string;
  downloadPdfUrl?: string;
  downloadEpubUrl?: string;
  teaserVideoId?: string;
}

type BookSeed = Omit<
  Book,
  | 'id'
  | 'coverImage'
  | 'promoImage'
  | 'amazonKindleUrl'
  | 'amazonPrintUrl'
  | 'downloadPdfUrl'
  | 'downloadEpubUrl'
  | 'teaserVideoId'
>;

const seeds: BookSeed[] = [
  {
    slug: 'dao-de-jing',
    type: 'commercial',
    title: {
      en: 'Dao De Jing',
      tp: 'lipu nasin',
    },
    author: {
      en: 'Laozi',
      tp: 'jan sona pi nasin',
    },
    shortDescription: {
      en: 'Traditional Chinese + toki pona in sitelen pona',
      tp: 'sitelen pi tenpo pini en toki pona lon nasin pi sitelen pona',
    },
    longDescription: {
      en: 'Includes: English foreword, chapter guide, classical Chinese text, toki pona, sitelen-pona-ready layout.',
      tp: 'ijo insa: toki ante pi open lipu, sona lili pi lipu ale, sitelen pi tenpo pini, toki pona, nasin pi sitelen pona.',
    },
    assets: {
      cover: '/assets/books/dao-de-jing/cover.svg',
      promo: '/assets/books/dao-de-jing/promo.svg',
    },
    links: {
      learnMore: '/books/dao-de-jing',
      amazonKindle: 'https://www.amazon.com/dp/B0G4XNRS4W',
      amazonPrint: 'https://www.amazon.com/dp/B0G5MCFN2T',
      teaserUrl: 'https://youtu.be/oWA-_FatU3E',
    },
    flags: {
      isFree: false,
      isPublished: true,
    },
    meta: {
      dictionaryKey: 'dao-de-jing',
      seoTitleKey: 'collection.dao-de-jing.title',
      seoDescriptionKey: 'collection.dao-de-jing.shortDesc',
    },
    identifiers: {
      asinKindle: 'B0G4XNRS4W',
      asinPrint: 'B0G5MCFN2T',
    },
  },
  {
    slug: 'sunzi',
    type: 'commercial',
    title: {
      en: 'Sunzi: The Art of War in toki pona',
      tp: 'lipu pi sona utala',
    },
    author: {
      en: 'Sunzi',
      tp: 'jan sona pi utala',
    },
    shortDescription: {
      en: 'Traditional Chinese, English, toki pona, sitelen pona',
      tp: 'sitelen pi tenpo pini, toki ante, toki pona, sitelen pona',
    },
    longDescription: {
      en: 'Includes: English, Traditional Chinese, toki pona, sitelen-ready line, glossary notes.',
      tp: 'ijo insa: toki ante, sitelen pi tenpo pini, toki pona, nasin pi sitelen pona, sona nimi.',
    },
    assets: {
      cover: '/assets/books/sunzi/cover.svg',
      promo: '/assets/books/sunzi/promo.svg',
    },
    links: {
      learnMore: '/books/sunzi',
      amazonKindle: 'https://www.amazon.com/dp/B0GQTZFFVG',
      amazonPrint: 'https://www.amazon.com/dp/B0GQXP442Z',
      teaserUrl: 'https://youtu.be/sJdkHP6Pk-k',
    },
    flags: {
      isFree: false,
      isPublished: true,
    },
    meta: {
      dictionaryKey: 'sunzi',
      seoTitleKey: 'collection.sunzi.title',
      seoDescriptionKey: 'collection.sunzi.shortDesc',
    },
    identifiers: {
      asinKindle: 'B0GQTZFFVG',
      asinPrint: 'B0GQXP442Z',
    },
  },
  {
    slug: 'mozi-universal-love',
    type: 'gift',
    title: {
      en: 'Mozi — Universal Love',
      tp: 'olin ale',
    },
    author: {
      en: 'Mozi',
      tp: 'jan pi olin ale',
    },
    shortDescription: {
      en: 'Free series preview / full text',
      tp: 'lipu mani ala pi open kulupu',
    },
    longDescription: {
      en: 'Includes: full text, series preview format, parallel reading layout.',
      tp: 'ijo insa: lipu ale, nasin lukin open pi kulupu, nasin lukin poka.',
    },
    assets: {
      cover: '/assets/books/mozi-universal-love/cover.svg',
      promo: '/assets/books/mozi-universal-love/promo.svg',
    },
    links: {
      learnMore: '/books/mozi-universal-love',
      downloadPdf: 'https://toki-free.abvx.xyz/books/chinese-wisdom/chinese-wisdom.pdf',
      teaserUrl: 'https://youtu.be/BOVyG1jP580',
    },
    flags: {
      isFree: true,
      isPublished: true,
    },
    meta: {
      dictionaryKey: 'mozi-universal-love',
      seoTitleKey: 'collection.mozi-universal-love.title',
      seoDescriptionKey: 'collection.mozi-universal-love.shortDesc',
    },
  },
];

function toYouTubeVideoId(url?: string | null): string | undefined {
  if (!url) return undefined;
  try {
    const parsed = new URL(url);
    if (parsed.hostname === 'youtu.be') {
      return parsed.pathname.replace(/^\//, '') || undefined;
    }
    if (parsed.hostname.includes('youtube.com')) {
      const id = parsed.searchParams.get('v');
      return id || undefined;
    }
    return undefined;
  } catch {
    return undefined;
  }
}

export const books: Book[] = seeds.map((book) => ({
  ...book,
  id: book.slug,
  coverImage: book.assets.cover,
  promoImage: book.assets.promo,
  amazonKindleUrl: book.links.amazonKindle ?? undefined,
  amazonPrintUrl: book.links.amazonPrint ?? undefined,
  downloadPdfUrl: book.links.downloadPdf ?? undefined,
  downloadEpubUrl: book.links.downloadEpub ?? undefined,
  teaserVideoId: toYouTubeVideoId(book.links.teaserUrl),
}));
