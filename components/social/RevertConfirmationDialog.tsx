import React from 'react';
import { X, AlertTriangle } from 'lucide-react';
import { motion } from 'motion/react';

interface RevertConfirmationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  user: string;
}

export const RevertConfirmationDialog = ({ isOpen, onClose, onConfirm, user }: RevertConfirmationDialogProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center px-6">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white w-full max-w-sm rounded-3xl p-6 shadow-2xl relative z-10"
      >
        <div className="flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-full bg-[#FFFBEB] flex items-center justify-center mb-4 border-4 border-white shadow-sm">
            <AlertTriangle className="w-8 h-8 text-[#F59E0B]" />
          </div>
          
          <h3 className="text-xl font-bold text-[#1A3C75] mb-2">
            Sürümü Geri Yükle?
          </h3>
          
          <p className="text-sm text-slate-500 leading-relaxed mb-6">
            Bu başlığı <span className="font-bold text-slate-800">{user}</span> tarafından oluşturulan sürüme döndürmek istiyor musunuz?
          </p>
          
          <div className="flex gap-3 w-full">
            <button 
              onClick={onClose}
              className="flex-1 py-3 rounded-xl bg-slate-100 text-slate-500 font-bold text-sm hover:bg-slate-200 transition-colors"
            >
              Vazgeç
            </button>
            <button 
              onClick={onConfirm}
              className="flex-1 py-3 rounded-xl bg-[#1A3C75] text-white font-bold text-sm hover:bg-[#153262] transition-colors shadow-lg shadow-blue-900/20"
            >
              Evet, Onayla
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
