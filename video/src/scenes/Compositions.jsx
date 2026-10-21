import { AbsoluteFill, Easing, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion'
import { Flash, Grain, Shockwave, Streak, Burst, clamp, easeOut, easeIn, shake } from '../fx.jsx'
import { CHANNELS, FONT, BRAND } from '../theme.js'
import { C, CYCLE, PROMO, STORY } from '../timing.js'
import { Backdrop, NFC, TapScene, useStage } from './TapScene.jsx'
import { LogoMark } from '../parts/Brand.jsx'

const N = CHANNELS.length
const NAVY = { bg: 'radial-gradient(120% 90% at 60% 25%, #1d3a78 0%, #0f2347 45%, #070d1f 100%)' }

/** Seamless 12 s loop: Google -> Instagram -> WhatsApp -> Menu -> (Google). Website hero. */
export function HeroLoop() {
  const f = useCurrentFrame()
  const { durationInFrames } = useVideoConfig()
  const stage = useStage()
  const n = Math.floor(f / CYCLE) % N
  const cf = f % CYCLE
  const ch = CHANNELS[n]
  return (
    <AbsoluteFill style={{ overflow: 'hidden', background: '#000' }}>
      <Backdrop prev={CHANNELS[(n + N - 1) % N]} ch={ch} f={cf} T={C} origin={stage.map(NFC)} />
      <TapScene ch={ch} next={CHANNELS[(n + 1) % N]} f={cf} gf={f} period={durationInFrames} T={C} stage={stage} />
      <Grain f={f} opacity={0.05} />
    </AbsoluteFill>
  )
}

/** Tap -> Connect -> Done, scrubbed by scroll on the website ("How it works"). */
export function TapStory() {
  const f = useCurrentFrame()
  const { durationInFrames } = useVideoConfig()
  const stage = useStage()
  const T = { ...STORY, chipIn: null }
  return (
    <AbsoluteFill style={{ overflow: 'hidden', background: '#000' }}>
      <Backdrop prev={NAVY} ch={CHANNELS[0]} f={f} T={T} origin={stage.map(NFC)} />
      <TapScene ch={CHANNELS[0]} f={f} gf={f} period={durationInFrames} T={T} stage={stage} chip={false} />
    </AbsoluteFill>
  )
}

function Headline({ text, f }) {
  const { fps } = useVideoConfig()
  const words = text.split(' ')
  const out = interpolate(f, [CYCLE - 12, CYCLE - 2], [0, 1], { ...clamp, easing: easeIn })
  return (
    <div style={{ position: 'absolute', left: 80, right: 80, top: 290, fontFamily: FONT.display, fontWeight: 700, fontSize: 118, lineHeight: 0.98, letterSpacing: '-0.04em', color: '#fff' }}>
      {words.map((w, i) => {
        const p = spring({ frame: f - 4 - i * 4, fps, config: { damping: 15, stiffness: 140 } })
        return (
          <span key={i} style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'bottom', paddingBottom: 12, marginBottom: -12 }}>
            <span style={{ display: 'inline-block', transform: `translateY(${(1 - p) * 110 + out * -110}%)`, marginRight: '0.24em' }}>{w}</span>
          </span>
        )
      })}
    </div>
  )
}

function EndCard({ f }) {
  const { width, height, fps } = useVideoConfig()
  const t = f - PROMO.end
  const cx = width / 2
  const cy = height * 0.42
  const r = interpolate(t, [0, 14], [0, Math.hypot(width, height)], { ...clamp, easing: Easing.bezier(0.65, 0, 0.25, 1) })
  const hit = PROMO.logo
  const slam = interpolate(spring({ frame: f - hit, fps, config: { damping: 11, stiffness: 210 } }), [0, 1], [1.5, 1])
  const blur = f < hit ? 0 : interpolate(f - hit, [0, 5], [14, 0], clamp)
  const [sx, sy] = shake(f, hit, 14)
  const gather = interpolate(f, [PROMO.end + 4, hit - 4], [0, 1], { ...clamp, easing: easeIn })
  const tag = interpolate(f, [PROMO.tagline, PROMO.tagline + 16], [0, 1], { ...clamp, easing: easeOut })
  const cta = interpolate(f, [PROMO.cta, PROMO.cta + 16], [0, 1], { ...clamp, easing: easeOut })
  const push = interpolate(f, [hit, PROMO.duration], [1, 1.05], clamp)
  const sheen = interpolate(f, [PROMO.duration - 60, PROMO.duration - 30], [-1, 2], clamp)
  return (
    <AbsoluteFill style={{ clipPath: `circle(${r}px at ${cx}px ${cy}px)` }}>
      <AbsoluteFill style={{ background: NAVY.bg }} />
      <AbsoluteFill style={{ background: `radial-gradient(circle at ${cx}px ${cy}px, rgba(61,123,255,${f < hit ? 0.25 : 0.55}) 0%, transparent 55%)` }} />
      <AbsoluteFill style={{ transform: `translate(${sx}px, ${sy}px) scale(${push})`, transformOrigin: `${cx}px ${cy}px` }}>
        {/* the four channel colours collapse into the mark */}
        {f < hit &&
          CHANNELS.map((c, i) => {
            const a = (i / CHANNELS.length) * Math.PI * 2 + gather * 2.4
            const d = (1 - gather) * 300
            return <div key={c.id} style={{ position: 'absolute', left: cx + Math.cos(a) * d - 34, top: cy + Math.sin(a) * d - 34, width: 68, height: 68, borderRadius: 99, background: c.bg, boxShadow: '0 0 40px rgba(255,255,255,.35)', transform: `scale(${0.4 + 0.6 * (1 - gather)})` }} />
          })}
        {f >= hit && (
          <div style={{ position: 'absolute', left: cx - 170, top: cy - 170, width: 340, height: 340, transform: `scale(${slam})`, filter: `blur(${blur}px)` }}>
            <LogoMark size={340} base="#ffffff" accent={BRAND.blue2} />
          </div>
        )}
        <Shockwave f={f} cx={cx} cy={cy} start={hit} max={height * 0.7} width={12} />
        <Streak f={f} start={hit} y={cy} color={BRAND.blue2} />
        <Burst f={f} cx={cx} cy={cy} start={hit} count={90} speed={44} colors={['#fff', BRAND.blue2, '#FBBC05', '#25D366', '#D62976']} />
        <div
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: cy + 240,
            textAlign: 'center',
            fontFamily: FONT.sans,
            fontWeight: 800,
            letterSpacing: '0.12em',
            fontSize: 104,
            color: '#fff',
            opacity: f >= hit ? 1 : 0,
            backgroundImage: `linear-gradient(100deg, #fff 0%, #fff ${sheen * 100 - 10}%, #9cc0ff ${sheen * 100}%, #fff ${sheen * 100 + 10}%, #fff 100%)`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          TAPILLY
        </div>
        <div style={{ position: 'absolute', left: 0, right: 0, top: cy + 380, textAlign: 'center', fontFamily: FONT.display, fontWeight: 600, fontSize: 64, letterSpacing: '-0.02em', color: '#fff', opacity: tag, transform: `translateY(${(1 - tag) * 30}px)` }}>
          One tap. Endless possibilities.
        </div>
        <div style={{ position: 'absolute', left: 0, right: 0, top: cy + 500, display: 'flex', justifyContent: 'center', opacity: cta, transform: `translateY(${(1 - cta) * 30}px)` }}>
          <div style={{ padding: '22px 44px', borderRadius: 999, background: BRAND.blue, color: '#fff', fontFamily: FONT.sans, fontWeight: 700, fontSize: 40 }}>$25 per tag · @tapilly.lb</div>
        </div>
      </AbsoluteFill>
      <Flash f={f} start={hit} peak={0.45} />
    </AbsoluteFill>
  )
}

/** 9:16 reel: four taps on the beat, then the logo lands. */
export function Promo() {
  const f = useCurrentFrame()
  const { durationInFrames } = useVideoConfig()
  const stage = useStage(470, 30)
  const n = Math.min(N - 1, Math.floor(f / CYCLE))
  const cf = f - n * CYCLE
  const ch = CHANNELS[n]
  const last = n === N - 1
  // keep the last phone on screen into the end card instead of exiting
  const T = last ? { ...C, exit: null, flip: null, chipIn: null } : { ...C, chipIn: null }
  return (
    <AbsoluteFill style={{ overflow: 'hidden', background: '#000' }}>
      <Backdrop prev={n === 0 ? NAVY : CHANNELS[n - 1]} ch={ch} f={cf} T={T} origin={stage.map(NFC)} />
      <TapScene ch={ch} next={last ? null : CHANNELS[n + 1]} f={cf} gf={f} period={durationInFrames} T={T} stage={stage} chip={false} />
      {f < PROMO.end && <Headline key={n} text={ch.headline} f={last ? Math.min(cf, CYCLE - 14) : cf} />}
      {f >= PROMO.end && <EndCard f={f} />}
      <Grain f={f} opacity={0.05} />
    </AbsoluteFill>
  )
}
