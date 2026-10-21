// Pauses smooth scrolling (Lenis, when present) and native page scroll while an overlay is open.
export function lockScroll() {
  window.__lenis?.stop()
  document.documentElement.style.overflow = 'hidden'
}

export function unlockScroll() {
  window.__lenis?.start()
  document.documentElement.style.overflow = ''
}
