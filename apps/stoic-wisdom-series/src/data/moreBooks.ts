import type { Book } from './books';

// Additional Toki Pona-related books by the author (not part of the Stoic series).
// Used for SEO (JSON-LD) and internal linking context.
export const moreBooks: Book[] = [
  {
    id: 'dao-de-jing',
    type: 'commercial',
    title: {
      en: 'Dao De Jing (Tao Te Ching): Chinese text with Toki Pona in sitelen pona',
      tp: 'lipu nasin',
    },
    author: {
      en: 'ABV',
      tp: 'ABV',
    },
    coverImage: '/assets/books/other-books/dao.jpg',
    promoImage: '/assets/books/other-books/dao.jpg',
    amazonKindleUrl: 'https://www.amazon.com/dp/B0G4XNRS4W',
    amazonPrintUrl: 'https://www.amazon.com/dp/B0G5MCFN2T',
    identifiers: {
      asinKindle: 'B0G4XNRS4W',
      asinPrint: 'B0G5MCFN2T',
    },
    teaserVideoId: 'oWA-_FatU3E',
    shortDescription: {
      en: 'Chinese text paired with a sitelen pona toki pona translation — a quiet, art-like sequence of plates.',
      tp: 'sitelen pi tenpo pini en toki pona lon sitelen pona',
    },
    longDescription: {
      en: 'A visual bilingual edition: each chapter appears as a two-page spread — original Chinese on the left, sitelen pona on the right. Includes an English foreword and a compact reading guide.',
      tp: 'lipu ni li jo e sitelen pi tenpo pini lon poka wan, e toki pona lon sitelen pona lon poka ante. ona li pana e nasin lukin pi lipu wan wan.',
    },
  },
  {
    id: 'christmas-carol',
    type: 'commercial',
    title: {
      en: 'A Christmas Carol — in Toki Pona: Translated into the minimalist language Toki Pona',
      tp: 'lipu pi tenpo lete',
    },
    author: {
      en: 'Charles Dickens (trans. ABV)',
      tp: 'jan pali lipu',
    },
    coverImage: '/assets/books/other-books/christmas.jpg',
    promoImage: '/assets/books/other-books/christmas.jpg',
    amazonKindleUrl: 'https://www.amazon.com/dp/B0G1N2YHD8',
    amazonPrintUrl: 'https://www.amazon.com/dp/B0G1XVNPSL',
    identifiers: {
      asinKindle: 'B0G1N2YHD8',
      asinPrint: 'B0G1XVNPSL',
    },
    teaserVideoId: 'ammjR4v58CM',
    shortDescription: {
      en: 'Dickens retold through radical simplicity — toki pona + sitelen pona, with atmospheric illustration.',
      tp: 'lipu tu pi toki pona en sitelen pona',
    },
    longDescription: {
      en: 'A bilingual edition designed for learners and literature fans: complete toki pona text with sitelen pona alongside it, plus a brief introduction to the language and script.',
      tp: 'lipu ni li toki sin e lipu pi tenpo lete kepeken toki pona. toki pona en sitelen pona li lon poka lon nasin lipu pi lukin pona.',
    },
  },
  {
    id: 'machine-mind',
    type: 'commercial',
    title: {
      en: 'Toki Pona and the Machine Mind: Designing cleaner prompts, smaller models, and better systems with the world’s simplest language',
      tp: 'toki pona en lawa ilo',
    },
    author: {
      en: 'ABV',
      tp: 'ABV',
    },
    coverImage: '/assets/books/other-books/machine.jpg',
    promoImage: '/assets/books/other-books/machine.jpg',
    amazonKindleUrl: 'https://www.amazon.com/dp/B0G44JSMR2',
    amazonPrintUrl: 'https://www.amazon.com/dp/B0G5MQKZTX',
    identifiers: {
      asinKindle: 'B0G44JSMR2',
      asinPrint: 'B0G5MQKZTX',
    },
    teaserVideoId: '0juEOOI1iEM',
    shortDescription: {
      en: 'A practical field guide: prompt compression, constrained DSLs, and predictable AI interfaces inspired by toki pona.',
      tp: 'nasin pona pi toki tawa ilo',
    },
    longDescription: {
      en: 'Connects a tiny engineered language with large language models: cleaner prompts, smaller models, and deterministic interfaces between humans and AI.',
      tp: 'lipu ni li pana e nasin pali tawa toki lili, tawa toki ilo, tawa pali ilo sona. toki pona en sitelen ona li pana e nasin lukin tawa pali ilo.',
    },
  },
];
