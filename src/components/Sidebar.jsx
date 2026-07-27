import React from 'react';
import { BookOpen } from 'lucide-react';

export default function Sidebar({ onAskQuestionClick }) {
    const articles = [
        {
            title: "তাক্বওয়া অর্জনের ব্যবহারিক উপায় ও ফজিলত",
            readTime: "৪ মিনিট"
        },
        {
            title: "সহীহ সুন্নাহর আলোকে দৈনন্দিন জিকির ও দু'আ",
            readTime: "৬ মিনিট"
        },
        {
            title: "হালাল উপার্জনের গুরুত্ব ও আধুনিক ব্যবসায়িক সতর্কতা",
            readTime: "৫ মিনিট"
        }
    ];

    return (
        <aside className="space-y-6">
            <div className="bg-gradient-to-br from-teal-700 to-teal-900 text-white p-6 rounded-2xl shadow-sm">
                <h3 className="text-lg font-bold mb-2">আপনার কি কোনো প্রশ্ন আছে?</h3>
                <p className="text-xs text-teal-100 leading-relaxed mb-4">
                    আমাদের ফতোয়া বোর্ডে আপনার জিজ্ঞাসা জমা দিন। বিজ্ঞ আলেমদের যাচাইকরণের পর উত্তর প্রদান করা হবে।[cite: 1]
                </p>
                <button
                    onClick={onAskQuestionClick}
                    className="w-full bg-white text-teal-900 hover:bg-teal-50 font-bold text-xs md:text-sm py-2.5 rounded-xl transition-all shadow-md active:scale-95"
                >
                    প্রশ্ন জমা দিন
                </button>
            </div>

            <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm">
                <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2 text-sm">
                    <BookOpen className="w-4 h-4 text-teal-600" />
                    গবেষণাধর্মী আর্টিকেল
                </h3>

                <div className="space-y-3">
                    {articles.map((art, idx) => (
                        <React.Fragment key={idx}>
                            <a href="#" className="block group">
                                <h4 className="text-xs font-semibold text-slate-800 group-hover:text-teal-600 transition-colors">
                                    {art.title}
                                </h4>
                                <span className="text-[10px] text-slate-400">পাঠ সময়: {art.readTime}</span>
                            </a>
                            {idx < articles.length - 1 && <hr className="border-slate-100" />}
                        </React.Fragment>
                    ))}
                </div>
            </div>
        </aside>
    );
}