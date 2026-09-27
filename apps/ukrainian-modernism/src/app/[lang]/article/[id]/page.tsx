import type { Metadata } from 'next';
import Script from 'next/script';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getDictionary } from '@/get-dictionary';
import { books } from '@/data/books';
import { articleDescription, articleUrl, getArticleRouteParams, getSeoArticle, renderArticleMarkdown } from '@/lib/seo-articles';
import { canonicalUrl } from '@book-landings/landing-seo';
import { ukrainianModernismSiteConfig } from '@/site.config';

export function generateStaticParams() {
  return getArticleRouteParams();
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string; id: string }> }): Promise<Metadata> {
  const { lang, id } = await params;
  const locale = (lang === 'uk' ? 'uk' : 'fr') as 'fr' | 'uk';
  const article = getSeoArticle(id, locale);
  if (!article) return {};
  const url = articleUrl(id, locale);
  const title = article.title;
  const description = articleDescription(article);
  const image = `${ukrainianModernismSiteConfig.baseUrl}${books.find((book) => book.id === id)?.promoImage ?? ''}`;

  return {
    title: `${title} | ${locale === 'fr' ? 'Modernisme ukrainien' : 'Український модернізм'}`,
    description,
    alternates: {
      canonical: url,
      languages: {
        fr: canonicalUrl(ukrainianModernismSiteConfig, `/fr/article/${id}`),
        uk: canonicalUrl(ukrainianModernismSiteConfig, `/uk/article/${id}`),
        'x-default': canonicalUrl(ukrainianModernismSiteConfig, `/fr/article/${id}`),
      },
    },
    openGraph: {
      title,
      description,
      url,
      siteName: ukrainianModernismSiteConfig.name,
      locale: locale === 'uk' ? 'uk_UA' : 'fr_FR',
      type: 'article',
      images: [{ url: image }],
    },
    twitter: { card: 'summary_large_image', title, description, images: [image] },
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ lang: string; id: string }> }) {
  const { lang, id } = await params;
  const locale = (lang === 'uk' ? 'uk' : 'fr') as 'fr' | 'uk';
  const article = getSeoArticle(id, locale);
  const book = books.find((item) => item.id === id);
  if (!article || !book) notFound();
  const dict = await getDictionary(locale);
  const url = articleUrl(id, locale);
  const alternate = articleUrl(id, locale === 'fr' ? 'uk' : 'fr');
  const title = article.title;
  const description = articleDescription(article);
  const graph = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        '@id': `${url}#article`,
        headline: title,
        description,
        inLanguage: locale,
        mainEntityOfPage: url,
        about: { '@type': 'Book', name: book.title[locale], url: `${ukrainianModernismSiteConfig.baseUrl}/${locale}/book/${id}` },
        author: { '@type': 'Organization', name: 'ABVX', url: 'https://abvx.xyz' },
        publisher: { '@type': 'Organization', name: 'ABVX', url: 'https://abvx.xyz' },
        isPartOf: { '@type': 'WebSite', name: locale === 'fr' ? 'Modernisme ukrainien' : 'Український модернізм', url: `${ukrainianModernismSiteConfig.baseUrl}/${locale}` },
        translationOfWork: { '@type': 'Article', url: alternate },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: locale === 'fr' ? 'Accueil' : 'Головна', item: `${ukrainianModernismSiteConfig.baseUrl}/${locale}` },
          { '@type': 'ListItem', position: 2, name: book.title[locale], item: `${ukrainianModernismSiteConfig.baseUrl}/${locale}/book/${id}` },
          { '@type': 'ListItem', position: 3, name: title, item: url },
        ],
      },
    ],
  };

  return (
    <main lang={locale} style={{ maxWidth: 860, margin: '0 auto', padding: '32px 20px' }}>
      <Script id={`jsonld-article-${id}`} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }} />
      <Header lang={locale} />
      <nav aria-label={locale === 'fr' ? 'Fil d’Ariane' : 'Навігаційний ланцюжок'} style={{ marginTop: 32 }}>
        <a href={`/${locale}`}>{locale === 'fr' ? 'Accueil' : 'Головна'}</a> / <a href={`/${locale}/book/${id}`}>{book.title[locale]}</a>
      </nav>
      <article>
        <header style={{ margin: '28px 0 24px' }}>
          <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', lineHeight: 1.12 }}>{title}</h1>
          <p>{locale === 'fr' ? `À propos de ${book.title.fr}, par ${book.author.fr}` : `Про книжку «${book.title.uk}», автор: ${book.author.uk}`}</p>
        </header>
        <div className="seo-article-content">{renderArticleMarkdown(article.content)}</div>
      </article>
      <aside aria-labelledby="related-book-title" style={{ marginTop: 40, padding: 24, border: '1px solid #ddd', borderRadius: 12 }}>
        <h2 id="related-book-title">{locale === 'fr' ? 'Le livre' : 'Книжка'}</h2>
        <p><a href={`/${locale}/book/${id}`}>{book.title[locale]} — {book.author[locale]}</a></p>
        {book.type === 'commercial' && book.amazonKindleUrl && <p><a href={book.amazonKindleUrl} rel="noopener">{dict.hero.buy_kindle}</a></p>}
        {book.type === 'commercial' && book.amazonPrintUrl && <p><a href={book.amazonPrintUrl} rel="noopener">{dict.hero.buy_print}</a></p>}
      </aside>
      <Footer dict={dict} lang={locale} />
    </main>
  );
}
