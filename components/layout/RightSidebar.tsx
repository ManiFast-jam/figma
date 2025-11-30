import React from 'react';
import { MiniProfileCard } from '../sidebar/MiniProfileCard';
import { TrendingVertical } from '../sidebar/TrendingVertical';
import { SuggestedGames } from '../sidebar/SuggestedGames';

interface RightSidebarProps {
  onProfileClick?: () => void;
  onWalletOpen?: () => void;
  onGameClick?: (gameId: string) => void;
  onGameCenterClick?: () => void;
}

export const RightSidebar = ({ 
  onProfileClick, 
  onWalletOpen,
  onGameClick,
  onGameCenterClick 
}: RightSidebarProps) => {
  return (
    <aside className="hidden lg:block w-[30%]">
      <div className="sticky top-[80px] space-y-6">
        <MiniProfileCard onProfileClick={onProfileClick} />
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
