import React from 'react';
import { ArrowUpRight, ArrowDownLeft, Wallet, MoreHorizontal } from 'lucide-react';

export const QuickActions = () => {
  const actions = [
    { icon: <ArrowUpRight className="w-6 h-6" />, label: 'Send' },
    { icon: <ArrowDownLeft className="w-6 h-6" />, label: 'Request' },
    { icon: <Wallet className="w-6 h-6" />, label: 'Top Up' },
    { icon: <MoreHorizontal className="w-6 h-6" />, label: 'More' },
  ];

  return (
    <div className="px-6 mb-8">
      <div className="flex justify-between items-center">
        {actions.map((action, index) => (
          <div key={index} className="flex flex-col items-center gap-2">
            <button className="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center text-[#1A3C75] hover:bg-slate-50 transition-colors active:scale-95 duration-200">
              {action.icon}
            </button>
            <span className="text-xs font-medium text-slate-600">{action.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
