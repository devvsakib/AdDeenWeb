import React from 'react';

export default function CategoryNav({ categories, selectedCategory, onSelectCategory }) {
    return (
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
            {categories.map((cat, idx) => {
                const isActive = selectedCategory === cat;
                return (
                    <button
                        key={idx}
                        type="button"
                        onClick={() => onSelectCategory(cat)}
                        className={`px-4 py-2 rounded-xl text-xs md:text-sm font-medium whitespace-nowrap transition-all active:scale-95 ${isActive
                                ? 'bg-teal-600 text-white shadow-md shadow-teal-200'
                                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-100'
                            }`}
                    >
                        {cat}
                    </button>
                );
            })}
        </div>
    );
}