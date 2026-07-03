import LanguageSwitch from './LanguageSwitch';
import styles from './Header.module.css';

export default function Header({ lang, dict }: { lang: 'en' | 'tp'; dict?: any }) {
  const stoicHref = `/${lang}`;
  const isTp = lang === 'tp';
  const labels = dict?.header?.nav ?? {};
  const brandLabel = isTp ? dict?.header?.brand ?? 'kulupu lipu pi pilin awen' : 'Stoic Wisdom Series';
  const translatorLabel = isTp ? labels.translator ?? 'ilo ante toki' : 'Translator';
  const learnLabel = isTp ? labels.learn ?? 'kama sona' : 'Learn';
  const kitLabel = isTp ? labels.kit ?? 'kulupu lipu' : 'Kit';
  const moreBooksLabel = isTp ? labels.more_books ?? 'lipu sin' : 'More books';
  const faqLabel = isTp ? labels.faq ?? 'sona pi wile sona' : 'FAQ';
  const chineseWisdomLabel = isTp ? labels.chinese_wisdom ?? 'sona pi tenpo pini' : 'Chinese Wisdom';
  const stoicLabel = isTp ? labels.toki_stoic ?? 'sona pi pilin awen' : 'Toki Stoic';

  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.brand}>
          <span className={styles.brandMark}>&gt;</span>
          <a href={stoicHref} className={`${styles.brandTitle} ux-focus-ring`} style={{ textDecoration: 'none' }}>
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
          <a className={`${styles.navLink} ux-hover-btn ux-focus-ring`} href="https://toki-free.abvx.xyz/en">
            {kitLabel}
          </a>
          <a className={`${styles.navLink} ux-hover-btn ux-focus-ring`} href={`${stoicHref}#more-books`}>
            {moreBooksLabel}
          </a>
          <a className={`${styles.navLink} ux-hover-btn ux-focus-ring`} href={`${stoicHref}#faq`}>
            {faqLabel}
          </a>
          <a className={`${styles.navLink} ux-hover-btn ux-focus-ring`} href="https://dao-toki.abvx.xyz/">
            {chineseWisdomLabel}
          </a>
          <a className={`${styles.navLink} ${styles.navLinkActive} ux-hover-btn ux-focus-ring`} href={stoicHref}>
            {stoicLabel}
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
