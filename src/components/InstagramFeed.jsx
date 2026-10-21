import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { PlatformIcon } from './Brand'
import { Reveal } from './Reveal'
import { asset, contact, instagramPosts } from '../data/site'

export default function InstagramFeed() {
  return (
    <section className="bg-white py-24 md:py-32">
      <div className="container-x">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <Reveal>
            <span className="eyebrow">
              <PlatformIcon name="instagram" className="h-3.5 w-3.5" /> @{contact.instagram}
            </span>
            <h2 className="h-display mt-4 text-[clamp(2.4rem,5.4vw,4.6rem)]">Tap. Connect. Grow.</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <a href={contact.instagramUrl} target="_blank" rel="noreferrer" className="btn-ghost group">
              Follow on Instagram <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </Reveal>
        </div>
        <div className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
          {instagramPosts.map((src, i) => (
            <motion.a
              key={src}
              href={contact.instagramUrl}
              target="_blank"
              rel="noreferrer"
              className="group relative aspect-[4/5] overflow-hidden rounded-2xl bg-mist"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
            >
              <img
                src={asset(src)}
                alt="Tapilly Instagram post"
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <span className="absolute inset-0 grid place-items-center bg-ink/0 text-white opacity-0 transition-all duration-300 group-hover:bg-ink/45 group-hover:opacity-100">
                <PlatformIcon name="instagram" className="h-8 w-8" />
              </span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}
