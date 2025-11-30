import React, { useState } from 'react';
import { BottomNavigation } from './components/layout/BottomNavigation';
import { FeedScreen } from './components/screens/FeedScreen';
import { ProfileScreen } from './components/screens/ProfileScreen';
import { DiscoverScreen } from './components/screens/DiscoverScreen';
import { NotificationsScreen } from './components/screens/NotificationsScreen';
import { PostDetailScreen } from './components/screens/PostDetailScreen';
import { AnnouncementDetailScreen } from './components/screens/AnnouncementDetailScreen';
import { WikiDetailScreen } from './components/screens/WikiDetailScreen';
import { ExamHeroScreen } from './components/screens/ExamHeroScreen';
import { CampusReporterScreen } from './components/screens/CampusReporterScreen';
import { TreasureHuntScreen } from './components/screens/TreasureHuntScreen';
import { DailyPollScreen } from './components/screens/DailyPollScreen';
import { WheelOfFortuneScreen } from './components/screens/WheelOfFortuneScreen';
import TopicDetailScreen from './components/screens/TopicDetailScreen';
import { CreatePostModal } from './components/social/CreatePostModal';
import { GameCenterOverlay } from './components/overlays/GameCenterOverlay';
import { LoginScreen } from './components/auth/LoginScreen';
import { MOCK_COMMENTS, convertCommentToPost } from './data/mockComments';
import { ThemeProvider } from './contexts/ThemeContext';
import { CoinProvider } from './contexts/CoinContext';

interface PostStackItem {
  post: any;
  comments: any[];
}

function AppContent() {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Login olmadan başla
  const [activeTab, setActiveTab] = useState('discover'); // Keşfet sekmesinde başla
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);
  const [isGameCenterOpen, setIsGameCenterOpen] = useState(false);
  const [activeGame, setActiveGame] = useState<string | null>(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  
  // Navigation stack for infinite post drilling
  const [postStack, setPostStack] = useState<PostStackItem[]>([]);
  
  // Announcement detail state
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<any>(null);
  
  // Topic detail state (for Wiki + Dictionary pages)
  const [showTopicDetail, setShowTopicDetail] = useState(false);
  
  // Wiki detail state
  const [selectedWikiEntry, setSelectedWikiEntry] = useState<any>(null);

  // Show login modal if requested
  if (showLoginModal) {
    return <LoginScreen onLogin={() => {
      setIsAuthenticated(true);
      setShowLoginModal(false);
    }} />;
  }

  // Show Game Screen if active
  if (activeGame === 'exam-hero') {
    return (
      <>
        <ExamHeroScreen 
          onBack={() => setActiveGame(null)}
          activeTab={activeTab}
          onTabChange={(tab) => {
            setActiveTab(tab);
            setActiveGame(null);
          }}
          onGameCenterClick={() => setIsGameCenterOpen(true)}
        />
        <BottomNavigation 
          activeTab={activeTab} 
          onTabChange={(tab) => {
            setActiveTab(tab);
            setActiveGame(null);
          }} 
          onFabClick={() => setIsGameCenterOpen(true)}
        />
      </>
    );
  }
  if (activeGame === 'campus-reporter') {
    return (
      <>
        <CampusReporterScreen 
          onBack={() => setActiveGame(null)}
          activeTab={activeTab}
          onTabChange={(tab) => {
            setActiveTab(tab);
            setActiveGame(null);
          }}
          onGameCenterClick={() => setIsGameCenterOpen(true)}
        />
        <BottomNavigation 
          activeTab={activeTab} 
          onTabChange={(tab) => {
            setActiveTab(tab);
            setActiveGame(null);
          }} 
          onFabClick={() => setIsGameCenterOpen(true)}
        />
      </>
    );
  }
  if (activeGame === 'treasure-hunt') {
    return (
      <>
        <TreasureHuntScreen 
          onBack={() => setActiveGame(null)}
          activeTab={activeTab}
          onTabChange={(tab) => {
            setActiveTab(tab);
            setActiveGame(null);
          }}
          onGameCenterClick={() => setIsGameCenterOpen(true)}
        />
        <BottomNavigation 
          activeTab={activeTab} 
          onTabChange={(tab) => {
            setActiveTab(tab);
            setActiveGame(null);
          }} 
          onFabClick={() => setIsGameCenterOpen(true)}
        />
      </>
    );
  }
  if (activeGame === 'daily-poll') {
    return (
      <>
        <DailyPollScreen 
          onBack={() => setActiveGame(null)}
          activeTab={activeTab}
          onTabChange={(tab) => {
            setActiveTab(tab);
            setActiveGame(null);
          }}
          onGameCenterClick={() => setIsGameCenterOpen(true)}
        />
        <BottomNavigation 
          activeTab={activeTab} 
          onTabChange={(tab) => {
            setActiveTab(tab);
            setActiveGame(null);
          }} 
          onFabClick={() => setIsGameCenterOpen(true)}
        />
      </>
    );
  }
  if (activeGame === 'wheel-fortune') {
    return (
      <>
        <WheelOfFortuneScreen 
          onBack={() => setActiveGame(null)}
          activeTab={activeTab}
          onTabChange={(tab) => {
            setActiveTab(tab);
            setActiveGame(null);
          }}
          onGameCenterClick={() => setIsGameCenterOpen(true)}
        />
        <BottomNavigation 
          activeTab={activeTab} 
          onTabChange={(tab) => {
            setActiveTab(tab);
            setActiveGame(null);
          }} 
          onFabClick={() => setIsGameCenterOpen(true)}
        />
      </>
    );
  }

  // Show Topic Detail Page (Wiki + Dictionary)
  if (showTopicDetail) {
    return (
      <>
        <TopicDetailScreen 
          onBack={() => setShowTopicDetail(false)}
          activeTab={activeTab}
          onTabChange={(tab) => {
            setActiveTab(tab);
            setShowTopicDetail(false);
          }}
          onGameCenterClick={() => setIsGameCenterOpen(true)}
        />
        <BottomNavigation 
          activeTab={activeTab} 
          onTabChange={(tab) => {
            setActiveTab(tab);
            setShowTopicDetail(false);
          }} 
          onFabClick={() => setIsGameCenterOpen(true)}
        />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-[#f2f3f7] dark:bg-[#0f0e17] font-sans pb-28 lg:pb-0 transition-colors">

      {/* Show Wiki Detail if selected */}
      {selectedWikiEntry ? (
        <>
          <WikiDetailScreen
            entry={selectedWikiEntry}
            onBack={() => setSelectedWikiEntry(null)}
            activeTab={activeTab}
            onTabChange={(tab) => {
              setActiveTab(tab);
              setSelectedWikiEntry(null);
            }}
            onGameCenterClick={() => setIsGameCenterOpen(true)}
          />
          <BottomNavigation 
            activeTab={activeTab} 
            onTabChange={(tab) => {
              setActiveTab(tab);
              setSelectedWikiEntry(null);
            }} 
            onFabClick={() => setIsGameCenterOpen(true)}
          />
        </>
      ) : selectedAnnouncement ? (
        <>
          <AnnouncementDetailScreen
            announcement={selectedAnnouncement}
            onBack={() => setSelectedAnnouncement(null)}
            activeTab={activeTab}
            onTabChange={(tab) => {
              setActiveTab(tab);
              setSelectedAnnouncement(null);
            }}
            onGameCenterClick={() => setIsGameCenterOpen(true)}
          />
          <BottomNavigation 
            activeTab={activeTab} 
            onTabChange={(tab) => {
              setActiveTab(tab);
              setSelectedAnnouncement(null);
            }} 
            onFabClick={() => setIsGameCenterOpen(true)}
          />
        </>
      ) : postStack.length > 0 ? (
        <>
          <PostDetailScreen
            post={postStack[postStack.length - 1].post}
            comments={postStack[postStack.length - 1].comments}
            onBack={() => {
              setPostStack(prev => prev.slice(0, -1));
            }}
            onCommentClick={(comment) => {
              // Convert comment to post and push to stack
              const newPost = convertCommentToPost(comment, postStack[postStack.length - 1].post.id);
              const newComments = comment.replies || [];
              setPostStack(prev => [...prev, { post: newPost, comments: newComments }]);
            }}
            activeTab={activeTab}
            onTabChange={(tab) => {
              setActiveTab(tab);
              setPostStack([]);
            }}
            onGameCenterClick={() => setIsGameCenterOpen(true)}
          />
          <BottomNavigation 
            activeTab={activeTab} 
            onTabChange={(tab) => {
              setActiveTab(tab);
              setPostStack([]);
            }} 
            onFabClick={() => setIsGameCenterOpen(true)}
          />
        </>
      ) : (
        <>
          {activeTab === 'home' && (
            <FeedScreen 
              activeTab={activeTab}
              onTabChange={(tab) => {
                setActiveTab(tab);
                setPostStack([]);
              }}
              onGameCenterClick={() => setIsGameCenterOpen(true)}
              onGameSelect={(gameId) => setActiveGame(gameId)}
              onAnnouncementClick={(announcement) => setSelectedAnnouncement(announcement)}
              onTopicClick={() => setShowTopicDetail(true)}
              onWikiEntryClick={(entry) => setSelectedWikiEntry(entry)}
              onPostClick={(post) => {
                const comments = MOCK_COMMENTS[post.id] || [];
                const now = new Date();
                const hours = now.getHours().toString().padStart(2, '0');
                const minutes = now.getMinutes().toString().padStart(2, '0');
                const postWithFullDate = {
                  ...post,
                  fullDate: `${hours}:${minutes} • ${now.toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })}`,
                  likes: post.upvotes,
                  comments: comments.length,
                  content: post.content,
                  category: post.badge
                };
                setPostStack([{ post: postWithFullDate, comments }]);
              }}
            />
          )}
          {activeTab === 'profile' && (
            <ProfileScreen 
              activeTab={activeTab}
              onTabChange={(tab) => {
                setActiveTab(tab);
                setPostStack([]);
              }}
              onGameCenterClick={() => setIsGameCenterOpen(true)}
              onGameSelect={(gameId) => setActiveGame(gameId)}
              onLogout={() => setIsAuthenticated(false)}
            />
          )}
          {activeTab === 'discover' && (
            <DiscoverScreen 
              activeTab={activeTab}
              isAuthenticated={isAuthenticated}
              onGameSelect={(gameId) => {
                if (!isAuthenticated) {
                  setShowLoginModal(true);
                } else {
                  setActiveGame(gameId);
                }
              }}
              onTabChange={(tab) => {
                if (!isAuthenticated && tab !== 'discover') {
                  setShowLoginModal(true);
                } else {
                  setActiveTab(tab);
                  setPostStack([]);
                }
              }}
              onGameCenterClick={() => {
                if (!isAuthenticated) {
                  setShowLoginModal(true);
                } else {
                  setIsGameCenterOpen(true);
                }
              }}
              onAnnouncementClick={(announcement) => {
                if (!isAuthenticated) {
                  setShowLoginModal(true);
                } else {
                  setSelectedAnnouncement(announcement);
                }
              }}
              onLoginClick={() => setShowLoginModal(true)}
            />
          )}
          {activeTab === 'notifications' && (
            <NotificationsScreen 
              activeTab={activeTab}
              onTabChange={(tab) => {
                setActiveTab(tab);
                setPostStack([]);
              }}
              onGameCenterClick={() => setIsGameCenterOpen(true)}
            />
          )}
          
          {/* Fallback */}
          {(activeTab !== 'home' && activeTab !== 'profile' && activeTab !== 'discover' && activeTab !== 'notifications') && (
             <FeedScreen 
               activeTab={activeTab}
               onTabChange={(tab) => {
                 setActiveTab(tab);
                 setPostStack([]);
               }}
               onGameCenterClick={() => setIsGameCenterOpen(true)}
               onGameSelect={(gameId) => setActiveGame(gameId)}
               onAnnouncementClick={(announcement) => setSelectedAnnouncement(announcement)}
               onTopicClick={() => setShowTopicDetail(true)}
               onPostClick={(post) => {
                 const comments = MOCK_COMMENTS[post.id] || [];
                 const now = new Date();
                 const hours = now.getHours().toString().padStart(2, '0');
                 const minutes = now.getMinutes().toString().padStart(2, '0');
                 const postWithFullDate = {
                   ...post,
                   fullDate: `${hours}:${minutes} • ${now.toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })}`,
                   likes: post.upvotes,
                   comments: comments.length,
                   content: post.content,
                   category: post.badge
                 };
                 setPostStack([{ post: postWithFullDate, comments }]);
               }}
             />
          )}

          <BottomNavigation 
            activeTab={activeTab} 
            onTabChange={(tab) => {
              if (!isAuthenticated && tab !== 'discover') {
                setShowLoginModal(true);
              } else {
                setActiveTab(tab);
                setPostStack([]);
              }
            }} 
            onFabClick={() => {
              if (!isAuthenticated) {
                setShowLoginModal(true);
              } else {
                setIsGameCenterOpen(true);
              }
            }}
          />
        </>
      )}
      
      <CreatePostModal 
        isOpen={isCreatePostOpen} 
        onClose={() => setIsCreatePostOpen(false)} 
      />

      <GameCenterOverlay
        isOpen={isGameCenterOpen}
        onClose={() => setIsGameCenterOpen(false)}
        onGameSelect={(gameId) => setActiveGame(gameId)}
      />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <CoinProvider initialCoins={0}>
        <AppContent />
      </CoinProvider>
    </ThemeProvider>
  );
}
