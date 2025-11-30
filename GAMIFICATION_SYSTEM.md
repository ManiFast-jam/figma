# Oyunlaştırma Sistemi - Kullanım Kılavuzu

## 📋 Genel Bakış

Bu sistem, kullanıcı eylemlerine göre coin ödüllendirme ve rol bazlı çarpan sistemi sağlar.

## 🎯 Temel Özellikler

1. **Coin Sistemi Sıfırlandı**: Tüm kullanıcılar 0 coin ile başlar
2. **Rol Bazlı Çarpan**: Her rol için farklı çarpanlar uygulanır
3. **Eylem Bazlı Ödüller**: Her eylem için farklı coin miktarları
4. **Negatif Coin**: Yararsız oy için negatif coin (caydırıcılık)

## 🎮 Rol Sistemi

| Rol | Coin Aralığı | Çarpan |
|-----|--------------|--------|
| Yeni Gelen | 0 - 499 | 1.0x |
| Seyyah | 500 - 2,499 | 1.2x |
| Gezgin | 2,500 - 9,999 | 1.5x |
| Kaşif Meraklısı | 10,000 - 49,999 | 2.0x |
| Konya Bilgesi | 50,000+ | 2.5x |

## 💰 Coin Kazanma Matrisi

### İçerik Üretme

| Eylem | Temel Puan | Rol Gereksinimi | Açıklama |
|-------|------------|-----------------|----------|
| Yeni Başlık Açma | +20 | Gezgin+ | Wiki'de yeni başlık açma |
| Bilgi Alanı Düzenleme | +10 | - | Wiki entry düzenleme (onaylandığında) |
| Yorum Yazma | +2 | - | Herhangi bir yorum yazma |

### Etkileşim Alma

| Eylem | Temel Puan | Açıklama |
|-------|------------|----------|
| Yararlı Oy | +5 | Wiki düzenlemesinin yararlı oy alması |
| Yararsız Oy | -10 | Wiki düzenlemesinin yararsız oy alması (negatif) |
| Yorum Beğenisi | +1 | Yorumun beğenilmesi |

### Sosyal Sorumluluk

| Eylem | Temel Puan | Açıklama |
|-------|------------|----------|
| Genç Kültür Kart Projesi | +100 | KBB API'den çekilen S.S. projesi |

### Oyunlar

| Eylem | Temel Puan | Açıklama |
|-------|------------|----------|
| Günün Anketi | +10 | Anket tamamlama |
| Vize/Final Kahramanı | +150 | Not yükleme |
| Kampüs Muhabiri | +75 | Rapor yayınlama |
| Hazine Avı | +50 | Görev tamamlama |

## 🔧 Kullanım

### CoinContext Kullanımı

```typescript
import { useCoins } from '../../contexts/CoinContext';
import { CoinActionType } from '../../services/CoinRewardService';

const { rewardAction, coins, getUserRole, getRoleMultiplier } = useCoins();

// Eylem gerçekleştirme
const result = rewardAction(CoinActionType.GAME_SURVEY_COMPLETE);

if (result.success) {
  console.log(`+${result.reward} coin kazandınız!`);
  console.log(`Rol: ${getUserRole()}, Çarpan: ${getRoleMultiplier()}x`);
} else {
  console.error(result.reason); // Rol gereksinimi hatası vb.
}
```

### Örnek: Yorum Yazma

```typescript
const handleCommentSubmit = () => {
  const result = rewardAction(CoinActionType.CREATE_COMMENT);
  if (result.success) {
    toast.success(`+${result.reward} GençCoin kazandınız!`);
  }
  // Yorumu kaydet...
};
```

### Örnek: Wiki Düzenleme

```typescript
const handleWikiEdit = () => {
  const result = rewardAction(CoinActionType.EDIT_WIKI_ENTRY);
  if (result.success) {
    toast.success(`+${result.reward} GençCoin kazandınız! (${getUserRole()} - ${getRoleMultiplier()}x çarpan)`);
  }
  // Wiki'yi kaydet...
};
```

### Örnek: Yeni Başlık Açma (Rol Kontrolü)

```typescript
const handleCreateWikiTopic = () => {
  const result = rewardAction(CoinActionType.CREATE_WIKI_TOPIC);
  
  if (!result.success) {
    toast.error(result.reason); // "Gezgin rolü gereklidir. Şu anki rolünüz: Seyyah"
    return;
  }
  
  toast.success(`+${result.reward} GençCoin kazandınız!`);
  // Başlığı oluştur...
};
```

## 📝 Entegrasyon Gereken Yerler

### ✅ Tamamlanan
- [x] Oyun ekranları (GameCenter, ExamHero, CampusReporter, TreasureHunt)
- [x] CoinContext güncellemesi
- [x] CoinRewardService oluşturuldu
- [x] Rol sistemi entegrasyonu

### 🔄 Yapılacaklar
- [ ] Wiki entry oluşturma/düzenleme entegrasyonu
- [ ] Yorum yazma entegrasyonu
- [ ] Beğeni sistemi entegrasyonu
- [ ] Yararlı/Yararsız oy sistemi entegrasyonu
- [ ] Genç Kültür Kart API entegrasyonu

## 🎨 UI/UX Önerileri

1. **Coin Kazanma Bildirimi**: Her coin kazanımında toast mesajı göster
2. **Rol Terfi Bildirimi**: Rol değiştiğinde özel bir modal göster
3. **Progress Bar**: Rol ilerlemesini görselleştir
4. **Çarpan Gösterimi**: Coin kazanımında çarpan bilgisini göster

## 🔐 Güvenlik Notları

1. **Spam Kontrolü**: Yorum yazma için rate limiting eklenmeli
2. **Onay Sistemi**: Wiki düzenlemeleri onaylandıktan sonra coin verilmeli
3. **Negatif Bakiye**: Yararsız oy için negatif coin uygulanabilir (caydırıcılık)

## 📊 İstatistikler

- Toplam coin sayısı: `coins`
- Mevcut rol: `getUserRole()`
- Rol çarpanı: `getRoleMultiplier()`
- Bir sonraki rol için gereken coin: Rol limitlerine bakın

