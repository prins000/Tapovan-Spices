import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { certifications } from '../data/content'

export default function Certifications() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 })

  return (
    <section id="certifications" className="py-28 md:py-36" style={{ background: '#F2EDE3' }}>
      <div ref={ref} className="max-w-5xl mx-auto px-6">

        <div className="text-center mb-16">
          <motion.p className="section-label mb-4" initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}>
            Quality Assured
          </motion.p>
          <motion.h2 className="section-title" initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 }}>
            Our <span className="text-gold">Certifications</span>
          </motion.h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {certifications.map((cert, i) => (
            <motion.div
              key={cert.name}
              className="p-8 rounded-2xl bg-white text-center"
              style={{ boxShadow: '0 2px 20px rgba(42,31,20,0.06)' }}
              initial={{ opacity: 0, y: 25 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 + i * 0.08 }}
            >
              <div className="font-serif text-2xl font-bold mb-2" style={{ color: '#2A1F14' }}>{cert.name}</div>
              <p className="text-xs leading-relaxed mb-2" style={{ color: '#6B5B48' }}>{cert.fullName}</p>
              {cert.licNo && (
                <p className="text-[0.65rem]" style={{ color: '#9A8B78' }}>{cert.licNo}</p>
              )}
            </motion.div>
          ))}
        </div>

        {/* Bottom stats */}
        <motion.div
          className="mt-16 rounded-2xl p-10 text-center"
          style={{ background: '#2A1F14' }}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
        >
          <div className="flex flex-wrap justify-center gap-12 md:gap-20">
            {[
              { val: '100%', label: 'Natural' },
              { val: '0', label: 'Preservatives' },
              { val: '4', label: 'Certifications' },
            ].map(s => (
              <div key={s.label} className="text-center">
                <div className="font-serif text-3xl font-bold text-gold mb-1">{s.val}</div>
                <div className="text-xs" style={{ color: '#9A8B78' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
