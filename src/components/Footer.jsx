import { motion } from 'framer-motion'
import { ArrowRight, MapPin, Phone } from 'lucide-react'
import { Logo, LogoMark, PlatformIcon } from './Brand'
import { SplitWords } from './Reveal'
import { contact, whatsappLink } from '../data/site'

export function FinalCTA() {
  return (
    <section id="contact" className="noise relative isolate scroll-mt-24 overflow-hidden bg-ink py-28 text-white md:py-40">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(700px_400px_at_50%_100%,rgba(8,85,214,0.55),transparent_70%)]" />
      <motion.div
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[46rem] w-[46rem] -translate-x-1/2 -translate-y-1/2 opacity-[0.06]"
        animate={{ rotate: 360 }}
        transition={{ duration: 80, repeat: Infinity, ease: 'linear' }}
      >
        <LogoMark className="h-full w-full" base="#fff" accent="#fff" />
      </motion.div>
      <div className="container-x text-center">
        <p className="eyebrow text-brand-2">Ready when you are</p>
        <h2 className="h-display mx-auto mt-5 max-w-4xl text-[clamp(2.8rem,8vw,7rem)]">
          <SplitWords text="Get your business tapped." />
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-lg text-white/65">Order in two minutes. We program, brand and deliver your tags anywhere in Lebanon.</p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <a href="#shop" className="btn-brand group !px-8 !py-4 text-base">
            Shop now <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
          <a
            href={whatsappLink('Hi Tapilly! I want to order NFC tags for my business.')}
            target="_blank"
            rel="noreferrer"
            className="btn-glass !px-8 !py-4 text-base"
          >
            <PlatformIcon name="whatsapp" className="h-4 w-4" /> Order on WhatsApp
          </a>
        </div>
      </div>
    </section>
  )
}

const year = new Date().getFullYear()

export default function Footer() {
  return (
    <footer className="bg-ink pb-28 text-white/70 md:pb-10">
      <div className="container-x border-t border-white/10 pt-14">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Logo light className="text-2xl" />
            <p className="mt-4 max-w-xs text-sm leading-relaxed">Tapilly = Tap + Happily. Smart NFC solutions for modern businesses in Lebanon.</p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white">Shop</h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <a className="hover:text-white" href="#shop">
                  All tags
                </a>
              </li>
              <li>
                <a className="hover:text-white" href="#pricing">
                  Pricing
                </a>
              </li>
              <li>
                <a className="hover:text-white" href="#how">
                  How it works
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white">Help</h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <a className="hover:text-white" href="#faq">
                  FAQ
                </a>
              </li>
              <li>
                <a className="hover:text-white" href={whatsappLink()} target="_blank" rel="noreferrer">
                  WhatsApp support
                </a>
              </li>
              <li>
                <a className="hover:text-white" href="#contact">
                  Bulk orders
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white">Contact</h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <a className="flex items-center gap-2 hover:text-white" href={`tel:+${contact.phoneIntl}`}>
                  <Phone className="h-4 w-4" /> +961 {contact.phoneDisplay}
                </a>
              </li>
              <li>
                <a className="flex items-center gap-2 hover:text-white" href={contact.instagramUrl} target="_blank" rel="noreferrer">
                  <PlatformIcon name="instagram" className="h-4 w-4" /> @{contact.instagram}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4" /> {contact.country}
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-14 flex flex-col justify-between gap-3 border-t border-white/10 pt-6 text-xs text-white/45 md:flex-row">
          <p>© {year} Tapilly. All rights reserved.</p>
          <p>Tap. Connect. Grow.</p>
        </div>
        <p aria-hidden="true" className="h-display pointer-events-none mt-10 select-none text-center text-[22vw] leading-[0.8] text-white/[0.04]">
          TAPILLY
        </p>
      </div>
    </footer>
  )
}
