import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const certLogos = [
  { name: 'FSSAI',              src: '/cert-logos/fssai.jpg' },
  { name: 'APMC UNJHA',         src: '/cert-logos/apmc.webp' },
  { name: 'FDA',                src: '/cert-logos/fda.jpg' },
  { name: 'Spices Board India', src: '/cert-logos/spices-board.jpg' },
  { name: 'APEDA',              src: '/cert-logos/apeda.png' },
  { name: 'ISO 9001:2015',      src: '/cert-logos/iso.jpg' },
]

export default function Certifications() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 })

  return (
    <section id="certifications" className="py-28 md:py-36" style={{ background: '#F2EDE3' }}>
      <div ref={ref} className="max-w-5xl mx-auto px-6">

        <div className="text-center mb-16">
          <motion.p className="section-label mb-4" initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}>
            Quality Assured
          </motion.p>
          <motion.h2
            className="section-title"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
          >
            Our <span className="text-gold">Certifications</span>
          </motion.h2>
        </div>

        {/* Six logos in a single row — no background container */}
        <div className="flex flex-wrap items-center justify-center gap-6">
          {certLogos.map((cert, i) => (
            <motion.div
              key={cert.name}
              className="flex items-center justify-center rounded-2xl bg-white"
              style={{
                width: '130px',
                height: '104px',
                boxShadow: '0 4px 20px rgba(42,31,20,0.10)',
                border: '1.5px solid rgba(201,164,84,0.20)',
              }}
              initial={{ opacity: 0, y: 18 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 + i * 0.08 }}
            >
              <img
                src={cert.src}
                alt={cert.name}
                className="object-contain p-3"
                style={{ maxWidth: '106px', maxHeight: '84px' }}
                loading="lazy"
              />
            </motion.div>
          ))}
        </div>

        {/* Bottom stats */}
        <motion.div
          className="mt-16 rounded-2xl p-10 text-center"
          style={{ background: '#2A1F14' }}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
        >
          <div className="flex flex-wrap justify-center gap-12 md:gap-20">
            {[
              { val: '100%', label: 'Natural' },
              { val: '0',    label: 'Preservatives' },
              { val: '6',    label: 'Certifications' },
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
