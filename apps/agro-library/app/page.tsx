import { metadataBase } from "@book-landings/landing-seo";
import { Footer } from "@book-landings/landing-ui";
import type { CatalogBook } from "../data/catalog";
import { englishBooks, ukrainianBooks } from "../data/catalog";
import { contactEmail, developer, ecosystemLinks, publisher } from "../data/ecosystem";
import { agroLibrarySiteConfig } from "../site.config";
import styles from "./page.module.css";

export const metadata = metadataBase({
  site: agroLibrarySiteConfig,
  title: "AMI Team Publishing | Professional books for physical commodity markets",
  description: "Free professional editions for physical commodity brokers, traders, farmers, and market operators."
});

function BookCard({ book }: { book: CatalogBook }) {
  const isUpcoming = book.status === "upcoming";

  return (
    <article className={styles.bookCard} lang={book.contentLanguage}>
      <div className={styles.coverFrame}>
        {book.cover ? <img src={book.cover} alt={`Cover of ${book.title}`} /> : null}
        <span className={styles.formatBadge}>{isUpcoming ? "Coming soon" : "All free"}</span>
      </div>
      <div className={styles.bookContent}>
        <p className={styles.bookType}>{book.group === "product-guides" ? "Product guide" : "Professional guide"}</p>
        <h3>{book.title}</h3>
        {book.subtitle ? <p className={styles.subtitle}>{book.subtitle}</p> : null}
        <p>{book.summary}</p>
        {book.audience ? <p className={styles.audience}>{book.audience}</p> : null}
        {book.note ? <p className={styles.note}>{book.note}</p> : null}
        <div className={styles.cardFooter}>
          {book.assets.length ? (
            <div className={styles.assetLinks} aria-label={`${book.title} formats`}>
              {book.assets.map((asset) => (
                <a key={asset.href} href={asset.href} target="_blank" rel="noopener noreferrer">
                  {asset.label}
                </a>
              ))}
            </div>
          ) : <p className={styles.waiting}>Publication files will be available at release.</p>}
          <a className={styles.projectLink} href={book.project.href} target="_blank" rel="noopener noreferrer">
            Related project: {book.project.label}
          </a>
        </div>
      </div>
    </article>
  );
}

function BookSection({ id, title, intro, books }: { id: string; title: string; intro: string; books: CatalogBook[] }) {
  return (
    <section className={styles.catalogSection} id={id} aria-labelledby={`${id}-title`}>
      <div className={styles.sectionHeading}>
        <p>All editions are free</p>
        <h2 id={`${id}-title`}>{title}</h2>
        <p>{intro}</p>
      </div>
      <div className={styles.bookGrid}>
        {books.map((book) => <BookCard key={book.id} book={book} />)}
      </div>
    </section>
  );
}

export default function Page() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <p className={styles.eyebrow}>AMI Team Publishing</p>
        <h1>Professional books for physical commodity markets</h1>
        <p className={styles.heroCopy}>Free practical editions for commodity brokers, traders, farmers, and market operators. Built around physical markets, execution, logistics, and commercial decision-making.</p>
        <a className={styles.primaryAction} href="#english-product-guides">Explore the library</a>
      </section>

      <BookSection id="english-product-guides" title="Product guides" intro="Living guides for working with the products and operating systems behind the market." books={englishBooks.filter((book) => book.group === "product-guides")} />
      <BookSection id="english-professional-guides" title="Professional guides" intro="Operational knowledge for brokerage, spot-market practice, and contract execution." books={englishBooks.filter((book) => book.group === "professional-guides")} />
      <BookSection id="ukrainian-books" title="Books in Ukrainian" intro="Українські професійні видання для практиків аграрного та товарного ринку." books={ukrainianBooks} />

      <section className={styles.notice} aria-labelledby="professional-notice-title">
        <p>Professional materials</p>
        <h2 id="professional-notice-title">For better operational judgement, not investment decisions.</h2>
        <p>These editions are educational and operational materials. They are not investment advice and do not make price forecasts or return claims.</p>
      </section>

      <Footer className={styles.footer} legalHref="/legal" privacyHref="/privacy">
        {ecosystemLinks.length ? <nav aria-label="Ecosystem projects">{ecosystemLinks.map((link) => <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer">{link.label}</a>)}</nav> : null}
        <p>Published by {publisher}. Developed by <a href={developer.href} target="_blank" rel="noopener noreferrer">{developer.label}</a>.</p>
        <p><a href={`mailto:${contactEmail}`}>{contactEmail}</a></p>
      </Footer>
    </main>
  );
}
