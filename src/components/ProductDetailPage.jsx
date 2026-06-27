import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ShieldCheck, Globe, Compass, Sparkles, Send, ArrowLeft, CheckCircle2 } from 'lucide-react'

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

export default function ProductDetailPage({ product, onBack }) {
  const specs = getSpecs(product)
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    message: `Dear Tapovan Spices Team,\n\nI am interested in ordering ${product.name} (${product.subtitle}). Please share the pricing details for packet sizes (we offer 200g, 250g, 400g, 500g, 1kg) and shipping options to my location.\n\nThank you.`
  })
  const [sent, setSent] = useState(false)

  // Scroll to top when page opens
  useEffect(() => {
    const forceScroll = () => {
      window.scrollTo(0, 0);
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    };

    // Phase 1: Instant scroll reset
    forceScroll();

    // Phase 2: Frame-by-frame updates during layout reflow
    const f1 = requestAnimationFrame(forceScroll);
    const f2 = requestAnimationFrame(() => requestAnimationFrame(forceScroll));

    // Phase 3: Multiple timeouts covering render cycles
    const t1 = setTimeout(forceScroll, 30);
    const t2 = setTimeout(forceScroll, 100);
    const t3 = setTimeout(forceScroll, 250);
    const t4 = setTimeout(forceScroll, 500);

    return () => {
      cancelAnimationFrame(f1);
      cancelAnimationFrame(f2);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [product])

  const handleSubmit = (e) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="min-h-screen bg-[#FAF7F2] pt-28 pb-20"
    >
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Back Link */}
        <button 
          onClick={onBack}
          className="mb-8 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-[#9C7A2E] hover:text-[#C9A454] transition-colors cursor-pointer bg-transparent border-none"
        >
          <ArrowLeft size={16} /> Back to Products
        </button>

        {/* Top Section: Equal Height Row for Image & Details */}
        <div className="grid lg:grid-cols-12 gap-16 items-stretch">
          
          {/* Left Column: Big Product Image */}
          <div className="lg:col-span-5 h-[400px] lg:h-auto relative rounded-3xl overflow-hidden shadow-xl border border-stone-200/20 bg-white flex items-center justify-center flex-shrink-0">
            <img 
              src={product.image} 
              alt={product.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-4 left-4 bg-amber-600/90 backdrop-blur-sm text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
              {product.category}
            </div>
          </div>

          {/* Right Column: Spec Details (Matching left height exactly) */}
          <div className="lg:col-span-7 bg-white p-8 md:p-10 rounded-3xl border border-stone-200/30 shadow-sm flex flex-col justify-between gap-6">
            
            {/* Headers */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#9C7A2E]">
                  Export Grade
                </span>
                {product.nameHindi && (
                  <span className="text-xs font-semibold text-stone-400 italic bg-stone-100 px-2.5 py-0.5 rounded">
                    {product.nameHindi}
                  </span>
                )}
              </div>
              <h1 className="font-serif text-3xl md:text-4xl font-bold text-stone-900 leading-tight mb-2">
                {product.name}
              </h1>
              <p className="font-serif-alt text-base italic text-stone-400">
                {product.subtitle}
              </p>
            </div>

            {/* Spec Cards Grid */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-stone-50 border border-stone-200/20 flex gap-3">
                <Compass size={18} className="text-[#C9A454] flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-[9px] font-bold uppercase tracking-wider text-stone-400 block mb-0.5">Sourcing Origin</span>
                  <p className="text-xs font-semibold text-stone-700">{specs.origin}</p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-stone-50 border border-stone-200/20 flex gap-3">
                <ShieldCheck size={18} className="text-[#C9A454] flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-[9px] font-bold uppercase tracking-wider text-stone-400 block mb-0.5">Purity Specs</span>
                  <p className="text-xs font-semibold text-stone-700">{specs.purity}</p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-stone-50 border border-stone-200/20 flex gap-3">
                <Globe size={18} className="text-[#C9A454] flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-[9px] font-bold uppercase tracking-wider text-stone-400 block mb-0.5">Moisture Limits</span>
                  <p className="text-xs font-semibold text-stone-700">{specs.moisture}</p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-stone-50 border border-stone-200/20 flex gap-3">
                <Sparkles size={18} className="text-[#C9A454] flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-[9px] font-bold uppercase tracking-wider text-stone-400 block mb-0.5">Sensory Profile</span>
                  <p className="text-xs font-semibold text-stone-700">{specs.aroma}</p>
                </div>
              </div>
            </div>

            {/* Sensory Progress Bars */}
            <div className="bg-stone-50/50 p-5 rounded-xl border border-stone-200/20">
              <span className="text-[9px] font-bold uppercase tracking-wider text-stone-500 block mb-3.5">Sensory Evaluation</span>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <div className="flex justify-between text-xs text-stone-600 mb-1">
                    <span>Aroma Strength</span>
                    <span className="font-semibold">{specs.sensory.intensity}%</span>
                  </div>
                  <div className="w-full bg-stone-200/60 h-1 rounded-full overflow-hidden">
                    <div className="bg-[#C9A454] h-full rounded-full" style={{ width: `${specs.sensory.intensity}%` }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs text-stone-600 mb-1">
                    <span>Purity Grade</span>
                    <span className="font-semibold">{specs.sensory.purity}%</span>
                  </div>
                  <div className="w-full bg-stone-200/60 h-1 rounded-full overflow-hidden">
                    <div className="bg-[#C9A454] h-full rounded-full" style={{ width: `${specs.sensory.purity}%` }} />
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* Bottom Section: Horizontally Centered Inquiry Form */}
        <div className="max-w-2xl mx-auto mt-16 bg-white p-8 md:p-10 rounded-3xl border border-stone-200/30 shadow-md">
          <h3 className="font-serif text-xl font-bold mb-2 text-[#2A1F14] text-center">Send Product Inquiry</h3>
          <p className="text-xs text-stone-500 mb-8 text-center">Ask for pricing or specify your preferred packet size (200g - 1kg or bulk export).</p>
          
          {sent ? (
            <div className="text-center py-8">
              <CheckCircle2 size={40} className="text-[#C9A454] mx-auto mb-4 animate-bounce" />
              <h4 className="font-serif text-lg font-bold mb-1 text-stone-900">Thank You!</h4>
              <p className="text-sm text-stone-600">Your inquiry for {product.name} has been sent successfully.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold mb-1 text-stone-600">Full Name *</label>
                  <input 
                    type="text" 
                    required 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="input-field" 
                    placeholder="Your name" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1 text-stone-600">Company Name (Optional)</label>
                  <input 
                    type="text" 
                    value={formData.company}
                    onChange={(e) => setFormData({...formData, company: e.target.value})}
                    className="input-field" 
                    placeholder="Your company" 
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold mb-1 text-stone-600">Email Address *</label>
                  <input 
                    type="email" 
                    required 
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="input-field" 
                    placeholder="your@email.com" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1 text-stone-600">Phone / WhatsApp</label>
                  <input 
                    type="text" 
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="input-field" 
                    placeholder="+91 XXXXX XXXXX" 
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1 text-stone-600">Message *</label>
                <textarea 
                  required 
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="input-field overscroll-contain"
                  style={{ overscrollBehavior: 'contain' }}
                  onWheel={(e) => e.stopPropagation()}
                  onTouchMove={(e) => e.stopPropagation()}
                  placeholder="Specify quantity requirements and export destination..."
                />
              </div>

              <button type="submit" className="btn-primary w-full justify-center py-3.5 mt-4">
                <Send size={14} /> Send Product Inquiry
              </button>
            </form>
          )}
        </div>

      </div>
    </motion.div>
  )
}
