import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import useEmblaCarousel from 'embla-carousel-react'

const packageProducts = [
  {
    name: 'CUMIN SEED',
    subtitle: 'WHOLE CUMIN SEEDS',
    hindi: 'JEERA',
    tagline: 'Rich Aroma | Premium Quality | 100% Natural',
    image: '/products/cumin-seed.jpeg',
    pouchColor: '#1A1917', // Elegant matte charcoal black
  },
  {
    name: 'TURMERIC POWDER',
    subtitle: 'HALDI POWDER',
    hindi: 'HALDI',
    tagline: 'Pure | Natural | Rich in Curcumin',
    image: '/products/turmeric.jpeg',
    pouchColor: '#1A1917',
  },
  {
    name: 'CHILLI POWDER',
    subtitle: 'RED CHILLI POWDER',
    hindi: 'LAL MIRCH',
    tagline: 'Bold Heat | Vibrant Color | Pure & Fresh',
    image: '/products/chilli-powder.jpeg',
    pouchColor: '#1A1917',
  },
  {
    name: 'BIG MUSTARD SEED',
    subtitle: 'WHOLE BIG MUSTARD SEEDS',
    hindi: 'RAI',
    tagline: 'High Quality | Strong Aroma | 100% Natural',
    image: '/products/big-mustard-seed.jpeg',
    pouchColor: '#1A1917',
  },
  {
    name: 'CORIANDER SEED',
    subtitle: 'WHOLE CORIANDER SEEDS',
    hindi: 'DHANIYA',
    tagline: 'Fresh | Cleaned | Superior Quality',
    image: '/products/coriander-whole-seeds.jpeg',
    pouchColor: '#1A1917',
  },
  {
    name: 'FENNEL SEED',
    subtitle: 'ANISEED / SAUNF',
    hindi: 'SAUNF',
    tagline: 'Sweet Aroma | Digestive | Premium Quality',
    image: '/products/fennel-seed.jpeg',
    pouchColor: '#1A1917',
  }
]

export default function PackageSlider() {
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
    }, 4000)
    return () => clearInterval(interval)
  }, [emblaApi])

  return (
    <section ref={ref} className="py-24 md:py-32 overflow-hidden" style={{ background: '#FAF7F2' }}>
      <div className="max-w-6xl mx-auto px-6 mb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <motion.p 
              className="section-label mb-3"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
            >
              Packaging Design
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
            A virtual showcase of our premium export-ready packages. Designed to preserve natural oils, color, and intense flavor.
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
                className="embla__slide flex-shrink-0"
                style={{ flex: '0 0 85%', maxWidth: '300px' }}
              >
                {/* Virtual stand-up pouch container mimicking catalog style */}
                <div 
                  className="rounded-3xl p-6 flex flex-col justify-between relative overflow-hidden aspect-[1/1.5] border-2 border-[#C9A454]/25 shadow-lg group"
                  style={{ 
                    background: p.pouchColor,
                  }}
                >
                  {/* Subtle Gold Botanical Line Art (CSS generated leaf motifs) */}
                  <div className="absolute inset-0 opacity-[0.08] pointer-events-none mix-blend-screen"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cpath d='M10 30 C 20 20, 40 20, 50 40 C 40 50, 20 50, 10 30 Z M50 40 C 60 20, 80 20, 90 30 C 90 50, 70 50, 50 40 Z M50 40 L 50 90' stroke='%23C9A454' stroke-width='1' fill='none'/%3E%3C/svg%3E")`,
                      backgroundSize: '120px 120px'
                    }}
                  />

                  {/* Shiny laminate packaging effect */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 opacity-30 pointer-events-none" />

                  {/* Brand Monogram Crest */}
                  <div className="text-center z-10">
                    <div className="w-12 h-12 rounded-full border-2 border-[#C9A454] flex flex-col items-center justify-center mx-auto mb-2 bg-[#1A1917]">
                      <span className="text-[#C9A454] font-serif text-sm font-bold tracking-tighter">T</span>
                      <span className="text-[#C9A454] font-serif text-[8px] font-bold mt-[-4px] tracking-tighter">S</span>
                    </div>
                    
                    <div className="text-[10px] tracking-[0.25em] font-serif uppercase text-[#E2C47A]">TAPOVAN</div>
                    <div className="text-[6px] tracking-[0.35em] text-[#C9A454] uppercase font-sans mt-0.5">── SPICES ──</div>
                  </div>

                  {/* Round Window / Ingredient Photo Frame */}
                  <div className="relative my-4 aspect-square w-40 mx-auto rounded-full overflow-hidden border-2 border-[#C9A454]/50 z-10 bg-white/5 shadow-inner">
                    <img 
                      src={p.image} 
                      alt={p.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    
                    {/* Shadow overlay to make it look like a window cutout */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1A1917]/80 via-transparent to-transparent opacity-60" />
                  </div>

                  {/* Package Typography & Label */}
                  <div className="text-center z-10">
                    <h3 className="font-serif text-lg font-bold tracking-wider text-[#E2C47A] mb-0.5">{p.name}</h3>
                    <p className="text-[8px] text-[#FAF7F2] tracking-[0.2em] uppercase font-sans mb-1">{p.subtitle}</p>
                    <p className="text-[7px] text-[#9A8B78] uppercase tracking-widest mb-4">FROM INDIA TO THE WORLD</p>
                    
                    {/* Pouch bottom specs */}
                    <div className="text-[6px] text-[#E2C47A] border-t border-[#C9A454]/30 pt-2 tracking-widest uppercase font-sans">
                      {p.tagline}
                    </div>
                  </div>

                  {/* Seal Line */}
                  <div className="absolute bottom-1.5 inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-[#C9A454]/30 to-transparent" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
