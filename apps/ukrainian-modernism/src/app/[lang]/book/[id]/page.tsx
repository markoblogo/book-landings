import type { Metadata } from 'next';
import Script from 'next/script';
import { notFound } from 'next/navigation';
import { books } from '@/data/books';
import { getDictionary } from '@/get-dictionary';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { jsonLdForBook, SITE_URL } from '@/lib/jsonld';
import { ukrainianModernismSiteConfig } from '@/site.config';
import { canonicalUrl, openGraphImage } from '@book-landings/landing-seo';
import { getSeoArticle, renderArticleMarkdown } from '@/lib/seo-articles';

export async function generateStaticParams() {
  return books.map((b) => ({ id: b.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; id: string }>;
}): Promise<Metadata> {
  const { lang, id } = await params;
  const safeLang = (lang === 'uk' || lang === 'fr') ? lang : 'fr';
  const book = books.find((b) => b.id === id);

  if (!book) return {};

  const author = book.author[safeLang];
  const title = book.title[safeLang];

  const url = canonicalUrl(ukrainianModernismSiteConfig, `/${safeLang}/book/${id}`);
  const ogImage = openGraphImage(ukrainianModernismSiteConfig, `/og/books/${id}.${safeLang}.png`) ?? `${SITE_URL}${book.promoImage}`;

  const pageTitle =
    safeLang === 'fr'
      ? `${title} — ${author} | Modernisme Ukrainien`
      : `${title} — ${author} | Український модернізм`;

  const metaDescriptions: Record<string, { fr: string; uk: string }> = {
    'khvylovy-sanatorium': {
      fr: 'Un huis clos brûlant de la « Renaissance fusillée »: révolution, morale fissurée, prose fragmentée. Nouvelle traduction française avec préface et notes.',
      uk: 'Психологічний модернізм «Розстріляного відродження»: замкнений простір, тріщини моралі, ламка мова. Французький переклад із передмовою та примітками.',
    },
    'ianovski-maitre-du-navire': {
      fr: 'Un roman-cinéma lumineux: Odessa, mer, amitié, art et utopie créatrice. Modernisme ukrainien enfin en traduction française, avec préface et notes.',
      uk: 'Сонячний «роман-кіно» про Одесу, море, дружбу й мистецтво. Український модернізм французькою: переклад, передмова та примітки.',
    },
    'johansen-leonardo': {
      fr: 'Parodie savante et ironique: un roman qui explose les genres (voyage, reportage, poésie). Première édition française d’un auteur clé de Kharkiv.',
      uk: 'Іронічний модерністський експеримент: подорож, репортаж, поезія в одному тексті. Перше видання французькою, з передмовою та примітками.',
    },
    'pidmohylny-la-ville': {
      fr: 'Un grand roman urbain: un provincial arrive à Kyiv, la ville le façonne. Modernisme ukrainien, finesse psychologique. Nouvelle traduction française.',
      uk: 'Класика урбаністичного роману: герой приїздить до Києва, і місто змінює його. Французький переклад української класики з передмовою та примітками.',
    },
    'kosynka-gift': {
      fr: 'Nouvelle saisissante sur la tragédie paysanne ukrainienne, écrite avec une précision cruelle. Téléchargement gratuit PDF/EPUB + teaser vidéo.',
      uk: 'Сильна новела про трагедію українського села й зламаний час. Безкоштовно: PDF/EPUB + тизер-відео. Ідеально як перший текст для знайомства.',
    },
    'chkouroupiy-jeanne-miss-adrienne': {
      fr: 'Deux récits de Géo Chkouroupiy : la guerre et la révolution de 1917, puis la ville industrielle. Édition française avec préface, 40 notes et bibliographie.',
      uk: 'Два твори Гео Шкурупія про війну, революцію 1917 року та індустріальне місто. Французьке видання з передмовою, 40 примітками й бібліографією.',
    },
  };

  const description = metaDescriptions[id]?.[safeLang] ?? book.shortDescription[safeLang];

  return {
    title: pageTitle,
    description,
    alternates: {
      canonical: url,
      languages: {
        fr: canonicalUrl(ukrainianModernismSiteConfig, `/fr/book/${id}`),
        uk: canonicalUrl(ukrainianModernismSiteConfig, `/uk/book/${id}`),
        'x-default': canonicalUrl(ukrainianModernismSiteConfig, `/fr/book/${id}`),
      },
    },
    openGraph: {
      title: pageTitle,
      description,
      url,
      images: [{ url: ogImage }],
      type: 'book',
    },
    twitter: {
      card: 'summary_large_image',
      title: pageTitle,
      description,
      images: [ogImage],
    },
  };
}

export default async function BookPage({
  params,
}: {
  params: Promise<{ lang: string; id: string }>;
}) {
  const { lang, id } = await params;
  const safeLang = (lang === 'uk' || lang === 'fr') ? lang : 'fr';
  const dict = await getDictionary(safeLang);
  const book = books.find((b) => b.id === id);

  if (!book) notFound();

  const title = book.title[safeLang];
  const author = book.author[safeLang];
  const article = getSeoArticle(id, safeLang);
  const bookUrl = canonicalUrl(ukrainianModernismSiteConfig, `/${safeLang}/book/${id}`);
  const homeLabel = safeLang === 'fr' ? 'Accueil' : 'Головна';
  const graph = {
    '@context': 'https://schema.org',
    '@graph': [
      jsonLdForBook(safeLang, book),
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: homeLabel, item: canonicalUrl(ukrainianModernismSiteConfig, `/${safeLang}`) },
          { '@type': 'ListItem', position: 2, name: title, item: bookUrl },
        ],
      },
    ],
  };

  return (
    <main lang={safeLang} style={{ maxWidth: 980, margin: '0 auto', padding: '32px 20px' }}>
      <Script
        id={`jsonld-book-${book.id}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
      />

      <Header lang={safeLang} />

      <h1 style={{ fontSize: 44, lineHeight: 1.1, marginTop: 40 }}>{title}</h1>
      <p style={{ fontSize: 22, opacity: 0.8, marginTop: 10 }}>{author}</p>

      <p style={{ fontSize: 18, opacity: 0.9, marginTop: 24 }}>{book.longDescription[safeLang]}</p>

      <div style={{ display: 'flex', gap: 12, marginTop: 24, flexWrap: 'wrap' }}>
        {book.type === 'commercial' && book.amazonKindleUrl && (
          <a
            href={book.amazonKindleUrl}
            style={{
              padding: '10px 14px',
              borderRadius: 10,
              background: '#222',
              color: '#fff',
              textDecoration: 'none',
              fontWeight: 600,
            }}
          >
            {dict.hero.buy_kindle}
          </a>
        )}
        {book.type === 'commercial' && book.amazonPrintUrl && (
          <a
            href={book.amazonPrintUrl}
            style={{
              padding: '10px 14px',
              borderRadius: 10,
              background: '#f0f0f0',
              color: '#000',
              textDecoration: 'none',
              fontWeight: 600,
              border: '1px solid rgba(0,0,0,0.12)',
            }}
          >
            {dict.hero.buy_print}
          </a>
        )}
        {book.type === 'gift' && book.downloadPdfUrl && (
          <a
            href={book.downloadPdfUrl}
            style={{
              padding: '10px 14px',
              borderRadius: 10,
              background: '#222',
              color: '#fff',
              textDecoration: 'none',
              fontWeight: 600,
            }}
          >
            {dict.hero.download_pdf}
          </a>
        )}
        {book.type === 'gift' && book.downloadEpubUrl && (
          <a
            href={book.downloadEpubUrl}
            style={{
              padding: '10px 14px',
              borderRadius: 10,
              background: '#f0f0f0',
              color: '#000',
              textDecoration: 'none',
              fontWeight: 600,
              border: '1px solid rgba(0,0,0,0.12)',
            }}
          >
            {dict.hero.download_epub}
          </a>
        )}
      </div>

      {article && (
        <section id="seo-article" lang={safeLang} aria-labelledby="seo-article-title" style={{ marginTop: 56, paddingTop: 32, borderTop: '1px solid rgba(0,0,0,0.16)' }}>
          <h2 id="seo-article-title" style={{ fontSize: 30, lineHeight: 1.2 }}>{article.title}</h2>
          <div>{renderArticleMarkdown(article.content)}</div>
          <p style={{ marginTop: 24 }}>
            <a href={`/${safeLang}/article/${book.id}`}>
              {safeLang === 'fr' ? 'Ouvrir la page de l’article' : 'Відкрити окрему сторінку статті'}
            </a>
          </p>
        </section>
      )}

      <div style={{ marginTop: 48 }}>
        <Footer dict={dict} lang={safeLang} />
      </div>
    </main>
  );
}
