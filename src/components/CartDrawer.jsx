import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, Minus, Plus, ShoppingBag, Trash2, Truck, X } from 'lucide-react'
import ProductVisual from './ProductVisual'
import { PlatformIcon } from './Brand'
import { useCart } from '../lib/cart'
import { lockScroll, unlockScroll } from '../lib/scrollLock'
import { CURRENCY, formats, FREE_DELIVERY_FROM, PRICE, products, whatsappLink } from '../data/site'

const byId = Object.fromEntries(products.map((p) => [p.id, p]))
const formatLabel = Object.fromEntries(formats.map((f) => [f.id, f.label]))

function buildOrderMessage(lines, count, subtotal, form) {
  const items = lines.map((l) => `• ${l.qty} × ${byId[l.productId].name} (${formatLabel[l.format]}) — ${CURRENCY}${l.qty * PRICE}`).join('\n')
  const delivery = count >= FREE_DELIVERY_FROM ? 'Free delivery' : 'Delivery fee to confirm'
  return [
    'Hi Tapilly! I would like to place an order:',
    '',
    items,
    '',
    `Total: ${count} tag${count > 1 ? 's' : ''} — ${CURRENCY}${subtotal} (${delivery})`,
    '',
    `Name: ${form.name}`,
    `Business: ${form.business}`,
    `Phone: ${form.phone}`,
    `Area: ${form.city}`,
    form.notes ? `Links / notes: ${form.notes}` : null,
  ]
    .filter((x) => x !== null)
    .join('\n')
}

const Field = ({ label, ...props }) => (
  <label className="block">
    <span className="text-xs font-semibold text-ink/70">{label}</span>
    {props.rows ? (
      <textarea
        {...props}
        className="mt-1.5 w-full resize-none rounded-xl border border-line bg-white px-3.5 py-2.5 text-[15px] outline-none transition focus:border-ink focus:ring-1 focus:ring-ink"
      />
    ) : (
      <input
        {...props}
        className="mt-1.5 w-full rounded-xl border border-line bg-white px-3.5 py-2.5 text-[15px] outline-none transition focus:border-ink focus:ring-1 focus:ring-ink"
      />
    )}
  </label>
)

export default function CartDrawer() {
  const { open, setOpen } = useCart()
  const [form, setForm] = useState({ name: '', business: '', phone: '', city: '', notes: '' })

  useEffect(() => {
    if (!open) return
    lockScroll()
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => {
      unlockScroll()
      window.removeEventListener('keydown', onKey)
    }
  }, [open, setOpen])

  return <AnimatePresence>{open && <Drawer form={form} setForm={setForm} />}</AnimatePresence>
}

// Mounted fresh on every open, so the checkout step always starts at the cart.
function Drawer({ form, setForm }) {
  const { lines, count, subtotal, setQty, setOpen, clear } = useCart()
  const [step, setStep] = useState('cart')
  const remaining = Math.max(0, FREE_DELIVERY_FROM - count)

  const submit = (e) => {
    e.preventDefault()
    window.open(whatsappLink(buildOrderMessage(lines, count, subtotal, form)), '_blank', 'noopener')
    setStep('done')
    clear()
  }

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  return (
    <div className="fixed inset-0 z-[70]">
      <motion.div
        className="absolute inset-0 bg-ink/50 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setOpen(false)}
      />
      <motion.aside
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
        data-lenis-prevent
        className="absolute bottom-0 right-0 top-0 flex w-full max-w-[460px] flex-col bg-paper shadow-2xl"
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      >
        <header className="flex items-center justify-between border-b border-line px-6 py-5">
          <div className="flex items-center gap-3">
            {step === 'details' && (
              <button
                onClick={() => setStep('cart')}
                className="grid h-9 w-9 cursor-pointer place-items-center rounded-full hover:bg-mist"
                aria-label="Back to cart"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
            )}
            <h2 className="font-display text-2xl font-bold">
              {step === 'details' ? 'Delivery details' : step === 'done' ? 'Order sent' : `Your cart (${count})`}
            </h2>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="grid h-10 w-10 cursor-pointer place-items-center rounded-full hover:bg-mist"
            aria-label="Close cart"
          >
            <X className="h-5 w-5" />
          </button>
        </header>

        {step === 'done' ? (
          <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
            <div className="grid h-20 w-20 place-items-center rounded-full bg-emerald-500 text-white">
              <PlatformIcon name="whatsapp" className="h-9 w-9" />
            </div>
            <h3 className="h-display mt-6 text-3xl">Almost there!</h3>
            <p className="mt-3 text-muted">Your order opened in WhatsApp. Hit send and we'll confirm your links, design and delivery within the day.</p>
            <button className="btn-primary mt-8" onClick={() => setOpen(false)}>
              Continue browsing
            </button>
          </div>
        ) : lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
            <div className="grid h-20 w-20 place-items-center rounded-full bg-mist">
              <ShoppingBag className="h-8 w-8 text-ink/60" />
            </div>
            <h3 className="h-display mt-6 text-3xl">Your cart is empty</h3>
            <p className="mt-3 text-muted">
              Every Tapilly tag is {CURRENCY}
              {PRICE}. Pick the platform that grows your business.
            </p>
            <a href="#shop" className="btn-primary mt-8" onClick={() => setOpen(false)}>
              Shop NFC tags
            </a>
          </div>
        ) : step === 'cart' ? (
          <>
            <div className="border-b border-line px-6 py-4">
              <p className="flex items-center gap-2 text-sm">
                <Truck className="h-4 w-4 text-brand" />
                {remaining > 0 ? (
                  <span>
                    Add <b>{remaining}</b> more tag{remaining > 1 ? 's' : ''} for <b>free delivery</b>
                  </span>
                ) : (
                  <span>
                    You've unlocked <b>free delivery</b> 🎉
                  </span>
                )}
              </p>
              <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-mist">
                <motion.div
                  className="h-full rounded-full bg-brand"
                  animate={{ width: `${Math.min(100, (count / FREE_DELIVERY_FROM) * 100)}%` }}
                  transition={{ type: 'spring', stiffness: 120, damping: 20 }}
                />
              </div>
            </div>
            <ul className="flex-1 divide-y divide-line overflow-y-auto px-6">
              <AnimatePresence initial={false}>
                {lines.map((l) => {
                  const p = byId[l.productId]
                  return (
                    <motion.li
                      key={l.key}
                      layout
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, height: 0 }}
                      className="flex gap-4 py-5"
                    >
                      <div className="w-24 shrink-0 overflow-hidden rounded-2xl">
                        <ProductVisual product={p} format={l.format} interactive={false} />
                      </div>
                      <div className="flex flex-1 flex-col">
                        <div className="flex justify-between gap-2">
                          <div>
                            <p className="font-semibold leading-tight">{p.name}</p>
                            <p className="mt-0.5 text-sm text-muted">{formatLabel[l.format]}</p>
                          </div>
                          <p className="font-semibold">
                            {CURRENCY}
                            {l.qty * PRICE}
                          </p>
                        </div>
                        <div className="mt-auto flex items-center justify-between pt-3">
                          <div className="flex h-9 items-center rounded-full border border-line bg-white">
                            <button
                              className="grid h-full w-9 cursor-pointer place-items-center"
                              onClick={() => setQty(l.key, l.qty - 1)}
                              aria-label="Decrease"
                            >
                              <Minus className="h-3.5 w-3.5" />
                            </button>
                            <span className="w-6 text-center text-sm font-semibold tabular-nums">{l.qty}</span>
                            <button
                              className="grid h-full w-9 cursor-pointer place-items-center"
                              onClick={() => setQty(l.key, l.qty + 1)}
                              aria-label="Increase"
                            >
                              <Plus className="h-3.5 w-3.5" />
                            </button>
                          </div>
                          <button className="cursor-pointer text-ink/40 hover:text-red-600" onClick={() => setQty(l.key, 0)} aria-label={`Remove ${p.name}`}>
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </motion.li>
                  )
                })}
              </AnimatePresence>
            </ul>
            <footer className="border-t border-line bg-white px-6 py-5">
              <div className="flex justify-between text-sm text-muted">
                <span>Subtotal</span>
                <span>
                  {CURRENCY}
                  {subtotal}.00
                </span>
              </div>
              <div className="mt-1 flex justify-between text-sm text-muted">
                <span>Delivery</span>
                <span>{remaining === 0 ? 'Free' : 'Confirmed on WhatsApp'}</span>
              </div>
              <div className="mt-3 flex justify-between text-lg font-semibold">
                <span>Total</span>
                <span>
                  {CURRENCY}
                  {subtotal}.00
                </span>
              </div>
              <button className="btn-primary mt-4 w-full !py-4" onClick={() => setStep('details')}>
                Checkout
              </button>
              <p className="mt-3 text-center text-xs text-muted">Pay cash on delivery or with Whish.</p>
            </footer>
          </>
        ) : (
          <form onSubmit={submit} className="flex flex-1 flex-col overflow-hidden">
            <div className="flex-1 space-y-4 overflow-y-auto px-6 py-6">
              <Field label="Full name" required value={form.name} onChange={set('name')} autoComplete="name" />
              <Field label="Business name (printed on your tags)" required value={form.business} onChange={set('business')} autoComplete="organization" />
              <Field label="Phone" required type="tel" value={form.phone} onChange={set('phone')} autoComplete="tel" placeholder="+961 …" />
              <Field
                label="City / area"
                required
                value={form.city}
                onChange={set('city')}
                autoComplete="address-level2"
                placeholder="e.g. Beirut, Jounieh, Tripoli"
              />
              <Field label="Your links (Google Maps, Instagram, menu…) & notes" rows={4} value={form.notes} onChange={set('notes')} />
            </div>
            <footer className="border-t border-line bg-white px-6 py-5">
              <div className="flex justify-between text-lg font-semibold">
                <span>
                  {count} tag{count > 1 ? 's' : ''}
                </span>
                <span>
                  {CURRENCY}
                  {subtotal}.00
                </span>
              </div>
              <button type="submit" className="btn mt-4 w-full bg-[#25D366] !py-4 text-white hover:bg-[#1ebe5b]">
                <PlatformIcon name="whatsapp" className="h-5 w-5" /> Send order on WhatsApp
              </button>
              <p className="mt-3 text-center text-xs text-muted">No payment now. We confirm everything with you first.</p>
            </footer>
          </form>
        )}
      </motion.aside>
    </div>
  )
}
