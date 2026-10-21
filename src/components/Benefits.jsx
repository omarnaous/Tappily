import { useEffect, useRef, useState } from 'react'
import { animate, motion, useInView, useMotionValue, useMotionValueEvent } from 'framer-motion'
import { ExternalLink, Smartphone, Zap } from 'lucide-react'
import { PlatformIcon } from './Brand'
import { Reveal, SectionHeading } from './Reveal'
import { CURRENCY, PRICE } from '../data/site'

const ease = [0.16, 1, 0.3, 1]
const OPEN_DAYS = 26 // open days per month used by the estimate
const MONTHS = 6

const GOALS = [
  { id: 'reviews', label: 'Google reviews', icon: 'google', noun: 'reviews', share: 4 },
  { id: 'followers', label: 'Instagram follows', icon: 'instagram', noun: 'followers', share: 8 },
  { id: 'chats', label: 'WhatsApp chats', icon: 'whatsapp', noun: 'chats', share: 5 },
]

const compact = (n) => (n >= 10000 ? `${(n / 1000).toFixed(0)}K` : n >= 1000 ? `${(n / 1000).toFixed(1)}K` : `${Math.round(n)}`)

/** Number that eases to its new value whenever it changes (and counts up when first seen). */
function Rolling({ value, format = (v) => Math.round(v).toLocaleString('en-US'), className }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const mv = useMotionValue(0)
  const [text, setText] = useState(format(0))
  useMotionValueEvent(mv, 'change', (v) => setText(format(v)))
  useEffect(() => {
    if (!inView) return
    const c = animate(mv, value, { duration: 0.9, ease })
    return () => c.stop()
  }, [inView, value, mv])
  return (
    <span ref={ref} className={className}>
      {text}
    </span>
  )
}

function Slider({ label, value, min, max, step = 1, suffix = '', onChange }) {
  const pct = ((value - min) / (max - min)) * 100
  return (
    <label className="block">
      <span className="flex items-baseline justify-between text-sm">
        <span className="text-muted">{label}</span>
        <span className="font-mono font-medium text-ink">
          {value}
          {suffix}
        </span>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="range mt-3 w-full"
        style={{ '--pct': `${pct}%` }}
      />
    </label>
  )
}

/** Cumulative actions per month: one series (slot 1), current month emphasised, value at the cap, hover per column. */
function GrowthChart({ monthly, noun }) {
  const [hover, setHover] = useState(null)
  const W = 560
  const H = 210
  const top = 18
  const data = Array.from({ length: MONTHS }, (_, i) => monthly * (i + 1))
  const max = data[MONTHS - 1] || 1
  const nice = (() => {
    const p = 10 ** Math.floor(Math.log10(max))
    return Math.ceil(max / p) * p
  })()
  const ticks = [0, nice / 2, nice]
  const slot = W / MONTHS
  const bw = 24
  const y = (v) => H - (v / nice) * (H - top)
  return (
    <div className="relative">
      <svg
        viewBox={`0 0 ${W + 44} ${H + 28}`}
        className="w-full overflow-visible"
        role="img"
        aria-label={`Cumulative ${noun} over ${MONTHS} months`}
        onMouseLeave={() => setHover(null)}
      >
        {ticks.map((t) => (
          <g key={t}>
            <line x1="44" x2={W + 44} y1={y(t)} y2={y(t)} stroke={t === 0 ? 'var(--color-line)' : 'var(--color-grid)'} strokeWidth="1" />
            <text x="36" y={y(t) + 4} textAnchor="end" className="fill-muted font-mono text-[11px]">
              {compact(t)}
            </text>
          </g>
        ))}
        {data.map((v, i) => {
          const x = 44 + i * slot + (slot - bw) / 2
          const h = Math.max(4, H - y(v))
          const d = `M${x},${H} V${H - h + 4} q0,-4 4,-4 h${bw - 8} q4,0 4,4 V${H} Z`
          const on = i === MONTHS - 1 || i === hover
          return (
            <g key={i} onMouseEnter={() => setHover(i)}>
              <rect x={44 + i * slot} y="0" width={slot} height={H} fill="transparent" />
              <motion.path
                initial={false}
                animate={{ d }}
                transition={{ duration: 0.7, ease }}
                fill={on ? 'var(--color-series-1)' : 'var(--color-de-emphasis)'}
              />
              <text x={44 + i * slot + slot / 2} y={H + 20} textAnchor="middle" className="fill-muted font-mono text-[11px]">
                M{i + 1}
              </text>
              {i === MONTHS - 1 && (
                <text x={x + bw / 2} y={H - h - 8} textAnchor="middle" className="fill-ink text-[13px] font-semibold">
                  {compact(v)}
                </text>
              )}
            </g>
          )
        })}
      </svg>
      {hover != null && (
        <div
          className="pointer-events-none absolute z-10 -translate-x-1/2 whitespace-nowrap rounded-lg bg-ink px-2.5 py-1.5 font-mono text-[11px] text-white"
          style={{ left: `${((44 + hover * slot + slot / 2) / (W + 44)) * 100}%`, top: 0 }}
        >
          Month {hover + 1}: {Math.round(data[hover]).toLocaleString('en-US')} {noun}
        </div>
      )}
    </div>
  )
}

function Estimator({ goal, setGoal, customers, setCustomers, share, setShare, monthly }) {
  const g = GOALS.find((x) => x.id === goal)
  return (
    <div className="card flex h-full flex-col p-6 md:p-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="eyebrow">Growth estimator</p>
        <div className="flex rounded-full bg-mist p-1" role="tablist" aria-label="Goal">
          {GOALS.map((x) => (
            <button
              key={x.id}
              role="tab"
              aria-selected={goal === x.id}
              onClick={() => {
                setGoal(x.id)
                setShare(x.share)
              }}
              className={`relative flex cursor-pointer items-center gap-1.5 rounded-full px-3 py-1.5 text-[13px] font-medium transition-colors ${goal === x.id ? 'text-ink' : 'text-muted hover:text-ink'}`}
            >
              {goal === x.id && (
                <motion.span
                  layoutId="goal-pill"
                  className="absolute inset-0 rounded-full bg-card shadow-sm"
                  transition={{ type: 'spring', stiffness: 400, damping: 34 }}
                />
              )}
              <PlatformIcon name={x.icon} className="relative h-3.5 w-3.5" />
              <span className="relative hidden sm:inline">{x.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 grid gap-8 md:grid-cols-[0.8fr_1.2fr]">
        <div className="flex flex-col gap-6">
          <div>
            <p className="text-sm text-muted">New {g.noun} per month</p>
            <p className="mt-1 text-[56px] font-semibold leading-none tracking-tight">
              ≈<Rolling value={monthly} />
            </p>
          </div>
          <Slider label="Customers per day" value={customers} min={20} max={600} step={10} onChange={setCustomers} />
          <Slider label="Share who tap" value={share} min={1} max={20} suffix="%" onChange={setShare} />
        </div>
        <div className="flex flex-col justify-end">
          <p className="mb-2 text-sm text-muted">Total {g.noun} after each month</p>
          <GrowthChart monthly={monthly} noun={g.noun} />
        </div>
      </div>
      <p className="mt-6 border-t border-line pt-4 font-mono text-[11px] leading-relaxed text-muted">
        Estimate = customers per day × {OPEN_DAYS} open days × share who tap. Your results depend on placement and service — not a guarantee.
      </p>
    </div>
  )
}

const STEPS = [
  { label: 'Search your name', steps: 6, detail: 'Unlock, open app, type, pick result, scroll, tap' },
  { label: 'Scan a QR code', steps: 4, detail: 'Unlock, open camera, frame & focus, open link' },
  { label: 'Tap a Tapilly tag', steps: 1, detail: 'Hold the phone near the tag', us: true },
]

function StepsCard() {
  return (
    <div className="card flex h-full flex-col p-6 md:p-8">
      <p className="eyebrow">Friction</p>
      <h3 className="mt-3 text-2xl font-semibold tracking-tight">Fewer steps, more action</h3>
      <p className="mt-1 text-sm text-muted">Typical steps for a customer to reach your page.</p>
      <ul className="mt-6 flex flex-1 flex-col justify-center gap-5">
        {STEPS.map((s, i) => (
          <li key={s.label} title={s.detail}>
            <div className="flex items-baseline justify-between text-sm">
              <span className={s.us ? 'font-semibold text-ink' : 'text-ink-2'}>{s.label}</span>
              <span className="font-mono text-[12px] text-muted">
                {s.steps} {s.steps > 1 ? 'steps' : 'step'}
              </span>
            </div>
            <div className="mt-2 h-6 w-full">
              <motion.div
                className="h-full rounded-r-[4px]"
                style={{ background: s.us ? 'var(--color-series-1)' : 'var(--color-de-emphasis)', maxWidth: '100%' }}
                initial={{ width: 0 }}
                whileInView={{ width: `${(s.steps / 6) * 100}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: i * 0.12, ease }}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function Benefits() {
  const [goal, setGoal] = useState('reviews')
  const [customers, setCustomers] = useState(120)
  const [share, setShare] = useState(4)
  const monthly = Math.round(customers * OPEN_DAYS * (share / 100))
  const yearly = monthly * 12
  const perAction = yearly ? PRICE / yearly : 0
  const g = GOALS.find((x) => x.id === goal)

  return (
    <section id="benefits" className="scroll-mt-24 bg-paper py-24 md:py-32">
      <div className="container-x">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading eyebrow="The impact" title="What one tap does for your business." />
          <Reveal delay={0.1}>
            <p className="max-w-sm text-muted md:text-right">Play with your own numbers. Every chart updates as you go.</p>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-4 lg:grid-cols-12">
          <Reveal className="lg:col-span-7 lg:row-span-2">
            <Estimator goal={goal} setGoal={setGoal} customers={customers} setCustomers={setCustomers} share={share} setShare={setShare} monthly={monthly} />
          </Reveal>
          <Reveal className="lg:col-span-5" delay={0.08}>
            <StepsCard />
          </Reveal>
          <Reveal className="lg:col-span-5" delay={0.16}>
            <div className="relative flex h-full flex-col overflow-hidden rounded-[28px] bg-ink p-6 text-white md:p-8">
              <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(212,255,63,0.35),transparent_65%)]" />
              <p className="eyebrow !text-white/50">Cost per {g.noun.slice(0, -1)}</p>
              <p className="relative mt-4 text-[64px] font-semibold leading-none tracking-tight text-lime">
                <Rolling value={perAction} format={(v) => `${CURRENCY}${v < 0.01 && v > 0 ? '<0.01' : v.toFixed(2)}`} />
              </p>
              <p className="relative mt-3 max-w-xs text-sm text-white/65">
                One {CURRENCY}
                {PRICE} tag over 12 months at your estimate of {yearly.toLocaleString('en-US')} {g.noun}. No subscription.
              </p>
            </div>
          </Reveal>
          <Reveal className="lg:col-span-6" delay={0.05}>
            <div className="card flex h-full flex-col gap-5 p-6 sm:flex-row sm:items-center md:p-8">
              <div className="flex shrink-0 gap-1" aria-hidden="true">
                {[0, 1, 2, 3, 4].map((i) => (
                  <motion.svg
                    key={i}
                    viewBox="0 0 24 24"
                    className="h-8 w-8"
                    initial={{ scale: 0, rotate: -40 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{ type: 'spring', stiffness: 300, damping: 14, delay: 0.2 + i * 0.08 }}
                  >
                    <path d="M12 2.6l2.85 6.03 6.62.8-4.88 4.53 1.28 6.54L12 17.27 6.13 20.5l1.28-6.54L2.53 9.43l6.62-.8z" fill="#FBBC05" />
                  </motion.svg>
                ))}
              </div>
              <div>
                <h3 className="text-xl font-semibold tracking-tight">Reviews help you rank on Google</h3>
                <p className="mt-1 text-sm text-muted">
                  Google says review count and score are part of how it ranks local businesses in Search and Maps.{' '}
                  <a
                    className="inline-flex items-center gap-1 font-medium text-ink underline underline-offset-4"
                    href="https://support.google.com/business/answer/7091"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Google Business Profile Help <ExternalLink className="h-3 w-3" />
                  </a>
                </p>
              </div>
            </div>
          </Reveal>
          <Reveal className="lg:col-span-6" delay={0.1}>
            <div className="card grid h-full grid-cols-2 divide-x divide-line p-0">
              <div className="p-6 md:p-8">
                <Zap className="h-5 w-5 text-brand" />
                <p className="mt-4 text-[44px] font-semibold leading-none tracking-tight">~1s</p>
                <p className="mt-2 text-sm text-muted">From tap to your page opening.</p>
              </div>
              <div className="p-6 md:p-8">
                <Smartphone className="h-5 w-5 text-brand" />
                <p className="mt-4 text-[44px] font-semibold leading-none tracking-tight">0</p>
                <p className="mt-2 text-sm text-muted">Apps to install. Works on iPhone & Android.</p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
