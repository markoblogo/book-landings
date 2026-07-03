import type { BookItem, BookLink, LocaleConfig } from "@book-landings/landing-core";
import type { ReactNode } from "react";

export interface ComponentBaseProps {
  className?: string;
  variant?: string;
}

export interface EditorialHeroProps extends ComponentBaseProps {
  title: string;
  eyebrow?: string;
  subtitle?: string;
  actions?: ReactNode;
  media?: ReactNode;
}

export function EditorialHero({ title, eyebrow, subtitle, actions, media, className }: EditorialHeroProps) {
  return (
    <section className={className} data-variant="editorial-hero">
      {eyebrow ? <p>{eyebrow}</p> : null}
      <h1>{title}</h1>
      {subtitle ? <p>{subtitle}</p> : null}
      {actions ? <div>{actions}</div> : null}
      {media ? <div>{media}</div> : null}
    </section>
  );
}

export interface CTAButtonProps extends ComponentBaseProps {
  href: string;
  children: ReactNode;
  external?: boolean;
  download?: boolean;
}

export function CTAButton({ href, children, external, download, className }: CTAButtonProps) {
  return (
    <a className={className} href={href} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined} download={download}>
      {children}
    </a>
  );
}

export interface BookCardProps extends ComponentBaseProps {
  book: BookItem;
  href?: string;
}

export function BookCard({ book, href, className }: BookCardProps) {
  const content = (
    <>
      {book.assets?.cover ? <img src={book.assets.cover} alt="" /> : null}
      <h2>{book.title}</h2>
      {book.subtitle ? <p>{book.subtitle}</p> : null}
      {book.description ? <p>{book.description}</p> : null}
    </>
  );
  return <article className={className}>{href ? <a href={href}>{content}</a> : content}</article>;
}

export interface BookGridProps extends ComponentBaseProps {
  books: BookItem[];
  getBookHref?: (book: BookItem) => string;
}

export function BookGrid({ books, getBookHref, className }: BookGridProps) {
  return (
    <div className={className}>
      {books.map((book) => (
        <BookCard key={book.id} book={book} href={getBookHref?.(book)} />
      ))}
    </div>
  );
}

export interface BookDetailShellProps extends ComponentBaseProps {
  book: BookItem;
  actions?: ReactNode;
  children?: ReactNode;
}

export function BookDetailShell({ book, actions, children, className }: BookDetailShellProps) {
  return (
    <main className={className}>
      <BookCard book={book} />
      {actions ? <div>{actions}</div> : null}
      {children}
    </main>
  );
}

export interface LanguageSwitcherProps extends ComponentBaseProps {
  locales: LocaleConfig[];
  currentLocale: string;
  getHref: (locale: LocaleConfig) => string;
}

export function LanguageSwitcher({ locales, currentLocale, getHref, className }: LanguageSwitcherProps) {
  return (
    <nav className={className} aria-label="Language" data-locale-switcher>
      {locales.map((locale) => (
        <a key={locale.code} href={getHref(locale)} aria-current={locale.code === currentLocale ? "page" : undefined}>
          {locale.label}
        </a>
      ))}
    </nav>
  );
}

export interface FooterProps extends ComponentBaseProps {
  children?: ReactNode;
  legalHref?: string;
  privacyHref?: string;
}

export function Footer({ children, legalHref, privacyHref, className }: FooterProps) {
  return (
    <footer className={className}>
      {children}
      {legalHref ? <a href={legalHref}>Legal</a> : null}
      {privacyHref ? <a href={privacyHref}>Privacy</a> : null}
    </footer>
  );
}

export function LegalPage({ title = "Legal", children, className }: { title?: string; children?: ReactNode; className?: string }) {
  return (
    <main className={className}>
      <h1>{title}</h1>
      {children}
    </main>
  );
}

export function PrivacyPage({ title = "Privacy", children, className }: { title?: string; children?: ReactNode; className?: string }) {
  return (
    <main className={className}>
      <h1>{title}</h1>
      {children}
    </main>
  );
}

export function RelatedProjects({ links, className }: { links: BookLink[]; className?: string }) {
  return (
    <section className={className}>
      {links.map((link) => (
        <a key={`${link.label}:${link.href}`} href={link.href} target={link.external ? "_blank" : undefined} rel={link.external ? "noopener noreferrer" : undefined}>
          {link.label}
        </a>
      ))}
    </section>
  );
}
