import React from 'react';
import { RightSidebar } from './RightSidebar';

interface PageLayoutProps {
  children: React.ReactNode;
  onTabChange?: (tab: string) => void;
  onWalletOpen?: () => void;
  onGameClick?: (gameId: string) => void;
  onGameCenterClick?: () => void;
  showSidebar?: boolean;
}

export const PageLayout = ({ 
  children, 
  onTabChange,
  onWalletOpen,
  onGameClick,
  onGameCenterClick,
  showSidebar = true 
}: PageLayoutProps) => {
  return (
    <div className="max-w-[1200px] mx-auto px-0 lg:px-6">
      <div className="flex gap-6">
        
        {/* LEFT COLUMN - Main Content (70%) */}
        <main className="w-full lg:flex-[0_0_70%] lg:max-w-[70%]">
          {children}
        </main>

        {/* RIGHT COLUMN - Sticky Sidebar (30%) - Desktop Only */}
        {showSidebar && (
          <RightSidebar 
            onProfileClick={() => onTabChange?.('profile')}
            onWalletOpen={onWalletOpen}
            onGameClick={onGameClick}
            onGameCenterClick={onGameCenterClick}
          />
        )}

      </div>
    </div>
  );
};
