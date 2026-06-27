import { ArrowUp, Instagram } from 'lucide-react'

const links = [
  { href: '#about', label: 'About Us' },
  { href: '#products', label: 'Products' },
  { href: '#export', label: 'Export' },
  { href: '#certifications', label: 'Certifications' },
  { href: '#contact', label: 'Contact' },
]

export default function Footer() {
  const go = (href) => document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <footer style={{ background: '#1A1F2E' }}>
      <div className="max-w-5xl mx-auto px-6 py-16">

        <div className="grid md:grid-cols-3 gap-12 mb-12">
          <div>
            <div className="flex items-center mb-5">
              <img
                src="/logo.png"
                alt="Tapovan Spices Logo"
                className="h-16 w-auto object-contain"
                style={{ filter: 'invert(1) brightness(1.8)' }}
              />
            </div>
            <p className="text-sm leading-relaxed mb-4" style={{ color: '#6B5B48' }}>
              Premium Indian spices and pulses exported worldwide since 2017. Pure Spices. Pure Goodness.
            </p>
            <p className="italic text-sm mb-4" style={{ color: '#C9A454', fontFamily: 'Cormorant Garamond, serif' }}>
              "From India to the World"
            </p>
            <div className="flex gap-4">
              <a
                href="https://www.instagram.com/tapovan_spices/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300"
                style={{ background: 'rgba(201,164,84,0.1)', color: '#C9A454' }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = '#C9A454';
                  e.currentTarget.style.color = '#1A1F2E';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'rgba(201,164,84,0.1)';
                  e.currentTarget.style.color = '#C9A454';
                }}
                title="Follow us on Instagram"
              >
                <Instagram size={16} />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-serif font-bold text-sm mb-5" style={{ color: '#FAF7F2' }}>Quick Links</h4>
            <ul className="space-y-3" style={{ listStyle: 'none', padding: 0 }}>
              {links.map(l => (
                <li key={l.label}>
                  <button
                    onClick={() => go(l.href)}
                    className="text-sm bg-transparent border-none cursor-pointer transition-colors duration-200"
                    style={{ color: '#9A8B78', padding: 0 }}
                    onMouseEnter={e => e.target.style.color = '#C9A454'}
                    onMouseLeave={e => e.target.style.color = '#9A8B78'}
                  >
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-serif font-bold text-sm mb-5" style={{ color: '#FAF7F2' }}>Contact</h4>
            <div className="space-y-3 text-sm" style={{ color: '#9A8B78' }}>
              <p>tapovanspice2401@gmail.com</p>
              <p>+91 70488 11883</p>
              <p>tapovanspices.com</p>
              <p>India</p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px mb-6" style={{ background: 'rgba(201,164,84,0.15)' }} />

        {/* Bottom */}
        <div className="flex items-center justify-between">
          <p className="text-xs" style={{ color: '#6B5B48' }}>
            © {new Date().getFullYear()} Tapovan Spices. All rights reserved.
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="w-9 h-9 rounded-full flex items-center justify-center border-none cursor-pointer"
            style={{ background: 'rgba(201,164,84,0.1)', color: '#C9A454' }}
            aria-label="Scroll to top"
          >
            <ArrowUp size={14} />
          </button>
        </div>
      </div>
    </footer>
  )
}
