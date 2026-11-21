import BookDemoSection from '../components/home/BookDemoSection.jsx'
import CoursesSection from '../components/home/CoursesSection.jsx'
import Faq from '../components/home/Faq.jsx'
import Hero from '../components/home/Hero.jsx'
import LearningSteps from '../components/home/LearningSteps.jsx'
import Testimonials from '../components/home/Testimonials.jsx'
import WhyChooseUs from '../components/home/WhyChooseUs.jsx'
import { usePageMeta } from '../hooks/usePageMeta.js'

// Homepage — sections in the approved order (header and footer come from Layout).
function HomePage() {
  usePageMeta('home')

  return (
    <>
      <Hero />
      <WhyChooseUs />
      <CoursesSection />
      <LearningSteps />
      <BookDemoSection />
      <Testimonials />
      <Faq />
    </>
  )
}

export default HomePage
