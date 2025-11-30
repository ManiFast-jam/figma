import React, { useState } from 'react';
import { X, QrCode, CreditCard, ArrowLeftRight, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useCoins } from '../../contexts/CoinContext';

interface WalletModalProps {
  isOpen: boolean;
  onClose: () => void;
  isCardConnected?: boolean;
  userFullName?: string;
}

export const WalletModal = ({ isOpen, onClose, isCardConnected = true, userFullName = 'Fatih Yılmaz' }: WalletModalProps) => {
  const [isTransferring, setIsTransferring] = useState(false);
  const { coins: userCoins } = useCoins();

  // Mock API call for transferring coins to card
  const handleTransferToCard = async () => {
    const minTransfer = 100;

    // Validation
    if (userCoins < minTransfer) {
      alert(`Minimum ${minTransfer} Coin gerekli!`);
      return;
    }

    setIsTransferring(true);

    try {
      // Simulated API call
      // const response = await api.post('/wallet/transfer', {
      //   amount: userCoins,
      //   target: 'genc_kultur_kart',
      //   userId: 'user_123'
      // });

      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Success state
      alert('✅ Tebrikler! Coin\'leriniz Genç Kültür Kart\'ına yüklendi.');
      console.log('✅ Transfer successful:', {
        amount: userCoins,
        target: 'genc_kultur_kart',
        timestamp: new Date().toISOString()
      });
      
      // Close modal after success
      onClose();
    } catch (error) {
      console.error('❌ Transfer failed:', error);
      alert('❌ Transfer başarısız oldu. Lütfen tekrar deneyin.');
    } finally {
      setIsTransferring(false);
    }
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
            onClick={onClose}
            className="fixed inset-0 bg-[#01000b]/60 backdrop-blur-sm z-50"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="w-full max-w-sm pointer-events-auto"
            >
              {/* Close Button */}
              <div className="flex justify-end mb-3">
                <button
                  onClick={onClose}
                  className="w-10 h-10 rounded-full bg-[#ededff]/95 backdrop-blur-md shadow-lg flex items-center justify-center text-[#19142e] hover:bg-white transition-all"
                >
                  <X className="w-5 h-5" strokeWidth={2.5} />
                </button>
              </div>

              {isCardConnected ? (
                <ConnectedCard userCoins={userCoins} userFullName={userFullName} />
              ) : (
                <DisconnectedCard />
              )}

              {/* Focused CTA Buttons - Only show when connected */}
              {isCardConnected && (
                <div className="mt-6 space-y-3">
                  {/* PRIMARY CTA: Transfer Coins to Card */}
                  <button 
                    onClick={handleTransferToCard}
                    disabled={isTransferring}
                    className="w-full h-14 rounded-xl bg-[#5852c4] hover:bg-[#6c5ce7] active:scale-[0.98] transition-all shadow-lg shadow-[#5852c4]/30 flex items-center justify-center gap-3 text-white font-bold disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    <ArrowLeftRight className="w-5 h-5" strokeWidth={2.5} />
                    <span>{isTransferring ? 'Aktarılıyor...' : 'Coin\'leri Karta Aktar'}</span>
                  </button>

                  {/* SECONDARY ACTION: Transaction History */}
                  <button 
                    onClick={() => console.log('📜 Geçmiş İşlemler açıldı')}
                    className="w-full h-14 rounded-xl bg-[#F8F7FF] hover:bg-white border border-[#5852c4] active:scale-[0.98] transition-all flex items-center justify-center gap-3 text-[#5852c4] font-bold"
                  >
                    <Clock className="w-5 h-5" strokeWidth={2.5} />
                    <span>Geçmiş İşlemler</span>
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

interface ConnectedCardProps {
  userCoins: number;
  userFullName: string;
}

const ConnectedCard = ({ userCoins, userFullName }: ConnectedCardProps) => {
  return (
    <div className="relative w-full aspect-[1.586/1] rounded-xl overflow-hidden shadow-[0_20px_60px_rgba(25,20,46,0.25)]">
      
      {/* Violet Gradient Background with Depth */}
      <div className="absolute inset-0 violet-gradient" />

      {/* Neon Purple/Pink Geometric Triangles Pattern */}
      <div className="absolute inset-0 opacity-30">
        {/* Triangle 1 - Purple */}
        <div className="absolute top-[10%] left-[15%] w-24 h-24 rotate-45">
          <div className="w-full h-full bg-gradient-to-br from-purple-400 to-pink-400 opacity-60 blur-xl" 
               style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }} />
        </div>
        
        {/* Triangle 2 - Pink */}
        <div className="absolute top-[50%] right-[10%] w-32 h-32 -rotate-12">
          <div className="w-full h-full bg-gradient-to-br from-pink-400 to-purple-500 opacity-50 blur-2xl" 
               style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }} />
        </div>
        
        {/* Triangle 3 - Purple */}
        <div className="absolute bottom-[15%] left-[20%] w-20 h-20 rotate-[135deg]">
          <div className="w-full h-full bg-gradient-to-br from-purple-500 to-violet-400 opacity-70 blur-xl" 
               style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }} />
        </div>

        {/* Additional floating shapes for depth */}
        <div className="absolute top-[30%] left-[50%] w-16 h-16 rotate-45 bg-gradient-to-br from-fuchsia-400 to-purple-400 opacity-30 blur-2xl rounded-lg" />
        <div className="absolute bottom-[30%] right-[30%] w-20 h-20 -rotate-12 bg-gradient-to-br from-violet-400 to-pink-400 opacity-40 blur-xl" />
      </div>

      {/* Subtle inner glow effect (Cuberto signature) */}
      <div className="absolute inset-0 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]" />

      {/* Content Layer */}
      <div className="relative z-10 h-full p-6 flex flex-col justify-between text-[#f4f4f4]">
        
        {/* Top Row: Logos */}
        <div className="flex items-start justify-between">
          <div>
            <div className="text-xs font-bold tracking-wider opacity-95">GENÇ KÜLTÜR KART</div>
            <div className="text-[10px] font-medium text-white/70 mt-0.5">Konya Büyükşehir</div>
          </div>
          <div className="w-10 h-10 rounded-lg bg-white/15 backdrop-blur-md border border-white/20 flex items-center justify-center">
            <CreditCard className="w-5 h-5 text-white/90" strokeWidth={2} />
          </div>
        </div>

        {/* Middle: Balance */}
        <div className="mt-auto mb-4">
          <div className="text-sm font-medium text-white/70 mb-1">Toplam Bakiye</div>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-black tracking-tight">{userCoins.toLocaleString()}</span>
            <span className="text-lg font-bold text-white/90">GençCoin</span>
          </div>
        </div>

        {/* Bottom: User Info & Card Details */}
        <div className="flex items-end justify-between border-t border-white/15 pt-3">
          <div>
            <div className="text-xs font-bold tracking-wide">{userFullName}</div>
            <div className="text-[10px] text-white/60 mt-1 font-mono tracking-wider">**** **** **** 1453</div>
          </div>
          
          {/* QR Code Icon */}
          <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-md">
            <div className="w-10 h-10 bg-[#19142e] rounded-lg flex items-center justify-center">
              <QrCode className="w-6 h-6 text-white" strokeWidth={2} />
            </div>
          </div>
        </div>
      </div>

      {/* Glossy Reflection Effect (Premium Touch) */}
      <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/8 to-transparent pointer-events-none" />
    </div>
  );
};

const DisconnectedCard = () => {
  return (
    <div className="relative w-full aspect-[1.586/1] rounded-xl overflow-hidden shadow-[0_12px_40px_rgba(25,20,46,0.15)] border-2 border-dashed border-[#8279a5]/30 bg-gradient-to-br from-[#f2f3f7] to-[#ededff]">
      <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
        <div className="w-20 h-20 rounded-full violet-gradient flex items-center justify-center mb-4 shadow-lg">
          <CreditCard className="w-10 h-10 text-white" strokeWidth={2} />
        </div>
        <h3 className="font-bold text-[#19142e] mb-2">Genç Kültür Kartı Bağla</h3>
        <p className="text-sm text-[#8279a5] mb-6">Kartını bağlayarak tüm özelliklerden yararlan</p>
        <button className="px-8 py-3 btn-pill violet-gradient font-bold hover:shadow-lg transition-all active:scale-95">
          + Kartı Bağla
        </button>
      </div>
    </div>
  );
};

