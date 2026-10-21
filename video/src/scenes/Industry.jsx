// Still scenes for the website's "Every place people tap" cards: a styled set per business type
// with the matching Tapilly stand and the phone showing what the tap opened.
import React from 'react' // module-level JSX in SETS needs React in scope for Remotion's bundler
import { AbsoluteFill, useCurrentFrame } from 'remotion'
import { Grain } from '../fx.jsx'
import { CHANNELS } from '../theme.js'
import { C } from '../timing.js'
import { TapScene, useStage } from './TapScene.jsx'

const ch = (id) => CHANNELS.find((c) => c.id === id)

const R = ({ key, ...style }) => <div key={key} style={{ position: 'absolute', ...style }} />

const SETS = {
  restaurant: {
    channel: 'menu',
    frame: 80,
    wall: 'radial-gradient(90% 70% at 70% 20%, #f7b07a 0%, #e0703a 55%, #a8431c 100%)',
    surface: 'linear-gradient(180deg, #8a5a3a 0%, #6d4329 40%, #4e2d1a 100%)',
    edge: '#b07a52',
    props: (
      <>
        {/* pendant lamp glow */}
        {R({ left: 700, top: -40, width: 520, height: 520, borderRadius: 999, background: 'radial-gradient(circle, rgba(255,226,170,.55), transparent 65%)' })}
        {/* plate */}
        {R({ left: 640, top: 1150, width: 420, height: 130, borderRadius: '50%', background: 'radial-gradient(ellipse at 50% 40%, #ffffff 0%, #f1ece6 60%, #d8d0c6 100%)', boxShadow: '0 30px 40px -20px rgba(0,0,0,.5)' })}
        {R({ left: 720, top: 1172, width: 260, height: 78, borderRadius: '50%', background: 'radial-gradient(ellipse at 45% 40%, #e9a25b 0%, #b8642c 70%)' })}
        {R({ left: 780, top: 1180, width: 90, height: 40, borderRadius: '50%', background: '#6f9a3c' })}
        {/* cup */}
        {R({ left: 20, top: 1185, width: 210, height: 64, borderRadius: '50%', background: '#f4efe8', boxShadow: '0 20px 30px -14px rgba(0,0,0,.5)' })}
        {R({ left: 62, top: 1090, width: 126, height: 128, borderRadius: '10px 10px 60px 60px', background: 'linear-gradient(90deg, #ffffff, #e8e2da)' })}
        {R({ left: 72, top: 1084, width: 106, height: 26, borderRadius: '50%', background: 'radial-gradient(ellipse, #6b3d1f, #3d200e)' })}
        {R({ left: 178, top: 1112, width: 46, height: 60, borderRadius: '0 40px 40px 0', border: '12px solid #ece6de', borderLeft: 'none' })}
      </>
    ),
  },
  retail: {
    channel: 'instagram',
    frame: 64,
    wall: 'radial-gradient(90% 70% at 30% 20%, #d9f2a3 0%, #9fd06a 55%, #5f9a3a 100%)',
    surface: 'linear-gradient(180deg, #fbfaf7 0%, #ece9e2 45%, #d6d1c6 100%)',
    edge: '#ffffff',
    props: (
      <>
        {/* hanging shelf */}
        {R({ left: 640, top: 150, width: 420, height: 18, borderRadius: 9, background: '#ffffffcc', boxShadow: '0 16px 30px -12px rgba(0,0,0,.3)' })}
        {['#ff7a59', '#2d6cdf', '#ffd166'].map((c, i) => R({ key: c, left: 670 + i * 130, top: 40 + (i % 2) * 20, width: 96, height: 110 - (i % 2) * 20, borderRadius: 14, background: c }))}
        {/* shopping bags */}
        {R({ left: 760, top: 1010, width: 220, height: 250, borderRadius: 16, background: 'linear-gradient(135deg, #111 0%, #2a2a2a 100%)', boxShadow: '0 30px 50px -20px rgba(0,0,0,.55)' })}
        {R({ left: 815, top: 950, width: 110, height: 100, borderRadius: '60px 60px 0 0', border: '10px solid #111', borderBottom: 'none' })}
        {R({ left: 900, top: 1080, width: 160, height: 190, borderRadius: 16, background: 'linear-gradient(135deg, #ff7a59, #e24e2e)', boxShadow: '0 30px 50px -20px rgba(0,0,0,.5)' })}
        {R({ left: 940, top: 1030, width: 80, height: 70, borderRadius: '50px 50px 0 0', border: '9px solid #e24e2e', borderBottom: 'none' })}
      </>
    ),
  },
  salon: {
    channel: 'whatsapp',
    frame: 80,
    wall: 'radial-gradient(90% 70% at 70% 15%, #ffd6e4 0%, #f5a3bf 55%, #d9668f 100%)',
    surface: 'linear-gradient(180deg, #ffffff 0%, #f3ecef 50%, #e2d4da 100%)',
    edge: '#ffffff',
    props: (
      <>
        {/* round mirror */}
        {R({ left: 660, top: 70, width: 400, height: 400, borderRadius: 999, background: 'radial-gradient(circle at 35% 30%, #ffffff 0%, #f6e7ee 45%, #dcbccb 100%)', border: '14px solid #e8c48a', boxShadow: '0 30px 60px -20px rgba(0,0,0,.35)' })}
        {/* bottles */}
        {[
          [30, 1040, 70, 220, '#ffffff'],
          [110, 1090, 60, 170, '#f7c6d6'],
          [180, 1110, 56, 150, '#e8c48a'],
        ].map(([l, t, w, h, c], i) => (
          <div key={i} style={{ position: 'absolute', left: l, top: t, width: w, height: h, borderRadius: '18px 18px 12px 12px', background: `linear-gradient(90deg, ${c}, ${c}cc)`, boxShadow: '0 20px 30px -14px rgba(0,0,0,.35)' }}>
            <div style={{ position: 'absolute', left: w * 0.3, top: -26, width: w * 0.4, height: 30, borderRadius: 6, background: '#2b2b2b' }} />
          </div>
        ))}
        {/* folded towel */}
        {R({ left: 820, top: 1200, width: 240, height: 70, borderRadius: 16, background: 'linear-gradient(180deg,#ffffff,#efe6ea)', boxShadow: '0 16px 26px -12px rgba(0,0,0,.3)' })}
      </>
    ),
  },
  hotel: {
    channel: 'google',
    frame: 82,
    wall: 'radial-gradient(90% 70% at 70% 15%, #4fd1c5 0%, #138a86 50%, #0a4b52 100%)',
    surface: 'linear-gradient(180deg, #2b2b2e 0%, #1c1c1f 50%, #111113 100%)',
    edge: '#55555c',
    props: (
      <>
        {/* wall sconces */}
        {[120, 900].map((l) => R({ key: l, left: l, top: 120, width: 70, height: 140, borderRadius: 40, background: 'linear-gradient(180deg,#fff6d8,#e8c48a)', boxShadow: '0 0 120px 40px rgba(255,220,150,.35)' }))}
        {/* service bell */}
        {R({ left: 830, top: 1150, width: 220, height: 34, borderRadius: 10, background: 'linear-gradient(180deg,#d9d9de,#9a9aa2)' })}
        {R({ left: 850, top: 1050, width: 180, height: 110, borderRadius: '100px 100px 6px 6px', background: 'radial-gradient(circle at 35% 30%, #ffffff 0%, #e6c77a 25%, #b8892e 80%)', boxShadow: '0 20px 30px -14px rgba(0,0,0,.6)' })}
        {R({ left: 928, top: 1030, width: 24, height: 26, borderRadius: 6, background: '#b8892e' })}
        {/* key card */}
        {R({ left: 40, top: 1200, width: 230, height: 140, borderRadius: 14, background: 'linear-gradient(135deg,#0f2347,#3d7bff)', transform: 'rotate(-8deg) skewX(-10deg)', boxShadow: '0 20px 30px -14px rgba(0,0,0,.6)' })}
      </>
    ),
  },
}

export function IndustryStill({ id }) {
  const set = SETS[id]
  const f = useCurrentFrame()
  const stage = useStage()
  const T = { ...C, exit: null, flip: null, chipIn: null }
  return (
    <AbsoluteFill style={{ overflow: 'hidden', background: set.wall }}>
      <div style={{ position: 'absolute', left: stage.ox, top: stage.oy, width: 1080, height: 1350, transform: `scale(${stage.s})`, transformOrigin: '0 0' }}>
        {/* tabletop / counter */}
        <div style={{ position: 'absolute', left: -40, right: -40, top: 1100, bottom: -40, background: set.surface }} />
        <div style={{ position: 'absolute', left: -40, right: -40, top: 1100, height: 4, background: set.edge, opacity: 0.8 }} />
        <div style={{ position: 'absolute', left: -40, right: -40, top: 1104, height: 120, background: 'linear-gradient(180deg, rgba(0,0,0,.22), transparent)' }} />
        {set.props}
      </div>
      <TapScene ch={ch(set.channel)} f={set.frame} gf={f} period={90} T={T} stage={stage} chip={false} />
      <AbsoluteFill style={{ background: 'radial-gradient(ellipse at 50% 40%, transparent 55%, rgba(0,0,0,.25) 100%)' }} />
      <Grain f={0} opacity={0.04} />
    </AbsoluteFill>
  )
}
