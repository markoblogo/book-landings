import type { Metadata } from 'next';
import { getDictionary } from '@/get-dictionary';
import Link from 'next/link';
import { canonicalUrl, openGraphImage } from '@book-landings/landing-seo';
import { ukrainianModernismSiteConfig } from '@/site.config';

export async function generateMetadata({ params }: { params: Promise<{ lang: 'fr' | 'uk' }> }): Promise<Metadata> {
    const { lang } = await params;
    const safeLang = lang === 'uk' ? 'uk' : 'fr';
    const dict = await getDictionary(safeLang);
    const url = canonicalUrl(ukrainianModernismSiteConfig, `/${safeLang}/legal`);
    const image = openGraphImage(ukrainianModernismSiteConfig, `/og/og-${safeLang}.jpg`);
    const description = safeLang === 'fr' ? 'Mentions légales du site Modernisme ukrainien.' : 'Юридична інформація сайту «Український модернізм».';
    return {
        title: `${dict.legal.title} | ${safeLang === 'fr' ? 'Modernisme ukrainien' : 'Український модернізм'}`,
        description,
        alternates: { canonical: url, languages: {
            fr: canonicalUrl(ukrainianModernismSiteConfig, '/fr/legal'),
            uk: canonicalUrl(ukrainianModernismSiteConfig, '/uk/legal'),
            'x-default': canonicalUrl(ukrainianModernismSiteConfig, '/fr/legal'),
        } },
        openGraph: { title: dict.legal.title, description, url, type: 'website', ...(image ? { images: [{ url: image }] } : {}) },
        twitter: { card: image ? 'summary_large_image' : 'summary', title: dict.legal.title, description, ...(image ? { images: [image] } : {}) },
    };
}

export default async function LegalPage({ params }: { params: Promise<{ lang: 'fr' | 'uk' }> }) {
    let { lang } = await params;

    // Dev guard for undefined lang
    if (!lang) {
        if (process.env.NODE_ENV !== 'production') {
            console.warn('LegalPage: lang is undefined, falling back to fr');
        }
        lang = 'fr';
    }

    const dict = await getDictionary(lang);
    const backLink = `/${lang}`;

    return (
        <main lang={lang} className="container" style={{ padding: '6rem 1.5rem 4rem', minHeight: '60vh', maxWidth: '800px', margin: '0 auto' }}>
            <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', marginBottom: '2rem' }}>
                {dict.legal.title}
            </h1>

            <div style={{ fontSize: '1rem', lineHeight: '1.6', color: 'var(--color-ink)' }}>
                <p><strong>{dict.legal.editorLabel}</strong><br />
                    {dict.legal.editorValue}</p>

                <p style={{ marginTop: '1.5rem' }}><strong>{dict.legal.contactLabel}</strong><br />
                    <a href="mailto:a.biletskyi@gmail.com" style={{ textDecoration: 'underline' }}>a.biletskyi@gmail.com</a></p>

                <p style={{ marginTop: '1.5rem' }}><strong>{dict.legal.hostingLabel}</strong><br />
                    {dict.legal.hostingValue}</p>

                <p style={{ marginTop: '1.5rem' }}><strong>{dict.legal.ipLabel}</strong><br />
                    {dict.legal.ipValue}</p>

                <p style={{ marginTop: '1.5rem' }}><strong>{dict.legal.liabilityLabel}</strong><br />
                    {dict.legal.liabilityValue}</p>

                <p style={{ marginTop: '1.5rem' }}><strong>{dict.legal.externalLinksLabel}</strong><br />
                    {dict.legal.externalLinksValue}</p>
            </div>

            <div style={{ marginTop: '4rem', borderTop: '1px solid rgba(0,0,0,0.1)', paddingTop: '2rem' }}>
                <Link href={backLink} style={{ textDecoration: 'none', fontWeight: 'bold' }}>
                    {dict.legal.back}
                </Link>
            </div>
        </main>
    );
}
