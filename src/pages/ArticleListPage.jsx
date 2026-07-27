import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ARTICLES } from '../data/articles';
import {
    Search,
    BookOpen,
    Calendar,
    Clock,
    Eye,
    ChevronRight,
    Tag,
    Bookmark,
    SlidersHorizontal,
} from 'lucide-react';

export default function ArticleListPage({ bookmarks = [], onToggleBookmark }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('সব');

    // Extract unique categories dynamically
    const categories = useMemo(() => {
        const cats = ARTICLES.map((item) => item.category);
        return ['সব', ...Array.from(new Set(cats))];
    }, []);

    // Filtered articles based on search & category
    const filteredArticles = useMemo(() => {
        return ARTICLES.filter((article) => {
            const matchesSearch =
                article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                article.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
                article.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

            const matchesCategory =
                selectedCategory === 'সব' || article.category === selectedCategory;

            return matchesSearch && matchesCategory;
        });
    }, [searchQuery, selectedCategory]);

    return (
        <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6">
            <div className="max-w-6xl mx-auto space-y-8">

                {/* Header Banner */}
                <div className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
                    <div className="inline-flex items-center gap-2 bg-teal-50 text-teal-800 text-xs font-semibold px-3 py-1.5 rounded-full">
                        <BookOpen className="w-3.5 h-3.5 text-teal-600" />
                        <span>ফতোয়া ও প্রবন্ধ আর্কাইভ</span>
                    </div>
                    <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                        ইসলামী মাসআলা ও প্রামাণ্য নিবন্ধসমূহ
                    </h1>
                    <p className="text-sm text-slate-500 max-w-2xl leading-relaxed">
                        দৈনন্দিন জীবনের প্রয়োজনীয় ফতোয়া, ইবাদাত ও শরীয়তের বিধানসমূহের নির্ভরযোগ্য প্রামাণ্য কালেকশন।
                    </p>

                    {/* Search Bar */}
                    <div className="pt-2 relative max-w-xl">
                        <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="যেকোনো মাসআলা, বিষয় বা কীওয়ার্ড দিয়ে খুঁজুন..."
                            className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all placeholder:text-slate-400"
                        />
                    </div>
                </div>

                {/* Filter Pills */}
                <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
                    <div className="flex items-center gap-1.5 text-xs text-slate-400 font-bold uppercase pr-2">
                        <SlidersHorizontal className="w-3.5 h-3.5" />
                        <span>ক্যাটাগরি:</span>
                    </div>
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`whitespace-nowrap px-4 py-2 rounded-xl text-xs font-semibold transition-all ${selectedCategory === cat
                                    ? 'bg-teal-700 text-white shadow-sm'
                                    : 'bg-white text-slate-600 border border-slate-200/80 hover:bg-slate-100'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Articles Grid */}
                {filteredArticles.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {filteredArticles.map((article) => {
                            const isSaved = bookmarks?.includes(article.id);

                            return (
                                <article
                                    key={article.id}
                                    className="bg-white rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-md transition-all flex flex-col justify-between overflow-hidden group"
                                >
                                    <div className="p-6 space-y-4">
                                        {/* Top Row: Category & Bookmark */}
                                        <div className="flex items-center justify-between">
                                            <span className="bg-slate-100 text-slate-700 text-xs font-semibold px-3 py-1 rounded-full">
                                                {article.category}
                                            </span>
                                            {onToggleBookmark && (
                                                <button
                                                    onClick={() => onToggleBookmark(article.id)}
                                                    className={`p-2 rounded-xl transition-all ${isSaved
                                                            ? 'bg-amber-50 text-amber-600'
                                                            : 'text-slate-400 hover:text-slate-600 hover:bg-slate-100'
                                                        }`}
                                                    title="সংরক্ষণ করুন"
                                                >
                                                    <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-amber-500' : ''}`} />
                                                </button>
                                            )}
                                        </div>

                                        {/* Title */}
                                        <h2 className="text-lg font-bold text-slate-900 group-hover:text-teal-700 transition-colors leading-snug">
                                            <Link to={`/article/${article.id}`}>{article.title}</Link>
                                        </h2>

                                        {/* Summary */}
                                        <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed">
                                            {article.summary}
                                        </p>

                                        {/* Tags */}
                                        <div className="flex flex-wrap items-center gap-1.5 pt-1">
                                            {article.tags.map((tag) => (
                                                <span
                                                    key={tag}
                                                    className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-500 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-100"
                                                >
                                                    <Tag className="w-3 h-3 text-slate-400" />
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Card Footer */}
                                    <div className="px-6 py-4 bg-slate-50/50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                                        <div className="flex items-center gap-3">
                                            <span className="flex items-center gap-1">
                                                <Calendar className="w-3.5 h-3.5" />
                                                {article.date}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <Clock className="w-3.5 h-3.5" />
                                                {article.readTime}
                                            </span>
                                        </div>

                                        <Link
                                            to={`/article/${article.id}`}
                                            className="flex items-center gap-1 text-teal-700 font-bold hover:gap-1.5 transition-all"
                                        >
                                            <span>পড়ুন</span>
                                            <ChevronRight className="w-4 h-4" />
                                        </Link>
                                    </div>
                                </article>
                            );
                        })}
                    </div>
                ) : (
                    <div className="bg-white p-12 rounded-3xl border border-slate-200/80 text-center space-y-3">
                        <BookOpen className="w-10 h-10 text-slate-300 mx-auto" />
                        <h3 className="text-base font-bold text-slate-800">কোনো আর্টিকেল পাওয়া যায়নি!</h3>
                        <p className="text-xs text-slate-500">
                            আপনার দেওয়া ফিল্টার বা অনুসন্ধানের সংগে মিলে এমন কোনো তথ্য আমরা পাইনি।
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}