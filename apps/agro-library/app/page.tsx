import { metadataBase } from "@book-landings/landing-seo";
import { HeroFan } from "../components/HeroFan";
import { PrintViewer } from "../components/PrintViewer";
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

const faqItems = [
  ["Are the books free?", "Yes. Every currently published AMI Team edition on this site is free to open, download, or listen to in the formats shown on its page."],
  ["Who are these books for?", "They are written for commodity brokers, traders, farmers, exporters, processors, execution teams, analysts, and students working with physical commodity flows."],
  ["Which formats are available?", "Published editions provide the formats listed alongside each book, including PDF, EPUB, audio, and M4B where available."],
  ["Are the guides investment advice?", "No. They are educational and operational materials. They do not provide investment advice, price forecasts, or return claims."],
  ["Will the product guides change?", "Yes. Product guides and selected professional handbooks are living editions. Check the relevant book page for the latest version."],
  ["Why is there Ukrainian copy on an English site?", "The site shell remains English, while Ukrainian editions retain Ukrainian titles, descriptions, and download labels for their intended readers."]
];

function AvailabilityBadge({ status }: { status: CatalogBook["status"] }) {
  const upcoming = status === "upcoming";
  return (
    <span className={`${styles.badge} ${upcoming ? styles.badgeUpcoming : ""}`}>
      <span>{upcoming ? "COMMING SOON" : "ALL FREE"}</span>
    </span>
  );
}

function CollectionHeader({ title, subtitle, id }: { title: string; subtitle: string; id: string }) {
  return (
    <header className={styles.collectionHeader} id={id}>
      <p>AMI Team Publishing</p>
      <h2>{title}</h2>
      <span>{subtitle}</span>
    </header>
  );
}

function BookFeature({ book, reverse }: { book: CatalogBook; reverse: boolean }) {
  const available = book.status === "available";

  return (
    <article className={`${styles.bookFeature} ${reverse ? styles.reverse : ""}`} id={book.slug} lang={book.contentLanguage}>
      <div className={styles.printFrame}>
        {book.print ? <PrintViewer src={book.print} alt={`Print showing ${book.title}`} /> : null}
        <AvailabilityBadge status={book.status} />
      </div>
      <div className={styles.bookCopy}>
        <p className={styles.bookEyebrow}>{book.group === "product-guides" ? "Product guide" : "Professional guide"}</p>
        <h3><a href={`/books/${book.slug}`}>{book.title}</a></h3>
        {book.subtitle ? <p className={styles.bookSubtitle}>{book.subtitle}</p> : null}
        <p className={styles.summary}>{book.summary}</p>
        {book.audience ? <p className={styles.audience}>{book.audience}</p> : null}
        {book.note ? <p className={styles.note}>{book.note}</p> : null}
        {available ? (
          <div className={styles.actions} aria-label={`${book.title} formats`}>
            {book.assets.map((asset) => (
              <a key={asset.href} href={asset.href} target="_blank" rel="noopener noreferrer" className={styles.download}>
                {asset.label}
              </a>
            ))}
          </div>
        ) : <p className={styles.releaseNote}>Publication files will be available at release.</p>}
        <a className={styles.related} href={book.project.href} target="_blank" rel="noopener noreferrer">
          Related project: {book.project.label}
        </a>
        <a className={styles.bookPage} href={`/books/${book.slug}`}>View book page</a>
      </div>
    </article>
  );
}

function BookCollection({ books, title, subtitle, id, offset = 0 }: { books: CatalogBook[]; title: string; subtitle: string; id: string; offset?: number }) {
  return (
    <section className={styles.collection} aria-labelledby={`${id}-title`}>
      <div className={styles.container}>
        <CollectionHeader title={title} subtitle={subtitle} id={`${id}-title`} />
        <div className={styles.bookList}>
          {books.map((book, index) => <BookFeature key={book.id} book={book} reverse={(index + offset) % 2 === 1} />)}
        </div>
      </div>
    </section>
  );
}

export default function Page() {
  const productGuides = englishBooks.filter((book) => book.group === "product-guides");
  const professionalGuides = englishBooks.filter((book) => book.group === "professional-guides");
  const fanBooks = englishBooks;

  return (
    <main className={styles.page}>
      <section className={styles.hero} id="top">
        <div className={`${styles.container} ${styles.heroInner}`}>
          <div className={styles.heroCopy}>
            <AvailabilityBadge status="available" />
            <h1>Books for physical commodity markets</h1>
            <p>Free professional editions for brokers, traders, farmers, and market operators. Built around physical markets, execution, logistics, and commercial work.</p>
          </div>
          <HeroFan books={fanBooks} className={styles.fan} cardClassName={styles.fanBook} activeClassName={styles.fanBookActive} />
        </div>
      </section>

      <BookCollection books={productGuides} title="Product guides" subtitle="Living guides for working with the products and operating systems behind the market." id="english-guides" />
      <BookCollection books={professionalGuides} title="Professional guides" subtitle="Operational knowledge for brokerage, spot-market practice, and contract execution." id="professional-guides" offset={1} />
      <BookCollection books={ukrainianBooks} title="Books in Ukrainian" subtitle="Українські професійні видання для практиків аграрного та товарного ринку." id="ukrainian-books" />

      <section className={styles.about} id="about">
        <div className={styles.container}>
          <header className={styles.aboutHeader}>
            <p>About the library</p>
            <h2>Practical material for the work behind a commodity deal.</h2>
          </header>
          <div className={styles.principles}>
            <article><h3>Physical-market practice</h3><p>Built around the commercial, logistical, documentary, and execution realities behind physical commodity flows.</p></article>
            <article><h3>Usable formats</h3><p>Read online or use downloadable PDF, EPUB, audio, and M4B editions where they are available.</p></article>
            <article><h3>Living professional editions</h3><p>Selected guides evolve with operating practice and the products they explain. Revisit them for updated editions.</p></article>
          </div>
        </div>
      </section>

      <section className={styles.faq} id="faq">
        <div className={styles.container}>
          <header className={styles.faqHeader}><h2>FAQ</h2><p>Short answers about the library and its editions.</p></header>
          <div className={styles.faqGrid}>
            {faqItems.map(([question, answer]) => (
              <details className={styles.faqItem} key={question}>
                <summary>{question}</summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <footer className={styles.footer}>
        <div className={`${styles.container} ${styles.footerGrid}`}>
          <div><p className={styles.footerBrand}>AMI books</p><p>Free professional publishing for physical commodity markets.</p></div>
          <nav aria-label="AMI team projects"><p>AMI team projects</p>{ecosystemLinks.map((link) => <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer">{link.label}</a>)}</nav>
          <div><p>Contact</p><a href={`mailto:${contactEmail}`}>{contactEmail}</a><span>Published by {publisher}</span><span>Developed by <a href={developer.href} target="_blank" rel="noopener noreferrer">{developer.label}</a></span></div>
          <div><p>Information</p><a href="/legal">Legal</a><a href="/privacy">Privacy</a></div>
        </div>
      </footer>
    </main>
  );
}
