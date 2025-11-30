import React from 'react';
import { ChevronLeft, Users, UserPlus } from 'lucide-react';
import { GlobalHeader } from '../layout/GlobalHeader';
import { RightSidebar } from '../layout/RightSidebar';
import { useTheme } from '../../contexts/ThemeContext';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { ProfileScreen } from './ProfileScreen';

interface FollowersScreenProps {
  onBack: () => void;
  activeTab?: string;
  onTabChange?: (tab: string) => void;
  onGameCenterClick?: () => void;
  onGameSelect?: (gameId: string) => void;
  onWalletOpen?: () => void;
  onUserClick?: (userId: number) => void;
}

// Mock data - Followers
const mockFollowers = [
  {
    id: 1,
    name: 'Ahmet Demir',
    username: '@ahmetdemir',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&h=120&fit=crop',
    school: 'Selçuk Üniversitesi',
    department: 'Mühendislik',
    isFollowing: true,
    followers: 123,
    contributions: 45,
    coins: 850 // Seyyah seviyesi
  },
  {
    id: 2,
    name: 'Ayşe Kaya',
    username: '@aysekaya',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&h=120&fit=crop',
    school: 'NEÜ',
    department: 'Tıp',
    isFollowing: false,
    followers: 89,
    contributions: 67,
    coins: 1500 // Seyyah seviyesi
  },
  {
    id: 3,
    name: 'Mehmet Yılmaz',
    username: '@mehmetyilmaz',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop',
    school: 'KTO Karatay',
    department: 'İşletme',
    isFollowing: true,
    followers: 234,
    contributions: 123,
    coins: 3500 // Gezgin seviyesi
  },
  {
    id: 4,
    name: 'Zeynep Öz',
    username: '@zeynepoz',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&h=120&fit=crop',
    school: 'Selçuk Üniversitesi',
    department: 'Edebiyat',
    isFollowing: false,
    followers: 156,
    contributions: 89,
    coins: 7500 // Gezgin seviyesi
  },
  {
    id: 5,
    name: 'Can Arslan',
    username: '@canarslan',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&h=120&fit=crop',
    school: 'NEÜ',
    department: 'Hukuk',
    isFollowing: true,
    followers: 345,
    contributions: 234,
    coins: 15000 // Kaşif Meraklısı seviyesi
  }
];

export const FollowersScreen = ({
  onBack,
  activeTab = 'profile',
  onTabChange,
  onGameCenterClick,
  onGameSelect,
  onWalletOpen,
  onUserClick
}: FollowersScreenProps) => {
  const { isDarkMode } = useTheme();
  const [followers, setFollowers] = React.useState(mockFollowers);
  const [selectedUserId, setSelectedUserId] = React.useState<number | null>(null);

  // Show user profile if a user is selected
  if (selectedUserId) {
    const selectedUser = mockFollowers.find(f => f.id === selectedUserId);
    if (selectedUser) {
      return (
        <ProfileScreen
          activeTab={activeTab}
          onTabChange={onTabChange}
          onGameCenterClick={onGameCenterClick}
          onGameSelect={onGameSelect}
          userId={selectedUserId}
          userData={selectedUser}
          onBack={() => setSelectedUserId(null)}
        />
      );
    }
  }

  const handleFollowToggle = (id: number) => {
    setFollowers(followers.map(f => 
      f.id === id ? { ...f, isFollowing: !f.isFollowing } : f
    ));
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-[#0f0e17]' : 'bg-[#f2f3f7]'} pb-20 lg:pb-6 transition-colors`}>
      <GlobalHeader 
        type="rich"
        onWalletClick={onWalletOpen}
        onSearchClick={() => console.log('🔍 Search clicked')}
        onFilterClick={() => console.log('🎯 Filter clicked')}
        activeTab={activeTab}
        onTabChange={onTabChange}
        onGameCenterClick={onGameCenterClick}
      />

      <div className="max-w-[1200px] mx-auto pt-[120px] lg:pt-[84px] px-0 lg:px-6">
        <div className="flex gap-6">
          
          {/* LEFT COLUMN - Main Content (70%) */}
          <main className="w-full lg:w-[70%]">
            {/* Header */}
            <div className="mb-6 px-4 lg:px-0">
              <button
                onClick={onBack}
                className={`flex items-center gap-2 mb-4 ${isDarkMode ? 'text-slate-400 hover:text-white' : 'text-[#8279a5] hover:text-[#19142e]'} transition-colors`}
              >
                <ChevronLeft className="w-5 h-5" strokeWidth={2.5} />
                <span className="font-bold">Geri</span>
              </button>
              <div className="flex items-center gap-3 mb-2">
                <Users className={`w-8 h-8 ${isDarkMode ? 'text-[#5852c4]' : 'text-[#5852c4]'}`} strokeWidth={2.5} />
                <h1 className={`text-3xl font-black ${isDarkMode ? 'text-white' : 'text-[#19142e]'}`}>Takipçiler</h1>
              </div>
              <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-[#8279a5]'}`}>
                {followers.length} kişi seni takip ediyor
              </p>
            </div>

            {/* Followers List */}
            <div className="space-y-3 px-4 lg:px-0">
              {followers.map((follower) => (
                <div
                  key={follower.id}
                  onClick={() => {
                    if (onUserClick) {
                      onUserClick(follower.id);
                    } else {
                      setSelectedUserId(follower.id);
                    }
                  }}
                  className={`rounded-xl p-4 ${isDarkMode ? 'bg-[#1a1a2e]' : 'bg-white'} shadow-[0_2px_12px_rgba(25,20,46,0.08)] hover:shadow-[0_4px_20px_rgba(25,20,46,0.12)] transition-all cursor-pointer`}
                >
                  <div className="flex items-center gap-4">
                    {/* Avatar */}
                    <ImageWithFallback
                      src={follower.avatar}
                      alt={follower.name}
                      className="w-14 h-14 rounded-full object-cover flex-shrink-0"
                    />

                    {/* User Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className={`font-bold ${isDarkMode ? 'text-white' : 'text-[#19142e]'} mb-1 truncate`}>
                        {follower.name}
                      </h3>
                      <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-[#8279a5]'} mb-2`}>
                        {follower.username} • {follower.school.split(' ')[0]} - {follower.department}
                      </p>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <Users className={`w-3 h-3 ${isDarkMode ? 'text-slate-400' : 'text-[#8279a5]'}`} strokeWidth={2.5} />
                          <span className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-[#8279a5]'}`}>
                            {follower.followers}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <UserPlus className={`w-3 h-3 ${isDarkMode ? 'text-slate-400' : 'text-[#8279a5]'}`} strokeWidth={2.5} />
                          <span className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-[#8279a5]'}`}>
                            {follower.contributions} katkı
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Follow Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleFollowToggle(follower.id);
                      }}
                      className={`px-4 py-2 rounded-lg font-bold text-sm whitespace-nowrap transition-all ${
                        follower.isFollowing
                          ? isDarkMode
                            ? 'bg-slate-700 text-white hover:bg-slate-600'
                            : 'bg-[#f2f3f7] text-[#19142e] hover:bg-[#e5e7eb]'
                          : 'bg-[#5852c4] text-white hover:bg-[#6c5ce7] shadow-lg shadow-[#5852c4]/30'
                      }`}
                    >
                      {follower.isFollowing ? 'Takip Ediliyor' : 'Takip Et'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </main>

          {/* RIGHT COLUMN - Sticky Sidebar (30%) - Desktop Only */}
          <RightSidebar 
            onProfileClick={() => onTabChange?.('profile')}
            onWalletOpen={onWalletOpen}
            onGameClick={onGameSelect}
            onGameCenterClick={onGameCenterClick}
          />
        </div>
      </div>
    </div>
  );
};

