import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { whyChoose } from '../data/content'

export default function WhyChoose() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 })

  return (
    <section className="py-28 md:py-36" style={{ background: '#F2EDE3' }}>
      <div ref={ref} className="max-w-5xl mx-auto px-6">

        <div className="text-center mb-16">
          <motion.p className="section-label mb-4" initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}>
            Why Tapovan
          </motion.p>
          <motion.h2 className="section-title" initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 }}>
            Why Choose <span className="text-gold">Tapovan Spices?</span>
          </motion.h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {whyChoose.map((item, i) => (
            <motion.div
              key={item.title}
              className="p-8 rounded-2xl bg-white"
              style={{ boxShadow: '0 2px 20px rgba(42,31,20,0.05)' }}
              initial={{ opacity: 0, y: 25 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 + i * 0.08, duration: 0.5 }}
            >
              <h3 className="font-serif text-lg font-bold mb-3" style={{ color: '#2A1F14' }}>{item.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: '#6B5B48' }}>{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
