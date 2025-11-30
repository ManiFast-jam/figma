import React from 'react';
import { Crown, Users, Award } from 'lucide-react';

export const StatsRow = () => {
  const stats = [
    { label: 'Level', value: '12', icon: <Crown className="w-5 h-5 text-amber-500" /> },
    { label: 'Takipçi', value: '850', icon: <Users className="w-5 h-5 text-blue-600" /> },
    { label: 'Katkı', value: '48', icon: <Award className="w-5 h-5 text-emerald-500" /> },
  ];

  return (
    <div className="px-6 mb-8">
      <div className="grid grid-cols-3 gap-3">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-2xl p-3 shadow-[0_2px_15px_rgba(0,0,0,0.03)] border border-slate-50 flex flex-col items-center justify-center text-center gap-1.5 min-h-[90px]">
            <div className="p-2 rounded-full bg-slate-50">
                {stat.icon}
            </div>
            <div>
                <div className="font-bold text-[#1A3C75] text-lg leading-none mb-0.5">{stat.value}</div>
                <div className="text-[10px] font-medium text-slate-400 uppercase tracking-wide">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
