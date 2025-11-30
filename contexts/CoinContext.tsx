import React, { createContext, useContext, useState, ReactNode } from 'react';

interface CoinContextType {
  coins: number;
  setCoins: (coins: number | ((prev: number) => number)) => void;
  addCoins: (amount: number) => void;
  triggerCoinAnimation: () => void;
  coinAnimationTrigger: number;
}

const CoinContext = createContext<CoinContextType | undefined>(undefined);

export const CoinProvider = ({ children, initialCoins = 6240 }: { children: ReactNode; initialCoins?: number }) => {
  const [coins, setCoins] = useState(initialCoins);
  const [coinAnimationTrigger, setCoinAnimationTrigger] = useState(0);

  const addCoins = (amount: number) => {
    setCoins((prev) => prev + amount);
    // Trigger animation
    setCoinAnimationTrigger((prev) => prev + 1);
  };

  const triggerCoinAnimation = () => {
    setCoinAnimationTrigger((prev) => prev + 1);
  };

  return (
    <CoinContext.Provider value={{ coins, setCoins, addCoins, triggerCoinAnimation, coinAnimationTrigger }}>
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

