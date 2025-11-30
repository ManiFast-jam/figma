import React, { useState } from 'react';
import { ChevronLeft, Lock } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { GlobalHeader } from '../layout/GlobalHeader';
import { PageLayout } from '../layout/PageLayout';
import { WalletModal } from '../wallet/WalletModal';
const kasifBadge = '/images/b720c92d392edc4e03737e032c4f64b443d69150.png';
const seyyahBadge = '/images/00b07162d5b8b006019514145544fe2039cee667.png';
const gezginBadge = '/images/628becb8ed3dbf1dbd57717ef0eda68173b358fa.png';
const konyaBilgesiBadge = '/images/dbaf5bf559d0798ca2d47548efbfd6637cc9d70c.png';
const yeniGelenBadge = '/images/0b861b805523faa4af6e4a425b93c74c77b7e047.png';
const bilgi42Badge = '/images/fd6b625b186aa33e168e62fb08f8f1f35731752f.png';
const gun42Badge = '/images/2aec241ba83a0a727696ec3f6c38eded549d7dd0.png';
const kilavuzBadge = '/images/ed2b6d54f489f32196dc47a87dc210441c036a30.png';
const elciBadge = '/images/fd938016685ebc6970d86e36686f9c2ede37ed7a.png';
const oncuBadge = '/images/d47de86a59fb1df6ddab2251f2d0083c430221d0.png';
const ustaBadge = '/images/5b0cb869d1730a25db9c7579b17ced33967521ed.png';
const efsaneBadge = '/images/be58c457f713b2de619a2047b5e217ed3e53a461.png';
const gonulluBadge = '/images/8b9ae9f76b67c840289eabe2979566e550fd68ba.png';
const arsivciBadge = '/images/746c7390f47d5fc61f30caf49a560479931bbcdc.png';
const geziciBadge = '/images/5ba2f6ea349425d2bb29bcc9c5e2bf353f8b1fbb.png';

interface Badge {
  id: number;
  name: string;
  image: string;
  glow: string;
  description: string;
  requirement: string;
  unlocked: boolean;
  unlockedDate?: string;
}

const ALL_BADGES: Badge[] = [
  { 
    id: 1, 
    name: 'Yeni Gelen', 
    image: yeniGelenBadge, 
    glow: 'rgba(107, 114, 128, 0.4)',
    description: 'KonyaGenç\'e hoş geldin! Keşfetmeye başlamak için ilk adımı attın.',
    requirement: 'Uygulamayı ilk kez aç',
    unlocked: true,
    unlockedDate: '15 Kasım 2024'
  },
  { 
    id: 2, 
    name: 'Seyyah', 
    image: seyyahBadge, 
    glow: 'rgba(156, 163, 175, 0.5)',
    description: 'Yolculuğa başladın! 500 GençCoin topladın ve şehri keşfediyorsun.',
    requirement: '500 GençCoin kazanarak Seyyah rütbesine ulaş',
    unlocked: true,
    unlockedDate: '20 Kasım 2024'
  },
  { 
    id: 3, 
    name: 'Gezgin', 
    image: gezginBadge, 
    glow: 'rgba(88, 82, 196, 0.5)',
    description: 'Aktif bir KonyaGenç kullanıcısısın! 2.500 GençCoin ile gezginler arasındasın.',
    requirement: '2.500 GençCoin kazanarak Gezgin rütbesine ulaş',
    unlocked: true,
    unlockedDate: '25 Kasım 2024'
  },
  { 
    id: 4, 
    name: 'Kaşif Meraklısı', 
    image: kasifBadge, 
    glow: 'rgba(88, 82, 196, 0.5)',
    description: 'Konya\'nın derinliklerini keşfediyorsun! 10.000 GençCoin ile kaşiflerdensin.',
    requirement: '10.000 GençCoin kazanarak Kaşif Meraklısı rütbesine ulaş',
    unlocked: false,
    unlockedDate: undefined
  },
  { 
    id: 5, 
    name: '42 Bilgi', 
    image: bilgi42Badge, 
    glow: 'rgba(59, 130, 246, 0.5)',
    description: 'Bilgi paylaşımında ustasın! 42 kaliteli Wiki bilgisi ekleyerek katkı yaptın.',
    requirement: 'Wiki\'ye 42 bilgi ekle',
    unlocked: false,
    unlockedDate: undefined
  },
  { 
    id: 6, 
    name: 'Konya Bilgesi', 
    image: konyaBilgesiBadge, 
    glow: 'rgba(59, 130, 246, 0.5)',
    description: 'Konya\'nın her yerini biliyorsun! 50.000 GençCoin ile bilgeler arasındasın.',
    requirement: '50.000 GençCoin kazanarak Konya Bilgesi rütbesine ulaş',
    unlocked: false,
    unlockedDate: undefined
  },
  { 
    id: 7, 
    name: '42 Gün', 
    image: gun42Badge, 
    glow: 'rgba(156, 163, 175, 0.5)',
    description: 'Disiplin ve kararlılık! 42 gün boyunca her gün KonyaGenç\'i ziyaret ettin.',
    requirement: 'Üst üste 42 gün giriş yap',
    unlocked: false,
    unlockedDate: undefined
  },
  { 
    id: 8, 
    name: 'Kılavuz', 
    image: kilavuzBadge, 
    glow: 'rgba(34, 197, 94, 0.5)',
    description: 'Yeni öğrencilere yol gösteriyorsun! Rehberlik yaparak Konya\'yı tanıtıyorsun.',
    requirement: '10 yeni kullanıcıya yardımcı ol',
    unlocked: false,
    unlockedDate: undefined
  },
  { 
    id: 9, 
    name: 'Elçi', 
    image: elciBadge, 
    glow: 'rgba(168, 85, 247, 0.5)',
    description: 'Barış ve dostluk elçisisin! Sosyal etkinliklere katılarak topluluğu güçlendiriyorsun.',
    requirement: '5 farklı sosyal etkinliğe katıl',
    unlocked: false,
    unlockedDate: undefined
  },
  { 
    id: 10, 
    name: 'Öncü', 
    image: oncuBadge, 
    glow: 'rgba(148, 163, 184, 0.5)',
    description: 'İlk adımı atan sensin! Yeni trendleri keşfediyor ve liderlik ediyorsun.',
    requirement: 'Bir etkinlik veya mekan öner ve onaylansın',
    unlocked: false,
    unlockedDate: undefined
  },
  { 
    id: 11, 
    name: 'Usta', 
    image: ustaBadge, 
    glow: 'rgba(20, 184, 166, 0.5)',
    description: 'Becerilerinde ustalaştın! Konya\'nın her köşesini keşfettin ve deneyim kazandın.',
    requirement: '100.000 GençCoin kazanarak Usta rütbesine ulaş',
    unlocked: false,
    unlockedDate: undefined
  },
  { 
    id: 12, 
    name: 'Efsane', 
    image: efsaneBadge, 
    glow: 'rgba(71, 85, 105, 0.6)',
    description: 'Efsaneler arasına katıldın! KonyaGenç\'in en deneyimli kullanıcılarındansın.',
    requirement: '500.000 GençCoin kazanarak Efsane rütbesine ulaş',
    unlocked: false,
    unlockedDate: undefined
  },
  { 
    id: 13, 
    name: 'Gönüllü', 
    image: gonulluBadge, 
    glow: 'rgba(168, 85, 247, 0.5)',
    description: 'Topluma değer katıyorsun! Gönüllü etkinliklerde aktif rol alarak fark yaratıyorsun.',
    requirement: '3 gönüllü etkinliğine katıl',
    unlocked: false,
    unlockedDate: undefined
  },
  { 
    id: 14, 
    name: 'Arşivci', 
    image: arsivciBadge, 
    glow: 'rgba(120, 113, 108, 0.5)',
    description: 'Bilgi arşivcisisin! Geçmişi belgeleyerek geleceğe ışık tutuyorsun.',
    requirement: 'Wiki\'ye 100 tarihi bilgi ekle',
    unlocked: false,
    unlockedDate: undefined
  },
  { 
    id: 15, 
    name: 'Gezici', 
    image: geziciBadge, 
    glow: 'rgba(107, 114, 78, 0.5)',
    description: 'Sırt çantanı aldın ve keşfe çıktın! Konya\'nın tüm bölgelerini gezip görüyorsun.',
    requirement: '20 farklı lokasyonu ziyaret et',
    unlocked: false,
    unlockedDate: undefined
  },
];

interface BadgesScreenProps {
  onBack?: () => void;
  activeTab?: string;
  onTabChange?: (tab: string) => void;
  onGameCenterClick?: () => void;
}

export const BadgesScreen = ({ onBack, activeTab = 'profile', onTabChange, onGameCenterClick }: BadgesScreenProps) => {
  const [selectedBadge, setSelectedBadge] = useState<Badge | null>(null);
  const [isRotated, setIsRotated] = useState(false);
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  const [showAllLockedBadges, setShowAllLockedBadges] = useState(false);

  const unlockedBadges = ALL_BADGES.filter(b => b.unlocked);
  const lockedBadges = ALL_BADGES.filter(b => !b.unlocked);
  const displayedLockedBadges = lockedBadges.slice(0, 6);

  return (
    <div className="min-h-screen bg-[#f2f3f7] pb-28 lg:pb-6">
      {/* Desktop: Global Header */}
      <div className="hidden lg:block">
        <GlobalHeader 
          type="rich"
          onWalletClick={undefined}
          coinBalance="2.450"
          onSearchClick={() => console.log('🔍 Search clicked')}
          onFilterClick={() => console.log('🎯 Filter clicked')}
          activeTab={activeTab}
          onTabChange={onTabChange}
          onGameCenterClick={onGameCenterClick}
          onBackClick={onBack}
        />
      </div>

      {/* Mobile: Simple Header */}
      <div className="lg:hidden sticky top-0 z-10 bg-white shadow-sm">
        <div className="px-5 py-4 flex items-center gap-4">
          <button 
            onClick={onBack}
            className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center active:scale-95 transition-all hover:bg-slate-200"
          >
            <ChevronLeft className="w-6 h-6 text-[#19142e]" strokeWidth={2.5} />
          </button>
          <div>
            <h1 className="text-xl font-black text-[#19142e]">Rozetlerim</h1>
            <p className="text-xs text-slate-500 font-bold mt-0.5">
              {unlockedBadges.length} / {ALL_BADGES.length} Rozet Açıldı
            </p>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="px-5 py-4 bg-white shadow-sm mt-0 lg:mt-[60px]">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-[#19142e]">İlerleme</span>
            <span className="text-xs font-black text-[#5852c4]">
              {Math.round((unlockedBadges.length / ALL_BADGES.length) * 100)}%
            </span>
          </div>
          <div className="h-2.5 bg-white/60 rounded-full overflow-hidden shadow-inner">
            <div 
              className="h-full bg-gradient-to-r from-[#5852c4] via-[#7c3aed] to-[#06b6d4] rounded-full transition-all duration-700"
              style={{ width: `${(unlockedBadges.length / ALL_BADGES.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Desktop 70/30 Layout Container */}
      <PageLayout
        onTabChange={onTabChange}
        onWalletOpen={() => setIsWalletModalOpen(true)}
        onGameClick={() => {}}
        onGameCenterClick={onGameCenterClick}
      >

      {/* Unlocked Badges */}
      {unlockedBadges.length > 0 && (
        <div className="px-5 py-6 lg:px-0">
          <div className="mx-auto">
            <h2 className="text-base font-black text-[#19142e] mb-4">Kazanılan Rozetler</h2>
            <div className="grid grid-cols-3 lg:grid-cols-5 gap-4">
            {unlockedBadges.map((badge) => (
              <button
                key={badge.id}
                onClick={() => setSelectedBadge(badge)}
                className="flex flex-col items-center gap-3 group active:scale-95 transition-transform"
              >
                <div className="relative">
                  <div className="w-24 h-24 flex items-center justify-center transition-all group-hover:scale-110">
                    <img 
                      src={badge.image} 
                      alt={badge.name} 
                      className="w-full h-full object-contain"
                      style={{
                        mixBlendMode: 'multiply'
                      }}
                    />
                  </div>
                </div>
                <span className="text-xs font-bold text-[#19142e] text-center leading-tight">
                  {badge.name}
                </span>
                <span className="text-[10px] font-semibold text-gray-500 text-center leading-tight">
                  {badge.unlockedDate}
                </span>
              </button>
            ))}
          </div>
          </div>
        </div>
      )}

      {/* Locked Badges */}
      {lockedBadges.length > 0 && (
        <div className="px-5 py-6 lg:px-0">
          <div className="mx-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-black text-[#19142e]">Kilitli Rozetler</h2>
              {lockedBadges.length > 6 && (
                <button 
                  onClick={() => setShowAllLockedBadges(true)}
                  className="flex items-center text-xs font-bold text-[#5852c4] hover:text-[#19142e] transition-colors bg-transparent p-0"
                >
                  Tümünü Gör
                  <ChevronLeft className="w-3 h-3 ml-1 rotate-180" />
                </button>
              )}
            </div>
            <div className="grid grid-cols-3 lg:grid-cols-5 gap-4">
            {displayedLockedBadges.map((badge) => (
              <button
                key={badge.id}
                onClick={() => setSelectedBadge(badge)}
                className="flex flex-col items-center gap-3 group active:scale-95 transition-transform"
              >
                <div className="relative">
                  <div className="w-24 h-24 flex items-center justify-center transition-all group-hover:scale-110">
                    <img 
                      src={badge.image} 
                      alt={badge.name} 
                      className="w-full h-full object-contain"
                      style={{
                        mixBlendMode: 'multiply'
                      }}
                    />
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-8 h-8 rounded-full bg-gray-400 flex items-center justify-center">
                      <Lock className="w-4 h-4 text-white" strokeWidth={2.5} />
                    </div>
                  </div>
                </div>
                <span className="text-xs font-bold text-gray-400 text-center leading-tight">
                  {badge.name}
                </span>
              </button>
            ))}
          </div>
          </div>
        </div>
      )}

      </PageLayout>

      {/* Badge Detail Modal */}
      <AnimatePresence>
        {selectedBadge && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center px-5"
            onClick={() => {
              setSelectedBadge(null);
              setIsRotated(false);
            }}
          >
            {/* Backdrop Blur */}
            <div className="absolute inset-0 bg-black/40 backdrop-blur-md" />

            {/* Modal Card */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative bg-white rounded-2xl shadow-2xl max-w-sm w-full overflow-hidden"
            >
              {/* Header Gradient */}
              <div className="bg-gradient-to-br from-[#5852c4] to-[#8B5CF6] px-6 py-8 text-center relative overflow-hidden">
                {/* Badge Image */}
                <motion.div 
                  className="relative mx-auto w-64 h-64 mb-4 cursor-pointer"
                  onClick={() => setIsRotated(!isRotated)}
                  animate={{ rotate: isRotated ? 180 : 0 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                >
                  <img 
                    src={selectedBadge.image} 
                    alt={selectedBadge.name}
                    className="w-full h-full object-contain"
                  />
                </motion.div>

                {/* Badge Name */}
                <h2 className="text-2xl font-black text-white mb-1">{selectedBadge.name}</h2>
                
                {/* Unlock Status */}
                {selectedBadge.unlocked ? (
                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-sm">
                    <div className="w-2 h-2 rounded-full bg-[#10B981]" />
                    <span className="text-xs font-bold text-white">Kazanıldı</span>
                  </div>
                ) : (
                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-sm">
                    <span className="text-xs font-bold text-white">Kilitli</span>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="px-6 py-6 space-y-4">
                {/* Description */}
                <div>
                  <h3 className="text-xs font-black text-[#8279a5] uppercase tracking-wide mb-2">
                    Açıklama
                  </h3>
                  <p className="text-sm text-[#19142e] leading-relaxed font-semibold">
                    {selectedBadge.description}
                  </p>
                </div>

                {/* Requirement */}
                <div>
                  <h3 className="text-xs font-black text-[#8279a5] uppercase tracking-wide mb-2">
                    Nasıl Kazanılır?
                  </h3>
                  <p className="text-sm text-[#19142e] leading-relaxed font-semibold">
                    {selectedBadge.requirement}
                  </p>
                </div>

                {/* Unlock Date */}
                {selectedBadge.unlocked && selectedBadge.unlockedDate && (
                  <div>
                    <h3 className="text-xs font-black text-[#8279a5] uppercase tracking-wide mb-2">
                      Kazanma Tarihi
                    </h3>
                    <p className="text-sm text-[#19142e] font-bold">
                      {selectedBadge.unlockedDate}
                    </p>
                  </div>
                )}
              </div>

              {/* Close Button */}
              <div className="px-6 pb-6">
                <button
                  onClick={() => setSelectedBadge(null)}
                  className="w-full py-3 rounded-xl bg-[#5852c4] hover:bg-[#6c5ce7] active:scale-95 transition-all shadow-lg shadow-[#5852c4]/30"
                >
                  <span className="text-sm font-black text-white">Kapat</span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* All Locked Badges Modal */}
      <AnimatePresence>
        {showAllLockedBadges && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center px-5"
            onClick={() => setShowAllLockedBadges(false)}
          >
            {/* Backdrop Blur */}
            <div className="absolute inset-0 bg-black/40 backdrop-blur-md" />

            {/* Modal Card */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative bg-white rounded-2xl shadow-2xl w-full max-w-5xl max-h-[85vh] overflow-hidden flex flex-col"
            >
              {/* Header */}
              <div className="bg-gradient-to-br from-[#5852c4] to-[#8B5CF6] px-6 py-6 text-center">
                <h2 className="text-2xl font-black text-white">Kilitli Rozetler</h2>
                <p className="text-sm text-white/80 font-semibold mt-1">
                  {lockedBadges.length} rozet kazanmayı bekliyor
                </p>
              </div>

              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto px-6 py-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {lockedBadges.map((badge) => (
                    <button
                      key={badge.id}
                      onClick={() => {
                        setSelectedBadge(badge);
                        setShowAllLockedBadges(false);
                      }}
                      className="flex flex-col items-center gap-4 p-6 rounded-xl bg-[#f2f3f7] hover:bg-[#ededff] active:scale-95 transition-all group"
                    >
                      <div className="relative">
                        <div className="w-48 h-48 flex items-center justify-center transition-all group-hover:scale-105">
                          <img 
                            src={badge.image} 
                            alt={badge.name} 
                            className="w-full h-full object-contain"
                            style={{
                              mixBlendMode: 'multiply'
                            }}
                          />
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-12 h-12 rounded-full bg-gray-400 flex items-center justify-center shadow-lg">
                            <Lock className="w-6 h-6 text-white" strokeWidth={2.5} />
                          </div>
                        </div>
                      </div>
                      <div className="text-center">
                        <span className="text-base font-black text-gray-400 block mb-2">
                          {badge.name}
                        </span>
                        <p className="text-xs text-gray-500 font-semibold leading-relaxed">
                          {badge.requirement}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Close Button */}
              <div className="px-6 pb-6">
                <button
                  onClick={() => setShowAllLockedBadges(false)}
                  className="w-full py-3 rounded-xl bg-[#5852c4] hover:bg-[#6c5ce7] active:scale-95 transition-all shadow-lg shadow-[#5852c4]/30"
                >
                  <span className="text-sm font-black text-white">Kapat</span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <WalletModal 
        isOpen={isWalletModalOpen}
        onClose={() => setIsWalletModalOpen(false)}
      />
    </div>
  );
};
