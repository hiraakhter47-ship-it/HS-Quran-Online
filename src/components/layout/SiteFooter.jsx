import { ArrowRight, ArrowUp, Mail, Phone } from 'lucide-react'
import { Link } from 'react-router'
import { BOOK_DEMO_LINK, NAV_ITEMS, QURAN_RESOURCE_LINKS, ROUTES } from '../../app/routes.js'
import { mailtoHref, site } from '../../config/site.js'
import WhatsAppIcon from '../ui/WhatsAppIcon.jsx'
import BrandLogo from './BrandLogo.jsx'

function scrollToTop() {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' })
}

function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <div className="footer-top">
          <div className="footer-brand">
            <BrandLogo />
            <p>{site.description}</p>
            <div className="footer-brand-actions">
              <Link className="button button-primary button-sm" to={BOOK_DEMO_LINK}>
                Book a Free Demo <ArrowRight size={16} aria-hidden="true" />
              </Link>
              <a className="button button-teal button-sm" href={site.whatsapp.href} target="_blank" rel="noopener noreferrer">
                <WhatsAppIcon size={16} /> WhatsApp
              </a>
            </div>
          </div>

          <nav className="footer-column footer-links" aria-labelledby="footer-explore">
            <h2 id="footer-explore">Explore</h2>
            <ul>
              {NAV_ITEMS.map((item) => (
                <li key={item.label}><Link to={item.to}>{item.label}</Link></li>
              ))}
              <li><Link to={BOOK_DEMO_LINK}>Book a Free Demo</Link></li>
            </ul>
          </nav>

          <nav className="footer-column footer-links" aria-labelledby="footer-quran">
            <h2 id="footer-quran">Quran Resources</h2>
            <ul>
              {QURAN_RESOURCE_LINKS.map((item) => (
                <li key={item.label}><Link to={item.to}>{item.label}</Link></li>
              ))}
            </ul>
          </nav>

          <div className="footer-column footer-contact">
            <h2>Contact Us</h2>
            <ul>
              <li>
                <a className="footer-contact-card footer-contact-whatsapp" href={site.whatsapp.href} target="_blank" rel="noopener noreferrer">
                  <span className="footer-contact-icon"><WhatsAppIcon size={18} /></span>
                  <span className="footer-contact-text"><small>WhatsApp</small>{site.whatsapp.display}</span>
                </a>
              </li>
              <li>
                <a className="footer-contact-card" href={site.phone.href}>
                  <span className="footer-contact-icon"><Phone size={18} aria-hidden="true" /></span>
                  <span className="footer-contact-text"><small>Phone</small>{site.phone.display}</span>
                </a>
              </li>
              <li>
                <a className="footer-contact-card" href={mailtoHref()}>
                  <span className="footer-contact-icon"><Mail size={18} aria-hidden="true" /></span>
                  <span className="footer-contact-text"><small>Email</small>{site.email}</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <span className="footer-copy">
            © {new Date().getFullYear()} {site.name}. All rights reserved.
            <span className="footer-copy-sep" aria-hidden="true"> · </span>
            <Link className="footer-legal-link" to={ROUTES.privacyPolicy}>Privacy Policy</Link>
          </span>
          <span className="footer-tagline">Learn with care. Grow with the Quran.</span>
          <button className="footer-to-top" type="button" onClick={scrollToTop} aria-label="Back to top">
            <ArrowUp size={18} aria-hidden="true" />
          </button>
        </div>
      </div>
    </footer>
  )
}

export default SiteFooter
