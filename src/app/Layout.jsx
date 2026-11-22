import { Suspense } from 'react'
import { Outlet } from 'react-router'
import Header from '../components/layout/Header.jsx'
import SiteFooter from '../components/layout/SiteFooter.jsx'
import WhatsAppFloat from '../components/ui/WhatsAppFloat.jsx'
import { scrollToSection } from '../lib/scrollToSection.js'
import ScrollManager from './ScrollManager.jsx'

// Shown briefly while a page's code is downloading.
function PageLoader() {
  return (
    <div className="page-loader" role="status">
      <span className="page-loader-spinner" aria-hidden="true" />
      <span className="visually-hidden">Loading page…</span>
    </div>
  )
}

function Layout() {
  return (
    <>
      <ScrollManager />
      <a className="skip-link" href="#main-content" onClick={scrollToSection}>Skip to content</a>
      <Header />
      <main id="main-content" tabIndex={-1}>
        <Suspense fallback={<PageLoader />}>
          <Outlet />
        </Suspense>
      </main>
      <SiteFooter />
      <WhatsAppFloat />
    </>
  )
}

export default Layout
