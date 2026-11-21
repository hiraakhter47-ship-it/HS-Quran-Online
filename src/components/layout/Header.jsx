import { ArrowRight, Menu, Phone, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router'
import { BOOK_DEMO_LINK, NAV_ITEMS } from '../../app/routes.js'
import { site } from '../../config/site.js'
import CountryFlag from '../ui/CountryFlag.jsx'
import WhatsAppIcon from '../ui/WhatsAppIcon.jsx'
import BrandLogo from './BrandLogo.jsx'

function Header() {
  const location = useLocation()
  // The menu belongs to the location it was opened on, so any navigation closes it.
  const [openOnKey, setOpenOnKey] = useState(null)
  const menuOpen = openOnKey === location.key
  const headerRef = useRef(null)
  const toggleRef = useRef(null)
  const firstLinkRef = useRef(null)

  const closeMenu = () => setOpenOnKey(null)
  const toggleMenu = () => setOpenOnKey(menuOpen ? null : location.key)

  // While the mobile menu is open: lock page scroll, close on Escape, focus the first link.
  useEffect(() => {
    if (!menuOpen) return undefined
    const root = document.documentElement
    // The menu panel fills the screen below the header's current position.
    const headerBottom = headerRef.current?.getBoundingClientRect().bottom ?? 0
    root.style.setProperty('--menu-top', `${Math.max(0, Math.round(headerBottom))}px`)
    root.classList.add('menu-open')
    firstLinkRef.current?.focus()

    function onKeyDown(event) {
      if (event.key === 'Escape') {
        setOpenOnKey(null)
        toggleRef.current?.focus()
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => {
      root.classList.remove('menu-open')
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [menuOpen])

  return (
    <header ref={headerRef} className={`site-header${menuOpen ? ' is-menu-open' : ''}`}>
      <div className="container header-inner">
        <BrandLogo onClick={closeMenu} />

        <nav className="main-nav" id="main-nav" aria-label="Main navigation">
          <ul className="main-nav-list">
            {NAV_ITEMS.map((item, index) => {
              const active = item.isActive(location)
              return (
                <li key={item.label}>
                  <Link
                    ref={index === 0 ? firstLinkRef : undefined}
                    className={`main-nav-link${active ? ' is-active' : ''}`}
                    to={item.to}
                    aria-current={active ? 'page' : undefined}
                    onClick={closeMenu}
                  >
                    {item.label}
                  </Link>
                </li>
              )
            })}
          </ul>

          <div className="mobile-menu-actions">
            <Link className="button button-primary" to={BOOK_DEMO_LINK} onClick={closeMenu}>
              Book a Free Demo <ArrowRight size={18} aria-hidden="true" />
            </Link>
            <a className="button button-ghost" href={site.whatsapp.href} target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon size={18} /> Chat on WhatsApp
            </a>
          </div>
        </nav>

        <div className="header-actions">
          <a className="header-phone" href={site.usPhone.href} aria-label={`Call our USA number ${site.usPhone.display}`}>
            <Phone className="header-phone-icon" size={19} aria-hidden="true" />
            <CountryFlag code="US" />
            <span className="header-phone-text">{site.usPhone.display}</span>
          </a>
          <Link className="button button-primary header-cta" to={BOOK_DEMO_LINK}>
            Book a Free Demo <ArrowRight size={18} aria-hidden="true" />
          </Link>
          <button
            ref={toggleRef}
            className="menu-toggle"
            type="button"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="main-nav"
            onClick={toggleMenu}
          >
            {menuOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header
