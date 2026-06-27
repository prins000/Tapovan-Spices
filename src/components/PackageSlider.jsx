import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import useEmblaCarousel from 'embla-carousel-react'

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

export default function PackageSlider() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'center',
    slidesToScroll: 1
  })

  useEffect(() => {
    if (!emblaApi) return
    const interval = setInterval(() => {
      emblaApi.scrollNext()
    }, 4000)
    return () => clearInterval(interval)
  }, [emblaApi])

  return (
    <section ref={ref} className="pt-10 md:pt-12 pb-6 overflow-hidden" style={{ background: '#FAF7F2' }}>
      <div className="max-w-6xl mx-auto px-6 mb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <motion.p 
              className="section-label mb-3"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
            >
              Packaging Showcase
            </motion.p>
            <motion.h2 
              className="section-title"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 }}
            >
              Our Signature <span className="text-gold">Pouch Series</span>
            </motion.h2>
          </div>
          <motion.p 
            className="text-sm max-w-sm" 
            style={{ color: '#6B5B48', lineHeight: 1.7 }}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
          >
            A look at our premium export packaging pouches. Designed to preserve natural oils, color, and intense flavor.
          </motion.p>
        </div>
      </div>

      {/* Infinite Autoplay Slider */}
      <div className="px-6 md:px-12">
        <div className="embla" ref={emblaRef}>
          <div className="embla__container flex gap-6">
            {packageProducts.map((p, i) => (
              <div 
                key={p.name} 
                className="embla__slide flex-shrink-0 w-full sm:w-[320px] px-3"
              >
                {/* Full-bleed card container using the product/field image as background */}
                <div 
                  className="mx-auto max-w-[280px] sm:max-w-none rounded-3xl flex flex-col justify-between relative overflow-hidden aspect-[1/1.4] border border-[#C9A454]/25 shadow-lg group"
                  style={{ background: '#1A1917' }}
                >
                  {/* Full-bleed Product + Field Image */}
                  <img 
                    src={p.image} 
                    alt={p.name}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  {/* Gradient overlays for high text readability */}
                  <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/60 via-black/20 to-transparent pointer-events-none z-10" />
                  <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black/80 via-black/30 to-transparent pointer-events-none z-10" />

                  {/* Shiny laminate packaging reflection effect */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 opacity-30 pointer-events-none z-10" />

                  {/* Official Brand Logo */}
                  <div className="flex justify-between items-center z-20 p-6">
                    <img 
                      src="/logo.png" 
                      alt="Tapovan Spices" 
                      className="h-7 w-auto object-contain"
                      style={{ filter: 'invert(1) brightness(1.8)' }}
                    />
                    
                    <span className="px-2.5 py-0.5 rounded-full text-[8px] font-bold uppercase tracking-wider bg-black/40 text-[#E2C47A] border border-[#C9A454]/30 backdrop-blur-sm">
                      {p.badge}
                    </span>
                  </div>

                  {/* Empty middle space so the printed pouch in the image remains fully visible */}
                  <div className="flex-grow z-10" />

                  {/* Package Typography Caption Overlay */}
                  <div className="text-center z-20 p-6">
                    <h3 className="font-serif text-lg font-bold tracking-wider text-[#E2C47A] mb-0.5 drop-shadow-md">{p.name}</h3>
                    <p className="text-[8px] text-[#FAF7F2] tracking-[0.2em] uppercase font-sans mb-1 drop-shadow-sm">{p.subtitle}</p>
                    <p className="text-[7px] text-[#9A8B78] uppercase tracking-widest mb-3 drop-shadow-sm">FROM INDIA TO THE WORLD</p>
                    
                    {/* Bottom spec bar */}
                    <div className="text-[7px] text-[#E2C47A] border-t border-[#C9A454]/30 pt-2.5 tracking-widest uppercase font-sans drop-shadow-sm">
                      {p.tagline}
                    </div>
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
