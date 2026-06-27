import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ShieldCheck, 
  Globe, 
  Compass, 
  Sparkles, 
  ArrowLeft, 
  Plus, 
  Minus, 
  ShoppingCart, 
  MessageSquare, 
  Share2, 
  Check, 
  BadgeAlert
} from 'lucide-react'
import { useInquiry } from './InquiryContext'

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

const PACKAGING_SIZES = ['100g', '200g', '250g', '400g', '500g', '1kg']

export default function ProductDetailPage({ product, onBack }) {
  const specs = getSpecs(product)
  const { addToCart, sendSingleItemInquiry } = useInquiry()

  // Selection states
  const [selectedPackaging, setSelectedPackaging] = useState(PACKAGING_SIZES[2]) // Default 250g
  const [quantity, setQuantity] = useState(1)
  
  // Notification states
  const [toastMessage, setToastMessage] = useState(null)
  const [copiedLink, setCopiedLink] = useState(false)

  // Scroll to top when page opens
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [product])

  // Custom Toast helper
  const triggerToast = (msg) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(null), 3000)
  }

  // Handle direct cart addition
  const handleAddToCart = () => {
    if (quantity <= 0 || isNaN(quantity)) {
      triggerToast('Please enter a valid quantity!')
      return
    }
    // We pass null for variant so InquiryContext uses its standard default fallback
    addToCart(product, null, selectedPackaging, quantity)
    triggerToast(`Added ${quantity}x ${product.name} (${selectedPackaging}) to Inquiry Cart`)
  };

  // Direct actions
  const handleDirectOrder = () => {
    if (quantity <= 0 || isNaN(quantity)) {
      triggerToast('Please enter a valid quantity!')
      return
    }
    sendSingleItemInquiry(product, null, selectedPackaging, quantity, 'order')
  }

  // Web Share or Clipboard Copy fallback
  const handleShareProduct = () => {
    const shareUrl = window.location.href
    const shareText = `Check out the premium ${product.name} (${product.subtitle}) from Tapovan Spices! Discover export quality spices.`

    if (navigator.share) {
      navigator.share({
        title: `${product.name} - Tapovan Spices`,
        text: shareText,
        url: shareUrl,
      })
      .then(() => triggerToast('Shared successfully!'))
      .catch((err) => console.log('Error sharing:', err))
    } else {
      navigator.clipboard.writeText(shareUrl).then(() => {
        setCopiedLink(true)
        triggerToast('Product link copied to clipboard!')
        setTimeout(() => setCopiedLink(false), 2000)
      })
    }
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="min-h-screen bg-[#FAF7F2] pt-28 pb-20 font-sans animate-fade-in"
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
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-stretch">
          
          {/* Left Column: Product Image */}
          <div className="lg:col-span-5 relative rounded-3xl overflow-hidden shadow-xl border border-stone-200/20 bg-white flex items-center justify-center flex-shrink-0 h-[400px] lg:h-auto">
            <img 
              src={product.image} 
              alt={product.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-4 left-4 bg-amber-600/90 backdrop-blur-sm text-white px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider">
              {product.category}
            </div>
          </div>

          {/* Right Column: Spec Details (Matching left height exactly) */}
          <div className="lg:col-span-7 bg-white p-8 md:p-10 rounded-3xl border border-stone-200/30 shadow-sm flex flex-col justify-between gap-6">
            
            {/* Headers */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#9C7A2E] bg-[#9C7A2E]/10 px-2 py-0.5 rounded">
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
              <div className="flex flex-wrap gap-1.5 pt-2">
                {product.description.split('|').map(tag => (
                  <span 
                    key={tag} 
                    className="px-2 py-0.5 rounded text-[10px] font-medium bg-stone-100 text-stone-600 border border-stone-200/30"
                  >
                    {tag.trim()}
                  </span>
                ))}
              </div>
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

        {/* Bottom Section: Centered Configure Inquiry Card */}
        <div className="max-w-2xl mx-auto mt-16 bg-white p-8 md:p-10 rounded-3xl border border-stone-200/30 shadow-md space-y-6">
          <div className="text-center">
            <h3 className="font-serif text-2xl font-bold mb-1.5 text-[#2A1F14]">Configure Inquiry</h3>
            <p className="text-xs text-stone-500">Configure packaging size and quantity details to submit your inquiry list or order directly.</p>
          </div>

          {/* Packaging Size Selector */}
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 text-center">
              Select Packaging Size
            </label>
            <div className="flex flex-wrap gap-2 justify-center">
              {PACKAGING_SIZES.map(p => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setSelectedPackaging(p)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                    selectedPackaging === p 
                      ? 'border-[#9C7A2E] bg-[#9C7A2E]/5 text-[#9C7A2E]' 
                      : 'border-stone-200 bg-transparent text-stone-600 hover:border-stone-300'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity Selector */}
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 text-center">
              Select Quantity
            </label>
            <div className="flex items-center gap-4 justify-center">
              <div className="flex items-center border border-stone-200 rounded-2xl bg-stone-50 p-1.5">
                <button
                  type="button"
                  onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                  className="w-8 h-8 rounded-xl bg-white hover:bg-stone-100 flex items-center justify-center text-stone-600 border border-stone-200/40 cursor-pointer transition-colors"
                >
                  <Minus size={14} />
                </button>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-12 text-center text-sm font-bold bg-transparent border-none outline-none text-stone-850"
                />
                <button
                  type="button"
                  onClick={() => setQuantity(prev => prev + 1)}
                  className="w-8 h-8 rounded-xl bg-white hover:bg-stone-100 flex items-center justify-center text-stone-600 border border-stone-200/40 cursor-pointer transition-colors"
                >
                  <Plus size={14} />
                </button>
              </div>
              <span className="text-xs text-stone-400 italic">
                Min order: 1 unit.
              </span>
            </div>
          </div>

          {/* Primary Actions Grid */}
          <div className="grid sm:grid-cols-2 gap-3 pt-3">
            <button
              type="button"
              onClick={handleAddToCart}
              className="btn-primary w-full justify-center py-3.5 cursor-pointer"
            >
              <ShoppingCart size={16} /> Add to Inquiry Cart
            </button>

            <button
              type="button"
              onClick={handleDirectOrder}
              className="w-full flex items-center justify-center gap-2 py-3.5 px-6 bg-[#25D366] hover:bg-[#20ba59] text-white font-semibold text-xs uppercase tracking-wider rounded-full shadow-md shadow-emerald-500/10 hover:shadow-emerald-500/20 transform hover:-translate-y-0.5 transition-all duration-200 cursor-pointer border-none"
            >
              <MessageSquare size={16} /> Order via WhatsApp
            </button>
          </div>

          {/* Share Button (Centered at bottom of card) */}
          <div className="flex justify-center pt-3 border-t border-stone-100">
            <button
              type="button"
              onClick={handleShareProduct}
              className="flex items-center gap-1.5 py-2 px-6 border border-stone-200 hover:border-stone-300 rounded-xl text-xs font-semibold text-stone-600 hover:bg-stone-50 transition-colors cursor-pointer bg-white"
            >
              {copiedLink ? <Check size={13} className="text-emerald-600" /> : <Share2 size={13} />}
              Share Product
            </button>
          </div>

          {/* Payment Notice Badge */}
          <div className="flex gap-2.5 p-3.5 rounded-2xl bg-amber-50/50 border border-amber-100/35 text-[11px] text-stone-500 leading-relaxed">
            <BadgeAlert size={14} className="text-[#9C7A2E] flex-shrink-0 mt-0.5" />
            <p>
              <span className="font-semibold text-stone-700">Payment Notice:</span> Direct purchasing is finalized
              manually over WhatsApp. Payment details will be sent directly by our sales reps. We support bank transfers (IMPS/NEFT/RTGS/TT/LC) and UPI.
            </p>
          </div>
        </div>

      </div>

      {/* Floating Animated Toast Message */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            className="fixed bottom-24 left-1/2 -translate-x-1/2 bg-[#2A1F14]/95 text-white font-sans text-xs px-5 py-3 rounded-full shadow-xl flex items-center gap-2 z-50 border border-[#9C7A2E]/20"
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.2 }}
          >
            <Check size={14} className="text-emerald-500" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

    </motion.div>
  )
}

