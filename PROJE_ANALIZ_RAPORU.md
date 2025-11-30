# 📊 Konya Genç WikiSözlük - Detaylı Proje Analiz Raporu

## 1. PROJE GENEL BAKIŞ

### 1.1 Proje Tanımı
**Proje Adı:** Konya Genç WikiSözlük  
**Vizyon:** Konya'da yaşayan üniversite öğrencilerinin kolektif aklıyla büyüyen, yaşayan, üreten ve sürekli güncel kalan bir "bilgi evreni" oluşturmak.

**Temel Konsept:**
- Wikipedia'nın yapılandırılmış bilgi modeli + Ekşi Sözlük'ün dinamik tartışma kültürü
- Oyunlaştırılmış "GençCoin" sistemi
- Konya Genç Kültür Kart puan sistemi entegrasyonu

### 1.2 Hedef Kitle
- Konya'daki tüm üniversite öğrencileri (Selçuk, NEÜ, KTO Karatay, vb.)
- Öğrenci dostu içerik: ders notları, ev/yurt rehberleri, mekan önerileri, burslar, stajlar

---

## 2. TEKNOLOJİ STACK VE BAĞIMLILIKLAR

### 2.1 Ana Framework ve Kütüphaneler
```
Next.js: 14.0.0 (SSR/SSG desteği)
React: 18.2.0
TypeScript: 5.0.0
Tailwind CSS: 3.3.0
```

### 2.2 UI Kütüphaneleri
- **Radix UI:** 38+ component (accordion, dialog, dropdown-menu, tabs, vb.)
- **Framer Motion:** Animasyonlar (motion/react import'u var ama framer-motion kullanılıyor)
- **Lucide React:** Icon kütüphanesi (300+ icon)
- **Sonner:** Toast bildirimleri
- **React Slick:** Carousel/slider bileşenleri

### 2.3 Yardımcı Kütüphaneler
- `class-variance-authority`: Component varyant yönetimi
- `clsx` + `tailwind-merge`: Class name birleştirme
- `input-otp`: OTP input component'i
- `react-resizable-panels`: Resizable panel yönetimi
- `next-themes`: Tema yönetimi (kullanılmıyor, custom ThemeContext var)

### 2.4 Toplam Bağımlılık Sayısı
- **Dependencies:** 25 paket
- **DevDependencies:** 7 paket
- **Toplam:** 32 npm paketi

---

## 3. PROJE YAPISI VE MİMARİ

### 3.1 Dizin Yapısı
```
figma/
├── components/          # 14 alt klasör, 100+ component
│   ├── auth/           # Kimlik doğrulama (1 component)
│   ├── feed/           # Feed bileşenleri (3 component)
│   ├── figma/          # Figma özel bileşenler (1 component)
│   ├── fintech/        # Finans bileşenleri (4 component)
│   ├── layout/         # Layout bileşenleri (5 component)
│   ├── overlays/       # Overlay bileşenleri (1 component)
│   ├── profile/        # Profil bileşenleri (4 component)
│   ├── screens/        # Ekran bileşenleri (15 component)
│   ├── search/         # Arama bileşenleri (1 component)
│   ├── sidebar/        # Sidebar bileşenleri (4 component)
│   ├── social/         # Sosyal medya bileşenleri (8 component)
│   ├── ui/            # UI bileşenleri (50+ component)
│   ├── wallet/         # Cüzdan bileşenleri (1 component)
│   └── wiki/           # Wiki bileşenleri (3 component)
├── contexts/           # React Context'ler (1 context)
├── data/              # Mock data (1 dosya)
├── pages/             # Next.js sayfaları
│   ├── _app.tsx       # Custom App component
│   └── index.tsx      # Ana sayfa
├── styles/            # CSS dosyaları
│   └── globals.css    # Global stiller (323 satır)
├── public/            # Statik dosyalar
│   └── images/        # Görseller (boş)
└── guidelines/        # Tasarım kılavuzları
```

### 3.2 Component İstatistikleri
- **Toplam Component:** 100+ React component
- **Export Edilen Component:** 54 dosya
- **UI Component Kütüphanesi:** 50+ shadcn/ui benzeri component
- **Screen Component:** 15 ana ekran
- **Layout Component:** 5 layout bileşeni

### 3.3 Mimari Desenler
1. **Component-Based Architecture:** Modüler, yeniden kullanılabilir component'ler
2. **Context API:** Theme yönetimi için custom context
3. **Props Drilling:** Bazı yerlerde state prop'ları ile iletilmiş
4. **Modal/Overlay Pattern:** Modal ve overlay'ler için merkezi yönetim

---

## 4. ÖZELLİKLER VE FONKSİYONELLİK

### 4.1 Ana Özellikler

#### 4.1.1 Navigasyon Sistemi
- **Bottom Navigation:** 5 ana sekme (Home, Discover, FAB, Notifications, Profile)
- **Tab-Based Navigation:** Ana ekranlar arası geçiş
- **Stack Navigation:** Post detayları için stack yapısı
- **Modal Navigation:** Login, Game Center, Create Post modalları

#### 4.1.2 Ekranlar (Screens)
1. **DiscoverScreen:** Keşfet ekranı (duyurular, mekanlar, etkinlikler, oyunlar)
2. **FeedScreen:** Ana feed (Wiki girişleri, postlar, trend konular)
3. **ProfileScreen:** Kullanıcı profili (coin, rozetler, ayarlar)
4. **NotificationsScreen:** Bildirimler
5. **HomeScreen:** Ana sayfa
6. **PostDetailScreen:** Post detay sayfası
7. **WikiDetailScreen:** Wiki detay sayfası
8. **AnnouncementDetailScreen:** Duyuru detay sayfası
9. **TopicDetailScreen:** Konu detay sayfası
10. **BadgesScreen:** Rozetler ekranı
11. **ExamHeroScreen:** Sınav notu yükleme oyunu
12. **CampusReporterScreen:** Kampüs muhabiri oyunu
13. **TreasureHuntScreen:** Hazine avı oyunu
14. **DailyPollScreen:** Günlük anket
15. **WheelOfFortuneScreen:** Şans çarkı oyunu

#### 4.1.3 Oyunlaştırma Sistemi
- **GençCoin Sistemi:** Kullanıcı katkılarına göre coin kazanma
- **Rol Sistemi:** 5 seviye (Yeni Gelen → Seyyah → Gezgin → Kaşif Meraklısı → Konya Bilgesi)
- **Rozet Sistemi:** Başarımlara göre rozet kazanma
- **Puan Silsilesi:** Bir sonraki role ilerleme çubuğu
- **Çarpan Sistemi:** Yüksek roller daha fazla coin kazanır

#### 4.1.4 İçerik Yönetimi
- **Wiki + Sözlük Hibrit Modeli:**
  - **Bilgi Alanı (Wiki):** Objektif, düzenlenebilir bilgiler
  - **Yorum Alanı (Sözlük):** Subjektif deneyimler, yorumlar
- **Sürüm Geçmişi:** Wiki düzenlemeleri için version history
- **Oylama Sistemi:** Yararlı/Yararsız, Beğen/Beğenme

#### 4.1.5 Oyun Merkezi
- **Game Center Overlay:** Tüm oyunlara erişim
- **5 Oyun Türü:**
  1. Exam Hero (Sınav notu yükleme)
  2. Campus Reporter (Kampüs muhabiri)
  3. Treasure Hunt (Hazine avı)
  4. Daily Poll (Günlük anket)
  5. Wheel of Fortune (Şans çarkı)

### 4.2 Kullanıcı Akışları

#### 4.2.1 Yeni Kullanıcı Akışı
1. Discover ekranında başlar (login gerekmez)
2. İçerikleri keşfeder
3. Login olmak ister → LoginScreen
4. Kayıt olur (Genç Kültür Kart ID veya .edu.tr email)
5. İlk coin'lerini kazanır
6. Yorum yazar, içerik üretir
7. Coin biriktirir, rol atlar

#### 4.2.2 İçerik Üretim Akışı
1. Feed veya Discover'da "Yeni Başlık" butonu
2. Wiki oluşturma modal'ı açılır
3. Bilgi alanı doldurulur (adres, saatler, açıklama, vb.)
4. Yayınlanır → Coin kazanır
5. Topluluk oylar → Daha fazla coin

#### 4.2.3 Oyun Akışı
1. FAB butonuna tıklar → Game Center açılır
2. Oyun seçer (örn: Exam Hero)
3. Oyun ekranına gider
4. Oyunu oynar, coin kazanır
5. Geri döner, coin'leri görür

---

## 5. TASARIM SİSTEMİ

### 5.1 Renk Paleti
```css
Primary: #5852c4 (Vibrant Violet)
Background: #f2f3f7 (Cool Light Gray)
Card: #ededff (Whitish Lavender)
Foreground: #8279a5 (Muted Purple-Gray)
Heading: #19142e (Deep Dark Violet)
Dark Background: #01000b (Midnight Black)
```

### 5.2 Tema Sistemi
- **Light Mode:** Varsayılan tema
- **Dark Mode:** Toggle ile geçiş
- **ThemeContext:** Custom context ile yönetim
- **localStorage:** Tema tercihi saklanır

### 5.3 Tipografi
- **Font Size:** 16px base
- **Font Weight:** 400 (normal), 600 (medium)
- **Headings:** Deep Dark Violet (#19142e)

### 5.4 Spacing ve Layout
- **Border Radius:** 0.75rem (12px) - Modern crisp corners
- **Mobile-First:** Responsive tasarım
- **Breakpoints:** lg: (desktop) için özel stiller

### 5.5 UI Component Kütüphanesi
50+ shadcn/ui benzeri component:
- Form elements (Input, Textarea, Select, Checkbox, Radio)
- Navigation (Tabs, Breadcrumb, Pagination)
- Feedback (Alert, Toast, Dialog, Sheet)
- Data Display (Table, Card, Avatar, Badge)
- Overlay (Popover, Tooltip, Hover Card)

---

## 6. STATE MANAGEMENT

### 6.1 Mevcut Durum
- **React useState:** Local component state
- **React Context:** Theme yönetimi (ThemeContext)
- **Props Drilling:** Bazı state'ler prop'lar ile iletilmiş
- **localStorage:** Tema tercihi saklama

### 6.2 State Yönetim Desenleri

#### 6.2.1 AppContent Component (Ana State)
```typescript
- isAuthenticated: boolean
- activeTab: string
- isCreatePostOpen: boolean
- isGameCenterOpen: boolean
- activeGame: string | null
- showLoginModal: boolean
- postStack: PostStackItem[]
- selectedAnnouncement: any
- showTopicDetail: boolean
- selectedWikiEntry: any
```

#### 6.2.2 ThemeContext
```typescript
- isDarkMode: boolean
- toggleDarkMode: () => void
```

### 6.3 Eksikler
- **Global State Management:** Redux/Zustand/Jotai yok
- **API State:** Backend entegrasyonu yok (mock data kullanılıyor)
- **Cache Management:** React Query/SWR yok
- **Form State:** React Hook Form yok (manuel state yönetimi)

---

## 7. VERİ YÖNETİMİ

### 7.1 Mock Data
- **mockComments.ts:** 326 satır, yorum verileri
- **Hardcoded Data:** Component'lerde sabit veriler
- **No API Integration:** Backend bağlantısı yok

### 7.2 Veri Yapıları
- **Post/Comment:** Nested comment yapısı
- **Wiki Entry:** Structured data (fields, metadata)
- **User Profile:** Coin, role, badges
- **Game Data:** Oyun durumları

---

## 8. SORUNLAR VE EKSİKLER

### 8.1 Kritik Sorunlar

#### 8.1.1 Import Hataları
- ✅ **Çözüldü:** `motion/react` → `framer-motion`
- ✅ **Çözüldü:** `sonner@2.0.3` → `sonner`
- ✅ **Çözüldü:** `figma:asset/` → `/images/` path'leri
- ✅ **Çözüldü:** Version numaralı import'lar temizlendi
- ✅ **Çözüldü:** `ImageWithFallback` component'i oluşturuldu

#### 8.1.2 SSR Sorunları
- ✅ **Çözüldü:** `localStorage` SSR hatası düzeltildi (typeof window kontrolü)

#### 8.1.3 Eksik Dosyalar
- ⚠️ **Görseller:** `public/images/` klasörü boş
- ⚠️ **Placeholder:** ImageWithFallback için fallback görseli yok

### 8.2 Orta Öncelikli Sorunlar

#### 8.2.1 Kod Kalitesi
- **Type Safety:** Bazı yerlerde `any` type kullanılıyor
- **Error Handling:** Try-catch blokları eksik
- **Loading States:** Loading indicator'lar eksik
- **Error Boundaries:** React Error Boundary yok

#### 8.2.2 Performans
- **Code Splitting:** Dynamic import'lar yok
- **Image Optimization:** Next.js Image component kullanılmıyor (ImageWithFallback'te)
- **Bundle Size:** Tüm component'ler aynı bundle'da

#### 8.2.3 Eksik Özellikler
- **Backend Integration:** API entegrasyonu yok
- **Authentication:** Gerçek auth sistemi yok
- **Database:** Veri saklama yok
- **Real-time Updates:** WebSocket/SSE yok

### 8.3 Düşük Öncelikli İyileştirmeler
- **Accessibility:** ARIA labels eksik
- **SEO:** Meta tags eksik
- **Analytics:** Tracking yok
- **Testing:** Test dosyaları yok

---

## 9. İYİLEŞTİRME ÖNERİLERİ

### 9.1 Mimari İyileştirmeler

#### 9.1.1 State Management
```typescript
// Öneri: Zustand veya Jotai kullanımı
import { create } from 'zustand';

interface AppState {
  user: User | null;
  coins: number;
  activeTab: string;
  setUser: (user: User) => void;
  addCoins: (amount: number) => void;
}
```

#### 9.1.2 API Layer
```typescript
// Öneri: React Query ile API yönetimi
import { useQuery, useMutation } from '@tanstack/react-query';

const useWikiEntries = () => {
  return useQuery({
    queryKey: ['wiki-entries'],
    queryFn: fetchWikiEntries,
  });
};
```

#### 9.1.3 Type Safety
```typescript
// Öneri: Strict type definitions
interface WikiEntry {
  id: string;
  title: string;
  category: WikiCategory;
  data: WikiData;
  metadata: WikiMetadata;
}
```

### 9.2 Performans İyileştirmeleri

#### 9.2.1 Code Splitting
```typescript
// Öneri: Dynamic imports
const ExamHeroScreen = dynamic(() => import('./screens/ExamHeroScreen'), {
  loading: () => <LoadingSpinner />,
});
```

#### 9.2.2 Image Optimization
```typescript
// Öneri: Next.js Image component kullanımı
import Image from 'next/image';

<Image
  src={imageSrc}
  alt={alt}
  width={400}
  height={300}
  loading="lazy"
/>
```

#### 9.2.3 Memoization
```typescript
// Öneri: React.memo ve useMemo kullanımı
const ExpensiveComponent = React.memo(({ data }) => {
  const processedData = useMemo(() => processData(data), [data]);
  return <div>{processedData}</div>;
});
```

### 9.3 Kullanıcı Deneyimi İyileştirmeleri

#### 9.3.1 Loading States
- Skeleton loaders eklenmeli
- Progressive loading
- Optimistic updates

#### 9.3.2 Error Handling
- Error boundaries
- User-friendly error messages
- Retry mechanisms

#### 9.3.3 Accessibility
- ARIA labels
- Keyboard navigation
- Screen reader support
- Focus management

### 9.4 Güvenlik İyileştirmeleri

#### 9.4.1 Authentication
- JWT token yönetimi
- Refresh token rotation
- Secure cookie storage

#### 9.4.2 Input Validation
- Form validation (React Hook Form + Zod)
- XSS protection
- CSRF protection

#### 9.4.3 API Security
- Rate limiting
- Input sanitization
- SQL injection prevention

---

## 10. PROJE METRİKLERİ

### 10.1 Kod İstatistikleri
- **Toplam Dosya:** 100+ TypeScript/TSX dosyası
- **Toplam Satır:** ~15,000+ satır kod (tahmini)
- **Component Sayısı:** 100+ React component
- **UI Component:** 50+ shadcn/ui component
- **Screen Component:** 15 ana ekran

### 10.2 Bağımlılık Analizi
- **Production Dependencies:** 25 paket
- **Development Dependencies:** 7 paket
- **Bundle Size:** Analiz edilmeli (webpack-bundle-analyzer)

### 10.3 Test Coverage
- **Test Dosyası:** Yok
- **Test Coverage:** %0
- **E2E Tests:** Yok

---

## 11. SONUÇ VE ÖNERİLER

### 11.1 Güçlü Yönler
✅ **Kapsamlı Component Kütüphanesi:** 100+ component, modüler yapı  
✅ **Modern Tech Stack:** Next.js 14, React 18, TypeScript  
✅ **İyi Tasarım Sistemi:** Tutarlı renk paleti, tema sistemi  
✅ **Oyunlaştırma:** Detaylı coin ve rol sistemi  
✅ **Responsive Design:** Mobile-first yaklaşım  

### 11.2 Zayıf Yönler
❌ **Backend Integration:** API entegrasyonu yok  
❌ **State Management:** Global state yönetimi eksik  
❌ **Type Safety:** Bazı yerlerde `any` kullanımı  
❌ **Testing:** Test coverage yok  
❌ **Performance:** Code splitting ve optimizasyon eksik  

### 11.3 Öncelikli Aksiyonlar

#### Kısa Vadeli (1-2 Hafta)
1. ✅ Import hatalarını düzelt (TAMAMLANDI)
2. ⚠️ Görselleri ekle (`public/images/`)
3. ⚠️ Type safety iyileştir (`any` → proper types)
4. ⚠️ Error handling ekle

#### Orta Vadeli (1 Ay)
1. ⚠️ Backend API entegrasyonu
2. ⚠️ State management (Zustand/Jotai)
3. ⚠️ Form validation (React Hook Form + Zod)
4. ⚠️ Loading states ve error boundaries

#### Uzun Vadeli (3+ Ay)
1. ⚠️ Test coverage (%80+)
2. ⚠️ Performance optimization
3. ⚠️ Accessibility (WCAG 2.1 AA)
4. ⚠️ SEO optimization
5. ⚠️ Analytics integration

---

## 12. EK BİLGİLER

### 12.1 Proje Durumu
- **Geliştirme Aşaması:** MVP/Prototype
- **Production Ready:** Hayır (backend eksik)
- **Demo Ready:** Evet (mock data ile)

### 12.2 Teknik Borç
- **Yüksek:** Backend entegrasyonu eksik
- **Orta:** State management iyileştirmesi gerekli
- **Düşük:** Type safety ve test coverage

### 12.3 Dokümantasyon
- **README.md:** Temel kurulum bilgileri
- **Guidelines.md:** Tasarım kılavuzu (boş)
- **API Documentation:** Yok
- **Component Documentation:** Yok

---

**Rapor Tarihi:** 2024  
**Analiz Eden:** AI Assistant  
**Proje Versiyonu:** 1.0.0

