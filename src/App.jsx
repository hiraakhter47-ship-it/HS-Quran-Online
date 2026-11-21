import { lazy } from 'react'
import { Route, Routes } from 'react-router'
import Layout from './app/Layout.jsx'
import LegacyRedirect from './app/LegacyRedirect.jsx'
import { LEGACY_REDIRECTS, ROUTES } from './app/routes.js'
import HomePage from './pages/HomePage.jsx'

// The homepage is part of the main bundle; every other page loads on demand.
const AboutPage = lazy(() => import('./pages/AboutPage.jsx'))
const BookDemoPage = lazy(() => import('./pages/BookDemoPage.jsx'))
const ContactPage = lazy(() => import('./pages/ContactPage.jsx'))
const CoursesPage = lazy(() => import('./pages/CoursesPage.jsx'))
const DigitalQuranPage = lazy(() => import('./pages/DigitalQuranPage.jsx'))
const HowItWorksPage = lazy(() => import('./pages/HowItWorksPage.jsx'))
const MaterialsPage = lazy(() => import('./pages/MaterialsPage.jsx'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage.jsx'))
const PrivacyPolicyPage = lazy(() => import('./pages/PrivacyPolicyPage.jsx'))
const QuranReaderPage = lazy(() => import('./pages/QuranReaderPage.jsx'))
const SiparasPage = lazy(() => import('./pages/SiparasPage.jsx'))

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path={ROUTES.home} element={<HomePage />} />
        <Route path={ROUTES.about} element={<AboutPage />} />
        <Route path={ROUTES.howItWorks} element={<HowItWorksPage />} />
        <Route path={ROUTES.contact} element={<ContactPage />} />
        <Route path={ROUTES.bookDemo} element={<BookDemoPage />} />
        <Route path={ROUTES.courses} element={<CoursesPage />} />
        <Route path={ROUTES.privacyPolicy} element={<PrivacyPolicyPage />} />
        <Route path={ROUTES.quranResources} element={<MaterialsPage />} />
        <Route path={ROUTES.digitalQuran} element={<DigitalQuranPage />} />
        <Route path={ROUTES.siparas} element={<SiparasPage />} />
        <Route path={ROUTES.quranReader} element={<QuranReaderPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>

      {Object.entries(LEGACY_REDIRECTS).map(([from, to]) => (
        <Route key={from} path={from} element={<LegacyRedirect to={to} />} />
      ))}
    </Routes>
  )
}

export default App
