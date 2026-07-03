'use client';

import BookSection from './BookSection';
import { books } from '@/data/books';

export default function BookList({ dict }: { dict: any }) {
    // Sort logic: commercial first, then gift
    const sortedBooks = [...books].sort((a, b) => {
        if (a.type === 'gift') return 1;
        if (b.type === 'gift') return -1;
        return 0;
    });

    return (
        <div id="collection">
            {sortedBooks.map((book, index) => (
                <BookSection
                    key={book.id}
                    book={book}
                    dict={dict}
                    isLast={index === sortedBooks.length - 1}
                />
            ))}
        </div>
    );
}
