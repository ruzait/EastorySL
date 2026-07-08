import { Link } from 'react-router-dom'
import { FiArrowRight, FiCamera } from 'react-icons/fi'
import AnimatedSection from '../ui/AnimatedSection'

export default function CTA() {
  return (
    <section className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url(/images/home/mirrissa.jpg)', backgroundPosition: 'left bottom' }} />
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/90 via-teal-950/80 to-slate-900/90" />
      <div className="absolute inset-0 opacity-10 bg-grid" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      <div className="container-custom relative z-10 text-center">
        <AnimatedSection className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-white mb-4">Discover the Magic of <span className="bg-gradient-to-r from-sunset-400 via-rose-500 to-sunset-600 bg-clip-text text-transparent">Sri Lanka</span></h2>
          <p className="text-white/70 text-lg md:text-xl mb-8 max-w-xl mx-auto">
            Golden beaches, misty mountains, ancient ruins, and warm smiles — experience an island like no other.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/destinations"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-teal-500 to-ocean-500 text-white font-semibold text-sm hover:shadow-lg hover:shadow-teal-500/30 transition-all duration-300"
              >
                Explore Destinations
                <FiArrowRight />
              </Link>
            <Link
              to="/gallery"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold text-sm hover:bg-white/20 transition-all duration-300"
            >
              <FiCamera />
              View Gallery
            </Link>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
