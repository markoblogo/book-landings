
import LanguageSwitch from './LanguageSwitch';
import styles from './Header.module.css';

export default function Header({ lang }: { lang: 'fr' | 'uk' }) {
    const homeHref = `/${lang}`;

    return (
        <header className={styles.header}>
            <div className={`container ${styles.inner}`}>
                {/* Logo removed as requested, leaving empty div for structure or just null */}
                <div className={styles.spacer} />

                <div className={styles.actions}>
                    <a className={styles.faqLink} href={`${homeHref}#faq`}>
                        FAQ
                    </a>
                    <LanguageSwitch currentLang={lang} />
                </div>
            </div>
        </header>
    );
}
