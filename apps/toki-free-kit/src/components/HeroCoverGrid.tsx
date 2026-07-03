'use client';

import Image from 'next/image';
import { Book } from '@/data/books';
import styles from './HeroCoverGrid.module.css';
import { useState } from 'react';

interface HeroCoverGridProps {
  books: Book[];
  onSelect: (book: Book) => void;
  selectedBookId: string | null;
  dict: any;
  lang: string;
}

const STACK_TRANSFORMS = [
  { x: 0, y: 150, r: -3, z: 10 },
  { x: 90, y: 95, r: 1, z: 9 },
  { x: 170, y: 40, r: 4, z: 8 },
  { x: 250, y: -15, r: 7, z: 7 },
  { x: 320, y: -70, r: 10, z: 6 },
];

export default function HeroCoverGrid({ books, onSelect, dict }: HeroCoverGridProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className={styles.stackContainer}>
      <div className={styles.scroller}>
        {books.map((book, index) => {
          const transform = STACK_TRANSFORMS[index] || STACK_TRANSFORMS[0];
          const isHovered = hoveredIndex === index;

          return (
            <div
              key={book.id}
              className={`${styles.cardWrapper} ux-focus-ring`}
              onClick={() => onSelect(book)}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              style={{
                '--x': `${transform.x}px`,
                '--y': `${transform.y}px`,
                '--r': `${transform.r}deg`,
                '--z': isHovered ? 50 : transform.z,
              } as any}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  onSelect(book);
                }
              }}
            >
              <div className={`${styles.card} ux-hover-card`}>
                <div className={styles.imageContainer}>
                  <Image
                    src={book.coverImage}
                    alt={dict?.books?.[book.id]?.title ?? book.id}
                    fill
                    className={styles.coverImg}
                    sizes="(max-width: 768px) 240px, 300px"
                    priority={index < 3}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
