import React, { useState } from 'react';
import { Coins, Search, ArrowLeft, Home, Compass, Bell, User, Gamepad2, SlidersHorizontal, X } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { useCoins } from '../../contexts/CoinContext';

interface GlobalHeaderProps {
  type?: 'rich' | 'lite';
  onWalletClick?: () => void;
  coinBalance?: string;
  onSearch?: (query: string) => void;
  onSearchClick?: () => void;
  onBackClick?: () => void;
  activeTab?: string;
  onTabChange?: (tab: string) => void;
  onGameCenterClick?: () => void;
  onFilterClick?: () => void;
  isAuthenticated?: boolean;
  onLoginClick?: () => void;
  searchQuery?: string;
  onSearchClear?: () => void;
}

const CATEGORIES = [
  { id: 'all', label: 'Tümü' },
  { id: 'academic', label: 'Akademik' },
  { id: 'food', label: 'Yeme-İçme' },
  { id: 'events', label: 'Etkinlik' },
  { id: 'housing', label: 'Konaklama' },
  { id: 'social', label: 'Sosyal' },
  { id: 'sports', label: 'Spor' },
  { id: 'culture', label: 'Kültür' },
];

export const GlobalHeader: React.FC<GlobalHeaderProps> = ({
  type = 'lite',
  onWalletClick,
  coinBalance,
  onSearch,
  onSearchClick,
  onBackClick,
  activeTab = 'home',
  onTabChange,
  onGameCenterClick,
  onFilterClick,
  isAuthenticated = true,
  onLoginClick,
  searchQuery = '',
  onSearchClear,
}) => {
  const { isDarkMode } = useTheme();
  const { coins: contextCoins } = useCoins();
  const [activeCategory, setActiveCategory] = useState('all');
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery || '');
  
  // Always use context coins for real-time updates, fallback to prop or default
  const displayCoins = contextCoins ? contextCoins.toLocaleString('tr-TR') : (coinBalance || '2.450');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setLocalSearchQuery(query);
    if (onSearch) {
      onSearch(query);
    }
  };

  const handleSearchFocus = () => {
    if (onSearchClick) {
      onSearchClick();
    }
  };

  const navItems = [
    { id: 'home', icon: Home },
    { id: 'discover', icon: Compass },
    { id: 'notifications', icon: Bell },
    { id: 'profile', icon: User },
  ];

  return (
    <div className={`fixed top-0 left-0 right-0 z-50 ${isDarkMode ? 'bg-[#1a1a2e]' : 'bg-white'} shadow-sm transition-colors`}>
      {/* TOP ROW: Logo + Search + Navigation + Game Center + Wallet */}
      <div className="h-[60px] px-4 lg:px-6 flex items-center justify-between gap-4 max-w-[1440px] lg:mx-auto">
        
         {/* Left: Back Button or App Logo Icon */}
         <div className="flex-shrink-0">
           {onBackClick ? (
             <button 
               onClick={onBackClick}
               className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors ${
                 isDarkMode 
                   ? 'bg-slate-700 hover:bg-slate-600' 
                   : 'bg-slate-100 hover:bg-slate-200'
               }`}
             >
               <ArrowLeft className={`w-5 h-5 ${isDarkMode ? 'text-white' : 'text-[#19142e]'}`} strokeWidth={2.5} />
             </button>
           ) : (
             <div className="w-9 h-9 rounded-lg bg-[#5852c4] flex items-center justify-center shadow-md cursor-pointer" onClick={() => onTabChange?.('home')}>
               <span className="font-black text-white text-lg">K</span>
             </div>
           )}
         </div>

         {/* Center: Empty spacer */}
         <div className="flex-1" />

         {/* Right: Search + Navigation + Wallet (Sağa yapışık) */}
         <div className="flex items-center gap-4">
           {/* Search Bar (Desktop) - Navigation'ın solunda */}
           {type === 'rich' && (
             <div className={`hidden lg:flex items-center transition-all duration-300 ${
               localSearchQuery 
                 ? 'w-[200px] lg:w-[280px]' 
                 : 'w-9'
             }`}>
               {localSearchQuery ? (
                 <button
                   onClick={onSearchClick}
                   className={`flex items-center gap-2 w-full px-3 py-2 rounded-lg transition-colors ${
                     isDarkMode 
                       ? 'bg-slate-800 hover:bg-slate-700' 
                       : 'bg-gray-100 hover:bg-gray-200'
                   }`}
                 >
                   <Search className={`w-4 h-4 flex-shrink-0 ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`} strokeWidth={2.5} />
                   <span className={`flex-1 text-sm font-medium truncate text-left ${
                     isDarkMode ? 'text-slate-300' : 'text-gray-700'
                   }`}>
                     {localSearchQuery}
                   </span>
                 </button>
               ) : (
                 <button
                   onClick={onSearchClick}
                   className={`w-9 h-9 rounded-lg bg-transparent flex items-center justify-center transition-colors ${
                     isDarkMode ? 'hover:bg-slate-700' : 'hover:bg-slate-100'
                   }`}
                 >
                   <Search className={`w-5 h-5 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`} strokeWidth={2.5} />
                 </button>
               )}
             </div>
           )}

           {/* Desktop Navigation */}
           <nav className="hidden lg:flex items-center gap-6">
             {navItems.map((item) => {
               const Icon = item.icon;
               const isActive = activeTab === item.id;
               return (
                 <button
                   key={item.id}
                   onClick={() => onTabChange?.(item.id)}
                   className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all ${
                     isActive 
                       ? 'text-[#5852c4] bg-[#5852c4]/10' 
                       : (isDarkMode 
                           ? 'text-slate-400 hover:text-[#5852c4] hover:bg-slate-800/50' 
                           : 'text-slate-600 hover:text-[#5852c4] hover:bg-slate-50')
                   }`}
                 >
                   <Icon className="w-4 h-4" strokeWidth={2.5} />
                 </button>
               );
             })}
             
             {/* Game Center Button */}
             <button
               onClick={onGameCenterClick}
               className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#5852c4] text-white hover:bg-[#19142e] transition-all"
             >
               <Gamepad2 className="w-4 h-4" strokeWidth={2.5} />
               <span className="font-bold text-sm">Oyun Merkezi</span>
             </button>
           </nav>

           {/* Right: Action Icons + Wallet Widget */}
           <div className="flex items-center gap-3">
             {/* Search Bar (Mobile) */}
             {type === 'rich' && (
               <div className={`lg:hidden flex items-center transition-all duration-300 ${
                 localSearchQuery 
                   ? 'w-[140px] sm:w-[180px]' 
                   : 'w-9'
               }`}>
                 {localSearchQuery ? (
                   <button
                     onClick={onSearchClick}
                     className={`flex items-center gap-2 w-full px-2.5 py-1.5 rounded-lg transition-colors ${
                       isDarkMode 
                         ? 'bg-slate-800 hover:bg-slate-700' 
                         : 'bg-gray-100 hover:bg-gray-200'
                     }`}
                   >
                     <Search className={`w-3.5 h-3.5 flex-shrink-0 ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`} strokeWidth={2.5} />
                     <span className={`flex-1 text-xs font-medium truncate text-left ${
                       isDarkMode ? 'text-slate-300' : 'text-gray-700'
                     }`}>
                       {localSearchQuery}
                     </span>
                   </button>
                 ) : (
                   <button
                     onClick={onSearchClick}
                     className={`w-9 h-9 rounded-lg bg-transparent flex items-center justify-center transition-colors ${
                       isDarkMode ? 'hover:bg-slate-700' : 'hover:bg-slate-100'
                     }`}
                   >
                     <Search className={`w-5 h-5 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`} strokeWidth={2.5} />
                   </button>
                 )}
               </div>
             )}

             {/* Wallet or Login Button */}
             {isAuthenticated ? (
               onWalletClick ? (
                 <button
                   onClick={onWalletClick}
                   className="flex-shrink-0 flex items-center gap-2 px-4 py-2.5 bg-[#5852c4] rounded-full hover:bg-[#19142e] transition-all active:scale-95 shadow-md"
                 >
                   <Coins className="w-4 h-4 text-white" strokeWidth={2.5} />
                   <span className="font-extrabold text-white text-sm">{displayCoins}</span>
                 </button>
               ) : (
                 <div className="flex-shrink-0 flex items-center gap-2 px-4 py-2.5 bg-[#5852c4] rounded-full shadow-md">
                   <Coins className="w-4 h-4 text-white" strokeWidth={2.5} />
                   <span className="font-extrabold text-white text-sm">{displayCoins}</span>
                 </div>
               )
             ) : (
               <button
                 onClick={onLoginClick}
                 className="flex-shrink-0 flex items-center gap-2 px-5 py-2.5 bg-[#5852c4] rounded-full hover:bg-[#19142e] transition-all active:scale-95 shadow-md"
               >
                 <span className="font-extrabold text-white text-sm">Giriş Yap</span>
               </button>
             )}
           </div>
         </div>
       </div>

      {/* REMOVED: Categories row for minimalist design */}

      {/* Hide scrollbar globally */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};
