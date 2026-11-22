// Central list of site URLs. Use these instead of hard-coding paths.

export const ROUTES = {
  home: '/',
  about: '/about',
  howItWorks: '/how-it-works',
  contact: '/contact',
  quranResources: '/quran',
  digitalQuran: '/quran/digital',
  siparas: '/quran/siparas',
  quranReader: '/quran/read',
  bookDemo: '/book-demo',
  courses: '/courses',
  privacyPolicy: '/privacy-policy',
}

export const COURSES_LINK = ROUTES.courses
export const BOOK_DEMO_LINK = ROUTES.bookDemo

// Book a Free Demo page, optionally with a course pre-selected in the form.
export function bookDemoUrl(courseId) {
  return courseId ? `${ROUTES.bookDemo}?course=${encodeURIComponent(courseId)}` : ROUTES.bookDemo
}

// Main header navigation (also used by the footer "Explore" column).
// `isActive` decides which item is highlighted for the current location.
export const NAV_ITEMS = [
  { label: 'Home', to: ROUTES.home, isActive: ({ pathname }) => pathname === ROUTES.home },
  { label: 'Courses', to: COURSES_LINK, isActive: ({ pathname }) => pathname === ROUTES.courses },
  { label: 'How It Works', to: ROUTES.howItWorks, isActive: ({ pathname }) => pathname === ROUTES.howItWorks },
  { label: 'About Us', to: ROUTES.about, isActive: ({ pathname }) => pathname === ROUTES.about },
  { label: 'Contact', to: ROUTES.contact, isActive: ({ pathname }) => pathname === ROUTES.contact },
]

// Quran tools — linked from the footer "Quran Resources" column (not the header).
export const QURAN_RESOURCE_LINKS = [
  { label: 'Digital Quran', to: ROUTES.digitalQuran },
  { label: 'Quran Siparas', to: ROUTES.siparas },
  { label: 'Learning Materials', to: ROUTES.quranResources },
]

// Reader links keep the same query format as the original site:
//   ?chapter=<1-114>&from=digital-quran   or   ?sipara=<1-30>&from=chapters
export function surahReaderUrl(number, from = 'digital-quran') {
  return `${ROUTES.quranReader}?chapter=${number}&from=${from}`
}

export function siparaReaderUrl(number) {
  return `${ROUTES.quranReader}?sipara=${number}&from=chapters`
}

// Old static-site URLs → new routes. Handled in the browser (LegacyRedirect)
// and, except where query strings matter, also as permanent redirects in vercel.json.
export const LEGACY_REDIRECTS = {
  '/index.html': ROUTES.home,
  '/about.html': ROUTES.about,
  '/how-it-works.html': ROUTES.howItWorks,
  '/contact.html': ROUTES.contact,
  '/materials': ROUTES.quranResources,
  '/materials.html': ROUTES.quranResources,
  '/digital-quran': ROUTES.digitalQuran,
  '/digital-quran.html': ROUTES.digitalQuran,
  '/chapters': ROUTES.siparas,
  '/chapters.html': ROUTES.siparas,
  '/quran-reader': ROUTES.quranReader,
  '/quran-reader.html': ROUTES.quranReader,
}
