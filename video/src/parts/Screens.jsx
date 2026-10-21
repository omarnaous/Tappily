// Phone screen contents. `t` = frames since the app opened (negative = not yet).
import { interpolate, spring } from 'remotion'
import { BUSINESS, FONT } from '../theme.js'
import { Check, Glyph, NfcWaves, Star } from './Brand.jsx'
import { PHONE } from './Phone.jsx'
import { siGoogle, siInstagram, siWhatsapp } from 'simple-icons'

const clamp = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
const pop = (t, fps, damping = 12) => (t < 0 ? 0 : spring({ frame: t, fps, config: { damping, stiffness: 220 } }))
const fade = (t, a, b) => interpolate(t, [a, b], [0, 1], clamp)

const Status = ({ color = '#111' }) => (
  <div style={{ position: 'absolute', top: 22, left: 34, right: 30, display: 'flex', justifyContent: 'space-between', fontFamily: FONT.sans, fontWeight: 600, fontSize: 16, color }}>
    <span>9:41</span>
    <span style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
      <span style={{ width: 18, height: 10, borderRadius: 2, background: color, opacity: 0.9 }} />
      <span style={{ width: 24, height: 11, borderRadius: 3, border: `1.5px solid ${color}`, opacity: 0.9 }} />
    </span>
  </div>
)

export function LockScreen({ f }) {
  const breathe = 0.55 + 0.45 * Math.sin((f / 30) * Math.PI)
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(130% 80% at 20% 10%, #3d7bff 0%, rgba(61,123,255,0) 55%), radial-gradient(120% 80% at 90% 100%, #7c4dff 0%, rgba(124,77,255,0) 60%), #0a1024',
        color: '#fff',
        textAlign: 'center',
        fontFamily: FONT.sans,
      }}
    >
      <Status color="#fff" />
      <div style={{ marginTop: 110, fontSize: 18, opacity: 0.8 }}>Tuesday 21 October</div>
      <div style={{ fontFamily: FONT.display, fontWeight: 600, fontSize: 104, letterSpacing: '-0.04em', lineHeight: 1 }}>9:41</div>
      <div style={{ position: 'absolute', bottom: 120, left: 0, right: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
        <div style={{ width: 86, height: 86, borderRadius: 99, display: 'grid', placeItems: 'center', background: 'rgba(255,255,255,.12)', border: '1px solid rgba(255,255,255,.25)', opacity: breathe }}>
          <NfcWaves size={42} color="#fff" />
        </div>
        <div style={{ fontSize: 16, opacity: 0.85 }}>Hold near a Tapilly tag</div>
      </div>
    </div>
  )
}

function GoogleScreen({ t, fps }) {
  const text = 'Amazing food and super friendly staff!'
  const chars = Math.floor(interpolate(t, [16, 30], [0, text.length], clamp))
  const done = pop(t - 32, fps, 11)
  return (
    <div style={{ position: 'absolute', inset: 0, background: '#fff', fontFamily: FONT.sans, color: '#1f1f1f', padding: '72px 26px 0' }}>
      <Status />
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 17, color: '#5f6368' }}>
        <Glyph d={siGoogle.path} size={24} color="#4285F4" /> Google
      </div>
      <div style={{ marginTop: 26, fontFamily: FONT.display, fontWeight: 700, fontSize: 34, letterSpacing: '-0.02em' }}>{BUSINESS}</div>
      <div style={{ fontSize: 15, color: '#5f6368', marginTop: 4 }}>Restaurant · Beirut</div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 28, fontSize: 15, color: '#3c4043' }}>
        <div style={{ width: 40, height: 40, borderRadius: 99, background: 'linear-gradient(135deg,#0855d6,#7c4dff)' }} />
        Posting publicly
      </div>
      <div style={{ display: 'flex', gap: 10, marginTop: 26 }}>
        {[0, 1, 2, 3, 4].map((i) => {
          const s = pop(t - 2 - i * 3, fps, 9)
          return (
            <div key={i} style={{ transform: `scale(${0.7 + 0.3 * s})`, position: 'relative' }}>
              <Star size={50} fill="#e3e5e8" />
              <div style={{ position: 'absolute', inset: 0, opacity: Math.min(1, s * 1.4) }}>
                <Star size={50} fill="#FBBC05" />
              </div>
            </div>
          )
        })}
      </div>
      <div style={{ marginTop: 26, height: 128, borderRadius: 16, border: `2px solid ${t > 14 && t < 31 ? '#1a73e8' : '#dadce0'}`, padding: 16, fontSize: 17, lineHeight: 1.4, color: '#202124' }}>
        {text.slice(0, chars)}
        {t > 14 && t < 31 && <span style={{ color: '#1a73e8' }}>|</span>}
      </div>
      <div style={{ marginTop: 20, height: 54, borderRadius: 27, background: '#1a73e8', color: '#fff', display: 'grid', placeItems: 'center', fontWeight: 600, fontSize: 18, transform: `scale(${t >= 29 && t < 33 ? 0.95 : 1})` }}>
        Post
      </div>
      <Toast p={done} text="Review posted — thank you!" color="#188038" />
    </div>
  )
}

function Toast({ p, text, color }) {
  return (
    <div
      style={{
        position: 'absolute',
        left: 18,
        right: 18,
        bottom: 34,
        height: 70,
        borderRadius: 20,
        background: '#0f2347',
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        gap: 14,
        padding: '0 18px',
        fontFamily: FONT.sans,
        fontWeight: 600,
        fontSize: 16,
        opacity: Math.min(1, p),
        transform: `translateY(${(1 - p) * 40}px)`,
        boxShadow: '0 20px 40px -12px rgba(0,0,0,.45)',
      }}
    >
      <div style={{ width: 34, height: 34, borderRadius: 99, background: color, display: 'grid', placeItems: 'center' }}>
        <Check size={20} />
      </div>
      {text}
    </div>
  )
}

function InstagramScreen({ t, fps }) {
  const tapped = t >= 14
  const press = pop(t - 14, fps, 10)
  const heart = t < 18 ? 0 : interpolate(t - 18, [0, 6, 22], [0, 1.25, 0], clamp)
  const followers = 12480 + (tapped ? 1 : 0)
  return (
    <div style={{ position: 'absolute', inset: 0, background: '#fff', fontFamily: FONT.sans, color: '#111' }}>
      <Status />
      <div style={{ padding: '68px 22px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontWeight: 700, fontSize: 20 }}>thedailybites</span>
        <Glyph d={siInstagram.path} size={24} color="#111" />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 22, padding: '22px 22px 0' }}>
        <div style={{ width: 96, height: 96, borderRadius: 99, padding: 4, background: 'linear-gradient(45deg,#feda75,#fa7e1e,#d62976,#962fbf,#4f5bd5)' }}>
          <div style={{ width: '100%', height: '100%', borderRadius: 99, border: '4px solid #fff', background: 'linear-gradient(135deg,#f4a261,#e76f51)' }} />
        </div>
        <div style={{ display: 'flex', gap: 18, textAlign: 'center', fontSize: 13, color: '#444' }}>
          {[
            ['248', 'posts'],
            [followers.toLocaleString('en-US'), 'followers'],
            ['311', 'following'],
          ].map(([n, l]) => (
            <div key={l}>
              <div style={{ fontWeight: 700, fontSize: 18, color: '#111' }}>{n}</div>
              {l}
            </div>
          ))}
        </div>
      </div>
      <div style={{ padding: '14px 22px 0', fontSize: 15, lineHeight: 1.4 }}>
        <b>{BUSINESS}</b>
        <div style={{ color: '#555' }}>Burgers · Bowls · Coffee — Beirut</div>
      </div>
      <div style={{ display: 'flex', gap: 8, padding: '16px 22px 0' }}>
        <div
          style={{
            flex: 1,
            height: 44,
            borderRadius: 12,
            display: 'grid',
            placeItems: 'center',
            fontWeight: 600,
            fontSize: 16,
            background: tapped ? '#efefef' : '#0095f6',
            color: tapped ? '#111' : '#fff',
            transform: `scale(${tapped ? 0.92 + 0.08 * press : t >= 11 ? 0.95 : 1})`,
          }}
        >
          {tapped ? 'Following' : 'Follow'}
        </div>
        <div style={{ flex: 1, height: 44, borderRadius: 12, background: '#efefef', display: 'grid', placeItems: 'center', fontWeight: 600, fontSize: 16 }}>Message</div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 3, marginTop: 22 }}>
        {['#f4a261', '#e9c46a', '#2a9d8f', '#e76f51', '#264653', '#f6bd60', '#84a59d', '#f28482', '#d4a373'].map((c, i) => (
          <div key={i} style={{ aspectRatio: '1', background: `linear-gradient(${i * 40}deg, ${c}, ${c}aa)`, opacity: fade(t, i * 1.5, i * 1.5 + 6) }} />
        ))}
      </div>
      <div style={{ position: 'absolute', left: '50%', top: '58%', transform: `translate(-50%,-50%) scale(${heart})`, opacity: Math.min(1, heart) }}>
        <svg width="130" height="130" viewBox="0 0 24 24">
          <path d="M12 21s-7.5-4.6-9.6-9.2C.9 8.4 3.1 4.5 6.9 4.5c2.1 0 3.6 1.1 5.1 3 1.5-1.9 3-3 5.1-3 3.8 0 6 3.9 4.5 7.3C19.5 16.4 12 21 12 21z" fill="#ff3040" />
        </svg>
      </div>
    </div>
  )
}

function WhatsAppScreen({ t, fps }) {
  const msg = 'Hi! Can I book a table for 4 tonight?'
  const typed = Math.floor(interpolate(t, [2, 14], [0, msg.length], clamp))
  const sent = pop(t - 16, fps, 12)
  const reply = pop(t - 28, fps, 12)
  return (
    <div style={{ position: 'absolute', inset: 0, background: '#efe7de', fontFamily: FONT.sans }}>
      <div style={{ background: '#075e54', color: '#fff', height: 124, padding: '62px 18px 0', display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0 }}>
          <Status color="#fff" />
        </div>
        <div style={{ width: 42, height: 42, borderRadius: 99, background: 'linear-gradient(135deg,#f4a261,#e76f51)' }} />
        <div>
          <div style={{ fontWeight: 700, fontSize: 17 }}>{BUSINESS}</div>
          <div style={{ fontSize: 13, opacity: 0.8 }}>online</div>
        </div>
      </div>
      <div style={{ padding: '20px 14px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div style={{ alignSelf: 'center', fontSize: 12, background: '#fff8', padding: '4px 10px', borderRadius: 8, color: '#555' }}>TODAY</div>
        {sent > 0 && (
          <div
            style={{
              alignSelf: 'flex-end',
              maxWidth: '78%',
              background: '#d9fdd3',
              borderRadius: '14px 4px 14px 14px',
              padding: '10px 12px',
              fontSize: 16,
              color: '#111',
              transform: `scale(${0.6 + 0.4 * sent})`,
              transformOrigin: '100% 0',
              opacity: Math.min(1, sent * 2),
              boxShadow: '0 1px 1px rgba(0,0,0,.1)',
            }}
          >
            {msg}
            <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 2, fontSize: 11, color: '#8a8a8a', marginTop: 4 }}>
              20:14 <Check size={13} color={t > 24 ? '#34b7f1' : '#8a8a8a'} />
              <span style={{ marginLeft: -9 }}>
                <Check size={13} color={t > 24 ? '#34b7f1' : '#8a8a8a'} />
              </span>
            </div>
          </div>
        )}
        {reply > 0 && (
          <div
            style={{
              alignSelf: 'flex-start',
              maxWidth: '78%',
              background: '#fff',
              borderRadius: '4px 14px 14px 14px',
              padding: '10px 12px',
              fontSize: 16,
              color: '#111',
              transform: `scale(${0.6 + 0.4 * reply})`,
              transformOrigin: '0 0',
              opacity: Math.min(1, reply * 2),
              boxShadow: '0 1px 1px rgba(0,0,0,.1)',
            }}
          >
            Of course! Table for 4 at 8pm is booked. See you tonight!
            <div style={{ textAlign: 'right', fontSize: 11, color: '#8a8a8a', marginTop: 4 }}>20:14</div>
          </div>
        )}
      </div>
      <div style={{ position: 'absolute', left: 10, right: 10, bottom: 26, display: 'flex', gap: 8, alignItems: 'center' }}>
        <div style={{ flex: 1, minHeight: 50, borderRadius: 25, background: '#fff', padding: '14px 18px', fontSize: 16, color: typed && sent === 0 ? '#111' : '#999' }}>{sent > 0 ? 'Message' : typed ? msg.slice(0, typed) : 'Message'}</div>
        <div style={{ width: 50, height: 50, borderRadius: 99, background: '#00a884', display: 'grid', placeItems: 'center', transform: `scale(${t >= 14 && t < 18 ? 0.88 : 1})` }}>
          <Glyph d={siWhatsapp.path} size={24} color="#fff" />
        </div>
      </div>
    </div>
  )
}

function MenuScreen({ t, fps }) {
  const items = [
    ['Truffle Burger', 'Brioche, aged cheddar, truffle mayo', '$14', '#c8793a'],
    ['Halloumi Bowl', 'Grilled halloumi, quinoa, pomegranate', '$11', '#7aa95c'],
    ['Mezze Platter', 'Hummus, moutabal, warm pita', '$12', '#d9a441'],
    ['Iced Spanish Latte', 'Double shot, condensed milk', '$5', '#8a5a3c'],
  ]
  const added = pop(t - 28, fps, 11)
  return (
    <div style={{ position: 'absolute', inset: 0, background: '#15110c', color: '#f5ead2', fontFamily: FONT.sans, padding: '70px 20px 0' }}>
      <Status color="#f5ead2" />
      <div style={{ fontSize: 14, letterSpacing: '0.2em', color: '#E9C46A' }}>{BUSINESS.toUpperCase()}</div>
      <div style={{ fontFamily: FONT.display, fontWeight: 700, fontSize: 44, letterSpacing: '-0.02em', marginTop: 6 }}>Menu</div>
      <div style={{ display: 'flex', gap: 8, marginTop: 14 }}>
        {['Mains', 'Bowls', 'Drinks'].map((c, i) => (
          <div key={c} style={{ padding: '7px 14px', borderRadius: 99, fontSize: 14, fontWeight: 600, background: i === 0 ? '#E9C46A' : 'rgba(255,255,255,.08)', color: i === 0 ? '#15110c' : '#f5ead2' }}>
            {c}
          </div>
        ))}
      </div>
      <div style={{ marginTop: 18, display: 'flex', flexDirection: 'column', gap: 12 }}>
        {items.map(([n, d, p, c], i) => {
          const s = pop(t - i * 4, fps, 16)
          const hl = i === 0 && t >= 24
          return (
            <div
              key={n}
              style={{
                display: 'flex',
                gap: 12,
                alignItems: 'center',
                padding: 10,
                borderRadius: 16,
                background: hl ? 'rgba(233,196,106,.16)' : 'rgba(255,255,255,.05)',
                border: `1px solid ${hl ? '#E9C46A' : 'rgba(255,255,255,.06)'}`,
                opacity: Math.min(1, s * 1.5),
                transform: `translateX(${(1 - s) * 60}px)`,
              }}
            >
              <div style={{ width: 58, height: 58, borderRadius: 14, background: `radial-gradient(circle at 35% 30%, ${c}, ${c}66)` }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: 16 }}>{n}</div>
                <div style={{ fontSize: 12, opacity: 0.6, marginTop: 2 }}>{d}</div>
              </div>
              <div style={{ fontWeight: 700, color: '#E9C46A' }}>{p}</div>
            </div>
          )
        })}
      </div>
      <div
        style={{
          position: 'absolute',
          left: 20,
          right: 20,
          bottom: 34,
          height: 58,
          borderRadius: 29,
          background: added > 0 ? '#2a9d8f' : '#E9C46A',
          color: added > 0 ? '#fff' : '#15110c',
          display: 'grid',
          placeItems: 'center',
          fontWeight: 700,
          fontSize: 17,
          transform: `scale(${added > 0 ? 0.94 + 0.06 * added : 1})`,
        }}
      >
        {added > 0 ? 'Added to order' : 'Add Truffle Burger · $14'}
      </div>
    </div>
  )
}

const APPS = { google: GoogleScreen, instagram: InstagramScreen, whatsapp: WhatsAppScreen, menu: MenuScreen }

/** Lock screen that wipes up into the channel's app at `open` (0..1). */
export function Screen({ ch, f, t, open, fps }) {
  const App = APPS[ch.id]
  return (
    <div style={{ position: 'absolute', inset: 0, width: PHONE.sw, height: PHONE.sh }}>
      <LockScreen f={f} />
      {open > 0 && (
        <div style={{ position: 'absolute', inset: 0, clipPath: `inset(${(1 - open) * 100}% 0 0 0 round 0)`, transform: `translateY(${(1 - open) * 40}px)` }}>
          <App t={t} fps={fps} />
        </div>
      )}
      {/* white flash on contact */}
      <div style={{ position: 'absolute', inset: 0, background: '#fff', opacity: open > 0 && open < 1 ? 0.5 * (1 - open) : 0 }} />
    </div>
  )
}
