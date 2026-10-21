import { motion } from 'framer-motion'

const ease = [0.16, 1, 0.3, 1]

export function Reveal({ children, delay = 0, y = 28, className = '', as = 'div' }) {
  const M = motion[as]
  return (
    <M
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.9, delay, ease }}
    >
      {children}
    </M>
  )
}

/** Splits a heading into words that rise in one after another. */
export function SplitWords({ text, className = '', delay = 0, stagger = 0.06, immediate = false }) {
  const words = text.split(' ')
  const anim = { initial: { y: '110%' }, transition: (i) => ({ duration: 1, delay: delay + i * stagger, ease }) }
  return (
    <span className={className} aria-label={text}>
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-bottom" aria-hidden="true">
          <motion.span
            className="inline-block"
            initial={anim.initial}
            {...(immediate ? { animate: { y: '0%' } } : { whileInView: { y: '0%' }, viewport: { once: true } })}
            transition={anim.transition(i)}
          >
            {w}
            {i < words.length - 1 ? ' ' : ''}
          </motion.span>
        </span>
      ))}
    </span>
  )
}

export function SectionHeading({ eyebrow, title, text, align = 'left', dark = false, className = '' }) {
  return (
    <div className={`${align === 'center' ? 'mx-auto text-center' : ''} max-w-3xl ${className}`}>
      {eyebrow && (
        <Reveal>
          <span className={`eyebrow ${dark ? 'text-brand-2' : ''}`}>
            <span className="h-1.5 w-1.5 rounded-full bg-current" />
            {eyebrow}
          </span>
        </Reveal>
      )}
      <h2 className={`h-display mt-4 text-[clamp(2.4rem,5.4vw,4.6rem)] ${dark ? 'text-white' : 'text-ink'}`}>
        <SplitWords text={title} />
      </h2>
      {text && (
        <Reveal delay={0.15}>
          <p className={`mt-5 text-lg leading-relaxed ${dark ? 'text-white/65' : 'text-muted'} ${align === 'center' ? 'mx-auto' : ''} max-w-xl`}>{text}</p>
        </Reveal>
      )}
    </div>
  )
}
