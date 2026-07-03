export interface Book {
  id: string;
  type: 'commercial' | 'gift';
  coverImage: string;
  promoImage: string;
  downloadPdfUrl?: string;
  readOnlineUrl?: string;
  teaserVideoId?: string;
}

export const books: Book[] = [
  {
    id: 'readers-kit',
    type: 'gift',
    coverImage: '/books/reader-kit/cover.jpg',
    promoImage: '/books/reader-kit/promo.jpg',
    downloadPdfUrl: '/books/reader-kit/reader-kit.pdf',
    readOnlineUrl: 'https://toki.abvx.xyz/kit/',
    teaserVideoId: 'F7fSBElppzI',
  },
  {
    id: 'chinese-wisdom',
    type: 'gift',
    coverImage: '/books/chinese-wisdom/cover.jpg',
    promoImage: '/books/chinese-wisdom/promo.png',
    downloadPdfUrl: '/books/chinese-wisdom/chinese-wisdom.pdf',
    readOnlineUrl: 'https://toki.abvx.xyz/kit/',
    teaserVideoId: 'BOVyG1jP580',
  },
  {
    id: 'heart-sutra',
    type: 'gift',
    coverImage: '/books/heart-sutra/cover.svg',
    promoImage: '/books/heart-sutra/promo.png',
    downloadPdfUrl: '/books/heart-sutra/heart-sutra.pdf',
    readOnlineUrl: 'https://toki.abvx.xyz/kit/',
    teaserVideoId: '5q0eaRllDJQ',
  },
];
