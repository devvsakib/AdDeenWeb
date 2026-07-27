import React from 'react';
import { X, Bookmark, Trash2, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function SavedDrawer({ isOpen, onClose, bookmarks, onRemove }) {
    const navigate = useNavigate();

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/40 backdrop-blur-sm animate-fadeIn">
            <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
                <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">

                    {/* Drawer Header */}
                    <div className="p-4 sm:p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                        <div className="flex items-center gap-2">
                            <div className="p-2 bg-amber-50 text-amber-600 rounded-xl">
                                <Bookmark className="w-5 h-5 fill-amber-500" />
                            </div>
                            <div>
                                <h3 className="text-sm font-bold text-slate-800">সংরক্ষিত প্রশ্নাবলি</h3>
                                <p className="text-[11px] text-slate-500">{bookmarks.length} টি প্রশ্ন সেভ করা আছে</p>
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Drawer Content */}
                    <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3 divide-y divide-slate-50">
                        {bookmarks.length === 0 ? (
                            <div className="text-center py-12 text-slate-400 flex flex-col items-center gap-2">
                                <Bookmark className="w-8 h-8 stroke-1 text-slate-300" />
                                <p className="text-xs">আপনার কোনো সংরক্ষিত প্রশ্ন নেই</p>
                            </div>
                        ) : (
                            bookmarks.map((item) => (
                                <div key={item.id} className="pt-3 first:pt-0 flex items-start justify-between gap-3 group">
                                    <div
                                        onClick={() => {
                                            onClose();
                                            navigate(`/qa/${item.slug || item.id}`);
                                        }}
                                        className="cursor-pointer space-y-1 flex-1"
                                    >
                                        <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-medium">
                                            {item.category}
                                        </span>
                                        <h4 className="text-xs font-semibold text-slate-800 group-hover:text-teal-600 line-clamp-2 transition-colors">
                                            {item.title}
                                        </h4>
                                    </div>
                                    <button
                                        onClick={() => onRemove(item)}
                                        className="p-1.5 text-slate-300 hover:text-rose-500 rounded-lg transition-colors shrink-0"
                                        title="মুছে ফেলুন"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            ))
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
}