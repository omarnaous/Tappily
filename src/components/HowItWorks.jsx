import { useRef, useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useTransform } from 'framer-motion'
import { Check, Star } from 'lucide-react'
import ProductVisual from './ProductVisual'
import { NfcWaves, PlatformIcon } from './Brand'
import { products, steps } from '../data/site'

const product = products[0]

// Sized in cqw so the mock screen scales with the phone on every breakpoint.
function PhoneScreen({ step }) {
  return (
    <AnimatePresence mode="wait">
      {step === 0 && (
        <motion.div
          key="0"
          className="absolute inset-0 flex flex-col items-center justify-center bg-[radial-gradient(circle_at_30%_20%,#2a4dbb,transparent_60%),radial-gradient(circle_at_80%_90%,#6b3bd6,transparent_60%),#0b1120] text-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <p className="font-display text-[21cqw] font-semibold leading-none">5:18</p>
          <p className="mt-[2cqw] text-[5.4cqw] text-white/70">Hold near a Tapilly tag</p>
          <motion.div className="mt-[16cqw]" animate={{ scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }} transition={{ duration: 1.6, repeat: Infinity }}>
            <NfcWaves className="h-[18cqw] w-[18cqw]" color="#9cc0ff" />
          </motion.div>
        </motion.div>
      )}
      {step === 1 && (
        <motion.div
          key="1"
          className="absolute inset-0 bg-white px-[7cqw] pt-[18cqw] text-ink"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
        >
          <div className="flex items-center gap-[3cqw] text-[5cqw] text-ink/60">
            <PlatformIcon name="google" className="h-[7cqw] w-[7cqw]" color="#4285F4" /> Google Reviews
          </div>
          <p className="mt-[7cqw] font-display text-[9cqw] font-bold leading-tight">The Daily Bites</p>
          <p className="text-[5cqw] text-ink/50">Restaurant · Beirut</p>
          <div className="mt-[8cqw] flex gap-[2.6cqw]">
            {[0, 1, 2, 3, 4].map((i) => (
              <motion.span
                key={i}
                initial={{ scale: 0.4, opacity: 0.3 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.25 + i * 0.12, type: 'spring', stiffness: 400 }}
              >
                <Star className="h-[10.5cqw] w-[10.5cqw] fill-gold text-gold" />
              </motion.span>
            ))}
          </div>
          <div className="mt-[7cqw] h-[36cqw] rounded-[5cqw] border border-line p-[4.5cqw] text-[5cqw] text-ink/70">Amazing food and super friendly staff!</div>
          <div className="mt-[5cqw] grid h-[16cqw] place-items-center rounded-full bg-[#1a73e8] text-[5.4cqw] font-semibold text-white">Post</div>
        </motion.div>
      )}
      {step === 2 && (
        <motion.div
          key="2"
          className="absolute inset-0 flex flex-col items-center justify-center bg-white text-ink"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="grid h-[28cqw] w-[28cqw] place-items-center rounded-full bg-emerald-500 text-white"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 15 }}
          >
            <Check className="h-[14cqw] w-[14cqw]" strokeWidth={3} />
          </motion.div>
          <p className="mt-[7cqw] font-display text-[9cqw] font-bold">Review posted</p>
          <p className="mt-[2cqw] text-[5.4cqw] text-ink/50">Thanks for your feedback!</p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default function HowItWorks() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const [step, setStep] = useState(0)
  useMotionValueEvent(scrollYProgress, 'change', (v) => setStep(Math.min(2, Math.floor(v * 3.2))))

  const phoneX = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], ['55%', '8%', '8%', '30%'])
  const phoneY = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], ['-30%', '-4%', '-4%', '-12%'])
  const phoneR = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [18, 8, 8, 2])
  const bar = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])
  const ring = useTransform(scrollYProgress, [0.25, 0.45], [0, 1])
  const ringScale = useTransform(ring, [0, 1], [0.4, 1.8])
  const ringOpacity = useTransform(ring, [0, 0.2, 1], [0, 0.9, 0])

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

          <div className="relative order-first mx-auto aspect-square w-[min(72vw,38svh)] sm:w-full sm:max-w-[560px] lg:order-none lg:max-w-none">
            <div className="absolute left-[6%] top-[12%] w-[52%] overflow-hidden rounded-[28px] shadow-2xl">
              <ProductVisual product={product} interactive={false} />
            </div>
            <motion.div
              className="pointer-events-none absolute left-[32%] top-[42%] h-[40%] w-[40%] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-brand-2 shadow-[0_0_40px_rgba(61,123,255,0.6)]"
              style={{ scale: ringScale, opacity: ringOpacity }}
            />
            <motion.div className="absolute left-[30%] top-[18%] aspect-[9/19] w-[40%]" style={{ x: phoneX, y: phoneY, rotate: phoneR }}>
              <div className="relative h-full w-full rounded-[36px] bg-[#0d0f14] p-[6px] shadow-[0_0_0_2px_#2a2f3a,0_40px_80px_rgba(0,0,0,0.6)]">
                <div className="relative h-full w-full overflow-hidden rounded-[30px] [container-type:inline-size]">
                  <div className="absolute left-1/2 top-[3.5cqw] z-10 h-[9cqw] w-[28cqw] -translate-x-1/2 rounded-full bg-black" />
                  <PhoneScreen step={step} />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
