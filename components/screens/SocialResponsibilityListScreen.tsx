import React from 'react';
import { GlobalHeader } from '../layout/GlobalHeader';
import { PageLayout } from '../layout/PageLayout';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { useTheme } from '../../contexts/ThemeContext';
import { SOCIAL_RESPONSIBILITY_PROJECTS } from '../../data/mockSocialResponsibility';
import { MapPin, Coins } from 'lucide-react';

interface SocialResponsibilityListScreenProps {
  onBack: () => void;
  activeTab?: string;
  onTabChange?: (tab: string) => void;
  onGameCenterClick?: () => void;
  onProjectClick?: (project: any) => void;
}

export const SocialResponsibilityListScreen = ({
  onBack,
  activeTab = 'discover',
  onTabChange,
  onGameCenterClick,
  onProjectClick,
}: SocialResponsibilityListScreenProps) => {
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
                Tüm Sosyal Sorumluluk Projeleri
              </h1>
              <p className={`text-sm mt-2 transition-colors ${
                isDarkMode ? 'text-slate-400' : 'text-[#8279a5]'
              }`}>
                {SOCIAL_RESPONSIBILITY_PROJECTS.length} proje bulundu
              </p>
            </div>

            {/* Grid Layout - Responsive */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
              {SOCIAL_RESPONSIBILITY_PROJECTS.map((project) => (
                <div
                  key={project.id}
                  onClick={() => onProjectClick?.(project)}
                  className="group cursor-pointer"
                >
                  <div className={`relative w-full aspect-[16/9] rounded-xl overflow-hidden shadow-[0_8px_24px_rgba(25,20,46,0.12)] hover:shadow-[0_12px_40px_rgba(25,20,46,0.16)] transition-shadow ${
                    isDarkMode ? 'bg-[#1a1a2e]' : 'bg-white'
                  }`}>
                    <ImageWithFallback 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    
                    {/* Dark Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                    
                    {/* Points Badge - Top Left */}
                    <div className="absolute top-3 left-3 z-10">
                      <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#5852c4] text-white shadow-md">
                        <Coins className="w-3.5 h-3.5" strokeWidth={2.5} />
                        <span className="text-xs font-bold">{project.points}</span>
                      </div>
                    </div>

                    {/* Date Badge - Top Right */}
                    <div className="absolute top-3 right-3 z-10">
                      <div className="px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-sm shadow-md">
                        <div className="flex items-center gap-1.5">
                          <div className="text-xs font-black text-[#5852c4] leading-none">{project.day}</div>
                          <div className="text-[10px] font-bold text-[#19142e] uppercase leading-none">{project.month}</div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Text Overlay - Bottom */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
                      <h4 className="font-bold text-white mb-1 leading-tight">{project.title}</h4>
                      <div className="flex items-center gap-2 text-white/80 text-sm">
                        <MapPin className="w-3.5 h-3.5" strokeWidth={2.5} />
                        <span>{project.location}</span>
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

