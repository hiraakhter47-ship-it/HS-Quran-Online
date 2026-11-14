function AboutPage() {
  return (
    <div id="about">
      <div className="about-banner">
        <h1>About Us</h1>
        <p><a href="index.html#home">Home</a> &nbsp;/&nbsp; About Us</p>
      </div>
      <section className="about-overview" aria-labelledby="about-overview-title">
        <div className="about-overview-image">
          <img
            src="https://images.unsplash.com/photo-1585036156171-384164a8c675?auto=format&fit=crop&w=1100&q=85"
            alt="An open Quran ready for study"
          />
        </div>
        <div className="about-overview-copy">
          <span className="eyebrow">HS Quran Online</span>
          <h2 id="about-overview-title">Online Quran learning, made personal.</h2>
          <p>
            We provide one-to-one online Quran classes for children and adults, wherever they are
            beginning their learning journey. From first steps in Quran reading to Tajweed and
            stronger recitation, lessons are shaped around each learner’s level, goals and pace.
          </p>
          <p>Our aim is to make learning from home feel welcoming and manageable, with caring tutor support and flexible scheduling.</p>
        </div>
      </section>
      <section className="about-values" aria-label="Our mission, approach, and vision">
        <article className="about-value">
          <h3>Our Mission</h3>
          <p>Make meaningful Quran education accessible through supportive, personal online lessons for learners of every age.</p>
        </article>
        <article className="about-value">
          <h3>Our Approach</h3>
          <p>Begin with each learner’s needs, build confidence step by step, and adapt lessons to their level and comfortable pace.</p>
        </article>
        <article className="about-value">
          <h3>Our Vision</h3>
          <p>Help more people build a lasting connection with the Quran through consistent learning, understanding and recitation.</p>
        </article>
      </section>
      <section className="about-leadership" aria-label="About the team">
        <div>
          <h2>Learn with HS Quran Online</h2>
          <p>Founder: Usman Lohan &nbsp;·&nbsp; Contact: Hira Akhtar</p>
        </div>
        <a className="button button-light" href="contact.html">Contact us <span className="button-arrow">→</span></a>
      </section>
    </div>
  )
}

export default AboutPage
