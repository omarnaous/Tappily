import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const TEXT = 'Stop making customers search. Give them instant access to what matters — your reviews, your page, your menu — with one simple tap.'

function Word({ children, progress, range }) {
  const opacity = useTransform(progress, range, [0.16, 1])
  return (
    <motion.span style={{ opacity }} className="mr-[0.25em] inline-block">
      {children}
    </motion.span>
  )
}

export default function Statement() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.45'] })
  const words = TEXT.split(' ')
  return (
    <section ref={ref} className="noise relative bg-ink py-28 text-white md:py-40">
      <div className="container-x">
        <p className="h-display max-w-6xl text-[clamp(2rem,5.2vw,4.8rem)] !leading-[1.06] text-white">
          {words.map((w, i) => (
            <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
              {w === 'tap.' ? <span className="rounded-[0.15em] bg-accent px-[0.12em] text-white">{w}</span> : w}
            </Word>
          ))}
        </p>
      </div>
    </section>
  )
}
