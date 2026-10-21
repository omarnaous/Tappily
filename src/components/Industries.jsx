import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
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
        <div ref={ref} className="mt-12 flex flex-col gap-5 md:mt-16 md:gap-0">
          {industries.map((it, i) => (
            <StackCard key={it.id} item={it} i={i} n={industries.length} progress={scrollYProgress} />
          ))}
        </div>
      </div>
    </section>
  )
}
