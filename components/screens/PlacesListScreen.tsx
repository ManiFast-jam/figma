import React from 'react';
import { GlobalHeader } from '../layout/GlobalHeader';
import { PageLayout } from '../layout/PageLayout';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { useTheme } from '../../contexts/ThemeContext';
import { POPULAR_PLACES } from '../../data/mockPlaces';
import { Star, MapPin } from 'lucide-react';

interface PlacesListScreenProps {
  onBack: () => void;
  activeTab?: string;
  onTabChange?: (tab: string) => void;
  onGameCenterClick?: () => void;
  onPlaceClick?: (place: any) => void;
}

export const PlacesListScreen = ({
  onBack,
  activeTab = 'discover',
  onTabChange,
  onGameCenterClick,
  onPlaceClick,
}: PlacesListScreenProps) => {
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
                Tüm Popüler Mekanlar
              </h1>
              <p className={`text-sm mt-2 transition-colors ${
                isDarkMode ? 'text-slate-400' : 'text-[#8279a5]'
              }`}>
                {POPULAR_PLACES.length} mekan bulundu
              </p>
            </div>

            {/* Grid Layout - Responsive */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
              {POPULAR_PLACES.map((place) => (
                <div
                  key={place.id}
                  onClick={() => onPlaceClick?.(place)}
                  className="group cursor-pointer"
                >
                  <div className={`relative w-full aspect-[16/9] rounded-xl overflow-hidden shadow-[0_8px_24px_rgba(25,20,46,0.12)] hover:shadow-[0_12px_40px_rgba(25,20,46,0.16)] transition-shadow ${
                    isDarkMode ? 'bg-[#1a1a2e]' : 'bg-white'
                  }`}>
                    <ImageWithFallback 
                      src={place.image} 
                      alt={place.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    
                    {/* Dark Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                    
                    {/* Rating Badge - Top Left */}
                    <div className="absolute top-3 left-3 z-10">
                      <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-sm shadow-md">
                        <Star className="w-3.5 h-3.5 fill-[#5852c4] text-[#5852c4]" strokeWidth={2.5} />
                        <span className="text-xs font-bold text-[#19142e]">{place.rating}</span>
                      </div>
                    </div>

                    {/* Category Badge - Top Right */}
                    <div className="absolute top-3 right-3 z-10">
                      <span className="px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-sm text-[#19142e] text-xs font-bold shadow-md">
                        {place.category}
                      </span>
                    </div>
                    
                    {/* Text Overlay - Bottom */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
                      <h4 className="font-bold text-white mb-1 leading-tight">{place.name}</h4>
                      <div className="flex items-center gap-2 text-white/80 text-sm">
                        <MapPin className="w-3.5 h-3.5" strokeWidth={2.5} />
                        <span>{place.distance}</span>
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

