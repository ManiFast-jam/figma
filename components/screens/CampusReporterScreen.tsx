import React, { useState } from 'react';
import { Camera, X, Check, UtensilsCrossed, Bus, Library, PartyPopper, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { GlobalHeader } from '../layout/GlobalHeader';
import { PageLayout } from '../layout/PageLayout';
import { WalletModal } from '../wallet/WalletModal';
import { ImageWithFallback } from '../figma/ImageWithFallback';

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
    color: '#F59E0B',
    statusOptions: ['Çok Güzel', 'İyi', 'Orta', 'Kötü'],
  },
  {
    id: 'bus',
    label: 'Otobüs Sırası',
    icon: Bus,
    color: '#3b82f6',
    statusOptions: ['Sıra Çok', 'Sıra Az', 'Otobüs Boş'],
  },
  {
    id: 'library',
    label: 'Kütüphane',
    icon: Library,
    color: '#8b5cf6',
    statusOptions: ['Çok Dolu', 'Orta', 'Boş'],
  },
  {
    id: 'event',
    label: 'Etkinlik',
    icon: PartyPopper,
    color: '#ec4899',
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

  const handleCapturePhoto = () => {
    // Mock photo capture - use a placeholder image
    const mockPhotoUrl = 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1';
    setCapturedPhoto(mockPhotoUrl);
  };

  const handlePublish = () => {
    if (!selectedCategory || !capturedPhoto || !selectedStatus) return;
    
    console.log('📸 Publishing Report:', {
      category: selectedCategory.label,
      status: selectedStatus,
      photo: capturedPhoto,
      timestamp: new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' }),
    });

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
            coinBalance="2.450"
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
            <div className="px-5 py-6">
              
              <div className="mb-6 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-red-500 to-red-600 mb-4 shadow-lg relative">
                  <Camera className="w-8 h-8 text-white" strokeWidth={2.5} />
                  <motion.div
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                    className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 border-2 border-white"
                  />
                </div>
                <h1 className="text-3xl font-black text-[#19142e] mb-2">Kampüs Muhabiri</h1>
                <p className="text-gray-600 font-semibold">Yemekhane, otobüs veya kütüphane... Durum ne?</p>
              </div>

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

              <div className="mt-6 p-4 bg-blue-50 border-2 border-blue-200 rounded-lg">
                <p className="text-sm text-blue-800 font-semibold text-center leading-relaxed">
                  📸 Fotoğraf çek, durumu etiketle, anında paylaş!<br/>
                  Tüm kampüs anlık bilgilerle güncel kalacak.
                </p>
              </div>
            </div>
          ) : !capturedPhoto ? (
            <div className="relative h-screen">
              
              <div className="relative h-[70vh] bg-black overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-gray-800 via-gray-700 to-gray-800 flex items-center justify-center">
                  <div className="text-center">
                    <Camera className="w-24 h-24 text-gray-600 mx-auto mb-4" strokeWidth={1.5} />
                    <p className="text-gray-400 font-semibold">Kamera Önizlemesi</p>
                    <p className="text-gray-500 text-sm">(Demo Mode)</p>
                  </div>
                </div>

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
                  onClick={() => setSelectedCategory(null)}
                  className="absolute top-6 left-5 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center border border-white/30 hover:bg-black/70 transition-colors"
                >
                  <X className="w-6 h-6 text-white" strokeWidth={2.5} />
                </button>

                <div className="absolute top-6 right-5 px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-sm border border-white/30">
                  <span className="text-white font-bold text-sm">{currentTime}</span>
                </div>
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
                    ? 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-red-500/30 active:scale-98' 
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
                  className="w-20 h-20 rounded-full bg-red-500 flex items-center justify-center mx-auto mb-4 shadow-lg"
                >
                  <Camera className="w-10 h-10 text-white" strokeWidth={3} />
                </motion.div>

                <h2 className="text-2xl font-black text-[#19142e] mb-2">
                  Harika! 📸
                </h2>
                <p className="text-gray-600 font-semibold mb-4">
                  Rapor başarıyla paylaşıldı!
                </p>

                <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-red-500 to-red-600 mb-4 shadow-lg">
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
