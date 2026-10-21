// "What one tap does": a wall of self-playing stats. Everything animates on its own when it scrolls
// into view; nothing to click. Review/follower numbers are illustrative and labelled as such.
import { useEffect, useRef, useState } from 'react'
import { animate, motion, useInView } from 'framer-motion'
import { Reveal, SectionHeading } from './Reveal'

const ease = [0.16, 1, 0.3, 1]

/** Counts from `from` to `to` once the element is in view. */
function Count({ from = 0, to, duration = 1.6, delay = 0, format = (v) => Math.round(v).toString() }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-15% 0px' })
  const [v, setV] = useState(from)
  useEffect(() => {
    if (!inView) return
    const c = animate(from, to, { duration, delay, ease, onUpdate: setV })
    return () => c.stop()
  }, [inView, from, to, duration, delay])
  return <span ref={ref}>{format(v)}</span>
}

const Card = ({ className = '', children, delay = 0 }) => (
  <Reveal delay={delay} className={`relative flex flex-col overflow-hidden rounded-[28px] p-6 md:p-8 ${className}`}>
    {children}
  </Reveal>
)

const Label = ({ children, dark }) => (
  <p className={`font-mono text-[11.5px] uppercase tracking-[0.14em] ${dark ? 'text-white/50' : 'text-ink/50'}`}>{children}</p>
)

/* A — 6 steps collapse to 1 tap */
function StepsCard() {
  const rows = [
    { label: 'Search your name', v: 6 },
    { label: 'Scan a QR code', v: 4 },
    { label: 'Tap a Tapilly tag', v: 1, us: true },
  ]
  return (
    <Card className="bg-ink text-white">
      <Label dark>Steps to reach you</Label>
      <p className="mt-3 text-[88px] font-semibold leading-none tracking-[-0.05em] text-accent-light md:text-[112px]">
        <Count from={6} to={1} duration={1.8} delay={0.3} />
        <span className="ml-3 align-middle text-2xl font-medium tracking-tight text-white/60 md:text-3xl">tap</span>
      </p>
      <p className="mt-3 max-w-sm text-[15px] text-white/60">Searching or scanning loses customers on the way. A tap takes them straight to you.</p>
      <ul className="mt-auto space-y-4 pt-10">
        {rows.map((r, i) => (
          <li key={r.label}>
            <div className="flex justify-between text-sm">
              <span className={r.us ? 'font-semibold' : 'text-white/60'}>{r.label}</span>
              <span className="font-mono text-white/60">{r.v}</span>
            </div>
            <div className="mt-2 h-3">
              <motion.div
                className={`h-full rounded-r-[4px] ${r.us ? 'bg-accent-light shadow-[0_0_24px_rgba(91,149,255,0.7)]' : 'bg-white/15'}`}
                initial={{ width: 0 }}
                whileInView={{ width: `${(r.v / 6) * 100}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1.1, delay: 0.2 + i * 0.15, ease }}
              />
            </div>
          </li>
        ))}
      </ul>
    </Card>
  )
}

/* C — time to open */
function SpeedCard() {
  const r = 52
  const c = 2 * Math.PI * r
  return (
    <Card className="bg-card ring-1 ring-line" delay={0.05}>
      <Label>Speed</Label>
      <div className="relative mt-6 grid h-24 w-24 place-items-center">
        <svg viewBox="0 0 128 128" className="absolute inset-0 -rotate-90">
          <circle cx="64" cy="64" r={r} fill="none" stroke="var(--color-mist)" strokeWidth="10" />
          <motion.circle
            cx="64"
            cy="64"
            r={r}
            fill="none"
            stroke="var(--color-series-1)"
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={c}
            initial={{ strokeDashoffset: c }}
            whileInView={{ strokeDashoffset: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.4, ease: 'easeInOut' }}
          />
        </svg>
        <p className="text-2xl font-semibold tracking-tight">~1s</p>
      </div>
      <p className="mt-auto pt-6 text-xl font-semibold tracking-tight">Opens in a second</p>
      <p className="mt-1 text-[15px] text-muted">No app, no camera, no typing.</p>
    </Card>
  )
}

/* D — pay once, every month after is free */
function OnceCard() {
  const months = ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D']
  return (
    <Card className="bg-ink text-white" delay={0.1}>
      <Label dark>Cost</Label>
      <p className="mt-3 text-[64px] font-semibold leading-none tracking-[-0.05em] text-accent-light">$0</p>
      <div className="mt-5 grid grid-cols-6 gap-1.5">
        {months.map((m, i) => (
          <motion.div
            key={i}
            className="grid aspect-square place-items-center rounded-lg font-mono text-[10px]"
            initial={{ backgroundColor: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.4)', scale: 0.8 }}
            whileInView={{ backgroundColor: '#0855d6', color: '#ffffff', scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 + i * 0.08, type: 'spring', stiffness: 300, damping: 18 }}
          >
            {m}
          </motion.div>
        ))}
      </div>
      <p className="mt-auto pt-6 text-xl font-semibold tracking-tight">No monthly fees</p>
      <p className="mt-1 text-[15px] text-white/60">Pay once. It works all year.</p>
    </Card>
  )
}

/* E — works on every modern phone */
function PhonesCard() {
  return (
    <Card className="bg-card ring-1 ring-line" delay={0.15}>
      <Label>Works on</Label>
      <div className="mt-6 flex items-end gap-3">
        {['iPhone', 'Android'].map((t, i) => (
          <motion.div
            key={t}
            className="grid h-24 w-14 place-items-end justify-center rounded-[14px] border-2 border-ink pb-2"
            initial={{ y: 30, opacity: 0, rotate: i ? 8 : -8 }}
            whileInView={{ y: 0, opacity: 1, rotate: i ? 6 : -6 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 220, damping: 14, delay: 0.3 + i * 0.12 }}
          >
            <span className="h-1 w-5 rounded-full bg-ink/40" />
          </motion.div>
        ))}
      </div>
      <p className="mt-auto pt-6 text-xl font-semibold tracking-tight">iPhone & Android</p>
      <p className="mt-1 text-[15px] text-muted">NFC is built in. Nothing to install.</p>
    </Card>
  )
}

/* F — change where the tag points, free */
function ReprogramCard() {
  return (
    <Card className="bg-accent text-white" delay={0.2}>
      <Label dark>Change the link</Label>
      <motion.div
        className="mt-6 grid h-16 w-16 place-items-center rounded-full bg-white/15"
        initial={{ rotate: -180, scale: 0.6 }}
        whileInView={{ rotate: 0, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease }}
      >
        <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 12a9 9 0 0 1 15.5-6.2L21 8" />
          <path d="M21 3v5h-5" />
          <path d="M21 12a9 9 0 0 1-15.5 6.2L3 16" />
          <path d="M3 21v-5h5" />
        </svg>
      </motion.div>
      <p className="mt-auto pt-6 text-xl font-semibold tracking-tight">Anytime, for free</p>
      <p className="mt-1 text-[15px] text-white/75">New menu or new page? We reprogram it.</p>
    </Card>
  )
}

export default function Benefits() {
  return (
    <section id="benefits" className="scroll-mt-24 bg-paper py-24 md:py-32">
      <div className="container-x">
        <SectionHeading eyebrow="Why it works" title="Less effort for them. More for you." />
        <div className="mt-12 grid gap-4 lg:grid-cols-2">
          <StepsCard />
          <div className="grid gap-4 sm:grid-cols-2">
            <SpeedCard />
            <OnceCard />
            <PhonesCard />
            <ReprogramCard />
          </div>
        </div>
      </div>
    </section>
  )
}
