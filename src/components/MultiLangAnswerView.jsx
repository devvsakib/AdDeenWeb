import React, { useState } from 'react';
import { Globe, BookOpen } from 'lucide-react';

export default function MultiLangAnswerView({ answerData }) {
    // answerData object contains contents for different languages
    // e.g., { bn: "<p>বাংলা উত্তর...</p>", ar: "<p>الجواب بالعربية...</p>", ur: "<p>جواب اردو میں...</p>" }

    const [currentLang, setCurrentLang] = useState('bn');

    return (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-6">

            {/* Language Switching Header */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center gap-2 text-slate-700 font-bold text-sm">
                    <BookOpen className="w-5 h-5 text-teal-600" />
                    <span>উত্তর (Answer)</span>
                </div>

                {/* Language Tabs */}
                <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs font-semibold">
                    {answerData?.bn && (
                        <button
                            onClick={() => setCurrentLang('bn')}
                            className={`px-3 py-1.5 rounded-lg transition-all ${currentLang === 'bn' ? 'bg-teal-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
                                }`}
                        >
                            বাংলা
                        </button>
                    )}

                    {answerData?.ar && (
                        <button
                            onClick={() => setCurrentLang('ar')}
                            className={`px-3 py-1.5 rounded-lg transition-all font-serif ${currentLang === 'ar' ? 'bg-teal-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
                                }`}
                        >
                            العربية
                        </button>
                    )}

                    {answerData?.ur && (
                        <button
                            onClick={() => setCurrentLang('ur')}
                            className={`px-3 py-1.5 rounded-lg transition-all font-serif ${currentLang === 'ur' ? 'bg-teal-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
                                }`}
                        >
                            اردو
                        </button>
                    )}
                </div>
            </div>

            {/* Rendered HTML Content based on Selected Language */}
            <div
                dir={currentLang === 'ar' || currentLang === 'ur' ? 'rtl' : 'ltr'}
                className={`prose max-w-none text-slate-800 leading-relaxed ${currentLang === 'ar' || currentLang === 'ur'
                        ? 'text-right font-serif text-lg leading-loose bg-slate-50/50 p-6 rounded-2xl border border-slate-100'
                        : 'text-left text-sm md:text-base'
                    }`}
                dangerouslySetInnerHTML={{ __html: answerData[currentLang] || answerData.bn }}
            />
        </div>
    );
}