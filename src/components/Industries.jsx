import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { SectionHeading } from './Reveal'
import { asset, industries } from '../data/site'

function Card({ item, i }) {
  return (
    <motion.a
      href="#shop"
      className="group relative block aspect-[4/5] w-[78vw] shrink-0 overflow-hidden rounded-[28px] bg-ink sm:w-[46vw] lg:w-[30vw]"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.9, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
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
    </motion.a>
  )
}

export default function Industries() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const x = useTransform(scrollYProgress, [0, 1], ['6%', '-22%'])
  return (
    <section ref={ref} className="overflow-hidden bg-white py-24 md:py-32">
      <div className="container-x">
        <SectionHeading
          eyebrow="Made for"
          title="Every place people tap."
          text="From a café in Hamra to a salon in Jounieh — if customers visit you, Tapilly turns that visit into growth."
        />
      </div>
      <motion.div style={{ x }} className="mt-14 hidden gap-5 pl-[6vw] md:flex">
        {industries.map((it, i) => (
          <Card key={it.title} item={it} i={i} />
        ))}
      </motion.div>
      <div className="no-scrollbar mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 md:hidden">
        {industries.map((it, i) => (
          <div key={it.title} className="snap-start">
            <Card item={it} i={i} />
          </div>
        ))}
      </div>
    </section>
  )
}
