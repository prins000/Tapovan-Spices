import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { recipes } from '../data/content'
import { Clock, ChefHat, ArrowRight } from 'lucide-react'

export default function RecipeInspiration() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 })

  return (
    <section className="py-24 md:py-32 bg-paper relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute -top-32 -right-32 w-80 h-80 rounded-full opacity-5" style={{ background: '#C9A454' }} />

      <div ref={ref} className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.p
            className="section-label mb-3"
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
          >
            Culinary Inspiration
          </motion.p>
          <motion.h2
            className="section-title mb-5"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
          >
            Recipes That
            <br />
            <span className="text-gradient-gold">Come Alive</span>
          </motion.h2>
          <motion.p
            className="section-subtitle mx-auto text-center"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
          >
            Discover how Tapovan spices transform everyday cooking into extraordinary culinary experiences.
          </motion.p>
        </div>

        {/* Recipe Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {recipes.map((recipe, i) => (
            <motion.div
              key={recipe.id}
              className="group rounded-2xl overflow-hidden bg-white cursor-pointer"
              style={{ boxShadow: '0 4px 32px rgba(61, 43, 31, 0.08)' }}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15 + i * 0.12 }}
              whileHover={{
                y: -8,
                boxShadow: '0 20px 50px rgba(61, 43, 31, 0.16)',
                transition: { duration: 0.3 }
              }}
            >
              {/* Image */}
              <div className="relative h-56 overflow-hidden product-img-zoom">
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                {/* Overlay */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: 'linear-gradient(to top, rgba(42,31,20,0.6), transparent)' }}
                />
                {/* Difficulty Badge */}
                <div
                  className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold"
                  style={{ background: 'rgba(255,255,255,0.92)', color: '#5C4A35', backdropFilter: 'blur(8px)' }}
                >
                  <span className="flex items-center gap-1">
                    <ChefHat size={11} />
                    {recipe.difficulty}
                  </span>
                </div>
                {/* Time Badge */}
                <div
                  className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold"
                  style={{ background: 'rgba(255,255,255,0.92)', color: '#5C4A35', backdropFilter: 'blur(8px)' }}
                >
                  <span className="flex items-center gap-1">
                    <Clock size={11} />
                    {recipe.time}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3
                  className="font-serif text-xl font-bold mb-2"
                  style={{ color: '#2A1F14' }}
                >
                  {recipe.title}
                </h3>
                <p
                  className="font-sans text-sm leading-relaxed mb-4"
                  style={{ color: '#6B4C3B' }}
                >
                  {recipe.description}
                </p>

                {/* Spice Tags */}
                <div className="flex flex-wrap gap-1.5">
                  {recipe.spices.map(spice => (
                    <span
                      key={spice}
                      className="px-2.5 py-0.5 rounded-full text-xs font-medium"
                      style={{ background: 'rgba(201,164,84,0.12)', color: '#9C7A2E' }}
                    >
                      {spice}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
