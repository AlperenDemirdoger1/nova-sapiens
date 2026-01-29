import { motion, AnimatePresence, useScroll, type Variants } from 'framer-motion'
import { useState, useEffect } from 'react'

/* ──────────────────────────── NAV ──────────────────────────── */

const navLinks = [
  { label: 'Hizmetler', href: '#hizmetler' },
  { label: 'Projeler', href: '#projeler' },
  { label: 'CV', href: '#cv' },
  { label: 'İletişim', href: '#iletisim' },
]

/* ──────────────────────────── TYPES ──────────────────────────── */

interface TimelineItem {
  date: string
  type: 'feat' | 'fix' | 'perf' | 'chore' | 'other'
  title: string
  description?: string
}

interface Project {
  id: string
  name: string
  description: string
  tech: string[]
  status: 'active' | 'completed' | 'paused'
  accent: string
  timeline: TimelineItem[]
  url?: string
}

interface ConsultingTool {
  name: string
  description: string
  status: 'live' | 'building' | 'planned'
}

type ServiceCategory = 'all' | 'strategy' | 'ai' | 'data' | 'production'

interface ConsultingService {
  icon: string
  title: string
  description: string
  deliverables: string[]
  tools: ConsultingTool[]
  category: ServiceCategory
}

interface CareerExperience {
  company: string
  role: string
  period: string
  location: string
  highlights: string[]
  accent: string
  type: 'corporate' | 'entrepreneurship'
}

interface Education {
  school: string
  degree: string
  field: string
  period: string
  note: string
}

interface GitHubCommit {
  repo: string
  message: string
  date: string
  url: string
}

/* ──────────────────────────── DATA ──────────────────────────── */

const heroStats = [
  { value: '300K+', label: 'Kullanıcı Kazanımı' },
  { value: '8+', label: 'Yıl Deneyim' },
  { value: '5', label: 'Aktif AI Projesi' },
  { value: '$M+', label: 'Yönetilen Bütçe' },
]

const consultingServices: ConsultingService[] = [
  {
    icon: 'AI',
    category: 'ai',
    title: 'AI Workflow Kurulumu',
    description: 'Ekibiniz hala her şeyi elle mi yapıyor? Claude, GPT, Gemini, Manus ile süreçlerinizi otomatize ediyorum. Bizzat kullanıyorum, bizzat kuruyorum.',
    deliverables: ['Süreç taraması & AI fırsat haritası', 'Doğru araç seçimi & entegrasyon', 'Ekip eğitimi & ilk pilot'],
    tools: [
      { name: 'AI Readiness Audit', description: 'Ekibinin hangi süreçleri AI ile otomatize edebileceğini tarayan analiz aracı', status: 'live' },
      { name: 'Prompt Library', description: 'Sektörüne özel test edilmiş prompt şablonları — marketing, operasyon, müşteri hizmetleri', status: 'live' },
      { name: 'ROI Simulator', description: 'AI entegrasyonunun maliyet-getiri analizini gösteren hesaplayıcı', status: 'building' },
    ],
  },
  {
    icon: 'UA',
    category: 'strategy',
    title: 'Growth & Kullanıcı Kazanımı',
    description: '300K kullanıcıyı nasıl kazandığımı biliyorum. UA, retention, lifecycle otomasyon, performans marketing. Somut rakamlarla konuşuyorum.',
    deliverables: ['Kanal stratejisi & bütçe planı', 'Kampanya kurulumu & optimizasyon', 'CRM & retention otomasyonu'],
    tools: [
      { name: 'Channel Mix Planner', description: 'Bütçene ve hedefine göre en verimli kanal dağılımını hesaplayan araç', status: 'live' },
      { name: 'UA Playbook', description: '300K kullanıcı kazanırken kullandığım adım adım büyüme rehberi', status: 'live' },
      { name: 'Retention Scorecard', description: 'Lifecycle metriklerini takip eden ve churn riskini önceden gösteren dashboard', status: 'building' },
    ],
  },
  {
    icon: 'W3',
    category: 'strategy',
    title: 'Web3 & Topluluk',
    description: 'TOKEN2049\'da sahnedeydim, 100K+ topluluk yönettim. Blockchain projeleri için GTM, topluluk ve token lansman stratejisi kuruyorum.',
    deliverables: ['Go-to-market & roadmap', 'Topluluk büyüme mekanikleri', 'Airdrop & engagement tasarımı'],
    tools: [
      { name: 'Community Health Score', description: 'Discord/Telegram topluluğunun sağlığını ölçen ve aksiyon öneren metrik sistemi', status: 'live' },
      { name: 'Airdrop Mechanics Kit', description: 'Token dağıtım stratejisi, eligibility kriterleri ve engagement loop tasarımı', status: 'live' },
      { name: 'GTM Launch Tracker', description: 'Token lansmanı için milestone bazlı proje takip aracı', status: 'planned' },
    ],
  },
  {
    icon: 'MV',
    category: 'ai',
    title: 'AI Ürün Geliştirme',
    description: 'Fikir var ama nereden başlayacağını bilmiyor musun? Ben de öyleydim. Sonra 5 tane ship ettim. Fikir aşamasından MVP\'ye kadar yanındayım.',
    deliverables: ['Ürün tanımı & teknik mimari', 'AI model seçimi & prototip', 'Lansman stratejisi'],
    tools: [
      { name: 'MVP Scope Builder', description: 'Fikrini 2 haftalık build edilebilir bir MVP\'ye dönüştüren scope aracı', status: 'live' },
      { name: 'AI Model Selector', description: 'Use case\'ine göre doğru AI modeli ve stack\'i öneren karar ağacı', status: 'live' },
      { name: 'Ship Checklist', description: 'Lansman öncesi kontrol listesi — teknik, marketing, legal', status: 'building' },
    ],
  },
  {
    icon: 'EC',
    category: 'production',
    title: 'E-ticaret Otomasyon',
    description: 'Etsy\'den Shopify\'a, kendi mağazamı sıfırdan kurdum. Ürün listeleme, sipariş yönetimi, fiyatlama, müşteri iletişimi — hepsini AI ile otomatize ediyorum.',
    deliverables: ['Mağaza kurulumu & optimizasyon', 'Sipariş-ödeme-kargo otomasyon akışı', 'AI destekli fiyatlama & stok yönetimi'],
    tools: [
      { name: 'Listing Optimizer', description: 'Ürün başlıkları, açıklamaları ve SEO etiketlerini AI ile optimize eden araç', status: 'live' },
      { name: 'Order Flow Automator', description: 'Sipariş alımından kargoya kadar tüm süreçleri otomatize eden workflow builder', status: 'live' },
      { name: 'Price Intelligence', description: 'Rakip fiyatlarını takip edip dinamik fiyatlama önerileri sunan sistem', status: 'building' },
    ],
  },
  {
    icon: 'CR',
    category: 'production',
    title: 'AI İçerik Üretimi',
    description: 'Midjourney, Runway, Suno, ElevenLabs, Kling — son teknoloji AI araçlarıyla görsel, video, ses, kurgu, animasyon ve kısa film üretiyorum. Stüdyo maliyetinin onda biri.',
    deliverables: ['Marka uyumlu görsel & video üretimi', 'AI ses ve seslendirme', 'Kısa film & animasyon prodüksiyon'],
    tools: [
      { name: 'Creative Pipeline', description: 'Brief\'ten son çıktıya kadar AI içerik üretim hattı — görsel, video, ses tek akışta', status: 'live' },
      { name: 'Brand Style Engine', description: 'Marka kimliğini öğrenip tutarlı görseller üreten özelleştirilmiş model sistemi', status: 'live' },
      { name: 'Video Autopilot', description: 'Script\'ten montajlı videoya kadar otonom üretim — Runway, Kling, Pika entegrasyonu', status: 'building' },
    ],
  },
  {
    icon: 'DA',
    category: 'data',
    title: 'Data Analiz & İçgörüler',
    description: 'Veri var ama ne yapacağını bilmiyorsun. Ben sektörüne özel analiz yapıp, aksiyon alınabilir içgörülere çeviriyorum. Dashboard\'dan karar desteğine.',
    deliverables: ['Sektöre özel veri analizi & raporlama', 'Özel dashboard kurulumu', 'AI destekli tahminleme & trend analizi'],
    tools: [
      { name: 'Insight Generator', description: 'Ham veriyi sektörüne özel aksiyon önerilerine çeviren AI analiz aracı', status: 'live' },
      { name: 'Dashboard Builder', description: 'İhtiyacına göre özelleştirilmiş gerçek zamanlı metrik dashboard\'u', status: 'live' },
      { name: 'Trend Predictor', description: 'Geçmiş verilere bakarak gelecek trendleri ve riskleri öngören tahmin motoru', status: 'planned' },
    ],
  },
  {
    icon: 'CB',
    category: 'ai',
    title: 'Özel AI Chatbot',
    description: 'Generic chatbot\'lardan bahsetmiyorum. Senin işini bilen, müşterini tanıyan, hafızası olan, kişiselleştirilmiş AI asistan. Müşteri hizmetlerinden satışa kadar.',
    deliverables: ['İşine özel eğitilmiş chatbot geliştirme', 'Hafıza & kişiselleştirme entegrasyonu', 'CRM & destek sistemi bağlantısı'],
    tools: [
      { name: 'Bot Persona Builder', description: 'Chatbot\'unun kişiliğini, bilgi tabanını ve konuşma tonunu tasarlayan araç', status: 'live' },
      { name: 'Memory Engine', description: 'Müşteri geçmişini ve tercihlerini hatırlayan uzun süreli hafıza sistemi', status: 'live' },
      { name: 'Conversation Analytics', description: 'Chatbot performansını, müşteri memnuniyetini ve dönüşüm oranlarını takip eden panel', status: 'building' },
    ],
  },
  {
    icon: 'SC',
    category: 'data',
    title: 'Rakip Analiz & Scraping',
    description: 'Rakiplerinin ne yaptığını tahmin etme, izle. Fiyat, ürün, kampanya, içerik — otomatik veri toplama ve analiz. Rokogame\'de Python ile dashboard kurdum, GoArt\'ta pazar takibi yaptım.',
    deliverables: ['Rakip web sitesi & sosyal medya izleme', 'Otomatik fiyat & ürün takibi', 'Haftalık rakip hareket raporu'],
    tools: [
      { name: 'Competitor Radar', description: 'Rakiplerinin web sitesi, fiyat ve kampanya değişikliklerini otomatik takip eden izleme sistemi', status: 'live' },
      { name: 'Price Watch', description: 'Rakip fiyatlarını günlük tarayan ve senin fiyatlandırmanla karşılaştıran dashboard', status: 'live' },
      { name: 'Content Spy', description: 'Rakiplerin sosyal medya, blog ve reklam içeriklerini analiz edip trend ve boşlukları gösteren araç', status: 'building' },
    ],
  },
  {
    icon: 'MR',
    category: 'strategy',
    title: 'Market Research & Strateji',
    description: 'Pazarı anlamadan hareket etme. TAM/SAM/SOM analizi, müşteri segmentasyonu, positioning, GTM stratejisi. Veriye dayalı kararlar alıyoruz, hissiyata değil.',
    deliverables: ['Pazar büyüklüğü & fırsat analizi (TAM/SAM/SOM)', 'Müşteri persona & segmentasyon', 'Go-to-market strateji dokümanı'],
    tools: [
      { name: 'Market Sizer', description: 'Sektörünün TAM, SAM ve SOM büyüklüğünü veri kaynaklarından hesaplayan analiz aracı', status: 'live' },
      { name: 'Persona Engine', description: 'Gerçek kullanıcı verisinden ideal müşteri profillerini ve segmentlerini oluşturan sistem', status: 'live' },
      { name: 'Positioning Canvas', description: 'Rakip haritası üzerinde senin konumunu belirleyen ve farklılaşma fırsatlarını gösteren interaktif araç', status: 'live' },
    ],
  },
]

const projects: Project[] = [
  {
    id: 'dopa-live',
    name: 'Dopa.Live',
    description: "ADHD'li biri olarak kendim için yaptım. AI destekli görev yönetimi, gamification ve flow state hunting.",
    tech: ['Next.js', 'Firebase', 'TypeScript', 'Tailwind'],
    status: 'active',
    accent: 'from-emerald-400/70 to-cyan-400/50',
    timeline: [
      { date: '2026-01-27', type: 'feat', title: 'SmartGoalsWidget', description: 'Doppa önerileriyle hedef takibi' },
      { date: '2026-01-26', type: 'feat', title: 'AI Chat entegrasyonu', description: 'Gerçek zamanlı AI asistan' },
      { date: '2026-01-23', type: 'fix', title: 'Auth flow iyileştirmesi', description: 'Email doğrulama UX düzeltmeleri' },
      { date: '2026-01-20', type: 'feat', title: 'Gamification sistemi', description: 'XP, rozetler ve seviye sistemi' },
      { date: '2025-12-25', type: 'feat', title: 'Topluluk forumu', description: 'Kullanıcılar arası etkileşim' },
      { date: '2025-12-08', type: 'feat', title: 'Çoklu dil desteği', description: 'i18n altyapısı ve Türkçe çeviri' },
      { date: '2025-11-11', type: 'feat', title: 'İlk sürüm', description: 'Proje başlangıcı' },
    ],
  },
  {
    id: 'niyazi-sniper',
    name: 'Niyazi the Sniper',
    description: 'Viral tweet\'leri yakala, AI ile reply üret. X\'te büyümek isteyenler için Chrome extension.',
    tech: ['Chrome Extension', 'TypeScript', 'Vite'],
    status: 'active',
    accent: 'from-orange-400/70 to-red-400/50',
    timeline: [
      { date: '2026-01-28', type: 'feat', title: 'Extension yapısı', description: 'Temel manifest ve popup' },
    ],
  },
  {
    id: 'wire-fire',
    name: 'Wire and Fire',
    description: 'AI ile içerik üretimi. Henüz erken aşamada, sırada bekliyor.',
    tech: ['React', 'Node.js', 'OpenAI'],
    status: 'paused',
    accent: 'from-purple-400/70 to-pink-400/50',
    timeline: [],
  },
  {
    id: 'nova-sapiens',
    name: 'Nova Sapiens',
    description: 'Şu an baktığın site. Build in public accountability hub\'ım. Meta, biliyorum.',
    tech: ['React', 'TypeScript', 'Vite', 'Tailwind', 'Framer Motion'],
    status: 'active',
    accent: 'from-cyan-400/70 to-indigo-400/50',
    timeline: [
      { date: '2026-01-28', type: 'feat', title: 'Kurumsal çalışmalar', description: 'GoArt AI projeleri eklendi' },
      { date: '2025-12-10', type: 'feat', title: 'İlk sürüm', description: 'Portfolio sitesi yayında' },
    ],
  },
  {
    id: 'charamotion',
    name: 'CharaMotion',
    description: 'AI Influencer platformu. Nano Banana Studio ile karakter üretimi ve sosyal medya otomasyonu. Persona cloning at scale.',
    tech: ['TypeScript', 'Next.js', 'AI Image Gen', 'Vercel'],
    status: 'active',
    accent: 'from-pink-400/70 to-rose-400/50',
    url: 'https://charamotion.vercel.app',
    timeline: [
      { date: '2026-01-22', type: 'feat', title: 'Platform lansmanı', description: 'Vercel deployment' },
      { date: '2026-01-20', type: 'feat', title: 'Proje başlangıcı', description: 'TypeScript altyapısı' },
    ],
  },
  {
    id: 'atlantic-dental-bot',
    name: 'Atlantic Dental Bot',
    description: 'Diş kliniği için AI destekli WhatsApp satış asistanı. 6 farklı reklam tipine göre kişiselleştirilmiş onboarding, lead scoring ve Bitrix24 CRM entegrasyonu.',
    tech: ['TypeScript', 'Node.js', 'OpenAI GPT-4o', 'WhatsApp API', 'Bitrix24'],
    status: 'active',
    accent: 'from-blue-400/70 to-teal-400/50',
    url: 'https://novasapiens.io/dental-bot/simulator.html',
    timeline: [
      { date: '2026-01-29', type: 'feat', title: 'Simulator & FAQ', description: 'Demo sayfası ve SSS modal eklendi' },
      { date: '2026-01-28', type: 'feat', title: '6 Reklam Stratejisi', description: 'price, aesthetic, trust, speed, pain, social' },
      { date: '2026-01-27', type: 'feat', title: 'Lead Scoring', description: 'Intent detection ve skor hesaplama' },
      { date: '2026-01-26', type: 'feat', title: 'Bitrix24 Entegrasyonu', description: 'CRM timeline ve deal takibi' },
      { date: '2026-01-25', type: 'feat', title: 'WhatsApp API', description: 'Meta Business API entegrasyonu' },
      { date: '2026-01-24', type: 'feat', title: 'Proje başlangıcı', description: 'AI asistan altyapısı' },
    ],
  },
]

const goartAiProjects = [
  { name: 'Telegram Bot', description: 'Kullanıcı etkileşimi, otomatik bildirimler ve AI destekli sohbet', tools: ['Telegram API', 'Node.js', 'GPT'] },
  { name: 'GoArtStrategy', description: 'Sezonluk içerik planlaması, rakip analizi ve strateji dashboard\'u', tools: ['Next.js', 'Analytics', 'Data Viz'] },
  { name: 'Performance Marketing Tool', description: 'Kampanya performans takibi, ROI analizi ve otomatik raporlama', tools: ['Python', 'Analytics API'] },
  { name: 'Product Marketing Alignment', description: 'Ürün-pazar uyumu analizi ve go-to-market strateji', tools: ['Market Research', 'AI Analysis'] },
  { name: 'Visual Kite', description: 'Marka uyumlu görseller, sosyal medya asset\'leri üretimi', tools: ['Nano Banana Pro', 'AI Image Gen'] },
  { name: 'Manus Sunumları', description: 'Yatırımcı ve partner sunumları için AI destekli içerik', tools: ['Manus', 'Presentation AI'] },
]

const careerExperiences: CareerExperience[] = [
  {
    company: 'GoArt Worlds',
    role: 'Marketing Lead',
    period: 'Haziran 2024 - Devam',
    location: 'İstanbul, TR',
    type: 'corporate',
    accent: 'from-blue-400/70 to-purple-400/50',
    highlights: [
      '5 kişilik ekip ve 3 ajansı yöneterek multimilyon dolarlık bütçeleri yönetip büyüme stratejisini direkt CEO ve yönetim kuruluna sundu',
      'UA playbook ile 300K+ kayıtlı kullanıcıya ulaşıldı; Addressable, Telegram, Coinzilla, TikTok, Meta ve Google üzerinden kampanyalar yürütüldü',
      'Braze entegrasyonu ile 4 lifecycle otomasyon kurularak retention %12 artırıldı',
      'Trendyol, Halkbank, Polygon, Sui ile co-branding aktivasyonları; TOKEN2049 Dubai ve İstanbul Blockchain Week\'te şirketi temsil etti',
      'Claude, Manus, Gemini, GPT ile AI-first marketing workflow\'ları ölçeklendi; Jira ile agile süreçler kuruldu',
    ],
  },
  {
    company: 'Teleporter Realities',
    role: 'Product Marketing Manager',
    period: 'Ocak 2023 - Mayıs 2024',
    location: 'San Mateo, CA',
    type: 'corporate',
    accent: 'from-violet-400/70 to-indigo-400/50',
    highlights: [
      'Yeni VR oyun özellikleri için go-to-market stratejileri geliştirdi',
      '9GAG ve Imgur gibi viral platformlarla organik trafikte %500 artış sağladı',
      'Kapalı beta sürecinde 5.000 üyeli Discord topluluğu kurarak %70 retention elde etti',
      'Python tabanlı rakip analiz dashboard\'u geliştirerek Oculus pazar aktivitesini takip etti',
    ],
  },
  {
    company: 'Rokogame Studios',
    role: 'Growth Marketing Manager',
    period: 'Ocak 2022 - Ocak 2023',
    location: 'İstanbul, TR',
    type: 'corporate',
    accent: 'from-emerald-400/70 to-teal-400/50',
    highlights: [
      'Roco Finance NFT kampanyası 48 saat içinde sold-out oldu',
      'Aylık $200K bütçeyle Google Ads, Meta, TikTok, Twitch performans pazarlaması; CTR %25, conversion %15 artış',
      'Elraen ve WTCN gibi Twitch yayıncılarıyla referral trafikte %60 artış, 35.000+ üyeli Discord topluluğu',
      'Rise Online lansman kampanyası: 200.000 kayıt, 50.000 ilk gün aktif kullanıcı',
    ],
  },
  {
    company: 'GoTürkiye (Kültür ve Turizm Bakanlığı)',
    role: 'Marketing Executive',
    period: 'Ocak 2021 - Ocak 2022',
    location: 'İstanbul, TR',
    type: 'corporate',
    accent: 'from-rose-400/70 to-orange-400/50',
    highlights: [
      'Antalya ve Mezopotamya bölgelerinin dijital tanıtımını GoTürkiye ve uluslararası medya kanallarıyla yürüttü',
      'Cercle etkinlik serisini Türkiye\'ye getirerek 30 milyon+ organik görüntüleme elde etti',
      '"Taş Tepeler" inisiyatifinde Göbeklitepe dahil 12 arkeolojik alanın isimlendirmeden lansmana kadar sürecine katkı sağladı',
      '17 ülkeden 50 gazeteci ile PR coverage; Kültür ve Turizm Bakanı\'nın katılımıyla global görünürlük artırıldı',
    ],
  },
  {
    company: 'Coca-Cola İçecek',
    role: 'Trade Marketing Specialist',
    period: 'Ekim 2019 - Ocak 2021',
    location: 'İstanbul, TR',
    type: 'corporate',
    accent: 'from-red-400/70 to-rose-400/50',
    highlights: [
      '11 marka genelinde brand ve marketing ekipleri arasında talep planlaması yönetimi',
      'Tüm perakende kanallarında görünürlük materyalleri planlayıp hayata geçirdi',
      'Promosyon kampanyaları için saha uygulamaları tasarlayıp ROI raporlaması yaptı',
    ],
  },
  {
    company: 'Red Bull',
    role: 'Shopper Marketing Specialist',
    period: 'Temmuz 2018 - Ekim 2019',
    location: 'İstanbul, TR',
    type: 'corporate',
    accent: 'from-yellow-400/70 to-amber-400/50',
    highlights: [
      'Modern ve geleneksel perakendede tüketici aktivasyonları planlayıp yürüttü',
      'Türkiye genelinde PoP, PoS ve soğutucu dağıtım ve yerleşimini yönetti',
      'Flugtag, Pac-Man, Red Bull Music Festivalleri gibi global aktivasyonların yerelleştirilmesini koordine etti',
    ],
  },
  {
    company: 'Kendi Girişimi',
    role: 'E-ticaret Girişimcisi',
    period: '2015 - 2018',
    location: 'İstanbul, TR',
    type: 'entrepreneurship',
    accent: 'from-amber-400/70 to-yellow-400/50',
    highlights: [
      'Made-to-order neon tabelalar ve wind wheel sistemleri tasarlayıp üretti',
      'Etsy ve Shopify üzerinden uçtan uca satış operasyonu kurdu: ürün geliştirme, fotoğrafçılık, SEO, pazarlama, müşteri hizmetleri, lojistik',
      'Pazar analizi sonrası stratejik karar ile sonlandırıldı — Etsy\'deki en iyi satıcılar bile yeterli kar marjına sahip değildi',
    ],
  },
]

const education: Education[] = [
  {
    school: 'İstanbul Teknik Üniversitesi',
    degree: 'Yüksek Lisans (MSc)',
    field: 'İşletme / Management',
    period: '2024',
    note: 'Tez: Retention ve community yönetimi. Akademiyi de growth lens\'inden yaptım.',
  },
  {
    school: 'Boğaziçi Üniversitesi',
    degree: 'Lisans (BA)',
    field: 'Uluslararası Ticaret (İngilizce)',
    period: '2018',
    note: 'Tüm seçmelileri marketing\'den aldım. Okurken 3 yıl kendi e-ticaret girişimimi yönettim. Teorik kalmadım.',
  },
]

const skillCategories = [
  { title: 'Growth & Acquisition', skills: ['User Acquisition', 'Growth Marketing', 'Performance Marketing', 'SEO', 'Content Strategy'] },
  { title: 'Reklam & Analitik', skills: ['Google Ads', 'Meta', 'TikTok', 'Twitch', 'AppsFlyer', 'Adjust', 'Google Analytics', 'Firebase'] },
  { title: 'CRM & Retention', skills: ['Braze', 'Lifecycle Automation', 'Push & Email Journeys', 'Segmentation'] },
  { title: 'Web3 & Blockchain', skills: ['Tokenomics', 'Airdrop Mechanics', 'Wallet Analytics', 'Web3 Marketing Strategy'] },
  { title: 'AI & Teknik', skills: ['Claude', 'ChatGPT', 'Manus', 'Gemini', 'Python', 'Midjourney', 'Stable Diffusion', 'Runway'] },
  { title: 'Marka & İletişim', skills: ['Brand Partnerships', 'Co-Branding', 'Event Marketing', 'Community Management', 'Social Media'] },
]

const contactOptions = [
  {
    title: 'Bir şeyler yapalım',
    description: 'AI, growth, ürün &mdash; ne olursa. Bir kahve içelim.',
    cta: 'Mail at',
    href: 'mailto:alperen.demirdoger@gmail.com?subject=Merhaba%20Alperen',
    isPrimary: true,
  },
  {
    title: 'Proje ortaklığı',
    description: 'Birlikte build edelim. Open to collab.',
    cta: 'Yaz bana',
    href: 'mailto:alperen.demirdoger@gmail.com?subject=Proje%20Ortakligi',
    isPrimary: false,
  },
  {
    title: 'İş fırsatları',
    description: 'Growth, marketing, AI &mdash; doğru rolse konuşalım.',
    cta: "LinkedIn'de bağlan",
    href: 'https://linkedin.com/in/alperen-demird%C3%B6%C4%9Fer-68b726aa',
    isPrimary: false,
  },
]

const floatingOrbs = [
  { classes: 'top-[-8%] left-[12%] bg-cyan-400/15 blur-3xl h-48 w-48', dx: [0, 30, 0], dy: [0, -20, 0] },
  { classes: 'top-[30%] right-[6%] bg-indigo-500/20 blur-3xl h-56 w-56', dx: [0, -20, 0], dy: [0, 15, 0] },
  { classes: 'top-[55%] left-[28%] bg-emerald-400/15 blur-3xl h-44 w-44', dx: [0, 25, 0], dy: [0, -30, 0] },
  { classes: 'top-[15%] right-[35%] bg-purple-400/10 blur-3xl h-40 w-40', dx: [0, -15, 0], dy: [0, 20, 0] },
  { classes: 'top-[80%] left-[50%] bg-cyan-400/10 blur-3xl h-52 w-52', dx: [0, 20, 0], dy: [0, -15, 0] },
]

/* ──────────────────────────── ANIMATION ──────────────────────────── */

const fadeIn: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.08 * i, duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  }),
}

const typeColors: Record<string, string> = {
  feat: 'bg-emerald-400',
  fix: 'bg-orange-400',
  perf: 'bg-blue-400',
  chore: 'bg-slate-400',
  other: 'bg-purple-400',
}

const typeLabels: Record<string, string> = {
  feat: 'Yeni Özellik',
  fix: 'Düzeltme',
  perf: 'Performans',
  chore: 'Bakım',
  other: 'Diğer',
}

/* ──────────────────────────── HELPERS ──────────────────────────── */

function timeAgo(dateStr: string): string {
  const now = new Date()
  const date = new Date(dateStr)
  const diffMs = now.getTime() - date.getTime()
  const diffMins = Math.floor(diffMs / 60000)
  if (diffMins < 60) return `${diffMins} dk önce`
  const diffHours = Math.floor(diffMins / 60)
  if (diffHours < 24) return `${diffHours} saat önce`
  const diffDays = Math.floor(diffHours / 24)
  if (diffDays < 7) return `${diffDays} gün önce`
  return date.toLocaleDateString('tr-TR', { day: 'numeric', month: 'short' })
}

function SectionDivider() {
  return (
    <div className="flex justify-center my-20 md:my-24">
      <div className="h-px w-40 bg-gradient-to-r from-transparent via-white/15 to-transparent" />
    </div>
  )
}

/* ──────────────────────────── APP ──────────────────────────── */

function App() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [projectFilter, setProjectFilter] = useState<'all' | 'active' | 'paused'>('all')
  const [expandedExp, setExpandedExp] = useState<string | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const [githubCommits, setGithubCommits] = useState<GitHubCommit[]>([])
  const [serviceCategory, setServiceCategory] = useState<ServiceCategory>('all')
  const [expandedService, setExpandedService] = useState<string | null>(null)
  const { scrollYProgress } = useScroll()

  // GitHub activity fetch
  useEffect(() => {
    fetch('https://api.github.com/users/alperendemirdoger/events/public?per_page=30')
      .then((res) => res.json())
      .then((events: Array<{ type: string; repo: { name: string }; created_at: string; payload: { commits?: Array<{ message: string; sha: string }> } }>) => {
        const commits: GitHubCommit[] = []
        for (const event of events) {
          if (event.type === 'PushEvent' && event.payload.commits) {
            for (const commit of event.payload.commits) {
              commits.push({
                repo: event.repo.name.split('/')[1] || event.repo.name,
                message: commit.message.split('\n')[0],
                date: event.created_at,
                url: `https://github.com/${event.repo.name}/commit/${commit.sha}`,
              })
            }
          }
        }
        setGithubCommits(commits.slice(0, 15))
      })
      .catch(() => {})
  }, [])

  // Active section tracking
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        }
      },
      { rootMargin: '-40% 0px -40% 0px' }
    )
    document.querySelectorAll('section[id]').forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  return (
    <div className="relative min-h-screen overflow-hidden bg-night text-slate-100">
      {/* Scroll progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-emerald-400 via-cyan-300 to-indigo-400 z-50 origin-left"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Background */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(92,225,230,0.10),transparent_30%),radial-gradient(circle_at_80%_20%,rgba(124,140,255,0.12),transparent_30%),radial-gradient(circle_at_40%_75%,rgba(16,185,129,0.12),transparent_35%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(210deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[length:180px_180px]" />
        {floatingOrbs.map((orb, index) => (
          <motion.div
            key={index}
            className={`absolute rounded-full ${orb.classes}`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{
              opacity: 1,
              scale: 1,
              x: orb.dx,
              y: orb.dy,
            }}
            transition={{
              opacity: { delay: 0.4 + index * 0.1, duration: 1.8 },
              x: { duration: 20 + index * 5, repeat: Infinity, ease: 'easeInOut' },
              y: { duration: 15 + index * 5, repeat: Infinity, ease: 'easeInOut' },
            }}
          />
        ))}
      </div>

      {/* ─────────── Header ─────────── */}
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-night/80 border-b border-white/5">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
          <a href="#" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/5 border border-white/10 shadow-glow">
              <span className="text-lg font-semibold text-white">NS</span>
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-base font-semibold tracking-tight text-white">Nova Sapiens</span>
              <span className="text-xs text-slate-400">AI Hub</span>
            </div>
          </a>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-8 text-sm text-slate-300 md:flex">
            {navLinks.map((item) => (
              <motion.a
                key={item.label}
                href={item.href}
                whileHover={{ y: -2 }}
                className={`relative transition-colors ${
                  activeSection === item.href.slice(1) ? 'text-cyan-300' : 'hover:text-white'
                }`}
              >
                {item.label}
                {activeSection === item.href.slice(1) && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-400 to-emerald-400 rounded-full"
                  />
                )}
              </motion.a>
            ))}
          </nav>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Menu"
          >
            <motion.span className="block h-0.5 w-6 bg-white rounded-full" animate={mobileMenuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }} />
            <motion.span className="block h-0.5 w-6 bg-white rounded-full" animate={mobileMenuOpen ? { opacity: 0 } : { opacity: 1 }} />
            <motion.span className="block h-0.5 w-6 bg-white rounded-full" animate={mobileMenuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }} />
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.nav
              className="md:hidden border-t border-white/5 bg-night/95 backdrop-blur-xl overflow-hidden"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="px-6 py-4 space-y-3">
                {navLinks.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block text-sm py-2 ${
                      activeSection === item.href.slice(1) ? 'text-cyan-300' : 'text-slate-300'
                    }`}
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>

      <main className="relative z-10 max-w-6xl mx-auto px-6 pb-16 md:pb-24">
        {/* ─────────── Hero ─────────── */}
        <section className="pt-12 mb-8">
          <motion.div
            className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 backdrop-blur mb-8"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
          >
            <span className="flex h-2 w-2 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-300 shadow-glow animate-pulse" />
            Build in public. Her gün bir adım.
          </motion.div>

          <motion.div className="space-y-5 mb-10" initial="hidden" animate="visible" variants={fadeIn} custom={1}>
            <h1 className="font-display text-4xl leading-tight text-white sm:text-5xl lg:text-6xl">
              Gündüz büyütüyorum.
              <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-200 via-cyan-200 to-indigo-200">
                Gece build ediyorum.
              </span>
            </h1>
            <p className="max-w-2xl text-lg text-slate-300 sm:text-xl leading-relaxed">
              Ben Alperen. Red Bull'dan Coca-Cola'ya, Web3 gaming'den Bakanlığa &mdash; 8 yıldır
              gürültüyü kesen kampanyalar kuruyorum. Gece de AI ile kendi ürünlerimi build ediyorum.
              İkisini birleştirince ortaya bu çıkıyor.
            </p>
          </motion.div>

          {/* Dual CTA */}
          <motion.div className="flex flex-wrap gap-4 mb-12" initial="hidden" animate="visible" variants={fadeIn} custom={2}>
            <motion.a
              href="#hizmetler"
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-400 via-cyan-300 to-indigo-300 px-7 py-3.5 text-sm font-semibold text-slate-900 shadow-glow transition"
            >
              Hadi konuşalım
              <span>&rarr;</span>
            </motion.a>
            <motion.a
              href="#projeler"
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur transition hover:border-cyan-400/50"
            >
              Projelere bak
            </motion.a>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-2xl"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            custom={3}
          >
            {heroStats.map((stat) => (
              <div key={stat.label} className="text-center sm:text-left">
                <p className="text-3xl font-bold font-display text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-300">
                  {stat.value}
                </p>
                <p className="text-xs text-slate-400 mt-1">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </section>

        {/* ─────────── GitHub Activity Feed ─────────── */}
        {githubCommits.length > 0 && (
          <motion.section
            className="mb-8"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            custom={4}
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <h3 className="text-sm font-medium text-slate-400 uppercase tracking-wider">Build in Public</h3>
            </div>

            <div className="flex gap-4 overflow-x-auto pb-3 scrollbar-hide -mx-2 px-2">
              {githubCommits.map((commit, i) => (
                <motion.div
                  key={`${commit.url}-${i}`}
                  className="shrink-0 w-72 rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur group hover:border-cyan-400/30 transition-colors"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs px-2 py-0.5 rounded-full bg-cyan-400/15 text-cyan-300 font-medium">
                      {commit.repo}
                    </span>
                    <span className="text-xs text-slate-500">{timeAgo(commit.date)}</span>
                  </div>
                  <p className="text-sm text-slate-300 mb-3 line-clamp-2">{commit.message}</p>
                  <div className="flex items-center gap-3">
                    <a
                      href={commit.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-slate-500 hover:text-cyan-300 transition-colors"
                    >
                      GitHub &rarr;
                    </a>
                    <a
                      href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`${commit.repo}: ${commit.message}`)}&url=${encodeURIComponent(commit.url)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-slate-500 hover:text-cyan-300 transition-colors"
                    >
                      Twitter'da Paylaş
                    </a>
                    <a
                      href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(commit.url)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-slate-500 hover:text-cyan-300 transition-colors"
                    >
                      LinkedIn
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        <SectionDivider />

        {/* ─────────── Services Section ─────────── */}
        <section id="hizmetler" className="mb-8">
          <motion.div
            className="mb-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={fadeIn}
          >
            <span className="text-xs font-semibold uppercase tracking-widest text-cyan-400 mb-3 block">Hizmetler</span>
            <h2 className="text-3xl font-display font-semibold text-white mb-2">Senin için ne yapabilirim?</h2>
            <p className="text-slate-400 max-w-2xl">
              Sadece danışmanlık değil. Her paketin arkasında kendi build ettiğim araçlar var.
            </p>
          </motion.div>

          {/* Category filter pills */}
          <div className="flex flex-wrap gap-2 mb-8">
            {([
              { key: 'all' as ServiceCategory, label: 'Tümü' },
              { key: 'strategy' as ServiceCategory, label: 'Strateji & Growth' },
              { key: 'ai' as ServiceCategory, label: 'AI & Otomasyon' },
              { key: 'data' as ServiceCategory, label: 'Veri & Analiz' },
              { key: 'production' as ServiceCategory, label: 'Üretim & E-ticaret' },
            ]).map((cat) => (
              <button
                key={cat.key}
                onClick={() => setServiceCategory(cat.key)}
                className={`text-xs px-4 py-2 rounded-full border transition-all ${
                  serviceCategory === cat.key
                    ? 'border-cyan-400/50 bg-cyan-400/10 text-cyan-300'
                    : 'border-white/10 bg-white/5 text-slate-400 hover:border-white/20'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Service cards */}
          <div className="grid gap-5 md:grid-cols-2">
            <AnimatePresence mode="popLayout">
              {consultingServices
                .filter((s) => serviceCategory === 'all' || s.category === serviceCategory)
                .map((service) => {
                  const isToolsOpen = expandedService === service.title
                  const liveCount = service.tools.filter((t) => t.status === 'live').length

                  return (
                    <motion.div
                      key={service.title}
                      layout
                      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur transition-all duration-300 hover:border-cyan-400/30 hover:bg-white/[0.07]"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/5 to-indigo-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="relative">
                        {/* Header row */}
                        <div className="flex items-start gap-4 mb-3">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400/20 to-indigo-400/20 border border-white/10">
                            <span className="text-xs font-bold text-cyan-300">{service.icon}</span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="text-base font-semibold text-white leading-tight">{service.title}</h3>
                            <p className="text-sm text-slate-400 mt-1 leading-relaxed">{service.description}</p>
                          </div>
                        </div>

                        {/* Deliverables - compact */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {service.deliverables.map((item) => (
                            <span key={item} className="inline-flex items-center gap-1 text-xs text-slate-400 bg-white/5 rounded-full px-2.5 py-1">
                              <span className="text-emerald-400">&check;</span>
                              {item}
                            </span>
                          ))}
                        </div>

                        {/* Tools toggle */}
                        <button
                          onClick={() => setExpandedService(isToolsOpen ? null : service.title)}
                          className="flex items-center gap-2 text-xs text-slate-500 hover:text-cyan-300 transition-colors w-full pt-3 border-t border-white/5"
                        >
                          <span className="flex items-center gap-1.5">
                            <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                            {liveCount} araç aktif
                          </span>
                          <span className="text-slate-600">&middot;</span>
                          <span>{service.tools.length} araç dahil</span>
                          <span className="ml-auto text-[10px]">{isToolsOpen ? '▲' : '▼'}</span>
                        </button>

                        {/* Tools - collapsible */}
                        <AnimatePresence>
                          {isToolsOpen && (
                            <motion.div
                              className="overflow-hidden"
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.25 }}
                            >
                              <div className="space-y-2 pt-3">
                                {service.tools.map((tool) => (
                                  <div key={tool.name} className="flex items-start gap-2 rounded-lg bg-white/[0.03] border border-white/5 px-3 py-2">
                                    <div className="flex-1 min-w-0">
                                      <div className="flex items-center gap-2 mb-0.5">
                                        <span className="text-sm font-medium text-white">{tool.name}</span>
                                        <span className={`shrink-0 text-[10px] px-1.5 py-0.5 rounded-full font-medium ${
                                          tool.status === 'live'
                                            ? 'bg-emerald-400/15 text-emerald-300'
                                            : tool.status === 'building'
                                            ? 'bg-amber-400/15 text-amber-300'
                                            : 'bg-slate-400/15 text-slate-400'
                                        }`}>
                                          {tool.status === 'live' ? 'Aktif' : tool.status === 'building' ? 'Geliştiriliyor' : 'Planlanıyor'}
                                        </span>
                                      </div>
                                      <p className="text-xs text-slate-500 leading-relaxed">{tool.description}</p>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </motion.div>
                  )
                })}
            </AnimatePresence>
          </div>

          {/* CTA banner */}
          <motion.div
            className="mt-10 rounded-2xl border border-cyan-400/20 bg-gradient-to-r from-cyan-400/5 via-indigo-400/5 to-emerald-400/5 p-8 text-center backdrop-blur"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <p className="text-lg text-white font-medium mb-5">30 dk konuşalım, yol haritanı çıkaralım</p>
            <motion.a
              href="mailto:alperen.demirdoger@gmail.com?subject=AI%20Danismanlik%20Gorusmesi"
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-400 via-cyan-300 to-indigo-300 px-8 py-3.5 text-sm font-semibold text-slate-900 shadow-glow transition"
            >
              Hadi konuşalım
              <span>&rarr;</span>
            </motion.a>
          </motion.div>
        </section>

        <SectionDivider />

        {/* ─────────── Projects Section ─────────── */}
        <section id="projeler" className="mb-8">
          <motion.div
            className="mb-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={fadeIn}
          >
            <span className="text-xs font-semibold uppercase tracking-widest text-emerald-400 mb-3 block">Kişisel Projeler</span>
            <h2 className="text-3xl font-display font-semibold text-white mb-2">Kendim için ne build ediyorum?</h2>
            <p className="text-slate-400 max-w-2xl">
              Gece kendi projelerimi ship ediyorum.
              Her biri gerçek bir problemi çözmek için var.
            </p>
          </motion.div>

          {/* Filter pills */}
          <div className="flex gap-2 mb-6">
            {(['all', 'active', 'paused'] as const).map((filter) => (
              <button
                key={filter}
                onClick={() => setProjectFilter(filter)}
                className={`text-xs px-4 py-2 rounded-full border transition-all ${
                  projectFilter === filter
                    ? 'border-cyan-400/50 bg-cyan-400/10 text-cyan-300'
                    : 'border-white/10 bg-white/5 text-slate-400 hover:border-white/20'
                }`}
              >
                {filter === 'all' ? 'Tümü' : filter === 'active' ? 'Aktif' : 'Beklemede'}
              </button>
            ))}
          </div>

          {/* Featured project - Dopa.Live */}
          {projectFilter !== 'paused' && (
            <motion.div
              className={`relative overflow-hidden rounded-2xl border p-8 backdrop-blur mb-6 cursor-pointer group transition-all duration-300 ${
                selectedProject?.id === 'dopa-live' ? 'border-cyan-400/50 bg-white/[0.07]' : 'border-white/10 bg-white/5 hover:border-white/20'
              }`}
              whileHover={{ y: -4 }}
              onClick={() => setSelectedProject(selectedProject?.id === 'dopa-live' ? null : projects[0])}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/10 to-cyan-400/5 opacity-60 group-hover:opacity-100 transition-opacity" />
              <div className="relative flex flex-col md:flex-row md:items-center gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs px-3 py-1 rounded-full bg-emerald-400/20 text-emerald-300 font-medium">
                      &#9733; Main quest
                    </span>
                    <span className="text-xs px-2 py-1 rounded-full bg-emerald-400/20 text-emerald-300">Aktif</span>
                  </div>
                  <h3 className="text-2xl font-display font-semibold text-white mb-2">{projects[0].name}</h3>
                  <p className="text-slate-300 mb-4">{projects[0].description}</p>
                  <div className="flex flex-wrap gap-2">
                    {projects[0].tech.map((t) => (
                      <span key={t} className="text-xs px-2.5 py-1 rounded-full bg-white/10 text-slate-200">{t}</span>
                    ))}
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-3xl font-bold font-display text-white">{projects[0].timeline.length}</p>
                  <p className="text-xs text-slate-400">güncelleme</p>
                  <p className="text-xs text-cyan-300 mt-2">Timeline'ı gör &rarr;</p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Remaining projects grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects
              .slice(1)
              .filter((p) => projectFilter === 'all' || p.status === projectFilter)
              .map((project, index) => (
                <motion.div
                  key={project.id}
                  className={`relative overflow-hidden rounded-2xl border bg-white/5 p-6 backdrop-blur cursor-pointer group transition-all duration-300 ${
                    selectedProject?.id === project.id
                      ? 'border-cyan-400/50 bg-white/[0.07]'
                      : 'border-white/10 hover:border-white/20'
                  }`}
                  whileHover={{ y: -4 }}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-40px' }}
                  variants={fadeIn}
                  custom={index}
                  onClick={() => setSelectedProject(selectedProject?.id === project.id ? null : project)}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${project.accent} opacity-20`} />
                  <div className="relative">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-lg font-semibold text-white">{project.name}</h3>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        project.status === 'active'
                          ? 'bg-emerald-400/20 text-emerald-300'
                          : project.status === 'completed'
                          ? 'bg-blue-400/20 text-blue-300'
                          : 'bg-slate-400/20 text-slate-300'
                      }`}>
                        {project.status === 'active' ? 'Aktif' : project.status === 'completed' ? 'Tamamlandı' : 'Beklemede'}
                      </span>
                    </div>
                    <p className="text-sm text-slate-300 mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tech.map((tech) => (
                        <span key={tech} className="text-xs px-2 py-1 rounded-full bg-white/10 text-slate-200">{tech}</span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <span>{project.timeline.length} güncelleme</span>
                      <div className="flex items-center gap-3">
                        {project.url && (
                          <a
                            href={project.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="text-emerald-300 hover:text-emerald-200 transition"
                          >
                            Canlı &rarr;
                          </a>
                        )}
                        <span className="text-cyan-300">Timeline &rarr;</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
          </div>

          {/* Timeline expansion */}
          <AnimatePresence>
            {selectedProject && selectedProject.timeline.length > 0 && (
              <motion.div
                className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4 }}
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-white">
                    {selectedProject.name} <span className="text-slate-400">Timeline</span>
                  </h3>
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="text-sm text-slate-400 hover:text-white transition-colors"
                  >
                    Kapat &times;
                  </button>
                </div>

                <div className="relative">
                  <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-400/50 via-indigo-400/30 to-transparent" />
                  <div className="space-y-6">
                    {selectedProject.timeline.map((item, index) => (
                      <motion.div
                        key={`${item.date}-${index}`}
                        className="relative pl-12"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div className={`absolute left-2.5 top-1.5 h-3 w-3 rounded-full ${typeColors[item.type]} ring-4 ring-night`} />
                        <div className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur">
                          <div className="flex items-center gap-3 mb-2">
                            <span className={`text-xs px-2 py-0.5 rounded-full ${typeColors[item.type]}/20 text-white`}>
                              {typeLabels[item.type]}
                            </span>
                            <span className="text-xs text-slate-400">{item.date}</span>
                          </div>
                          <h4 className="text-white font-medium">{item.title}</h4>
                          {item.description && (
                            <p className="text-sm text-slate-400 mt-1">{item.description}</p>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        <SectionDivider />

        {/* ─────────── CV Section ─────────── */}
        <section id="cv" className="mb-8">
          <motion.div
            className="mb-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={fadeIn}
          >
            <span className="text-xs font-semibold uppercase tracking-widest text-violet-400 mb-3 block">CV</span>
            <h2 className="text-3xl font-display font-semibold text-white mb-2">Nereden geliyorum?</h2>
            <p className="text-slate-400 max-w-2xl">
              FMCG'den blockchain'e, sahadan AI'ya &mdash; hep aynı şeyi yaptım: insanların dikkatini kazanıp tutmak.
              Araçlar değişti, oyun aynı.
            </p>
          </motion.div>

          {/* Quick stats bar */}
          <motion.div
            className="flex flex-wrap gap-4 mb-10"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            {[
              { value: '8+ yıl', color: 'text-cyan-300' },
              { value: '7 şirket', color: 'text-emerald-300' },
              { value: '1 girişim', color: 'text-amber-300' },
              { value: '3 ülke', color: 'text-violet-300' },
              { value: 'ITU MSc + Boğaziçi BA', color: 'text-indigo-300' },
            ].map((stat) => (
              <span key={stat.value} className={`text-xs px-3 py-1.5 rounded-full border border-white/10 bg-white/5 ${stat.color}`}>
                {stat.value}
              </span>
            ))}
          </motion.div>

          {/* Career timeline */}
          <div className="relative mb-12">
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-400/50 via-indigo-400/30 to-transparent" />

            <div className="space-y-5">
              {careerExperiences.map((exp, index) => {
                const isCurrent = index === 0
                const isExpanded = expandedExp === exp.company
                const visibleHighlights = isCurrent || isExpanded ? exp.highlights : exp.highlights.slice(0, 2)

                return (
                  <motion.div
                    key={exp.company}
                    className="relative pl-12"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-40px' }}
                    variants={fadeIn}
                    custom={index}
                  >
                    <div className={`absolute left-2.5 top-6 rounded-full ring-4 ring-night ${
                      isCurrent
                        ? 'h-4 w-4 bg-gradient-to-r from-cyan-400 to-emerald-400 animate-pulse'
                        : `h-3 w-3 bg-gradient-to-r ${exp.accent}`
                    }`} />

                    <div className={`relative overflow-hidden rounded-2xl border p-5 backdrop-blur transition-all ${
                      isCurrent
                        ? 'border-cyan-400/30 bg-white/[0.07] md:p-6'
                        : 'border-white/10 bg-white/5'
                    }`}>
                      <div className={`absolute inset-0 bg-gradient-to-br ${exp.accent} opacity-10`} />
                      <div className="relative">
                        <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-2">
                          <div>
                            {isCurrent && (
                              <span className="inline-flex text-xs px-3 py-1 rounded-full bg-cyan-400/15 text-cyan-300 font-medium mb-2">
                                Şu an buradayım
                              </span>
                            )}
                            <div className="flex items-center gap-2 mb-0.5">
                              <h3 className={`font-semibold text-white ${isCurrent ? 'text-lg' : 'text-base'}`}>{exp.company}</h3>
                              {exp.type === 'entrepreneurship' && (
                                <span className="text-xs px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300">Girişim</span>
                              )}
                            </div>
                            <p className="text-sm text-cyan-300">{exp.role}</p>
                          </div>
                          <div className="flex items-center gap-2 mt-1.5 md:mt-0 text-xs text-slate-400">
                            <span>{exp.period}</span>
                            <span className="hidden md:inline">&middot;</span>
                            <span className="hidden md:inline">{exp.location}</span>
                          </div>
                        </div>

                        <ul className="space-y-1.5 mt-3">
                          {visibleHighlights.map((highlight, i) => (
                            <li key={i} className="flex gap-2 text-sm text-slate-300">
                              <span className="text-cyan-400/60 mt-1 shrink-0">&#9656;</span>
                              <span>{highlight}</span>
                            </li>
                          ))}
                        </ul>
                        {!isCurrent && exp.highlights.length > 2 && (
                          <button
                            onClick={() => setExpandedExp(isExpanded ? null : exp.company)}
                            className="text-xs text-cyan-400 mt-2 hover:text-cyan-300 transition-colors"
                          >
                            {isExpanded ? 'Daha az göster' : `+${exp.highlights.length - 2} daha fazla`}
                          </button>
                        )}

                        {isCurrent && (
                          <div className="mt-4 pt-4 border-t border-white/5">
                            <p className="text-xs text-slate-400 mb-2 uppercase tracking-wider">AI Projeleri</p>
                            <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-3">
                              {goartAiProjects.map((project) => (
                                <div key={project.name} className="rounded-xl border border-white/5 bg-white/5 p-2.5">
                                  <h4 className="text-white text-sm font-medium mb-0.5">{project.name}</h4>
                                  <p className="text-xs text-slate-400 mb-1.5">{project.description}</p>
                                  <div className="flex flex-wrap gap-1">
                                    {project.tools.map((tool) => (
                                      <span key={tool} className="text-xs px-1.5 py-0.5 rounded-full bg-white/10 text-slate-300">{tool}</span>
                                    ))}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>

          {/* Education + Skills */}
          <div className="grid gap-6 lg:grid-cols-5">
            <motion.div
              className="lg:col-span-2"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              custom={1}
            >
              <h3 className="text-base font-semibold text-white mb-3">Eğitim</h3>
              <div className="space-y-3">
                {education.map((edu) => (
                  <div key={edu.school} className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur">
                    <h4 className="text-white font-medium text-sm">{edu.school}</h4>
                    <p className="text-xs text-cyan-300">{edu.degree} &mdash; {edu.field}</p>
                    <p className="text-xs text-slate-400 mt-1">{edu.period}</p>
                    <p className="text-xs text-slate-400 mt-1.5">{edu.note}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              className="lg:col-span-3"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              custom={2}
            >
              <h3 className="text-base font-semibold text-white mb-3">Yetenekler</h3>
              <div className="grid gap-3 sm:grid-cols-2">
                {skillCategories.map((category) => (
                  <div key={category.title} className="rounded-xl border border-white/10 bg-white/5 p-3 backdrop-blur">
                    <h4 className="text-xs font-medium text-cyan-300 mb-2">{category.title}</h4>
                    <div className="flex flex-wrap gap-1">
                      {category.skills.map((skill) => (
                        <span
                          key={skill}
                          className="text-xs px-2 py-0.5 rounded-full bg-white/10 text-slate-200"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        <SectionDivider />

        {/* ─────────── Contact Section ─────────── */}
        <section id="iletisim" className="mb-8">
          <motion.div
            className="mb-10 text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <span className="text-xs font-semibold uppercase tracking-widest text-emerald-400 mb-3 block">İletişim</span>
            <h2 className="text-3xl font-display font-semibold text-white mb-4">Hadi konuşalım.</h2>
            <p className="text-slate-400 max-w-lg mx-auto">DM at, mail at, ara. Formal olmana gerek yok.</p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-3 max-w-4xl mx-auto">
            {contactOptions.map((option, index) => (
              <motion.div
                key={option.title}
                className={`rounded-2xl border p-6 text-center backdrop-blur ${
                  option.isPrimary
                    ? 'border-cyan-400/30 bg-gradient-to-b from-white/[0.07] to-white/[0.03]'
                    : 'border-white/10 bg-white/5'
                }`}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                custom={index}
              >
                <h3 className="text-white font-semibold mb-2">{option.title}</h3>
                <p className="text-sm text-slate-400 mb-5">{option.description}</p>
                <motion.a
                  href={option.href}
                  target={option.href.startsWith('http') ? '_blank' : undefined}
                  rel={option.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  whileHover={{ y: -2, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition ${
                    option.isPrimary
                      ? 'bg-gradient-to-r from-emerald-400 via-cyan-300 to-indigo-300 text-slate-900 shadow-glow'
                      : 'border border-white/20 bg-white/5 text-white hover:border-cyan-400/50'
                  }`}
                >
                  {option.cta}
                </motion.a>
              </motion.div>
            ))}
          </div>

          {/* Direct contact info */}
          <motion.div
            className="flex flex-wrap items-center justify-center gap-6 mt-8 text-sm text-slate-400"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <a href="mailto:alperen.demirdoger@gmail.com" className="hover:text-cyan-300 transition-colors">
              alperen.demirdoger@gmail.com
            </a>
            <span className="hidden md:inline text-slate-600">|</span>
            <a href="tel:+905544354434" className="hover:text-cyan-300 transition-colors">
              +90 554 435 44 34
            </a>
            <span className="hidden md:inline text-slate-600">|</span>
            <a
              href="https://linkedin.com/in/alperen-demird%C3%B6%C4%9Fer-68b726aa"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-cyan-300 transition-colors"
            >
              LinkedIn
            </a>
          </motion.div>
        </section>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/5 py-8">
        <div className="max-w-6xl mx-auto px-6 text-center text-sm text-slate-500">
          <p>&copy; 2026 Nova Sapiens. Tüm hakları saklıdır.</p>
        </div>
      </footer>
    </div>
  )
}

export default App
