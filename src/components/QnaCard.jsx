import React from 'react';
import { Eye, ArrowRight } from 'lucide-react';
import HighlightText from './HighlightText';

export default function QnaCard({ item, searchQuery, onSelect }) {
    return (
        <article className="bg-white border border-slate-100 rounded-2xl p-5 hover:shadow-md transition-all duration-200">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-3 flex-wrap gap-2">
                <span className="bg-teal-50 text-teal-700 px-2.5 py-1 rounded-md font-medium border border-teal-100/50">
                    {item.category}
                </span>
                <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1 text-slate-500">
                        <Eye className="w-3.5 h-3.5" /> {item.views}
                    </span>
                    <span>•</span>
                    <span>{item.date}</span>
                </div>
            </div>

            <h3
                onClick={() => onSelect(item)}
                className="text-base md:text-lg font-bold text-slate-900 mb-2.5 cursor-pointer hover:text-teal-700 transition-colors leading-snug"
            >
                <HighlightText text={item.title} searchQuery={searchQuery} />
            </h3>

            <p className="text-xs md:text-sm text-slate-600 line-clamp-2 leading-relaxed mb-4">
                <HighlightText text={item.summary} searchQuery={searchQuery} />
            </p>

            <div className="flex items-center justify-between pt-3 border-t border-slate-50">
                <span className="text-xs text-slate-500">
                    উত্তর দিচ্ছেন: <strong className="text-slate-700">{item.verifiedBy}</strong>
                </span>
                <button
                    onClick={() => onSelect(item)}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-teal-600 hover:text-teal-700"
                >
                    বিস্তারিত পড়ুন <ArrowRight className="w-3.5 h-3.5" />
                </button>
            </div>
        </article>
    );
}