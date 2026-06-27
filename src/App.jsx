import Navbar from './components/Navbar'
import Hero from './components/Hero'
import TrustStrip from './components/TrustStrip'
import About from './components/About'
import WhyChoose from './components/WhyChoose'
import ProductSlider from './components/ProductSlider'
import ProductCategories from './components/ProductCategories'
import ExportMarkets from './components/ExportMarkets'
import Packaging from './components/Packaging'
import Process from './components/Process'
import Certifications from './components/Certifications'
import Testimonials from './components/Testimonials'
import FAQ from './components/FAQ'
import Contact from './components/Contact'
import Footer from './components/Footer'

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <TrustStrip />
        <About />
        <WhyChoose />
        <ProductSlider />
        <ProductCategories />
        <ExportMarkets />
        <Packaging />
        <Process />
        <Certifications />
        <Testimonials />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

export default App
