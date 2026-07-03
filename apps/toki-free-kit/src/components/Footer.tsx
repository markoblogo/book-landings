import Link from 'next/link';
import styles from './Footer.module.css';

type BannerVariant = 'translator' | 'learn' | 'kit' | 'ukr';

type BannerProps = {
  href: string;
  title: string;
  subtitle: string;
  variant: BannerVariant;
  iconText?: string;
  thumbSrc?: string;
};

function Banner({ href, title, subtitle, variant, iconText = '>', thumbSrc }: BannerProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${styles.bannerCard} ${styles[`banner_${variant}`]} ux-hover-card ux-focus-ring`}
    >
      <div className={styles.bannerInner}>
        {thumbSrc ? (
          <img src={thumbSrc} alt="" className={styles.bannerThumb} loading="lazy" />
        ) : (
          <span className={styles.bannerIcon}>{iconText}</span>
        )}

        <div className={styles.bannerText}>
          <div className={styles.bannerTitle}>{title}</div>
          <div className={styles.bannerSubtitle}>{subtitle}</div>
        </div>
      </div>
    </a>
  );
}

export default function Footer({ dict, lang }: { dict: any; lang: 'en' | 'tp' }) {
  const socialMedium = 'https://abvcreative.medium.com/';
  const socialSubstack = 'https://abvx.substack.com/';
  const socialGitHub = 'https://github.com/markoblogo';
  const projectUrl = 'https://abvx.xyz/';
  const mailto = 'mailto:a.biletskyi@gmail.com?subject=toki%20pona%20free%20kit';
  const emailDisplay = 'a.biletskyi@gmail.com';
  const socialLabels =
    lang === 'tp'
      ? {
          medium: 'lipu toki',
          substack: 'lipu pana',
          github: 'lipu ilo'
        }
      : {
          medium: 'Medium',
          substack: 'Substack',
          github: 'GitHub'
        };

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.container}`}>
        <div className={styles.grid}>
          <div className={styles.leftCol}>
            <div className={styles.contactRow}>
              <h4 className={styles.contactLabel}>{dict?.contact?.text ?? 'Contact'}</h4>
              <a href={mailto} data-sitelen-layer-ignore className={`${styles.mailLink} ux-hover-btn ux-focus-ring`}>{emailDisplay}</a>

              <div className={styles.socials}>
                <a
                  href={socialMedium}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Medium"
                  className={`${styles.socialLink} ux-hover-btn ux-focus-ring`}
                >
                  {socialLabels.medium}
                </a>
                <a
                  href={socialSubstack}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Substack"
                  className={`${styles.socialLink} ux-hover-btn ux-focus-ring`}
                >
                  {socialLabels.substack}
                </a>
                <a
                  href={socialGitHub}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className={`${styles.socialLink} ux-hover-btn ux-focus-ring`}
                >
                  {socialLabels.github}
                </a>
              </div>
            </div>

            <div className={styles.legalRow}>
              <a href={projectUrl} data-sitelen-layer-ignore target="_blank" rel="noopener noreferrer" className={`${styles.copyright} ux-hover-btn ux-focus-ring`}>
                © 2026 ABVX.xyz
              </a>
              <div className={styles.legalLinks}>
                <Link href={`/${lang}/legal`} className={`${styles.legalLink} ux-hover-btn ux-focus-ring`}>
                  {dict?.footer?.legal_mentions ?? 'Legal'}
                </Link>
                <Link href={`/${lang}/privacy`} className={`${styles.legalLink} ux-hover-btn ux-focus-ring`}>
                  {dict?.footer?.privacy_policy ?? 'Privacy'}
                </Link>
              </div>
            </div>
          </div>

          <div className={styles.rightCol}>
            <div className={styles.banners}>
              <Banner
                variant="translator"
                href="https://toki.abvx.xyz/"
                title={dict?.footer?.banners?.translator?.title ?? 'Toki Pona Translator'}
                subtitle={dict?.footer?.banners?.translator?.subtitle ?? 'Translate into toki pona.'}
              />
              <Banner
                variant="learn"
                href="https://dao-toki.abvx.xyz/"
                title={dict?.footer?.banners?.learn?.title ?? 'Chinese Wisdom in toki pona'}
                subtitle={dict?.footer?.banners?.learn?.subtitle ?? 'Bilingual series landing for Chinese classics in toki pona.'}
                iconText=">"
              />
              <Banner
                variant="kit"
                href="https://stoic.abvx.xyz/"
                title={dict?.footer?.banners?.stoic?.title ?? 'Stoic Wisdom in Toki Pona'}
                subtitle={dict?.footer?.banners?.stoic?.subtitle ?? 'Main stoic landing.'}
                iconText=">"
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
