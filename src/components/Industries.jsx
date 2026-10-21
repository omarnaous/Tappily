import { useEffect, useRef, useState } from 'react'
import { animate, motion, useMotionValue, useScroll, useTransform } from 'framer-motion'
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react'
import { PlatformIcon } from './Brand'
import { SectionHeading } from './Reveal'
import { asset, industries, products } from '../data/site'
import { useMedia } from '../lib/useMedia'

const byId = Object.fromEntries(products.map((p) => [p.id, p]))

/** Cards pin one after another and the ones underneath shrink back, like a deck being dealt (md and up). */
function StackCard({ item, i, n, progress }) {
  const target = 1 - (n - 1 - i) * 0.04
  const scale = useTransform(progress, [i / n, 1], [1, target])
  const dim = useTransform(progress, [i / n, 1], [0, (n - 1 - i) * 0.06])
  const stacked = useMedia('(min-width: 768px)')
  return (
    <div className="md:sticky md:h-[calc(100vh-7rem)]" style={{ top: `calc(6rem + ${i * 18}px)` }}>
      <motion.article
        style={{ scale: stacked ? scale : 1, backgroundColor: item.tint, transformOrigin: '50% 0%' }}
        className="relative grid overflow-hidden rounded-[32px] border border-black/5 md:h-[min(620px,calc(100vh-9rem))] md:grid-cols-[1fr_1.05fr] md:grid-rows-[minmax(0,1fr)]"
      >
        <div className="flex flex-col justify-between gap-8 p-7 md:p-12">
          <div>
            <p className="font-mono text-[12px] text-ink/50">
              0{i + 1} / 0{n}
            </p>
            <h3 className="h-display mt-4 text-[clamp(2rem,4vw,3.6rem)]">{item.title}</h3>
            <p className="mt-4 max-w-md text-[17px] leading-relaxed text-ink/70">{item.text}</p>
          </div>
          <div>
            <p className="eyebrow !text-ink/50">Recommended tags</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {item.tags.map((t) => (
                <span key={t} className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3.5 py-2 text-sm font-medium backdrop-blur">
                  <PlatformIcon name={byId[t].icon} className="h-4 w-4" />
                  {byId[t].name.replace(' Tag', '')}
                </span>
              ))}
            </div>
            <a href="#shop" className="btn-primary group mt-6 !py-3">
              Shop for {item.title.split(' ')[0].toLowerCase().replace(',', '')}
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" />
            </a>
          </div>
        </div>
        <div className="relative min-h-0 p-3 pt-0 md:p-4 md:pl-0">
          <img
            src={asset(item.img)}
            alt={`Tapilly tags in ${item.title.toLowerCase()}`}
            loading="lazy"
            className="aspect-[4/5] h-full w-full rounded-[24px] object-cover md:aspect-auto"
          />
        </div>
        {stacked && <motion.div className="pointer-events-none absolute inset-0 bg-ink" style={{ opacity: dim }} />}
      </motion.article>
    </div>
  )
}

const shopLabel = (item) => `Shop for ${item.title.split(' ')[0].toLowerCase().replace(',', '')}`

/** One card in the phone deck. Only the top card drags; past the threshold it flies off and goes to the back. */
function SwipeCard({ item, depth, fling, onSwiped }) {
  const x = useMotionValue(0)
  const rotate = useTransform(x, [-220, 220], [-16, 16])
  const top = depth === 0

  const flyOut = (dir) =>
    animate(x, dir * 520, { duration: 0.32, ease: [0.55, 0, 1, 0.45] }).then(() => {
      onSwiped()
      x.set(0)
    })

  // The arrow buttons ask the top card to fly out.
  useEffect(() => {
    if (top && fling) flyOut(fling.dir)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fling])

  return (
    <motion.article
      className="absolute inset-0 touch-pan-y overflow-hidden rounded-[28px] bg-ink shadow-[0_30px_60px_-30px_rgba(14,14,12,0.5)]"
      style={{ x, rotate, zIndex: 10 - depth }}
      animate={{ scale: 1 - Math.min(depth, 2) * 0.05, y: Math.min(depth, 2) * 16, opacity: depth > 2 ? 0 : 1 }}
      transition={{ type: 'spring', stiffness: 260, damping: 26 }}
      drag={top ? 'x' : false}
      dragMomentum={false}
      onDragEnd={(_, info) => {
        const dir = Math.sign(info.offset.x)
        if (Math.abs(info.offset.x) > 90 || Math.abs(info.velocity.x) > 600) flyOut(dir || 1)
        else animate(x, 0, { type: 'spring', stiffness: 400, damping: 30 })
      }}
    >
      <img
        src={asset(item.img)}
        alt={`Tapilly tags in ${item.title.toLowerCase()}`}
        draggable={false}
        className="pointer-events-none absolute inset-0 h-full w-full select-none object-cover"
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(14,14,12,0)_35%,rgba(14,14,12,0.88)_80%)]" />
      <div className="absolute inset-x-0 bottom-0 p-5 text-white">
        <h3 className="text-[28px] font-semibold leading-tight tracking-tight">{item.title}</h3>
        <p className="mt-1.5 line-clamp-2 text-[14px] leading-snug text-white/75">{item.text}</p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {item.tags.map((t) => (
            <span key={t} className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-2.5 py-1 text-[12px] font-medium backdrop-blur">
              <PlatformIcon name={byId[t].icon} className="h-3.5 w-3.5" />
              {byId[t].name.replace(' Tag', '')}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  )
}

/** Phone: a swipeable deck — swipe left or right (or use the arrows) to see the next business. */
function SwipeDeck() {
  const [order, setOrder] = useState(() => industries.map((_, i) => i))
  const [fling, setFling] = useState(null)
  const [hinted, setHinted] = useState(false)
  const top = industries[order[0]]
  const next = () => {
    setOrder((o) => [...o.slice(1), o[0]])
    setFling(null) // consumed: the new top card must not fly out too
    setHinted(true)
  }
  return (
    <div className="mt-10 md:hidden">
      <div className="relative mx-auto aspect-[4/5] w-full max-w-[400px]">
        {order.map((idx, depth) => (
          <SwipeCard key={industries[idx].id} item={industries[idx]} depth={depth} fling={depth === 0 ? fling : null} onSwiped={next} />
        ))}
        {!hinted && (
          <motion.div
            className="pointer-events-none absolute left-1/2 top-5 z-20 -translate-x-1/2 rounded-full bg-white/90 px-3 py-1.5 text-[12px] font-semibold text-ink shadow"
            animate={{ x: [-10, 10, -10] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          >
            ← Swipe →
          </motion.div>
        )}
      </div>
      <div className="mx-auto mt-8 flex max-w-[400px] items-center justify-between gap-3">
        <button
          onClick={() => setFling({ dir: -1, n: Date.now() })}
          className="grid h-12 w-12 place-items-center rounded-full border border-line bg-card"
          aria-label="Previous business"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <a href="#shop" className="btn-primary flex-1 !py-3">
          {shopLabel(top)} <ArrowUpRight className="h-4 w-4" />
        </a>
        <button
          onClick={() => setFling({ dir: 1, n: Date.now() })}
          className="grid h-12 w-12 place-items-center rounded-full border border-line bg-card"
          aria-label="Next business"
        >
          <ArrowRight className="h-5 w-5" />
        </button>
      </div>
      <div className="mt-4 flex justify-center gap-1.5">
        {industries.map((it, i) => (
          <span key={it.id} className={`h-1.5 rounded-full transition-all duration-300 ${order[0] === i ? 'w-6 bg-accent' : 'w-1.5 bg-line'}`} />
        ))}
      </div>
    </div>
  )
}

export default function Industries() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  return (
    <section className="bg-paper py-24 md:py-32">
      <div className="container-x">
        <SectionHeading
          eyebrow="Made for"
          title="Every place people tap."
          text="Pick a setup that fits your business. Each scene shows the tag and what opens on your customer's phone."
        />
        <SwipeDeck />
        <div ref={ref} className="mt-16 hidden flex-col md:flex">
          {industries.map((it, i) => (
            <StackCard key={it.id} item={it} i={i} n={industries.length} progress={scrollYProgress} />
          ))}
        </div>
      </div>
    </section>
  )
}
