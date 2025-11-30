import React from 'react';
import { CreditCard, ArrowDownLeft, ArrowUpRight } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

export const BalanceCard = () => {
  const { isDarkMode } = useTheme();
  
  return (
    <div className="px-6 mb-6">
      <div className={`w-full rounded-3xl p-6 text-white shadow-xl relative overflow-hidden transition-colors ${
        isDarkMode ? 'bg-slate-800 shadow-black/40' : 'bg-[#1A3C75] shadow-blue-900/20'
      }`}>
        {/* Decorative circles */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#F59E0B]/20 rounded-full blur-xl"></div>

        <div className="relative z-10">
          <div className="flex justify-between items-start mb-8">
            <div>
              <p className="text-blue-200 text-sm font-medium mb-1">Total Balance</p>
              <h1 className="text-4xl font-bold tracking-tight">$24,562.00</h1>
            </div>
            <div className="bg-white/20 backdrop-blur-md p-2 rounded-lg">
              <CreditCard className="w-6 h-6 text-white" />
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center">
                <ArrowDownLeft className="w-4 h-4 text-emerald-400" />
              </div>
              <div>
                <p className="text-xs text-blue-200">Income</p>
                <p className="font-semibold">$2,450</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-rose-500/20 flex items-center justify-center">
                <ArrowUpRight className="w-4 h-4 text-rose-400" />
              </div>
              <div>
                <p className="text-xs text-blue-200">Expense</p>
                <p className="font-semibold">$1,205</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
