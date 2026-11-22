import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router'
import { BOOK_DEMO_LINK } from '../../app/routes.js'
import { site } from '../../config/site.js'
import WhatsAppIcon from './WhatsAppIcon.jsx'

// Call-to-action band (light by default, tone="dark" for emerald): "Book a Free Demo" + WhatsApp. Used at the end of inner pages.
function CtaBand({
  id = 'cta-title',
  title = 'Ready to begin your Quran journey?',
  text = 'Book a free demo class and meet your tutor — we’ll help you choose the right course and a time that suits you.',
  whatsappLabel = 'Chat on WhatsApp',
  tone = 'light',
}) {
  return (
    <section className={tone === 'dark' ? 'cta-band cta-band-dark' : 'cta-band'} aria-labelledby={id}>
      <div className="container cta-band-inner">
        <div>
          <h2 id={id}>{title}</h2>
          <p>{text}</p>
        </div>
        <div className="cta-band-actions">
          <Link className="button button-primary" to={BOOK_DEMO_LINK}>
            Book a Free Demo <ArrowRight size={18} aria-hidden="true" />
          </Link>
          <a className="button button-ghost" href={site.whatsapp.href} target="_blank" rel="noopener noreferrer">
            <WhatsAppIcon size={18} /> {whatsappLabel}
          </a>
        </div>
      </div>
    </section>
  )
}

export default CtaBand
