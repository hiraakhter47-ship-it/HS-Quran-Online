import { ArrowRight, BookOpen, House } from 'lucide-react'
import { Link } from 'react-router'
import { BOOK_DEMO_LINK, ROUTES } from '../app/routes.js'
import { usePageMeta } from '../hooks/usePageMeta.js'

function NotFoundPage() {
  usePageMeta('notFound')

  return (
    <section className="not-found" aria-labelledby="not-found-title">
      <div className="container not-found-inner">
        <span className="not-found-mark" lang="ar" aria-hidden="true">٤٠٤</span>
        <span className="hero-eyebrow">Error 404</span>
        <h1 id="not-found-title">We couldn’t find that page</h1>
        <p>The page may have moved, or the link may be incorrect. Here are some helpful places to continue:</p>
        <div className="not-found-actions">
          <Link className="button button-primary" to={ROUTES.home}>
            <House size={18} aria-hidden="true" /> Go to Homepage
          </Link>
          <Link className="button button-ghost" to={ROUTES.courses}>
            <BookOpen size={18} aria-hidden="true" /> View Courses
          </Link>
          <Link className="button button-ghost" to={BOOK_DEMO_LINK}>
            Book a Free Demo <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  )
}

export default NotFoundPage
