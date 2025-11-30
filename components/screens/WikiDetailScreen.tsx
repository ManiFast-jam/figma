import React, { useState } from 'react';
import { ArrowLeft, Edit, Clock, Save, X, ThumbsUp, ThumbsDown, Share2, Flag, Heart, MessageCircle, Send } from 'lucide-react';
import { GlobalHeader } from '../layout/GlobalHeader';
import { PageLayout } from '../layout/PageLayout';
import { WalletModal } from '../wallet/WalletModal';
import { useTheme } from '../../contexts/ThemeContext';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { toast } from 'sonner';
import { canEditWiki, getUserLevelName } from '../../utils/userLevel';
import { CreateWikiModal } from '../wiki/CreateWikiModal';
import { WikiHistoryModal } from '../wiki/WikiHistoryModal';
import { MOCK_COMMENTS } from '../../data/mockComments';

interface WikiEntry {
  id: string;
  title: string;
  category: string;
  data: {
    type: 'academic' | 'venue' | 'housing' | 'career' | 'general';
    fields: Array<{ 
      icon: React.ComponentType<any>; 
      label: string; 
      value: string | React.ReactNode;
      editable?: boolean;
      key?: string; // for form data binding
    }>;
  };
  lastEditedBy: string;
  lastEditedAt: string;
  version?: number;
  isOwnEntry?: boolean; // Kullanıcının kendi entry'si mi?
}

interface WikiDetailScreenProps {
  entry: WikiEntry;
  onBack: () => void;
  activeTab?: string;
  onTabChange?: (tab: string) => void;
  onGameCenterClick?: () => void;
  onEntryUpdate?: (updatedEntry: WikiEntry) => void;
  wikiHistory?: Array<{
    version: number;
    editedBy: string;
    editedAt: string;
    changes: string;
    isCurrent?: boolean;
  }>;
  onHistoryUpdate?: (entryId: string, history: Array<{
    version: number;
    editedBy: string;
    editedAt: string;
    changes: string;
    isCurrent?: boolean;
  }>) => void;
}

// Category Badge Colors (5 Pillars)
const CATEGORY_STYLES = {
  'Akademik Destek': { bg: 'bg-blue-100', text: 'text-blue-700', border: 'border-blue-200' },
  'Sosyal Yaşam': { bg: 'bg-orange-100', text: 'text-orange-700', border: 'border-orange-200' },
  'Barınma & Yaşam': { bg: 'bg-purple-100', text: 'text-purple-700', border: 'border-purple-200' },
  'Kariyer & Gelişim': { bg: 'bg-purple-100', text: 'text-purple-700', border: 'border-purple-200' },
  'Konya Keşif': { bg: 'bg-teal-100', text: 'text-teal-700', border: 'border-teal-200' },
};

// Comment interface
interface Comment {
  id: string;
  user: string;
  role: string;
  avatarColor: string;
  text: string;
  likes: number;
  timeAgo: string;
  replies?: Comment[];
}

// Recursive Comment Component
interface CommentItemProps {
  comment: Comment;
  depth?: number;
}

const CommentItem: React.FC<CommentItemProps> = ({ comment, depth = 0 }) => {
  const { isDarkMode } = useTheme();
  const hasReplies = comment.replies && comment.replies.length > 0;
  const indentClass = depth > 0 ? 'ml-8' : '';

  const getRankBorderColor = (role: string) => {
    switch (role) {
      case 'Yeni Gelen': return 'ring-slate-400';
      case 'Seyyah': return 'ring-orange-500';
      case 'Gezgin': return 'ring-blue-500';
      case 'Bilge': return 'ring-purple-500';
      default: return 'ring-slate-400';
    }
  };

  return (
    <div className={`relative ${indentClass}`}>
      <div className={`flex gap-3 pb-5 transition-colors rounded-lg p-2 -m-2 ${
        isDarkMode ? 'hover:bg-slate-800/50' : 'hover:bg-gray-50/50'
      }`}>
        {/* Left: Avatar Column */}
        <div className="relative flex flex-col items-center flex-shrink-0">
          <div className={`w-10 h-10 rounded-full ${comment.avatarColor} text-white flex items-center justify-center font-bold text-sm ring-2 ${getRankBorderColor(comment.role)}`}>
            {comment.user.charAt(0)}
          </div>
          {hasReplies && (
            <div className="w-0.5 bg-gray-200 flex-1 mt-2" />
          )}
        </div>

        {/* Right: Comment Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className={`font-extrabold ${isDarkMode ? 'text-white' : 'text-[#111827]'}`}>{comment.user}</span>
            <span className={isDarkMode ? 'text-slate-600' : 'text-gray-400'}>•</span>
            <span className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>{comment.role}</span>
            <span className={isDarkMode ? 'text-slate-600' : 'text-gray-400'}>•</span>
            <span className={`text-sm ${isDarkMode ? 'text-slate-500' : 'text-gray-400'}`}>{comment.timeAgo}</span>
          </div>
          <p className={`leading-relaxed mb-3 ${isDarkMode ? 'text-slate-300' : 'text-[#4B5563]'}`}>
            {comment.text}
          </p>
          <div className="flex items-center gap-6">
            <button className="flex items-center gap-1.5 group">
              <ThumbsUp className={`w-4 h-4 transition-colors ${
                isDarkMode 
                  ? 'text-slate-400 group-hover:text-[#5852c4]' 
                  : 'text-gray-500 group-hover:text-[#5852c4]'
              }`} strokeWidth={2.5} />
              <span className={`text-xs font-semibold transition-colors ${
                isDarkMode 
                  ? 'text-slate-300 group-hover:text-[#5852c4]' 
                  : 'text-gray-600 group-hover:text-[#5852c4]'
              }`}>{comment.likes}</span>
            </button>
            <button className={`text-xs font-semibold transition-colors ${
              isDarkMode 
                ? 'text-slate-400 hover:text-[#5852c4]' 
                : 'text-gray-500 hover:text-[#5852c4]'
            }`}>
              Yanıtla
            </button>
          </div>
        </div>
      </div>

      {/* Recursive Replies */}
      {hasReplies && (
        <div>
          {comment.replies!.map((reply) => (
            <CommentItem key={reply.id} comment={reply} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
};

// Wiki entry comments mock data - Her entry için kategoriye uygun yorumlar
const getWikiComments = (entryId: string): Comment[] => {
  const commentsMap: Record<string, Comment[]> = {
    // TOPLULUK ONAYLI - Yemekhane
    'wiki-1': [
      {
        id: 'w1-c1',
        user: 'Zeynep A.',
        role: 'Seyyah',
        avatarColor: 'bg-purple-600',
        text: 'Bugün mercimek çorbası çok güzeldi ama pilav biraz yavan kalmış. Genel olarak fiyatına göre değer 👍',
        likes: 12,
        timeAgo: '5dk',
        replies: [
          {
            id: 'w1-c1-r1',
            user: 'Mehmet S.',
            role: 'Bilge',
            avatarColor: 'bg-blue-600',
            text: 'Klima çok soğuk çalışıyor, özellikle pencere kenarındaki masalara oturmayın. Hırka/ceket alın mutlaka.',
            likes: 5,
            timeAgo: '2s',
          }
        ]
      },
      {
        id: 'w1-c2',
        user: 'Ayşe D.',
        role: 'Yeni Gelen',
        avatarColor: 'bg-emerald-600',
        text: 'Öğrenci kartımı unuttum, nakit ödeme kabul ediyorlar mı?',
        likes: 3,
        timeAgo: '1sa',
      }
    ],
    // TOPLULUK ONAYLI - Kütüphane
    'wiki-2': [
      {
        id: 'w2-c1',
        user: 'Can Ö.',
        role: 'Gezgin',
        avatarColor: 'bg-blue-600',
        text: 'Sessiz okuma salonları gerçekten çok iyi. Sınav haftalarında erken gitmek gerekiyor, çok doluyor.',
        likes: 18,
        timeAgo: '2sa',
      },
      {
        id: 'w2-c2',
        user: 'Elif Y.',
        role: 'Seyyah',
        avatarColor: 'bg-amber-500',
        text: 'Kafe kısmı çok güzel, çalışırken kahve içebiliyorsunuz. Fiyatlar da uygun.',
        likes: 9,
        timeAgo: '5sa',
      }
    ],
    // TOPLULUK ONAYLI - Spor Salonu
    'wiki-3': [
      {
        id: 'w3-c1',
        user: 'Burak S.',
        role: 'Gezgin',
        avatarColor: 'bg-blue-600',
        text: 'Sabah 6\'da açılıyor, erken giderseniz boş oluyor. Akşam saatleri çok kalabalık.',
        likes: 14,
        timeAgo: '3sa',
      }
    ],
    // AKADEMİK DESTEK - Diferansiyel Denklemler
    'wiki-4': [
      {
        id: 'w4-c1',
        user: 'Deniz K.',
        role: 'Bilge',
        avatarColor: 'bg-purple-600',
        text: 'Hoca çok iyi anlatıyor ama ders hızlı ilerliyor. Mutlaka ders notlarını önceden okuyun.',
        likes: 22,
        timeAgo: '1g',
        replies: [
          {
            id: 'w4-c1-r1',
            user: 'Fatih Y.',
            role: 'Gezgin',
            avatarColor: 'bg-blue-600',
            text: 'Evet, ben de aynı şeyi düşünüyorum. YouTube\'dan ekstra video izlemek gerekiyor.',
            likes: 8,
            timeAgo: '12s',
          }
        ]
      },
      {
        id: 'w4-c2',
        user: 'Selin A.',
        role: 'Seyyah',
        avatarColor: 'bg-pink-600',
        text: 'Çıkmış sorular çok yardımcı oldu, finalde benzer sorular çıktı.',
        likes: 15,
        timeAgo: '2g',
      }
    ],
    // AKADEMİK DESTEK - Veri Yapıları
    'wiki-5': [
      {
        id: 'w5-c1',
        user: 'Ali B.',
        role: 'Bilge',
        avatarColor: 'bg-purple-600',
        text: 'Lab çalışmaları çok önemli, projede çok işe yarıyor. Mutlaka yapın.',
        likes: 19,
        timeAgo: '4sa',
      }
    ],
    // AKADEMİK DESTEK - Makroekonomi
    'wiki-6': [
      {
        id: 'w6-c1',
        user: 'Zeynep İ.',
        role: 'Gezgin',
        avatarColor: 'bg-blue-600',
        text: 'Grafikleri anlamak için ekstra çalışma gerekiyor ama hoca çok yardımcı.',
        likes: 11,
        timeAgo: '6sa',
      }
    ],
    // BARINMA & YAŞAM - KYK Yurtları
    'wiki-7': [
      {
        id: 'w7-c1',
        user: 'Mehmet Y.',
        role: 'Gezgin',
        avatarColor: 'bg-blue-600',
        text: 'Başvuru süreci biraz uzun sürüyor ama sonuçlar e-Devlet\'ten açıklanıyor. Sabırlı olun.',
        likes: 24,
        timeAgo: '1g',
        replies: [
          {
            id: 'w7-c1-r1',
            user: 'Ayşe K.',
            role: 'Seyyah',
            avatarColor: 'bg-amber-500',
            text: 'Ben 2 hafta bekledim, sonuçlar açıklandı. Yerleştim bile!',
            likes: 6,
            timeAgo: '8s',
          }
        ]
      },
      {
        id: 'w7-c2',
        user: 'Can D.',
        role: 'Yeni Gelen',
        avatarColor: 'bg-emerald-600',
        text: 'Devlet yurtları çok uygun ama özel yurtlar daha konforlu. Tercih size kalmış.',
        likes: 17,
        timeAgo: '2g',
      }
    ],
    // BARINMA & YAŞAM - Öğrenci Evleri
    'wiki-8': [
      {
        id: 'w8-c1',
        user: 'Burak E.',
        role: 'Seyyah',
        avatarColor: 'bg-amber-500',
        text: 'Bosna Hersek Mahallesi kampüse çok yakın, yürüme mesafesi. Ev fiyatları da makul.',
        likes: 13,
        timeAgo: '1g',
      }
    ],
    // SOSYAL YAŞAM - Bosna Kahvecisi
    'wiki-9': [
      {
        id: 'w9-c1',
        user: 'Selin M.',
        role: 'Gezgin',
        avatarColor: 'bg-blue-600',
        text: 'Ders çalışmak için mükemmel bir yer. Wifi hızlı, ortam sakin. Tavsiye ederim!',
        likes: 21,
        timeAgo: '3sa',
      },
      {
        id: 'w9-c2',
        user: 'Emre T.',
        role: 'Seyyah',
        avatarColor: 'bg-purple-600',
        text: 'Tostları çok lezzetli, fiyatına göre çok iyi. Öğrenci dostu bir mekan.',
        likes: 16,
        timeAgo: '5sa',
      }
    ],
    // SOSYAL YAŞAM - Alaaddin Tepesi
    'wiki-10': [
      {
        id: 'w10-c1',
        user: 'Zeynep A.',
        role: 'Gezgin',
        avatarColor: 'bg-blue-600',
        text: 'Gün batımı gerçekten muhteşem! Fotoğraf çekmek için harika bir yer. Akşam 6-7 arası en iyi saat.',
        likes: 45,
        timeAgo: '2g',
        replies: [
          {
            id: 'w10-c1-r1',
            user: 'Can Y.',
            role: 'Seyyah',
            avatarColor: 'bg-amber-500',
            text: 'Evet, ben de dün gittim. Çok güzel bir manzara. Yanında çay içmek de ayrı bir keyif.',
            likes: 12,
            timeAgo: '1g',
          }
        ]
      }
    ],
    // SOSYAL YAŞAM - Kampüs Sineması
    'wiki-11': [
      {
        id: 'w11-c1',
        user: 'Deniz S.',
        role: 'Gezgin',
        avatarColor: 'bg-blue-600',
        text: 'Öğrenci fiyatı çok uygun, 25₺. Hafta sonu gösterimleri çok kalabalık oluyor, erken gitmek gerekiyor.',
        likes: 18,
        timeAgo: '4sa',
      }
    ],
    // KARİYER & GELİŞİM - Staj & İş Bulma
    'wiki-12': [
      {
        id: 'w12-c1',
        user: 'Can Y.',
        role: 'Gezgin',
        avatarColor: 'bg-amber-500',
        text: 'LinkedIn profilimi güncelledim ve 2 hafta içinde 3 mülakat çağrısı aldım. Networking gerçekten çok önemli!',
        likes: 28,
        timeAgo: '3sa',
        replies: [
          {
            id: 'w12-c1-r1',
            user: 'Ali B.',
            role: 'Bilge',
            avatarColor: 'bg-purple-600',
            text: 'Harika! Hangi sektörde mülakatlar aldın?',
            likes: 5,
            timeAgo: '2sa',
          }
        ]
      },
      {
        id: 'w12-c2',
        user: 'Deniz K.',
        role: 'Seyyah',
        avatarColor: 'bg-pink-600',
        text: 'AWS sertifikası aldım, CV\'me ekledim. İş ilanlarında çok aranan bir sertifika.',
        likes: 15,
        timeAgo: '5sa',
      },
      {
        id: 'w12-c3',
        user: 'Mehmet A.',
        role: 'Bilge',
        avatarColor: 'bg-purple-600',
        text: 'Kariyer fuarlarına mutlaka katılın. Şirketlerle direkt konuşma fırsatı buluyorsunuz.',
        likes: 22,
        timeAgo: '1g',
      }
    ],
    // KARİYER & GELİŞİM - Yazılım Sektörü
    'wiki-13': [
      {
        id: 'w13-c1',
        user: 'Burak D.',
        role: 'Bilge',
        avatarColor: 'bg-purple-600',
        text: 'GitHub profilimi düzenledim, projelerimi ekledim. İşverenler gerçekten bakıyor.',
        likes: 31,
        timeAgo: '2g',
        replies: [
          {
            id: 'w13-c1-r1',
            user: 'Can Y.',
            role: 'Gezgin',
            avatarColor: 'bg-blue-600',
            text: 'Hangi dilleri kullanıyorsun? Ben React ve Node.js öğreniyorum.',
            likes: 8,
            timeAgo: '1g',
          },
          {
            id: 'w13-c1-r2',
            user: 'Burak D.',
            role: 'Bilge',
            avatarColor: 'bg-purple-600',
            text: 'Ben de aynı stack\'i kullanıyorum. Projelerim GitHub\'da, bakabilirsin.',
            likes: 5,
            timeAgo: '12s',
          }
        ]
      },
      {
        id: 'w13-c2',
        user: 'Elif K.',
        role: 'Seyyah',
        avatarColor: 'bg-pink-600',
        text: 'Hackathon\'lara katılmak çok faydalı. Hem deneyim kazanıyorsunuz hem de network oluşturuyorsunuz.',
        likes: 19,
        timeAgo: '3g',
      }
    ],
  };
  return commentsMap[entryId] || [];
};

export const WikiDetailScreen: React.FC<WikiDetailScreenProps> = ({ 
  entry, 
  onBack, 
  activeTab = 'home',
  onTabChange,
  onGameCenterClick,
  onEntryUpdate,
  wikiHistory,
  onHistoryUpdate,
}) => {
  const { isDarkMode } = useTheme();
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isCreateWikiModalOpen, setIsCreateWikiModalOpen] = useState(false);
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
  const [replyText, setReplyText] = useState('');
  
  // Local history state (if not provided via props)
  const [localHistory, setLocalHistory] = useState<Array<{
    version: number;
    editedBy: string;
    editedAt: string;
    changes: string;
    isCurrent?: boolean;
  }>>(() => {
    // Initialize with entry's current version
    return [{
      version: entry.version || 1,
      editedBy: entry.lastEditedBy,
      editedAt: entry.lastEditedAt,
      changes: 'İlk oluşturuldu',
      isCurrent: true
    }];
  });
  
  // Mock user coins - in real app, this would come from user context/state
  const userCoins = 6240; // Level 3 (Gezgin)
  
  const currentHistory = wikiHistory || localHistory;
  
  // Interaction states
  const [isHelpful, setIsHelpful] = useState(false);
  const [isNotHelpful, setIsNotHelpful] = useState(false);
  const [isBiased, setIsBiased] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(42); // Mock like count
  
  // Get comments for this entry
  const comments = getWikiComments(entry.id);
  const [formData, setFormData] = useState<Record<string, string>>(() => {
    const data: Record<string, string> = { title: entry.title };
    entry.data.fields.forEach((field, index) => {
      const key = field.key || `field_${index}`;
      data[key] = String(field.value);
    });
    return data;
  });

  const categoryStyle = CATEGORY_STYLES[entry.category as keyof typeof CATEGORY_STYLES] || CATEGORY_STYLES['Akademik Destek'];

  const handleSave = () => {
    // Here you would save the data to your backend
    console.log('💾 Saving changes:', formData);
    toast.success('Değişiklikler kaydedildi!');
    setIsEditMode(false);
  };

  const handleCancel = () => {
    // Reset form data
    const data: Record<string, string> = { title: entry.title };
    entry.data.fields.forEach((field, index) => {
      const key = field.key || `field_${index}`;
      data[key] = String(field.value);
    });
    setFormData(data);
    setIsEditMode(false);
  };

  const handleHelpful = () => {
    setIsHelpful(!isHelpful);
    if (!isHelpful) {
      setIsNotHelpful(false); // Yararlı seçilirse yararsız kaldırılır
      toast.success('Yararlı olarak işaretlendi');
    } else {
      toast.info('İşaret kaldırıldı');
    }
  };

  const handleNotHelpful = () => {
    setIsNotHelpful(!isNotHelpful);
    if (!isNotHelpful) {
      setIsHelpful(false); // Yararsız seçilirse yararlı kaldırılır
      toast.success('Yararsız olarak işaretlendi');
    } else {
      toast.info('İşaret kaldırıldı');
    }
  };

  const handleBiased = () => {
    setIsBiased(!isBiased);
    if (!isBiased) {
      toast.success('Taraflı içerik olarak bildirildi');
    } else {
      toast.info('Bildirim kaldırıldı');
    }
  };

  const handleShare = () => {
    // Share functionality
    if (navigator.share) {
      navigator.share({
        title: entry.title,
        text: `${entry.title} - KonyaGenç Wiki`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link kopyalandı!');
    }
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    if (!isLiked) {
      setLikeCount(likeCount + 1);
      toast.success('Beğenildi');
    } else {
      setLikeCount(likeCount - 1);
      toast.info('Beğeni kaldırıldı');
    }
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-[#0f0e17]' : 'bg-[#f2f3f7]'} pb-28 lg:pb-6 transition-colors`}>
      {/* Global Header - Same as FeedScreen */}
      <GlobalHeader 
        type="rich"
        onWalletClick={() => setIsWalletModalOpen(true)}
        coinBalance="2.450"
        onSearchClick={() => console.log('🔍 Search clicked')}
        onFilterClick={() => console.log('🎯 Filter clicked')}
        activeTab={activeTab}
        onTabChange={onTabChange}
        onGameCenterClick={onGameCenterClick}
        onBackClick={onBack}
      />

      {/* Main Content with PageLayout */}
      <div className="pt-[60px] lg:pt-[84px]">
        <PageLayout
          onTabChange={onTabChange}
          onWalletOpen={() => setIsWalletModalOpen(true)}
          onGameClick={() => {}}
          onGameCenterClick={onGameCenterClick}
        >
        {/* Wiki Entry Content Card */}
        <div className={`lg:rounded-xl lg:shadow-lg overflow-hidden ${
          isDarkMode ? 'bg-[#1a1a2e]' : 'bg-white'
        }`}>
          {/* Header Section */}
          <div className={`px-6 py-6 border-b ${isDarkMode ? 'border-slate-700' : 'border-gray-200'}`}>
            {/* Category Badge */}
            <div className="flex items-center gap-3 mb-4">
              <span className={`px-3 py-1.5 rounded-md text-xs font-bold border ${categoryStyle.bg} ${categoryStyle.text} ${categoryStyle.border}`}>
                {entry.category}
              </span>
            </div>

            {/* Title */}
            {isEditMode ? (
              <div className="mb-4">
                <Label htmlFor="title" className={`text-xs font-bold mb-2 block ${
                  isDarkMode ? 'text-slate-300' : 'text-slate-700'
                }`}>
                  Başlık
                </Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className={`text-lg font-bold ${isDarkMode ? 'bg-slate-800 border-slate-600 text-white' : ''}`}
                />
              </div>
            ) : (
              <h1 className={`text-2xl font-black mb-3 ${isDarkMode ? 'text-white' : 'text-[#19142e]'}`}>
                {entry.title}
              </h1>
            )}

            {/* Action Buttons */}
            <div className={`flex items-center gap-2 lg:gap-3 mt-4 pt-4 border-t ${isDarkMode ? 'border-slate-700' : 'border-gray-200'}`}>
              {/* History Button */}
              <button
                onClick={() => setIsHistoryModalOpen(true)}
                className={`flex items-center justify-center gap-1.5 lg:gap-2 px-3 lg:px-4 py-2 rounded-lg font-bold text-xs lg:text-sm transition-all active:scale-95 ${
                  isDarkMode
                    ? 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <Clock className="w-4 h-4" strokeWidth={2} />
                <span className="hidden sm:inline">Geçmiş</span>
              </button>

              {/* Edit Button - Only for level 3-5 */}
              {canEditWiki(userCoins) && (
                <button
                  onClick={() => setIsCreateWikiModalOpen(true)}
                  className={`flex items-center justify-center gap-1.5 lg:gap-2 px-3 lg:px-4 py-2 rounded-lg font-bold text-xs lg:text-sm transition-all active:scale-95 ${
                    isDarkMode
                      ? 'bg-[#5852c4] text-white hover:bg-[#4a45b0]'
                      : 'bg-[#5852c4] text-white hover:bg-[#4a45b0]'
                  }`}
                >
                  <Edit className="w-4 h-4" strokeWidth={2.5} />
                  <span className="hidden sm:inline">Düzenle</span>
                </button>
              )}
              
              {/* Like Button */}
              <button
                onClick={handleLike}
                className={`flex items-center justify-center gap-1.5 lg:gap-2 px-3 lg:px-4 py-2 rounded-lg font-bold text-xs lg:text-sm transition-all active:scale-95 ${
                  isLiked
                    ? 'bg-pink-500 text-white'
                    : isDarkMode
                      ? 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} strokeWidth={2.5} />
                <span>{likeCount}</span>
              </button>

              <button
                onClick={handleHelpful}
                className={`flex-1 lg:flex-none flex items-center justify-center gap-1.5 lg:gap-2 px-3 lg:px-4 py-2 rounded-lg font-bold text-xs lg:text-sm transition-all active:scale-95 ${
                  isHelpful
                    ? 'bg-green-500 text-white'
                    : isDarkMode
                      ? 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <ThumbsUp className={`w-4 h-4 ${isHelpful ? 'fill-current' : ''}`} strokeWidth={2.5} />
                <span className="hidden sm:inline">Yararlı</span>
              </button>

              <button
                onClick={handleNotHelpful}
                className={`flex-1 lg:flex-none flex items-center justify-center gap-1.5 lg:gap-2 px-3 lg:px-4 py-2 rounded-lg font-bold text-xs lg:text-sm transition-all active:scale-95 ${
                  isNotHelpful
                    ? 'bg-red-500 text-white'
                    : isDarkMode
                      ? 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <ThumbsDown className={`w-4 h-4 ${isNotHelpful ? 'fill-current' : ''}`} strokeWidth={2.5} />
                <span className="hidden sm:inline">Yararsız</span>
              </button>

              <button
                onClick={handleBiased}
                className={`flex-1 lg:flex-none flex items-center justify-center gap-1.5 lg:gap-2 px-3 lg:px-4 py-2 rounded-lg font-bold text-xs lg:text-sm transition-all active:scale-95 ${
                  isBiased
                    ? 'bg-orange-500 text-white'
                    : isDarkMode
                      ? 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <Flag className={`w-4 h-4 ${isBiased ? 'fill-current' : ''}`} strokeWidth={2.5} />
                <span className="hidden sm:inline">Taraflı</span>
              </button>

              <button
                onClick={handleShare}
                className={`flex-1 lg:flex-none flex items-center justify-center gap-1.5 lg:gap-2 px-3 lg:px-4 py-2 rounded-lg font-bold text-xs lg:text-sm transition-all active:scale-95 ${
                  isDarkMode
                    ? 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <Share2 className="w-4 h-4" strokeWidth={2.5} />
                <span className="hidden sm:inline">Paylaş</span>
              </button>
            </div>
          </div>

          {/* Content Section - Tüm Field'ları Başlıklarıyla Göster */}
          <div className={`px-6 py-6 ${isDarkMode ? 'border-slate-700' : 'border-gray-200'}`}>
            <div className="space-y-4">
              {entry.data?.fields && entry.data.fields.length > 0 ? (
                entry.data.fields.map((field, index) => {
                  if (!field || field.value === undefined || field.value === null) {
                    return null;
                  }
                  
                  const Icon = field.icon;
                  const value = String(field.value).trim();
                  
                  if (value.length === 0) {
                    return null;
                  }
                  
                  return (
                    <div key={index} className="flex gap-3">
                      <div className="flex-shrink-0 mt-1">
                        <Icon className={`w-5 h-5 ${isDarkMode ? 'text-[#5852c4]' : 'text-[#5852c4]'}`} strokeWidth={2.5} />
                      </div>
                      <div className="flex-1">
                        <div className={`text-sm font-bold mb-1 ${isDarkMode ? 'text-slate-400' : 'text-gray-600'}`}>
                          {field.label}
                        </div>
                        <div className={`text-base leading-relaxed whitespace-pre-wrap ${
                          isDarkMode ? 'text-slate-300' : 'text-[#4B5563]'
                        }`}>
                          {value}
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className={`text-lg ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>
                  İçerik bulunamadı.
                </div>
              )}
            </div>
          </div>

          {/* Edit Mode Actions */}
          {isEditMode && (
            <div className={`px-6 py-4 border-t flex gap-3 ${isDarkMode ? 'border-slate-700' : 'border-gray-200'}`}>
              <button
                onClick={handleSave}
                className="flex-1 px-4 py-3 rounded-xl bg-[#5852c4] text-white font-black flex items-center justify-center gap-2 hover:bg-[#6c5ce7] active:scale-95 transition-all"
              >
                <Save className="w-5 h-5" strokeWidth={2.5} />
                <span>Kaydet</span>
              </button>
              <button
                onClick={handleCancel}
                className={`flex-1 px-4 py-3 rounded-xl font-black flex items-center justify-center gap-2 active:scale-95 transition-all ${
                  isDarkMode 
                    ? 'bg-slate-800 text-white hover:bg-slate-700' 
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <X className="w-5 h-5" strokeWidth={2.5} />
                <span>İptal</span>
              </button>
            </div>
          )}

        </div>

        {/* Comments Section - Separate Card */}
        <div className={`lg:rounded-xl lg:shadow-lg overflow-hidden mt-6 px-6 py-6 transition-colors ${
          isDarkMode ? 'bg-[#1a1a2e]' : 'bg-white'
        }`}>
          <h3 className={`text-lg font-extrabold mb-6 ${
            isDarkMode ? 'text-white' : 'text-[#111827]'
          }`}>Yorumlar {comments.length}</h3>
          
          {comments.length > 0 ? (
            comments.map((comment) => (
              <CommentItem key={comment.id} comment={comment} />
            ))
          ) : (
            <div className={`text-center py-8 ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>
              <MessageCircle className={`w-12 h-12 mx-auto mb-3 ${isDarkMode ? 'text-slate-600' : 'text-gray-400'}`} />
              <p>Henüz yorum yapılmamış. İlk yorumu sen yap!</p>
            </div>
          )}
        </div>
        </PageLayout>
      </div>

      {/* Sticky Bottom Reply Input */}
      <div className={`fixed bottom-0 left-0 right-0 border-t px-5 py-4 z-30 ${
        isDarkMode 
          ? 'bg-[#1a1a2e] border-slate-700' 
          : 'bg-white border-gray-200'
      }`}>
        <div className="flex items-center gap-3 max-w-4xl mx-auto">
          <input
            type="text"
            placeholder="Yorumunu yaz..."
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            className={`flex-1 px-4 py-3 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-[#5852c4]/30 ${
              isDarkMode
                ? 'bg-slate-800 text-white placeholder:text-slate-500'
                : 'bg-gray-100 text-[#111827] placeholder:text-gray-400'
            }`}
          />
          <button 
            disabled={!replyText.trim()}
            className={`p-3 rounded-full transition-all active:scale-95 shadow-md disabled:opacity-50 disabled:cursor-not-allowed ${
              isDarkMode
                ? 'bg-[#5852c4] hover:bg-[#6c5ce7]'
                : 'bg-[#5852c4] hover:bg-[#19142e]'
            }`}
          >
            <Send className="w-5 h-5 text-white" strokeWidth={2.5} />
          </button>
        </div>
      </div>

      <WalletModal 
        isOpen={isWalletModalOpen}
        onClose={() => setIsWalletModalOpen(false)}
      />
      
      {/* Create/Edit Wiki Modal */}
      <CreateWikiModal 
        isOpen={isCreateWikiModalOpen}
        onClose={() => setIsCreateWikiModalOpen(false)}
        editEntry={entry}
        onSave={(updatedEntry) => {
          if (onEntryUpdate) {
            onEntryUpdate(updatedEntry);
          }
          
          // Add to history
          const newVersion = (entry.version || 0) + 1;
          const newHistoryEntry = {
            version: newVersion,
            editedBy: 'Sen',
            editedAt: 'Az önce',
            changes: 'İçerik güncellendi',
            isCurrent: true
          };
          
          if (onHistoryUpdate) {
            const updatedHistory = (currentHistory || []).map(v => ({ ...v, isCurrent: false }));
            updatedHistory.push(newHistoryEntry);
            onHistoryUpdate(entry.id, updatedHistory);
          } else {
            setLocalHistory(prev => {
              const updated = prev.map(v => ({ ...v, isCurrent: false }));
              updated.push(newHistoryEntry);
              return updated;
            });
          }
          
          setIsCreateWikiModalOpen(false);
          toast.success('Wiki entry başarıyla güncellendi!');
        }}
      />

      {/* Wiki History Modal */}
      <WikiHistoryModal
        isOpen={isHistoryModalOpen}
        onClose={() => setIsHistoryModalOpen(false)}
        wikiTitle={entry.title}
        versions={currentHistory}
        onRestoreVersion={(version) => {
          // Restore version logic can be added here if needed
          console.log('Restore version:', version);
        }}
      />
    </div>
  );
};
