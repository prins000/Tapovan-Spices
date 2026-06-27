import { useState, useCallback, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import useEmblaCarousel from 'embla-carousel-react'
import { testimonials } from '../data/content'
import { Star, ChevronLeft, ChevronRight } from 'lucide-react'

export default function Testimonials() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 })
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })
  const [sel, setSel] = useState(0)

  const prev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const next = useCallback(() => emblaApi?.scrollNext(), [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    const onSelect = () => setSel(emblaApi.selectedScrollSnap())
    emblaApi.on('select', onSelect)
    return () => emblaApi.off('select', onSelect)
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    const iv = setInterval(() => emblaApi.scrollNext(), 6000)
    return () => clearInterval(iv)
  }, [emblaApi])

  return (
    <section className="py-28 md:py-36" style={{ background: '#2A1F14' }}>
      <div ref={ref} className="max-w-4xl mx-auto px-6">

        <div className="text-center mb-14">
          <motion.p className="section-label mb-4" style={{ color: '#C9A454' }} initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}>
            Testimonials
          </motion.p>
          <motion.h2
            className="font-serif text-3xl md:text-4xl font-bold"
            style={{ color: '#FAF7F2', lineHeight: 1.15 }}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
          >
            Trusted <span className="text-gold">Worldwide</span>
          </motion.h2>
        </div>

        <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.25 }}>
          <div className="embla" ref={emblaRef}>
            <div className="embla__container">
              {testimonials.map(t => (
                <div key={t.name} className="embla__slide">
                  <div className="text-center px-4 md:px-12 py-8">
                    <div className="flex justify-center gap-1 mb-8">
                      {Array.from({ length: t.rating }).map((_, j) => (
                        <Star key={j} size={16} fill="#C9A454" color="#C9A454" />
                      ))}
                    </div>
                    <p className="text-lg md:text-xl leading-relaxed italic mb-8" style={{ color: '#E8E0D0', fontFamily: 'Cormorant Garamond, serif', fontSize: '1.375rem' }}>
                      "{t.quote}"
                    </p>
                    <div className="font-serif font-bold text-base" style={{ color: '#FAF7F2' }}>{t.name}</div>
                    <div className="text-sm mt-1" style={{ color: '#9A8B78' }}>{t.title}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-6 mt-6">
            <button onClick={prev} className="w-10 h-10 rounded-full flex items-center justify-center border-none cursor-pointer" style={{ background: 'rgba(201,164,84,0.12)', color: '#C9A454' }}>
              <ChevronLeft size={16} />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <div key={i} className="w-1.5 h-1.5 rounded-full transition-all duration-300" style={{ background: sel === i ? '#C9A454' : 'rgba(201,164,84,0.3)' }} />
              ))}
            </div>
            <button onClick={next} className="w-10 h-10 rounded-full flex items-center justify-center border-none cursor-pointer" style={{ background: 'rgba(201,164,84,0.12)', color: '#C9A454' }}>
              <ChevronRight size={16} />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
