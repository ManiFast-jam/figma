import React, { useState } from 'react';
import { MapPin, Clock, Wallet, ExternalLink, History, Edit2, X, ThumbsUp, Flag, AlertCircle, CheckCircle, Lightbulb, PenLine } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { VersionHistoryModal } from './VersionHistoryModal';
import { RevertConfirmationDialog } from './RevertConfirmationDialog';

interface Comment {
  id: string;
  user: string;
  avatar: string;
  text: string;
  isHelpful?: boolean;
  date: string;
}

const MOCK_COMMENTS: Comment[] = [
  {
    id: '1',
    user: 'Mehmet Yılmaz',
    avatar: 'M',
    text: 'Fakültenin kütüphanesi sınav haftalarında 24 saat açık, üst katlar daha sakin oluyor. Mutlaka erken gitmenizi tavsiye ederim.',
    isHelpful: true,
    date: '2 gün önce'
  },
  {
    id: '2',
    user: 'Ayşe Demir',
    avatar: 'A',
    text: 'Kantindeki çay fiyatları biraz artmış ama tostları hala efsane. Hukukçuların buluşma noktası diyebilirim.',
    date: '5 saat önce'
  },
  {
    id: '3',
    user: 'Caner Erkin',
    avatar: 'C',
    text: 'Öğrenci işleri biraz yavaş çalışıyor, belge işlerinizi son güne bırakmayın arkadaşlar.',
    date: '1 hafta önce'
  },
  {
    id: '4',
    user: 'Zeynep S.',
    avatar: 'Z',
    text: 'Bahçedeki kediler çok tatlı, gelirken mama getirmeyi unutmayın! 🐱',
    date: '3 gün önce'
  }
];

interface TopicDetailSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TopicDetailSheet = ({ isOpen, onClose }: TopicDetailSheetProps) => {
  const [showHistory, setShowHistory] = useState(false);
  const [showRevertConfirm, setShowRevertConfirm] = useState(false);
  const [selectedRevertUser, setSelectedRevertUser] = useState('');
  const [selectedFeedback, setSelectedFeedback] = useState<string | null>(null);

  const handleRevertClick = (user: string) => {
      setSelectedRevertUser(user);
      setShowRevertConfirm(true);
  };

  const handleConfirmRevert = () => {
      // Logic to actually revert would go here
      setShowRevertConfirm(false);
      setShowHistory(false);
  };

  const handleFeedbackClick = (type: string) => {
      setSelectedFeedback(selectedFeedback === type ? null : type);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
          />
          
          {/* Bottom Sheet */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 h-[85vh] bg-white rounded-t-3xl z-50 flex flex-col shadow-2xl overflow-hidden"
          >
            {/* Sticky Header (Wiki Info) */}
            <div className="bg-[#1A3C75] p-6 text-white relative shrink-0">
              {/* Drag Handle */}
              <div className="absolute top-3 left-1/2 -translate-x-1/2 w-12 h-1.5 bg-white/20 rounded-full mb-4"></div>
              
              <div className="flex justify-between items-start mt-2">
                <div className="pr-4 w-full">
                  <h2 className="text-2xl font-bold leading-tight mb-4">Selçuk Üni. Hukuk Fakültesi</h2>
                  
                  {/* Structured Info Grid */}
                  <div className="grid grid-cols-1 gap-y-3 text-sm">
                     {/* Location */}
                     <div className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                            <MapPin className="w-3.5 h-3.5 text-blue-200" />
                        </div>
                        <span className="text-blue-50 font-medium">Bosna Hersek Mah. Osmanlı Cad.</span>
                     </div>

                     {/* Hours */}
                     <div className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                            <Clock className="w-3.5 h-3.5 text-blue-200" />
                        </div>
                        <span className="text-blue-50 font-medium">Açık • Kapanış: 23:00</span>
                     </div>

                     {/* Price */}
                     <div className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                            <Wallet className="w-3.5 h-3.5 text-blue-200" />
                        </div>
                        <span className="text-blue-50 font-medium">₺₺-₺₺₺</span>
                     </div>
                     
                     {/* Link Button */}
                     <div className="pt-2">
                         <button className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors text-sm font-bold text-white w-fit border border-white/10">
                             <ExternalLink className="w-4 h-4" />
                             Menüyü Gör
                         </button>
                     </div>
                  </div>
                </div>
                
                <div className="absolute top-6 right-6 flex gap-2">
                    <button 
                        onClick={() => setShowHistory(true)}
                        className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                    >
                        <History className="w-4 h-4 text-white" />
                    </button>
                    <button className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
                        <Edit2 className="w-4 h-4 text-white" />
                    </button>
                    <button onClick={onClose} className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
                        <X className="w-4 h-4 text-white" />
                    </button>
                </div>
              </div>

              {/* Feedback Row (Updated) */}
              <div className="mt-6 pt-4 border-t border-white/10">
                  <span className="text-sm font-medium text-blue-100 block mb-3">Bu başlık hakkında geri bildirimin?</span>
                  <div className="flex gap-2 flex-wrap">
                      {/* Chip 1: Yararlı */}
                      <button 
                        onClick={() => handleFeedbackClick('useful')}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-bold transition-colors
                            ${selectedFeedback === 'useful' 
                                ? 'bg-white text-[#1A3C75] border-white' 
                                : 'border-white/20 bg-white/5 text-blue-50 hover:bg-white/10'
                            }`}
                      >
                          <ThumbsUp className="w-3.5 h-3.5" />
                          <span>Yararlı</span>
                      </button>

                      {/* Chip 2: Eksik */}
                      <button 
                        onClick={() => handleFeedbackClick('incomplete')}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-bold transition-colors
                            ${selectedFeedback === 'incomplete' 
                                ? 'bg-white text-[#1A3C75] border-white' 
                                : 'border-white/20 bg-white/5 text-blue-50 hover:bg-white/10'
                            }`}
                      >
                          <AlertCircle className="w-3.5 h-3.5" />
                          <span>Eksik</span>
                      </button>

                      {/* Chip 3: Taraflı */}
                      <button 
                        onClick={() => handleFeedbackClick('biased')}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-bold transition-colors
                            ${selectedFeedback === 'biased' 
                                ? 'bg-white text-[#1A3C75] border-white' 
                                : 'border-white/20 bg-white/5 text-blue-50 hover:bg-white/10'
                            }`}
                      >
                          <Flag className="w-3.5 h-3.5" />
                          <span>Taraflı</span>
                      </button>
                  </div>
              </div>
            </div>

            {/* Body Section (Scrollable) */}
            <div className="flex-1 overflow-y-auto bg-white relative">
              <div className="p-6 pb-24 space-y-5">
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Öğrenci Yorumları</h3>
                
                {MOCK_COMMENTS.map((comment, index) => (
                  <div 
                    key={comment.id} 
                    className={`flex gap-3 relative ${comment.isHelpful ? 'mt-6' : ''}`}
                  >
                    {/* Avatar */}
                    <div className="shrink-0">
                      <div className="w-10 h-10 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center font-bold text-sm border-2 border-white shadow-sm">
                        {comment.avatar}
                      </div>
                    </div>

                    {/* Bubble */}
                    <div className={`flex-1 p-4 rounded-2xl rounded-tl-none text-sm text-slate-700 leading-relaxed shadow-sm relative
                        ${comment.isHelpful 
                            ? 'bg-[#F0FDF4] border border-green-200' 
                            : 'bg-[#F5F7FA]'
                        }`}
                    >
                        {/* Helpful Badge */}
                        {comment.isHelpful && (
                            <div className="absolute -top-3 right-4 px-2 py-0.5 bg-green-100 text-green-700 text-[10px] font-bold uppercase tracking-wide rounded-full border border-green-200 flex items-center gap-1 shadow-sm">
                                <CheckCircle className="w-3 h-3" />
                                En Faydalı
                            </div>
                        )}

                        <div className="flex justify-between items-baseline mb-1">
                            <span className="font-bold text-slate-900">{comment.user}</span>
                            <span className="text-[10px] text-slate-400">{comment.date}</span>
                        </div>
                        <p>{comment.text}</p>
                        
                        {/* Comment Actions (Updated) */}
                        <div className="mt-3 flex gap-4">
                            <button className="flex items-center gap-1 text-xs font-semibold text-slate-400 hover:text-slate-600 transition-colors">
                                <ThumbsUp className="w-3.5 h-3.5" />
                                <span>Beğen</span>
                            </button>
                            <button className="flex items-center gap-1 text-xs font-semibold text-[#F59E0B] hover:text-amber-600 transition-colors">
                                <Lightbulb className="w-3.5 h-3.5 fill-current" />
                                <span>Mantıklı</span>
                            </button>
                        </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Floating Action Button (Absolute to sheet) */}
            <div className="absolute bottom-6 right-6">
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-14 h-14 bg-[#F59E0B] text-white rounded-full shadow-lg shadow-amber-500/30 flex items-center justify-center"
                >
                    <PenLine className="w-6 h-6" />
                </motion.button>
            </div>

            {/* Modals */}
            <VersionHistoryModal 
                isOpen={showHistory} 
                onClose={() => setShowHistory(false)}
                onRevert={handleRevertClick}
            />
            
            <RevertConfirmationDialog 
                isOpen={showRevertConfirm}
                onClose={() => setShowRevertConfirm(false)}
                onConfirm={handleConfirmRevert}
                user={selectedRevertUser}
            />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
