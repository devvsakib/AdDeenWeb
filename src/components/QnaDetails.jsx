import React, { useEffect } from 'react';
import { ArrowLeft, CheckCircle, Eye, Share2, BookMarked } from 'lucide-react';
import { qnaList } from '../data/qnaData';
import { useParams } from 'react-router-dom';
import HighlightText from '../components/HighlightText';

export default function QnaDetails({ onBack }) {
    const { id } = useParams();
    const item = qnaList.find((q) => q.id === id);

    useEffect(() => {
        const defaultTitle = "AdDeen - ইসলামী প্রশ্নোত্তর ও ফতোয়া পোর্টাল";
        if (item && item.title) {
            document.title = `${item.title} | AdDeen`;
        }

        return () => {
            document.title = defaultTitle;
        };
    }, [item]);

    if (!item) {
        return (
            <div className="bg-white p-8 rounded-2xl text-center border border-slate-100">
                <p className="text-slate-500 mb-4">প্রশ্নটি খুঁজে পাওয়া যায়নি।</p>
                <button onClick={onBack} className="text-teal-600 font-bold text-sm">
                    হোমপেজে ফিরে যান
                </button>
            </div>
        );
    }

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: item.title,
                url: window.location.href,
            }).catch(() => { });
        } else {
            navigator.clipboard.writeText(window.location.href);
            alert("লিঙ্ক কপি করা হয়েছে!");
        }
    };

    return (
        <article className="bg-white border border-slate-100 rounded-2xl p-6 md:p-8 shadow-sm">
            <button
                onClick={onBack}
                className="inline-flex items-center gap-2 text-xs md:text-sm font-semibold text-teal-700 hover:text-teal-800 bg-teal-50 px-3.5 py-1.5 rounded-lg mb-6 transition-colors"
            >
                <ArrowLeft className="w-4 h-4" /> তালিকায় ফিরে যান
            </button>

            <div className="flex items-center justify-between text-xs text-slate-400 mb-4 flex-wrap gap-2">
                <span className="bg-teal-50 text-teal-700 px-2.5 py-1 rounded-md font-medium border border-teal-100/50">
                    {item.category}
                </span>
                <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                        <Eye className="w-3.5 h-3.5" /> {item.views}
                    </span>
                    <span>•</span>
                    <span>আইডি: {item.id}</span>
                    <span>•</span>
                    <span>{item.date}</span>
                </div>
            </div>

            <h1 className="text-xl md:text-2xl font-bold text-slate-900 mb-6 leading-relaxed">
                <HighlightText text={baseItem.title} searchQuery={highlightTerm} />
            </h1>

            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl mb-6 text-xs md:text-sm">
                <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-teal-600" />
                    <span>যাচাইকৃত আলেম: <strong className="text-slate-800 font-bold">{item.verifiedBy}</strong></span>
                </div>
                <button
                    onClick={handleShare}
                    className="flex items-center gap-1.5 text-slate-600 hover:text-teal-600 font-medium transition-colors"
                >
                    <Share2 className="w-4 h-4" /> শেয়ার
                </button>
            </div>

            <div className="prose prose-slate max-w-none text-slate-700 text-sm md:text-base leading-relaxed whitespace-pre-line mb-8">
                <HighlightText text={baseItem.fullAnswer} searchQuery={highlightTerm} />
            </div>

            {item.references && item.references.length > 0 && (
                <div className="border-t border-slate-100 pt-6">
                    <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                        <BookMarked className="w-4 h-4 text-teal-600" /> রেফারেন্স ও দলিল
                    </h4>
                    <ul className="list-disc list-inside space-y-1 text-xs md:text-sm text-slate-600">
                        {item.references.map((ref, idx) => (
                            <li key={idx}>{ref}</li>
                        ))}
                    </ul>
                </div>
            )}
        </article>
    );
}