import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const packageProducts = [
  { id: 1,  image: '/slidebar/c1.jpeg' },
  { id: 2,  image: '/slidebar/c2.jpeg' },
  { id: 3,  image: '/slidebar/c3.jpeg' },
  { id: 5,  image: '/slidebar/c5.jpeg' },
  { id: 6,  image: '/slidebar/c6.jpeg' },
  { id: 7,  image: '/slidebar/c7.jpeg' },
  { id: 8,  image: '/slidebar/c8.jpeg' },
  { id: 9,  image: '/slidebar/c9.jpeg' },
  { id: 10, image: '/slidebar/c10.jpeg' },
  { id: 11, image: '/slidebar/c11.jpeg' },
  { id: 12, image: '/slidebar/c12.jpeg' },
  { id: 13, image: '/slidebar/c13.jpeg' },
  { id: 14, image: '/slidebar/c14.jpeg' },
  { id: 15, image: '/slidebar/c15.jpeg' },
  { id: 16, image: '/slidebar/c16.jpeg' },
  { id: 17, image: '/slidebar/c17.jpeg' },
  { id: 18, image: '/slidebar/c18.jpeg' },
  { id: 19, image: '/slidebar/c19.jpeg' },
  { id: 20, image: '/slidebar/c20.jpeg' },
  
]

function ProductCard({ p }) {
  return (
    <div
      className="flex-shrink-0 rounded-3xl overflow-hidden"
      style={{ aspectRatio: '1 / 1.4', width: '240px' }}
    >
      <img
        src={p.image}
        alt={`Product ${p.id}`}
        className="w-full h-full object-cover"
        loading="lazy"
      />
    </div>
  )
}

export default function PackageSlider() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section ref={ref} className="pt-10 md:pt-12 pb-6" style={{ background: '#FAF7F2' }}>
      <div className="max-w-6xl mx-auto px-6 mb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <motion.p
              className="section-label mb-3"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
            >
              Our Products
            </motion.p>
            <motion.h2
              className="section-title"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 }}
            >
              Our <span className="text-gold">Premium Collection</span>
            </motion.h2>
          </div>
          <motion.p
            className="text-sm max-w-sm"
            style={{ color: '#6B5B48', lineHeight: 1.7 }}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
          >
            Discover our range of premium Indian spices and products. Carefully sourced, hygienically processed, and export-ready.
          </motion.p>
        </div>
      </div>

      {/* Pure CSS infinite marquee — smoothest possible on mobile */}
      <div className="marquee-wrapper">
        {/* marquee-track contains TWO copies of the list so it loops seamlessly */}
        <div className="marquee-track" style={{ gap: '16px' }}>
          {packageProducts.map((p) => (
            <ProductCard key={`a-${p.id}`} p={p} />
          ))}
          {packageProducts.map((p) => (
            <ProductCard key={`b-${p.id}`} p={p} />
          ))}
        </div>
      </div>
    </section>
  )
}
