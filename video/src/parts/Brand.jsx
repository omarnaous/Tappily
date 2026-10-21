import { FONT } from '../theme.js'

export const LogoMark = ({ size = 40, base = '#0f2347', accent = '#0855d6', diamond }) => (
  <svg width={size} height={size} viewBox="0 0 40 40" style={{ display: 'block' }}>
    <circle cx="9" cy="9" r="7" fill={base} />
    <circle cx="31" cy="9" r="7" fill={base} />
    <circle cx="9" cy="31" r="7" fill={base} />
    <circle cx="31" cy="31" r="7" fill={accent} />
    <rect x="15.5" y="15.5" width="9" height="9" rx="1.6" transform="rotate(45 20 20)" fill={diamond || base} />
  </svg>
)

export const Wordmark = ({ size = 24, color = '#0f2347', accent = '#0855d6', gap = 0.4 }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: size * gap, color, fontFamily: FONT.sans, fontWeight: 800, letterSpacing: '0.08em', fontSize: size, lineHeight: 1 }}>
    <LogoMark size={size * 1.2} base={color} accent={accent} />
    TAPILLY
  </div>
)

export const Glyph = ({ d, size = 24, color = '#fff' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" style={{ display: 'block' }}>
    <path d={d} fill={color} />
  </svg>
)

export const NfcWaves = ({ size = 24, color = '#fff', width = 1.8, progress = 1 }) => {
  const arcs = ['M6 8.32a7.43 7.43 0 0 1 0 7.36', 'M9.46 6.21a11.76 11.76 0 0 1 0 11.58', 'M12.91 4.1a15.91 15.91 0 0 1 .01 15.8', 'M16.37 2a20.16 20.16 0 0 1 0 20']
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={width} strokeLinecap="round" style={{ display: 'block' }}>
      {arcs.map((d, i) => (
        <path key={i} d={d} opacity={Math.max(0.25, Math.min(1, progress * 4 - i))} />
      ))}
    </svg>
  )
}

export const Star = ({ size = 24, fill = '#FBBC05' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" style={{ display: 'block' }}>
    <path d="M12 2.6l2.85 6.03 6.62.8-4.88 4.53 1.28 6.54L12 17.27 6.13 20.5l1.28-6.54L2.53 9.43l6.62-.8z" fill={fill} />
  </svg>
)

export const Check = ({ size = 20, color = '#fff', width = 3 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={width} strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block' }}>
    <path d="M5 12.5l4.5 4.5L19 7.5" />
  </svg>
)
