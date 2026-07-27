import React from 'react';
import { Bookmark, Eye, Calendar, ArrowRight } from 'lucide-react';

export default function QaCard({ item, onToggleBookmark , isBookmarked, onClick }) {
    return (
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group">
            <div>
                {/* Top bar: Category & Bookmark Toggle */}
                <div className="flex items-center justify-between mb-3">
                    <span className="bg-teal-50 text-teal-700 text-[11px] font-semibold px-2.5 py-0.5 rounded-full">
                        {item.category}
                    </span>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onToggleBookmark(item);
                        }}
                        className={`p-2 rounded-xl transition-colors ${isBookmarked
                            ? 'bg-amber-50 text-amber-600'
                            : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'
                            }`}
                        title={isBookmarked ? 'সংরক্ষণ থেকে সরান' : 'সংরক্ষণ করুন'}
                    >
                        <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-amber-500' : ''}`} />
                    </button>
                </div>

                {/* Title */}
                <h3
                    onClick={onClick}
                    className="text-sm font-bold text-slate-800 line-clamp-2 cursor-pointer group-hover:text-teal-700 transition-colors mb-2"
                >
                    {item.title}
                </h3>

                {/* Summary */}
                <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-4">
                    {item.summary}
                </p>
            </div>

            {/* Footer Info */}
            <div className="flex items-center justify-between text-[11px] text-slate-400 pt-3 border-t border-slate-50">
                <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {item.date}
                    </span>
                    <span className="flex items-center gap-1">
                        <Eye className="w-3.5 h-3.5" />
                        {item.views || 0}
                    </span>
                </div>
                <button
                    onClick={onClick}
                    className="text-teal-600 font-semibold flex items-center gap-1 hover:underline"
                >
                    পড়ুন <ArrowRight className="w-3 h-3" />
                </button>
            </div>
        </div>
    );
}