import LanguageSwitch from './LanguageSwitch';
import styles from './Header.module.css';

export default function Header({ lang, dict }: { lang: 'en' | 'tp'; dict?: any }) {
  const homeHref = `/${lang}`;
  const isTp = lang === 'tp';
  const labels = dict?.header?.nav ?? {};
  const brandLabel = isTp ? dict?.header?.brand ?? 'sona pi lipu pi tenpo pini' : 'Chinese Wisdom in toki pona';
  const translatorLabel = isTp ? labels.translator ?? 'ilo ante toki' : 'Translator';
  const learnLabel = isTp ? labels.learn ?? 'kama sona' : 'Learn';
  const kitLabel = isTp ? labels.kit ?? 'kulupu lipu' : 'Kit';
  const moreBooksLabel = isTp ? labels.more_books ?? 'lipu sin' : 'More books';
  const faqLabel = isTp ? labels.faq ?? 'sona pi wile sona' : 'FAQ';
  const stoicLabel = isTp ? labels.toki_stoic ?? 'sona pi pilin awen' : 'Toki Stoic';
  const seriesLabel = isTp ? labels.chinese_wisdom ?? 'sona pi tenpo pini' : 'Chinese Wisdom';

  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.brand}>
          <span className={styles.brandMark}>&gt;</span>
          <a href={homeHref} className={`${styles.brandTitle} ux-focus-ring`} style={{ textDecoration: 'none' }}>
            {brandLabel}
          </a>
        </div>

        <nav className={styles.nav} aria-label="Site navigation">
          <a className={`${styles.navLink} ux-hover-btn ux-focus-ring`} href="https://toki.abvx.xyz/">
            {translatorLabel}
          </a>
          <a className={`${styles.navLink} ux-hover-btn ux-focus-ring`} href="https://toki.abvx.xyz/learn">
            {learnLabel}
          </a>
          <a className={`${styles.navLink} ux-hover-btn ux-focus-ring`} href="https://toki-free.abvx.xyz/">
            {kitLabel}
          </a>
          <a className={`${styles.navLink} ux-hover-btn ux-focus-ring`} href={`${homeHref}#more-books`}>
            {moreBooksLabel}
          </a>
          <a className={`${styles.navLink} ux-hover-btn ux-focus-ring`} href={`${homeHref}#faq`}>
            {faqLabel}
          </a>
          <a className={`${styles.navLink} ux-hover-btn ux-focus-ring`} href="https://stoic.abvx.xyz/" target="_blank" rel="noopener noreferrer">
            {stoicLabel}
          </a>
          <a className={`${styles.navLink} ${styles.navLinkActive} ux-hover-btn ux-focus-ring`} href={homeHref}>
            {seriesLabel}
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
