import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { Menu, ShoppingBag, X } from 'lucide-react'
import { Logo } from './Brand'
import { useCart } from '../lib/cart'
import { FREE_DELIVERY_FROM } from '../data/site'
import { lockScroll, scrollToHash, unlockScroll } from '../lib/scrollLock'

const links = [
  { href: '#shop', label: 'Shop' },
  { href: '#benefits', label: 'Impact' },
  { href: '#faq', label: 'FAQ' },
]

const notes = [
  `Free delivery across Lebanon on ${FREE_DELIVERY_FROM}+ tags`,
  'Bundle & save — 10% off 2 tags, 20% off 3+',
  'Programmed & ready to tap',
  'Works on iPhone & Android',
  'Free reprogramming, forever',
]

export function AnnouncementBar() {
  const row = [...notes, ...notes]
  return (
    <div className="relative z-50 overflow-hidden bg-ink py-2 text-[12px] font-medium tracking-wide text-white/85">
      <div className="flex w-max animate-marquee gap-10 [--marquee-duration:38s]">
        {[...row, ...row].map((n, i) => (
          <span key={i} className="flex items-center gap-10 whitespace-nowrap">
            {n}
            <span className="text-brand-2">✦</span>
          </span>
        ))}
      </div>
    </div>
  )
}

export default function Navbar() {
  const { count, setOpen } = useCart()
  const { scrollY } = useScroll()
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [mobile, setMobile] = useState(false)

  useMotionValueEvent(scrollY, 'change', (y) => {
    const prev = scrollY.getPrevious() ?? 0
    setScrolled(y > 40)
    setHidden(y > 600 && y > prev && !mobile)
  })

  const dark = mobile // light hero: dark text everywhere except over the open mobile menu

  useEffect(() => {
    if (!mobile) return
    lockScroll()
    return unlockScroll
  }, [mobile])

  // Menu links: close the overlay first, then scroll once scrolling is unlocked again.
  const go = (e, href) => {
    e.preventDefault()
    setMobile(false)
    requestAnimationFrame(() => scrollToHash(href))
  }

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-9 z-40 px-3 sm:px-5"
        animate={{ y: hidden ? -120 : 0, top: scrolled ? 12 : 36 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      >
        <nav
          className={`mx-auto flex h-16 max-w-[1320px] items-center justify-between rounded-2xl px-4 transition-all duration-500 sm:px-6 ${
            scrolled ? 'border border-line bg-card/85 shadow-[0_16px_40px_-24px_rgba(14,14,12,0.35)] backdrop-blur-xl' : 'border border-transparent'
          }`}
        >
          <a href="#top" className="text-[19px]" aria-label="Tapilly home">
            <Logo light={dark} />
          </a>
          <ul className="hidden items-center gap-1 md:flex">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className={`rounded-full px-4 py-2 text-[14px] font-medium transition-colors ${dark ? 'text-white/80 hover:bg-white/10 hover:text-white' : 'text-ink/70 hover:bg-ink/5 hover:text-ink'}`}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-2">
            <a href="#shop" className={`hidden sm:inline-flex ${dark ? 'btn-glass' : 'btn-brand'} !px-5 !py-2.5 !text-[14px]`}>
              Shop tags
            </a>
            <button
              onClick={() => setOpen(true)}
              className={`relative grid h-11 w-11 cursor-pointer place-items-center rounded-full transition-colors ${dark ? 'text-white hover:bg-white/10' : 'text-ink hover:bg-ink/5'}`}
              aria-label={`Open cart, ${count} items`}
            >
              <ShoppingBag className="h-[22px] w-[22px]" strokeWidth={1.8} />
              <AnimatePresence>
                {count > 0 && (
                  <motion.span
                    key={count}
                    initial={{ scale: 0.4, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    className="absolute -right-0.5 -top-0.5 grid h-5 min-w-5 place-items-center rounded-full bg-lime px-1 text-[11px] font-bold text-ink ring-2 ring-paper"
                  >
                    {count}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
            <button
              onClick={() => setMobile((v) => !v)}
              className={`grid h-11 w-11 cursor-pointer place-items-center rounded-full md:hidden ${dark ? 'text-white' : 'text-ink'}`}
              aria-label="Menu"
              aria-expanded={mobile}
            >
              {mobile ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {mobile && (
          <motion.div className="fixed inset-0 z-30 bg-ink md:hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <ul className="flex h-full flex-col justify-center gap-2 px-8">
              {links.map((l, i) => (
                <motion.li
                  key={l.href}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * i + 0.1, ease: [0.16, 1, 0.3, 1], duration: 0.7 }}
                >
                  <a href={l.href} onClick={(e) => go(e, l.href)} className="h-display block py-2 text-5xl text-white">
                    {l.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
