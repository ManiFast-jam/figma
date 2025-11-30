import React from 'react';
import { Star, MapPin, Calendar, Coins, Camera, Swords, BarChart3 } from 'lucide-react';
import { motion } from 'motion/react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { useTheme } from '../../contexts/ThemeContext';

// SECTION WRAPPER Component
interface SectionWrapperProps {
  title: string;
  onViewAll?: () => void;
  children: React.ReactNode;
}

export const SectionWrapper = ({ title, onViewAll, children }: SectionWrapperProps) => {
  const { isDarkMode } = useTheme();
  
  return (
    <section>
      {/* TITLE ROW - Always with padding on mobile, no padding on desktop when authenticated (PageLayout has padding) */}
      <div className="mb-5 flex items-center justify-between px-5 lg:px-0">
        <h3 className={`text-2xl lg:text-[28px] font-bold transition-colors ${
          isDarkMode ? 'text-white' : 'text-[#19142e]'
        }`}>{title}</h3>
        {onViewAll && (
          <button 
            onClick={onViewAll}
            className={`text-sm font-bold transition-colors ${
              isDarkMode 
                ? 'text-[#5852c4] hover:text-white' 
                : 'text-[#5852c4] hover:text-[#19142e]'
            }`}
          >
            Tümü
          </button>
        )}
      </div>
      
      {/* CAROUSEL - Always with padding on mobile, no padding on desktop when authenticated (PageLayout has padding) */}
      <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide snap-x snap-mandatory lg:snap-none px-5 lg:px-0">
        {children}
      </div>
    </section>
  );
};

// ANNOUNCEMENT CARD Component
interface AnnouncementCardProps {
  announcement: {
    id: number;
    title: string;
    subtitle: string;
    image: string;
    category?: string;
  };
  onClick: () => void;
}

export const AnnouncementCard = ({ announcement, onClick }: AnnouncementCardProps) => {
  return (
    <div 
      onClick={onClick}
      className="snap-center flex-shrink-0 w-[320px] lg:w-[450px] group cursor-pointer"
    >
      <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden shadow-[0_8px_24px_rgba(25,20,46,0.12)] hover:shadow-[0_12px_40px_rgba(25,20,46,0.16)] transition-shadow">
        <ImageWithFallback 
          src={announcement.image} 
          alt={announcement.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        
        {/* Category Badge - Top Left */}
        {announcement.category && (
          <div className="absolute top-3 left-3 z-10">
            <span className="px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-sm text-[#19142e] text-xs font-bold shadow-md">
              {announcement.category}
            </span>
          </div>
        )}
        
        {/* Text Overlay - Bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
          <h4 className="font-bold text-white mb-1 leading-tight">{announcement.title}</h4>
          <p className="text-white/80 text-sm">{announcement.subtitle}</p>
        </div>
      </div>
    </div>
  );
};

// PLACE CARD Component
interface PlaceCardProps {
  place: {
    id: number;
    name: string;
    category: string;
    rating: number;
    distance: string;
    image: string;
  };
  onClick: () => void;
}

export const PlaceCard = ({ place, onClick }: PlaceCardProps) => {
  return (
    <div 
      onClick={onClick}
      className="snap-center flex-shrink-0 w-[65vw] lg:w-[calc(50%-8px)] group cursor-pointer"
    >
      <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden shadow-[0_8px_24px_rgba(25,20,46,0.12)]">
        <ImageWithFallback 
          src={place.image}
          alt={place.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        
        {/* Rating Badge - Top Left */}
        <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-1 shadow-md">
          <Star className="w-3 h-3 text-[#5852c4] fill-current" />
          <span className="text-sm font-bold text-[#19142e]">{place.rating}</span>
        </div>
        
        {/* Content - Bottom Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
          <h4 className="font-bold text-white mb-1 leading-tight">{place.name}</h4>
          <div className="flex items-center justify-between text-white/90 text-sm">
            <span>{place.category}</span>
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              {place.distance}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

// EVENT CARD Component
interface EventCardProps {
  event: {
    id: number;
    title: string;
    location: string;
    day: string;
    month: string;
    image: string;
  };
  onClick: () => void;
}

export const EventCard = ({ event, onClick }: EventCardProps) => {
  return (
    <div 
      onClick={onClick}
      className="snap-center flex-shrink-0 w-[65vw] lg:w-[calc(50%-8px)] group cursor-pointer"
    >
      <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden shadow-[0_8px_24px_rgba(25,20,46,0.12)]">
        <ImageWithFallback 
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        
        {/* Date Badge */}
        <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-md">
          <div className="flex items-center gap-1.5">
            <div className="text-sm font-black text-[#5852c4] leading-none">{event.day}</div>
            <div className="text-xs font-bold text-[#19142e] uppercase leading-none">{event.month}</div>
          </div>
        </div>
        
        {/* Content - Bottom Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
          <h4 className="font-bold text-white mb-2 leading-tight">{event.title}</h4>
          <div className="flex items-center gap-1.5 text-white/90 text-sm">
            <MapPin className="w-4 h-4" />
            <span>{event.location}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// GAME CARD Component
interface GameCardProps {
  card: {
    id: number;
    title: string;
    subtitle: string;
    icon: React.ComponentType<any>;
    reward: string;
    bgColor: string;
    isLive?: boolean;
  };
  onClick: () => void;
}

export const GameCard = ({ card, onClick }: GameCardProps) => {
  const { isDarkMode } = useTheme();
  const IconComponent = card.icon;
  
  return (
    <div 
      onClick={onClick}
      className="snap-center flex-shrink-0 w-[200px] group cursor-pointer"
    >
      <div className={`relative w-full aspect-square rounded-xl shadow-[0_8px_24px_rgba(25,20,46,0.12)] hover:shadow-[0_12px_32px_rgba(25,20,46,0.16)] transition-all overflow-hidden ${
        card.bgColor === 'violet-gradient' 
          ? 'violet-gradient' 
          : isDarkMode 
            ? 'bg-[#1a1a2e]' 
            : card.bgColor
      }`}>
        {/* Live Badge for Kampüs Muhabiri */}
        {card.isLive && (
          <div className="absolute top-3 right-3 z-10">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-500 shadow-lg">
              <motion.div
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="w-2 h-2 rounded-full bg-white"
              />
              <span className="text-xs font-black text-white">CANLI</span>
            </div>
          </div>
        )}
        
        <div className="p-5 h-full flex flex-col justify-between">
          <div className="flex items-start justify-between mb-3">
            <div className={`p-3 ${card.bgColor === 'violet-gradient' ? 'bg-white/20' : isDarkMode ? 'bg-slate-800' : 'bg-[#5852c4]'} rounded-xl shadow-sm`}>
              <IconComponent className="w-6 h-6 text-white" strokeWidth={2.5} />
            </div>
          </div>
          
          <div>
            <h4 className={`font-extrabold mb-1 ${
              card.bgColor === 'violet-gradient' 
                ? 'text-white' 
                : isDarkMode 
                  ? 'text-white' 
                  : 'text-[#19142e]'
            }`}>{card.title}</h4>
            <p className={`text-sm mb-3 ${
              card.bgColor === 'violet-gradient' 
                ? 'text-white/80' 
                : isDarkMode 
                  ? 'text-slate-400' 
                  : 'text-[#8279a5]'
            }`}>{card.subtitle}</p>
            <div className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full ${
              card.bgColor === 'violet-gradient' 
                ? 'bg-white/20' 
                : isDarkMode 
                  ? 'bg-[#5852c4]/30' 
                  : 'bg-[#5852c4]'
            }`}>
              <Coins className="w-3 h-3 text-white" />
              <span className="text-xs font-extrabold text-white">{card.reward}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
