import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, MapPin, Phone } from 'lucide-react'
import { Logo, LogoMark, PlatformIcon } from './Brand'
import { SplitWords } from './Reveal'
import { contact, whatsappLink } from '../data/site'

export function FinalCTA() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'center center'] })
  const scale = useTransform(scrollYProgress, [0, 1], [0.88, 1])
  const radius = useTransform(scrollYProgress, [0, 1], [80, 40])
  return (
    <section id="contact" ref={ref} className="scroll-mt-24 bg-paper px-3 pb-3 pt-10 sm:px-4 sm:pb-4">
      <motion.div style={{ scale, borderRadius: radius }} className="relative isolate overflow-hidden bg-lime px-6 py-24 text-ink md:py-36">
        <motion.div
          className="pointer-events-none absolute -right-24 -top-24 -z-10 h-[34rem] w-[34rem] opacity-[0.07]"
          animate={{ rotate: 360 }}
          transition={{ duration: 80, repeat: Infinity, ease: 'linear' }}
        >
          <LogoMark className="h-full w-full" base="#0e0e0c" accent="#0e0e0c" />
        </motion.div>
        <div className="mx-auto max-w-5xl text-center">
          <p className="eyebrow !text-ink/60">Ready when you are</p>
          <h2 className="h-display mx-auto mt-5 text-[clamp(2.8rem,8.5vw,7.5rem)]">
            <SplitWords text="Get your business tapped." />
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg text-ink/70">Order in two minutes. We program, brand and deliver your tags anywhere in Lebanon.</p>
          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            <a href="#shop" className="btn-primary group !px-8 !py-4 text-base">
              Shop now <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href={whatsappLink('Hi Tapilly! I want to order NFC tags for my business.')}
              target="_blank"
              rel="noreferrer"
              className="btn !bg-white !px-8 !py-4 text-base text-ink hover:!bg-ink hover:text-white"
            >
              <PlatformIcon name="whatsapp" className="h-4 w-4" /> Order on WhatsApp
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  )
}

const year = new Date().getFullYear()

export default function Footer() {
  return (
    <footer className="overflow-hidden bg-ink pb-28 text-white/70 md:mx-4 md:mb-4 md:rounded-[40px] md:pb-10">
      <div className="container-x pt-16">
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
                <a className="hover:text-white" href="#benefits">
                  Impact
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
