import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useMotionValue, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, Check } from 'lucide-react'
import { PlatformIcon } from './Brand'
import { asset, CURRENCY, PRICE } from '../data/site'

const ease = [0.16, 1, 0.3, 1]

/** Muted looping product film. React does not reflect `muted` as an attribute, so set it on the element
 *  before playing (iOS refuses autoplay otherwise), and pause it while it is off screen. */
function HeroVideo({ videoRef: ref }) {
  useEffect(() => {
    const v = ref.current
    if (!v) return
    v.muted = true
    v.defaultMuted = true
    const play = () => v.play().catch(() => {})
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? play() : v.pause()), { threshold: 0.05 })
    io.observe(v)
    return () => io.disconnect()
  }, [ref])
  return (
    <video
      ref={ref}
      className="h-full w-full object-cover"
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      poster={asset('video/hero-poster.jpg')}
      aria-label="A phone taps a Tapilly NFC stand and opens Google Reviews, Instagram, WhatsApp and a digital menu"
    >
      <source src={asset('video/hero.webm')} type="video/webm" />
      <source src={asset('video/hero.mp4')} type="video/mp4" />
    </video>
  )
}

// The hero film loops four 3-second taps in this order (video/src/theme.js CHANNELS, timing.js CYCLE).
const SEGMENT = 3
const STEPS = [
  { id: 'google-review', icon: 'google', color: '#4285F4', name: 'Google Review Tag', opens: 'The 5★ review box opens' },
  { id: 'instagram', icon: 'instagram', color: '#D62976', name: 'Instagram Follow Tag', opens: 'Your profile, ready to follow' },
  { id: 'whatsapp', icon: 'whatsapp', color: '#128C7E', name: 'WhatsApp Chat Tag', opens: 'A chat with you starts' },
  { id: 'menu', icon: 'menu', color: '#C9A14A', name: 'Digital Menu Tag', opens: 'Your menu, ready to order' },
]

/** Follows the film: which tag is on screen and how far through its segment we are. */
function useFilmClock(videoRef) {
  const [index, setIndex] = useState(0)
  const progress = useMotionValue(0)
  useEffect(() => {
    let raf
    const tick = () => {
      const v = videoRef.current
      if (v && v.readyState >= 2) {
        const t = v.currentTime
        const i = Math.floor(t / SEGMENT) % STEPS.length
        setIndex((prev) => (prev === i ? prev : i))
        progress.set((t % SEGMENT) / SEGMENT)
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [videoRef, progress])
  return { index, progress }
}

function MobileBar({ progress }) {
  const width = useTransform(progress, (p) => `${p * 100}%`)
  return <motion.span className="block h-full bg-accent" style={{ width }} />
}

const openProduct = (id) => window.dispatchEvent(new CustomEvent('tapilly:open-product', { detail: id }))

function StepCard({ step, n, active, progress, onSelect, delay }) {
  const width = useTransform(progress, (p) => `${p * 100}%`)
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, delay, ease }}
      onClick={onSelect}
      className={`group relative cursor-pointer overflow-hidden rounded-[22px] border bg-card p-4 transition-all duration-500 ${
        active ? 'border-accent shadow-[0_24px_50px_-28px_rgba(8,85,214,0.55)]' : 'border-line opacity-60 hover:opacity-100'
      }`}
    >
      <div className="flex items-center gap-3">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-mist">
          <PlatformIcon name={step.icon} className="h-5 w-5" color={step.color} />
        </span>
        <div className="min-w-0 flex-1">
          <p className="font-mono text-[10.5px] uppercase tracking-wider text-muted">Tap 0{n}</p>
          <p className="truncate text-[15px] font-semibold leading-tight">{step.name}</p>
        </div>
      </div>
      <p className="mt-3 flex items-center gap-1.5 text-[13.5px] text-ink-2">
        <ArrowRight className="h-3.5 w-3.5 text-accent" /> {step.opens}
      </p>
      <div className="mt-3 flex items-center justify-between">
        <span className="text-[13px] text-muted">
          {CURRENCY}
          {PRICE} · one-time
        </span>
        <button
          onClick={(e) => {
            e.stopPropagation()
            openProduct(step.id)
          }}
          className="rounded-full bg-ink px-3 py-1.5 text-[12px] font-semibold text-white transition-colors hover:bg-accent"
        >
          View tag
        </button>
      </div>
      <div className="absolute inset-x-0 bottom-0 h-[3px] bg-transparent">{active && <motion.div className="h-full bg-accent" style={{ width }} />}</div>
    </motion.div>
  )
}

export default function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const stageScale = useTransform(scrollYProgress, [0, 0.6], [1, 0.94])
  const leftY = useTransform(scrollYProgress, [0, 1], [0, -90])
  const rightY = useTransform(scrollYProgress, [0, 1], [0, -40])
  const videoRef = useRef(null)
  const { index, progress } = useFilmClock(videoRef)
  const seek = (i) => {
    const v = videoRef.current
    if (!v) return
    v.currentTime = i * SEGMENT + 0.01
    v.play().catch(() => {})
  }

  return (
    <section id="top" ref={ref} className="relative overflow-hidden bg-paper pb-16 pt-28 sm:pt-32 md:pb-24 md:pt-40">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[640px] bg-[radial-gradient(60%_60%_at_50%_0%,#ffffff_0%,rgba(255,255,255,0)_70%)]" />
      <div className="container-x relative">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease }}
            className="inline-flex items-center gap-2 rounded-full border border-line bg-card py-1 pl-1 pr-3.5 text-[13px] text-ink-2"
          >
            <span className="rounded-full bg-accent px-2 py-0.5 font-mono text-[11px] font-semibold text-white">NEW</span>
            Smart NFC tags for businesses in Lebanon
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.1, ease }}
            className="h-display mt-6 text-[clamp(2.75rem,8.4vw,6.4rem)] text-ink"
          >
            Your business,
            <br />
            <span className="relative inline-block whitespace-nowrap">
              <motion.span
                aria-hidden="true"
                className="absolute inset-x-[-0.08em] bottom-[0.06em] top-[0.14em] -z-0 origin-left rounded-[0.18em] bg-accent"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.9, delay: 0.55, ease }}
              />
              <span className="relative text-white">one tap</span>
            </span>{' '}
            away.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease }}
            className="mx-auto mt-6 max-w-xl text-[17px] leading-relaxed text-muted md:text-lg"
          >
            Google reviews, Instagram follows, WhatsApp chats and menus — customers just tap their phone. No app, no QR code, no typing.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease }}
            className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center"
          >
            <a href="#shop" className="btn-primary group !py-4">
              Shop NFC tags · {CURRENCY}
              {PRICE}
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <a href="#how" className="btn-ghost !py-4">
              How it works
            </a>
          </motion.div>

          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="mt-6 flex flex-wrap justify-center gap-x-5 gap-y-2 text-[13px] text-muted"
          >
            {['No app needed', 'iPhone & Android', 'One-time price'].map((t) => (
              <li key={t} className="flex items-center gap-1.5">
                <Check className="h-3.5 w-3.5 text-brand" strokeWidth={2.5} /> {t}
              </li>
            ))}
          </motion.ul>
        </div>

        {/* Stage: the film in the middle; the cards name the tag being tapped right now and what it opens */}
        <motion.div style={{ scale: stageScale }} className="relative mx-auto mt-12 max-w-[1180px] md:mt-16">
          <p className="mb-5 text-center font-mono text-[11.5px] uppercase tracking-[0.14em] text-muted">Watch a tap — one tag, one action</p>
          <div className="grid items-center gap-4 lg:grid-cols-[1fr_400px_1fr] lg:gap-6">
            <motion.div style={{ y: leftY }} className="hidden flex-col gap-4 lg:flex">
              {[0, 1].map((i) => (
                <StepCard key={i} step={STEPS[i]} n={i + 1} active={index === i} progress={progress} onSelect={() => seek(i)} delay={0.7 + i * 0.1} />
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.35, ease }}
              className="relative mx-auto w-full max-w-[420px]"
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-[32px] bg-ink shadow-[0_50px_100px_-40px_rgba(14,14,12,0.6)]">
                <HeroVideo videoRef={videoRef} />
              </div>
            </motion.div>

            <motion.div style={{ y: rightY }} className="hidden flex-col gap-4 lg:flex">
              {[2, 3].map((i) => (
                <StepCard key={i} step={STEPS[i]} n={i + 1} active={index === i} progress={progress} onSelect={() => seek(i)} delay={0.8 + i * 0.1} />
              ))}
            </motion.div>
          </div>

          {/* Phone: one caption that follows the film, plus four dots to jump between taps */}
          <div className="mx-auto mt-4 max-w-[420px] lg:hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
                className="card flex items-center gap-3 p-3.5"
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-mist">
                  <PlatformIcon name={STEPS[index].icon} className="h-5 w-5" color={STEPS[index].color} />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[15px] font-semibold leading-tight">{STEPS[index].name}</p>
                  <p className="truncate text-[13px] text-muted">{STEPS[index].opens}</p>
                </div>
                <button onClick={() => openProduct(STEPS[index].id)} className="rounded-full bg-ink px-3 py-2 text-[12px] font-semibold text-white">
                  View
                </button>
              </motion.div>
            </AnimatePresence>
            <div className="mt-3 flex gap-1.5">
              {STEPS.map((st, i) => (
                <button key={st.id} onClick={() => seek(i)} className="h-1 flex-1 overflow-hidden rounded-full bg-line" aria-label={`Show ${st.name}`}>
                  {i === index && <MobileBar progress={progress} />}
                  {i < index && <span className="block h-full w-full bg-accent" />}
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
