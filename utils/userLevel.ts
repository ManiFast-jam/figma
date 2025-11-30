/**
 * Kullanıcı seviyesini coin miktarına göre hesaplar
 * @param coins Kullanıcının toplam coin miktarı
 * @returns Kullanıcı seviyesi (1-5)
 */
export const getUserLevel = (coins: number): number => {
  if (coins < 500) return 1; // Yeni Gelen
  if (coins < 2500) return 2; // Seyyah
  if (coins < 10000) return 3; // Gezgin
  if (coins < 50000) return 4; // Kaşif Meraklısı
  return 5; // Konya Bilgesi
};

/**
 * Kullanıcının wiki oluşturma yetkisi var mı?
 * @param coins Kullanıcının toplam coin miktarı
 * @returns true if level >= 3
 */
export const canCreateWiki = (coins: number): boolean => {
  return getUserLevel(coins) >= 3;
};

/**
 * Kullanıcının wiki düzenleme yetkisi var mı?
 * @param coins Kullanıcının toplam coin miktarı
 * @returns true if level >= 3
 */
export const canEditWiki = (coins: number): boolean => {
  return getUserLevel(coins) >= 3;
};

/**
 * Kullanıcı seviyesinin adını döndürür
 * @param coins Kullanıcının toplam coin miktarı
 * @returns Seviye adı
 */
export const getUserLevelName = (coins: number): string => {
  const level = getUserLevel(coins);
  const names = ['', 'Yeni Gelen', 'Seyyah', 'Gezgin', 'Kaşif Meraklısı', 'Konya Bilgesi'];
  return names[level] || 'Bilinmeyen';
};

