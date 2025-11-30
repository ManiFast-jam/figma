import React from 'react';
import { Building2, ArrowRight } from 'lucide-react';

export const AnnouncementCard = () => {
  return (
    <div className="w-full bg-[#FFF5F5] rounded-2xl p-5 mb-4 border border-red-100 relative overflow-hidden shadow-sm">
      {/* Decorative Element */}
      <div className="absolute -right-4 -top-4 w-20 h-20 bg-red-100 rounded-full opacity-50 blur-2xl pointer-events-none" />
      
      <div className="flex items-start gap-3 relative z-10">
        <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center shrink-0 border border-red-200">
          <Building2 className="w-5 h-5 text-red-600" />
        </div>
        
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1">
            <h4 className="text-sm font-bold text-slate-900">Konya Büyükşehir Belediyesi</h4>
            <span className="text-[10px] font-bold px-2 py-0.5 bg-red-100 text-red-600 rounded-full">RESMİ</span>
          </div>
          
          <p className="text-sm text-slate-600 font-medium mb-3 leading-relaxed">
            Genç Kültür Kart başvuruları başladı! Son başvuru tarihi 30 Ekim. Fırsatları kaçırmayın.
          </p>
          
          <button className="flex items-center gap-1 text-xs font-bold text-red-600 hover:text-red-700 transition-colors bg-white border border-red-200 px-3 py-1.5 rounded-lg shadow-sm">
            Detaylı Bilgi
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
};
