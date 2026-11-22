import { ArrowRight, Check } from 'lucide-react'
import { Link } from 'react-router'
import { bookDemoUrl } from '../../app/routes.js'
import CourseIcon from './CourseIcon.jsx'
import CourseImage from './CourseImage.jsx'

// Full course card for the Courses page: icon + title row, summary, who it's for and outcomes.
// Each card has id="<course id>" so it can be linked to directly (e.g. /courses#tajweed).
function CourseDetailCard({ course, index }) {
  const titleId = `course-${course.id}-title`

  return (
    <article className="course-detail" id={course.id} aria-labelledby={titleId}>
      <CourseImage course={course} className="course-photo" />
      <div className="course-detail-head">
        <span className="course-detail-icon"><CourseIcon courseId={course.id} size={28} /></span>
        <h2 id={titleId}>{course.title}</h2>
        {/* Decorative number, drawn with CSS so it isn't read as text */}
        <span className="course-detail-number" data-number={String(index + 1).padStart(2, '0')} aria-hidden="true" />
      </div>
      <p className="course-detail-summary">{course.summary}</p>

      <p className="course-detail-audience"><strong>Ideal for:</strong> {course.audience}</p>

      <h3 className="course-detail-outcomes-title">What you’ll learn</h3>
      <ul className="course-detail-outcomes">
        {course.outcomes.map((outcome) => (
          <li key={outcome}><span aria-hidden="true"><Check size={14} /></span>{outcome}</li>
        ))}
      </ul>

      <Link className="button button-primary course-detail-cta" to={bookDemoUrl(course.id)} aria-label={`Book a free demo for ${course.title}`}>
        Book a Free Demo <ArrowRight size={18} aria-hidden="true" />
      </Link>
    </article>
  )
}

export default CourseDetailCard
