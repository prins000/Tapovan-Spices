import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const packageProducts = [
  {
    name: 'CAROM SEEDS',
    subtitle: 'AJWAIN',
    tagline: 'Aromatic | Medicinal | 100% Natural',
    image: '/products/carom-seeds-ajwain.jpeg',
    badge: 'Premium Grade'
  },
  {
    name: 'CUMIN SEED',
    subtitle: 'WHOLE CUMIN SEEDS',
    tagline: 'Rich Aroma | Premium Quality | 100% Natural',
    image: '/products/cumin-seed.jpeg',
    badge: '99.5% Purity'
  },
  {
    name: 'TURMERIC',
    subtitle: 'SELECTED TURMERIC FINGERS',
    tagline: 'Pure | Natural | Rich in Curcumin',
    image: '/products/turmeric.jpeg',
    badge: 'High Curcumin'
  },
  {
    name: 'CHILLI POWDER',
    subtitle: 'RED CHILLI POWDER',
    tagline: 'Bold Heat | Vibrant Color | Pure & Fresh',
    image: '/products/chilli-powder.jpeg',
    badge: '100% Natural'
  },
  {
    name: 'BIG MUSTARD SEED',
    subtitle: 'WHOLE BIG MUSTARD SEEDS',
    tagline: 'High Quality | Strong Aroma | 100% Natural',
    image: '/products/big-mustard-seed.jpeg',
    badge: 'Machine Cleaned'
  },
  {
    name: 'CORIANDER SEED',
    subtitle: 'WHOLE CORIANDER SEEDS',
    tagline: 'Fresh | Cleaned | Superior Quality',
    image: '/products/coriander-whole-seeds.jpeg',
    badge: 'Sortex Quality'
  },
  {
    name: 'FENNEL SEED',
    subtitle: 'ANISEED / SAUNF',
    tagline: 'Sweet Aroma | Digestive | Premium Quality',
    image: '/products/fennel-seed.jpeg',
    badge: 'Aromatic Grade'
  }
]

function ProductCard({ p }) {
  return (
    <div
      className="flex-shrink-0 rounded-3xl overflow-hidden"
      style={{ aspectRatio: '1 / 1.4', width: '240px' }}
    >
      {/* Full-bleed Product Image — no overlays, no text */}
      <img
        src={p.image}
        alt={p.name}
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
            <ProductCard key={`a-${p.name}`} p={p} />
          ))}
          {packageProducts.map((p) => (
            <ProductCard key={`b-${p.name}`} p={p} />
          ))}
        </div>
      </div>
    </section>
  )
}
