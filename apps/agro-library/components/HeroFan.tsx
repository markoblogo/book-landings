"use client";

import { useState } from "react";
import type { CatalogBook } from "../data/catalog";

export function HeroFan({ books, className, cardClassName, activeClassName, badgeClassName }: {
  books: CatalogBook[];
  className: string;
  cardClassName: string;
  activeClassName: string;
  badgeClassName: string;
}) {
  const [active, setActive] = useState<string | null>(null);

  return (
    <div className={className} aria-label="Books in the AMI Team collection">
      {books.map((book, index) => (
        <a
          className={`${cardClassName} ${active === book.id ? activeClassName : ""}`}
          href={`#${book.slug}`}
          key={book.id}
          aria-label={`View ${book.title}`}
          onMouseEnter={() => setActive(book.id)}
          onMouseLeave={() => setActive(null)}
          onFocus={() => setActive(book.id)}
          onBlur={() => setActive(null)}
        >
          {book.cover ? <img src={book.cover} alt="" /> : null}
          {index === 0 ? <span className={badgeClassName}><span>ALL FREE</span></span> : null}
        </a>
      ))}
    </div>
  );
}
