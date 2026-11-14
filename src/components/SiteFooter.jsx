function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <a className="brand" href="index.html#home">
              <span className="brand-mark" aria-hidden="true">ه</span>
              <span className="brand-copy">
                <strong>HS Quran Online</strong>
                <span>A way towards spirituality</span>
              </span>
            </a>
            <p>
              Making Quran learning accessible from home for children and adults,
              wherever their journey begins.
            </p>
          </div>
          <div className="footer-column">
            <h3>Explore</h3>
            <a href="about.html">About us</a>
            <a href="how-it-works.html">How it works</a>
            <a href="digital-quran.html">Chapters</a>
            <a href="materials.html">Materials</a>
          </div>
          <div className="footer-column">
            <h3>Start learning</h3>
            <a href="index.html#free-demo">Book a free demo</a>
            <a href="index.html#who-can-enroll">Who can enroll?</a>
            <a href="index.html#families">Learning approach</a>
          </div>
          <div className="footer-column footer-contact">
            <h3>Contact us</h3>
            <a href="contact.html">Contact page</a>
            <a href="mailto:hiraakhter47@gmail.com">hiraakhter47@gmail.com</a>
            <a href="tel:+923368277776">+92 336 8277776</a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} HS Quran Online. All rights reserved.</span>
          <span>Learn with care. Grow with the Quran.</span>
        </div>
      </div>
    </footer>
  )
}

export default SiteFooter
