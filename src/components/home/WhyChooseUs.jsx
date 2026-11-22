import { Clock, HeartHandshake, House, ListChecks, Users, Video } from 'lucide-react'
import { features } from '../../data/features.js'
import SectionHeading from '../ui/SectionHeading.jsx'

const icons = { oneToOne: Video, caring: HeartHandshake, flexible: Clock, home: House, plan: ListChecks, allAges: Users }

function WhyChooseUs({ tone = 'white' }) {
  return (
    <section className={`home-section section-${tone}`} id="why-choose-us" aria-labelledby="why-title">
      <div className="container">
        <SectionHeading
          id="why-title"
          eyebrow="Why Choose Us"
          title={<>A caring way to <span className="text-highlight">learn the Quran</span></>}
          description="Personal attention, gentle guidance and a learning plan built around you — wherever you are."
        />
        <div className="feature-grid">
          {features.map((feature) => {
            const Icon = icons[feature.icon] || Users
            return (
              <article className="feature-card" key={feature.title}>
                <span className="feature-icon"><Icon size={24} aria-hidden="true" /></span>
                <h3>{feature.title}</h3>
                <p>{feature.text}</p>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default WhyChooseUs
