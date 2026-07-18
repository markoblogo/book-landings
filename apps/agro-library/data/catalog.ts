export type CatalogSection = "english" | "ukrainian";

export type DownloadFormat = "PDF" | "EPUB" | "Other";

export interface CatalogBook {
  id: string;
  slug: string;
  section: CatalogSection;
  contentLanguage: "en" | "uk";
  title: string;
  subtitle?: string;
  summary: string;
  cover: string;
  download: {
    href: string;
    format: DownloadFormat;
    label: string;
  };
  status: "available" | "upcoming";
}

// Populate only with reviewed book data and existing hosted download URLs.
export const englishBooks: CatalogBook[] = [];

// Ukrainian cards retain Ukrainian copy inside the English-language site shell.
export const ukrainianBooks: CatalogBook[] = [];
