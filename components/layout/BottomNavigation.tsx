import React, { useState } from 'react';
import { Home, Compass, Search, Bell, User, Gamepad2 } from 'lucide-react';
import { motion } from 'motion/react';
import { useTheme } from '../../contexts/ThemeContext';

export const BottomNavigation = ({ activeTab, onTabChange, onFabClick }: { activeTab: string, onTabChange: (tab: string) => void, onFabClick: () => void }) => {
  const { isDarkMode } = useTheme();
  
  const navItems = [
    { id: 'home', icon: <Home className="w-6 h-6" />, label: 'Home' },
    { id: 'discover', icon: <Compass className="w-6 h-6" />, label: 'Discover' },
    { id: 'fab', icon: null, label: '' }, 
    { id: 'notifications', icon: <Bell className="w-6 h-6" />, label: 'Activity' },
    { id: 'profile', icon: <User className="w-6 h-6" />, label: 'Profile' },
  ];

  return (
    <div className={`fixed bottom-0 left-0 right-0 ${isDarkMode ? 'bg-[#1a1a2e]' : 'bg-[#ededff]'} shadow-[0_-8px_24px_rgba(25,20,46,0.08)] pb-6 pt-2 px-6 h-24 flex items-start justify-between z-50 lg:hidden transition-colors`}>
      {navItems.map((item) => {
        if (item.id === 'fab') {
          return (
            <div key={item.id} className="relative -top-8">
              <motion.button 
                onClick={onFabClick}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`w-16 h-16 rounded-full bg-[#5852c4] text-white flex items-center justify-center shadow-[0_12px_32px_rgba(88,82,196,0.4)] border-4 ${isDarkMode ? 'border-[#0f0e17]' : 'border-[#f2f3f7]'}`}
              >
                <Gamepad2 className="w-7 h-7" strokeWidth={2.5} />
              </motion.button>
            </div>
          );
        }

        const isActive = activeTab === item.id;
        return (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id)}
            className={`flex flex-col items-center gap-1 w-12 pt-2 transition-colors ${
              isActive 
                ? 'text-[#5852c4]' 
                : isDarkMode ? 'text-slate-400' : 'text-[#8279a5]'
            }`}
          >
            {item.icon}
            <span className="text-[10px] font-medium">{item.label}</span>
            {isActive && (
              <motion.div 
                layoutId="nav-indicator"
                className="w-1 h-1 rounded-full bg-[#5852c4] mt-1" 
              />
            )}
          </button>
        );
      })}
    </div>
  );
};
