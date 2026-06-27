import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { contactInfo } from '../data/content'
import { MapPin, Phone, Mail, Globe, Send, CheckCircle2 } from 'lucide-react'

export default function Contact() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [sent, setSent] = useState(false)
  const { register, handleSubmit, formState: { errors }, reset } = useForm()

  const onSubmit = () => {
    setSent(true)
    reset()
    setTimeout(() => setSent(false), 5000)
  }

  return (
    <section id="contact" className="py-28 md:py-36" style={{ background: '#F2EDE3' }}>
      <div ref={ref} className="max-w-5xl mx-auto px-6">

        <div className="text-center mb-16">
          <motion.p className="section-label mb-4" initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}>
            Contact
          </motion.p>
          <motion.h2 className="section-title mb-5" initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 }}>
            Get In <span className="text-gold">Touch</span>
          </motion.h2>
          <motion.p className="section-desc mx-auto text-center" initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.2 }}>
            Whether you're an importer, distributor, or retailer — we'd love to hear from you.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-5 gap-10">
          {/* Info */}
          <motion.div
            className="lg:col-span-2 space-y-5"
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2 }}
          >
            {[
              { icon: Mail, label: 'Email', value: contactInfo.email },
              { icon: Phone, label: 'Phone', value: contactInfo.phone },
              { icon: Globe, label: 'Website', value: contactInfo.website },
              { icon: MapPin, label: 'Location', value: contactInfo.location },
            ].map((item, i) => {
              const Icon = item.icon
              return (
                <div key={item.label} className="flex items-center gap-4 p-5 rounded-xl bg-white" style={{ boxShadow: '0 2px 12px rgba(42,31,20,0.04)' }}>
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(201,164,84,0.1)' }}>
                    <Icon size={16} style={{ color: '#C9A454' }} />
                  </div>
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wider" style={{ color: '#9A8B78' }}>{item.label}</div>
                    <div className="text-sm font-medium" style={{ color: '#2A1F14' }}>{item.value}</div>
                  </div>
                </div>
              )
            })}
          </motion.div>

          {/* Form */}
          <motion.div
            className="lg:col-span-3 rounded-2xl bg-white p-8"
            style={{ boxShadow: '0 4px 24px rgba(42,31,20,0.06)' }}
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3 }}
          >
            {sent ? (
              <div className="text-center py-16">
                <CheckCircle2 size={40} style={{ color: '#C9A454' }} className="mx-auto mb-4" />
                <h4 className="font-serif text-xl font-bold mb-2" style={{ color: '#2A1F14' }}>Message Sent!</h4>
                <p className="text-sm" style={{ color: '#6B5B48' }}>Our team will respond within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium mb-1.5" style={{ color: '#6B5B48' }}>Full Name *</label>
                    <input {...register('name', { required: true })} className="input-field" placeholder="Your name" />
                    {errors.name && <p className="text-xs mt-1" style={{ color: '#8B3A2A' }}>Required</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5" style={{ color: '#6B5B48' }}>Company</label>
                    <input {...register('company')} className="input-field" placeholder="Company name" />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium mb-1.5" style={{ color: '#6B5B48' }}>Email *</label>
                    <input {...register('email', { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ })} type="email" className="input-field" placeholder="your@email.com" />
                    {errors.email && <p className="text-xs mt-1" style={{ color: '#8B3A2A' }}>Valid email required</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5" style={{ color: '#6B5B48' }}>Phone</label>
                    <input {...register('phone')} className="input-field" placeholder="+91 XXXXX XXXXX" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1.5" style={{ color: '#6B5B48' }}>Inquiry Type</label>
                  <select {...register('type')} className="input-field" style={{ appearance: 'none' }}>
                    <option value="">Select type</option>
                    <option value="export">Export / Import</option>
                    <option value="bulk">Bulk Order</option>
                    <option value="private">Private Label</option>
                    <option value="general">General Inquiry</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1.5" style={{ color: '#6B5B48' }}>Message *</label>
                  <textarea {...register('message', { required: true })} className="input-field" rows={4} placeholder="Your requirements..." />
                  {errors.message && <p className="text-xs mt-1" style={{ color: '#8B3A2A' }}>Required</p>}
                </div>

                <button type="submit" className="btn-primary w-full justify-center">
                  <Send size={14} /> Send Message
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
