import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import ArticleView from '../components/ArticleView';
import { useBookmarks } from '../hooks/useBookmarks';
import { ArrowLeft, Loader2, AlertCircle } from 'lucide-react';

export default function ArticleDetailsPage({ articles = [] }) {
    const { id } = useParams(); // Gets the dynamic ID or slug from URL /article/:id
    const navigate = useNavigate();
    const { isBookmarked, toggleBookmark } = useBookmarks();

    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);

        // 1. Search in passed articles prop or fetch from API / LocalStorage
        const foundArticle = articles.find(
            (item) => item.id.toString() === id || item.slug === id
        );

        // Fallback: Check local storage if created in editor
        if (!foundArticle) {
            const savedArticles = JSON.parse(localStorage.getItem('addeeen_articles') || '[]');
            const localArticle = savedArticles.find(
                (item) => item.id.toString() === id || item.slug === id
            );

            if (localArticle) {
                setArticle(localArticle);
            } else {
                setArticle(null);
            }
        } else {
            setArticle(foundArticle);
        }

        setLoading(false);
    }, [id, articles]);

    // Loading State
    if (loading) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center text-teal-600 gap-3">
                <Loader2 className="w-8 h-8 animate-spin" />
                <p className="text-xs font-semibold text-slate-500">আর্টিকেল লোড হচ্ছে...</p>
            </div>
        );
    }

    // Not Found State
    if (!article) {
        return (
            <div className="max-w-2xl mx-auto my-12 p-8 bg-white rounded-3xl border border-slate-100 shadow-sm text-center space-y-4">
                <div className="w-12 h-12 bg-rose-50 text-rose-500 rounded-2xl flex items-center justify-center mx-auto">
                    <AlertCircle className="w-6 h-6" />
                </div>
                <h2 className="text-lg font-bold text-slate-800">আর্টিকেলটি পাওয়া যায়নি!</h2>
                <p className="text-xs text-slate-500">
                    আপনি যে ফতোয়া বা আর্টিকেলটি খুঁজছেন তা মুছে ফেলা হয়েছে অথবা সঠিক লিঙ্ক প্রদান করেননি।
                </p>
                <Link
                    to="/"
                    className="inline-flex items-center gap-1.5 bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold px-5 py-2.5 rounded-xl transition-all"
                >
                    <ArrowLeft className="w-4 h-4" />
                    <span>হোম পেজে ফিরে যান</span>
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 space-y-6">
            <div className="max-w-4xl mx-auto flex items-center justify-between">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-teal-700 transition-colors bg-white px-3 py-1.5 rounded-xl border border-slate-200/80 shadow-sm"
                >
                    <ArrowLeft className="w-4 h-4" />
                    <span>পেছনে যান</span>
                </button>
            </div>

            <ArticleView
                article={article}
                isBookmarked={isBookmarked(article.id)}
                onToggleBookmark={toggleBookmark}
            />
        </div>
    );
}