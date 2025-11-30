import React from 'react';
import { MiniProfileCard } from '../sidebar/MiniProfileCard';
import { TrendingVertical } from '../sidebar/TrendingVertical';
import { SuggestedGames } from '../sidebar/SuggestedGames';
import { useCoins } from '../../contexts/CoinContext';

interface RightSidebarProps {
  onProfileClick?: () => void;
  onWalletOpen?: () => void;
  onGameClick?: (gameId: string) => void;
  onGameCenterClick?: () => void;
  userCoins?: number;
}

export const RightSidebar = ({ 
  onProfileClick, 
  onWalletOpen,
  onGameClick,
  onGameCenterClick,
  userCoins: propUserCoins
}: RightSidebarProps) => {
  const { coins: contextCoins } = useCoins();
  const userCoins = contextCoins || propUserCoins || 6240;
  
  return (
    <aside className="hidden lg:block lg:flex-[0_0_30%] lg:max-w-[30%]">
      <div className="sticky top-[80px] space-y-6">
        <MiniProfileCard onProfileClick={onProfileClick} coins={userCoins} />
        <TrendingVertical />
        <SuggestedGames onGameClick={(gameId) => {
          if (gameId === 'all') {
            onGameCenterClick?.();
          } else {
            onGameClick?.(gameId);
          }
        }} />
      </div>
    </aside>
  );
};
