import React from 'react';
import { Image, Hash, MapPin } from 'lucide-react';
import { motion } from 'motion/react';

interface QuickPostTriggerProps {
  onTrigger: () => void;
}

export const QuickPostTrigger = ({ onTrigger }: QuickPostTriggerProps) => {
  return (
    <motion.div
      layoutId="compose-container"
      onClick={onTrigger}
      className="bg-white px-6 py-4 cursor-pointer hover:bg-gray-50/50 transition-colors border-b border-[#E5E7EB]"
    >
      {/* Trigger Input Field (Pill-shaped) */}
      <motion.div
        layoutId="input-area"
        className="flex items-center justify-between bg-[#F3F4F6] rounded-full px-5 py-3 group hover:bg-[#ededff] transition-all"
      >
          {/* Placeholder Text */}
          <span className="text-gray-500 font-medium text-sm select-none">
            Yeni gönderi oluştur...
          </span>

          {/* Action Icons */}
          <div className="flex items-center gap-3">
            <Image className="w-4 h-4 text-gray-400 group-hover:text-[#5852c4] transition-colors" strokeWidth={2.5} />
            <Hash className="w-4 h-4 text-gray-400 group-hover:text-[#5852c4] transition-colors" strokeWidth={2.5} />
            <MapPin className="w-4 h-4 text-gray-400 group-hover:text-[#5852c4] transition-colors" strokeWidth={2.5} />
          </div>
      </motion.div>
    </motion.div>
  );
};
