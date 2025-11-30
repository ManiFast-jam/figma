import React from 'react';
import { ThumbsUp, MessageCircle, Share2 } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

interface PostCardProps {
  post: {
    id: string;
    user: string;
    role: string;
    timeAgo: string;
    badge: string;
    title: string;
    content: string;
    upvotes: number;
    comments: number;
    avatarColor: string;
  };
  index: number;
  totalPosts: number;
  onClick: () => void;
}

const getPastelAvatarStyle = (avatarColor: string) => {
  const pastelMap: Record<string, { bg: string; text: string }> = {
    'bg-blue-600': { bg: 'bg-blue-100', text: 'text-blue-700' },
    'bg-amber-500': { bg: 'bg-amber-100', text: 'text-amber-700' },
    'bg-emerald-600': { bg: 'bg-emerald-100', text: 'text-emerald-700' },
    'bg-purple-600': { bg: 'bg-purple-100', text: 'text-purple-700' },
    'bg-pink-600': { bg: 'bg-pink-100', text: 'text-pink-700' },
    'bg-indigo-600': { bg: 'bg-indigo-100', text: 'text-indigo-700' },
  };
  return pastelMap[avatarColor] || { bg: 'bg-slate-100', text: 'text-slate-700' };
};

const getCategoryTextColor = (badge: string): string => {
  switch (badge) {
    case 'Akademik':
      return 'text-[#5852c4]';
    case 'Yeme-İçme':
      return 'text-amber-600';
    case 'Sosyal':
      return 'text-pink-600';
    case 'Barınma':
      return 'text-blue-600';
    case 'İkinci El':
      return 'text-emerald-600';
    case 'Duyuru':
      return 'text-red-600';
    default:
      return 'text-gray-500';
  }
};

export const PostCard: React.FC<PostCardProps> = ({ post, index, totalPosts, onClick }) => {
  const { isDarkMode } = useTheme();
  const pastel = getPastelAvatarStyle(post.avatarColor);

  return (
    <article 
      onClick={onClick}
      className={`px-6 py-4 cursor-pointer transition-all duration-200 ${
        isDarkMode 
          ? 'hover:bg-slate-800/50' 
          : 'hover:bg-gray-50/80'
      } ${
        index !== totalPosts - 1 
          ? (isDarkMode ? 'border-b border-slate-700' : 'border-b border-gray-100')
          : ''
      }`}
    >
      {/* STREAMLINED LAYOUT - Horizontal Flow */}
      <div className="flex gap-3">
        {/* LEFT: Pastel Avatar (40px) */}
        <div className="flex-shrink-0">
          <div className={`w-10 h-10 rounded-full ${pastel.bg} ${pastel.text} flex items-center justify-center font-bold text-sm`}>
            {post.user.charAt(0)}
          </div>
        </div>

        {/* RIGHT: All Content */}
        <div className="flex-1 min-w-0">
          {/* COMPACT HEADER - Single Line */}
          <div className="flex items-baseline justify-between mb-1">
            <div className="flex items-baseline gap-1.5 flex-wrap">
              <span className={`font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{post.user}</span>
              <span className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>@{post.role}</span>
              <span className={`text-xs ${isDarkMode ? 'text-slate-500' : 'text-gray-400'}`}>•</span>
              <span className={`text-xs ${isDarkMode ? 'text-slate-500' : 'text-gray-400'}`}>{post.timeAgo}</span>
            </div>
            
            {/* Category - Text Only (No Pill) */}
            <span className={`text-xs font-semibold ${getCategoryTextColor(post.badge)} flex-shrink-0 ml-2`}>
              {post.badge}
            </span>
          </div>

          {/* CONTENT - Title + Body */}
          <div className="mb-3">
            <h3 className={`font-bold text-base leading-snug ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              {post.title}
            </h3>
            <p className={`text-[15px] mt-1 leading-relaxed line-clamp-3 ${isDarkMode ? 'text-slate-300' : 'text-gray-600'}`}>
              {post.content}
            </p>
          </div>

          {/* ACTIONS - Small & Gray */}
          <div className={`flex gap-6 ${isDarkMode ? 'text-slate-500' : 'text-gray-400'}`}>
            <button className="flex items-center gap-1.5 group">
              <ThumbsUp className={`w-4 h-4 transition-colors ${
                isDarkMode 
                  ? 'text-slate-500 group-hover:text-slate-300' 
                  : 'text-gray-400 group-hover:text-gray-600'
              }`} strokeWidth={2} />
              <span className={`text-sm transition-colors ${
                isDarkMode 
                  ? 'text-slate-400 group-hover:text-slate-200' 
                  : 'text-gray-500 group-hover:text-gray-700'
              }`}>{post.upvotes}</span>
            </button>

            <button className="flex items-center gap-1.5 group">
              <MessageCircle className={`w-4 h-4 transition-colors ${
                isDarkMode 
                  ? 'text-slate-500 group-hover:text-slate-300' 
                  : 'text-gray-400 group-hover:text-gray-600'
              }`} strokeWidth={2} />
              <span className={`text-sm transition-colors ${
                isDarkMode 
                  ? 'text-slate-400 group-hover:text-slate-200' 
                  : 'text-gray-500 group-hover:text-gray-700'
              }`}>{post.comments}</span>
            </button>

            <button className="group">
              <Share2 className={`w-4 h-4 transition-colors ${
                isDarkMode 
                  ? 'text-slate-500 group-hover:text-slate-300' 
                  : 'text-gray-400 group-hover:text-gray-600'
              }`} strokeWidth={2} />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};
