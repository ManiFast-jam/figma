import React from 'react';
import { Gift, ChevronRight } from 'lucide-react';

export const ReferralBanner = () => {
  return (
    <div className="px-6 mb-6">
      <div className="w-full bg-[#F59E0B] rounded-2xl p-4 flex items-center justify-between shadow-lg shadow-amber-500/20 relative overflow-hidden group cursor-pointer active:scale-[0.98] transition-transform">
        {/* Decorative background elements */}
         <div className="absolute -right-4 -top-4 w-24 h-24 bg-white rounded-full opacity-20 blur-xl pointer-events-none" />
         <div className="absolute -left-4 -bottom-4 w-16 h-16 bg-white rounded-full opacity-10 blur-lg pointer-events-none" />
         
        <div className="flex items-center gap-3 relative z-10">
          <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center shrink-0 border border-white/30">
            <Gift className="w-5 h-5 text-white" />
          </div>
          
          <div className="flex flex-col">
             <h3 className="text-sm font-extrabold text-[#1A3C75] leading-tight">
               Arkadaşını Davet Et
             </h3>
             <p className="text-xs font-bold text-[#1A3C75]/80">
               100 GençCoin Kazan!
             </p>
          </div>
        </div>

        <div className="bg-white/20 p-1.5 rounded-lg backdrop-blur-sm border border-white/10 text-[#1A3C75]">
             <ChevronRight className="w-5 h-5" />
        </div>
      </div>
    </div>
  );
};
