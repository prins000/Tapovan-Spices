import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { faqs } from '../data/content'
import { ChevronDown } from 'lucide-react'

export default function FAQ() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 })
  const [open, setOpen] = useState(0)

  return (
    <section className="py-28 md:py-36" style={{ background: '#FAF7F2' }}>
      <div ref={ref} className="max-w-3xl mx-auto px-6">

        <div className="text-center mb-14">
          <motion.p className="section-label mb-4" initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}>
            FAQ
          </motion.p>
          <motion.h2 className="section-title" initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 }}>
            Common <span className="text-gold">Questions</span>
          </motion.h2>
        </div>

        <motion.div
          className="rounded-2xl bg-white p-6 md:p-8"
          style={{ boxShadow: '0 2px 20px rgba(42,31,20,0.06)' }}
          initial={{ opacity: 0, y: 15 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
        >
          {faqs.map((faq, i) => (
            <div key={i} style={{ borderBottom: i < faqs.length - 1 ? '1px solid rgba(201,164,84,0.15)' : 'none' }}>
              <button
                onClick={() => setOpen(open === i ? -1 : i)}
                className="w-full flex items-center justify-between py-5 text-left bg-transparent border-none cursor-pointer gap-4"
              >
                <span className="font-serif text-base font-semibold" style={{ color: open === i ? '#9C7A2E' : '#2A1F14' }}>
                  {faq.q}
                </span>
                <motion.div animate={{ rotate: open === i ? 180 : 0 }} transition={{ duration: 0.25 }} className="flex-shrink-0">
                  <ChevronDown size={18} style={{ color: '#C9A454' }} />
                </motion.div>
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="pb-5 text-sm leading-relaxed" style={{ color: '#6B5B48' }}>{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
