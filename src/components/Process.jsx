import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { processSteps } from '../data/content'

export default function Process() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 })

  return (
    <section id="process" className="py-28 md:py-36" style={{ background: '#FAF7F2' }}>
      <div ref={ref} className="max-w-5xl mx-auto px-6">

        <div className="text-center mb-20">
          <motion.p className="section-label mb-4" initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}>
            Our Process
          </motion.p>
          <motion.h2 className="section-title" initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 }}>
            From Farm to <span className="text-gold">Your Table</span>
          </motion.h2>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-8">
          {processSteps.map((step, i) => (
            <motion.div
              key={step.step}
              className="text-center p-8"
              initial={{ opacity: 0, y: 25 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.15 + i * 0.08, duration: 0.5 }}
            >
              {/* Number */}
              <div className="text-5xl mb-4">{step.icon}</div>
              <div className="text-xs font-bold tracking-widest mb-2" style={{ color: '#C9A454' }}>STEP {step.step}</div>
              <h4 className="font-serif text-lg font-bold mb-3" style={{ color: '#2A1F14' }}>{step.title}</h4>
              <p className="text-sm leading-relaxed" style={{ color: '#6B5B48' }}>{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
