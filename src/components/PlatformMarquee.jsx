import { PlatformIcon } from './Brand'

const items = [
  { icon: 'google', label: 'Google Reviews' },
  { icon: 'instagram', label: 'Instagram' },
  { icon: 'whatsapp', label: 'WhatsApp' },
  { icon: 'tiktok', label: 'TikTok' },
  { icon: 'menu', label: 'Digital Menu' },
  { icon: 'wallet', label: 'Whish Pay' },
  { icon: 'facebook', label: 'Facebook' },
  { icon: 'link', label: 'Any link' },
]

export default function PlatformMarquee() {
  const row = [...items, ...items]
  return (
    <section aria-label="Supported platforms" className="relative border-b border-line bg-white py-7">
      <p className="mb-5 text-center text-xs font-semibold uppercase tracking-[0.2em] text-muted">One tag. Every platform your customers use.</p>
      <div className="relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)]">
        <div className="flex w-max animate-marquee gap-14 pr-14 [--marquee-duration:45s] hover:[animation-play-state:paused]">
          {[...row, ...row].map((it, i) => (
            <div key={i} className="flex items-center gap-3 whitespace-nowrap text-ink/45 transition-colors hover:text-ink">
              <PlatformIcon name={it.icon} className="h-7 w-7" />
              <span className="font-display text-2xl font-semibold tracking-tight">{it.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
