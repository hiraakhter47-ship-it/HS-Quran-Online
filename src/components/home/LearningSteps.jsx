import { ArrowRight, CalendarClock, ClipboardList, GraduationCap } from 'lucide-react'
import { Link } from 'react-router'
import { learningSteps } from '../../data/steps.js'
import { scrollToSection } from '../../lib/scrollToSection.js'
import SectionHeading from '../ui/SectionHeading.jsx'

const icons = { form: ClipboardList, time: CalendarClock, learn: GraduationCap }

// Three step cards, each with a "Step N" tab on top and dashed lines joining the tabs.
// `ctaTo` = a route (e.g. "/book-demo") for pages without the homepage form;
// without it the button scrolls to the form on the same page (#free-demo).
function LearningSteps({ ctaTo, tone = 'white' }) {
  const ctaContent = <>Book Your Free Demo <ArrowRight size={18} aria-hidden="true" /></>
  return (
    <section className={`home-section section-${tone}`} id="steps" aria-labelledby="steps-title">
      <div className="container">
        <SectionHeading
          id="steps-title"
          eyebrow="How to Start"
          title={<><span className="text-highlight">3 Steps</span> to Learn Quran</>}
          description="Getting started is simple — and your first class is a free demo."
        />
        <ol className="step-list">
          {learningSteps.map((step, index) => {
            const Icon = icons[step.icon] || ClipboardList
            return (
              <li className="step-item" key={step.title}>
                <span className="step-tab" aria-hidden="true">Step {index + 1}</span>
                <span className="step-icon"><Icon size={26} aria-hidden="true" /></span>
                <h3><span className="visually-hidden">Step {index + 1}: </span>{step.title}</h3>
                <p>{step.text}</p>
              </li>
            )
          })}
        </ol>
        <div className="section-cta">
          {ctaTo
            ? <Link className="button button-primary" to={ctaTo}>{ctaContent}</Link>
            : <a className="button button-primary" href="#free-demo" onClick={scrollToSection}>{ctaContent}</a>}
        </div>
      </div>
    </section>
  )
}

export default LearningSteps
