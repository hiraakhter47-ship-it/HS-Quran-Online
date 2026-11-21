import { useEffect, useRef } from 'react'
import { useLocation, useNavigationType } from 'react-router'

// Restores full-page-load scroll behaviour for client-side navigation:
// - a link to "/#free-demo" or "/courses#tajweed" jumps to that section,
// - any other page change starts at the top.
// In-page "#anchor" clicks (and back/forward between them) are left to the
// browser, so they keep the native smooth scrolling.
// Pages load on demand, so the #target may appear a moment later — keep looking briefly.
function ScrollManager() {
  const { pathname, search, hash, key } = useLocation()
  const navigationType = useNavigationType()
  const previousPage = useRef(null)

  useEffect(() => {
    const page = pathname + search
    const samePage = previousPage.current === page
    previousPage.current = page

    if (navigationType === 'POP' && samePage) return undefined

    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    if (!hash) return undefined

    const id = decodeURIComponent(hash.slice(1))
    let timer = 0
    const started = Date.now()
    const findTarget = () => {
      const target = document.getElementById(id)
      if (target) {
        target.scrollIntoView({ behavior: 'instant' })
      } else if (Date.now() - started < 3000) {
        timer = setTimeout(findTarget, 50)
      }
    }
    findTarget()
    return () => clearTimeout(timer)
  }, [pathname, search, hash, key, navigationType])

  return null
}

export default ScrollManager
