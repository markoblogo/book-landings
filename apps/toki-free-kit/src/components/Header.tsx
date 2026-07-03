import LanguageSwitch from './LanguageSwitch';
import styles from './Header.module.css';

export default function Header({ lang, dict }: { lang: 'en' | 'tp'; dict?: any }) {
  const pageHref = `/${lang}`;

  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.brand}>
          <span className={styles.brandMark}>&gt;</span>
          <a href={pageHref} className={`${styles.brandTitle} ux-focus-ring`} style={{ textDecoration: 'none' }}>
            {dict?.header?.brand ?? 'toki pona free kit'}
          </a>
        </div>

        <nav className={styles.nav} aria-label="Site navigation">
          <a className={`${styles.navLink} ux-hover-btn ux-focus-ring`} href="https://toki.abvx.xyz/" target="_blank" rel="noopener noreferrer">
            {dict?.header?.nav?.translator ?? 'Translator'}
          </a>
          <a className={`${styles.navLink} ux-hover-btn ux-focus-ring`} href="https://toki.abvx.xyz/learn" target="_blank" rel="noopener noreferrer">
            {dict?.header?.nav?.learn ?? 'Learn'}
          </a>
          <a className={`${styles.navLink} ux-hover-btn ux-focus-ring`} href="https://dao-toki.abvx.xyz/" target="_blank" rel="noopener noreferrer">
            {dict?.header?.nav?.chinese_wisdom ?? 'Chinese Wisdom'}
          </a>
          <a className={`${styles.navLink} ux-hover-btn ux-focus-ring`} href="https://stoic.abvx.xyz/" target="_blank" rel="noopener noreferrer">
            {dict?.header?.nav?.toki_stoic ?? 'Toki Stoic'}
          </a>
          <a className={`${styles.navLink} ${styles.navLinkActive} ux-hover-btn ux-focus-ring`} href={`${pageHref}#faq`}>
            {dict?.header?.nav?.faq ?? 'FAQ'}
          </a>
        </nav>

        <div className={styles.actions}>
          {lang === 'tp' ? <div id="sitelen-layer-toggle-mount" className={styles.sitelenToggleMount} /> : null}
          <LanguageSwitch currentLang={lang} />
        </div>
      </div>
    </header>
  );
}
