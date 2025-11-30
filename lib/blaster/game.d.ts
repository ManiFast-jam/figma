/**
 * Type definitions for game.js
 * GençCoin Wormhole Blaster Oyunu
 */

export interface GameResult {
  gencCoins: number;
  totalCoins: number;
  timeLimit: number;
}

export type GameOverCallback = (result: GameResult) => void;

/**
 * Oyunu başlatır ve cleanup fonksiyonunu döndürür
 * @param containerElement - Oyunun render edileceği HTML container element
 * @returns cleanup - Oyunu temizlemek ve kaynakları serbest bırakmak için çağrılacak fonksiyon
 */
export function initGame(containerElement: HTMLElement): () => void;

export default initGame;

// Global window callback
declare global {
  interface Window {
    onGameOver?: GameOverCallback;
  }
}

