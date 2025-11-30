import React, { useState, useEffect } from 'react';
import { GraduationCap, Map, Camera, CheckCircle2, Trophy, Sparkles, Compass } from 'lucide-react';
import { motion } from 'motion/react';
import { useTheme } from '../../contexts/ThemeContext';
import { useCoins } from '../../contexts/CoinContext';
import { CoinActionType } from '../../services/CoinRewardService';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { toast } from 'sonner';
import { GlobalHeader } from '../layout/GlobalHeader';
import { PageLayout } from '../layout/PageLayout';
import { WalletModal } from '../wallet/WalletModal';
import { CoinBlaster } from '../games/CoinBlaster';

interface GameCenterScreenProps {
  onBack?: () => void;
  activeTab?: string;
  onTabChange?: (tab: string) => void;
  onGameSelect?: (gameId: string) => void;
  onWalletOpen?: () => void;
}

// Mock daily survey data - Single survey with images
const dailySurvey = {
  id: 1,
  question: 'Konya\'da en sevdiğin mekan hangisi?',
  options: [
    { 
      id: 1, 
      text: 'Alaaddin Tepesi', 
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop',
      description: 'Tarihi ve manzaralı'
    },
    { 
      id: 2, 
      text: 'Mevlana Müzesi', 
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop',
      description: 'Kültürel miras'
    },
    { 
      id: 3, 
      text: 'Konya Bilim Merkezi', 
      image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=400&h=300&fit=crop',
      description: 'Modern ve eğitici'
    },
    { 
      id: 4, 
      text: 'Selçuk Üniversitesi Kampüsü', 
      image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&h=300&fit=crop',
      description: 'Öğrenci hayatı'
    },
  ],
  reward: 10,
};

// Mock game participants
const getGameParticipants = (gameId: string) => {
  const participants = [
    { id: 1, name: 'Ahmet', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&h=120&fit=crop' },
    { id: 2, name: 'Ayşe', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&h=120&fit=crop' },
    { id: 3, name: 'Mehmet', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop' },
    { id: 4, name: 'Zeynep', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&h=120&fit=crop' },
  ];
  return participants.slice(0, Math.floor(Math.random() * 3) + 2); // 2-4 participants
};

export const GameCenterScreen = ({ 
  onBack, 
  activeTab = 'home',
  onTabChange,
  onGameSelect,
  onWalletOpen
}: GameCenterScreenProps) => {
  const { isDarkMode } = useTheme();
  const { rewardAction, coins, coinAnimationTrigger, getUserRole, getRoleMultiplier } = useCoins();
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [selectedSurveyOption, setSelectedSurveyOption] = useState<number | null>(null);
  const [surveyCompleted, setSurveyCompleted] = useState(false);
  const [showCoinAnimation, setShowCoinAnimation] = useState(false);
  const [previousCoins, setPreviousCoins] = useState(coins);
  const [isAnimating, setIsAnimating] = useState(false);

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

  const games = [
    {
      id: 'exam-hero',
      title: 'Vize/Final Kahramanı',
      description: 'Sınavlara hazırlan, soruları çöz ve coin kazan!',
      icon: GraduationCap,
      reward: '+150 Coin',
      participants: getGameParticipants('exam-hero'),
      image: '/assets/Adsız tasarım-44.png',
    },
    {
      id: 'campus-reporter',
      title: 'Kampüs Muhabiri',
      description: 'Kampüste olan biteni keşfet ve haber yap!',
      icon: Camera,
      reward: '+75 Coin',
      participants: getGameParticipants('campus-reporter'),
      image: '/assets/Adsız tasarım-45.png',
    },
    {
      id: 'treasure-hunt',
      title: 'Hazine Avı',
      description: 'Saklı hazineleri bul ve ödülleri topla!',
      icon: Map,
      reward: '+100 Coin',
      participants: getGameParticipants('treasure-hunt'),
      image: '/assets/Adsız tasarım-46.png',
    },
  ];

  const handleSurveyOptionSelect = (optionId: number) => {
    setSelectedSurveyOption(optionId);
  };

  const handleSurveySubmit = () => {
    if (selectedSurveyOption && !surveyCompleted) {
      setPreviousCoins(coins);
      setSurveyCompleted(true);
      setShowCoinAnimation(true);
      const result = rewardAction(CoinActionType.GAME_SURVEY_COMPLETE);
      if (result.success) {
        toast.success(`+${result.reward} GençCoin kazandınız! (${getUserRole()} - ${getRoleMultiplier()}x çarpan)`);
      }
    }
  };

  const handleGameClick = (gameId: string) => {
    if (onGameSelect) {
      onGameSelect(gameId);
    }
  };

  return (
    <>
      <div className={`min-h-screen ${isDarkMode ? 'bg-[#0f0e17]' : 'bg-[#f2f3f7]'} pb-28 lg:pb-6 transition-colors`}>
        {/* Global Header */}
        <GlobalHeader 
          type="rich"
          onWalletClick={() => setIsWalletModalOpen(true)}
          onSearchClick={() => console.log('🔍 Search clicked')}
          onFilterClick={() => console.log('🎯 Filter clicked')}
          activeTab={activeTab}
          onTabChange={onTabChange}
          onGameCenterClick={() => {}}
          onBackClick={onBack}
        />

        {/* Main Content with PageLayout */}
        <div className="pt-[60px] lg:pt-[84px]">
          <PageLayout
            onTabChange={onTabChange}
            onWalletOpen={() => setIsWalletModalOpen(true)}
            onGameClick={handleGameClick}
            onGameCenterClick={() => {}}
          >
            <div className="space-y-8">
              {/* Daily Survey Section */}
              <div className="px-4 lg:px-0">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`rounded-xl overflow-hidden shadow-lg relative ${
                    isDarkMode ? 'bg-[#1a1a2e]' : 'bg-white'
                  }`}
                >
                  {!surveyCompleted ? (
                    <>
                      {/* Question Header */}
                      <div className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            {/* Günün Anketi Title */}
                            <div className="flex items-center gap-2 mb-3">
                              <Sparkles className={`w-5 h-5 ${isDarkMode ? 'text-[#5852c4]' : 'text-[#5852c4]'}`} strokeWidth={2.5} />
                              <h2 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-[#19142e]'}`}>
                                Günün Anketi
                              </h2>
                            </div>
                            <h3 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-[#19142e]'}`}>
                              {dailySurvey.question}
                            </h3>
                          </div>
                          {/* +10 Coin Badge - Top Right Corner */}
                          <div className={`flex-shrink-0 flex items-center gap-2 px-3 py-1.5 rounded-full ${
                            isDarkMode ? 'bg-[#5852c4]/20' : 'bg-[#5852c4]/10'
                          }`}>
                            <Trophy className={`w-4 h-4 ${isDarkMode ? 'text-[#5852c4]' : 'text-[#5852c4]'}`} strokeWidth={2.5} />
                            <span className={`text-sm font-bold ${isDarkMode ? 'text-[#5852c4]' : 'text-[#5852c4]'}`}>
                              +{dailySurvey.reward} GençCoin
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Options Grid with Images */}
                      <div className="px-6 pb-6">
                        <div className="grid grid-cols-2 gap-4">
                          {dailySurvey.options.map((option) => (
                            <motion.button
                              key={option.id}
                              onClick={() => handleSurveyOptionSelect(option.id)}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              className={`relative rounded-xl overflow-hidden border-2 transition-all ${
                                selectedSurveyOption === option.id
                                  ? 'border-[#5852c4] ring-2 ring-[#5852c4]/30'
                                  : isDarkMode
                                    ? 'border-slate-700 hover:border-slate-600'
                                    : 'border-gray-200 hover:border-gray-300'
                              }`}
                            >
                              {/* Image */}
                              <div className="relative w-full h-32 overflow-hidden">
                                <ImageWithFallback
                                  src={option.image}
                                  alt={option.text}
                                  className="w-full h-full object-cover"
                                />
                                {/* Overlay gradient */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                                
                                {/* Selected indicator */}
                                {selectedSurveyOption === option.id && (
                                  <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-[#5852c4] flex items-center justify-center">
                                    <CheckCircle2 className="w-4 h-4 text-white" strokeWidth={2.5} />
                                  </div>
                                )}
                              </div>

                              {/* Text Content */}
                              <div className={`p-3 ${isDarkMode ? 'bg-[#1a1a2e]' : 'bg-white'}`}>
                                <h4 className={`font-bold text-sm mb-1 text-left ${
                                  isDarkMode ? 'text-white' : 'text-[#19142e]'
                                }`}>
                                  {option.text}
                                </h4>
                                <p className={`text-xs text-left ${
                                  isDarkMode ? 'text-slate-400' : 'text-[#8279a5]'
                                }`}>
                                  {option.description}
                                </p>
                              </div>
                            </motion.button>
                          ))}
                        </div>

                        {/* Submit Button */}
                        <button
                          onClick={handleSurveySubmit}
                          disabled={!selectedSurveyOption}
                          className="w-full mt-6 py-3 bg-gradient-to-r from-[#5852c4] to-[#7c3aed] hover:from-[#6c5ce7] hover:to-[#8b5cf6] text-white font-bold rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-[#5852c4]/30"
                        >
                          Gönder ve {dailySurvey.reward} Coin Kazan
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className={`p-6 ${isDarkMode ? 'bg-green-900/20' : 'bg-green-50'}`}>
                      <div className="text-center mb-6">
                        <CheckCircle2 className={`w-16 h-16 mx-auto mb-3 ${
                          isDarkMode ? 'text-green-400' : 'text-green-600'
                        }`} strokeWidth={2.5} />
                        <p className={`font-bold text-lg mb-1 ${isDarkMode ? 'text-green-400' : 'text-green-600'}`}>
                          Anket tamamlandı!
                        </p>
                        <p className={`text-sm ${isDarkMode ? 'text-green-300' : 'text-green-700'}`}>
                          +{dailySurvey.reward} GençCoin eklendi! 🎉
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
                </motion.div>
              </div>

              {/* Games Section */}
              <div className="px-4 lg:px-0">
                <h2 className={`text-xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-[#19142e]'}`}>
                  Oyunlar
                </h2>
                <div className="grid grid-cols-1 lg:flex lg:flex-col gap-4">
                  {games.map((game, index) => {
                    const Icon = game.icon;
                    return (
                      <motion.button
                        key={game.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleGameClick(game.id)}
                        className={`group rounded-xl p-5 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-left ${
                          isDarkMode ? 'bg-[#1a1a2e]' : 'bg-white'
                        }`}
                      >
                        {/* Horizontal Layout */}
                        <div className="flex items-center gap-4">
                          {/* Left: Game Image/Icon */}
                          <div className="flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden flex items-center justify-center transition-all duration-300 ease-in-out group-hover:scale-110 group-hover:rotate-3">
                            {game.image ? (
                              <ImageWithFallback
                                src={game.image}
                                alt={game.title}
                                className="w-full h-full object-contain"
                                fallbackSrc={undefined}
                              />
                            ) : (
                              <Icon className={`w-8 h-8 ${
                                isDarkMode ? 'text-[#5852c4]' : 'text-[#5852c4]'
                              }`} strokeWidth={2} />
                            )}
                          </div>

                          {/* Middle: Title, Description, Reward */}
                          <div className="flex-1 min-w-0">
                            <h3 className={`font-bold text-lg mb-1 ${
                              isDarkMode ? 'text-white' : 'text-[#19142e]'
                            }`}>
                              {game.title}
                            </h3>
                            <p className={`text-sm mb-2 ${
                              isDarkMode ? 'text-slate-400' : 'text-[#8279a5]'
                            }`}>
                              {game.description}
                            </p>
                            <div className={`inline-block px-3 py-1 rounded-full ${
                              isDarkMode ? 'bg-orange-900/30' : 'bg-orange-50'
                            }`}>
                              <span className={`font-bold text-sm ${
                                isDarkMode ? 'text-orange-400' : 'text-orange-600'
                              }`}>
                                {game.reward}
                              </span>
                            </div>
                          </div>

                          {/* Right: Participants */}
                          <div className="flex-shrink-0">
                            <div className="flex items-center gap-2">
                              <div className="flex -space-x-2">
                                {game.participants.slice(0, 3).map((participant) => (
                                  <ImageWithFallback
                                    key={participant.id}
                                    src={participant.avatar}
                                    alt={participant.name}
                                    className="w-8 h-8 rounded-full border-2 border-white object-cover"
                                  />
                                ))}
                              </div>
                              {game.participants.length > 3 && (
                                <div className={`w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-xs font-bold ${
                                  isDarkMode 
                                    ? 'bg-slate-700 text-white' 
                                    : 'bg-[#f2f3f7] text-[#19142e]'
                                }`}>
                                  +{game.participants.length - 3}
                                </div>
                              )}
                            </div>
                            <p className={`text-xs mt-1 text-center ${
                              isDarkMode ? 'text-slate-400' : 'text-[#8279a5]'
                            }`}>
                              {game.participants.length} katılımcı
                            </p>
                          </div>
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              {/* Coin Blaster Game Section */}
              <div className="px-4 lg:px-0">
                <h2 className={`text-xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-[#19142e]'}`}>
                  🎯 Bonus Oyun
                </h2>
                <CoinBlaster />
              </div>
            </div>
          </PageLayout>
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
