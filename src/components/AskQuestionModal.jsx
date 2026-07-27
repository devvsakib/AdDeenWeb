import React, { useState } from 'react';
import { X, Send, HelpCircle, Loader2, CheckCircle2 } from 'lucide-react';

export default function AskQuestionModal({ isOpen, onClose }) {
    const [formData, setFormData] = useState({
        title: '',
        category: 'আকীদাহ ও ঈমান',
        details: '',
        email: '',
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    if (!isOpen) return null;

    const categories = [
        'আকীদাহ ও ঈমান',
        'নামাজ ও পবিত্রতা',
        'রোজা ও যাকাত',
        'হজ ও উমরাহ',
        'পারিবারিক ও বিবাহ',
        'লেনদেন ও ব্যবসা',
        'অন্যান্য',
    ];

    const validateForm = () => {
        const newErrors = {};
        if (!formData.title.trim()) {
            newErrors.title = 'প্রশ্নের শিরোনাম আবশ্যক';
        } else if (formData.title.length < 10) {
            newErrors.title = 'শিরোনাম অন্তত ১০ অক্ষরের হতে হবে';
        }

        if (!formData.details.trim()) {
            newErrors.details = 'বিস্তারিত বিবরণ দিন';
        } else if (formData.details.length < 20) {
            newErrors.details = 'বিস্তারিত বিবরণ অন্তত ২০ অক্ষরের হতে হবে';
        }

        if (!formData.email) {
            newErrors.email = 'ইমেইল আবশ্যক';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmitDirectly = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setLoading(true);

        try {
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({
                    access_key: import.meta.env.VITE_FORM_API,
                    subject: `[AdDeen Question] ${formData.title}`,
                    from_name: 'AdDeen Platform User',
                    to_email: 'addeenweb@gmail.com',
                    category: formData.category,
                    question_title: formData.title,
                    details: formData.details,
                    user_email: formData.email || 'Not Provided',
                }),
            });

            const result = await response.json();

            if (result.success) {
                setSubmitted(true);
                setTimeout(() => {
                    setSubmitted(false);
                    setFormData({ title: '', category: 'আকীদাহ ও ঈমান', details: '', email: '' });
                    onClose();
                }, 2000);
            } else {
                alert('ইমেইল পাঠাতে সমস্যা হয়েছে, আবার চেষ্টা করুন।');
            }
        } catch (err) {
            alert('নেটওয়ার্ক সমস্যা! পরে চেষ্টা করুন।');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden">

                <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
                    <div className="flex items-center gap-2">
                        <div className="p-2 bg-teal-50 text-teal-600 rounded-xl">
                            <HelpCircle className="w-5 h-5" />
                        </div>
                        <div>
                            <h3 className="text-sm font-bold text-slate-800">নতুন প্রশ্ন জমা দিন</h3>
                            <p className="text-[11px] text-slate-500">আপনার প্রশ্নটি সংক্ষিপ্ত ও সুস্পষ্টভাবে লিখুন</p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {submitted ? (
                    <div className="p-8 text-center flex flex-col items-center justify-center space-y-3">
                        <CheckCircle2 className="w-12 h-12 text-teal-600 animate-bounce" />
                        <h4 className="text-base font-bold text-slate-800">প্রশ্নটি সফলভাবে পাঠানো হয়েছে!</h4>
                        <p className="text-xs text-slate-500">আপনার ইমেইলটি addeenweb@gmail.com-এ পৌছে গেছে।</p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmitDirectly} className="p-6 space-y-4">

                        <div>
                            <label className="block text-xs font-semibold text-slate-700 mb-1">
                                প্রশ্নের বিষয়/শিরোনাম <span className="text-rose-500">*</span>
                            </label>
                            <input
                                type="text"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                placeholder="যেমন: সফর অবস্থায় কাজা নামাজ কীভাবে পড়ব?"
                                className={`w-full px-3.5 py-2.5 bg-slate-50 border ${errors.title ? 'border-rose-400' : 'border-slate-200 focus:border-teal-500'
                                    } rounded-xl text-xs text-slate-800 focus:outline-none transition-all`}
                            />
                            {errors.title && <p className="text-[11px] text-rose-500 mt-1">{errors.title}</p>}
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-slate-700 mb-1">ক্যাটাগরি</label>
                            <select
                                value={formData.category}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none transition-all"
                            >
                                {categories.map((cat, idx) => (
                                    <option key={idx} value={cat}>
                                        {cat}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-slate-700 mb-1">
                                বিস্তারিত বিবরণ <span className="text-rose-500">*</span>
                            </label>
                            <textarea
                                rows={4}
                                value={formData.details}
                                onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                                placeholder="আপনার অবস্থা বা মূল প্রশ্ন বিস্তারিত লিখুন..."
                                className={`w-full px-3.5 py-2.5 bg-slate-50 border ${errors.details ? 'border-rose-400' : 'border-slate-200 focus:border-teal-500'
                                    } rounded-xl text-xs text-slate-800 focus:outline-none transition-all resize-none`}
                            />
                            {errors.details && <p className="text-[11px] text-rose-500 mt-1">{errors.details}</p>}
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-slate-700 mb-1">
                                আপনার ইমেইল <span className="text-rose-500">*</span> <span className="text-slate-400 font-normal">(উত্তর পাওয়ার জন্য)</span>
                            </label>
                            <input
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                placeholder="yourname@example.com"
                                className={`w-full px-3.5 py-2.5 bg-slate-50 border ${errors.title ? 'border-rose-400' : 'border-slate-200 focus:border-teal-500'
                                    } rounded-xl text-xs text-slate-800 focus:outline-none transition-all`}
                            />
                            {errors.email && <p className="text-[11px] text-rose-500 mt-1">{errors.email}</p>}
                        </div>

                        <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
                            >
                                বাতিল
                            </button>
                            <button
                                type="submit"
                                disabled={loading}
                                className="bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold px-5 py-2.5 rounded-xl transition-all shadow-sm shadow-teal-200 flex items-center gap-2 active:scale-95 disabled:opacity-50"
                            >
                                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                                পাঠান
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
}