import Script from 'next/script';
import { getDictionary } from '@/get-dictionary';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import WhySection from '@/components/WhySection';
import BookList from '@/components/BookList';
import Footer from '@/components/Footer';
import FAQ from '@/components/FAQ';
import styles from './page.module.css';
import { books } from '@/data/books';
import { jsonLdForBook, seriesJsonLd } from '@/lib/jsonld';

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const validLang = (['fr', 'uk'].includes(lang) ? lang : 'fr') as 'fr' | 'uk';
  const dict = await getDictionary(validLang);

  const graph = {
    '@context': 'https://schema.org',
    '@graph': [seriesJsonLd(validLang), ...books.map((b) => jsonLdForBook(validLang, b))],
  };

  const faqItems = (dict?.faq?.items ?? []).map((item: any) => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.a,
    },
  }));

  if (faqItems.length) {
    (graph['@graph'] as any[]).push({
      '@type': 'FAQPage',
      mainEntity: faqItems,
    });
  }

  return (
    <main className={styles.main}>
      <Script
        id="jsonld-series-and-books"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
      />

      <Header lang={validLang} />
      <Hero dict={dict} lang={validLang} />
      <WhySection dict={dict} />
      <BookList dict={dict} />
      <FAQ dict={dict} />
      <Footer dict={dict} lang={validLang} />
    </main>
  );
}
