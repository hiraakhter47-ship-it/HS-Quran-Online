import { ArrowRight, BookOpenText, CalendarCheck, Clock, UserRound } from 'lucide-react'
import heroImage from '../../assets/images/hero-quran.webp'
import { scrollToSection } from '../../lib/scrollToSection.js'
import WhatsAppIcon from '../ui/WhatsAppIcon.jsx'

// Only true, non-numeric statements — no invented learner counts or ratings.
const heroFacts = [
  { icon: UserRound, label: '1-to-1 live lessons' },
  { icon: Clock, label: 'Flexible timings' },
  { icon: WhatsAppIcon, label: 'WhatsApp support' },
]

function Hero() {
  return (
    <section className="home-hero" id="home" aria-labelledby="home-hero-title">
      <div className="container home-hero-grid">
        <div className="home-hero-copy">
          <span className="hero-eyebrow">Online Quran Academy</span>
          <h1 id="home-hero-title">
            Learn the <span className="text-highlight">Holy Quran</span> Online, One-to-One from Home
          </h1>
          <p className="home-hero-lead">
            Personal, live Quran lessons for children and adults. Read with confidence, recite with
            Tajweed and memorize at your own pace — guided by a caring tutor, at times that suit your family.
          </p>
          <div className="home-hero-actions">
            <a className="button button-primary" href="#free-demo" onClick={scrollToSection}>
              Book a Free Demo <ArrowRight size={18} aria-hidden="true" />
            </a>
            <a className="button button-ghost" href="#courses" onClick={scrollToSection}>Explore Courses</a>
          </div>
          <ul className="home-hero-facts">
            {heroFacts.map(({ icon: Icon, label }) => (
              <li key={label}>
                <span className="home-hero-fact-icon"><Icon size={16} aria-hidden="true" /></span>
                {label}
              </li>
            ))}
          </ul>
        </div>

        <div className="home-hero-visual">
          <div className="home-hero-photo">
            <img src={heroImage} alt="An open copy of the Holy Quran" width="880" height="1040" fetchPriority="high" />
          </div>
          <div className="hero-card hero-card-yellow" aria-hidden="true">
            <span className="hero-card-icon"><CalendarCheck size={20} /></span>
            <span><strong>Flexible Timings</strong><small>Classes that fit your week</small></span>
          </div>
          <div className="hero-card hero-card-course" aria-hidden="true">
            <span className="hero-card-icon"><BookOpenText size={20} /></span>
            <span><strong>Quran with Tajweed</strong><small>Recite beautifully &amp; correctly</small></span>
          </div>
          <div className="hero-card hero-card-teal" aria-hidden="true">
            <span className="hero-card-icon"><UserRound size={20} /></span>
            <span><strong>1-to-1 Classes</strong><small>Full attention in every lesson</small></span>
          </div>
          {/* Same box as the photo, so the badge can sit exactly on the arch edge */}
          <div className="hero-iqra-anchor" aria-hidden="true">
            <span className="hero-iqra" lang="ar">اقرأ</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
