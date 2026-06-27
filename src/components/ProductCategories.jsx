import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { products, categories } from '../data/content'
import { Eye, X, Info, ShieldCheck, HelpCircle } from 'lucide-react'

// Helper to get export specs based on category
const getSpecs = (p) => {
  if (p.category === 'Spices') {
    return {
      origin: 'Gujarat / Rajasthan / Andhra Pradesh, India',
      moisture: 'Less than 9% (Export Standard)',
      purity: '99.5% Min (Singapore/Europe Quality)',
      aroma: 'Intense, Aromatic, Warm & Earthy',
      grade: 'Premium Bold / Machine Cleaned / Sortex',
      sensory: { intensity: 92, purity: 99.5, freshness: 98 }
    }
  } else if (p.category === 'Pulses') {
    return {
      origin: 'Madhya Pradesh / Maharashtra, India',
      moisture: 'Less than 12% (Hygienically Dried)',
      purity: '99.8% Sortex Cleaned & Double Polished',
      aroma: 'Natural, Nutty & Fresh',
      grade: 'Grade A Export Quality',
      sensory: { intensity: 78, purity: 99.8, freshness: 96 }
    }
  } else {
    return {
      origin: 'India (Selected Regions)',
      moisture: 'Less than 10% (High Shelf-life)',
      purity: '99% Cleaned & De-stoned',
      aroma: 'Earthy, Sweet & Pure',
      grade: 'Premium Cleaned Grade',
      sensory: { intensity: 85, purity: 99.0, freshness: 97 }
    }
  }
}

export default function ProductCategories() {
  const [active, setActive] = useState('all')
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 })

  const filtered = active === 'all' ? products : products.filter(p => p.category === active)

  const handleInquiry = (product) => {
    setSelectedProduct(null); // Close modal
    
    // Smooth scroll to contact form
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }

    // Attempt to fill form details dynamically
    setTimeout(() => {
      const messageField = document.querySelector('textarea[name="message"]');
      const subjectSelect = document.querySelector('select[name="type"]') || document.querySelector('select');
      const nameField = document.querySelector('input[name="name"]');

      if (messageField) {
        messageField.value = `Dear Tapovan Spices Export Team,\n\nI am interested in importing ${product.name} (${product.subtitle}). Please share the pricing details, packaging specifications, and MOQ for importing to my country.\n\nThank you.`;
        // Trigger React Hook Form state update if necessary (standard inputs need native event dispatch)
        messageField.dispatchEvent(new Event('input', { bubbles: true }));
      }
      if (subjectSelect) {
        subjectSelect.value = 'export';
        subjectSelect.dispatchEvent(new Event('change', { bubbles: true }));
      }
      if (nameField) {
        nameField.focus();
      }
    }, 800);
  }

  return (
    <section id="products" className="py-32 md:py-44" style={{ background: '#FAF7F2' }}>
      <div className="max-w-6xl mx-auto px-6">

        {/* Section Header */}
        <div ref={ref} className="text-center mb-20">
          <motion.p 
            className="section-label mb-4"
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            Export Collection
          </motion.p>
          <motion.h2 
            className="section-title mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Premium Spice <span className="text-gold">Range</span>
          </motion.h2>
          <motion.p 
            className="text-base text-gray-600 max-w-2xl mx-auto text-center leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Discover our premium selection of natural spices, pulses, and seeds processed under global safety certifications for export markets.
          </motion.p>
        </div>

        {/* Category Filters */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-16"
          initial={{ opacity: 0, y: 15 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActive(cat.id)}
              className="px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 border cursor-pointer"
              style={{
                background: active === cat.id ? 'linear-gradient(135deg, #C9A454, #9C7A2E)' : 'white',
                color: active === cat.id ? 'white' : '#6B5B48',
                borderColor: active === cat.id ? 'transparent' : 'rgba(201,164,84,0.25)',
                boxShadow: active === cat.id ? '0 4px 15px rgba(201,164,84,0.25)' : 'none',
              }}
            >
              {cat.name}
            </button>
          ))}
        </motion.div>

        {/* Product Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            {filtered.map((p, i) => (
              <motion.div
                key={p.id}
                onClick={() => setSelectedProduct(p)}
                className="rounded-2xl overflow-hidden bg-white group cursor-pointer border border-transparent hover:border-amber-100 flex flex-col h-full"
                style={{ boxShadow: '0 4px 20px rgba(42,31,20,0.04)' }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.02 * i, duration: 0.4 }}
                whileHover={{ 
                  y: -8, 
                  boxShadow: '0 12px 35px rgba(42,31,20,0.08)',
                  transition: { duration: 0.25 } 
                }}
              >
                {/* Image Wrap */}
                <div className="aspect-[4/3] w-full overflow-hidden bg-gray-50 relative flex items-center justify-center">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="bg-white/95 text-gray-900 px-4 py-2 rounded-full text-xs font-semibold tracking-wider uppercase flex items-center gap-1.5 shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                      <Eye size={14} /> Quick View
                    </div>
                  </div>
                </div>

                {/* Details */}
                <div className="p-6 flex-grow flex flex-col justify-between">
                  <div>
                    <span className="text-[0.6rem] font-bold uppercase tracking-widest text-amber-600 block mb-1.5">{p.category}</span>
                    <h3 className="font-serif text-lg font-bold mb-1 text-gray-900">{p.name}</h3>
                    <p className="font-sans text-xs italic text-gray-500 mb-3">{p.subtitle}</p>
                    <p className="text-xs leading-relaxed text-gray-600 line-clamp-2">{p.description}</p>
                  </div>

                  <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-amber-700 font-semibold">
                    <span>Export Quality</span>
                    <span className="group-hover:translate-x-1 transition-transform duration-300">Details →</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Product Detail Modal */}
        <AnimatePresence>
          {selectedProduct && (() => {
            const specs = getSpecs(selectedProduct);
            return (
              <motion.div 
                className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {/* Backdrop */}
                <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setSelectedProduct(null)} />
                
                {/* Modal Container */}
                <motion.div 
                  className="relative w-full max-w-4xl bg-white rounded-3xl overflow-hidden shadow-2xl z-10 flex flex-col md:flex-row max-h-[90vh] md:max-h-[85vh]"
                  initial={{ scale: 0.95, y: 20 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={{ scale: 0.95, y: 20 }}
                  transition={{ type: 'spring', damping: 25, stiffness: 250 }}
                >
                  {/* Close button */}
                  <button 
                    onClick={() => setSelectedProduct(null)}
                    className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/90 text-gray-800 flex items-center justify-center shadow-md cursor-pointer hover:bg-gray-100 transition-colors"
                  >
                    <X size={20} />
                  </button>

                  {/* Left Column: Image */}
                  <div className="w-full md:w-1/2 bg-gray-50 flex items-center justify-center relative p-6 md:p-0">
                    <img 
                      src={selectedProduct.image} 
                      alt={selectedProduct.name}
                      className="w-full h-full object-cover max-h-[300px] md:max-h-full"
                    />
                    <div className="absolute bottom-4 left-4 bg-amber-600/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-[0.65rem] font-bold uppercase tracking-wider">
                      {selectedProduct.category}
                    </div>
                  </div>

                  {/* Right Column: Spec Details */}
                  <div className="w-full md:w-1/2 p-6 md:p-10 overflow-y-auto flex flex-col justify-between">
                    <div>
                      <div className="flex items-baseline gap-2.5 mb-1">
                        <h3 className="font-serif text-2xl md:text-3xl font-bold text-gray-900">{selectedProduct.name}</h3>
                        {selectedProduct.nameHindi && (
                          <span className="text-sm font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
                            {selectedProduct.nameHindi}
                          </span>
                        )}
                      </div>
                      <p className="font-sans text-sm italic text-gray-500 mb-6">{selectedProduct.subtitle}</p>

                      <div className="space-y-4 mb-8">
                        <div>
                          <span className="text-[0.65rem] font-bold uppercase tracking-wider text-amber-700 block mb-1">Origin / Sourcing</span>
                          <p className="text-sm text-gray-700">{specs.origin}</p>
                        </div>
                        <div>
                          <span className="text-[0.65rem] font-bold uppercase tracking-wider text-amber-700 block mb-1">Export Grade</span>
                          <p className="text-sm text-gray-700">{specs.grade}</p>
                        </div>
                        <div>
                          <span className="text-[0.65rem] font-bold uppercase tracking-wider text-amber-700 block mb-1">Purity Specifications</span>
                          <p className="text-sm text-gray-700">{specs.purity}</p>
                        </div>
                        <div>
                          <span className="text-[0.65rem] font-bold uppercase tracking-wider text-amber-700 block mb-1">Aroma & Flavor Profile</span>
                          <p className="text-sm text-gray-700">{specs.aroma}</p>
                        </div>
                        <div>
                          <span className="text-[0.65rem] font-bold uppercase tracking-wider text-amber-700 block mb-1">Moisture Limits</span>
                          <p className="text-sm text-gray-700">{specs.moisture}</p>
                        </div>
                      </div>

                      {/* Sensory Profile Bars */}
                      <div className="mb-8 bg-amber-50/50 p-4 rounded-xl border border-amber-100/50">
                        <span className="text-[0.65rem] font-bold uppercase tracking-wider text-amber-800 block mb-3">Sensory Profile</span>
                        <div className="space-y-2.5">
                          <div>
                            <div className="flex justify-between text-xs text-gray-600 mb-1">
                              <span>Aroma Intensity</span>
                              <span>{specs.sensory.intensity}%</span>
                            </div>
                            <div className="w-full bg-gray-200 h-1 rounded-full overflow-hidden">
                              <div className="bg-amber-600 h-full rounded-full" style={{ width: `${specs.sensory.intensity}%` }} />
                            </div>
                          </div>
                          <div>
                            <div className="flex justify-between text-xs text-gray-600 mb-1">
                              <span>Purity Grade</span>
                              <span>{specs.sensory.purity}%</span>
                            </div>
                            <div className="w-full bg-gray-200 h-1 rounded-full overflow-hidden">
                              <div className="bg-amber-600 h-full rounded-full" style={{ width: `${specs.sensory.purity}%` }} />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <button 
                      onClick={() => handleInquiry(selectedProduct)}
                      className="btn-primary w-full justify-center text-center py-3"
                    >
                      Inquire About {selectedProduct.name}
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            );
          })()}
        </AnimatePresence>
      </div>
    </section>
  )
}
