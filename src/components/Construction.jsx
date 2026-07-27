import React from 'react';
import { HardHat, Sparkles } from 'lucide-react';

export default function Construction() {
    return (
        <div className="bg-amber-500/10 border-b border-amber-500/20 text-amber-900 py-2.5 px-4 text-xs md:text-sm font-medium">
            <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 text-center flex-wrap">
                <span className="inline-flex items-center gap-1.5 bg-amber-500 text-white text-[11px] font-bold px-2 py-0.5 rounded-full shadow-sm">
                    <HardHat className="w-3.5 h-3.5" />
                    চলমান কাজ
                </span>

                <span>
                    আমাদের ওয়েবসাইটটির উন্নয়নমূলক কাজ চলছে। যেকোনো ফিডব্যাক বা পরামর্শ দিতে আমাদের সাথে যোগাযোগ করুন।
                </span>

                <span className="hidden sm:inline-flex items-center gap-1 text-amber-700 font-semibold text-xs">
                    <Sparkles className="w-3.5 h-3.5" /> শীঘ্রই পূর্ণাঙ্গ ভার্সন আসছে!
                </span>
            </div>
        </div>
    );
}