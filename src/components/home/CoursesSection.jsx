import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router'
import { ROUTES } from '../../app/routes.js'
import { courses } from '../../data/courses.js'
import CourseCard from '../courses/CourseCard.jsx'
import SectionHeading from '../ui/SectionHeading.jsx'

function CoursesSection() {
  return (
    <section className="home-section section-cream" id="courses" aria-labelledby="courses-title">
      <div className="container">
        <SectionHeading
          id="courses-title"
          eyebrow="Our Courses"
          title={<>Courses for every <span className="text-highlight">stage of learning</span></>}
          description="From the very first Arabic letters to fluent recitation and memorization — choose the path that fits your goals."
        />
        <div className="course-tile-grid">
          {courses.map((course) => <CourseCard course={course} key={course.id} />)}
        </div>
        <div className="section-cta">
          <Link className="button button-outline" to={ROUTES.courses}>
            View Full Course Details <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  )
}

export default CoursesSection
