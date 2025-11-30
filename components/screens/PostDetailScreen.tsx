import React, { useState } from 'react';
import { ArrowLeft, MoreHorizontal, ThumbsUp, MessageCircle, Share2, Send } from 'lucide-react';
import { GlobalHeader } from '../layout/GlobalHeader';
import { PageLayout } from '../layout/PageLayout';
import { WalletModal } from '../wallet/WalletModal';
import { useTheme } from '../../contexts/ThemeContext';

// Comment with nested replies
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

interface Post {
  id: string;
  title: string;
  user: string;
  role: string;
  avatarColor: string;
  content: string;
  likes: number;
  comments: number;
  fullDate: string;
  category: string;
}

const getRankBorderColor = (role: string) => {
  switch (role) {
    case 'Yeni Gelen':
      return 'ring-slate-400';
    case 'Seyyah':
      return 'ring-orange-500';
    case 'Gezgin':
      return 'ring-blue-500';
    case 'Bilge':
      return 'ring-purple-500';
    default:
      return 'ring-slate-400';
  }
};

// Recursive Comment Component
interface CommentItemProps {
  comment: Comment;
  depth?: number;
  onCommentClick?: (comment: Comment) => void;
}

const CommentItem: React.FC<CommentItemProps> = ({ comment, depth = 0, onCommentClick }) => {
  const { isDarkMode } = useTheme();
  const hasReplies = comment.replies && comment.replies.length > 0;
  const indentClass = depth > 0 ? 'ml-8' : '';

  const handleCommentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onCommentClick) {
      onCommentClick(comment);
    }
  };

  return (
    <div className={`relative ${indentClass}`}>
      <div 
        className={`flex gap-3 pb-5 cursor-pointer transition-colors rounded-lg p-2 -m-2 ${
          isDarkMode ? 'hover:bg-slate-800/50' : 'hover:bg-gray-50/50'
        }`}
        onClick={handleCommentClick}
      >
        {/* Left: Avatar Column with Thread Line */}
        <div className="relative flex flex-col items-center flex-shrink-0">
          <div className={`w-10 h-10 rounded-full ${comment.avatarColor} text-white flex items-center justify-center font-bold text-sm ring-2 ${getRankBorderColor(comment.role)}`}>
            {comment.user.charAt(0)}
          </div>
          
          {/* Thread Line - only if there are replies */}
          {hasReplies && (
            <div className="w-0.5 bg-gray-200 flex-1 mt-2" />
          )}
        </div>

        {/* Right: Comment Content */}
        <div className="flex-1 min-w-0">
          {/* User Info */}
          <div className="flex items-center gap-2 mb-1">
            <span className={`font-extrabold ${isDarkMode ? 'text-white' : 'text-[#111827]'}`}>{comment.user}</span>
            <span className={isDarkMode ? 'text-slate-600' : 'text-gray-400'}>•</span>
            <span className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>{comment.role}</span>
            <span className={isDarkMode ? 'text-slate-600' : 'text-gray-400'}>•</span>
            <span className={`text-sm ${isDarkMode ? 'text-slate-500' : 'text-gray-400'}`}>{comment.timeAgo}</span>
          </div>

          {/* Comment Text */}
          <p className={`leading-relaxed mb-3 ${isDarkMode ? 'text-slate-300' : 'text-[#4B5563]'}`}>
            {comment.text}
          </p>

          {/* Actions */}
          <div className="flex items-center gap-6">
            <button 
              className="flex items-center gap-1.5 group"
              onClick={(e) => e.stopPropagation()}
            >
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

            <button 
              className={`text-xs font-semibold transition-colors ${
                isDarkMode 
                  ? 'text-slate-400 hover:text-[#5852c4]' 
                  : 'text-gray-500 hover:text-[#5852c4]'
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              Yanıtla
            </button>
          </div>
        </div>
      </div>

      {/* Recursive Replies */}
      {hasReplies && (
        <div>
          {comment.replies!.map((reply) => (
            <CommentItem 
              key={reply.id} 
              comment={reply} 
              depth={depth + 1}
              onCommentClick={onCommentClick}
            />
          ))}
        </div>
      )}
    </div>
  );
};

interface PostDetailScreenProps {
  post: Post;
  comments: Comment[];
  onBack: () => void;
  onCommentClick?: (comment: Comment) => void;
  activeTab?: string;
  onTabChange?: (tab: string) => void;
  onGameCenterClick?: () => void;
}

export const PostDetailScreen: React.FC<PostDetailScreenProps> = ({ 
  post, 
  comments, 
  onBack,
  onCommentClick,
  activeTab = 'home',
  onTabChange,
  onGameCenterClick
}) => {
  const { isDarkMode } = useTheme();
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  const [replyText, setReplyText] = useState('');

  return (
    <>
      <div className={`min-h-screen ${isDarkMode ? 'bg-[#0f0e17]' : 'bg-[#f2f3f7]'} pb-28 lg:pb-6 transition-colors`}>
        {/* Global Header - Same as WikiDetailScreen */}
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
          {/* Main Post (Hero Content) */}
          <article className={`lg:rounded-xl lg:shadow-lg overflow-hidden border-b-8 lg:border-b-0 px-6 py-6 transition-colors ${
            isDarkMode 
              ? 'bg-[#1a1a2e] border-[#0f0e17] lg:border-0' 
              : 'bg-white border-[#f2f3f7] lg:border-0'
          }`}>
            {/* User Row */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`w-14 h-14 rounded-full ${post.avatarColor} text-white flex items-center justify-center font-extrabold text-xl ring-2 ${getRankBorderColor(post.role)} ring-offset-2`}>
                  {post.user.charAt(0)}
                </div>
                
                <div>
                  <div className={`font-extrabold ${isDarkMode ? 'text-white' : 'text-[#111827]'}`}>{post.user}</div>
                  <div className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>{post.role}</div>
                </div>
              </div>

              <button className={`p-2 rounded-full transition-colors ${
                isDarkMode ? 'hover:bg-slate-800' : 'hover:bg-gray-100'
              }`}>
                <MoreHorizontal className={`w-5 h-5 ${isDarkMode ? 'text-slate-400' : 'text-gray-600'}`} />
              </button>
            </div>

            {/* Title - Large Typography */}
            <h1 className={`text-2xl font-extrabold mb-4 leading-tight ${
              isDarkMode ? 'text-white' : 'text-[#111827]'
            }`}>
              {post.title}
            </h1>

            {/* Body Text - Large & Readable */}
            <p className={`text-lg leading-relaxed mb-4 ${
              isDarkMode ? 'text-slate-300' : 'text-[#4B5563]'
            }`}>
              {post.content}
            </p>

            {/* Compact Action Bar with Date - Single Line */}
            <div className="flex items-center justify-between pt-3">
              {/* Left: Like and Share Actions */}
              <div className="flex items-center gap-6">
                <button className="flex items-center gap-2 group">
                  <ThumbsUp className={`w-5 h-5 transition-colors ${
                    isDarkMode 
                      ? 'text-slate-400 group-hover:text-[#5852c4]' 
                      : 'text-gray-500 group-hover:text-[#5852c4]'
                  }`} strokeWidth={2.5} />
                  <span className={`text-sm font-bold transition-colors ${
                    isDarkMode 
                      ? 'text-slate-300 group-hover:text-[#5852c4]' 
                      : 'text-gray-600 group-hover:text-[#5852c4]'
                  }`}>{post.likes}</span>
                </button>

                <button className="flex items-center gap-2 group">
                  <Share2 className={`w-5 h-5 transition-colors ${
                    isDarkMode 
                      ? 'text-slate-400 group-hover:text-[#5852c4]' 
                      : 'text-gray-500 group-hover:text-[#5852c4]'
                  }`} strokeWidth={2.5} />
                  <span className={`text-sm font-bold transition-colors ${
                    isDarkMode 
                      ? 'text-slate-300 group-hover:text-[#5852c4]' 
                      : 'text-gray-600 group-hover:text-[#5852c4]'
                  }`}>12</span>
                </button>
              </div>

              {/* Right: Date and Time */}
              <span className={`text-sm ${isDarkMode ? 'text-slate-500' : 'text-gray-400'}`}>{post.fullDate}</span>
            </div>
          </article>

          {/* Comment Section - Infinite Threading */}
          <div className={`lg:rounded-xl lg:shadow-lg overflow-hidden mt-6 px-6 py-6 transition-colors ${
            isDarkMode ? 'bg-[#1a1a2e]' : 'bg-white'
          }`}>
            <h3 className={`text-lg font-extrabold mb-6 ${
              isDarkMode ? 'text-white' : 'text-[#111827]'
            }`}>Yorumlar {post.comments}</h3>
            
            {comments.map((comment) => (
              <CommentItem 
                key={comment.id} 
                comment={comment}
                onCommentClick={onCommentClick}
              />
            ))}
          </div>
          </PageLayout>
        </div>
      </div>

      {/* Sticky Bottom Reply Input */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-5 py-4 z-30">
        <div className="flex items-center gap-3 max-w-4xl mx-auto">
          <input
            type="text"
            placeholder="Yanıtını gönder..."
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            className="flex-1 px-4 py-3 bg-gray-100 rounded-full text-[#111827] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#5852c4]/30 transition-all"
          />
          <button 
            disabled={!replyText.trim()}
            className="p-3 bg-[#5852c4] rounded-full hover:bg-[#19142e] transition-all active:scale-95 shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-5 h-5 text-white" strokeWidth={2.5} />
          </button>
        </div>
      </div>

      {/* Wallet Modal */}
      {isWalletModalOpen && (
        <WalletModal onClose={() => setIsWalletModalOpen(false)} />
      )}
    </>
  );
};
