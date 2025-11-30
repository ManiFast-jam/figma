/**
 * Coin Reward Service - Oyunlaştırma Sistemi
 * 
 * Bu servis, kullanıcı eylemlerine göre coin ödüllendirme sistemini yönetir.
 * Rol bazlı çarpan sistemi ve eylem bazlı ödül matrisi içerir.
 */

export enum CoinActionType {
  // İçerik Üretme
  CREATE_WIKI_TOPIC = 'CREATE_WIKI_TOPIC', // Yeni başlık açma (sadece Gezgin+)
  EDIT_WIKI_ENTRY = 'EDIT_WIKI_ENTRY', // Bilgi alanı düzenleme
  CREATE_COMMENT = 'CREATE_COMMENT', // Yorum yazma
  
  // Etkileşim Alma
  WIKI_ENTRY_HELPFUL_VOTE = 'WIKI_ENTRY_HELPFUL_VOTE', // Yararlı oy
  WIKI_ENTRY_UNHELPFUL_VOTE = 'WIKI_ENTRY_UNHELPFUL_VOTE', // Yararsız oy
  COMMENT_LIKE = 'COMMENT_LIKE', // Yorum beğenisi
  
  // Sosyal Sorumluluk
  CULTURE_CARD_PROJECT = 'CULTURE_CARD_PROJECT', // Genç Kültür Kart projesi
  REFERRAL_LINK_GENERATE = 'REFERRAL_LINK_GENERATE', // Referral link oluşturma
  
  // Oyunlar
  GAME_SURVEY_COMPLETE = 'GAME_SURVEY_COMPLETE', // Anket tamamlama
  GAME_EXAM_HERO = 'GAME_EXAM_HERO', // Vize/Final Kahramanı
  GAME_CAMPUS_REPORTER = 'GAME_CAMPUS_REPORTER', // Kampüs Muhabiri
  GAME_TREASURE_HUNT = 'GAME_TREASURE_HUNT', // Hazine Avı
}

export interface CoinRewardConfig {
  baseAmount: number; // Temel puan (Yeni Gelen rolü için)
  minRole?: string; // Minimum rol gereksinimi (opsiyonel)
  description: string; // Açıklama
}

/**
 * Coin Kazanma Matrisi
 * Her eylem için temel puan ve rol gereksinimleri
 */
export const COIN_REWARD_MATRIX: Record<CoinActionType, CoinRewardConfig> = {
  // İçerik Üretme
  [CoinActionType.CREATE_WIKI_TOPIC]: {
    baseAmount: 20,
    minRole: 'Seyyah', // 500 coin'de Seyyah rolü ile açılır
    description: 'Yeni başlık açma',
  },
  [CoinActionType.EDIT_WIKI_ENTRY]: {
    baseAmount: 10,
    description: 'Bilgi alanı düzenleme (onaylandığında)',
  },
  [CoinActionType.CREATE_COMMENT]: {
    baseAmount: 2,
    description: 'Yorum yazma',
  },
  
  // Etkileşim Alma
  [CoinActionType.WIKI_ENTRY_HELPFUL_VOTE]: {
    baseAmount: 5,
    description: 'Bilgi alanı düzenlemesinin yararlı oy alması',
  },
  [CoinActionType.WIKI_ENTRY_UNHELPFUL_VOTE]: {
    baseAmount: -10, // Negatif coin
    description: 'Bilgi alanı düzenlemesinin yararsız oy alması',
  },
  [CoinActionType.COMMENT_LIKE]: {
    baseAmount: 1,
    description: 'Yorumun beğenilmesi',
  },
  
  // Sosyal Sorumluluk
  [CoinActionType.CULTURE_CARD_PROJECT]: {
    baseAmount: 100,
    description: 'Genç Kültür Kart ile yapılan S.S. Projesi',
  },
  [CoinActionType.REFERRAL_LINK_GENERATE]: {
    baseAmount: 100,
    description: 'Referral link oluşturma',
  },
  
  // Oyunlar
  [CoinActionType.GAME_SURVEY_COMPLETE]: {
    baseAmount: 10,
    description: 'Günün anketi tamamlama',
  },
  [CoinActionType.GAME_EXAM_HERO]: {
    baseAmount: 150,
    description: 'Vize/Final Kahramanı - Not yükleme',
  },
  [CoinActionType.GAME_CAMPUS_REPORTER]: {
    baseAmount: 75,
    description: 'Kampüs Muhabiri - Rapor yayınlama',
  },
  [CoinActionType.GAME_TREASURE_HUNT]: {
    baseAmount: 50,
    description: 'Hazine Avı - Görev tamamlama',
  },
};

/**
 * Rol Çarpanları
 */
export const ROLE_MULTIPLIERS: Record<string, number> = {
  'Yeni Gelen': 1.0,
  'Seyyah': 1.2,
  'Gezgin': 1.5,
  'Kaşif Meraklısı': 2.0,
  'Konya Bilgesi': 2.5,
};

/**
 * Rol Sıralaması (terfi kontrolü için)
 */
const ROLE_HIERARCHY = ['Yeni Gelen', 'Seyyah', 'Gezgin', 'Kaşif Meraklısı', 'Konya Bilgesi'];

/**
 * Kullanıcının rolünü coin sayısına göre belirler
 */
export function getUserRole(coins: number): string {
  if (coins < 500) return 'Yeni Gelen';
  if (coins < 2500) return 'Seyyah';
  if (coins < 10000) return 'Gezgin';
  if (coins < 50000) return 'Kaşif Meraklısı';
  return 'Konya Bilgesi';
}

/**
 * Rol çarpanını döndürür
 */
export function getRoleMultiplier(role: string): number {
  return ROLE_MULTIPLIERS[role] || 1.0;
}

/**
 * Rol gereksinimini kontrol eder
 */
export function checkRoleRequirement(userRole: string, minRole?: string): boolean {
  if (!minRole) return true;
  
  const userIndex = ROLE_HIERARCHY.indexOf(userRole);
  const minIndex = ROLE_HIERARCHY.indexOf(minRole);
  
  return userIndex >= minIndex;
}

/**
 * Coin ödülünü hesaplar (rol çarpanı ile)
 */
export function calculateCoinReward(
  actionType: CoinActionType,
  userCoins: number
): { amount: number; role: string; multiplier: number; canPerform: boolean; reason?: string } {
  const config = COIN_REWARD_MATRIX[actionType];
  const userRole = getUserRole(userCoins);
  const multiplier = getRoleMultiplier(userRole);
  
  // Rol gereksinimi kontrolü
  if (config.minRole && !checkRoleRequirement(userRole, config.minRole)) {
    return {
      amount: 0,
      role: userRole,
      multiplier,
      canPerform: false,
      reason: `${config.minRole} rolü gereklidir. Şu anki rolünüz: ${userRole}`,
    };
  }
  
  // Negatif coin kontrolü (negatif bakiye olabilir)
  const baseAmount = config.baseAmount;
  const finalAmount = Math.round(baseAmount * multiplier);
  
  return {
    amount: finalAmount,
    role: userRole,
    multiplier,
    canPerform: true,
  };
}

/**
 * Coin ödülünü uygular ve sonucu döndürür
 */
export function applyCoinReward(
  actionType: CoinActionType,
  currentCoins: number
): { newCoins: number; reward: number; role: string; multiplier: number; canPerform: boolean; reason?: string } {
  const calculation = calculateCoinReward(actionType, currentCoins);
  
  if (!calculation.canPerform) {
    return {
      newCoins: currentCoins,
      reward: 0,
      role: calculation.role,
      multiplier: calculation.multiplier,
      canPerform: false,
      reason: calculation.reason,
    };
  }
  
  // Negatif bakiye olabilir (yararsız oy için caydırıcılık)
  const newCoins = currentCoins + calculation.amount;
  
  return {
    newCoins,
    reward: calculation.amount,
    role: calculation.role,
    multiplier: calculation.multiplier,
    canPerform: true,
  };
}

