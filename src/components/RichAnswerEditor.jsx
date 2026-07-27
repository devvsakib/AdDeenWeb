import React from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TextAlign from '@tiptap/extension-text-align';
import Underline from '@tiptap/extension-underline';
import {
    Bold,
    Italic,
    Underline as UnderlineIcon,
    Strikethrough,
    Heading1,
    Heading2,
    Heading3,
    List,
    ListOrdered,
    Quote,
    Code,
    Minus,
    RotateCcw,
    RotateCw,
    RemoveFormatting,
    AlignLeft,
    AlignCenter,
    AlignRight,
    BookOpen,
} from 'lucide-react';

export default function RichAnswerEditor({ onChange, onSave, initialContent = '' }) {
    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                heading: {
                    levels: [1, 2, 3],
                },
            }),
            Underline,
            TextAlign.configure({
                types: ['heading', 'paragraph'],
            }),
        ],
        content: initialContent || `<h2>সফর অবস্থায় কাজা নামাজের বিধান</h2>
<p>যদি কোনো ব্যক্তি সফরের অবস্থায় ৪ রাকাত বিশিষ্ট ফরজ নামাজ কাজা করে, তবে দেশে ফেরার পরেও তা ২ রাকাত (কসর) হিসেবেই আদায় করতে হবে।</p>
<p><strong>দলিলস্বরূপ হাদিস:</strong></p>
<blockquote dir="rtl" class="arabic-quote">عَنْ عَائِشَةَ رَضِيَ اللَّهُ عَنْهَا قَالَتْ: «فُرِضَتِ الصَّلاَةُ رَكْعَتَيْنِ رَكْعَتَيْنِ فِي الْحَضَرِ وَالسَّفَرِ، فَأُقِرَّتْ صَلاَةُ السَّفَرِ وَزِيدَ فِي صَلاَةِ الْحَضَرِ»</blockquote>
<p><strong>অর্থ:</strong> হযরত আয়েশا (রা.) হতে বর্ণিত, তিনি বলেন: প্রথমে নামাজ দুই দুই রাকাত ফরজ হয়েছিল...</p>`,
        editorProps: {
            attributes: {

                class: 'prose max-w-none focus:outline-none min-h-[260px] p-4 text-slate-800 leading-relaxed',
            },
        },

        onUpdate: ({ editor }) => {
            if (onChange) {
                onChange(editor.getHTML());
            }
        },
    });

    if (!editor) return null;


    const insertArabicQuote = () => {
        editor
            .chain()
            .focus()
            .toggleBlockquote()
            .setTextAlign('right')
            .run();
    };

    return (
        <div className="w-full bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden focus-within:border-teal-500 focus-within:ring-2 focus-within:ring-teal-500/20 transition-all">
            {/* Editor Toolbar */}
            <div className="flex flex-wrap items-center gap-1 p-2 bg-slate-50 border-b border-slate-200 text-slate-700 select-none">

                {/* History */}
                <button
                    type="button"
                    onClick={() => editor.chain().focus().undo().run()}
                    disabled={!editor.can().undo()}
                    className="p-1.5 rounded-lg hover:bg-slate-200 disabled:opacity-30 disabled:hover:bg-transparent"
                    title="Undo (পূর্বাবস্থায় ফিরুন)"
                >
                    <RotateCcw className="w-4 h-4" />
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().redo().run()}
                    disabled={!editor.can().redo()}
                    className="p-1.5 rounded-lg hover:bg-slate-200 disabled:opacity-30 disabled:hover:bg-transparent"
                    title="Redo"
                >
                    <RotateCw className="w-4 h-4" />
                </button>

                <div className="w-px h-5 bg-slate-300 mx-1" />

                {/* Headings */}
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                    className={`p-1.5 rounded-lg transition-colors ${editor.isActive('heading', { level: 1 })
                        ? 'bg-teal-100 text-teal-800 font-bold'
                        : 'hover:bg-slate-200'
                        }`}
                    title="Heading 1"
                >
                    <Heading1 className="w-4 h-4" />
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                    className={`p-1.5 rounded-lg transition-colors ${editor.isActive('heading', { level: 2 })
                        ? 'bg-teal-100 text-teal-800 font-bold'
                        : 'hover:bg-slate-200'
                        }`}
                    title="Heading 2"
                >
                    <Heading2 className="w-4 h-4" />
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                    className={`p-1.5 rounded-lg transition-colors ${editor.isActive('heading', { level: 3 })
                        ? 'bg-teal-100 text-teal-800 font-bold'
                        : 'hover:bg-slate-200'
                        }`}
                    title="Heading 3"
                >
                    <Heading3 className="w-4 h-4" />
                </button>

                <div className="w-px h-5 bg-slate-300 mx-1" />

                {/* Inline Formatting */}
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    className={`p-1.5 rounded-lg transition-colors ${editor.isActive('bold') ? 'bg-teal-100 text-teal-800 font-bold' : 'hover:bg-slate-200'
                        }`}
                    title="Bold (গাঢ়)"
                >
                    <Bold className="w-4 h-4" />
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    className={`p-1.5 rounded-lg transition-colors ${editor.isActive('italic') ? 'bg-teal-100 text-teal-800 font-bold' : 'hover:bg-slate-200'
                        }`}
                    title="Italic (বাঁকা)"
                >
                    <Italic className="w-4 h-4" />
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleUnderline().run()}
                    className={`p-1.5 rounded-lg transition-colors ${editor.isActive('underline') ? 'bg-teal-100 text-teal-800 font-bold' : 'hover:bg-slate-200'
                        }`}
                    title="Underline"
                >
                    <UnderlineIcon className="w-4 h-4" />
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleStrike().run()}
                    className={`p-1.5 rounded-lg transition-colors ${editor.isActive('strike') ? 'bg-teal-100 text-teal-800 font-bold' : 'hover:bg-slate-200'
                        }`}
                    title="Strikethrough"
                >
                    <Strikethrough className="w-4 h-4" />
                </button>

                <div className="w-px h-5 bg-slate-300 mx-1" />

                {/* Lists & Blocks */}
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    className={`p-1.5 rounded-lg transition-colors ${editor.isActive('bulletList') ? 'bg-teal-100 text-teal-800' : 'hover:bg-slate-200'
                        }`}
                    title="Bullet List"
                >
                    <List className="w-4 h-4" />
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    className={`p-1.5 rounded-lg transition-colors ${editor.isActive('orderedList') ? 'bg-teal-100 text-teal-800' : 'hover:bg-slate-200'
                        }`}
                    title="Numbered List"
                >
                    <ListOrdered className="w-4 h-4" />
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleBlockquote().run()}
                    className={`p-1.5 rounded-lg transition-colors ${editor.isActive('blockquote') ? 'bg-teal-100 text-teal-800' : 'hover:bg-slate-200'
                        }`}
                    title="Standard Quote"
                >
                    <Quote className="w-4 h-4" />
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().setHorizontalRule().run()}
                    className="p-1.5 rounded-lg hover:bg-slate-200"
                    title="Divider Line"
                >
                    <Minus className="w-4 h-4" />
                </button>

                <div className="w-px h-5 bg-slate-300 mx-1" />

                {/* Text Alignment */}
                <button
                    type="button"
                    onClick={() => editor.chain().focus().setTextAlign('left').run()}
                    className="p-1.5 rounded-lg hover:bg-slate-200"
                    title="Align Left"
                >
                    <AlignLeft className="w-4 h-4" />
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().setTextAlign('center').run()}
                    className="p-1.5 rounded-lg hover:bg-slate-200"
                    title="Align Center"
                >
                    <AlignCenter className="w-4 h-4" />
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().setTextAlign('right').run()}
                    className="p-1.5 rounded-lg hover:bg-slate-200"
                    title="Align Right (RTL)"
                >
                    <AlignRight className="w-4 h-4" />
                </button>

                <div className="w-px h-5 bg-slate-300 mx-1" />

                {/* Clear formatting */}
                <button
                    type="button"
                    onClick={() => editor.chain().focus().unsetAllMarks().clearNodes().run()}
                    className="p-1.5 rounded-lg hover:bg-slate-200 text-slate-500 hover:text-red-600"
                    title="Clear Formatting"
                >
                    <RemoveFormatting className="w-4 h-4" />
                </button>

                {/* Special Arabic Reference Button */}
                <button
                    type="button"
                    onClick={insertArabicQuote}
                    className="flex items-center gap-1 px-3 py-1 bg-amber-50 hover:bg-amber-100 text-amber-800 rounded-lg text-xs font-semibold border border-amber-200 transition-colors ml-auto shadow-sm"
                    title="আরবি আয়াত/হাদিস ব্লক যোগ করুন"
                >
                    <BookOpen className="w-3.5 h-3.5 text-amber-700" />
                    <span>আরবি উদ্ধৃতি</span>
                </button>
            </div>

            {/* Editor Main Content Area */}
            <EditorContent editor={editor} />

            {/* Footer / Save Action */}
            <div className="p-3 bg-slate-50 border-t border-slate-200 flex justify-between items-center text-xs text-slate-500">
                <span>শব্দ সংখ্যা: {editor.getText().trim().split(/\s+/).filter(Boolean).length}</span>
                {onSave && (
                    <button
                        type="button"
                        onClick={() => onSave(editor.getHTML())}
                        className="bg-teal-600 hover:bg-teal-700 text-white font-bold px-5 py-2 rounded-xl transition-all shadow-sm active:scale-95"
                    >
                        সংরক্ষণ করুন
                    </button>
                )}
            </div>
        </div>
    );
}