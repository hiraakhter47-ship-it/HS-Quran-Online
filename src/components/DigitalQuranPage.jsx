import { useEffect, useMemo, useState } from 'react'

const API = 'https://api.alquran.cloud/v1'
const DEFAULT_EDITION = 'en.asad'

function DigitalQuranPage() {
  const [surahs, setSurahs] = useState([])
  const [editions, setEditions] = useState([])
  const [surahNumber, setSurahNumber] = useState('1')
  const [editionId, setEditionId] = useState(DEFAULT_EDITION)
  const [ayahs, setAyahs] = useState([])
  const [status, setStatus] = useState('Loading Quran…')
  const [metadataLoaded, setMetadataLoaded] = useState(false)

  const languageEditions = useMemo(() => {
    const byLanguage = new Map()
    for (const edition of editions) {
      if (!byLanguage.has(edition.language)) byLanguage.set(edition.language, edition)
      if (edition.identifier === DEFAULT_EDITION) byLanguage.set(edition.language, edition)
    }
    return [...byLanguage.entries()]
      .map(([language, edition]) => ({ language, edition }))
      .sort((a, b) => a.language.localeCompare(b.language))
  }, [editions])
  const languageNames = useMemo(() => new Intl.DisplayNames(['en'], { type: 'language' }), [])

  useEffect(() => {
    const controller = new AbortController()

    async function loadOptions() {
      try {
        const [surahResponse, editionResponse] = await Promise.all([
          fetch(`${API}/surah`, { signal: controller.signal }),
          fetch(`${API}/edition?type=translation`, { signal: controller.signal }),
        ])
        if (!surahResponse.ok || !editionResponse.ok) {
          throw new Error('Quran reading options could not be loaded')
        }

        const [surahResult, editionResult] = await Promise.all([
          surahResponse.json(),
          editionResponse.json(),
        ])
        if (!Array.isArray(surahResult.data) || !Array.isArray(editionResult.data)) {
          throw new Error('Quran reading options were not valid')
        }

        const availableEditions = editionResult.data.filter(
          (edition) => edition.type === 'translation' && edition.identifier && edition.language,
        )
        if (!availableEditions.length) throw new Error('No Quran translations are available')

        setSurahs(surahResult.data)
        setEditions(availableEditions)
        if (!availableEditions.some((edition) => edition.identifier === DEFAULT_EDITION)) {
          const englishEdition = availableEditions.find((edition) => edition.language === 'en')
          if (englishEdition) setEditionId(englishEdition.identifier)
          else setEditionId(availableEditions[0].identifier)
        }
        setMetadataLoaded(true)
      } catch (error) {
        if (error.name === 'AbortError') return
        console.error('Unable to load Quran reading options:', error)
        setStatus('Unable to load Quran reading options. Please check your connection and refresh the page.')
      }
    }

    loadOptions()
    return () => controller.abort()
  }, [])

  useEffect(() => {
    if (!metadataLoaded || !surahNumber || !editionId) return undefined
    const controller = new AbortController()

    async function loadAyahs() {
      setStatus('Loading verses…')
      setAyahs([])
      try {
        const [arabicResponse, translationResponse] = await Promise.all([
          fetch(`${API}/surah/${surahNumber}/quran-uthmani`, { signal: controller.signal }),
          fetch(`${API}/surah/${surahNumber}/${editionId}`, { signal: controller.signal }),
        ])
        if (!arabicResponse.ok || !translationResponse.ok) {
          throw new Error('The verse request failed')
        }

        const [arabicResult, translationResult] = await Promise.all([
          arabicResponse.json(),
          translationResponse.json(),
        ])
        const arabicAyahs = arabicResult.data?.ayahs
        const translatedAyahs = translationResult.data?.ayahs
        if (!Array.isArray(arabicAyahs) || !Array.isArray(translatedAyahs) ||
          arabicAyahs.length !== translatedAyahs.length) {
          throw new Error('The verse response was incomplete')
        }

        setAyahs(arabicAyahs.map((ayah, index) => ({
          number: ayah.numberInSurah,
          arabic: ayah.text,
          translation: translatedAyahs[index].text,
        })))
        setStatus('')
      } catch (error) {
        if (error.name === 'AbortError') return
        console.error('Unable to load Quran verses:', error)
        setStatus('Unable to load these verses right now. Please try again.')
      }
    }

    loadAyahs()
    return () => controller.abort()
  }, [editionId, metadataLoaded, surahNumber])

  const selectedSurah = surahs.find((surah) => String(surah.number) === surahNumber)
  const selectedEdition = editions.find((edition) => edition.identifier === editionId)

  function changeSurah(step) {
    const nextNumber = Number(surahNumber) + step
    if (nextNumber >= 1 && nextNumber <= surahs.length) setSurahNumber(String(nextNumber))
  }

  return (
    <div id="digital-quran">
      <div className="digital-quran-banner">
        <h1>Holy Quran</h1>
        <p><a href="index.html#home">Home</a> &nbsp;/&nbsp; <span>Holy Quran</span></p>
      </div>
      <section className="digital-quran-reader" aria-label="Digital Holy Quran reader">
        <div className="digital-quran-heading">
          <h2>Holy <strong>Quran</strong></h2>
        </div>
        <div className="digital-quran-controls">
          <label>
            <span>Choose Sura</span>
            <select
              aria-label="Choose Sura"
              value={surahNumber}
              onChange={(event) => setSurahNumber(event.target.value)}
              disabled={!surahs.length}
            >
              {surahs.map((surah) => (
                <option value={surah.number} key={surah.number}>
                  {surah.number}. {surah.englishName} · {surah.name}
                </option>
              ))}
            </select>
          </label>
          <label>
            <span>Choose Language</span>
            <select
              aria-label="Choose translation language"
              value={editionId}
              onChange={(event) => setEditionId(event.target.value)}
              disabled={!languageEditions.length}
            >
              {languageEditions.map(({ language, edition }) => (
                <option value={edition.identifier} key={language}>
                  {languageNames.of(language) || language}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className="digital-quran-surah">
          <button type="button" onClick={() => changeSurah(-1)} disabled={!selectedSurah || selectedSurah.number <= 1} aria-label="Previous Sura">‹</button>
          <strong>{selectedSurah?.englishName || 'Holy Quran'}</strong>
          <span lang="ar" dir="rtl">{selectedSurah?.name}</span>
          <button type="button" onClick={() => changeSurah(1)} disabled={!selectedSurah || selectedSurah.number >= 114} aria-label="Next Sura">›</button>
        </div>
        <div className="digital-quran-verses" aria-live="polite">
          {status
            ? <p className="digital-quran-status">{status}</p>
            : ayahs.map((ayah) => (
              <article className="digital-quran-ayah" key={`${surahNumber}-${ayah.number}`}>
                <p className="digital-quran-arabic" lang="ar" dir="rtl">
                  {ayah.arabic} <span>۝{ayah.number}</span>
                </p>
                <p className="digital-quran-translation">
                  {surahNumber}|{ayah.number}|{ayah.translation}
                </p>
              </article>
            ))}
        </div>
        {selectedEdition && <p className="digital-quran-translation-credit">Translation: {selectedEdition.englishName}</p>}
      </section>
    </div>
  )
}

export default DigitalQuranPage
