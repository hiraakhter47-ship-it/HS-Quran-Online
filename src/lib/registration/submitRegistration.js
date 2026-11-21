import { parsePhoneNumber } from 'libphonenumber-js'
import { getCourseById } from '../../data/courses.js'
import { getCountry } from './countries.js'
import { sendWithDevLogger } from './senders/devSender.js'
import { sendWithWeb3Forms } from './senders/web3formsSender.js'

// Submission entry point for the Book a Free Demo form.
// The form only calls submitRegistration(); which service delivers the email is decided here.
//
//   VITE_WEB3FORMS_ACCESS_KEY set  → Web3Forms (emails the academy)
//   not set, development (npm run dev) → logs to the console and pretends to succeed
//   not set, production build      → NotConfiguredError (form shows "temporarily unavailable")

export class NotConfiguredError extends Error {
  constructor() {
    super('Online registration is not configured')
    this.name = 'NotConfiguredError'
  }
}

const WEB3FORMS_ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY

function formatWhatsApp(value) {
  try {
    return parsePhoneNumber(value).formatInternational()
  } catch {
    return value
  }
}

// Turns raw form values into the labelled record that is emailed to the academy.
export function buildRegistration(values, { source } = {}) {
  const country = getCountry(values.country)
  const course = getCourseById(values.course)
  return {
    'Full Name': values.fullName.trim(),
    'Age of Student': String(Number(values.age)),
    Country: country ? country.name : values.country,
    Email: values.email.trim(),
    'WhatsApp Number': formatWhatsApp(values.whatsapp),
    Course: course ? course.title : values.course,
    'Submitted From': source || 'Website',
  }
}

export async function submitRegistration(values, { source, botcheck } = {}) {
  const registration = buildRegistration(values, { source })

  if (WEB3FORMS_ACCESS_KEY) {
    return sendWithWeb3Forms(registration, { accessKey: WEB3FORMS_ACCESS_KEY, botcheck })
  }
  if (import.meta.env.DEV) {
    return sendWithDevLogger(registration)
  }
  throw new NotConfiguredError()
}
