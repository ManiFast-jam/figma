import React from 'react';
import { Zap, QrCode, CreditCard } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';

export const WalletProfileCard = () => {
  return (
    <div className="px-5 mb-6">
      {/* Genç Kültür Kart - Premium Violet Depth Design - CRISP CORNERS */}
      <div className="relative w-full aspect-[1.586/1] rounded-xl overflow-hidden shadow-[0_20px_60px_rgba(25,20,46,0.25)]">
        
        {/* Violet Gradient Background with Signature Effect */}
        <div className="absolute inset-0 violet-gradient" />

        {/* Neon Purple/Pink Geometric Triangles Pattern */}
        <div className="absolute inset-0 opacity-30">
          {/* Triangle 1 - Purple */}
          <div className="absolute top-[10%] left-[15%] w-24 h-24 rotate-45">
            <div className="w-full h-full bg-gradient-to-br from-purple-400 to-pink-400 opacity-60 blur-xl" 
                 style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }} />
          </div>
          
          {/* Triangle 2 - Pink */}
          <div className="absolute top-[50%] right-[10%] w-32 h-32 -rotate-12">
            <div className="w-full h-full bg-gradient-to-br from-pink-400 to-purple-500 opacity-50 blur-2xl" 
                 style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }} />
          </div>
          
          {/* Triangle 3 - Purple */}
          <div className="absolute bottom-[15%] left-[20%] w-20 h-20 rotate-[135deg]">
            <div className="w-full h-full bg-gradient-to-br from-purple-500 to-violet-400 opacity-70 blur-xl" 
                 style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }} />
          </div>

          {/* Additional floating geometric shapes */}
          <div className="absolute top-[30%] left-[50%] w-16 h-16 rotate-45 bg-gradient-to-br from-fuchsia-400 to-purple-400 opacity-30 blur-2xl rounded-lg" />
          <div className="absolute bottom-[30%] right-[30%] w-20 h-20 -rotate-12 bg-gradient-to-br from-violet-400 to-pink-400 opacity-40 blur-xl" />
        </div>

        {/* Cuberto signature: Subtle inner glow */}
        <div className="absolute inset-0 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]" />

        {/* Content Layer */}
        <div className="relative z-10 h-full p-6 flex flex-col justify-between text-[#f4f4f4]">
          
          {/* Top Row: Logos */}
          <div className="flex items-start justify-between">
            <div>
              <div className="text-xs font-bold tracking-wider opacity-95">GENÇ KÜLTÜR KART</div>
              <div className="text-[10px] font-medium text-white/70 mt-0.5">Konya Büyükşehir</div>
            </div>
            <div className="w-10 h-10 rounded-lg bg-white/15 backdrop-blur-md border border-white/20 flex items-center justify-center">
              <CreditCard className="w-5 h-5 text-white/90" strokeWidth={2} />
            </div>
          </div>

          {/* Middle: Balance */}
          <div className="mt-auto mb-4">
            <div className="text-sm font-medium text-white/70 mb-1">Toplam Bakiye</div>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-black tracking-tight">2.450</span>
              <span className="text-lg font-bold text-white/90">GençCoin</span>
            </div>
          </div>

          {/* Bottom: User Info & Card Details */}
          <div className="flex items-end justify-between border-t border-white/15 pt-3">
            <div>
              <div className="text-xs font-bold tracking-wide">Fatih Yılmaz</div>
              <div className="text-[10px] text-white/60 mt-1 font-mono tracking-wider">**** **** **** 1453</div>
            </div>
            
            {/* QR Code Icon */}
            <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-md">
              <div className="w-10 h-10 bg-[#19142e] rounded-lg flex items-center justify-center">
                <QrCode className="w-6 h-6 text-white" strokeWidth={2} />
              </div>
            </div>
          </div>
        </div>

        {/* Glossy Reflection Effect (Premium Touch) */}
        <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/8 to-transparent pointer-events-none" />
      </div>
    </div>
  );
};
