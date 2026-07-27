import React, { useState } from 'react';
import { Search, Sparkles } from 'lucide-react';

export default function HeroSearch({ onSearch }) {
    const [query, setQuery] = useState('');

    const quickTags = [
        'ঈমান ও আক্বীদা',
        'সালাত',
        'পারিবারিক',
        'হালাল রিক্‌জ',
        'যাকাত'
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        if (onSearch) {
            onSearch(query);
        }
    };

    const handleTagClick = (tag) => {
        setQuery(tag);
        if (onSearch) {
            onSearch(tag);
        }
    };

    return (
        <section className="relative bg-gradient-to-b from-teal-50/60 via-slate-50 to-slate-50 py-16 md:py-20 px-4">
            <div className="max-w-4xl mx-auto text-center">

                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-white border border-teal-100 text-teal-700 shadow-sm mb-6">
                    <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse"></span>
                    সহীহ ও দলিলভিত্তিক ইসলাম জিজ্ঞাসা প্ল্যাটফর্ম
                </div>

                <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 leading-tight mb-4">
                    আপনার দ্বীনি জিজ্ঞাসার <br className="hidden sm:inline" />
                    <span className="text-teal-600">নির্ভরযোগ্য ও বিশুদ্ধ</span> সমাধান
                </h1>

                <p className="text-slate-600 text-xs md:text-sm max-w-2xl mx-auto mb-8">
                    কোরআন ও সহীহ সুন্নাহর আলোকে অভিজ্ঞ আলেম ও গবেষকদের দ্বারা পরিচালিত বাংলা ভাষায় উত্তরভিত্তিক জ্ঞানকোষ।[cite: 1]
                </p>

                <form onSubmit={handleSubmit} className="max-w-2xl mx-auto relative shadow-lg shadow-slate-200/50 rounded-2xl">
                    <div className="relative flex items-center">
                        <Search className="absolute left-4 w-5 h-5 text-slate-400" />
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="আপনার প্রশ্ন বা বিষয় লিখে খুঁজুন (যেমন: সালাত, রোজা, জাকাত)..."
                            className="w-full pl-12 pr-28 py-4 bg-white rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800 text-xs md:text-sm placeholder-slate-400"
                        />
                        <button
                            type="submit"
                            className="absolute right-2 bg-teal-600 hover:bg-teal-700 text-white text-xs md:text-sm font-semibold px-4 py-2.5 rounded-xl transition-all active:scale-95"
                        >
                            সন্ধান করুন
                        </button>
                    </div>
                </form>

                <div className="flex items-center justify-center gap-2 flex-wrap mt-6">
                    <span className="text-xs text-slate-400 font-medium flex items-center gap-1">
                        <Sparkles className="w-3.5 h-3.5 text-teal-500" /> জনপ্রিয় বিষয়:
                    </span>
                    {quickTags.map((tag, idx) => (
                        <button
                            key={idx}
                            type="button"
                            onClick={() => handleTagClick(tag)}
                            className="text-xs bg-white border border-slate-200 hover:border-teal-500 text-slate-600 hover:text-teal-600 px-3 py-1 rounded-full transition-all active:scale-95"
                        >
                            #{tag}
                        </button>
                    ))}
                </div>

            </div>
        </section>
    );
}