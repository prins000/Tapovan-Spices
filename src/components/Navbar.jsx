import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const links = [
  { href: '#about', label: 'About' },
  { href: '#products', label: 'Products' },
  { href: '#export', label: 'Export' },
  { href: '#process', label: 'Process' },
  { href: '#contact', label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const go = (href) => {
    setOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'navbar-glass' : ''}`}
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className={`flex items-center justify-between transition-all duration-500 ${scrolled ? 'h-20' : 'h-28'}`}>
            {/* Logo */}
            <a href="#" className="flex items-center no-underline">
              <img
                src="/logo.png"
                alt="Tapovan Spices Logo"
                className={`w-auto object-contain transition-all duration-500 hover:scale-105 ${scrolled ? 'h-16' : 'h-24'}`}
              />
            </a>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-10">
              {links.map((l) => (
                <button
                  key={l.href}
                  onClick={() => go(l.href)}
                  className="font-sans text-[0.8125rem] font-medium bg-transparent border-none cursor-pointer transition-colors duration-200"
                  style={{ color: '#6B5B48' }}
                  onMouseEnter={e => e.target.style.color = '#9C7A2E'}
                  onMouseLeave={e => e.target.style.color = '#6B5B48'}
                >
                  {l.label}
                </button>
              ))}
            </nav>

            <button onClick={() => go('#contact')} className="hidden md:block btn-primary text-xs">
              Get Quote
            </button>

            <button className="md:hidden p-2 bg-transparent border-none cursor-pointer" onClick={() => setOpen(!open)} style={{ color: '#2A1F14' }}>
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile */}
      <AnimatePresence>
        {open && (
          <motion.div className="fixed inset-0 z-40 md:hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="absolute inset-0 bg-black/20" onClick={() => setOpen(false)} />
            <motion.div
              className="absolute top-0 right-0 bottom-0 w-72 p-8 pt-24"
              style={{ background: '#FAF7F2' }}
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            >
              <div className="flex flex-col gap-1">
                {links.map((l, i) => (
                  <motion.button
                    key={l.href}
                    onClick={() => go(l.href)}
                    className="text-left py-3.5 px-4 font-serif text-lg border-none bg-transparent cursor-pointer rounded-xl"
                    style={{ color: '#2A1F14' }}
                    initial={{ x: 30, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    {l.label}
                  </motion.button>
                ))}
                <button onClick={() => go('#contact')} className="btn-primary w-full justify-center mt-6">
                  Get Quote
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
