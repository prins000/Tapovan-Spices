import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import useEmblaCarousel from 'embla-carousel-react'

const spotlightProducts = [
  {
    name: 'TURMERIC POWDER',
    subtitle: 'Haldi Powder',
    tagline: 'Pure | Natural | Rich in Curcumin',
    image: '/products/turmeric.jpeg',
    bgColor: 'linear-gradient(135deg, #2D1E0C 0%, #150E06 100%)',
    badge: 'High Curcumin'
  },
  {
    name: 'CUMIN SEED',
    subtitle: 'Whole Cumin Seeds',
    tagline: 'Rich Aroma | Premium Quality',
    image: '/products/cumin-seed.jpeg',
    bgColor: 'linear-gradient(135deg, #24281A 0%, #0F110B 100%)',
    badge: '99.5% Purity'
  },
  {
    name: 'CHILLI POWDER',
    subtitle: 'Red Chilli Powder',
    tagline: 'Bold Heat | Vibrant Color',
    image: '/products/chilli-powder.jpeg',
    bgColor: 'linear-gradient(135deg, #33120E 0%, #160706 100%)',
    badge: '100% Natural'
  },
  {
    name: 'BIG MUSTARD SEED',
    subtitle: 'Whole Big Mustard Seeds',
    tagline: 'High Quality | Strong Aroma',
    image: '/products/big-mustard-seed.jpeg',
    bgColor: 'linear-gradient(135deg, #1C1C1F 0%, #0C0C0D 100%)',
    badge: 'Machine Cleaned'
  },
  {
    name: 'CORIANDER POWDER',
    subtitle: 'Dhaniya Powder',
    tagline: 'Pure | Aromatic | No Additives',
    image: '/products/coriander-fine-powder.jpeg',
    bgColor: 'linear-gradient(135deg, #2C2518 0%, #13100A 100%)',
    badge: 'Sortex Quality'
  },
  {
    name: 'FENNEL SEED',
    subtitle: 'Saunf / Aniseed',
    tagline: 'Sweet Aroma | Digestive Quality',
    image: '/products/fennel-seed.jpeg',
    bgColor: 'linear-gradient(135deg, #1A281E 0%, #0B120D 100%)',
    badge: 'Aromatic Grade'
  }
]

export default function ProductSlider() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true, 
    align: 'start',
    slidesToScroll: 1
  })

  useEffect(() => {
    if (!emblaApi) return
    const interval = setInterval(() => {
      emblaApi.scrollNext()
    }, 3500)
    return () => clearInterval(interval)
  }, [emblaApi])

  return (
    <section ref={ref} className="py-28 md:py-36 overflow-hidden" style={{ background: '#FAF7F2' }}>
      <div className="max-w-6xl mx-auto px-6 mb-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <motion.p 
              className="section-label mb-4"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
            >
              Packaging Spotlight
            </motion.p>
            <motion.h2 
              className="section-title"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 }}
            >
              Designed for <span className="text-gold">Freshness</span>
            </motion.h2>
          </div>
          <motion.p 
            className="text-sm max-w-md" 
            style={{ color: '#6B5B48', lineHeight: 1.7 }}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
          >
            A closer look at our signature retail packaging pouches. Made with food-grade materials to lock in flavor, aroma, and natural oils.
          </motion.p>
        </div>
      </div>

      {/* Infinite Autoplay Slider */}
      <div className="px-6 md:px-12">
        <div className="embla" ref={emblaRef}>
          <div className="embla__container flex gap-6">
            {spotlightProducts.map((p, i) => (
              <div 
                key={p.name} 
                className="embla__slide flex-shrink-0"
                style={{ flex: '0 0 85%', maxWidth: '320px' }}
              >
                <div 
                  className="rounded-3xl p-8 flex flex-col justify-between relative overflow-hidden aspect-[3/4] border border-amber-900/10"
                  style={{ 
                    background: p.bgColor,
                    boxShadow: '0 12px 30px rgba(15,10,5,0.2)'
                  }}
                >
                  {/* Subtle Gold Leaf Pattern Overlay */}
                  <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
                    style={{
                      backgroundImage: 'radial-gradient(circle at 1px 1px, #C9A454 1px, transparent 0)',
                      backgroundSize: '24px 24px'
                    }}
                  />
                  
                  {/* Decorative gold vector line */}
                  <div className="absolute inset-x-6 top-6 h-px bg-gradient-to-r from-transparent via-[#C9A454]/40 to-transparent" />
                  <div className="absolute inset-x-6 bottom-20 h-px bg-gradient-to-r from-transparent via-[#C9A454]/40 to-transparent" />

                  {/* Header Monogram */}
                  <div className="flex justify-between items-center z-10">
                    <div className="flex items-center gap-1.5">
                      <div className="w-6 h-6 rounded-full border border-[#C9A454]/50 flex items-center justify-center">
                        <span className="text-[9px] font-serif font-bold text-[#E2C47A]">T</span>
                      </div>
                      <span className="text-[7px] tracking-[0.25em] uppercase text-[#E2C47A]">Tapovan</span>
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full text-[8px] font-bold uppercase tracking-wider bg-[#C9A454]/15 text-[#E2C47A] border border-[#C9A454]/30">
                      {p.badge}
                    </span>
                  </div>

                  {/* Centered Product Pouch Image */}
                  <div className="my-auto flex items-center justify-center z-10 transform hover:scale-105 transition-transform duration-500">
                    <img 
                      src={p.image} 
                      alt={p.name}
                      className="h-44 w-auto object-contain rounded-xl shadow-lg border border-[#C9A454]/10"
                    />
                  </div>

                  {/* Packaging Details & Text */}
                  <div className="z-10 text-center">
                    <h3 className="font-serif text-base font-bold tracking-wider text-[#FAF7F2] mb-0.5">{p.name}</h3>
                    <p className="text-[10px] text-[#C9A454] tracking-widest uppercase font-serif-alt italic mb-2">{p.subtitle}</p>
                    <p className="text-[9px] text-[#9A8B78] uppercase tracking-wider">{p.tagline}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
