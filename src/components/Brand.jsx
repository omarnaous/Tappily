import { siFacebook, siGoogle, siInstagram, siTiktok, siWhatsapp } from 'simple-icons'
import { Link2, UtensilsCrossed, Wallet } from 'lucide-react'

export function LogoMark({ className = 'h-6 w-6', accent = '#0855d6', base = 'currentColor' }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
      <circle cx="9" cy="9" r="7" fill={base} />
      <circle cx="31" cy="9" r="7" fill={base} />
      <circle cx="9" cy="31" r="7" fill={base} />
      <circle cx="31" cy="31" r="7" fill={accent} />
      <rect x="15.5" y="15.5" width="9" height="9" rx="1.6" transform="rotate(45 20 20)" fill={base} />
    </svg>
  )
}

export function Logo({ className = '', light = false }) {
  return (
    <span className={`inline-flex items-center gap-2 ${light ? 'text-white' : 'text-navy'} ${className}`} aria-label="Tapilly">
      <LogoMark className="h-[1.15em] w-[1.15em]" accent={light ? '#5b95ff' : '#0855d6'} />
      <span className="font-sans font-extrabold tracking-[0.06em]">TAPILLY</span>
    </span>
  )
}

const brandIcons = { google: siGoogle, instagram: siInstagram, tiktok: siTiktok, whatsapp: siWhatsapp, facebook: siFacebook }
const lucideIcons = { menu: UtensilsCrossed, wallet: Wallet, link: Link2 }

export function PlatformIcon({ name, className = 'h-5 w-5', color = 'currentColor' }) {
  const si = brandIcons[name]
  if (si)
    return (
      <svg viewBox="0 0 24 24" className={className} fill={color} aria-hidden="true">
        <path d={si.path} />
      </svg>
    )
  const Icon = lucideIcons[name] || Link2
  return <Icon className={className} color={color} strokeWidth={2} aria-hidden="true" />
}

export function NfcWaves({ className = 'h-6 w-6', color = 'currentColor' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
      <path d="M6 8.32a7.43 7.43 0 0 1 0 7.36" />
      <path d="M9.46 6.21a11.76 11.76 0 0 1 0 11.58" />
      <path d="M12.91 4.1a15.91 15.91 0 0 1 .01 15.8" />
      <path d="M16.37 2a20.16 20.16 0 0 1 0 20" />
    </svg>
  )
}
