import { useSearchParams } from 'react-router'
import BookDemoSection from '../components/home/BookDemoSection.jsx'
import PageHero from '../components/ui/PageHero.jsx'
import { usePageMeta } from '../hooks/usePageMeta.js'

// /book-demo — the same registration form as the homepage, on its own page.
// A course can be pre-selected with ?course=<id>, e.g. /book-demo?course=tajweed.
function BookDemoPage() {
  usePageMeta('bookDemo')
  const [params] = useSearchParams()
  const course = params.get('course') || ''

  return (
    <>
      <PageHero
        eyebrow="Free Demo Class"
        title={<>Book a <span className="text-highlight">Free Demo</span> Class</>}
        description="Try a live one-to-one Quran lesson for free — tell us a little about the learner and we’ll arrange it."
        breadcrumb="Book a Free Demo"
      />
      <BookDemoSection key={course} variant="page" initialCourse={course} />
    </>
  )
}

export default BookDemoPage
