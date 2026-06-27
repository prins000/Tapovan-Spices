import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { CheckCircle2 } from 'lucide-react'

const sizes = ['100g', '200g', '250g', '400g', '1 Kg', 'Bulk']

export default function Packaging() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 })

  return (
    <section className="py-28 md:py-36" style={{ background: '#F2EDE3' }}>
      <div ref={ref} className="max-w-5xl mx-auto px-6">

        <div className="text-center mb-16">
          <motion.p className="section-label mb-4" initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}>
            Packaging
          </motion.p>
          <motion.h2 className="section-title" initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 }}>
            Flexible <span className="text-gold">Packaging Solutions</span>
          </motion.h2>
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-start">
          {/* Sizes */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.2 }}>
            <h3 className="font-serif text-xl font-bold mb-8" style={{ color: '#2A1F14' }}>Available Sizes</h3>
            <div className="grid grid-cols-3 gap-3 mb-10">
              {sizes.map((s, i) => (
                <motion.div
                  key={s}
                  className="p-5 rounded-xl text-center bg-white"
                  style={{ boxShadow: '0 2px 16px rgba(42,31,20,0.05)' }}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.25 + i * 0.05 }}
                >
                  <div className="font-serif text-lg font-bold" style={{ color: '#2A1F14' }}>{s}</div>
                </motion.div>
              ))}
            </div>

            <p className="text-sm mb-6" style={{ color: '#6B5B48' }}>
              Custom sizes available as per customer requirement.
            </p>
          </motion.div>

          {/* Features */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.3 }}>
            <h3 className="font-serif text-xl font-bold mb-8" style={{ color: '#2A1F14' }}>Packaging Features</h3>
            <div className="space-y-5">
              {[
                'High Quality, Food Grade Packaging',
                'Available in Pouches & Bulk Packaging',
                'Customized Packaging Available as per Customer Requirement',
                'Safe, Hygienic & Long Shelf Life',
                'Export-compliant labeling and packaging',
              ].map((f, i) => (
                <motion.div
                  key={f}
                  className="flex items-start gap-3"
                  initial={{ opacity: 0, x: 15 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.35 + i * 0.06 }}
                >
                  <CheckCircle2 size={16} className="flex-shrink-0 mt-0.5" style={{ color: '#C9A454' }} />
                  <span className="text-sm" style={{ color: '#6B5B48' }}>{f}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
