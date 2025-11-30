import React from 'react';
import { Bell, Search } from 'lucide-react';

export const Header = () => {
  // This header is now more generic or contextual. 
  // Since the WalletProfileCard has the user's name, we might want to simplify this header
  // OR keep it for consistency across screens.
  // I will simplify it to just the Logo/Title area and the Bell, removing the duplicate user info.
  
  return (
    <header className="flex items-center justify-between px-6 py-6 bg-[#F5F7FA] sticky top-0 z-40">
      <div className="flex items-center gap-2">
         <div className="w-8 h-8 rounded-xl bg-[#1A3C75] flex items-center justify-center">
            <span className="text-[#F59E0B] font-bold text-lg">G</span>
         </div>
         <span className="font-bold text-[#1A3C75] text-lg tracking-tight">GençCüzdan</span>
      </div>
      <div className="flex items-center gap-3">
        <button className="p-2 rounded-full bg-white shadow-sm hover:bg-slate-50 transition-colors">
            <Search className="w-6 h-6 text-[#1A3C75]" />
        </button>
        <button className="p-2 rounded-full bg-white shadow-sm hover:bg-slate-50 transition-colors relative">
          <Bell className="w-6 h-6 text-[#1A3C75]" />
          <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-[#F59E0B] rounded-full border-2 border-white"></span>
        </button>
      </div>
    </header>
  );
};
