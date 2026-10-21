import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import { Reveal, SectionHeading } from './Reveal'
import { contact, faqs, whatsappLink } from '../data/site'

export default function FAQ() {
  const [open, setOpen] = useState(0)
  return (
    <section id="faq" className="scroll-mt-24 bg-paper py-24 md:py-32">
      <div className="container-x grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionHeading
            eyebrow="FAQ"
            title="Questions? Answered."
            text="Everything you need to know about Tapilly NFC tags. Still curious? We reply fast on WhatsApp."
          />
          <Reveal delay={0.2}>
            <a href={whatsappLink('Hi Tapilly! I have a question about your NFC tags.')} target="_blank" rel="noreferrer" className="btn-primary mt-8">
              Ask us on WhatsApp · {contact.phoneDisplay}
            </a>
          </Reveal>
        </div>
        <div className="divide-y divide-line border-y border-line">
          {faqs.map((f, i) => {
            const isOpen = open === i
            return (
              <Reveal key={f.q} delay={i * 0.04}>
                <button
                  className="flex w-full cursor-pointer items-center justify-between gap-6 py-6 text-left"
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                >
                  <span className="text-lg font-semibold md:text-xl">{f.q}</span>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.35 }}
                    className={`grid h-9 w-9 shrink-0 place-items-center rounded-full transition-colors ${isOpen ? 'bg-brand text-white' : 'bg-white text-ink'}`}
                  >
                    <Plus className="h-4 w-4" />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-2xl pb-6 leading-relaxed text-muted">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
