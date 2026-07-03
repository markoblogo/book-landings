import type { BookItem, LocaleCode, SiteConfig } from "@book-landings/landing-core";
import { resolveLocale } from "@book-landings/landing-core";

export type Dictionary = Record<string, unknown>;
export type DictionaryMap<TDictionary extends Dictionary = Dictionary> = Record<LocaleCode, TDictionary>;

export function isLocaleAvailable(site: SiteConfig, locale: string): boolean {
  return site.locales.some((item) => item.code === locale);
}

export function safeLocale(site: SiteConfig, locale: string | undefined): LocaleCode {
  return resolveLocale(site, locale);
}

export function getDictionary<TDictionary extends Dictionary>(
  dictionaries: DictionaryMap<TDictionary>,
  site: SiteConfig,
  locale: string | undefined
): TDictionary {
  const safe = safeLocale(site, locale);
  return dictionaries[safe] ?? dictionaries[site.defaultLocale];
}

export function getBookById<TBook extends Pick<BookItem, "id" | "slug">>(
  books: TBook[],
  idOrSlug: string
): TBook | undefined {
  return books.find((book) => book.id === idOrSlug || book.slug === idOrSlug);
}

export function requireBookById<TBook extends Pick<BookItem, "id" | "slug">>(
  books: TBook[],
  idOrSlug: string
): TBook {
  const book = getBookById(books, idOrSlug);
  if (!book) {
    throw new Error(`Unknown book: ${idOrSlug}`);
  }
  return book;
}

export function withFallback<T>(value: T | undefined | null, fallback: T): T {
  return value ?? fallback;
}
