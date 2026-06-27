import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

export default function Mission() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 })

  return (
    <section ref={ref} className="py-24 md:py-32" style={{ background: '#FAF7F2' }}>
      <div className="max-w-5xl mx-auto px-6">
        
        {/* Mission Cards - 3 cols, clean */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-16">
            <p className="section-label mb-3">Our Mission</p>
            <h3 className="section-title">
              Quality <span className="text-gold">Without Compromise</span>
            </h3>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                title: 'Direct Sourcing', 
                desc: 'We work closely with farmers and cooperatives, ensuring fair wages and sustainable practices.' 
              },
              { 
                title: 'Small-Batch Milling', 
                desc: 'Processing in small batches to lock in the aroma, color, and potency.' 
              },
              { 
                title: 'Transparency', 
                desc: 'From the soil to the jar, we want you to know exactly where your ingredients come from.' 
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                className="p-8 rounded-3xl text-center border border-stone-200/30 flex flex-col justify-between"
                style={{ background: 'white', boxShadow: '0 4px 20px rgba(42,31,20,0.03)' }}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.15 + i * 0.08, duration: 0.5 }}
                whileHover={{ y: -6, boxShadow: '0 8px 30px rgba(42,31,20,0.06)' }}
              >
                <div>
                  <h4 className="font-serif text-lg font-bold mb-4" style={{ color: '#2A1F14' }}>{item.title}</h4>
                  <p className="text-sm leading-relaxed" style={{ color: '#6B5B48' }}>{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  )
}
