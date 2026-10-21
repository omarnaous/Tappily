import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, Check, Play } from 'lucide-react'
import { SplitWords } from './Reveal'
import { asset, PRICE } from '../data/site'

const ease = [0.16, 1, 0.3, 1]

export default function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15])
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '18%'])
  const fade = useTransform(scrollYProgress, [0, 0.6], [1, 0])
  const textY = useTransform(scrollYProgress, [0, 1], [0, -120])

  return (
    <section id="top" ref={ref} className="noise relative isolate flex min-h-[100svh] items-end overflow-hidden bg-ink text-white">
      <motion.div className="absolute inset-x-0 top-0 -z-10 h-[64svh] md:inset-0 md:h-auto" style={{ scale, y }}>
        <video
          className="h-full w-full object-cover object-[80%_50%] md:object-[38%_50%]"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={asset('video/hero-poster.jpg')}
          aria-hidden="true"
        >
          <source src={asset('video/hero.webm')} type="video/webm" />
          <source src={asset('video/hero.mp4')} type="video/mp4" />
        </video>
      </motion.div>
      <div className="absolute inset-0 -z-10 hidden bg-[linear-gradient(90deg,rgba(7,13,31,0.92)_0%,rgba(7,13,31,0.6)_38%,rgba(7,13,31,0)_65%)] md:block" />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(0deg,#070d1f_0%,#070d1f_50%,rgba(7,13,31,0.55)_64%,rgba(7,13,31,0)_80%)] md:bg-[linear-gradient(0deg,rgba(7,13,31,0.8)_0%,rgba(7,13,31,0)_30%)]" />

      <motion.div className="container-x relative pb-24 pt-[40svh] md:pb-24 md:pt-40" style={{ opacity: fade, y: textY }}>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease }}
          className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 py-1.5 pl-1.5 pr-4 text-[13px] text-white/80 backdrop-blur-md"
        >
          <span className="rounded-full bg-brand px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider text-white">New</span>
          Smart NFC tags for businesses in Lebanon 🇱🇧
        </motion.div>

        <h1 className="h-display mt-6 max-w-[13ch] text-[clamp(3rem,7.4vw,7rem)]">
          <SplitWords text="Your business," immediate delay={0.3} />
          <br />
          <span className="bg-gradient-to-r from-white via-sky to-brand-2 bg-clip-text text-transparent">
            <SplitWords text="one tap away." immediate delay={0.5} />
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9, ease }}
          className="mt-5 max-w-xl text-base leading-relaxed text-white/70 md:mt-6 md:text-xl"
        >
          Google reviews, Instagram follows, menus, WhatsApp and payments — your customers just tap their phone. No QR codes. No searching. No typing.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.05, ease }}
          className="mt-8 flex flex-wrap items-center gap-3 md:mt-9"
        >
          <a href="#shop" className="btn-brand group !px-7 !py-4 text-base">
            Shop NFC tags — ${PRICE}
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
          <a href="#how" className="btn-glass !px-7 !py-4 text-base">
            <Play className="h-4 w-4 fill-current" /> See how it works
          </a>
        </motion.div>

        <motion.ul
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.3 }}
          className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/60 md:mt-10"
        >
          {['No app needed', 'iPhone & Android', 'Reprogrammable anytime'].map((t) => (
            <li key={t} className="flex items-center gap-2">
              <Check className="h-4 w-4 text-brand-2" /> {t}
            </li>
          ))}
        </motion.ul>
      </motion.div>

      <motion.div
        className="absolute bottom-6 right-6 hidden items-center gap-3 text-xs uppercase tracking-[0.25em] text-white/50 md:flex"
        style={{ opacity: fade }}
      >
        Scroll
        <span className="relative h-10 w-px overflow-hidden bg-white/20">
          <motion.span
            className="absolute inset-x-0 top-0 h-4 bg-white"
            animate={{ y: [-16, 40] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          />
        </span>
      </motion.div>
    </section>
  )
}
