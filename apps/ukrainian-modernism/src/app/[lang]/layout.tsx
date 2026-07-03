import type { Metadata } from 'next';
import Script from 'next/script';
import { getDictionary } from '@/get-dictionary';
import { orgJsonLd, websiteJsonLd } from '@/lib/jsonld';
import { ukrainianModernismSiteConfig } from '@/site.config';
import { canonicalUrl, openGraphImage } from '@book-landings/landing-seo';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const safeLang = (lang === 'uk' || lang === 'fr') ? lang : 'fr';
  const dict = await getDictionary(safeLang);

  const ogImage = openGraphImage(ukrainianModernismSiteConfig, `/og/og-${safeLang}.jpg`) ?? canonicalUrl(ukrainianModernismSiteConfig, `/og/og-${safeLang}.jpg`);
  const twitterImage = openGraphImage(ukrainianModernismSiteConfig, '/og/og-x.jpg') ?? canonicalUrl(ukrainianModernismSiteConfig, '/og/og-x.jpg');

  return {
    title: dict.meta.title,
    description: dict.meta.description,
    alternates: {
      canonical: canonicalUrl(ukrainianModernismSiteConfig, `/${safeLang}`),
      languages: {
        fr: canonicalUrl(ukrainianModernismSiteConfig, '/fr'),
        uk: canonicalUrl(ukrainianModernismSiteConfig, '/uk'),
      },
    },
    openGraph: {
      title: dict.meta.title,
      description: dict.meta.description,
      url: canonicalUrl(ukrainianModernismSiteConfig, `/${safeLang}`),
      siteName: ukrainianModernismSiteConfig.name,
      locale: safeLang === 'uk' ? 'uk_UA' : 'fr_FR',
      type: 'website',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt:
            safeLang === 'uk'
              ? 'Український модернізм — французькі переклади'
              : 'Modernisme ukrainien — traductions françaises',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: dict.meta.title,
      description: dict.meta.description,
      images: [twitterImage],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const safeLang = (lang === 'uk' || lang === 'fr') ? lang : 'fr';

  return (
    <>
      <Script
        id="jsonld-org"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd()) }}
      />
      <Script
        id="jsonld-website"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd(safeLang)) }}
      />
      {children}
    </>
  );
}
