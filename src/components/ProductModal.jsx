import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Check, Minus, Plus, ShieldCheck, Truck, X, Zap } from 'lucide-react'
import ProductVisual from './ProductVisual'
import { useCart } from '../lib/cart'
import { CURRENCY, formats, FREE_DELIVERY_FROM, PRICE } from '../data/site'
import { lockScroll, unlockScroll } from '../lib/scrollLock'

export default function ProductModal({ product, onClose }) {
  useEffect(() => {
    if (!product) return
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    lockScroll()
    return () => {
      window.removeEventListener('keydown', onKey)
      unlockScroll()
    }
  }, [product, onClose])

  return <AnimatePresence>{product && <Dialog key={product.id} product={product} onClose={onClose} />}</AnimatePresence>
}

function Dialog({ product, onClose }) {
  const { add, setOpen } = useCart()
  const [format, setFormat] = useState('stand')
  const [qty, setQty] = useState(1)

  return (
    <motion.div
      className="fixed inset-0 z-[60] flex items-end justify-center md:items-center md:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="absolute inset-0 bg-ink/60 backdrop-blur-sm" onClick={onClose} />
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label={product.name}
        data-lenis-prevent
        className="relative grid max-h-[92svh] w-full max-w-5xl overflow-y-auto rounded-t-[28px] bg-white shadow-2xl md:grid-cols-2 md:rounded-[28px]"
        initial={{ y: 80, opacity: 0, scale: 0.98 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 60, opacity: 0 }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 grid h-10 w-10 cursor-pointer place-items-center rounded-full bg-white/90 shadow-md hover:bg-mist"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={format}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
            >
              <ProductVisual product={product} format={format} className="md:rounded-l-[28px]" />
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="flex flex-col p-6 sm:p-10">
          {product.badge && <span className="chip w-fit">{product.badge}</span>}
          <h3 className="h-display mt-4 text-4xl md:text-5xl">{product.name}</h3>
          <p className="mt-3 text-2xl font-semibold">
            {CURRENCY}
            {PRICE}.00 <span className="text-sm font-normal text-muted">per tag · one-time</span>
          </p>
          <p className="mt-4 leading-relaxed text-muted">{product.short}</p>
          <ul className="mt-5 space-y-2.5">
            {product.bullets.map((b) => (
              <li key={b} className="flex gap-3 text-[15px] text-ink/85">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand" /> {b}
              </li>
            ))}
          </ul>

          <fieldset className="mt-7">
            <legend className="text-sm font-semibold">Format</legend>
            <div className="mt-3 grid grid-cols-2 gap-3">
              {formats.map((f) => (
                <button
                  key={f.id}
                  onClick={() => setFormat(f.id)}
                  className={`cursor-pointer rounded-2xl border p-3.5 text-left transition-all ${format === f.id ? 'border-ink bg-ink/[0.03] ring-1 ring-ink' : 'border-line hover:border-ink/40'}`}
                  aria-pressed={format === f.id}
                >
                  <span className="block text-sm font-semibold">{f.label}</span>
                  <span className="block text-xs text-muted">{f.note}</span>
                </button>
              ))}
            </div>
          </fieldset>

          <div className="mt-6 flex items-center gap-3">
            <div className="flex h-[52px] items-center rounded-full border border-line">
              <button
                className="grid h-full w-12 cursor-pointer place-items-center"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                aria-label="Decrease quantity"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-8 text-center font-semibold tabular-nums">{qty}</span>
              <button className="grid h-full w-12 cursor-pointer place-items-center" onClick={() => setQty((q) => q + 1)} aria-label="Increase quantity">
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <button
              className="btn-primary h-[52px] flex-1"
              onClick={() => {
                add(product.id, format, qty)
                onClose()
                setTimeout(() => setOpen(true), 250)
              }}
            >
              Add to cart — {CURRENCY}
              {PRICE * qty}
            </button>
          </div>

          <div className="mt-7 grid gap-3 border-t border-line pt-6 text-sm text-muted sm:grid-cols-3">
            <span className="flex items-center gap-2">
              <Truck className="h-4 w-4 text-ink" /> Free delivery on {FREE_DELIVERY_FROM}+
            </span>
            <span className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-ink" /> Ready to tap
            </span>
            <span className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-ink" /> Free reprogram
            </span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
