import type { Metadata } from 'next';
import { getDictionary } from '@/get-dictionary';
import { stoicSiteConfig } from '@/site.config';
import { canonicalUrl, openGraphImage } from '@book-landings/landing-seo';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
    const { lang } = await params;
    const safeLang = (lang === 'tp' || lang === 'en') ? (lang as 'en' | 'tp') : 'en';
    const dict = await getDictionary(safeLang);
    const ogImage = openGraphImage(stoicSiteConfig, '/og-image.jpg') ?? canonicalUrl(stoicSiteConfig, '/og-image.jpg');
    const twitterImage = openGraphImage(stoicSiteConfig, '/twitter-card.jpg') ?? canonicalUrl(stoicSiteConfig, '/twitter-card.jpg');

    return {
        title: dict.meta.title,
        description: dict.meta.description,
        alternates: {
            canonical: canonicalUrl(stoicSiteConfig, `/${safeLang}`),
            languages: {
                en: canonicalUrl(stoicSiteConfig, '/en'),
                ['tok' as any]: canonicalUrl(stoicSiteConfig, '/tp'),
            } as any,
        },
        openGraph: {
            title: dict.meta.title,
            description: dict.meta.description,
            url: canonicalUrl(stoicSiteConfig, `/${safeLang}`),
            siteName: stoicSiteConfig.name,
            locale: 'en_US',
            type: 'website',
            images: [
                {
                    url: ogImage,
                    width: 1200,
                    height: 630,
                    alt: 'Stoic Wisdom Series - toki pona editions',
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
