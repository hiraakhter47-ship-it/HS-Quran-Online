import { Check, Compass, Eye, Target } from 'lucide-react'
import aboutImage from '../assets/images/about-quran.webp'
import CtaBand from '../components/ui/CtaBand.jsx'
import PageHero from '../components/ui/PageHero.jsx'
import SectionHeading from '../components/ui/SectionHeading.jsx'
import { site } from '../config/site.js'
import { usePageMeta } from '../hooks/usePageMeta.js'

const strengths = [
  'One-to-one live online classes',
  'Lessons for ages 3 to 80',
  'Flexible class timings',
  'A personal learning plan',
]

const values = [
  {
    icon: Target,
    title: 'Our Mission',
    text: 'Make meaningful Quran education accessible through supportive, personal online lessons for learners of every age.',
  },
  {
    icon: Compass,
    title: 'Our Approach',
    text: 'Begin with each learner’s needs, build confidence step by step, and adapt lessons to their level and comfortable pace.',
  },
  {
    icon: Eye,
    title: 'Our Vision',
    text: 'Help more people build a lasting connection with the Quran through consistent learning, understanding and recitation.',
  },
]

const initials = (name) => name.split(/\s+/).map((part) => part[0]).join('').slice(0, 2)

function AboutPage() {
  usePageMeta('about')
  const leaders = [site.people.founder, site.people.ceo]

  return (
    <>
      <PageHero
        eyebrow="About Us"
        title={<>Online Quran Learning, <span className="text-highlight">Made Personal</span></>}
        description="A caring online academy helping children and adults read, recite and understand the Holy Quran from home."
        breadcrumb="About Us"
      />

      <section className="home-section section-white" aria-labelledby="about-story-title">
        <div className="container about-story">
          <div className="about-story-media">
            <div className="about-story-photo">
              <img src={aboutImage} alt="An open Quran ready for study" width="900" height="1000" loading="lazy" />
            </div>
            <span className="about-story-badge" lang="ar" aria-hidden="true">اقرأ</span>
          </div>
          <div className="about-story-copy">
            <SectionHeading
              id="about-story-title"
              align="left"
              eyebrow={`About ${site.name}`}
              title={<>Learning shaped around <span className="text-highlight">every learner</span></>}
            />
            <p>
              We provide one-to-one online Quran classes for children and adults, wherever they are
              beginning their learning journey. From first steps in Quran reading to Tajweed and
              stronger recitation, lessons are shaped around each learner’s level, goals and pace.
            </p>
            <p>
              Our aim is to make learning from home feel welcoming and manageable, with caring tutor
              support and flexible scheduling.
            </p>
            <ul className="check-grid">
              {strengths.map((item) => (
                <li key={item}><span aria-hidden="true"><Check size={14} /></span>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="home-section section-cream" aria-labelledby="about-values-title">
        <div className="container">
          <SectionHeading
            id="about-values-title"
            eyebrow="What Guides Us"
            title={<>Our Mission, Approach <span className="text-highlight">&amp; Vision</span></>}
          />
          <div className="value-grid">
            {values.map(({ icon: Icon, title, text }) => (
              <article className="value-card" key={title}>
                <span className="value-icon"><Icon size={26} aria-hidden="true" /></span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="home-section section-white" aria-labelledby="about-team-title">
        <div className="container">
          <SectionHeading
            id="about-team-title"
            eyebrow="Leadership"
            title={<>The people behind <span className="text-highlight">{site.name}</span></>}
          />
          <div className="leader-grid">
            {leaders.map((person) => (
              <article className="leader-card" key={person.name}>
                <span className="leader-avatar" aria-hidden="true">{initials(person.name)}</span>
                <h3>{person.name}</h3>
                <p>{person.title}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  )
}

export default AboutPage
