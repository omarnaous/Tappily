import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { LogoMark, NfcWaves, PlatformIcon } from './Brand'

const stripeStyle = (t) => {
  switch (t.stripe) {
    case 'google':
      return { background: `linear-gradient(90deg, ${t.a} 0 25%, ${t.d} 25% 50%, ${t.c} 50% 75%, ${t.b} 75%)` }
    case 'insta':
      return { background: `linear-gradient(90deg, ${t.a}, ${t.b}, ${t.c}, ${t.d})` }
    case 'tiktok':
      return { background: `linear-gradient(90deg, ${t.a} 0 50%, ${t.b} 50%)` }
    default:
      return { background: `linear-gradient(90deg, ${t.a}, ${t.b})` }
  }
}

const badgeStyle = (t) => {
  switch (t.stripe) {
    case 'google':
      return { background: '#fff', boxShadow: 'inset 0 0 0 1px #e5e7eb' }
    case 'insta':
      return { background: `radial-gradient(circle at 30% 107%, ${t.a} 0%, ${t.b} 25%, ${t.c} 55%, ${t.d} 90%)` }
    case 'tiktok':
      return { background: '#000', boxShadow: `-2px -2px 0 ${t.a}, 2px 2px 0 ${t.b}` }
    default:
      return { background: `linear-gradient(135deg, ${t.a}, ${t.b})` }
  }
}

function StandFace({ product }) {
  const t = product.theme
  return (
    <div className="absolute inset-0 flex flex-col items-center overflow-hidden" style={{ background: t.bg, color: t.fg }}>
      <div className="absolute inset-x-0 top-0 h-[5cqw]" style={stripeStyle(t)} />
      <div
        className="pointer-events-none absolute -right-[30cqw] -top-[30cqw] h-[80cqw] w-[80cqw] rounded-full opacity-25 blur-[12cqw]"
        style={{ background: t.a }}
      />
      <div className="relative mt-[14cqw] grid h-[22cqw] w-[22cqw] place-items-center rounded-[6cqw]" style={badgeStyle(t)}>
        <PlatformIcon name={product.icon} className="h-[12cqw] w-[12cqw]" color={iconColor(t)} />
      </div>
      <p className="relative mt-[7cqw] px-[8cqw] text-center font-display text-[12cqw] font-bold leading-[1.02] tracking-tight">{product.headline}</p>
      <p className="relative mt-[3cqw] px-[9cqw] text-center text-[5.2cqw] leading-snug opacity-70">{product.cta}</p>
      <div
        className="relative mt-[8cqw] grid h-[28cqw] w-[28cqw] place-items-center rounded-full border-[1cqw] border-dashed"
        style={{ borderColor: `${t.a}aa`, background: `${t.a}1f` }}
      >
        <NfcWaves className="h-[14cqw] w-[14cqw]" color={waveColor(t)} />
      </div>
      <Brandline t={t} className="mb-[6cqw] mt-auto text-[4.8cqw]" />
    </div>
  )
}

function CardFace({ product }) {
  const t = product.theme
  return (
    <div className="absolute inset-0 overflow-hidden" style={{ background: t.bg, color: t.fg }}>
      <div className="absolute inset-x-0 top-0 h-[3cqw]" style={stripeStyle(t)} />
      <div
        className="pointer-events-none absolute -left-[20cqw] -bottom-[30cqw] h-[60cqw] w-[60cqw] rounded-full opacity-25 blur-[10cqw]"
        style={{ background: t.a }}
      />
      <div className="absolute left-[7cqw] top-[10cqw] grid h-[13cqw] w-[13cqw] place-items-center rounded-[3.5cqw]" style={badgeStyle(t)}>
        <PlatformIcon name={product.icon} className="h-[7cqw] w-[7cqw]" color={iconColor(t)} />
      </div>
      <p className="absolute left-[7cqw] top-[27cqw] max-w-[54cqw] font-display text-[7.4cqw] font-bold leading-[1.02] tracking-tight">{product.headline}</p>
      <p className="absolute left-[7cqw] top-[45cqw] max-w-[54cqw] text-[3.3cqw] leading-snug opacity-70">{product.cta}</p>
      <div
        className="absolute right-[7cqw] top-1/2 grid h-[22cqw] w-[22cqw] -translate-y-1/2 place-items-center rounded-full border-[0.7cqw] border-dashed"
        style={{ borderColor: `${t.a}aa`, background: `${t.a}1f` }}
      >
        <NfcWaves className="h-[11cqw] w-[11cqw]" color={waveColor(t)} />
      </div>
      <Brandline t={t} className="absolute bottom-[5cqw] left-[7cqw] text-[3cqw]" />
    </div>
  )
}

const iconColor = (t) => (t.stripe === 'google' ? '#4285F4' : t.stripe === 'gold' ? '#16130f' : '#fff')
const waveColor = (t) => (t.stripe === 'google' ? '#0855d6' : t.a)

function Brandline({ t, className }) {
  return (
    <div className={`relative flex items-center gap-[0.4em] font-extrabold tracking-[0.12em] opacity-90 ${className}`}>
      <LogoMark className="h-[1.25em] w-[1.25em]" base={t.fg} accent="#3d7bff" />
      TAPILLY
    </div>
  )
}

/** Rendered product shot: an acrylic stand or a card, themed per product. Fills its container width. */
export default function ProductVisual({ product, format = 'stand', interactive = true, className = '' }) {
  const ref = useRef(null)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [10, -10]), { stiffness: 160, damping: 18 })
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-14, 14]), { stiffness: 160, damping: 18 })
  const t = product.theme

  const onMove = (e) => {
    if (!interactive || !ref.current) return
    const r = ref.current.getBoundingClientRect()
    mx.set((e.clientX - r.left) / r.width - 0.5)
    my.set((e.clientY - r.top) / r.height - 0.5)
  }
  const onLeave = () => {
    mx.set(0)
    my.set(0)
  }

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className={`relative aspect-[4/5] w-full overflow-hidden [container-type:inline-size] ${className}`}
      style={{
        perspective: '1200px',
        background: `radial-gradient(120% 90% at 50% 100%, ${t.a}33, transparent 60%), radial-gradient(80% 60% at 80% 0%, ${t.b}22, transparent 70%), #f1f2f6`,
      }}
    >
      <div className="absolute inset-x-[18%] bottom-[9%] h-[8%] rounded-[50%] bg-black/25 blur-[3cqw]" />
      <motion.div className="absolute inset-0 grid place-items-center" style={{ rotateX: rx, rotateY: ry, transformStyle: 'preserve-3d' }}>
        {format === 'card' ? (
          <div
            className="relative h-[47cqw] w-[74cqw] rounded-[4cqw] shadow-[0_6cqw_10cqw_-4cqw_rgba(7,13,31,0.45)]"
            style={{ transform: 'rotateX(22deg) rotateZ(-9deg)' }}
          >
            <div className="absolute inset-0 overflow-hidden rounded-[4cqw] [container-type:inline-size]">
              <CardFace product={product} />
            </div>
            <div className="pointer-events-none absolute inset-0 rounded-[4cqw] bg-gradient-to-br from-white/40 via-transparent to-transparent" />
          </div>
        ) : (
          <div className="relative h-[80cqw] w-[58cqw]" style={{ transform: 'translateY(-2cqw)' }}>
            <div className="absolute inset-0 rounded-[4.5cqw] border border-white/80 bg-gradient-to-br from-white/70 via-white/25 to-white/50 shadow-[0_6cqw_12cqw_-4cqw_rgba(7,13,31,0.45),inset_0_1px_0_white] backdrop-blur-sm" />
            <div className="absolute inset-[2.6cqw] overflow-hidden rounded-[3cqw] shadow-[0_0_0_1px_rgba(0,0,0,0.06)] [container-type:inline-size]">
              <StandFace product={product} />
            </div>
            <div className="pointer-events-none absolute inset-0 rounded-[4.5cqw] bg-[linear-gradient(115deg,rgba(255,255,255,0.55)_0%,transparent_28%,transparent_70%,rgba(255,255,255,0.25)_100%)]" />
            <div className="absolute -bottom-[5cqw] -left-[2cqw] -right-[2cqw] h-[6cqw] rounded-[1.5cqw] border border-white/70 bg-gradient-to-b from-white/80 to-white/30 shadow-[0_2cqw_4cqw_-1cqw_rgba(7,13,31,0.35)]" />
          </div>
        )}
      </motion.div>
    </div>
  )
}
