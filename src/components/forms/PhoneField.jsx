import { ChevronDown } from 'lucide-react'
import { COUNTRIES, getCountry } from '../../lib/registration/countries.js'
import { splitInternationalNumber } from '../../lib/registration/phone.js'

// WhatsApp number input with an editable country-code picker.
// The picker is a native <select> (great on phones); a compact "PK +92" label is shown over it.
function PhoneField({ id, country, number, preferredCountry, onCountryChange, onNumberChange, onBlur, ...ariaProps }) {
  const selected = getCountry(country)

  function handleNumberChange(event) {
    const text = event.target.value
    const split = splitInternationalNumber(text, [preferredCountry, country].filter(Boolean))
    if (split) {
      onCountryChange(split.country, { manual: true })
      onNumberChange(split.national)
      return
    }
    onNumberChange(text)
  }

  return (
    <div className="phone-field">
      <div className="phone-code">
        <span className="phone-code-display" aria-hidden="true">
          {selected ? `${selected.code} +${selected.callingCode}` : 'Code'}
          <ChevronDown size={16} />
        </span>
        <select
          className="phone-code-select"
          aria-label="WhatsApp country code"
          value={country}
          onChange={(event) => onCountryChange(event.target.value, { manual: true })}
          onBlur={onBlur}
        >
          <option value="">Choose code</option>
          {COUNTRIES.map((item) => (
            <option key={item.code} value={item.code}>{item.name} (+{item.callingCode})</option>
          ))}
        </select>
      </div>
      <input
        id={id}
        className="form-control phone-number"
        type="tel"
        inputMode="tel"
        autoComplete="tel-national"
        placeholder="WhatsApp number"
        value={number}
        onChange={handleNumberChange}
        onBlur={onBlur}
        {...ariaProps}
      />
    </div>
  )
}

export default PhoneField
