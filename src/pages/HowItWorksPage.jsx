import { CalendarCheck, Check, Laptop, Video, Wifi } from 'lucide-react'
import { BOOK_DEMO_LINK } from '../app/routes.js'
import Faq from '../components/home/Faq.jsx'
import LearningSteps from '../components/home/LearningSteps.jsx'
import WhyChooseUs from '../components/home/WhyChooseUs.jsx'
import CtaBand from '../components/ui/CtaBand.jsx'
import PageHero from '../components/ui/PageHero.jsx'
import SectionHeading from '../components/ui/SectionHeading.jsx'
import { usePageMeta } from '../hooks/usePageMeta.js'

const requirements = [
  { icon: Laptop, title: 'A device', text: 'A laptop, tablet or phone to join your live lesson.' },
  { icon: Wifi, title: 'Internet connection', text: 'A stable connection for clear audio and video.' },
  { icon: Video, title: 'Camera & microphone', text: 'So you and your tutor can see and hear each other.' },
  { icon: CalendarCheck, title: 'A regular time', text: 'A quiet space and a class time that suits your routine.' },
]

function HowItWorksPage() {
  usePageMeta('howItWorks')

  return (
    <>
      <PageHero
        eyebrow="How It Works"
        title={<>Learning the Quran Online, <span className="text-highlight">Made Simple</span></>}
        description="Personalised one-to-one classes for learners of all ages — accessible, comfortable and shaped around your pace."
        breadcrumb="How It Works"
      />

      <section className="home-section section-white" aria-labelledby="how-intro-title">
        <div className="container how-intro">
          <SectionHeading
            id="how-intro-title"
            align="left"
            eyebrow="Personal Quranic Education"
            title={<>Your learning journey, <span className="text-highlight">step by step</span></>}
          />
          <div className="how-intro-copy">
            <p>
              We bring personalised one-to-one online classes directly to your home. Whether you or your
              children are taking your very first steps in Quranic reading or looking to perfect your
              Tajweed and understanding, lessons are carefully shaped around each learner’s level and pace.
            </p>
            <p>
              Dedicated tutors, flexible scheduling and an interactive learning environment help you
              connect with the Quran with confidence and ease.
            </p>
          </div>
        </div>
      </section>

      <LearningSteps ctaTo={BOOK_DEMO_LINK} tone="cream" />

      <section className="home-section requirements-section" aria-labelledby="how-needs-title">
        <div className="container">
          <SectionHeading
            id="how-needs-title"
            tone="dark"
            eyebrow="Getting Ready"
            title={<>What you need to <span className="text-highlight">join a class</span></>}
            description="No special software or experience needed — just a few simple things."
          />
          <div className="requirement-grid">
            {requirements.map(({ icon: Icon, title, text }) => (
              <article className="requirement-card" key={title}>
                <span className="requirement-check" aria-hidden="true"><Check size={14} /></span>
                <span className="requirement-icon"><Icon size={30} aria-hidden="true" /></span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <WhyChooseUs tone="cream" />
      <Faq />
      <CtaBand />
    </>
  )
}

export default HowItWorksPage
