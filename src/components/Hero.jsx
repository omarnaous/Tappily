import { useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, Check } from 'lucide-react'
import { PlatformIcon } from './Brand'
import { MiniColumns, Sparkline } from './charts'
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

// Illustrative numbers for a sample café, labelled as such under the stage.
function Kpi({ icon, iconColor, title, value, delta, children, className = '', delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay, ease }}
      className={`card p-4 shadow-[0_30px_60px_-40px_rgba(14,14,12,0.35)] sm:p-5 ${className}`}
    >
      <div className="flex items-center gap-2 text-[13px] font-medium text-ink-2">
        <span className="grid h-7 w-7 place-items-center rounded-full bg-mist">
          <PlatformIcon name={icon} className="h-3.5 w-3.5" color={iconColor} />
        </span>
        {title}
      </div>
      <div className="mt-3 flex items-end justify-between gap-3">
        <div>
          <p className="text-[28px] font-semibold leading-none tracking-tight sm:text-[34px]">{value}</p>
          <p className="mt-1.5 inline-flex items-center gap-1 rounded-full bg-sky px-2 py-0.5 font-mono text-[11px] font-medium text-brand">▲ {delta}</p>
        </div>
        <div className="hidden sm:block">{children}</div>
      </div>
    </motion.div>
  )
}

export default function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const stageScale = useTransform(scrollYProgress, [0, 0.6], [1, 0.94])
  const leftY = useTransform(scrollYProgress, [0, 1], [0, -90])
  const rightY = useTransform(scrollYProgress, [0, 1], [0, -40])

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
            <span className="rounded-full bg-lime px-2 py-0.5 font-mono text-[11px] font-semibold text-ink">NEW</span>
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
                className="absolute inset-x-[-0.08em] bottom-[0.06em] top-[0.14em] -z-0 origin-left rounded-[0.18em] bg-lime"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.9, delay: 0.55, ease }}
              />
              <span className="relative">one tap</span>
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
            <a href="#benefits" className="btn-ghost !py-4">
              See the impact
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

        {/* Stage: the product film in the middle, profile metrics around it */}
        <motion.div style={{ scale: stageScale }} className="relative mx-auto mt-12 max-w-[1180px] md:mt-16">
          <div className="grid items-center gap-4 lg:grid-cols-[1fr_400px_1fr] lg:gap-6">
            <motion.div style={{ y: leftY }} className="hidden flex-col gap-4 lg:flex">
              <Kpi icon="google" iconColor="#4285F4" title="Google reviews" value="212" delta="46 this month" delay={0.7} className="lg:ml-6">
                <Sparkline values={[118, 124, 131, 139, 166, 212]} width={150} height={52} label={(v, i) => `Month ${i + 1}: ${v}`} />
              </Kpi>
              <Kpi icon="whatsapp" iconColor="#128C7E" title="WhatsApp chats" value="99" delta="this week" delay={0.85} className="lg:-mr-6">
                <MiniColumns
                  values={[9, 12, 8, 14, 18, 22, 16]}
                  labels={['M', 'T', 'W', 'T', 'F', 'S', 'S']}
                  width={150}
                  height={44}
                  highlight={5}
                  format={(v) => `${v} chats`}
                />
              </Kpi>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.35, ease }}
              className="relative mx-auto w-full max-w-[420px]"
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-[32px] bg-ink shadow-[0_50px_100px_-40px_rgba(14,14,12,0.6)]">
                <HeroVideo />
              </div>
            </motion.div>

            <motion.div style={{ y: rightY }} className="hidden flex-col gap-4 lg:flex">
              <Kpi icon="instagram" iconColor="#D62976" title="Instagram followers" value="12.4K" delta="318 this month" delay={0.8} className="lg:-ml-6">
                <Sparkline values={[11.2, 11.35, 11.5, 11.7, 12.1, 12.4]} width={150} height={52} label={(v, i) => `Month ${i + 1}: ${v}K`} />
              </Kpi>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.95, ease }}
                className="card flex items-center gap-4 p-4 shadow-[0_30px_60px_-40px_rgba(14,14,12,0.35)] lg:mr-6"
              >
                <img src={asset('images/industry-restaurant.webp')} alt="" className="h-16 w-16 rounded-2xl object-cover" />
                <div className="flex-1">
                  <p className="text-[13px] text-muted">Digital Menu Tag</p>
                  <p className="font-semibold">
                    {CURRENCY}
                    {PRICE}.00 <span className="font-normal text-muted">· one-time</span>
                  </p>
                </div>
                <a
                  href="#shop"
                  className="grid h-10 w-10 place-items-center rounded-full bg-lime text-ink transition-transform hover:scale-110"
                  aria-label="Shop tags"
                >
                  <ArrowRight className="h-4 w-4" />
                </a>
              </motion.div>
            </motion.div>
          </div>

          {/* Phone: two compact metrics under the film */}
          <div className="mt-4 grid grid-cols-2 gap-3 lg:hidden">
            <Kpi icon="google" iconColor="#4285F4" title="Reviews" value="212" delta="46 / mo" delay={0.6} />
            <Kpi icon="instagram" iconColor="#D62976" title="Followers" value="12.4K" delta="318 / mo" delay={0.7} />
          </div>
          <p className="mt-5 text-center font-mono text-[11px] text-muted">Illustrative figures for a sample café — not real customer data.</p>
        </motion.div>
      </div>
    </section>
  )
}
