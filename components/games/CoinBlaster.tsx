import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Trophy, Zap, Target, Clock } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { useCoins } from '../../contexts/CoinContext';
import { toast } from 'sonner';

/**
 * CoinBlaster Oyun Komponenti
 * Three.js tabanlı Wormhole Blaster oyununu React'a entegre eder
 */
export const CoinBlaster = () => {
  const { isDarkMode } = useTheme();
  const { addCoins, triggerCoinAnimation } = useCoins();
  const containerRef = useRef<HTMLDivElement>(null);
  const cleanupRef = useRef<(() => void) | null>(null);
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasPlayed, setHasPlayed] = useState(false);
  const [gameResult, setGameResult] = useState<{
    gencCoins: number;
    totalCoins: number;
    timeLimit: number;
  } | null>(null);

  // Oyunun daha önce oynanıp oynanmadığını kontrol et
  useEffect(() => {
    const played = localStorage.getItem('coinBlasterPlayed');
    if (played === 'true') {
      setHasPlayed(true);
      // Eğer sonuç kaydedilmişse, onu da göster
      const savedResult = localStorage.getItem('coinBlasterResult');
      if (savedResult) {
        setGameResult(JSON.parse(savedResult));
      }
    }
  }, []);

  // Oyunu başlat
  const handleStartGame = async () => {
    console.log('🔵 BUTON BASILDI!');
    
    if (hasPlayed) {
      console.log('❌ Oyun zaten oynanmış');
      toast.error('Bu oyunu sadece bir kere oynayabilirsiniz!');
      return;
    }
    
    if (isPlaying) {
      console.log('❌ Oyun zaten oynuyor');
      return;
    }
    
    if (!containerRef.current) {
      console.log('❌ Container ref bulunamadı!');
      return;
    }
    
    console.log('✅ Container hazır, oyun başlatılıyor...');

    setIsLoading(true);
    setGameResult(null);

    try {
      console.log('🎮 Oyun yükleniyor...');
      
      // Dynamic import ile game.js'i yükle
      const gameModule = await import('../../lib/blaster/game.js');
      const initGame = gameModule.initGame || gameModule.default;

      if (!initGame) {
        throw new Error('initGame fonksiyonu bulunamadı');
      }

      console.log('✅ Game modülü yüklendi');

      // Kısa bir delay ile UI'nin güncellenmesini bekle
      setTimeout(() => {
        if (!containerRef.current) {
          setIsLoading(false);
          return;
        }

        console.log('🚀 Oyun başlatılıyor...');

        // Game Over callback'i
        (window as any).onGameOver = (result: any) => {
          console.log('🎮 Oyun bitti!', result);
          setGameResult(result);
          setIsPlaying(false);
          setHasPlayed(true);
          
          // Oyunun oynanmış olduğunu kaydet
          localStorage.setItem('coinBlasterPlayed', 'true');
          localStorage.setItem('coinBlasterResult', JSON.stringify(result));
          
          // Kazanılan coin'leri ekle
          if (result.totalCoins > 0) {
            // Coin'leri cüzdana ekle
            addCoins(result.totalCoins);
            
            // Coin animasyonunu tetikle
            triggerCoinAnimation();
            
            // Başarı bildirimi
            toast.success(
              `🎉 Tebrikler! +${result.totalCoins} GençCoin kazandınız!`,
              {
                description: `${result.gencCoins} kutu vurdunuz! Coin'ler cüzdanınıza eklendi.`,
                duration: 5000,
              }
            );
          } else {
            toast.info('Oyun bitti! Tekrar deneyin.', {
              duration: 3000,
            });
          }
        };

        try {
          // Oyunu başlat
          const cleanup = initGame(containerRef.current);
          cleanupRef.current = cleanup;
          setIsPlaying(true);
          setIsLoading(false);

          console.log('✅ CoinBlaster başlatıldı');
        } catch (err) {
          console.error('❌ Oyun başlatma hatası:', err);
          toast.error('Oyun başlatılamadı: ' + (err as Error).message);
          setIsLoading(false);
        }
      }, 100);
    } catch (error) {
      console.error('❌ Oyun yükleme hatası:', error);
      toast.error('Oyun yüklenemedi. Lütfen tekrar deneyin.');
      setIsLoading(false);
    }
  };

  // Component unmount - cleanup
  useEffect(() => {
    return () => {
      if (cleanupRef.current) {
        console.log('🧹 CoinBlaster temizleniyor...');
        cleanupRef.current();
        cleanupRef.current = null;
        (window as any).onGameOver = null;
      }
    };
  }, []);

  console.log('🔍 CoinBlaster render:', { isPlaying, isLoading, hasResult: !!gameResult });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`rounded-xl overflow-hidden shadow-lg ${
        isDarkMode ? 'bg-[#1a1a2e]' : 'bg-white'
      }`}
    >
      {/* Oyun Container - Her zaman DOM'da olmalı */}
      <div 
        ref={containerRef}
        className={`w-full bg-black ${isPlaying ? 'block' : 'hidden'}`}
        style={{ 
          height: '500px',
          maxHeight: '500px',
          position: 'relative',
          overflow: 'hidden',
          isolation: 'isolate'
        }}
      />

      {/* Start Screen */}
      <AnimatePresence>
        {!isPlaying && !gameResult && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="p-8"
          >
            {/* Title */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="text-center mb-8"
            >
              <div className="flex items-center justify-center gap-3 mb-4">
                <Target className="w-12 h-12 text-[#5852c4]" strokeWidth={2.5} />
                <h2 className={`text-4xl font-extrabold ${
                  isDarkMode ? 'text-white' : 'text-[#19142e]'
                }`}>
                  Coin Blaster
                </h2>
              </div>
              <p className={`text-lg ${
                isDarkMode ? 'text-slate-300' : 'text-[#8279a5]'
              }`}>
                30 saniyede kutulara ateş et ve GençCoin kazan! 🎯
              </p>
            </motion.div>

            {/* Features */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="grid grid-cols-3 gap-4 mb-8"
            >
              <div className={`p-4 rounded-lg ${
                isDarkMode ? 'bg-[#0f0e17]' : 'bg-[#f2f3f7]'
              }`}>
                <Clock className="w-6 h-6 text-[#5852c4] mx-auto mb-2" strokeWidth={2.5} />
                <p className={`text-sm font-bold text-center ${
                  isDarkMode ? 'text-white' : 'text-[#19142e]'
                }`}>
                  30 Saniye
                </p>
              </div>
              <div className={`p-4 rounded-lg ${
                isDarkMode ? 'bg-[#0f0e17]' : 'bg-[#f2f3f7]'
              }`}>
                <Trophy className="w-6 h-6 text-orange-500 mx-auto mb-2" strokeWidth={2.5} />
                <p className={`text-sm font-bold text-center ${
                  isDarkMode ? 'text-white' : 'text-[#19142e]'
                }`}>
                  GençCoin
                </p>
              </div>
              <div className={`p-4 rounded-lg ${
                isDarkMode ? 'bg-[#0f0e17]' : 'bg-[#f2f3f7]'
              }`}>
                <Zap className="w-6 h-6 text-yellow-500 mx-auto mb-2" strokeWidth={2.5} />
                <p className={`text-sm font-bold text-center ${
                  isDarkMode ? 'text-white' : 'text-[#19142e]'
                }`}>
                  Aksiyon
                </p>
              </div>
            </motion.div>

            {/* Start Button */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="text-center"
            >
              <motion.button
                whileHover={{ scale: hasPlayed ? 1 : 1.05 }}
                whileTap={{ scale: hasPlayed ? 1 : 0.95 }}
                onClick={handleStartGame}
                disabled={isLoading || hasPlayed}
                className="px-12 py-4 bg-gradient-to-r from-[#5852c4] to-[#7c3aed] hover:from-[#6c5ce7] hover:to-[#8b5cf6] text-white text-xl font-bold rounded-xl transition-all shadow-lg shadow-[#5852c4]/30 hover:shadow-xl hover:shadow-[#5852c4]/40 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                    />
                    Yükleniyor...
                  </span>
                ) : hasPlayed ? (
                  '✓ Oynadınız'
                ) : (
                  '🎮 OYNA'
                )}
              </motion.button>
            </motion.div>

            {/* Info */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className={`mt-6 px-4 py-2 rounded-lg ${
                isDarkMode ? 'bg-orange-900/20' : 'bg-orange-50'
              }`}
            >
              <p className={`text-sm text-center ${
                isDarkMode ? 'text-orange-400' : 'text-orange-600'
              }`}>
                ⚠️ Bu oyunu sadece bir kere oynayabilirsiniz!
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Game Over Screen */}
      {gameResult && !isPlaying && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-8"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="text-center"
          >
            <Trophy className="w-20 h-20 text-yellow-500 mx-auto mb-4" strokeWidth={2} />
            <h2 className={`text-4xl font-extrabold mb-2 ${
              isDarkMode ? 'text-white' : 'text-[#19142e]'
            }`}>
              Oyun Bitti! 🎉
            </h2>
            <div className="my-6 p-6 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-xl border-2 border-green-500">
              <p className="text-green-500 text-lg font-bold mb-2">
                + Cüzdanınıza Eklendi
              </p>
              <p className="text-6xl font-extrabold mb-2 text-green-500">
                +{gameResult.totalCoins}
              </p>
              <p className={`text-xl flex items-center justify-center gap-2 ${
                isDarkMode ? 'text-slate-300' : 'text-[#8279a5]'
              }`}>
                <span className="text-2xl">💰</span> GençCoin
              </p>
            </div>
            <div className={`mb-6 p-4 rounded-lg ${
              isDarkMode ? 'bg-[#0f0e17]' : 'bg-[#f2f3f7]'
            }`}>
              <p className={`text-lg ${
                isDarkMode ? 'text-slate-300' : 'text-[#8279a5]'
              }`}>
                🎯 {gameResult.gencCoins} kutu vurdunuz
              </p>
              <p className={`text-sm mt-1 ${
                isDarkMode ? 'text-slate-400' : 'text-[#8279a5]'
              }`}>
                ⏱️ {gameResult.timeLimit} saniyede tamamlandı
              </p>
            </div>
            
            {/* Oyun Tamamlandı Mesajı */}
            <div className={`mt-4 px-4 py-2 rounded-lg ${
              isDarkMode ? 'bg-green-900/20' : 'bg-green-50'
            }`}>
              <p className={`text-sm text-center ${
                isDarkMode ? 'text-green-400' : 'text-green-600'
              }`}>
                ✓ Bu oyunu tamamladınız. Coin'leriniz cüzdanınıza eklendi!
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default CoinBlaster;
