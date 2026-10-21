import { useEffect, useState } from 'react'
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import ProductVisual from './ProductVisual'
import { PlatformIcon } from './Brand'
import { SectionHeading } from './Reveal'
import ProductModal from './ProductModal'
import { useCart } from '../lib/cart'
import { categories, CURRENCY, MAX_SAVE, money, PRICE, products } from '../data/site'

const CATEGORY_LABEL = { reviews: 'Reviews', social: 'Social', ordering: 'Menu & ordering', payments: 'Payments' }

function ProductCard({ product, index, onOpen }) {
  const { add } = useCart()
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.8, delay: (index % 4) * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="group card flex flex-col p-2 transition-shadow duration-500 pointer-fine:hover:shadow-[0_30px_60px_-30px_rgba(14,14,12,0.3)] sm:p-2.5"
    >
      <div className="relative cursor-pointer overflow-hidden rounded-[22px]" onClick={() => onOpen(product)}>
        <div className="relative transition-transform duration-700 ease-(--ease-out-expo) pointer-fine:group-hover:scale-[1.04]">
          {/* Both formats stay mounted; the card fades in on hover (mouse only, so taps never get stuck on it). */}
          <ProductVisual product={product} format="stand" interactive={false} />
          <div className="absolute inset-0 opacity-0 transition-opacity duration-500 pointer-fine:group-hover:opacity-100">
            <ProductVisual product={product} format="card" />
          </div>
        </div>
        {product.badge && (
          <span className="absolute left-2.5 top-2.5 rounded-full bg-card px-2.5 py-1 font-mono text-[10px] font-medium uppercase tracking-wider text-ink sm:left-3 sm:top-3">
            {product.badge}
          </span>
        )}
        <span className="absolute right-2.5 top-2.5 hidden rounded-full bg-card/80 px-2.5 py-1 font-mono text-[10px] text-muted backdrop-blur pointer-fine:sm:block">
          Hover · card
        </span>
      </div>
      <div className="flex flex-1 flex-col px-2 pb-1.5 pt-3.5 sm:px-3 sm:pt-4">
        <p className="flex items-center gap-1.5 font-mono text-[10.5px] uppercase tracking-wider text-muted">
          <PlatformIcon name={product.icon} className="h-3 w-3" />
          {CATEGORY_LABEL[product.category]}
        </p>
        <h3 className="mt-1.5 text-[15px] font-semibold leading-tight tracking-tight sm:text-[17px]">
          <button className="cursor-pointer text-left hover:underline" onClick={() => onOpen(product)}>
            {product.name}
          </button>
        </h3>
        <p className="mt-1 hidden text-[13.5px] leading-snug text-muted sm:block">{product.short}</p>
        <div className="mt-auto flex items-center justify-between gap-2 pt-4">
          <p className="text-[15px] font-semibold leading-tight sm:text-[17px]">
            {money(PRICE)}
            <span className="block font-mono text-[10.5px] font-medium text-brand">Save {MAX_SAVE}% on 3+</span>
          </p>
          <button
            onClick={() => add(product.id, 'stand')}
            className="flex h-9 cursor-pointer items-center gap-1.5 rounded-full bg-ink px-3 text-[13px] font-semibold text-white transition-colors hover:bg-accent hover:text-white sm:h-10 sm:px-4"
            aria-label={`Add ${product.name} to cart`}
          >
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">Add</span>
          </button>
        </div>
      </div>
    </motion.article>
  )
}

export default function Shop() {
  const [cat, setCat] = useState('all')
  const [active, setActive] = useState(null)

  // Other sections (e.g. the hero) open a product by firing `tapilly:open-product` with its id.
  useEffect(() => {
    const open = (e) => {
      const p = products.find((x) => x.id === e.detail)
      if (p) setActive(p)
    }
    window.addEventListener('tapilly:open-product', open)
    return () => window.removeEventListener('tapilly:open-product', open)
  }, [])
  const list = products.filter((p) => cat === 'all' || p.category === cat)

  return (
    <section id="shop" className="relative scroll-mt-24 bg-paper py-24 md:py-32">
      <div className="container-x">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="The collection"
            title="Pick your tap."
            text={`${CURRENCY}${PRICE} a tag, or save up to ${MAX_SAVE}% when you bundle. Programmed with your link, branded with your name, delivered ready to use.`}
          />
          <LayoutGroup>
            <div className="no-scrollbar flex max-w-full gap-1 overflow-x-auto rounded-full border border-line bg-card p-1" role="tablist">
              {categories.map((c) => (
                <button
                  key={c.id}
                  role="tab"
                  aria-selected={cat === c.id}
                  onClick={() => setCat(c.id)}
                  className={`relative shrink-0 cursor-pointer rounded-full px-4 py-2 text-[13.5px] font-medium transition-colors ${cat === c.id ? 'text-white' : 'text-muted hover:text-ink'}`}
                >
                  {cat === c.id && (
                    <motion.span
                      layoutId="cat-pill"
                      className="absolute inset-0 rounded-full bg-ink"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="relative">{c.label}</span>
                </button>
              ))}
            </div>
          </LayoutGroup>
        </div>

        <motion.div layout className="mt-10 grid grid-cols-2 gap-2.5 sm:gap-4 md:mt-14 lg:grid-cols-4">
          <AnimatePresence mode="popLayout">
            {list.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} onOpen={setActive} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
      <ProductModal product={active} onClose={() => setActive(null)} />
    </section>
  )
}
