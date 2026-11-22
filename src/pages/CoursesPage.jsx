import { ArrowRight, BookOpenText, CalendarCheck, Clock, Library, ScrollText, UserRound, Users } from 'lucide-react'
import { Link } from 'react-router'
import { QURAN_RESOURCE_LINKS, ROUTES } from '../app/routes.js'
import CourseDetailCard from '../components/courses/CourseDetailCard.jsx'
import CtaBand from '../components/ui/CtaBand.jsx'
import PageHero from '../components/ui/PageHero.jsx'
import SectionHeading from '../components/ui/SectionHeading.jsx'
import { courses } from '../data/courses.js'
import { usePageMeta } from '../hooks/usePageMeta.js'
import { scrollToSection } from '../lib/scrollToSection.js'

// True, non-numeric statements only.
const highlights = [
  { icon: UserRound, title: '1-to-1 live lessons', text: 'Your tutor focuses only on you' },
  { icon: Users, title: 'Ages 3 to 80', text: 'Children, teens and adults' },
  { icon: Clock, title: 'Flexible timings', text: 'Lessons that fit your week' },
  { icon: CalendarCheck, title: 'Free demo class', text: 'Try a lesson before you start' },
]

const resourceIcons = {
  [ROUTES.digitalQuran]: BookOpenText,
  [ROUTES.siparas]: ScrollText,
  [ROUTES.quranResources]: Library,
}
const resourceText = {
  [ROUTES.digitalQuran]: 'Read any Surah in Arabic with a translation in your language.',
  [ROUTES.siparas]: 'Browse all 30 Siparas with Arabic text and English translation.',
  [ROUTES.quranResources]: 'Qaida, short Surahs and more learning resources.',
}

function CoursesPage() {
  usePageMeta('courses')

  return (
    <>
      <PageHero
        eyebrow="Our Courses"
        title={<>Quran Courses for <span className="text-highlight">Every Learner</span></>}
        description="Live one-to-one lessons for children and adults — from the first Arabic letters to Tajweed, memorization and understanding the Quran."
        breadcrumb="Courses"
      />

      <section className="course-highlights" aria-label="Course highlights">
        <div className="container">
          <ul className="course-highlights-list">
            {highlights.map(({ icon: Icon, title, text }) => (
              <li key={title}>
                <span className="course-highlight-icon"><Icon size={22} aria-hidden="true" /></span>
                <span><strong>{title}</strong><small>{text}</small></span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="home-section section-cream courses-catalog" aria-labelledby="courses-catalog-title">
        <div className="container">
          <SectionHeading
            id="courses-catalog-title"
            eyebrow="Choose Your Path"
            title={<>Find the <span className="text-highlight">right course</span></>}
            description="Every course is taught one-to-one and adapted to the learner’s level and pace. Not sure where to start? Your tutor will guide you during the free demo."
          />
          <nav className="course-jump" aria-label="Jump to a course">
            {courses.map((course) => (
              <a key={course.id} href={`#${course.id}`} onClick={scrollToSection}>{course.title}</a>
            ))}
          </nav>
          <div className="course-detail-grid">
            {courses.map((course, index) => (
              <CourseDetailCard course={course} index={index} key={course.id} />
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        id="course-help-title"
        title="Not sure which course is right for you?"
        text="Book a free demo class — your tutor will check the learner’s level and recommend the best place to start."
        whatsappLabel="Ask on WhatsApp"
        tone="dark"
      />

      <section className="home-section section-white" aria-labelledby="quran-resources-title">
        <div className="container">
          <SectionHeading
            id="quran-resources-title"
            eyebrow="Free Quran Resources"
            title={<>Keep learning <span className="text-highlight">between classes</span></>}
            description="Read and revise anytime with our free online Quran tools."
          />
          <div className="resource-grid">
            {QURAN_RESOURCE_LINKS.map((item) => {
              const Icon = resourceIcons[item.to] || BookOpenText
              return (
                <Link className="resource-card" to={item.to} key={item.to}>
                  <span className="resource-icon"><Icon size={26} aria-hidden="true" /></span>
                  <span className="resource-copy">
                    <strong>{item.label}</strong>
                    <span>{resourceText[item.to]}</span>
                  </span>
                  <ArrowRight className="resource-arrow" size={20} aria-hidden="true" />
                </Link>
              )
            })}
          </div>
        </div>
      </section>
    </>
  )
}

export default CoursesPage
