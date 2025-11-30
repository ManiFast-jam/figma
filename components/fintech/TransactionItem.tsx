import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';

export interface Transaction {
  id: string;
  title: string;
  category: string;
  amount: number;
  date: string;
  type: 'income' | 'expense';
  icon: React.ReactNode;
}

export const TransactionItem = ({ transaction }: { transaction: Transaction }) => {
  const { isDarkMode } = useTheme();
  
  return (
    <div className={`flex items-center justify-between p-4 rounded-2xl mb-3 shadow-sm hover:shadow-md transition-all cursor-pointer ${
      isDarkMode ? 'bg-[#1a1a2e]' : 'bg-white'
    }`}>
      <div className="flex items-center gap-4">
        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
          isDarkMode ? 'bg-slate-800' : 'bg-slate-50'
        }`}>
          {transaction.icon}
        </div>
        <div>
          <h4 className={`font-bold text-sm ${isDarkMode ? 'text-white' : 'text-[#1A3C75]'}`}>{transaction.title}</h4>
          <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>{transaction.category}</p>
        </div>
      </div>
      <div className="text-right">
        <p className={`font-bold text-sm ${transaction.type === 'income' ? 'text-emerald-600' : (isDarkMode ? 'text-white' : 'text-slate-900')}`}>
          {transaction.type === 'income' ? '+' : ''}{transaction.amount.toFixed(2)}
        </p>
        <p className={`text-xs ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>{transaction.date.split(',')[0]}</p>
      </div>
    </div>
  );
};
