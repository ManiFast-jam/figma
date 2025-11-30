import React from 'react';
import { Coins } from 'lucide-react';

interface SimplifiedGlobalHeaderProps {
  onWalletClick: () => void;
  coinBalance?: string;
}

export const SimplifiedGlobalHeader: React.FC<SimplifiedGlobalHeaderProps> = ({
  onWalletClick,
  coinBalance = '2.450',
}) => {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-[#f2f3f7]">
      <div className="h-[60px] px-4 flex items-center justify-between">
        {/* Left: App Logo Icon Only */}
        <div className="flex items-center">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#5852c4] to-[#19142e] flex items-center justify-center shadow-md">
            <span className="font-black text-white text-lg">K</span>
          </div>
        </div>

        {/* Center: Empty/Clean Space */}
        <div className="flex-1" />

        {/* Right: Wallet Widget (Violet Pill) */}
        <button
          onClick={onWalletClick}
          className="flex items-center gap-2 px-4 py-2.5 bg-[#5852c4] rounded-full hover:bg-[#19142e] transition-all active:scale-95 shadow-md"
        >
          <Coins className="w-4 h-4 text-white" strokeWidth={2.5} />
          <span className="font-extrabold text-white text-sm">{coinBalance}</span>
        </button>
      </div>
    </div>
  );
};
