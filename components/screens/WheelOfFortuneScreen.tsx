import React, { useState } from 'react';
import { Disc } from 'lucide-react';
import { motion } from 'motion/react';
import { GlobalHeader } from '../layout/GlobalHeader';
import { RightSidebar } from '../layout/RightSidebar';
import { WalletModal } from '../wallet/WalletModal';

interface WheelOfFortuneScreenProps {
  onBack?: () => void;
  activeTab?: string;
  onTabChange?: (tab: string) => void;
  onGameCenterClick?: () => void;
}

export const WheelOfFortuneScreen = ({ onBack, activeTab = 'home', onTabChange, onGameCenterClick }: WheelOfFortuneScreenProps) => {
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);

  return (
    <>
      <div className="min-h-screen bg-[#f2f3f7] pb-28 lg:pb-6">
        <div className="hidden lg:block">
          <GlobalHeader 
            type="rich"
            onWalletClick={() => setIsWalletModalOpen(true)}
            coinBalance="2.450"
            activeTab={activeTab}
            onTabChange={onTabChange}
            onGameCenterClick={onGameCenterClick}
            onBackClick={onBack}
          />
        </div>

        <div className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-white border-b border-gray-200">
          <button 
            onClick={onBack}
            className="flex items-center gap-3 px-5 py-3 hover:bg-gray-50 transition-colors w-full"
          >
            <Disc className="w-5 h-5 text-[#111827]" strokeWidth={2.5} />
            <span className="font-extrabold text-[#111827]">Şans Çarkı</span>
          </button>
        </div>

        {/* Desktop 70/30 Layout Container */}
        <div className="max-w-[1200px] mx-auto pt-[60px] lg:pt-[84px] px-6 lg:px-6 py-12">
          <div className="flex gap-6">
            
            {/* LEFT COLUMN - Main Content (70%) */}
            <main className="w-full lg:w-[70%]">
          
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-[12px] p-8 shadow-[0_2px_16px_rgba(25,20,46,0.08)] text-center"
          >
            <div className="w-24 h-24 mx-auto mb-6 bg-pink-100 rounded-full flex items-center justify-center">
              <Disc className="w-12 h-12 text-pink-600" strokeWidth={2} />
            </div>

            <h2 className="text-2xl font-bold text-[#19142e] mb-3">
              Çok Yakında!
            </h2>
            <p className="text-[#8279a5] mb-6">
              Şansını denemeye hazır mısın? Bu özellik çok yakında aktif olacak.
            </p>

            <div className="bg-pink-50 rounded-[10px] p-4 mb-6">
              <p className="text-pink-700 text-sm">
                Günlük 1 hak ile büyük ödüller kazan!
              </p>
            </div>
          </motion.div>

            </main>

            {/* RIGHT COLUMN - Sticky Sidebar (30%) - Desktop Only */}
            <RightSidebar 
              onProfileClick={() => onTabChange?.('profile')}
              onWalletOpen={() => setIsWalletModalOpen(true)}
              onGameClick={() => {}}
              onGameCenterClick={onGameCenterClick}
            />

          </div>
        </div>
      </div>

      <WalletModal 
        isOpen={isWalletModalOpen}
        onClose={() => setIsWalletModalOpen(false)}
      />
    </>
  );
};
