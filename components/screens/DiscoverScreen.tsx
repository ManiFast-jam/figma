import React, { useState } from 'react';
import { Search, Star, MapPin, Calendar, ArrowRight, Filter, Swords, BarChart3, Coins, Camera } from 'lucide-react';
import { motion } from 'motion/react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { WalletModal } from '../wallet/WalletModal';
import { GlobalHeader } from '../layout/GlobalHeader';
import { PageLayout } from '../layout/PageLayout';
import { SearchOverlay } from '../search/SearchOverlay';
import { useTheme } from '../../contexts/ThemeContext';
import { SectionWrapper, AnnouncementCard, PlaceCard, EventCard, GameCard } from './DiscoverScreenSections';
const konyaLibraryImg = '/images/c91a95a69feb350643602a59bdd8143dcd2e26c5.png';

const ANNOUNCEMENTS = [
  {
    id: 1,
    title: 'KBB Burs Başvuruları Başladı',
    subtitle: 'Son başvuru 30 Ekim. Detaylar için tıkla.',
    image: 'https://images.unsplash.com/photo-1659080925666-16001612bc3e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzY2hvbGFyc2hpcCUyMGF3YXJkJTIwbW9uZXklMjBzdHVkZW50c3xlbnwxfHx8fDE3NjQ0MjUyMzh8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Burs & Fırsat',
  },
  {
    id: 2,
    title: 'Kampüs Festivali',
    subtitle: 'Bahar şenlikleri takvimi açıklandı! Hazır mısın?',
    image: 'https://images.unsplash.com/photo-1724390265310-a4814e561d38?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwY2FtcHVzJTIwZmVzdGl2YWwlMjBjb25jZXJ0fGVufDF8fHx8MTc2NDIwNDg1MXww&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Etkinlik',
  },
  {
    id: 3,
    title: 'Ücretsiz İngilizce Kursu',
    subtitle: 'Yeni dönem kayıtları başladı!',
    image: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYW5ndWFnZSUyMGxlYXJuaW5nJTIwY2xhc3Nyb29tJTIwZW5nbGlzaHxlbnwxfHx8fDE3NjQyMDQ4NTR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Eğitim',
  },
  {
    id: 4,
    title: 'Yurt Başvuruları Açıldı',
    subtitle: 'KYK yurt başvuruları için son tarih yaklaşıyor.',
    image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkb3JtJTIwcm9vbSUyMHN0dWRlbnR8ZW58MXx8fHwxNzY0MjA0ODU0fDA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Barınma',
  },
  {
    id: 5,
    title: 'Kariyer Günleri 2024',
    subtitle: 'Önde gelen şirketlerle tanışma fırsatı!',
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXJlZXIlMjBmYWlyJTIwam9iJTIwZXZlbnR8ZW58MXx8fHwxNzY0MjA0ODU1fDA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Kariyer',
  },
  {
    id: 6,
    title: 'Tiyatro Gösterisi',
    subtitle: 'Devlet Tiyatrosu öğrencilere özel indirimli.',
    image: 'https://images.unsplash.com/photo-1503095396549-807759245b35?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0aGVhdHJlJTIwc3RhZ2UlMjBwZXJmb3JtYW5jZXxlbnwxfHx8fDE3NjQyMDQ4NTZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Kültür',
  }
];

const POPULAR_PLACES = [
  {
    id: 1,
    name: 'Konya Halk Kütüphanesi',
    category: 'Kütüphane',
    rating: 4.9,
    distance: '1.5 km',
    image: konyaLibraryImg
  },
  {
    id: 2,
    name: 'Zafer Kütüphanesi',
    category: 'Kütüphane',
    rating: 4.8,
    distance: '1.2 km',
    image: 'https://images.unsplash.com/photo-1559867632-9a4ed11e09b7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBwdWJsaWMlMjBsaWJyYXJ5JTIwYXJjaGl0ZWN0dXJlfGVufDF8fHx8MTc2NDIwNDUzOHww&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: 3,
    name: 'Mevlana Çay Bahçesi',
    category: 'Kafe & Çay',
    rating: 4.5,
    distance: '800 m',
    image: 'https://images.unsplash.com/photo-1664135942001-a417e5afa11b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvdXRkb29yJTIwdGVhJTIwZ2FyZGVuJTIwdHVya2V5fGVufDF8fHx8MTc2NDIwNDU0Mnww&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: 4,
    name: 'Bosna Kahvecisi',
    category: 'Kafe',
    rating: 4.2,
    distance: '2.5 km',
    image: 'https://images.unsplash.com/photo-1758610605872-3195caed0bdd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3p5JTIwY29mZmVlJTIwc2hvcCUyMGludGVyaW9yJTIwYm9va3xlbnwxfHx8fDE3NjQyMDQ1MzV8MA&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: 5,
    name: 'Meram Bağları',
    category: 'Park & Doğa',
    rating: 4.7,
    distance: '3.0 km',
    image: 'https://images.unsplash.com/photo-1519331379826-f10be5486c6f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXJrJTIwZ2FyZGVuJTIwbmF0dXJlfGVufDF8fHx8MTc2NDIwNDg1N3ww&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: 6,
    name: 'Alaaddin Tepesi',
    category: 'Tarihi Mekan',
    rating: 4.6,
    distance: '2.0 km',
    image: 'https://images.unsplash.com/photo-1541963058-d6c7c5a29a42?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoaXN0b3JpYyUyMGhpbGwlMjBwYXJrfGVufDF8fHx8MTc2NDIwNDg1OHww&ixlib=rb-4.1.0&q=80&w=1080'
  },
];

const EVENTS = [
  {
    id: 1,
    title: 'Gençlik Festivali',
    location: 'Kültür Park',
    day: '24',
    month: 'EKİM',
    image: 'https://images.unsplash.com/photo-1658046413536-6e5933dfd939?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMGNvbmNlcnQlMjBjcm93ZCUyMHN0YWdlJTIwbGlnaHRzfGVufDF8fHx8MTc2NDIwNDU0NHww&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: 2,
    title: 'Yazılım Atölyesi',
    location: 'Teknokent',
    day: '28',
    month: 'EKİM',
    image: 'https://images.unsplash.com/photo-1558301204-e3226482a77b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2Z0d2FyZSUyMGNvZGluZyUyMHdvcmtzaG9wJTIwcGVvcGxlfGVufDF8fHx8MTc2NDIwNDU0Nnww&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: 3,
    title: 'Kitap Kulübü Buluşması',
    location: 'Halk Kütüphanesi',
    day: '30',
    month: 'EKİM',
    image: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib29rJTIwY2x1YiUyMG1lZXRpbmclMjBwZW9wbGV8ZW58MXx8fHwxNzY0MjA0ODU5fDA&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: 4,
    title: 'Sinema Akşamları',
    location: 'Kampüs Kültür Merkezi',
    day: '02',
    month: 'KASIM',
    image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3ZpZSUyMHRoZWF0ZXIlMjBzY3JlZW58ZW58MXx8fHwxNzY0MjA0ODYwfDA&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: 5,
    title: 'Startup Pitch Night',
    location: 'NEÜ Girişimcilik Kulübü',
    day: '05',
    month: 'KASIM',
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdGFydHVwJTIwcGl0Y2glMjBwcmVzZW50YXRpb258ZW58MXx8fHwxNzY0MjA0ODYxfDA&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: 6,
    title: 'Spor Şenliği',
    location: 'Karatay Spor Salonu',
    day: '08',
    month: 'KASIM',
    image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcG9ydHMlMjBldmVudCUyMGNvbXBldGl0aW9ufGVufDF8fHx8MTc2NDIwNDg2Mnww&ixlib=rb-4.1.0&q=80&w=1080'
  }
];

const FILTERS = ['Tümü', 'Mekanlar', 'Etkinlik', 'İndirimler', 'Yurtlar', 'Kulüpler'];

const TRENDING_TOPICS = [
  { id: 1, title: 'Vize Tarihleri Açıklandı', count: '2.4k Okunma' },
  { id: 2, title: 'Kampüs Metro Çalışması', count: '1.8k Okunma' },
  { id: 3, title: 'Yemekhane Zam Oranları', count: '1.2k Okunma' },
  { id: 4, title: 'Kütüphane 7/24 Açık Mı?', count: '900 Okunma' },
];

const GAME_CARDS = [
  {
    id: 1,
    title: 'Quiz Duel',
    subtitle: 'Rakibini Bul',
    icon: Swords,
    reward: '+20 Coin',
    bgColor: 'violet-gradient'
  },
  {
    id: 2,
    title: 'Hazine Avı',
    subtitle: 'Konya\'yı Keşfet',
    icon: MapPin,
    reward: '+100 Coin',
    bgColor: 'violet-gradient'
  },
  {
    id: 3,
    title: 'Kampüs Muhabiri',
    subtitle: 'Durum Raporu',
    icon: Camera,
    reward: '+15 Coin',
    bgColor: 'violet-gradient',
    isLive: true
  },
  {
    id: 4,
    title: 'Günün Anketi',
    subtitle: 'Oy Ver',
    icon: BarChart3,
    reward: '+10 Coin',
    bgColor: 'violet-gradient'
  }
];

interface DiscoverScreenProps {
  activeTab?: string;
  onTabChange?: (tab: string) => void;
  onGameCenterClick?: () => void;
  onAnnouncementClick?: (announcement: any) => void;
  isAuthenticated?: boolean;
  onGameSelect?: (gameId: string) => void;
  onLoginClick?: () => void;
}

export const DiscoverScreen = ({ 
  activeTab = 'discover',
  onTabChange,
  onGameCenterClick,
  onAnnouncementClick,
  isAuthenticated = false,
  onGameSelect,
  onLoginClick,
}: DiscoverScreenProps = {}) => {
  const { isDarkMode } = useTheme();
  const [activeFilter, setActiveFilter] = useState('Tümü');
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  const [showExamHero, setShowExamHero] = useState(false);
  const [showTreasureHunt, setShowTreasureHunt] = useState(false);
  const [showCampusReporter, setShowCampusReporter] = useState(false);
  const [showDailyPoll, setShowDailyPoll] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleGameCardClick = (gameId: number) => {
    if (gameId === 1) {
      // Quiz Duel clicked - show ExamHeroScreen
      setShowExamHero(true);
    } else if (gameId === 2) {
      // Hazine Avı clicked - show TreasureHuntScreen
      setShowTreasureHunt(true);
    } else if (gameId === 3) {
      // Kampüs Muhabiri clicked - show CampusReporterScreen
      setShowCampusReporter(true);
    } else if (gameId === 4) {
      // Günün Anketi clicked - show DailyPollScreen
      setShowDailyPoll(true);
    }
  };

  if (showExamHero) {
    // Dynamically import and render ExamHeroScreen
    const { ExamHeroScreen } = require('./ExamHeroScreen');
    return <ExamHeroScreen />;
  }

  if (showTreasureHunt) {
    // Dynamically import and render TreasureHuntScreen
    const { TreasureHuntScreen } = require('./TreasureHuntScreen');
    return <TreasureHuntScreen />;
  }

  if (showCampusReporter) {
    // Dynamically import and render CampusReporterScreen
    const { CampusReporterScreen } = require('./CampusReporterScreen');
    return <CampusReporterScreen />;
  }

  if (showDailyPoll) {
    // Dynamically import and render DailyPollScreen
    const { DailyPollScreen } = require('./DailyPollScreen');
    return <DailyPollScreen />;
  }

  return (
    <div className={`min-h-screen pb-32 lg:pb-6 transition-colors ${
      isDarkMode ? 'bg-[#0f0e17]' : 'bg-[#f2f3f7]'
    }`}>
      
      {/* Rich Global Header */}
      <GlobalHeader 
        type="rich"
        onWalletClick={isAuthenticated ? () => setIsWalletModalOpen(true) : undefined}
        coinBalance="2.450"
        onSearchClick={() => setIsSearchOpen(true)}
        onFilterClick={() => console.log('🎯 Filter/Categories clicked')}
        activeTab={activeTab}
        onTabChange={onTabChange}
        onGameCenterClick={onGameCenterClick}
        isAuthenticated={isAuthenticated}
        onLoginClick={onLoginClick}
      />

      {/* Main Content */}
      <div className="pt-[60px] lg:pt-[84px]">
        {isAuthenticated ? (
          <PageLayout
            onTabChange={onTabChange}
            onWalletOpen={() => setIsWalletModalOpen(true)}
            onGameClick={(gameId) => onGameSelect?.(gameId)}
            onGameCenterClick={onGameCenterClick}
          >
            <div className="space-y-4">

        {/* Section 1: Duyurular (Announcements) */}
        <SectionWrapper
          title="Duyurular"
          onViewAll={() => console.log('Show all announcements')}
        >
            {ANNOUNCEMENTS.map((announcement) => (
              <AnnouncementCard 
                key={announcement.id}
                announcement={announcement}
                onClick={() => onAnnouncementClick?.(announcement)}
              />
            ))}
        </SectionWrapper>

        {/* Section 2: Popüler Mekanlar (Horizontal Cards - 16:9) */}
        <section>
          <div className={`mb-4 flex items-center justify-between ${isAuthenticated ? 'px-0' : 'px-5 lg:px-0'}`}>
            <h3 className={`text-2xl font-bold transition-colors ${
              isDarkMode ? 'text-white' : 'text-[#19142e]'
            }`}>Popüler Mekanlar</h3>
            <button 
              onClick={() => {
                if (!isAuthenticated) {
                  onLoginClick?.();
                } else {
                  console.log('Show all places');
                }
              }}
              className={`text-sm font-bold transition-colors ${
                isDarkMode 
                  ? 'text-[#5852c4] hover:text-white' 
                  : 'text-[#5852c4] hover:text-[#19142e]'
              }`}
            >
              Tümü
            </button>
          </div>
          
          <div className={`flex gap-4 overflow-x-auto pb-2 scrollbar-hide snap-x snap-mandatory lg:snap-none ${isAuthenticated ? 'px-0' : 'px-4 lg:px-0'}`}>
            {POPULAR_PLACES.map((place) => (
              <div 
                key={place.id} 
                className="snap-center flex-shrink-0 w-[280px] group cursor-pointer"
                onClick={() => {
                  if (!isAuthenticated) {
                    onLoginClick?.();
                  } else {
                    console.log('🏛️ Place clicked:', place.name);
                  }
                }}
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
            ))}
          </div>
        </section>

        {/* Section 2: GençCoin Kazan - Game Cards */}
        <section>
          <div className={`mb-4 flex items-center justify-between ${isAuthenticated ? 'px-0' : 'px-5 lg:px-0'}`}>
            <h3 className={`text-2xl font-bold transition-colors ${
              isDarkMode ? 'text-white' : 'text-[#19142e]'
            }`}>GençCoin Kazan</h3>
          </div>
          
          <div className={`flex gap-4 overflow-x-auto pb-2 scrollbar-hide snap-x snap-mandatory ${isAuthenticated ? 'px-0' : 'px-4'}`}>
            {GAME_CARDS.map((card) => {
              const IconComponent = card.icon;
              return (
                <div 
                  key={card.id} 
                  className="snap-center flex-shrink-0 w-[200px] group cursor-pointer"
                  onClick={() => {
                    if (!isAuthenticated) {
                      onLoginClick?.();
                    } else {
                      handleGameCardClick(card.id);
                    }
                  }}
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
            })}
          </div>
        </section>

        {/* Section 3: Yaklaşan Etkinlikler */}
        <section>
          <div className={`mb-4 flex items-center justify-between ${isAuthenticated ? 'px-0' : 'px-5'}`}>
            <h3 className={`text-2xl font-bold transition-colors ${
              isDarkMode ? 'text-white' : 'text-[#19142e]'
            }`}>Yaklaşan Etkinlikler</h3>
            <button 
              onClick={() => {
                if (!isAuthenticated) {
                  onLoginClick?.();
                } else {
                  console.log('Show all events');
                }
              }}
              className={`text-sm font-bold transition-colors ${
                isDarkMode 
                  ? 'text-[#5852c4] hover:text-white' 
                  : 'text-[#5852c4] hover:text-[#19142e]'
              }`}
            >
              Tümü
            </button>
          </div>
          
          <div className={`flex gap-4 overflow-x-auto pb-2 scrollbar-hide snap-x snap-mandatory ${isAuthenticated ? 'px-0' : 'px-4'}`}>
            {EVENTS.map((event) => (
              <div 
                key={event.id} 
                className="snap-center flex-shrink-0 w-[280px] group cursor-pointer"
                onClick={() => {
                  if (!isAuthenticated) {
                    onLoginClick?.();
                  } else {
                    console.log('Event clicked:', event.title);
                  }
                }}
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
                  <div className="absolute top-3 left-3 bg-white/95 backdrop-blur rounded-xl p-3 text-center min-w-[60px] shadow-md">
                    <div className="text-xs font-bold text-[#8279a5] uppercase leading-none mb-1">{event.month}</div>
                    <div className="text-2xl font-black text-[#19142e] leading-none">{event.day}</div>
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
            ))}
          </div>
        </section>

            </div>
          </PageLayout>
        ) : (
          <div className="max-w-[1200px] mx-auto px-0 lg:px-6 space-y-4">
            {/* Same content for non-authenticated users */}
            
        {/* Section 1: Duyurular (Announcements) - NEW! */}
        <section>
          <div className={`mb-4 flex items-center justify-between ${isAuthenticated ? 'px-0' : 'px-5 lg:px-0'}`}>
            <h3 className={`text-2xl font-bold transition-colors ${
              isDarkMode ? 'text-white' : 'text-[#19142e]'
            }`}>Duyurular</h3>
            <button 
              onClick={() => {
                if (!isAuthenticated) {
                  onLoginClick?.();
                } else {
                  console.log('Show all announcements');
                }
              }}
              className={`text-sm font-bold transition-colors ${
                isDarkMode 
                  ? 'text-[#5852c4] hover:text-white' 
                  : 'text-[#5852c4] hover:text-[#19142e]'
              }`}
            >
              Tümü
            </button>
          </div>
          
          {/* Horizontal Scroll Carousel */}
          <div className={`flex gap-4 overflow-x-auto pb-2 scrollbar-hide snap-x snap-mandatory lg:snap-none ${isAuthenticated ? 'px-0' : 'px-4 lg:px-0'}`}>
            {ANNOUNCEMENTS.map((announcement) => (
              <div 
                key={announcement.id}
                onClick={() => {
                  if (!isAuthenticated) {
                    onLoginClick?.();
                  } else {
                    onAnnouncementClick?.(announcement);
                  }
                }}
                className="snap-center flex-shrink-0 w-[320px] lg:w-[380px] group cursor-pointer"
              >
                <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden shadow-[0_8px_24px_rgba(25,20,46,0.12)] hover:shadow-[0_12px_40px_rgba(25,20,46,0.16)] transition-shadow">
                  <ImageWithFallback 
                    src={announcement.image} 
                    alt={announcement.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  
                  {/* Dark Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                  
                  {/* Category Badge - Top Right */}
                  {announcement.category && (
                    <div className="absolute top-3 right-3 z-10">
                      <span className="px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-sm text-white text-xs font-bold border border-white/30">
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
            ))}
          </div>
        </section>

        {/* Section 2: Popüler Mekanlar (Horizontal Cards - 16:9) */}
        <section>
          <div className={`mb-4 flex items-center justify-between ${isAuthenticated ? 'px-0' : 'px-5 lg:px-0'}`}>
            <h3 className={`text-2xl font-bold transition-colors ${
              isDarkMode ? 'text-white' : 'text-[#19142e]'
            }`}>Popüler Mekanlar</h3>
            <button 
              onClick={() => {
                if (!isAuthenticated) {
                  onLoginClick?.();
                } else {
                  console.log('Show all places');
                }
              }}
              className={`text-sm font-bold transition-colors ${
                isDarkMode 
                  ? 'text-[#5852c4] hover:text-white' 
                  : 'text-[#5852c4] hover:text-[#19142e]'
              }`}
            >
              Tümü
            </button>
          </div>
          
          <div className={`flex gap-4 overflow-x-auto pb-2 scrollbar-hide snap-x snap-mandatory lg:snap-none ${isAuthenticated ? 'px-0' : 'px-4 lg:px-0'}`}>
            {POPULAR_PLACES.map((place) => (
              <div 
                key={place.id} 
                className="snap-center flex-shrink-0 w-[280px] group cursor-pointer"
                onClick={() => {
                  if (!isAuthenticated) {
                    onLoginClick?.();
                  } else {
                    console.log('🏛️ Place clicked:', place.name);
                  }
                }}
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
            ))}
          </div>
        </section>

        {/* Section 3: GençCoin Kazan - Game Cards */}
        <section>
          <div className={`mb-4 flex items-center justify-between ${isAuthenticated ? 'px-0' : 'px-5 lg:px-0'}`}>
            <h3 className={`text-2xl font-bold transition-colors ${
              isDarkMode ? 'text-white' : 'text-[#19142e]'
            }`}>GençCoin Kazan</h3>
          </div>
          
          <div className={`flex gap-4 overflow-x-auto pb-2 scrollbar-hide snap-x snap-mandatory ${isAuthenticated ? 'px-0' : 'px-4'}`}>
            {GAME_CARDS.map((card) => {
              const IconComponent = card.icon;
              return (
                <div 
                  key={card.id} 
                  className="snap-center flex-shrink-0 w-[200px] group cursor-pointer"
                  onClick={() => {
                    if (!isAuthenticated) {
                      onLoginClick?.();
                    } else {
                      handleGameCardClick(card.id);
                    }
                  }}
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
                        }`}>{card.description}</p>
                        
                        <div className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg ${
                          card.bgColor === 'violet-gradient' 
                            ? 'bg-white/20' 
                            : isDarkMode 
                              ? 'bg-slate-800' 
                              : 'bg-[#5852c4]/10'
                        }`}>
                          <Coins className={`w-4 h-4 ${
                            card.bgColor === 'violet-gradient' 
                              ? 'text-white' 
                              : 'text-[#F59E0B]'
                          }`} strokeWidth={2.5} />
                          <span className={`text-xs font-black ${
                            card.bgColor === 'violet-gradient' 
                              ? 'text-white' 
                              : isDarkMode 
                                ? 'text-white' 
                                : 'text-[#5852c4]'
                          }`}>{card.reward}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Section 4: Yaklaşan Etkinlikler */}
        <section>
          <div className={`mb-4 flex items-center justify-between ${isAuthenticated ? 'px-0' : 'px-5'}`}>
            <h3 className={`text-2xl font-bold transition-colors ${
              isDarkMode ? 'text-white' : 'text-[#19142e]'
            }`}>Yaklaşan Etkinlikler</h3>
            <button 
              onClick={() => {
                if (!isAuthenticated) {
                  onLoginClick?.();
                } else {
                  console.log('Show all events');
                }
              }}
              className={`text-sm font-bold transition-colors ${
                isDarkMode 
                  ? 'text-[#5852c4] hover:text-white' 
                  : 'text-[#5852c4] hover:text-[#19142e]'
              }`}
            >
              Tümü
            </button>
          </div>
          
          <div className={`flex gap-4 overflow-x-auto pb-2 scrollbar-hide snap-x snap-mandatory ${isAuthenticated ? 'px-0' : 'px-4'}`}>
            {EVENTS.map((event) => (
              <div 
                key={event.id} 
                className="snap-center flex-shrink-0 w-[280px] group cursor-pointer"
                onClick={() => {
                  if (!isAuthenticated) {
                    onLoginClick?.();
                  } else {
                    console.log('Event clicked:', event.title);
                  }
                }}
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
                  <div className="absolute top-3 left-3 bg-white/95 backdrop-blur rounded-xl p-3 text-center min-w-[60px] shadow-md">
                    <div className="text-xs font-bold text-[#8279a5] uppercase leading-none mb-1">{event.month}</div>
                    <div className="text-2xl font-black text-[#19142e] leading-none">{event.day}</div>
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
            ))}
          </div>
        </section>

          </div>
        )}
      </div>

      <WalletModal 
        isOpen={isWalletModalOpen}
        onClose={() => setIsWalletModalOpen(false)}
        isCardConnected={true}
      />

      <SearchOverlay 
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        trendingTopics={TRENDING_TOPICS}
      />
    </div>
  );
};
