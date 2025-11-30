import React from 'react';
import { TrendingUp, MessageCircle } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

interface TrendItem {
  id: string;
  title: string;
  posts: number;
  category: string;
}

const TRENDING_ITEMS: TrendItem[] = [
  { id: '1', title: 'Yemek Fiyatları', posts: 234, category: 'Yeme-İçme' },
  { id: '2', title: 'Final Sınavları', posts: 189, category: 'Akademik' },
  { id: '3', title: 'Bahar Şenliği', posts: 156, category: 'Etkinlik' },
  { id: '4', title: 'Otobüs Saatleri', posts: 142, category: 'Ulaşım' },
  { id: '5', title: 'Kütüphane Kalabalık', posts: 98, category: 'Kampüs' },
];

export const TrendingVertical = () => {
  const { isDarkMode } = useTheme();
  
  return (
    <div className={`rounded-[10px] p-5 shadow-[0_2px_12px_rgba(25,20,46,0.08)] hover:shadow-[0_4px_20px_rgba(25,20,46,0.12)] transition-all ${
      isDarkMode ? 'bg-[#1a1a2e]' : 'bg-white'
    }`}>
      <div className="flex items-center gap-2 mb-4">
        <TrendingUp className="w-5 h-5 text-[#5852c4]" strokeWidth={2.5} />
        <h3 className={`font-bold ${isDarkMode ? 'text-white' : 'text-[#19142e]'}`}>Gündem</h3>
      </div>

      <div className="space-y-3">
        {TRENDING_ITEMS.map((item, index) => (
          <button
            key={item.id}
            className={`w-full text-left p-3 rounded-[10px] transition-colors group ${
              isDarkMode ? 'hover:bg-slate-800/50' : 'hover:bg-[#f2f3f7]'
            }`}
          >
            <div className="flex items-start justify-between mb-1">
              <span className={`text-xs font-bold ${isDarkMode ? 'text-slate-400' : 'text-[#8279a5]'}`}>{item.category}</span>
              <span className="text-xs text-[#5852c4] font-bold">#{index + 1}</span>
            </div>
            <h4 className={`font-bold text-sm mb-1 group-hover:text-[#5852c4] transition-colors ${
              isDarkMode ? 'text-white' : 'text-[#19142e]'
            }`}>
              {item.title}
            </h4>
            <div className={`flex items-center gap-1 ${isDarkMode ? 'text-slate-400' : 'text-[#8279a5]'}`}>
              <MessageCircle className="w-3 h-3" strokeWidth={2.5} />
              <span className="text-xs">{item.posts} gönderi</span>
            </div>
          </button>
        ))}
      </div>

      <button className={`w-full mt-4 py-2 text-[#5852c4] font-bold text-sm rounded-[10px] transition-colors ${
        isDarkMode ? 'hover:bg-slate-800/50' : 'hover:bg-[#f2f3f7]'
      }`}>
        Daha Fazla Göster
      </button>
    </div>
  );
};
