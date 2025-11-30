import React, { useState } from 'react';
import { Settings, Edit3, LogOut, ChevronRight, Award, Trophy, Medal, Star, Target, Compass, Gift, CreditCard, QrCode, ChevronLeft, Lock, Save, Eye, EyeOff, ArrowLeftRight, Clock, Moon, Sun, Copy, Check, Users, TrendingUp } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { WalletModal } from '../wallet/WalletModal';
import { GlobalHeader } from '../layout/GlobalHeader';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { toast } from 'sonner';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';
import { Input } from '../ui/input';
import { useTheme } from '../../contexts/ThemeContext';
import { Label } from '../ui/label';
import { Button } from '../ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';
import { ContributionsScreen } from './ContributionsScreen';
import { FollowersScreen } from './FollowersScreen';
import { useCoins } from '../../contexts/CoinContext';
import { getUserRole as getRoleFromService, getRoleMultiplier } from '../../services/CoinRewardService';
import { CoinActionType } from '../../services/CoinRewardService';
import { getBadgeUnlockStatus } from '../../utils/badgeUtils';
const kasifBadge = '/images/b720c92d392edc4e03737e032c4f64b443d69150.png';
const seyyahBadge = '/images/00b07162d5b8b006019514145544fe2039cee667.png';
const gezginBadge = '/images/628becb8ed3dbf1dbd57717ef0eda68173b358fa.png';
const konyaBilgesiBadge = '/images/dbaf5bf559d0798ca2d47548efbfd6637cc9d70c.png';
const yeniGelenBadge = '/images/0b861b805523faa4af6e4a425b93c74c77b7e047.png';
const bilgi42Badge = '/images/fd6b625b186aa33e168e62fb08f8f1f35731752f.png';
const gun42Badge = '/images/2aec241ba83a0a727696ec3f6c38eded549d7dd0.png';
const kilavuzBadge = '/images/ed2b6d54f489f32196dc47a87dc210441c036a30.png';
const elciBadge = '/images/fd938016685ebc6970d86e36686f9c2ede37ed7a.png';
const oncuBadge = '/images/d47de86a59fb1df6ddab2251f2d0083c430221d0.png';
const ustaBadge = '/images/5b0cb869d1730a25db9c7579b17ced33967521ed.png';
const efsaneBadge = '/images/be58c457f713b2de619a2047b5e217ed3e53a461.png';
const gonulluBadge = '/images/8b9ae9f76b67c840289eabe2979566e550fd68ba.png';
const arsivciBadge = '/images/746c7390f47d5fc61f30caf49a560479931bbcdc.png';
const geziciBadge = '/images/5ba2f6ea349425d2bb29bcc9c5e2bf353f8b1fbb.png';

// Role & Multiplier Calculation (using CoinRewardService)
const getUserRole = (coins: number) => {
  const roleTitle = getRoleFromService(coins);
  const multiplier = getRoleMultiplier(roleTitle);
  const multiplierStr = `${multiplier.toFixed(1)}x`;
  
  if (coins < 500) return { title: "Yeni Gelen", multiplier: multiplierStr, nextTitle: "Seyyah", nextLimit: 500, current: coins };
  if (coins < 2500) return { title: "Seyyah", multiplier: multiplierStr, nextTitle: "Gezgin", nextLimit: 2500, current: coins };
  if (coins < 10000) return { title: "Gezgin", multiplier: multiplierStr, nextTitle: "Kaşif Meraklısı", nextLimit: 10000, current: coins };
  if (coins < 50000) return { title: "Kaşif Meraklısı", multiplier: multiplierStr, nextTitle: "Konya Bilgesi", nextLimit: 50000, current: coins };
  return { title: "Konya Bilgesi", multiplier: multiplierStr, nextTitle: null, nextLimit: null, current: coins };
};

interface Badge {
  id: number;
  name: string;
  image: string;
  glow: string;
  description: string;
  requirement: string;
  unlocked: boolean;
  unlockedDate?: string;
}

const ALL_BADGES: Badge[] = [
  { 
    id: 1, 
    name: 'Yeni Gelen', 
    image: yeniGelenBadge, 
    glow: 'rgba(107, 114, 128, 0.4)',
    description: 'KonyaGenç\'e hoş geldin! Keşfetmeye başlamak için ilk adımı attın.',
    requirement: 'Uygulamayı ilk kez aç',
    unlocked: true, // Always unlocked
    unlockedDate: undefined // Will be set dynamically
  },
  { 
    id: 2, 
    name: 'Seyyah', 
    image: seyyahBadge, 
    glow: 'rgba(156, 163, 175, 0.5)',
    description: 'Yolculuğa başladın! 500 GençCoin topladın ve şehri keşfediyorsun.',
    requirement: '500 GençCoin kazanarak Seyyah rütbesine ulaş',
    unlocked: false, // Will be set dynamically based on coins
    unlockedDate: undefined
  },
  { 
    id: 3, 
    name: 'Gezgin', 
    image: gezginBadge, 
    glow: 'rgba(88, 82, 196, 0.5)',
    description: 'Aktif bir KonyaGenç kullanıcısısın! 2.500 GençCoin ile gezginler arasındasın.',
    requirement: '2.500 GençCoin kazanarak Gezgin rütbesine ulaş',
    unlocked: false, // Will be set dynamically based on coins
    unlockedDate: undefined
  },
  { 
    id: 4, 
    name: 'Kaşif Meraklısı', 
    image: kasifBadge, 
    glow: 'rgba(88, 82, 196, 0.5)',
    description: 'Konya\'nın derinliklerini keşfediyorsun! 10.000 GençCoin ile kaşiflerdensin.',
    requirement: '10.000 GençCoin kazanarak Kaşif Meraklısı rütbesine ulaş',
    unlocked: false,
    unlockedDate: undefined
  },
  { 
    id: 5, 
    name: '42 Bilgi', 
    image: bilgi42Badge, 
    glow: 'rgba(59, 130, 246, 0.5)',
    description: 'Bilgi paylaşımında ustasın! 42 kaliteli Wiki bilgisi ekleyerek katkı yaptın.',
    requirement: 'Wiki\'ye 42 bilgi ekle',
    unlocked: false,
    unlockedDate: undefined
  },
  { 
    id: 6, 
    name: 'Konya Bilgesi', 
    image: konyaBilgesiBadge, 
    glow: 'rgba(59, 130, 246, 0.5)',
    description: 'Konya\'nın her yerini biliyorsun! 50.000 GençCoin ile bilgeler arasındasın.',
    requirement: '50.000 GençCoin kazanarak Konya Bilgesi rütbesine ulaş',
    unlocked: false, // Will be set dynamically based on coins
    unlockedDate: undefined
  },
  { 
    id: 7, 
    name: '42 Gün', 
    image: gun42Badge, 
    glow: 'rgba(156, 163, 175, 0.5)',
    description: 'Disiplin ve kararlılık! 42 gün boyunca her gün KonyaGenç\'i ziyaret ettin.',
    requirement: 'Üst üste 42 gün giriş yap',
    unlocked: false,
    unlockedDate: undefined
  },
  { 
    id: 8, 
    name: 'Kılavuz', 
    image: kilavuzBadge, 
    glow: 'rgba(34, 197, 94, 0.5)',
    description: 'Yeni öğrencilere yol gösteriyorsun! Rehberlik yaparak Konya\'yı tanıtıyorsun.',
    requirement: '10 yeni kullanıcıya yardımcı ol',
    unlocked: false,
    unlockedDate: undefined
  },
  { 
    id: 9, 
    name: 'Elçi', 
    image: elciBadge, 
    glow: 'rgba(168, 85, 247, 0.5)',
    description: 'Barış ve dostluk elçisisin! Sosyal etkinliklere katılarak topluluğu güçlendiriyorsun.',
    requirement: '5 farklı sosyal etkinliğe katıl',
    unlocked: false,
    unlockedDate: undefined
  },
  { 
    id: 10, 
    name: 'Öncü', 
    image: oncuBadge, 
    glow: 'rgba(148, 163, 184, 0.5)',
    description: 'İlk adımı atan sensin! Yeni trendleri keşfediyor ve liderlik ediyorsun.',
    requirement: 'Bir etkinlik veya mekan öner ve onaylansın',
    unlocked: false,
    unlockedDate: undefined
  },
  { 
    id: 11, 
    name: 'Usta', 
    image: ustaBadge, 
    glow: 'rgba(20, 184, 166, 0.5)',
    description: 'Becerilerinde ustalaştın! Konya\'nın her köşesini keşfettin ve deneyim kazandın.',
    requirement: '100.000 GençCoin kazanarak Usta rütbesine ulaş',
    unlocked: false, // Will be set dynamically based on coins
    unlockedDate: undefined
  },
  { 
    id: 12, 
    name: 'Efsane', 
    image: efsaneBadge, 
    glow: 'rgba(71, 85, 105, 0.6)',
    description: 'Efsaneler arasına katıldın! KonyaGenç\'in en deneyimli kullanıcılarındansın.',
    requirement: '500.000 GençCoin kazanarak Efsane rütbesine ulaş',
    unlocked: false, // Will be set dynamically based on coins
    unlockedDate: undefined
  },
  { 
    id: 13, 
    name: 'Gönüllü', 
    image: gonulluBadge, 
    glow: 'rgba(168, 85, 247, 0.5)',
    description: 'Topluma değer katıyorsun! Gönüllü etkinliklerde aktif rol alarak fark yaratıyorsun.',
    requirement: '3 gönüllü etkinliğine katıl',
    unlocked: false,
    unlockedDate: undefined
  },
  { 
    id: 14, 
    name: 'Arşivci', 
    image: arsivciBadge, 
    glow: 'rgba(120, 113, 108, 0.5)',
    description: 'Bilgi arşivcisisin! Geçmişi belgeleyerek geleceğe ışık tutuyorsun.',
    requirement: 'Wiki\'ye 100 tarihi bilgi ekle',
    unlocked: false,
    unlockedDate: undefined
  },
  { 
    id: 15, 
    name: 'Gezici', 
    image: geziciBadge, 
    glow: 'rgba(107, 114, 78, 0.5)',
    description: 'Sırt çantanı aldın ve keşfe çıktın! Konya\'nın tüm bölgelerini gezip görüyorsun.',
    requirement: '20 farklı lokasyonu ziyaret et',
    unlocked: false,
    unlockedDate: undefined
  },
];

interface ProfileScreenProps {
  activeTab?: string;
  onTabChange?: (tab: string) => void;
  onGameCenterClick?: () => void;
  onLogout?: () => void;
  onBadgesClick?: () => void;
  onGameSelect?: (gameId: string) => void;
  userId?: number;
  userData?: {
    id: number;
    name: string;
    username: string;
    avatar: string;
    school: string;
    department: string;
    followers: number;
    contributions: number;
    coins?: number;
  };
  onBack?: () => void;
}

export const ProfileScreen = ({ 
  activeTab = 'profile',
  onTabChange,
  onGameCenterClick,
  onLogout,
  onBadgesClick,
  onGameSelect,
  userId,
  userData,
  onBack,
}: ProfileScreenProps = {}) => {
  const { isDarkMode, toggleDarkMode } = useTheme();
  const { coins: contextCoins, rewardAction } = useCoins();
  const isViewingOtherUser = !!userId && !!userData;
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [selectedBadge, setSelectedBadge] = useState<Badge | null>(null);
  const [showAllBadges, setShowAllBadges] = useState(false);
  const [isRotated, setIsRotated] = useState(false);
  const [selectedRole, setSelectedRole] = useState<typeof allRoles[0] | null>(null);
  const [referralUrl, setReferralUrl] = useState<string | null>(null);
  const [isGeneratingLink, setIsGeneratingLink] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [accordionValue, setAccordionValue] = useState<string>('');
  const [showContributions, setShowContributions] = useState(false);
  const [showFollowers, setShowFollowers] = useState(false);
  // Initialize formData based on whether viewing another user
  const getInitialFormData = () => {
    if (isViewingOtherUser && userData) {
      return {
        fullName: userData.name,
        email: 'user@example.com', // Other users' email is not shown
        phone: '+90 000 000 0000', // Other users' phone is not shown
        school: userData.school,
        department: userData.department,
        grade: '3. Sınıf',
        avatar: userData.avatar,
        followers: userData.followers,
        contributions: userData.contributions,
        currentPassword: '',
        newPassword: '',
      };
    }
    return {
    fullName: 'Fatih Yılmaz',
    email: 'fatih.yilmaz@ogrenci.selcuk.edu.tr',
    phone: '+90 532 123 4567',
    school: 'Selçuk Üniversitesi',
    department: 'Hukuk Fakültesi',
    grade: '3. Sınıf',
      avatar: 'https://images.unsplash.com/photo-1600178572204-6ac8886aae63?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBwb3J0cmFpdCUyMHN0dWRlbnR8ZW58MXx8fHwxNzY0MjU5MzU4fDA&ixlib=rb-4.1.0&q=80&w=1080',
      followers: 342,
      contributions: 89,
      currentPassword: '',
      newPassword: '',
    };
  };

  const [formData, setFormData] = useState(getInitialFormData);

  // Update formData when viewing another user
  React.useEffect(() => {
    if (isViewingOtherUser && userData) {
      setFormData({
        fullName: userData.name,
        email: 'user@example.com',
        phone: '+90 000 000 0000',
        school: userData.school,
        department: userData.department,
        grade: '3. Sınıf',
        avatar: userData.avatar,
        followers: userData.followers,
        contributions: userData.contributions,
    currentPassword: '',
    newPassword: '',
  });
    } else if (!isViewingOtherUser) {
      // Reset to default user data
      setFormData({
        fullName: 'Fatih Yılmaz',
        email: 'fatih.yilmaz@ogrenci.selcuk.edu.tr',
        phone: '+90 532 123 4567',
        school: 'Selçuk Üniversitesi',
        department: 'Hukuk Fakültesi',
        grade: '3. Sınıf',
        avatar: 'https://images.unsplash.com/photo-1600178572204-6ac8886aae63?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBwb3J0cmFpdCUyMHN0dWRlbnR8ZW58MXx8fHwxNzY0MjU5MzU4fDA&ixlib=rb-4.1.0&q=80&w=1080',
        followers: 342,
        contributions: 89,
        currentPassword: '',
        newPassword: '',
      });
    }
  }, [isViewingOtherUser, userData]);
  
  // User Stats (Demo Data) - Different coins for different users
  const userCoins = isViewingOtherUser && userData?.coins 
    ? userData.coins 
    : (contextCoins || 6240); // Use context coins if available
  const roleData = getUserRole(userCoins);
  const progressPercentage = roleData.nextLimit 
    ? (roleData.current / roleData.nextLimit) * 100 
    : 100;

  // Calculate unlocked badges based on coins
  const badgesWithStatus = ALL_BADGES.map(badge => {
    const status = getBadgeUnlockStatus(badge.id, userCoins);
    return {
      ...badge,
      unlocked: status.unlocked,
      unlockedDate: status.unlockedDate || badge.unlockedDate
    };
  });

  const unlockedBadges = badgesWithStatus.filter(b => b.unlocked);
  const lockedBadges = badgesWithStatus.filter(b => !b.unlocked);

  // Role descriptions
  const roleDescriptions: Record<string, string> = {
    "Yeni Gelen": "KonyaGenç'e hoş geldin! Bu senin ilk adımın. Uygulamayı keşfetmeye başladığın bu aşamada, her aktivite ile GençCoin kazanabilirsin. İçerik üret, yorum yap, oyunlar oyna ve topluluğa katıl. 500 GençCoin'e ulaştığında Seyyah rütbesine terfi edeceksin!",
    "Seyyah": "Yolculuğa başladın! 500 GençCoin topladın ve artık %20 daha fazla coin kazanıyorsun. Konya'nın farklı köşelerini keşfetmeye devam et. Wiki'ye bilgi ekle, post paylaş, etkinliklere katıl. 2.500 GençCoin'e ulaştığında Gezgin olacaksın!",
    "Gezgin": "Aktif bir KonyaGenç kullanıcısısın! 2.500 GençCoin ile gezginler arasındasın ve artık %50 daha fazla coin kazanıyorsun. Topluluğa değer katmaya devam et. Kaliteli içerikler üret, diğer kullanıcılara yardımcı ol. 10.000 GençCoin'e ulaştığında Kaşif Meraklısı olacaksın!",
    "Kaşif Meraklısı": "Konya'nın derinliklerini keşfediyorsun! 10.000 GençCoin ile kaşiflerdensin ve artık 2 kat daha fazla coin kazanıyorsun. Wiki'ye önemli bilgiler ekle, topluluğa liderlik et, etkinlikler düzenle. 50.000 GençCoin'e ulaştığında Konya Bilgesi olacaksın!",
    "Konya Bilgesi": "Konya'nın her yerini biliyorsun! 50.000 GençCoin ile bilgeler arasındasın ve artık 2.5 kat daha fazla coin kazanıyorsun. Bu en yüksek rütbe! Sen KonyaGenç'in en deneyimli ve değerli kullanıcılarındansın. Topluluğa rehberlik etmeye devam et!"
  };

  // All roles data
  const allRoles = [
    { title: "Yeni Gelen", multiplier: "1.0x", limit: 500, minCoins: 0 },
    { title: "Seyyah", multiplier: "1.2x", limit: 2500, minCoins: 500 },
    { title: "Gezgin", multiplier: "1.5x", limit: 10000, minCoins: 2500 },
    { title: "Kaşif Meraklısı", multiplier: "2.0x", limit: 50000, minCoins: 10000 },
    { title: "Konya Bilgesi", multiplier: "2.5x", limit: null, minCoins: 50000 },
  ];

  // Categorize roles
  const pastRoles = allRoles.filter(role => userCoins >= (role.limit || Infinity));
  const currentRole = allRoles.find(role => role.title === roleData.title);
  const futureRoles = allRoles.filter(role => 
    userCoins < role.minCoins && role.title !== roleData.title
  );

  // Sort roles: Past Roles (hidden initially) -> Current Role (visible first) -> Future Roles
  const roles = [
    ...pastRoles,
    ...(currentRole ? [currentRole] : []),
    ...futureRoles
  ];

  // Carousel state
  const [activeSlide, setActiveSlide] = React.useState(0);
  const desktopCarouselRef = React.useRef<HTMLDivElement>(null);
  const mobileCarouselRef = React.useRef<HTMLDivElement>(null);

  // Initialize active slide to current role and scroll to it
  React.useEffect(() => {
    const currentIndex = roles.findIndex(role => role.title === roleData.title);
    if (currentIndex >= 0) {
      setActiveSlide(currentIndex);
      
      // Scroll to current role in desktop carousel
      setTimeout(() => {
        if (desktopCarouselRef.current) {
          const cards = desktopCarouselRef.current.querySelectorAll('[data-active]');
          const activeCard = cards[currentIndex] as HTMLElement;
          if (activeCard) {
            activeCard.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
          }
        }
        
        // Scroll to current role in mobile carousel
        if (mobileCarouselRef.current) {
          const cards = mobileCarouselRef.current.querySelectorAll('.snap-center');
          const activeCard = cards[currentIndex] as HTMLElement;
          if (activeCard) {
            activeCard.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
          }
        }
      }, 100);
    }
  }, [roles, roleData.title]);

  // Referral Link Generation Handler
  const handleGenerateLink = async () => {
    if (referralUrl) {
      // If link already exists, copy it
      await handleCopyLink();
      return;
    }

    // Generate link
    setIsGeneratingLink(true);
    const referralCode = "FATIH1453"; // Kullanıcıya özel kod
    const generatedUrl = `https://konyagenc.com/register?ref=${referralCode}`;
    
    // Simulate link generation delay with animation
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setReferralUrl(generatedUrl);
    setIsGeneratingLink(false);
    
    // Add 100 coins for generating referral link
    const result = rewardAction(CoinActionType.REFERRAL_LINK_GENERATE);
    if (result.success) {
      toast.success(`Link oluşturuldu! +${result.reward} GençCoin kazandınız!`);
    } else {
      toast.success('Link oluşturuldu!');
    }
  };

  // Copy Link Handler
  const handleCopyLink = async () => {
    if (!referralUrl) return;

    try {
      await navigator.clipboard.writeText(referralUrl);
      setIsCopied(true);
      toast.success('Link kopyalandı!');
      
      // Reset copied state after 2 seconds
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    } catch (err) {
      console.error('❌ Clipboard copy failed:', err);
      toast.error('Kopyalama başarısız oldu');
    }
  };

  // Show Contributions Screen
  if (showContributions) {
    return (
      <ContributionsScreen
        onBack={() => setShowContributions(false)}
        activeTab={activeTab}
        onTabChange={onTabChange}
        onGameCenterClick={onGameCenterClick}
        onGameSelect={onGameSelect}
        onWalletOpen={() => setIsWalletModalOpen(true)}
      />
    );
  }

  // Show Followers Screen
  if (showFollowers) {
    return (
      <FollowersScreen
        onBack={() => setShowFollowers(false)}
        activeTab={activeTab}
        onTabChange={onTabChange}
        onGameCenterClick={onGameCenterClick}
        onGameSelect={onGameSelect}
        onWalletOpen={() => setIsWalletModalOpen(true)}
      />
    );
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-[#0f0e17]' : 'bg-[#f2f3f7]'} pb-20 lg:pb-6 transition-colors`}>
      
      {/* Global Header */}
      <GlobalHeader 
        type="rich"
        onWalletClick={undefined} // Disable wallet click on profile page
        onSearchClick={() => console.log('🔍 Search clicked')}
        onFilterClick={() => console.log('🎯 Filter clicked')}
        activeTab={activeTab}
        onTabChange={onTabChange}
        onGameCenterClick={onGameCenterClick}
      />

      {/* Main Container */}
      <div className="max-w-[1200px] mx-auto pt-[120px] lg:pt-[84px] mt-0 px-0 lg:px-6">
          <main className="w-full px-0">
            {/* Back Button for Other User Profile */}
            {isViewingOtherUser && onBack && (
              <div className="mb-6 px-4 lg:px-0">
                <button
                  onClick={onBack}
                  className={`flex items-center gap-2 ${isDarkMode ? 'text-slate-400 hover:text-white' : 'text-[#8279a5] hover:text-[#19142e]'} transition-colors`}
                >
                  <ChevronLeft className="w-5 h-5" strokeWidth={2.5} />
                  <span className="font-bold">Geri</span>
                </button>
              </div>
            )}
        
        {/* 1. HERO SECTION - Banner + Avatar */}
        <div className="relative">
          {/* Banner Image */}
          <div className="h-[180px] w-full overflow-hidden relative lg:rounded-t-[12px]">
            <ImageWithFallback 
              src="https://images.unsplash.com/photo-1759185609631-da691e799d4b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMGdlb21ldHJpYyUyMHZpb2xldCUyMHB1cnBsZSUyMGdyYWRpZW50fGVufDF8fHx8MTc2NDI1OTM1NXww&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Profile Banner"
              className="w-full h-full object-cover"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#5852c4]/80 to-[#19142e]/80" />
            
            {/* Decorative Pattern Overlay */}
            <div 
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
              }}
            />
          </div>

          {/* Mobile: Centered Avatar, Desktop: Left-aligned Avatar */}
          <div className="absolute left-1/2 -translate-x-1/2 lg:left-8 lg:translate-x-0 -bottom-16">
            <div className="relative">
              {/* Border Ring */}
              <div className={`w-32 h-32 rounded-full p-1.5 shadow-[0_8px_32px_rgba(25,20,46,0.24)] ${
                isDarkMode ? 'bg-[#1a1a2e]' : 'bg-white'
              }`}>
                <ImageWithFallback 
                  src={formData.avatar}
                  alt={formData.fullName}
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
              
              {/* Online Status Indicator */}
              <div className={`absolute bottom-2 right-2 w-5 h-5 bg-emerald-500 border-4 rounded-full shadow-md ${
                isDarkMode ? 'border-[#1a1a2e]' : 'border-white'
              }`} />
            </div>
          </div>
        </div>

        {/* Identity Section + Card + Roles: Mobile: Stack, Desktop: Side-by-Side */}
        <div className="pt-20 pb-6 px-4 lg:px-8">
          {/* User Info - Full Width */}
          <div className="text-center lg:text-left mb-6">
            <h1 className={`text-3xl font-black ${isDarkMode ? 'text-white' : 'text-[#19142e]'} mb-1 break-words`}>{formData.fullName}</h1>
            <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-[#8279a5]'} font-semibold mb-4`}>{formData.school.split(' ')[0]} Üni. - {formData.department.split(' ')[0]}</p>
            
            {/* Stats Row */}
            <div className="flex items-center gap-4 justify-center lg:justify-start">
              <button
                onClick={() => setShowFollowers(true)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all hover:scale-105 active:scale-95 cursor-pointer ${isDarkMode ? 'bg-slate-800/50 hover:bg-slate-800' : 'bg-[#f2f3f7] hover:bg-[#e5e7eb]'}`}
              >
                <Users className="w-4 h-4 text-[#5852c4]" strokeWidth={2.5} />
                <span className={`font-bold ${isDarkMode ? 'text-white' : 'text-[#19142e]'}`}>{formData.followers}</span>
                <span className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-[#8279a5]'}`}>Takipçi</span>
              </button>
              <button
                onClick={() => setShowContributions(true)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all hover:scale-105 active:scale-95 cursor-pointer ${isDarkMode ? 'bg-slate-800/50 hover:bg-slate-800' : 'bg-[#f2f3f7] hover:bg-[#e5e7eb]'}`}
              >
                <TrendingUp className="w-4 h-4 text-[#5852c4]" strokeWidth={2.5} />
                <span className={`font-bold ${isDarkMode ? 'text-white' : 'text-[#19142e]'}`}>{formData.contributions}</span>
                <span className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-[#8279a5]'}`}>Katkı</span>
              </button>
            </div>
          </div>

          {/* 60/30 Layout: Solda Gezgin kartları + Davet (%60), Sağda Kart (%30) */}
          {!isViewingOtherUser && (
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Sol Yarı: Gezgin Kartları + Davet Alanı (%60) */}
            <div className="w-full lg:w-[60%] flex flex-col gap-6">

              {/* ROLE & MULTIPLIER CAROUSEL - Desktop Only */}
              <div className="hidden lg:block flex-1">
                <div 
                  ref={desktopCarouselRef}
                  className="overflow-x-auto scrollbar-hide pb-2" 
                  style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                  <div className="flex gap-4">
                    {roles.map((role, index) => {
                      const isCurrentRole = role.title === roleData.title;
                      const isPastRole = userCoins >= (role.limit || Infinity);
                      const isFutureRole = userCoins < role.minCoins;
                      
                      // Calculate progress for current role
                      let roleProgress = 0;
                      if (isCurrentRole && role.limit) {
                        const range = role.limit - role.minCoins;
                        roleProgress = range > 0 ? Math.min(100, Math.max(0, ((userCoins - role.minCoins) / range) * 100)) : 0;
                      } else if (isPastRole) {
                        roleProgress = 100;
                      }

                      return (
                        <div 
                          key={index}
                          data-active={isCurrentRole}
                          onClick={() => setSelectedRole(role)}
                          className={`flex-shrink-0 w-[280px] rounded-xl p-4 transition-all duration-300 relative cursor-pointer hover:scale-[1.02] active:scale-[0.98]
                            ${isCurrentRole 
                              ? 'border-2 border-[#5852c4] shadow-[0_8px_24px_rgba(88,82,196,0.25)]' 
                              : isPastRole 
                              ? `border ${isDarkMode ? 'border-slate-600' : 'border-gray-300'} opacity-60` 
                              : 'border border-[#5852c4]/30 opacity-50'
                            }`}
                          style={{ 
                            backgroundColor: isCurrentRole 
                              ? (isDarkMode ? '#2a2449' : '#F8F7FF')
                              : (isDarkMode ? '#1a1a2e' : '#f9fafb')
                          }}
                        >
                            {/* Lock Icon for Future Roles */}
                            {isFutureRole && (
                              <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-gray-400/90 flex items-center justify-center shadow-md">
                                <Lock className="w-4 h-4 text-white" strokeWidth={2.5} />
                              </div>
                            )}

                            {/* Header: Role Name + Multiplier */}
                            <div className="flex items-center justify-between mb-3">
                              <div className="flex items-center gap-2">
                                <Compass className={`w-5 h-5 ${isCurrentRole ? 'text-[#5852c4]' : 'text-gray-400'}`} strokeWidth={2.5} />
                                <span className={`font-black ${
                                  isCurrentRole 
                                    ? (isDarkMode ? 'text-white' : 'text-[#19142e]')
                                    : (isDarkMode ? 'text-slate-400' : 'text-gray-600')
                                }`}>
                                  {role.title}
                                </span>
                              </div>

                              {/* Multiplier Badge */}
                              {!isFutureRole && (
                                <div className={`px-3 py-1 rounded-full ${isCurrentRole ? 'bg-[#5852c4] shadow-lg shadow-[#5852c4]/30' : 'bg-gray-400'}`}>
                                  <span className="text-white font-black text-xs">{role.multiplier}</span>
                                </div>
                              )}
                            </div>

                            {/* Progress Bar */}
                            <div className={`h-2.5 rounded-full overflow-hidden shadow-inner mb-2 ${
                              isDarkMode ? 'bg-slate-800/60' : 'bg-white/60'
                            }`}>
                              <div 
                                className={`h-full rounded-full transition-all duration-700 ${
                                  (isCurrentRole || isPastRole)
                                    ? 'bg-gradient-to-r from-[#5852c4] via-[#7c3aed] to-[#06b6d4]' 
                                    : 'bg-gray-400'
                                }`}
                                style={{ width: `${roleProgress}%` }}
                              />
                            </div>

                            {/* Stats Row */}
                            <div className="flex items-center justify-between">
                              <span className={`text-sm font-bold ${
                                isCurrentRole 
                                  ? (isDarkMode ? 'text-white' : 'text-[#19142e]')
                                  : (isDarkMode ? 'text-slate-400' : 'text-gray-600')
                              }`}>
                                {isCurrentRole ? userCoins.toLocaleString() : role.minCoins.toLocaleString()} / {role.limit?.toLocaleString() || '∞'}
                              </span>
                              <span className={`text-sm font-bold ${isCurrentRole ? 'text-[#5852c4]' : 'text-gray-500'}`}>
                                %{Math.round(roleProgress)}
                              </span>
                            </div>
                          </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* REFERRAL WIDGET - Desktop Only (Below Role Carousel) - Only show for own profile */}
              <div className="hidden lg:block">
                <div 
                  className="rounded-xl p-5 border-2 border-dashed border-[#5852c4]/40 shadow-sm relative overflow-hidden"
                  style={{ 
                    background: isDarkMode 
                      ? 'linear-gradient(135deg, #2a2449 0%, #1a1a2e 100%)'
                      : 'linear-gradient(135deg, #F8F7FF 0%, #ffffff 100%)'
                  }}
                >
                  {/* Magical Glow Effect */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#5852c4]/10 to-transparent rounded-full blur-3xl" />
                  
                  {/* Content Row */}
                  <div className="relative flex items-center gap-4">
                    {/* Left: Icon */}
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-[#5852c4] flex items-center justify-center shadow-lg shadow-[#5852c4]/30">
                      <Gift className="w-6 h-6 text-white" strokeWidth={2.5} />
                    </div>

                    {/* Center: Text */}
                    <div className="flex-1">
                      <h4 className={`font-black mb-0.5 ${isDarkMode ? 'text-white' : 'text-[#19142e]'}`}>Arkadaşını Davet Et</h4>
                      <p className={`text-xs font-semibold ${isDarkMode ? 'text-slate-400' : 'text-gray-600'}`}>İkiniz de 100 GençCoin Kazanın!</p>
                    </div>

                    {/* Right: CTA Button */}
                    <button 
                      onClick={handleGenerateLink}
                      disabled={isGeneratingLink}
                      className="flex-shrink-0 px-5 py-2.5 rounded-full bg-[#5852c4] hover:bg-[#6c5ce7] active:scale-95 transition-all shadow-lg shadow-[#5852c4]/30 disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                      {isGeneratingLink ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                          />
                          <span className="text-sm font-black text-white whitespace-nowrap">Link oluşturuluyor...</span>
                        </>
                      ) : referralUrl ? (
                        <>
                          {isCopied ? (
                            <>
                              <Check className="w-4 h-4 text-white" strokeWidth={2.5} />
                              <span className="text-sm font-black text-white whitespace-nowrap">Kopyalandı!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-4 h-4 text-white" strokeWidth={2.5} />
                              <span className="text-sm font-black text-white whitespace-nowrap">Kopyala</span>
                            </>
                          )}
                        </>
                      ) : (
                        <span className="text-sm font-black text-white whitespace-nowrap">Linki Paylaş</span>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Sağ Yarı: Genç Kültür Kart (%30) */}
            <div className="w-full lg:w-[40%] flex justify-end">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative w-full"
              >
                <TooltipProvider>
                  {/* Card Container - Horizontal Card (Full Width) */}
                  <div className="relative w-full h-[248px] rounded-xl overflow-hidden shadow-[0_20px_60px_rgba(25,20,46,0.25)]">
        
                    {/* Violet Gradient Background with Depth */}
                    <div className="absolute inset-0 violet-gradient" />

                    {/* Neon Purple/Pink Geometric Triangles Pattern */}
                    <div className="absolute inset-0 opacity-30">
                      {/* Triangle 1 - Purple */}
                      <div className="absolute top-[10%] left-[15%] w-24 h-24 rotate-45">
                        <div className="w-full h-full bg-gradient-to-br from-purple-400 to-pink-400 opacity-60 blur-xl" 
                             style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }} />
                      </div>
                      
                      {/* Triangle 2 - Pink */}
                      <div className="absolute top-[50%] right-[10%] w-32 h-32 -rotate-12">
                        <div className="w-full h-full bg-gradient-to-br from-pink-400 to-purple-500 opacity-50 blur-2xl" 
                             style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }} />
                      </div>
                      
                      {/* Triangle 3 - Purple */}
                      <div className="absolute bottom-[15%] left-[20%] w-20 h-20 rotate-[135deg]">
                        <div className="w-full h-full bg-gradient-to-br from-purple-500 to-violet-400 opacity-70 blur-xl" 
                             style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }} />
                      </div>

                      {/* Additional floating shapes for depth */}
                      <div className="absolute top-[30%] left-[50%] w-16 h-16 rotate-45 bg-gradient-to-br from-fuchsia-400 to-purple-400 opacity-30 blur-2xl rounded-lg" />
                      <div className="absolute bottom-[30%] right-[30%] w-20 h-20 -rotate-12 bg-gradient-to-br from-violet-400 to-pink-400 opacity-40 blur-xl" />
                    </div>

                    {/* Subtle inner glow effect (Cuberto signature) */}
                    <div className="absolute inset-0 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]" />

                    {/* Content Layer - Horizontal Layout */}
                    <div className="relative z-10 h-full p-6 flex items-center justify-between text-[#f4f4f4]">
                      
                      {/* Left Side: Logo & User Info */}
                      <div className="flex-1 flex flex-col justify-between h-full">
                        {/* Top: Logo */}
                        <div>
                          <div className="text-xs font-bold tracking-wider opacity-95">GENÇ KÜLTÜR KART</div>
                          <div className="text-[10px] font-medium text-white/70 mt-0.5">Konya Büyükşehir</div>
                        </div>
                        
                        {/* Middle: Balance */}
                        <div>
                          <div className="text-sm font-medium text-white/70 mb-1">Toplam Bakiye</div>
                          <div className="flex items-baseline gap-2">
                            <span className="text-4xl font-black tracking-tight">{userCoins.toLocaleString()}</span>
                            <span className="text-lg font-bold text-white/90">GençCoin</span>
                          </div>
                        </div>

                        {/* Bottom: User Info */}
                        <div>
                          <div className="text-xs font-bold tracking-wide break-words">{formData.fullName}</div>
                          <div className="text-[10px] text-white/60 mt-1 font-mono tracking-wider">**** **** **** 1453</div>
                        </div>
                      </div>

                      {/* Right Side: Action Buttons & QR Code */}
                      <div className="flex flex-col items-end justify-between h-full">
                        {/* Action Buttons with Tooltips */}
                        <div className="flex items-center gap-2">
                          {/* Transfer/Contact Button */}
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <button 
                                onClick={() => {
                                  console.log('💳 Coin aktarımı başlatıldı');
                                  toast.success('Coin aktarımı başlatıldı');
                                }}
                                className="w-10 h-10 rounded-lg bg-white/15 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-white/25 transition-all active:scale-95"
                              >
                                <ArrowLeftRight className="w-5 h-5 text-white/90" strokeWidth={2} />
                              </button>
                            </TooltipTrigger>
                            <TooltipContent side="bottom" sideOffset={8}>
                              <p>Coin Aktar</p>
                            </TooltipContent>
                          </Tooltip>

                          {/* History Button */}
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <button 
                                onClick={() => {
                                  console.log('📜 Geçmiş İşlemler açıldı');
                                  toast.success('Geçmiş işlemler açıldı');
                                }}
                                className="w-10 h-10 rounded-lg bg-white/15 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-white/25 transition-all active:scale-95"
                              >
                                <Clock className="w-5 h-5 text-white/90" strokeWidth={2} />
                              </button>
                            </TooltipTrigger>
                            <TooltipContent side="bottom" sideOffset={8}>
                              <p>Geçmiş</p>
                            </TooltipContent>
                          </Tooltip>
                        </div>
                        
                        {/* QR Code Icon */}
                        <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-md">
                          <div className="w-10 h-10 bg-[#19142e] rounded-lg flex items-center justify-center">
                            <QrCode className="w-6 h-6 text-white" strokeWidth={2} />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Glossy Reflection Effect (Premium Touch) */}
                    <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/8 to-transparent pointer-events-none" />
                  </div>
                </TooltipProvider>
              </motion.div>
            </div>
          </div>
          )}
        </div>

        {/* ROLE & MULTIPLIER CAROUSEL - Mobile Only */}
        <div className="mb-12 lg:hidden px-4">
          <div 
            ref={mobileCarouselRef}
            className="overflow-x-auto scrollbar-hide flex gap-4 pb-2 snap-x snap-mandatory"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {roles.map((role, index) => {
              const isCurrentRole = role.title === roleData.title;
              const isPastRole = userCoins >= (role.limit || Infinity);
              const isFutureRole = userCoins < role.minCoins;
              
              // Calculate progress for current role
              let roleProgress = 0;
              if (isCurrentRole && role.limit) {
                const range = role.limit - role.minCoins;
                roleProgress = range > 0 ? Math.min(100, Math.max(0, ((userCoins - role.minCoins) / range) * 100)) : 0;
              } else if (isPastRole) {
                roleProgress = 100;
              }

              return (
                <div key={index} className="flex-shrink-0 w-[calc(100vw-56px)] snap-center">
                  <div 
                    data-active={isCurrentRole}
                    onClick={() => setSelectedRole(role)}
                    className={`rounded-2xl p-5 transition-all duration-300 relative cursor-pointer hover:scale-[1.01] active:scale-[0.99]
                      ${isCurrentRole 
                        ? 'border-[3px] border-[#5852c4] shadow-[0_8px_24px_rgba(88,82,196,0.2)]' 
                        : isPastRole 
                        ? `border-2 ${isDarkMode ? 'border-slate-600' : 'border-gray-300'} opacity-60` 
                        : 'border-2 border-[#5852c4]/30 opacity-50'
                      }`}
                    style={{ 
                      backgroundColor: isCurrentRole 
                        ? (isDarkMode ? '#2a2449' : '#F8F7FF')
                        : (isDarkMode ? '#1a1a2e' : '#f9fafb')
                    }}
                  >
                    {/* Lock Icon for Future Roles */}
                    {isFutureRole && (
                      <div className="absolute top-3 right-3 w-10 h-10 rounded-full bg-gray-400/90 flex items-center justify-center shadow-md">
                        <Lock className="w-5 h-5 text-white" strokeWidth={2.5} />
                      </div>
                    )}

                    {/* Header: Role Name + Multiplier */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Compass className={`w-5 h-5 ${isCurrentRole ? 'text-[#5852c4]' : 'text-gray-400'}`} strokeWidth={2.5} />
                        <span className={`text-xl font-black ${
                          isCurrentRole 
                            ? (isDarkMode ? 'text-white' : 'text-[#19142e]')
                            : (isDarkMode ? 'text-slate-400' : 'text-gray-600')
                        }`}>
                          {role.title}
                        </span>
                      </div>

                      {/* Multiplier Badge */}
                      {!isFutureRole && (
                        <div className={`px-3 py-1.5 rounded-full ${isCurrentRole ? 'bg-[#5852c4] shadow-lg shadow-[#5852c4]/30' : 'bg-gray-400'}`}>
                          <span className="text-white font-black text-xs">{role.multiplier} Çarpan</span>
                        </div>
                      )}
                    </div>

                    {/* Progress Bar */}
                    <div className={`h-2.5 rounded-full overflow-hidden shadow-inner mb-2 ${
                      isDarkMode ? 'bg-slate-800/60' : 'bg-white/60'
                    }`}>
                      <div 
                        className={`h-full rounded-full transition-all duration-700 ${
                          (isCurrentRole || isPastRole)
                            ? 'bg-gradient-to-r from-[#5852c4] via-[#7c3aed] to-[#06b6d4]' 
                            : 'bg-gray-400'
                        }`}
                        style={{ width: `${roleProgress}%` }}
                      />
                    </div>

                    {/* Stats Row */}
                    <div className="flex items-center justify-between">
                      <span className={`text-sm font-bold ${
                        isCurrentRole 
                          ? (isDarkMode ? 'text-white' : 'text-[#19142e]')
                          : (isDarkMode ? 'text-slate-400' : 'text-gray-600')
                      }`}>
                        {isCurrentRole ? userCoins.toLocaleString() : role.minCoins.toLocaleString()} / {role.limit?.toLocaleString() || '∞'} Coin
                      </span>
                      <span className={`text-sm font-bold ${isCurrentRole ? 'text-[#5852c4]' : 'text-gray-500'}`}>
                        %{Math.round(roleProgress)}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* REFERRAL WIDGET (Davet Kartı) - Mobile Only */}
        <div className="px-5 mb-8 lg:hidden">
          <div 
            className="rounded-xl p-5 border-2 border-dashed border-[#5852c4]/40 shadow-sm relative overflow-hidden"
            style={{ 
              background: isDarkMode 
                ? 'linear-gradient(135deg, #2a2449 0%, #1a1a2e 100%)'
                : 'linear-gradient(135deg, #F8F7FF 0%, #ffffff 100%)'
            }}
          >
            {/* Magical Glow Effect */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#5852c4]/10 to-transparent rounded-full blur-3xl" />
            
            {/* Content Grid */}
            <div className="relative grid gap-4">
              {/* Top Row: Icon + Text */}
              <div className="flex items-center gap-4">
                {/* Icon */}
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-[#5852c4] flex items-center justify-center shadow-lg shadow-[#5852c4]/30">
                  <Gift className="w-6 h-6 text-white" strokeWidth={2.5} />
                </div>

                {/* Text */}
                <div className="flex-1">
                  <h4 className={`font-black mb-0.5 ${isDarkMode ? 'text-white' : 'text-[#19142e]'}`}>Arkadaşını Davet Et</h4>
                  <p className={`text-xs font-semibold ${isDarkMode ? 'text-slate-400' : 'text-gray-600'}`}>İkiniz de 100 GençCoin Kazanın!</p>
                </div>
              </div>

              {/* Bottom Row: CTA Button (Full Width) */}
              <button 
                onClick={handleGenerateLink}
                disabled={isGeneratingLink}
                className="w-full px-5 py-3 rounded-xl bg-[#5852c4] hover:bg-[#6c5ce7] active:scale-95 transition-all shadow-lg shadow-[#5852c4]/30 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isGeneratingLink ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                    />
                    <span className="font-black text-white">Link oluşturuluyor...</span>
                  </>
                ) : referralUrl ? (
                  <>
                    {isCopied ? (
                      <>
                        <Check className="w-4 h-4 text-white" strokeWidth={2.5} />
                        <span className="font-black text-white">Kopyalandı!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 text-white" strokeWidth={2.5} />
                        <span className="font-black text-white">Kopyala</span>
                      </>
                    )}
                  </>
                ) : (
                  <span className="font-black text-white">Linki Paylaş</span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* BADGES SECTION */}
        <div className="px-5 mb-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <h3 className={`text-lg font-black ${isDarkMode ? 'text-white' : 'text-[#19142e]'}`}>Rozetlerim</h3>
            <button 
              onClick={() => setShowAllBadges(true)}
              className={`text-sm font-bold transition-colors active:scale-95 ${
                isDarkMode 
                  ? 'text-[#5852c4] hover:text-white' 
                  : 'text-[#5852c4] hover:text-[#19142e]'
              }`}
            >
              Tümünü Gör
            </button>
          </div>

          {/* Horizontal Badge Row */}
          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
            {badgesWithStatus.slice(0, 7).map((badge) => {
              const isUnlocked = badge.unlocked;
              return (
                <button
                  key={badge.id}
                  onClick={() => isUnlocked && setSelectedBadge(badge)}
                  className={`flex-shrink-0 flex flex-col items-center gap-3 transition-transform ${
                    isUnlocked ? 'cursor-pointer group active:scale-95' : 'cursor-not-allowed'
                  }`}
                >
                  {/* Badge Circle */}
                  <div 
                    className={`w-32 h-32 flex items-center justify-center transition-all relative ${
                      isUnlocked ? 'group-hover:scale-110' : ''
                    }`}
                  >
                    <img 
                      src={badge.image} 
                      alt={badge.name} 
                      className="w-full h-full object-contain"
                      style={{
                        mixBlendMode: isDarkMode ? 'normal' : 'multiply'
                      }}
                    />
                    {/* Lock Icon for Locked Badges */}
                    {!isUnlocked && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-12 h-12 rounded-full bg-gray-400/90 flex items-center justify-center shadow-lg">
                          <Lock className="w-6 h-6 text-white" strokeWidth={2.5} />
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Badge Name */}
                  <span className={`text-xs font-bold text-center max-w-[128px] ${
                    isDarkMode ? 'text-slate-400' : 'text-[#8279a5]'
                  }`}>
                    {badge.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 5. ACTION MENU - Vertical List */}
        <div className="px-5 mb-8">
          <div className={`${isDarkMode ? 'bg-[#1a1a2e]' : 'bg-white'} rounded-lg shadow-[0_4px_16px_rgba(25,20,46,0.06)] overflow-hidden transition-colors`}>
            
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className={`w-full px-5 py-4 flex items-center justify-between border-b ${
                isDarkMode ? 'border-slate-700 hover:bg-slate-800/50' : 'border-[#f2f3f7] hover:bg-[#f2f3f7]'
              } transition-colors`}
            >
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-lg ${
                  isDarkMode ? 'bg-amber-500/20 text-amber-400' : 'bg-slate-700/10 text-slate-700'
                } flex items-center justify-center transition-colors`}>
                  {isDarkMode ? (
                    <Sun className="w-5 h-5" strokeWidth={2.5} />
                  ) : (
                    <Moon className="w-5 h-5" strokeWidth={2.5} />
                  )}
                </div>
                <div className="text-left">
                  <span className={`font-bold ${isDarkMode ? 'text-white' : 'text-[#19142e]'}`}>
                    {isDarkMode ? 'Koyu Mod' : 'Aydınlık Mod'}
                  </span>
                  <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-[#8279a5]'} mt-0.5`}>
                    {isDarkMode ? 'Aydınlık moda geç' : 'Koyu moda geç'}
                  </p>
                </div>
              </div>
              <div className={`w-12 h-6 rounded-full transition-colors ${
                isDarkMode ? 'bg-amber-500' : 'bg-slate-300'
              } relative`}>
                <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-md transition-transform ${
                  isDarkMode ? 'translate-x-6' : 'translate-x-0.5'
                }`} />
              </div>
            </button>

            {/* Accordion for Personal Details - Only show for own profile */}
            {!isViewingOtherUser && (
            <Accordion type="single" collapsible value={accordionValue} onValueChange={setAccordionValue}>
              <AccordionItem value="settings" className={`border-b ${isDarkMode ? 'border-slate-700' : 'border-[#f2f3f7]'}`}>
                <AccordionTrigger className={`px-5 py-4 transition-colors ${
                  isDarkMode 
                    ? 'hover:bg-slate-800/50 [&[data-state=open]]:bg-slate-800/50' 
                    : 'hover:bg-[#f2f3f7] [&[data-state=open]]:bg-[#f2f3f7]'
                }`}>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-[#5852c4]/10 flex items-center justify-center text-[#5852c4]">
                      <Edit3 className="w-5 h-5" strokeWidth={2.5} />
                    </div>
                    <span className={`font-bold ${isDarkMode ? 'text-white' : 'text-[#19142e]'}`}>Kişisel Detaylar</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className={`px-5 pb-6 pt-2 ${isDarkMode ? 'bg-[#1a1a2e]' : ''} overflow-visible`}>
                  <div className="space-y-4 min-h-[400px]">
                    {/* Personal Info Section */}
                    <div className="space-y-3">
                      <h3 className={`font-bold text-sm ${isDarkMode ? 'text-white' : 'text-[#19142e]'}`}>Kişisel Bilgiler</h3>
                      
                      <div className="space-y-2">
                        <Label htmlFor="avatar" className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-[#8279a5]'}`}>Profil Fotoğrafı URL</Label>
                        <Input
                          id="avatar"
                          type="url"
                          value={formData.avatar}
                          onChange={(e) => setFormData({...formData, avatar: e.target.value})}
                          onFocus={(e) => {
                            e.currentTarget.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                          }}
                          className={`rounded-lg min-h-[40px] ${isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'border-[#ededff]'}`}
                          placeholder="https://..."
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="fullName" className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-[#8279a5]'}`}>Ad Soyad</Label>
                        <Input
                          id="fullName"
                          value={formData.fullName}
                          onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                          onFocus={(e) => {
                            e.currentTarget.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                          }}
                          className={`rounded-lg min-h-[40px] ${isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'border-[#ededff]'}`}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email" className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-[#8279a5]'}`}>E-posta</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          onFocus={(e) => {
                            e.currentTarget.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                          }}
                          className={`rounded-lg min-h-[40px] ${isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'border-[#ededff]'}`}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone" className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-[#8279a5]'}`}>Telefon</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({...formData, phone: e.target.value})}
                          onFocus={(e) => {
                            e.currentTarget.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                          }}
                          className={`rounded-lg min-h-[40px] ${isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'border-[#ededff]'}`}
                        />
                      </div>
                    </div>

                    {/* Education Info Section */}
                    <div className={`space-y-3 pt-4 border-t ${isDarkMode ? 'border-slate-700' : 'border-[#f2f3f7]'}`}>
                      <h3 className={`font-bold text-sm ${isDarkMode ? 'text-white' : 'text-[#19142e]'}`}>Eğitim Bilgileri</h3>
                      
                      <div className="space-y-2">
                        <Label htmlFor="school" className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-[#8279a5]'}`}>Üniversite</Label>
                        <Input
                          id="school"
                          value={formData.school}
                          onChange={(e) => setFormData({...formData, school: e.target.value})}
                          onFocus={(e) => {
                            e.currentTarget.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                          }}
                          className={`rounded-lg min-h-[40px] ${isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'border-[#ededff]'}`}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="department" className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-[#8279a5]'}`}>Bölüm</Label>
                        <Input
                          id="department"
                          value={formData.department}
                          onChange={(e) => setFormData({...formData, department: e.target.value})}
                          onFocus={(e) => {
                            e.currentTarget.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                          }}
                          className={`rounded-lg min-h-[40px] ${isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'border-[#ededff]'}`}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="grade" className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-[#8279a5]'}`}>Sınıf</Label>
                        <Input
                          id="grade"
                          value={formData.grade}
                          onChange={(e) => setFormData({...formData, grade: e.target.value})}
                          onFocus={(e) => {
                            e.currentTarget.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                          }}
                          className={`rounded-lg min-h-[40px] ${isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'border-[#ededff]'}`}
                        />
                      </div>
                    </div>

                    {/* Password Section */}
                    <div className={`space-y-3 pt-4 border-t ${isDarkMode ? 'border-slate-700' : 'border-[#f2f3f7]'}`}>
                      <h3 className={`font-bold text-sm ${isDarkMode ? 'text-white' : 'text-[#19142e]'}`}>Şifre Değiştir</h3>
                      
                      <div className="space-y-2">
                        <Label htmlFor="currentPassword" className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-[#8279a5]'}`}>Mevcut Şifre</Label>
                        <div className="relative">
                          <Input
                            id="currentPassword"
                            type={showPassword ? "text" : "password"}
                            value={formData.currentPassword}
                            onChange={(e) => setFormData({...formData, currentPassword: e.target.value})}
                            onFocus={(e) => {
                              e.currentTarget.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                            }}
                            className={`rounded-lg pr-10 min-h-[40px] ${isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'border-[#ededff]'}`}
                            placeholder="••••••••"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className={`absolute right-3 top-1/2 -translate-y-1/2 ${isDarkMode ? 'text-slate-400 hover:text-[#5852c4]' : 'text-[#8279a5] hover:text-[#5852c4]'}`}
                          >
                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="newPassword" className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-[#8279a5]'}`}>Yeni Şifre</Label>
                        <div className="relative">
                          <Input
                            id="newPassword"
                            type={showNewPassword ? "text" : "password"}
                            value={formData.newPassword}
                            onChange={(e) => setFormData({...formData, newPassword: e.target.value})}
                            onFocus={(e) => {
                              e.currentTarget.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                            }}
                            className={`rounded-lg pr-10 min-h-[40px] ${isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'border-[#ededff]'}`}
                            placeholder="••••••••"
                          />
                          <button
                            type="button"
                            onClick={() => setShowNewPassword(!showNewPassword)}
                            className={`absolute right-3 top-1/2 -translate-y-1/2 ${isDarkMode ? 'text-slate-400 hover:text-[#5852c4]' : 'text-[#8279a5] hover:text-[#5852c4]'}`}
                          >
                            {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Save Button */}
                    <Button
                      onClick={() => {
                        toast.success('Bilgileriniz başarıyla güncellendi!');
                        setAccordionValue(''); // Close accordion after save
                      }}
                      className="w-full mt-4 bg-[#5852c4] hover:bg-[#4842a4] text-white rounded-lg"
                    >
                      <Save className="w-4 h-4 mr-2" />
                      Değişiklikleri Kaydet
                    </Button>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            )}

            {/* Logout (Destructive - Red) - Only show for own profile */}
            {!isViewingOtherUser && (
            <button 
              onClick={onLogout}
              className={`w-full px-5 py-4 flex items-center justify-between transition-colors group ${
                isDarkMode ? 'hover:bg-red-900/20' : 'hover:bg-red-50'
              }`}
            >
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-red-500 group-hover:scale-110 transition-transform ${
                  isDarkMode ? 'bg-red-900/20' : 'bg-red-50'
                }`}>
                  <LogOut className="w-5 h-5" strokeWidth={2.5} />
                </div>
                <span className="font-bold text-red-500">Çıkış Yap</span>
              </div>
              <ChevronRight className="w-5 h-5 text-red-400" strokeWidth={2.5} />
            </button>
            )}
          </div>
        </div>
        </main>
      </div>

      {/* Wallet Modal */}
      <WalletModal 
        isOpen={isWalletModalOpen}
        onClose={() => setIsWalletModalOpen(false)}
        isCardConnected={true}
        userFullName={formData.fullName}
      />

      {/* Badge Detail Modal */}
      <AnimatePresence>
        {selectedBadge && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center px-5"
            onClick={() => setSelectedBadge(null)}
          >
            {/* Backdrop Blur */}
            <div className="absolute inset-0 bg-black/40 backdrop-blur-md" />

            {/* Modal Card */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className={`relative rounded-2xl shadow-2xl max-w-sm w-full overflow-hidden ${
                isDarkMode ? 'bg-[#1a1a2e]' : 'bg-white'
              }`}
            >
              {/* Header Gradient */}
              <div className="bg-gradient-to-br from-[#5852c4] to-[#8B5CF6] px-6 py-8 text-center relative overflow-hidden">
                {/* Badge Image */}
                <motion.div 
                  className="relative mx-auto w-64 h-64 mb-4 cursor-pointer"
                  onClick={() => setIsRotated(!isRotated)}
                  animate={{ rotate: isRotated ? 180 : 0 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                >
                  <img 
                    src={selectedBadge.image} 
                    alt={selectedBadge.name}
                    className="w-full h-full object-contain"
                  />
                </motion.div>

                {/* Badge Name */}
                <h2 className="text-2xl font-black text-white mb-1">{selectedBadge.name}</h2>
                
                {/* Unlock Status */}
                {selectedBadge.unlocked ? (
                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-sm">
                    <div className="w-2 h-2 rounded-full bg-[#10B981]" />
                    <span className="text-xs font-bold text-white">Kazanıldı</span>
                  </div>
                ) : (
                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-sm">
                    <span className="text-xs font-bold text-white">Kilitli</span>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="px-6 py-6 space-y-4">
                {/* Description */}
                <div>
                  <h3 className="text-xs font-black text-[#8279a5] uppercase tracking-wide mb-2">
                    Açıklama
                  </h3>
                  <p className="text-sm text-[#19142e] leading-relaxed font-semibold">
                    {selectedBadge.description}
                  </p>
                </div>

                {/* Requirement */}
                <div>
                  <h3 className="text-xs font-black text-[#8279a5] uppercase tracking-wide mb-2">
                    Nasıl Kazanılır?
                  </h3>
                  <p className="text-sm text-[#19142e] leading-relaxed font-semibold">
                    {selectedBadge.requirement}
                  </p>
                </div>

                {/* Unlock Date */}
                {selectedBadge.unlocked && selectedBadge.unlockedDate && (
                  <div>
                    <h3 className="text-xs font-black text-[#8279a5] uppercase tracking-wide mb-2">
                      Kazanma Tarihi
                    </h3>
                    <p className="text-sm text-[#19142e] font-bold">
                      {selectedBadge.unlockedDate}
                    </p>
                  </div>
                )}
              </div>

              {/* Close Button */}
              <div className="px-6 pb-6">
                <button
                  onClick={() => {
                    setSelectedBadge(null);
                    setIsRotated(false);
                  }}
                  className="w-full py-3 rounded-xl bg-[#5852c4] hover:bg-[#6c5ce7] active:scale-95 transition-all shadow-lg shadow-[#5852c4]/30"
                >
                  <span className="text-sm font-black text-white">Kapat</span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* All Badges Modal */}
      <AnimatePresence>
        {showAllBadges && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center px-5"
            onClick={() => setShowAllBadges(false)}
          >
            {/* Backdrop Blur */}
            <div className="absolute inset-0 bg-black/40 backdrop-blur-md" />

            {/* Modal Card */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className={`relative rounded-2xl shadow-2xl w-full max-w-5xl max-h-[85vh] overflow-hidden flex flex-col ${
                isDarkMode ? 'bg-[#1a1a2e]' : 'bg-white'
              }`}
            >
              {/* Header */}
              <div className="bg-gradient-to-br from-[#5852c4] to-[#8B5CF6] px-6 py-6 text-center">
                <h2 className="text-2xl font-black text-white">Tüm Rozetler</h2>
                <p className="text-sm text-white/80 font-semibold mt-1">
                  {unlockedBadges.length} / {badgesWithStatus.length} rozet kazanıldı
                </p>
              </div>

              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto px-6 py-6">
                {/* Unlocked Badges */}
                {unlockedBadges.length > 0 && (
                  <div className="mb-8">
                    <h3 className={`text-base font-black mb-4 ${isDarkMode ? 'text-white' : 'text-[#19142e]'}`}>
                      Kazanılan Rozetler
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
                      {unlockedBadges.map((badge) => (
                        <button
                          key={badge.id}
                          onClick={() => {
                            setSelectedBadge(badge);
                            setShowAllBadges(false);
                          }}
                          className={`flex flex-col items-center gap-4 p-6 rounded-xl hover:bg-[#ededff] active:scale-95 transition-all group ${
                            isDarkMode ? 'bg-[#0f0e17]' : 'bg-[#f2f3f7]'
                          }`}
                        >
                          <div className="relative">
                            <div className="w-32 h-32 flex items-center justify-center transition-all group-hover:scale-105">
                              <img 
                                src={badge.image} 
                                alt={badge.name} 
                                className="w-full h-full object-contain"
                                style={{
                                  mixBlendMode: isDarkMode ? 'normal' : 'multiply'
                                }}
                              />
                            </div>
                          </div>
                          <div className="text-center">
                            <span className={`text-sm font-black block mb-1 ${isDarkMode ? 'text-white' : 'text-[#19142e]'}`}>
                              {badge.name}
                            </span>
                            <p className={`text-xs font-semibold ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>
                              {badge.unlockedDate}
                            </p>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Locked Badges */}
                {lockedBadges.length > 0 && (
                  <div>
                    <h3 className={`text-base font-black mb-4 ${isDarkMode ? 'text-white' : 'text-[#19142e]'}`}>
                      Kilitli Rozetler
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
                      {lockedBadges.map((badge) => (
                        <button
                          key={badge.id}
                          onClick={() => {
                            setSelectedBadge(badge);
                            setShowAllBadges(false);
                          }}
                          className={`flex flex-col items-center gap-4 p-6 rounded-xl hover:bg-[#ededff] active:scale-95 transition-all group ${
                            isDarkMode ? 'bg-[#0f0e17]' : 'bg-[#f2f3f7]'
                          }`}
                        >
                          <div className="relative">
                            <div className="w-32 h-32 flex items-center justify-center transition-all group-hover:scale-105">
                              <img 
                                src={badge.image} 
                                alt={badge.name} 
                                className="w-full h-full object-contain"
                                style={{
                                  mixBlendMode: isDarkMode ? 'normal' : 'multiply'
                                }}
                              />
                            </div>
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="w-12 h-12 rounded-full bg-gray-400 flex items-center justify-center shadow-lg">
                                <Lock className="w-6 h-6 text-white" strokeWidth={2.5} />
                              </div>
                            </div>
                          </div>
                          <div className="text-center">
                            <span className="text-sm font-black text-gray-400 block mb-2">
                              {badge.name}
                            </span>
                            <p className={`text-xs font-semibold leading-relaxed ${isDarkMode ? 'text-slate-500' : 'text-gray-500'}`}>
                              {badge.requirement}
                            </p>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Close Button */}
              <div className="px-6 pb-6">
                <button
                  onClick={() => setShowAllBadges(false)}
                  className="w-full py-3 rounded-xl bg-[#5852c4] hover:bg-[#6c5ce7] active:scale-95 transition-all shadow-lg shadow-[#5852c4]/30"
                >
                  <span className="text-sm font-black text-white">Kapat</span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Role Detail Modal */}
      <AnimatePresence>
        {selectedRole && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center px-5"
            onClick={() => setSelectedRole(null)}
          >
            {/* Backdrop Blur */}
            <div className="absolute inset-0 bg-black/40 backdrop-blur-md" />

            {/* Modal Card */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className={`relative rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden ${
                isDarkMode ? 'bg-[#1a1a2e]' : 'bg-white'
              }`}
            >
              {/* Header Gradient */}
              <div className="bg-gradient-to-br from-[#5852c4] to-[#8B5CF6] px-6 py-6 text-center relative overflow-hidden">
                {/* Role Card (Same Design) */}
                <div className="max-w-sm mx-auto">
                  {(() => {
                    const isCurrentRole = selectedRole.title === roleData.title;
                    const isPastRole = userCoins >= (selectedRole.limit || Infinity);
                    const isFutureRole = userCoins < selectedRole.minCoins;
                    
                    // Calculate progress for selected role
                    let roleProgress = 0;
                    if (isCurrentRole && selectedRole.limit) {
                      const range = selectedRole.limit - selectedRole.minCoins;
                      roleProgress = range > 0 ? Math.min(100, Math.max(0, ((userCoins - selectedRole.minCoins) / range) * 100)) : 0;
                    } else if (isPastRole) {
                      roleProgress = 100;
                    }

                    return (
                      <div 
                        className={`rounded-xl p-5 transition-all duration-300 relative
                          ${isCurrentRole 
                            ? 'border-2 border-white/50 shadow-[0_8px_24px_rgba(255,255,255,0.2)]' 
                            : 'border border-white/30 opacity-80'
                          }`}
                        style={{ 
                          backgroundColor: 'rgba(255, 255, 255, 0.1)',
                          backdropFilter: 'blur(10px)'
                        }}
                      >
                        {/* Lock Icon for Future Roles */}
                        {isFutureRole && (
                          <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-md">
                            <Lock className="w-4 h-4 text-white" strokeWidth={2.5} />
                          </div>
                        )}

                        {/* Header: Role Name + Multiplier */}
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <Compass className="w-5 h-5 text-white" strokeWidth={2.5} />
                            <span className="font-black text-white text-lg">
                              {selectedRole.title}
                            </span>
                          </div>

                          {/* Multiplier Badge */}
                          {!isFutureRole && (
                            <div className="px-3 py-1 rounded-full bg-white/30 backdrop-blur-sm">
                              <span className="text-white font-black text-xs">{selectedRole.multiplier}</span>
                            </div>
                          )}
                        </div>

                        {/* Progress Bar */}
                        <div className="h-2.5 rounded-full overflow-hidden shadow-inner mb-2 bg-white/20">
                          <div 
                            className={`h-full rounded-full transition-all duration-700 ${
                              (isCurrentRole || isPastRole)
                                ? 'bg-gradient-to-r from-[#5852c4] via-[#7c3aed] to-[#06b6d4]'
                                : 'bg-white/30'
                            }`}
                            style={{ width: `${roleProgress}%` }}
                          />
                        </div>

                        {/* Stats Row */}
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-bold text-white/90">
                            {isCurrentRole ? userCoins.toLocaleString() : selectedRole.minCoins.toLocaleString()} / {selectedRole.limit?.toLocaleString() || '∞'}
                          </span>
                          <span className="text-sm font-bold text-white/90">
                            %{Math.round(roleProgress)}
                          </span>
                        </div>
                      </div>
                    );
                  })()}
                </div>
              </div>

              {/* Content */}
              <div className="px-6 py-6 space-y-4">
                {/* Description */}
                <div>
                  <h3 className={`text-xs font-black uppercase tracking-wide mb-3 ${
                    isDarkMode ? 'text-slate-400' : 'text-[#8279a5]'
                  }`}>
                    Rol Açıklaması
                  </h3>
                  <p className={`text-sm leading-relaxed font-semibold ${
                    isDarkMode ? 'text-slate-300' : 'text-[#19142e]'
                  }`}>
                    {roleDescriptions[selectedRole.title] || 'Bu rol hakkında bilgi bulunmuyor.'}
                  </p>
                </div>

                {/* Role Benefits */}
                <div className={`pt-4 border-t ${
                  isDarkMode ? 'border-slate-700' : 'border-[#f2f3f7]'
                }`}>
                  <h3 className={`text-xs font-black uppercase tracking-wide mb-3 ${
                    isDarkMode ? 'text-slate-400' : 'text-[#8279a5]'
                  }`}>
                    Rol Avantajları
                  </h3>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <div className={`w-1.5 h-1.5 rounded-full mt-2 ${
                        isDarkMode ? 'bg-[#5852c4]' : 'bg-[#5852c4]'
                      }`} />
                      <p className={`text-sm font-semibold ${
                        isDarkMode ? 'text-slate-300' : 'text-[#19142e]'
                      }`}>
                        <span className="font-black text-[#5852c4]">{selectedRole.multiplier}</span> coin çarpanı ile daha fazla GençCoin kazanırsın
                      </p>
                    </div>
                    {(() => {
                      const isCurrentRole = selectedRole.title === roleData.title;
                      const isPastRole = userCoins >= (selectedRole.limit || Infinity);
                      const isFutureRole = userCoins < selectedRole.minCoins;
                      const nextRole = allRoles.find(r => r.minCoins === selectedRole.limit);
                      
                      if (selectedRole.limit && !isPastRole) {
                        const coinsNeeded = isCurrentRole 
                          ? selectedRole.limit - userCoins
                          : selectedRole.limit - selectedRole.minCoins;
                        return (
                          <div className="flex items-start gap-2">
                            <div className={`w-1.5 h-1.5 rounded-full mt-2 ${
                              isDarkMode ? 'bg-[#5852c4]' : 'bg-[#5852c4]'
                            }`} />
                            <p className={`text-sm font-semibold ${
                              isDarkMode ? 'text-slate-300' : 'text-[#19142e]'
                            }`}>
                              {isCurrentRole ? (
                                <>Bir sonraki role ({nextRole?.title || 'Sonraki Rol'}) ulaşmak için <span className="font-black text-[#5852c4]">{coinsNeeded.toLocaleString()}</span> GençCoin daha kazanmalısın</>
                              ) : (
                                <>Bu role ulaşmak için <span className="font-black text-[#5852c4]">{(selectedRole.minCoins - userCoins).toLocaleString()}</span> GençCoin daha kazanmalısın</>
                              )}
                            </p>
                          </div>
                        );
                      }
                      if (!selectedRole.limit || isPastRole) {
                        return (
                          <div className="flex items-start gap-2">
                            <div className={`w-1.5 h-1.5 rounded-full mt-2 ${
                              isDarkMode ? 'bg-[#5852c4]' : 'bg-[#5852c4]'
                            }`} />
                            <p className={`text-sm font-semibold ${
                              isDarkMode ? 'text-slate-300' : 'text-[#19142e]'
                            }`}>
                              {!selectedRole.limit 
                                ? 'Bu en yüksek rol! Artık maksimum coin çarpanına sahipsin'
                                : 'Bu rolü tamamladın! Artık bir sonraki role geçebilirsin'
                              }
                            </p>
                          </div>
                        );
                      }
                      return null;
                    })()}
                  </div>
                </div>
              </div>

              {/* Close Button */}
              <div className="px-6 pb-6">
                <button
                  onClick={() => setSelectedRole(null)}
                  className="w-full py-3 rounded-xl bg-[#5852c4] hover:bg-[#6c5ce7] active:scale-95 transition-all shadow-lg shadow-[#5852c4]/30"
                >
                  <span className="text-sm font-black text-white">Kapat</span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Animations */}
      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }

        /* Hide scrollbar for carousel */
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};
