import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

export default function About() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 })

  return (
    <section id="about" ref={ref} className="pt-28 md:pt-36 pb-10 md:pb-12" style={{ background: '#FAF7F2' }}>
      <div className="max-w-5xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-20">
          <motion.p className="section-label mb-4" initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}>
            Our Story
          </motion.p>
          <motion.h2
            className="section-title mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
          >
            Bringing the World <br /><span className="text-gold">to Your Kitchen</span>
          </motion.h2>
        </div>

        {/* Content - clean split */}
        <div className="grid md:grid-cols-2 gap-16 items-start mb-24">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <div className="rounded-2xl overflow-hidden aspect-[4/3]" style={{ boxShadow: '0 8px 40px rgba(42,31,20,0.12)' }}>
              <img src="/spices-branding.png" alt="Tapovan Spices - Premium Indian Spices" className="w-full h-full object-cover" loading="lazy" />
            </div>
          </motion.div>

          {/* Text */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <p className="text-lg leading-relaxed" style={{ color: '#6B5B48' }}>
              At Tapovan Spices, we believe that the soul of every great meal lies in the spice rack. It is where memories are created, cultures are shared, and everyday cooking turns into a masterpiece.
            </p>
            <p className="text-base leading-relaxed" style={{ color: '#6B5B48' }}>
              We bring you the rich aroma, vibrant colors and authentic taste of India's finest spices. Carefully sourced, hygienically processed and packed with love — to add magic to your meals.
            </p>
            <p className="text-base leading-relaxed" style={{ color: '#6B5B48' }}>
              Our journey began in <strong style={{ color: '#2A1F14' }}>2017</strong> with a simple, singular vision: to bring the freshest, most vibrant spices directly from the source to your home. What started in a small shop has grown into a passion project dedicated to quality, authenticity, and flavor.
            </p>

            {/* Quote */}
            <div className="mt-8 pl-6" style={{ borderLeft: '2px solid #C9A454' }}>
              <p className="italic text-base" style={{ color: '#9C7A2E', fontFamily: 'Cormorant Garamond, serif', fontSize: '1.125rem' }}>
                "At Tapovan Spices, we believe that a pinch of the right spice can change everything. Our mission is to empower your kitchen, ignite your creativity, and ensure that every meal you serve tells a story."
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
