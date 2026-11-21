// Search-engine titles and descriptions for every page, in one place.
// Also used at build time (vite.config.js) to generate sitemap.xml.
// Keep descriptions factual (no unverified claims) and around 150–160 characters.

export const PAGE_META = {
  home: {
    path: '/',
    title: null, // uses the default site title
    description:
      'One-to-one online Quran classes for children and adults. Learn Noorani Qaida, Quran reading, Tajweed, Hifz and more from home — book a free demo class.',
    priority: '1.0',
  },
  about: {
    path: '/about',
    title: 'About Us',
    description:
      'Learn about HS Quran Online — a caring online academy offering personal, one-to-one Quran classes for learners aged 3 to 80.',
    priority: '0.7',
  },
  courses: {
    path: '/courses',
    title: 'Online Quran Courses',
    description:
      'Explore our online Quran courses: Noorani Qaida, Quran Reading, Tajweed, Hifz, Translation & Tafseer and Islamic Studies — all taught one-to-one.',
    priority: '0.9',
  },
  howItWorks: {
    path: '/how-it-works',
    title: 'How It Works',
    description:
      'See how online Quran classes work at HS Quran Online: book a free demo, meet your tutor and start learning one-to-one from home.',
    priority: '0.7',
  },
  contact: {
    path: '/contact',
    title: 'Contact Us',
    description:
      'Contact HS Quran Online on WhatsApp, phone or email with any questions about our one-to-one online Quran classes.',
    priority: '0.6',
  },
  bookDemo: {
    path: '/book-demo',
    title: 'Book a Free Demo',
    description:
      'Book a free one-to-one online Quran demo class. Tell us about the learner and we’ll contact you on WhatsApp to arrange a time.',
    priority: '0.9',
  },
  quranResources: {
    path: '/quran',
    title: 'Learning Materials',
    description:
      'Free Quran learning resources: the Digital Quran, all 30 Siparas, Qaida, short Surahs and a Surah search.',
    priority: '0.6',
  },
  digitalQuran: {
    path: '/quran/digital',
    title: 'Digital Holy Quran',
    description:
      'Read the Holy Quran online — any Surah in Arabic with a translation in your language.',
    priority: '0.6',
  },
  siparas: {
    path: '/quran/siparas',
    title: 'Quran Siparas',
    description:
      'Read all 30 Siparas (Juz) of the Holy Quran online with Arabic text and English translation.',
    priority: '0.6',
  },
  quranReader: {
    path: '/quran/read',
    title: 'Quran Reader',
    description: 'Read the Holy Quran online with Arabic text and English translation.',
    inSitemap: false, // needs a ?chapter= or ?sipara= parameter
  },
  privacy: {
    path: '/privacy-policy',
    title: 'Privacy Policy',
    description:
      'How HS Quran Online collects, uses and protects the information you share when you book a free demo class or use our website.',
    priority: '0.3',
  },
  notFound: {
    title: 'Page Not Found',
    description: 'The page you are looking for could not be found.',
    noindex: true,
    inSitemap: false,
  },
}

// Paths listed in sitemap.xml.
export const SITEMAP_ENTRIES = Object.values(PAGE_META)
  .filter((page) => page.path && page.inSitemap !== false)
  .map(({ path, priority }) => ({ path, priority }))
