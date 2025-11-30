import React, { useState } from 'react';
import { Search, Star, MapPin, Coins } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { WalletModal } from '../wallet/WalletModal';
import { GlobalHeader } from '../layout/GlobalHeader';
import { PageLayout } from '../layout/PageLayout';
import { SearchOverlay } from '../search/SearchOverlay';
import { useTheme } from '../../contexts/ThemeContext';
import { SectionWrapper, AnnouncementCard, PlaceCard, EventCard, GameCard } from './DiscoverScreenSections';
const konyaLibraryImg = '/images/c91a95a69feb350643602a59bdd8143dcd2e26c5.png';

import { ANNOUNCEMENTS } from '../../data/mockAnnouncements';

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
  {
    id: 7,
    name: 'Selçuklu Müzesi',
    category: 'Müze',
    rating: 4.8,
    distance: '1.8 km',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNldW0lMjBpbnRlcmlvciUyMGFydCUyMGV4aGliaXR8ZW58MXx8fHwxNzY0MjA0ODY3fDA&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: 8,
    name: 'Konya Bilim Merkezi',
    category: 'Bilim Merkezi',
    rating: 4.9,
    distance: '3.5 km',
    image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzY2llbmNlJTIwbXVzZXVtJTIwaW50ZXJhY3RpdmUlMjBleGhpYml0fGVufDF8fHx8MTc2NDIwNDg2OHww&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: 9,
    name: 'Şems-i Tebrizi Parkı',
    category: 'Park',
    rating: 4.4,
    distance: '2.2 km',
    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXJrJTIwdHJlZXMlMjBuYXR1cmUlMjBwYXRofGVufDF8fHx8MTc2NDIwNDg2OXww&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: 10,
    name: 'Konya Çarşısı',
    category: 'Alışveriş',
    rating: 4.3,
    distance: '1.0 km',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzaG9wcGluZyUyMG1hbGwlMjBpbnRlcmlvcnxlbnwxfHx8fDE3NjQyMDQ4NzB8MA&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: 11,
    name: 'Tropikal Aqua Park',
    category: 'Eğlence',
    rating: 4.5,
    distance: '5.0 km',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXRlcnBhcmslMjBzd2ltbWluZyUyMHBvb2x8ZW58MXx8fHwxNzY0MjA0ODcxfDA&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: 12,
    name: 'Konya Spor Salonu',
    category: 'Spor',
    rating: 4.6,
    distance: '2.8 km',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxneW0lMjBzcG9ydCUyMGZhY2lsaXR5fGVufDF8fHx8MTc2NDIwNDg3Mnww&ixlib=rb-4.1.0&q=80&w=1080'
  }
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
  },
  {
    id: 7,
    title: 'Müzik Gecesi',
    location: 'Kampüs Amfi',
    day: '12',
    month: 'KASIM',
    image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsaXZlJTIwbXVzaWMlMjBjb25jZXJ0JTIwc3RhZ2V8ZW58MXx8fHwxNzY0MjA0ODczfDA&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: 8,
    title: 'Teknoloji Zirvesi',
    location: 'Teknokent Konferans Salonu',
    day: '15',
    month: 'KASIM',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNobm9sb2d5JTIwY29uZmVyZW5jZSUyMHRhbGt8ZW58MXx8fHwxNzY0MjA0ODc0fDA&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: 9,
    title: 'Yemek Festivali',
    location: 'Kampüs Meydanı',
    day: '18',
    month: 'KASIM',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb29kJTIwZmVzdGl2YWwlMjBzdHJlZXQlMjBmb29kfGVufDF8fHx8MTc2NDIwNDg3NXww&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: 10,
    title: 'Sanat Sergisi',
    location: 'Güzel Sanatlar Fakültesi',
    day: '22',
    month: 'KASIM',
    image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnQlMjBleGhpYml0aW9uJTIwcGFpbnRpbmdzfGVufDF8fHx8MTc2NDIwNDg3Nnww&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: 11,
    title: 'Kariyer Fuarı',
    location: 'Spor Salonu',
    day: '25',
    month: 'KASIM',
    image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqb2IlMjBmYWlyJTIwY2FyZWVyJTIwZXZlbnR8ZW58MXx8fHwxNzY0MjA0ODc3fDA&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: 12,
    title: 'Kampüs Turu',
    location: 'Ana Giriş',
    day: '28',
    month: 'KASIM',
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwY2FtcHVzJTIwdG91cnxlbnwxfHx8fDE3NjQyMDQ4Nzh8MA&ixlib=rb-4.1.0&q=80&w=1080'
  }
];

const SOCIAL_RESPONSIBILITY_PROJECTS = [
  {
    id: 1,
    title: 'Köy Okullarına Kitap Bağışı',
    location: 'Merkez Kampüs',
    day: '10',
    month: 'KASIM',
    points: 500,
    image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib29rJTIwZG9uYXRpb24lMjBjaGFyaXR5fGVufDF8fHx8MTc2NDIwNDg3OXww&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: 2,
    title: 'Çevre Temizlik Günü',
    location: 'Meram Bağları',
    day: '14',
    month: 'KASIM',
    points: 750,
    image: 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbnZpcm9ubWVudGFsJTIwY2xlYW51cCUyMHZvbHVudGVlcnxlbnwxfHx8fDE3NjQyMDQ4ODB8MA&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: 3,
    title: 'Yaşlı Bakım Evi Ziyareti',
    location: 'Konya Huzurevi',
    day: '17',
    month: 'KASIM',
    points: 600,
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGRlcmx5JTIwY2FyZSUyMHZvbHVudGVlcnxlbnwxfHx8fDE3NjQyMDQ4ODF8MA&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: 4,
    title: 'Kan Bağışı Kampanyası',
    location: 'Kızılay Merkez',
    day: '20',
    month: 'KASIM',
    points: 800,
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibG9vZCUyMGRvbmF0aW9uJTIwaG9zcGl0YWx8ZW58MXx8fHwxNzY0MjA0ODgyfDA&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: 5,
    title: 'Hayvan Barınağı Gönüllülüğü',
    location: 'Konya Hayvan Barınağı',
    day: '23',
    month: 'KASIM',
    points: 650,
    image: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmltYWwlMjBzaGVsdGVyJTIwdm9sdW50ZWVyfGVufDF8fHx8MTc2NDIwNDg4M3ww&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: 6,
    title: 'Gıda Bankası Bağışı',
    location: 'Kampüs Meydanı',
    day: '26',
    month: 'KASIM',
    points: 700,
    image: 'https://images.unsplash.com/photo-1509099863731-ef4bff19e808?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb29kJTIwYmFuayUyMGRvbmF0aW9ufGVufDF8fHx8MTc2NDIwNDg4NHww&ixlib=rb-4.1.0&q=80&w=1080'
  }
];

const FILTERS = ['Tümü', 'Mekanlar', 'Etkinlik', 'İndirimler', 'Yurtlar', 'Kulüpler'];

const TRENDING_TOPICS = [
  { id: 1, title: 'Vize Tarihleri Açıklandı', count: '2.4k Okunma' },
  { id: 2, title: 'Kampüs Metro Çalışması', count: '1.8k Okunma' },
  { id: 3, title: 'Yemekhane Zam Oranları', count: '1.2k Okunma' },
  { id: 4, title: 'Kütüphane 7/24 Açık Mı?', count: '900 Okunma' },
];


interface DiscoverScreenProps {
  activeTab?: string;
  onTabChange?: (tab: string) => void;
  onGameCenterClick?: () => void;
  onAnnouncementClick?: (announcement: any) => void;
  onAnnouncementsListClick?: () => void;
  onPlaceClick?: (place: any) => void;
  onPlacesListClick?: () => void;
  onEventClick?: (event: any) => void;
  onEventsListClick?: () => void;
  onSocialResponsibilityClick?: (project: any) => void;
  onSocialResponsibilityListClick?: () => void;
  isAuthenticated?: boolean;
  onGameSelect?: (gameId: string) => void;
  onLoginClick?: () => void;
}

export const DiscoverScreen = ({ 
  activeTab = 'discover',
  onTabChange,
  onGameCenterClick,
  onAnnouncementClick,
  onAnnouncementsListClick,
  onPlaceClick,
  onPlacesListClick,
  onEventClick,
  onEventsListClick,
  onSocialResponsibilityClick,
  onSocialResponsibilityListClick,
  isAuthenticated = false,
  onGameSelect,
  onLoginClick,
}: DiscoverScreenProps = {}) => {
  const { isDarkMode } = useTheme();
  const [activeFilter, setActiveFilter] = useState('Tümü');
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

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
            <div className="space-y-6">

        {/* Section 1: Duyurular (Announcements) */}
        <SectionWrapper
          title="Duyurular"
          onViewAll={() => {
            if (!isAuthenticated) {
              onLoginClick?.();
            } else {
              onAnnouncementsListClick?.();
            }
          }}
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
          <div className="mb-5 flex items-center justify-between px-5 lg:px-0">
            <h3 className={`text-2xl lg:text-[28px] font-bold transition-colors ${
              isDarkMode ? 'text-white' : 'text-[#19142e]'
            }`}>Popüler Mekanlar</h3>
            <button 
              onClick={() => {
                if (!isAuthenticated) {
                  onLoginClick?.();
                } else {
                  onPlacesListClick?.();
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
          
          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide snap-x snap-mandatory lg:snap-none px-5 lg:px-0">
            {POPULAR_PLACES.map((place) => (
              <div 
                key={place.id} 
                className="snap-center flex-shrink-0 w-[280px] group cursor-pointer"
                onClick={() => {
                  if (!isAuthenticated) {
                    onLoginClick?.();
                  } else {
                    onPlaceClick?.(place);
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

        {/* Section 3: Yaklaşan Etkinlikler */}
        <section>
          <div className="mb-5 flex items-center justify-between px-5 lg:px-0">
            <h3 className={`text-2xl lg:text-[28px] font-bold transition-colors ${
              isDarkMode ? 'text-white' : 'text-[#19142e]'
            }`}>Yaklaşan Etkinlikler</h3>
            <button 
              onClick={() => {
                if (!isAuthenticated) {
                  onLoginClick?.();
                } else {
                  onEventsListClick?.();
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
          
          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide snap-x snap-mandatory lg:snap-none px-5 lg:px-0">
            {EVENTS.map((event) => (
              <div 
                key={event.id} 
                className="snap-center flex-shrink-0 w-[320px] lg:w-[450px] group cursor-pointer"
                onClick={() => {
                  if (!isAuthenticated) {
                    onLoginClick?.();
                  } else {
                    onEventClick?.(event);
                  }
                }}
              >
                <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden shadow-[0_8px_24px_rgba(25,20,46,0.12)] hover:shadow-[0_12px_40px_rgba(25,20,46,0.16)] transition-shadow">
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
            ))}
          </div>
        </section>

        {/* Section 4: Sosyal Sorumluluk */}
        <section>
          <div className="mb-5 flex items-center justify-between px-5 lg:px-0">
            <h3 className={`text-2xl lg:text-[28px] font-bold transition-colors ${
              isDarkMode ? 'text-white' : 'text-[#19142e]'
            }`}>Sosyal Sorumluluk</h3>
            <button 
              onClick={() => {
                if (!isAuthenticated) {
                  onLoginClick?.();
                } else {
                  onSocialResponsibilityListClick?.();
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
          
          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide snap-x snap-mandatory lg:snap-none px-5 lg:px-0">
            {SOCIAL_RESPONSIBILITY_PROJECTS.map((project) => (
              <div 
                key={project.id} 
                className="snap-center flex-shrink-0 w-[280px] group cursor-pointer"
                onClick={() => {
                  if (!isAuthenticated) {
                    onLoginClick?.();
                  } else {
                    onSocialResponsibilityClick?.(project);
                  }
                }}
              >
                <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden shadow-[0_8px_24px_rgba(25,20,46,0.12)] hover:shadow-[0_12px_40px_rgba(25,20,46,0.16)] transition-shadow">
                  <ImageWithFallback 
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  
                  {/* Dark Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                  
                  {/* Date Badge */}
                  <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-md">
                    <div className="flex items-center gap-1.5">
                      <div className="text-sm font-black text-[#5852c4] leading-none">{project.day}</div>
                      <div className="text-xs font-bold text-[#19142e] uppercase leading-none">{project.month}</div>
                    </div>
                  </div>
                  
                  {/* Points Badge - Top Right (Different color for social responsibility) */}
                  <div className="absolute top-3 right-3 bg-gradient-to-r from-emerald-500 to-teal-600 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-1 shadow-md">
                    <Coins className="w-3 h-3 text-white" />
                    <span className="text-sm font-bold text-white">{project.points}</span>
                  </div>
                  
                  {/* Content - Bottom Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
                    <h4 className="font-bold text-white mb-2 leading-tight">{project.title}</h4>
                    <div className="flex items-center gap-1.5 text-white/90 text-sm">
                      <MapPin className="w-4 h-4" />
                      <span>{project.location}</span>
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
          <div className="mb-4 flex items-center justify-between px-5 lg:px-0">
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
          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide snap-x snap-mandatory lg:snap-none px-5 lg:px-0">
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
            ))}
          </div>
        </section>

        {/* Section 2: Popüler Mekanlar (Horizontal Cards - 16:9) */}
        <section>
          <div className="mb-4 flex items-center justify-between px-5 lg:px-0">
            <h3 className={`text-2xl font-bold transition-colors ${
              isDarkMode ? 'text-white' : 'text-[#19142e]'
            }`}>Popüler Mekanlar</h3>
            <button 
              onClick={() => {
                if (!isAuthenticated) {
                  onLoginClick?.();
                } else {
                  onPlacesListClick?.();
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
          
          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide snap-x snap-mandatory lg:snap-none px-5 lg:px-0">
            {POPULAR_PLACES.map((place) => (
              <div 
                key={place.id} 
                className="snap-center flex-shrink-0 w-[280px] group cursor-pointer"
                onClick={() => {
                  if (!isAuthenticated) {
                    onLoginClick?.();
                  } else {
                    onPlaceClick?.(place);
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

        {/* Section 3: Yaklaşan Etkinlikler */}
        <section>
          <div className="mb-4 flex items-center justify-between px-5 lg:px-0">
            <h3 className={`text-2xl font-bold transition-colors ${
              isDarkMode ? 'text-white' : 'text-[#19142e]'
            }`}>Yaklaşan Etkinlikler</h3>
            <button 
              onClick={() => {
                if (!isAuthenticated) {
                  onLoginClick?.();
                } else {
                  onEventsListClick?.();
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
          
          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide snap-x snap-mandatory lg:snap-none px-5 lg:px-0">
            {EVENTS.map((event) => (
              <div 
                key={event.id} 
                className="snap-center flex-shrink-0 w-[320px] lg:w-[450px] group cursor-pointer"
                onClick={() => {
                  if (!isAuthenticated) {
                    onLoginClick?.();
                  } else {
                    onEventClick?.(event);
                  }
                }}
              >
                <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden shadow-[0_8px_24px_rgba(25,20,46,0.12)] hover:shadow-[0_12px_40px_rgba(25,20,46,0.16)] transition-shadow">
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
            ))}
          </div>
        </section>

        {/* Section 4: Sosyal Sorumluluk */}
        <section>
          <div className="mb-4 flex items-center justify-between px-5 lg:px-0">
            <h3 className={`text-2xl font-bold transition-colors ${
              isDarkMode ? 'text-white' : 'text-[#19142e]'
            }`}>Sosyal Sorumluluk</h3>
            <button 
              onClick={() => {
                if (!isAuthenticated) {
                  onLoginClick?.();
                } else {
                  onSocialResponsibilityListClick?.();
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
          
          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide snap-x snap-mandatory lg:snap-none px-5 lg:px-0">
            {SOCIAL_RESPONSIBILITY_PROJECTS.map((project) => (
              <div 
                key={project.id} 
                className="snap-center flex-shrink-0 w-[280px] group cursor-pointer"
                onClick={() => {
                  if (!isAuthenticated) {
                    onLoginClick?.();
                  } else {
                    onSocialResponsibilityClick?.(project);
                  }
                }}
              >
                <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden shadow-[0_8px_24px_rgba(25,20,46,0.12)] hover:shadow-[0_12px_40px_rgba(25,20,46,0.16)] transition-shadow">
                  <ImageWithFallback 
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  
                  {/* Dark Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                  
                  {/* Date Badge */}
                  <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-md">
                    <div className="flex items-center gap-1.5">
                      <div className="text-sm font-black text-[#5852c4] leading-none">{project.day}</div>
                      <div className="text-xs font-bold text-[#19142e] uppercase leading-none">{project.month}</div>
                    </div>
                  </div>
                  
                  {/* Points Badge - Top Right (Different color for social responsibility) */}
                  <div className="absolute top-3 right-3 bg-gradient-to-r from-emerald-500 to-teal-600 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-1 shadow-md">
                    <Coins className="w-3 h-3 text-white" />
                    <span className="text-sm font-bold text-white">{project.points}</span>
                  </div>
                  
                  {/* Content - Bottom Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
                    <h4 className="font-bold text-white mb-2 leading-tight">{project.title}</h4>
                    <div className="flex items-center gap-1.5 text-white/90 text-sm">
                      <MapPin className="w-4 h-4" />
                      <span>{project.location}</span>
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
