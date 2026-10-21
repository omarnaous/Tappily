import { useState } from 'react'
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import ProductVisual from './ProductVisual'
import { PlatformIcon } from './Brand'
import { SectionHeading } from './Reveal'
import ProductModal from './ProductModal'
import { useCart } from '../lib/cart'
import { categories, CURRENCY, PRICE, products } from '../data/site'

function ProductCard({ product, index, onOpen }) {
  const { add } = useCart()
  const [hover, setHover] = useState(false)
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.8, delay: (index % 4) * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="group"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className="relative cursor-pointer overflow-hidden rounded-3xl" onClick={() => onOpen(product)}>
        <div className="transition-transform duration-700 ease-(--ease-out-expo) group-hover:scale-[1.03]">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.div key={hover ? 'card' : 'stand'} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.45 }}>
              <ProductVisual product={product} format={hover ? 'card' : 'stand'} />
            </motion.div>
          </AnimatePresence>
        </div>
        {product.badge && (
          <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[10px] sm:left-4 sm:top-4 sm:px-3 sm:text-[11px] font-bold uppercase tracking-wider text-ink shadow-sm backdrop-blur">
            {product.badge}
          </span>
        )}
        <button
          onClick={(e) => {
            e.stopPropagation()
            add(product.id, 'stand')
          }}
          className="absolute bottom-3 right-3 flex h-10 w-10 translate-y-0 cursor-pointer items-center justify-center gap-2 rounded-full bg-ink text-sm sm:inset-x-4 sm:bottom-4 sm:h-auto sm:w-auto sm:py-3 font-semibold text-white opacity-100 shadow-lg transition-all duration-500 ease-(--ease-out-expo) hover:bg-brand md:translate-y-[130%] md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100"
          aria-label={`Quick add ${product.name} to cart`}
        >
          <Plus className="h-4 w-4" />
          <span className="hidden sm:inline">
            Quick add — {CURRENCY}
            {PRICE}
          </span>
        </button>
      </div>
      <div className="mt-3 flex flex-col gap-1 px-1 sm:mt-4 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
        <div>
          <h3 className="flex items-center gap-2 text-[15px] font-semibold leading-tight text-ink sm:text-[17px]">
            <PlatformIcon name={product.icon} className="h-4 w-4 text-ink/60" />
            <button className="cursor-pointer text-left hover:underline" onClick={() => onOpen(product)}>
              {product.name}
            </button>
          </h3>
          <p className="mt-1 hidden text-sm leading-snug text-muted sm:block">{product.short}</p>
        </div>
        <p className="shrink-0 text-[15px] font-semibold text-ink sm:text-[17px]">
          {CURRENCY}
          {PRICE}.00
        </p>
      </div>
    </motion.article>
  )
}

export default function Shop() {
  const [cat, setCat] = useState('all')
  const [active, setActive] = useState(null)
  const list = products.filter((p) => cat === 'all' || p.category === cat)

  return (
    <section id="shop" className="relative scroll-mt-24 bg-paper py-24 md:py-32">
      <div className="container-x">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="The collection"
            title="Pick your tap."
            text={`Every Tapilly tag is ${CURRENCY}${PRICE} — programmed with your link, branded with your name, delivered ready to use.`}
          />
          <LayoutGroup>
            <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 md:mx-0 md:flex-wrap md:justify-end md:px-0" role="tablist">
              {categories.map((c) => (
                <button
                  key={c.id}
                  role="tab"
                  aria-selected={cat === c.id}
                  onClick={() => setCat(c.id)}
                  className={`relative shrink-0 cursor-pointer rounded-full px-4 py-2.5 text-sm font-semibold transition-colors ${cat === c.id ? 'text-white' : 'text-ink/70 hover:text-ink'}`}
                >
                  {cat === c.id && (
                    <motion.span
                      layoutId="cat-pill"
                      className="absolute inset-0 rounded-full bg-ink"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}
                  {cat !== c.id && <span className="absolute inset-0 rounded-full border border-ink/12 bg-white" />}
                  <span className="relative">{c.label}</span>
                </button>
              ))}
            </div>
          </LayoutGroup>
        </div>

        <motion.div layout className="mt-10 grid grid-cols-2 gap-x-3 gap-y-10 sm:gap-x-6 sm:gap-y-12 md:mt-14 lg:grid-cols-4">
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
