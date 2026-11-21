import { ChevronDown } from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { COUNTRIES, getCountry, searchCountries } from '../../lib/registration/countries.js'

// Searchable country dropdown (ARIA combobox pattern).
// Type to filter, use ↑/↓ and Enter, or click an option. Value is an ISO code, e.g. "PK".
function CountrySelect({ id, value, onChange, onBlur, placeholder = 'Select your country', ...ariaProps }) {
  const listId = `${id}-listbox`
  const [query, setQuery] = useState(null) // null = not typing, show the selected name
  const [open, setOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(-1)
  const listRef = useRef(null)
  const inputRef = useRef(null)

  const selected = getCountry(value)
  const options = useMemo(() => (query === null ? COUNTRIES : searchCountries(query)), [query])

  // Keep the highlighted option visible while moving with the keyboard.
  useEffect(() => {
    if (!open || activeIndex < 0) return
    listRef.current?.children[activeIndex]?.scrollIntoView({ block: 'nearest' })
  }, [open, activeIndex])

  function openList() {
    if (open) return
    setOpen(true)
    const selectedIndex = value ? options.findIndex((country) => country.code === value) : -1
    setActiveIndex(selectedIndex >= 0 ? selectedIndex : 0)
  }

  function choose(country) {
    onChange(country.code)
    setQuery(null)
    setOpen(false)
    setActiveIndex(-1)
  }

  function handleInput(event) {
    setQuery(event.target.value)
    setOpen(true)
    setActiveIndex(0)
  }

  function handleKeyDown(event) {
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault()
        if (!open) openList()
        else setActiveIndex((index) => Math.min(index + 1, options.length - 1))
        break
      case 'ArrowUp':
        event.preventDefault()
        if (open) setActiveIndex((index) => Math.max(index - 1, 0))
        break
      case 'Enter':
        if (open && options[activeIndex]) {
          event.preventDefault()
          choose(options[activeIndex])
        }
        break
      case 'Escape':
        if (open) {
          event.preventDefault()
          setOpen(false)
          setQuery(null)
        }
        break
      default:
    }
  }

  function handleBlur(event) {
    // Accept an exact (or autofilled) name; otherwise go back to the last valid choice.
    if (query !== null) {
      const typed = query.trim().toLocaleLowerCase()
      const match = typed && COUNTRIES.find((country) => country.name.toLocaleLowerCase() === typed)
      if (match) onChange(match.code)
      else if (!typed) onChange('')
      setQuery(null)
    }
    setOpen(false)
    onBlur?.(event)
  }

  const activeOption = open && activeIndex >= 0 ? options[activeIndex] : null

  return (
    <div className={`combobox${open ? ' is-open' : ''}`}>
      <input
        ref={inputRef}
        id={id}
        className="form-control combobox-input"
        type="text"
        role="combobox"
        aria-autocomplete="list"
        aria-expanded={open}
        aria-controls={listId}
        aria-activedescendant={activeOption ? `${id}-option-${activeOption.code}` : undefined}
        autoComplete="country-name"
        placeholder={placeholder}
        value={query ?? selected?.name ?? ''}
        onChange={handleInput}
        onFocus={(event) => event.target.select()}
        onClick={openList}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
        {...ariaProps}
      />
      <button
        className="combobox-toggle"
        type="button"
        tabIndex={-1}
        aria-hidden="true"
        onMouseDown={(event) => {
          event.preventDefault()
          if (open) setOpen(false)
          else {
            inputRef.current?.focus()
            openList()
          }
        }}
      >
        <ChevronDown size={18} />
      </button>
      <ul
        ref={listRef}
        id={listId}
        className="combobox-list"
        role="listbox"
        aria-label="Countries"
        hidden={!open}
        onMouseDown={(event) => event.preventDefault()}
      >
        {options.length ? options.map((country, index) => (
          <li
            key={country.code}
            id={`${id}-option-${country.code}`}
            className={`combobox-option${index === activeIndex ? ' is-active' : ''}`}
            role="option"
            aria-selected={country.code === value}
            onClick={() => choose(country)}
            onMouseMove={() => index !== activeIndex && setActiveIndex(index)}
          >
            <span>{country.name}</span>
            <small>+{country.callingCode}</small>
          </li>
        )) : (
          <li className="combobox-empty" role="presentation">No countries match “{query}”</li>
        )}
      </ul>
    </div>
  )
}

export default CountrySelect
