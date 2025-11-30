import React from 'react';
import { Wallet, CreditCard, QrCode, UserPlus } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

interface QuickActionsProps {
  onActionClick?: (action: string) => void;
}

export const QuickActions = ({ onActionClick }: QuickActionsProps) => {
  const { isDarkMode } = useTheme();
  const actions = [
    { id: 'deposit', label: 'Para Yükle', icon: Wallet, color: 'bg-green-100 text-green-600' },
    { id: 'transfer', label: 'Karta Aktar', icon: CreditCard, color: 'bg-blue-100 text-blue-600' },
    { id: 'qr', label: 'QR Kod', icon: QrCode, color: 'bg-purple-100 text-purple-600' },
    { id: 'invite', label: 'Davet Et', icon: UserPlus, color: 'bg-orange-100 text-orange-600' },
  ];

  return (
    <div className={`rounded-[10px] p-5 shadow-[0_2px_12px_rgba(25,20,46,0.08)] hover:shadow-[0_4px_20px_rgba(25,20,46,0.12)] transition-all ${
      isDarkMode ? 'bg-[#1a1a2e]' : 'bg-white'
    }`}>
      <h3 className={`font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-[#19142e]'}`}>Hızlı İşlemler</h3>
      
      <div className="grid grid-cols-2 gap-3">
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <button
              key={action.id}
              onClick={() => onActionClick?.(action.id)}
              className={`flex flex-col items-center gap-2 p-4 rounded-[10px] transition-all group ${
                isDarkMode 
                  ? 'bg-slate-800/50 hover:bg-slate-700/50' 
                  : 'bg-[#f2f3f7] hover:bg-[#ededff]'
              }`}
            >
              <div className={`w-12 h-12 rounded-[10px] ${action.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                <Icon className="w-6 h-6" strokeWidth={2.5} />
              </div>
              <span className={`text-xs font-bold text-center ${isDarkMode ? 'text-white' : 'text-[#19142e]'}`}>{action.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
