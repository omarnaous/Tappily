import { useEffect } from 'react'
import Lenis from 'lenis'
import { MotionConfig } from 'framer-motion'
import { CartProvider } from './lib/cart'
import Navbar, { AnnouncementBar } from './components/Navbar'
import Hero from './components/Hero'
import PlatformMarquee from './components/PlatformMarquee'
import Shop from './components/Shop'
import HowItWorks from './components/HowItWorks'
import Features from './components/Features'
import Statement from './components/Statement'
import Industries from './components/Industries'
import Pricing from './components/Pricing'
import InstagramFeed from './components/InstagramFeed'
import FAQ from './components/FAQ'
import Footer, { FinalCTA } from './components/Footer'
import CartDrawer from './components/CartDrawer'
import { CartToast, MobileBar } from './components/Overlays'

function useSmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const lenis = new Lenis({ duration: 1.15, anchors: { offset: -80 } })
    window.__lenis = lenis
    let raf = requestAnimationFrame(function loop(t) {
      lenis.raf(t)
      raf = requestAnimationFrame(loop)
    })
    return () => {
      cancelAnimationFrame(raf)
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
          <HowItWorks />
          <Features />
          <Statement />
          <Industries />
          <Pricing />
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
