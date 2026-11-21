import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router'
import { bookDemoUrl } from '../../app/routes.js'
import CourseIcon from './CourseIcon.jsx'
import CourseImage from './CourseImage.jsx'

// Course card (homepage "Our Courses"): course photo (or the emerald pattern if there is
// none), then a row with the gold icon + title, the summary and a full-width booking button.
// No prices are shown anywhere.
function CourseCard({ course }) {
  return (
    <article className="course-tile">
      <div className="course-tile-head">
        <CourseImage course={course} className="course-tile-photo" />
      </div>

      <div className="course-tile-body">
        <div className="course-tile-title">
          <span className="course-tile-icon"><CourseIcon courseId={course.id} size={24} /></span>
          <h3>{course.title}</h3>
        </div>
        <p>{course.summary}</p>

        <Link className="course-tile-link" to={bookDemoUrl(course.id)} aria-label={`Book a free demo for ${course.title}`}>
          Book a Free Demo <ArrowRight size={17} aria-hidden="true" />
        </Link>
      </div>
    </article>
  )
}

export default CourseCard
