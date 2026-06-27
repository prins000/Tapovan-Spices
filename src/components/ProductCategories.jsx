import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { products, categories } from '../data/content'
import { ArrowRight } from 'lucide-react'

export default function ProductCategories({ onProductClick }) {
  const [active, setActive] = useState('all')
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 })

  const filtered = active === 'all' ? products : products.filter(p => p.category === active)

  return (
    <section id="products" className="pt-10 md:pt-12 pb-32 md:pb-44" style={{ background: '#FAF7F2' }}>
      <div className="max-w-6xl mx-auto px-6">

        {/* Section Header */}
        <div ref={ref} className="text-center mb-20">
          <motion.p 
            className="section-label mb-4"
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            Export Collection
          </motion.p>
          <motion.h2 
            className="section-title mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Premium Spice <span className="text-gold">Range</span>
          </motion.h2>
          <motion.p 
            className="text-base text-gray-600 max-w-2xl mx-auto text-center leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Discover our premium selection of natural spices, pulses, and seeds processed under global safety certifications for export markets.
          </motion.p>
        </div>

        {/* Category Filters */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-16"
          initial={{ opacity: 0, y: 15 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActive(cat.id)}
              className="px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 border cursor-pointer"
              style={{
                background: active === cat.id ? 'linear-gradient(135deg, #C9A454, #9C7A2E)' : 'white',
                color: active === cat.id ? 'white' : '#6B5B48',
                borderColor: active === cat.id ? 'transparent' : 'rgba(201,164,84,0.25)',
                boxShadow: active === cat.id ? '0 4px 15px rgba(201,164,84,0.25)' : 'none',
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
            className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            {filtered.map((p, i) => (
              <motion.div
                key={p.id}
                onClick={() => onProductClick(p)}
                className="rounded-2xl overflow-hidden bg-white group cursor-pointer border border-transparent hover:border-amber-100 flex flex-col h-full"
                style={{ boxShadow: '0 4px 20px rgba(42,31,20,0.04)' }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.02 * i, duration: 0.4 }}
                whileHover={{ 
                  y: -8, 
                  boxShadow: '0 12px 35px rgba(42,31,20,0.08)',
                  transition: { duration: 0.25 } 
                }}
              >
                {/* Visual Image Block: Vertical frame fitting the vertical pouch perfectly without margins */}
                <div className="aspect-[3/4] w-full overflow-hidden bg-stone-50 relative">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  {/* Subtle hover overlay */}
                  <div className="absolute inset-0 bg-stone-900/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Content Block */}
                <div className="p-6 flex-grow flex flex-col justify-between">
                  <div>
                    <span className="text-[0.6rem] font-bold uppercase tracking-widest text-[#9C7A2E] block mb-2">{p.category}</span>
                    <h3 className="font-serif text-lg font-bold text-gray-900 mb-1 leading-snug">{p.name}</h3>
                    <p className="font-serif-alt text-xs italic text-[#9A8B78] mb-4">{p.subtitle}</p>
                    
                    {/* Short description / specs list */}
                    <div className="flex flex-wrap gap-1 mb-2">
                      {p.description.split('|').map(tag => (
                        <span 
                          key={tag} 
                          className="px-2 py-0.5 rounded text-[9px] font-medium bg-stone-100 text-stone-600"
                        >
                          {tag.trim()}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-5 pt-3 border-t border-stone-100 flex items-center justify-center text-xs">
                    <span className="font-semibold text-[#9C7A2E] flex items-center gap-1 group-hover:translate-x-1 transition-transform duration-300">
                      View Product <ArrowRight size={12} />
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
