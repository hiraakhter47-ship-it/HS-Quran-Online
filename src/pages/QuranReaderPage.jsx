import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { ROUTES } from '../app/routes.js'
import AyahNumber from '../components/quran/AyahNumber.jsx'
import { siparas } from '../data/siparas.js'
import { usePageMeta } from '../hooks/usePageMeta.js'
import {
  DEFAULT_TRANSLATION,
  fetchAyahsWithTranslation,
  fetchSurahList,
  TOTAL_SURAHS,
} from '../lib/quranApi.js'

// URL format (unchanged from the original site):
//   /quran/read?chapter=<1-114>&from=digital-quran
//   /quran/read?sipara=<1-30>&from=chapters
function QuranReader({ search }) {
  const navigate = useNavigate()
  const params = new URLSearchParams(search)
  const isSipara = params.has('sipara')
  const number = Number(params.get(isSipara ? 'sipara' : 'chapter'))
  const returnPage = params.get('from') === 'chapters' ? 'chapters' : 'digital-quran'
  const lastNumber = isSipara ? siparas.length : TOTAL_SURAHS
  const validNumber = Number.isInteger(number) && number >= 1 && number <= lastNumber
  const [title, setTitle] = useState('Quran Chapter')
  const [subtitle, setSubtitle] = useState('')
  const [ayahs, setAyahs] = useState([])
  const [status, setStatus] = useState('Loading verses…')
  const errorMessage = 'This Quran section could not be found. Return to the list and choose another.'

  useEffect(() => {
    if (!validNumber) return undefined
    const controller = new AbortController()

    async function loadVerses() {
      setStatus('Loading verses…')
      setAyahs([])
      try {
        const [verses, surahList] = await Promise.all([
          fetchAyahsWithTranslation({
            type: isSipara ? 'juz' : 'surah',
            number,
            translationEdition: DEFAULT_TRANSLATION,
          }, controller.signal),
          isSipara ? Promise.resolve(null) : fetchSurahList(),
        ])
        if (controller.signal.aborted) return

        if (isSipara) {
          const sipara = siparas[number - 1]
          setTitle(`Sipara ${number} · ${sipara.transliteration} · ${sipara.urdu}`)
          setSubtitle('Arabic text with English translation')
        } else {
          const surah = surahList.find((item) => item.number === number)
          if (!surah) throw new Error('The selected Surah was not found')
          setTitle(`${surah.englishName} · ${surah.name}`)
          setSubtitle(`${surah.englishNameTranslation} · ${surah.numberOfAyahs} verses`)
        }
        setAyahs(verses.map((verse) => ({
          number: verse.numberInSurah,
          arabic: verse.arabic,
          translation: verse.translation,
        })))
        setStatus('')
      } catch (error) {
        if (error.name === 'AbortError') return
        console.error(`Unable to load ${isSipara ? 'Sipara' : 'Surah'} verses:`, error)
        setStatus('Unable to load these verses right now. Please try again.')
      }
    }

    loadVerses()
    return () => controller.abort()
  }, [isSipara, number, validNumber])

  function navigateToChapter(nextNumber) {
    if (nextNumber < 1 || nextNumber > lastNumber) return
    const type = isSipara ? 'sipara' : 'chapter'
    const source = isSipara ? 'chapters' : returnPage
    navigate(`${ROUTES.quranReader}?${type}=${nextNumber}&from=${source}`)
  }

  function goBack() {
    navigate(returnPage === 'chapters' ? ROUTES.siparas : ROUTES.digitalQuran)
  }

  const displayedTitle = validNumber ? title : isSipara ? 'Sipara not found' : 'Chapter not found'
  const displayedSubtitle = validNumber ? subtitle : ''
  const displayedStatus = validNumber ? status : errorMessage
  const unit = isSipara ? 'Sipara' : 'Surah'

  return (
    <section id="chapter-page" className="quran-page reader-page" aria-label="Quran chapter reader">
      <div className="quran-reader-shell">
        <div className="reader-toolbar">
          <button className="button button-outline button-sm" type="button" onClick={goBack}>
            <ArrowLeft size={16} aria-hidden="true" /> Back to {isSipara ? 'Siparas' : 'Digital Quran'}
          </button>
          <div className="reader-nav">
            <button className="button button-outline button-sm" type="button" disabled={!validNumber || number <= 1} onClick={() => navigateToChapter(number - 1)}>
              <ChevronLeft size={16} aria-hidden="true" /> Previous {unit}
            </button>
            <button className="button button-outline button-sm" type="button" disabled={!validNumber || number >= lastNumber} onClick={() => navigateToChapter(number + 1)}>
              Next {unit} <ChevronRight size={16} aria-hidden="true" />
            </button>
          </div>
        </div>

        <header className="reader-heading">
          <span className="hero-eyebrow">{isSipara ? `Sipara ${validNumber ? number : ''}` : `Surah ${validNumber ? number : ''}`}</span>
          <h1>{displayedTitle}</h1>
          {displayedSubtitle && <p>{displayedSubtitle}</p>}
        </header>

        {!isSipara && <p className="reader-bismillah" lang="ar" dir="rtl">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</p>}

        <div className="verse-list" aria-live="polite">
          {displayedStatus
            ? <p className="verse-status">{displayedStatus}</p>
            : ayahs.map((ayah, index) => (
              <article className="verse" key={`${number}-${index}`}>
                <p className="verse-arabic" lang="ar" dir="rtl">
                  {ayah.arabic} <AyahNumber number={ayah.number} />
                </p>
                <p className="verse-translation">{ayah.translation}</p>
              </article>
            ))}
        </div>
      </div>
    </section>
  )
}

function QuranReaderPage() {
  usePageMeta('quranReader')
  const { search } = useLocation()
  // Remount on every chapter change so each one starts fresh,
  // exactly like the full page load on the original site.
  return <QuranReader key={search} search={search} />
}

export default QuranReaderPage
