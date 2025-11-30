import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, MapPin, Navigation, QrCode, Check, X, Compass, Target, Landmark, Building2, Church, Castle, ShoppingBag, TreePine, Mountain, Waves, Flower2, BookOpen, Camera, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { GlobalHeader } from '../layout/GlobalHeader';
import { PageLayout } from '../layout/PageLayout';
import { WalletModal } from '../wallet/WalletModal';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { useCoins } from '../../contexts/CoinContext';
import { CoinActionType } from '../../services/CoinRewardService';
import { toast } from 'sonner';
import { BadgeSuccessModal } from '../onboarding/BadgeSuccessModal';
import { getBadgeIdForRole, getBadgeNameForRole } from '../../utils/badgeUtils';

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

// Konya'daki tüm tarihi ve modern yerler
const HISTORICAL_PLACES = [
  // Şehir Merkezi & Tarihi "Must-See" Yerler
  { id: 1, name: 'Mevlana Müzesi', icon: Landmark, position: { top: '15%', left: '48%' }, color: '#5852c4', category: 'tarihi' },
  { id: 2, name: 'Alaaddin Tepesi', icon: Castle, position: { top: '20%', left: '52%' }, color: '#7c3aed', category: 'tarihi' },
  { id: 3, name: 'Karatay Medresesi', icon: Building2, position: { top: '18%', left: '45%' }, color: '#6c5ce7', category: 'tarihi' },
  { id: 4, name: 'İnce Minareli Medrese', icon: Building2, position: { top: '25%', left: '42%' }, color: '#a855f7', category: 'tarihi' },
  { id: 5, name: 'Şems-i Tebrizi Türbesi', icon: Landmark, position: { top: '12%', left: '50%' }, color: '#5852c4', category: 'tarihi' },
  { id: 6, name: 'Aziziye Camii', icon: Church, position: { top: '22%', left: '55%' }, color: '#7c3aed', category: 'tarihi' },
  { id: 7, name: 'Bedesten Çarşısı', icon: ShoppingBag, position: { top: '28%', left: '48%' }, color: '#6c5ce7', category: 'tarihi' },
  { id: 8, name: 'İplikçi Camii', icon: Church, position: { top: '30%', left: '50%' }, color: '#a855f7', category: 'tarihi' },
  { id: 9, name: 'Sahip Ata Külliyesi', icon: Building2, position: { top: '32%', left: '45%' }, color: '#5852c4', category: 'tarihi' },
  { id: 10, name: 'Sırçalı Medrese', icon: Building2, position: { top: '35%', left: '43%' }, color: '#7c3aed', category: 'tarihi' },
  { id: 11, name: 'İstiklal Harbi Şehitleri Abidesi', icon: Landmark, position: { top: '38%', left: '50%' }, color: '#6c5ce7', category: 'tarihi' },
  
  // Modern Konya, Müzeler & Parklar
  { id: 12, name: 'Kelebek Bahçesi', icon: Flower2, position: { top: '45%', left: '40%' }, color: '#a855f7', category: 'modern' },
  { id: 13, name: 'Konya Bilim Merkezi', icon: BookOpen, position: { top: '50%', left: '38%' }, color: '#5852c4', category: 'modern' },
  { id: 14, name: 'Sille Köyü', icon: Church, position: { top: '55%', left: '35%' }, color: '#7c3aed', category: 'modern' },
  { id: 15, name: 'Meram Bağları', icon: TreePine, position: { top: '60%', left: '42%' }, color: '#6c5ce7', category: 'modern' },
  { id: 16, name: 'Konya Panorama Müzesi', icon: Camera, position: { top: '48%', left: '52%' }, color: '#a855f7', category: 'modern' },
  { id: 17, name: 'Japon Parkı', icon: TreePine, position: { top: '52%', left: '55%' }, color: '#5852c4', category: 'modern' },
  { id: 18, name: 'Ecdad Parkı', icon: TreePine, position: { top: '58%', left: '50%' }, color: '#7c3aed', category: 'modern' },
  { id: 19, name: '80 Binde Devri Alem', icon: Sparkles, position: { top: '65%', left: '48%' }, color: '#6c5ce7', category: 'modern' },
  { id: 20, name: 'Konya Arkeoloji Müzesi', icon: Building2, position: { top: '42%', left: '50%' }, color: '#a855f7', category: 'modern' },
  { id: 21, name: 'Akyokuş', icon: Mountain, position: { top: '70%', left: '45%' }, color: '#5852c4', category: 'modern' },
  { id: 22, name: 'Kültür Park', icon: TreePine, position: { top: '55%', left: '48%' }, color: '#7c3aed', category: 'modern' },
  
  // Şehir Dışı & Antik Hazineler
  { id: 23, name: 'Çatalhöyük', icon: Landmark, position: { top: '75%', left: '30%' }, color: '#6c5ce7', category: 'antik' },
  { id: 24, name: 'Kilistra Antik Kenti', icon: Castle, position: { top: '80%', left: '35%' }, color: '#a855f7', category: 'antik' },
  { id: 25, name: 'Beyşehir Eşrefoğlu Camii', icon: Church, position: { top: '25%', left: '25%' }, color: '#5852c4', category: 'antik' },
  { id: 26, name: 'Yerköprü Şelalesi', icon: Waves, position: { top: '85%', left: '40%' }, color: '#7c3aed', category: 'antik' },
  { id: 27, name: 'Tuz Gölü', icon: Waves, position: { top: '10%', left: '70%' }, color: '#6c5ce7', category: 'antik' },
  { id: 28, name: 'Nasreddin Hoca Türbesi', icon: Landmark, position: { top: '5%', left: '60%' }, color: '#a855f7', category: 'antik' },
  { id: 29, name: 'Meke Gölü', icon: Waves, position: { top: '90%', left: '50%' }, color: '#5852c4', category: 'antik' },
  { id: 30, name: 'Zazadin Hanı', icon: Building2, position: { top: '15%', left: '65%' }, color: '#7c3aed', category: 'antik' },
];

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
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [showBadgeModal, setShowBadgeModal] = useState(false);
  const [earnedCoinReward, setEarnedCoinReward] = useState(0);
  const [earnedBadgeName, setEarnedBadgeName] = useState('Öncü');
  const [earnedBadgeImage, setEarnedBadgeImage] = useState('/images/d47de86a59fb1df6ddab2251f2d0083c430221d0.png');
  const videoRef = useRef<HTMLVideoElement>(null);
  const { rewardAction, getUserRole, getRoleMultiplier } = useCoins();

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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

  // Request camera access when mission starts
  useEffect(() => {
    if (missionStarted && !stream) {
      requestCameraAccess();
    }
  }, [missionStarted]); // eslint-disable-line react-hooks/exhaustive-deps

  // Cleanup: stop camera when component unmounts or mission ends
  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
        setStream(null);
      }
    };
  }, [stream]);

  // Update video element when stream changes
  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
      videoRef.current.play().catch(err => {
        console.error('Video play error:', err);
      });
    }
  }, [stream]);

  const requestCameraAccess = async () => {
    try {
      // Check if we're on HTTPS or localhost
      const isSecure = window.location.protocol === 'https:' || window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
      if (!isSecure) {
        setCameraError('Kamera erişimi için HTTPS bağlantısı gereklidir.');
        return;
      }

      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        setCameraError('Bu tarayıcı kamera erişimini desteklemiyor.');
        return;
      }

      let mediaStream: MediaStream;
      try {
        // Try with back camera first (mobile - better for QR scanning)
        mediaStream = await navigator.mediaDevices.getUserMedia({ 
          video: { 
            facingMode: 'environment',
            width: { ideal: 1280 },
            height: { ideal: 720 }
          } 
        });
      } catch (envError) {
        try {
          // Fallback to user camera (front camera)
          mediaStream = await navigator.mediaDevices.getUserMedia({ 
            video: { 
              facingMode: 'user',
              width: { ideal: 1280 },
              height: { ideal: 720 }
            } 
          });
        } catch (userError) {
          // Last fallback: any available camera
          mediaStream = await navigator.mediaDevices.getUserMedia({ 
            video: true
          });
        }
      }
      
      setStream(mediaStream);
      setCameraError(null);
    } catch (error: any) {
      console.error('❌ Camera access error:', error);
      let errorMessage = 'Kamera erişimi reddedildi.';
      
      if (error.name === 'NotAllowedError' || error.name === 'PermissionDeniedError') {
        errorMessage = 'Kamera izni reddedildi. Lütfen tarayıcı ayarlarından kamera iznini verin.';
      } else if (error.name === 'NotFoundError') {
        errorMessage = 'Kamera bulunamadı.';
      } else if (error.name === 'NotReadableError') {
        errorMessage = 'Kamera kullanımda olabilir.';
      }
      
      setCameraError(errorMessage);
      setStream(null);
    }
  };

  const handleStartMission = () => {
    setMissionStarted(true);
  };

  const handleCheckIn = () => {
    // Show loading state
    setShowSuccess(true);
    
    // Simulate processing delay (1.5s)
    setTimeout(() => {
      // Add coins for completing the treasure hunt mission
      const result = rewardAction(CoinActionType.GAME_TREASURE_HUNT);
      
      if (result.success) {
        setEarnedCoinReward(result.reward);
        
        // Get current role after coin addition
        const currentRole = getUserRole();
        const badgeId = getBadgeIdForRole(currentRole);
        const badgeName = getBadgeNameForRole(currentRole);
        
        // Get badge image based on role
        const badgeImages: Record<string, string> = {
          'Yeni Gelen': '/images/0b861b805523faa4af6e4a425b93c74c77b7e047.png',
          'Seyyah': '/images/00b07162d5b8b006019514145544fe2039cee667.png',
          'Gezgin': '/images/628becb8ed3dbf1dbd57717ef0eda68173b358fa.png',
          'Kaşif Meraklısı': '/images/b720c92d392edc4e03737e032c4f64b443d69150.png',
          'Konya Bilgesi': '/images/dbaf5bf559d0798ca2d47548efbfd6637cc9d70c.png',
          'Usta': '/images/5b0cb869d1730a25db9c7579b17ced33967521ed.png',
          'Efsane': '/images/be58c457f713b2de619a2047b5e217ed3e53a461.png',
        };
        
        const badgeImage = badgeImages[currentRole] || '/images/d47de86a59fb1df6ddab2251f2d0083c430221d0.png';
        
        // Store badge info for modal
        setEarnedBadgeName(badgeName);
        setEarnedBadgeImage(badgeImage);
        
        // Close success message and show badge modal
        setShowSuccess(false);
        setShowBadgeModal(true);
      } else {
        toast.error('Bir hata oluştu. Lütfen tekrar deneyin.');
        setShowSuccess(false);
      }
    }, 1500);
  };

  const handleNavigation = () => {
    // Open Google Maps with directions
    const url = `https://www.google.com/maps/dir/?api=1&destination=${CURRENT_MISSION.coordinates.lat},${CURRENT_MISSION.coordinates.lng}`;
    window.open(url, '_blank');
  };

  const handleQRScan = () => {
    // QR code scanning logic would go here
    // For now, simulate successful scan
    console.log('📷 QR Code scanned');
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
          <div className="pt-[60px] lg:pt-[84px] px-0 lg:px-0">
            <PageLayout
              onTabChange={onTabChange}
              onWalletOpen={() => setIsWalletModalOpen(true)}
              onGameClick={() => {}}
              onGameCenterClick={onGameCenterClick}
            >
            
            {/* Hero Header */}
            <div className="relative overflow-hidden bg-gradient-to-br from-[#5852c4] via-[#6c5ce7] to-[#7c3aed] px-5 py-8 rounded-t-xl">
              {/* Decorative Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-4 right-4 w-24 h-24 rounded-full bg-white blur-2xl" />
                <div className="absolute bottom-8 left-8 w-32 h-32 rounded-full bg-white blur-3xl" />
              </div>

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <Compass className="w-6 h-6 text-white" strokeWidth={2.5} />
                  </div>
                  <div>
                    <h1 className="text-2xl font-black text-white">Hazine Avı</h1>
                    <p className="text-white/90 text-sm font-semibold">Konya'yı keşfet, puan kazan!</p>
                  </div>
                </div>
                <p className="text-white/80 text-sm leading-relaxed">
                  Gizli mekanları bul, QR kodları tara, check-in yap ve coin kazan!
                </p>
              </div>
            </div>

            {/* Mission Card */}
            <div className="bg-white rounded-b-xl overflow-hidden shadow-lg border border-gray-100 border-t-0">
              
              {/* Konya Haritası - Tüm Tarihi ve Modern Yerler */}
              <div className="relative h-64 bg-gradient-to-br from-[#ededff] via-[#f2f3f7] to-[#ededff] overflow-hidden">
                {/* Harita Grid Pattern */}
                <div className="absolute inset-0 opacity-20">
                  <div className="w-full h-full" style={{
                    backgroundImage: `
                      linear-gradient(to right, #5852c4 1px, transparent 1px),
                      linear-gradient(to bottom, #5852c4 1px, transparent 1px)
                    `,
                    backgroundSize: '40px 40px'
                  }} />
                </div>
                
                {/* Badge */}
                <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-gradient-to-r from-[#5852c4] to-[#7c3aed] text-white font-bold text-xs shadow-lg z-20">
                  Haftanın Görevi
                </div>

                {/* Kategori Legend */}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-2 shadow-lg z-20">
                  <div className="flex flex-col gap-1.5 text-xs">
                    <div className="flex items-center gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-[#5852c4]"></div>
                      <span className="font-semibold text-[#19142e]">Tarihi</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-[#a855f7]"></div>
                      <span className="font-semibold text-[#19142e]">Modern</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-[#6c5ce7]"></div>
                      <span className="font-semibold text-[#19142e]">Antik</span>
                    </div>
                  </div>
                </div>

                {/* Tüm Yerler İkonları */}
                {HISTORICAL_PLACES.map((place) => {
                  const IconComponent = place.icon;
                  const isCurrentMission = place.name === CURRENT_MISSION.location;
                  const iconSize = isCurrentMission ? 'w-10 h-10' : 'w-8 h-8';
                  const iconInnerSize = isCurrentMission ? 'w-5 h-5' : 'w-4 h-4';
                  
                  return (
                    <motion.div
                      key={place.id}
                      className="absolute z-10"
                      style={place.position}
                      animate={isCurrentMission ? { scale: [1, 1.15, 1] } : {}}
                      transition={{ repeat: isCurrentMission ? Infinity : 0, duration: 2 }}
                    >
                      <div className="relative group">
                        <div 
                          className={`${iconSize} rounded-full flex items-center justify-center shadow-lg border-2 border-white cursor-pointer transition-all ${
                            isCurrentMission 
                              ? 'bg-gradient-to-r from-[#5852c4] to-[#7c3aed] scale-110' 
                              : place.category === 'tarihi'
                              ? 'bg-white hover:scale-110'
                              : place.category === 'modern'
                              ? 'bg-white hover:scale-110'
                              : 'bg-white hover:scale-110'
                          }`}
                          style={!isCurrentMission ? { 
                            backgroundColor: place.category === 'tarihi' ? `${place.color}15` : 
                                           place.category === 'modern' ? `${place.color}15` : 
                                           `${place.color}15`
                          } : {}}
                        >
                          <IconComponent 
                            className={`${iconInnerSize} ${isCurrentMission ? 'text-white' : ''}`}
                            style={!isCurrentMission ? { color: place.color } : {}}
                            strokeWidth={isCurrentMission ? 3 : 2.5}
                          />
                        </div>
                        {/* Pulse Ring for current mission */}
                        {isCurrentMission && (
                          <motion.div
                            animate={{ scale: [1, 1.8, 1.8], opacity: [0.5, 0, 0] }}
                            transition={{ repeat: Infinity, duration: 2 }}
                            className="absolute inset-0 rounded-full bg-[#5852c4] -z-10"
                          />
                        )}
                        {/* Tooltip */}
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-30">
                          <div className="bg-[#19142e] text-white text-xs px-2 py-1 rounded whitespace-nowrap shadow-lg">
                            {place.name}
                          </div>
                          <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1">
                            <div className="w-2 h-2 bg-[#19142e] rotate-45"></div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}

                {/* Konya Yazısı - Merkez */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                  <div className="text-center">
                    <div className="w-20 h-20 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center border-2 border-[#5852c4]/30 shadow-xl">
                      <Compass className="w-10 h-10 text-[#5852c4]" strokeWidth={2.5} />
                    </div>
                    <p className="mt-2 text-sm font-black text-[#19142e]">Konya</p>
                    <p className="text-xs text-[#8279a5] font-semibold">{HISTORICAL_PLACES.length} Nokta</p>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h2 className="text-2xl font-black text-[#19142e] mb-2">
                  {CURRENT_MISSION.title}
                </h2>
                
                {/* Hint Box */}
                <div className="bg-[#ededff] border-2 border-[#5852c4]/20 rounded-lg p-4 mb-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#5852c4] to-[#7c3aed] flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold text-sm">💡</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-[#19142e] text-sm mb-1">İpucu</h4>
                      <p className="text-[#8279a5] text-sm">{CURRENT_MISSION.hint}</p>
                    </div>
                  </div>
                </div>

                {/* Reward Info */}
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-[#5852c4]/5 to-[#7c3aed]/5 rounded-lg mb-5">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#5852c4] to-[#7c3aed] flex items-center justify-center">
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
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-[#5852c4] to-[#7c3aed] hover:from-[#6c5ce7] hover:to-[#8b5cf6] text-white font-black text-lg shadow-lg shadow-[#5852c4]/30 transition-all active:scale-98"
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
                <Target className="w-6 h-6 text-[#5852c4] mx-auto mb-2" strokeWidth={2.5} />
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

        {/* Badge Success Modal */}
        <BadgeSuccessModal
          isOpen={showBadgeModal}
          onClose={() => setShowBadgeModal(false)}
          badgeName={earnedBadgeName}
          badgeImage={earnedBadgeImage}
          coinReward={earnedCoinReward}
          roleName={getUserRole()}
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
          
          {/* Üst Bölüm: Icon + Gidilecek Yer + Yol Tarifi Al */}
          <div className="bg-white rounded-xl p-5 shadow-lg border border-gray-100 mb-4">
            <div className="flex items-start gap-4 mb-4">
              {/* Büyük İkon */}
              <div className="flex-shrink-0">
              <motion.div
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ repeat: Infinity, duration: 3 }}
                className="relative"
              >
                  <div className="w-20 h-20 rounded-full bg-gradient-to-r from-[#5852c4] to-[#7c3aed] flex items-center justify-center shadow-xl border-4 border-white">
                    <Building2 className="w-10 h-10 text-white" strokeWidth={2.5} />
                </div>
                  {/* Pulse Rings */}
                <motion.div
                    animate={{ scale: [1, 1.3, 1.3], opacity: [0.5, 0, 0] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                    className="absolute inset-0 rounded-full bg-[#5852c4] -z-10"
                />
              </motion.div>
            </div>

              {/* Location Info */}
                <div className="flex-1">
                  <p className="text-xs text-gray-500 font-semibold mb-1">Gidilecek Yer</p>
                  <h3 className="text-xl font-black text-[#19142e] mb-1">
                    {CURRENT_MISSION.location}
                  </h3>
                <p className="text-sm text-gray-600 font-semibold mb-3">
                    Şu anki konumuna {CURRENT_MISSION.distance} uzaklıkta
                  </p>

              {/* Navigation Button */}
              <button
                onClick={handleNavigation}
                  className="w-full py-3 rounded-lg bg-white border-2 border-[#5852c4] text-[#5852c4] hover:bg-[#5852c4] hover:text-white font-bold text-sm flex items-center justify-center gap-2 transition-all"
              >
                <Navigation className="w-5 h-5" strokeWidth={2.5} />
                Yol Tarifi Al
              </button>
              </div>
            </div>
          </div>

          {/* Alt Bölüm: Kamera Alanı (QR Kod Okutma) */}
          <div className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-100">
            <div className="p-4 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <QrCode className="w-5 h-5 text-[#5852c4]" strokeWidth={2.5} />
                <h3 className="font-bold text-[#19142e]">QR Kodu Tara</h3>
              </div>
            </div>

            {/* Kamera Alanı */}
            <div className="relative bg-black aspect-video flex items-center justify-center">
              {cameraError ? (
                <div className="p-6 text-center">
                  <QrCode className="w-16 h-16 text-gray-400 mx-auto mb-3" strokeWidth={1.5} />
                  <p className="text-white text-sm font-semibold mb-2">{cameraError}</p>
                  <button
                    onClick={requestCameraAccess}
                    className="px-4 py-2 bg-[#5852c4] text-white rounded-lg text-sm font-semibold hover:bg-[#6c5ce7] transition-colors"
                  >
                    Tekrar Dene
                  </button>
                </div>
              ) : stream ? (
                <>
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className="w-full h-full object-cover"
                  />
                  {/* QR Scan Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-64 h-64 border-4 border-white/80 rounded-lg">
                      <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-[#5852c4] rounded-tl-lg" />
                      <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-[#5852c4] rounded-tr-lg" />
                      <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-[#5852c4] rounded-bl-lg" />
                      <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-[#5852c4] rounded-br-lg" />
                    </div>
                  </div>
                </>
              ) : (
                <div className="p-6 text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-4 border-white border-t-[#5852c4] mx-auto mb-3" />
                  <p className="text-white text-sm font-semibold">Kamera açılıyor...</p>
                </div>
              )}
            </div>

            {/* Check-in Button */}
            <div className="p-4">
              <button
                onClick={handleCheckIn}
                disabled={!isNearby}
                className={`
                  w-full py-4 rounded-xl font-black text-lg transition-all shadow-lg flex items-center justify-center gap-3
                  ${isNearby 
                    ? 'bg-gradient-to-r from-[#5852c4] to-[#7c3aed] hover:from-[#6c5ce7] hover:to-[#8b5cf6] text-white shadow-[#5852c4]/30 active:scale-98' 
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }
                `}
              >
                <Check className="w-6 h-6" strokeWidth={3} />
                {isNearby ? 'Buradayım! (Konumu Doğrula)' : 'Mekana Yaklaş...'}
              </button>
            </div>

            {/* Hint Section */}
            {!isNearby && (
              <div className="px-4 pb-4">
                <div className="p-3 bg-[#ededff] border-2 border-[#5852c4]/20 rounded-lg">
                  <p className="text-xs text-[#19142e] font-semibold text-center">
                    💡 Mekana yaklaştığında check-in butonu aktif olacak
                  </p>
                </div>
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
                <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#5852c4] to-[#7c3aed] mb-4 shadow-lg">
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

      {/* Badge Success Modal */}
      <BadgeSuccessModal
        isOpen={showBadgeModal}
        onClose={() => setShowBadgeModal(false)}
        badgeName={earnedBadgeName}
        badgeImage={earnedBadgeImage}
        coinReward={earnedCoinReward}
        roleName={getUserRole()}
      />
    </>
  );
};
