import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Compass, Sparkles, ShieldCheck } from 'lucide-react'

const processSteps = [
  {
    step: '01',
    icon: Compass,
    title: 'Direct Farm Sourcing',
    description: 'We source raw spices directly from selected agricultural farms in Gujarat, Rajasthan, and Andhra Pradesh, ensuring fair trade and single-origin quality.'
  },
  {
    step: '02',
    icon: Sparkles,
    title: 'AI Sortex Processing',
    description: 'We process the seeds using advanced Bühler Sortex Optical Sorters. AI vision sensors identify and eliminate color defects, stones, and foreign material for 99.9% purity.'
  },
  {
    step: '03',
    icon: ShieldCheck,
    title: 'Hygienic Aroma-Lock Packaging',
    description: 'Milled in low-temperature cold grinders, the spices are instantly sealed in food-grade multi-layer barrier pouches to preserve natural volatile oils and aroma.'
  }
]

export default function Process() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section id="process" className="py-24 md:py-32 bg-[#FAF7F2]">
      <div ref={ref} className="max-w-6xl mx-auto px-6">

        {/* Section Header */}
        <div className="text-center mb-16 md:mb-20">
          <motion.p 
            className="section-label mb-4"
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            Processing Standards
          </motion.p>
          <motion.h2 
            className="section-title"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            From Farm to <span className="text-gold">Your Table</span>
          </motion.h2>
        </div>

        {/* Main Content Split Grid */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Trust Video Player */}
          <motion.div 
            className="lg:col-span-6 space-y-4"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-stone-200 bg-black aspect-video">
              <iframe 
                className="absolute inset-0 w-full h-full"
                src="https://www.youtube.com/embed/ElojFZn6q3Q?playsinline=1&rel=0" 
                title="Bühler Sortex Spice Seed Sorting" 
                frameBorder="0" 
                style={{ pointerEvents: 'auto', touchAction: 'auto' }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                allowFullScreen
              />
            </div>
            
            {/* Tech Caption */}
            <div className="p-5 rounded-2xl bg-white border border-stone-200/40 shadow-sm flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center flex-shrink-0">
                <Sparkles size={18} className="text-[#C9A454]" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-stone-800">Featured Technology</h4>
                  <span className="text-[9px] font-medium text-stone-400 bg-stone-100 px-2 py-0.5 rounded">
                    © Bühler Group
                  </span>
                </div>
                <p className="text-xs text-stone-500 leading-relaxed">
                  <strong>Bühler Sortex Optical Sorter:</strong> Utilizing high-resolution optical cameras and AI color sorting to guarantee pristine, defect-free spices. <em>Video copyright of Bühler Group.</em>
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Step Timeline */}
          <motion.div 
            className="lg:col-span-6 space-y-8"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {processSteps.map((step, index) => {
              const Icon = step.icon
              return (
                <div key={step.step} className="flex gap-6 relative group">
                  
                  {/* Step Connector Line */}
                  {index !== processSteps.length - 1 && (
                    <div className="absolute left-6 top-12 bottom-[-24px] w-[1px] bg-stone-200" />
                  )}

                  {/* Icon Frame */}
                  <div className="w-12 h-12 rounded-xl bg-white border border-stone-200 flex items-center justify-center flex-shrink-0 shadow-sm group-hover:border-[#C9A454] transition-colors duration-300">
                    <Icon size={20} className="text-[#9C7A2E]" />
                  </div>

                  {/* Text Details */}
                  <div className="space-y-1.5 pt-1">
                    <span className="text-[10px] font-bold tracking-widest text-[#C9A454]">
                      STEP {step.step}
                    </span>
                    <h3 className="font-serif text-lg font-bold text-stone-900">
                      {step.title}
                    </h3>
                    <p className="text-xs text-stone-600 leading-relaxed max-w-lg">
                      {step.description}
                    </p>
                  </div>

                </div>
              )
            })}
          </motion.div>

        </div>

      </div>
    </section>
  )
}
