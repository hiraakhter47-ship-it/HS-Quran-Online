import { MessageCircleQuestion } from 'lucide-react'
import { site } from '../../config/site.js'
import { faqs } from '../../data/faqs.js'
import Accordion from '../ui/Accordion.jsx'
import SectionHeading from '../ui/SectionHeading.jsx'
import WhatsAppIcon from '../ui/WhatsAppIcon.jsx'

function Faq() {
  return (
    <section className="home-section section-white" id="faq" aria-labelledby="faq-title">
      <div className="container faq-grid">
        <div className="faq-intro">
          <SectionHeading
            id="faq-title"
            align="left"
            eyebrow="FAQ"
            title={<>Frequently Asked <span className="text-highlight">Questions</span></>}
            description="Answers to the questions families ask most often about learning with us."
          />
          <div className="faq-help">
            <span className="faq-help-icon"><MessageCircleQuestion size={24} aria-hidden="true" /></span>
            <div>
              <strong>Still have a question?</strong>
              <p>Message us on WhatsApp and we’ll be happy to help.</p>
              <a className="button button-teal button-sm" href={site.whatsapp.href} target="_blank" rel="noopener noreferrer">
                <WhatsAppIcon size={16} /> {site.whatsapp.display}
              </a>
            </div>
          </div>
        </div>
        <Accordion items={faqs} idPrefix="faq" />
      </div>
    </section>
  )
}

export default Faq
