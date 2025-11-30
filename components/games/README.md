# 🎮 Coin Blaster - Three.js Oyun Entegrasyonu

## 📋 Genel Bakış

Coin Blaster, Three.js tabanlı bir 3D atış oyunudur. Oyuncular 30 saniye içinde tünelde beliren kutulara ateş ederek GençCoin kazanırlar.

## 🏗️ Mimari

### Dosya Yapısı

```
├── blaster/
│   ├── game.js           # Three.js oyun mantığı (initGame fonksiyonu)
│   ├── game.d.ts         # TypeScript tip tanımlamaları
│   ├── spline.js         # Tünel geometri yolu
│   ├── getStarfield.js   # Yıldız alanı oluşturma
│   └── circle.png        # Texture dosyası
│
└── figma/components/games/
    └── CoinBlaster.tsx   # React wrapper komponenti
```

## 🚀 Kullanım

### 1. Temel Kullanım

```tsx
import { CoinBlaster } from './components/games/CoinBlaster';

function GameScreen() {
  return (
    <div>
      <CoinBlaster />
    </div>
  );
}
```

### 2. GameCenterScreen İçinde (Mevcut Entegrasyon)

```tsx
// GameCenterScreen.tsx içinde zaten entegre edilmiş durumda
<div className="px-4 lg:px-0">
  <CoinBlaster />
</div>
```

## 🎯 Özellikler

### State Yönetimi

- **isPlaying**: Oyunun aktif olup olmadığını kontrol eder
- **isLoading**: Oyun yüklenirken gösterilen loading durumu
- **score**: Mevcut skor (her vurulmuş kutu)
- **gameResult**: Oyun bitince gelen sonuç objesi

### Callback Entegrasyonu

Oyun bittiğinde `window.onGameOver` callback'i çağrılır ve şu bilgileri döndürür:

```typescript
interface GameResult {
  gencCoins: number;      // Vurulan kutu sayısı
  totalCoins: number;     // Kazanılan toplam coin (gencCoins * coinValue)
  timeLimit: number;      // Oyun süresi (30 saniye)
}
```

### Coin Sistemi Entegrasyonu

Oyun bittiğinde kazanılan coinler otomatik olarak `CoinContext` üzerinden kullanıcının bakiyesine eklenir:

```typescript
addCoins(result.gencCoins);
toast.success(`🎉 ${result.totalCoins} GençCoin kazandınız!`);
```

## 🔧 Teknik Detaylar

### Lifecycle

1. **Başlangıç**: Kullanıcı "OYNA" butonuna basar
2. **Yükleme**: `game.js` dynamic import ile yüklenir
3. **Başlatma**: `initGame(containerElement)` çağrılır
4. **Oyun**: 30 saniye boyunca kutulara ateş edilir
5. **Bitiş**: Süre dolunca veya tüm kutular vurulunca oyun biter
6. **Cleanup**: Component unmount olduğunda veya yeni oyun başladığında cleanup çağrılır

### Cleanup Mekanizması

`initGame` fonksiyonu bir cleanup fonksiyonu döndürür ve şunları temizler:

- ✅ Animation frame loop'u durdurur
- ✅ Event listener'ları kaldırır
- ✅ Three.js geometrilerini dispose eder
- ✅ Materyalleri dispose eder
- ✅ Renderer'ı dispose eder
- ✅ Canvas'ı DOM'dan kaldırır
- ✅ UI elementlerini kaldırır

### Memory Management

Memory leak'leri önlemek için:

```typescript
useEffect(() => {
  return () => {
    if (cleanupRef.current) {
      cleanupRef.current();
      cleanupRef.current = null;
      window.onGameOver = null;
    }
  };
}, []);
```

## 🎨 UI/UX Özellikleri

### Conditional Rendering

- **Start Screen**: Oyun başlamadan önce gösterilen tanıtım ekranı
- **Game Canvas**: Oyun aktif olduğunda görünen Three.js canvas
- **Game Over Screen**: Oyun bitince gösterilen sonuç ekranı (game.js içinde)

### Animasyonlar

- ✨ Framer Motion ile smooth geçişler
- 🎭 Scale ve fade animasyonları
- 🎨 Gradient button hover efektleri
- 🔄 Loading spinner animasyonu

### Responsive Tasarım

```css
height: 500px;  /* Sabit yükseklik */
width: 100%;    /* Full genişlik */
```

## 🎮 Oyun Mekaniği

### Kontroller

- **🖱️ Mouse/Trackpad**: Nişangahı hareket ettirme
- **👆 Touch**: Mobil cihazlarda dokunmatik kontrol
- **🔫 Click/Tap**: Ateş etme

### Kurallar

- ⏱️ **Süre**: 30 saniye
- 🎯 **Hedefler**: 55 kutu
- 💰 **Ödül**: Her kutu = 1 GençCoin
- ⚠️ **Limit**: Günde 1 kez oynanabilir

## 🐛 Troubleshooting

### Oyun başlamıyor

1. Konsolu kontrol edin
2. `blaster/game.js` dosyasının varlığını kontrol edin
3. Three.js bağımlılıklarının yüklü olduğundan emin olun

### Memory leak oluşuyor

- Component unmount olduğunda cleanup'ın çağrıldığından emin olun
- `cleanupRef.current` null değilse cleanup çağrılmalı

### TypeScript hataları

- `game.d.ts` dosyasının mevcut olduğundan emin olun
- `tsconfig.json` içinde `allowJs: true` olmalı

## 📦 Bağımlılıklar

```json
{
  "dependencies": {
    "three": "^0.160.0",
    "motion": "^10.x",
    "lucide-react": "^0.x",
    "sonner": "^1.x"
  }
}
```

## 🔮 Gelecek Geliştirmeler

- [ ] Highscore sistemi
- [ ] Farklı zorluk seviyeleri
- [ ] Power-up'lar
- [ ] Multiplayer desteği
- [ ] Leaderboard entegrasyonu
- [ ] Daha fazla oyun modu

## 📝 Notlar

- Oyun **günde 1 kez** oynanabilir (backend entegrasyonu sonrası aktif olacak)
- Game Over ekranı şu anda hem `game.js` içinde hem de React'ta gösteriliyor
- UI elementleri (timer, score) `game.js` tarafından DOM'a ekleniyor
- React component sadece wrapper görevi görüyor ve lifecycle yönetiyor

## 👨‍💻 Geliştirici Notları

### Debug Mode

```typescript
// CoinBlaster.tsx içinde
console.log('🎮 Oyun bitti!', result);
console.log('✅ CoinBlaster başlatıldı');
console.log('🧹 CoinBlaster temizleniyor...');
```

### Callback Test

```typescript
window.onGameOver = (result) => {
  console.log('Test:', result);
};
```

---

**Geliştirici**: AI Assistant  
**Son Güncelleme**: 30 Kasım 2025  
**Versiyon**: 1.0.0

