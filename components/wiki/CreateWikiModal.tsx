import React, { useState, useEffect } from 'react';
import { X, MapPin, Clock, DollarSign, Coffee, FileText, User, BookOpen, Paperclip, Home, Briefcase } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useTheme } from '../../contexts/ThemeContext';

interface WikiEntry {
  id: string;
  title: string;
  category: string;
  categoryId?: string;
  data: {
    type?: 'academic' | 'venue' | 'housing' | 'career' | 'general';
    fields: Array<{ icon?: React.ComponentType<any>; key: string; label: string; value: string; editable?: boolean }>;
  };
  lastEditedBy?: string;
  lastEditedAt?: string;
  version?: number;
  upvotes?: number;
  downvotes?: number;
  isOwnEntry?: boolean;
}

interface CreateWikiModalProps {
  isOpen: boolean;
  onClose: () => void;
  editEntry?: WikiEntry | null; // Edit mode için mevcut entry
  onSave?: (entry: WikiEntry) => void; // Optional callback for save
}

const WIKI_CATEGORIES = [
  { id: 'topluluk-onayli', label: 'Topluluk Onaylı', icon: MapPin },
  { id: 'akademik-destek', label: 'Akademik Destek', icon: FileText },
  { id: 'barinma-yasam', label: 'Barınma & Yaşam', icon: Home },
  { id: 'sosyal-yasam', label: 'Sosyal Yaşam', icon: Coffee },
  { id: 'kariyer-gelisim', label: 'Kariyer & Gelişim', icon: Briefcase },
];

// Dynamic field configurations for each category
const CATEGORY_FIELDS: Record<string, Array<{ icon: any; label: string; key: string; placeholder: string; type?: string }>> = {
  'topluluk-onayli': [
    { icon: MapPin, label: 'Adres', key: 'address', placeholder: 'Alaeddin Keykubat Kampüsü, Zemin Kat' },
    { icon: Clock, label: 'Saatler', key: 'hours', placeholder: '11:30 - 14:00 | 17:00 - 19:30' },
    { icon: Paperclip, label: 'Menü/Link', key: 'menu', placeholder: 'selcuk.edu.tr/yemekhane-menu' },
    { icon: Coffee, label: 'Açıklama', key: 'description', placeholder: 'Öğle ve akşam saatlerinde çorba, ana yemek, pilav ve tatlı ikramı yapılmaktadır.', type: 'textarea' },
  ],
  'akademik-destek': [
    { icon: FileText, label: 'Ders', key: 'course', placeholder: 'MAT201' },
    { icon: User, label: 'Hoca', key: 'professor', placeholder: 'Prof. Dr. Ahmet Yılmaz' },
    { icon: BookOpen, label: 'Açıklama', key: 'description', placeholder: '2. Sınıf zorunlu dersidir. Vize %40, Final %60 etkiler.', type: 'textarea' },
    { icon: Paperclip, label: 'Kaynak', key: 'resources', placeholder: '2 PDF, 1 Çıkmış Soru' },
  ],
  'barinma-yasam': [
    { icon: Home, label: 'Yurt/Ev Sayısı', key: 'count', placeholder: '12 devlet, 8 özel yurt' },
    { icon: DollarSign, label: 'Ücret Aralığı', key: 'priceRange', placeholder: 'Devlet: 400-600₺, Özel: 2500-4500₺' },
    { icon: FileText, label: 'Başvuru', key: 'application', placeholder: 'e-Devlet üzerinden (Ağustos-Eylül)' },
    { icon: Clock, label: 'Süreç', key: 'process', placeholder: 'Başvuru → Puanlama → Yerleştirme (2-3 hafta)' },
  ],
  'sosyal-yasam': [
    { icon: MapPin, label: 'Mekan', key: 'venue', placeholder: 'Bosna Kahvecisi, Alaaddin Tepesi' },
    { icon: Clock, label: 'Saatler', key: 'hours', placeholder: '08:00 - 01:00' },
    { icon: DollarSign, label: 'Fiyat', key: 'price', placeholder: 'Ortalama 50-100₺' },
    { icon: Coffee, label: 'Aktiviteler', key: 'activities', placeholder: 'Kahve, Çalışma, Sohbet' },
  ],
  'kariyer-gelisim': [
    { icon: Briefcase, label: 'Platformlar', key: 'platforms', placeholder: 'LinkedIn, Kariyer.net, İşKur' },
    { icon: FileText, label: 'CV Hazırlık', key: 'cvTips', placeholder: '1 sayfa, net, ölçülebilir başarılar' },
    { icon: User, label: 'Networking', key: 'networking', placeholder: 'Mezun ağı, LinkedIn, Etkinlikler' },
    { icon: BookOpen, label: 'Sertifikalar', key: 'certificates', placeholder: 'Google, AWS, Coursera ücretsiz kurslar' },
  ],
};

export const CreateWikiModal = ({ isOpen, onClose, editEntry = null, onSave }: CreateWikiModalProps) => {
  const { isDarkMode } = useTheme();
  const isEditMode = !!editEntry;
  const [windowWidth, setWindowWidth] = useState(0);
  
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
  
  // Map category names to IDs
  const getCategoryIdFromName = (categoryName: string): string => {
    const categoryMap: Record<string, string> = {
      'Topluluk Onaylı': 'topluluk-onayli',
      'Akademik Destek': 'akademik-destek',
      'Barınma & Yaşam': 'barinma-yasam',
      'Sosyal Yaşam': 'sosyal-yasam',
      'Kariyer & Gelişim': 'kariyer-gelisim',
    };
    return categoryMap[categoryName] || 'topluluk-onayli';
  };
  
  // Initialize form with editEntry data if in edit mode
  const [selectedCategory, setSelectedCategory] = useState(() => {
    if (editEntry) {
      // Check if entry has categoryId (from WIKI_ENTRIES) or use category name
      const categoryId = (editEntry as any).categoryId || getCategoryIdFromName(editEntry.category);
      return categoryId;
    }
    return 'topluluk-onayli';
  });
  
  const [title, setTitle] = useState(() => editEntry?.title || '');
  const [formData, setFormData] = useState<Record<string, string>>(() => {
    if (editEntry) {
      const data: Record<string, string> = {};
      editEntry.data.fields.forEach((field) => {
        const key = field.key || field.label.toLowerCase().replace(/\s+/g, '_');
        // Convert value to string if it's ReactNode
        const value = typeof field.value === 'string' ? field.value : String(field.value || '');
        data[key] = value;
      });
      return data;
    }
    return {};
  });

  const currentFields = CATEGORY_FIELDS[selectedCategory] || [];
  
  // Reset form when modal closes or populate when opening in edit mode
  useEffect(() => {
    if (!isOpen) {
      setTitle('');
      setFormData({});
      setSelectedCategory('topluluk-onayli');
    } else if (editEntry) {
      // Re-populate form when opening in edit mode
      setTitle(editEntry.title);
      const categoryId = (editEntry as any).categoryId || getCategoryIdFromName(editEntry.category);
      setSelectedCategory(categoryId);
      const data: Record<string, string> = {};
      editEntry.data.fields.forEach((field) => {
        const key = field.key || field.label.toLowerCase().replace(/\s+/g, '_');
        // Convert value to string if it's ReactNode
        const value = typeof field.value === 'string' ? field.value : String(field.value || '');
        data[key] = value;
      });
      setFormData(data);
    }
  }, [isOpen, editEntry]);

  const handleFieldChange = (key: string, value: string) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    const savedEntry: WikiEntry = {
      id: editEntry?.id || `wiki-${Date.now()}`,
      title,
      category: WIKI_CATEGORIES.find(c => c.id === selectedCategory)?.label || 'Topluluk Onaylı',
      categoryId: selectedCategory,
      data: {
        type: selectedCategory === 'topluluk-onayli' ? 'venue' as const :
              selectedCategory === 'akademik-destek' ? 'academic' as const :
              selectedCategory === 'barinma-yasam' ? 'housing' as const :
              selectedCategory === 'kariyer-gelisim' ? 'career' as const :
              'general' as const,
        fields: currentFields.map(field => ({
          icon: field.icon,
          key: field.key,
          label: field.label,
          value: formData[field.key] || '',
          editable: true
        }))
      }
    };

    if (isEditMode) {
      console.log('✏️ Wiki Entry Updated:', savedEntry);
      if (onSave) {
        onSave(savedEntry);
      }
    } else {
      console.log('📚 Wiki Entry Created:', savedEntry);
      if (onSave) {
        onSave(savedEntry);
      }
    }
    
    // Reset form
    setTitle('');
    setFormData({});
    setSelectedCategory('topluluk-onayli');
    onClose();
  };

  const isFormValid = title.trim() && currentFields.every(field => formData[field.key]?.trim());

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
                {isEditMode ? 'Wiki Bilgisini Düzenle' : 'Wiki Bilgisi Ekle'}
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
                  placeholder="Örn: Selçuk Üniversitesi Yemekhane"
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
                <div className="grid grid-cols-2 gap-2">
                  {WIKI_CATEGORIES.map((cat) => {
                    const isSelected = selectedCategory === cat.id;
                    const Icon = cat.icon;
                    return (
                      <button
                        key={cat.id}
                        onClick={() => {
                          setSelectedCategory(cat.id);
                          setFormData({}); // Reset form when category changes
                        }}
                        className={`flex items-center gap-2 px-4 py-3 rounded-lg font-bold transition-all ${
                          isSelected 
                            ? 'bg-[#5852c4] text-white shadow-lg shadow-[#5852c4]/20' 
                            : isDarkMode
                              ? 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        <Icon className="w-4 h-4" strokeWidth={2.5} />
                        <span className="text-sm">{cat.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 3: Dynamic Fields */}
              <div>
                <label className={`block text-xs font-bold uppercase tracking-wide mb-3 ${
                  isDarkMode ? 'text-slate-400' : 'text-gray-600'
                }`}>
                  3. Bilgileri Doldur
                </label>
                <div className="space-y-4">
                  {currentFields.map((field) => {
                    const Icon = field.icon;
                    const isTextarea = field.type === 'textarea';
                    
                    return (
                      <div key={field.key}>
                        <div className="flex items-center gap-2 mb-2">
                          <Icon className={`w-4 h-4 ${isDarkMode ? 'text-[#5852c4]' : 'text-[#5852c4]'}`} strokeWidth={2.5} />
                          <label className={`text-sm font-bold ${
                            isDarkMode ? 'text-slate-300' : 'text-gray-700'
                          }`}>
                            {field.label}
                          </label>
                        </div>
                        {isTextarea ? (
                          <textarea
                            placeholder={field.placeholder}
                            value={formData[field.key] || ''}
                            onChange={(e) => handleFieldChange(field.key, e.target.value)}
                            className={`w-full px-4 py-3 rounded-lg border-2 resize-none min-h-[100px] transition-all outline-none ${
                              isDarkMode 
                                ? 'bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 focus:border-[#5852c4]' 
                                : 'bg-white border-gray-200 text-gray-900 placeholder:text-gray-400 focus:border-[#5852c4]'
                            }`}
                          />
                        ) : (
                          <input
                            type="text"
                            placeholder={field.placeholder}
                            value={formData[field.key] || ''}
                            onChange={(e) => handleFieldChange(field.key, e.target.value)}
                            className={`w-full px-4 py-3 rounded-lg border-2 transition-all outline-none ${
                              isDarkMode 
                                ? 'bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 focus:border-[#5852c4]' 
                                : 'bg-white border-gray-200 text-gray-900 placeholder:text-gray-400 focus:border-[#5852c4]'
                            }`}
                          />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className={`px-6 py-4 border-t ${
              isDarkMode ? 'border-slate-700' : 'border-gray-200'
            }`}>
              <button
                onClick={handleSubmit}
                disabled={!isFormValid}
                className="w-full py-3.5 bg-[#5852c4] hover:bg-[#4a45b0] text-white font-bold rounded-lg 
                  transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-[#5852c4]/20"
              >
                {isEditMode ? 'Değişiklikleri Kaydet' : "Wiki'ye Ekle"}
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
