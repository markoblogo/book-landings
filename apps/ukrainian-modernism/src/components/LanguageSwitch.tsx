'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import styles from './LanguageSwitch.module.css';

export default function LanguageSwitch({ currentLang }: { currentLang: 'fr' | 'uk' }) {
    const pathname = usePathname();

    const getNewPath = (lang: 'fr' | 'uk') => {
        if (!pathname) return `/${lang}`;
        const segments = pathname.split('/');
        // segments[0] is empty, segments[1] is current lang
        const newSegments = [...segments];
        newSegments[1] = lang;
        return newSegments.join('/') || '/';
    };

    return (
        <div className={styles.switch} data-locale-switcher>
            <Link
                href={getNewPath('fr')}
                className={`${styles.btn} ${currentLang === 'fr' ? styles.active : ''}`}
            >
                FR
            </Link>
            <span className={styles.sep}>/</span>
            <Link
                href={getNewPath('uk')}
                className={`${styles.btn} ${currentLang === 'uk' ? styles.active : ''}`}
            >
                UK
            </Link>
        </div>
    );
}
