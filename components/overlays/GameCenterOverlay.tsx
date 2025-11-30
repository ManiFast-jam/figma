import React, { useState } from 'react';
import { X, GraduationCap, Map, Disc, Camera, CheckCircle2, Users } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useTheme } from '../../contexts/ThemeContext';
import { useCoins } from '../../contexts/CoinContext';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { toast } from 'sonner';

interface GameCenterOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onGameSelect: (gameId: string) => void;
}

// Mock daily survey data
const dailySurvey = {
  question: 'Konya\'da en sevdiğin mekan hangisi?',
  options: [
    { id: 1, text: 'Alaaddin Tepesi' },
    { id: 2, text: 'Mevlana Müzesi' },
    { id: 3, text: 'Konya Bilim Merkezi' },
    { id: 4, text: 'Selçuk Üniversitesi Kampüsü' },
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

export const GameCenterOverlay = ({ isOpen, onClose, onGameSelect }: GameCenterOverlayProps) => {
  const { isDarkMode } = useTheme();
  const { addCoins } = useCoins();
  const [selectedSurveyOption, setSelectedSurveyOption] = useState<number | null>(null);
  const [surveyCompleted, setSurveyCompleted] = useState(false);

  const games = [
    {
      id: 'exam-hero',
      title: 'Vize/Final Kahramanı',
      description: 'Sınavlara hazırlan, soruları çöz ve coin kazan!',
      icon: GraduationCap,
      reward: '+150 Coin',
      participants: getGameParticipants('exam-hero'),
    },
    {
      id: 'campus-reporter',
      title: 'Kampüs Muhabiri',
      description: 'Kampüste olan biteni keşfet ve haber yap!',
      icon: Camera,
      reward: '+75 Coin',
      participants: getGameParticipants('campus-reporter'),
    },
    {
      id: 'treasure-hunt',
      title: 'Hazine Avı',
      description: 'Saklı hazineleri bul ve ödülleri topla!',
      icon: Map,
      reward: '+100 Coin',
      participants: getGameParticipants('treasure-hunt'),
    },
    {
      id: 'wheel-fortune',
      title: 'Şans Çarkı',
      description: 'Çarkı çevir ve şansını dene!',
      icon: Disc,
      reward: '+50 Coin',
      participants: getGameParticipants('wheel-fortune'),
    },
  ];

  const handleSurveySubmit = () => {
    if (selectedSurveyOption) {
      setSurveyCompleted(true);
      addCoins(dailySurvey.reward);
      toast.success(`${dailySurvey.reward} GençCoin kazandın!`);
    }
  };

  const handleGameClick = (gameId: string) => {
    onClose();
    onGameSelect(gameId);
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
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60]"
            onClick={onClose}
          />

          {/* Overlay Content */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="fixed inset-0 z-[70] flex flex-col"
          >
            {/* Background with Gradient */}
            <div className={`absolute inset-0 ${
              isDarkMode 
                ? 'bg-gradient-to-b from-[#1a1a2e] via-[#0f0e17] to-[#0f0e17]'
                : 'bg-gradient-to-b from-[#f3f3ff] via-white to-white'
            }`} />

            {/* Content Container */}
            <div className="relative flex flex-col h-full overflow-y-auto">
              {/* Header */}
              <div className="px-6 pt-12 pb-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h1 className={`text-3xl font-extrabold tracking-tight ${
                      isDarkMode ? 'text-white' : 'text-[#19142e]'
                    }`}>
                      Oyun Merkezi
                    </h1>
                    <p className={`mt-1.5 ${
                      isDarkMode ? 'text-slate-400' : 'text-[#8279a5]'
                    }`}>
                      Oyna ve Coinlerini Katla!
                    </p>
                  </div>
                  
                  {/* Close Button */}
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={onClose}
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                      isDarkMode 
                        ? 'bg-slate-800 hover:bg-slate-700' 
                        : 'bg-[#ededff] hover:bg-[#e0e0f5]'
                    }`}
                  >
                    <X className={`w-5 h-5 ${isDarkMode ? 'text-white' : 'text-[#19142e]'}`} strokeWidth={2.5} />
                  </motion.button>
                </div>
              </div>

              {/* Content */}
              <div className="px-6 pb-32 max-w-[1200px] mx-auto w-full">
                {/* Daily Survey Section - Top */}
                <div className={`mb-8 rounded-xl p-6 shadow-[0_2px_12px_rgba(25,20,46,0.08)] ${
                  isDarkMode ? 'bg-[#1a1a2e]' : 'bg-white'
                }`}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-12 h-12 rounded-lg bg-[#5852c4]/10 flex items-center justify-center ${
                      isDarkMode ? 'bg-[#5852c4]/20' : ''
                    }`}>
                      <CheckCircle2 className="w-6 h-6 text-[#5852c4]" strokeWidth={2.5} />
                    </div>
                    <div>
                      <h2 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-[#19142e]'}`}>
                        Günün Anketi
                      </h2>
                      <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-[#8279a5]'}`}>
                        Anketi tamamla ve {dailySurvey.reward} GençCoin kazan!
                      </p>
                    </div>
                  </div>

                  {!surveyCompleted ? (
                    <>
                      <p className={`text-base font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-[#19142e]'}`}>
                        {dailySurvey.question}
                      </p>
                      <div className="space-y-2 mb-4">
                        {dailySurvey.options.map((option) => (
                          <button
                            key={option.id}
                            onClick={() => setSelectedSurveyOption(option.id)}
                            className={`w-full text-left px-4 py-3 rounded-lg transition-all ${
                              selectedSurveyOption === option.id
                                ? 'bg-[#5852c4] text-white'
                                : isDarkMode
                                  ? 'bg-slate-800 hover:bg-slate-700 text-white'
                                  : 'bg-[#f2f3f7] hover:bg-[#e5e7eb] text-[#19142e]'
                            }`}
                          >
                            {option.text}
                          </button>
                        ))}
                      </div>
                      <button
                        onClick={handleSurveySubmit}
                        disabled={!selectedSurveyOption}
                        className="w-full py-3 bg-[#5852c4] hover:bg-[#6c5ce7] text-white font-bold rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-[#5852c4]/30"
                      >
                        Gönder ve {dailySurvey.reward} Coin Kazan
                      </button>
                    </>
                  ) : (
                    <div className={`text-center py-4 rounded-lg ${
                      isDarkMode ? 'bg-green-900/20' : 'bg-green-50'
                    }`}>
                      <CheckCircle2 className={`w-12 h-12 mx-auto mb-2 ${
                        isDarkMode ? 'text-green-400' : 'text-green-600'
                      }`} strokeWidth={2.5} />
                      <p className={`font-bold ${isDarkMode ? 'text-green-400' : 'text-green-600'}`}>
                        Anket tamamlandı! +{dailySurvey.reward} GençCoin kazandın!
                      </p>
                    </div>
                  )}
                </div>

                {/* Games Grid - Bottom Section */}
                <div>
                  <h3 className={`text-xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-[#19142e]'}`}>
                    Oyunlar
                  </h3>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {games.map((game, index) => {
                      const Icon = game.icon;
                      return (
                        <motion.button
                          key={game.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1, duration: 0.3 }}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleGameClick(game.id)}
                          className={`rounded-xl p-5 shadow-[0_2px_12px_rgba(25,20,46,0.08)] hover:shadow-[0_4px_20px_rgba(25,20,46,0.12)] transition-all duration-300 text-left ${
                            isDarkMode ? 'bg-[#1a1a2e]' : 'bg-white'
                          }`}
                        >
                          {/* Horizontal Layout */}
                          <div className="flex items-center gap-4">
                            {/* Left: Icon */}
                            <div className={`flex-shrink-0 w-16 h-16 rounded-lg ${
                              isDarkMode 
                                ? 'bg-slate-800' 
                                : 'bg-[#f2f3f7]'
                            } flex items-center justify-center`}>
                              <Icon className={`w-8 h-8 ${
                                isDarkMode ? 'text-[#5852c4]' : 'text-[#5852c4]'
                              }`} strokeWidth={2} />
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
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
