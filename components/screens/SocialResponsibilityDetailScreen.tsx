import React, { useState } from 'react';
import { Clock, Calendar, MapPin, Share2, Bookmark, Coins } from 'lucide-react';
import { motion } from 'motion/react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { WalletModal } from '../wallet/WalletModal';
import { GlobalHeader } from '../layout/GlobalHeader';
import { PageLayout } from '../layout/PageLayout';

interface SocialResponsibilityDetailScreenProps {
  project: {
    id: number;
    title: string;
    location: string;
    day: string;
    month: string;
    points: number;
    image: string;
    date?: string;
    time?: string;
    description?: string;
    content: string;
  };
  onBack: () => void;
  activeTab?: string;
  onTabChange?: (tab: string) => void;
  onGameCenterClick?: () => void;
}

export const SocialResponsibilityDetailScreen = ({ 
  project, 
  onBack,
  activeTab = 'home',
  onTabChange,
  onGameCenterClick,
}: SocialResponsibilityDetailScreenProps) => {
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: project.title,
        text: project.description || project.title,
        url: window.location.href,
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#f2f3f7] pb-28 lg:pb-6">
      
      {/* Global Header */}
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

      <div className="pt-[60px] lg:pt-[84px]">
        <PageLayout
          onTabChange={onTabChange}
          onWalletOpen={() => setIsWalletModalOpen(true)}
          onGameCenterClick={onGameCenterClick}
        >
          {/* Main Content Container */}
          <div className="px-5 lg:px-0 mt-4">
          
          {/* Hero Image */}
          <div className="relative w-full aspect-[16/9] rounded-[12px] overflow-hidden shadow-[0_8px_32px_rgba(25,20,46,0.12)] mb-6">
            <ImageWithFallback 
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
            />
            
            {/* Points Badge */}
            <div className="absolute top-4 left-4">
              <div className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#5852c4] text-white shadow-lg">
                <Coins className="w-4 h-4" strokeWidth={2.5} />
                <span className="text-sm font-bold">{project.points} Puan</span>
              </div>
            </div>

            {/* Date Badge */}
            <div className="absolute top-4 right-4">
              <div className="px-4 py-2 rounded-full bg-white/95 backdrop-blur-sm shadow-lg">
                <div className="flex items-center gap-1.5">
                  <div className="text-sm font-black text-[#5852c4] leading-none">{project.day}</div>
                  <div className="text-xs font-bold text-[#19142e] uppercase leading-none">{project.month}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Article Card */}
          <article className="bg-white rounded-[12px] shadow-[0_4px_24px_rgba(25,20,46,0.08)] p-6 lg:p-8">
            
            {/* Title */}
            <h1 className="text-3xl lg:text-4xl font-bold text-[#19142e] mb-4 leading-tight">
              {project.title}
            </h1>

            {/* Description */}
            {project.description && (
              <p className="text-lg text-[#8279a5] mb-6 leading-relaxed">
                {project.description}
              </p>
            )}

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-4 mb-6 text-sm text-[#8279a5]">
              {project.date && (
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" strokeWidth={2} />
                  <span>{project.date}</span>
                </div>
              )}
              {project.time && (
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4" strokeWidth={2} />
                  <span>{project.time}</span>
                </div>
              )}
              {project.location && (
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4" strokeWidth={2} />
                  <span>{project.location}</span>
                </div>
              )}
              <div className="flex items-center gap-1.5">
                <Coins className="w-4 h-4 text-[#5852c4]" strokeWidth={2} />
                <span className="font-bold text-[#5852c4]">{project.points} Puan</span>
              </div>
            </div>

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
              {project.content ? (
                <div 
                  className="text-[#19142e] leading-relaxed space-y-4"
                  style={{ 
                    fontSize: '1.0625rem',
                    lineHeight: '1.75'
                  }}
                >
                  {project.content.split('\n\n').filter(p => p.trim()).map((paragraph, index) => {
                    if (paragraph.trim().startsWith('**') && paragraph.trim().endsWith('**')) {
                      return (
                        <h3 key={index} className="font-bold text-xl text-[#19142e] mt-6 mb-3">
                          {paragraph.trim().slice(2, -2)}
                        </h3>
                      );
                    }
                    
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
              ) : (
                <p className="text-[#8279a5] italic">İçerik bulunamadı.</p>
              )}
            </div>

            {/* Call to Action */}
            <div className="mt-8 pt-6 border-t border-slate-100">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full lg:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-[10px] bg-[#5852c4] text-white font-bold shadow-lg shadow-[#5852c4]/20 hover:bg-[#6c5ce7] transition-all"
              >
                <span>Katıl</span>
                <Coins className="w-4 h-4" strokeWidth={2.5} />
              </motion.button>
            </div>

          </article>

          {/* Bottom Spacing */}
          <div className="h-8"></div>

          </div>
        </PageLayout>
      </div>

      <WalletModal 
        isOpen={isWalletModalOpen} 
        onClose={() => setIsWalletModalOpen(false)} 
      />
    </div>
  );
};

