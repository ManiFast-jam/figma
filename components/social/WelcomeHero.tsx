import React from 'react';
import { GraduationCap, Utensils, Home, Users } from 'lucide-react';

export const WelcomeHero = () => {
  const categories = [
    { label: 'Akademik', icon: <GraduationCap className="w-4 h-4" /> },
    { label: 'Yeme-İçme', icon: <Utensils className="w-4 h-4" /> },
    { label: 'Barınma', icon: <Home className="w-4 h-4" /> },
    { label: 'Sosyal', icon: <Users className="w-4 h-4" /> },
  ];

  return (
    <div className="px-6 mb-6">
      <div className="w-full bg-[#1A3C75] rounded-3xl p-6 text-white shadow-xl shadow-blue-900/20 relative overflow-hidden">
        {/* Decorative circles (kept from BalanceCard for consistency) */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#F59E0B]/20 rounded-full blur-xl"></div>

        <div className="relative z-10">
          <div className="mb-6">
            <p className="text-blue-200 text-sm font-medium mb-1">Hoş geldin,</p>
            <h1 className="text-3xl font-bold tracking-tight">KonyaGenç Öğrencisi</h1>
            <p className="text-white/60 text-xs mt-1 max-w-[80%]">
              Kampüs hayatı, notlar ve etkinlikler burada.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((cat, index) => (
              <button 
                key={index}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/10 transition-all active:scale-95"
              >
                <span className="text-amber-400">{cat.icon}</span>
                <span className="text-xs font-semibold text-white">{cat.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
