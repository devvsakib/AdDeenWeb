import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import HeroSearch from '../components/HeroSearch';
import CategoryNav from '../components/CategoryNav';
import QnaCard from '../components/QnaCard';
import Sidebar from '../components/Sidebar';
import TeamSection from '../components/TeamSection';
import { HelpCircle, XCircle } from 'lucide-react';
import { categories, qnaList } from '../data/qnaData';
import IslamQaFetcher from '../components/IslamQaFetcher';
import ContactSection from '../components/ContactSection';

export default function HomePage() {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();

    // Read search & category directly from URL query parameters
    const searchQuery = searchParams.get('q') || '';
    const selectedCategory = searchParams.get('cat') || 'সব';

    // Helper function to update search params in the URL
    const updateQueryParam = (key, value) => {
        const newParams = new URLSearchParams(searchParams);
        if (value && value !== 'সব') {
            newParams.set(key, value);
        } else {
            newParams.delete(key);
        }
        setSearchParams(newParams);
    };

    const handleSearch = (query) => {
        updateQueryParam('q', query);
    };

    const handleSelectCategory = (category) => {
        updateQueryParam('cat', category);
    };

    const clearFilters = () => {
        setSearchParams({});
    };

    const filteredQnaList = qnaList.filter((item) => {
        const matchesCategory = selectedCategory === 'সব' || item.category === selectedCategory;

        const query = searchQuery.trim().toLowerCase();

        const matchesQuery = query === '' ||
            item.title.toLowerCase().includes(query) ||
            item.summary.toLowerCase().includes(query) ||
            item.category.toLowerCase().includes(query) ||
            (item.fullAnswer && item.fullAnswer.toLowerCase().includes(query));

        return matchesCategory && matchesQuery;
    });

    return (
        <>
            <HeroSearch onSearch={handleSearch} initialValue={searchQuery} />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full flex-grow">
                {/* <IslamQaFetcher /> */}
                <CategoryNav
                    categories={categories}
                    selectedCategory={selectedCategory}
                    onSelectCategory={handleSelectCategory}
                />

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-4">
                        <div className="flex items-center justify-between mb-2">
                            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                                <HelpCircle className="w-5 h-5 text-teal-600" />
                                প্রশ্ন ও উত্তরসমূহ
                            </h2>

                            <div className="flex items-center gap-3">
                                {(searchQuery || selectedCategory !== 'সব') && (
                                    <button
                                        onClick={clearFilters}
                                        className="inline-flex items-center gap-1 text-xs text-rose-600 hover:text-rose-700 font-medium"
                                    >
                                        <XCircle className="w-3.5 h-3.5" /> ফিল্টার মুছুন
                                    </button>
                                )}
                                <span className="text-xs text-slate-500">
                                    ফলাফল: {filteredQnaList.length}টি
                                </span>
                            </div>
                        </div>

                        {filteredQnaList.length > 0 ? (
                            filteredQnaList.map((item) => (
                                <QnaCard
                                    key={item.id}
                                    item={item}
                                    searchQuery={searchQuery}
                                    onSelect={(qna) => navigate(`/qa/${qna.slug}${searchQuery ? `?highlight=${encodeURIComponent(searchQuery)}` : ''}`)}
                                />
                            ))
                        ) : (
                            <div className="text-center py-12 bg-white rounded-2xl border border-slate-100">
                                <p className="text-slate-500 text-sm">কোনো প্রশ্ন খুঁজে পাওয়া যায়নি।</p>
                            </div>
                        )}
                    </div>

                    <Sidebar onAskQuestionClick={() => alert("গুগল লগইন পরবর্তীতে যুক্ত করা হবে।")} />
                </div>

                <TeamSection />
            </main>
        </>
    );
}