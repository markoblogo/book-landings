'use client';

import Image from 'next/image';
import Link from 'next/link';
import styles from './Footer.module.css';

const arkushiLogo = '/assets/partners/arkushi/logo.png';
const appStoreBadge = '/assets/partners/arkushi/app-store-badge.svg';
const googlePlayBadge = '/assets/partners/arkushi/google-play-badge.svg';

export default function Footer({ dict, lang }: { dict: any, lang: 'fr' | 'uk' }) {

    // Links
    const socialMedium = "https://abvcreative.medium.com/";
    const socialSubstack = "https://abvx.substack.com/";
    const mailto = "mailto:a.biletskyi@gmail.com?subject=UKRMOD";
    const emailDisplay = "a.biletskyi@gmail.com";

    return (
        <footer className={styles.footer}>
            <div className={`container ${styles.container}`}>

                {/* Main Content: 2-Column Grid */}
                <div className={styles.grid}>

                    {/* LEFT COLUMN: Contact / Socials / Legal */}
                    <div className={styles.leftCol}>

                        {/* Contact & Socials */}
                        <div className={styles.contactRow}>
                            <h4 className={styles.contactLabel}>{dict.contact.text}</h4>
                            <a href={mailto} className={styles.mailLink}>{emailDisplay}</a>

                            <div className={styles.socials}>
                                <a href={socialMedium} target="_blank" rel="noopener noreferrer" className={styles.socialLink}>Medium</a>
                                <a href={socialSubstack} target="_blank" rel="noopener noreferrer" className={styles.socialLink}>Substack</a>
                            </div>
                        </div>

                        {/* Copyright & Legal Links */}
                        <div className={styles.legalRow}>
                            <a href="https://abvx.xyz" target="_blank" rel="noopener noreferrer" className={styles.copyright}>
                                {dict.footer.copyright}
                            </a>
                            <div className={styles.legalLinks}>
                                <Link href={`/${lang}/legal`} className={styles.legalLink}>{dict.footer.legal_mentions}</Link>
                                <Link href={`/${lang}/privacy`} className={styles.legalLink}>{dict.footer.privacy_policy}</Link>
                            </div>
                        </div>

                    </div>

                    {/* MIDDLE COLUMN: Stoic Wisdom Series */}
                    <div className={styles.middleCol}>
                        <a
                            href="https://stoic.abvx.xyz"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.stoicBanner}
                        >
                            <div className={styles.stoicBannerTitle}>Stoic Wisdom Series</div>
                            <div className={styles.stoicBannerSubtitle}>
                                Stoic classics reimagined in toki pona (EN / TP).
                            </div>
                        </a>
                    </div>

                    {/* RIGHT COLUMN: Arkushi */}
                    <div className={styles.rightCol}>
                        <div className={styles.arkushiBlock}>
                            <a href="https://arkushi.com/" target="_blank" rel="noopener noreferrer" className={styles.arkushiLogoLink}>
                                <Image src={arkushiLogo} alt="Arkushi" width={48} height={48} className={styles.arkushiLogo} unoptimized />
                                <div className={styles.arkushiText}>
                                    <span className={styles.arkushiTitle}>Arkushi</span>
                                    <span className={styles.arkushiSubtitle}>{dict.partners.arkushi.desc}</span>
                                </div>
                            </a>
                            <div className={styles.badges}>
                                <a href="https://apps.apple.com/ru/app/%D0%B0%D1%80%D0%BA%D1%83%D1%88%D1%96-%D1%83%D0%BA%D1%80%D0%B0%D1%97%D0%BD%D1%81%D1%8C%D0%BA%D0%B0-%D0%BF%D0%BE%D0%B5%D0%B7%D1%96%D1%8F/id1500310604" target="_blank" rel="noopener noreferrer">
                                    <img src={appStoreBadge} alt="App Store" className={styles.badgeImg} />
                                </a>
                                <a href="https://play.google.com/store/apps/details?id=com.arkushi.poetryapp&hl=en" target="_blank" rel="noopener noreferrer">
                                    <img src={googlePlayBadge} alt="Google Play" className={styles.badgeImg} />
                                </a>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </footer>
    );
}
