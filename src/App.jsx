import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import QnaDetailPage from './pages/QnaDetailPage';
import AskQuestionModal from './components/AskQuestionModal';
import ContactSection from './components/ContactSection';
import { useBookmarks } from './hooks/useBookmarks';
import SavedDrawer from './components/SavedDrawer';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('সব');
  const [isAskModalOpen, setIsAskModalOpen] = useState(false);
  const [isSavedDrawerOpen, setIsSavedDrawerOpen] = useState(false);

  const { bookmarks, toggleBookmark } = useBookmarks();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans text-slate-800">

      <div className="bg-teal-900 text-teal-100 py-2 px-4 text-center text-xs md:text-sm">
        <p className="max-w-5xl mx-auto flex items-center justify-center gap-2 flex-wrap">
          <span dir="rtl" className="font-semibold text-teal-300 text-sm md:text-base">
            وَقُلْ رَبِّ زِدْنِي عِلْمًا
          </span>
          <span className="opacity-80">|</span>
          <span>"বলুন, হে আমার পালনকর্তা! আমার জ্ঞান বৃদ্ধি করুন।" (সূরা তহা: ১১৪)</span>
        </p>
      </div>

      <Header
        savedCount={bookmarks.length}
        onOpenSaved={() => setIsSavedDrawerOpen(true)}
        onSearchSubmit={setSearchQuery}
        onAskQuestionClick={() => setIsAskModalOpen(true)} />
      <SavedDrawer
        isOpen={isSavedDrawerOpen}
        onClose={() => setIsSavedDrawerOpen(false)}
        bookmarks={bookmarks}
        onRemove={toggleBookmark}
      />
      <AskQuestionModal
        isOpen={isAskModalOpen}
        onClose={() => setIsAskModalOpen(false)}
      />
      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
          }
        />
        <Route path="/qa/:slug" element={<QnaDetailPage />} />
      </Routes>
      <ContactSection onAskQuestionClick={() => setIsAskModalOpen(true)} />
      <Footer />
    </div>
  );
}