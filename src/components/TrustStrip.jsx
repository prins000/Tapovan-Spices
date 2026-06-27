import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ShieldCheck, Leaf, Award, Globe, FlaskConical, Star } from 'lucide-react'

const badges = [
  { icon: Leaf, label: '100% Natural' },
  { icon: ShieldCheck, label: 'FSSAI Certified' },
  { icon: Award, label: 'ISO 9001:2015' },
  { icon: FlaskConical, label: 'HACCP Certified' },
  { icon: Globe, label: 'APEDA Registered' },
  { icon: Star, label: 'Export Quality' },
]

export default function TrustStrip() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 })

  return (
    <section ref={ref} className="py-6" style={{ background: '#2A1F14' }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
          {badges.map((b, i) => {
            const Icon = b.icon
            return (
              <motion.div
                key={b.label}
                className="flex items-center gap-2"
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: i * 0.06 }}
              >
                <Icon size={14} style={{ color: '#C9A454' }} />
                <span className="text-xs font-medium" style={{ color: '#E2C47A', letterSpacing: '0.04em' }}>{b.label}</span>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
