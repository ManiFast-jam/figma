import React, { useEffect } from 'react';
import { X, Coins, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useTheme } from '../../contexts/ThemeContext';
import confetti from 'canvas-confetti';

interface BadgeSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  badgeName: string;
  badgeImage: string;
  coinReward: number;
  roleName?: string;
}

export const BadgeSuccessModal = ({ 
  isOpen, 
  onClose, 
  badgeName, 
  badgeImage, 
  coinReward,
  roleName 
}: BadgeSuccessModalProps) => {
  const { isDarkMode } = useTheme();

  // Trigger confetti explosion when modal opens
  useEffect(() => {
    if (isOpen) {
      // Multiple confetti bursts for celebration
      const duration = 3000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 10000 };

      function randomInRange(min: number, max: number) {
        return Math.random() * (max - min) + min;
      }

      const interval = setInterval(() => {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);

        // Launch from left
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
        });

        // Launch from right
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
        });
      }, 250);

      // Final burst from center
      setTimeout(() => {
        confetti({
          ...defaults,
          particleCount: 100,
          origin: { x: 0.5, y: 0.5 },
          colors: ['#5852c4', '#7c3aed', '#a855f7', '#ec4899', '#f59e0b', '#10b981']
        });
      }, 500);
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#01000b]/90 backdrop-blur-sm z-[100]"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              transition={{ type: 'spring', damping: 20, stiffness: 300 }}
              className={`w-full max-w-lg pointer-events-auto rounded-2xl overflow-hidden shadow-2xl ${
                isDarkMode ? 'bg-[#1a1a2e]' : 'bg-white'
              }`}
            >
              {/* Close Button */}
              <div className="absolute top-4 right-4 z-10">
                <button
                  onClick={onClose}
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
                {/* Gradient Header with Radial Background */}
                <div className="relative overflow-hidden bg-gradient-to-br from-[#5852c4] via-[#7c3aed] to-[#a855f7] px-8 py-12 text-center">
                  {/* Radial gradient overlay for depth */}
                  <div className="absolute inset-0 opacity-50" style={{ background: 'radial-gradient(circle, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%)' }} />
                  
                  {/* Animated Sparkles */}
                  <div className="absolute inset-0 overflow-hidden">
                    {[...Array(8)].map((_, i) => (
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
                          scale: [0, 1.5, 0],
                          rotate: [0, 180, 360],
                        }}
                        transition={{ 
                          duration: 2.5,
                          repeat: Infinity,
                          delay: i * 0.2,
                          ease: 'easeOut'
                        }}
                      >
                        <Sparkles className="w-5 h-5 text-yellow-300" />
                      </motion.div>
                    ))}
                  </div>

                  {/* Header Text */}
                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-4xl font-extrabold text-white mb-2 drop-shadow-lg relative z-10"
                  >
                    TEBRİKLER! 🎉
                  </motion.h2>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-white/90 text-lg font-semibold relative z-10"
                  >
                    {roleName ? `${roleName} Rozeti` : badgeName} ve +{coinReward} GençCoin Kazandın!
                  </motion.p>
                </div>

                {/* Body */}
                <div className={`px-8 py-8 ${isDarkMode ? 'bg-[#1a1a2e]' : 'bg-white'}`}>
                  {/* Badge Image - 3D Pop Effect */}
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ 
                      type: 'spring', 
                      stiffness: 200, 
                      damping: 15, 
                      delay: 0.4 
                    }}
                    className="flex justify-center mb-6"
                  >
                    <div className="relative">
                      {/* Glow effect behind badge */}
                      <div className="absolute inset-0 bg-gradient-to-r from-[#5852c4] via-[#7c3aed] to-[#a855f7] rounded-full blur-2xl opacity-50 animate-pulse" />
                      
                      {/* Badge Image */}
                      <motion.img
                        src={badgeImage}
                        alt={badgeName}
                        className="relative w-48 h-48 object-contain drop-shadow-2xl"
                        animate={{ 
                          y: [0, -10, 0],
                        }}
                        transition={{ 
                          duration: 2,
                          repeat: Infinity,
                          ease: 'easeInOut'
                        }}
                      />
                    </div>
                  </motion.div>

                  {/* Coin Reward Display */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="flex flex-col items-center mb-6"
                  >
                    <div className="flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-[#5852c4] to-[#7c3aed] shadow-lg">
                      <Coins className="w-6 h-6 text-white" strokeWidth={2.5} />
                      <div className={`text-3xl font-black text-white`}>
                        +{coinReward}
                      </div>
                      <div className={`text-lg font-bold text-white/90`}>
                        GençCoin
                      </div>
                    </div>
                  </motion.div>

                  {/* Info Text */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    className={`text-center mb-6 ${
                      isDarkMode ? 'text-slate-300' : 'text-gray-600'
                    }`}
                  >
                    <p className="text-base font-semibold mb-2">
                      {badgeName} rozetini kazandın! 🏆
                    </p>
                    <p className="text-sm">
                      Harika iş çıkardın! Daha fazla görev tamamlayarak daha fazla rozet kazanabilirsin.
                    </p>
                  </motion.div>

                  {/* CTA Button */}
                  <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    onClick={onClose}
                    className="w-full h-14 rounded-xl bg-gradient-to-r from-[#5852c4] to-[#7c3aed] hover:from-[#6c5ce7] hover:to-[#8b5cf6] text-white font-bold shadow-lg shadow-[#5852c4]/30 active:scale-[0.98] transition-all"
                  >
                    Harika! 🎯
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

