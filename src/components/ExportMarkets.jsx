import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { exportMarkets, exportDetails } from '../data/content'

export default function ExportMarkets() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 })

  return (
    <section id="export" className="py-28 md:py-36" style={{ background: '#2A1F14' }}>
      <div ref={ref} className="max-w-5xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-16">
          <motion.p className="section-label mb-4" style={{ color: '#C9A454' }} initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}>
            Global Reach
          </motion.p>
          <motion.h2
            className="font-serif text-4xl md:text-5xl font-bold mb-5"
            style={{ color: '#FAF7F2', lineHeight: 1.12 }}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
          >
            Exporting <span className="text-gold">Worldwide</span>
          </motion.h2>
          <motion.p className="text-base mx-auto max-w-md" style={{ color: '#9A8B78', lineHeight: 1.7 }} initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.2 }}>
            Bringing authentic Indian spices to your table — from Malaysia to Latin America.
          </motion.p>
        </div>

        {/* Countries */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-16">
          {exportMarkets.map((m, i) => (
            <motion.div
              key={m.country}
              className="p-5 rounded-xl text-center"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(201,164,84,0.15)' }}
              initial={{ opacity: 0, y: 15 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 + i * 0.06 }}
            >
              <div>
                <div className="font-serif font-bold text-base" style={{ color: '#FAF7F2' }}>{m.country}</div>
                <div className="text-xs mt-1" style={{ color: '#9A8B78' }}>{m.region}</div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Export Details Grid */}
        <motion.div
          className="rounded-2xl p-8 md:p-10"
          style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(201,164,84,0.15)' }}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
        >
          <h3 className="font-serif text-xl font-bold mb-8 text-center" style={{ color: '#FAF7F2' }}>
            Export <span className="text-gold">Details</span>
          </h3>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {exportDetails.map(d => (
              <div key={d.label}>
                <div className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: '#C9A454' }}>{d.label}</div>
                <div className="text-sm" style={{ color: '#E2C47A' }}>{d.value}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
