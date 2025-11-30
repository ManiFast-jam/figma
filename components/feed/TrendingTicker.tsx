import React, { useState } from 'react';

interface TrendTag {
  id: number;
  tag: string;
}

const TREND_TAGS: TrendTag[] = [
  { id: 1, tag: '#VizeHaftası' },
  { id: 2, tag: '#FinalTarihleri' },
  { id: 3, tag: '#YemekhaneZammı' },
  { id: 4, tag: '#KampüsMetro' },
  { id: 5, tag: '#BaharŞenliği' },
  { id: 6, tag: '#KütüphaneSaatleri' },
  { id: 7, tag: '#KampüsEtkinlikleri' },
  { id: 8, tag: '#YemekMenüsü' },
  { id: 9, tag: '#SınıfNotları' },
  { id: 10, tag: '#KiralıkEv' },
];

export const TrendingTicker = () => {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const handleTagClick = (tagName: string) => {
    // TODO: Integrate with search functionality
    // setSearchQuery(tagName);
    // router.push(`/search?q=${tagName.replace('#', '')}`);
    console.log(`🔍 Clicked trend: ${tagName}`);
    
    // Smooth scroll to top (where header/search is)
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Duplicate tags for infinite loop effect
  const duplicatedTags = [...TREND_TAGS, ...TREND_TAGS, ...TREND_TAGS];

  return (
    <div className="relative w-full bg-[#F9FAFB] border-b border-gray-200 overflow-hidden">
      {/* Gradient Fades on edges */}
      <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#F9FAFB] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#F9FAFB] to-transparent z-10 pointer-events-none" />

      {/* Scrolling Container */}
      <div className="relative py-3 overflow-hidden">
        <div className="flex gap-3 animate-scroll-left hover:pause-animation">
          {duplicatedTags.map((item, index) => {
            const isHovered = hoveredId === item.id;
            return (
              <button
                key={`${item.id}-${index}`}
                onClick={() => handleTagClick(item.tag)}
                onMouseEnter={() => setHoveredId(item.id)}
                onMouseLeave={() => setHoveredId(null)}
                className={`
                  flex-shrink-0 px-4 py-2 rounded-[10px] font-bold text-sm
                  transition-all duration-200 cursor-pointer
                  whitespace-nowrap
                  ${isHovered 
                    ? 'bg-[#5852c4] text-white scale-105 shadow-lg shadow-[#5852c4]/30' 
                    : 'bg-[#ededff] text-[#5852c4] hover:bg-[#5852c4] hover:text-white'
                  }
                `}
              >
                {item.tag}
              </button>
            );
          })}
        </div>
      </div>

      {/* CSS Animation */}
      <style jsx>{`
        @keyframes scroll-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }

        .animate-scroll-left {
          animation: scroll-left 30s linear infinite;
          display: flex;
          width: max-content;
        }

        .animate-scroll-left:hover {
          animation-play-state: paused;
        }

        .pause-animation {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};
