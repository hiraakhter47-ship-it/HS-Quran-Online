import { useEffect, useState } from 'react'

const testimonials = [
  ['A', 'Adult learner', 'Quran reading', 'The one-to-one lessons have made learning feel comfortable and achievable. I can take my time and ask questions.'],
  ['F', 'Parent', "Children's classes", 'A gentle and encouraging way for children to build a regular learning habit from the comfort of home.'],
  ['S', 'Adult learner', 'Tajweed lessons', 'I appreciate having lessons that fit around my week and a clear path for improving my recitation.'],
]

function DemoForm() {
  const [status, setStatus] = useState('')

  function handleSubmit(event) {
    event.preventDefault()
    const form = event.currentTarget
    if (!form.reportValidity()) return
    const values = new FormData(form)
    const subject = encodeURIComponent('Free Quran demo class request')
    const body = encodeURIComponent([
      `Name: ${values.get('name')}`,
      `Email: ${values.get('email')}`,
      `Phone: ${values.get('phone')}`,
      `Country: ${values.get('country')}`,
      '',
      'Message:',
      values.get('message'),
    ].join('\n'))
    setStatus('Opening your email app to send the demo request.')
    window.location.href = `mailto:hiraakhter47@gmail.com?subject=${subject}&body=${body}`
  }

  return (
    <section className="demo-section" id="free-demo">
      <div className="container">
        <div className="demo-card">
          <h2>Free <strong>DEMO CLASSES</strong></h2>
          <form className="demo-form" onSubmit={handleSubmit}>
            <label><span>Name (required)</span><input name="name" type="text" placeholder="Name*" autoComplete="name" required /></label>
            <label><span>Email (required)</span><input name="email" type="email" placeholder="Email*" autoComplete="email" required /></label>
            <label><span>Phone (required)</span><input name="phone" type="tel" placeholder="Phone*" autoComplete="tel" required /></label>
            <label>
              <span>Country</span>
              <select name="country" autoComplete="country-name" defaultValue="" required>
                <option value="" disabled>Select your country*</option>
                <option>Canada</option><option>United States</option><option>United Kingdom</option>
                <option>Pakistan</option><option>Australia</option><option>Other</option>
              </select>
            </label>
            <label className="form-message"><span>Message (required)</span><textarea name="message" placeholder="Message*" required /></label>
            <div className="form-actions">
              <button className="demo-submit" type="submit">Submit</button>
              <p className="demo-status" role="status" aria-live="polite">{status}</p>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

function QuranBrowser() {
  const [surahs, setSurahs] = useState([])
  const [query, setQuery] = useState('')
  const [showAll, setShowAll] = useState(false)
  const [status, setStatus] = useState('Loading Surahs…')

  useEffect(() => {
    const controller = new AbortController()
    async function loadSurahs() {
      try {
        const response = await fetch('https://api.alquran.cloud/v1/surah', {
          signal: controller.signal,
        })
        if (!response.ok) throw new Error(`Surah list request failed (${response.status})`)
        const result = await response.json()
        if (!Array.isArray(result.data)) throw new Error('Surah list response was not valid')
        setSurahs(result.data)
        setStatus('')
      } catch (error) {
        if (error.name === 'AbortError') return
        console.error('Unable to load Surahs:', error)
        setStatus('Unable to load Surahs right now. Please check your connection and refresh the page.')
      }
    }
    loadSurahs()
    return () => controller.abort()
  }, [])

  const term = query.trim().toLocaleLowerCase()
  const matches = surahs.filter((surah) =>
    surah.englishName.toLocaleLowerCase().includes(term) ||
    surah.englishNameTranslation.toLocaleLowerCase().includes(term) ||
    surah.name.includes(query.trim()) ||
    String(surah.number) === term
  )
  const visibleSurahs = term || showAll ? matches : matches.slice(0, 12)

  return (
    <section className="quran-section" id="quran-reader">
      <div className="container quran-layout">
        <div className="quran-copy">
          <span className="eyebrow">The Holy Quran</span>
          <h2>Read, reflect and reconnect.</h2>
          <p>Explore the Surahs and read Arabic with an English translation. Search by name, meaning or number to find a chapter.</p>
        </div>
        <div className="quran-tool">
          <label htmlFor="surah-search">Find a Surah</label>
          <input
            className="quran-search"
            id="surah-search"
            type="search"
            placeholder="Search by name, number or meaning..."
            autoComplete="off"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          <div className={`surah-results${showAll || term ? ' is-expanded' : ''}`} aria-live="polite">
            {status ? <p className="surah-status">{status}</p> : visibleSurahs.length ? visibleSurahs.map((surah) => (
              <a
                className="surah-item"
                href={`quran-reader.html?chapter=${surah.number}&from=digital-quran`}
                key={surah.number}
                aria-label={`Read ${surah.englishName}, ${surah.numberOfAyahs} verses`}
              >
                <span>
                  <strong>{surah.number}. {surah.englishName}</strong>
                  <small>{surah.englishNameTranslation} · {surah.numberOfAyahs} verses</small>
                </span>
                <span className="surah-arabic" lang="ar" dir="rtl">{surah.name}</span>
              </a>
            )) : <p className="surah-status">No Surahs found. Try another search.</p>}
          </div>
          <button
            className="browse-chapters"
            type="button"
            aria-expanded={showAll}
            hidden={Boolean(term) || surahs.length <= 12}
            onClick={() => setShowAll((value) => !value)}
          >
            {showAll ? 'Show fewer Surahs ↑' : 'Browse all 114 Surahs ↓'}
          </button>
        </div>
      </div>
    </section>
  )
}

function HomePage() {
  return (
    <>
      <section className="hero" id="home">
        <div className="container hero-grid">
          <div className="hero-copy">
            <span className="eyebrow">A beautiful journey begins here</span>
            <h1>Welcome to <em>HS Quran Online</em></h1>
            <p className="hero-tagline">A Way Towards Spirituality</p>
            <p className="hero-intro">
              At HS Quran Online, we make learning the Quran comfortable, flexible, and deeply rewarding.
              Designed with families and busy schedules in mind, our interactive online platform brings
              personalized 1-on-1 sessions directly into your home. Whether you are introducing your
              children to their first Quranic lessons or looking to deepen your own knowledge as an adult,
              our personalized curriculum ensures a comfortable environment where every student thrives.
            </p>
            <div className="hero-buttons">
              <a className="button button-light" href="#trial">Start with a free trial <span className="button-arrow">→</span></a>
              <a className="button button-outline" style={{ color: 'white', borderColor: 'rgba(255,255,255,.38)' }} href="#free-demo">Book a free demo</a>
            </div>
            <div className="hero-note">
              <span className="avatar-stack" aria-hidden="true"><span>Q</span><span>ت</span><span>ع</span></span>
              Personal guidance for learners of every age
            </div>
          </div>
          <div className="hero-visual" aria-label="A student learning Quran at home">
            <div className="hero-spiritual-glow" aria-hidden="true">
              <svg viewBox="0 0 100 100">
                <circle className="hero-glow-orbit" cx="50" cy="50" r="38" />
                <path className="hero-glow-crescent" d="M58 15a36 36 0 1 0 27 58A31 31 0 0 1 58 15z" />
                <path className="hero-glow-star" d="m77 22 3.5 8 8.5 1-6.5 5.5 2 8.5-7.5-4.5-7.5 4.5 2-8.5-6.5-5.5 8.5-1z" />
                <circle className="hero-glow-dot" cx="19" cy="35" r="2.5" />
                <circle className="hero-glow-dot hero-glow-dot-late" cx="77" cy="80" r="2" />
              </svg>
            </div>
            <div className="hero-image">
              <img src="https://images.unsplash.com/photo-1609599006353-e629aaabfeae?auto=format&fit=crop&w=1100&q=85" alt="A student reading the Quran" />
              <div className="image-caption"><span>Learn at your own pace</span><p>Faith, knowledge &amp; connection</p></div>
            </div>
            <div className="floating-icon" aria-hidden="true">اقرأ</div>
            <div className="kids-animation" role="img" aria-label="Illustration of two children learning together">
              <svg viewBox="0 0 240 160" aria-hidden="true">
                <ellipse cx="120" cy="143" rx="105" ry="11" fill="#dbe8dc" />
                <g className="kids-character kids-character-left">
                  <path d="M29 137c3-26 15-39 36-39s34 14 37 39" fill="#6d9c7d" />
                  <circle cx="65" cy="62" r="27" fill="#d69a72" />
                  <path d="M39 62c-2-21 11-34 29-34 16 0 26 11 25 28-9-2-16-9-19-16-8 11-19 17-35 17z" fill="#293a34" />
                  <circle cx="56" cy="65" r="2" fill="#24352e" /><circle cx="74" cy="65" r="2" fill="#24352e" />
                  <path d="M59 75c4 4 9 4 13 0" fill="none" stroke="#965b4a" strokeWidth="2" strokeLinecap="round" />
                </g>
                <g className="kids-character kids-character-right">
                  <path d="M139 137c3-25 16-39 37-39 20 0 33 13 36 39" fill="#7892bd" />
                  <circle cx="176" cy="62" r="27" fill="#bc805f" />
                  <path d="M149 61c0-20 11-33 28-33 18 0 29 14 26 34-7-1-14-6-19-14-7 8-18 13-35 13z" fill="#4a3329" />
                  <circle cx="167" cy="65" r="2" fill="#24352e" /><circle cx="185" cy="65" r="2" fill="#24352e" />
                  <path d="M170 75c4 4 9 4 13 0" fill="none" stroke="#874f41" strokeWidth="2" strokeLinecap="round" />
                </g>
                <g className="kids-book">
                  <path d="M82 111c16-7 28-5 38 3v26c-11-7-23-9-38-3z" fill="#fffdf5" stroke="#547a61" strokeWidth="2" />
                  <path d="M158 111c-16-7-28-5-38 3v26c11-7 23-9 38-3z" fill="#fffdf5" stroke="#547a61" strokeWidth="2" />
                  <path d="M120 114v26" stroke="#547a61" strokeWidth="2" />
                  <path d="M91 119c8-2 15-1 22 3M91 126c8-2 15-1 22 3M149 119c-8-2-15-1-22 3M149 126c-8-2-15-1-22 3" fill="none" stroke="#b79c62" strokeWidth="1.5" strokeLinecap="round" />
                </g>
              </svg>
              <span>Learning together</span>
            </div>
          </div>
        </div>
      </section>

      <section className="trust-strip" aria-label="Learning benefits">
        <div className="container trust-inner">
          <div className="trust-intro">A welcoming place to learn, grow and stay consistent.</div>
          <div className="trust-item"><span aria-hidden="true">◷</span>Flexible class times</div>
          <div className="trust-item"><span aria-hidden="true">⌂</span>Learn from home</div>
          <div className="trust-item"><span aria-hidden="true">♡</span>Patient, caring tutors</div>
          <div className="trust-item"><span aria-hidden="true">✦</span>Personal learning plan</div>
        </div>
      </section>

      <DemoForm />

      <section className="enroll-section" id="who-can-enroll">
        <div className="container">
          <h2>Who <strong>can enroll?</strong></h2>
          <p><strong>Holy Quran learning and online Quran reading programs</strong> are for learners of every age. Children, teens and adults can benefit from online Quran lessons. Try a free demo class and explore a learning plan that suits your goals.</p>
          <ul className="enroll-list">
            <li>Learning and recognizing Arabic letters with correct pronunciation</li>
            <li>Short Surah memorization, Salah and Duas</li>
            <li>Quran Tajweed, recitation, memorization and translation</li>
            <li>Learning Islamic principles and rules</li>
          </ul>
        </div>
      </section>

      <section className="section section-soft" id="families">
        <div className="container">
          <div className="section-heading">
            <span className="eyebrow">A thoughtful learning experience</span>
            <h2>Made for families and lifelong learners</h2>
            <p>Every learner is different. Our approach is personal, encouraging and focused on steady progress.</p>
          </div>
          <div className="quote-grid">
            {testimonials.map(([initial, role, course, quote]) => (
              <article className="quote-card" key={role + course}>
                <div className="quote-stars" aria-label="5 out of 5 stars">★★★★★</div>
                <blockquote>“{quote}”</blockquote>
                <div className="quote-person">
                  <span className="quote-avatar">{initial}</span>
                  <span><strong>{role}</strong><small>{course}</small></span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <QuranBrowser />

      <section className="cta-band" id="trial">
        <div className="container cta-inner">
          <div className="cta-copy">
            <span className="eyebrow">Begin your journey</span>
            <h2>Take the first step towards learning Quran online.</h2>
            <p>Choose a course above, or get in touch with your questions about getting started.</p>
          </div>
          <a className="button button-primary" href="#free-demo">Book a free demo <span className="button-arrow">→</span></a>
        </div>
      </section>
    </>
  )
}

export default HomePage
