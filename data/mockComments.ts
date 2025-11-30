// Mock comments data with infinite nesting structure

interface Comment {
    id: string;
    user: string;
    role: string;
    avatarColor: string;
    text: string;
    likes: number;
    timeAgo: string;
    replies?: Comment[];
  }
  
  export const MOCK_COMMENTS: Record<string, Comment[]> = {
    '1': [ // Comments for post ID 1
      {
        id: 'c1',
        user: 'Mehmet Yılmaz',
        role: 'Gezgin',
        avatarColor: 'bg-blue-500',
        text: 'Harika bir çalışma, emeğine sağlık! İnsan hakları bölümü özellikle çok net anlatılmış. Bu notları arkadaşlarımla da paylaşacağım.',
        likes: 12,
        timeAgo: '2s',
        replies: [
          {
            id: 'c1-r1',
            user: 'Ahmet K.',
            role: 'Bilge',
            avatarColor: 'bg-blue-600',
            text: 'Çok teşekkür ederim! O bölümü en çok üzerinde durduğum kısımdı. Sınav haftasında da ek sorular paylaşacağım.',
            likes: 5,
            timeAgo: '1s',
            replies: [
              {
                id: 'c1-r1-r1',
                user: 'Zeynep Aydın',
                role: 'Seyyah',
                avatarColor: 'bg-orange-500',
                text: 'Başarılarının devamını diliyorum, çok değerli paylaşım 🙏 Sınav sorularını da bekliyoruz!',
                likes: 3,
                timeAgo: '45d',
                replies: [
                  {
                    id: 'c1-r1-r1-r1',
                    user: 'Ahmet K.',
                    role: 'Bilge',
                    avatarColor: 'bg-blue-600',
                    text: 'Elbette, yarın akşama kadar paylaşırım 📚',
                    likes: 8,
                    timeAgo: '30d',
                  }
                ]
              }
            ]
          },
          {
            id: 'c1-r2',
            user: 'Burak Yıldız',
            role: 'Gezgin',
            avatarColor: 'bg-blue-500',
            text: 'Gerçekten çok faydalı oldu, özellikle anayasa değişiklikleri kısmı mükemmel!',
            likes: 7,
            timeAgo: '50d',
          }
        ]
      },
      {
        id: 'c2',
        user: 'Ayşe Demir',
        role: 'Seyyah',
        avatarColor: 'bg-orange-500',
        text: 'Drive linki açılmıyor galiba, tekrar kontrol edebilir misin?',
        likes: 8,
        timeAgo: '5s',
        replies: [
          {
            id: 'c2-r1',
            user: 'Ahmet K.',
            role: 'Bilge',
            avatarColor: 'bg-blue-600',
            text: 'Düzelttim, şimdi açılıyor olması lazım. Tekrar deneyebilir misin?',
            likes: 2,
            timeAgo: '3s',
          }
        ]
      },
      {
        id: 'c3',
        user: 'Can Özkan',
        role: 'Yeni Gelen',
        avatarColor: 'bg-slate-500',
        text: 'Sınava çalışırken bu notlar çok işime yaradı, teşekkürler!',
        likes: 15,
        timeAgo: '1g',
      }
    ],
    '2': [ // Comments for post ID 2
      {
        id: 'c2-1',
        user: 'Fatih Terim',
        role: 'Bilge',
        avatarColor: 'bg-purple-600',
        text: 'Alaaddin\'deki Hacı Usta efsanedir arkadaşlar. Fiyatlar da gayet makul.',
        likes: 34,
        timeAgo: '1s',
        replies: [
          {
            id: 'c2-1-r1',
            user: 'Ayşe Y.',
            role: 'Gezgin',
            avatarColor: 'bg-amber-500',
            text: 'Teşekkürler! Oraya gideceğiz galiba 😊',
            likes: 7,
            timeAgo: '30d',
          }
        ]
      },
      {
        id: 'c2-2',
        user: 'Merve K.',
        role: 'Seyyah',
        avatarColor: 'bg-orange-500',
        text: 'Mevlana\'nın yanındaki Tiritçi Mithat da çok güzel, ama biraz pahalı.',
        likes: 18,
        timeAgo: '3s',
      }
    ],
    '3': [ // Comments for post ID 3
      {
        id: 'c3-1',
        user: 'Deniz Şahin',
        role: 'Gezgin',
        avatarColor: 'bg-blue-500',
        text: 'Ben de ev arıyorum, hala yer var mı?',
        likes: 5,
        timeAgo: '30d',
        replies: [
          {
            id: 'c3-1-r1',
            user: 'Mehmet T.',
            role: 'Seyyah',
            avatarColor: 'bg-emerald-600',
            text: 'Var, DM atabilirsin detaylar için.',
            likes: 2,
            timeAgo: '15d',
          }
        ]
      }
    ],
    '4': [ // Comments for post ID 4
      {
        id: 'c4-1',
        user: 'Selin Yurt',
        role: 'Yeni Gelen',
        avatarColor: 'bg-slate-500',
        text: 'Bisikletim yok ama katılabilir miyim? 😅',
        likes: 8,
        timeAgo: '1g',
        replies: [
          {
            id: 'c4-1-r1',
            user: 'Bisiklet Topluluğu',
            role: 'Yeni Gelen',
            avatarColor: 'bg-purple-600',
            text: 'Tabii ki! Bizden ödünç bisiklet de verebiliriz.',
            likes: 12,
            timeAgo: '22s',
          }
        ]
      }
    ],
    '5': [ // Comments for post ID 5
      {
        id: 'c5-1',
        user: 'Ahmet D.',
        role: 'Gezgin',
        avatarColor: 'bg-blue-500',
        text: 'Ben de katılmak isterim! Hangi gün ve saatte toplanıyorsunuz?',
        likes: 15,
        timeAgo: '1s',
        replies: [
          {
            id: 'c5-1-r1',
            user: 'Elif Yılmaz',
            role: 'Gezgin',
            avatarColor: 'bg-blue-600',
            text: 'Her gün saat 14:00-18:00 arası kütüphanedeyiz. Gel katıl!',
            likes: 8,
            timeAgo: '45d',
          }
        ]
      },
      {
        id: 'c5-2',
        user: 'Zeynep K.',
        role: 'Bilge',
        avatarColor: 'bg-purple-600',
        text: 'Fizik konusunda yardımcı olabilirim, ben de geleyim mi?',
        likes: 22,
        timeAgo: '2s',
      }
    ],
    '6': [ // Comments for post ID 6
      {
        id: 'c6-1',
        user: 'Mehmet Y.',
        role: 'Bilge',
        avatarColor: 'bg-purple-600',
        text: 'Selçuk Kafe çok iyi, serpme kahvaltı 85 TL. Kampüsün tam karşısında.',
        likes: 28,
        timeAgo: '30d',
        replies: [
          {
            id: 'c6-1-r1',
            user: 'Burak S.',
            role: 'Seyyah',
            avatarColor: 'bg-amber-500',
            text: 'Süper, teşekkürler! Yarın deneyeceğim.',
            likes: 5,
            timeAgo: '15d',
          }
        ]
      },
      {
        id: 'c6-2',
        user: 'Ayşe T.',
        role: 'Seyyah',
        avatarColor: 'bg-orange-500',
        text: 'Bosna Kahvecisi de güzel, ama biraz daha pahalı.',
        likes: 12,
        timeAgo: '1s',
      }
    ],
    '7': [ // Comments for post ID 7
      {
        id: 'c7-1',
        user: 'Can S.',
        role: 'Gezgin',
        avatarColor: 'bg-blue-500',
        text: 'Garantisi var mı? Ve bataryası nasıl?',
        likes: 6,
        timeAgo: '30d',
        replies: [
          {
            id: 'c7-1-r1',
            user: 'Deniz K.',
            role: 'Bilge',
            avatarColor: 'bg-pink-600',
            text: 'Garanti 6 ay daha var. Batarya sağlığı %92, hiç sorun yok.',
            likes: 4,
            timeAgo: '20d',
          }
        ]
      },
      {
        id: 'c7-2',
        user: 'Fatma Y.',
        role: 'Yeni Gelen',
        avatarColor: 'bg-slate-500',
        text: 'Takas olur mu? Bende MacBook var.',
        likes: 3,
        timeAgo: '45d',
      }
    ],
    '8': [ // Comments for post ID 8
      {
        id: 'c8-1',
        user: 'Burak M.',
        role: 'Seyyah',
        avatarColor: 'bg-orange-500',
        text: 'Harika fikir! Ben de geliyorum 🌅',
        likes: 45,
        timeAgo: '2s',
        replies: [
          {
            id: 'c8-1-r1',
            user: 'Selin Aydın',
            role: 'Seyyah',
            avatarColor: 'bg-purple-600',
            text: 'Süper! Görüşmek üzere 😊',
            likes: 18,
            timeAgo: '1s',
          }
        ]
      },
      {
        id: 'c8-2',
        user: 'Elif K.',
        role: 'Gezgin',
        avatarColor: 'bg-blue-500',
        text: 'Fotoğraf makinesi getiriyor musunuz? Ben getireceğim.',
        likes: 23,
        timeAgo: '3s',
      },
      {
        id: 'c8-3',
        user: 'Ahmet Y.',
        role: 'Bilge',
        avatarColor: 'bg-purple-600',
        text: 'Alaaddin\'da gün batımı efsane oluyor, kaçırmayın!',
        likes: 67,
        timeAgo: '5s',
      }
    ]
  };
  
  // Helper function to convert a comment to a post format
  export const convertCommentToPost = (comment: Comment, originalPostId: string) => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    
    return {
      id: comment.id,
      title: comment.text.length > 80 ? `${comment.text.substring(0, 80)}...` : comment.text,
      user: comment.user,
      role: comment.role,
      avatarColor: comment.avatarColor,
      content: comment.text,
      likes: comment.likes,
      comments: comment.replies?.length || 0,
      fullDate: `${hours}:${minutes} • ${now.toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })}`,
      category: 'Yorum'
    };
  };
