import React from 'react';
import { Clock, Edit, FileText, MapPin, User, DollarSign, BookOpen, Calendar, Paperclip, Home, Briefcase, Coffee } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

// Category Badge Colors (5 Pillars)
const CATEGORY_STYLES = {
  'Topluluk Onaylı': { bg: 'bg-teal-100', text: 'text-teal-700', border: 'border-teal-200' },
  'Akademik Destek': { bg: 'bg-blue-100', text: 'text-blue-700', border: 'border-blue-200' },
  'Sosyal Yaşam': { bg: 'bg-orange-100', text: 'text-orange-700', border: 'border-orange-200' },
  'Barınma & Yaşam': { bg: 'bg-purple-100', text: 'text-purple-700', border: 'border-purple-200' },
  'Kariyer & Gelişim': { bg: 'bg-purple-100', text: 'text-purple-700', border: 'border-purple-200' },
};

interface WikiEntryCardProps {
  title: string;
  category: keyof typeof CATEGORY_STYLES;
  data: {
    type: 'academic' | 'venue' | 'housing' | 'career' | 'general';
    fields: Array<{ icon: React.ComponentType<any>; label: string; value: string | React.ReactNode }>;
  };
  lastEditedBy: string;
  lastEditedAt: string;
  version?: number;
  onHistoryClick?: () => void;
  onEditClick?: () => void;
  onClick?: () => void;
  index?: number;
  totalEntries?: number;
}

export const WikiEntryCard: React.FC<WikiEntryCardProps> = ({
  title,
  category,
  data,
  lastEditedBy,
  lastEditedAt,
  version,
  onHistoryClick,
  onEditClick,
  onClick,
  index = 0,
  totalEntries = 1,
}) => {
  const { isDarkMode } = useTheme();
  const categoryStyle = CATEGORY_STYLES[category] || CATEGORY_STYLES['Akademik Destek'];

  // Get category icon
  const getCategoryIcon = () => {
    switch (category) {
      case 'Topluluk Onaylı':
        return MapPin;
      case 'Akademik Destek':
        return BookOpen;
      case 'Sosyal Yaşam':
        return Coffee;
      case 'Barınma & Yaşam':
        return Home;
      case 'Kariyer & Gelişim':
        return Briefcase;
      default:
        return FileText;
    }
  };

  const CategoryIcon = getCategoryIcon();

  return (
    <article 
      onClick={onClick}
      className={`px-6 py-4 cursor-pointer transition-all duration-200 ${
        isDarkMode 
          ? 'hover:bg-slate-800/50' 
          : 'hover:bg-gray-50/80'
      } ${
        index !== totalEntries - 1 
          ? (isDarkMode ? 'border-b border-slate-700' : 'border-b border-gray-100')
          : ''
      }`}
    >
      {/* LAYOUT - Horizontal Flow (Like PostCard) */}
      <div className="flex gap-3">
        {/* LEFT: Category Icon (40px) */}
        <div className="flex-shrink-0">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${categoryStyle.bg}`}>
            <CategoryIcon className={`w-5 h-5 ${categoryStyle.text}`} strokeWidth={2.5} />
          </div>
        </div>

        {/* RIGHT: All Content */}
        <div className="flex-1 min-w-0">
          {/* HEADER - Single Line */}
          <div className="flex items-baseline justify-between mb-1">
            <div className="flex items-baseline gap-1.5 flex-wrap">
              <span className={`text-xs font-semibold ${categoryStyle.text}`}>
                {category}
              </span>
              <span className={`text-xs ${isDarkMode ? 'text-slate-500' : 'text-gray-400'}`}>•</span>
              <span className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>
                {lastEditedBy}
              </span>
              <span className={`text-xs ${isDarkMode ? 'text-slate-500' : 'text-gray-400'}`}>•</span>
              <span className={`text-xs ${isDarkMode ? 'text-slate-500' : 'text-gray-400'}`}>
                {lastEditedAt}
              </span>
              {version && (
                <>
                  <span className={`text-xs ${isDarkMode ? 'text-slate-500' : 'text-gray-400'}`}>•</span>
                  <span className={`text-xs ${isDarkMode ? 'text-slate-500' : 'text-gray-400'}`}>
                    v{version}
                  </span>
                </>
              )}
            </div>
          </div>

          {/* TITLE */}
          <h3 className={`font-bold text-base leading-snug mb-3 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            {title}
          </h3>

          {/* STRUCTURED DATA - Compact */}
          <div className="space-y-2 mb-3">
            {data.fields.map((field, fieldIndex) => (
              <div key={fieldIndex} className="flex items-start gap-2">
                <field.icon className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
                  isDarkMode ? 'text-slate-500' : 'text-gray-400'
                }`} strokeWidth={2} />
                <div className="flex-1">
                  <span className={`text-sm ${
                    isDarkMode ? 'text-slate-400' : 'text-gray-500'
                  }`}>{field.label}:</span>
                  <span className={`text-sm ml-1.5 ${
                    isDarkMode ? 'text-slate-300' : 'text-gray-600'
                  }`}>{field.value}</span>
                </div>
              </div>
            ))}
          </div>

          {/* ACTIONS - Small & Gray (Like PostCard) */}
          <div className={`flex gap-6 ${isDarkMode ? 'text-slate-500' : 'text-gray-400'}`}>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onHistoryClick?.();
              }}
              className="flex items-center gap-1.5 group"
            >
              <Clock className={`w-4 h-4 transition-colors ${
                isDarkMode 
                  ? 'text-slate-500 group-hover:text-slate-300' 
                  : 'text-gray-400 group-hover:text-gray-600'
              }`} strokeWidth={2} />
              <span className={`text-sm transition-colors ${
                isDarkMode 
                  ? 'text-slate-400 group-hover:text-slate-200' 
                  : 'text-gray-500 group-hover:text-gray-700'
              }`}>Geçmiş</span>
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onEditClick?.();
              }}
              className="flex items-center gap-1.5 group"
            >
              <Edit className={`w-4 h-4 transition-colors ${
                isDarkMode 
                  ? 'text-slate-500 group-hover:text-slate-300' 
                  : 'text-gray-400 group-hover:text-gray-600'
              }`} strokeWidth={2} />
              <span className={`text-sm transition-colors ${
                isDarkMode 
                  ? 'text-slate-400 group-hover:text-slate-200' 
                  : 'text-gray-500 group-hover:text-gray-700'
              }`}>Düzenle</span>
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};

// Empty State Card Component
export const WikiEmptyCard: React.FC<{ category?: string }> = ({ category }) => {
  const { isDarkMode } = useTheme();
  
  return (
    <div className={`border-2 border-dashed rounded-md p-8 text-center ${
      isDarkMode 
        ? 'bg-[#1a1a2e] border-slate-600' 
        : 'bg-white border-slate-300'
    }`}>
      <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3 ${
        isDarkMode ? 'bg-slate-800' : 'bg-slate-100'
      }`}>
        <FileText className={`w-8 h-8 ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`} strokeWidth={2} />
      </div>
      <h4 className={`font-bold mb-1 ${isDarkMode ? 'text-white' : 'text-slate-700'}`}>
        {category ? `"${category}" henüz oluşturulmadı` : 'Bu başlık henüz oluşturulmadı'}
      </h4>
      <p className={`text-sm mb-4 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>İlk katkıyı sen yap ve Coin kazan!</p>
      <button className="px-4 py-2 bg-[#5852c4] text-white rounded-md text-sm font-bold hover:bg-[#19142e] transition-colors">
        + Yeni Katkı Ekle
      </button>
    </div>
  );
};
