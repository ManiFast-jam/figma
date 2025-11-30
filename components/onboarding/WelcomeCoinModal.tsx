import React from 'react';
import { X, Coins, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useTheme } from '../../contexts/ThemeContext';
import { useCoins } from '../../contexts/CoinContext';
import { toast } from 'sonner';

interface WelcomeCoinModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WelcomeCoinModal = ({ isOpen, onClose }: WelcomeCoinModalProps) => {
  const { isDarkMode } = useTheme();
  const { addCoins } = useCoins();

  const handleWelcomeComplete = () => {
    // Give welcome bonus coins (50 coins)
    addCoins(50);
    toast.success('Hoşgeldin! +50 GençCoin kazandın!');
    onClose();
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
            onClick={handleWelcomeComplete}
            className="fixed inset-0 bg-[#01000b]/80 backdrop-blur-sm z-[100]"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className={`w-full max-w-md pointer-events-auto rounded-2xl overflow-hidden shadow-2xl ${
                isDarkMode ? 'bg-[#1a1a2e]' : 'bg-white'
              }`}
            >
              {/* Close Button */}
              <div className="absolute top-4 right-4 z-10">
                <button
                  onClick={handleWelcomeComplete}
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                    isDarkMode 
                      ? 'bg-slate-800/80 hover:bg-slate-700 text-slate-300' 
                      : 'bg-white/90 hover:bg-white text-gray-600 shadow-lg'
                  }`}
                >
                  <X className="w-5 h-5" strokeWidth={2.5} />
                </button>
              </div>

              {/* Content */}
              <div className="relative">
                {/* Gradient Header */}
                <div className="relative overflow-hidden violet-gradient px-8 py-12 text-center">
                  {/* Animated Sparkles */}
                  <div className="absolute inset-0 overflow-hidden">
                    {[...Array(6)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute"
                        initial={{ 
                          x: Math.random() * 100 + '%',
                          y: Math.random() * 100 + '%',
                          opacity: 0,
                          scale: 0
                        }}
                        animate={{ 
                          opacity: [0, 1, 0],
                          scale: [0, 1, 0],
                          y: [0, -30, -60],
                        }}
                        transition={{ 
                          duration: 2,
                          repeat: Infinity,
                          delay: i * 0.3,
                          ease: 'easeOut'
                        }}
                      >
                        <Sparkles className="w-6 h-6 text-yellow-300" />
                      </motion.div>
                    ))}
                  </div>

                  {/* Coin Icon */}
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
                    className="w-24 h-24 mx-auto mb-6 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border-4 border-white/30 shadow-2xl"
                  >
                    <Coins className="w-12 h-12 text-white" strokeWidth={2.5} />
                  </motion.div>

                  {/* Welcome Text */}
                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-3xl font-extrabold text-white mb-2 drop-shadow-lg"
                  >
                    KonSens'e Hoşgeldin! 🎉
                  </motion.h2>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="text-white/90 text-lg font-semibold"
                  >
                    İlk coin'lerini kazandın!
                  </motion.p>
                </div>

                {/* Body */}
                <div className={`px-8 py-8 ${isDarkMode ? 'bg-[#1a1a2e]' : 'bg-white'}`}>
                  {/* Coin Reward Display */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200, delay: 0.6 }}
                    className="flex flex-col items-center mb-6"
                  >
                    <div className={`text-6xl font-black mb-2 ${
                      isDarkMode ? 'text-white' : 'text-[#19142e]'
                    }`}>
                      +50
                    </div>
                    <div className={`text-xl font-bold ${
                      isDarkMode ? 'text-slate-400' : 'text-[#8279a5]'
                    }`}>
                      GençCoin
                    </div>
                  </motion.div>

                  {/* Info Text */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    className={`text-center mb-6 space-y-3 ${
                      isDarkMode ? 'text-slate-300' : 'text-gray-600'
                    }`}
                  >
                    <p className="text-base font-semibold">
                      Oyunlar oyna, içerik üret, katkı yap ve coin kazan!
                    </p>
                    <p className="text-sm">
                      Rolün yükseldikçe daha fazla coin kazanacaksın. Hadi başlayalım! 🚀
                    </p>
                  </motion.div>

                  {/* CTA Button */}
                  <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    onClick={handleWelcomeComplete}
                    className="w-full h-14 rounded-xl bg-gradient-to-r from-[#5852c4] to-[#7c3aed] hover:from-[#6c5ce7] hover:to-[#8b5cf6] text-white font-bold shadow-lg shadow-[#5852c4]/30 active:scale-[0.98] transition-all"
                  >
                    Harika! Başlayalım 🎯
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

