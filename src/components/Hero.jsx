import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden" style={{ background: '#FAF7F2' }}>
      {/* Subtle background image */}
      <div className="absolute inset-0">
        <img src="/hero-spices.png" alt="" className="w-full h-full object-cover" loading="eager" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(250,247,242,0.93) 0%, rgba(250,247,242,0.8) 50%, rgba(242,237,227,0.9) 100%)' }} />
      </div>

      <div className="relative z-10 text-center px-6 max-w-3xl mx-auto py-32">
        {/* Eyebrow */}
        <motion.div
          className="flex items-center justify-center gap-4 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="h-px w-12" style={{ background: 'linear-gradient(to right, transparent, #C9A454)' }} />
          <span className="section-label">Est. 2017 · India</span>
          <div className="h-px w-12" style={{ background: 'linear-gradient(to left, transparent, #C9A454)' }} />
        </motion.div>

        {/* Heading */}
        <motion.h1
          className="font-serif mb-6"
          style={{ fontSize: 'clamp(2.5rem, 7vw, 5rem)', lineHeight: 1.08, color: '#2A1F14' }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          Pure Spices.
          <br />
          <span className="text-gold">Pure Goodness.</span>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          className="font-serif-alt text-xl md:text-2xl italic mb-4"
          style={{ color: '#6B5B48', fontFamily: 'Cormorant Garamond, serif' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.5 }}
        >
          "From India to the World"
        </motion.p>

        <motion.p
          className="text-base mb-12 mx-auto max-w-md"
          style={{ color: '#6B5B48', lineHeight: 1.75 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.6 }}
        >
          Premium Indian spices and pulses, exported worldwide. FSSAI, ISO, HACCP &amp; APEDA certified.
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.75 }}
        >
          <a href="#products" className="btn-primary" onClick={e => { e.preventDefault(); document.querySelector('#products')?.scrollIntoView({ behavior: 'smooth' }) }}>
            Explore Products <ArrowRight size={15} />
          </a>
          <a href="#contact" className="btn-secondary" onClick={e => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }) }}>
            Contact Us
          </a>
        </motion.div>
      </div>
    </section>
  )
}
