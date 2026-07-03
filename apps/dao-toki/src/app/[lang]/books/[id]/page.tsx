import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { books } from '@/data/books';
import { getDictionary } from '@/get-dictionary';
import styles from './page.module.css';
import { jsonLdForBook } from '@/lib/jsonld';
import Script from 'next/script';
import { daoTokiSiteConfig } from '@/site.config';
import { canonicalUrl, openGraphImage } from '@book-landings/landing-seo';
import Header from '@/components/Header';
import SitelenLayerPluginClient from '@/components/SitelenLayerPluginClient';

function getLocalizedBook(dict: any, book: (typeof books)[number], lang: 'en' | 'tp') {
  const localized = dict?.collection?.[book.slug];
  const learnMoreParagraphs =
    Array.isArray(localized?.learnMoreParagraphs) && localized.learnMoreParagraphs.length
      ? localized.learnMoreParagraphs
      : [localized?.longDesc || book.longDescription[lang] || book.longDescription.en];

  return {
    title: localized?.title || book.title[lang] || book.title.en,
    author: localized?.author || book.author[lang] || book.author.en,
    shortDesc: localized?.shortDesc || book.shortDescription[lang] || book.shortDescription.en,
    longDesc: localized?.longDesc || book.longDescription[lang] || book.longDescription.en,
    learnMoreParagraphs,
  };
}

export async function generateStaticParams() {
  const langs = ['en', 'tp'] as const;
  return langs.flatMap((lang) => books.map((b) => ({ lang, id: b.slug })));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string; id: string }> }) {
  const { lang, id } = await params;
  const safeLang = lang === 'tp' ? 'tp' : 'en';
  const dict = await getDictionary(safeLang);
  const book = books.find((b) => b.slug === id);
  if (!book) return {};

  const localized = getLocalizedBook(dict, book, safeLang);
  const title = `${localized.title} — Chinese Wisdom in toki pona`;
  const description = localized.shortDesc;
  const imageUrl = openGraphImage(daoTokiSiteConfig, book.promoImage || book.coverImage) ?? canonicalUrl(daoTokiSiteConfig, book.promoImage || book.coverImage);

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl(daoTokiSiteConfig, `/${safeLang}/books/${book.slug}`),
      languages: {
        en: canonicalUrl(daoTokiSiteConfig, `/en/books/${book.slug}`),
        ['tok' as any]: canonicalUrl(daoTokiSiteConfig, `/tp/books/${book.slug}`),
      } as any,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl(daoTokiSiteConfig, `/${safeLang}/books/${book.slug}`),
      type: 'book',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: localized.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
    },
  };
}

export default async function BookPage({ params }: { params: Promise<{ lang: string; id: string }> }) {
  const { lang, id } = await params;
  const safeLang = lang === 'tp' ? 'tp' : 'en';
  const dict = await getDictionary(safeLang);
  const book = books.find((b) => b.slug === id);

  if (!book) return notFound();

  const localized = getLocalizedBook(dict, book, safeLang);
  const jsonLd = jsonLdForBook(safeLang, book);

  return (
    <>
    <Header lang={safeLang} dict={dict} />
    {safeLang === 'tp' ? <SitelenLayerPluginClient /> : null}
    <main className={styles.page} data-sitelen-layer-scope={safeLang === 'tp' ? '' : undefined}>
      <Script id={`jsonld-book-${book.slug}`} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="container">
        <Link href={`/${safeLang}#${book.slug}`} className={`${styles.backLink} ux-hover-btn ux-focus-ring`}>
          ← {dict?.footer?.back_home ?? 'Back to home'}
        </Link>

        <div className={styles.hero}>
          <div className={`${styles.coverWrap} ux-hover-card`}>
            <Image
              src={book.coverImage}
              alt={localized.title}
              fill
              className={styles.coverImg}
              sizes="(max-width: 900px) 70vw, 420px"
              priority
            />
          </div>

          <div className={styles.content}>
            <h1 className={styles.title}>{localized.title}</h1>
            <p className={styles.author}>{localized.author}</p>
            <p className={styles.shortDesc}>{localized.shortDesc}</p>

            <div className={styles.actions}>
              {book.type === 'gift' ? (
                <>
                  {book.downloadPdfUrl && (
                    <a href={book.downloadPdfUrl} download className="btn btn-accent ux-hover-btn ux-focus-ring">
                      {dict.hero.download_pdf}
                    </a>
                  )}
                  {book.downloadEpubUrl && (
                    <a href={book.downloadEpubUrl} download className="btn ux-hover-btn ux-focus-ring">
                      {dict.hero.download_epub}
                    </a>
                  )}
                  {book.teaserVideoId && (
                    <a
                      href={`https://www.youtube.com/watch?v=${book.teaserVideoId}`}
                      target="_blank"
                      rel="noopener"
                      className="btn ux-hover-btn ux-focus-ring"
                    >
                      {dict.hero.watch_teaser}
                    </a>
                  )}
                </>
              ) : (
                <>
                  {book.amazonKindleUrl && (
                    <a href={book.amazonKindleUrl} target="_blank" rel="noopener" className="btn btn-accent ux-hover-btn ux-focus-ring">
                      {dict.hero.buy_kindle}
                    </a>
                  )}
                  {book.amazonPrintUrl && (
                    <a href={book.amazonPrintUrl} target="_blank" rel="noopener" className="btn ux-hover-btn ux-focus-ring">
                      {dict.hero.buy_print}
                    </a>
                  )}
                  {book.teaserVideoId && (
                    <a
                      href={`https://www.youtube.com/watch?v=${book.teaserVideoId}`}
                      target="_blank"
                      rel="noopener"
                      className="btn ux-hover-btn ux-focus-ring"
                    >
                      {dict.hero.watch_teaser}
                    </a>
                  )}
                </>
              )}
            </div>
          </div>
        </div>

        <div className={styles.longDesc}>
          <h2 className={styles.sectionTitle}>{dict?.collection?.learn_more ?? 'Learn more'}</h2>
          {localized.learnMoreParagraphs.map((paragraph: string, index: number) => (
            <p key={`${book.slug}-${index}`}>{paragraph}</p>
          ))}
        </div>
      </div>
    </main>
    </>
  );
}
