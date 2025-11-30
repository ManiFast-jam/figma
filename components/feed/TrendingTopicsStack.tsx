import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TrendingUp, MessageCircle } from 'lucide-react';

interface TrendingTopic {
  id: number;
  rank: number;
  title: string;
  posts: string;
  color: string;
}

const TRENDING_TOPICS: TrendingTopic[] = [
  { id: 1, rank: 1, title: 'VizeHaftası', posts: '1.2k', color: '#5852c4' },
  { id: 2, rank: 2, title: 'KampüsEtkinlikleri', posts: '850', color: '#7c3aed' },
  { id: 3, rank: 3, title: 'YemekZamı', posts: '720', color: '#a855f7' },
  { id: 4, rank: 4, title: 'FinalTarihleri', posts: '640', color: '#c084fc' },
  { id: 5, rank: 5, title: 'KütüphaneSaatleri', posts: '520', color: '#d946ef' },
];

export const TrendingTopicsStack = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Auto-slide every 3 seconds
  useEffect(() => {
    if (isHovered) return; // Pause on hover
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % TRENDING_TOPICS.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [isHovered]);

  // Get visible cards (current, next, and next+1)
  const getVisibleCards = () => {
    const cards = [];
    for (let i = 0; i < 3; i++) {
      const index = (currentIndex + i) % TRENDING_TOPICS.length;
      cards.push(TRENDING_TOPICS[index]);
    }
    return cards;
  };

  const visibleCards = getVisibleCards();

  return (
    <div className="mb-4 px-4">
      {/* Header - Clean & Aligned (NO Emojis) */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-2xl font-bold text-[#19142e]">Gündem</h3>
        <button className="text-sm font-semibold text-[#5852c4] hover:text-[#19142e] transition-colors">
          Tümü
        </button>
      </div>

      {/* 3D Stacked Cards Container - Left-Perspective Depth (Compact) */}
      <div 
        className="relative h-[140px] w-full"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <AnimatePresence mode="popLayout">
          {visibleCards.map((topic, index) => {
            const isActive = index === 0;
            const isMiddle = index === 1;
            const isBack = index === 2;

            return (
              <motion.div
                key={`${topic.id}-${currentIndex}`}
                className={`absolute w-full cursor-pointer ${
                  isActive ? 'z-30' : isMiddle ? 'z-20' : 'z-10'
                }`}
                initial={
                  isBack
                    ? { scale: 0.9, y: 24, opacity: 0.6, rotateX: 4 }
                    : { scale: 0.95, y: 12, opacity: 0.8, rotateX: 2 }
                }
                animate={{
                  scale: isActive ? 1 : isMiddle ? 0.98 : 0.96,
                  y: isActive ? 0 : isMiddle ? 10 : 20,
                  opacity: isActive ? 1 : isMiddle ? 0.9 : 0.8,
                  rotateX: isActive ? 0 : isMiddle ? 1 : 2,
                  x: isActive && !isHovered ? [0, 2, 0] : 0, // Subtle wiggle hint
                }}
                exit={{
                  x: 400,
                  opacity: 0,
                  rotate: 8,
                  scale: 0.85,
                  transition: { duration: 0.4, ease: 'easeInOut' },
                }}
                transition={{
                  duration: 0.5,
                  ease: [0.34, 1.56, 0.64, 1], // Bouncy easing
                  x: { repeat: isActive && !isHovered ? Infinity : 0, duration: 2 },
                }}
                whileHover={
                  isActive
                    ? {
                        scale: 1.015,
                        y: -6,
                        rotateX: -1,
                        transition: { duration: 0.2 },
                      }
                    : {}
                }
                style={{
                  transformPerspective: 1200,
                  transformStyle: 'preserve-3d',
                }}
              >
                {/* Card Content - Left-Perspective & Lightness Gradient */}
                <div
                  className={`relative w-full h-[120px] rounded-lg overflow-hidden transition-all duration-300 ${
                    isActive
                      ? 'bg-white shadow-[-4px_4px_16px_rgba(88,82,196,0.15)] border-l border-l-[rgba(88,82,196,0.1)]'
                      : isMiddle
                      ? 'bg-[#F3F3FF] shadow-[-3px_3px_12px_rgba(88,82,196,0.10)]'
                      : 'bg-[#FAFAFF] shadow-[-2px_2px_8px_rgba(88,82,196,0.06)]'
                  }`}
                >
                  {/* Thin Vibrant Violet Top Border Strip (3px) - Active Only */}
                  {isActive && (
                    <div
                      className="absolute top-0 left-0 right-0 h-[3px]"
                      style={{ background: '#5852c4' }}
                    />
                  )}

                  {/* Content - Compact Layout */}
                  <div className="p-5 h-full flex flex-col justify-between">
                    {/* Motion Hint Icon (Top Right) - Only on Active */}
                    {isActive && !isHovered && (
                      <motion.div
                        animate={{ x: [0, 6, 0], opacity: [0.5, 0.8, 0.5] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                        className="absolute top-4 right-4 text-[#8279a5]"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2.5}
                            d="M13 7l5 5m0 0l-5 5m5-5H6"
                          />
                        </svg>
                      </motion.div>
                    )}

                    {/* Inline Layout: [Badge] [Title] */}
                    <div className="flex items-center gap-2.5">
                      <div
                        className="flex-shrink-0 px-2.5 py-1 rounded-full font-black text-white text-xs shadow-md"
                        style={{ background: '#5852c4' }}
                      >
                        #{topic.rank}
                      </div>
                      <h4
                        className="text-xl font-black text-[#19142e] leading-tight"
                        style={{
                          textShadow: isActive
                            ? '0 2px 4px rgba(25,20,46,0.08)'
                            : 'none',
                        }}
                      >
                        #{topic.title}
                      </h4>
                    </div>

                    {/* Bottom Row: Stats */}
                    <div className="flex items-center gap-1.5 text-[#8279a5]">
                      <MessageCircle className="w-4 h-4" strokeWidth={2.5} />
                      <span className="text-sm font-bold">{topic.posts} gönderi</span>
                    </div>
                  </div>

                  {/* Subtle Inner Glow (Active Only) */}
                  {isActive && (
                    <div className="absolute inset-0 shadow-[inset_0_1px_0_rgba(255,255,255,0.3)] pointer-events-none" />
                  )}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
};
