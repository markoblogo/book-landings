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
  const lang = dict.lang || 'en';
  const localizedBook = dict.books?.[book.id];
  const title = localizedBook?.title ?? book.id;
  const shortDesc = localizedBook?.summary ?? '';
  const longDesc = localizedBook?.notes ?? '';
  const promoAlt = localizedBook?.promoAlt ?? `Promo for ${title}`;
  const badgeLabel = lang === 'tp' ? dict.hero.all_free_badge : 'FREE';

  return (
    <section id={book.id} className={`${styles.section} ${isLast ? styles.lastSection : ''}`}>
      <div className={`container ${styles.container}`}>
        <div className={styles.imageCol}>
          <div
            className={`${styles.imageWrapper} ux-hover-card ux-focus-ring`}
            onClick={() => setIsLightboxOpen(true)}
            role="button"
            aria-label="Zoom promo image"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setIsLightboxOpen(true);
              }
            }}
          >
            <GiftBadge label={badgeLabel} className={styles.sectionBadge} />
            <Image src={book.promoImage} alt={promoAlt} fill className={styles.promoImg} sizes="(max-width: 768px) 100vw, 50vw" />
            <div className={styles.zoomHint}>🔍</div>
          </div>
        </div>

        <div className={styles.contentCol}>
          <header className={styles.header}>
            <h2 className={styles.title}>{title}</h2>
          </header>

          <div className={styles.desc}>
            <p>{shortDesc}</p>
            <p className={styles.longDesc}>{longDesc}</p>
          </div>

          <div className={styles.actions}>
            <div className={styles.giftActions}>
              {book.downloadPdfUrl && (
                <a href={book.downloadPdfUrl} className="btn btn-accent ux-hover-btn ux-focus-ring">
                  {dict.hero.download_pdf}
                </a>
              )}
            </div>

            <div className={styles.secondaryLinks}>
              {book.teaserVideoId && (
                <a
                  href={`https://www.youtube.com/watch?v=${book.teaserVideoId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${styles.teaserLink} ux-hover-btn ux-focus-ring`}
                >
                  ▶ {dict.hero.watch_teaser}
                </a>
              )}
              <a href={`/${lang}/books/${book.id}`} className={`${styles.detailsLink} ux-hover-btn ux-focus-ring`}>
                {dict.collection.learn_more}
              </a>
            </div>
          </div>
        </div>
      </div>

      {isLightboxOpen && (
        <div className={styles.lightbox} onClick={() => setIsLightboxOpen(false)}>
          <div className={styles.lightboxContent}>
            <Image src={book.promoImage} alt={title} width={1200} height={800} className={styles.lightboxImg} priority />
            <button className={`${styles.closeBtn} ux-hover-btn ux-focus-ring`} aria-label="Close">×</button>
          </div>
        </div>
      )}
    </section>
  );
}
