# Nova Sapiens AI Hub - Dönüşüm Planı

## Vizyon
Kişisel AI Hub - Tüm AI projelerini kronolojik timeline'da sergileyen Türkçe bir vitrin sitesi.

---

## Yapılacaklar

### 1. Türkçeye Çeviri
- Tüm metinler Türkçe olacak
- Navigation: "Projeler", "Hakkımda", "İletişim"
- Hero section: "AI Projelerim. Tek Çatı Altında."

### 2. Proje Kartları
Her proje için kart:
- **Dopa.Live** - ADHD uygulaması (44 commit, aktif geliştirme)
- **Niyazi the Sniper** - Chrome extension
- **Wire and Fire** - (varsa detay eklenecek)

Kart içeriği:
- Proje adı + logo/ikon
- Kısa açıklama (amaç)
- Teknolojiler (React, Firebase, vb.)
- "Timeline'ı Gör" butonu

### 3. Timeline Komponenti
- Git commit history'den çekilecek
- Tarih bazlı gruplama (gün/hafta)
- Commit tipi renklendirme:
  - `feat` → Yeşil (yeni özellik)
  - `fix` → Turuncu (düzeltme)
  - `perf` → Mavi (performans)
- Her commit için: tarih, başlık, açıklama

### 4. Veri Yapısı
```json
{
  "projects": [
    {
      "id": "dopa-live",
      "name": "Dopa.Live",
      "description": "ADHD'liler için AI destekli görev yönetimi",
      "tech": ["React", "Firebase", "TypeScript"],
      "timeline": [
        {
          "date": "2026-01-27",
          "type": "feat",
          "title": "SmartGoalsWidget eklendi",
          "description": "Doppa önerileriyle hedef takibi"
        }
      ]
    }
  ]
}
```

### 5. Sayfa Yapısı
```
/ (Ana Sayfa)
├── Header (logo + nav)
├── Hero Section
│   └── "Merhaba, ben Alperen. AI ile projeler geliştiriyorum."
├── Projeler Grid
│   └── Proje Kartları (3 sütun)
├── Timeline Section (seçili proje için)
│   └── Kronolojik commit listesi
└── Footer
```

### 6. Teknik Adımlar
1. `src/data/projects.json` - Proje verileri
2. `src/components/ProjectCard.tsx` - Proje kartı
3. `src/components/Timeline.tsx` - Timeline komponenti
4. `src/components/TimelineItem.tsx` - Tek commit görünümü
5. `App.tsx` güncelleme - Yeni layout

### 7. Git Verisi Çekimi
Build sırasında script ile:
```bash
git log --pretty=format:"%H|%ai|%s" > commits.txt
```
Sonra JSON'a parse edilecek.

---

## Tasarım
- Mevcut dark tema korunacak
- Gradient'ler ve glow efektleri devam
- Timeline için dikey çizgi + dot'lar
- Hover efektleri ile interaktivite

---

## Öncelik Sırası
1. Türkçe Hero + Navigation
2. Proje kartları (statik)
3. Timeline komponenti
4. Git veri entegrasyonu
5. Animasyonlar + polish
