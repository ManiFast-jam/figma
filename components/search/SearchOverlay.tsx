import React, { useState, useEffect } from 'react';
import { X, Clock, TrendingUp, Hash, User, FileText, Loader2, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface TrendingTopic {
  id: number;
  title: string;
  count: string;
}

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  trendingTopics?: TrendingTopic[];
  onSearch?: (query: string, category: string | null) => void;
}

interface SearchResult {
  id: string;
  type: 'user' | 'tag' | 'post';
  title: string;
  subtitle?: string;
  avatar?: string;
}

const RECENT_SEARCHES = [
  'Kiralık Ev',
  'Vize Tarihleri',
  'Etli Ekmek',
  'Kampüs Festivali',
];

const SEARCH_CATEGORIES = [
  { id: 'akademik', label: 'Akademik' },
  { id: 'sosyal', label: 'Sosyal' },
  { id: 'yeme-icme', label: 'Yeme-İçme' },
  { id: 'barinma', label: 'Barınma' },
  { id: 'ikinci-el', label: 'İkinci El' },
];

const MOCK_SEARCH_RESULTS: SearchResult[] = [
  {
    id: '1',
    type: 'user',
    title: 'Ahmet Kaya',
    subtitle: '@ahmetkaya',
    avatar: 'https://i.pravatar.cc/150?img=12',
  },
  {
    id: '2',
    type: 'tag',
    title: '#VizeHaftası',
    subtitle: '1.2k gönderi',
  },
  {
    id: '3',
    type: 'post',
    title: 'Selçuk Hukuk Final Notları',
    subtitle: 'Anayasa hukuku finali için hazırladığım özet notlar...',
  },
  {
    id: '4',
    type: 'user',
    title: 'Zeynep Acar',
    subtitle: '@zeynepacar',
    avatar: 'https://i.pravatar.cc/150?img=25',
  },
  {
    id: '5',
    type: 'tag',
    title: '#KampüsMetro',
    subtitle: '850 gönderi',
  },
];

export const SearchOverlay = ({ isOpen, onClose, trendingTopics = [], onSearch }: SearchOverlayProps) => {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>(RECENT_SEARCHES);

  // Lock body scroll when overlay is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Clear search when overlay closes if query is empty
  useEffect(() => {
    if (!isOpen && (!query.trim() && !selectedCategory) && onSearch) {
      // If overlay is closed and query is empty, clear the search
      onSearch('', null);
    }
  }, [isOpen, query, selectedCategory, onSearch]);

  // Debounced search effect
  useEffect(() => {
    // Rule 1: Minimum 3 characters
    if (query.length < 3) {
      setResults([]);
      setIsLoading(false);
      return;
    }

    // Rule 2: Debounce - wait 2 seconds after user stops typing
    setIsLoading(true);
    const delayDebounceFn = setTimeout(() => {
      // Simulate API call
      console.log('🔍 API Request:', query);
      
      // Mock results
      setResults(MOCK_SEARCH_RESULTS);
      setIsLoading(false);
    }, 2000); // 2 second delay

    // Cleanup: Reset timer if user types again before 2 seconds
    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  const handleRemoveRecent = (search: string) => {
    setRecentSearches(recentSearches.filter(s => s !== search));
  };

  const handleClearAll = () => {
    setRecentSearches([]);
  };

  const handleRecentClick = (search: string) => {
    setQuery(search);
    // Auto search when clicking recent search
    if (onSearch) {
      onSearch(search, selectedCategory);
      onClose();
    }
  };

  const handleSearch = () => {
    if (query.trim().length >= 3 || selectedCategory) {
      if (onSearch) {
        onSearch(query.trim(), selectedCategory);
        onClose();
      }
    }
  };

  const handleTrendingTopicClick = (topic: TrendingTopic) => {
    setQuery(topic.title);
    if (onSearch) {
      onSearch(topic.title, null);
      onClose();
    }
  };

  const handleCategoryClick = (categoryId: string) => {
    if (selectedCategory === categoryId) {
      // Deselect category
      setSelectedCategory(null);
      setQuery('');
      // Clear search when category is deselected
      if (onSearch) {
        onSearch('', null);
      }
    } else {
      // Select category and auto-search
      setSelectedCategory(categoryId);
      setQuery(''); // Clear query when category is selected
      // Auto-search with category filter
      if (onSearch) {
        onSearch('', categoryId);
        onClose();
      }
    }
  };

  const getCategoryLabel = (categoryId: string | null) => {
    if (!categoryId) return null;
    return SEARCH_CATEGORIES.find(cat => cat.id === categoryId)?.label || null;
  };

  const getDisplayQuery = () => {
    if (selectedCategory) {
      const categoryLabel = getCategoryLabel(selectedCategory);
      if (query.trim()) {
        return `"${categoryLabel}" ${query}`;
      }
      return `"${categoryLabel}"`;
    }
    return query;
  };

  const getResultIcon = (type: string) => {
    switch (type) {
      case 'user':
        return User;
      case 'tag':
        return Hash;
      case 'post':
        return FileText;
      default:
        return Search;
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[60] bg-white lg:bg-black/50"
      >
        {/* Desktop: Match PageLayout's 70% content area */}
        <div className="h-full w-full lg:flex lg:justify-center lg:items-start lg:pt-[84px]">
          {/* Container matching PageLayout structure */}
          <div className="h-full w-full lg:max-w-[1200px] lg:mx-auto lg:px-6">
            <div className="h-full lg:flex lg:gap-6">
              {/* 70% Content Area - matching PageLayout's main content - Smaller height */}
              <div className="h-full w-full lg:w-[70%] lg:h-[calc(85vh-84px)] lg:max-h-[700px] lg:bg-white lg:rounded-xl lg:shadow-2xl overflow-hidden">
                {/* Header - Search Input */}
                <div className="sticky top-0 bg-white border-b border-gray-100 z-10 lg:rounded-t-xl">
          <div className="px-4 py-3 flex items-center gap-3">
            {/* Back Button */}
            <button
              onClick={onClose}
              className="flex-shrink-0 w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5 text-gray-600" strokeWidth={2.5} />
            </button>

            {/* Search Input */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" strokeWidth={2.5} />
              <input
                type="text"
                autoFocus
                value={getDisplayQuery()}
                onChange={(e) => {
                  const newValue = e.target.value;
                  if (selectedCategory) {
                    const categoryLabel = getCategoryLabel(selectedCategory);
                    const prefix = `"${categoryLabel}"`;
                    // If user deletes the category prefix, deselect category
                    if (!newValue.startsWith(prefix)) {
                      setSelectedCategory(null);
                      setQuery(newValue);
                    } else {
                      // Extract query after category prefix
                      const afterPrefix = newValue.substring(prefix.length).trim();
                      setQuery(afterPrefix);
                    }
                  } else {
                    setQuery(newValue);
                  }
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleSearch();
                  }
                }}
                placeholder="Kullanıcı, etiket veya gönderi ara..."
                className={`w-full py-2.5 bg-gray-100 rounded-full text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#5852c4]/30 transition-all ${
                  getDisplayQuery() ? 'pl-10 pr-10' : 'pl-10 pr-4'
                }`}
              />
              {/* Clear Button */}
              {getDisplayQuery() && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setQuery('');
                    setSelectedCategory(null);
                    // Don't call onSearch here - just clear the input
                    // Search results will be cleared when overlay closes
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
                >
                  <X className="w-3.5 h-3.5 text-gray-500" strokeWidth={2.5} />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="overflow-y-auto" style={{ height: 'calc(100vh - 60px)' }}>
          
          {/* STATE A: Default (No Input or < 3 chars) */}
          {query.length < 3 && (
            <div className="px-4 py-5">
              
              {/* Category Filters */}
              <section className="mb-6">
                <div className="flex flex-wrap gap-2">
                  {SEARCH_CATEGORIES.map((category) => {
                    const isSelected = selectedCategory === category.id;
                    return (
                      <button
                        key={category.id}
                        onClick={() => handleCategoryClick(category.id)}
                        className={`px-4 py-2 rounded-full text-sm font-bold transition-all active:scale-95 ${
                          isSelected
                            ? 'bg-[#5852c4] text-white shadow-md'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {category.label}
                      </button>
                    );
                  })}
                </div>
              </section>
              
              {/* Recent Searches */}
              {recentSearches.length > 0 && (
                <section className="mb-8">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-gray-500 text-sm">Son Aramalar</h3>
                    <button
                      onClick={handleClearAll}
                      className="text-sm text-[#5852c4] hover:text-[#19142e] font-semibold transition-colors"
                    >
                      Tümünü Temizle
                    </button>
                  </div>

                  <div className="space-y-2">
                    {recentSearches.map((search, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 py-3 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer group"
                      >
                        <Clock className="w-5 h-5 text-gray-400 ml-2 flex-shrink-0" strokeWidth={2.5} />
                        <span
                          onClick={() => handleRecentClick(search)}
                          className="flex-1 text-gray-700 font-semibold"
                        >
                          {search}
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRemoveRecent(search);
                          }}
                          className="w-6 h-6 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors opacity-0 group-hover:opacity-100 mr-2"
                        >
                          <X className="w-4 h-4 text-gray-500" strokeWidth={2.5} />
                        </button>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Trending Topics (Gündem) */}
              {trendingTopics.length > 0 && (
                <section>
                  <div className="flex items-center gap-2 mb-4">
                    <TrendingUp className="w-5 h-5 text-[#5852c4]" strokeWidth={2.5} />
                    <h3 className="font-black text-[#19142e]">Gündem</h3>
                  </div>

                  <div className="space-y-1">
                    {trendingTopics.map((topic, index) => (
                      <div
                        key={topic.id}
                        onClick={() => handleTrendingTopicClick(topic)}
                        className="flex items-start gap-3 py-4 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer px-3"
                      >
                        {/* Rank */}
                        <div className="flex-shrink-0 w-6 text-center">
                          <span className="font-black text-[#5852c4] text-lg">
                            #{index + 1}
                          </span>
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-[#19142e] mb-1 leading-tight">
                            {topic.title}
                          </h4>
                          <p className="text-sm text-gray-500 font-semibold">
                            {topic.count}
                          </p>
                        </div>

                        {/* More Icon */}
                        <button className="flex-shrink-0 w-8 h-8 rounded-full hover:bg-gray-200 flex items-center justify-center transition-colors opacity-0 group-hover:opacity-100">
                          <span className="text-gray-400">...</span>
                        </button>
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </div>
          )}

          {/* STATE B: Loading */}
          {query.length >= 3 && isLoading && (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 text-[#5852c4] animate-spin" strokeWidth={2.5} />
            </div>
          )}

          {/* STATE C: Results */}
          {query.length >= 3 && !isLoading && results.length > 0 && (
            <div className="px-4 py-5">
              <h3 className="font-bold text-gray-500 text-sm mb-4">
                Arama Sonuçları ({results.length})
              </h3>

              <div className="space-y-2">
                {results.map((result) => {
                  const IconComponent = getResultIcon(result.type);
                  
                  return (
                    <div
                      key={result.id}
                      onClick={() => {
                        if (onSearch) {
                          onSearch(result.title, selectedCategory);
                          onClose();
                        }
                      }}
                      className="flex items-center gap-3 py-3 px-3 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer"
                    >
                      {/* Icon/Avatar */}
                      {result.type === 'user' && result.avatar ? (
                        <ImageWithFallback 
                          src={result.avatar}
                          alt={result.title}
                          className="w-10 h-10 rounded-full flex-shrink-0"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-[#5852c4]/10 flex items-center justify-center flex-shrink-0">
                          <IconComponent className="w-5 h-5 text-[#5852c4]" strokeWidth={2.5} />
                        </div>
                      )}

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-[#19142e] truncate">
                          {result.title}
                        </h4>
                        {result.subtitle && (
                          <p className="text-sm text-gray-500 font-medium truncate">
                            {result.subtitle}
                          </p>
                        )}
                      </div>

                      {/* Type Badge */}
                      <div className="flex-shrink-0">
                        <span className={`
                          text-xs px-2 py-1 rounded-full font-bold
                          ${result.type === 'user' ? 'bg-blue-100 text-blue-700' : ''}
                          ${result.type === 'tag' ? 'bg-purple-100 text-purple-700' : ''}
                          ${result.type === 'post' ? 'bg-green-100 text-green-700' : ''}
                        `}>
                          {result.type === 'user' ? 'Kullanıcı' : ''}
                          {result.type === 'tag' ? 'Etiket' : ''}
                          {result.type === 'post' ? 'Gönderi' : ''}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STATE D: No Results */}
          {query.length >= 3 && !isLoading && results.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
              <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                <Search className="w-8 h-8 text-gray-400" strokeWidth={2} />
              </div>
              <h3 className="font-bold text-[#19142e] mb-2">Sonuç Bulunamadı</h3>
              <p className="text-gray-500 font-medium">
                "{query}" için bir şey bulamadık.
              </p>
            </div>
          )}
        </div>
              </div>
              {/* 30% Spacer - matching PageLayout's sidebar area */}
              <div className="hidden lg:block lg:w-[30%]"></div>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
