/**
 * Badge Utility Functions
 * Helper functions for badge unlock logic based on coins
 */

export interface BadgeUnlockStatus {
  unlocked: boolean;
  unlockedDate?: string;
}

/**
 * Determines if a badge is unlocked based on user's coin count
 * @param badgeId - The badge ID
 * @param coins - User's current coin count
 * @returns Unlock status and date
 */
export const getBadgeUnlockStatus = (badgeId: number, coins: number): BadgeUnlockStatus => {
  const today = new Date().toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' });
  
  // Coin-based badges (role badges)
  const coinBasedBadges: Record<number, number> = {
    1: 0,      // Yeni Gelen - Always unlocked
    2: 500,    // Seyyah - Unlocks at exactly 500 coins
    3: 2500,   // Gezgin
    4: 10000,  // Kaşif Meraklısı
    6: 50000,  // Konya Bilgesi
    11: 100000, // Usta
    12: 500000, // Efsane
  };

  if (coinBasedBadges[badgeId] !== undefined) {
    const requiredCoins = coinBasedBadges[badgeId];
    // For badge ID 2 (Seyyah), unlock at exactly 500 coins (not before)
    const isUnlocked = badgeId === 2 
      ? coins >= requiredCoins && coins < 2500  // Seyyah: 500-2499
      : coins >= requiredCoins;
    return {
      unlocked: isUnlocked,
      unlockedDate: isUnlocked ? today : undefined
    };
  }

  // Other badges (non-coin based) remain locked for now
  return { unlocked: false, unlockedDate: undefined };
};

/**
 * Gets the badge ID for a given role name
 */
export const getBadgeIdForRole = (roleName: string): number | null => {
  const roleToBadgeId: Record<string, number> = {
    'Yeni Gelen': 1,
    'Seyyah': 2,
    'Gezgin': 3,
    'Kaşif Meraklısı': 4,
    'Konya Bilgesi': 6,
    'Usta': 11,
    'Efsane': 12,
  };

  return roleToBadgeId[roleName] || null;
};

/**
 * Gets the badge name for a given role name
 */
export const getBadgeNameForRole = (roleName: string): string => {
  return roleName; // Role name is the same as badge name for coin-based badges
};

