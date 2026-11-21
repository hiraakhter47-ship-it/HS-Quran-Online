import { ArrowRight, Mail, Phone, UserRound } from 'lucide-react'
import { Link } from 'react-router'
import { BOOK_DEMO_LINK } from '../app/routes.js'
import PageHero from '../components/ui/PageHero.jsx'
import WhatsAppIcon from '../components/ui/WhatsAppIcon.jsx'
import { mailtoHref, site, whatsappHref } from '../config/site.js'
import { usePageMeta } from '../hooks/usePageMeta.js'

// Contact details + WhatsApp button (no inquiry form, as agreed).
function ContactPage() {
  usePageMeta('contact')

  const details = [
    { icon: Phone, label: 'Phone', value: site.phone.display, href: site.phone.href },
    { icon: Mail, label: 'Email', value: site.email, href: mailtoHref() },
    { icon: UserRound, label: 'Contact person', value: `${site.people.ceo.name} (${site.people.ceo.title})` },
  ]

  return (
    <>
      <PageHero
        eyebrow="Contact Us"
        title={<>We’re Here to <span className="text-highlight">Help</span></>}
        description="Have a question about our Quran classes or getting started? Message us on WhatsApp — we’ll be glad to help."
        breadcrumb="Contact Us"
      />

      <section className="home-section section-cream contact-section" aria-label="Contact details">
        <div className="container contact-grid">
          <div className="contact-whatsapp">
            <span className="contact-whatsapp-icon"><WhatsAppIcon size={34} /></span>
            <h2>Chat with us on WhatsApp</h2>
            <p>The quickest way to reach us. Ask about courses, class timings or your free demo class.</p>
            <a
              className="button button-primary"
              href={whatsappHref('Assalamu Alaikum, I have a question about HS Quran Online classes.')}
              target="_blank"
              rel="noopener noreferrer"
            >
              <WhatsAppIcon size={18} /> Message {site.whatsapp.display}
            </a>
          </div>

          <div className="contact-card">
            <h2>Contact Details</h2>
            <ul className="contact-list">
              {details.map(({ icon: Icon, label, value, href }) => (
                <li key={label}>
                  <span className="contact-list-icon"><Icon size={20} aria-hidden="true" /></span>
                  <span>
                    <small>{label}</small>
                    {href ? <a href={href}>{value}</a> : <strong>{value}</strong>}
                  </span>
                </li>
              ))}
            </ul>
            <div className="contact-demo">
              <p><strong>Ready to start?</strong> Book a free demo class and meet your tutor.</p>
              <Link className="button button-outline button-sm" to={BOOK_DEMO_LINK}>
                Book a Free Demo <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default ContactPage
