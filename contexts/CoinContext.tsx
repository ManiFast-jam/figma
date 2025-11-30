import React, { createContext, useContext, useState, ReactNode } from 'react';
import { CoinActionType, applyCoinReward, getUserRole, getRoleMultiplier } from '../services/CoinRewardService';

interface CoinContextType {
  coins: number;
  setCoins: (coins: number | ((prev: number) => number)) => void;
  addCoins: (amount: number) => void;
  rewardAction: (actionType: CoinActionType) => { success: boolean; reward: number; reason?: string };
  getUserRole: () => string;
  getRoleMultiplier: () => number;
  triggerCoinAnimation: () => void;
  coinAnimationTrigger: number;
}

const CoinContext = createContext<CoinContextType | undefined>(undefined);

export const CoinProvider = ({ children, initialCoins = 0 }: { children: ReactNode; initialCoins?: number }) => {
  const [coins, setCoins] = useState(initialCoins);
  const [coinAnimationTrigger, setCoinAnimationTrigger] = useState(0);

  // Eski addCoins fonksiyonu (geriye dönük uyumluluk için)
  const addCoins = (amount: number) => {
    setCoins((prev) => Math.max(0, prev + amount));
    // Trigger animation
    setCoinAnimationTrigger((prev) => prev + 1);
  };

  // Yeni rewardAction fonksiyonu (oyunlaştırma sistemi)
  const rewardAction = (actionType: CoinActionType) => {
    const result = applyCoinReward(actionType, coins);
    
    if (result.canPerform) {
      setCoins(result.newCoins);
      // Trigger animation
      setCoinAnimationTrigger((prev) => prev + 1);
      return {
        success: true,
        reward: result.reward,
      };
    } else {
      return {
        success: false,
        reward: 0,
        reason: result.reason,
      };
    }
  };

  const triggerCoinAnimation = () => {
    setCoinAnimationTrigger((prev) => prev + 1);
  };

  return (
    <CoinContext.Provider value={{ 
      coins, 
      setCoins, 
      addCoins, 
      rewardAction,
      getUserRole: () => getUserRole(coins),
      getRoleMultiplier: () => getRoleMultiplier(getUserRole(coins)),
      triggerCoinAnimation, 
      coinAnimationTrigger 
    }}>
      {children}
    </CoinContext.Provider>
  );
};

export const useCoins = () => {
  const context = useContext(CoinContext);
  if (!context) {
    throw new Error('useCoins must be used within a CoinProvider');
  }
  return context;
};

