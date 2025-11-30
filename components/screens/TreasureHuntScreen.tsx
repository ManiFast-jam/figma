import React, { useState, useEffect } from 'react';
import { ArrowLeft, MapPin, Navigation, QrCode, Check, X, Compass, Target } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { GlobalHeader } from '../layout/GlobalHeader';
import { PageLayout } from '../layout/PageLayout';
import { WalletModal } from '../wallet/WalletModal';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface MissionData {
  id: number;
  title: string;
  location: string;
  hint: string;
  distance: string;
  image: string;
  reward: number;
  coordinates: { lat: number; lng: number };
}

const CURRENT_MISSION: MissionData = {
  id: 1,
  title: 'Gizli Mekan',
  location: 'İnce Minareli Medrese',
  hint: "Meram'da tarihi bir kütüphane...",
  distance: '2.5 km',
  image: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f',
  reward: 50,
  coordinates: { lat: 37.8746, lng: 32.4932 },
};

interface TreasureHuntScreenProps {
  onBack?: () => void;
  activeTab?: string;
  onTabChange?: (tab: string) => void;
  onGameCenterClick?: () => void;
}

export const TreasureHuntScreen = ({ onBack, activeTab = 'home', onTabChange, onGameCenterClick }: TreasureHuntScreenProps) => {
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  const [missionStarted, setMissionStarted] = useState(false);
  const [isNearby, setIsNearby] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Simulate distance check (mock geolocation)
  useEffect(() => {
    if (missionStarted) {
      // Simulate being nearby after 3 seconds (for demo)
      const timer = setTimeout(() => {
        setIsNearby(true);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [missionStarted]);

  const handleStartMission = () => {
    setMissionStarted(true);
  };

  const handleCheckIn = () => {
    setShowSuccess(true);
    // Hide success after 3 seconds
    setTimeout(() => {
      setShowSuccess(false);
    }, 3000);
  };

  const handleNavigation = () => {
    // Open Google Maps with directions
    const url = `https://www.google.com/maps/dir/?api=1&destination=${CURRENT_MISSION.coordinates.lat},${CURRENT_MISSION.coordinates.lng}`;
    window.open(url, '_blank');
  };

  const handleQRScan = () => {
    // Mock QR scan
    console.log('📷 QR Scanner opened');
    alert('QR Kod tarayıcı açılıyor... (Demo)');
    handleCheckIn();
  };

  if (!missionStarted) {
    // Mission Introduction Card
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
              <ArrowLeft className="w-5 h-5 text-[#111827]" strokeWidth={2.5} />
              <span className="font-extrabold text-[#111827]">Hazine Avı</span>
            </button>
          </div>

          {/* Desktop 70/30 Layout Container */}
          <div className="pt-[60px] lg:pt-[84px] px-5 lg:px-0">
            <PageLayout
              onTabChange={onTabChange}
              onWalletOpen={() => setIsWalletModalOpen(true)}
              onGameClick={() => {}}
              onGameCenterClick={onGameCenterClick}
            >
            
            {/* Hero Section */}
            <div className="mt-6 mb-6 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-[#F59E0B] to-[#D97706] mb-4 shadow-lg">
                <Compass className="w-8 h-8 text-white" strokeWidth={2.5} />
              </div>
              <h1 className="text-3xl font-black text-[#19142e] mb-2">Hazine Avı</h1>
              <p className="text-gray-600 font-semibold">Konya'yı keşfet, puan kazan!</p>
            </div>

            {/* Mission Card */}
            <div className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-100">
              
              {/* Blurred Image */}
              <div className="relative h-48 overflow-hidden">
                <ImageWithFallback 
                  src={CURRENT_MISSION.image}
                  alt="Gizli Mekan"
                  className="w-full h-full object-cover blur-md scale-110"
                />
                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                
                {/* Badge */}
                <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-[#F59E0B] text-white font-bold text-xs shadow-lg">
                  Haftanın Görevi
                </div>

                {/* Mystery Icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border-2 border-white/40">
                    <MapPin className="w-10 h-10 text-white" strokeWidth={2} />
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h2 className="text-2xl font-black text-[#19142e] mb-2">
                  {CURRENT_MISSION.title}
                </h2>
                
                {/* Hint Box */}
                <div className="bg-amber-50 border-2 border-amber-200 rounded-lg p-4 mb-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold text-sm">💡</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-amber-900 text-sm mb-1">İpucu</h4>
                      <p className="text-amber-800 text-sm">{CURRENT_MISSION.hint}</p>
                    </div>
                  </div>
                </div>

                {/* Reward Info */}
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-[#5852c4]/5 to-[#7c3aed]/5 rounded-lg mb-5">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-[#F59E0B] flex items-center justify-center">
                      <span className="text-white font-black text-lg">🪙</span>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 font-semibold">Ödül</p>
                      <p className="text-lg font-black text-[#19142e]">+{CURRENT_MISSION.reward} GençCoin</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500 font-semibold">Zorluk</p>
                    <p className="text-sm font-bold text-[#5852c4]">Orta</p>
                  </div>
                </div>

                {/* Start Button */}
                <button
                  onClick={handleStartMission}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-[#F59E0B] to-[#D97706] hover:from-[#D97706] hover:to-[#B45309] text-white font-black text-lg shadow-lg shadow-[#F59E0B]/30 transition-all active:scale-98"
                >
                  🚀 Görevi Başlat
                </button>
              </div>
            </div>

            {/* Info Cards */}
            <div className="grid grid-cols-2 gap-3 mt-5">
              <div className="bg-white rounded-lg p-4 border border-gray-100 text-center">
                <MapPin className="w-6 h-6 text-[#5852c4] mx-auto mb-2" strokeWidth={2.5} />
                <p className="text-xs text-gray-500 font-semibold mb-1">Konum</p>
                <p className="font-bold text-[#19142e] text-sm">Meram</p>
              </div>
              <div className="bg-white rounded-lg p-4 border border-gray-100 text-center">
                <Target className="w-6 h-6 text-[#F59E0B] mx-auto mb-2" strokeWidth={2.5} />
                <p className="text-xs text-gray-500 font-semibold mb-1">Mesafe</p>
                <p className="font-bold text-[#19142e] text-sm">~{CURRENT_MISSION.distance}</p>
              </div>
            </div>

            </PageLayout>
          </div>
        </div>

        <WalletModal 
          isOpen={isWalletModalOpen}
          onClose={() => setIsWalletModalOpen(false)}
        />
      </>
    );
  }

  // Mission Started - Map & Action View
  return (
    <>
      <div className="min-h-screen bg-[#f2f3f7] pb-28 lg:pb-6 relative">
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
            <ArrowLeft className="w-5 h-5 text-[#111827]" strokeWidth={2.5} />
            <span className="font-extrabold text-[#111827]">Hazine Avı</span>
          </button>
        </div>

        {/* Desktop 70/30 Layout Container */}
        <div className="pt-[60px] lg:pt-[84px] px-5 lg:px-0">
          <PageLayout
            onTabChange={onTabChange}
            onWalletOpen={() => setIsWalletModalOpen(true)}
            onGameClick={() => {}}
            onGameCenterClick={onGameCenterClick}
          >
          
          {/* Map Area (Mock) */}
          <div className="relative h-[50vh] bg-gray-200 overflow-hidden">
            {/* Mock Map Image */}
            <ImageWithFallback 
              src="https://images.unsplash.com/photo-1524661135-423995f22d0b"
              alt="Harita"
              className="w-full h-full object-cover"
            />
            
            {/* Map Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#f2f3f7]" />

            {/* Target Marker */}
            <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="relative"
              >
                <div className="w-16 h-16 rounded-full bg-[#F59E0B] flex items-center justify-center shadow-2xl border-4 border-white">
                  <MapPin className="w-8 h-8 text-white" strokeWidth={3} />
                </div>
                {/* Pulse Ring */}
                <motion.div
                  animate={{ scale: [1, 2, 2], opacity: [0.5, 0, 0] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="absolute inset-0 rounded-full bg-[#F59E0B]"
                />
              </motion.div>
            </div>

            {/* User Location (Mock) */}
            <div className="absolute bottom-24 left-8">
              <div className="w-4 h-4 rounded-full bg-blue-500 border-2 border-white shadow-lg" />
            </div>

            {/* Distance Badge */}
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-full bg-white/95 backdrop-blur-sm shadow-lg">
              <p className="text-sm font-bold text-[#19142e]">
                📍 {CURRENT_MISSION.distance} uzakta
              </p>
            </div>
          </div>

          {/* Action Area */}
          <div className="px-5 -mt-6 relative z-10">
            
            {/* Location Info Card */}
            <div className="bg-white rounded-xl p-5 shadow-lg border border-gray-100 mb-4">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#5852c4] to-[#7c3aed] flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-7 h-7 text-white" strokeWidth={2.5} />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-gray-500 font-semibold mb-1">Gidilecek Yer</p>
                  <h3 className="text-xl font-black text-[#19142e] mb-1">
                    {CURRENT_MISSION.location}
                  </h3>
                  <p className="text-sm text-gray-600 font-semibold">
                    Şu anki konumuna {CURRENT_MISSION.distance} uzaklıkta
                  </p>
                </div>
              </div>

              {/* Navigation Button */}
              <button
                onClick={handleNavigation}
                className="w-full py-3 rounded-lg bg-[#5852c4] hover:bg-[#6c5ce7] text-white font-bold text-sm flex items-center justify-center gap-2 transition-colors"
              >
                <Navigation className="w-5 h-5" strokeWidth={2.5} />
                Yol Tarifi Al
              </button>
            </div>

            {/* Check-in Actions */}
            <div className="space-y-3">
              
              {/* Location Check-in Button */}
              <button
                onClick={handleCheckIn}
                disabled={!isNearby}
                className={`
                  w-full py-4 rounded-xl font-black text-lg transition-all shadow-lg flex items-center justify-center gap-3
                  ${isNearby 
                    ? 'bg-gradient-to-r from-[#10b981] to-[#059669] hover:from-[#059669] hover:to-[#047857] text-white shadow-green-500/30 active:scale-98' 
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }
                `}
              >
                <Check className="w-6 h-6" strokeWidth={3} />
                {isNearby ? 'Buradayım! (Konumu Doğrula)' : 'Mekana Yaklaş...'}
              </button>

              {/* QR Code Button */}
              <button
                onClick={handleQRScan}
                disabled={!isNearby}
                className={`
                  w-full py-3 rounded-lg font-bold text-sm transition-all flex items-center justify-center gap-2 border-2
                  ${isNearby 
                    ? 'bg-white border-[#5852c4] text-[#5852c4] hover:bg-[#5852c4] hover:text-white' 
                    : 'bg-gray-100 border-gray-300 text-gray-400 cursor-not-allowed'
                  }
                `}
              >
                <QrCode className="w-5 h-5" strokeWidth={2.5} />
                QR Kodu Tara
              </button>
            </div>

            {/* Hint Section */}
            {!isNearby && (
              <div className="mt-4 p-4 bg-blue-50 border-2 border-blue-200 rounded-lg">
                <p className="text-sm text-blue-800 font-semibold text-center">
                  💡 Mekana yaklaştığında check-in butonları aktif olacak
                </p>
              </div>
            )}
          </div>

          </PageLayout>
        </div>

        {/* Success Animation */}
        <AnimatePresence>
          {showSuccess && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
            >
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                className="bg-white rounded-2xl p-8 mx-5 text-center shadow-2xl max-w-sm"
              >
                {/* Confetti Effect (Text-based) */}
                <div className="text-6xl mb-4 animate-bounce">🎉</div>
                
                {/* Success Icon */}
                <div className="w-20 h-20 rounded-full bg-green-500 flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Check className="w-10 h-10 text-white" strokeWidth={3} />
                </div>

                {/* Message */}
                <h2 className="text-2xl font-black text-[#19142e] mb-2">
                  Tebrikler! 🎊
                </h2>
                <p className="text-gray-600 font-semibold mb-4">
                  Check-in başarılı!
                </p>

                {/* Reward Display */}
                <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#F59E0B] to-[#D97706] mb-4 shadow-lg">
                  <span className="text-2xl">🪙</span>
                  <span className="text-white font-black text-xl">+{CURRENT_MISSION.reward} Coin</span>
                </div>

                {/* Floating Coins Animation */}
                <div className="flex justify-center gap-2 text-3xl">
                  {[...Array(5)].map((_, i) => (
                    <motion.span
                      key={i}
                      animate={{ 
                        y: [0, -30, 0],
                        rotate: [0, 360, 0],
                        opacity: [1, 0.5, 1]
                      }}
                      transition={{ 
                        repeat: Infinity, 
                        duration: 2,
                        delay: i * 0.2 
                      }}
                    >
                      🪙
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>

      <WalletModal 
        isOpen={isWalletModalOpen}
        onClose={() => setIsWalletModalOpen(false)}
      />
    </>
  );
};
