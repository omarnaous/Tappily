import { useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, Check, Play } from 'lucide-react'
import { NfcWaves } from './Brand'
import { SplitWords } from './Reveal'
import { asset, CURRENCY, PRICE } from '../data/site'

const ease = [0.16, 1, 0.3, 1]

/** Muted looping product film. React does not reflect `muted` as an attribute, so set it on the element
 *  before playing (iOS refuses autoplay otherwise), and pause it while it is off screen. */
function HeroVideo() {
  const ref = useRef(null)
  useEffect(() => {
    const v = ref.current
    if (!v) return
    v.muted = true
    v.defaultMuted = true
    const play = () => v.play().catch(() => {})
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? play() : v.pause()), { threshold: 0.05 })
    io.observe(v)
    return () => io.disconnect()
  }, [])
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

const Float = ({ className, delay, children }) => (
  <motion.div
    className={`absolute z-10 hidden items-center gap-2.5 rounded-2xl border border-white/70 bg-white/85 px-4 py-3 text-sm font-semibold text-ink shadow-[0_20px_50px_-20px_rgba(7,13,31,0.35)] backdrop-blur-md sm:flex ${className}`}
    initial={{ opacity: 0, y: 20, scale: 0.9 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    transition={{ duration: 0.9, delay, ease }}
  >
    {children}
  </motion.div>
)

export default function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const cardY = useTransform(scrollYProgress, [0, 1], [0, 90])
  const cardRotate = useTransform(scrollYProgress, [0, 1], [0, -2])
  const textY = useTransform(scrollYProgress, [0, 1], [0, -60])

  return (
    <section id="top" ref={ref} className="relative isolate overflow-hidden bg-paper">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-40 top-20 h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(circle,rgba(61,123,255,0.22),transparent_65%)]" />
        <div className="absolute -right-32 top-0 h-[40rem] w-[40rem] rounded-full bg-[radial-gradient(circle,rgba(255,177,71,0.22),transparent_65%)]" />
        <div className="absolute bottom-0 left-1/3 h-[30rem] w-[30rem] rounded-full bg-[radial-gradient(circle,rgba(214,41,118,0.12),transparent_65%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(7,13,31,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(7,13,31,0.045)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(ellipse_at_40%_30%,#000_20%,transparent_70%)]" />
      </div>

      <div className="container-x grid min-h-[100svh] items-center gap-12 pb-16 pt-32 md:pt-36 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 lg:pb-20">
        <motion.div style={{ y: textY }}>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease }}
            className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-white/70 py-1.5 pl-1.5 pr-4 text-[13px] text-ink/75 backdrop-blur"
          >
            <span className="rounded-full bg-brand px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider text-white">NFC</span>
            Smart tags for businesses in Lebanon 🇱🇧
          </motion.div>

          <h1 className="h-display mt-6 text-[clamp(3rem,6.4vw,6rem)] text-ink">
            <SplitWords text="Your business," immediate delay={0.2} />
            <br />
            <span className="bg-gradient-to-r from-brand via-[#6b4dff] to-[#e1306c] bg-clip-text pr-2 text-transparent">
              <SplitWords text="one tap away." immediate delay={0.4} />
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.75, ease }}
            className="mt-6 max-w-xl text-lg leading-relaxed text-muted md:text-xl"
          >
            Google reviews, Instagram follows, WhatsApp chats, menus and payments. Your customers just tap their phone — no QR codes, no searching, no typing.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.9, ease }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <a href="#shop" className="btn-primary group !px-7 !py-4 text-base">
              Shop NFC tags — {CURRENCY}
              {PRICE}
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <a href="#how" className="btn-ghost !px-7 !py-4 text-base">
              <Play className="h-4 w-4 fill-current" /> How it works
            </a>
          </motion.div>

          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.1 }}
            className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-sm text-ink/60"
          >
            {['No app needed', 'iPhone & Android', 'One-time price, no subscription'].map((t) => (
              <li key={t} className="flex items-center gap-2">
                <Check className="h-4 w-4 text-brand" /> {t}
              </li>
            ))}
          </motion.ul>
        </motion.div>

        <motion.div
          className="relative mx-auto w-full max-w-[520px] lg:max-w-none"
          initial={{ opacity: 0, y: 40, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.3, ease }}
        >
          <motion.div style={{ y: cardY, rotate: cardRotate }} className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[36px] bg-ink shadow-[0_60px_120px_-40px_rgba(7,13,31,0.55)] ring-1 ring-ink/5">
              <HeroVideo />
            </div>
            <Float className="-left-8 top-[18%]" delay={1.2}>
              <span className="grid h-8 w-8 place-items-center rounded-full bg-brand text-white">
                <NfcWaves className="h-4 w-4" />
              </span>
              Tap, don't type
            </Float>
            <Float className="-right-6 bottom-[16%]" delay={1.35}>
              <span className="grid h-8 w-8 place-items-center rounded-full bg-emerald-500 text-white">
                <Check className="h-4 w-4" strokeWidth={3} />
              </span>
              Opens in under a second
            </Float>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
