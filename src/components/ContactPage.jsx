import { useState } from 'react'

function ContactPage() {
  const [status, setStatus] = useState('')

  function handleSubmit(event) {
    event.preventDefault()
    const form = event.currentTarget
    if (!form.reportValidity()) return
    const values = new FormData(form)
    const subject = encodeURIComponent(`HS Quran Online contact: ${values.get('topic')}`)
    const body = encodeURIComponent([
      `Name: ${values.get('name')}`,
      `Email: ${values.get('email')}`,
      `Phone: ${values.get('phone')}`,
      `Topic: ${values.get('topic')}`,
      '',
      'Message:',
      values.get('message'),
    ].join('\n'))
    setStatus('Opening your email app to send your message.')
    window.location.href = `mailto:hiraakhter47@gmail.com?subject=${subject}&body=${body}`
  }

  return (
    <div id="contact">
      <div className="container contact-layout">
        <section className="contact-form-card" aria-labelledby="contact-title">
          <h1 id="contact-title">Contact Us</h1>
          <p className="contact-form-intro">Have a question about Quran classes or learning with us? Send Hira Akhtar a message and we’ll be glad to help.</p>
          <form className="contact-form" onSubmit={handleSubmit}>
            <label>Name *
              <input name="name" type="text" autoComplete="name" required />
            </label>
            <label>Phone *
              <input name="phone" type="tel" autoComplete="tel" required />
            </label>
            <label>Email *
              <input name="email" type="email" autoComplete="email" required />
            </label>
            <label>Topic *
              <select name="topic" defaultValue="" required>
                <option value="" disabled>Select a topic</option>
                <option>Quran classes</option>
                <option>Class scheduling</option>
                <option>General information</option>
                <option>Other</option>
              </select>
            </label>
            <label className="contact-message">Message *
              <textarea name="message" required />
            </label>
            <div className="contact-actions">
              <button className="contact-submit" type="submit">Send message</button>
              <p className="contact-status" role="status" aria-live="polite">{status}</p>
            </div>
          </form>
        </section>
        <aside className="contact-details" aria-labelledby="contact-details-title">
          <h2 id="contact-details-title">Contact Details</h2>
          <h3>Contact person</h3>
          <p>Hira Akhtar</p>
          <h3>Email</h3>
          <a href="mailto:hiraakhter47@gmail.com">hiraakhter47@gmail.com</a>
          <h3>Phone</h3>
          <a href="tel:+923368277776">+92 336 8277776</a>
        </aside>
      </div>
    </div>
  )
}

export default ContactPage
