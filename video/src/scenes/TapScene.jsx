// One tap: phone glides in, taps the stand, the channel opens and floods the frame with its colour.
import { AbsoluteFill, Easing, interpolate, random, spring, useVideoConfig } from 'remotion'
import { Burst, Shockwave, clamp, easeOut, easeIn, wave, after } from '../fx.jsx'
import { FONT, STAGE } from '../theme.js'
import { Glyph } from '../parts/Brand.jsx'
import { Phone } from '../parts/Phone.jsx'
import { Screen } from '../parts/Screens.jsx'
import { Stand, nfcPoint } from '../parts/Stand.jsx'

const STAND_BASE = [410, 1165]
export const NFC = nfcPoint(...STAND_BASE)

// Phone poses in stage coordinates
const POSE = {
  out: { x: 1580, y: 520, r: 26, rx: 0, ry: -18, s: 1 },
  hover: { x: 770, y: 600, r: 12, rx: 0, ry: -14, s: 1 },
  lift: { x: 790, y: 560, r: 15, rx: 0, ry: -14, s: 1 },
  tap: { x: NFC[0] + 120, y: NFC[1] + 178, r: -34, rx: 18, ry: 0, s: 0.86 },
  show: { x: 742, y: 655, r: 4, rx: 0, ry: -10, s: 1 },
}
const mix = (a, b, k) => Object.fromEntries(Object.keys(a).map((key) => [key, a[key] + (b[key] - a[key]) * k]))
const swoopEase = Easing.bezier(0.55, 0, 0.85, 0.25)

function phonePose(f, T, fps) {
  if (f < T.enter[1]) return mix(POSE.out, POSE.hover, interpolate(f, T.enter, [0, 1], { ...clamp, easing: easeOut }))
  if (T.lift && f < T.lift[1]) return mix(POSE.hover, POSE.lift, interpolate(f, T.lift, [0, 1], { ...clamp, easing: easeOut }))
  const from = T.lift ? POSE.lift : POSE.hover
  if (f < T.tap) return mix(from, POSE.tap, interpolate(f, T.swoop, [0, 1], { ...clamp, easing: swoopEase }))
  if (f < T.rise[0]) {
    const press = 1 - 0.03 * Math.sin(((f - T.tap) / Math.max(1, T.rise[0] - T.tap)) * Math.PI)
    return { ...POSE.tap, s: POSE.tap.s * press }
  }
  const up = spring({ frame: f - T.rise[0], fps, config: { damping: 15, stiffness: 120, mass: 0.9 }, durationInFrames: T.rise[1] - T.rise[0] })
  const shown = mix(POSE.tap, POSE.show, up)
  if (!T.exit || f < T.exit[0]) return shown
  return mix(shown, POSE.out, interpolate(f, T.exit, [0, 1], { ...clamp, easing: easeIn }))
}

/** Full-frame background: previous channel colour, flooded by the current one from the tap point. */
export function Backdrop({ prev, ch, f, T, origin }) {
  const { width, height } = useVideoConfig()
  const maxR = Math.hypot(Math.max(origin[0], width - origin[0]), Math.max(origin[1], height - origin[1]))
  const r = f < T.tap ? 0 : interpolate(f - T.tap, [0, 26], [0, maxR * 1.05], { ...clamp, easing: Easing.bezier(0.65, 0, 0.25, 1) })
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ background: prev.bg }} />
      {r > 0 && <AbsoluteFill style={{ background: ch.bg, clipPath: `circle(${r}px at ${origin[0]}px ${origin[1]}px)` }} />}
      <AbsoluteFill style={{ background: 'radial-gradient(ellipse at 50% 40%, transparent 50%, rgba(0,0,0,.28) 100%)' }} />
    </AbsoluteFill>
  )
}

/** Fits the 1080x1350 stage into the frame. `top` reserves space above it (e.g. for a headline). */
export function useStage(top = 0, bottom = 0) {
  const { width, height } = useVideoConfig()
  const s = Math.min(width / STAGE.w, (height - top - bottom) / STAGE.h)
  const ox = (width - STAGE.w * s) / 2
  const oy = top + (height - top - bottom - STAGE.h * s) / 2
  return { s, ox, oy, map: ([x, y]) => [ox + x * s, oy + y * s] }
}

function Chip({ ch, f, T, fps }) {
  if (T.chipIn == null) return null
  const inn = spring({ frame: f - T.chipIn, fps, config: { damping: 14, stiffness: 160 } })
  const out = T.chipOut == null ? 0 : interpolate(f, [T.chipOut, T.chipOut + 8], [0, 1], { ...clamp, easing: easeIn })
  const p = f < T.chipIn ? 0 : inn * (1 - out)
  return (
    <div
      style={{
        position: 'absolute',
        left: 64,
        top: 84,
        display: 'flex',
        alignItems: 'center',
        gap: 16,
        padding: '14px 26px 14px 14px',
        borderRadius: 999,
        background: 'rgba(10,14,30,.22)',
        border: '1.5px solid rgba(255,255,255,.4)',
        color: '#fff',
        fontFamily: FONT.sans,
        opacity: Math.min(1, p * 1.2),
        transform: `translateY(${(1 - p) * -30}px) scale(${0.9 + 0.1 * p})`,
        transformOrigin: '0 50%',
        boxShadow: '0 20px 50px -20px rgba(0,0,0,.4)',
      }}
    >
      <div style={{ width: 56, height: 56, borderRadius: 99, background: ch.face.badge, display: 'grid', placeItems: 'center', boxShadow: ch.face.badge === '#ffffff' ? 'inset 0 0 0 2px #e6e8ee' : 'none' }}>
        <Glyph d={ch.icon} size={30} color={ch.face.glyph} />
      </div>
      <div>
        <div style={{ fontWeight: 700, fontSize: 28, letterSpacing: '-0.01em' }}>{ch.label}</div>
        <div style={{ fontSize: 19, opacity: 0.85, marginTop: 2 }}>{ch.action}</div>
      </div>
    </div>
  )
}

function Motes({ gf, period }) {
  const dots = []
  for (let i = 0; i < 26; i++) {
    const k = (random(`m${i}`) + gf / period) % 1
    const x = random(`mx${i}`) * STAGE.w + Math.sin(k * Math.PI * 2 + i) * 30
    const y = STAGE.h * (1.05 - k * 1.1)
    const size = 3 + random(`ms${i}`) * 5
    dots.push(<div key={i} style={{ position: 'absolute', left: x, top: y, width: size, height: size, borderRadius: 99, background: '#fff', opacity: Math.sin(k * Math.PI) * 0.45 }} />)
  }
  return <>{dots}</>
}

/**
 * f: frame within this tap. gf/period: global frame and loop period (for periodic drift).
 * T: timing (see timing.js). next: channel the stand flips to (omit for no flip).
 */
export function TapScene({ ch, next, f, gf, period, T, stage, chip = true }) {
  const { fps } = useVideoConfig()
  const pose = phonePose(f, T, fps)
  const flip = next && T.flip ? interpolate(f, T.flip, [0, 1], { ...clamp, easing: Easing.inOut(Easing.cubic) }) : 0
  const squash = f < T.tap ? 1 : 1 - 0.035 * Math.exp(-(f - T.tap) / 3.5)
  const pulse = after(f, T.tap, [0, 3, 26], [0, 1, 0])
  const open = interpolate(f, T.open, [0, 1], { ...clamp, easing: easeOut })
  const near = interpolate(f, [T.swoop[0], T.tap], [0, 1], clamp) * (f < T.rise[0] ? 1 : interpolate(f, [T.rise[0], T.rise[0] + 8], [1, 0], clamp))
  const glow = after(f, T.tap, [0, 2, 30], [0, 1, 0])
  const driftY = 3 * wave(gf, period)
  const driftX = 1.5 * wave(gf, period, 1, Math.PI / 2)
  const cam = `rotateY(${driftY}deg) rotateX(${driftX}deg)`
  const cam2d = `translateX(${driftY * -4}px)`

  return (
    <div style={{ position: 'absolute', left: stage.ox, top: stage.oy, width: STAGE.w, height: STAGE.h, transform: `scale(${stage.s})`, transformOrigin: '0 0' }}>
      <Motes gf={gf} period={period} />
      {/* Stand and phone are separate flattened layers, so the phone always paints over the stand
          instead of slicing through it in 3D. Both share the same camera drift. */}
      <div style={{ position: 'absolute', inset: 0, perspective: 2200 }}>
        <div style={{ position: 'absolute', inset: 0, transformStyle: 'preserve-3d', transform: cam }}>
          {/* light behind the tag */}
          <div style={{ position: 'absolute', left: NFC[0] - 420, top: NFC[1] - 420, width: 840, height: 840, borderRadius: 999, background: `radial-gradient(circle, rgba(255,255,255,${0.16 + 0.5 * glow}) 0%, rgba(255,255,255,0) 62%)` }} />
          <Stand ch={ch} next={next || ch} flip={flip} squash={squash} pulse={pulse} x={STAND_BASE[0]} y={STAND_BASE[1]} />
        </div>
      </div>
      <div style={{ position: 'absolute', inset: 0, transform: cam2d }}>
        {/* contact shadow while the phone is on the tag */}
        <div style={{ position: 'absolute', left: NFC[0] - 150, top: NFC[1] - 70, width: 300, height: 200, borderRadius: '50%', background: 'radial-gradient(closest-side, rgba(0,0,0,.45), rgba(0,0,0,0))', opacity: near * 0.8, transform: `scale(${1.6 - near * 0.6})` }} />
        <Shockwave f={f} cx={NFC[0]} cy={NFC[1]} start={T.tap} max={520} width={10} dur={30} />
        <Shockwave f={f} cx={NFC[0]} cy={NFC[1]} start={T.tap + 5} max={720} width={6} dur={34} />
        <Shockwave f={f} cx={NFC[0]} cy={NFC[1]} start={T.tap + 10} max={900} width={4} dur={38} />
        <Burst f={f} cx={NFC[0]} cy={NFC[1]} start={T.tap} count={46} speed={30} seed={`b${ch.id}`} colors={ch.accent} scale={1.4} gravity={0.02} />
      </div>
      <div style={{ position: 'absolute', inset: 0, perspective: 2200 }}>
        <div style={{ position: 'absolute', inset: 0, transformStyle: 'preserve-3d', transform: cam }}>
          <Phone x={pose.x} y={pose.y} scale={pose.s} rotate={pose.r} rx={pose.rx} ry={pose.ry} shadow={0.6 + 0.4 * (1 - near)}>
            <Screen ch={ch} f={f} t={f - T.app} open={open} fps={fps} />
          </Phone>
        </div>
      </div>
      {chip && <Chip ch={ch} f={f} T={T} fps={fps} />}
    </div>
  )
}
