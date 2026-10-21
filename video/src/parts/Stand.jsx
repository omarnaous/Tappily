// Acrylic NFC stand with a themed card face. `flip` 0..1 turns it around and swaps to `next`.
import { FONT } from '../theme.js'
import { Glyph, NfcWaves, Star, Wordmark } from './Brand.jsx'

export const STAND = { w: 470, h: 640, inset: 18, nfcY: 0.69 } // nfc centre as a fraction of card height

function Face({ ch, pulse = 0 }) {
  const f = ch.face
  const cw = STAND.w - STAND.inset * 2
  return (
    <div style={{ position: 'absolute', inset: 0, background: f.bg, color: f.fg, display: 'flex', flexDirection: 'column', alignItems: 'center', overflow: 'hidden', borderRadius: 22 }}>
      <div style={{ position: 'absolute', left: 0, right: 0, top: 0, height: 14, background: f.stripe }} />
      <div style={{ position: 'absolute', right: -120, top: -120, width: 300, height: 300, borderRadius: 999, background: `radial-gradient(circle, ${f.ring}33, transparent 70%)` }} />
      <div style={{ marginTop: 60, width: 88, height: 88, borderRadius: 24, background: f.badge, display: 'grid', placeItems: 'center', boxShadow: f.badge === '#ffffff' ? 'inset 0 0 0 2px #e6e8ee' : '0 10px 24px -10px rgba(0,0,0,.45)' }}>
        <Glyph d={ch.icon} size={46} color={f.glyph} />
      </div>
      <div style={{ marginTop: 26, padding: '0 34px', textAlign: 'center', fontFamily: FONT.display, fontWeight: 700, fontSize: 48, lineHeight: 1.0, letterSpacing: '-0.02em' }}>{ch.title}</div>
      <div style={{ marginTop: 12, padding: '0 40px', textAlign: 'center', fontFamily: FONT.sans, fontSize: 18, lineHeight: 1.35, opacity: 0.66 }}>{ch.sub}</div>
      <div
        style={{
          position: 'absolute',
          left: cw / 2 - 62,
          top: (STAND.h - STAND.inset * 2) * STAND.nfcY - 62,
          width: 124,
          height: 124,
          borderRadius: 999,
          border: `3px dashed ${f.ring}aa`,
          background: `${f.ring}${pulse > 0 ? '33' : '1a'}`,
          boxShadow: `0 0 ${20 + pulse * 60}px ${pulse * 18}px ${f.ring}${Math.round(pulse * 140)
            .toString(16)
            .padStart(2, '0')}`,
          display: 'grid',
          placeItems: 'center',
        }}
      >
        <NfcWaves size={58} color={f.ring} width={2} />
      </div>
      <div style={{ position: 'absolute', bottom: 26 }}>
        <Wordmark size={17} color={f.fg} accent="#3d7bff" />
      </div>
    </div>
  )
}

export function Stand({ ch, next, flip = 0, squash = 1, pulse = 0, x, y }) {
  // first half shows `ch` turning away, second half shows `next` turning in
  const showNext = flip >= 0.5
  const angle = showNext ? (flip - 1) * 180 : flip * 180
  return (
    <div style={{ position: 'absolute', left: x - STAND.w / 2, top: y - STAND.h, width: STAND.w, height: STAND.h, transformStyle: 'preserve-3d' }}>
      {/* floor shadow */}
      <div style={{ position: 'absolute', left: -60, right: -60, bottom: -70, height: 90, borderRadius: '50%', background: 'radial-gradient(closest-side, rgba(0,0,0,.38), rgba(0,0,0,0))' }} />
      <div style={{ position: 'absolute', inset: 0, transformOrigin: '50% 100%', transform: `rotateY(${angle}deg) scale(${2 - squash}, ${squash})` }}>
        {/* acrylic block */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: 34,
            background: 'linear-gradient(140deg, rgba(255,255,255,.75), rgba(255,255,255,.28) 42%, rgba(255,255,255,.55))',
            border: '1.5px solid rgba(255,255,255,.9)',
            boxShadow: '0 50px 90px -30px rgba(0,0,0,.55), inset 0 2px 0 rgba(255,255,255,.95)',
          }}
        />
        <div style={{ position: 'absolute', inset: STAND.inset, borderRadius: 22, boxShadow: '0 0 0 1px rgba(0,0,0,.06)' }}>
          <Face ch={showNext ? next : ch} pulse={showNext ? 0 : pulse} />
        </div>
        {/* glass sheen */}
        <div style={{ position: 'absolute', inset: 0, borderRadius: 34, background: 'linear-gradient(115deg, rgba(255,255,255,.55) 0%, rgba(255,255,255,0) 26%, rgba(255,255,255,0) 72%, rgba(255,255,255,.22) 100%)' }} />
        {/* base */}
        <div
          style={{
            position: 'absolute',
            left: -14,
            right: -14,
            bottom: -26,
            height: 34,
            borderRadius: 12,
            background: 'linear-gradient(180deg, rgba(255,255,255,.95), rgba(255,255,255,.55))',
            border: '1.5px solid rgba(255,255,255,.9)',
            boxShadow: '0 16px 30px -12px rgba(0,0,0,.45)',
          }}
        />
      </div>
    </div>
  )
}

// Centre of the NFC zone in stage coordinates for a stand whose base centre is (x, y).
export const nfcPoint = (x, y) => [x, y - STAND.h + STAND.inset + (STAND.h - STAND.inset * 2) * STAND.nfcY]
