import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useTheme } from '../../contexts/ThemeContext';

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  editPost?: {
    id: string;
    title: string;
    content: string;
    category: string;
    badge: string;
  };
  onSave?: (post: { id?: string; title: string; content: string; category: string; badge: string }) => void;
}

const CATEGORIES = [
  { id: 'akademik', label: 'Akademik' },
  { id: 'sosyal', label: 'Sosyal' },
  { id: 'yeme-icme', label: 'Yeme-İçme' },
  { id: 'barinma', label: 'Barınma' },
  { id: 'ikinci-el', label: 'İkinci El' },
];

export const CreatePostModal = ({ isOpen, onClose, editPost, onSave }: CreatePostModalProps) => {
  const { isDarkMode } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState(editPost?.category || 'akademik');
  const [title, setTitle] = useState(editPost?.title || '');
  const [content, setContent] = useState(editPost?.content || '');
  const [windowWidth, setWindowWidth] = useState(0);

  // Update form when editPost changes
  useEffect(() => {
    if (editPost) {
      setTitle(editPost.title);
      setContent(editPost.content);
      setSelectedCategory(editPost.category);
    } else {
      setTitle('');
      setContent('');
      setSelectedCategory('akademik');
    }
  }, [editPost]);
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setWindowWidth(window.innerWidth);
      const handleResize = () => setWindowWidth(window.innerWidth);
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  // Disable body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleSubmit = () => {
    const categoryToBadge: Record<string, string> = {
      'akademik': 'Akademik',
      'sosyal': 'Sosyal',
      'yeme-icme': 'Yeme-İçme',
      'barinma': 'Barınma',
      'ikinci-el': 'İkinci El',
    };
    
    if (editPost && onSave) {
      // Edit mode
      onSave({
        id: editPost.id,
        title,
        content,
        category: selectedCategory,
        badge: categoryToBadge[selectedCategory] || 'Akademik'
      });
    } else if (onSave) {
      // Create mode
      onSave({
        title,
        content,
        category: selectedCategory,
        badge: categoryToBadge[selectedCategory] || 'Akademik'
      });
    } else {
      console.log('📝 Post Created:', { title, content, category: selectedCategory });
    }
    // Reset form
    setTitle('');
    setContent('');
    setSelectedCategory('akademik');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[59] bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className={`fixed inset-4 lg:inset-auto lg:top-[84px] 
              lg:w-[792px] lg:max-h-[700px] z-[60] rounded-[16px] flex flex-col shadow-2xl ${
              isDarkMode ? 'bg-[#1a1a2e]' : 'bg-white'
            }`}
            style={{
              left: windowWidth >= 1200 
                ? 'calc((100% - 1200px) / 2 + 24px)' 
                : undefined,
              transform: windowWidth >= 1200 
                ? 'none' 
                : 'translate(-50%, -50%)',
            } as React.CSSProperties}
          >
            {/* Header */}
            <header className={`px-6 py-5 flex items-center justify-between border-b ${
              isDarkMode ? 'border-slate-700' : 'border-gray-200'
            }`}>
              <h2 className={`font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {editPost ? 'Postu Düzenle' : 'Sohbet Başlat'}
              </h2>
              <button 
                onClick={onClose}
                className={`p-2 rounded-full transition-colors ${
                  isDarkMode 
                    ? 'hover:bg-slate-800 text-slate-400' 
                    : 'hover:bg-gray-100 text-gray-600'
                }`}
              >
                <X className="w-5 h-5" strokeWidth={2.5} />
              </button>
            </header>

            {/* Content */}
            <div className="flex-1 px-6 py-5 overflow-y-auto space-y-5">
              
              {/* Step 1: Başlık */}
              <div>
                <label className={`block text-xs font-bold uppercase tracking-wide mb-2 ${
                  isDarkMode ? 'text-slate-400' : 'text-gray-600'
                }`}>
                  1. Başlık Yaz
                </label>
                <input
                  type="text"
                  placeholder="Başlığı buraya yaz..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className={`w-full px-4 py-3 rounded-lg border-2 font-semibold transition-all outline-none ${
                    isDarkMode 
                      ? 'bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 focus:border-[#5852c4]' 
                      : 'bg-white border-gray-200 text-gray-900 placeholder:text-gray-400 focus:border-[#5852c4]'
                  }`}
                />
              </div>

              {/* Step 2: Kategori Seç */}
              <div>
                <label className={`block text-xs font-bold uppercase tracking-wide mb-3 ${
                  isDarkMode ? 'text-slate-400' : 'text-gray-600'
                }`}>
                  2. Kategori Seç
                </label>
                <div className="flex flex-wrap gap-2">
                  {CATEGORIES.map((cat) => {
                    const isSelected = selectedCategory === cat.id;
                    return (
                      <button
                        key={cat.id}
                        onClick={() => setSelectedCategory(cat.id)}
                        className={`px-4 py-2.5 rounded-lg font-bold transition-all ${
                          isSelected 
                            ? 'bg-[#5852c4] text-white shadow-lg shadow-[#5852c4]/20' 
                            : isDarkMode
                              ? 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {cat.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 3: Sohbet İçeriği */}
              <div>
                <label className={`block text-xs font-bold uppercase tracking-wide mb-2 ${
                  isDarkMode ? 'text-slate-400' : 'text-gray-600'
                }`}>
                  3. Sohbet İçeriğini Yaz
                </label>
                <textarea
                  placeholder="Ne düşünüyorsun? Detayları buraya yaz..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className={`w-full px-4 py-3 rounded-lg border-2 resize-none min-h-[180px] transition-all outline-none ${
                    isDarkMode 
                      ? 'bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 focus:border-[#5852c4]' 
                      : 'bg-white border-gray-200 text-gray-900 placeholder:text-gray-400 focus:border-[#5852c4]'
                  }`}
                />
              </div>
            </div>

            {/* Footer */}
            <div className={`px-6 py-4 border-t ${
              isDarkMode ? 'border-slate-700' : 'border-gray-200'
            }`}>
              <button
                onClick={handleSubmit}
                disabled={!title.trim() || !content.trim()}
                className="w-full py-3.5 bg-[#5852c4] hover:bg-[#19142e] text-white font-bold rounded-lg 
                  transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-[#5852c4]/20"
              >
                {editPost ? 'Kaydet' : 'Paylaş'}
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
