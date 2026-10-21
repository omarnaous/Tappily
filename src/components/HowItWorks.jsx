import { lazy, Suspense, useRef, useState } from 'react'
import { motion, useMotionValueEvent, useScroll, useTransform } from 'framer-motion'
import { steps } from '../data/site'

// The same Remotion composition that renders the promo videos, played live and scrubbed by scroll.
const StoryPlayer = lazy(() => import('./StoryPlayer'))

// Frame boundaries of the three beats in the TapStory composition (video/src/timing.js -> STORY)
const STORY_FRAMES = 150
const stepAt = (frame) => (frame < 46 ? 0 : frame < 96 ? 1 : 2)

export default function HowItWorks() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const [step, setStep] = useState(0)
  const [frame, setFrame] = useState(0)
  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    const f = Math.round(Math.min(1, Math.max(0, v)) * (STORY_FRAMES - 1))
    setFrame(f)
    setStep(stepAt(f))
  })
  const bar = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <section id="how" ref={ref} className="relative h-[300vh] scroll-mt-0 bg-ink text-white">
      <div className="noise sticky top-0 flex h-[100svh] items-center overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(800px_500px_at_75%_55%,rgba(8,85,214,0.35),transparent_70%)]" />
        <div className="container-x relative grid items-center gap-4 lg:grid-cols-[1fr_1.1fr] lg:gap-10">
          <div>
            <span className="eyebrow text-brand-2">
              <span className="h-1.5 w-1.5 rounded-full bg-current" /> How it works
            </span>
            <h2 className="h-display mt-3 text-[clamp(2rem,5.4vw,4.6rem)] lg:mt-4">
              It's as easy as <span className="text-brand-2">1 → 2 → 3.</span>
            </h2>
            <ol className="mt-4 space-y-1 md:mt-10 md:space-y-2">
              {steps.map((s, i) => (
                <li
                  key={s.n}
                  className={`rounded-2xl border p-4 transition-all duration-500 md:p-5 ${step === i ? 'border-white/20 bg-white/[0.06]' : 'border-transparent opacity-40'}`}
                >
                  <div className="flex items-baseline gap-4">
                    <span className="font-display text-sm font-bold text-brand-2">{s.n}</span>
                    <div>
                      <h3 className="font-display text-2xl font-bold md:text-3xl">{s.title}</h3>
                      <motion.p
                        className="overflow-hidden text-[15px] leading-relaxed text-white/65"
                        animate={{ height: step === i ? 'auto' : 0, opacity: step === i ? 1 : 0 }}
                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <span className="block pt-2">{s.text}</span>
                      </motion.p>
                    </div>
                  </div>
                </li>
              ))}
            </ol>
            <div className="mt-5 h-1 w-full max-w-sm md:mt-8 overflow-hidden rounded-full bg-white/10">
              <motion.div className="h-full rounded-full bg-brand-2" style={{ width: bar }} />
            </div>
          </div>

          <div className="relative order-first mx-auto aspect-square w-[min(80vw,40svh)] overflow-hidden rounded-[32px] bg-navy shadow-[0_40px_100px_-30px_rgba(8,85,214,0.6)] ring-1 ring-white/10 sm:w-full sm:max-w-[560px] lg:order-none lg:max-w-none">
            <Suspense fallback={null}>
              <StoryPlayer frame={frame} />
            </Suspense>
          </div>
        </div>
      </div>
    </section>
  )
}
