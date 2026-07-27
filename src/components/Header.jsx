import React, { useState, useEffect } from 'react';
import { Search, HelpCircle, Menu, X, Loader2, BookOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { images } from '../config/images';
import { useDebounce } from '../hooks/useDebounce';
import { qnaList } from '../data/qnaData';

export default function Header({ onSearchSubmit, onAskQuestionClick, setIsAskModalOpen }) {
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const debouncedQuery = useDebounce(searchQuery, 300);

    useEffect(() => {
        const query = debouncedQuery.trim().toLowerCase();

        if (!query) {
            setSearchResults([]);
            setIsLoading(false);
            setIsDropdownOpen(false);
            return;
        }

        setIsLoading(true);
        setIsDropdownOpen(true);

        const timer = setTimeout(() => {
            const filtered = qnaList.filter((item) => {
                return (
                    item.title.toLowerCase().includes(query) ||
                    item.summary.toLowerCase().includes(query) ||
                    item.category.toLowerCase().includes(query) ||
                    (item.fullAnswer && item.fullAnswer.toLowerCase().includes(query))
                );
            });

            setSearchResults(filtered);
            setIsLoading(false);
        }, 300);

        return () => clearTimeout(timer);
    }, [debouncedQuery]);

    const handleSearch = (e) => {
        e.preventDefault();
        setIsDropdownOpen(false);
        if (onSearchSubmit) {
            onSearchSubmit(searchQuery);
        }
    };

    const handleSelectResult = (slug) => {
        setIsDropdownOpen(false);
        setSearchQuery('');
        navigate(`/qa/${slug}`);
    };

    return (
        <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-100 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 gap-4">
                    <div className="flex items-center gap-3 shrink-0">
                        <a href="/" className="flex items-center gap-2">
                            <img
                                src={images.dark_logo}
                                alt="AdDeen Logo"
                                className="h-12 w-auto"
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.style.display = 'none';
                                }}
                            />
                            {/* <span className="text-xl font-bold text-slate-900 tracking-tight">
                                AdDeen<span className="text-teal-600">Web</span>
                            </span> */}
                        </a>
                    </div>

                    {/* Quick Header Search Input (Hidden on mobile, visible on desktop) */}
                    <div className="hidden md:flex flex-1 max-w-md relative">
                        <form onSubmit={handleSearch} className="w-full relative">
                            {isLoading ? (
                                <Loader2 className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-teal-600 animate-spin" />
                            ) : (
                                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            )}
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onFocus={() => searchQuery.trim() && setIsDropdownOpen(true)}
                                placeholder="প্রশ্ন বা বিষয় দিয়ে খুঁজুন..."
                                className="w-full pl-10 pr-4 py-2 bg-slate-100/80 hover:bg-slate-100 focus:bg-white rounded-xl border border-transparent focus:border-teal-500 focus:outline-none text-xs transition-all text-slate-800 placeholder-slate-400"
                            />
                        </form>

                        {/* Desktop Search Dropdown */}
                        {isDropdownOpen && (
                            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden z-50">
                                {isLoading ? (
                                    <div className="flex items-center justify-center gap-2 py-6 text-xs text-slate-500">
                                        <Loader2 className="w-4 h-4 text-teal-600 animate-spin" />
                                        <span>অনুসন্ধান করা হচ্ছে...</span>
                                    </div>
                                ) : searchResults.length > 0 ? (
                                    <div className="max-h-80 overflow-y-auto divide-y divide-slate-50">
                                        {searchResults.map((item) => (
                                            <div
                                                key={item.id}
                                                onClick={() => handleSelectResult(item.slug)}
                                                className="p-3.5 hover:bg-slate-50 cursor-pointer transition-colors flex flex-col gap-1"
                                            >
                                                <div className="flex items-center justify-between text-[10px] text-slate-400">
                                                    <span className="bg-teal-50 text-teal-700 px-2 py-0.5 rounded font-medium">
                                                        {item.category}
                                                    </span>
                                                    <span>{item.date}</span>
                                                </div>
                                                <h4 className="text-xs font-semibold text-slate-800 line-clamp-1 hover:text-teal-600">
                                                    {item.title}
                                                </h4>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="p-6 text-center text-xs text-slate-500 flex flex-col items-center gap-2">
                                        <BookOpen className="w-6 h-6 text-slate-300" />
                                        <span>কোনো ফলাফল পাওয়া যায়নি</span>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center gap-6 text-xs font-semibold text-slate-600">
                        <a href="#qa" className="hover:text-teal-600 transition-colors">প্রশ্ন ও উত্তর</a>
                        <a href="#articles" className="hover:text-teal-600 transition-colors">আর্টিকেল</a>
                        <a href="#library" className="hover:text-teal-600 transition-colors">বই ও লাইব্রেরি</a>
                        <a href="#about" className="hover:text-teal-600 transition-colors">আমাদের সম্পর্কে</a>
                    </nav>

                    {/* Ask Question CTA */}
                    <div className="hidden sm:flex items-center gap-3 shrink-0">
                        <button
                            onClick={onAskQuestionClick}
                            className="bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition-all shadow-sm shadow-teal-200 flex items-center gap-1.5 active:scale-95"
                        >
                            <HelpCircle className="w-4 h-4" />
                            প্রশ্ন করুন
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="lg:hidden flex items-center gap-2">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
                            aria-label="Toggle Navigation Menu"
                        >
                            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Dropdown Menu */}
            {isMenuOpen && (
                <div className="lg:hidden bg-white border-b border-slate-100 px-4 pt-3 pb-5 space-y-3">
                    {/* Mobile Search Bar */}
                    <div className="relative">
                        <form onSubmit={handleSearch} className="relative">
                            {isLoading ? (
                                <Loader2 className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-teal-600 animate-spin" />
                            ) : (
                                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            )}
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onFocus={() => searchQuery.trim() && setIsDropdownOpen(true)}
                                placeholder="প্রশ্ন বা বিষয় দিয়ে খুঁজুন..."
                                className="w-full pl-10 pr-4 py-2.5 bg-slate-100 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
                            />
                        </form>

                        {/* Mobile Search Dropdown */}
                        {isDropdownOpen && (
                            <div className="mt-2 bg-white rounded-xl shadow-lg border border-slate-100 overflow-hidden z-50">
                                {isLoading ? (
                                    <div className="flex items-center justify-center gap-2 py-4 text-xs text-slate-500">
                                        <Loader2 className="w-4 h-4 text-teal-600 animate-spin" />
                                        <span>অনুসন্ধান করা হচ্ছে...</span>
                                    </div>
                                ) : searchResults.length > 0 ? (
                                    <div className="max-h-60 overflow-y-auto divide-y divide-slate-50">
                                        {searchResults.map((item) => (
                                            <div
                                                key={item.id}
                                                onClick={() => {
                                                    setIsMenuOpen(false);
                                                    handleSelectResult(item.slug);
                                                }}
                                                className="p-3 hover:bg-slate-50 cursor-pointer transition-colors"
                                            >
                                                <h4 className="text-xs font-semibold text-slate-800 line-clamp-1">
                                                    {item.title}
                                                </h4>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="p-4 text-center text-xs text-slate-500">
                                        কোনো ফলাফল পাওয়া যায়নি
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    <nav className="flex flex-col space-y-2 text-xs font-semibold text-slate-700 pt-2">
                        <a href="#qa" onClick={() => setIsMenuOpen(false)} className="py-2 px-2 hover:bg-slate-50 rounded-lg">প্রশ্ন ও উত্তর</a>
                        <a href="#articles" onClick={() => setIsMenuOpen(false)} className="py-2 px-2 hover:bg-slate-50 rounded-lg">আর্টিকেল</a>
                        <a href="#library" onClick={() => setIsMenuOpen(false)} className="py-2 px-2 hover:bg-slate-50 rounded-lg">বই ও লাইব্রেরি</a>
                        <a href="#about" onClick={() => setIsMenuOpen(false)} className="py-2 px-2 hover:bg-slate-50 rounded-lg">আমাদের সম্পর্কে</a>
                    </nav>

                    <button
                        onClick={() => {
                            setIsMenuOpen(false);
                            if (onAskQuestionClick) onAskQuestionClick();
                        }}
                        className="w-full mt-2 bg-teal-600 text-white font-semibold py-2.5 rounded-xl text-xs flex items-center justify-center gap-2 shadow-sm"
                    >
                        <HelpCircle className="w-4 h-4" />
                        প্রশ্ন করুন
                    </button>
                </div>
            )}
        </header>
    );
}