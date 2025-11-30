import React from 'react';
import { X, Clock, User, RotateCcw, ChevronRight } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { toast } from 'sonner';

interface WikiVersion {
  version: number;
  editedBy: string;
  editedAt: string;
  changes: string;
  isCurrent?: boolean;
}

interface WikiHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  wikiTitle: string;
  versions: WikiVersion[];
  onRestoreVersion?: (version: number) => void;
}

export const WikiHistoryModal: React.FC<WikiHistoryModalProps> = ({
  isOpen,
  onClose,
  wikiTitle,
  versions,
  onRestoreVersion,
}) => {
  const { isDarkMode } = useTheme();

  if (!isOpen) return null;

  const handleRestore = (version: WikiVersion) => {
    if (version.isCurrent) {
      toast.info('Bu zaten güncel sürüm');
      return;
    }
    
    toast.success(`Versiyon ${version.version}'e geri dönüldü`);
    onRestoreVersion?.(version.version);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end lg:items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div 
        className={`relative w-full lg:w-[600px] lg:max-h-[80vh] max-h-[85vh] lg:rounded-2xl rounded-t-2xl overflow-hidden shadow-2xl ${
          isDarkMode ? 'bg-[#1a1a2e]' : 'bg-white'
        }`}
      >
        {/* Header */}
        <div className={`px-6 py-5 border-b flex items-center justify-between ${
          isDarkMode ? 'border-slate-700' : 'border-gray-200'
        }`}>
          <div className="flex-1">
            <h2 className={`text-xl font-black ${isDarkMode ? 'text-white' : 'text-[#19142e]'}`}>
              Sürüm Geçmişi
            </h2>
            <p className={`text-sm font-semibold mt-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
              {wikiTitle}
            </p>
          </div>
          <button
            onClick={onClose}
            className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
              isDarkMode 
                ? 'hover:bg-slate-800 text-slate-400' 
                : 'hover:bg-slate-100 text-slate-600'
            }`}
          >
            <X className="w-6 h-6" strokeWidth={2.5} />
          </button>
        </div>

        {/* Version List */}
        <div className="overflow-y-auto max-h-[calc(85vh-80px)] lg:max-h-[calc(80vh-80px)]">
          <div className="p-4 space-y-3">
            {versions.map((version, index) => (
              <div
                key={version.version}
                className={`rounded-xl border-2 p-4 transition-all ${
                  version.isCurrent
                    ? isDarkMode
                      ? 'border-[#5852c4] bg-[#5852c4]/10'
                      : 'border-[#5852c4] bg-[#5852c4]/5'
                    : isDarkMode
                      ? 'border-slate-700 hover:border-slate-600 bg-[#0f0e17]'
                      : 'border-gray-200 hover:border-gray-300 bg-white'
                }`}
              >
                {/* Version Header */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`flex items-center justify-center w-10 h-10 rounded-lg font-black ${
                      version.isCurrent
                        ? 'bg-[#5852c4] text-white'
                        : isDarkMode
                          ? 'bg-slate-800 text-slate-300'
                          : 'bg-slate-100 text-slate-700'
                    }`}>
                      v{version.version}
                    </div>
                    {version.isCurrent && (
                      <span className="px-3 py-1 rounded-lg bg-[#5852c4] text-white text-xs font-black">
                        GÜNCEL
                      </span>
                    )}
                  </div>
                  {!version.isCurrent && (
                    <button
                      onClick={() => handleRestore(version)}
                      className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-bold transition-all active:scale-95 ${
                        isDarkMode
                          ? 'bg-slate-800 text-white hover:bg-slate-700'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      <RotateCcw className="w-4 h-4" strokeWidth={2.5} />
                      <span>Geri Dön</span>
                    </button>
                  )}
                </div>

                {/* Version Info */}
                <div className="space-y-2">
                  <div className={`flex items-center gap-2 text-sm ${
                    isDarkMode ? 'text-slate-300' : 'text-slate-700'
                  }`}>
                    <User className="w-4 h-4" strokeWidth={2} />
                    <span className="font-semibold">Düzenleyen:</span>
                    <span className={`font-bold ${
                      isDarkMode ? 'text-white' : 'text-[#19142e]'
                    }`}>
                      {version.editedBy}
                    </span>
                  </div>
                  <div className={`flex items-center gap-2 text-sm ${
                    isDarkMode ? 'text-slate-400' : 'text-slate-500'
                  }`}>
                    <Clock className="w-4 h-4" strokeWidth={2} />
                    <span>{version.editedAt}</span>
                  </div>
                  {version.changes && (
                    <div className={`mt-3 pt-3 border-t text-sm ${
                      isDarkMode 
                        ? 'border-slate-700 text-slate-300' 
                        : 'border-gray-200 text-slate-600'
                    }`}>
                      <div className="flex items-start gap-2">
                        <ChevronRight className="w-4 h-4 mt-0.5 flex-shrink-0" strokeWidth={2} />
                        <span>{version.changes}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
