import Navbar from './components/Navbar'
import Hero from './components/Hero'
import TrustStrip from './components/TrustStrip'
import About from './components/About'
import WhyChoose from './components/WhyChoose'
import ProductSlider from './components/ProductSlider'
import PackageSlider from './components/PackageSlider'
import ProductCategories from './components/ProductCategories'
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
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <TrustStrip />
        <About />
        <WhyChoose />
        <ProductSlider />
        <PackageSlider />
        <ProductCategories />
        <ExportMarkets />
        <Packaging />
        <Process />
        <Certifications />
        <RecipeInspiration />
        <Testimonials />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

export default App
