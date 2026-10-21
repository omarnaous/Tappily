// Phone body + screen. Children render inside the screen (PHONE.sw x PHONE.sh).
export const PHONE = { w: 380, h: 800, bezel: 12, r: 62 }
PHONE.sw = PHONE.w - PHONE.bezel * 2
PHONE.sh = PHONE.h - PHONE.bezel * 2

export function Phone({ x, y, scale = 1, rotate = 0, rx = 0, ry = 0, opacity = 1, children, shadow = 1 }) {
  return (
    <div
      style={{
        position: 'absolute',
        left: x - PHONE.w / 2,
        top: y - PHONE.h / 2,
        width: PHONE.w,
        height: PHONE.h,
        opacity,
        transform: `rotateX(${rx}deg) rotateY(${ry}deg) rotateZ(${rotate}deg) scale(${scale})`,
        transformStyle: 'preserve-3d',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: PHONE.r,
          background: 'linear-gradient(145deg, #3a3f4a, #121419 40%, #22262e)',
          boxShadow: `0 ${60 * shadow}px ${110 * shadow}px -30px rgba(0,0,0,${0.6 * shadow}), inset 0 0 0 2px rgba(255,255,255,.12)`,
        }}
      />
      {/* side buttons */}
      <div style={{ position: 'absolute', right: -4, top: 210, width: 5, height: 110, borderRadius: 3, background: '#2a2e36' }} />
      <div style={{ position: 'absolute', left: -4, top: 170, width: 5, height: 60, borderRadius: 3, background: '#2a2e36' }} />
      <div style={{ position: 'absolute', left: -4, top: 250, width: 5, height: 60, borderRadius: 3, background: '#2a2e36' }} />
      <div style={{ position: 'absolute', inset: PHONE.bezel, borderRadius: PHONE.r - PHONE.bezel, overflow: 'hidden', background: '#000' }}>
        {children}
        <div style={{ position: 'absolute', top: 14, left: '50%', width: 110, height: 32, marginLeft: -55, borderRadius: 20, background: '#000' }} />
      </div>
      <div style={{ position: 'absolute', inset: 0, borderRadius: PHONE.r, background: 'linear-gradient(118deg, rgba(255,255,255,.18) 0%, rgba(255,255,255,0) 30%)', pointerEvents: 'none' }} />
    </div>
  )
}
