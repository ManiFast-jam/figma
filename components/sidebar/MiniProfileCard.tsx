import React from 'react';
import { Users, TrendingUp } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { useTheme } from '../../contexts/ThemeContext';

interface MiniProfileCardProps {
  onProfileClick?: () => void;
}

export const MiniProfileCard = ({ onProfileClick }: MiniProfileCardProps) => {
  const { isDarkMode } = useTheme();
  
  return (
    <div className={`rounded-[10px] p-5 shadow-[0_2px_12px_rgba(25,20,46,0.08)] hover:shadow-[0_4px_20px_rgba(25,20,46,0.12)] transition-all ${
      isDarkMode ? 'bg-[#1a1a2e]' : 'bg-white'
    }`}>
      {/* Avatar & Name */}
      <div className="flex items-center gap-3 mb-4">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&h=120&fit=crop"
          alt="Profile"
          className="w-12 h-12 rounded-full object-cover"
        />
        <div className="flex-1">
          <h3 className={`font-bold ${isDarkMode ? 'text-white' : 'text-[#19142e]'}`}>Ahmet Yılmaz</h3>
          <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-[#8279a5]'}`}>@ahmetyilmaz</p>
        </div>
      </div>

      {/* Rank Badge */}
      <div className="bg-gradient-to-r from-[#5852c4] to-[#7c73e6] rounded-[10px] p-3 mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-white text-sm font-bold">Gezgin</span>
          <span className="text-white/90 text-xs">Seviye 3</span>
        </div>
        {/* XP Bar */}
        <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
          <div className="h-full bg-white rounded-full" style={{ width: '65%' }} />
        </div>
        <p className="text-white/80 text-xs mt-1">650 / 1000 XP</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-3">
        <div className={`rounded-[10px] p-3 text-center ${isDarkMode ? 'bg-slate-800/50' : 'bg-[#f2f3f7]'}`}>
          <div className="flex items-center justify-center gap-1 mb-1">
            <Users className="w-4 h-4 text-[#5852c4]" strokeWidth={2.5} />
            <span className={`font-bold ${isDarkMode ? 'text-white' : 'text-[#19142e]'}`}>342</span>
          </div>
          <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-[#8279a5]'}`}>Takipçi</p>
        </div>
        <div className={`rounded-[10px] p-3 text-center ${isDarkMode ? 'bg-slate-800/50' : 'bg-[#f2f3f7]'}`}>
          <div className="flex items-center justify-center gap-1 mb-1">
            <TrendingUp className="w-4 h-4 text-[#5852c4]" strokeWidth={2.5} />
            <span className={`font-bold ${isDarkMode ? 'text-white' : 'text-[#19142e]'}`}>89</span>
          </div>
          <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-[#8279a5]'}`}>Katkı</p>
        </div>
      </div>

      {/* View Profile Link */}
      <button
        onClick={onProfileClick}
        className="w-full mt-4 py-2 bg-[#5852c4]/10 text-[#5852c4] rounded-[10px] font-bold text-sm hover:bg-[#5852c4]/20 transition-colors"
      >
        Profili Görüntüle
      </button>
    </div>
  );
};
