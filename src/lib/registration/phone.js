import { parsePhoneNumberFromString } from 'libphonenumber-js'
import { getCountry } from './countries.js'

// Combines the chosen country code and the typed number into one international
// number, e.g. ("PK", "0300 1234567") → "+923001234567". Returns '' when empty.
export function toInternationalNumber(country, nationalNumber) {
  const typed = (nationalNumber || '').trim()
  if (!typed) return ''
  if (typed.startsWith('+')) return typed.replace(/[^\d+]/g, '')
  const info = getCountry(country)
  if (!info) return typed.replace(/\D/g, '') // no code chosen yet → fails validation
  const parsed = parsePhoneNumberFromString(typed, country)
  return parsed ? parsed.number : `+${info.callingCode}${typed.replace(/\D/g, '')}`
}

// Main country for dialling codes shared by several countries (+1, +44, +7 …).
const MAIN_COUNTRY_FOR_CODE = {
  1: 'US', 7: 'RU', 39: 'IT', 44: 'GB', 47: 'NO', 61: 'AU', 212: 'MA', 262: 'RE', 290: 'SH', 358: 'FI', 590: 'GP', 599: 'CW',
}

// If a complete international number was typed/pasted (e.g. "+44 7911 123456"),
// returns its country and national part so the code picker can be updated.
// `preferred` countries (the chosen Country, the current code) win when they share the dialling code.
export function splitInternationalNumber(text, preferred = []) {
  if (!text.trim().startsWith('+')) return null
  const parsed = parsePhoneNumberFromString(text)
  if (!parsed?.countryCallingCode || !parsed.isPossible()) return null
  const callingCode = parsed.countryCallingCode
  const country =
    preferred.find((code) => getCountry(code)?.callingCode === callingCode) ||
    MAIN_COUNTRY_FOR_CODE[callingCode] ||
    parsed.country
  if (!getCountry(country)) return null
  return { country, national: parsed.formatNational() }
}
