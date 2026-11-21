import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { ROUTES } from '../app/routes.js'
import AyahNumber from '../components/quran/AyahNumber.jsx'
import PageHero from '../components/ui/PageHero.jsx'
import { usePageMeta } from '../hooks/usePageMeta.js'
import {
  DEFAULT_TRANSLATION as DEFAULT_EDITION,
  fetchAyahsWithTranslation,
  fetchSurahList,
  fetchTranslationEditions,
  TOTAL_SURAHS,
} from '../lib/quranApi.js'

function DigitalQuranPage() {
  usePageMeta('digitalQuran')
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
        const [surahList, editionList] = await Promise.all([
          fetchSurahList(),
          fetchTranslationEditions(controller.signal),
        ])
        if (controller.signal.aborted) return

        const availableEditions = editionList.filter(
          (edition) => edition.type === 'translation' && edition.identifier && edition.language,
        )
        if (!availableEditions.length) throw new Error('No Quran translations are available')

        setSurahs(surahList)
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
        const verses = await fetchAyahsWithTranslation({
          type: 'surah',
          number: surahNumber,
          arabicEdition: 'quran-uthmani',
          translationEdition: editionId,
        }, controller.signal)

        setAyahs(verses.map((verse) => ({
          number: verse.numberInSurah,
          arabic: verse.arabic,
          translation: verse.translation,
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
    <>
      <PageHero
        eyebrow="Digital Quran"
        title={<>Read the <span className="text-highlight">Holy Quran</span></>}
        description="Choose a Surah and a translation language to read the Arabic text together with its meaning."
        breadcrumb="Digital Quran"
        trail={[{ label: 'Quran Resources', to: ROUTES.quranResources }]}
        compact
      />
      <section className="quran-page" aria-label="Digital Holy Quran reader">
        <div className="quran-reader-shell">
          <div className="quran-controls">
            <label className="quran-control">
              <span>Surah</span>
              <select
                className="form-control form-select"
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
            <label className="quran-control">
              <span>Translation language</span>
              <select
                className="form-control form-select"
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

          <div className="surah-bar">
            <button type="button" className="surah-bar-button" onClick={() => changeSurah(-1)} disabled={!selectedSurah || selectedSurah.number <= 1} aria-label="Previous Surah">
              <ChevronLeft size={22} aria-hidden="true" />
            </button>
            <div className="surah-bar-title">
              <span className="surah-bar-arabic" lang="ar" dir="rtl">{selectedSurah?.name}</span>
              <strong>{selectedSurah ? `${selectedSurah.number}. ${selectedSurah.englishName}` : 'Holy Quran'}</strong>
              {selectedSurah && <small>{selectedSurah.englishNameTranslation} · {selectedSurah.numberOfAyahs} verses</small>}
            </div>
            <button type="button" className="surah-bar-button" onClick={() => changeSurah(1)} disabled={!selectedSurah || selectedSurah.number >= TOTAL_SURAHS} aria-label="Next Surah">
              <ChevronRight size={22} aria-hidden="true" />
            </button>
          </div>

          <div className="verse-list" aria-live="polite">
            {status
              ? <p className="verse-status">{status}</p>
              : ayahs.map((ayah) => (
                <article className="verse" key={`${surahNumber}-${ayah.number}`}>
                  <span className="verse-ref">{surahNumber}:{ayah.number}</span>
                  <p className="verse-arabic" lang="ar" dir="rtl">
                    {ayah.arabic} <AyahNumber number={ayah.number} />
                  </p>
                  <p className="verse-translation">{ayah.translation}</p>
                </article>
              ))}
          </div>
          {selectedEdition && <p className="verse-credit">Translation: {selectedEdition.englishName}</p>}
        </div>
      </section>
    </>
  )
}

export default DigitalQuranPage
