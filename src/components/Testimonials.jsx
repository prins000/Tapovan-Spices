import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { testimonials } from '../data/content'
import { Star } from 'lucide-react'

export default function Testimonials() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section className="py-28 md:py-36" style={{ background: '#2A1F14' }}>
      <div ref={ref} className="max-w-4xl mx-auto px-6">

        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.p 
            className="section-label mb-4" 
            style={{ color: '#C9A454' }}
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            Testimonials
          </motion.p>
          <motion.h2
            className="font-serif text-3xl md:text-4xl font-bold"
            style={{ color: '#FAF7F2', lineHeight: 1.15 }}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Trusted <span className="text-gold">Worldwide</span>
          </motion.h2>
        </div>

        {/* Testimonials Static Vertical Stack (Old Design, No Cards) */}
        <div className="space-y-16" style={{ background: '#2A1F14' }}>
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              className="text-center px-4 md:px-12 py-8 border-b border-stone-800/40 last:border-b-0"
              style={{ background: '#2A1F14' }}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15 }}
            >
              {/* Stars */}
              <div className="flex justify-center gap-1 mb-6">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} size={16} fill="#C9A454" color="#C9A454" />
                ))}
              </div>

              {/* Quote */}
              <p 
                className="text-lg md:text-xl leading-relaxed italic mb-6" 
                style={{ 
                  color: '#E8E0D0', 
                  fontFamily: 'Cormorant Garamond, serif', 
                  fontSize: '1.375rem' 
                }}
              >
                "{t.quote}"
              </p>

              {/* Author */}
              <div className="font-serif font-bold text-base" style={{ color: '#FAF7F2' }}>
                {t.name}
              </div>
              <div className="text-sm mt-1" style={{ color: '#9A8B78' }}>
                {t.title}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
