import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { Check, ShoppingBag } from 'lucide-react'
import { useCart } from '../lib/cart'
import { MAX_SAVE, money, products } from '../data/site'

export function CartToast() {
  const { toast, setToast, setOpen } = useCart()
  useEffect(() => {
    if (!toast) return
    const t = setTimeout(() => setToast(null), 2600)
    return () => clearTimeout(t)
  }, [toast, setToast])
  const p = toast && products.find((x) => x.id === toast.productId)
  return (
    <div className="pointer-events-none fixed inset-x-0 top-24 z-[65] flex justify-center px-4">
      <AnimatePresence>
        {p && (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ type: 'spring', stiffness: 400, damping: 28 }}
            className="pointer-events-auto flex items-center gap-3 rounded-full bg-ink py-2 pl-2 pr-2 text-sm text-white shadow-2xl"
          >
            <span className="grid h-8 w-8 place-items-center rounded-full bg-emerald-500">
              <Check className="h-4 w-4" strokeWidth={3} />
            </span>
            <span>
              <b>{p.name}</b> added
            </span>
            <button onClick={() => setOpen(true)} className="cursor-pointer rounded-full bg-white px-4 py-1.5 font-semibold text-ink hover:bg-sky">
              View cart
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/** Sticky mobile shop bar that appears after the hero. */
export function MobileBar() {
  const { count, total, setOpen } = useCart()
  const { scrollY } = useScroll()
  const [show, setShow] = useState(false)
  useMotionValueEvent(scrollY, 'change', (y) => setShow(y > window.innerHeight * 0.8))
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-x-3 bottom-3 z-40 md:hidden"
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          exit={{ y: 100 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex items-center gap-2 rounded-full border border-white/10 bg-ink/90 p-1.5 shadow-2xl backdrop-blur-xl">
            {count > 0 ? (
              <button
                onClick={() => setOpen(true)}
                className="flex flex-1 cursor-pointer items-center justify-between rounded-full bg-lime px-5 py-3 text-sm font-semibold text-ink"
              >
                <span className="flex items-center gap-2">
                  <ShoppingBag className="h-4 w-4" /> View cart ({count})
                </span>
                <span>{money(total)}</span>
              </button>
            ) : (
              <a href="#shop" className="flex flex-1 items-center justify-between rounded-full bg-lime px-5 py-3 text-sm font-semibold text-ink">
                <span>Shop NFC tags</span>
                <span>Save up to {MAX_SAVE}%</span>
              </a>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
