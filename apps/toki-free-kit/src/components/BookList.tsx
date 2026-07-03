'use client';

import BookSection from './BookSection';
import { books } from '@/data/books';
import styles from './BookList.module.css';

export default function BookList({ dict }: { dict: any }) {
  return (
    <div id="collection">
      <section className={styles.headerSection}>
        <div className="container">
          <h2 className={styles.title}>{dict.collection.title}</h2>
          <p className={styles.subtitle}>{dict.collection.subtitle}</p>
        </div>
      </section>

      {books.map((book) => (
        <BookSection key={book.id} book={book} dict={dict} isLast={false} />
      ))}
    </div>
  );
}
