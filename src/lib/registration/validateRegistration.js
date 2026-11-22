import { isValidPhoneNumber } from 'libphonenumber-js'
import { getCourseById } from '../../data/courses.js'
import { getCountry } from './countries.js'

// Rules for the Book a Free Demo form. Each validator returns an error message or ''.

export const AGE_MIN = 3
export const AGE_MAX = 80

const NAME_PATTERN = /^[\p{L}\p{M}][\p{L}\p{M}' .-]*$/u
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export const fieldValidators = {
  fullName(value) {
    const name = value.trim()
    if (!name) return 'Please enter the full name.'
    if (name.length < 2) return 'The name is too short.'
    if (name.length > 80) return 'Please keep the name under 80 characters.'
    if (!NAME_PATTERN.test(name)) return 'Please use letters only (spaces, hyphens and apostrophes are fine).'
    return ''
  },

  age(value) {
    const text = String(value).trim()
    if (!text) return 'Please enter the student’s age.'
    if (!/^\d+$/.test(text)) return 'Please enter the age as a whole number.'
    const age = Number(text)
    if (age < AGE_MIN || age > AGE_MAX) return `Please enter an age between ${AGE_MIN} and ${AGE_MAX}.`
    return ''
  },

  country(value) {
    if (!value) return 'Please select your country.'
    if (!getCountry(value)) return 'Please choose a country from the list.'
    return ''
  },

  email(value) {
    const email = value.trim()
    if (!email) return 'Please enter an email address.'
    if (!EMAIL_PATTERN.test(email)) return 'Please enter a valid email address, e.g. name@example.com.'
    return ''
  },

  whatsapp(value) {
    // value is the full international number, e.g. "+923001234567"
    const digits = (value || '').replace(/\D/g, '')
    if (!digits) return 'Please enter a WhatsApp number.'
    if (!isValidPhoneNumber(value)) return 'Please enter a valid WhatsApp number, including the country code.'
    return ''
  },

  course(value) {
    if (!value) return 'Please choose a course.'
    if (!getCourseById(value)) return 'Please choose a course from the list.'
    return ''
  },
}

export const FIELD_ORDER = ['fullName', 'age', 'country', 'email', 'whatsapp', 'course']

// Validates every field; returns { fieldName: message } for the invalid ones only.
export function validateRegistration(values) {
  const errors = {}
  for (const field of FIELD_ORDER) {
    const message = fieldValidators[field](values[field] ?? '')
    if (message) errors[field] = message
  }
  return errors
}
