# Figma Make Projesi

Bu proje, Figma Make'ten aktarılan kod yapısını içerir.

## Kurulum

1. Bağımlılıkları yükleyin:
```bash
npm install
```

veya

```bash
yarn install
```

## Çalıştırma

### Geliştirme Modu

```bash
npm run dev
```

veya

```bash
yarn dev
```

Proje `http://localhost:3000` adresinde çalışacaktır.

### Production Build

```bash
npm run build
npm run start
```

## Proje Yapısı

- `components/` - React bileşenleri
  - `social/` - Sosyal medya bileşenleri
  - `auth/` - Kimlik doğrulama bileşenleri
  - `feed/` - Feed bileşenleri
  - `figma/` - Figma özel bileşenleri
  - `fintech/` - Finans teknolojisi bileşenleri
  - `layout/` - Layout bileşenleri
  - `overlays/` - Overlay bileşenleri
  - `profile/` - Profil bileşenleri
  - `screens/` - Ekran bileşenleri
  - `search/` - Arama bileşenleri
  - `sidebar/` - Sidebar bileşenleri
  - `ui/` - UI bileşenleri
  - `wallet/` - Cüzdan bileşenleri
  - `wiki/` - Wiki bileşenleri
- `contexts/` - React context'leri
- `data/` - Mock data ve veri dosyaları
- `pages/` - Next.js sayfaları
- `styles/` - CSS ve stil dosyaları
- `guidelines/` - Tasarım kılavuzları
- `public/images/` - Görseller

## Not

Figma Make dosyalarının içeriğine doğrudan erişim sınırlı olduğu için, dosyaların içeriği manuel olarak eklenmelidir.
