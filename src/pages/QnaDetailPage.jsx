import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import Highlighter from 'react-highlight-words';
import { ArrowLeft, CheckCircle, Eye, Share2, BookMarked } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import { qnaList } from '../data/qnaData';

export default function QnaDetailPage() {
    const { slug } = useParams();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const highlightTerm = searchParams.get('highlight') || '';
    const searchWords = highlightTerm ? highlightTerm.trim().split(/\s+/) : [];

    const baseItem = qnaList.find((q) => q.slug === slug);
    const [views, setViews] = useState(baseItem ? baseItem.views : 0);

    useEffect(() => {
        if (baseItem) {
            document.title = `${baseItem.title} | AdDeen`;

            const storageKey = `views_count_${baseItem.id}`;
            const hasViewed = sessionStorage.getItem(storageKey);

            if (!hasViewed) {
                const currentCount = parseInt(localStorage.getItem(storageKey) || baseItem.views, 10) + 1;
                localStorage.setItem(storageKey, currentCount);
                sessionStorage.setItem(storageKey, 'true');
                setViews(currentCount);
            } else {
                const savedCount = parseInt(localStorage.getItem(storageKey) || baseItem.views, 10);
                setViews(savedCount);
            }
        }

        return () => {
            document.title = "AdDeen - ইসলামী প্রশ্নোত্তর ও ফতোয়া পোর্টাল";
        };
    }, [slug, baseItem]);

    if (!baseItem) {
        return (
            <main className="max-w-7xl mx-auto px-4 py-16 text-center">
                <h2 className="text-xl font-bold text-slate-800 mb-2">প্রশ্নটি পাওয়া যায়নি</h2>
                <button
                    onClick={() => navigate('/')}
                    className="text-teal-600 font-bold text-sm hover:underline"
                >
                    হোমপেজে ফিরে যান
                </button>
            </main>
        );
    }

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: baseItem.title,
                url: window.location.href,
            }).catch(() => { });
        } else {
            navigator.clipboard.writeText(window.location.href);
            alert("লিঙ্ক কপি করা হয়েছে!");
        }
    };

    return (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full flex-grow">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <article className="bg-white border border-slate-100 rounded-2xl p-6 md:p-8 shadow-sm">
                        <button
                            onClick={() => navigate(-1)}
                            className="inline-flex items-center gap-2 text-xs md:text-sm font-semibold text-teal-700 hover:text-teal-800 bg-teal-50 px-3.5 py-1.5 rounded-lg mb-6 transition-colors"
                        >
                            <ArrowLeft className="w-4 h-4" /> পিছে যান
                        </button>

                        <div className="flex items-center justify-between text-xs text-slate-400 mb-4 flex-wrap gap-2">
                            <span className="bg-teal-50 text-teal-700 px-2.5 py-1 rounded-md font-medium border border-teal-100/50">
                                {baseItem.category}
                            </span>
                            <div className="flex items-center gap-3">
                                <span className="flex items-center gap-1 text-teal-700 font-medium bg-teal-50/50 px-2 py-0.5 rounded">
                                    <Eye className="w-3.5 h-3.5" /> {views} পাঠ
                                </span>
                                <span>•</span>
                                <span>আইডি: {baseItem.id}</span>
                                <span>•</span>
                                <span>{baseItem.date}</span>
                            </div>
                        </div>

                        <h1 className="text-xl md:text-2xl font-bold text-slate-900 mb-6 leading-relaxed">
                            <Highlighter
                                highlightClassName="bg-amber-100 text-amber-900 px-1 rounded"
                                searchWords={searchWords}
                                autoEscape={true}
                                textToHighlight={baseItem.title}
                            />
                        </h1>

                        <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl mb-6 text-xs md:text-sm">
                            <div className="flex items-center gap-2">
                                <CheckCircle className="w-5 h-5 text-teal-600" />
                                <span>যাচাইকৃত আলেম: <strong className="text-slate-800 font-bold">{baseItem.verifiedBy}</strong></span>
                            </div>
                            <button
                                onClick={handleShare}
                                className="flex items-center gap-1.5 text-slate-600 hover:text-teal-600 font-medium transition-colors"
                            >
                                <Share2 className="w-4 h-4" /> শেয়ার
                            </button>
                        </div>

                        <div className="prose prose-slate max-w-none text-slate-700 text-sm md:text-base leading-relaxed whitespace-pre-line mb-8">
                            <Highlighter
                                highlightClassName="bg-amber-100 text-amber-900 px-1 rounded"
                                searchWords={searchWords}
                                autoEscape={true}
                                textToHighlight={baseItem.fullAnswer}
                            />
                        </div>

                        {baseItem.references && baseItem.references.length > 0 && (
                            <div className="border-t border-slate-100 pt-6">
                                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                                    <BookMarked className="w-4 h-4 text-teal-600" /> রেফারেন্স ও দলিল
                                </h4>
                                <ul className="list-disc list-inside space-y-1 text-xs md:text-sm text-slate-600">
                                    {baseItem.references.map((ref, idx) => (
                                        <li key={idx}>{ref}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </article>
                </div>

                <Sidebar onAskQuestionClick={() => alert("গুগল লগইন পরবর্তীতে যুক্ত করা হবে।")} />
            </div>
        </main>
    );
}