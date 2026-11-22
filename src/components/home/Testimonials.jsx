import { ChevronLeft, ChevronRight, Quote } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { testimonials } from '../../data/testimonials.js'
import CountryFlag from '../ui/CountryFlag.jsx'
import SectionHeading from '../ui/SectionHeading.jsx'

// Shows the entries from data/testimonials.js. Name, country and star rating are
// optional per entry and are only displayed when present.
// Slider: arrow buttons page through the cards (swipe works on touch screens).
// The arrows only appear when there are more cards than fit on screen.
function Testimonials() {
  const trackRef = useRef(null)
  const [nav, setNav] = useState({ canScroll: false, atStart: true, atEnd: true })

  const measure = useCallback(() => {
    const track = trackRef.current
    if (!track) return
    const max = track.scrollWidth - track.clientWidth
    const next = { canScroll: max > 2, atStart: track.scrollLeft <= 2, atEnd: track.scrollLeft >= max - 2 }
    setNav((prev) => (prev.canScroll === next.canScroll && prev.atStart === next.atStart && prev.atEnd === next.atEnd ? prev : next))
  }, [])

  useEffect(() => {
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [measure])

  function page(direction) {
    const track = trackRef.current
    const card = track?.querySelector('.testimonial-card')
    if (!track || !card) return
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    track.scrollBy({ left: direction * (card.offsetWidth + 24), behavior: reduceMotion ? 'auto' : 'smooth' })
  }

  return (
    <section className="home-section section-cream" id="testimonials" aria-labelledby="testimonials-title">
      <div className="container">
        <SectionHeading
          id="testimonials-title"
          eyebrow="A thoughtful learning experience"
          title={<>Made for families and <span className="text-highlight">lifelong learners</span></>}
          description="Every learner is different. Our approach is personal, encouraging and focused on steady progress."
        />
        <div className="testimonial-slider">
          <div className="testimonial-track" ref={trackRef} onScroll={measure} tabIndex={0} role="region" aria-label="Learner feedback">
            {testimonials.map((item) => (
              <figure className="testimonial-card" key={item.name ?? item.quote}>
                <span className="testimonial-corner" aria-hidden="true"><Quote size={26} /></span>
                <figcaption>
                  <strong>
                    {item.country && <CountryFlag code={item.country.code} />}
                    {item.name ?? item.role}
                  </strong>
                  {item.country && <small>{item.country.name}</small>}
                  {item.rating >= 1 && item.rating <= 5 && (
                    <span className="testimonial-stars" role="img" aria-label={`${item.rating} out of 5 stars`}>
                      {'★'.repeat(item.rating)}
                    </span>
                  )}
                </figcaption>
                <blockquote>{item.quote}</blockquote>
              </figure>
            ))}
          </div>
          {nav.canScroll && (
            <>
              <button type="button" className="testimonial-arrow is-prev" onClick={() => page(-1)} disabled={nav.atStart} aria-label="Previous testimonials">
                <ChevronLeft size={22} aria-hidden="true" />
              </button>
              <button type="button" className="testimonial-arrow is-next" onClick={() => page(1)} disabled={nav.atEnd} aria-label="Next testimonials">
                <ChevronRight size={22} aria-hidden="true" />
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  )
}

export default Testimonials
