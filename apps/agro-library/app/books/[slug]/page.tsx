import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { allBooks, getBookBySlug } from "../../../data/catalog";
import { agroLibrarySiteConfig } from "../../../site.config";
import styles from "./page.module.css";

export function generateStaticParams() {
  return allBooks.map((book) => ({ slug: book.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const book = getBookBySlug(slug);
  if (!book) return {};

  const title = `${book.title} | AMI Team Publishing`;
  return {
    title,
    description: book.summary,
    alternates: { canonical: `/books/${book.slug}` },
    openGraph: { title, description: book.summary, images: book.cover ? [book.cover] : [] }
  };
}

export default async function BookPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const book = getBookBySlug(slug);
  if (!book) notFound();

  const url = `${agroLibrarySiteConfig.baseUrl}/books/${book.slug}`;
  const schema = {
    "@context": "https://schema.org",
    "@type": "Book",
    name: book.title,
    description: book.summary,
    inLanguage: book.contentLanguage,
    image: book.cover ? `${agroLibrarySiteConfig.baseUrl}${book.cover}` : undefined,
    url,
    isAccessibleForFree: book.status === "available" && book.distribution !== "amazon",
    publisher: { "@type": "Organization", name: "AMI team" }
  };

  return (
    <main className={styles.page} lang={book.contentLanguage}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <header className={styles.header}><a href="/">AMI books</a><a href="/#english-guides">Back to library</a></header>
      <article className={styles.hero}>
        <div className={styles.cover}>{book.cover ? <img src={book.cover} alt={`Cover of ${book.title}`} /> : null}<span className={book.status === "upcoming" ? styles.coming : book.distribution === "amazon" ? styles.amazon : styles.free}>{book.status === "upcoming" ? "COMMING SOON" : book.distribution === "amazon" ? "AMAZON" : "ALL FREE"}</span></div>
        <div className={styles.copy}>
          <p>{book.group === "product-guides" ? "Product guide" : "Professional guide"}</p>
          <h1>{book.title}</h1>
          {book.subtitle ? <h2>{book.subtitle}</h2> : null}
          <p className={styles.summary}>{book.summary}</p>
          {book.audience ? <p className={styles.audience}>{book.audience}</p> : null}
          {book.note ? <p className={styles.note}>{book.note}</p> : null}
          {book.status === "available" ? <div className={styles.actions}>{book.assets.map((asset) => <a className={book.distribution === "amazon" ? styles.amazonLink : undefined} key={asset.href} href={asset.href} target="_blank" rel="noopener noreferrer">{asset.label}</a>)}</div> : <p className={styles.release}>Publication files will be available at release.</p>}
          <a className={styles.related} href={book.project.href} target="_blank" rel="noopener noreferrer">Related project: {book.project.label}</a>
        </div>
      </article>
      {book.print ? <section className={styles.print}><img src={book.print} alt={`Print showing ${book.title}`} /></section> : null}
    </main>
  );
}
