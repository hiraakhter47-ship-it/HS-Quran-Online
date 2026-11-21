import { useEffect, useState } from 'react'
import { fetchSurahList, getCachedSurahList } from '../lib/quranApi.js'

// Loads the list of 114 Surahs (cached across pages).
// Returns { surahs, loading, error }.
export function useSurahs({ enabled = true } = {}) {
  const [state, setState] = useState(() => {
    const cached = getCachedSurahList()
    return cached
      ? { surahs: cached, loading: false, error: null }
      : { surahs: [], loading: enabled, error: null }
  })

  useEffect(() => {
    if (!enabled || getCachedSurahList()) return undefined
    let active = true

    fetchSurahList()
      .then((surahs) => {
        if (active) setState({ surahs, loading: false, error: null })
      })
      .catch((error) => {
        if (!active) return
        console.error('Unable to load Surahs:', error)
        setState({ surahs: [], loading: false, error })
      })

    return () => { active = false }
  }, [enabled])

  return state
}
