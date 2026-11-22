import { useEffect, useState } from 'react'
import { useLocation } from 'react-router'
import { site } from '../../config/site.js'
import WhatsAppIcon from './WhatsAppIcon.jsx'

// The button appears once the visitor has scrolled this far (px).
const SHOW_AFTER = 300

// Floating WhatsApp button, shown in the bottom-right corner of every page after a little scrolling.
// It opens the same chat as the other "Chat on WhatsApp" buttons (site.whatsapp.href).
// Pages too short to scroll show it straight away, so it is never missing.
function WhatsAppFloat() {
  const [visible, setVisible] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    function update() {
      // While a page is still downloading its code the page is tiny, so don't treat that as "short".
      const loading = Boolean(document.querySelector('.page-loader'))
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      setVisible(window.scrollY > SHOW_AFTER || (!loading && maxScroll <= SHOW_AFTER))
    }

    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    // Content loading in (or accordions opening) changes the page height.
    const observer = new ResizeObserver(update)
    observer.observe(document.body)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
      observer.disconnect()
    }
  }, [pathname])

  return (
    <a
      className={`whatsapp-float${visible ? ' is-visible' : ''}`}
      href={site.whatsapp.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp (opens in a new tab)"
    >
      <span className="whatsapp-float-label" aria-hidden="true">Chat on WhatsApp</span>
      <span className="whatsapp-float-icon"><WhatsAppIcon size={30} /></span>
    </a>
  )
}

export default WhatsAppFloat
