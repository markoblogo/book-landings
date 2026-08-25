export type CatalogSection = "english" | "ukrainian";
export type CatalogGroup = "product-guides" | "professional-guides";
export type AssetFormat = "PDF" | "EPUB" | "Audio" | "M4B" | "Kindle" | "Paperback";
export type DistributionKind = "free" | "amazon";

export interface CatalogAsset {
  href: string;
  format: AssetFormat;
  label: string;
}

export interface CatalogBook {
  id: string;
  slug: string;
  section: CatalogSection;
  group: CatalogGroup;
  contentLanguage: "en" | "uk";
  title: string;
  subtitle?: string;
  summary: string;
  audience?: string;
  cover?: string;
  print?: string;
  assets: CatalogAsset[];
  project: {
    label: string;
    href: string;
  };
  distribution?: DistributionKind;
  note?: string;
  status: "available" | "upcoming";
}

export const englishBooks: CatalogBook[] = [
  {
    id: "mn7r-product-guide",
    slug: "mn7r-product-guide",
    section: "english",
    group: "product-guides",
    contentLanguage: "en",
    title: "MN7R Product Guide",
    subtitle: "The Commodity Brokerage Workspace for Modern Teams",
    summary: "A public guide to how MN7R helps commodity brokerage teams manage deals, clients, execution, analytics, and supervised AI-assisted workflows.",
    cover: "/covers/mn7r-product-guide.jpeg",
    print: "/prints/mn7r-product-guide.png",
    assets: [
      { href: "https://mn7r.com/mn7r-guide/mn7r-product-guide.pdf", format: "PDF", label: "Download PDF" },
      { href: "https://mn7r.com/mn7r-guide/mn7r-product-guide.epub", format: "EPUB", label: "Download EPUB" }
    ],
    project: { label: "MN7R.com", href: "https://mn7r.com/how-to-use" },
    distribution: "free",
    note: "A living guide that is updated as MN7R develops. Download the latest edition periodically.",
    status: "available"
  },
  {
    id: "agro-commodity-brokerage-en",
    slug: "agro-commodity-brokerage-en",
    section: "english",
    group: "professional-guides",
    contentLanguage: "en",
    title: "Agro-Commodity Brokerage",
    subtitle: "A Practical Guide for Brokers · English adapted edition 1.0",
    summary: "An adapted MN7R guide for an international brokerage audience covering grains, oilseeds, logistics, basis, deals, risks, workflow, and team brokerage.",
    cover: "/covers/agro-commodity-brokerage-en.jpeg",
    print: "/prints/agro-commodity-brokerage-en.png",
    assets: [
      { href: "https://mn7r.com/book/mn7r-agro-commodity-brokerage-en.pdf", format: "PDF", label: "Download PDF" },
      { href: "https://mn7r.com/book/mn7r-agro-commodity-brokerage-en.epub", format: "EPUB", label: "Download EPUB" },
      { href: "https://mn7r.com/book/mn7r-agro-commodity-brokerage-en-audio.mp3", format: "Audio", label: "Listen to audio" },
      { href: "https://mn7r.com/book/mn7r-agro-commodity-brokerage-en-audio.m4b", format: "M4B", label: "Download M4B" }
    ],
    project: { label: "MN7R.com", href: "https://mn7r.com/how-to-use" },
    distribution: "free",
    status: "available"
  },
  {
    id: "spot-market-handbook-en",
    slug: "spot-market-handbook-en",
    section: "english",
    group: "professional-guides",
    contentLanguage: "en",
    title: "Spot-Market Handbook",
    subtitle: "Guide to the Spot Market in Ukraine",
    summary: "An English edition connecting the Ukrainian market to global physical-market practice: logistics, basis, liquidity, respondent-based indices, spot benchmarks, market intelligence, and usable data infrastructure.",
    cover: "/covers/spot-market-handbook-en-cover.jpg",
    print: "/prints/spot-market-handbook-en.png",
    audience: "For traders, brokers, exporters, processors, analysts, investors, students, and market operators working with physical commodity flows.",
    assets: [
      { href: "https://cdn.jsdelivr.net/gh/markoblogo/index@asset-cdn/public/files/spot-market-handbook-en.pdf", format: "PDF", label: "Open PDF" },
      { href: "https://github.com/markoblogo/index/releases/download/asset-binaries-v1/spot-market-handbook-en.epub", format: "EPUB", label: "Download EPUB" }
    ],
    project: { label: "1d3x.com", href: "https://1d3x.com/" },
    distribution: "free",
    status: "available"
  },
  {
    id: "burgers-lipstick-underwear",
    slug: "burgers-lipstick-underwear",
    section: "english",
    group: "professional-guides",
    contentLanguage: "en",
    title: "Burgers, Lipstick & Underwear",
    subtitle: "What Strange Indicators Really Tell Us About the Economy",
    summary: "A curious, skeptical tour of the strange indicators people use to understand prices, purchasing power, economic stress, risk, and technological progress.",
    cover: "/covers/burgers-lipstick-underwear.png",
    print: "/prints/burgers-lipstick-underwear.png",
    audience: "For readers interested in how ordinary objects, proxy measures, and memorable benchmarks can illuminate or distort the systems they claim to explain.",
    assets: [
      { href: "https://www.amazon.com/dp/B0HF5DWCHB", format: "Kindle", label: "Kindle" },
      { href: "https://www.amazon.com/dp/B0HF7SJJ7N", format: "Paperback", label: "Paperback" }
    ],
    project: { label: "ABVX", href: "https://abvx.xyz/books/burgers-lipstick-underwear" },
    distribution: "amazon",
    note: "External Amazon publication. Kindle and paperback are available through the links below.",
    status: "available"
  },
  {
    id: "contract-execution-officer-handbook",
    slug: "contract-execution-officer-handbook",
    section: "english",
    group: "professional-guides",
    contentLanguage: "en",
    title: "The Contract Execution Officer Handbook",
    subtitle: "A Practical Guide to Physical Commodity Contract Execution with MN7R",
    summary: "A practical handbook for professionals who turn agreed commodity trades into controlled, documented, and financially complete transactions, from handover and contract formation through logistics, documentary control, payment, reconciliation, and closeout.",
    cover: "/covers/contract-execution-officer-handbook.jpeg",
    print: "/prints/contract-execution-officer-handbook.png",
    audience: "For execution officers, brokers, traders, logistics and operations teams, finance and compliance professionals, managers, and students working with physical agricultural commodity contracts.",
    assets: [
      { href: "https://mn7r.com/books/contract-execution-officer-handbook.pdf", format: "PDF", label: "Download PDF" },
      { href: "https://mn7r.com/books/contract-execution-officer-handbook.epub", format: "EPUB", label: "Download EPUB" }
    ],
    project: { label: "MN7R.com", href: "https://mn7r.com/how-to-use" },
    distribution: "free",
    note: "A living professional guide that will be updated with the contract-execution methodology and MN7R capabilities.",
    status: "available"
  }
];

// Ukrainian cards retain Ukrainian copy inside the English-language site shell.
export const ukrainianBooks: CatalogBook[] = [
  {
    id: "agro-commodity-brokerage-uk",
    slug: "agro-commodity-brokerage-uk",
    section: "ukrainian",
    group: "professional-guides",
    contentLanguage: "uk",
    title: "Брокеридж на ринках зернових та олійних",
    subtitle: "Практичний гід для брокерів · Українська версія 1.0",
    summary: "Безкоштовна книга MN7R для брокерів і майбутніх брокерів: зернові, олійні, логістика, базис, угоди, ризики, сучасний workflow і роль MN7R у командному брокериджі.",
    cover: "/covers/agro-commodity-brokerage-uk.jpeg",
    print: "/prints/agro-commodity-brokerage-uk.png",
    assets: [
      { href: "https://mn7r.com/book/mn7r-agro-commodity-brokerage-ua.pdf", format: "PDF", label: "Завантажити PDF" },
      { href: "https://mn7r.com/book/mn7r-agro-commodity-brokerage-ua.epub", format: "EPUB", label: "Завантажити EPUB" }
    ],
    project: { label: "MN7R.com", href: "https://mn7r.com/how-to-use" },
    distribution: "free",
    status: "available"
  },
  {
    id: "spot-market-handbook-uk",
    slug: "spot-market-handbook-uk",
    section: "ukrainian",
    group: "professional-guides",
    contentLanguage: "uk",
    title: "Spot-Market Handbook",
    subtitle: "Посібник із спотовим ринком України",
    summary: "Книга для аналітиків, трейдерів, закупівельників і керівників ризик-менеджменту про опорні ціни, індикативи та щоденні бенчмарки в операційному ритмі.",
    cover: "/covers/spot-market-handbook-uk.jpeg",
    print: "/prints/spot-market-handbook-uk.png",
    assets: [
      { href: "https://cdn.jsdelivr.net/gh/markoblogo/index@asset-cdn/public/files/spot-market-handbook-ua.pdf", format: "PDF", label: "Відкрити PDF" },
      { href: "https://github.com/markoblogo/index/releases/download/asset-binaries-v1/spot-market-handbook-ua.epub", format: "EPUB", label: "Завантажити EPUB" }
    ],
    project: { label: "Spike", href: "https://spike.1d3x.com/uk/about" },
    distribution: "free",
    status: "available"
  }
];

export const allBooks = [...englishBooks, ...ukrainianBooks];

export function getBookBySlug(slug: string): CatalogBook | undefined {
  return allBooks.find((book) => book.slug === slug);
}
