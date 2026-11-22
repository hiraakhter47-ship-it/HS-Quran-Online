// Shared client for the AlQuran Cloud API (https://alquran.cloud/api).
// All Quran pages use these helpers instead of calling fetch directly.

export const QURAN_API = 'https://api.alquran.cloud/v1'
export const DEFAULT_TRANSLATION = 'en.asad'
export const TOTAL_SURAHS = 114

async function getJson(path, signal) {
  const response = await fetch(`${QURAN_API}${path}`, { signal })
  if (!response.ok) throw new Error(`Quran API request failed (${response.status}): ${path}`)
  return response.json()
}

// The Surah list never changes, so it is fetched once and shared by every page.
let surahListPromise = null
let cachedSurahList = null

// Returns the Surah list if it has already been loaded, otherwise null.
export function getCachedSurahList() {
  return cachedSurahList
}

export function fetchSurahList() {
  if (!surahListPromise) {
    surahListPromise = getJson('/surah')
      .then((result) => {
        if (!Array.isArray(result.data)) throw new Error('Surah list response was not valid')
        cachedSurahList = result.data
        return result.data
      })
      .catch((error) => {
        surahListPromise = null // allow a retry on the next request
        throw error
      })
  }
  return surahListPromise
}

export async function fetchTranslationEditions(signal) {
  const result = await getJson('/edition?type=translation', signal)
  if (!Array.isArray(result.data)) throw new Error('Quran reading options were not valid')
  return result.data
}

// Returns the ayahs of a Surah or Juz (Sipara).
// `edition` omitted = the API's default Arabic text (same as the original pages used).
export async function fetchAyahs({ type, number, edition }, signal) {
  const base = type === 'juz' ? `/juz/${number}` : `/surah/${number}`
  const result = await getJson(edition ? `${base}/${edition}` : base, signal)
  const ayahs = result.data?.ayahs
  if (!Array.isArray(ayahs)) throw new Error('The verse response was incomplete')
  return ayahs
}

// Fetches Arabic text and a translation together and pairs them verse by verse.
export async function fetchAyahsWithTranslation({ type, number, arabicEdition, translationEdition }, signal) {
  const [arabic, translation] = await Promise.all([
    fetchAyahs({ type, number, edition: arabicEdition }, signal),
    fetchAyahs({ type, number, edition: translationEdition }, signal),
  ])
  if (arabic.length !== translation.length) throw new Error('The verse response was incomplete')
  return arabic.map((ayah, index) => ({
    numberInSurah: ayah.numberInSurah,
    arabic: ayah.text,
    translation: translation[index].text,
  }))
}
