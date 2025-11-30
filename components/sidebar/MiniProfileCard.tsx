import React, { useEffect } from 'react';
import { Users, TrendingUp, Compass } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { useTheme } from '../../contexts/ThemeContext';
import { useCoins } from '../../contexts/CoinContext';

interface MiniProfileCardProps {
  onProfileClick?: () => void;
  fullName?: string;
  avatar?: string;
  school?: string;
  department?: string;
  followers?: number;
  contributions?: number;
  role?: string;
  coins?: number;
  roleMultiplier?: string;
}

// Helper function to get role data
const getRoleData = (coins: number) => {
  if (coins < 500) return { title: "Yeni Gelen", multiplier: "1.0x", nextLimit: 500, minCoins: 0 };
  if (coins < 2500) return { title: "Seyyah", multiplier: "1.2x", nextLimit: 2500, minCoins: 500 };
  if (coins < 10000) return { title: "Gezgin", multiplier: "1.5x", nextLimit: 10000, minCoins: 2500 };
  if (coins < 50000) return { title: "Kaşif Meraklısı", multiplier: "2.0x", nextLimit: 50000, minCoins: 10000 };
  return { title: "Konya Bilgesi", multiplier: "2.5x", nextLimit: null, minCoins: 50000 };
};

export const MiniProfileCard = ({ 
  onProfileClick,
  fullName = 'Fatih Yılmaz',
  avatar = 'https://images.unsplash.com/photo-1600178572204-6ac8886aae63?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBwb3J0cmFpdCUyMHN0dWRlbnR8ZW58MXx8fHwxNzY0MjU5MzU4fDA&ixlib=rb-4.1.0&q=80&w=1080',
  school = 'Selçuk Üniversitesi',
  department = 'Hukuk Fakültesi',
  followers = 342,
  contributions = 89,
  role = 'Gezgin',
  coins: propCoins,
  roleMultiplier
}: MiniProfileCardProps) => {
  const { isDarkMode } = useTheme();
  const { coins: contextCoins, coinAnimationTrigger } = useCoins();
  const [isAnimating, setIsAnimating] = React.useState(false);
  
  // Use context coins if available, otherwise use prop
  const coins = contextCoins || propCoins || 6240;
  
  const roleData = getRoleData(coins);
  const currentRole = role || roleData.title;
  const multiplier = roleMultiplier || roleData.multiplier;
  
  // Calculate progress
  const progress = roleData.nextLimit 
    ? Math.min(100, Math.max(0, ((coins - roleData.minCoins) / (roleData.nextLimit - roleData.minCoins)) * 100))
    : 100;

  // Trigger animation when coins change
  useEffect(() => {
    if (coinAnimationTrigger > 0) {
      setIsAnimating(true);
      const timer = setTimeout(() => setIsAnimating(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [coinAnimationTrigger]);
  
  return (
    <div className={`rounded-[10px] p-3 shadow-[0_2px_12px_rgba(25,20,46,0.08)] hover:shadow-[0_4px_20px_rgba(25,20,46,0.12)] transition-all ${
      isDarkMode ? 'bg-[#1a1a2e]' : 'bg-white'
    }`}>
      <div className="flex items-center gap-3 mb-3">
        {/* Left: Avatar */}
        <div className="flex-shrink-0">
          <ImageWithFallback
            src={avatar}
            alt={fullName}
            className="w-12 h-12 rounded-full object-cover"
          />
        </div>

        {/* Middle: Name, School, Stats */}
        <div className="flex-1 min-w-0">
          <h3 className={`font-bold text-sm ${isDarkMode ? 'text-white' : 'text-[#19142e]'} truncate mb-0.5`}>{fullName}</h3>
          <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-[#8279a5]'} truncate mb-2`}>{school.split(' ')[0]} Üni. - {department.split(' ')[0]}</p>
          
          {/* Stats Row */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <Users className="w-3.5 h-3.5 text-[#5852c4]" strokeWidth={2.5} />
              <span className={`font-bold text-xs ${isDarkMode ? 'text-white' : 'text-[#19142e]'}`}>{followers}</span>
              <span className={`text-[10px] ${isDarkMode ? 'text-slate-400' : 'text-[#8279a5]'}`}>Takipçi</span>
            </div>
            <div className="flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5 text-[#5852c4]" strokeWidth={2.5} />
              <span className={`font-bold text-xs ${isDarkMode ? 'text-white' : 'text-[#19142e]'}`}>{contributions}</span>
              <span className={`text-[10px] ${isDarkMode ? 'text-slate-400' : 'text-[#8279a5]'}`}>Katkı</span>
            </div>
          </div>
        </div>
      </div>

      {/* Role Badge - Above Button */}
      <div className={`mb-3 rounded-[10px] p-3 border-2 transition-all duration-500 ${
        isDarkMode 
          ? 'bg-white border-[#5852c4]' 
          : 'bg-white border-[#5852c4]/30'
      } ${
        isAnimating 
          ? 'border-[#5852c4] shadow-[0_0_20px_rgba(88,82,196,0.6)] ring-2 ring-[#5852c4]/50' 
          : ''
      }`}>
        {/* Header: Icon, Title, Multiplier */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Compass className={`w-4 h-4 ${isDarkMode ? 'text-[#5852c4]' : 'text-[#5852c4]'}`} strokeWidth={2.5} />
            <span className={`font-bold text-sm ${isDarkMode ? 'text-[#19142e]' : 'text-[#19142e]'}`}>
              {currentRole}
            </span>
          </div>
          <div className={`px-2 py-0.5 rounded-full ${
            isDarkMode ? 'bg-[#5852c4]' : 'bg-[#5852c4]'
          }`}>
            <span className="text-white text-xs font-bold">{multiplier}</span>
          </div>
        </div>
        
        {/* Progress Bar Container with Animation */}
        <div className={`w-full h-2 bg-gray-200 rounded-full overflow-hidden mb-2 transition-all duration-500 ${
          isAnimating ? 'ring-2 ring-[#5852c4]/50' : ''
        }`}>
          <div 
            className="h-full bg-gradient-to-r from-[#5852c4] via-[#7c3aed] to-[#06b6d4] rounded-full transition-all duration-700 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        
        {/* Stats: Coins / Limit and Percentage */}
        <div className="flex items-center justify-between">
          <span className={`text-xs font-bold ${isDarkMode ? 'text-[#19142e]' : 'text-[#19142e]'}`}>
            {coins.toLocaleString()} / {roleData.nextLimit ? roleData.nextLimit.toLocaleString() : '∞'}
          </span>
          <span className={`text-xs font-bold ${isDarkMode ? 'text-[#5852c4]' : 'text-[#5852c4]'}`}>
            %{Math.round(progress)}
          </span>
        </div>
      </div>

      {/* View Profile Button - Bottom */}
      <button
        onClick={onProfileClick}
        className="w-full py-2 bg-[#5852c4]/10 text-[#5852c4] rounded-[8px] font-bold text-xs hover:bg-[#5852c4]/20 transition-colors"
      >
        Profili Görüntüle
      </button>
    </div>
  );
};
