import { useEffect } from 'react'
import Lenis from 'lenis'
import { MotionConfig } from 'framer-motion'
import { CartProvider } from './lib/cart'
import { scrollToHash } from './lib/scrollLock'
import Navbar, { AnnouncementBar } from './components/Navbar'
import Hero from './components/Hero'
import PlatformMarquee from './components/PlatformMarquee'
import Shop from './components/Shop'
import Benefits from './components/Benefits'
import Statement from './components/Statement'
import Industries from './components/Industries'
import InstagramFeed from './components/InstagramFeed'
import FAQ from './components/FAQ'
import Footer, { FinalCTA } from './components/Footer'
import CartDrawer from './components/CartDrawer'
import { CartToast, MobileBar } from './components/Overlays'

function useSmoothScroll() {
  useEffect(() => {
    // One handler for every in-page link, so anchors behave the same with or without Lenis,
    // from the navbar, the mobile menu, the cart drawer or a button inside the page.
    const onClick = (e) => {
      const a = e.target.closest?.('a[href^="#"]')
      if (!a || e.defaultPrevented || e.metaKey || e.ctrlKey) return
      const hash = a.getAttribute('href')
      if (hash.length < 2) return
      e.preventDefault()
      requestAnimationFrame(() => scrollToHash(hash))
    }
    document.addEventListener('click', onClick)
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return () => document.removeEventListener('click', onClick)

    const lenis = new Lenis({ lerp: 0.12, wheelMultiplier: 1, autoRaf: true })
    window.__lenis = lenis
    return () => {
      document.removeEventListener('click', onClick)
      lenis.destroy()
      delete window.__lenis
    }
  }, [])
}

export default function App() {
  useSmoothScroll()
  return (
    <MotionConfig reducedMotion="user">
      <CartProvider>
        <AnnouncementBar />
        <Navbar />
        <main>
          <Hero />
          <PlatformMarquee />
          <Shop />
          <Benefits />
          <Statement />
          <Industries />
          <InstagramFeed />
          <FAQ />
          <FinalCTA />
        </main>
        <Footer />
        <CartDrawer />
        <CartToast />
        <MobileBar />
      </CartProvider>
    </MotionConfig>
  )
}
