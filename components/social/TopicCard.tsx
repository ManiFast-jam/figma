import React, { useState } from 'react';
import { ThumbsUp, MessageCircle, Share2, MoreHorizontal } from 'lucide-react';

export interface TopicProps {
  id: string;
  title: string;
  user: string;
  role?: string; // Added role property
  badge: string;
  content?: string; // Optional preview text
  upvotes: number;
  comments: number;
  timeAgo: string;
}

export const TopicCard = ({ topic }: { topic: TopicProps }) => {
  const [liked, setLiked] = useState(false);

  // Badge Color Logic
  const getBadgeStyle = (badge: string) => {
    switch (badge) {
      case 'Akademik': return 'bg-blue-50 text-blue-600';
      case 'Yeme-İçme': return 'bg-orange-50 text-orange-600';
      case 'Barınma': return 'bg-purple-50 text-purple-600';
      case 'Sosyal': return 'bg-emerald-50 text-emerald-600';
      default: return 'bg-slate-50 text-slate-600';
    }
  };

  return (
    <div className="w-full bg-white rounded-2xl p-5 mb-4 shadow-[0_2px_15px_rgba(0,0,0,0.03)] border border-slate-50">
      {/* Header */}
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-[#1A3C75] text-white flex items-center justify-center text-xs font-bold">
            {topic.user.charAt(0)}
          </div>
          <div>
            <div className="flex items-center gap-1.5">
                <p className="text-xs font-bold text-[#1A3C75]">{topic.user}</p>
                {topic.role && (
                    <span className="px-1.5 py-0.5 bg-slate-200 text-slate-700 text-[9px] font-bold uppercase rounded-full tracking-wide">
                        {topic.role}
                    </span>
                )}
            </div>
            <p className="text-[10px] text-slate-400">{topic.timeAgo}</p>
          </div>
        </div>
        <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wide ${getBadgeStyle(topic.badge)}`}>
          {topic.badge}
        </span>
      </div>

      {/* Content */}
      <div className="mb-4">
        <h3 className="text-base font-bold text-slate-800 mb-1 leading-snug">
          {topic.title}
        </h3>
        {topic.content && (
            <p className="text-sm text-slate-500 line-clamp-2">
                {topic.content}
            </p>
        )}
      </div>

      {/* Actions Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-slate-50">
        <div className="flex items-center gap-4">
            <button 
                onClick={() => setLiked(!liked)}
                className={`flex items-center gap-1.5 text-xs font-bold transition-colors ${liked ? 'text-amber-500' : 'text-slate-400 hover:text-slate-600'}`}
            >
                <ThumbsUp className={`w-4 h-4 ${liked ? 'fill-current' : ''}`} />
                <span>{liked ? topic.upvotes + 1 : topic.upvotes}</span>
            </button>
            
            <button className="flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-[#1A3C75] transition-colors">
                <MessageCircle className="w-4 h-4" />
                <span>{topic.comments}</span>
            </button>
        </div>

        <div className="flex items-center gap-2">
             <button className="text-slate-300 hover:text-slate-500">
                <Share2 className="w-4 h-4" />
             </button>
        </div>
      </div>
    </div>
  );
};
