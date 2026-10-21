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
    <Card className="bg-ink text-white lg:col-span-3">
      <Label dark>Steps to reach you</Label>
      <p className="mt-3 text-[88px] font-semibold leading-none tracking-[-0.05em] text-lime md:text-[112px]">
        <Count from={6} to={1} duration={1.8} delay={0.3} />
        <span className="ml-3 align-middle text-2xl font-medium tracking-tight text-white/60 md:text-3xl">tap</span>
      </p>
      <ul className="mt-8 space-y-4">
        {rows.map((r, i) => (
          <li key={r.label}>
            <div className="flex justify-between text-sm">
              <span className={r.us ? 'font-semibold' : 'text-white/60'}>{r.label}</span>
              <span className="font-mono text-white/60">{r.v}</span>
            </div>
            <div className="mt-2 h-3">
              <motion.div
                className={`h-full rounded-r-[4px] ${r.us ? 'bg-lime shadow-[0_0_24px_rgba(212,255,63,0.6)]' : 'bg-white/15'}`}
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

/* B — reviews jump after the tag goes on the counter (illustrative) */
function ReviewsCard() {
  const data = [6, 7, 6, 8, 7, 24, 33, 41, 46]
  const added = 5
  const W = 520
  const H = 190
  const max = 50
  const x = (i) => 8 + (i / (data.length - 1)) * (W - 16)
  const y = (v) => H - 6 - (v / max) * (H - 24)
  const line = data.map((v, i) => `${i ? 'L' : 'M'}${x(i)},${y(v)}`).join(' ')
  const area = `${line} L${x(data.length - 1)},${H} L${x(0)},${H} Z`
  const last = data.length - 1
  return (
    <Card className="bg-lime text-ink lg:col-span-3" delay={0.08}>
      <Label>Google reviews per month</Label>
      <p className="mt-3 text-[88px] font-semibold leading-none tracking-[-0.05em] md:text-[112px]">
        +<Count to={46} delay={0.6} />
      </p>
      <div className="relative mt-auto pt-6">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="w-full overflow-visible"
          role="img"
          aria-label="Reviews per month rise from about 7 to 46 after the tag is added"
        >
          <line x1="0" x2={W} y1={H} y2={H} stroke="rgba(14,14,12,0.25)" strokeWidth="1" />
          <line x1={x(added)} x2={x(added)} y1="0" y2={H} stroke="rgba(14,14,12,0.35)" strokeWidth="1" />
          <text x={x(added) + 8} y="14" className="fill-ink font-mono text-[12px]">
            tag added
          </text>
          <motion.path
            d={area}
            fill="#0e0e0c"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 1.4 }}
          />
          <motion.path
            d={line}
            fill="none"
            stroke="#0e0e0c"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.8, delay: 0.3, ease: 'easeInOut' }}
          />
          <motion.circle
            cx={x(last)}
            cy={y(data[last])}
            r="14"
            fill="#0e0e0c"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [1, 1.8, 1], opacity: [0.25, 0, 0.25] }}
            transition={{ duration: 2, repeat: Infinity, delay: 2.2 }}
            style={{ transformOrigin: `${x(last)}px ${y(data[last])}px` }}
          />
          <motion.circle
            cx={x(last)}
            cy={y(data[last])}
            r="6"
            fill="#0e0e0c"
            stroke="#d4ff3f"
            strokeWidth="2"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', delay: 2.1 }}
            style={{ transformOrigin: `${x(last)}px ${y(data[last])}px` }}
          />
        </svg>
      </div>
    </Card>
  )
}

/* C — time to open */
function SpeedCard() {
  const r = 52
  const c = 2 * Math.PI * r
  return (
    <Card className="items-center bg-card text-center ring-1 ring-line lg:col-span-2" delay={0.05}>
      <Label>Tap to open</Label>
      <div className="relative mt-6 grid h-40 w-40 place-items-center">
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
        <p className="text-5xl font-semibold tracking-tight">~1s</p>
      </div>
      <p className="mt-6 text-[15px] text-muted">No app. No camera. Just tap.</p>
    </Card>
  )
}

/* D — pay once, every month after is free */
function OnceCard() {
  const months = ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D']
  return (
    <Card className="bg-ink text-white lg:col-span-2" delay={0.1}>
      <Label dark>Monthly fees</Label>
      <p className="mt-3 text-[80px] font-semibold leading-none tracking-[-0.05em] text-lime">$0</p>
      <div className="mt-auto grid grid-cols-6 gap-2 pt-8">
        {months.map((m, i) => (
          <motion.div
            key={i}
            className="grid aspect-square place-items-center rounded-xl font-mono text-[11px]"
            initial={{ backgroundColor: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.4)', scale: 0.8 }}
            whileInView={{ backgroundColor: '#d4ff3f', color: '#0e0e0c', scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 + i * 0.08, type: 'spring', stiffness: 300, damping: 18 }}
          >
            {m}
          </motion.div>
        ))}
      </div>
      <p className="mt-4 text-[15px] text-white/60">Pay once. Works all year.</p>
    </Card>
  )
}

/* E — followers per week (illustrative) */
function FollowersCard() {
  const data = [22, 28, 25, 41, 52, 61, 89]
  const max = 90
  return (
    <Card className="bg-card ring-1 ring-line lg:col-span-2" delay={0.15}>
      <Label>New Instagram followers</Label>
      <p className="mt-3 text-[80px] font-semibold leading-none tracking-[-0.05em]">
        +<Count to={318} delay={0.4} />
      </p>
      <div className="mt-auto flex h-36 items-end gap-2 pt-8">
        {data.map((v, i) => (
          <motion.div
            key={i}
            className="flex-1 rounded-t-[6px]"
            style={{ background: i === data.length - 1 ? 'var(--color-series-1)' : 'var(--color-de-emphasis)', transformOrigin: 'bottom' }}
            initial={{ height: 0 }}
            whileInView={{ height: `${(v / max) * 100}%` }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 + i * 0.09, type: 'spring', stiffness: 140, damping: 14 }}
          />
        ))}
      </div>
      <p className="mt-4 text-[15px] text-muted">This month, from one tag at the till.</p>
    </Card>
  )
}

export default function Benefits() {
  return (
    <section id="benefits" className="scroll-mt-24 bg-paper py-24 md:py-32">
      <div className="container-x">
        <SectionHeading eyebrow="The impact" title="What one tap does." />
        <div className="mt-12 grid gap-4 lg:grid-cols-6">
          <StepsCard />
          <ReviewsCard />
          <SpeedCard />
          <OnceCard />
          <FollowersCard />
        </div>
        <p className="mt-5 font-mono text-[11px] text-muted">Review and follower figures are illustrative, for a sample café.</p>
      </div>
    </section>
  )
}
