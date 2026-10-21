import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { PRICE, products, unitPriceFor } from '../data/site'

const CartContext = createContext(null)
const KEY = 'tapilly-cart-v1'

const load = () => {
  try {
    const raw = JSON.parse(localStorage.getItem(KEY) || '[]')
    return Array.isArray(raw) ? raw.filter((l) => products.some((p) => p.id === l.productId)) : []
  } catch {
    return []
  }
}

const lineKey = (productId, format) => `${productId}:${format}`

export function CartProvider({ children }) {
  const [lines, setLines] = useState(load)
  const [open, setOpen] = useState(false)
  const [toast, setToast] = useState(null)

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(lines))
    } catch {
      /* storage unavailable — cart still works for this visit */
    }
  }, [lines])

  const add = useCallback((productId, format = 'stand', qty = 1) => {
    setLines((prev) => {
      const key = lineKey(productId, format)
      const found = prev.find((l) => l.key === key)
      if (found) return prev.map((l) => (l.key === key ? { ...l, qty: l.qty + qty } : l))
      return [...prev, { key, productId, format, qty }]
    })
    setToast({ id: Date.now(), productId, qty })
  }, [])

  const setQty = useCallback((key, qty) => {
    setLines((prev) => (qty <= 0 ? prev.filter((l) => l.key !== key) : prev.map((l) => (l.key === key ? { ...l, qty } : l))))
  }, [])

  const clear = useCallback(() => setLines([]), [])

  const value = useMemo(() => {
    const count = lines.reduce((s, l) => s + l.qty, 0)
    const unit = unitPriceFor(count)
    const subtotal = count * PRICE // before quantity breaks
    const total = count * unit
    return { lines, count, unit, subtotal, total, discount: subtotal - total, add, setQty, clear, open, setOpen, toast, setToast }
  }, [lines, add, setQty, clear, open, toast])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

// oxlint-disable-next-line react/only-export-components
export const useCart = () => useContext(CartContext)
