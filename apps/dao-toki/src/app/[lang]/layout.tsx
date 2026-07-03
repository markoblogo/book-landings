import type { Metadata } from 'next';
import { getDictionary } from '@/get-dictionary';
import { daoTokiSiteConfig } from '@/site.config';
import { canonicalUrl, openGraphImage } from '@book-landings/landing-seo';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
    const { lang } = await params;
    const safeLang = (lang === 'tp' || lang === 'en') ? (lang as 'en' | 'tp') : 'en';
    const dict = await getDictionary(safeLang);
    const ogImage = openGraphImage(daoTokiSiteConfig, '/og-image.jpg') ?? canonicalUrl(daoTokiSiteConfig, '/og-image.jpg');
    const twitterImage = openGraphImage(daoTokiSiteConfig, '/twitter-card.jpg') ?? canonicalUrl(daoTokiSiteConfig, '/twitter-card.jpg');

    return {
        metadataBase: new URL(daoTokiSiteConfig.baseUrl),
        title: dict.meta.title,
        description: dict.meta.description,
        alternates: {
            canonical: canonicalUrl(daoTokiSiteConfig, `/${safeLang}`),
            languages: {
                en: canonicalUrl(daoTokiSiteConfig, '/en'),
                ['tok' as any]: canonicalUrl(daoTokiSiteConfig, '/tp'),
            } as any,
        },
        openGraph: {
            title: dict.meta.title,
            description: dict.meta.description,
            url: canonicalUrl(daoTokiSiteConfig, `/${safeLang}`),
            siteName: daoTokiSiteConfig.name,
            locale: 'en_US',
            type: 'website',
            images: [
                {
                    url: ogImage,
                    width: 1200,
                    height: 630,
                    alt: 'Chinese Wisdom in toki pona - toki pona editions',
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
        }
    };
}

export default function LangLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
