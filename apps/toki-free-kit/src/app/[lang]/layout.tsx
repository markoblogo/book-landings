import type { Metadata } from 'next';
import { getDictionary } from '@/get-dictionary';
import { tokiFreeSiteConfig } from '@/site.config';
import { canonicalUrl, openGraphImage } from '@book-landings/landing-seo';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const safeLang = (lang === 'tp' || lang === 'en') ? (lang as 'en' | 'tp') : 'en';
  const dict = await getDictionary(safeLang);
  const ogImage = openGraphImage(tokiFreeSiteConfig, '/og-image.jpg') ?? canonicalUrl(tokiFreeSiteConfig, '/og-image.jpg');
  const twitterImage = openGraphImage(tokiFreeSiteConfig, '/twitter-card.jpg') ?? canonicalUrl(tokiFreeSiteConfig, '/twitter-card.jpg');

  return {
    title: dict.meta.title,
    description: dict.meta.description,
    alternates: {
      canonical: canonicalUrl(tokiFreeSiteConfig, `/${safeLang}`),
      languages: {
        en: canonicalUrl(tokiFreeSiteConfig, '/en'),
        ['tok' as any]: canonicalUrl(tokiFreeSiteConfig, '/tp'),
      } as any,
    },
    openGraph: {
      title: dict.meta.title,
      description: dict.meta.description,
      url: canonicalUrl(tokiFreeSiteConfig, `/${safeLang}`),
      siteName: tokiFreeSiteConfig.name,
      locale: 'en_US',
      type: 'website',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: 'toki pona free kit',
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

export default function LangLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
