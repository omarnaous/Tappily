import { useEffect, useRef, useState } from 'react'
import { animate, motion, useInView } from 'framer-motion'
import { BadgeCheck, Droplets, Palette, RefreshCcw, Smartphone, TrendingUp } from 'lucide-react'
import { NfcWaves, PlatformIcon } from './Brand'
import { Reveal, SectionHeading } from './Reveal'
import { asset } from '../data/site'

function Counter({ to, suffix = '', prefix = '', decimals = 0 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const [v, setV] = useState(0)
  useEffect(() => {
    if (!inView) return
    const c = animate(0, to, { duration: 1.6, ease: [0.16, 1, 0.3, 1], onUpdate: setV })
    return () => c.stop()
  }, [inView, to])
  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {v.toFixed(decimals)}
      {suffix}
    </span>
  )
}

const Tile = ({ className = '', children, delay = 0 }) => (
  <Reveal
    delay={delay}
    className={`group relative overflow-hidden rounded-[28px] border border-line bg-white p-7 transition-shadow duration-500 hover:shadow-[0_30px_60px_-30px_rgba(7,13,31,0.35)] ${className}`}
  >
    {children}
  </Reveal>
)

export default function Features() {
  return (
    <section className="relative bg-white py-24 md:py-32">
      <div className="container-x">
        <SectionHeading
          eyebrow="Why Tapilly"
          title="Small tag. Serious results."
          text="Designed for busy counters and crowded tables in Lebanon — the fastest way from “I liked this place” to a review, a follow or an order."
        />

        <div className="mt-14 grid auto-rows-[minmax(220px,auto)] grid-cols-1 gap-4 md:grid-cols-6">
          <Tile className="bg-ink text-white md:col-span-4 md:row-span-2 !border-ink !p-0">
            <img
              src={asset('images/ig-business-one-tap.jpg')}
              alt="Tapilly NFC menu tag on a restaurant table"
              className="absolute inset-0 h-full w-full object-cover opacity-55 transition-transform duration-[1.6s] ease-(--ease-out-expo) group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-transparent" />
            <div className="relative flex h-full min-h-[420px] flex-col justify-end p-8 md:p-10">
              <NfcWaves className="h-10 w-10" color="#3d7bff" />
              <h3 className="h-display mt-5 max-w-md text-4xl md:text-5xl">No QR codes. No searching. Just tap.</h3>
              <p className="mt-3 max-w-md text-white/70">
                NFC opens your link in under a second — faster than unlocking a camera, framing a QR code and waiting for it to focus.
              </p>
            </div>
          </Tile>

          <Tile className="md:col-span-2" delay={0.08}>
            <Smartphone className="h-7 w-7 text-brand" />
            <p className="h-display mt-6 text-6xl">
              <Counter to={0} />
              <span className="text-brand"> apps</span>
            </p>
            <p className="mt-2 text-muted">Works natively on iPhone and Android. Nothing to download.</p>
          </Tile>

          <Tile className="md:col-span-2" delay={0.12}>
            <TrendingUp className="h-7 w-7 text-brand" />
            <p className="h-display mt-6 text-6xl">
              <Counter to={1} />
              <span className="text-brand"> tap</span>
            </p>
            <p className="mt-2 text-muted">From table to review box, profile or menu. Fewer steps, more action.</p>
          </Tile>

          <Tile className="md:col-span-2" delay={0.05}>
            <RefreshCcw className="h-7 w-7 text-brand" />
            <h3 className="mt-6 text-xl font-semibold">Reprogram anytime</h3>
            <p className="mt-2 text-muted">New menu? New handle? We point your tag somewhere new — free.</p>
          </Tile>

          <Tile className="md:col-span-2 bg-gradient-to-br from-brand to-[#2a1fb8] !border-brand text-white" delay={0.1}>
            <Palette className="h-7 w-7" />
            <h3 className="mt-6 text-xl font-semibold">Your brand on it</h3>
            <p className="mt-2 text-white/75">Your business name on every tag. Logo & colors on Business packs.</p>
          </Tile>

          <Tile className="md:col-span-2" delay={0.15}>
            <Droplets className="h-7 w-7 text-brand" />
            <h3 className="mt-6 text-xl font-semibold">Built for real counters</h3>
            <p className="mt-2 text-muted">Wipe-clean finish, no battery, no charging. It just keeps working.</p>
          </Tile>

          <Tile className="md:col-span-6 !p-0" delay={0.05}>
            <div className="grid items-center gap-8 p-8 md:grid-cols-[1.2fr_1fr] md:p-10">
              <div>
                <BadgeCheck className="h-7 w-7 text-brand" />
                <h3 className="h-display mt-5 text-3xl md:text-4xl">One tag for every channel that matters.</h3>
                <p className="mt-3 max-w-lg text-muted">
                  Google reviews to rank higher on Maps. Instagram and TikTok to grow your audience. WhatsApp for orders. Whish for payments. Pick the one that
                  moves your business.
                </p>
              </div>
              <div className="grid grid-cols-4 gap-3">
                {['google', 'instagram', 'whatsapp', 'tiktok', 'facebook', 'menu', 'wallet', 'link'].map((n, i) => (
                  <motion.div
                    key={n}
                    className="grid aspect-square place-items-center rounded-2xl border border-line bg-paper text-ink/80"
                    initial={{ opacity: 0, scale: 0.6 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -6, rotate: -4 }}
                    transition={{ delay: i * 0.05, type: 'spring', stiffness: 260, damping: 18 }}
                  >
                    <PlatformIcon name={n} className="h-7 w-7" />
                  </motion.div>
                ))}
              </div>
            </div>
          </Tile>
        </div>
      </div>
    </section>
  )
}
