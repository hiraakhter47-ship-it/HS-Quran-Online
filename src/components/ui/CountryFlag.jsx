import { AE, AU, BD, BH, CA, DE, FR, GB, IE, IN, KW, MY, NL, NO, NZ, OM, PK, QA, SA, SE, SG, US, ZA } from 'country-flag-icons/react/3x2'

// Flags for the countries our learners are most likely to be in. To show another
// country, import its flag above and add it here (ISO 3166-1 alpha-2 code).
const FLAGS = { AE, AU, BD, BH, CA, DE, FR, GB, IE, IN, KW, MY, NL, NO, NZ, OM, PK, QA, SA, SE, SG, US, ZA }

// Decorative: the country name is always written out next to it. Renders nothing
// when the country is unknown, so a missing flag never breaks a card.
function CountryFlag({ code, className = 'country-flag' }) {
  const Flag = FLAGS[String(code || '').toUpperCase()]
  if (!Flag) return null
  return <Flag className={className} aria-hidden="true" focusable="false" />
}

export default CountryFlag
