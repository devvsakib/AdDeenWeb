import React, { useState, useEffect } from 'react';
import {
    Bookmark,
    Share2,
    Copy,
    Check,
    Printer,
    AArrowDown,
    AArrowUp,
    RotateCcw,
    Sun,
    BookOpen,
    Calendar,
    Eye,
    User,
    List,
} from 'lucide-react';

export default function ArticleView({ article, isBookmarked, onToggleBookmark }) {
    // Reader Customization State
    const [fontSize, setFontSize] = useState(16); // Default 16px
    const [isSepia, setIsSepia] = useState(false); // Sepia mode toggle
    const [copied, setCopied] = useState(false);
    const [toc, setToc] = useState([]);

    // Extract H2 headings dynamically for Table of Contents
    useEffect(() => {
        if (!article?.content) return;
        const parser = new DOMParser();
        const doc = parser.parseFromString(article.content, 'text/html');
        const headings = Array.from(doc.querySelectorAll('h2, h3')).map((heading, idx) => ({
            id: `section-${idx}`,
            text: heading.textContent,
            level: heading.tagName.toLowerCase(),
        }));
        setToc(headings);
    }, [article]);

    // Adjust font size limit
    const increaseFont = () => setFontSize((prev) => Math.min(prev + 2, 24));
    const decreaseFont = () => setFontSize((prev) => Math.max(prev - 2, 12));
    const resetFont = () => setFontSize(16);

    // Copy link handler
    const handleCopyLink = () => {
        navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    // Web Share API or Copy Fallback
    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: article.title,
                    url: window.location.href,
                });
            } catch (err) {
                /* User cancelled or not supported */
            }
        } else {
            handleCopyLink();
        }
    };

    if (!article) return null;

    return (
        <div
            className={`max-w-4xl mx-auto rounded-3xl transition-colors duration-300 ${isSepia
                    ? 'bg-[#fbf0d9] text-[#433422] border border-[#e8d7be]'
                    : 'bg-white text-slate-800 border border-slate-100 shadow-sm'
                }`}
        >
            {/* 1. Article Header */}
            <header className="p-6 sm:p-10 border-b border-slate-100/60 space-y-4">
                {/* Category & Action Bar */}
                <div className="flex flex-wrap items-center justify-between gap-3">
                    <span className="bg-teal-50 text-teal-700 text-xs font-semibold px-3 py-1 rounded-full">
                        {article.category || 'ফতোয়া ও মাসআলা'}
                    </span>

                    {/* Top Reader Controls */}
                    <div className="flex items-center gap-1.5 bg-slate-100/70 p-1 rounded-2xl text-slate-600">
                        {/* Font Adjusters */}
                        <button
                            onClick={decreaseFont}
                            className="p-1.5 hover:bg-white rounded-xl transition-all"
                            title="লেখা ছোট করুন"
                        >
                            <AArrowDown className="w-4 h-4" />
                        </button>
                        <button
                            onClick={resetFont}
                            className="p-1.5 hover:bg-white rounded-xl transition-all"
                            title="ডিফল্ট ফন্ট সাইজ"
                        >
                            <RotateCcw className="w-3.5 h-3.5" />
                        </button>
                        <button
                            onClick={increaseFont}
                            className="p-1.5 hover:bg-white rounded-xl transition-all"
                            title="লেখা বড় করুন"
                        >
                            <AArrowUp className="w-4 h-4" />
                        </button>

                        <div className="w-px h-4 bg-slate-300 mx-1" />

                        {/* Sepia Mode Toggle */}
                        <button
                            onClick={() => setIsSepia(!isSepia)}
                            className={`p-1.5 rounded-xl transition-all ${isSepia ? 'bg-[#ebd4b0] text-[#5c4222]' : 'hover:bg-white text-slate-600'
                                }`}
                            title="ওয়ার্ম মোড অন/অফ"
                        >
                            <Sun className="w-4 h-4" />
                        </button>

                        <div className="w-px h-4 bg-slate-300 mx-1" />

                        {/* Bookmark Button */}
                        <button
                            onClick={() => onToggleBookmark && onToggleBookmark(article)}
                            className={`p-1.5 rounded-xl transition-all ${isBookmarked ? 'bg-amber-100 text-amber-700' : 'hover:bg-white'
                                }`}
                            title="সংরক্ষণ করুন"
                        >
                            <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-amber-600' : ''}`} />
                        </button>
                    </div>
                </div>

                {/* Title */}
                <h1 className="text-xl sm:text-3xl font-extrabold tracking-tight leading-snug">
                    {article.title}
                </h1>

                {/* Meta Info */}
                <div className="flex flex-wrap items-center gap-4 text-xs opacity-75 pt-2">
                    {article.author && (
                        <span className="flex items-center gap-1">
                            <User className="w-3.5 h-3.5 text-teal-600" />
                            {article.author}
                        </span>
                    )}
                    <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {article.date || 'আজ'}
                    </span>
                    {article.views && (
                        <span className="flex items-center gap-1">
                            <Eye className="w-3.5 h-3.5" />
                            {article.views} বার পঠিত
                        </span>
                    )}
                </div>
            </header>

            {/* 2. Table of Contents (If article has multiple sections) */}
            {toc.length > 1 && (
                <nav className="mx-6 sm:mx-10 mt-6 p-4 rounded-2xl bg-slate-50/80 border border-slate-100 text-xs">
                    <div className="flex items-center gap-2 font-bold mb-2 text-teal-800">
                        <List className="w-4 h-4" />
                        <span>বিষয়সূচি (Table of Contents)</span>
                    </div>
                    <ul className="space-y-1.5 pl-2">
                        {toc.map((item, idx) => (
                            <li
                                key={idx}
                                className={`hover:underline cursor-pointer text-slate-600 hover:text-teal-700 ${item.level === 'h3' ? 'pl-4' : 'font-medium'
                                    }`}
                            >
                                • {item.text}
                            </li>
                        ))}
                    </ul>
                </nav>
            )}

            {/* 3. Main Article Body */}
            <main className="p-6 sm:p-10">
                <div
                    className="prose-content leading-relaxed"
                    style={{ fontSize: `${fontSize}px` }}
                    dangerouslySetInnerHTML={{ __html: article.content }}
                />
            </main>

            {/* 4. Footer & Social Share Bar */}
            <footer className="px-6 sm:px-10 py-6 border-t border-slate-100/60 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-teal-600" />
                    <span className="text-xs font-semibold opacity-80">
                        AdDeen Islamic QA Archive
                    </span>
                </div>

                {/* Share Buttons */}
                <div className="flex items-center gap-2">
                    <button
                        onClick={handleCopyLink}
                        className="flex items-center gap-1.5 text-xs font-semibold px-3 py-2 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all"
                    >
                        {copied ? <Check className="w-3.5 h-3.5 text-teal-600" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copied ? 'কপি হয়েছে' : 'লিঙ্ক কপি'}</span>
                    </button>

                    <button
                        onClick={handleShare}
                        className="flex items-center gap-1.5 text-xs font-semibold px-3 py-2 bg-teal-600 text-white hover:bg-teal-700 rounded-xl transition-all shadow-sm"
                    >
                        <Share2 className="w-3.5 h-3.5" />
                        <span>শেয়ার করুন</span>
                    </button>

                    <button
                        onClick={() => window.print()}
                        className="p-2 text-slate-500 hover:bg-slate-100 rounded-xl transition-all"
                        title="প্রিন্ট ফতোয়া"
                    >
                        <Printer className="w-4 h-4" />
                    </button>
                </div>
            </footer>
        </div>
    );
}