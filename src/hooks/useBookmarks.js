import { useState, useEffect } from 'react';

export function useBookmarks() {
    const [bookmarks, setBookmarks] = useState(() => {
        const saved = localStorage.getItem('addeeen_bookmarks');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem('addeeen_bookmarks', JSON.stringify(bookmarks));
    }, [bookmarks]);

    const toggleBookmark = (item) => {
        setBookmarks((prev) => {
            const exists = prev.some((b) => b.id === item.id);
            if (exists) {
                return prev.filter((b) => b.id !== item.id);
            } else {
                return [...prev, item];
            }
        });
    };

    const isBookmarked = (id) => {
        return bookmarks.some((b) => b.id === id);
    };

    return { bookmarks, toggleBookmark, isBookmarked };
}