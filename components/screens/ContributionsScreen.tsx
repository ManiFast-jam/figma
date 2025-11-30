import React from 'react';
import { ChevronLeft, MessageSquare, FileText, Edit3, MapPin, Clock as ClockIcon, Paperclip, Coffee, BookOpen, Briefcase, Home, DollarSign, User } from 'lucide-react';
import { GlobalHeader } from '../layout/GlobalHeader';
import { RightSidebar } from '../layout/RightSidebar';
import { useTheme } from '../../contexts/ThemeContext';
import { PostCard } from '../social/PostCard';
import { WikiEntryCard } from '../wiki/WikiEntryCard';
import { CreateWikiModal } from '../wiki/CreateWikiModal';
import { CreatePostModal } from '../social/CreatePostModal';
import { toast } from 'sonner';
import { AnimatePresence, motion } from 'framer-motion';
import { Label } from '../ui/label';

interface ContributionsScreenProps {
  onBack: () => void;
  activeTab?: string;
  onTabChange?: (tab: string) => void;
  onGameCenterClick?: () => void;
  onGameSelect?: (gameId: string) => void;
  onWalletOpen?: () => void;
}

// Mock data - Post contributions (FeedScreen format)
const mockPosts = [
  {
    id: '1',
    title: 'Konya\'da En İyi Çalışma Mekanları',
    category: 'sosyal',
    user: 'Fatih Yılmaz',
    role: 'Gezgin',
    badge: 'Sosyal',
    content: 'Konya\'da en iyi çalışma mekanları hakkında bir post paylaştım. Öğrenciler için mükemmel yerler! Özellikle Alaaddin Tepesi ve kampüs içindeki kütüphaneler çok verimli.',
    upvotes: 45,
    comments: 12,
    timeAgo: '2 gün önce',
    avatarColor: 'bg-blue-600'
  }
];

// Mock data - Comment contributions
const mockComments = [
  {
    id: 'comment-1',
    postId: 'post-1',
    postTitle: 'Selçuk Üniversitesi Kampüs Rehberi',
    content: 'Selçuk Üniversitesi kampüsü hakkında detaylı bir yorum yazdım. Yeni öğrenciler için faydalı bilgiler içeriyor. Özellikle yemekhane saatleri ve kütüphane kuralları hakkında bilgi verdim.',
    user: 'Fatih Yılmaz',
    role: 'Gezgin',
    upvotes: 23,
    timeAgo: '5 gün önce',
    avatarColor: 'bg-purple-600'
  },
  {
    id: 'comment-2',
    postId: 'post-2',
    postTitle: 'Konya\'da Ulaşım Rehberi',
    content: 'Tramvay hatları ve öğrenci indirimleri hakkında yorum yaptım. Özellikle kampüsten şehir merkezine ulaşım seçeneklerini detaylandırdım.',
    user: 'Fatih Yılmaz',
    role: 'Gezgin',
    upvotes: 15,
    timeAgo: '1 hafta önce',
    avatarColor: 'bg-blue-600'
  }
];

// Mock data - Wiki contributions (FeedScreen format)
const mockWikiEntries = [
  {
    id: 'wiki-1',
    title: 'Alaaddin Tepesi',
    category: 'Sosyal Yaşam' as const,
    categoryId: 'sosyal-yasam',
    data: {
      type: 'venue' as const,
      fields: [
        { icon: MapPin, label: 'Mekan', value: 'Alaaddin Tepesi, Konya', editable: true, key: 'venue' },
        { icon: ClockIcon, label: 'Saatler', value: '24/7 açık', editable: true, key: 'hours' },
        { icon: Coffee, label: 'Açıklama', value: 'Konya\'nın en güzel manzara noktalarından biri. Öğrenciler için harika bir çalışma ortamı.', editable: true, key: 'description' }
      ]
    },
    lastEditedBy: 'Fatih Yılmaz',
    lastEditedAt: '1 hafta önce',
    version: 1,
    upvotes: 67,
    downvotes: 2,
    isOwnEntry: true
  },
  {
    id: 'wiki-2',
    title: 'Konya\'da Ulaşım Rehberi',
    category: 'Akademik Destek' as const,
    categoryId: 'akademik-destek',
    data: {
      type: 'general' as const,
      fields: [
        { icon: MapPin, label: 'Kapsam', value: 'Toplu taşıma ve ulaşım bilgileri', editable: true, key: 'scope' },
        { icon: BookOpen, label: 'Açıklama', value: 'Konya\'da öğrenciler için toplu taşıma ve ulaşım bilgileri. Tramvay, otobüs hatları ve öğrenci indirimleri.', editable: true, key: 'description' }
      ]
    },
    lastEditedBy: 'Fatih Yılmaz',
    lastEditedAt: '2 hafta önce',
    version: 1,
    upvotes: 89,
    downvotes: 1,
    isOwnEntry: true
  }
];

export const ContributionsScreen = ({
  onBack,
  activeTab = 'profile',
  onTabChange,
  onGameCenterClick,
  onGameSelect,
  onWalletOpen
}: ContributionsScreenProps) => {
  const { isDarkMode } = useTheme();
  const [activeFilter, setActiveFilter] = React.useState<'all' | 'posts' | 'comments' | 'wiki'>('all');
  const [isEditWikiOpen, setIsEditWikiOpen] = React.useState(false);
  const [editingWikiEntry, setEditingWikiEntry] = React.useState<any>(null);
  const [isEditCommentOpen, setIsEditCommentOpen] = React.useState(false);
  const [editingComment, setEditingComment] = React.useState<any>(null);
  const [editCommentContent, setEditCommentContent] = React.useState('');
  const [isEditPostOpen, setIsEditPostOpen] = React.useState(false);
  const [editingPost, setEditingPost] = React.useState<any>(null);
  const [posts, setPosts] = React.useState(mockPosts);
  const [comments, setComments] = React.useState(mockComments);
  const [wikiEntries, setWikiEntries] = React.useState(mockWikiEntries);

  const filteredPosts = activeFilter === 'all' || activeFilter === 'posts'
    ? posts 
    : [];
  const filteredComments = activeFilter === 'all' || activeFilter === 'comments'
    ? comments
    : [];
  const filteredWiki = activeFilter === 'all' || activeFilter === 'wiki' 
    ? wikiEntries 
    : [];

  const handleEditWiki = (entry: any) => {
    // Convert to CreateWikiModal format
    const editEntry = {
      id: entry.id,
      title: entry.title,
      category: entry.category,
      categoryId: entry.categoryId,
      data: {
        fields: entry.data.fields.map((field: any) => ({
          key: field.key,
          label: field.label,
          value: typeof field.value === 'string' ? field.value : String(field.value || '')
        }))
      }
    };
    setEditingWikiEntry(editEntry);
    setIsEditWikiOpen(true);
  };

  const handleEditComment = (comment: any) => {
    setEditingComment(comment);
    setEditCommentContent(comment.content);
    setIsEditCommentOpen(true);
  };

  const handleCommentSave = () => {
    if (!editCommentContent.trim() || !editingComment) return;
    
    setComments(comments.map(comment => {
      if (comment.id === editingComment.id) {
        return { ...comment, content: editCommentContent, timeAgo: 'Az önce' };
      }
      return comment;
    }));
    setIsEditCommentOpen(false);
    setEditingComment(null);
    setEditCommentContent('');
    toast.success('Yorum başarıyla güncellendi!');
  };

  const handleEditPost = (post: any) => {
    // Map badge to category id
    const badgeToCategory: Record<string, string> = {
      'Akademik': 'akademik',
      'Sosyal': 'sosyal',
      'Yeme-İçme': 'yeme-icme',
      'Barınma': 'barinma',
      'İkinci El': 'ikinci-el',
    };
    setEditingPost({
      ...post,
      category: badgeToCategory[post.badge] || 'akademik'
    });
    setIsEditPostOpen(true);
  };

  const handlePostSave = (updatedPost: any) => {
    setPosts(posts.map(post => {
      if (post.id === updatedPost.id) {
        return { ...post, ...updatedPost, timeAgo: 'Az önce' };
      }
      return post;
    }));
    setIsEditPostOpen(false);
    setEditingPost(null);
    toast.success('Post başarıyla güncellendi!');
  };

  const handleWikiSave = (updatedEntry: any) => {
    // Find category ID from category name
    const categoryMap: Record<string, string> = {
      'Topluluk Onaylı': 'topluluk-onayli',
      'Akademik Destek': 'akademik-destek',
      'Barınma & Yaşam': 'barinma-yasam',
      'Sosyal Yaşam': 'sosyal-yasam',
      'Kariyer & Gelişim': 'kariyer-gelisim',
    };
    const categoryId = categoryMap[updatedEntry.category] || 'topluluk-onayli';

    // Get icon mapping for fields
    const getIconForField = (key: string, categoryId: string) => {
      const fieldConfigs: Record<string, any> = {
        'topluluk-onayli': { address: MapPin, hours: ClockIcon, menu: Paperclip, description: Coffee },
        'akademik-destek': { course: FileText, professor: User, description: BookOpen, resources: Paperclip },
        'sosyal-yasam': { venue: MapPin, hours: ClockIcon, description: Coffee },
      };
      const icons = fieldConfigs[categoryId] || {};
      return icons[key] || FileText;
    };

    // Update wiki entry
    setWikiEntries(wikiEntries.map(entry => {
      if (entry.id === updatedEntry.id) {
        return {
          ...entry,
          title: updatedEntry.title,
          category: updatedEntry.category as any,
          categoryId: categoryId,
          data: {
            ...entry.data,
            fields: updatedEntry.data.fields.map((field: any) => ({
              icon: getIconForField(field.key, categoryId),
              label: field.label,
              value: field.value,
              editable: true,
              key: field.key
            }))
          },
          version: entry.version + 1,
          lastEditedAt: 'Az önce',
          lastEditedBy: 'Fatih Yılmaz'
        };
      }
      return entry;
    }));
    setIsEditWikiOpen(false);
    setEditingWikiEntry(null);
    toast.success('Wiki girişi başarıyla güncellendi!');
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
              <h1 className={`text-3xl font-black ${isDarkMode ? 'text-white' : 'text-[#19142e]'} mb-2`}>Katkılarım</h1>
              <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-[#8279a5]'}`}>
                Paylaştığın postlar, yorumlar ve wiki girişleri
              </p>
            </div>

            {/* Filter Tabs */}
            <div className="mb-6 px-4 lg:px-0">
              <div className="flex gap-2 overflow-x-auto scrollbar-hide">
                {[
                  { id: 'all', label: 'Tümü', icon: null },
                  { id: 'posts', label: 'Postlar', icon: Edit3 },
                  { id: 'comments', label: 'Yorumlar', icon: MessageSquare },
                  { id: 'wiki', label: 'Wiki', icon: FileText }
                ].map((filter) => {
                  const Icon = filter.icon;
                  return (
                    <button
                      key={filter.id}
                      onClick={() => setActiveFilter(filter.id as any)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-sm whitespace-nowrap transition-all ${
                        activeFilter === filter.id
                          ? 'bg-[#5852c4] text-white shadow-lg shadow-[#5852c4]/30'
                          : isDarkMode
                          ? 'bg-[#1a1a2e] text-slate-400 hover:text-white'
                          : 'bg-white text-[#8279a5] hover:text-[#19142e]'
                      }`}
                    >
                      {Icon && <Icon className="w-4 h-4" strokeWidth={2.5} />}
                      {filter.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Content - FeedScreen style */}
            <div className="px-4 lg:px-0">
              {/* Feed Posts Section */}
              {(activeFilter === 'all' || activeFilter === 'posts') && filteredPosts.length > 0 && (
                <section className={`transition-colors lg:rounded-[10px] lg:shadow-[0_2px_12px_rgba(25,20,46,0.08)] ${
                  isDarkMode ? 'bg-[#1a1a2e]' : 'bg-white'
                }`}>
                  {filteredPosts.map((post, index) => (
                    <PostCard
                      key={post.id}
                      post={post}
                      index={index}
                      totalPosts={filteredPosts.length}
                      onClick={() => console.log('Post clicked:', post.id)}
                      onEdit={handleEditPost}
                      showEdit={true}
                    />
                  ))}
                </section>
              )}

              {/* Comments Section */}
              {(activeFilter === 'all' || activeFilter === 'comments') && filteredComments.length > 0 && (
                <section className={`transition-colors lg:rounded-[10px] lg:shadow-[0_2px_12px_rgba(25,20,46,0.08)] ${
                  (activeFilter === 'all' && filteredPosts.length > 0) ? 'mt-4' : ''
                } ${isDarkMode ? 'bg-[#1a1a2e]' : 'bg-white'}`}>
                  {filteredComments.map((comment, index) => (
                    <div
                      key={comment.id}
                      className={`px-6 py-4 transition-all duration-200 ${
                        index !== filteredComments.length - 1 
                          ? (isDarkMode ? 'border-b border-slate-700' : 'border-b border-gray-100')
                          : ''
                      } ${isDarkMode ? 'hover:bg-slate-800/50' : 'hover:bg-gray-50/80'}`}
                    >
                      <div className="flex gap-3">
                        {/* Left: Icon */}
                        <div className="flex-shrink-0">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${comment.avatarColor} text-white font-bold`}>
                            {comment.user.charAt(0)}
                          </div>
                        </div>

                        {/* Right: Content */}
                        <div className="flex-1 min-w-0">
                          {/* Header */}
                          <div className="flex items-baseline justify-between mb-1">
                            <div className="flex items-baseline gap-1.5 flex-wrap">
                              <span className={`text-xs font-semibold ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>
                                Yorum
                              </span>
                              <span className={`text-xs ${isDarkMode ? 'text-slate-500' : 'text-gray-400'}`}>•</span>
                              <span className={`text-xs font-bold ${isDarkMode ? 'text-white' : 'text-[#19142e]'}`}>
                                {comment.user}
                              </span>
                              <span className={`text-xs ${isDarkMode ? 'text-slate-500' : 'text-gray-400'}`}>•</span>
                              <span className={`text-xs ${isDarkMode ? 'text-slate-500' : 'text-gray-400'}`}>
                                {comment.timeAgo}
                              </span>
                            </div>
                          </div>

                          {/* Post Title */}
                          <div className="mb-2">
                            <span className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>
                              Post: 
                            </span>
                            <span className={`text-sm font-semibold ml-1 ${isDarkMode ? 'text-slate-300' : 'text-gray-700'}`}>
                              {comment.postTitle}
                            </span>
                          </div>

                          {/* Comment Text */}
                          <p className={`text-sm leading-relaxed mb-3 ${
                            isDarkMode ? 'text-slate-300' : 'text-gray-700'
                          }`}>
                            {comment.content}
                          </p>

                          {/* Actions */}
                          <div className={`flex gap-6 ${isDarkMode ? 'text-slate-500' : 'text-gray-400'}`}>
                            <button
                              onClick={() => handleEditComment(comment)}
                              className="flex items-center gap-1.5 group"
                            >
                              <Edit3 className={`w-4 h-4 transition-colors ${
                                isDarkMode 
                                  ? 'text-slate-500 group-hover:text-slate-300' 
                                  : 'text-gray-400 group-hover:text-gray-600'
                              }`} strokeWidth={2} />
                              <span className={`text-sm transition-colors ${
                                isDarkMode 
                                  ? 'text-slate-400 group-hover:text-slate-200' 
                                  : 'text-gray-500 group-hover:text-gray-700'
                              }`}>Düzenle</span>
                            </button>
                            <div className="flex items-center gap-1">
                              <MessageSquare className="w-4 h-4" strokeWidth={2} />
                              <span className="text-sm">👍 {comment.upvotes}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </section>
              )}

              {/* Wiki Entries Section - FeedScreen style */}
              {(activeFilter === 'all' || activeFilter === 'wiki') && filteredWiki.length > 0 && (
                <section className={`transition-colors lg:rounded-[10px] lg:shadow-[0_2px_12px_rgba(25,20,46,0.08)] ${
                  (activeFilter === 'all' && filteredPosts.length > 0) ? 'mt-4' : ''
                } ${isDarkMode ? 'bg-[#1a1a2e]' : 'bg-white'}`}>
                  {filteredWiki.map((entry, index) => (
                    <WikiEntryCard
                      key={entry.id}
                      title={entry.title}
                      category={entry.category}
                      data={entry.data}
                      lastEditedBy={entry.lastEditedBy}
                      lastEditedAt={entry.lastEditedAt}
                      version={entry.version}
                      index={index}
                      totalEntries={filteredWiki.length}
                      onHistoryClick={() => console.log('📜 History:', entry.title)}
                      onEditClick={() => handleEditWiki(entry)}
                      onClick={() => console.log('Wiki entry clicked')}
                    />
                  ))}
                </section>
              )}

              {/* Empty State */}
              {filteredPosts.length === 0 && filteredComments.length === 0 && filteredWiki.length === 0 && (
                <section className={`transition-colors lg:rounded-[10px] lg:shadow-[0_2px_12px_rgba(25,20,46,0.08)] ${
                  isDarkMode ? 'bg-[#1a1a2e]' : 'bg-white'
                }`}>
                  <div className="text-center py-12">
                    <p className={`${isDarkMode ? 'text-slate-400' : 'text-[#8279a5]'}`}>
                      Henüz katkı bulunmuyor.
                    </p>
                  </div>
                </section>
              )}
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

      {/* Edit Wiki Modal */}
      <CreateWikiModal
        isOpen={isEditWikiOpen}
        onClose={() => {
          setIsEditWikiOpen(false);
          setEditingWikiEntry(null);
        }}
        editEntry={editingWikiEntry}
        onSave={handleWikiSave}
      />

      {/* Edit Comment Modal */}
      <AnimatePresence>
        {isEditCommentOpen && editingComment && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center px-5"
            onClick={() => {
              setIsEditCommentOpen(false);
              setEditingComment(null);
            }}
          >
            {/* Backdrop */}
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
              {/* Header */}
              <div className="bg-gradient-to-br from-[#5852c4] to-[#8B5CF6] px-6 py-4">
                <h2 className="text-xl font-black text-white">Yorumu Düzenle</h2>
                <p className="text-sm text-white/80 mt-1">{editingComment.postTitle}</p>
              </div>

              {/* Content */}
              <div className="px-6 py-6">
                <div className="space-y-2">
                  <Label htmlFor="commentContent" className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-[#8279a5]'}`}>
                    Yorum İçeriği
                  </Label>
                  <textarea
                    id="commentContent"
                    value={editCommentContent}
                    onChange={(e) => setEditCommentContent(e.target.value)}
                    className={`w-full px-4 py-3 rounded-lg border-2 resize-none min-h-[120px] transition-all outline-none ${
                      isDarkMode 
                        ? 'bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 focus:border-[#5852c4]' 
                        : 'bg-white border-gray-200 text-gray-900 placeholder:text-gray-400 focus:border-[#5852c4]'
                    }`}
                    placeholder="Yorumunuzu yazın..."
                  />
                </div>
              </div>

              {/* Footer */}
              <div className={`px-6 py-4 border-t ${
                isDarkMode ? 'border-slate-700' : 'border-gray-200'
              } flex gap-3`}>
                <button
                  onClick={() => {
                    setIsEditCommentOpen(false);
                    setEditingComment(null);
                    setEditCommentContent('');
                  }}
                  className={`flex-1 px-4 py-2.5 rounded-lg font-bold transition-all ${
                    isDarkMode
                      ? 'bg-slate-700 text-white hover:bg-slate-600'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  İptal
                </button>
                <button
                  onClick={handleCommentSave}
                  disabled={!editCommentContent.trim()}
                  className="flex-1 px-4 py-2.5 rounded-lg bg-[#5852c4] hover:bg-[#6c5ce7] text-white font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-[#5852c4]/30"
                >
                  Kaydet
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Edit Post Modal */}
      <CreatePostModal
        isOpen={isEditPostOpen}
        onClose={() => {
          setIsEditPostOpen(false);
          setEditingPost(null);
        }}
        editPost={editingPost}
        onSave={handlePostSave}
      />
    </div>
  );
};

