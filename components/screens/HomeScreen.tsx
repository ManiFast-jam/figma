import React from 'react';
import { Search, Bell, Zap, Wallet, Compass, ChevronRight } from 'lucide-react';
import { BalanceCard } from '../fintech/BalanceCard';
import { QuickActions } from '../fintech/QuickActions';
import { TransactionItem, Transaction } from '../fintech/TransactionItem';
import { useTheme } from '../../contexts/ThemeContext';

const RECENT_TRANSACTIONS: Transaction[] = [
  {
    id: '1',
    title: 'Netflix Subscription',
    category: 'Entertainment',
    amount: -14.99,
    date: 'Today, 10:23 AM',
    type: 'expense',
    icon: <Zap className="w-5 h-5 text-purple-500" />,
  },
  {
    id: '2',
    title: 'Freelance Payment',
    category: 'Income',
    amount: 850.00,
    date: 'Yesterday, 4:45 PM',
    type: 'income',
    icon: <Wallet className="w-5 h-5 text-emerald-500" />,
  },
  {
    id: '3',
    title: 'Uber Ride',
    category: 'Transport',
    amount: -24.50,
    date: 'Nov 24, 8:30 PM',
    type: 'expense',
    icon: <Compass className="w-5 h-5 text-blue-500" />,
  },
  {
    id: '4',
    title: 'Grocery Store',
    category: 'Food',
    amount: -124.35,
    date: 'Nov 23, 11:15 AM',
    type: 'expense',
    icon: <Search className="w-5 h-5 text-orange-500" />,
  },
];

const HomeHeader = () => {
  const { isDarkMode } = useTheme();
  
  return (
    <header className={`flex items-center justify-between px-6 py-6 sticky top-0 z-40 transition-colors ${
      isDarkMode ? 'bg-[#0f0e17]' : 'bg-[#F5F7FA]'
    }`}>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-[#1A3C75] flex items-center justify-center text-white font-bold text-lg shadow-sm">
          JD
        </div>
        <div>
          <p className={`text-sm font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Welcome back,</p>
          <h2 className={`font-bold text-xl leading-none ${isDarkMode ? 'text-white' : 'text-[#1A3C75]'}`}>John Doe</h2>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <button className={`p-2 rounded-full shadow-sm transition-colors ${
          isDarkMode ? 'bg-slate-800 hover:bg-slate-700' : 'bg-white hover:bg-slate-50'
        }`}>
           <Search className={`w-6 h-6 ${isDarkMode ? 'text-white' : 'text-[#1A3C75]'}`} />
        </button>
        <button className={`p-2 rounded-full shadow-sm transition-colors relative ${
          isDarkMode ? 'bg-slate-800 hover:bg-slate-700' : 'bg-white hover:bg-slate-50'
        }`}>
          <Bell className={`w-6 h-6 ${isDarkMode ? 'text-white' : 'text-[#1A3C75]'}`} />
          <span className={`absolute top-2 right-2 w-2.5 h-2.5 bg-[#F59E0B] rounded-full border-2 ${
            isDarkMode ? 'border-slate-800' : 'border-white'
          }`}></span>
        </button>
      </div>
    </header>
  );
};

export const HomeScreen = () => {
  const { isDarkMode } = useTheme();
  
  return (
    <>
      <HomeHeader />
      <main className={`max-w-md mx-auto w-full transition-colors ${isDarkMode ? 'bg-[#0f0e17]' : ''}`}>
        <BalanceCard />
        <QuickActions />
        <div className="px-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-[#1A3C75]'}`}>Recent Activity</h3>
            <button className="text-sm text-[#F59E0B] font-semibold flex items-center hover:text-amber-600 transition-colors">
              See All <ChevronRight className="w-4 h-4 ml-1" />
            </button>
          </div>

          <div className="space-y-1">
            {RECENT_TRANSACTIONS.map((t) => (
              <TransactionItem key={t.id} transaction={t} />
            ))}
          </div>
        </div>
      </main>
    </>
  );
};
