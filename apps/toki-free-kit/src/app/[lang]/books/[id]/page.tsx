import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { books } from '@/data/books';
import { getDictionary } from '@/get-dictionary';
import styles from './page.module.css';
import { jsonLdForBookLocalized } from '@/lib/jsonld';
import Script from 'next/script';
import { tokiFreeSiteConfig } from '@/site.config';
import { canonicalUrl, openGraphImage } from '@book-landings/landing-seo';
import Header from '@/components/Header';
import SitelenLayerPluginClient from '@/components/SitelenLayerPluginClient';

function getLocalizedBook(dict: any, book: (typeof books)[number]) {
  const localized = dict?.books?.[book.id];
  const paragraphs = dict?.bookPages?.[book.id]?.paragraphs;
  return {
    title: localized?.title || book.id,
    author: localized?.author || 'ABVX',
    shortDesc: localized?.summary || '',
    longDesc: localized?.notes || '',
    paragraphs: Array.isArray(paragraphs) ? paragraphs : [],
  };
}

export async function generateStaticParams() {
  const langs = ['en', 'tp'] as const;
  return langs.flatMap((lang) => books.map((b) => ({ lang, id: b.id })));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string; id: string }> }) {
  const { lang, id } = await params;
  const safeLang = lang === 'tp' ? 'tp' : 'en';
  const dict = await getDictionary(safeLang);
  const book = books.find((b) => b.id === id);
  if (!book) return {};

  const localized = getLocalizedBook(dict, book);
  const title = `${localized.title} - toki pona free kit`;
  const description = localized.shortDesc;
  const imageUrl = openGraphImage(tokiFreeSiteConfig, book.promoImage || book.coverImage) ?? canonicalUrl(tokiFreeSiteConfig, book.promoImage || book.coverImage);

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl(tokiFreeSiteConfig, `/${safeLang}/books/${book.id}`),
      languages: {
        en: canonicalUrl(tokiFreeSiteConfig, `/en/books/${book.id}`),
        ['tok' as any]: canonicalUrl(tokiFreeSiteConfig, `/tp/books/${book.id}`),
      } as any,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl(tokiFreeSiteConfig, `/${safeLang}/books/${book.id}`),
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
  const book = books.find((b) => b.id === id);

  if (!book) return notFound();

  const localized = getLocalizedBook(dict, book);
  const jsonLd = jsonLdForBookLocalized(safeLang, book, {
    title: localized.title,
    author: localized.author,
  });

  return (
    <>
    <Header lang={safeLang} dict={dict} />
    {safeLang === 'tp' ? <SitelenLayerPluginClient /> : null}
    <main className={styles.page} data-sitelen-layer-scope={safeLang === 'tp' ? '' : undefined}>
      <Script id={`jsonld-book-${book.id}`} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="container">
        <Link href={`/${safeLang}#${book.id}`} className={`${styles.backLink} ux-hover-btn ux-focus-ring`}>
          ← {dict?.hero?.back ?? 'Back'}
        </Link>

        <div className={styles.hero}>
          <div className={`${styles.coverWrap} ux-hover-card`}>
            <Image src={book.coverImage} alt={localized.title} fill className={styles.coverImg} sizes="(max-width: 900px) 70vw, 420px" priority />
          </div>

          <div className={styles.content}>
            <h1 className={styles.title}>{localized.title}</h1>
            <p className={styles.author}>{localized.author}</p>
            <p className={styles.shortDesc}>{localized.shortDesc}</p>

            <div className={styles.actions}>
              {book.downloadPdfUrl && (
                <a href={book.downloadPdfUrl} className="btn btn-accent ux-hover-btn ux-focus-ring">
                  {dict.hero.download_pdf}
                </a>
              )}
              {book.teaserVideoId && (
                <a
                  href={`https://www.youtube.com/watch?v=${book.teaserVideoId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn ux-hover-btn ux-focus-ring"
                >
                  {dict.hero.watch_teaser}
                </a>
              )}
            </div>
          </div>
        </div>

        <div className={styles.longDesc}>
          {localized.paragraphs.length > 0 ? (
            localized.paragraphs.map((paragraph: string, index: number) => <p key={index}>{paragraph}</p>)
          ) : (
            <p>{localized.longDesc}</p>
          )}
        </div>
      </div>
    </main>
    </>
  );
}
