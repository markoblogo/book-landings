'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Book } from '@/data/books';
import styles from './BookSection.module.css';
import GiftBadge from './GiftBadge';

interface BookSectionProps {
    book: Book;
    dict: any;
    isLast: boolean;
}

export default function BookSection({ book, dict, isLast }: BookSectionProps) {
    const [isLightboxOpen, setIsLightboxOpen] = useState(false);

    // Select correct localized strings from Dictionary first, fall back to book data
    const lang = dict.lang || 'fr';

    // Look up localized content by book ID in the dictionary
    const localizedBook = dict.collection[book.id];

    const title = localizedBook?.title || book.title[lang as keyof typeof book.title] || book.title.fr;
    const author = localizedBook?.author || book.author[lang as keyof typeof book.author] || book.author.fr;
    const shortDesc = localizedBook?.shortDesc || book.shortDescription[lang as keyof typeof book.shortDescription] || book.shortDescription.fr;
    const longDesc = localizedBook?.longDesc || book.longDescription[lang as keyof typeof book.longDescription] || book.longDescription.fr;

    const isGift = book.type === 'gift';

    return (
        <section id={book.id} className={`${styles.section} ${isLast ? styles.lastSection : ''}`}>
            <div className={`container ${styles.container}`}>

                {/* Left: Promo Image */}
                <div className={styles.imageCol}>
                    <div
                        className={styles.imageWrapper}
                        onClick={() => setIsLightboxOpen(true)}
                        role="button"
                        aria-label="Zoom promo image"
                    >
                        <Image
                            src={book.promoImage}
                            alt={`Promo for ${title}`}
                            fill
                            className={styles.promoImg}
                            sizes="(max-width: 768px) 100vw, 50vw"
                        />
                        <div className={styles.zoomHint}>🔍</div>
                    </div>
                </div>

                {/* Right: Content */}
                <div className={styles.contentCol}>
                    <header className={styles.header}>
                        {isGift && <GiftBadge label="FREE" className={styles.sectionBadge} />}
                        <h2 className={styles.title}>
                            <a
                                href={isGift ? `/${lang}/gift` : `/${lang}/book/${book.id}`}
                                style={{ color: 'inherit', textDecoration: 'none' }}
                            >
                                {title}
                            </a>
                        </h2>
                        <p className={styles.author}>{author}</p>
                    </header>

                    <div className={styles.desc}>
                        {/* Render full text immediately */}
                        <p>{shortDesc}</p>
                        <p className={styles.longDesc}>{longDesc}</p>
                    </div>

                    <div className={styles.actions}>
                        {isGift ? (
                            <div className={styles.giftActions}>
                                <a href={book.downloadPdfUrl} download className="btn btn-accent">
                                    {dict.hero.download_pdf}
                                </a>
                                <a href={book.downloadEpubUrl} download className="btn">
                                    {dict.hero.download_epub}
                                </a>
                            </div>
                        ) : (
                            <div className={styles.commercialActions}>
                                <a href={book.amazonKindleUrl} target="_blank" rel="noopener" className="btn btn-accent">
                                    {dict.hero.buy_kindle}
                                </a>
                                <a href={book.amazonPrintUrl} target="_blank" rel="noopener" className="btn">
                                    {dict.hero.buy_print}
                                </a>
                            </div>
                        )}

                        {book.teaserVideoId && (
                            <a
                                href={`https://www.youtube.com/watch?v=${book.teaserVideoId}`}
                                target="_blank"
                                rel="noopener"
                                className={styles.teaserLink}
                            >
                                ▶ {dict.hero.watch_teaser}
                            </a>
                        )}
                    </div>
                </div>
            </div>

            {/* Lightbox Overlay */}
            {isLightboxOpen && (
                <div className={styles.lightbox} onClick={() => setIsLightboxOpen(false)}>
                    <div className={styles.lightboxContent}>
                        <Image
                            src={book.promoImage}
                            alt={title}
                            width={1200}
                            height={800}
                            className={styles.lightboxImg}
                            priority
                        />
                        <button className={styles.closeBtn} aria-label="Close">×</button>
                    </div>
                </div>
            )}
        </section>
    );
}
