import React from 'react';
import { GraduationCap, Camera, Gamepad2 } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

interface SuggestedGamesProps {
  onGameClick?: (gameId: string) => void;
}

export const SuggestedGames = ({ onGameClick }: SuggestedGamesProps) => {
  const { isDarkMode } = useTheme();
  const games = [
    {
      id: 'exam-hero',
      title: 'Vize/Final Kahramanı',
      reward: '+150 Coin',
      icon: GraduationCap,
      color: 'from-purple-500 to-purple-600',
    },
    {
      id: 'campus-reporter',
      title: 'Kampüs Muhabiri',
      reward: '+75 Coin',
      icon: Camera,
      color: 'from-blue-500 to-blue-600',
    },
  ];

  return (
    <div className={`rounded-[10px] p-5 shadow-[0_2px_12px_rgba(25,20,46,0.08)] hover:shadow-[0_4px_20px_rgba(25,20,46,0.12)] transition-all ${
      isDarkMode ? 'bg-[#1a1a2e]' : 'bg-white'
    }`}>
      <div className="flex items-center gap-2 mb-4">
        <Gamepad2 className="w-5 h-5 text-[#5852c4]" strokeWidth={2.5} />
        <h3 className={`font-bold ${isDarkMode ? 'text-white' : 'text-[#19142e]'}`}>Önerilen Oyunlar</h3>
      </div>

      <div className="space-y-3">
        {games.map((game) => {
          const Icon = game.icon;
          return (
            <button
              key={game.id}
              onClick={() => onGameClick?.(game.id)}
              className="w-full bg-gradient-to-r from-[#5852c4] to-[#7c73e6] rounded-[10px] p-4 hover:scale-[1.02] transition-transform group"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white/20 rounded-[10px] flex items-center justify-center">
                  <Icon className="w-6 h-6 text-white" strokeWidth={2.5} />
                </div>
                <div className="flex-1 text-left">
                  <h4 className="font-bold text-white text-sm">{game.title}</h4>
                  <p className="text-white/80 text-xs">{game.reward}</p>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <button
        onClick={() => onGameClick?.('all')}
        className="w-full mt-3 py-2 bg-[#5852c4]/10 text-[#5852c4] rounded-[10px] font-bold text-sm hover:bg-[#5852c4]/20 transition-colors"
      >
        Tüm Oyunlar
      </button>
    </div>
  );
};
