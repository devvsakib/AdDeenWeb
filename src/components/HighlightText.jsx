import React from 'react';

export default function HighlightText({ text = '', searchQuery = '', highlightClass = 'bg-amber-100 text-amber-900 px-1 rounded' }) {
    if (!searchQuery.trim() || !text) {
        return <>{text}</>;
    }

    const escapedQuery = searchQuery.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(${escapedQuery})`, 'gi');
    const parts = text.split(regex);

    return (
        <>
            {parts.map((part, i) =>
                part.toLowerCase() === searchQuery.toLowerCase() ? (
                    <mark key={i} className={highlightClass}>
                        {part}
                    </mark>
                ) : (
                    part
                )
            )}
        </>
    );
}