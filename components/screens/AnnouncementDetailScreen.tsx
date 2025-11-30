import React, { useState } from 'react';
import { ArrowLeft, Clock, Calendar, Share2, Bookmark, ExternalLink } from 'lucide-react';
import { motion } from 'motion/react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { WalletModal } from '../wallet/WalletModal';
import { GlobalHeader } from '../layout/GlobalHeader';

interface AnnouncementDetailScreenProps {
  announcement: {
    id: number;
    title: string;
    image: string;
    date?: string;
    time?: string;
    content: string;
    category?: string;
  };
  onBack: () => void;
  activeTab?: string;
  onTabChange?: (tab: string) => void;
  onGameCenterClick?: () => void;
}

export const AnnouncementDetailScreen = ({ 
  announcement, 
  onBack,
  activeTab = 'home',
  onTabChange,
  onGameCenterClick,
}: AnnouncementDetailScreenProps) => {
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: announcement.title,
        text: announcement.title,
        url: window.location.href,
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#f2f3f7] pb-28 lg:pb-6">
      
      {/* Desktop: Global Header */}
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

      {/* Mobile: Simple Back Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-white border-b border-gray-200">
        <button 
          onClick={onBack}
          className="flex items-center gap-3 px-5 py-3 hover:bg-gray-50 transition-colors w-full"
        >
          <ArrowLeft className="w-5 h-5 text-[#111827]" strokeWidth={2.5} />
          <span className="font-extrabold text-[#111827]">Duyuru</span>
        </button>
      </div>

      <div className="pt-[60px] lg:pt-[84px]">

        {/* Main Content Container */}
        <div className="max-w-[800px] mx-auto px-5 mt-4">
          
          {/* Hero Image */}
          <div className="relative w-full aspect-[16/9] rounded-[12px] overflow-hidden shadow-[0_8px_32px_rgba(25,20,46,0.12)] mb-6">
            <ImageWithFallback 
              src={announcement.image}
              alt={announcement.title}
              className="w-full h-full object-cover"
            />
            
            {/* Category Badge (if exists) */}
            {announcement.category && (
              <div className="absolute top-4 left-4">
                <span className="px-4 py-2 rounded-full bg-[#5852c4] text-white text-xs font-bold shadow-lg">
                  {announcement.category}
                </span>
              </div>
            )}
          </div>

          {/* Article Card */}
          <article className="bg-white rounded-[12px] shadow-[0_4px_24px_rgba(25,20,46,0.08)] p-6 lg:p-8">
            
            {/* Meta Info */}
            <div className="flex items-center gap-4 mb-4 text-sm text-[#8279a5]">
              {announcement.date && (
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" strokeWidth={2} />
                  <span>{announcement.date}</span>
                </div>
              )}
              {announcement.time && (
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4" strokeWidth={2} />
                  <span>{announcement.time}</span>
                </div>
              )}
            </div>

            {/* Title */}
            <h1 className="text-3xl lg:text-4xl font-bold text-[#19142e] mb-6 leading-tight">
              {announcement.title}
            </h1>

            {/* Action Buttons */}
            <div className="flex items-center gap-3 pb-6 mb-6 border-b border-slate-100">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsBookmarked(!isBookmarked)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-[10px] font-bold text-sm transition-all ${
                  isBookmarked 
                    ? 'bg-[#5852c4] text-white' 
                    : 'bg-slate-50 text-[#8279a5] hover:bg-slate-100'
                }`}
              >
                <Bookmark className="w-4 h-4" strokeWidth={2.5} fill={isBookmarked ? 'currentColor' : 'none'} />
                <span>{isBookmarked ? 'Kaydedildi' : 'Kaydet'}</span>
              </motion.button>

              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={handleShare}
                className="flex items-center gap-2 px-4 py-2.5 rounded-[10px] bg-slate-50 text-[#8279a5] hover:bg-slate-100 font-bold text-sm transition-all"
              >
                <Share2 className="w-4 h-4" strokeWidth={2.5} />
                <span>Paylaş</span>
              </motion.button>
            </div>

            {/* Content */}
            <div className="prose prose-slate max-w-none">
              <div 
                className="text-[#19142e] leading-relaxed space-y-4"
                style={{ 
                  fontSize: '1.0625rem',
                  lineHeight: '1.75'
                }}
              >
                {(announcement.content || '').split('\n\n').map((paragraph, index) => {
                  // Handle bold text with ** markdown
                  if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                    return (
                      <h3 key={index} className="font-bold text-xl text-[#19142e] mt-6 mb-3">
                        {paragraph.slice(2, -2)}
                      </h3>
                    );
                  }
                  
                  // Regular paragraph
                  return (
                    <p key={index} className="mb-4 text-[#19142e]/90">
                      {paragraph.split(/(\*\*.*?\*\*)/).map((part, i) => {
                        if (part.startsWith('**') && part.endsWith('**')) {
                          return <strong key={i} className="font-bold text-[#19142e]">{part.slice(2, -2)}</strong>;
                        }
                        return part;
                      })}
                    </p>
                  );
                })}
              </div>
            </div>

            {/* Call to Action (Optional) */}
            <div className="mt-8 pt-6 border-t border-slate-100">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full lg:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-[10px] bg-[#5852c4] text-white font-bold shadow-lg shadow-[#5852c4]/20 hover:bg-[#6c5ce7] transition-all"
              >
                <span>Başvuru Yap</span>
                <ExternalLink className="w-4 h-4" strokeWidth={2.5} />
              </motion.button>
            </div>

          </article>

          {/* Bottom Spacing */}
          <div className="h-8"></div>

        </div>
      </div>

      <WalletModal 
        isOpen={isWalletModalOpen} 
        onClose={() => setIsWalletModalOpen(false)} 
      />
    </div>
  );
};
