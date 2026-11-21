import { getCountries, getCountryCallingCode } from 'libphonenumber-js'

// Every country libphonenumber knows, with an English name and dialling code.
// Used by both the Country field and the WhatsApp country-code picker.

const regionNames = new Intl.DisplayNames(['en'], { type: 'region' })

function countryName(code) {
  try {
    return regionNames.of(code) || code
  } catch {
    return code
  }
}

export const COUNTRIES = getCountries()
  .map((code) => ({
    code,
    name: countryName(code),
    callingCode: getCountryCallingCode(code),
  }))
  .filter((country) => country.name !== country.code) // drop codes without a proper name
  .sort((a, b) => a.name.localeCompare(b.name))

const byCode = new Map(COUNTRIES.map((country) => [country.code, country]))

export function getCountry(code) {
  return byCode.get(code) || null
}

// Search helper for the Country field: names starting with the text first, then other matches.
export function searchCountries(text) {
  const term = text.trim().toLocaleLowerCase()
  if (!term) return COUNTRIES
  const starts = []
  const contains = []
  for (const country of COUNTRIES) {
    const name = country.name.toLocaleLowerCase()
    if (name.startsWith(term) || country.code.toLowerCase() === term) starts.push(country)
    else if (name.includes(term) || `+${country.callingCode}`.startsWith(term)) contains.push(country)
  }
  return [...starts, ...contains]
}
