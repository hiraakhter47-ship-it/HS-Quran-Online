import { useState } from 'react'

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  function closeMenu() {
    setMenuOpen(false)
  }

  return (
    <header className="site-header">
      <div className="container header-inner">
        <a className="brand" href="index.html#home" aria-label="HS Quran Online home">
          <span className="brand-mark" aria-hidden="true">ه</span>
          <span className="brand-copy">
            <strong>HS Quran Online</strong>
            <span>A way towards spirituality</span>
          </span>
        </a>
        <nav
          className={`main-nav${menuOpen ? ' is-open' : ''}`}
          id="main-nav"
          aria-label="Main navigation"
        >
          <a href="index.html#home" onClick={closeMenu}>Home</a>
          <a href="about.html" onClick={closeMenu}>About us</a>
          <a href="how-it-works.html" onClick={closeMenu}>How it works</a>
          <a href="materials.html" onClick={closeMenu}>Materials</a>
          <a href="contact.html" onClick={closeMenu}>Contact us</a>
        </nav>
        <div className="header-actions">
          <span className="header-phone">One-to-one online learning</span>
          <a className="button button-primary" href="index.html#trial">
            Book a free trial <span className="button-arrow">→</span>
          </a>
          <button
            className="menu-toggle"
            type="button"
            aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
            aria-expanded={menuOpen}
            aria-controls="main-nav"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? '×' : '☰'}
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header
