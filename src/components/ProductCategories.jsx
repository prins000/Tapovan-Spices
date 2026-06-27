import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { products, categories } from '../data/content'

export default function ProductCategories() {
  const [active, setActive] = useState('all')
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const filtered = active === 'all' ? products : products.filter(p => p.category === active)

  return (
    <section id="products" className="py-28 md:py-36" style={{ background: '#FAF7F2' }}>
      <div className="max-w-6xl mx-auto px-6">

        {/* Header */}
        <div ref={ref} className="text-center mb-16">
          <motion.p className="section-label mb-4" initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}>
            Our Products
          </motion.p>
          <motion.h2 className="section-title mb-5" initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 }}>
            Premium Spice <span className="text-gold">Range</span>
          </motion.h2>
          <motion.p className="section-desc mx-auto text-center" initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.2 }}>
            100% natural. No artificial colors. No preservatives. Freshly ground & packed for maximum freshness.
          </motion.p>
        </div>

        {/* Category Filter */}
        <motion.div
          className="flex flex-wrap justify-center gap-2 mb-14"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.25 }}
        >
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActive(cat.id)}
              className="px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 border cursor-pointer"
              style={{
                background: active === cat.id ? 'linear-gradient(135deg, #C9A454, #9C7A2E)' : 'white',
                color: active === cat.id ? 'white' : '#6B5B48',
                borderColor: active === cat.id ? 'transparent' : 'rgba(201,164,84,0.25)',
              }}
            >
              {cat.name}
            </button>
          ))}
        </motion.div>

        {/* Product Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {filtered.map((p, i) => (
              <motion.div
                key={p.id}
                className="rounded-2xl overflow-hidden bg-white group"
                style={{ boxShadow: '0 2px 16px rgba(42,31,20,0.06)' }}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.03 * i, duration: 0.4 }}
                whileHover={{ y: -4, boxShadow: '0 8px 30px rgba(42,31,20,0.12)', transition: { duration: 0.25 } }}
              >
                {/* Image */}
                <div className="aspect-square overflow-hidden">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>

                {/* Info */}
                <div className="p-5">
                  <p className="text-[0.65rem] tracking-[0.15em] uppercase mb-1" style={{ color: '#9A8B78' }}>{p.subtitle}</p>
                  <h3 className="font-serif text-base font-bold mb-1.5" style={{ color: '#2A1F14' }}>{p.name}</h3>
                  <p className="text-xs leading-relaxed" style={{ color: '#6B5B48' }}>{p.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
