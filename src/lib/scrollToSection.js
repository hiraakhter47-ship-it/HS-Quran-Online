// Click handler for in-page links such as <a href="#free-demo">.
// Scrolls smoothly to the section WITHOUT adding "#free-demo" to the address bar,
// and moves keyboard focus there. If the target is missing, the browser's normal
// anchor behaviour takes over.
export function scrollToSection(event) {
  const href = event.currentTarget.getAttribute('href')
  if (!href || !href.startsWith('#')) return
  const target = document.getElementById(href.slice(1))
  if (!target) return

  event.preventDefault()
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' })

  // Let keyboard and screen-reader users continue from the new position.
  if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1')
  target.focus({ preventScroll: true })
}
