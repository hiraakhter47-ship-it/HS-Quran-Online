import { useEffect, useState } from 'react'
import { siparas } from '../data/siparas.js'

function ChaptersPage({ mode }) {
  const isSurahDirectory = mode === 'surah'
  const [surahs, setSurahs] = useState([])
  const [status, setStatus] = useState(isSurahDirectory ? 'Loading Quran chapters…' : '')

  useEffect(() => {
    if (!isSurahDirectory) return undefined

    const controller = new AbortController()
    async function loadSurahs() {
      try {
        const response = await fetch('https://api.alquran.cloud/v1/surah', {
          signal: controller.signal,
        })
        if (!response.ok) throw new Error(`Surah list request failed (${response.status})`)
        const result = await response.json()
        if (!Array.isArray(result.data)) throw new Error('Surah list response was not valid')
        setSurahs(result.data)
        setStatus('')
      } catch (error) {
        if (error.name === 'AbortError') return
        console.error('Unable to load Quran chapters:', error)
        setStatus('Unable to load Quran chapters right now. Please check your connection and refresh the page.')
      }
    }

    loadSurahs()
    return () => controller.abort()
  }, [isSurahDirectory])

  const chapters = isSurahDirectory ? surahs : siparas

  return (
    <div id="chapters-directory">
      <div className="chapter-directory-banner">
        <h1 id="chapter-directory-title">{isSurahDirectory ? 'Digital Holy Quran' : 'Quran Siparas'}</h1>
        <p>
          <a href="index.html#home">Home</a> &nbsp;/&nbsp; <a href="materials.html">Materials</a>
          &nbsp;/&nbsp; <span>{isSurahDirectory ? 'Digital Holy Quran' : 'Quran Siparas'}</span>
        </p>
      </div>
      <div className="chapter-directory-heading">
        <h2>Read the Holy Quran</h2>
        <p>
          Select a {isSurahDirectory ? 'chapter' : 'Sipara'} to read Arabic text with English translation.
        </p>
      </div>
      <div className="chapter-directory-shell">
        <a className="button button-outline chapter-directory-back" href="materials.html">
          <span className="button-arrow">←</span> Back to materials
        </a>
        {!isSurahDirectory && (
          <p className="chapter-pdf-link-wrap">
            <a className="button button-primary" href="https://quran-online.ca/pdf-quran-chapters.html" target="_blank" rel="noopener noreferrer">
              Open Quran Chapters PDF collection <span className="button-arrow">↗</span>
            </a>
          </p>
        )}
        <div className="chapter-directory-grid" aria-live="polite">
          {status ? <p className="chapter-directory-status">{status}</p> : chapters.map((chapter, index) => {
            const number = isSurahDirectory ? chapter.number : index + 1
            const href = isSurahDirectory
              ? `quran-reader.html?chapter=${number}&from=digital-quran`
              : `quran-reader.html?sipara=${number}&from=chapters`
            return (
              <a
                className="chapter-directory-item"
                href={href}
                key={number}
                aria-label={isSurahDirectory
                  ? `Read chapter ${chapter.number}: ${chapter.englishName}`
                  : `Read Sipara ${number}: ${chapter.transliteration}`}
              >
                <strong>{isSurahDirectory
                  ? `Chapter ${String(chapter.number).padStart(2, '0')}`
                  : `Sipara ${String(number).padStart(2, '0')}`}
                </strong>
                {isSurahDirectory
                  ? <span lang="ar" dir="rtl">{chapter.name}</span>
                  : <span className="sipara-name-urdu" lang="ur" dir="rtl">{chapter.urdu}</span>}
              </a>
            )
          })}
        </div>
        <div className="chapter-directory-contact">
          <div>
            <h2>HS Quran Online</h2>
            <p>Founder: Usman Lohan &nbsp;·&nbsp; CEO: Hira Usman</p>
          </div>
          <div className="chapter-directory-contact-links">
            <a href="mailto:hiraakhter47@gmail.com">hiraakhter47@gmail.com</a>
            <a href="tel:+923368277776">+92 336 8277776</a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChaptersPage
