import React from 'react';
import { Clock, ArrowLeft, RotateCcw } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Version {
  id: string;
  user: string;
  avatar: string;
  action: string;
  time: string;
  canRevert?: boolean;
}

const MOCK_HISTORY: Version[] = [
  {
    id: '1',
    user: 'Ahmet K.',
    avatar: 'A',
    action: 'İçerik güncellendi',
    time: '10 dk önce',
    canRevert: true
  },
  {
    id: '2',
    user: 'Mehmet Y.',
    avatar: 'M',
    action: 'Yeni başlık oluşturuldu',
    time: '2 saat önce',
    canRevert: true
  },
  {
    id: '3',
    user: 'Sistem',
    avatar: 'S',
    action: 'Otomatik düzenleme',
    time: 'Dün',
    canRevert: true
  }
];

interface VersionHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRevert: (user: string) => void;
}

export const VersionHistoryModal = ({ isOpen, onClose, onRevert }: VersionHistoryModalProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="fixed inset-0 bg-white z-[55] flex flex-col"
        >
          {/* Header */}
          <div className="px-6 py-4 border-b border-slate-100 flex items-center gap-4 bg-white sticky top-0 z-10">
            <button 
              onClick={onClose}
              className="p-2 -ml-2 rounded-full hover:bg-slate-50 text-slate-400 transition-colors"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h2 className="text-lg font-bold text-[#1A3C75]">Sürüm Geçmişi</h2>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className="space-y-6 relative">
               {/* Timeline Line */}
               <div className="absolute left-[1.6rem] top-4 bottom-4 w-0.5 bg-slate-100 z-0" />

               {MOCK_HISTORY.map((version) => (
                 <div key={version.id} className="flex gap-4 relative z-10">
                    {/* Avatar */}
                    <div className="w-14 h-14 rounded-2xl bg-[#1A3C75] text-white flex items-center justify-center shrink-0 border-4 border-white shadow-sm text-lg font-bold">
                        {version.avatar}
                    </div>

                    {/* Content */}
                    <div className="flex-1 pt-1">
                        <div className="flex justify-between items-start">
                            <div>
                                <h4 className="font-bold text-[#1A3C75]">{version.user}</h4>
                                <p className="text-sm text-slate-500 font-medium">{version.action}</p>
                                <div className="flex items-center gap-1 mt-1 text-xs text-slate-400 font-semibold">
                                    <Clock className="w-3 h-3" />
                                    <span>{version.time}</span>
                                </div>
                            </div>
                            
                            {version.canRevert && (
                                <button 
                                    onClick={() => onRevert(version.user)}
                                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#F59E0B] text-[#F59E0B] text-xs font-bold hover:bg-amber-50 transition-colors"
                                >
                                    <RotateCcw className="w-3.5 h-3.5" />
                                    Geri Al
                                </button>
                            )}
                        </div>
                    </div>
                 </div>
               ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
