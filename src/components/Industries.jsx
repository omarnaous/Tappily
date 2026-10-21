import { useLayoutEffect, useRef, useState } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { SectionHeading } from './Reveal'
import { asset, industries } from '../data/site'

function Card({ item, i }) {
  return (
    <a
      href="#shop"
      className="group relative block aspect-[4/5] w-[78vw] shrink-0 overflow-hidden rounded-[28px] bg-ink sm:w-[46vw] md:w-[min(38vw,calc((100svh-340px)*0.8))] lg:w-[min(30vw,calc((100svh-340px)*0.8))]"
    >
      <img
        src={asset(item.img)}
        alt=""
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover opacity-80 transition-transform duration-[1.4s] ease-(--ease-out-expo) group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/95 via-ink/30 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6 text-white md:p-8">
        <div>
          <p className="font-display text-sm font-bold text-brand-2">0{i + 1}</p>
          <h3 className="h-display mt-2 text-3xl md:text-4xl">{item.title}</h3>
          <p className="mt-2 text-white/70">{item.text}</p>
        </div>
        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-white text-ink transition-transform duration-500 group-hover:rotate-45">
          <ArrowUpRight className="h-5 w-5" />
        </span>
      </div>
    </a>
  )
}

const heading = (
  <SectionHeading
    eyebrow="Made for"
    title="Every place people tap."
    text="From a café in Hamra to a salon in Jounieh — if customers visit you, Tapilly turns that visit into growth."
  />
)

/** Desktop: the section pins and vertical scroll drives the cards sideways until the last one is fully in view. */
function PinnedRow() {
  const section = useRef(null)
  const track = useRef(null)
  const [distance, setDistance] = useState(0)

  useLayoutEffect(() => {
    const measure = () => {
      if (!track.current) return
      setDistance(Math.max(0, track.current.scrollWidth - window.innerWidth))
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(track.current)
    window.addEventListener('resize', measure)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [])

  const { scrollYProgress } = useScroll({ target: section, offset: ['start start', 'end end'] })
  const raw = useTransform(scrollYProgress, [0, 1], [0, -distance])
  const x = useSpring(raw, { stiffness: 220, damping: 40, mass: 0.4 })

  return (
    <section ref={section} className="relative hidden bg-white md:block" style={{ height: `calc(100vh + ${distance}px)` }}>
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        <div className="container-x">{heading}</div>
        <motion.div ref={track} style={{ x }} className="mt-12 flex w-max gap-5 pl-[max(1rem,calc((100vw-1320px)/2+2.5rem))] pr-[6vw]">
          {industries.map((it, i) => (
            <Card key={it.title} item={it} i={i} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default function Industries() {
  return (
    <>
      <PinnedRow />
      <section className="bg-white py-24 md:hidden">
        <div className="container-x">{heading}</div>
        <div className="no-scrollbar mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-4 px-4">
          {industries.map((it, i) => (
            <div key={it.title} className="snap-start">
              <Card item={it} i={i} />
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
