import React from 'react';
import { X, GraduationCap, Map, Disc, BarChart3, Camera } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useTheme } from '../../contexts/ThemeContext';

interface GameCenterOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onGameSelect: (gameId: string) => void;
}

export const GameCenterOverlay = ({ isOpen, onClose, onGameSelect }: GameCenterOverlayProps) => {
  const { isDarkMode } = useTheme();
  const games = [
    {
      id: 'exam-hero',
      title: 'Vize/Final Kahramanı',
      icon: <GraduationCap className="w-12 h-12" strokeWidth={2} />,
      reward: '+150 Coin',
      iconBg: 'bg-purple-100',
      iconColor: 'text-purple-600',
    },
    {
      id: 'campus-reporter',
      title: 'Kampüs Muhabiri',
      icon: <Camera className="w-12 h-12" strokeWidth={2} />,
      reward: '+75 Coin',
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600',
    },
    {
      id: 'treasure-hunt',
      title: 'Hazine Avı',
      icon: <Map className="w-12 h-12" strokeWidth={2} />,
      reward: '+100 Coin',
      iconBg: 'bg-amber-100',
      iconColor: 'text-amber-500',
    },
    {
      id: 'wheel-fortune',
      title: 'Şans Çarkı',
      icon: <Disc className="w-12 h-12" strokeWidth={2} />,
      reward: '+50 Coin',
      iconBg: 'bg-pink-100',
      iconColor: 'text-pink-500',
    },
    {
      id: 'daily-poll',
      title: 'Günün Anketi',
      icon: <BarChart3 className="w-12 h-12" strokeWidth={2} />,
      reward: '+10 Coin',
      iconBg: 'bg-green-100',
      iconColor: 'text-green-500',
    },
  ];

  const handleGameClick = (gameId: string) => {
    onClose();
    onGameSelect(gameId);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60]"
            onClick={onClose}
          />

          {/* Overlay Content */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="fixed inset-0 z-[70] flex flex-col"
          >
            {/* Background with Gradient */}
            <div className={`absolute inset-0 ${
              isDarkMode 
                ? 'bg-gradient-to-b from-[#1a1a2e] via-[#0f0e17] to-[#0f0e17]'
                : 'bg-gradient-to-b from-[#f3f3ff] via-white to-white'
            }`} />

            {/* Content Container */}
            <div className="relative flex flex-col h-full overflow-y-auto">
              {/* Header */}
              <div className="px-6 pt-12 pb-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h1 className={`text-3xl font-extrabold tracking-tight ${
                      isDarkMode ? 'text-white' : 'text-[#19142e]'
                    }`}>
                      Oyun Merkezi
                    </h1>
                    <p className={`mt-1.5 ${
                      isDarkMode ? 'text-slate-400' : 'text-[#8279a5]'
                    }`}>
                      Oyna ve Coinlerini Katla!
                    </p>
                  </div>
                  
                  {/* Close Button */}
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={onClose}
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                      isDarkMode 
                        ? 'bg-slate-800 hover:bg-slate-700' 
                        : 'bg-[#ededff] hover:bg-[#e0e0f5]'
                    }`}
                  >
                    <X className={`w-5 h-5 ${isDarkMode ? 'text-white' : 'text-[#19142e]'}`} strokeWidth={2.5} />
                  </motion.button>
                </div>
              </div>

              {/* Games Grid */}
              <div className="px-6 pb-32">
                <div className="grid grid-cols-2 gap-4">
                  {games.map((game, index) => {
                    // Last item spans full width for visual balance
                    const isLastOdd = games.length % 2 !== 0 && index === games.length - 1;
                    return (
                      <motion.button
                        key={game.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.3 }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleGameClick(game.id)}
                        className={`rounded-[10px] p-5 shadow-[0_2px_12px_rgba(25,20,46,0.08)] hover:shadow-[0_4px_20px_rgba(25,20,46,0.12)] transition-all duration-300 ${
                          isDarkMode ? 'bg-[#1a1a2e]' : 'bg-white'
                        } ${isLastOdd ? 'col-span-2' : ''}`}
                      >
                      {/* Icon Container */}
                      <div className={`w-20 h-20 mx-auto rounded-[10px] ${
                        isDarkMode 
                          ? 'bg-slate-800 ' + game.iconColor.replace('text-', 'text-')
                          : game.iconBg + ' ' + game.iconColor
                      } flex items-center justify-center mb-4`}>
                        {game.icon}
                      </div>

                      {/* Game Title */}
                      <h3 className={`font-bold mb-3 text-center ${
                        isDarkMode ? 'text-white' : 'text-[#19142e]'
                      }`}>
                        {game.title}
                      </h3>

                      {/* Reward Pill */}
                      <div className={`rounded-full px-3 py-1.5 inline-block w-full ${
                        isDarkMode ? 'bg-orange-900/30' : 'bg-orange-50'
                      }`}>
                        <span className={`font-bold text-sm ${
                          isDarkMode ? 'text-orange-400' : 'text-orange-600'
                        }`}>
                          {game.reward}
                        </span>
                      </div>
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
