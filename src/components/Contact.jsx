import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { contactInfo } from '../data/content'
import { MapPin, Phone, Mail, Globe, Send, CheckCircle2, Clock, CreditCard, MessageSquare } from 'lucide-react'
import { useInquiry } from './InquiryContext'

export default function Contact() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const { openWhatsApp } = useInquiry()
  const { register, handleSubmit, formState: { errors }, reset } = useForm()

  const onSubmit = (data) => {
    // Generate a structured WhatsApp message for general inquiries
    let msg = `Hello Tapovan Spices,\n\nI would like to submit a general inquiry:\n\n`
    msg += `• *Name:* ${data.name}\n`
    if (data.company) msg += `• *Company:* ${data.company}\n`
    msg += `• *Email:* ${data.email}\n`
    if (data.phone) msg += `• *Phone:* ${data.phone}\n`
    if (data.type) msg += `• *Inquiry Type:* ${data.type.toUpperCase()}\n`
    msg += `\n*Message:*\n${data.message}\n`

    openWhatsApp(msg)
    reset()
  }

  const handleQuickWhatsApp = () => {
    openWhatsApp(
      "Hello Tapovan Spices,\n\nI am interested in your products and would like to discuss order pricing and delivery options directly with a sales representative.\n\nThank you."
    )
  }

  return (
    <section id="contact" className="py-28 md:py-36 font-sans" style={{ background: '#F2EDE3' }}>
      <div ref={ref} className="max-w-5xl mx-auto px-6">

        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.p className="section-label mb-4" initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}>
            Contact
          </motion.p>
          <motion.h2 className="section-title mb-5" initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 }}>
            Get In <span className="text-gold">Touch</span>
          </motion.h2>
          <motion.p className="section-desc mx-auto text-center" initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.2 }}>
            Have a question about our export-quality spices or bulk order quantities? Connect directly with us.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Info Side (5 cols) */}
          <motion.div
            className="lg:col-span-5 space-y-6 flex flex-col justify-between"
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2 }}
          >
            {/* Primary CTA card: Chat on WhatsApp */}
            <div 
              className="p-6 rounded-3xl bg-white border border-[#25D366]/20 shadow-md space-y-4 text-center cursor-pointer hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
              onClick={handleQuickWhatsApp}
            >
              <div className="w-12 h-12 bg-[#25D366]/10 rounded-2xl flex items-center justify-center mx-auto text-[#25D366]">
                <MessageSquare className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold text-stone-900">Chat on WhatsApp</h3>
                <p className="text-xs text-stone-500 mt-1 leading-relaxed">
                  Start an instant discussion with our exports and retail sales team. Average response time: &lt; 15 mins.
                </p>
              </div>
              <button 
                type="button"
                className="w-full py-3 bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold uppercase tracking-wider rounded-full shadow-md shadow-emerald-500/10 flex items-center justify-center gap-2 border-none transition-colors"
              >
                Connect on WhatsApp
              </button>
            </div>

            {/* General Info list */}
            <div className="space-y-4">
              {[
                { icon: Mail, label: 'Email Address', value: contactInfo.email, link: `mailto:${contactInfo.email}` },
                { icon: Phone, label: 'Phone Call', value: contactInfo.phone, link: `tel:${contactInfo.phone}` },
                { icon: MapPin, label: 'Registered Address', value: 'Tapovan Spices, APEDA Certified Processor, Gujarat, India', link: null },
                { icon: Clock, label: 'Business Hours', value: 'Monday - Saturday: 9:00 AM - 6:00 PM (IST)\nSunday: Closed', link: null },
              ].map((item, i) => {
                const Icon = item.icon
                const content = (
                  <div key={item.label} className="flex gap-4 p-5 rounded-2xl bg-white shadow-sm border border-stone-200/20">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(201,164,84,0.1)' }}>
                      <Icon size={16} style={{ color: '#C9A454' }} />
                    </div>
                    <div>
                      <div className="text-[10px] font-bold uppercase tracking-wider text-stone-400">{item.label}</div>
                      <div className="text-xs font-semibold text-stone-700 whitespace-pre-line mt-0.5">{item.value}</div>
                    </div>
                  </div>
                )
                return item.link ? (
                  <a key={item.label} href={item.link} className="block no-underline hover:opacity-90 transition-opacity">
                    {content}
                  </a>
                ) : content
              })}
            </div>
          </motion.div>

          {/* Form Side & Payment Methods (7 cols) */}
          <motion.div
            className="lg:col-span-7 flex flex-col gap-6"
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3 }}
          >
            {/* Form */}
            <div className="rounded-3xl bg-white p-6 md:p-8 border border-stone-200/20 shadow-md">
              <h3 className="font-serif text-lg font-bold text-stone-900 mb-5 pb-2 border-b border-stone-100">
                Send Direct WhatsApp Inquiry
              </h3>
              
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-600 mb-1">Full Name *</label>
                    <input {...register('name', { required: true })} className="input-field text-xs py-2 px-3" placeholder="Your name" />
                    {errors.name && <p className="text-[10px] text-rose-500 mt-1">Required</p>}
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-stone-600 mb-1">Company (Optional)</label>
                    <input {...register('company')} className="input-field text-xs py-2 px-3" placeholder="Company name" />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-600 mb-1">Email Address *</label>
                    <input {...register('email', { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ })} type="email" className="input-field text-xs py-2 px-3" placeholder="your@email.com" />
                    {errors.email && <p className="text-[10px] text-rose-500 mt-1">Valid email required</p>}
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-stone-600 mb-1">Phone / WhatsApp</label>
                    <input {...register('phone')} className="input-field text-xs py-2 px-3" placeholder="+91 XXXXX XXXXX" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-600 mb-1">Inquiry Type</label>
                  <select {...register('type')} className="input-field text-xs py-2 px-3 bg-white" style={{ appearance: 'none' }}>
                    <option value="general">General Corporate Inquiry</option>
                    <option value="export">Export / Bulk Order</option>
                    <option value="distributor">Distributor Partnership</option>
                    <option value="private">Private Label / OEM Packaging</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-600 mb-1">Message *</label>
                  <textarea 
                    {...register('message', { required: true })} 
                    className="input-field text-xs py-2 px-3 overscroll-contain" 
                    style={{ overscrollBehavior: 'contain' }}
                    onWheel={(e) => e.stopPropagation()}
                    onTouchMove={(e) => e.stopPropagation()}
                    rows={4} 
                    placeholder="Specify details, quantity requirements, packaging specifications..." 
                  />
                  {errors.message && <p className="text-[10px] text-rose-500 mt-1">Required</p>}
                </div>

                <button type="submit" className="btn-primary w-full justify-center py-3">
                  <Send size={14} /> Format & Send via WhatsApp
                </button>
              </form>
            </div>

            {/* Offline Payment Methods card */}
            <div className="rounded-3xl bg-white p-6 border border-stone-200/20 shadow-sm space-y-4">
              <h4 className="font-serif text-sm font-bold text-stone-900 border-b border-stone-100 pb-2 flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-[#9C7A2E]" /> Accepted Offline Payment Methods
              </h4>
              <p className="text-xs text-stone-500 leading-relaxed">
                Payment is settled securely offline after order validation. We will never collect credentials or credit card details on this website. Our team shares payment details directly.
              </p>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
                {[
                  'Bank Transfer', 'UPI Payments', 'NEFT / RTGS', 'IMPS / TT',
                  'Letter of Credit', 'Western Union', 'Cash (Local)', 'T/T Advance'
                ].map(m => (
                  <span key={m} className="px-2.5 py-1.5 bg-stone-50 rounded-xl text-[10px] font-semibold text-stone-600 border border-stone-200/40">
                    {m}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
