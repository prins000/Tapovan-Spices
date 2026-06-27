import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import TrustStrip from './components/TrustStrip'
import About from './components/About'
import PackageSlider from './components/PackageSlider'
import Mission from './components/Mission'
import WhyChoose from './components/WhyChoose'
import ProductCategories from './components/ProductCategories'
import ProductDetailPage from './components/ProductDetailPage'
import ExportMarkets from './components/ExportMarkets'
import Packaging from './components/Packaging'
import Process from './components/Process'
import Certifications from './components/Certifications'
import RecipeInspiration from './components/RecipeInspiration'
import Testimonials from './components/Testimonials'
import FAQ from './components/FAQ'
import Contact from './components/Contact'
import Footer from './components/Footer'

function App() {
  const [activeProduct, setActiveProduct] = useState(null)

  return (
    <>
      <Navbar onHomeClick={() => setActiveProduct(null)} />
      <AnimatePresence mode="wait">
        {activeProduct ? (
          <ProductDetailPage 
            key="details"
            product={activeProduct} 
            onBack={() => {
              setActiveProduct(null)
              setTimeout(() => {
                const element = document.getElementById('products');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                  // Exact pixel fallback
                  const yOffset = -90;
                  const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
                  window.scrollTo({ top: y, behavior: 'smooth' });
                }
              }, 300)
            }} 
          />
        ) : (
          <motion.div 
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <main>
              <Hero />
              <TrustStrip />
              <About />
              <PackageSlider />
              <Mission />
              <WhyChoose />
              <ProductCategories onProductClick={(p) => {
                // 1. Scroll page to top smoothly
                window.scrollTo({ top: 0, behavior: 'smooth' });
                // 2. Wait for the scroll to reach/near the top before swapping content
                setTimeout(() => {
                  setActiveProduct(p);
                }, 500);
              }} />
              <ExportMarkets />
              <Packaging />
              <Process />
              <Certifications />
              <RecipeInspiration />
              <Testimonials />
              <FAQ />
              <Contact />
            </main>
          </motion.div>
        )}
      </AnimatePresence>
      <Footer />
    </>
  )
}

export default App
