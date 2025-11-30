import React, { useState } from 'react';
import { BarChart3, Check, MessageCircle, Send, TrendingUp } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { GlobalHeader } from '../layout/GlobalHeader';
import { RightSidebar } from '../layout/RightSidebar';
import { WalletModal } from '../wallet/WalletModal';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface PollOption {
  id: string;
  label: string;
  description: string;
  image: string;
  votes: number;
}

interface Comment {
  id: number;
  username: string;
  avatar: string;
  text: string;
  timeAgo: string;
}

const POLL_QUESTION = "Konya'nın en iyi öğrenci semti neresi?";

const POLL_OPTIONS: PollOption[] = [
  {
    id: 'a',
    label: 'Bosna Hersek',
    description: 'Öğrenci Cenneti',
    image: 'https://images.unsplash.com/photo-1763475775356-b69e112a4989?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50JTIwbmVpZ2hib3Job29kJTIwc3RyZWV0fGVufDF8fHx8MTc2NDI3MTgwN3ww&ixlib=rb-4.1.0&q=80&w=1080',
    votes: 70,
  },
  {
    id: 'b',
    label: 'Zafer Meydanı',
    description: 'Şehrin Kalbi',
    image: 'https://images.unsplash.com/photo-1506976773555-b3da30a63b57?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaXR5JTIwY2VudGVyJTIwc3F1YXJlfGVufDF8fHx8MTc2NDI3MTgwN3ww&ixlib=rb-4.1.0&q=80&w=1080',
    votes: 30,
  },
];

const MOCK_COMMENTS: Comment[] = [
  {
    id: 1,
    username: 'Ahmet K.',
    avatar: 'https://i.pravatar.cc/150?img=12',
    text: 'Bosna kesinlikle! Her şey yürüme mesafesinde 🎓',
    timeAgo: '2 dk önce',
  },
  {
    id: 2,
    username: 'Zeynep A.',
    avatar: 'https://i.pravatar.cc/150?img=25',
    text: 'Zafer daha merkezi ama biraz pahalı 😅',
    timeAgo: '5 dk önce',
  },
  {
    id: 3,
    username: 'Mehmet Y.',
    avatar: 'https://i.pravatar.cc/150?img=33',
    text: 'Bosna\'da uygun fiyatlı yemekhaneler var, öğrenci için ideal',
    timeAgo: '8 dk önce',
  },
];

interface DailyPollScreenProps {
  onBack?: () => void;
  activeTab?: string;
  onTabChange?: (tab: string) => void;
  onGameCenterClick?: () => void;
}

export const DailyPollScreen = ({ onBack, activeTab = 'home', onTabChange, onGameCenterClick }: DailyPollScreenProps) => {
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [hasVoted, setHasVoted] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [comments, setComments] = useState<Comment[]>(MOCK_COMMENTS);
  const [newComment, setNewComment] = useState('');

  const totalVotes = POLL_OPTIONS.reduce((sum, opt) => sum + opt.votes, 0);

  const handleVote = () => {
    if (!selectedOption) return;

    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      setHasVoted(true);
    }, 2000);
  };

  const handleAddComment = () => {
    if (!newComment.trim()) return;

    const comment: Comment = {
      id: Date.now(),
      username: 'Sen',
      avatar: 'https://i.pravatar.cc/150?img=68',
      text: newComment,
      timeAgo: 'Şimdi',
    };

    setComments([comment, ...comments]);
    setNewComment('');
  };

  const getPercentage = (votes: number) => {
    if (totalVotes === 0) return 0;
    return Math.round((votes / totalVotes) * 100);
  };

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
            <BarChart3 className="w-5 h-5 text-[#111827]" strokeWidth={2.5} />
            <span className="font-extrabold text-[#111827]">Günün Anketi</span>
          </button>
        </div>

        {/* Desktop 70/30 Layout Container */}
        <div className="max-w-[1200px] mx-auto pt-[60px] lg:pt-[84px] px-0 lg:px-6">
          <div className="flex gap-6">
            
            {/* LEFT COLUMN - Main Content (70%) */}
            <main className="w-full lg:w-[70%]">
          
          {!hasVoted ? (
            // Voting Phase
            <div className="px-5 py-6">
              
              {/* Hero Section */}
              <div className="mb-6 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-[#5852c4] to-[#7c3aed] mb-4 shadow-lg">
                  <BarChart3 className="w-8 h-8 text-white" strokeWidth={2.5} />
                </div>
                <h1 className="text-3xl font-black text-[#19142e] mb-2">Günün Sorusu</h1>
                <p className="text-gray-600 font-semibold">Sence hangisi daha iyi? Oyla, sonucu gör!</p>
              </div>

              {/* Question Card */}
              <div className="bg-white rounded-xl p-6 mb-6 shadow-sm border border-gray-100">
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-[#5852c4]/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-xl">❓</span>
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-black text-[#19142e] leading-tight">
                      {POLL_QUESTION}
                    </h2>
                  </div>
                </div>
                
                {/* Stats */}
                <div className="flex items-center gap-4 pt-3 border-t border-gray-100">
                  <div className="flex items-center gap-1.5 text-sm text-gray-500">
                    <TrendingUp className="w-4 h-4" strokeWidth={2.5} />
                    <span className="font-semibold">{totalVotes} oy</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-sm text-gray-500">
                    <MessageCircle className="w-4 h-4" strokeWidth={2.5} />
                    <span className="font-semibold">{comments.length} yorum</span>
                  </div>
                </div>
              </div>

              {/* Poll Options */}
              <div className="space-y-4 mb-6">
                {POLL_OPTIONS.map((option) => {
                  const isSelected = selectedOption === option.id;
                  return (
                    <motion.button
                      key={option.id}
                      onClick={() => setSelectedOption(option.id)}
                      className={`
                        w-full rounded-xl overflow-hidden transition-all shadow-md
                        ${isSelected 
                          ? 'ring-4 ring-[#5852c4] ring-opacity-50 shadow-lg' 
                          : 'hover:shadow-lg'
                        }
                      `}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="relative h-48">
                        {/* Image */}
                        <ImageWithFallback 
                          src={option.image}
                          alt={option.label}
                          className="w-full h-full object-cover"
                        />
                        
                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                        
                        {/* Content */}
                        <div className="absolute inset-0 p-5 flex flex-col justify-end">
                          <div className="flex items-end justify-between">
                            <div className="flex-1">
                              <h3 className="text-2xl font-black text-white mb-1">
                                {option.label}
                              </h3>
                              <p className="text-white/90 font-semibold text-sm">
                                {option.description}
                              </p>
                            </div>
                            
                            {/* Selection Indicator */}
                            {isSelected && (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="w-10 h-10 rounded-full bg-[#5852c4] flex items-center justify-center ml-3 shadow-lg"
                              >
                                <Check className="w-6 h-6 text-white" strokeWidth={3} />
                              </motion.div>
                            )}
                          </div>
                        </div>

                        {/* Option Label (Top-Left) */}
                        <div className="absolute top-4 left-4 w-8 h-8 rounded-lg bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30">
                          <span className="font-black text-white text-lg">{option.id.toUpperCase()}</span>
                        </div>
                      </div>
                    </motion.button>
                  );
                })}
              </div>

              {/* Vote Button */}
              <button
                onClick={handleVote}
                disabled={!selectedOption}
                className={`
                  w-full py-4 rounded-xl font-black text-lg transition-all shadow-lg
                  ${selectedOption 
                    ? 'bg-gradient-to-r from-[#5852c4] to-[#7c3aed] hover:from-[#6c5ce7] hover:to-[#8b5cf6] text-white shadow-[#5852c4]/30 active:scale-98' 
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }
                `}
              >
                {selectedOption ? '🗳️ Oyla (+5 Coin)' : 'Bir Seçenek Seç'}
              </button>
            </div>
          ) : (
            // Results Phase
            <div className="px-5 py-6">
              
              {/* Question Header */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-10 h-10 rounded-full bg-[#5852c4] flex items-center justify-center">
                    <BarChart3 className="w-5 h-5 text-white" strokeWidth={2.5} />
                  </div>
                  <h2 className="text-xl font-black text-[#19142e]">
                    {POLL_QUESTION}
                  </h2>
                </div>
                
                <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4">
                  <p className="text-green-800 font-bold text-center">
                    ✅ Fikrini belirttin! +5 Coin hesabına yüklendi.
                  </p>
                </div>
              </div>

              {/* Results */}
              <div className="space-y-4 mb-6">
                {POLL_OPTIONS.map((option) => {
                  const percentage = getPercentage(option.votes);
                  const isWinner = option.votes === Math.max(...POLL_OPTIONS.map(o => o.votes));
                  const userVoted = selectedOption === option.id;

                  return (
                    <div 
                      key={option.id}
                      className={`
                        relative bg-white rounded-xl overflow-hidden shadow-md border-2
                        ${isWinner ? 'border-[#F59E0B]' : 'border-gray-100'}
                      `}
                    >
                      {/* Winner Badge */}
                      {isWinner && (
                        <div className="absolute top-3 right-3 z-10 px-3 py-1 rounded-full bg-[#F59E0B] shadow-lg">
                          <span className="text-xs font-black text-white">🏆 ÖNE ÇIKAN</span>
                        </div>
                      )}

                      {/* User's Vote Badge */}
                      {userVoted && (
                        <div className="absolute top-3 left-3 z-10 px-3 py-1 rounded-full bg-[#5852c4] shadow-lg">
                          <span className="text-xs font-black text-white">✓ SENIN OYUN</span>
                        </div>
                      )}

                      <div className="flex items-center gap-4 p-4">
                        {/* Option Image */}
                        <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                          <ImageWithFallback 
                            src={option.image}
                            alt={option.label}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-2">
                            <div>
                              <h3 className="font-black text-[#19142e] text-lg">
                                {option.label}
                              </h3>
                              <p className="text-sm text-gray-500 font-semibold">
                                {option.description}
                              </p>
                            </div>
                            <div className="text-right ml-3">
                              <p className="text-2xl font-black text-[#5852c4]">
                                {percentage}%
                              </p>
                              <p className="text-xs text-gray-500 font-semibold">
                                {option.votes} oy
                              </p>
                            </div>
                          </div>

                          {/* Progress Bar */}
                          <div className="relative h-2 bg-gray-100 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${percentage}%` }}
                              transition={{ duration: 1, ease: 'easeOut' }}
                              className={`absolute inset-y-0 left-0 rounded-full ${
                                isWinner ? 'bg-[#F59E0B]' : 'bg-[#5852c4]'
                              }`}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Comments Section */}
              <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                <h3 className="font-black text-[#19142e] text-lg mb-4 flex items-center gap-2">
                  <MessageCircle className="w-5 h-5 text-[#5852c4]" strokeWidth={2.5} />
                  Yorumlar ({comments.length})
                </h3>

                {/* Comment Input */}
                <div className="mb-5">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder="Fikrini paylaş..."
                      className="flex-1 px-4 py-3 rounded-lg bg-[#f2f3f7] border-2 border-transparent focus:border-[#5852c4] focus:bg-white transition-all outline-none font-semibold"
                      onKeyPress={(e) => e.key === 'Enter' && handleAddComment()}
                    />
                    <button
                      onClick={handleAddComment}
                      disabled={!newComment.trim()}
                      className={`
                        px-4 py-3 rounded-lg transition-all
                        ${newComment.trim() 
                          ? 'bg-[#5852c4] hover:bg-[#6c5ce7] text-white' 
                          : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        }
                      `}
                    >
                      <Send className="w-5 h-5" strokeWidth={2.5} />
                    </button>
                  </div>
                </div>

                {/* Comments List */}
                <div className="space-y-4">
                  {comments.map((comment) => (
                    <div key={comment.id} className="flex gap-3">
                      <ImageWithFallback 
                        src={comment.avatar}
                        alt={comment.username}
                        className="w-10 h-10 rounded-full flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-bold text-[#19142e] text-sm">
                            {comment.username}
                          </span>
                          <span className="text-xs text-gray-400 font-semibold">
                            {comment.timeAgo}
                          </span>
                        </div>
                        <p className="text-sm text-gray-700 font-medium leading-relaxed">
                          {comment.text}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

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
                initial={{ scale: 0.5, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.5, opacity: 0, y: -20 }}
                transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                className="bg-white rounded-2xl p-8 mx-5 text-center shadow-2xl max-w-sm"
              >
                {/* Icon */}
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                  className="w-20 h-20 rounded-full bg-gradient-to-br from-[#5852c4] to-[#7c3aed] flex items-center justify-center mx-auto mb-4 shadow-lg"
                >
                  <Check className="w-10 h-10 text-white" strokeWidth={3} />
                </motion.div>

                {/* Message */}
                <h2 className="text-2xl font-black text-[#19142e] mb-2">
                  Oy Verildi! 🗳️
                </h2>
                <p className="text-gray-600 font-semibold mb-4">
                  Fikrini belirttin!
                </p>

                {/* Reward */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.4, type: 'spring', stiffness: 150 }}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#5852c4] to-[#7c3aed] shadow-lg"
                >
                  <span className="text-2xl">🪙</span>
                  <span className="text-white font-black text-xl">+5 Coin</span>
                </motion.div>

                {/* Animated Checkmarks */}
                <div className="flex justify-center gap-2 mt-4 text-2xl">
                  {[...Array(3)].map((_, i) => (
                    <motion.span
                      key={i}
                      animate={{ 
                        y: [0, -15, 0],
                        opacity: [1, 0.5, 1],
                      }}
                      transition={{ 
                        repeat: Infinity, 
                        duration: 1.5,
                        delay: i * 0.2 
                      }}
                    >
                      ✅
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
