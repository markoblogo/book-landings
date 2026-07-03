'use client';

import { useState } from 'react';
import Image from 'next/image';
import styles from './BookCard.module.css';
import { Book } from '@/data/books';

interface BookCardProps {
    book: Book;
    dict: any;
    lang?: string;
}

export default function BookCard({ book, dict }: BookCardProps) {
    const [isExpanded, setIsExpanded] = useState(false);

    const localized = dict?.books?.[book.id] ?? {};
    const title = localized.title ?? book.id;
    const author = localized.author ?? '';
    const shortDesc = localized.summary ?? '';
    const longDesc = localized.notes ?? '';

    return (
        <div className={`${styles.card} ux-hover-card`} id={book.id}>
            <div className={styles.coverWrapper}>
                <Image
                    src={book.promoImage}
                    alt={title}
                    fill
                    className={styles.coverImg}
                    sizes="(max-width: 768px) 100vw, 30vw"
                />
            </div>

            <div className={styles.content}>
                <div className={styles.text}>
                    <h3 className={styles.title}>{title}</h3>
                    <p className={styles.author}>{author}</p>
                    <p className={styles.hook}>{shortDesc}</p>
                </div>

                <div className={styles.actions}>
                    <div className={styles.amazonGroup}>
                        {book.downloadPdfUrl && (
                            <a href={book.downloadPdfUrl} className={`${styles.buyBtn} ux-hover-btn ux-focus-ring`}>
                                {dict.hero.download_pdf}
                            </a>
                        )}
                    </div>
                    <button
                        className={`${styles.moreBtn} ux-hover-btn ux-focus-ring`}
                        onClick={() => setIsExpanded(!isExpanded)}
                        aria-expanded={isExpanded}
                    >
                        {isExpanded ? '−' : '+'} {dict.collection.learn_more}
                    </button>
                </div>

                <div className={`${styles.accordion} ${isExpanded ? styles.expanded : ''}`}>
                    <div className={styles.longDesc}>
                        <p>{longDesc}</p>
                        {book.teaserVideoId && (
                            <div className={styles.teaserLinkWrapper}>
                                <a
                                    href={`https://www.youtube.com/watch?v=${book.teaserVideoId}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`${styles.teaserLink} ux-hover-btn ux-focus-ring`}
                                >
                                    ▶ {dict.hero.watch_teaser}
                                </a>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
