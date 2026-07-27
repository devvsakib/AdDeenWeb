import React, { useState } from 'react';
import RichAnswerEditor from './RichAnswerEditor';

export default function EditorDemoPage() {
    const [liveHtml, setLiveHtml] = useState('');

    return (
        <div className="min-h-screen bg-slate-100 py-10 px-4 sm:px-6">
            <div className="max-w-4xl mx-auto space-y-8">

                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                    <h1 className="text-xl font-bold text-slate-900">
                        উন্নত ইসলামিক আর্টিকেলের রিচ টেক্সট এডিটর
                    </h1>
                    <p className="text-xs text-slate-500 mt-1">
                        ইনস্ট্যান্ট লাইভ প্রিভিউ, হেডলাইন সাপোর্ট এবং আরবি উদ্ধৃতি ফরম্যাটিং সুবিধা।
                    </p>
                </div>

                <div className="space-y-2">
                    <h2 className="text-xs font-bold text-slate-600 uppercase tracking-wider">
                        ১. এডিটর
                    </h2>
                    <RichAnswerEditor
                        onChange={(html) => setLiveHtml(html)}
                        onSave={(html) => alert('সংরক্ষণ সফল হয়েছে!')}
                    />
                </div>

                <div className="space-y-2">
                    <h2 className="text-xs font-bold text-slate-600 uppercase tracking-wider">
                        ২. রিয়েল-টাইম লাইভ প্রিভিউ
                    </h2>
                    <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm min-h-[150px]">
                        {liveHtml ? (
                            <div
                                className="prose max-w-none"
                                dangerouslySetInnerHTML={{ __html: liveHtml }}
                            />
                        ) : (
                            <p className="text-slate-400 text-sm italic">
                                এডিটরে কিছু লিখলেই এখানে সরাসরি লাইভ প্রিভিউ দেখা যাবে...
                            </p>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
}