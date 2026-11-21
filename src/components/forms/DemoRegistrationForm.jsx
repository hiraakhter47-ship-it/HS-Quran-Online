import { ArrowRight, CircleAlert, CircleCheck, LoaderCircle } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { site } from '../../config/site.js'
import { courses, getCourseById } from '../../data/courses.js'
import { toInternationalNumber } from '../../lib/registration/phone.js'
import { NotConfiguredError, submitRegistration } from '../../lib/registration/submitRegistration.js'
import { AGE_MAX, AGE_MIN, FIELD_ORDER, validateRegistration } from '../../lib/registration/validateRegistration.js'
import FormField from '../ui/FormField.jsx'
import WhatsAppIcon from '../ui/WhatsAppIcon.jsx'
import CountrySelect from './CountrySelect.jsx'
import PhoneField from './PhoneField.jsx'

const emptyValues = (course = '') => ({
  fullName: '',
  age: '',
  country: '',
  email: '',
  whatsappCountry: '',
  whatsappNumber: '',
  course: getCourseById(course) ? course : '',
})

// The Book a Free Demo registration form (6 fields).
// Used on the homepage and on /book-demo. `source` is included in the email.
function DemoRegistrationForm({ idPrefix = 'demo', initialCourse = '', source = 'Website' }) {
  const [values, setValues] = useState(() => emptyValues(initialCourse))
  const [touched, setTouched] = useState({})
  const [submitAttempted, setSubmitAttempted] = useState(false)
  const [status, setStatus] = useState('idle') // idle | submitting | success | error | unavailable
  const [submittedName, setSubmittedName] = useState('')
  const [codeChosenManually, setCodeChosenManually] = useState(false)
  const honeypotRef = useRef(null)
  const successRef = useRef(null)

  const fieldId = (name) => `${idPrefix}-${name}`
  const whatsapp = toInternationalNumber(values.whatsappCountry, values.whatsappNumber)
  const errors = validateRegistration({ ...values, whatsapp })
  const visibleError = (name) => ((touched[name] || submitAttempted) ? errors[name] : undefined)

  useEffect(() => {
    if (status === 'success') successRef.current?.focus()
  }, [status])

  function update(name, value) {
    setValues((current) => ({ ...current, [name]: value }))
    if (status === 'error' || status === 'unavailable') setStatus('idle')
  }

  const touch = (name) => () => setTouched((current) => ({ ...current, [name]: true }))

  function handleCountryChange(code) {
    setValues((current) => ({
      ...current,
      country: code,
      // Selecting a country sets the WhatsApp code too, unless it was changed by hand.
      whatsappCountry: code && !codeChosenManually ? code : current.whatsappCountry,
    }))
  }

  function handleCodeChange(code, { manual } = {}) {
    if (manual) setCodeChosenManually(true)
    update('whatsappCountry', code)
  }

  async function handleSubmit(event) {
    event.preventDefault()
    if (status === 'submitting') return
    setSubmitAttempted(true)

    const firstInvalid = FIELD_ORDER.find((name) => errors[name])
    if (firstInvalid) {
      document.getElementById(fieldId(firstInvalid))?.focus()
      return
    }

    setStatus('submitting')
    try {
      await submitRegistration(
        { ...values, whatsapp },
        { source, botcheck: Boolean(honeypotRef.current?.checked) },
      )
      setSubmittedName(values.fullName.trim().split(/\s+/)[0])
      setStatus('success')
    } catch (error) {
      console.error('Free demo registration failed:', error)
      setStatus(error instanceof NotConfiguredError ? 'unavailable' : 'error')
    }
  }

  function startAgain() {
    setValues(emptyValues(initialCourse))
    setTouched({})
    setSubmitAttempted(false)
    setCodeChosenManually(false)
    setStatus('idle')
  }

  if (status === 'success') {
    return (
      <div className="form-success" ref={successRef} tabIndex={-1} role="status">
        <CircleCheck size={48} aria-hidden="true" />
        <h3>JazakAllah Khair{submittedName ? `, ${submittedName}` : ''}!</h3>
        <p>
          Your free demo request has been received. We’ll contact you on WhatsApp shortly
          to arrange a convenient time.
        </p>
        <button className="button button-outline" type="button" onClick={startAgain}>
          Book another demo
        </button>
      </div>
    )
  }

  const submitting = status === 'submitting'

  return (
    <form className="demo-registration-form" onSubmit={handleSubmit} noValidate aria-busy={submitting}>
      <div className="form-grid">
        <FormField id={fieldId('fullName')} label="Full Name" required error={visibleError('fullName')}>
          {(props) => (
            <input
              {...props}
              className="form-control"
              type="text"
              autoComplete="name"
              placeholder="e.g. Ahmed Khan"
              value={values.fullName}
              onChange={(event) => update('fullName', event.target.value)}
              onBlur={touch('fullName')}
            />
          )}
        </FormField>

        <FormField id={fieldId('age')} label="Age of Student" required error={visibleError('age')}>
          {(props) => (
            <input
              {...props}
              className="form-control"
              type="number"
              inputMode="numeric"
              min={AGE_MIN}
              max={AGE_MAX}
              step="1"
              placeholder={`${AGE_MIN}–${AGE_MAX}`}
              value={values.age}
              onChange={(event) => update('age', event.target.value)}
              onBlur={touch('age')}
            />
          )}
        </FormField>

        <FormField id={fieldId('country')} label="Country" required error={visibleError('country')}>
          {(props) => (
            <CountrySelect
              {...props}
              value={values.country}
              onChange={handleCountryChange}
              onBlur={touch('country')}
            />
          )}
        </FormField>

        <FormField id={fieldId('email')} label="Email" required error={visibleError('email')}>
          {(props) => (
            <input
              {...props}
              className="form-control"
              type="email"
              inputMode="email"
              autoComplete="email"
              placeholder="name@example.com"
              value={values.email}
              onChange={(event) => update('email', event.target.value)}
              onBlur={touch('email')}
            />
          )}
        </FormField>

        <FormField
          id={fieldId('whatsapp')}
          label="WhatsApp Number"
          required
          hint="We’ll contact you on WhatsApp to arrange your demo."
          error={visibleError('whatsapp')}
          className="form-field-wide"
        >
          {(props) => (
            <PhoneField
              {...props}
              country={values.whatsappCountry}
              number={values.whatsappNumber}
              preferredCountry={values.country}
              onCountryChange={handleCodeChange}
              onNumberChange={(text) => update('whatsappNumber', text)}
              onBlur={touch('whatsapp')}
            />
          )}
        </FormField>

        <FormField id={fieldId('course')} label="Course" required error={visibleError('course')} className="form-field-wide">
          {(props) => (
            <select
              {...props}
              className="form-control form-select"
              value={values.course}
              onChange={(event) => update('course', event.target.value)}
              onBlur={touch('course')}
            >
              <option value="">Select a course</option>
              {courses.map((course) => (
                <option key={course.id} value={course.id}>{course.title}</option>
              ))}
            </select>
          )}
        </FormField>
      </div>

      {/* Spam trap (Web3Forms "botcheck"): hidden from people, bots tend to tick it. */}
      <input ref={honeypotRef} className="form-honeypot" type="checkbox" name="botcheck" tabIndex={-1} aria-hidden="true" />

      {status === 'error' && (
        <div className="form-alert" role="alert">
          <CircleAlert size={20} aria-hidden="true" />
          <p>
            Sorry, we couldn’t send your request just now. Please check your connection and try again,
            or message us on <a href={site.whatsapp.href} target="_blank" rel="noopener noreferrer">WhatsApp</a>.
          </p>
        </div>
      )}
      {status === 'unavailable' && (
        <div className="form-alert" role="alert">
          <CircleAlert size={20} aria-hidden="true" />
          <p>
            Online registration is temporarily unavailable. Please message us on{' '}
            <a href={site.whatsapp.href} target="_blank" rel="noopener noreferrer">WhatsApp ({site.whatsapp.display})</a>{' '}
            to book your free demo.
          </p>
        </div>
      )}
      {submitAttempted && Object.keys(errors).length > 0 && (
        <p className="form-summary" role="alert">Please fix the highlighted fields above.</p>
      )}

      <div className="form-actions">
        <button className="button button-primary form-submit" type="submit" disabled={submitting}>
          {submitting
            ? <LoaderCircle className="spin" size={18} aria-hidden="true" />
            : null}
          Book Free Demo
          {!submitting && <ArrowRight size={18} aria-hidden="true" />}
        </button>
        <a className="form-whatsapp-link" href={site.whatsapp.href} target="_blank" rel="noopener noreferrer">
          <WhatsAppIcon size={16} /> Prefer WhatsApp? Message us
        </a>
      </div>
      {submitting && <p className="visually-hidden" role="status">Sending your request…</p>}
    </form>
  )
}

export default DemoRegistrationForm
