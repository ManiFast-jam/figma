import React from 'react';
import { motion } from 'motion/react';
import { ChevronRight, Crown, Compass, Star, Diamond } from 'lucide-react';

// Badge Data with Clean, Flat Vector Icons
const BADGES = [
  { 
    id: 1,
    label: 'Lider', 
    level: 'Master',
    icon: Crown,
    colorClass: 'text-amber-500',
    bgClass: 'bg-amber-100',
    fill: true
  },
  { 
    id: 2,
    label: 'Kaşif', 
    level: 'Explorer',
    icon: Compass,
    colorClass: 'text-blue-500',
    bgClass: 'bg-blue-100',
    fill: true
  },
  { 
    id: 3,
    label: 'Çaylak', 
    level: 'Novice',
    icon: Star,
    colorClass: 'text-slate-500',
    bgClass: 'bg-slate-100',
    fill: true
  },
  { 
    id: 4,
    label: 'Nadir', 
    level: 'Rare',
    icon: Diamond,
    colorClass: 'text-purple-500',
    bgClass: 'bg-purple-100',
    fill: true
  },
];

const BadgeItem = ({ badge, delay }: { badge: typeof BADGES[0], delay: number }) => {
  const Icon = badge.icon;

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.4 }}
      className="flex flex-col items-center gap-3 shrink-0 w-20 group cursor-pointer"
    >
      {/* Soft Circular Container - Violet Depth Style */}
      <div className={`w-16 h-16 rounded-full ${badge.bgClass} flex items-center justify-center transition-all duration-300 group-hover:scale-110 shadow-[0_4px_16px_rgba(25,20,46,0.08)]`}>
         <Icon 
            className={`w-7 h-7 ${badge.colorClass} ${badge.fill ? 'fill-current' : ''}`} 
            strokeWidth={2}
         />
      </div>

      {/* Minimal Label */}
      <div className="text-center">
        <p className="text-xs font-bold text-[#19142e] leading-tight group-hover:text-[#5852c4] transition-colors">
            {badge.label}
        </p>
        <p className="text-[10px] font-semibold text-[#8279a5] mt-1 uppercase tracking-wide">
            {badge.level}
        </p>
      </div>
    </motion.div>
  );
};

export const BadgeShelf = () => {
  return (
    <div className="mb-10 px-5">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xs font-bold text-[#8279a5] uppercase tracking-widest">
           Başarılar
        </h3>
        <button className="flex items-center text-xs font-bold text-[#5852c4] hover:text-[#19142e] transition-colors bg-transparent p-0">
           Tümünü Gör
           <ChevronRight className="w-3 h-3 ml-1" />
        </button>
      </div>
      
      {/* Clean Row Layout */}
      <div className="flex items-start justify-between">
        {BADGES.map((badge, idx) => (
          <BadgeItem key={badge.id} badge={badge} delay={idx * 0.05} />
        ))}
      </div>
    </div>
  );
};
