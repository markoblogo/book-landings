"use client";

import { useState } from "react";
import type { CatalogBook } from "../data/catalog";

export function HeroFan({ books, className, cardClassName, activeClassName }: {
  books: CatalogBook[];
  className: string;
  cardClassName: string;
  activeClassName: string;
}) {
  const [active, setActive] = useState<string | null>(null);

  return (
    <div className={className} aria-label="Books in the AMI Team collection">
      {books.map((book) => (
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
        </a>
      ))}
    </div>
  );
}
