import React from 'react';
import { GlobalHeader } from '../layout/GlobalHeader';
import { PageLayout } from '../layout/PageLayout';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { useTheme } from '../../contexts/ThemeContext';
import { EVENTS } from '../../data/mockEvents';
import { MapPin } from 'lucide-react';

interface EventsListScreenProps {
  onBack: () => void;
  activeTab?: string;
  onTabChange?: (tab: string) => void;
  onGameCenterClick?: () => void;
  onEventClick?: (event: any) => void;
}

export const EventsListScreen = ({
  onBack,
  activeTab = 'discover',
  onTabChange,
  onGameCenterClick,
  onEventClick,
}: EventsListScreenProps) => {
  const { isDarkMode } = useTheme();

  return (
    <div className={`min-h-screen pb-32 lg:pb-6 transition-colors ${
      isDarkMode ? 'bg-[#0f0e17]' : 'bg-[#f2f3f7]'
    }`}>
      
      {/* Rich Global Header */}
      <GlobalHeader 
        type="rich"
        onWalletClick={() => {}}
        coinBalance="2.450"
        onSearchClick={() => console.log('🔍 Search clicked')}
        onFilterClick={() => console.log('🎯 Filter clicked')}
        activeTab={activeTab}
        onTabChange={onTabChange}
        onGameCenterClick={onGameCenterClick}
        onBackClick={onBack}
      />

      {/* Main Content */}
      <div className="pt-[60px] lg:pt-[84px]">
        <PageLayout
          onTabChange={onTabChange}
          onWalletOpen={() => {}}
          onGameCenterClick={onGameCenterClick}
        >
          <div className="px-5 lg:px-0">
            {/* Page Title */}
            <div className="mb-6">
              <h1 className={`text-3xl lg:text-4xl font-bold transition-colors ${
                isDarkMode ? 'text-white' : 'text-[#19142e]'
              }`}>
                Tüm Yaklaşan Etkinlikler
              </h1>
              <p className={`text-sm mt-2 transition-colors ${
                isDarkMode ? 'text-slate-400' : 'text-[#8279a5]'
              }`}>
                {EVENTS.length} etkinlik bulundu
              </p>
            </div>

            {/* Grid Layout - Responsive */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
              {EVENTS.map((event) => (
                <div
                  key={event.id}
                  onClick={() => onEventClick?.(event)}
                  className="group cursor-pointer"
                >
                  <div className={`relative w-full aspect-[16/9] rounded-xl overflow-hidden shadow-[0_8px_24px_rgba(25,20,46,0.12)] hover:shadow-[0_12px_40px_rgba(25,20,46,0.16)] transition-shadow ${
                    isDarkMode ? 'bg-[#1a1a2e]' : 'bg-white'
                  }`}>
                    <ImageWithFallback 
                      src={event.image} 
                      alt={event.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    
                    {/* Dark Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                    
                    {/* Date Badge - Top Left */}
                    <div className="absolute top-3 left-3 z-10">
                      <div className="px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-sm shadow-md">
                        <div className="flex items-center gap-1.5">
                          <div className="text-xs font-black text-[#5852c4] leading-none">{event.day}</div>
                          <div className="text-[10px] font-bold text-[#19142e] uppercase leading-none">{event.month}</div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Text Overlay - Bottom */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
                      <h4 className="font-bold text-white mb-1 leading-tight">{event.title}</h4>
                      <div className="flex items-center gap-2 text-white/80 text-sm">
                        <MapPin className="w-3.5 h-3.5" strokeWidth={2.5} />
                        <span>{event.location}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </PageLayout>
      </div>
    </div>
  );
};

