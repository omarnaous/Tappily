// "How it works": four numbered steps from order to first tap. A line fills as you scroll through them.
import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { MapPin, RefreshCw, Settings2, ShoppingBag } from 'lucide-react'
import { NfcWaves } from './Brand'
import { SectionHeading } from './Reveal'

const ease = [0.16, 1, 0.3, 1]

const STEPS = [
  { icon: ShoppingBag, title: 'Pick your tags', text: 'Choose the platforms — Google reviews, Instagram, WhatsApp, menu — as a stand or a card.' },
  { icon: Settings2, title: 'We set them up', text: 'We program each tag with your link, add your business name and deliver anywhere in Lebanon.' },
  { icon: MapPin, title: 'Place them', text: 'On the counter, the tables or the wall — wherever customers wait, pay or sit.' },
  { icon: null, title: 'Customers tap', text: 'Their phone opens your page in about a second. No app, no QR code, no typing.', accent: true },
]

function Step({ step, i }) {
  const Icon = step.icon
  return (
    <motion.li
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.9, delay: i * 0.12, ease }}
      className={`relative flex flex-col rounded-[28px] p-6 md:p-7 ${step.accent ? 'bg-accent text-white' : 'border border-line bg-card'}`}
    >
      <div className="flex items-start justify-between">
        <motion.span
          className={`relative grid h-14 w-14 place-items-center rounded-2xl ${step.accent ? 'bg-white/15' : 'bg-mist'}`}
          initial={{ scale: 0.5, rotate: -20 }}
          whileInView={{ scale: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 260, damping: 14, delay: 0.2 + i * 0.12 }}
        >
          {Icon ? <Icon className="h-6 w-6" strokeWidth={1.8} /> : <NfcWaves className="h-7 w-7" />}
          {step.accent && (
            <motion.span
              className="pointer-events-none absolute inset-0 rounded-2xl border-2 border-white/60"
              animate={{ scale: [1, 1.6], opacity: [0.8, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut' }}
            />
          )}
        </motion.span>
        <span className={`font-mono text-[44px] font-medium leading-none tracking-tight ${step.accent ? 'text-white/40' : 'text-ink/15'}`}>0{i + 1}</span>
      </div>
      <h3 className="mt-10 text-2xl font-semibold tracking-tight">{step.title}</h3>
      <p className={`mt-2 text-[15px] leading-relaxed ${step.accent ? 'text-white/80' : 'text-muted'}`}>{step.text}</p>
    </motion.li>
  )
}

export default function Benefits() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.6'] })
  const fill = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <section id="how" className="scroll-mt-24 bg-paper py-24 md:py-32">
      <div className="container-x">
        <SectionHeading eyebrow="How it works" title="Live in four simple steps." />
        <div ref={ref} className="relative mt-12">
          {/* progress rail behind the cards (desktop) */}
          <div className="absolute left-0 right-0 top-[52px] hidden h-[2px] bg-line lg:block">
            <motion.div className="h-full bg-accent" style={{ width: fill }} />
          </div>
          <ol className="relative grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((s, i) => (
              <Step key={s.title} step={s} i={i} />
            ))}
          </ol>
        </div>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-6 flex items-center gap-2 text-[15px] text-muted"
        >
          <RefreshCw className="h-4 w-4 text-accent" /> Changed your menu or page? We reprogram your tags for free.
        </motion.p>
      </div>
    </section>
  )
}
