import { createContext, useContext, useState, type ReactNode } from 'react'

type Language = 'tr' | 'en'

interface I18nContextType {
  lang: Language
  setLang: (lang: Language) => void
  t: (key: string) => string
}

const translations: Record<Language, Record<string, string>> = {
  tr: {
    // Navigation
    'nav.services': 'Ne Yapabilirim',
    'nav.projects': 'Projeler',
    'nav.cv': 'CV',
    'nav.contact': 'İletişim',

    // Hero
    'hero.title.day': 'Gündüz büyütüyorum.',
    'hero.title.night': 'Gece build ediyorum.',
    'hero.subtitle': 'Ben Alperen. Red Bull\'dan Coca-Cola\'ya, Web3 gaming\'den Bakanlığa. 10+ yıldır gürültüde farkedilen kampanyalar kuruyorum. Gece de AI ile kendi ürünlerimi build ediyorum.',
    'hero.cta.services': 'Ne yapabilirim?',
    'hero.cta.projects': 'Projelerime bak',
    'hero.stat.users': 'Kullanıcı Kazanımı',
    'hero.stat.years': 'Yıl Deneyim',
    'hero.stat.projects': 'Aktif Proje',
    'hero.stat.budget': 'Yönetilen Bütçe',

    // GitHub Activity
    'github.title': 'Build in Public',
    'github.share.twitter': 'Twitter\'da Paylaş',

    // CV Section
    'cv.badge': 'CV',
    'cv.title': 'Nereden geliyorum?',
    'cv.subtitle': 'FMCG\'den blockchain\'e, sahadan AI\'ya. Hep aynı şeyi yaptım: insanların dikkatini kazanıp tutmak. Araçlar değişti, oyun aynı.',
    'cv.stat.years': '10+ yıl',
    'cv.stat.companies': '7 şirket',
    'cv.stat.startup': '1 girişim',
    'cv.stat.education': 'ITU MSc + Boğaziçi BA',
    'cv.portfolio.title': 'Büyüttüğüm Ürünler',
    'cv.portfolio.total': '2.5M+ indirme',
    'cv.current': 'Şu an buradayım',
    'cv.badge.startup': 'Girişim',
    'cv.badge.internship': 'Staj',
    'cv.expand': 'Detayları gör ▼',
    'cv.collapse': 'Detayları gizle ▲',
    'cv.education': 'Eğitim',
    'cv.skills': 'Yetenekler',
    'cv.keyMetrics': 'Key Metrics',
    'cv.keyProjects': 'Key Projects',
    'cv.tools': 'Tools',

    // Projects Section
    'projects.badge': 'Kişisel Projeler',
    'projects.title': 'Kendim için ne build ediyorum?',
    'projects.subtitle': 'Gece kendi projelerimi ship ediyorum. Her biri gerçek bir problemi çözmek için var.',
    'projects.featured': '★ Main quest',
    'projects.status.active': 'Aktif',
    'projects.status.completed': 'Tamamlandı',
    'projects.status.paused': 'Beklemede',
    'projects.updates': 'güncelleme',
    'projects.viewTimeline': 'Timeline\'ı gör →',
    'projects.live': 'Canlı →',
    'projects.timeline': 'Timeline →',
    'projects.close': 'Kapat',

    // Services Section
    'services.title': 'Senin için ne yapabilirim?',
    'services.subtitle': 'Sadece danışmanlık değil. Her paketin arkasında kendi build ettiğim araçlar var.',
    'services.filter.all': 'Tümü',
    'services.filter.strategy': 'Strateji & Growth',
    'services.filter.ai': 'AI & Otomasyon',
    'services.filter.data': 'Veri & Analiz',
    'services.filter.production': 'Üretim & E-ticaret',
    'services.cta.text': '30 dk konuşalım, yol haritanı çıkaralım',
    'services.cta.button': 'Hadi konuşalım',

    // Contact Section
    'contact.badge': 'İletişim',
    'contact.title': 'Hadi konuşalım.',
    'contact.subtitle': 'DM at, mail at, ara. Formal olmana gerek yok.',
    'contact.option1.title': 'Bir şeyler yapalım',
    'contact.option1.description': 'AI, growth, ürün. Ne olursa. Bir kahve içelim.',
    'contact.option1.cta': 'Mail at',
    'contact.option2.title': 'Proje ortaklığı',
    'contact.option2.description': 'Birlikte build edelim. Open to collab.',
    'contact.option2.cta': 'Yaz bana',
    'contact.option3.title': 'İş fırsatları',
    'contact.option3.description': 'Growth, marketing, AI. Doğru rolse konuşalım.',
    'contact.option3.cta': 'LinkedIn\'de bağlan',

    // Footer
    'footer.rights': 'Tüm hakları saklıdır.',

    // Timeline types
    'timeline.feat': 'Özellik',
    'timeline.fix': 'Düzeltme',
    'timeline.update': 'Güncelleme',
    'timeline.launch': 'Lansman',
  },
  en: {
    // Navigation
    'nav.services': 'What I Do',
    'nav.projects': 'Projects',
    'nav.cv': 'CV',
    'nav.contact': 'Contact',

    // Hero
    'hero.title.day': 'I grow by day.',
    'hero.title.night': 'I build by night.',
    'hero.subtitle': 'I\'m Alperen. From Red Bull to Coca-Cola, Web3 gaming to Ministry. 10+ years of building campaigns that cut through the noise. At night, I ship my own products with AI.',
    'hero.cta.services': 'What can I do?',
    'hero.cta.projects': 'View my projects',
    'hero.stat.users': 'User Acquisition',
    'hero.stat.years': 'Years Experience',
    'hero.stat.projects': 'Active Projects',
    'hero.stat.budget': 'Budget Managed',

    // GitHub Activity
    'github.title': 'Build in Public',
    'github.share.twitter': 'Share on Twitter',

    // CV Section
    'cv.badge': 'CV',
    'cv.title': 'Where do I come from?',
    'cv.subtitle': 'From FMCG to blockchain, from field to AI. Always did the same thing: capturing and keeping attention. Tools changed, the game remains.',
    'cv.stat.years': '10+ years',
    'cv.stat.companies': '7 companies',
    'cv.stat.startup': '1 startup',
    'cv.stat.education': 'ITU MSc + Boğaziçi BA',
    'cv.portfolio.title': 'Products I\'ve Grown',
    'cv.portfolio.total': '2.5M+ downloads',
    'cv.current': 'Currently here',
    'cv.badge.startup': 'Startup',
    'cv.badge.internship': 'Internship',
    'cv.expand': 'View details ▼',
    'cv.collapse': 'Hide details ▲',
    'cv.education': 'Education',
    'cv.skills': 'Skills',
    'cv.keyMetrics': 'Key Metrics',
    'cv.keyProjects': 'Key Projects',
    'cv.tools': 'Tools',

    // Projects Section
    'projects.badge': 'Personal Projects',
    'projects.title': 'What am I building for myself?',
    'projects.subtitle': 'I ship my own projects at night. Each one exists to solve a real problem.',
    'projects.featured': '★ Main quest',
    'projects.status.active': 'Active',
    'projects.status.completed': 'Completed',
    'projects.status.paused': 'Paused',
    'projects.updates': 'updates',
    'projects.viewTimeline': 'View Timeline →',
    'projects.live': 'Live →',
    'projects.timeline': 'Timeline →',
    'projects.close': 'Close',

    // Services Section
    'services.title': 'What can I do for you?',
    'services.subtitle': 'Not just consulting. There are tools I\'ve built behind every package.',
    'services.filter.all': 'All',
    'services.filter.strategy': 'Strategy & Growth',
    'services.filter.ai': 'AI & Automation',
    'services.filter.data': 'Data & Analytics',
    'services.filter.production': 'Production & E-commerce',
    'services.cta.text': 'Let\'s chat for 30 min, map out your roadmap',
    'services.cta.button': 'Let\'s talk',

    // Contact Section
    'contact.badge': 'Contact',
    'contact.title': 'Let\'s talk.',
    'contact.subtitle': 'DM me, email me, call me. No need to be formal.',
    'contact.option1.title': 'Let\'s build something',
    'contact.option1.description': 'AI, growth, product. Whatever works. Let\'s grab a coffee.',
    'contact.option1.cta': 'Send Email',
    'contact.option2.title': 'Project Partnership',
    'contact.option2.description': 'Let\'s build together. Open to collab.',
    'contact.option2.cta': 'Write to me',
    'contact.option3.title': 'Job Opportunities',
    'contact.option3.description': 'Growth, marketing, AI. If it\'s the right role, let\'s talk.',
    'contact.option3.cta': 'Connect on LinkedIn',

    // Footer
    'footer.rights': 'All rights reserved.',

    // Timeline types
    'timeline.feat': 'Feature',
    'timeline.fix': 'Fix',
    'timeline.update': 'Update',
    'timeline.launch': 'Launch',
  },
}

// Data that needs language-specific versions
export const localizedData = {
  tr: {
    heroStats: [
      { value: '2.5M+', labelKey: 'hero.stat.users' },
      { value: '10+', labelKey: 'hero.stat.years' },
      { value: '20+', labelKey: 'hero.stat.projects' },
      { value: '$25M+', labelKey: 'hero.stat.budget' },
    ],
    consultingServices: [
      {
        category: 'ai',
        title: 'AI Workflow Kurulumu',
        description: 'Ekibiniz hala her şeyi elle mi yapıyor? Claude, GPT, Gemini, Manus ile süreçlerinizi otomatize ediyorum. Bizzat kullanıyorum, bizzat kuruyorum.',
      },
      {
        category: 'strategy',
        title: 'Growth & Kullanıcı Kazanımı',
        description: '2.5M kullanıcıyı nasıl kazandığımı biliyorum. UA, retention, lifecycle otomasyon, performans marketing. Somut rakamlarla konuşuyorum.',
      },
      {
        category: 'strategy',
        title: 'Web3 & Topluluk',
        description: 'Dubai TOKEN2049\'da şirketi temsil ettim, 100K+ topluluk yönettim. Blockchain projeleri için GTM, topluluk ve token lansman stratejisi kuruyorum.',
      },
      {
        category: 'data',
        title: 'Veri & Dashboard',
        description: 'Marketing analitiği, attribution, cohort analizi. Looker, Mixpanel, Amplitude. Veriyi aksiyona çeviren sistemler kuruyorum.',
      },
      {
        category: 'production',
        title: 'İçerik & Üretim',
        description: 'Video, grafik, podcast. Adobe suite, Figma, AI araçları. Yaratıcı üretim süreçlerini yönetiyorum.',
      },
      {
        category: 'production',
        title: 'E-ticaret & Amazon',
        description: 'Amazon FBA, Etsy, Shopify. Ürün listeleme, SEO, lojistik. Uluslararası satış operasyonu deneyimi.',
      },
    ],
    growthPortfolio: [
      { name: 'Bilet Dükkanı', downloads: '670K+', description: 'Etkinlik biletleme platformu', logo: '/logos/biletdukkani.png' },
      { name: 'Face Yourself', downloads: '540K+', description: 'Kişisel gelişim uygulaması', logo: '/logos/faceyourself.webp' },
      { name: 'GoArt Worlds', downloads: '455K+', description: 'Web3 gaming metaverse', logo: '/logos/goart.webp' },
      { name: 'Self Therapy', downloads: '440K+', description: 'Mental sağlık uygulaması', logo: '/logos/selftherapy.webp' },
      { name: 'Rise Online', downloads: '250K+', description: 'MMORPG oyun lansmanı', logo: '/logos/rise.png' },
      { name: 'Echoses', downloads: '54K+', description: 'Ses tabanlı sosyal platform', logo: '/logos/echoses.webp' },
      { name: 'Chakragram', downloads: '47K+', description: 'Human Design uygulaması', logo: '/logos/chakragram.webp' },
      { name: 'Tanos', downloads: '5.9K+', description: 'Günlük rutin takip uygulaması', logo: '/logos/tanos.webp' },
    ],
    projects: [
      {
        id: 'dopa-live',
        name: 'Dopa.Live',
        description: 'Startup kurucuları ve growth profesyonelleri için AI-powered canlı danışmanlık platformu. Real-time session\'lar, kalıcı context, actionable çıktılar.',
      },
      {
        id: 'nova-sapiens',
        name: 'Nova Sapiens',
        description: 'Şu an baktığın site. Build in public accountability hub\'ım. Meta, biliyorum.',
      },
      {
        id: 'dental-bot',
        name: 'Dental Bot',
        description: 'Diş klinikleri için WhatsApp AI asistanı. Randevu, bilgi, lead toplama, CRM entegrasyonu.',
      },
      {
        id: 'good-enough',
        name: 'Good Enough',
        description: 'Nörodiverjant aileler için empatik AI ebeveynlik koçu. Kişiselleştirilmiş onboarding, nöro-profil analizi ve 7/24 rehberlik.',
      },
    ],
    contactOptions: [
      {
        title: 'Bir şeyler yapalım',
        description: 'AI, growth, ürün. Ne olursa. Bir kahve içelim.',
        cta: 'Mail at',
      },
      {
        title: 'Proje ortaklığı',
        description: 'Birlikte build edelim. Open to collab.',
        cta: 'Yaz bana',
      },
      {
        title: 'İş fırsatları',
        description: 'Growth, marketing, AI. Doğru rolse konuşalım.',
        cta: 'LinkedIn\'de bağlan',
      },
    ],
  },
  en: {
    heroStats: [
      { value: '2.5M+', labelKey: 'hero.stat.users' },
      { value: '10+', labelKey: 'hero.stat.years' },
      { value: '20+', labelKey: 'hero.stat.projects' },
      { value: '$25M+', labelKey: 'hero.stat.budget' },
    ],
    consultingServices: [
      {
        category: 'ai',
        title: 'AI Workflow Setup',
        description: 'Is your team still doing everything manually? I automate your processes with Claude, GPT, Gemini, Manus. I use them, I set them up.',
      },
      {
        category: 'strategy',
        title: 'Growth & User Acquisition',
        description: 'I know how to acquire 2.5M users. UA, retention, lifecycle automation, performance marketing. I speak in concrete numbers.',
      },
      {
        category: 'strategy',
        title: 'Web3 & Community',
        description: 'Represented company at TOKEN2049 Dubai, managed 100K+ community. GTM, community and token launch strategy for blockchain projects.',
      },
      {
        category: 'data',
        title: 'Data & Dashboards',
        description: 'Marketing analytics, attribution, cohort analysis. Looker, Mixpanel, Amplitude. Building systems that turn data into action.',
      },
      {
        category: 'production',
        title: 'Content & Production',
        description: 'Video, graphics, podcast. Adobe suite, Figma, AI tools. Managing creative production processes.',
      },
      {
        category: 'production',
        title: 'E-commerce & Amazon',
        description: 'Amazon FBA, Etsy, Shopify. Product listing, SEO, logistics. International sales operation experience.',
      },
    ],
    growthPortfolio: [
      { name: 'Bilet Dükkanı', downloads: '670K+', description: 'Event ticketing platform', logo: '/logos/biletdukkani.png' },
      { name: 'Face Yourself', downloads: '540K+', description: 'Personal development app', logo: '/logos/faceyourself.webp' },
      { name: 'GoArt Worlds', downloads: '455K+', description: 'Web3 gaming metaverse', logo: '/logos/goart.webp' },
      { name: 'Self Therapy', downloads: '440K+', description: 'Mental health app', logo: '/logos/selftherapy.webp' },
      { name: 'Rise Online', downloads: '250K+', description: 'MMORPG game launch', logo: '/logos/rise.png' },
      { name: 'Echoses', downloads: '54K+', description: 'Voice-based social platform', logo: '/logos/echoses.webp' },
      { name: 'Chakragram', downloads: '47K+', description: 'Human Design app', logo: '/logos/chakragram.webp' },
      { name: 'Tanos', downloads: '5.9K+', description: 'Daily routine tracking app', logo: '/logos/tanos.webp' },
    ],
    projects: [
      {
        id: 'dopa-live',
        name: 'Dopa.Live',
        description: 'AI-powered live consulting platform for startup founders and growth professionals. Real-time sessions, persistent context, actionable outputs.',
      },
      {
        id: 'nova-sapiens',
        name: 'Nova Sapiens',
        description: 'The site you\'re looking at. My build in public accountability hub. Meta, I know.',
      },
      {
        id: 'dental-bot',
        name: 'Dental Bot',
        description: 'WhatsApp AI assistant for dental clinics. Appointments, information, lead collection, CRM integration.',
      },
      {
        id: 'good-enough',
        name: 'Good Enough',
        description: 'Empathetic AI parenting coach for neurodivergent families. Personalized onboarding, neuro-profile analysis and 24/7 guidance.',
      },
    ],
    contactOptions: [
      {
        title: 'Let\'s build something',
        description: 'AI, growth, product. Whatever works. Let\'s grab a coffee.',
        cta: 'Send Email',
      },
      {
        title: 'Project Partnership',
        description: 'Let\'s build together. Open to collab.',
        cta: 'Write to me',
      },
      {
        title: 'Job Opportunities',
        description: 'Growth, marketing, AI. If it\'s the right role, let\'s talk.',
        cta: 'Connect on LinkedIn',
      },
    ],
  },
}

const I18nContext = createContext<I18nContextType | undefined>(undefined)

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('lang')
      return (saved as Language) || 'tr'
    }
    return 'tr'
  })

  const handleSetLang = (newLang: Language) => {
    setLang(newLang)
    if (typeof window !== 'undefined') {
      localStorage.setItem('lang', newLang)
    }
  }

  const t = (key: string): string => {
    return translations[lang][key] || key
  }

  return (
    <I18nContext.Provider value={{ lang, setLang: handleSetLang, t }}>
      {children}
    </I18nContext.Provider>
  )
}

export function useI18n() {
  const context = useContext(I18nContext)
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider')
  }
  return context
}

export { translations }
export type { Language }
