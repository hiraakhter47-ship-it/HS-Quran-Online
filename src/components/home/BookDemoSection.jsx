import { Check } from 'lucide-react'
import { lazy, Suspense } from 'react'
import { site } from '../../config/site.js'
import WhatsAppIcon from '../ui/WhatsAppIcon.jsx'

// The form (with its phone-number library) downloads separately so the page itself loads faster.
const DemoRegistrationForm = lazy(() => import('../forms/DemoRegistrationForm.jsx'))

function FormPlaceholder() {
  return (
    <div className="form-placeholder" role="status">
      <span className="page-loader-spinner" aria-hidden="true" />
      <span className="visually-hidden">Loading the registration form…</span>
    </div>
  )
}

const benefits = [
  'Meet a tutor in a live one-to-one session',
  'Your level is checked and a learning plan suggested',
  'We contact you on WhatsApp to arrange a time',
]

// The "Book a Free Demo Class" block: intro + registration form.
// Used on the homepage (variant "home") and on /book-demo (variant "page").
function BookDemoSection({ variant = 'home', initialCourse = '' }) {
  const isPage = variant === 'page'

  return (
    <section className={`book-demo book-demo-${variant}`} id="free-demo" aria-labelledby="free-demo-title">
      <div className="container book-demo-grid">
        <div className="book-demo-intro">
          <span className="section-eyebrow">Free Demo Class</span>
          <h2 id="free-demo-title">
            {isPage
              ? <>Tell us about the <span className="text-highlight">learner</span></>
              : <>Book a <span className="text-highlight">Free Demo</span> Class</>}
          </h2>
          <p>
            Fill in this short form and our team will get in touch to arrange your free demo class.
            It takes less than a minute.
          </p>
          <ul className="book-demo-benefits">
            {benefits.map((benefit) => (
              <li key={benefit}><span aria-hidden="true"><Check size={16} /></span>{benefit}</li>
            ))}
          </ul>
          <a className="button button-teal" href={site.whatsapp.href} target="_blank" rel="noopener noreferrer">
            <WhatsAppIcon size={18} /> Chat on WhatsApp
          </a>
        </div>
        <div className="book-demo-card">
          <h3 className="book-demo-card-title">Student Registration</h3>
          <Suspense fallback={<FormPlaceholder />}>
            <DemoRegistrationForm
              idPrefix={isPage ? 'book-demo' : 'home-demo'}
              initialCourse={initialCourse}
              source={isPage ? 'Book a Free Demo page' : 'Homepage'}
            />
          </Suspense>
        </div>
      </div>
    </section>
  )
}

export default BookDemoSection
