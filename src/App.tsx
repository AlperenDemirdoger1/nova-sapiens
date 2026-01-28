import { motion, type Variants } from 'framer-motion'
import { useState } from 'react'

const navLinks = [
  { label: 'Projeler', href: '#projeler' },
  { label: 'Hakkımda', href: '#hakkimda' },
  { label: 'İletişim', href: '#iletisim' },
]

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
}

const projects: Project[] = [
  {
    id: 'dopa-live',
    name: 'Dopa.Live',
    description: "ADHD'liler için AI destekli görev yönetimi ve odaklanma uygulaması",
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
    ]
  },
  {
    id: 'niyazi-sniper',
    name: 'Niyazi the Sniper',
    description: 'Akıllı web scraping ve otomasyon için Chrome extension',
    tech: ['Chrome Extension', 'TypeScript', 'Vite'],
    status: 'active',
    accent: 'from-orange-400/70 to-red-400/50',
    timeline: [
      { date: '2026-01-28', type: 'feat', title: 'Extension yapısı', description: 'Temel manifest ve popup' },
    ]
  },
  {
    id: 'wire-fire',
    name: 'Wire and Fire',
    description: 'Yapay zeka destekli içerik üretim platformu',
    tech: ['React', 'Node.js', 'OpenAI'],
    status: 'paused',
    accent: 'from-purple-400/70 to-pink-400/50',
    timeline: []
  },
]

const stats = [
  { label: 'Aktif Proje', value: '3' },
  { label: 'Toplam Commit', value: '50+' },
  { label: 'Kullanılan Tech', value: '12' },
]

const floatingOrbs = [
  'top-[-8%] left-[12%] bg-cyan-400/20 blur-3xl h-48 w-48',
  'top-[65%] right-[6%] bg-indigo-500/25 blur-3xl h-56 w-56',
  'top-[10%] right-[28%] bg-emerald-400/20 blur-3xl h-44 w-44',
]

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

function App() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  return (
    <div className="relative min-h-screen overflow-hidden bg-night text-slate-100">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(92,225,230,0.10),transparent_30%),radial-gradient(circle_at_80%_20%,rgba(124,140,255,0.12),transparent_30%),radial-gradient(circle_at_40%_75%,rgba(16,185,129,0.12),transparent_35%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(210deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[length:180px_180px]" />
        {floatingOrbs.map((classes, index) => (
          <motion.div
            key={classes}
            className={`absolute rounded-full ${classes}`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 + index * 0.1, duration: 1.8, ease: 'easeOut' }}
          />
        ))}
      </div>

      {/* Header */}
      <header className="relative z-10 max-w-6xl mx-auto flex items-center justify-between px-6 py-8">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/5 border border-white/10 shadow-glow">
            <span className="text-lg font-semibold text-white">NS</span>
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-base font-semibold tracking-tight text-white">Nova Sapiens</span>
            <span className="text-xs text-slate-400">AI Hub</span>
          </div>
        </div>

        <nav className="hidden items-center gap-8 text-sm text-slate-300 md:flex">
          {navLinks.map((item) => (
            <motion.a
              key={item.label}
              href={item.href}
              whileHover={{ color: '#5ce1e6', y: -2 }}
              className="transition-colors"
            >
              {item.label}
            </motion.a>
          ))}
        </nav>
      </header>

      <main className="relative z-10 max-w-6xl mx-auto px-6 pb-16 md:pb-24">
        {/* Hero Section */}
        <section className="mb-16">
          <motion.div
            className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 backdrop-blur mb-6"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
          >
            <span className="flex h-2 w-2 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-300 shadow-glow animate-pulse" />
            Sürekli geliştirme modunda
          </motion.div>

          <motion.div
            className="space-y-4 mb-8"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            custom={1}
          >
            <h1 className="font-display text-4xl leading-tight text-white sm:text-5xl lg:text-6xl">
              AI Projelerim. <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-200 via-cyan-200 to-indigo-200">Tek Çatı Altında.</span>
            </h1>
            <p className="max-w-2xl text-lg text-slate-300 sm:text-xl">
              Merhaba, ben Alperen. Yapay zeka ile projeler geliştiriyorum. Burada tüm projelerimi, gelişim süreçlerini ve öğrendiklerimi paylaşıyorum.
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="grid grid-cols-3 gap-4 max-w-md"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            custom={2}
          >
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-2xl font-bold text-white">{stat.value}</p>
                <p className="text-xs text-slate-400">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </section>

        {/* Projects Section */}
        <section id="projeler" className="mb-16">
          <motion.h2
            className="text-2xl font-semibold text-white mb-6"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            custom={3}
          >
            Projeler
          </motion.h2>

          <motion.div
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            custom={4}
          >
            {projects.map((project) => (
              <motion.div
                key={project.id}
                className={`relative overflow-hidden rounded-2xl border bg-white/5 p-6 backdrop-blur cursor-pointer ${
                  selectedProject?.id === project.id
                    ? 'border-cyan-400/50'
                    : 'border-white/10 hover:border-white/20'
                }`}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
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
                      <span key={tech} className="text-xs px-2 py-1 rounded-full bg-white/10 text-slate-200">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>{project.timeline.length} güncelleme</span>
                    <span className="text-cyan-300">Timeline'ı gör →</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Timeline Section */}
        {selectedProject && (
          <motion.section
            id="timeline"
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-white">
                {selectedProject.name} <span className="text-slate-400">Timeline</span>
              </h2>
              <button
                onClick={() => setSelectedProject(null)}
                className="text-sm text-slate-400 hover:text-white transition-colors"
              >
                Kapat ×
              </button>
            </div>

            <div className="relative">
              {/* Vertical line */}
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
                    {/* Dot */}
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
          </motion.section>
        )}

        {/* About Section */}
        <section id="hakkimda" className="mb-16">
          <motion.div
            className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            custom={5}
          >
            <h2 className="text-2xl font-semibold text-white mb-4">Hakkımda</h2>
            <p className="text-slate-300 mb-4">
              Yapay zeka ve yazılım geliştirme tutkusuyla projeler üretiyorum.
              Her projeyi sıfırdan tasarlıyor, geliştiriyor ve sürekli iyileştiriyorum.
              Bu site, yolculuğumu ve öğrendiklerimi paylaştığım alan.
            </p>
            <p className="text-slate-400 text-sm">
              Kullandığım teknolojiler: React, Next.js, TypeScript, Firebase, Tailwind CSS, OpenAI API ve daha fazlası.
            </p>
          </motion.div>
        </section>

        {/* Contact Section */}
        <section id="iletisim">
          <motion.div
            className="text-center"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            custom={6}
          >
            <h2 className="text-2xl font-semibold text-white mb-4">İletişim</h2>
            <p className="text-slate-300 mb-6">Projeler hakkında konuşmak ister misin?</p>
            <motion.a
              href="mailto:alperen@novasapiens.com"
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-emerald-400 via-cyan-300 to-indigo-300 px-6 py-3 text-sm font-semibold text-slate-900 shadow-glow transition"
            >
              Bana Ulaş
            </motion.a>
          </motion.div>
        </section>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 py-8">
        <div className="max-w-6xl mx-auto px-6 text-center text-sm text-slate-400">
          <p>© 2026 Nova Sapiens. Tüm hakları saklıdır.</p>
        </div>
      </footer>
    </div>
  )
}

export default App
