import React, { useState, useRef, useEffect } from 'react';
import { Camera, X, Check, UtensilsCrossed, Bus, Library, PartyPopper, ChevronRight, Upload, Image as ImageIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { GlobalHeader } from '../layout/GlobalHeader';
import { PageLayout } from '../layout/PageLayout';
import { WalletModal } from '../wallet/WalletModal';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { useCoins } from '../../contexts/CoinContext';
import { CoinActionType } from '../../services/CoinRewardService';
import { toast } from 'sonner';

interface Category {
  id: string;
  label: string;
  icon: any;
  color: string;
  statusOptions: string[];
}

const CATEGORIES: Category[] = [
  {
    id: 'food',
    label: 'Yemek Menüsü',
    icon: UtensilsCrossed,
    color: '#5852c4',
    statusOptions: ['Çok Güzel', 'İyi', 'Orta', 'Kötü'],
  },
  {
    id: 'bus',
    label: 'Otobüs Sırası',
    icon: Bus,
    color: '#6c5ce7',
    statusOptions: ['Sıra Çok', 'Sıra Az', 'Otobüs Boş'],
  },
  {
    id: 'library',
    label: 'Kütüphane',
    icon: Library,
    color: '#7c3aed',
    statusOptions: ['Çok Dolu', 'Orta', 'Boş'],
  },
  {
    id: 'event',
    label: 'Etkinlik',
    icon: PartyPopper,
    color: '#a855f7',
    statusOptions: ['Kalabalık', 'Normal', 'Sakin'],
  },
];

interface CampusReporterScreenProps {
  onBack?: () => void;
  activeTab?: string;
  onTabChange?: (tab: string) => void;
  onGameCenterClick?: () => void;
}

export const CampusReporterScreen = ({ onBack, activeTab = 'home', onTabChange, onGameCenterClick }: CampusReporterScreenProps) => {
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [photoMode, setPhotoMode] = useState<'camera' | 'upload'>('camera');
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { rewardAction, getUserRole, getRoleMultiplier } = useCoins();

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const requestCameraAccess = async () => {
    try {
      // Check if we're on HTTPS or localhost
      const isSecure = window.location.protocol === 'https:' || window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
      if (!isSecure) {
        setCameraError('Kamera erişimi için HTTPS bağlantısı gereklidir. Lütfen güvenli bir bağlantı kullanın.');
        return;
      }

      // Check if getUserMedia is available
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        setCameraError('Bu tarayıcı kamera erişimini desteklemiyor. Lütfen modern bir tarayıcı kullanın (Chrome, Firefox, Safari, Edge).');
        return;
      }

      console.log('📸 Requesting camera access...');
      
      // Request camera access with fallback options
      let mediaStream: MediaStream;
      try {
        // Try with back camera first (mobile)
        mediaStream = await navigator.mediaDevices.getUserMedia({ 
          video: { 
            facingMode: 'environment',
            width: { ideal: 1280 },
            height: { ideal: 720 }
          } 
        });
        console.log('✅ Camera access granted (back camera)');
      } catch (envError) {
        console.log('⚠️ Back camera failed, trying user camera...');
        // Fallback to user camera (front camera)
        try {
          mediaStream = await navigator.mediaDevices.getUserMedia({ 
            video: { 
              facingMode: 'user',
              width: { ideal: 1280 },
              height: { ideal: 720 }
            } 
          });
          console.log('✅ Camera access granted (front camera)');
        } catch (userError) {
          // Last fallback: any available camera
          mediaStream = await navigator.mediaDevices.getUserMedia({ 
            video: true
          });
          console.log('✅ Camera access granted (any camera)');
        }
      }
      
      setStream(mediaStream);
      setCameraError(null);
      console.log('📹 Stream active:', mediaStream.active);
      console.log('📹 Video tracks:', mediaStream.getVideoTracks().length);
    } catch (error: any) {
      console.error('❌ Camera access error:', error);
      let errorMessage = 'Kamera erişimi reddedildi.';
      
      if (error.name === 'NotAllowedError' || error.name === 'PermissionDeniedError') {
        errorMessage = 'Kamera izni reddedildi. Lütfen tarayıcı ayarlarından kamera iznini verin ve sayfayı yenileyin.';
      } else if (error.name === 'NotFoundError' || error.name === 'DevicesNotFoundError') {
        errorMessage = 'Kamera bulunamadı. Lütfen cihazınızda bir kamera olduğundan emin olun.';
      } else if (error.name === 'NotReadableError' || error.name === 'TrackStartError') {
        errorMessage = 'Kamera kullanımda olabilir. Lütfen başka bir uygulamayı kapatın ve tekrar deneyin.';
      } else if (error.name === 'OverconstrainedError' || error.name === 'ConstraintNotSatisfiedError') {
        errorMessage = 'Kamera ayarları desteklenmiyor. Lütfen farklı bir kamera deneyin.';
      } else if (error.name === 'NotSupportedError') {
        errorMessage = 'Bu özellik desteklenmiyor. Lütfen HTTPS bağlantısı kullanın.';
      } else {
        errorMessage = `Kamera hatası: ${error.message || error.name}`;
      }
      
      setCameraError(errorMessage);
      setStream(null);
    }
  };

  // Request camera access
  useEffect(() => {
    if (photoMode === 'camera' && selectedCategory && !stream) {
      requestCameraAccess();
    }
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
        setStream(null);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [photoMode, selectedCategory]);

  // Update video element when stream changes
  useEffect(() => {
    const video = videoRef.current;
    if (stream && video) {
      video.srcObject = stream;
      // Muted is required for autoplay in some browsers
      video.muted = true;
      video.play().catch(err => {
        console.error('Video play error:', err);
        setCameraError('Video oynatılamadı: ' + err.message);
      });
    }
    return () => {
      if (video) {
        video.srcObject = null;
      }
    };
  }, [stream]);

  const handleCapturePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;
    
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    
    if (!context) return;
    
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0);
    
    const photoUrl = canvas.toDataURL('image/jpeg');
    setCapturedPhoto(photoUrl);
    
    // Stop camera stream
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];
      if (validTypes.includes(file.type)) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setCapturedPhoto(reader.result as string);
        };
        reader.readAsDataURL(file);
      } else {
        alert('Sadece JPG ve PNG dosyaları kabul edilir.');
      }
    }
  };

  const handlePublish = () => {
    if (!selectedCategory || !capturedPhoto || !selectedStatus) return;
    
    console.log('📸 Publishing Report:', {
      category: selectedCategory.label,
      status: selectedStatus,
      photo: capturedPhoto,
      timestamp: new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' }),
    });

    // Add coins for completing the report
    const result = rewardAction(CoinActionType.GAME_CAMPUS_REPORTER);
    if (result.success) {
      toast.success(`+${result.reward} GençCoin kazandınız! (${getUserRole()} - ${getRoleMultiplier()}x çarpan)`);
    }

    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      // Reset
      setSelectedCategory(null);
      setCapturedPhoto(null);
      setSelectedStatus(null);
    }, 3000);
  };

  const currentTime = new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });

  return (
    <>
      <div className="min-h-screen bg-[#f2f3f7] pb-28 lg:pb-6">
        <div className="hidden lg:block">
          <GlobalHeader 
            type="rich"
            onWalletClick={() => setIsWalletModalOpen(true)}
            onSearchClick={() => console.log('🔍 Search clicked')}
            onFilterClick={() => console.log('🎯 Filter clicked')}
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
            <Camera className="w-5 h-5 text-[#111827]" strokeWidth={2.5} />
            <span className="font-extrabold text-[#111827]">Kampüs Muhabiri</span>
          </button>
        </div>

        <div className="pt-[60px] lg:pt-[84px]">
          <PageLayout
            onTabChange={onTabChange}
            onWalletOpen={() => setIsWalletModalOpen(true)}
            onGameClick={() => {}}
            onGameCenterClick={onGameCenterClick}
          >
          
          {!selectedCategory ? (
            <div className="px-0">
              
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
                      <Camera className="w-6 h-6 text-white" strokeWidth={2.5} />
                    </div>
                    <div>
                      <h1 className="text-2xl font-black text-white">Kampüs Muhabiri</h1>
                      <p className="text-white/90 text-sm font-semibold">Yemekhane, otobüs veya kütüphane... Durum ne?</p>
                    </div>
                  </div>
                  <p className="text-white/80 text-sm leading-relaxed">
                    Fotoğraf çek, durumu etiketle, anında paylaş! Tüm kampüs anlık bilgilerle güncel kalacak.
                  </p>
                </div>
              </div>

              <div className="px-5 py-6">

              <div className="space-y-3">
                <h2 className="text-lg font-bold text-[#19142e] mb-3">Neyi Rapor Ediyorsun?</h2>
                
                {CATEGORIES.map((category) => {
                  const IconComponent = category.icon;
                  return (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category)}
                      className="w-full bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-all active:scale-98 flex items-center justify-between group"
                    >
                      <div className="flex items-center gap-4">
                        <div 
                          className="w-14 h-14 rounded-xl flex items-center justify-center"
                          style={{ backgroundColor: `${category.color}15` }}
                        >
                          <IconComponent 
                            className="w-7 h-7" 
                            style={{ color: category.color }}
                            strokeWidth={2.5} 
                          />
                        </div>
                        <div className="text-left">
                          <h3 className="font-bold text-[#19142e]">{category.label}</h3>
                          <p className="text-xs text-gray-500 font-semibold">Anlık durum raporu</p>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-[#5852c4] transition-colors" strokeWidth={2.5} />
                    </button>
                  );
                })}
              </div>

              </div>
            </div>
          ) : !capturedPhoto ? (
            <div className="px-5 py-6">
              {/* Tab Selector */}
              <div className="mb-6">
                <div className="flex gap-2 bg-white rounded-xl p-1 shadow-sm border border-gray-100">
                  <button
                    onClick={() => {
                      setPhotoMode('camera');
                      setCameraError(null);
                    }}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg font-bold text-sm transition-all ${
                      photoMode === 'camera'
                        ? 'bg-gradient-to-r from-[#5852c4] to-[#7c3aed] text-white shadow-lg'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <Camera className="w-5 h-5" strokeWidth={2.5} />
                    Fotoğraf Çek
                  </button>
                  <button
                    onClick={() => {
                      setPhotoMode('upload');
                      if (stream) {
                        stream.getTracks().forEach(track => track.stop());
                        setStream(null);
                      }
                    }}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg font-bold text-sm transition-all ${
                      photoMode === 'upload'
                        ? 'bg-gradient-to-r from-[#5852c4] to-[#7c3aed] text-white shadow-lg'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <Upload className="w-5 h-5" strokeWidth={2.5} />
                    Fotoğraf Yükle
                  </button>
                </div>
              </div>

              {photoMode === 'camera' ? (
                <div className="relative h-[70vh] bg-black rounded-xl overflow-hidden">
                  {cameraError ? (
                    <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center">
                      <Camera className="w-16 h-16 text-gray-400 mb-4" strokeWidth={1.5} />
                      <p className="text-white font-bold mb-2">Kamera Erişimi Gerekli</p>
                      <p className="text-gray-400 text-sm mb-4">{cameraError}</p>
                      <button
                        onClick={requestCameraAccess}
                        className="px-6 py-3 rounded-lg bg-gradient-to-r from-[#5852c4] to-[#7c3aed] text-white font-bold text-sm hover:shadow-lg transition-all"
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
                      <canvas ref={canvasRef} className="hidden" />
                      
                      <div className="absolute inset-0 pointer-events-none">
                        <div className="w-full h-full grid grid-cols-3 grid-rows-3">
                          {[...Array(9)].map((_, i) => (
                            <div key={i} className="border border-white/10" />
                          ))}
                        </div>
                      </div>

                      <div className="absolute top-6 left-1/2 transform -translate-x-1/2">
                        <div 
                          className="px-5 py-2.5 rounded-full backdrop-blur-md shadow-lg flex items-center gap-2 border border-white/30"
                          style={{ backgroundColor: `${selectedCategory.color}E6` }}
                        >
                          {React.createElement(selectedCategory.icon, {
                            className: "w-5 h-5 text-white",
                            strokeWidth: 2.5,
                          })}
                          <span className="font-black text-white">{selectedCategory.label}</span>
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          setSelectedCategory(null);
                          if (stream) {
                            stream.getTracks().forEach(track => track.stop());
                            setStream(null);
                          }
                        }}
                        className="absolute top-6 left-5 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center border border-white/30 hover:bg-black/70 transition-colors"
                      >
                        <X className="w-6 h-6 text-white" strokeWidth={2.5} />
                      </button>

                      <div className="absolute top-6 right-5 px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-sm border border-white/30">
                        <span className="text-white font-bold text-sm">{currentTime}</span>
                      </div>

                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/95 to-transparent px-5 py-8">
                        <div className="flex items-center justify-center mb-4">
                          <button
                            onClick={handleCapturePhoto}
                            className="w-20 h-20 rounded-full bg-white border-4 border-gray-300 shadow-2xl active:scale-95 transition-transform relative group"
                          >
                            <div className="absolute inset-2 rounded-full bg-white group-active:bg-gray-200 transition-colors" />
                          </button>
                        </div>
                        <p className="text-white/80 text-sm text-center font-semibold">
                          Fotoğraf çekmek için dokun
                        </p>
                      </div>
                    </>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-16 h-16 rounded-full bg-[#5852c4]/20 flex items-center justify-center mx-auto mb-4">
                          <Camera className="w-8 h-8 text-[#5852c4]" strokeWidth={2.5} />
                        </div>
                        <p className="text-white font-bold mb-2">Kamera Hazırlanıyor...</p>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-12 text-center">
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/jpeg,image/jpg,image/png"
                        onChange={handleFileSelect}
                        className="hidden"
                      />
                      <ImageIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" strokeWidth={1.5} />
                      <p className="font-bold text-[#19142e] mb-2">Fotoğraf Yükle</p>
                      <p className="text-sm text-gray-500 mb-4">veya</p>
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="px-6 py-3 rounded-lg bg-gradient-to-r from-[#5852c4] to-[#7c3aed] text-white font-bold text-sm hover:shadow-lg transition-all"
                      >
                        Dosya Seç
                      </button>
                      <p className="text-xs text-gray-400 mt-3">
                        JPG, PNG desteklenir (Max 10MB)
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setSelectedCategory(null);
                    }}
                    className="w-full py-3 rounded-xl bg-gray-100 text-gray-700 font-bold hover:bg-gray-200 transition-colors"
                  >
                    Geri Dön
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="px-5 py-6">
              
              <div className="mb-5">
                <div className="relative rounded-xl overflow-hidden shadow-lg">
                  <ImageWithFallback 
                    src={capturedPhoto}
                    alt="Captured Photo"
                    className="w-full aspect-[4/3] object-cover"
                  />
                  
                  <div className="absolute top-4 left-4">
                    <div 
                      className="px-4 py-2 rounded-lg backdrop-blur-md shadow-lg flex items-center gap-2 border border-white/30"
                      style={{ backgroundColor: `${selectedCategory.color}E6` }}
                    >
                      {React.createElement(selectedCategory.icon, {
                        className: "w-5 h-5 text-white",
                        strokeWidth: 2.5,
                      })}
                      <span className="font-bold text-white text-sm">{selectedCategory.label}</span>
                    </div>
                  </div>

                  <div className="absolute bottom-4 right-4 px-3 py-1.5 rounded-lg bg-black/70 backdrop-blur-sm">
                    <p className="text-white text-xs font-bold">{currentTime}</p>
                  </div>

                  <button
                    onClick={() => setCapturedPhoto(null)}
                    className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/70 backdrop-blur-sm flex items-center justify-center hover:bg-black/90 transition-colors"
                  >
                    <X className="w-5 h-5 text-white" strokeWidth={2.5} />
                  </button>
                </div>
              </div>

              <div className="mb-5">
                <h3 className="text-lg font-bold text-[#19142e] mb-3">Durum Nedir?</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedCategory.statusOptions.map((status) => {
                    const isSelected = selectedStatus === status;
                    return (
                      <button
                        key={status}
                        onClick={() => setSelectedStatus(status)}
                        className={`
                          px-5 py-2.5 rounded-lg font-bold text-sm transition-all
                          ${isSelected 
                            ? 'text-white shadow-lg' 
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }
                        `}
                        style={isSelected ? { backgroundColor: selectedCategory.color } : {}}
                      >
                        {status}
                        {isSelected && <Check className="inline-block w-4 h-4 ml-1.5" strokeWidth={3} />}
                      </button>
                    );
                  })}
                </div>
              </div>

              <button
                onClick={handlePublish}
                disabled={!selectedStatus}
                className={`
                  w-full py-4 rounded-xl font-black text-lg transition-all shadow-lg
                  ${selectedStatus 
                    ? 'bg-gradient-to-r from-[#5852c4] to-[#7c3aed] hover:from-[#6c5ce7] hover:to-[#8b5cf6] text-white shadow-[#5852c4]/30 active:scale-98' 
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }
                `}
              >
                {selectedStatus ? '📸 PAYLAŞ (+15 Coin)' : 'Durum Seç'}
              </button>

              <p className="text-center text-sm text-gray-500 font-semibold mt-3">
                Fotoğrafın {currentTime} saatinde çekildi
              </p>
            </div>
          )}

          </PageLayout>
        </div>

        <AnimatePresence>
          {showSuccess && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
            >
              <motion.div
                initial={{ scale: 0.5, opacity: 0, rotate: -10 }}
                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                exit={{ scale: 0.5, opacity: 0, rotate: 10 }}
                className="bg-white rounded-2xl p-8 mx-5 text-center shadow-2xl max-w-sm"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                  className="w-20 h-20 rounded-full bg-gradient-to-r from-[#5852c4] to-[#7c3aed] flex items-center justify-center mx-auto mb-4 shadow-lg"
                >
                  <Camera className="w-10 h-10 text-white" strokeWidth={3} />
                </motion.div>

                <h2 className="text-2xl font-black text-[#19142e] mb-2">
                  Harika! 📸
                </h2>
                <p className="text-gray-600 font-semibold mb-4">
                  Rapor başarıyla paylaşıldı!
                </p>

                <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#5852c4] to-[#7c3aed] mb-4 shadow-lg">
                  <span className="text-2xl">🪙</span>
                  <span className="text-white font-black text-xl">+15 Coin</span>
                </div>

                <div className="flex justify-center gap-3 text-2xl">
                  {[...Array(3)].map((_, i) => (
                    <motion.span
                      key={i}
                      animate={{ 
                        y: [0, -20, 0],
                        rotate: [0, 10, -10, 0],
                      }}
                      transition={{ 
                        repeat: Infinity, 
                        duration: 2,
                        delay: i * 0.3 
                      }}
                    >
                      📸
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
