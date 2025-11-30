import React, { useState } from 'react';
import { 
  Share2, 
  MapPin, 
  Clock, 
  Link as LinkIcon, 
  Edit3, 
  ThumbsUp, 
  ThumbsDown, 
  History,
  MessageCircle,
  MoreVertical,
  ArrowLeft
} from 'lucide-react';
import { GlobalHeader } from '../layout/GlobalHeader';

// Mock Topic Data (Wiki Content)
const TOPIC_DATA = {
  id: 'topic_123',
  title: 'Selçuk Üniversitesi Yemekhane',
  category: 'Yeme-İçme',
  wikiContent: {
    description: 'Selçuk Üniversitesi Alaeddin Keykubat Kampüsü\'nde bulunan merkezi yemekhane. Öğle ve akşam saatlerinde çorba, ana yemek, pilav ve tatlı ikramı yapılmaktadır. Öğrenci kartı ile ödeme kabul edilir.',
    infoGrid: [
      { icon: MapPin, label: 'Adres', value: 'Alaeddin Keykubat Kampüsü, Zemin Kat' },
      { icon: Clock, label: 'Saatler', value: '11:30 - 14:00 | 17:00 - 19:30' },
      { icon: LinkIcon, label: 'Menü', value: 'selcuk.edu.tr/yemekhane-menu' }
    ],
    lastUpdated: {
      user: 'Fatih K.',
      rank: 'Gezgin',
      date: '2 gün önce'
    },
    upvotes: 124,
    downvotes: 8
  },
  isVerified: true
};

// Mock Comments Data
const TOPIC_COMMENTS = [
  {
    id: 'comment_1',
    user: 'Zeynep A.',
    role: 'Seyyah',
    avatarColor: 'bg-purple-600',
    timeAgo: '5dk',
    text: 'Bugün mercimek çorbası çok güzeldi ama pilav biraz yavan kalmış. Genel olarak fiyatına göre değer 👍',
    upvotes: 12,
    replies: 3
  },
  {
    id: 'comment_2',
    user: 'Mehmet S.',
    role: 'Bilge',
    avatarColor: 'bg-blue-600',
    timeAgo: '2s',
    text: 'Klima çok soğuk çalışıyor, özellikle pencere kenarındaki masalara oturmayın. Hırka/ceket alın mutlaka.',
    upvotes: 45,
    replies: 8
  },
  {
    id: 'comment_3',
    user: 'Ayşe D.',
    role: 'Yeni Gelen',
    avatarColor: 'bg-emerald-600',
    timeAgo: '1sa',
    text: 'Öğrenci kartımı unuttum, nakit ödeme kabul ediyorlar mı?',
    upvotes: 3,
    replies: 5
  },
  {
    id: 'comment_4',
    user: 'Can Y.',
    role: 'Gezgin',
    avatarColor: 'bg-amber-500',
    timeAgo: '3sa',
    text: 'Vegan seçenek var mı? Sadece salata dışında bitki bazlı ana yemek seçeneği göremedim.',
    upvotes: 28,
    replies: 12
  }
];

// Pastel Avatar Helper
const getPastelAvatarStyle = (avatarColor: string) => {
  const pastelMap: Record<string, { bg: string; text: string }> = {
    'bg-blue-600': { bg: 'bg-blue-100', text: 'text-blue-700' },
    'bg-amber-500': { bg: 'bg-amber-100', text: 'text-amber-700' },
    'bg-emerald-600': { bg: 'bg-emerald-100', text: 'text-emerald-700' },
    'bg-purple-600': { bg: 'bg-purple-100', text: 'text-purple-700' },
    'bg-pink-600': { bg: 'bg-pink-100', text: 'text-pink-700' },
  };
  return pastelMap[avatarColor] || { bg: 'bg-slate-100', text: 'text-slate-700' };
};

interface TopicDetailScreenProps {
  onBack?: () => void;
  activeTab?: string;
  onTabChange?: (tab: string) => void;
  onGameCenterClick?: () => void;
}

export default function TopicDetailScreen({ onBack, activeTab = 'home', onTabChange, onGameCenterClick }: TopicDetailScreenProps) {
  const [filterMode, setFilterMode] = useState<'newest' | 'popular'>('newest');
  const [wikiVote, setWikiVote] = useState<'up' | 'down' | null>(null);

  return (
    <div className="min-h-screen bg-[#f2f3f7] pb-28 lg:pb-6">
      {/* Desktop: GlobalHeader */}
      <div className="hidden lg:block">
        <GlobalHeader 
          type="rich"
          onWalletClick={undefined}
          coinBalance="2.450"
          onSearchClick={() => console.log('🔍 Search clicked')}
          onFilterClick={() => console.log('🎯 Filter clicked')}
          activeTab={activeTab}
          onTabChange={onTabChange}
          onGameCenterClick={onGameCenterClick}
          onBackClick={onBack}
        />
      </div>

      {/* Mobile: Simple Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50">
        <div className="px-5 h-14 flex items-center justify-between">
          {/* Left: Back + Logo */}
          <div className="flex items-center gap-3">
            <button onClick={onBack} className="-ml-2 p-2 text-gray-600 hover:text-gray-900">
              <ArrowLeft className="w-5 h-5" strokeWidth={2.5} />
            </button>
            <h1 className="font-bold text-lg text-[#1A3C75]">KonyaGenç</h1>
          </div>

          {/* Right: Coin Display */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 rounded-full">
            <div className="w-5 h-5 rounded-full bg-gradient-to-br from-amber-400 to-amber-600" />
            <span className="font-bold text-sm text-gray-900">1,247</span>
          </div>
        </div>
      </header>

      {/* SUB-HEADER - Sticky Topic Title Bar */}
      <div className="fixed top-14 lg:top-[60px] left-0 right-0 bg-white border-b border-gray-100 z-40">
        <div className="max-w-[1200px] mx-auto px-5 lg:px-6 h-12 flex items-center justify-between">
          <h2 className="font-bold text-gray-900 truncate">{TOPIC_DATA.title}</h2>
          <button className="p-2 text-gray-500 hover:text-gray-700">
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <main className="max-w-[1200px] mx-auto pt-[104px] lg:pt-[132px] px-0 lg:px-6 pb-4">
        <div className="flex gap-6">
          {/* LEFT COLUMN - Content (70%) */}
          <div className="w-full lg:w-[70%]">
            
            {/* SECTION A: WIKI AREA (Objective Info) */}
            <section className="bg-white rounded-[10px] border border-gray-200 p-6 mb-6 shadow-sm">
              {/* Verified Badge (if applicable) */}
              {TOPIC_DATA.isVerified && (
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-blue-50 text-blue-700 rounded-md text-xs font-semibold mb-4">
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Topluluk Onaylı
                </div>
              )}

              {/* Title */}
              <h1 className="font-bold text-2xl text-gray-900 mb-4">{TOPIC_DATA.title}</h1>

              {/* Sohbet İçeriği - Sadece Description (Adres, Saat, Menü kaldırıldı) */}
              <p className="text-gray-700 leading-relaxed mb-6 text-lg">
                {TOPIC_DATA.wikiContent.description}
              </p>

              {/* Actions Row */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                {/* Left: Useful/Not Useful Votes */}
                <div className="flex items-center gap-4">
                  <span className="text-xs text-gray-500 font-medium">Bu bilgi yararlı mı?</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setWikiVote(wikiVote === 'up' ? null : 'up')}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-colors ${
                        wikiVote === 'up'
                          ? 'bg-emerald-50 text-emerald-700'
                          : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      <ThumbsUp className="w-4 h-4" />
                      <span className="text-sm font-semibold">{TOPIC_DATA.wikiContent.upvotes}</span>
                    </button>
                    <button
                      onClick={() => setWikiVote(wikiVote === 'down' ? null : 'down')}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-colors ${
                        wikiVote === 'down'
                          ? 'bg-red-50 text-red-700'
                          : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      <ThumbsDown className="w-4 h-4" />
                      <span className="text-sm font-semibold">{TOPIC_DATA.wikiContent.downvotes}</span>
                    </button>
                  </div>
                </div>

                {/* Right: Edit Button */}
                <button className="flex items-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-md transition-colors font-semibold">
                  <Edit3 className="w-4 h-4" />
                  Düzenle
                </button>
              </div>

              {/* Meta Info */}
              <div className="flex items-center gap-4 mt-4 text-xs text-gray-500">
                <div className="flex items-center gap-1.5">
                  <History className="w-3.5 h-3.5" />
                  <span>
                    Son güncelleme: <span className="font-semibold text-gray-700">{TOPIC_DATA.wikiContent.lastUpdated.user}</span> ({TOPIC_DATA.wikiContent.lastUpdated.rank}) • {TOPIC_DATA.wikiContent.lastUpdated.date}
                  </span>
                </div>
                <button className="text-blue-600 hover:text-blue-700 font-medium">
                  Sürüm Geçmişi
                </button>
              </div>
            </section>

            {/* SECTION B: DICTIONARY AREA (Subjective Comments) */}
            <section>
              {/* Separator Header */}
              <div className="bg-white rounded-t-[10px] border border-b-0 border-gray-200 px-6 py-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-gray-900">Öğrenci Yorumları</h3>
                  
                  {/* Filter Tabs */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setFilterMode('newest')}
                      className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                        filterMode === 'newest'
                          ? 'bg-gray-900 text-white'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      En Yeniler
                    </button>
                    <button
                      onClick={() => setFilterMode('popular')}
                      className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                        filterMode === 'popular'
                          ? 'bg-gray-900 text-white'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      En Beğenilenler
                    </button>
                  </div>
                </div>
              </div>

              {/* Comments Feed */}
              <div className="bg-white rounded-b-[10px] border border-gray-200">
                {TOPIC_COMMENTS.map((comment, index) => {
                  const pastel = getPastelAvatarStyle(comment.avatarColor);
                  
                  return (
                    <article
                      key={comment.id}
                      className={`px-6 py-4 hover:bg-gray-50/80 transition-colors ${
                        index !== TOPIC_COMMENTS.length - 1 ? 'border-b border-gray-100' : ''
                      }`}
                    >
                      <div className="flex gap-3">
                        {/* Avatar */}
                        <div className="flex-shrink-0">
                          <div className={`w-10 h-10 rounded-full ${pastel.bg} ${pastel.text} flex items-center justify-center font-bold text-sm`}>
                            {comment.user.charAt(0)}
                          </div>
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          {/* Header */}
                          <div className="flex items-baseline justify-between mb-1">
                            <div className="flex items-baseline gap-1.5 flex-wrap">
                              <span className="font-bold text-gray-900">{comment.user}</span>
                              <span className="text-gray-500 text-xs">@{comment.role}</span>
                              <span className="text-gray-400 text-xs">•</span>
                              <span className="text-gray-400 text-xs">{comment.timeAgo}</span>
                            </div>
                            
                            <button className="p-1 text-gray-400 hover:text-gray-600">
                              <MoreVertical className="w-4 h-4" />
                            </button>
                          </div>

                          {/* Comment Text */}
                          <p className="text-gray-700 text-[15px] leading-relaxed mb-3">
                            {comment.text}
                          </p>

                          {/* Actions */}
                          <div className="flex gap-6 text-gray-400">
                            <button className="flex items-center gap-1.5 group">
                              <ThumbsUp className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors" strokeWidth={2} />
                              <span className="text-sm text-gray-500 group-hover:text-gray-700">{comment.upvotes}</span>
                            </button>

                            <button className="flex items-center gap-1.5 group">
                              <MessageCircle className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors" strokeWidth={2} />
                              <span className="text-sm text-gray-500 group-hover:text-gray-700">{comment.replies}</span>
                            </button>

                            <button className="group">
                              <Share2 className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors" strokeWidth={2} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </section>
          </div>

          {/* RIGHT COLUMN - Sidebar (30%) - Desktop Only */}
          <aside className="hidden lg:block w-[30%]">
            <div className="sticky top-[120px]">
              {/* Related Topics Card */}
              <div className="bg-white rounded-[10px] border border-gray-200 p-5">
                <h4 className="font-bold text-gray-900 mb-4">Benzer Konular</h4>
                <div className="space-y-3">
                  <a href="#" className="block p-3 rounded-md hover:bg-gray-50 transition-colors">
                    <div className="font-semibold text-sm text-gray-900 mb-1">Kampüs Kafeteryası</div>
                    <div className="text-xs text-gray-500">124 yorum</div>
                  </a>
                  <a href="#" className="block p-3 rounded-md hover:bg-gray-50 transition-colors">
                    <div className="font-semibold text-sm text-gray-900 mb-1">Öğrenci Evleri Yemek Servisi</div>
                    <div className="text-xs text-gray-500">89 yorum</div>
                  </a>
                  <a href="#" className="block p-3 rounded-md hover:bg-gray-50 transition-colors">
                    <div className="font-semibold text-sm text-gray-900 mb-1">Uygun Fiyatlı Restoranlar</div>
                    <div className="text-xs text-gray-500">203 yorum</div>
                  </a>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>

      {/* FLOATING ACTION BUTTON - Add Comment */}
      <button className="fixed bottom-6 right-6 w-14 h-14 bg-[#5852c4] hover:bg-[#4a42b0] text-white rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-105 z-40">
        <MessageCircle className="w-6 h-6" fill="currentColor" />
      </button>
    </div>
  );
}
