import React, { useState } from 'react';
import { ChevronRight, ThumbsUp, MessageCircle, Share2, Flame, MoreHorizontal, Filter, Award, GraduationCap, Utensils, Home, Ticket, Star, TrendingUp, Feather, FileText, MapPin, User, DollarSign, BookOpen, Paperclip, Coffee, Clock as ClockIcon, Briefcase, ShoppingBag } from 'lucide-react';
import { TopicDetailSheet } from '../social/TopicDetailSheet';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { WalletModal } from '../wallet/WalletModal';
import { GlobalHeader } from '../layout/GlobalHeader';
import { PageLayout } from '../layout/PageLayout';
import { CreatePostModal } from '../social/CreatePostModal';
import { useTheme } from '../../contexts/ThemeContext';
import { PostCard } from '../social/PostCard';
import { WikiEntryCard, WikiEmptyCard } from '../wiki/WikiEntryCard';
import { CreateWikiModal } from '../wiki/CreateWikiModal';
import { WikiHistoryModal } from '../wiki/WikiHistoryModal';
import { canCreateWiki, getUserLevelName } from '../../utils/userLevel';
import { toast } from 'sonner';

const FILTERS = ['Tümü', 'Akademik', 'Yeme-İçme', 'Barınma', 'Sosyal', 'İkinci El'];

// Wiki entries - CreateWikiModal kategori field'larına uygun olarak yeniden oluşturuldu
const WIKI_ENTRIES = [
  // TOPLULUK ONAYLI (topluluk-onayli): Adres, Saatler, Menü/Link, Açıklama
  {
    id: 'wiki-1',
    title: 'Selçuk Üniversitesi Yemekhane',
    category: 'Topluluk Onaylı' as const,
    categoryId: 'topluluk-onayli',
    data: {
      type: 'venue' as const,
      fields: [
        { icon: MapPin, label: 'Adres', value: 'Alaeddin Keykubat Kampüsü, Zemin Kat', editable: true, key: 'address' },
        { icon: ClockIcon, label: 'Saatler', value: '11:30 - 14:00 | 17:00 - 19:30', editable: true, key: 'hours' },
        { icon: Paperclip, label: 'Menü/Link', value: 'selcuk.edu.tr/yemekhane-menu', editable: true, key: 'menu' },
        { icon: Coffee, label: 'Açıklama', value: "Selçuk Üniversitesi Alaeddin Keykubat Kampüsü'nde bulunan merkezi yemekhane. Öğle ve akşam saatlerinde çorba, ana yemek, pilav ve tatlı ikramı yapılmaktadır. Öğrenci kartı ile ödeme kabul edilir.", editable: true, key: 'description' },
      ]
    },
    lastEditedBy: 'Fatih K.',
    lastEditedAt: '2 gün önce',
    version: 24,
    upvotes: 124,
    downvotes: 8,
    isOwnEntry: false
  },
  {
    id: 'wiki-2',
    title: 'Zafer Kütüphanesi',
    category: 'Topluluk Onaylı' as const,
    categoryId: 'topluluk-onayli',
    data: {
      type: 'venue' as const,
      fields: [
        { icon: MapPin, label: 'Adres', value: 'Bosna Hersek Mah., Yeni Sanayi Cad. No:12', editable: true, key: 'address' },
        { icon: ClockIcon, label: 'Saatler', value: '09:00 - 23:00 (Haftanın 7 günü açık)', editable: true, key: 'hours' },
        { icon: Paperclip, label: 'Menü/Link', value: 'zaferkutuphanesi.gov.tr', editable: true, key: 'menu' },
        { icon: Coffee, label: 'Açıklama', value: 'Modern kütüphane. Wifi, çalışma odaları, kafe ve sessiz okuma salonları mevcut. Öğrenci kartı ile ücretsiz erişim sağlanır. Rezervasyon yapılabilir.', editable: true, key: 'description' },
      ]
    },
    lastEditedBy: 'Ayşe B.',
    lastEditedAt: '5 saat önce',
    version: 8,
    upvotes: 89,
    downvotes: 3,
    isOwnEntry: false
  },
  {
    id: 'wiki-3',
    title: 'Kampüs Spor Salonu',
    category: 'Topluluk Onaylı' as const,
    categoryId: 'topluluk-onayli',
    data: {
      type: 'venue' as const,
      fields: [
        { icon: MapPin, label: 'Adres', value: 'Alaeddin Keykubat Kampüsü, Spor Kompleksi', editable: true, key: 'address' },
        { icon: ClockIcon, label: 'Saatler', value: '06:00 - 22:00 (Hafta içi) | 08:00 - 20:00 (Hafta sonu)', editable: true, key: 'hours' },
        { icon: Paperclip, label: 'Menü/Link', value: 'selcuk.edu.tr/spor-salonu', editable: true, key: 'menu' },
        { icon: Coffee, label: 'Açıklama', value: 'Fitness, basketbol, voleybol ve masa tenisi imkanları bulunan modern spor salonu. Öğrenciler için ücretsiz. Duş ve soyunma odaları mevcuttur.', editable: true, key: 'description' },
      ]
    },
    lastEditedBy: 'Mehmet T.',
    lastEditedAt: '1 gün önce',
    version: 12,
    upvotes: 67,
    downvotes: 2,
    isOwnEntry: false
  },

  // AKADEMİK DESTEK (akademik-destek): Ders, Hoca, Açıklama, Kaynak
  {
    id: 'wiki-4',
    title: 'Makine Müh. Diferansiyel Denklemler',
    category: 'Akademik Destek' as const,
    categoryId: 'akademik-destek',
    data: {
      type: 'academic' as const,
      fields: [
        { icon: FileText, label: 'Ders', value: 'MAT201 - Diferansiyel Denklemler', editable: true, key: 'course' },
        { icon: User, label: 'Hoca', value: 'Prof. Dr. Ahmet Yılmaz', editable: true, key: 'professor' },
        { icon: BookOpen, label: 'Açıklama', value: '2. Sınıf zorunlu dersidir. Vize %40, Final %60 etkiler. Ders notları ve örnek sorular dersin web sayfasında mevcuttur. Haftalık ödevler verilir.', editable: true, key: 'description' },
        { icon: Paperclip, label: 'Kaynak', value: '3 PDF ders notu, 5 çıkmış soru seti, Video ders kayıtları', editable: true, key: 'resources' },
      ]
    },
    lastEditedBy: '@fatih_yilmaz',
    lastEditedAt: '2 saat önce',
    version: 12,
    upvotes: 42,
    downvotes: 1,
    isOwnEntry: true
  },
  {
    id: 'wiki-5',
    title: 'Bilgisayar Müh. Veri Yapıları',
    category: 'Akademik Destek' as const,
    categoryId: 'akademik-destek',
    data: {
      type: 'academic' as const,
      fields: [
        { icon: FileText, label: 'Ders', value: 'BIL201 - Veri Yapıları ve Algoritmalar', editable: true, key: 'course' },
        { icon: User, label: 'Hoca', value: 'Doç. Dr. Zeynep Demir', editable: true, key: 'professor' },
        { icon: BookOpen, label: 'Açıklama', value: '3. Sınıf zorunlu ders. Vize %30, Final %50, Proje %20. C++ ve Python ile uygulamalı ders. Haftalık lab çalışmaları yapılır.', editable: true, key: 'description' },
        { icon: Paperclip, label: 'Kaynak', value: 'Ders kitabı PDF, 10+ örnek kod, Algoritma görselleştirme linkleri', editable: true, key: 'resources' },
      ]
    },
    lastEditedBy: '@can_akademik',
    lastEditedAt: '6 saat önce',
    version: 8,
    upvotes: 78,
    downvotes: 0,
    isOwnEntry: false
  },
  {
    id: 'wiki-6',
    title: 'İktisat - Makroekonomi',
    category: 'Akademik Destek' as const,
    categoryId: 'akademik-destek',
    data: {
      type: 'academic' as const,
      fields: [
        { icon: FileText, label: 'Ders', value: 'IKT202 - Makroekonomi', editable: true, key: 'course' },
        { icon: User, label: 'Hoca', value: 'Prof. Dr. Elif Kaya', editable: true, key: 'professor' },
        { icon: BookOpen, label: 'Açıklama', value: '2. Sınıf zorunlu ders. Vize %40, Final %60. Grafik ve matematiksel modeller üzerinde durulur. Ders notları ve slaytlar sisteme yüklenir.', editable: true, key: 'description' },
        { icon: Paperclip, label: 'Kaynak', value: 'Ders kitabı, Ekonomik veri setleri, Çözümlü örnekler', editable: true, key: 'resources' },
      ]
    },
    lastEditedBy: '@deniz_iktisat',
    lastEditedAt: '1 gün önce',
    version: 5,
    upvotes: 35,
    downvotes: 2,
    isOwnEntry: false
  },

  // BARINMA & YAŞAM (barinma-yasam): Yurt/Ev Sayısı, Ücret Aralığı, Başvuru, Süreç, Açıklama
  {
    id: 'wiki-7',
    title: 'KYK Yurtları - Başvuru Rehberi',
    category: 'Barınma & Yaşam' as const,
    categoryId: 'barinma-yasam',
    data: {
      type: 'housing' as const,
      fields: [
        { icon: Home, label: 'Yurt/Ev Sayısı', value: '12 devlet yurt, 8 özel yurt (Kampüs çevresi)', editable: true, key: 'count' },
        { icon: DollarSign, label: 'Ücret Aralığı', value: 'Devlet: 400-600₺/ay, Özel: 2500-4500₺/ay', editable: true, key: 'priceRange' },
        { icon: FileText, label: 'Başvuru', value: 'e-Devlet üzerinden online başvuru (Ağustos-Eylül ayları)', editable: true, key: 'application' },
        { icon: ClockIcon, label: 'Süreç', value: 'Başvuru → Puanlama → Yerleştirme (2-3 hafta içinde sonuçlanır)', editable: true, key: 'process' },
        { icon: BookOpen, label: 'Açıklama', value: 'KYK yurtları öğrenciler için en uygun barınma seçeneklerinden biridir. Devlet yurtları ekonomik ve güvenli, özel yurtlar ise daha konforlu imkanlar sunar. Başvuru sürecinde e-Devlet üzerinden online başvuru yapılır ve puanlama sistemi ile yerleştirme gerçekleşir.', editable: true, key: 'description' },
      ]
    },
    lastEditedBy: '@zeynep_gezgin',
    lastEditedAt: '3 gün önce',
    version: 15,
    upvotes: 156,
    downvotes: 5,
    isOwnEntry: false
  },
  {
    id: 'wiki-8',
    title: 'Kampüs Çevresi Öğrenci Evleri',
    category: 'Barınma & Yaşam' as const,
    categoryId: 'barinma-yasam',
    data: {
      type: 'housing' as const,
      fields: [
        { icon: Home, label: 'Yurt/Ev Sayısı', value: '200+ öğrenci evi, 50+ paylaşımlı daire (Bosna Hersek, Meram)', editable: true, key: 'count' },
        { icon: DollarSign, label: 'Ücret Aralığı', value: 'Tek kişi: 3000-5000₺, Paylaşımlı: 1500-2500₺/kişi', editable: true, key: 'priceRange' },
        { icon: FileText, label: 'Başvuru', value: 'Sahibinden, Emlak siteleri, Öğrenci Facebook grupları', editable: true, key: 'application' },
        { icon: ClockIcon, label: 'Süreç', value: 'İlan inceleme → Ev görme → Sözleşme imzalama (1-2 hafta)', editable: true, key: 'process' },
        { icon: BookOpen, label: 'Açıklama', value: 'Kampüs çevresinde öğrenciler için çok sayıda ev ve paylaşımlı daire seçeneği bulunmaktadır. Bosna Hersek ve Meram bölgeleri kampüse yakınlığı nedeniyle tercih edilmektedir. Ev arama sürecinde dikkatli olmak ve sözleşmeleri detaylı incelemek önemlidir.', editable: true, key: 'description' },
      ]
    },
    lastEditedBy: '@burak_barinma',
    lastEditedAt: '5 gün önce',
    version: 9,
    upvotes: 98,
    downvotes: 4,
    isOwnEntry: false
  },

  // SOSYAL YAŞAM (sosyal-yasam): Mekan, Saatler, Fiyat, Aktiviteler, Açıklama
  {
    id: 'wiki-9',
    title: 'Bosna Kahvecisi',
    category: 'Sosyal Yaşam' as const,
    categoryId: 'sosyal-yasam',
    data: {
      type: 'venue' as const,
      fields: [
        { icon: MapPin, label: 'Mekan', value: 'Bosna Hersek Mah., Mevlana Cad. No:45', editable: true, key: 'venue' },
        { icon: ClockIcon, label: 'Saatler', value: '08:00 - 01:00 (Haftanın 7 günü)', editable: true, key: 'hours' },
        { icon: DollarSign, label: 'Fiyat', value: 'Ortalama 50-100₺ (Kahve, tost, waffle)', editable: true, key: 'price' },
        { icon: Coffee, label: 'Aktiviteler', value: 'Kahve içme, Ders çalışma, Sohbet, Oyun oynama (Tavla, Okey)', editable: true, key: 'activities' },
        { icon: BookOpen, label: 'Açıklama', value: 'Kampüs çevresindeki en popüler kahvehanelerden biri. Ders çalışmak, arkadaşlarla sohbet etmek veya sadece kahve içmek için ideal bir mekan. Wifi hızlı, ortam sakin ve öğrenci dostu fiyatları var.', editable: true, key: 'description' },
      ]
    },
    lastEditedBy: '@can_seyyah',
    lastEditedAt: '1 gün önce',
    version: 5,
    upvotes: 112,
    downvotes: 2,
    isOwnEntry: false
  },
  {
    id: 'wiki-10',
    title: 'Alaaddin Tepesi',
    category: 'Sosyal Yaşam' as const,
    categoryId: 'sosyal-yasam',
    data: {
      type: 'venue' as const,
      fields: [
        { icon: MapPin, label: 'Mekan', value: 'Alaaddin Tepesi, Meram', editable: true, key: 'venue' },
        { icon: ClockIcon, label: 'Saatler', value: '24 saat açık (Gün batımı için en iyi saat: 18:00-19:00)', editable: true, key: 'hours' },
        { icon: DollarSign, label: 'Fiyat', value: 'Ücretsiz (Çay, simit gibi ikramlar için 20-50₺)', editable: true, key: 'price' },
        { icon: Coffee, label: 'Aktiviteler', value: 'Gün batımı izleme, Fotoğraf çekme, Piknik, Sohbet, Yürüyüş', editable: true, key: 'activities' },
        { icon: BookOpen, label: 'Açıklama', value: 'Konya\'nın en güzel manzara noktalarından biri. Gün batımı izlemek için mükemmel bir yer. Fotoğraf çekmek, piknik yapmak veya sadece manzarayı izlemek için ideal. Ücretsiz erişim ve 24 saat açık.', editable: true, key: 'description' },
      ]
    },
    lastEditedBy: '@selin_sosyal',
    lastEditedAt: '2 gün önce',
    version: 7,
    upvotes: 203,
    downvotes: 1,
    isOwnEntry: false
  },
  {
    id: 'wiki-11',
    title: 'Kampüs Sineması',
    category: 'Sosyal Yaşam' as const,
    categoryId: 'sosyal-yasam',
    data: {
      type: 'venue' as const,
      fields: [
        { icon: MapPin, label: 'Mekan', value: 'Kampüs Kültür Merkezi, Zemin Kat', editable: true, key: 'venue' },
        { icon: ClockIcon, label: 'Saatler', value: 'Hafta içi: 19:00, 21:30 | Hafta sonu: 14:00, 17:00, 20:00', editable: true, key: 'hours' },
        { icon: DollarSign, label: 'Fiyat', value: 'Öğrenci: 25₺, Normal: 50₺', editable: true, key: 'price' },
        { icon: Coffee, label: 'Aktiviteler', value: 'Film izleme, Popcorn ve içecek, Sosyal etkinlikler', editable: true, key: 'activities' },
        { icon: BookOpen, label: 'Açıklama', value: 'Kampüs içindeki modern sinema salonu. Öğrenciler için özel indirimli bilet fiyatları mevcut. Güncel filmler gösterilmektedir. Hafta sonu gösterimleri çok kalabalık olur, erken gitmek önerilir.', editable: true, key: 'description' },
      ]
    },
    lastEditedBy: '@emre_film',
    lastEditedAt: '4 saat önce',
    version: 3,
    upvotes: 45,
    downvotes: 0,
    isOwnEntry: false
  },

  // KARİYER & GELİŞİM (kariyer-gelisim): Platformlar, CV Hazırlık, Networking, Sertifikalar, Açıklama
  {
    id: 'wiki-12',
    title: 'Staj & İş Bulma Rehberi',
    category: 'Kariyer & Gelişim' as const,
    categoryId: 'kariyer-gelisim',
    data: {
      type: 'career' as const,
      fields: [
        { icon: Briefcase, label: 'Platformlar', value: 'LinkedIn, Kariyer.net, İşKur, Sahibinden İş, Glassdoor', editable: true, key: 'platforms' },
        { icon: FileText, label: 'CV Hazırlık', value: '1 sayfa, net ve ölçülebilir başarılar, ATS uyumlu format, Profesyonel fotoğraf', editable: true, key: 'cvTips' },
        { icon: User, label: 'Networking', value: 'Mezun ağı, LinkedIn bağlantıları, Üniversite kariyer fuarları, Sektör etkinlikleri', editable: true, key: 'networking' },
        { icon: BookOpen, label: 'Sertifikalar', value: 'Google Digital Marketing, AWS Cloud Practitioner, Coursera ücretsiz kurslar, Microsoft sertifikaları', editable: true, key: 'certificates' },
        { icon: BookOpen, label: 'Açıklama', value: 'İş ve staj bulma sürecinde doğru platformları kullanmak, profesyonel bir CV hazırlamak ve network oluşturmak çok önemlidir. LinkedIn profilini güncel tutmak, kariyer fuarlarına katılmak ve sektör etkinliklerinde bulunmak iş bulma şansını artırır. Ayrıca online sertifika programlarına katılarak kendini geliştirmek de önemlidir.', editable: true, key: 'description' },
      ]
    },
    lastEditedBy: '@ali_bilge',
    lastEditedAt: '12 saat önce',
    version: 22,
    upvotes: 189,
    downvotes: 3,
    isOwnEntry: false
  },
  {
    id: 'wiki-13',
    title: 'Yazılım Sektörü İş İmkanları',
    category: 'Kariyer & Gelişim' as const,
    categoryId: 'kariyer-gelisim',
    data: {
      type: 'career' as const,
      fields: [
        { icon: Briefcase, label: 'Platformlar', value: 'LinkedIn, GitHub Jobs, Stack Overflow Jobs, AngelList, RemoteOK', editable: true, key: 'platforms' },
        { icon: FileText, label: 'CV Hazırlık', value: 'GitHub profil linki, Proje portföyü, Teknik beceriler listesi, Açık kaynak katkıları', editable: true, key: 'cvTips' },
        { icon: User, label: 'Networking', value: 'Yazılım toplulukları, Hackathon\'lar, Tech meetup\'lar, Online coding platformları', editable: true, key: 'networking' },
        { icon: BookOpen, label: 'Sertifikalar', value: 'AWS, Google Cloud, Microsoft Azure, Kubernetes, Docker, React, Node.js sertifikaları', editable: true, key: 'certificates' },
        { icon: BookOpen, label: 'Açıklama', value: 'Yazılım sektöründe iş bulmak için GitHub profilini aktif tutmak, proje portföyü oluşturmak ve açık kaynak projelere katkıda bulunmak çok önemlidir. Hackathon\'lara katılmak, tech meetup\'larda bulunmak ve online coding platformlarında aktif olmak network oluşturmanıza yardımcı olur. Cloud sertifikaları (AWS, Azure, GCP) ve modern framework bilgisi (React, Node.js) iş bulma şansını artırır.', editable: true, key: 'description' },
      ]
    },
    lastEditedBy: '@dev_kariyer',
    lastEditedAt: '1 gün önce',
    version: 11,
    upvotes: 134,
    downvotes: 1,
    isOwnEntry: false
  },
];

const TRENDING_TOPICS = [
  { id: 1, title: 'Vize Tarihleri Açıklandı', count: '2.4k Okunma' },
  { id: 2, title: 'Kampüs Metro Çalışması', count: '1.8k Okunma' },
  { id: 3, title: 'Yemekhane Zam Oranları', count: '1.2k Okunma' },
  { id: 4, title: 'Kütüphane 7/24 Açık Mı?', count: '900 Okunma' },
];

const getUserRoleStyle = (role: string) => {
  switch (role) {
    case 'Yeni Gelen':
      return 'bg-slate-100 text-slate-600';
    case 'Seyyah':
      return 'bg-orange-100 text-amber-900';
    case 'Gezgin':
      return 'bg-blue-100 text-blue-900';
    case 'Bilge':
      return 'bg-purple-100 text-purple-900';
    default:
      return 'bg-slate-100 text-slate-600';
  }
};

// Pastel Avatar Colors (Soft, Modern, Generated Palette)
const getPastelAvatarStyle = (avatarColor: string) => {
  const pastelMap: Record<string, { bg: string; text: string }> = {
    'bg-blue-600': { bg: 'bg-blue-100', text: 'text-blue-700' },
    'bg-amber-500': { bg: 'bg-amber-100', text: 'text-amber-700' },
    'bg-emerald-600': { bg: 'bg-emerald-100', text: 'text-emerald-700' },
    'bg-purple-600': { bg: 'bg-purple-100', text: 'text-purple-700' },
    'bg-pink-600': { bg: 'bg-pink-100', text: 'text-pink-700' },
    'bg-indigo-600': { bg: 'bg-indigo-100', text: 'text-indigo-700' },
  };
  return pastelMap[avatarColor] || { bg: 'bg-slate-100', text: 'text-slate-700' };
};

// Category Text Color (No Pill Background)
const getCategoryTextColor = (badge: string): string => {
  switch (badge) {
    case 'Akademik':
      return 'text-blue-600';
    case 'Yeme-İçme':
      return 'text-orange-600';
    case 'Barınma':
      return 'text-emerald-600';
    case 'Sosyal':
      return 'text-purple-600';
    case 'İkinci El':
      return 'text-amber-600';
    default:
      return 'text-gray-600';
  }
};

const getRankBorderColor = (role: string) => {
  switch (role) {
    case 'Yeni Gelen':
      return 'ring-slate-400';
    case 'Seyyah':
      return 'ring-orange-500';
    case 'Gezgin':
      return 'ring-blue-500';
    case 'Bilge':
      return 'ring-purple-500';
    default:
      return 'ring-slate-400';
  }
};

// Post data structure matching CreatePostModal (title, category, content)
const FEED_POSTS = [
  {
    id: '1',
    title: 'Selçuk Hukuk Final Notları (Anayasa)',
    category: 'akademik', // matches CreatePostModal category IDs
    user: 'Ahmet K.',
    role: 'Bilge',
    badge: 'Akademik', // Display badge
    content: 'Anayasa hukuku finali için hazırladığım özet notlar. Drive linki aşağıda, herkese başarılar! Eksik gördüğünüz yerleri yorumlarda belirtin lütfen.',
    upvotes: 124,
    comments: 42,
    timeAgo: '2s önce',
    avatarColor: 'bg-blue-600'
  },
  {
    id: '2',
    title: 'En İyi Etli Ekmek Nerede Yenir?',
    category: 'yeme-icme',
    user: 'Ayşe Y.',
    role: 'Gezgin',
    badge: 'Yeme-İçme',
    content: 'Arkadaşlar İstanbul\'dan misafirlerim gelecek, şöyle gerçekten çıtır çıtır ve uygun fiyatlı, öğrenci dostu ��nerisi olan var mı?',
    upvotes: 89,
    comments: 56,
    timeAgo: '5s önce',
    avatarColor: 'bg-amber-500'
  },
  {
    id: '3',
    title: 'Bosna Hersek Mah. Kiralık Ev Arkadaşı',
    category: 'barinma',
    user: 'Mehmet T.',
    role: 'Seyyah',
    badge: 'Barınma',
    content: '3+1 evimize 3. arkadaşı arıyoruz. Kampüse yürüme mesafesinde, tramvay durağına 5 dk. Kira kişi başı 3500 TL.',
    upvotes: 12,
    comments: 5,
    timeAgo: '1g önce',
    avatarColor: 'bg-emerald-600'
  },
  {
    id: '4',
    title: 'Haftasonu Bisiklet Turu',
    category: 'sosyal',
    user: 'Bisiklet Topluluğu',
    role: 'Yeni Gelen',
    badge: 'Sosyal',
    content: 'Bu Pazar Ecdad Parkı\'na sürüyoruz. Katılmak isteyen herkesi bekleriz. Kask zorunludur! Saat 10:00\'da kampüs önünden hareket.',
    upvotes: 45,
    comments: 18,
    timeAgo: '2g önce',
    avatarColor: 'bg-purple-600'
  },
  {
    id: '5',
    title: 'Vize Haftası Çalışma Grubu',
    category: 'akademik',
    user: 'Elif Yılmaz',
    role: 'Gezgin',
    badge: 'Akademik',
    content: 'Matematik ve Fizik dersleri için grup çalışması yapacağız. Kütüphanede toplanıyoruz. Katılmak isteyen var mı?',
    upvotes: 67,
    comments: 23,
    timeAgo: '3s önce',
    avatarColor: 'bg-blue-600'
  },
  {
    id: '6',
    title: 'Kampüs Yakını Ucuz Kahvaltı?',
    category: 'yeme-icme',
    user: 'Burak S.',
    role: 'Seyyah',
    badge: 'Yeme-İçme',
    content: 'Sabah derslerine yetişmek için erken çıkıyorum, kampüs yakınında serpme kahvaltı yapabileceğim uygun fiyatlı bir yer var mı? Budget max 100 TL.',
    upvotes: 43,
    comments: 31,
    timeAgo: '12s önce',
    avatarColor: 'bg-amber-500'
  },
  {
    id: '7',
    title: 'İkinci El Laptop Satılık',
    category: 'ikinci-el',
    user: 'Deniz K.',
    role: 'Bilge',
    badge: 'İkinci El',
    content: 'Lenovo Thinkpad E15 satıyorum. 2 yıllık, hiç sorun yok. 16GB RAM, 512 SSD. Fiyat: 15.000 TL (Pazarlık payı var). Kampüste teslim.',
    upvotes: 28,
    comments: 14,
    timeAgo: '1s önce',
    avatarColor: 'bg-pink-600'
  },
  {
    id: '8',
    title: 'Alaaddin Tepesi Gün Batımı 🌅',
    category: 'sosyal',
    user: 'Selin Aydın',
    role: 'Seyyah',
    badge: 'Sosyal',
    content: 'Akşam 6\'da Alaaddin Tepesi\'nde gün batımı izleyeceğiz. Yanında çay, simit gelsin! Hava çok güzel bugün, kaçırmayın.',
    upvotes: 92,
    comments: 47,
    timeAgo: '8s önce',
    avatarColor: 'bg-purple-600'
  }
];

const getCategoryStyle = (category: string) => {
  switch (category) {
    case 'Akademik':
      return {
        bg: 'bg-blue-100',
        text: 'text-blue-700',
        icon: GraduationCap
      };
    case 'Yeme-İçme':
      return {
        bg: 'bg-orange-100',
        text: 'text-orange-700',
        icon: Utensils
      };
    case 'Barınma':
      return {
        bg: 'bg-green-100',
        text: 'text-green-700',
        icon: Home
      };
    case 'Sosyal':
      return {
        bg: 'bg-purple-100',
        text: 'text-purple-700',
        icon: Ticket
      };
    case 'İkinci El':
      return {
        bg: 'bg-emerald-100',
        text: 'text-emerald-700',
        icon: ShoppingBag
      };
    default:
      return {
        bg: 'bg-slate-100',
        text: 'text-slate-600',
        icon: Award
      };
  }
};

interface FeedScreenProps {
  onPostClick?: (post: any) => void;
  onAnnouncementClick?: (announcement: any) => void;
  onTopicClick?: () => void;
  onWikiEntryClick?: (entry: any) => void;
  activeTab?: string;
  onTabChange?: (tab: string) => void;
  onGameCenterClick?: () => void;
  onGameSelect?: (gameId: string) => void;
  searchQuery?: string;
  searchCategory?: string | null;
  onSearchClick?: () => void;
  onSearchClear?: () => void;
}

export const FeedScreen = ({ 
  onPostClick,
  onAnnouncementClick,
  onTopicClick,
  onWikiEntryClick,
  activeTab = 'home',
  onTabChange,
  onGameCenterClick,
  onGameSelect,
  searchQuery = '',
  searchCategory = null,
  onSearchClick,
  onSearchClear,
}: FeedScreenProps) => {
  const { isDarkMode } = useTheme();
  const [selectedTopicId, setSelectedTopicId] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState('T��mü');
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);
  const [isCreateWikiOpen, setIsCreateWikiOpen] = useState(false);
  const [editingWikiEntry, setEditingWikiEntry] = useState<any>(null);
  const [feedTab, setFeedTab] = useState<'feed' | 'wiki'>('feed');
  const [selectedWikiForHistory, setSelectedWikiForHistory] = useState<any>(null);
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
  
  // State for posts and wiki entries
  const [feedPosts, setFeedPosts] = useState(FEED_POSTS);
  const [wikiEntries, setWikiEntries] = useState(WIKI_ENTRIES);
  
  // State for wiki history (version history for each entry)
  const [wikiHistory, setWikiHistory] = useState<Record<string, Array<{
    version: number;
    editedBy: string;
    editedAt: string;
    changes: string;
    isCurrent?: boolean;
  }>>>(() => {
    // Initialize with mock history for existing entries
    const initialHistory: Record<string, Array<any>> = {};
    WIKI_ENTRIES.forEach(entry => {
      initialHistory[entry.id] = [
        {
          version: entry.version || 1,
          editedBy: entry.lastEditedBy,
          editedAt: entry.lastEditedAt,
          changes: 'İlk oluşturuldu',
          isCurrent: true
        }
      ];
    });
    return initialHistory;
  });
  
  // Mock user coins - in real app, this would come from user context/state
  const userCoins = 6240; // Level 3 (Gezgin)
  
  const handleWikiCreateClick = () => {
    if (!canCreateWiki(userCoins)) {
      const levelName = getUserLevelName(userCoins);
      toast.error(`Wiki oluşturmak için en az "Gezgin" seviyesinde olmanız gerekiyor. Şu anki seviyeniz: ${levelName}`);
      return;
    }
    setIsCreateWikiOpen(true);
  };
  
  // Handle post creation/update
  const handlePostSave = (newPost: { id?: string; title: string; content: string; category: string; badge: string }) => {
    if (newPost.id) {
      // Edit mode
      setFeedPosts(prev => prev.map(post => 
        post.id === newPost.id 
          ? { ...post, title: newPost.title, content: newPost.content, category: newPost.category, badge: newPost.badge }
          : post
      ));
      toast.success('Post başarıyla güncellendi!');
    } else {
      // Create mode
      const post = {
        id: `post-${Date.now()}`,
        title: newPost.title,
        category: newPost.category,
        user: 'Sen', // Current user
        role: getUserLevelName(userCoins),
        badge: newPost.badge,
        content: newPost.content,
        upvotes: 0,
        comments: 0,
        time: 'Az önce',
        fullDate: new Date().toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })
      };
      
      setFeedPosts(prev => [post, ...prev]);
      toast.success('Post başarıyla oluşturuldu!');
    }
  };

  // Handle wiki entry creation/update
  const handleWikiSave = (newEntry: any) => {
    if (newEntry.id && wikiEntries.find(e => e.id === newEntry.id)) {
      // Edit mode - add to history
      const oldEntry = wikiEntries.find(e => e.id === newEntry.id);
      const newVersion = (oldEntry?.version || 0) + 1;
      
      const updatedEntry = {
        ...newEntry,
        lastEditedBy: 'Sen',
        lastEditedAt: 'Az önce',
        version: newVersion
      };
      
      // Update entry
      setWikiEntries(prev => prev.map(entry => 
        entry.id === newEntry.id ? updatedEntry : entry
      ));
      
      // Add to history
      setWikiHistory(prev => {
        const entryHistory = prev[newEntry.id] || [];
        // Mark previous version as not current
        const updatedHistory = entryHistory.map(v => ({ ...v, isCurrent: false }));
        // Add new version
        updatedHistory.push({
          version: newVersion,
          editedBy: 'Sen',
          editedAt: 'Az önce',
          changes: 'İçerik güncellendi',
          isCurrent: true
        });
        return {
          ...prev,
          [newEntry.id]: updatedHistory
        };
      });
      
      toast.success('Wiki entry başarıyla güncellendi!');
    } else {
      // Create mode - add missing fields
      const completeEntry = {
        ...newEntry,
        categoryId: newEntry.categoryId || 'topluluk-onayli',
        lastEditedBy: 'Sen',
        lastEditedAt: 'Az önce',
        version: 1,
        upvotes: 0,
        downvotes: 0,
        isOwnEntry: true
      };
      
      setWikiEntries(prev => [completeEntry, ...prev]);
      
      // Initialize history for new entry
      setWikiHistory(prev => ({
        ...prev,
        [completeEntry.id]: [{
          version: 1,
          editedBy: 'Sen',
          editedAt: 'Az önce',
          changes: 'İlk oluşturuldu',
          isCurrent: true
        }]
      }));
      
      toast.success('Wiki entry başarıyla oluşturuldu!');
    }
  };

  // Filter posts and wiki entries based on search
  const getFilteredPosts = () => {
    if (!searchQuery && !searchCategory) return feedPosts;
    
    return feedPosts.filter(post => {
      // Category filter - post.category directly matches search category IDs
      if (searchCategory) {
        // Post categories are: 'akademik', 'sosyal', 'yeme-icme', 'barinma', 'ikinci-el'
        if (post.category !== searchCategory) {
          return false;
        }
      }
      
      // Text search in title and content
      if (searchQuery) {
        const queryLower = searchQuery.toLowerCase();
        const titleMatch = post.title?.toLowerCase().includes(queryLower) || false;
        const contentMatch = post.content?.toLowerCase().includes(queryLower) || false;
        return titleMatch || contentMatch;
      }
      
      return true;
    });
  };
  
  const getFilteredWikiEntries = () => {
    if (!searchQuery && !searchCategory) return wikiEntries;
    
    return wikiEntries.filter(entry => {
      // Category filter - use categoryId field for matching
      if (searchCategory) {
        // Map search category IDs to wiki entry categoryId values
        const categoryIdMap: Record<string, string[]> = {
          'akademik': ['akademik-destek'],
          'sosyal': ['sosyal-yasam'],
          'yeme-icme': ['yeme-icme'], // Check if this categoryId exists in wiki entries
          'barinma': ['barinma-yasam'],
          'ikinci-el': ['ikinci-el'], // Check if this categoryId exists in wiki entries
        };
        
        const matchingCategoryIds = categoryIdMap[searchCategory];
        if (matchingCategoryIds && entry.categoryId) {
          if (!matchingCategoryIds.includes(entry.categoryId)) {
            return false;
          }
        } else if (matchingCategoryIds) {
          // Fallback: also check category name if categoryId doesn't exist
          const categoryNameMap: Record<string, string[]> = {
            'akademik': ['Akademik Destek'],
            'sosyal': ['Sosyal Yaşam'],
            'yeme-icme': ['Yeme-İçme'],
            'barinma': ['Barınma & Yaşam'],
            'ikinci-el': ['İkinci El'],
          };
          const matchingCategoryNames = categoryNameMap[searchCategory];
          if (matchingCategoryNames && !matchingCategoryNames.includes(entry.category)) {
            return false;
          }
        }
      }
      
      // Text search in title and description
      if (searchQuery) {
        const queryLower = searchQuery.toLowerCase();
        const titleMatch = entry.title?.toLowerCase().includes(queryLower) || false;
        
        // Also search in description field if it exists
        const descriptionField = entry.data?.fields?.find(f => f.key === 'description' || f.label === 'Açıklama');
        const descriptionMatch = descriptionField?.value 
          ? String(descriptionField.value).toLowerCase().includes(queryLower)
          : false;
        
        return titleMatch || descriptionMatch;
      }
      
      return true;
    });
  };
  
  const filteredPosts = getFilteredPosts();
  const filteredWikiEntries = getFilteredWikiEntries();

  return (
    <>
      <div className={`min-h-screen pb-32 lg:pb-6 transition-colors ${
        isDarkMode 
          ? 'bg-[#0f0e17]' 
          : (feedTab === 'wiki' ? 'bg-[#F8F9FA]' : 'bg-[#f2f3f7]')
      }`}>
        
        {/* Rich Global Header */}
        <GlobalHeader 
          type="rich"
          onWalletClick={() => setIsWalletModalOpen(true)}
          coinBalance="2.450"
          onSearchClick={() => {
            if (onSearchClick) onSearchClick();
          }}
          onFilterClick={() => console.log('🎯 Filter/Categories clicked')}
          activeTab={activeTab}
          onTabChange={onTabChange}
          onGameCenterClick={onGameCenterClick}
          searchQuery={searchQuery}
          onSearchClear={onSearchClear}
        />

        {/* Desktop 70/30 Layout Container */}
        <div className="pt-[60px] lg:pt-[84px]">
          <PageLayout
            onTabChange={onTabChange}
            onWalletOpen={() => setIsWalletModalOpen(true)}
            onGameClick={(gameId) => onGameSelect?.(gameId)}
            onGameCenterClick={onGameCenterClick}
          >
            
            {/* Main Feed Content */}
            <div className="w-full">
              
              {/* X-Style Tab Bar (Inside Main Column) */}
              <div className={`border-b transition-colors lg:rounded-t-[10px] ${
                isDarkMode ? 'bg-[#1a1a2e] border-slate-700' : 'bg-white border-slate-200'
              }`}>
                <div className="flex">
                  {/* Tab 1: Akış */}
                  <button
                    onClick={() => setFeedTab('feed')}
                    className={`flex-1 lg:flex-[0.5] py-4 relative transition-colors ${
                      feedTab === 'feed' 
                        ? (isDarkMode ? 'text-white' : 'text-[#19142e]')
                        : (isDarkMode ? 'text-slate-400 hover:bg-slate-800/50' : 'text-gray-500 hover:bg-slate-50')
                    }`}
                  >
                    <span className={`font-bold ${feedTab === 'feed' ? 'font-extrabold' : ''}`}>
                      Akış
                    </span>
                    {/* Active Indicator Line */}
                    {feedTab === 'feed' && (
                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#5852c4] rounded-t-full" />
                    )}
                  </button>

                  {/* Tab 2: Wiki Bilgi */}
                  <button
                    onClick={() => setFeedTab('wiki')}
                    className={`flex-1 lg:flex-[0.5] py-4 relative transition-colors ${
                      feedTab === 'wiki' 
                        ? (isDarkMode ? 'text-white' : 'text-[#19142e]')
                        : (isDarkMode ? 'text-slate-400 hover:bg-slate-800/50' : 'text-gray-500 hover:bg-slate-50')
                    }`}
                  >
                    <span className={`font-bold ${feedTab === 'wiki' ? 'font-extrabold' : ''}`}>
                      Wiki Bilgi
                    </span>
                    {/* Active Indicator Line */}
                    {feedTab === 'wiki' && (
                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#5852c4] rounded-t-full" />
                    )}
                  </button>
                </div>
              </div>
              
              {feedTab === 'feed' ? (
                /* AKIŞ TAB - Feed Stream */
                <section className={`transition-colors lg:rounded-b-[10px] lg:shadow-[0_2px_12px_rgba(25,20,46,0.08)] ${
                  isDarkMode ? 'bg-[#1a1a2e]' : 'bg-white'
                }`}>
                  
                  {/* Desktop: Inline Trigger "What's happening?" */}
                  <div className={`hidden lg:block px-6 py-4 border-b cursor-pointer transition-colors ${
                    isDarkMode 
                      ? 'border-slate-700 hover:bg-slate-800/30' 
                      : 'border-gray-100 hover:bg-gray-50'
                  }`}
                    onClick={() => setIsCreatePostOpen(true)}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#5852c4] to-[#19142e] flex items-center justify-center text-white font-bold">
                        F
                      </div>
                      <div className={`flex-1 px-4 py-3 rounded-full transition-colors ${
                        isDarkMode ? 'bg-slate-800 text-slate-500' : 'bg-gray-100 text-gray-500'
                      }`}>
                        Neler oluyor?
                      </div>
                      <button className="px-6 py-2 bg-[#5852c4] hover:bg-[#19142e] text-white font-bold rounded-full transition-colors">
                        Paylaş
                      </button>
                    </div>
                  </div>

                  {/* Feed Posts */}
                  {filteredPosts.map((post, index) => (
                    <PostCard
                      key={post.id}
                      post={post}
                      index={index}
                      totalPosts={filteredPosts.length}
                      onClick={() => {
                        // Post tıklamada sadece onPostClick çağrılmalı
                        if (onPostClick) {
                          onPostClick(post);
                        } else {
                          setSelectedTopicId(post.id);
                        }
                      }}
                    />
                  ))}
           </section>
              ) : (
                /* WIKI BİLGİ TAB - Knowledge Base Feed */
                <section className={`transition-colors lg:rounded-b-[10px] lg:shadow-[0_2px_12px_rgba(25,20,46,0.08)] ${
                  isDarkMode ? 'bg-[#1a1a2e]' : 'bg-white'
                }`}>
                  
                  {/* Desktop: Inline Trigger "Add Wiki Entry" */}
                  <div className={`hidden lg:block px-6 py-4 border-b transition-colors ${
                    canCreateWiki(userCoins)
                      ? 'cursor-pointer hover:bg-slate-800/30 hover:bg-gray-50'
                      : 'cursor-not-allowed opacity-60'
                  } ${
                    isDarkMode 
                      ? 'border-slate-700' 
                      : 'border-gray-100'
                  }`}
                    onClick={handleWikiCreateClick}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#5852c4] to-[#4a45b0] flex items-center justify-center text-white font-bold">
                        📚
                      </div>
                      <div className={`flex-1 px-4 py-3 rounded-full transition-colors ${
                        isDarkMode ? 'bg-slate-800 text-slate-500' : 'bg-gray-100 text-gray-500'
                      }`}>
                        Wiki bilgisi ekle...
                      </div>
                      <button className="px-6 py-2 bg-[#5852c4] hover:bg-[#4a45b0] text-white font-bold rounded-full transition-colors">
                        Ekle
                      </button>
                    </div>
                  </div>

                  {/* Wiki Entry Cards */}
                  {filteredWikiEntries.map((entry, index) => (
                    <WikiEntryCard
                      key={entry.id}
                      title={entry.title}
                      category={entry.category}
                      data={entry.data}
                      lastEditedBy={entry.lastEditedBy}
                      lastEditedAt={entry.lastEditedAt}
                      version={entry.version}
                      index={index}
                      totalEntries={filteredWikiEntries.length}
                      onHistoryClick={() => {
                        setSelectedWikiForHistory(entry);
                        setIsHistoryModalOpen(true);
                      }}
                      onEditClick={() => {
                        // Check if user can edit (level 3, 4, or 5)
                        const userLevel = Math.floor(userCoins / 2000);
                        if (userLevel >= 3) {
                          setEditingWikiEntry(entry);
                          setIsCreateWikiOpen(true);
                        } else {
                          const levelName = getUserLevelName(userCoins);
                          toast.error(`Wiki düzenlemek için en az "Gezgin" seviyesinde olmanız gerekiyor. Şu anki seviyeniz: ${levelName}`);
                        }
                      }}
                      onClick={() => onWikiEntryClick?.(entry)}
                    />
                  ))}
                </section>
              )}

            </div>

          </PageLayout>
        </div>
      </div>

      <TopicDetailSheet 
        isOpen={!!selectedTopicId} 
        onClose={() => setSelectedTopicId(null)} 
      />

      <WalletModal 
        isOpen={isWalletModalOpen}
        onClose={() => setIsWalletModalOpen(false)}
        isCardConnected={true}
      />


      <CreatePostModal 
        isOpen={isCreatePostOpen}
        onClose={() => setIsCreatePostOpen(false)}
        onSave={handlePostSave}
      />

      <CreateWikiModal 
        isOpen={isCreateWikiOpen}
        onClose={() => {
          setIsCreateWikiOpen(false);
          setEditingWikiEntry(null);
        }}
        editEntry={editingWikiEntry}
        onSave={handleWikiSave}
      />

      {/* Wiki History Modal */}
      {selectedWikiForHistory && (
        <WikiHistoryModal
          isOpen={isHistoryModalOpen}
          onClose={() => {
            setIsHistoryModalOpen(false);
            setSelectedWikiForHistory(null);
          }}
          wikiTitle={selectedWikiForHistory.title}
          versions={wikiHistory[selectedWikiForHistory.id] || []}
          onRestoreVersion={(version) => {
            // Restore version logic can be added here if needed
            console.log('Restore version:', version);
          }}
        />
      )}

      {/* X-Style Floating Action Button (FAB) - Changes based on tab */}
      <button
        onClick={() => {
          if (feedTab === 'feed') {
            setIsCreatePostOpen(true);
          } else {
            handleWikiCreateClick();
          }
        }}
        className={`fixed right-5 bottom-[110px] w-14 h-14 rounded-full shadow-[0_4px_12px_rgba(88,82,196,0.4)] transition-all duration-200 active:scale-95 z-40 flex items-center justify-center lg:hidden ${
          feedTab === 'feed' 
            ? 'bg-[#5852c4] hover:bg-[#19142e] hover:shadow-[0_6px_20px_rgba(88,82,196,0.6)]' 
            : 'bg-[#5852c4] hover:bg-[#4a45b0] hover:shadow-[0_6px_20px_rgba(88,82,196,0.6)]'
        }`}
        aria-label={feedTab === 'feed' ? 'Yeni gönderi oluştur' : 'Wiki bilgisi ekle'}
      >
        {feedTab === 'feed' ? (
          <Feather className="w-6 h-6 text-white" strokeWidth={2.5} />
        ) : (
          <span className="text-2xl">📚</span>
        )}
      </button>
    </>
  );
};
