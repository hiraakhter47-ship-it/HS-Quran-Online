import { useEffect } from 'react'
import { useLocation } from 'react-router'
import { pageTitle } from '../config/site.js'
import { PAGE_META } from '../config/seo.js'

// Absolute site address, injected at build time by vite.config.js.
const SITE_URL = import.meta.env.VITE_SITE_URL || ''

function setMeta(attribute, key, content) {
  let element = document.head.querySelector(`meta[${attribute}="${key}"]`)
  if (!element) {
    element = document.createElement('meta')
    element.setAttribute(attribute, key)
    document.head.appendChild(element)
  }
  element.setAttribute('content', content)
}

function setCanonical(href) {
  let link = document.head.querySelector('link[rel="canonical"]')
  if (!link) {
    link = document.createElement('link')
    link.setAttribute('rel', 'canonical')
    document.head.appendChild(link)
  }
  link.setAttribute('href', href)
}

// Sets the tab title, meta description, canonical URL, Open Graph tags and
// robots rule for the current page. `key` is an entry in src/config/seo.js.
export function usePageMeta(key) {
  const { pathname } = useLocation()
  const meta = PAGE_META[key] || PAGE_META.home

  useEffect(() => {
    const title = pageTitle(meta.title)
    const url = `${SITE_URL}${meta.path ?? pathname}`
    document.title = title
    setMeta('name', 'description', meta.description)
    setMeta('name', 'robots', meta.noindex ? 'noindex, follow' : 'index, follow')
    setMeta('property', 'og:title', title)
    setMeta('property', 'og:description', meta.description)
    setMeta('property', 'og:url', url)
    setMeta('name', 'twitter:title', title)
    setMeta('name', 'twitter:description', meta.description)
    setCanonical(url)
  }, [meta, pathname])
}
