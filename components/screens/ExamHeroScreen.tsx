import React, { useState, useEffect } from 'react';
import { ArrowLeft, GraduationCap, Upload, FileText, Image, FileAudio, CheckCircle2, AlertCircle, X, Compass } from 'lucide-react';
import { motion } from 'motion/react';
import { GlobalHeader } from '../layout/GlobalHeader';
import { RightSidebar } from '../layout/RightSidebar';
import { WalletModal } from '../wallet/WalletModal';
import { useCoins } from '../../contexts/CoinContext';
import { CoinActionType } from '../../services/CoinRewardService';
import { useTheme } from '../../contexts/ThemeContext';
import { toast } from 'sonner';

// Mock Data
const UNIVERSITIES = [
  { id: 1, name: 'Necmettin Erbakan Üniversitesi (NEÜ)' },
  { id: 2, name: 'Selçuk Üniversitesi' },
  { id: 3, name: 'KTO Karatay Üniversitesi' },
];

const FACULTIES = {
  1: [
    { id: 1, name: 'Mühendislik Fakültesi' },
    { id: 2, name: 'Hukuk Fakültesi' },
    { id: 3, name: 'Tıp Fakültesi' },
  ],
  2: [
    { id: 4, name: 'İktisadi ve İdari Bilimler Fakültesi' },
    { id: 5, name: 'Fen Fakültesi' },
  ],
  3: [
    { id: 6, name: 'Mimarlık ve Tasarım Fakültesi' },
    { id: 7, name: 'Mühendislik Fakültesi' },
  ],
};

const COURSES = {
  1: ['Diferansiyel Denklemler', 'Lineer Cebir', 'Fizik I'],
  2: ['Anayasa Hukuku', 'Medeni Hukuk', 'Ceza Hukuku'],
  3: ['Anatomi', 'Biyokimya', 'Fizyoloji'],
  4: ['Mikroekonomi', 'Makroekonomi', 'İşletme Yönetimi'],
  5: ['Genel Kimya', 'Organik Kimya', 'Matematik I'],
  6: ['Mimari Tasarım', 'Teknik Resim', 'Malzeme Bilgisi'],
  7: ['Termodinamik', 'Mukavemet', 'Elektrik Devreleri'],
};

const CATEGORIES = [
  { id: 'summary', label: 'Özet Not', icon: FileText, color: '#5852c4' },
  { id: 'exam', label: 'Çıkmış Soru', icon: FileText, color: '#7c3aed' },
  { id: 'mindmap', label: 'Kavram Haritası', icon: Image, color: '#a855f7' },
  { id: 'audio', label: 'Ses Kaydı', icon: FileAudio, color: '#c084fc' },
];

interface ExamHeroScreenProps {
  onBack?: () => void;
  activeTab?: string;
  onTabChange?: (tab: string) => void;
  onGameCenterClick?: () => void;
}

export const ExamHeroScreen = ({ onBack, activeTab = 'home', onTabChange, onGameCenterClick }: ExamHeroScreenProps) => {
  const { isDarkMode } = useTheme();
  const { rewardAction, coins, coinAnimationTrigger, getUserRole, getRoleMultiplier } = useCoins();
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  const [isFormCompleted, setIsFormCompleted] = useState(false);
  const [showCoinAnimation, setShowCoinAnimation] = useState(false);
  const [previousCoins, setPreviousCoins] = useState(coins);
  const [isAnimating, setIsAnimating] = useState(false);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  // Form State
  const [selectedUniversity, setSelectedUniversity] = useState<number | null>(null);
  const [selectedFaculty, setSelectedFaculty] = useState<number | null>(null);
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  // Computed
  const availableFaculties = selectedUniversity ? FACULTIES[selectedUniversity] || [] : [];
  const availableCourses = selectedFaculty ? COURSES[selectedFaculty] || [] : [];
  const isFormValid = selectedUniversity && selectedFaculty && selectedCourse && selectedCategory && uploadedFile;

  // Helper function to get role data (same as MiniProfileCard)
  const getRoleData = (coins: number) => {
    if (coins < 500) return { title: "Yeni Gelen", multiplier: "1.0x", nextLimit: 500, minCoins: 0 };
    if (coins < 2500) return { title: "Seyyah", multiplier: "1.2x", nextLimit: 2500, minCoins: 500 };
    if (coins < 10000) return { title: "Gezgin", multiplier: "1.5x", nextLimit: 10000, minCoins: 2500 };
    if (coins < 50000) return { title: "Kaşif Meraklısı", multiplier: "2.0x", nextLimit: 50000, minCoins: 10000 };
    return { title: "Konya Bilgesi", multiplier: "2.5x", nextLimit: null, minCoins: 50000 };
  };

  // Calculate progress for current and previous coins
  const roleData = getRoleData(coins);
  const previousRoleData = getRoleData(previousCoins);
  
  const currentProgress = roleData.nextLimit 
    ? Math.min(100, Math.max(0, ((coins - roleData.minCoins) / (roleData.nextLimit - roleData.minCoins)) * 100))
    : 100;
  
  const previousProgress = previousRoleData.nextLimit 
    ? Math.min(100, Math.max(0, ((previousCoins - previousRoleData.minCoins) / (previousRoleData.nextLimit - previousRoleData.minCoins)) * 100))
    : 100;

  // Trigger animation when coins change
  useEffect(() => {
    if (coinAnimationTrigger > 0 && showCoinAnimation) {
      setIsAnimating(true);
      const timer = setTimeout(() => {
        setIsAnimating(false);
        setShowCoinAnimation(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [coinAnimationTrigger, showCoinAnimation]);

  // Handlers
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const validTypes = ['application/pdf', 'image/jpeg', 'image/png'];
      if (validTypes.includes(file.type)) {
        setUploadedFile(file);
      } else {
        alert('Sadece PDF, JPG ve PNG dosyaları kabul edilir.');
      }
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      const validTypes = ['application/pdf', 'image/jpeg', 'image/png'];
      if (validTypes.includes(file.type)) {
        setUploadedFile(file);
      } else {
        alert('Sadece PDF, JPG ve PNG dosyaları kabul edilir.');
      }
    }
  };

  const handleSubmit = () => {
    if (!isFormValid) return;
    console.log('📤 Submitting:', {
      university: selectedUniversity,
      faculty: selectedFaculty,
      course: selectedCourse,
      category: selectedCategory,
      file: uploadedFile?.name,
    });
    setPreviousCoins(coins);
    setIsFormCompleted(true);
    setShowCoinAnimation(true);
    const result = rewardAction(CoinActionType.GAME_EXAM_HERO);
    if (result.success) {
      toast.success(`🎉 Notun başarıyla yüklendi! +${result.reward} GençCoin kazandın! (${getUserRole()} - ${getRoleMultiplier()}x çarpan)`);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-[#f2f3f7] pb-28 lg:pb-6">
        
        {/* Desktop: Global Header */}
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

        {/* Mobile: Simple Back Header */}
        <div className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-white border-b border-gray-200">
          <button 
            onClick={onBack}
            className="flex items-center gap-3 px-5 py-3 hover:bg-gray-50 transition-colors w-full"
          >
            <ArrowLeft className="w-5 h-5 text-[#111827]" strokeWidth={2.5} />
            <span className="font-extrabold text-[#111827]">Vize/Final Kahramanı</span>
          </button>
        </div>

        {/* Desktop 70/30 Layout Container */}
        <div className="max-w-[1200px] mx-auto pt-[60px] lg:pt-[84px] px-0 lg:px-6">
          <div className="flex gap-6">
            
            {/* LEFT COLUMN - Main Content (70%) */}
            <main className="w-full lg:w-[70%]">
          
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
                  <GraduationCap className="w-6 h-6 text-white" strokeWidth={2.5} />
                </div>
                <div>
                  <h1 className="text-2xl font-black text-white">Vize/Final Kahramanı</h1>
                  <p className="text-white/90 text-sm font-semibold">Notunu paylaş, puan kazan!</p>
                </div>
              </div>
              <p className="text-white/80 text-sm leading-relaxed">
                Hangi dersin kahramanı olacaksın? Çalışma notlarını, özetlerini veya çıkmış sorularını paylaş, arkadaşlarına yardımcı ol!
              </p>
            </div>
          </div>

          {/* Form Wizard */}
          <div className="px-5 mt-0 space-y-5 bg-white rounded-b-xl pb-6">

            {/* Step 1: Üniversite Seçimi */}
            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
              <label className="block mb-3">
                <span className="text-sm font-bold text-[#19142e] mb-2 block">1. Üniversite</span>
                <select
                  value={selectedUniversity || ''}
                  onChange={(e) => {
                    setSelectedUniversity(Number(e.target.value) || null);
                    setSelectedFaculty(null);
                    setSelectedCourse(null);
                  }}
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-[#5852c4] focus:outline-none font-semibold text-[#19142e] transition-colors"
                >
                  <option value="">Üniversite seç...</option>
                  {UNIVERSITIES.map((uni) => (
                    <option key={uni.id} value={uni.id}>{uni.name}</option>
                  ))}
                </select>
              </label>
            </div>

            {/* Step 2: Fakülte Seçimi - Always Visible */}
            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
              <label className="block mb-3">
                <span className="text-sm font-bold text-[#19142e] mb-2 block">2. Fakülte</span>
                <select
                  value={selectedFaculty || ''}
                  onChange={(e) => {
                    setSelectedFaculty(Number(e.target.value) || null);
                    setSelectedCourse(null);
                  }}
                  disabled={!selectedUniversity}
                  className={`w-full px-4 py-3 rounded-lg border-2 focus:outline-none font-semibold text-[#19142e] transition-colors ${
                    !selectedUniversity 
                      ? 'border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed' 
                      : 'border-gray-200 focus:border-[#5852c4]'
                  }`}
                >
                  <option value="">Fakülte seç...</option>
                  {availableFaculties.map((fac) => (
                    <option key={fac.id} value={fac.id}>{fac.name}</option>
                  ))}
                </select>
              </label>
            </div>

            {/* Step 3: Ders Seçimi - Always Visible */}
            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
              <label className="block mb-3">
                <span className="text-sm font-bold text-[#19142e] mb-2 block">3. Ders</span>
                <select
                  value={selectedCourse || ''}
                  onChange={(e) => setSelectedCourse(e.target.value || null)}
                  disabled={!selectedFaculty}
                  className={`w-full px-4 py-3 rounded-lg border-2 focus:outline-none font-semibold text-[#19142e] transition-colors ${
                    !selectedFaculty 
                      ? 'border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed' 
                      : 'border-gray-200 focus:border-[#5852c4]'
                  }`}
                >
                  <option value="">Ders seç...</option>
                  {availableCourses.map((course) => (
                    <option key={course} value={course}>{course}</option>
                  ))}
                </select>
              </label>
            </div>

            {/* Step 4: Kategori Seçimi - Always Visible */}
            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
              <span className="text-sm font-bold text-[#19142e] mb-3 block">4. Kategori</span>
              <div className="grid grid-cols-2 gap-3">
                {CATEGORIES.map((cat) => {
                  const IconComponent = cat.icon;
                  const isSelected = selectedCategory === cat.id;
                  const isDisabled = !selectedCourse;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => !isDisabled && setSelectedCategory(cat.id)}
                      disabled={isDisabled}
                      className={`
                        flex items-center gap-2 px-4 py-3 rounded-lg border-2 transition-all font-bold text-sm
                        ${isDisabled
                          ? 'border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed'
                          : isSelected 
                            ? 'border-[#5852c4] bg-[#5852c4]/5 text-[#5852c4]' 
                            : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                        }
                      `}
                    >
                      <IconComponent className="w-5 h-5" strokeWidth={2.5} />
                      <span>{cat.label}</span>
                      {isSelected && <CheckCircle2 className="w-4 h-4 ml-auto" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 5: Upload Alanı - Always Visible */}
            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
              <span className="text-sm font-bold text-[#19142e] mb-3 block">5. Dosya Yükle</span>
              
              {/* Drag & Drop Zone */}
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`
                  relative border-2 border-dashed rounded-xl p-8 text-center transition-all
                  ${!selectedCategory
                    ? 'border-gray-200 bg-gray-50 opacity-50 cursor-not-allowed'
                    : isDragging 
                      ? 'border-[#5852c4] bg-[#5852c4]/5' 
                      : uploadedFile 
                      ? 'border-green-500 bg-green-50' 
                      : 'border-gray-300 bg-gray-50 hover:border-gray-400'
                  }
                `}
              >
                <input
                  type="file"
                  id="file-upload"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleFileSelect}
                  disabled={!selectedCategory}
                  className="hidden"
                />
                
                {uploadedFile ? (
                  // Preview State
                  <div className="space-y-3">
                    <div className="flex items-center justify-center gap-3">
                      <div className="w-12 h-12 rounded-lg bg-green-500 flex items-center justify-center">
                        <CheckCircle2 className="w-6 h-6 text-white" strokeWidth={2.5} />
                      </div>
                    </div>
                    <div>
                      <p className="font-bold text-[#19142e] mb-1">{uploadedFile.name}</p>
                      <p className="text-xs text-gray-500">
                        {(uploadedFile.size / 1024).toFixed(2)} KB
                      </p>
                    </div>
                    <button
                      onClick={() => setUploadedFile(null)}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white font-bold text-sm transition-colors"
                    >
                      <X className="w-4 h-4" />
                      Kaldır
                    </button>
                  </div>
                ) : (
                  // Upload State
                  <>
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" strokeWidth={2} />
                    <p className="font-bold text-[#19142e] mb-2">
                      {isDragging ? 'Dosyayı bırak!' : 'Dosyaları buraya sürükle'}
                    </p>
                    <p className="text-sm text-gray-500 mb-4">veya</p>
                    <label
                      htmlFor="file-upload"
                      className={`inline-block px-5 py-2.5 rounded-lg text-white font-bold text-sm transition-colors ${
                        !selectedCategory
                          ? 'bg-gray-400 cursor-not-allowed'
                          : 'bg-[#5852c4] hover:bg-[#6c5ce7] cursor-pointer'
                      }`}
                    >
                      Dosya Seç
                    </label>
                    <p className="text-xs text-gray-400 mt-3">
                      PDF, JPG, PNG desteklenir (Max 10MB)
                    </p>
                  </>
                )}
              </div>
            </div>

            {/* Kurallar Kutusu - Always Visible */}
            <div className="bg-amber-50 border-2 border-amber-300 rounded-xl p-4 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" strokeWidth={2.5} />
              <div>
                <h4 className="font-bold text-amber-900 mb-1 text-sm">⚠️ Önemli Uyarı</h4>
                <p className="text-xs text-amber-800 leading-relaxed">
                  Telif hakkı içeren kitap taramaları kabul edilmez. Sadece kendi el yazısı notlarını, özgün içeriklerini veya izin alınmış materyalleri yükle. Kurallara uymayan içerikler silinir ve hesap askıya alınabilir.
                </p>
              </div>
            </div>

            {/* Submit Button */}
            {!isFormCompleted ? (
              <button
                onClick={handleSubmit}
                disabled={!isFormValid}
                className={`
                  w-full py-4 rounded-xl font-black text-lg transition-all shadow-lg
                  ${isFormValid 
                    ? 'bg-gradient-to-r from-[#5852c4] to-[#7c3aed] hover:from-[#6c5ce7] hover:to-[#8b5cf6] text-white shadow-[#5852c4]/30 active:scale-98' 
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }
                `}
              >
                {isFormValid ? '🚀 GÖNDER (+150 GençCoin Kazan)' : 'Tüm Alanları Doldurun'}
              </button>
            ) : (
              <div className={`p-6 ${isDarkMode ? 'bg-green-900/20' : 'bg-green-50'} rounded-xl`}>
                <div className="text-center mb-6">
                  <CheckCircle2 className={`w-16 h-16 mx-auto mb-3 ${
                    isDarkMode ? 'text-green-400' : 'text-green-600'
                  }`} strokeWidth={2.5} />
                  <p className={`font-bold text-lg mb-1 ${isDarkMode ? 'text-green-400' : 'text-green-600'}`}>
                    Form tamamlandı!
                  </p>
                  <p className={`text-sm ${isDarkMode ? 'text-green-300' : 'text-green-700'}`}>
                    +150 GençCoin eklendi! 🎉
                  </p>
                </div>

                {/* Coin Progress Bar Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`rounded-[10px] p-4 border-2 transition-all duration-500 ${
                    isDarkMode 
                      ? 'bg-white border-[#5852c4]' 
                      : 'bg-white border-[#5852c4]/30'
                  } ${
                    isAnimating 
                      ? 'border-[#5852c4] shadow-[0_0_20px_rgba(88,82,196,0.6)] ring-2 ring-[#5852c4]/50' 
                      : ''
                  }`}
                >
                  {/* Header: Icon, Title, Multiplier */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Compass className={`w-4 h-4 ${isDarkMode ? 'text-[#5852c4]' : 'text-[#5852c4]'}`} strokeWidth={2.5} />
                      <span className={`font-bold text-sm ${isDarkMode ? 'text-[#19142e]' : 'text-[#19142e]'}`}>
                        {roleData.title}
                      </span>
                    </div>
                    <div className={`px-2 py-0.5 rounded-full ${
                      isDarkMode ? 'bg-[#5852c4]' : 'bg-[#5852c4]'
                    }`}>
                      <span className="text-white text-xs font-bold">{roleData.multiplier}</span>
                    </div>
                  </div>
                  
                  {/* Progress Bar Container with Animation */}
                  <div className={`w-full h-2 bg-gray-200 rounded-full overflow-hidden mb-2 transition-all duration-500 ${
                    isAnimating ? 'ring-2 ring-[#5852c4]/50' : ''
                  }`}>
                    <motion.div 
                      className="h-full bg-gradient-to-r from-[#5852c4] via-[#7c3aed] to-[#06b6d4] rounded-full"
                      initial={{ width: `${previousProgress}%` }}
                      animate={{ width: `${currentProgress}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                    />
                  </div>
                  
                  {/* Stats: Coins / Limit and Percentage */}
                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-bold ${isDarkMode ? 'text-[#19142e]' : 'text-[#19142e]'}`}>
                      {coins.toLocaleString()} / {roleData.nextLimit ? roleData.nextLimit.toLocaleString() : '∞'}
                    </span>
                    <span className={`text-xs font-bold ${isDarkMode ? 'text-[#5852c4]' : 'text-[#5852c4]'}`}>
                      %{Math.round(currentProgress)}
                    </span>
                  </div>
                </motion.div>
              </div>
            )}

          </div>

            </main>

            {/* RIGHT COLUMN - Sticky Sidebar (30%) - Desktop Only */}
            <RightSidebar 
              onProfileClick={() => onTabChange?.('profile')}
              onWalletOpen={() => setIsWalletModalOpen(true)}
              onGameClick={() => {}}
              onGameCenterClick={onGameCenterClick}
            />

          </div>
        </div>

      </div>

      {/* Wallet Modal */}
      <WalletModal 
        isOpen={isWalletModalOpen}
        onClose={() => setIsWalletModalOpen(false)}
      />
    </>
  );
};
