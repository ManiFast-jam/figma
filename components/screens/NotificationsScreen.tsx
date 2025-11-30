import React, { useState } from 'react';
import { Coins, Info, CheckCircle2, Trophy, Reply, ArrowRight, FileText, MessageCircle, Eye } from 'lucide-react';
import { GlobalHeader } from '../layout/GlobalHeader';
import { WalletModal } from '../wallet/WalletModal';
import { PageLayout } from '../layout/PageLayout';
import { useTheme } from '../../contexts/ThemeContext';

// User Contributions Data
const CONTRIBUTIONS = [
  {
    id: 1,
    type: 'wiki_edit',
    icon: FileText,
    title: 'Selçuk Hukuk Notları başlığını düzenledin',
    time: '2 saat önce',
    status: 'Onaylandı',
    statusColor: '#10b981'
  },
  {
    id: 2,
    type: 'comment',
    icon: MessageCircle,
    title: 'Alaaddin Tepesi Etkinliği konusuna yorum yaptınız',
    time: '5 saat önce',
    status: 'Aktif',
    statusColor: '#5852c4'
  },
  {
    id: 3,
    type: 'wiki_edit',
    icon: FileText,
    title: 'KTO Karatay Üniversitesi başlığını oluşturdun',
    time: '1 gün önce',
    status: 'Onaylandı',
    statusColor: '#10b981'
  },
  {
    id: 4,
    type: 'comment',
    icon: MessageCircle,
    title: 'Mevlana Müzesi yorumuna yanıt verdin',
    time: '2 gün önce',
    status: 'Aktif',
    statusColor: '#5852c4'
  },
];

const NOTIFICATION_GROUPS = [
  {
    label: 'BUGÜN',
    items: [
      { 
        id: 1, 
        type: 'reward', 
        title: 'Haftalık Seri Bonusu',
        text: 'Harika gidiyorsun! Bu hafta her gün giriş yaptığın için bonus kazandın.',
        amount: '+50 GC',
        time: '2 dk önce',
        isRead: false
      },
      { 
        id: 2, 
        type: 'interaction', 
        user: 'Ahmet Y.',
        userInitials: 'AY',
        userColor: 'bg-blue-600',
        text: 'yorumuna cevap verdi.',
        time: '15 dk önce',
        isRead: false,
        canReply: true
      }
    ]
  },
  {
    label: 'BU HAFTA',
    items: [
      { 
        id: 3, 
        type: 'interaction',
        user: 'Zeynep K.',
        userInitials: 'ZK',
        userColor: 'bg-purple-600',
        text: 'profilini görüntüledi.',
        time: 'Dün',
        isRead: true,
        canReply: false
      },
      { 
        id: 4, 
        type: 'reward', 
        title: 'Etkinlik Katılımı',
        text: 'Kampüs festivaline katılımın doğrulandı.',
        amount: '+120 GC',
        time: 'Pazartesi',
        isRead: true
      },
      { 
        id: 5, 
        type: 'interaction', 
        user: 'Mehmet D.',
        userInitials: 'MD',
        userColor: 'bg-emerald-600',
        text: 'gönderini beğendi.',
        time: 'Pazartesi',
        isRead: true,
        canReply: false
      },
      { 
        id: 6, 
        type: 'system', 
        text: 'Sistem bakımı tamamlandı. Artık daha hızlıyız!', 
        time: 'Pazartesi',
        isRead: true
      }
    ]
  }
];

interface NotificationsScreenProps {
  activeTab?: string;
  onTabChange?: (tab: string) => void;
  onGameCenterClick?: () => void;
}

export const NotificationsScreen = ({ 
  activeTab = 'notifications',
  onTabChange,
  onGameCenterClick,
}: NotificationsScreenProps = {}) => {
  const { isDarkMode } = useTheme();
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  
  const renderNotificationCard = (item: any) => {
    // TYPE A: REWARD (Coin notifications)
    if (item.type === 'reward') {
      return (
        <div 
          key={item.id} 
          className={`w-full p-4 border-b last:border-b-0 flex items-center gap-4 transition-colors cursor-pointer ${
            isDarkMode 
              ? 'bg-[#1a1a2e] border-slate-700/50 hover:bg-slate-800/50' 
              : 'bg-white border-[#ededff] hover:bg-[#f2f3f7]'
          }`}
        >
          {/* Coin Icon */}
          <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
            isDarkMode ? 'bg-amber-500/20' : 'bg-amber-50'
          }`}>
            <Coins className="w-5 h-5 text-[#F59E0B]" strokeWidth={2.5} />
          </div>
          
          {/* Content */}
          <div className="flex-1 min-w-0">
            <h4 className={`font-bold text-sm mb-0.5 ${
              isDarkMode ? 'text-white' : 'text-[#19142e]'
            }`}>{item.title}</h4>
            <p className={`text-xs line-clamp-1 ${
              isDarkMode ? 'text-slate-400' : 'text-[#8279a5]'
            }`}>{item.text}</p>
            <span className={`text-xs mt-1 block ${
              isDarkMode ? 'text-slate-500' : 'text-[#8279a5]'
            }`}>{item.time}</span>
          </div>
          
          {/* Amount */}
          <div className="flex-shrink-0">
            <span className="font-black text-emerald-600 text-sm">{item.amount}</span>
          </div>

          {/* Unread Indicator */}
          {!item.isRead && (
            <div className="w-2 h-2 rounded-full bg-[#5852c4] flex-shrink-0" />
          )}
        </div>
      );
    }

    // TYPE B: SOCIAL (User interactions)
    if (item.type === 'interaction') {
      return (
        <div 
          key={item.id} 
          className={`w-full p-4 border-b last:border-b-0 transition-colors cursor-pointer ${
            isDarkMode 
              ? 'bg-[#1a1a2e] border-slate-700/50 hover:bg-slate-800/50' 
              : 'bg-white border-[#ededff] hover:bg-[#f2f3f7]'
          }`}
        >
          <div className="flex items-start gap-4">
            {/* Avatar */}
            <div className={`w-10 h-10 rounded-full ${item.userColor} flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}>
              {item.userInitials}
            </div>
            
            {/* Content */}
            <div className="flex-1 min-w-0">
              <p className={`text-sm leading-snug ${
                isDarkMode ? 'text-slate-300' : 'text-[#8279a5]'
              }`}>
                <span className={`font-bold ${
                  isDarkMode ? 'text-white' : 'text-[#19142e]'
                }`}>{item.user}</span> {item.text}
              </p>
              <span className={`text-xs mt-1 block ${
                isDarkMode ? 'text-slate-500' : 'text-[#8279a5]'
              }`}>{item.time}</span>
            </div>

            {/* Unread Indicator */}
            {!item.isRead && (
              <div className="w-2 h-2 rounded-full bg-[#5852c4] mt-1 flex-shrink-0" />
            )}
          </div>

          {/* Reply Action */}
          {item.canReply && (
            <div className="ml-14 mt-2">
              <button className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                isDarkMode 
                  ? 'bg-slate-700/50 text-slate-300 hover:bg-slate-600' 
                  : 'bg-[#f2f3f7] text-[#8279a5] hover:bg-[#ededff] hover:text-[#5852c4]'
              }`}>
                <Reply className="w-3.5 h-3.5" />
                Yanıtla
              </button>
            </div>
          )}
        </div>
      );
    }

    // TYPE C: SYSTEM (Standard notifications)
    return (
      <div 
        key={item.id} 
        className={`w-full p-4 border-b last:border-b-0 flex items-start gap-4 transition-colors cursor-pointer ${
          isDarkMode 
            ? 'bg-[#1a1a2e] border-slate-700/50 hover:bg-slate-800/50' 
            : 'bg-white border-[#ededff] hover:bg-[#f2f3f7]'
        }`}
      >
        <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
          isDarkMode ? 'bg-slate-700/50 text-slate-400' : 'bg-[#f2f3f7] text-[#8279a5]'
        }`}>
          <Info className="w-5 h-5" />
        </div>
        <div className="flex-1 min-w-0">
          <p className={`text-sm leading-relaxed ${
            isDarkMode ? 'text-slate-300' : 'text-[#8279a5]'
          }`}>{item.text}</p>
          <span className={`text-xs mt-1 block ${
            isDarkMode ? 'text-slate-500' : 'text-[#8279a5]'
          }`}>{item.time}</span>
        </div>
      </div>
    );
  };

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

        {/* Main Content with PageLayout (70-30 grid) */}
        <div className="pt-[120px] lg:pt-[84px]">
          <PageLayout
            onTabChange={onTabChange}
            onWalletOpen={() => setIsWalletModalOpen(true)}
            onGameClick={() => {}}
            onGameCenterClick={onGameCenterClick}
          >
          
            {/* 1. PAGE TITLE */}
            <header className="px-5 lg:px-0 py-6 flex items-center justify-between">
              <h1 className={`text-2xl font-black transition-colors ${
                isDarkMode ? 'text-white' : 'text-[#19142e]'
              }`}>Aktivite Merkezi</h1>
              <button 
                className={`p-2 rounded-lg transition-colors group ${
                  isDarkMode ? 'hover:bg-slate-800' : 'hover:bg-white'
                }`}
                aria-label="Mark all as read"
              >
                <CheckCircle2 className={`w-5 h-5 transition-colors ${
                  isDarkMode ? 'text-slate-400 group-hover:text-[#5852c4]' : 'text-[#8279a5] group-hover:text-[#5852c4]'
                }`} strokeWidth={2.5} />
              </button>
            </header>

            {/* 2. DAILY SUMMARY CARD */}
            <div className="px-5 lg:px-0 mb-8">
              <div className={`relative overflow-hidden rounded-xl shadow-lg ${
                isDarkMode ? 'bg-gradient-to-br from-[#5852c4] via-[#4F46E5] to-[#3B82F6]' : 'bg-gradient-to-br from-[#5852c4] via-[#4F46E5] to-[#3B82F6]'
              }`}>
                {/* Content */}
                <div className="relative p-6 flex items-center justify-between">
                  <div>
                    <p className="text-white/90 text-sm font-bold mb-2">Bugün Kazanılan</p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-black text-white">+120</span>
                      <span className="text-lg font-bold text-white/90">GençCoin</span>
                    </div>
                  </div>
                  
                  {/* Trophy Icon */}
                  <div className="flex-shrink-0">
                    <Trophy className="w-12 h-12 text-[#FCD34D] drop-shadow-lg" strokeWidth={2} />
                  </div>
                </div>
              </div>
            </div>

            {/* 3. CONTRIBUTIONS LIST (Son Katkılarım) */}
            <div className="px-5 lg:px-0 mb-8">
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <h3 className={`text-lg font-black transition-colors ${
                  isDarkMode ? 'text-white' : 'text-[#19142e]'
                }`}>Son Katkılarım</h3>
                <button className={`text-sm font-bold transition-colors ${
                  isDarkMode 
                    ? 'text-[#5852c4] hover:text-white' 
                    : 'text-[#5852c4] hover:text-[#19142e]'
                }`}>
                  Tümünü Gör
                </button>
              </div>

              {/* Contribution Items */}
              <div className="space-y-3">
                {CONTRIBUTIONS.map((contribution) => {
                  const IconComponent = contribution.icon;
                  return (
                    <div 
                      key={contribution.id}
                      className={`rounded-xl p-4 shadow-sm border transition-all ${
                        isDarkMode 
                          ? 'bg-[#1a1a2e] border-slate-700/50 hover:bg-slate-800/50 hover:border-slate-600' 
                          : 'bg-white border-[#ededff] hover:shadow-md hover:border-[#5852c4]/20'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        {/* Left: Icon Container */}
                        <div className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center ${
                          isDarkMode ? 'bg-[#5852c4]/20' : 'bg-[#5852c4]/10'
                        }`}>
                          <IconComponent className="w-5 h-5 text-[#5852c4]" strokeWidth={2.5} />
                        </div>

                        {/* Center: Text Content */}
                        <div className="flex-1 min-w-0">
                          <p className={`text-sm font-bold mb-1 truncate ${
                            isDarkMode ? 'text-white' : 'text-[#19142e]'
                          }`}>
                            {contribution.title}
                          </p>
                          <div className="flex items-center gap-2 text-xs">
                            <span className={`font-semibold ${
                              isDarkMode ? 'text-slate-400' : 'text-[#8279a5]'
                            }`}>{contribution.time}</span>
                            <span className={isDarkMode ? 'text-slate-600' : 'text-[#8279a5]'}>•</span>
                            <span 
                              className="font-bold"
                              style={{ color: contribution.statusColor }}
                            >
                              {contribution.status}
                            </span>
                          </div>
                        </div>

                        {/* Right: Action Button */}
                        <button className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                          isDarkMode 
                            ? 'bg-slate-700/50 hover:bg-slate-600' 
                            : 'bg-[#f2f3f7] hover:bg-[#ededff]'
                        }`}>
                          <Eye className="w-4 h-4 text-[#5852c4]" strokeWidth={2.5} />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 4. NOTIFICATION LIST (GROUPED) */}
            <div className="px-5 lg:px-0 space-y-6">
              {NOTIFICATION_GROUPS.map((group) => (
                <div key={group.label}>
                  {/* Group Label */}
                  <div className="flex items-center gap-2 mb-3">
                    <div className={`w-1 h-1 rounded-full ${
                      isDarkMode ? 'bg-slate-500' : 'bg-[#8279a5]'
                    }`} />
                    <h3 className={`text-xs font-bold uppercase tracking-wider ${
                      isDarkMode ? 'text-slate-400' : 'text-[#8279a5]'
                    }`}>
                      {group.label}
                    </h3>
                  </div>
                  
                  {/* Group Items */}
                  <div className={`rounded-xl shadow-sm overflow-hidden border ${
                    isDarkMode 
                      ? 'bg-[#1a1a2e] border-slate-700/50' 
                      : 'bg-white border-[#ededff]'
                  }`}>
                    {group.items.map((item) => renderNotificationCard(item))}
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="px-5 lg:px-0 mt-8 text-center">
              <button className={`inline-flex items-center gap-2 text-xs font-bold transition-colors ${
                isDarkMode 
                  ? 'text-slate-400 hover:text-[#5852c4]' 
                  : 'text-[#8279a5] hover:text-[#5852c4]'
              }`}>
                Tüm geçmişi görüntüle
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </PageLayout>
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
