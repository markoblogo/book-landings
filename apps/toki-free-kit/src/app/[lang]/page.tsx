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
import { orgJsonLd, seriesJsonLd, websiteJsonLd, jsonLdForBookLocalized } from '@/lib/jsonld';
import SitelenLayerPluginClient from '@/components/SitelenLayerPluginClient';

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const validLang = (['en', 'tp'].includes(lang) ? lang : 'en') as 'en' | 'tp';
  const dict = await getDictionary(validLang);

  const graph = {
    '@context': 'https://schema.org',
    '@graph': [
      orgJsonLd(),
      websiteJsonLd(validLang),
      seriesJsonLd(validLang),
      ...books.map((b) =>
        jsonLdForBookLocalized(validLang, b, {
          title: (dict?.books as Record<string, any> | undefined)?.[b.id]?.title ?? b.id,
          author: (dict?.books as Record<string, any> | undefined)?.[b.id]?.author ?? 'ABVX',
        }),
      ),
    ],
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
    <main className={styles.main} data-sitelen-layer-scope={validLang === 'tp' ? '' : undefined}>
      <Script id="jsonld-toki-free" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }} />
      <SitelenLayerPluginClient />

      <Header lang={validLang} dict={dict} />
      <div id={validLang === 'tp' ? 'tp-content-scope' : undefined}>
        <Hero dict={dict} lang={validLang} />
        <WhySection dict={dict} />
        <BookList dict={dict} />
        <FAQ dict={dict} />
        <Footer dict={dict} lang={validLang} />
      </div>
    </main>
  );
}
