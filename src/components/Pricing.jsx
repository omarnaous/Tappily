import { motion } from 'framer-motion'
import { Check, Sparkles } from 'lucide-react'
import { SectionHeading } from './Reveal'
import { useCart } from '../lib/cart'
import { CURRENCY, PRICE, pricing, products } from '../data/site'

// Default mix added to the cart for each pack — the customer can change it before ordering.
const packMix = {
  single: ['google-review'],
  starter: ['google-review', 'instagram', 'whatsapp'],
  business: ['google-review', 'google-review', 'instagram', 'menu', 'menu', 'whatsapp'],
}

export default function Pricing() {
  const { add, setOpen } = useCart()
  const choose = (id) => {
    packMix[id].forEach((pid) => add(pid, 'stand', 1))
    setTimeout(() => setOpen(true), 200)
  }

  return (
    <section id="pricing" className="relative scroll-mt-24 overflow-hidden bg-paper py-24 md:py-32">
      <div className="container-x">
        <SectionHeading
          align="center"
          eyebrow="Pricing"
          title="Simple. Honest. $25 a tag."
          text="One-time price. No subscriptions, no setup fees, no surprises. Mix any platforms in any pack."
        />

        <div className="mx-auto mt-16 grid max-w-6xl gap-5 lg:grid-cols-3">
          {pricing.map((p, i) => {
            const total = p.tags * PRICE
            return (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.9, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -8 }}
                className={`relative flex flex-col rounded-[32px] p-8 md:p-10 ${p.popular ? 'bg-ink text-white shadow-[0_40px_80px_-30px_rgba(14,14,12,0.55)] lg:-my-4 lg:py-14' : 'border border-line bg-card'}`}
              >
                {p.popular && (
                  <>
                    <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[32px]">
                      <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-lime/25 blur-3xl" />
                    </div>
                    <span className="absolute right-6 top-6 inline-flex items-center gap-1 rounded-full bg-lime px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-wider text-ink">
                      <Sparkles className="h-3 w-3" /> Most popular
                    </span>
                  </>
                )}
                <h3 className="relative text-2xl font-semibold tracking-tight">{p.name}</h3>
                <p className={`relative mt-1 ${p.popular ? 'text-white/60' : 'text-muted'}`}>{p.blurb}</p>
                <p className="relative mt-8 flex items-end gap-2">
                  <span className="h-display text-7xl">
                    {CURRENCY}
                    {total}
                  </span>
                </p>
                <p className={`relative mt-2 text-sm ${p.popular ? 'text-white/60' : 'text-muted'}`}>
                  {p.tags} {p.tags > 1 ? 'tags' : 'tag'} × {CURRENCY}
                  {PRICE} · one-time
                </p>
                <ul className="relative mt-8 space-y-3">
                  {p.features.map((f) => (
                    <li key={f} className="flex gap-3 text-[15px]">
                      <span className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full ${p.popular ? 'bg-lime text-ink' : 'bg-ink text-white'}`}>
                        <Check className="h-3 w-3" strokeWidth={3} />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
                <button onClick={() => choose(p.id)} className={`relative mt-10 w-full ${p.popular ? 'btn-brand' : 'btn-primary'}`}>
                  Get {p.name}
                </button>
                <p className={`relative mt-3 text-center text-xs ${p.popular ? 'text-white/50' : 'text-muted'}`}>
                  Starts with{' '}
                  {packMix[p.id]
                    .map((id) => products.find((x) => x.id === id).name.replace(' Tag', ''))
                    .filter((v, idx, a) => a.indexOf(v) === idx)
                    .join(', ')}{' '}
                  — edit in cart
                </p>
              </motion.div>
            )
          })}
        </div>
        <p className="mt-12 text-center text-sm text-muted">
          Need 10+ tags for a chain or event?{' '}
          <a href="#contact" className="font-semibold text-ink underline underline-offset-4 hover:text-brand">
            Talk to us
          </a>
          .
        </p>
      </div>
    </section>
  )
}
