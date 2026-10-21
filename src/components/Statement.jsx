import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const TEXT = 'Stop making customers search. Give them instant access to what matters — your reviews, your page, your menu — with one simple tap.'

function Word({ children, progress, range }) {
  const opacity = useTransform(progress, range, [0.12, 1])
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
    <section ref={ref} className="bg-paper py-28 md:py-40">
      <div className="container-x">
        <p className="h-display max-w-6xl text-[clamp(2rem,5.2vw,4.8rem)] !leading-[1.04] text-ink">
          {words.map((w, i) => (
            <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
              {w === 'tap.' ? <span className="text-brand">{w}</span> : w}
            </Word>
          ))}
        </p>
      </div>
    </section>
  )
}
