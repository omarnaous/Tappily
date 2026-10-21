// Pauses smooth scrolling (Lenis, when present) and native page scroll while an overlay is open.
export function lockScroll() {
  window.__lenis?.stop()
  document.documentElement.style.overflow = 'hidden'
}

export function unlockScroll() {
  window.__lenis?.start()
  document.documentElement.style.overflow = ''
}

// Sections carry their own scroll-margin-top (scroll-mt-24), which Lenis respects, so no extra offset here.
export const NAV_OFFSET = 0

/** Smooth-scrolls to an in-page anchor, through Lenis when it is running. */
export function scrollToHash(hash) {
  const el = hash === '#top' ? document.body : document.querySelector(hash)
  if (!el) return
  const target = hash === '#top' ? 0 : el
  if (window.__lenis) window.__lenis.scrollTo(target, { offset: hash === '#top' ? 0 : NAV_OFFSET, force: true, duration: 1.2 })
  else if (target === 0) window.scrollTo({ top: 0, behavior: 'smooth' })
  else el.scrollIntoView({ behavior: 'smooth' })
}
