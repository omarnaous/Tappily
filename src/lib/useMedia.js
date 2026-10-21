import { useSyncExternalStore } from 'react'

/** Live `matchMedia` result, e.g. useMedia('(min-width: 768px)'). */
export function useMedia(query) {
  return useSyncExternalStore(
    (cb) => {
      const m = window.matchMedia(query)
      m.addEventListener('change', cb)
      return () => m.removeEventListener('change', cb)
    },
    () => window.matchMedia(query).matches,
    () => false,
  )
}
