import React, { useState } from 'react';
import { Search, Loader2 } from 'lucide-react';

export default function IslamQaFetcher() {
    const [inputUrl, setInputUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const [fatwaData, setFatwaData] = useState(null);

    const fetchIslamQaContent = async (e) => {
        e.preventDefault();
        if (!inputUrl.trim()) return;

        setLoading(true);
        setFatwaData(null);

        try {
            let targetUrl = inputUrl.trim();

            if (/^\d+$/.test(targetUrl)) {
                targetUrl = `https://islamqa.info/bn/answers/${targetUrl}`;
            }

            const response = await fetch(`https://r.jina.ai/${targetUrl}`, {
                headers: {
                    'Accept': 'application/json'
                }
            });

            const result = await response.json();

            if (result && result.data) {
                const rawTitle = result.data.title || '';
                const cleanTitle = rawTitle.replace(/\s*-\s*ইসলাম জিজ্ঞাসা ও জবাব\s*$/, '').trim();

                setFatwaData({
                    title: cleanTitle,
                    content: result.data.content,
                    sourceUrl: targetUrl
                });
            }
        } catch (error) {
            alert("ফতোয়া লোড করতে সমস্যা হয়েছে। URL বা ID টি পুনরায় যাচায় করুন।");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white rounded-2xl border border-slate-100 shadow-sm my-8">
            <form onSubmit={fetchIslamQaContent} className="flex gap-2 mb-6">
                <input
                    type="text"
                    value={inputUrl}
                    onChange={(e) => setInputUrl(e.target.value)}
                    placeholder="IslamQA লিংক বা ID দিন (যেমন: https://islamqa.info/bn/answers/122319/...)"
                    className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs md:text-sm focus:outline-none focus:border-teal-600 transition-colors"
                />
                <button
                    type="submit"
                    disabled={loading}
                    className="bg-teal-600 text-white px-5 py-2.5 rounded-xl text-xs md:text-sm font-semibold hover:bg-teal-700 transition-colors flex items-center gap-2 disabled:opacity-50 shrink-0"
                >
                    {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
                    লোড করুন
                </button>
            </form>

            {fatwaData && (
                <article className="space-y-4 pt-4 border-t border-slate-100">
                    <h2 className="text-lg md:text-xl font-bold text-slate-900 leading-snug">
                        {fatwaData.title}
                    </h2>
                    <div className="text-xs md:text-sm text-slate-700 leading-relaxed whitespace-pre-line bg-slate-50 p-5 rounded-2xl border border-slate-100 max-h-[500px] overflow-y-auto">
                        {fatwaData.content}
                    </div>
                    <div className="pt-2">
                        <a
                            href={fatwaData.sourceUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="text-xs text-teal-600 font-medium hover:underline inline-flex items-center gap-1"
                        >
                            মূল ফতোয়া দেখুন (IslamQA) →
                        </a>
                    </div>
                </article>
            )}
        </div>
    );
}