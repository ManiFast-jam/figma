import React, { useState } from 'react';
import { 
  Coins, 
  Info, 
  CheckCircle2, 
  Trophy, 
  Reply, 
  ArrowRight, 
  FileText, 
  MessageCircle, 
  Eye, 
  Heart,
  TrendingUp,
  Calendar,
  Activity as ActivityIcon,
  Award,
  Users,
  Edit3,
  Clock,
  Zap
} from 'lucide-react';
import { GlobalHeader } from '../layout/GlobalHeader';
import { WalletModal } from '../wallet/WalletModal';
import { useTheme } from '../../contexts/ThemeContext';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { MOCK_COMMENTS } from '../../data/mockComments';
import { MiniProfileCard } from '../sidebar/MiniProfileCard';
import { TrendingVertical } from '../sidebar/TrendingVertical';
import { SuggestedGames } from '../sidebar/SuggestedGames';

// Mock Posts Data - For navigation
const MOCK_POSTS = [
  {
    id: '1',
    title: 'Selçuk Hukuk Final Notları (Anayasa)',
    category: 'akademik',
    user: 'Ahmet K.',
    role: 'Bilge',
    badge: 'Akademik',
    content: 'Anayasa hukuku finali için hazırladığım özet notlar. Drive linki aşağıda, herkese başarılar! Eksik gördüğünüz yerleri yorumlarda belirtin lütfen.',
    upvotes: 124,
    comments: 42,
    timeAgo: '2s önce',
    avatarColor: 'bg-blue-600'
  },
  {
    id: '2',
    title: 'En İyi Etli Ekmek Nerede Yenir?',
    category: 'yeme-icme',
    user: 'Ayşe Y.',
    role: 'Gezgin',
    badge: 'Yeme-İçme',
    content: 'Arkadaşlar İstanbul\'dan misafirlerim gelecek, şöyle gerçekten çıtır çıtır ve uygun fiyatlı, öğrenci dostu önerisi olan var mı?',
    upvotes: 89,
    comments: 56,
    timeAgo: '5s önce',
    avatarColor: 'bg-amber-500'
  },
  {
    id: '8',
    title: 'Alaaddin Tepesi Gün Batımı 🌅',
    category: 'sosyal',
    user: 'Selin Aydın',
    role: 'Seyyah',
    badge: 'Sosyal',
    content: 'Akşam 6\'da Alaaddin Tepesi\'nde gün batımı izleyeceğiz. Yanında çay, simit gelsin! Hava çok güzel bugün, kaçırmayın.',
    upvotes: 92,
    comments: 47,
    timeAgo: '8s önce',
    avatarColor: 'bg-purple-600'
  }
];

// Mock Users Data - Shared across all activities
const MOCK_USERS = [
  {
    id: 1,
    name: 'Ahmet Yılmaz',
    initials: 'AY',
    username: '@ahmetyilmaz',
    color: 'bg-blue-600',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&h=120&fit=crop',
    school: 'Selçuk Üniversitesi',
    department: 'Mühendislik'
  },
  {
    id: 2,
    name: 'Mehmet Demir',
    initials: 'MD',
    username: '@mehmetdemir',
    color: 'bg-emerald-600',
    avatar: 'https://i.pravatar.cc/150?img=12',
    school: 'KTO Karatay',
    department: 'İşletme'
  },
  {
    id: 3,
    name: 'Zeynep Kaya',
    initials: 'ZK',
    username: '@zeynepkaya',
    color: 'bg-purple-600',
    avatar: 'https://i.pravatar.cc/150?img=47',
    school: 'Selçuk Üniversitesi',
    department: 'Edebiyat'
  },
  {
    id: 4,
    name: 'Ayşe Türk',
    initials: 'AT',
    username: '@ayseturk',
    color: 'bg-pink-600',
    avatar: null,
    school: 'NEÜ',
    department: 'Tıp'
  },
  {
    id: 5,
    name: 'Can Özkan',
    initials: 'CÖ',
    username: '@canozkan',
    color: 'bg-indigo-600',
    avatar: null,
    school: 'NEÜ',
    department: 'Hukuk'
  },
  {
    id: 6,
    name: 'Ali Veli',
    initials: 'AV',
    username: '@aliveli',
    color: 'bg-teal-600',
    avatar: 'https://i.pravatar.cc/150?img=15',
    school: 'Selçuk Üniversitesi',
    department: 'Mühendislik'
  }
];

// Activity Filter Types
type ActivityFilter = 'all' | 'comments' | 'likes' | 'rewards' | 'contributions' | 'social';

// Statistics Data
const STATS_DATA = {
  today: {
    coins: 120,
    activities: 8,
    interactions: 12
  }
};

// Activity Types Configuration
const ACTIVITY_TYPES = {
  comment: { icon: MessageCircle, color: '#5852c4', bg: 'bg-purple-100 dark:bg-purple-900/20' },
  like: { icon: Heart, color: '#EF4444', bg: 'bg-red-100 dark:bg-red-900/20' },
  reward: { icon: Coins, color: '#F59E0B', bg: 'bg-amber-100 dark:bg-amber-900/20' },
  wiki_edit: { icon: FileText, color: '#10B981', bg: 'bg-emerald-100 dark:bg-emerald-900/20' },
  follow: { icon: Users, color: '#3B82F6', bg: 'bg-blue-100 dark:bg-blue-900/20' },
  achievement: { icon: Award, color: '#8B5CF6', bg: 'bg-violet-100 dark:bg-violet-900/20' },
  post: { icon: Edit3, color: '#5852c4', bg: 'bg-purple-100 dark:bg-purple-900/20' }
};

// Comprehensive Activity Data
const ALL_ACTIVITIES = [
      { 
        id: 1, 
        type: 'reward', 
        title: 'Haftalık Seri Bonusu',
    description: 'Harika gidiyorsun! Bu hafta her gün giriş yaptığın için bonus kazandın.',
        amount: '+50 GC',
        time: '2 dk önce',
    timeFull: new Date(Date.now() - 2 * 60 * 1000),
    isRead: false,
    category: 'rewards'
      },
      { 
        id: 2, 
    type: 'comment',
        userId: 1, // Ahmet Yılmaz
        user: MOCK_USERS[0].name.split(' ')[0] + ' ' + MOCK_USERS[0].name.split(' ')[1].charAt(0) + '.',
        userInitials: MOCK_USERS[0].initials,
        userColor: MOCK_USERS[0].color,
        text: 'yorumuna cevap verdi.',
        postId: '8', // Alaaddin Tepesi post
        commentId: 'c8-1',
    postPreview: 'Alaaddin Tepesi Gün Batımı 🌅',
        time: '15 dk önce',
    timeFull: new Date(Date.now() - 15 * 60 * 1000),
    isRead: false,
    canReply: true,
    category: 'comments'
  },
  {
    id: 3,
    type: 'like',
    userId: 2, // Mehmet Demir (first user)
    user: 'Mehmet D.',
    userInitials: 'MD',
    userColor: 'bg-emerald-600',
    users: [
      { id: 2, name: 'Mehmet D.', initials: 'MD', color: 'bg-emerald-600', avatar: 'https://i.pravatar.cc/150?img=12' },
      { id: 1, name: 'Ahmet Y.', initials: 'AY', color: 'bg-blue-600' },
      { id: 3, name: 'Zeynep K.', initials: 'ZK', color: 'bg-purple-600', avatar: 'https://i.pravatar.cc/150?img=47' },
      { id: 4, name: 'Ayşe T.', initials: 'AT', color: 'bg-pink-600' },
      { id: 5, name: 'Can Ö.', initials: 'CÖ', color: 'bg-indigo-600' }
    ],
    postId: '1', // Selçuk Hukuk Final Notları post
    otherCount: 4,
    text: 've diğerleri gönderini beğendi.',
    postTitle: 'Selçuk Hukuk Final Notları (Anayasa)',
    postContent: 'Anayasa hukuku finali için hazırladığım özet notlar. Drive linki aşağıda...',
    postImage: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&h=300&fit=crop',
    time: '1 saat önce',
    timeFull: new Date(Date.now() - 60 * 60 * 1000),
    isRead: false,
    category: 'likes'
  },
  {
    id: 4,
    type: 'wiki_edit',
    title: 'Selçuk Hukuk Notları başlığını düzenledin',
    description: 'Bölüm 3 - Medeni Hukuk konularını ekledin',
    status: 'Onaylandı',
    statusColor: '#10b981',
    time: '2 saat önce',
    timeFull: new Date(Date.now() - 2 * 60 * 60 * 1000),
        isRead: false,
    category: 'contributions'
  },
  {
    id: 5,
    type: 'achievement',
    title: 'Yeni Rozet Kazandın!',
    description: 'İlk 10 Wiki düzenlemesini tamamladın',
    badgeName: 'Wiki Editörü',
    badgeIcon: '🏆',
    time: '3 saat önce',
    timeFull: new Date(Date.now() - 3 * 60 * 60 * 1000),
    isRead: false,
    category: 'rewards'
  },
  {
    id: 6,
    type: 'comment',
        userId: 3, // Zeynep Kaya
        user: 'Zeynep K.',
        userInitials: 'ZK',
        userColor: 'bg-purple-600',
        postId: '8', // Alaaddin Tepesi post
        commentId: 'c8-2',
    text: 'yorumuna cevap verdi.',
    postPreview: 'Alaaddin Tepesi Gün Batımı 🌅',
    time: '5 saat önce',
    timeFull: new Date(Date.now() - 5 * 60 * 60 * 1000),
        isRead: true,
    canReply: true,
    category: 'comments'
      },
      { 
    id: 7,
        type: 'reward', 
        title: 'Etkinlik Katılımı',
    description: 'Kampüs festivaline katılımın doğrulandı.',
        amount: '+120 GC',
    time: 'Dün',
    timeFull: new Date(Date.now() - 24 * 60 * 60 * 1000),
    isRead: true,
    category: 'rewards'
  },
  {
    id: 8,
    type: 'follow',
    userId: 4, // Ayşe Türk
    user: 'Ayşe T.',
    userInitials: 'AT',
    userColor: 'bg-pink-600',
    text: 'seni takip etmeye başladı.',
    time: 'Dün',
    timeFull: new Date(Date.now() - 24 * 60 * 60 * 1000),
    isRead: true,
    category: 'social'
  },
  {
    id: 9,
    type: 'like',
    userId: 5, // Can Özkan (first user)
    user: 'Can Ö.',
    userInitials: 'CÖ',
    userColor: 'bg-indigo-600',
    users: [
      { id: 5, name: 'Can Ö.', initials: 'CÖ', color: 'bg-indigo-600' },
      { id: 6, name: 'Ali V.', initials: 'AV', color: 'bg-teal-600', avatar: 'https://i.pravatar.cc/150?img=15' }
    ],
    postId: '2', // En İyi Etli Ekmek post
    otherCount: 1,
    text: 've diğeri gönderini beğendi.',
    postTitle: 'En İyi Etli Ekmek Nerede Yenir?',
    postContent: 'Arkadaşlar İstanbul\'dan misafirlerim gelecek, şöyle gerçekten çıtır çıtır...',
    postImage: 'https://images.unsplash.com/photo-1562774053-701939374585?w=400&h=300&fit=crop',
    time: '2 gün önce',
    timeFull: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        isRead: true,
    category: 'likes'
  },
  {
    id: 10,
    type: 'wiki_edit',
    title: 'KTO Karatay Üniversitesi başlığını oluşturdun',
    description: 'Yeni bir üniversite sayfası ekledin',
    status: 'Onaylandı',
    statusColor: '#10b981',
    time: '2 gün önce',
    timeFull: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    isRead: true,
    category: 'contributions'
  }
];

// Filter Options
const FILTER_OPTIONS: { value: ActivityFilter; label: string; icon: React.ElementType }[] = [
  { value: 'all', label: 'Tümü', icon: ActivityIcon },
  { value: 'comments', label: 'Yorumlar', icon: MessageCircle },
  { value: 'likes', label: 'Beğeniler', icon: Heart },
  { value: 'rewards', label: 'Ödüller', icon: Trophy },
  { value: 'contributions', label: 'Katkılarım', icon: FileText },
  { value: 'social', label: 'Sosyal', icon: Users }
];

interface NotificationsScreenProps {
  activeTab?: string;
  onTabChange?: (tab: string) => void;
  onGameCenterClick?: () => void;
  onPostClick?: (post: any, commentId?: string) => void;
  onProfileClick?: (userId: number) => void;
}

export const NotificationsScreen = ({ 
  activeTab = 'notifications',
  onTabChange,
  onGameCenterClick,
  onPostClick,
  onProfileClick,
}: NotificationsScreenProps = {}) => {
  const { isDarkMode } = useTheme();
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<ActivityFilter>('all');

  // Filter activities
  const filteredActivities = ALL_ACTIVITIES.filter(activity => {
    if (activeFilter === 'all') return true;
    return activity.category === activeFilter;
  });

  // Group activities by date
  const groupActivitiesByDate = () => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const weekAgo = new Date(today);
    weekAgo.setDate(weekAgo.getDate() - 7);

    const groups: { label: string; activities: typeof ALL_ACTIVITIES }[] = [];

    const todayActivities = filteredActivities.filter(a => a.timeFull >= today);
    const yesterdayActivities = filteredActivities.filter(a => a.timeFull >= yesterday && a.timeFull < today);
    const thisWeekActivities = filteredActivities.filter(a => a.timeFull >= weekAgo && a.timeFull < yesterday);

    if (todayActivities.length > 0) {
      groups.push({ label: 'BUGÜN', activities: todayActivities });
    }
    if (yesterdayActivities.length > 0) {
      groups.push({ label: 'DÜN', activities: yesterdayActivities });
    }
    if (thisWeekActivities.length > 0) {
      groups.push({ label: 'BU HAFTA', activities: thisWeekActivities });
    }

    return groups;
  };

  const activityGroups = groupActivitiesByDate();

  const renderActivityItem = (activity: typeof ALL_ACTIVITIES[0]) => {
    const activityType = ACTIVITY_TYPES[activity.type as keyof typeof ACTIVITY_TYPES];
    const IconComponent = activityType?.icon || Info;
    const iconColor = activityType?.color || '#8279a5';

    // REWARD TYPE
    if (activity.type === 'reward') {
      return (
        <div 
          key={activity.id}
          className={`w-full p-3 md:p-4 border-b last:border-b-0 flex items-center gap-3 md:gap-4 transition-all cursor-pointer ${
            isDarkMode 
              ? 'bg-[#1a1a2e] border-slate-700/50 hover:bg-slate-800/50' 
              : 'bg-white border-[#ededff] hover:bg-[#f2f3f7]'
          } ${!activity.isRead ? (isDarkMode ? 'bg-slate-800/30' : 'bg-purple-50/50') : ''}`}
        >
          <div className={`w-9 h-9 md:w-11 md:h-11 rounded-full flex items-center justify-center flex-shrink-0 ${activityType?.bg || ''}`}>
            <IconComponent className="w-4 h-4 md:w-5 md:h-5" style={{ color: iconColor }} strokeWidth={2.5} />
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
                <h4 className={`font-bold text-xs md:text-sm mb-0.5 line-clamp-1 ${isDarkMode ? 'text-white' : 'text-[#19142e]'}`}>
                  {activity.title}
                </h4>
                <p className={`text-[11px] md:text-xs line-clamp-1 ${isDarkMode ? 'text-slate-400' : 'text-[#8279a5]'}`}>
                  {activity.description}
                </p>
              </div>
              <span className="font-black text-emerald-600 text-xs md:text-sm flex-shrink-0">{activity.amount}</span>
            </div>
            <span className={`text-[10px] md:text-xs mt-0.5 block ${isDarkMode ? 'text-slate-500' : 'text-[#8279a5]'}`}>
              {activity.time}
            </span>
          </div>
          
          {!activity.isRead && (
            <div className="w-2 h-2 rounded-full bg-[#5852c4] flex-shrink-0 animate-pulse" />
          )}
        </div>
      );
    }

    // ACHIEVEMENT TYPE
    if (activity.type === 'achievement') {
      return (
        <div 
          key={activity.id}
          className={`w-full p-3 md:p-4 border-b last:border-b-0 flex items-center gap-3 md:gap-4 transition-all cursor-pointer ${
            isDarkMode 
              ? 'bg-[#1a1a2e] border-slate-700/50 hover:bg-slate-800/50' 
              : 'bg-white border-[#ededff] hover:bg-[#f2f3f7]'
          } ${!activity.isRead ? (isDarkMode ? 'bg-slate-800/30' : 'bg-purple-50/50') : ''}`}
        >
          <div className={`w-9 h-9 md:w-11 md:h-11 rounded-full flex items-center justify-center flex-shrink-0 ${activityType?.bg || ''} text-xl md:text-2xl`}>
            {activity.badgeIcon}
          </div>
          
          <div className="flex-1 min-w-0">
            <h4 className={`font-bold text-xs md:text-sm mb-0.5 line-clamp-1 ${isDarkMode ? 'text-white' : 'text-[#19142e]'}`}>
              {activity.title}
            </h4>
            <p className={`text-[11px] md:text-xs line-clamp-1 ${isDarkMode ? 'text-slate-400' : 'text-[#8279a5]'}`}>
              {activity.description}
            </p>
            {activity.badgeName && (
              <span className={`hidden md:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold mt-1 ${
                isDarkMode ? 'bg-violet-900/30 text-violet-300' : 'bg-violet-100 text-violet-700'
              }`}>
                <Award className="w-3 h-3" />
                {activity.badgeName}
              </span>
            )}
            <span className={`text-[10px] md:text-xs block mt-0.5 ${isDarkMode ? 'text-slate-500' : 'text-[#8279a5]'}`}>
              {activity.time}
            </span>
          </div>

          {!activity.isRead && (
            <div className="w-2 h-2 rounded-full bg-[#5852c4] flex-shrink-0 animate-pulse" />
          )}
        </div>
      );
    }

    // LIKE TYPE with multiple users (special layout)
    if (activity.type === 'like' && activity.users && activity.users.length > 0) {
      const firstUser = activity.users[0];
      const otherUsers = activity.users.slice(1, 6); // Show max 5 more avatars
      const totalCount = (activity.otherCount || 0) + activity.users.length;
      
      const handleClick = () => {
        if (activity.postId && onPostClick) {
          const post = MOCK_POSTS.find(p => p.id === activity.postId);
          if (post) {
            const now = new Date();
            const hours = now.getHours().toString().padStart(2, '0');
            const minutes = now.getMinutes().toString().padStart(2, '0');
            const postWithFullDate = {
              ...post,
              fullDate: `${hours}:${minutes} • ${now.toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })}`,
              likes: post.upvotes,
              comments: post.comments,
            };
            onPostClick(postWithFullDate);
          }
        }
      };

      return (
        <div 
          key={activity.id}
          onClick={handleClick}
          className={`w-full p-3 md:p-4 border-b last:border-b-0 transition-all cursor-pointer ${
            isDarkMode 
              ? 'bg-[#1a1a2e] border-slate-700/50 hover:bg-slate-800/50' 
              : 'bg-white border-[#ededff] hover:bg-[#f2f3f7]'
          } ${!activity.isRead ? (isDarkMode ? 'bg-slate-800/30' : 'bg-purple-50/50') : ''}`}
        >
          <div className="flex items-start gap-3 md:gap-4">
            {/* Left: User Avatars with Heart Badge */}
            <div className="relative flex-shrink-0">
              {/* Overlapping User Avatars */}
              <div className="relative flex items-center">
                {activity.users.slice(0, 5).map((user, idx) => (
                  <div
                    key={idx}
                    className={`relative rounded-full ${idx === 0 ? '' : '-ml-2'} ${
                      isDarkMode ? 'ring-2 ring-[#1a1a2e]' : 'ring-2 ring-white'
                    }`}
                    style={{ zIndex: 10 - idx }}
                  >
                    {user.avatar ? (
                      <ImageWithFallback
                        src={user.avatar}
                        alt={user.name}
                        className="w-9 h-9 md:w-11 md:h-11 rounded-full object-cover"
                        fallbackSrc=""
                      />
                    ) : (
                      <div className={`w-9 h-9 md:w-11 md:h-11 rounded-full ${user.color} flex items-center justify-center text-white text-[10px] md:text-xs font-bold`}>
                        {user.initials}
                      </div>
                    )}
                    {/* Heart Badge on first avatar */}
                    {idx === 0 && (
                      <div className={`absolute -bottom-0.5 -right-0.5 w-4 h-4 md:w-5 md:h-5 rounded-full border-2 ${
                        isDarkMode ? 'border-[#1a1a2e]' : 'border-white'
                      } ${activityType?.bg || ''} flex items-center justify-center`}>
                        <Heart className="w-2.5 h-2.5 md:w-3 md:h-3 text-[#EF4444] fill-[#EF4444]" strokeWidth={3} />
                      </div>
                    )}
                  </div>
                ))}
              </div>
              
              {/* Vertical Line - connects to post card */}
              {(activity.postTitle || activity.postContent) && (
                <div className={`absolute left-[22px] md:left-[28px] top-[44px] md:top-[52px] w-0.5 ${isDarkMode ? 'bg-slate-700/50' : 'bg-gray-300'}`} style={{ height: '60px' }} />
              )}
            </div>
            
            {/* Right: Text Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
                  <p className={`text-xs md:text-sm leading-snug mb-0.5 ${isDarkMode ? 'text-slate-300' : 'text-[#8279a5]'}`}>
                    <span className={`font-bold ${isDarkMode ? 'text-white' : 'text-[#19142e]'}`}>
                      {firstUser.name}
                    </span> {activity.text || 've diğerleri gönderini beğendi.'}
                  </p>
                  <span className={`text-[10px] md:text-xs block ${isDarkMode ? 'text-slate-500' : 'text-[#8279a5]'}`}>
                    {activity.time}
                  </span>
                </div>
                {!activity.isRead && (
                  <div className="w-2 h-2 rounded-full bg-[#5852c4] flex-shrink-0 animate-pulse mt-1" />
                )}
              </div>
              
              {/* Post Preview Card */}
              {(activity.postTitle || activity.postContent) && (
                <div className={`mt-3 rounded-lg overflow-hidden border ${
                  isDarkMode 
                    ? 'bg-slate-800/50 border-slate-700/50' 
                    : 'bg-gray-50 border-gray-200'
                }`}>
                  <div className="flex gap-3 p-3">
                    <div className="flex-1 min-w-0">
                      {activity.postTitle && (
                        <h4 className={`text-xs md:text-sm font-bold mb-1 line-clamp-1 ${isDarkMode ? 'text-white' : 'text-[#19142e]'}`}>
                          {activity.postTitle}
                        </h4>
                      )}
                      {activity.postContent && (
                        <p className={`text-[11px] md:text-xs line-clamp-2 ${isDarkMode ? 'text-slate-400' : 'text-[#8279a5]'}`}>
                          {activity.postContent}
                        </p>
                      )}
                    </div>
                    {activity.postImage && (
                      <div className="flex-shrink-0">
                        <ImageWithFallback
                          src={activity.postImage}
                          alt={activity.postTitle || 'Post'}
                          className="w-16 h-16 md:w-20 md:h-20 rounded-lg object-cover"
                          fallbackSrc=""
                        />
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      );
    }

    // SOCIAL INTERACTIONS (comments, follows, single like)
    if (['comment', 'follow'].includes(activity.type) || (activity.type === 'like' && !activity.users)) {
      const handleClick = (e: React.MouseEvent) => {
        // Don't navigate if clicking on button
        if ((e.target as HTMLElement).closest('button')) {
          return;
        }
        
        if (activity.type === 'comment' && activity.postId && onPostClick) {
          // Navigate to post
          const post = MOCK_POSTS.find(p => p.id === activity.postId);
          if (post) {
            const now = new Date();
            const hours = now.getHours().toString().padStart(2, '0');
            const minutes = now.getMinutes().toString().padStart(2, '0');
            const postWithFullDate = {
              ...post,
              fullDate: `${hours}:${minutes} • ${now.toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })}`,
              likes: post.upvotes,
              comments: post.comments,
            };
            onPostClick(postWithFullDate, activity.commentId);
          }
        } else if (activity.type === 'follow' && activity.userId && onProfileClick) {
          // Navigate to profile
          onProfileClick(activity.userId);
        }
      };

      const handleReplyClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        e.preventDefault();
        
        if (!onPostClick || !activity.postId) {
          return;
        }
        
        const post = MOCK_POSTS.find(p => p.id === activity.postId);
        if (!post) {
          return;
        }
        
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const postWithFullDate = {
          ...post,
          fullDate: `${hours}:${minutes} • ${now.toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })}`,
          likes: post.upvotes,
          comments: post.comments,
        };
        
        // Navigate to post with comment highlighted
        onPostClick(postWithFullDate, activity.commentId);
      };

      return (
        <div 
          key={activity.id}
          onClick={handleClick}
          className={`w-full p-3 md:p-4 border-b last:border-b-0 transition-all cursor-pointer ${
            isDarkMode 
              ? 'bg-[#1a1a2e] border-slate-700/50 hover:bg-slate-800/50' 
              : 'bg-white border-[#ededff] hover:bg-[#f2f3f7]'
          } ${!activity.isRead ? (isDarkMode ? 'bg-slate-800/30' : 'bg-purple-50/50') : ''}`}
        >
          <div className="flex items-start gap-3 md:gap-4">
            <div className="relative flex-shrink-0">
              <div className={`w-9 h-9 md:w-11 md:h-11 rounded-full ${activity.userColor} flex items-center justify-center text-white text-[10px] md:text-xs font-bold`}>
                {activity.userInitials}
              </div>
              <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 md:w-4 md:h-4 rounded-full border-2 ${
                isDarkMode ? 'border-[#1a1a2e]' : 'border-white'
              } ${activityType?.bg || ''} flex items-center justify-center`}>
                <IconComponent className="w-2 h-2 md:w-2.5 md:h-2.5" style={{ color: iconColor }} strokeWidth={3} />
              </div>
            </div>
            
            <div className="flex-1 min-w-0">
              <p className={`text-xs md:text-sm leading-snug mb-0.5 ${isDarkMode ? 'text-slate-300' : 'text-[#8279a5]'}`}>
                <span className={`font-bold ${isDarkMode ? 'text-white' : 'text-[#19142e]'}`}>
                  {activity.user}
                </span> {activity.text}
              </p>
              {activity.postPreview && (
                <p className={`hidden md:block text-xs mt-1 line-clamp-1 italic ${isDarkMode ? 'text-slate-500' : 'text-[#8279a5]'}`}>
                  "{activity.postPreview}"
                </p>
              )}
              <div className="flex items-center justify-between mt-1">
                <span className={`text-[10px] md:text-xs ${isDarkMode ? 'text-slate-500' : 'text-[#8279a5]'}`}>
                  {activity.time}
                </span>
                {!activity.isRead && (
                  <div className="w-2 h-2 rounded-full bg-[#5852c4] flex-shrink-0 animate-pulse md:hidden" />
                )}
              </div>
            </div>

            {!activity.isRead && (
              <div className="hidden md:block w-2 h-2 rounded-full bg-[#5852c4] mt-1 flex-shrink-0 animate-pulse" />
            )}
          </div>

          {activity.type === 'comment' && onPostClick && activity.postId && (
            <div 
              className="ml-[42px] md:ml-[60px] mt-2 md:mt-3"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                type="button"
                onClick={handleReplyClick}
                className={`flex items-center gap-1.5 px-2.5 py-1 md:px-3 md:py-1.5 rounded-lg text-[11px] md:text-xs font-bold transition-colors cursor-pointer ${
                isDarkMode 
                    ? 'bg-[#5852c4] text-white hover:bg-[#6d65d9] shadow-lg shadow-[#5852c4]/20' 
                    : 'bg-[#5852c4] text-white hover:bg-[#6d65d9] shadow-lg shadow-[#5852c4]/20'
                }`}
              >
                <Reply className="w-3 h-3 md:w-3.5 md:h-3.5" />
                <span>Yanıtla</span>
              </button>
            </div>
          )}
        </div>
      );
    }

    // WIKI EDIT / POST TYPE
    return (
      <div 
        key={activity.id}
        className={`w-full p-3 md:p-4 border-b last:border-b-0 flex items-center gap-3 md:gap-4 transition-all cursor-pointer ${
          isDarkMode 
            ? 'bg-[#1a1a2e] border-slate-700/50 hover:bg-slate-800/50' 
            : 'bg-white border-[#ededff] hover:bg-[#f2f3f7]'
        } ${!activity.isRead ? (isDarkMode ? 'bg-slate-800/30' : 'bg-purple-50/50') : ''}`}
      >
        <div className={`w-9 h-9 md:w-11 md:h-11 rounded-full flex items-center justify-center flex-shrink-0 ${activityType?.bg || ''}`}>
          <IconComponent className="w-4 h-4 md:w-5 md:h-5" style={{ color: iconColor }} strokeWidth={2.5} />
        </div>

        <div className="flex-1 min-w-0">
          <h4 className={`font-bold text-xs md:text-sm mb-0.5 line-clamp-1 ${isDarkMode ? 'text-white' : 'text-[#19142e]'}`}>
            {activity.title}
          </h4>
          {activity.description && (
            <p className={`hidden md:block text-xs line-clamp-1 mb-1 ${isDarkMode ? 'text-slate-400' : 'text-[#8279a5]'}`}>
              {activity.description}
            </p>
          )}
          <div className="flex items-center gap-2 text-[10px] md:text-xs mt-0.5">
            <span className={isDarkMode ? 'text-slate-500' : 'text-[#8279a5]'}>
              {activity.time}
            </span>
            {activity.status && (
              <>
                <span className={`hidden md:inline ${isDarkMode ? 'text-slate-600' : 'text-[#8279a5]'}`}>•</span>
                <span 
                  className="hidden md:inline font-bold"
                  style={{ color: activity.statusColor }}
                >
                  {activity.status}
                </span>
              </>
            )}
        </div>
        </div>

        {!activity.isRead && (
          <div className="w-2 h-2 rounded-full bg-[#5852c4] flex-shrink-0 animate-pulse" />
        )}
      </div>
    );
  };

  // Get filter counts
  const getFilterCount = (filter: ActivityFilter) => {
    if (filter === 'all') return ALL_ACTIVITIES.length;
    return ALL_ACTIVITIES.filter(a => a.category === filter).length;
  };

  const unreadCount = ALL_ACTIVITIES.filter(a => !a.isRead).length;

  return (
    <>
      <div className={`min-h-screen pb-32 lg:pb-6 transition-colors ${
        isDarkMode ? 'bg-[#0f0e17]' : 'bg-[#f2f3f7]'
      }`}>
        
        {/* Global Header */}
        <GlobalHeader 
          type="rich"
          onWalletClick={() => setIsWalletModalOpen(true)}
          coinBalance="2.450"
          onSearchClick={() => console.log('🔍 Search clicked')}
          activeTab={activeTab}
          onTabChange={onTabChange}
          onGameCenterClick={onGameCenterClick}
        />

        {/* Main Content */}
        <div className="pt-[120px] lg:pt-[84px]">
          <div className="max-w-[1200px] mx-auto px-0 lg:px-6">
            <div className="flex gap-6">
              
              {/* LEFT COLUMN - Main Content */}
              <main className="w-full lg:w-[70%]">
                {/* 1. PAGE HEADER */}
                <header className="px-5 lg:px-0 py-4 md:py-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <h1 className={`text-xl md:text-2xl font-black transition-colors ${
                isDarkMode ? 'text-white' : 'text-[#19142e]'
                    }`}>
                        Aktivite Merkezi
                      </h1>
                      {unreadCount > 0 && (
                        <p className={`text-xs md:text-sm font-bold ${isDarkMode ? 'text-slate-400' : 'text-[#8279a5]'}`}>
                          {unreadCount} yeni aktivite
                        </p>
                      )}
                    </div>
              <button 
                      className={`p-1.5 md:p-2 rounded-lg transition-colors group ${
                  isDarkMode ? 'hover:bg-slate-800' : 'hover:bg-white'
                }`}
                aria-label="Mark all as read"
                      title="Tümünü okundu işaretle"
              >
                      <CheckCircle2 className={`w-4 h-4 md:w-5 md:h-5 transition-colors ${
                  isDarkMode ? 'text-slate-400 group-hover:text-[#5852c4]' : 'text-[#8279a5] group-hover:text-[#5852c4]'
                }`} strokeWidth={2.5} />
              </button>
                  </div>
            </header>

                {/* 2. FILTER TABS */}
                <div className="px-5 lg:px-0 mb-4 md:mb-6">
                  <div className="flex items-center gap-1.5 md:gap-2 overflow-x-auto pb-2 scrollbar-hide">
                    {FILTER_OPTIONS.map((filter) => {
                      const FilterIcon = filter.icon;
                      const count = getFilterCount(filter.value);
                      const isActive = activeFilter === filter.value;
                      
                  return (
                        <button
                          key={filter.value}
                          onClick={() => setActiveFilter(filter.value)}
                          className={`flex items-center gap-1 md:gap-2 px-2.5 md:px-4 py-1.5 md:py-2 rounded-lg text-xs md:text-sm font-bold transition-all whitespace-nowrap flex-shrink-0 ${
                            isActive
                              ? isDarkMode
                                ? 'bg-[#5852c4] text-white shadow-lg shadow-[#5852c4]/20'
                                : 'bg-[#5852c4] text-white shadow-lg shadow-[#5852c4]/20'
                              : isDarkMode
                                ? 'bg-[#1a1a2e] text-slate-400 hover:bg-slate-800 hover:text-white border border-slate-700/50'
                                : 'bg-white text-[#8279a5] hover:bg-[#f2f3f7] hover:text-[#19142e] border border-[#ededff]'
                          }`}
                        >
                          <FilterIcon className="w-3.5 h-3.5 md:w-4 md:h-4" strokeWidth={2.5} />
                          <span>{filter.label}</span>
                          {count > 0 && (
                            <span className={`px-1 md:px-1.5 py-0.5 rounded-full text-[10px] md:text-xs ${
                              isActive
                                ? 'bg-white/20 text-white'
                                : isDarkMode
                                  ? 'bg-slate-700 text-slate-300'
                                  : 'bg-[#f2f3f7] text-[#8279a5]'
                            }`}>
                              {count}
                            </span>
                          )}
                        </button>
                  );
                })}
              </div>
            </div>

                {/* 3. ACTIVITY TIMELINE */}
                <div className="px-5 lg:px-0 space-y-4 md:space-y-6">
                  {activityGroups.length > 0 ? (
                    activityGroups.map((group) => (
                <div key={group.label}>
                  {/* Group Label */}
                        <div className="flex items-center gap-1.5 md:gap-2 mb-2 md:mb-3">
                          <div className={`w-1 h-1 md:w-1.5 md:h-1.5 rounded-full ${
                      isDarkMode ? 'bg-slate-500' : 'bg-[#8279a5]'
                    }`} />
                          <h3 className={`text-[10px] md:text-xs font-black uppercase tracking-wider ${
                      isDarkMode ? 'text-slate-400' : 'text-[#8279a5]'
                    }`}>
                      {group.label}
                    </h3>
                  </div>
                  
                  {/* Group Items */}
                        <div className={`rounded-lg md:rounded-xl shadow-sm overflow-hidden border ${
                    isDarkMode 
                      ? 'bg-[#1a1a2e] border-slate-700/50' 
                      : 'bg-white border-[#ededff]'
                  }`}>
                          {group.activities.map((activity) => renderActivityItem(activity))}
                  </div>
                </div>
                    ))
                  ) : (
                    <div className={`rounded-lg md:rounded-xl shadow-sm border p-8 md:p-12 text-center ${
                      isDarkMode 
                        ? 'bg-[#1a1a2e] border-slate-700/50' 
                        : 'bg-white border-[#ededff]'
                    }`}>
                      <ActivityIcon className={`w-8 h-8 md:w-12 md:h-12 mx-auto mb-3 md:mb-4 ${
                        isDarkMode ? 'text-slate-600' : 'text-[#8279a5]'
                      }`} />
                      <p className={`text-xs md:text-sm font-bold mb-1 ${
                        isDarkMode ? 'text-slate-400' : 'text-[#8279a5]'
                      }`}>
                        Bu kategoride aktivite bulunamadı
                      </p>
                      <p className={`text-[10px] md:text-xs ${
                        isDarkMode ? 'text-slate-500' : 'text-[#8279a5]'
                      }`}>
                        Başka bir filtre seçmeyi deneyin
                      </p>
                    </div>
                  )}
            </div>

            {/* Footer */}
                <div className="px-5 lg:px-0 mt-6 md:mt-8 text-center">
              <button className={`inline-flex items-center gap-2 text-xs font-bold transition-colors ${
                isDarkMode 
                  ? 'text-slate-400 hover:text-[#5852c4]' 
                  : 'text-[#8279a5] hover:text-[#5852c4]'
              }`}>
                Tüm geçmişi görüntüle
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
              </main>

              {/* RIGHT COLUMN - Sidebar with Daily Summary (Desktop Only) */}
              <aside className="hidden lg:block w-[30%]">
                <div className="sticky top-[84px] space-y-6">
                  {/* Daily Summary Card - Above Profile */}
                  <div className={`rounded-[10px] p-4 shadow-[0_2px_12px_rgba(25,20,46,0.08)] transition-all ${
                    isDarkMode ? 'bg-[#1a1a2e]' : 'bg-white'
                  }`}>
                    <div className="flex items-center justify-between mb-3">
                      <p className={`text-xs font-bold uppercase tracking-wider ${
                        isDarkMode ? 'text-slate-400' : 'text-[#8279a5]'
                      }`}>BUGÜN</p>
                      <Calendar className={`w-4 h-4 ${isDarkMode ? 'text-slate-500' : 'text-[#8279a5]'}`} strokeWidth={2} />
                    </div>
                    
                    {/* GençCoin */}
                    <div className={`rounded-lg p-3 mb-4 ${
                      isDarkMode 
                        ? 'bg-gradient-to-br from-[#5852c4] via-[#4F46E5] to-[#3B82F6]' 
                        : 'bg-gradient-to-br from-[#5852c4] via-[#4F46E5] to-[#3B82F6]'
                    }`}>
                      <div className="flex items-baseline gap-1.5 mb-1">
                        <span className="text-xl font-black text-white">+{STATS_DATA.today.coins}</span>
                        <span className="text-xs font-bold text-white/90">GC</span>
                      </div>
                      <p className="text-white/80 text-[10px]">GençCoin</p>
                    </div>
                    
                    {/* Stats - Two separate items with spacing */}
                    <div className="space-y-2">
                      {/* Activities */}
                      <div className="flex items-center gap-1">
                        <ActivityIcon className="w-3.5 h-3.5 text-[#5852c4] flex-shrink-0" strokeWidth={2.5} />
                        <span className={`font-bold text-xs ${isDarkMode ? 'text-white' : 'text-[#19142e]'}`}>
                          {STATS_DATA.today.activities}
                        </span>
                        <span className={`text-[10px] ${isDarkMode ? 'text-slate-400' : 'text-[#8279a5]'}`}>
                          Aktiviteler
                        </span>
                      </div>
                      {/* Interactions */}
                      <div className="flex items-center gap-1">
                        <TrendingUp className="w-3.5 h-3.5 text-[#5852c4] flex-shrink-0" strokeWidth={2.5} />
                        <span className={`font-bold text-xs ${isDarkMode ? 'text-white' : 'text-[#19142e]'}`}>
                          {STATS_DATA.today.interactions}
                        </span>
                        <span className={`text-[10px] ${isDarkMode ? 'text-slate-400' : 'text-[#8279a5]'}`}>
                          Etkileşimler
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Right Sidebar Components - Manual Implementation */}
                  <MiniProfileCard 
                    onProfileClick={() => onTabChange?.('profile')}
                    coins={6240}
                  />
                  <TrendingVertical />
                  <SuggestedGames 
                    onGameClick={(gameId) => {
                      if (gameId === 'all') {
                        onGameCenterClick?.();
                      }
                    }} 
                  />
                </div>
              </aside>
            </div>
          </div>
        </div>
      </div>

      {/* Wallet Modal */}
      <WalletModal 
        isOpen={isWalletModalOpen}
        onClose={() => setIsWalletModalOpen(false)}
      />
    </>
  );
};
