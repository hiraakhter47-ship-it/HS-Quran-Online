import { useState } from 'react'
import { Link } from 'react-router'
import { surahReaderUrl } from '../../app/routes.js'
import { useSurahs } from '../../hooks/useSurahs.js'

// Searchable list of the 114 Surahs, linking to the Quran Reader.
// (Moved unchanged from the old homepage to the Learning Materials page.)
function QuranBrowser() {
  const { surahs, loading, error } = useSurahs()
  const [query, setQuery] = useState('')
  const [showAll, setShowAll] = useState(false)
  const status = loading
    ? 'Loading Surahs…'
    : error
      ? 'Unable to load Surahs right now. Please check your connection and refresh the page.'
      : ''

  const term = query.trim().toLocaleLowerCase()
  const matches = surahs.filter((surah) =>
    surah.englishName.toLocaleLowerCase().includes(term) ||
    surah.englishNameTranslation.toLocaleLowerCase().includes(term) ||
    surah.name.includes(query.trim()) ||
    String(surah.number) === term
  )
  const visibleSurahs = term || showAll ? matches : matches.slice(0, 12)

  return (
    <section className="quran-section" id="quran-reader">
      <div className="container quran-layout">
        <div className="quran-copy">
          <span className="section-eyebrow">The Holy Quran</span>
          <h2>Read, reflect and reconnect.</h2>
          <p>Explore the Surahs and read Arabic with an English translation. Search by name, meaning or number to find a chapter.</p>
        </div>
        <div className="quran-tool">
          <label htmlFor="surah-search">Find a Surah</label>
          <input
            className="quran-search"
            id="surah-search"
            type="search"
            placeholder="Search by name, number or meaning..."
            autoComplete="off"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          <div className={`surah-results${showAll || term ? ' is-expanded' : ''}`} aria-live="polite">
            {status ? <p className="surah-status">{status}</p> : visibleSurahs.length ? visibleSurahs.map((surah) => (
              <Link
                className="surah-item"
                to={surahReaderUrl(surah.number)}
                key={surah.number}
              >
                <span>
                  <strong>{surah.number}. {surah.englishName}</strong>
                  <small>{surah.englishNameTranslation} · {surah.numberOfAyahs} verses</small>
                </span>
                <span className="surah-arabic" lang="ar" dir="rtl">{surah.name}</span>
              </Link>
            )) : <p className="surah-status">No Surahs found. Try another search.</p>}
          </div>
          <button
            className="browse-chapters"
            type="button"
            aria-expanded={showAll}
            hidden={Boolean(term) || surahs.length <= 12}
            onClick={() => setShowAll((value) => !value)}
          >
            {showAll ? 'Show fewer Surahs ↑' : 'Browse all 114 Surahs ↓'}
          </button>
        </div>
      </div>
    </section>
  )
}

export default QuranBrowser
