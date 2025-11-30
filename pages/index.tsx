import React, { useState, useEffect } from 'react';
import { BottomNavigation } from '../components/layout/BottomNavigation';
import { FeedScreen } from '../components/screens/FeedScreen';
import { ProfileScreen } from '../components/screens/ProfileScreen';
import { DiscoverScreen } from '../components/screens/DiscoverScreen';
import { NotificationsScreen } from '../components/screens/NotificationsScreen';
import { PostDetailScreen } from '../components/screens/PostDetailScreen';
import { AnnouncementDetailScreen } from '../components/screens/AnnouncementDetailScreen';
import { AnnouncementsListScreen } from '../components/screens/AnnouncementsListScreen';
import { PlaceDetailScreen } from '../components/screens/PlaceDetailScreen';
import { PlacesListScreen } from '../components/screens/PlacesListScreen';
import { EventDetailScreen } from '../components/screens/EventDetailScreen';
import { EventsListScreen } from '../components/screens/EventsListScreen';
import { SocialResponsibilityDetailScreen } from '../components/screens/SocialResponsibilityDetailScreen';
import { SocialResponsibilityListScreen } from '../components/screens/SocialResponsibilityListScreen';
import { WikiDetailScreen } from '../components/screens/WikiDetailScreen';
import { ExamHeroScreen } from '../components/screens/ExamHeroScreen';
import { CampusReporterScreen } from '../components/screens/CampusReporterScreen';
import { TreasureHuntScreen } from '../components/screens/TreasureHuntScreen';
import { DailyPollScreen } from '../components/screens/DailyPollScreen';
import { WheelOfFortuneScreen } from '../components/screens/WheelOfFortuneScreen';
import TopicDetailScreen from '../components/screens/TopicDetailScreen';
import { CreatePostModal } from '../components/social/CreatePostModal';
import { GameCenterScreen } from '../components/screens/GameCenterScreen';
import { LoginScreen } from '../components/auth/LoginScreen';
import { MOCK_COMMENTS, convertCommentToPost } from '../data/mockComments';
import { ThemeProvider } from '../contexts/ThemeContext';
import { CoinProvider, useCoins } from '../contexts/CoinContext';
import { SearchOverlay } from '../components/search/SearchOverlay';
import { WelcomeCoinModal } from '../components/onboarding/WelcomeCoinModal';

interface PostStackItem {
  post: any;
  comments: any[];
}

function AppContent() {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Login olmadan başla
  const [activeTab, setActiveTab] = useState('discover'); // Keşfet sekmesinde başla
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);
  const [showGameCenter, setShowGameCenter] = useState(false);
  const [activeGame, setActiveGame] = useState<string | null>(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);
  
  // Navigation stack for infinite post drilling
  const [postStack, setPostStack] = useState<PostStackItem[]>([]);
  
  // Announcement detail state
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<any>(null);
  const [showAnnouncementsList, setShowAnnouncementsList] = useState(false);
  
  // Place detail state
  const [selectedPlace, setSelectedPlace] = useState<any>(null);
  const [showPlacesList, setShowPlacesList] = useState(false);
  
  // Event detail state
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [showEventsList, setShowEventsList] = useState(false);
  
  // Social Responsibility detail state
  const [selectedSocialResponsibility, setSelectedSocialResponsibility] = useState<any>(null);
  const [showSocialResponsibilityList, setShowSocialResponsibilityList] = useState(false);
  
  // Topic detail state (for Wiki + Dictionary pages)
  const [showTopicDetail, setShowTopicDetail] = useState(false);
  
  // Wiki detail state
  const [selectedWikiEntry, setSelectedWikiEntry] = useState<any>(null);
  
  // Search state
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchCategory, setSearchCategory] = useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  
  const handleSearch = (query: string, category: string | null) => {
    setSearchQuery(query);
    setSearchCategory(category);
    setIsSearchOpen(false);
    // Only switch to home tab if there's an actual search query
    if (query.trim() || category) {
      setActiveTab('home');
    }
  };

  const handleSearchClear = () => {
    setSearchQuery('');
    setSearchCategory(null);
  };

  // Force clear detail states when tab changes
  useEffect(() => {
    // When activeTab changes, ensure detail states are cleared
    if (activeTab) {
      // This will run after activeTab changes
      // Detail states should already be cleared in onTabChange handlers
      console.log('🔄 activeTab changed to:', activeTab);
    }
  }, [activeTab]);

  // Check for welcome animation flag on mount and when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      const shouldShowWelcome = localStorage.getItem('showWelcomeAnimation');
      if (shouldShowWelcome === 'true') {
        setShowWelcomeModal(true);
        // Remove flag immediately to prevent showing again
        localStorage.removeItem('showWelcomeAnimation');
      }
    }
  }, [isAuthenticated]);

  // Show login modal if requested
  if (showLoginModal) {
    return <LoginScreen onLogin={() => {
      setIsAuthenticated(true);
      setShowLoginModal(false);
    }} />;
  }

  // Show Game Center Screen
  if (showGameCenter) {
    return (
      <>
        <GameCenterScreen
          onBack={() => setShowGameCenter(false)}
          activeTab={activeTab}
          onTabChange={(tab) => {
            setActiveTab(tab);
            setShowGameCenter(false);
          }}
          onGameSelect={(gameId) => {
            setActiveGame(gameId);
            setShowGameCenter(false);
            window.scrollTo(0, 0);
          }}
          onWalletOpen={() => {}}
        />
        <BottomNavigation 
          activeTab={activeTab} 
          onTabChange={(tab) => {
            setActiveTab(tab);
            setShowGameCenter(false);
          }} 
          onFabClick={() => setShowGameCenter(true)}
        />
      </>
    );
  }

  // Show Game Screen if active
  if (activeGame === 'exam-hero') {
    return (
      <>
        <ExamHeroScreen 
          onBack={() => {
            setActiveGame(null);
            setShowGameCenter(true);
          }}
          activeTab={activeTab}
          onTabChange={(tab) => {
            setActiveTab(tab);
            setActiveGame(null);
          }}
          onGameCenterClick={() => setShowGameCenter(true)}
        />
        <BottomNavigation 
          activeTab={activeTab} 
          onTabChange={(tab) => {
            setActiveTab(tab);
            setActiveGame(null);
          }} 
          onFabClick={() => setShowGameCenter(true)}
        />
      </>
    );
  }
  if (activeGame === 'campus-reporter') {
    return (
      <>
        <CampusReporterScreen 
          onBack={() => {
            setActiveGame(null);
            setShowGameCenter(true);
          }}
          activeTab={activeTab}
          onTabChange={(tab) => {
            setActiveTab(tab);
            setActiveGame(null);
          }}
          onGameCenterClick={() => setShowGameCenter(true)}
        />
        <BottomNavigation 
          activeTab={activeTab} 
          onTabChange={(tab) => {
            setActiveTab(tab);
            setActiveGame(null);
          }} 
          onFabClick={() => setShowGameCenter(true)}
        />
      </>
    );
  }
  if (activeGame === 'treasure-hunt') {
    return (
      <>
        <TreasureHuntScreen 
          onBack={() => {
            setActiveGame(null);
            setShowGameCenter(true);
          }}
          activeTab={activeTab}
          onTabChange={(tab) => {
            setActiveTab(tab);
            setActiveGame(null);
          }}
          onGameCenterClick={() => setShowGameCenter(true)}
        />
        <BottomNavigation 
          activeTab={activeTab} 
          onTabChange={(tab) => {
            setActiveTab(tab);
            setActiveGame(null);
          }} 
          onFabClick={() => setShowGameCenter(true)}
        />
      </>
    );
  }
  if (activeGame === 'daily-poll') {
    return (
      <>
        <DailyPollScreen 
          onBack={() => {
            setActiveGame(null);
            setShowGameCenter(true);
          }}
          activeTab={activeTab}
          onTabChange={(tab) => {
            setActiveTab(tab);
            setActiveGame(null);
          }}
          onGameCenterClick={() => setShowGameCenter(true)}
        />
        <BottomNavigation 
          activeTab={activeTab} 
          onTabChange={(tab) => {
            setActiveTab(tab);
            setActiveGame(null);
          }} 
          onFabClick={() => setShowGameCenter(true)}
        />
      </>
    );
  }
  if (activeGame === 'wheel-fortune') {
    return (
      <>
        <WheelOfFortuneScreen 
          onBack={() => {
            setActiveGame(null);
            setShowGameCenter(true);
          }}
          activeTab={activeTab}
          onTabChange={(tab) => {
            setActiveTab(tab);
            setActiveGame(null);
          }}
          onGameCenterClick={() => setShowGameCenter(true)}
        />
        <BottomNavigation 
          activeTab={activeTab} 
          onTabChange={(tab) => {
            setActiveTab(tab);
            setActiveGame(null);
          }} 
          onFabClick={() => setShowGameCenter(true)}
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
          onGameCenterClick={() => setShowGameCenter(true)}
        />
        <BottomNavigation 
          activeTab={activeTab} 
          onTabChange={(tab) => {
            setActiveTab(tab);
            setShowTopicDetail(false);
          }} 
          onFabClick={() => setShowGameCenter(true)}
        />
      </>
    );
  }

  // Debug: Log current state
  console.log('🔍 Render state:', {
    activeTab,
    selectedWikiEntry: !!selectedWikiEntry,
    selectedAnnouncement: !!selectedAnnouncement,
    postStackLength: postStack.length,
    showTopicDetail
  });

  return (
    <div className="min-h-screen bg-[#f2f3f7] dark:bg-[#0f0e17] font-sans pb-28 lg:pb-0 transition-colors">

      {/* Show Announcements List if requested */}
      {showAnnouncementsList ? (
        <>
          <AnnouncementsListScreen
            onBack={() => setShowAnnouncementsList(false)}
            activeTab={activeTab}
            onTabChange={(tab) => {
              setShowAnnouncementsList(false);
              setSelectedAnnouncement(null);
              setActiveTab(tab);
            }}
            onGameCenterClick={() => setShowGameCenter(true)}
            onAnnouncementClick={(announcement) => {
              setShowAnnouncementsList(false);
              setSelectedAnnouncement(announcement);
            }}
          />
          <BottomNavigation 
            activeTab={activeTab} 
            onTabChange={(tab) => {
              setShowAnnouncementsList(false);
              setSelectedAnnouncement(null);
              setActiveTab(tab);
            }} 
            onFabClick={() => setShowGameCenter(true)}
          />
        </>
      ) : selectedWikiEntry ? (
        <>
          <WikiDetailScreen
            entry={selectedWikiEntry}
            onBack={() => setSelectedWikiEntry(null)}
            activeTab={activeTab}
            onTabChange={(tab) => {
              setPostStack([]);
              setSelectedWikiEntry(null);
              setSelectedAnnouncement(null);
              setShowTopicDetail(false);
              setActiveTab(tab);
            }}
            onGameCenterClick={() => setShowGameCenter(true)}
            onEntryUpdate={(updatedEntry) => {
              setSelectedWikiEntry(updatedEntry);
            }}
          />
          <BottomNavigation 
            activeTab={activeTab} 
            onTabChange={(tab) => {
              setPostStack([]);
              setSelectedWikiEntry(null);
              setSelectedAnnouncement(null);
              setShowTopicDetail(false);
              setActiveTab(tab);
            }} 
            onFabClick={() => setShowGameCenter(true)}
          />
        </>
      ) : showPlacesList ? (
        <>
          <PlacesListScreen
            onBack={() => setShowPlacesList(false)}
            activeTab={activeTab}
            onTabChange={(tab) => {
              setShowPlacesList(false);
              setSelectedPlace(null);
              setActiveTab(tab);
            }}
            onGameCenterClick={() => setShowGameCenter(true)}
            onPlaceClick={(place) => {
              setShowPlacesList(false);
              setSelectedPlace(place);
            }}
          />
          <BottomNavigation 
            activeTab={activeTab} 
            onTabChange={(tab) => {
              setShowPlacesList(false);
              setSelectedPlace(null);
              setActiveTab(tab);
            }} 
            onFabClick={() => setShowGameCenter(true)}
          />
        </>
      ) : showEventsList ? (
        <>
          <EventsListScreen
            onBack={() => setShowEventsList(false)}
            activeTab={activeTab}
            onTabChange={(tab) => {
              setShowEventsList(false);
              setSelectedEvent(null);
              setActiveTab(tab);
            }}
            onGameCenterClick={() => setShowGameCenter(true)}
            onEventClick={(event) => {
              setShowEventsList(false);
              setSelectedEvent(event);
            }}
          />
          <BottomNavigation 
            activeTab={activeTab} 
            onTabChange={(tab) => {
              setShowEventsList(false);
              setSelectedEvent(null);
              setActiveTab(tab);
            }} 
            onFabClick={() => setShowGameCenter(true)}
          />
        </>
      ) : showSocialResponsibilityList ? (
        <>
          <SocialResponsibilityListScreen
            onBack={() => setShowSocialResponsibilityList(false)}
            activeTab={activeTab}
            onTabChange={(tab) => {
              setShowSocialResponsibilityList(false);
              setSelectedSocialResponsibility(null);
              setActiveTab(tab);
            }}
            onGameCenterClick={() => setShowGameCenter(true)}
            onProjectClick={(project) => {
              setShowSocialResponsibilityList(false);
              setSelectedSocialResponsibility(project);
            }}
          />
          <BottomNavigation 
            activeTab={activeTab} 
            onTabChange={(tab) => {
              setShowSocialResponsibilityList(false);
              setSelectedSocialResponsibility(null);
              setActiveTab(tab);
            }} 
            onFabClick={() => setShowGameCenter(true)}
          />
        </>
      ) : selectedPlace ? (
        <>
          <PlaceDetailScreen
            place={selectedPlace}
            onBack={() => setSelectedPlace(null)}
            activeTab={activeTab}
            onTabChange={(tab) => {
              setPostStack([]);
              setSelectedWikiEntry(null);
              setSelectedAnnouncement(null);
              setSelectedPlace(null);
              setShowTopicDetail(false);
              setActiveTab(tab);
            }}
            onGameCenterClick={() => setShowGameCenter(true)}
          />
          <BottomNavigation 
            activeTab={activeTab} 
            onTabChange={(tab) => {
              setPostStack([]);
              setSelectedWikiEntry(null);
              setSelectedAnnouncement(null);
              setSelectedPlace(null);
              setShowTopicDetail(false);
              setActiveTab(tab);
            }} 
            onFabClick={() => setShowGameCenter(true)}
          />
        </>
      ) : selectedEvent ? (
        <>
          <EventDetailScreen
            event={selectedEvent}
            onBack={() => setSelectedEvent(null)}
            activeTab={activeTab}
            onTabChange={(tab) => {
              setPostStack([]);
              setSelectedWikiEntry(null);
              setSelectedAnnouncement(null);
              setSelectedEvent(null);
              setShowTopicDetail(false);
              setActiveTab(tab);
            }}
            onGameCenterClick={() => setShowGameCenter(true)}
          />
          <BottomNavigation 
            activeTab={activeTab} 
            onTabChange={(tab) => {
              setPostStack([]);
              setSelectedWikiEntry(null);
              setSelectedAnnouncement(null);
              setSelectedEvent(null);
              setShowTopicDetail(false);
              setActiveTab(tab);
            }} 
            onFabClick={() => setShowGameCenter(true)}
          />
        </>
      ) : selectedSocialResponsibility ? (
        <>
          <SocialResponsibilityDetailScreen
            project={selectedSocialResponsibility}
            onBack={() => setSelectedSocialResponsibility(null)}
            activeTab={activeTab}
            onTabChange={(tab) => {
              setPostStack([]);
              setSelectedWikiEntry(null);
              setSelectedAnnouncement(null);
              setSelectedSocialResponsibility(null);
              setShowTopicDetail(false);
              setActiveTab(tab);
            }}
            onGameCenterClick={() => setShowGameCenter(true)}
          />
          <BottomNavigation 
            activeTab={activeTab} 
            onTabChange={(tab) => {
              setPostStack([]);
              setSelectedWikiEntry(null);
              setSelectedAnnouncement(null);
              setSelectedSocialResponsibility(null);
              setShowTopicDetail(false);
              setActiveTab(tab);
            }} 
            onFabClick={() => setShowGameCenter(true)}
          />
        </>
      ) : selectedAnnouncement ? (
        <>
          <AnnouncementDetailScreen
            announcement={selectedAnnouncement}
            onBack={() => setSelectedAnnouncement(null)}
            activeTab={activeTab}
            onTabChange={(tab) => {
              setPostStack([]);
              setSelectedWikiEntry(null);
              setSelectedAnnouncement(null);
              setShowTopicDetail(false);
              setActiveTab(tab);
            }}
            onGameCenterClick={() => setShowGameCenter(true)}
          />
          <BottomNavigation 
            activeTab={activeTab} 
            onTabChange={(tab) => {
              setPostStack([]);
              setSelectedWikiEntry(null);
              setSelectedAnnouncement(null);
              setShowTopicDetail(false);
              setActiveTab(tab);
            }} 
            onFabClick={() => setShowGameCenter(true)}
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
              setPostStack([]);
              setSelectedWikiEntry(null);
              setSelectedAnnouncement(null);
              setShowTopicDetail(false);
              setActiveTab(tab);
            }}
            onGameCenterClick={() => setShowGameCenter(true)}
          />
          <BottomNavigation 
            activeTab={activeTab} 
            onTabChange={(tab) => {
              setPostStack([]);
              setSelectedWikiEntry(null);
              setSelectedAnnouncement(null);
              setShowTopicDetail(false);
              setActiveTab(tab);
            }} 
            onFabClick={() => setShowGameCenter(true)}
          />
        </>
      ) : (
        <>
          {activeTab === 'home' && (
            <FeedScreen 
              activeTab={activeTab}
              onTabChange={(tab) => {
                setPostStack([]);
                setSelectedWikiEntry(null);
                setSelectedAnnouncement(null);
                setSelectedPlace(null);
                setSelectedEvent(null);
                setSelectedSocialResponsibility(null);
                setShowAnnouncementsList(false);
                setShowPlacesList(false);
                setShowEventsList(false);
                setShowSocialResponsibilityList(false);
                setShowTopicDetail(false);
                setActiveTab(tab);
              }}
              onGameCenterClick={() => setShowGameCenter(true)}
              onGameSelect={(gameId) => setActiveGame(gameId)}
              onAnnouncementClick={(announcement) => setSelectedAnnouncement(announcement)}
              onTopicClick={() => setShowTopicDetail(true)}
              onWikiEntryClick={(entry) => setSelectedWikiEntry(entry)}
              searchQuery={searchQuery}
              searchCategory={searchCategory}
              onSearchClick={() => setIsSearchOpen(true)}
              onSearchClear={handleSearchClear}
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
                setPostStack([]);
                setSelectedWikiEntry(null);
                setSelectedAnnouncement(null);
                setSelectedPlace(null);
                setSelectedEvent(null);
                setSelectedSocialResponsibility(null);
                setShowAnnouncementsList(false);
                setShowPlacesList(false);
                setShowEventsList(false);
                setShowSocialResponsibilityList(false);
                setShowTopicDetail(false);
                setActiveTab(tab);
              }}
              onGameCenterClick={() => setShowGameCenter(true)}
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
                  setPostStack([]);
                  setSelectedWikiEntry(null);
                  setSelectedAnnouncement(null);
                  setShowTopicDetail(false);
                  setActiveTab(tab);
                }
              }}
              onGameCenterClick={() => {
                if (!isAuthenticated) {
                  setShowLoginModal(true);
                } else {
                  setShowGameCenter(true);
                }
              }}
              onAnnouncementClick={(announcement) => {
                if (!isAuthenticated) {
                  setShowLoginModal(true);
                } else {
                  setSelectedAnnouncement(announcement);
                }
              }}
              onAnnouncementsListClick={() => {
                if (!isAuthenticated) {
                  setShowLoginModal(true);
                } else {
                  setShowAnnouncementsList(true);
                }
              }}
              onPlaceClick={(place) => {
                if (!isAuthenticated) {
                  setShowLoginModal(true);
                } else {
                  setSelectedPlace(place);
                  setShowPlacesList(false);
                }
              }}
              onPlacesListClick={() => {
                if (!isAuthenticated) {
                  setShowLoginModal(true);
                } else {
                  setShowPlacesList(true);
                }
              }}
              onEventClick={(event) => {
                if (!isAuthenticated) {
                  setShowLoginModal(true);
                } else {
                  setSelectedEvent(event);
                  setShowEventsList(false);
                }
              }}
              onEventsListClick={() => {
                if (!isAuthenticated) {
                  setShowLoginModal(true);
                } else {
                  setShowEventsList(true);
                }
              }}
              onSocialResponsibilityClick={(project) => {
                if (!isAuthenticated) {
                  setShowLoginModal(true);
                } else {
                  setSelectedSocialResponsibility(project);
                  setShowSocialResponsibilityList(false);
                }
              }}
              onSocialResponsibilityListClick={() => {
                if (!isAuthenticated) {
                  setShowLoginModal(true);
                } else {
                  setShowSocialResponsibilityList(true);
                }
              }}
              onLoginClick={() => setShowLoginModal(true)}
            />
          )}
          {activeTab === 'notifications' && (
            <NotificationsScreen 
              activeTab={activeTab}
              onTabChange={(tab) => {
                setPostStack([]);
                setSelectedWikiEntry(null);
                setSelectedAnnouncement(null);
                setSelectedPlace(null);
                setSelectedEvent(null);
                setSelectedSocialResponsibility(null);
                setShowAnnouncementsList(false);
                setShowPlacesList(false);
                setShowEventsList(false);
                setShowSocialResponsibilityList(false);
                setShowTopicDetail(false);
                setActiveTab(tab);
              }}
              onGameCenterClick={() => setShowGameCenter(true)}
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
               onGameCenterClick={() => setShowGameCenter(true)}
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
              console.log('🔵 BottomNavigation onTabChange:', tab, 'current activeTab:', activeTab);
              console.log('🔍 Before clear - selectedWikiEntry:', !!selectedWikiEntry, 'selectedAnnouncement:', !!selectedAnnouncement, 'postStack:', postStack.length);
              // Always allow tab change, clear all detail states FIRST
              setPostStack([]);
              setSelectedWikiEntry(null);
              setSelectedAnnouncement(null);
              setShowTopicDetail(false);
              // Then change tab - React will batch these updates
              setActiveTab(tab);
              console.log('✅ Tab change initiated to:', tab);
            }} 
            onFabClick={() => {
              if (!isAuthenticated) {
                setShowLoginModal(true);
              } else {
                setShowGameCenter(true);
              }
            }}
          />
        </>
      )}
      
      <CreatePostModal 
        isOpen={isCreatePostOpen} 
        onClose={() => setIsCreatePostOpen(false)} 
      />

      {/* Welcome Coin Modal */}
      <WelcomeCoinModal 
        isOpen={showWelcomeModal}
        onClose={() => setShowWelcomeModal(false)}
      />

      {/* Global Search Overlay */}
      <SearchOverlay
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        trendingTopics={[
          { id: 1, title: 'Vize Tarihleri Açıklandı', count: '2.4k Okunma' },
          { id: 2, title: 'Kampüs Metro Çalışması', count: '1.8k Okunma' },
          { id: 3, title: 'Yemekhane Zam Oranları', count: '1.2k Okunma' },
          { id: 4, title: 'Kütüphane 7/24 Açık Mı?', count: '900 Okunma' },
        ]}
        onSearch={handleSearch}
      />
    </div>
  );
}

export default function Home() {
  return (
    <ThemeProvider>
      <CoinProvider initialCoins={0}>
        <AppContent />
      </CoinProvider>
    </ThemeProvider>
  );
}
