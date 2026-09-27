import type { Metadata } from 'next';
import { getDictionary } from '@/get-dictionary';
import Link from 'next/link';
import { canonicalUrl, openGraphImage } from '@book-landings/landing-seo';
import { ukrainianModernismSiteConfig } from '@/site.config';

export async function generateMetadata({ params }: { params: Promise<{ lang: 'fr' | 'uk' }> }): Promise<Metadata> {
    const { lang } = await params;
    const safeLang = lang === 'uk' ? 'uk' : 'fr';
    const dict = await getDictionary(safeLang);
    const url = canonicalUrl(ukrainianModernismSiteConfig, `/${safeLang}/privacy`);
    const image = openGraphImage(ukrainianModernismSiteConfig, `/og/og-${safeLang}.jpg`);
    const description = safeLang === 'fr' ? 'Politique de confidentialité du site Modernisme ukrainien.' : 'Політика конфіденційності сайту «Український модернізм».';
    return {
        title: `${dict.privacy.title} | ${safeLang === 'fr' ? 'Modernisme ukrainien' : 'Український модернізм'}`,
        description,
        alternates: { canonical: url, languages: {
            fr: canonicalUrl(ukrainianModernismSiteConfig, '/fr/privacy'),
            uk: canonicalUrl(ukrainianModernismSiteConfig, '/uk/privacy'),
            'x-default': canonicalUrl(ukrainianModernismSiteConfig, '/fr/privacy'),
        } },
        openGraph: { title: dict.privacy.title, description, url, type: 'website', ...(image ? { images: [{ url: image }] } : {}) },
        twitter: { card: image ? 'summary_large_image' : 'summary', title: dict.privacy.title, description, ...(image ? { images: [image] } : {}) },
    };
}

export default async function PrivacyPage({ params }: { params: Promise<{ lang: 'fr' | 'uk' }> }) {
    let { lang } = await params;

    // Dev guard for undefined lang
    if (!lang) {
        if (process.env.NODE_ENV !== 'production') {
            console.warn('PrivacyPage: lang is undefined, falling back to fr');
        }
        lang = 'fr';
    }

    const dict = await getDictionary(lang);
    const backLink = `/${lang}`;

    return (
        <main lang={lang} className="container" style={{ padding: '6rem 1.5rem 4rem', minHeight: '60vh', maxWidth: '800px', margin: '0 auto' }}>
            <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', marginBottom: '2rem' }}>
                {dict.privacy.title}
            </h1>

            <div style={{ fontSize: '1rem', lineHeight: '1.6', color: 'var(--color-ink)' }}>
                <p><strong>{dict.privacy.dataLabel}</strong><br />
                    {dict.privacy.dataValue}</p>

                <p style={{ marginTop: '1.5rem' }}><strong>{dict.privacy.cookiesLabel}</strong><br />
                    {dict.privacy.cookiesValue}</p>

                <p style={{ marginTop: '1.5rem' }}><strong>{dict.privacy.thirdPartyLabel}</strong><br />
                    {dict.privacy.thirdPartyValue}</p>

                <p style={{ marginTop: '1.5rem' }}><strong>{dict.privacy.rightsLabel}</strong><br />
                    {dict.privacy.rightsValue}</p>

                <p style={{ marginTop: '1.5rem' }}><strong>{dict.privacy.contactLabel}</strong><br />
                    {dict.privacy.contactValue}</p>
            </div>

            <div style={{ marginTop: '4rem', borderTop: '1px solid rgba(0,0,0,0.1)', paddingTop: '2rem' }}>
                <Link href={backLink} style={{ textDecoration: 'none', fontWeight: 'bold' }}>
                    {dict.privacy.back}
                </Link>
            </div>
        </main>
    );
}
