import React from 'react';
import { Mail, Phone, MessageSquare, MapPin, Send, ExternalLink } from 'lucide-react';

export default function ContactSection({ onAskQuestionClick }) {
    const email = 'addeenweb@gmail.com';
    const phone = '01792552300';
    const formattedPhone = '+8801792552300';

    return (
        <section id="contact" className="py-16 bg-slate-50 border-t border-slate-100 mt-32">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="text-center max-w-2xl mx-auto mb-12">
                    <span className="bg-teal-50 text-teal-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                        যোগাযোগ
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-3">
                        আমাদের সাথে যুক্ত থাকুন
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-600 mt-2">
                        আপনার কোনো প্রশ্ন, পরামর্শ বা মতামত থাকলে সরাসরি আমাদের সাথে যোগাযোগ করতে পারেন।
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">

                    <a
                        href={`mailto:${email}?subject=Inquiry%20from%20AdDeenWeb`}
                        className="group bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:border-teal-200 transition-all flex flex-col items-center text-center"
                    >
                        <div className="p-3 bg-teal-50 text-teal-600 rounded-2xl group-hover:bg-teal-600 group-hover:text-white transition-colors mb-4">
                            <Mail className="w-6 h-6" />
                        </div>
                        <h3 className="text-sm font-bold text-slate-800">ইমেইল করুন</h3>
                        <p className="text-xs text-slate-500 mt-1 mb-3">{email}</p>
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-teal-600 group-hover:underline">
                            সরাসরি মেইল পাঠান <ExternalLink className="w-3 h-3" />
                        </span>
                    </a>

                    <a
                        href={`tel:${phone}`}
                        className="group bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:border-teal-200 transition-all flex flex-col items-center text-center"
                    >
                        <div className="p-3 bg-teal-50 text-teal-600 rounded-2xl group-hover:bg-teal-600 group-hover:text-white transition-colors mb-4">
                            <Phone className="w-6 h-6" />
                        </div>
                        <h3 className="text-sm font-bold text-slate-800">কল করুন</h3>
                        <p className="text-xs text-slate-500 mt-1 mb-3">{phone}</p>
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-teal-600 group-hover:underline">
                            সরাসরি কল দিন <ExternalLink className="w-3 h-3" />
                        </span>
                    </a>

                    <a
                        href={`https://wa.me/${formattedPhone.replace('+', '')}?text=আসসালামু%20আলাইকুম,%20আমি%20AdDeenWeb%20থেকে%20যোগাযোগ%20করছি।`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:border-teal-200 transition-all flex flex-col items-center text-center"
                    >
                        <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl group-hover:bg-emerald-600 group-hover:text-white transition-colors mb-4">
                            <MessageSquare className="w-6 h-6" />
                        </div>
                        <h3 className="text-sm font-bold text-slate-800">হোয়াটসঅ্যাপ মেসেজ</h3>
                        <p className="text-xs text-slate-500 mt-1 mb-3">{phone}</p>
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 group-hover:underline">
                            হোয়াটসঅ্যাপে চ্যাট করুন <ExternalLink className="w-3 h-3" />
                        </span>
                    </a>

                </div>

                <div className="bg-gradient-to-r from-teal-700 to-emerald-800 rounded-3xl p-8 sm:p-10 text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
                    <div className="space-y-2 text-center sm:text-left">
                        <h3 className="text-lg sm:text-xl font-bold">দ্বীন সংক্রান্ত কোনো প্রশ্ন আছে?</h3>
                        <p className="text-xs sm:text-sm text-teal-100 max-w-xl">
                            আমাদের প্ল্যাটফর্মে সরাসরি প্রশ্ন জমা দিন। আমাদের টিম অতি দ্রুত আপনার উত্তর প্রদান করার চেষ্টা করবে।
                        </p>
                    </div>
                    <button
                        onClick={onAskQuestionClick}
                        className="bg-white text-teal-800 hover:bg-teal-50 px-6 py-3 rounded-2xl font-bold text-xs sm:text-sm transition-all shadow-md shrink-0 flex items-center gap-2 active:scale-95"
                    >
                        <Send className="w-4 h-4 text-teal-600" />
                        প্রশ্ন জমা দিন
                    </button>
                </div>

            </div>
        </section>
    );
}