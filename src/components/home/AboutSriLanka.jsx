import AnimatedSection from '../ui/AnimatedSection'

export default function AboutSriLanka() {
  return (
    <section className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url(/images/home/slfleg.png)' }} />
      <div className="absolute inset-0 backdrop-blur-sm" />
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 via-teal-950/70 to-slate-900/80" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-teal-500/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-teal-500/30 to-transparent" />
      <div className="container-custom relative z-10">
        <AnimatedSection className="max-w-4xl mx-auto text-center">
          <span className="inline-block text-xs font-bold text-teal-400 uppercase tracking-widest mb-3">
            Pearl of the Indian Ocean
          </span>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold text-white mb-6">
            Why Sri Lanka?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8 text-left">
            <div className="p-6 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-md">
              <h3 className="text-teal-400 font-heading font-bold text-lg mb-2">Nature & Wildlife</h3>
              <p className="text-white/60 text-sm leading-relaxed">
                From elephant safaris in Minneriya to whale watching in Mirissa, Sri Lanka is a paradise for nature lovers with 26 national parks and countless endemic species.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-md">
              <h3 className="text-teal-400 font-heading font-bold text-lg mb-2">Culture & Heritage</h3>
              <p className="text-white/60 text-sm leading-relaxed">
                With 8 UNESCO World Heritage Sites, ancient kingdoms, and centuries-old traditions, the island's rich cultural tapestry is waiting to be explored.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-md">
              <h3 className="text-teal-400 font-heading font-bold text-lg mb-2">Beaches & Adventure</h3>
              <p className="text-white/60 text-sm leading-relaxed">
                Over 1,600 km of coastline with golden beaches, world-class surf breaks, coral reefs, and water sports make Sri Lanka a top beach destination.
              </p>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
