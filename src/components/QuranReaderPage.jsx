import { useEffect, useState } from 'react'
import { siparas } from '../data/siparas.js'

const API = 'https://api.alquran.cloud/v1'

function QuranReaderPage() {
  const search = new URLSearchParams(window.location.search)
  const isSipara = search.has('sipara')
  const number = Number(search.get(isSipara ? 'sipara' : 'chapter'))
  const returnPage = search.get('from') === 'chapters' ? 'chapters' : 'digital-quran'
  const validNumber = Number.isInteger(number) &&
    number >= 1 && number <= (isSipara ? siparas.length : 114)
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
        const [arabicResponse, translationResponse, surahListResponse] = await Promise.all([
          fetch(`${API}/${isSipara ? `juz/${number}` : `surah/${number}`}`, { signal: controller.signal }),
          fetch(`${API}/${isSipara ? `juz/${number}` : `surah/${number}`}/en.asad`, { signal: controller.signal }),
          isSipara ? Promise.resolve(null) : fetch(`${API}/surah`, { signal: controller.signal }),
        ])
        if (!arabicResponse.ok || !translationResponse.ok || (surahListResponse && !surahListResponse.ok)) {
          throw new Error('The verse request failed')
        }

        const [arabicResult, translationResult, surahList] = await Promise.all([
          arabicResponse.json(),
          translationResponse.json(),
          surahListResponse ? surahListResponse.json() : Promise.resolve(null),
        ])
        const arabicAyahs = arabicResult.data?.ayahs
        const translatedAyahs = translationResult.data?.ayahs
        if (!Array.isArray(arabicAyahs) || !Array.isArray(translatedAyahs) ||
          arabicAyahs.length !== translatedAyahs.length) {
          throw new Error('The verse response was incomplete')
        }
        if (!isSipara && !Array.isArray(surahList?.data)) {
          throw new Error('Surah list response was not valid')
        }

        if (isSipara) {
          const sipara = siparas[number - 1]
          setTitle(`Sipara ${number} · ${sipara.transliteration} · ${sipara.urdu}`)
          setSubtitle('Arabic text with English translation')
        } else {
          const surah = surahList.data.find((item) => item.number === number)
          if (!surah) throw new Error('The selected Surah was not found')
          setTitle(`${surah.englishName} · ${surah.name}`)
          setSubtitle(`${surah.englishNameTranslation} · ${surah.numberOfAyahs} verses`)
        }
        setAyahs(arabicAyahs.map((ayah, index) => ({
          arabic: `${ayah.text} ۝${ayah.numberInSurah}`,
          translation: translatedAyahs[index].text,
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
    if (nextNumber < 1 || nextNumber > (isSipara ? siparas.length : 114)) return
    const type = isSipara ? 'sipara' : 'chapter'
    const source = isSipara ? 'chapters' : returnPage
    window.location.href = `quran-reader.html?${type}=${nextNumber}&from=${source}`
  }

  const displayedTitle = validNumber ? title : isSipara ? 'Sipara not found' : 'Chapter not found'
  const displayedSubtitle = validNumber ? subtitle : ''
  const displayedStatus = validNumber ? status : errorMessage

  return (
    <div id="chapter-page" className="chapter-page" aria-label="Quran chapter reader">
      <div className="chapter-shell">
        <div className="chapter-toolbar">
          <button className="chapter-back" type="button" onClick={() => { window.location.href = `${returnPage}.html` }}>
            ← Back to chapters
          </button>
          <div className="chapter-navigation">
            <button type="button" disabled={!validNumber || number <= 1} onClick={() => navigateToChapter(number - 1)}>← Previous</button>
            <button type="button" disabled={!validNumber || number >= (isSipara ? siparas.length : 114)} onClick={() => navigateToChapter(number + 1)}>Next →</button>
          </div>
        </div>
        <div className="reader-heading">
          <h2>{displayedTitle}</h2>
          <p>{displayedSubtitle}</p>
        </div>
        {!isSipara && <p className="chapter-bismillah" lang="ar" dir="rtl">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</p>}
        <div className="chapter-verses" aria-live="polite">
          {displayedStatus
            ? <p className="chapter-status">{displayedStatus}</p>
            : ayahs.map((ayah, index) => (
              <article className="ayah" key={`${number}-${index}`}>
                <div className="ayah-arabic" lang="ar" dir="rtl">{ayah.arabic}</div>
                <p className="ayah-translation">{ayah.translation}</p>
              </article>
            ))}
        </div>
      </div>
    </div>
  )
}

export default QuranReaderPage
