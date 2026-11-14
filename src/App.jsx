import { useEffect } from 'react'
import AboutPage from './components/AboutPage.jsx'
import ChaptersPage from './components/ChaptersPage.jsx'
import ContactPage from './components/ContactPage.jsx'
import DigitalQuranPage from './components/DigitalQuranPage.jsx'
import Header from './components/Header.jsx'
import HomePage from './components/HomePage.jsx'
import HowItWorksPage from './components/HowItWorksPage.jsx'
import MaterialsPage from './components/MaterialsPage.jsx'
import QuranReaderPage from './components/QuranReaderPage.jsx'
import SiteFooter from './components/SiteFooter.jsx'

const pageDetails = {
  home: {
    title: 'HS Quran Online | Learn Quran with Confidence',
    classes: [],
  },
  about: { title: 'About Us | HS Quran Online', classes: ['about-page'] },
  how: {
    title: 'How It Works | HS Quran Online',
    classes: ['how-it-works-page'],
  },
  materials: {
    title: 'Learning Materials | HS Quran Online',
    classes: ['materials-page'],
  },
  contact: {
    title: 'Contact Us | HS Quran Online',
    classes: ['contact-page'],
  },
  chapters: {
    title: 'Quran Siparas | HS Quran Online',
    classes: ['chapters-directory-page'],
  },
  digital: {
    title: 'Digital Holy Quran | HS Quran Online',
    classes: ['digital-quran-page'],
  },
  reader: {
    title: 'Quran Reader | HS Quran Online',
    classes: ['reader-page'],
  },
}

function getCurrentPage() {
  const path = window.location.pathname.toLowerCase()
  if (path.endsWith('/about.html') || path.endsWith('/about')) return 'about'
  if (path.endsWith('/how-it-works.html') || path.endsWith('/how-it-works')) return 'how'
  if (path.endsWith('/materials.html') || path.endsWith('/materials')) return 'materials'
  if (path.endsWith('/contact.html') || path.endsWith('/contact')) return 'contact'
  if (path.endsWith('/chapters.html') || path.endsWith('/chapters')) return 'chapters'
  if (path.endsWith('/digital-quran.html') || path.endsWith('/digital-quran')) return 'digital'
  if (path.endsWith('/quran-reader.html') || path.endsWith('/quran-reader')) return 'reader'
  return 'home'
}

function CurrentPage({ page }) {
  switch (page) {
    case 'about':
      return <AboutPage />
    case 'how':
      return <HowItWorksPage />
    case 'materials':
      return <MaterialsPage />
    case 'contact':
      return <ContactPage />
    case 'chapters':
      return <ChaptersPage mode="sipara" />
    case 'digital':
      return <DigitalQuranPage />
    case 'reader':
      return <QuranReaderPage />
    default:
      return <HomePage />
  }
}

function App() {
  const page = getCurrentPage()
  const details = pageDetails[page]
  const isSiparaReader =
    page === 'reader' && new URLSearchParams(window.location.search).has('sipara')

  useEffect(() => {
    document.title = details.title
    const classes = [...details.classes]
    if (isSiparaReader) classes.push('sipara-reader-page')
    document.body.classList.add(...classes)

    return () => document.body.classList.remove(...classes)
  }, [details, isSiparaReader])

  return (
    <>
      <div className="announcement">
        <strong>HS Quran Online</strong>&nbsp; · &nbsp;Online Quran learning for all ages
      </div>
      <Header />
      <main>
        <CurrentPage page={page} />
      </main>
      <SiteFooter />
    </>
  )
}

export default App
