import React from 'react';
import { Heart } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-white border-t border-slate-100 text-xs text-slate-500 mt-16 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-1.5">
                    <span>© 2026 AdDeenWeb. সর্বস্বত্ব সংরক্ষিত।</span>
                    <span className="hidden sm:inline">•</span>
                    <span className="hidden sm:inline-flex items-center gap-1 text-slate-400">
                        Built with <Heart className="w-3 h-3 text-red-500 fill-red-500" /> for Ummah
                    </span>
                </div>

                <div className="flex items-center gap-6">
                    <a href="#privacy" className="hover:text-teal-600 transition-colors">গোপনীয়তা নীতি</a>
                    <a href="#terms" className="hover:text-teal-600 transition-colors">ব্যবহারের শর্তাবলী</a>
                    <a href="#contact" className="hover:text-teal-600 transition-colors">যোগাযোগ</a>
                </div>
            </div>
        </footer>
    );
}