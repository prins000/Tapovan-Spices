import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const exportCountries = [
  { logo: '/country-logos/usa.png',          name: 'USA',                zoom: 1 },
  { logo: '/country-logos/europe.jpg',       name: 'European Countries', zoom: 1.18 },
  { logo: '/country-logos/gulf.jpg',         name: 'Gulf Countries',     zoom: 1 },
  { logo: '/country-logos/latin-america.jpg',name: 'Latin America',      zoom: 1.18 },
  { logo: '/country-logos/malaysia.jpg',     name: 'Malaysia',           zoom: 1.18 },
  { logo: '/country-logos/vietnam.jpg',      name: 'Vietnam',            zoom: 1.18 },
]

export default function Hero() {
  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: '#FAF7F2' }}
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <img src="/hero-spices.png" alt="" className="w-full h-full object-cover" loading="eager" />
        {/* Dark radial vignette — keeps centre readable, edges vivid */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 80% 70% at 50% 50%, rgba(15,10,5,0.58) 0%, rgba(15,10,5,0.22) 70%, rgba(15,10,5,0.10) 100%)',
          }}
        />
      </div>

      {/* Two-column layout */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-24 lg:py-32 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center">

        {/* ── LEFT: existing text content ── */}
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
          {/* Eyebrow */}
          <motion.div
            className="flex items-center justify-center lg:justify-start gap-4 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="h-px w-12" style={{ background: 'linear-gradient(to right, transparent, #E2C47A)' }} />
            <span
              style={{
                fontSize: '0.7rem',
                fontWeight: 700,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: '#F5DFA0',
                textShadow: '0 1px 6px rgba(0,0,0,0.7)',
              }}
            >
              Est. 2017 · India
            </span>
            <div className="h-px w-12" style={{ background: 'linear-gradient(to left, transparent, #E2C47A)' }} />
          </motion.div>

          {/* Main heading */}
          <motion.h1
            className="font-serif mb-6"
            style={{
              fontSize: 'clamp(2.6rem, 5.5vw, 4.8rem)',
              lineHeight: 1.08,
              color: '#FFFFFF',
              textShadow: '0 2px 16px rgba(0,0,0,0.55), 0 1px 4px rgba(0,0,0,0.45)',
            }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Pure Spices.
            <br />
            <span
              style={{
                color: '#E2C47A',
                textShadow: '0 2px 20px rgba(0,0,0,0.6), 0 0 40px rgba(201,164,84,0.25)',
              }}
            >
              Pure Goodness.
            </span>
          </motion.h1>

          {/* Italic tagline */}
          <motion.p
            className="text-xl md:text-2xl italic mb-4"
            style={{
              color: '#F0E0B8',
              fontFamily: 'Cormorant Garamond, serif',
              textShadow: '0 1px 8px rgba(0,0,0,0.65)',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.5 }}
          >
            "From India to the World"
          </motion.p>

          {/* Body copy */}
          <motion.p
            className="text-base mb-10 max-w-md mx-auto lg:mx-0"
            style={{
              color: '#F5EDD8',
              lineHeight: 1.8,
              textShadow: '0 1px 6px rgba(0,0,0,0.60)',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.6 }}
          >
            Premium Indian spices and pulses, exported worldwide.
            <br />
            <span style={{ color: '#E2C47A', fontStyle: 'italic' }}>
              Where tradition meets purity — every grain, every aroma, crafted for excellence.
            </span>
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="flex flex-col sm:flex-row items-center lg:items-start gap-4"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.75 }}
          >
            <a
              href="#products"
              className="btn-primary"
              onClick={e => { e.preventDefault(); document.querySelector('#products')?.scrollIntoView({ behavior: 'smooth' }) }}
            >
              Explore Products <ArrowRight size={15} />
            </a>
            <a
              href="#contact"
              className="btn-secondary"
              style={{ color: '#FFFFFF', borderColor: 'rgba(255,255,255,0.55)' }}
              onClick={e => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }) }}
            >
              Contact Us
            </a>
          </motion.div>
        </div>

        {/* ── RIGHT: Exporting To panel ── */}
        <motion.div
          initial={{ opacity: 0, x: 0 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.4 }}
          className="flex justify-center lg:justify-end"
        >
          <div className="w-full max-w-xs sm:max-w-sm lg:max-w-lg">
            {/* Heading — no background, just text */}
            <div className="text-center mb-7">
              <div className="flex items-center justify-center gap-3 mb-1">
                <div className="h-px flex-1" style={{ background: 'linear-gradient(to right, transparent, #E2C47A)' }} />
                <span
                  className="font-serif"
                  style={{
                    fontSize: 'clamp(1rem, 3.5vw, 1.5rem)',
                    color: '#E2C47A',
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    fontWeight: 700,
                    textShadow: '0 2px 10px rgba(0,0,0,0.7)',
                  }}
                >
                  Exporting To
                </span>
                <div className="h-px flex-1" style={{ background: 'linear-gradient(to left, transparent, #E2C47A)' }} />
              </div>
            </div>

            {/* 3×2 country logo grid — no background */}
            <div className="grid grid-cols-3 gap-4 lg:gap-8">
              {exportCountries.map((c, i) => (
                <motion.div
                  key={c.name}
                  className="flex flex-col items-center gap-2"
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.6 + i * 0.08 }}
                >
                  {/* Circular logo — no background panel */}
                  <div
                    className="rounded-full overflow-hidden flex-shrink-0"
                    style={{
                      width: 'clamp(68px, 10vw, 110px)',
                      height: 'clamp(68px, 10vw, 110px)',
                      boxShadow: '0 6px 24px rgba(0,0,0,0.55)',
                      border: '2px solid rgba(226,196,122,0.60)',
                    }}
                  >
                    <img
                      src={c.logo}
                      alt={c.name}
                      className="w-full h-full object-cover"
                      style={{ transform: `scale(${c.zoom})` }}
                      loading="lazy"
                    />
                  </div>
                  {/* Country name */}
                  <p
                    className="text-center font-sans"
                    style={{
                      fontSize: 'clamp(0.52rem, 1.5vw, 0.7rem)',
                      fontWeight: 700,
                      letterSpacing: '0.07em',
                      textTransform: 'uppercase',
                      color: '#F5EDD8',
                      lineHeight: 1.4,
                      textShadow: '0 1px 5px rgba(0,0,0,0.8)',
                    }}
                  >
                    {c.name}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  )
}
