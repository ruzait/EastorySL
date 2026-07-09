import { useParams, Link } from 'react-router-dom'
import { FiArrowLeft, FiMapPin, FiClock, FiDollarSign, FiSun, FiNavigation, FiAward } from 'react-icons/fi'
import { motion } from 'framer-motion'
import { destinations } from '../data/destinations'
import { distanceFromColombo } from '../utils/distance'
import SEO from '../components/seo/SEO'

const catMeta = {
  beaches: { label: 'Beaches', color: 'sky', gradient: 'from-sky-500 to-cyan-500' },
  nature: { label: 'Nature', color: 'emerald', gradient: 'from-emerald-600 to-green-500' },
  waterfalls: { label: 'Waterfalls', color: 'blue', gradient: 'from-blue-600 to-indigo-500' },
  mountains: { label: 'Mountains', color: 'stone', gradient: 'from-stone-600 to-slate-500' },
  wildlife: { label: 'Wildlife', color: 'amber', gradient: 'from-amber-600 to-yellow-500' },
  parks: { label: 'Parks', color: 'green', gradient: 'from-green-600 to-emerald-500' },
  historical: { label: 'Historical', color: 'orange', gradient: 'from-orange-600 to-red-500' },
  religious: { label: 'Religious', color: 'purple', gradient: 'from-purple-600 to-pink-500' },
  forts: { label: 'Forts', color: 'rose', gradient: 'from-rose-600 to-red-500' },
  'lakes & rivers': { label: 'Lakes & Rivers', color: 'cyan', gradient: 'from-cyan-600 to-teal-500' },
  islands: { label: 'Islands', color: 'teal', gradient: 'from-teal-600 to-cyan-500' },
  'botanical gardens': { label: 'Botanical Gardens', color: 'lime', gradient: 'from-lime-600 to-green-500' },
  cultural: { label: 'Cultural', color: 'violet', gradient: 'from-violet-600 to-purple-500' },
  'scenic train journeys': { label: 'Scenic Train Journeys', color: 'slate', gradient: 'from-slate-600 to-gray-500' },
  viewpoints: { label: 'Viewpoints', color: 'yellow', gradient: 'from-yellow-600 to-amber-500' },
  'marine attractions': { label: 'Marine Attractions', color: 'ocean', gradient: 'from-blue-700 to-cyan-600' },
  'adventure activities': { label: 'Adventure', color: 'red', gradient: 'from-red-600 to-orange-500' },
  'festivals & events': { label: 'Festivals & Events', color: 'pink', gradient: 'from-pink-600 to-rose-500' },
}

export default function DestinationDetail() {
  const { category, id } = useParams()
  const item = destinations.find((d) => d.id === id && d.category === category)
  const meta = catMeta[category] || { label: 'Destination', color: 'teal', gradient: 'from-teal-500 to-cyan-500' }

  if (!item) {
    return (
      <div className="min-h-screen pt-28 px-4">
        <div className="container-custom text-center py-20">
          <p className="text-slate-400 text-lg mb-4">Destination not found</p>
          <Link to="/destinations" className="text-teal-600 hover:underline">Back to Destinations</Link>
        </div>
      </div>
    )
  }

  const jsonLd = item ? {
    '@context': 'https://schema.org',
    '@type': 'TouristAttraction',
    name: item.name,
    description: item.description,
    image: item.image,
    url: `${import.meta.env.VITE_SITE_URL || 'https://eastorysl.netlify.app'}/destinations/${category}/${id}`,
    ...(item.location && { address: { '@type': 'PostalAddress', addressLocality: item.location, addressRegion: item.district } }),
    ...(item.coordinates && { geo: { '@type': 'GeoCoordinates', latitude: item.coordinates[0], longitude: item.coordinates[1] } }),
  } : null

  return (
    <div>
      <SEO
        title={item.name}
        description={`${item.description} Located in ${item.location || item.district || 'Sri Lanka'}.`}
        ogImage={item.image}
        ogUrl={`${import.meta.env.VITE_SITE_URL || 'https://eastorysl.netlify.app'}/destinations/${category}/${id}`}
        keywords={`${item.name}, ${meta.label}, ${item.location || ''}, ${item.district || ''}, Sri Lanka travel, Eastern Sri Lanka`}
        jsonLd={jsonLd}
      />
      <section className="relative pt-28 md:pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-teal-950 to-slate-900">
          <div className="absolute inset-0 opacity-10 bg-grid" />
        </div>
        <div className="container-custom relative z-10 px-4 sm:px-6 lg:px-8">
          <Link
            to="/destinations"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white text-sm font-medium mb-6 transition-colors"
          >
            <FiArrowLeft /> Back to Destinations
          </Link>
          <div className="flex flex-col md:flex-row md:items-end gap-6 md:gap-10">
            <div className="w-full md:w-80 lg:w-96 shrink-0">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              </div>
            </div>
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/20 text-white backdrop-blur-sm">
                  {meta.label}
                </span>
                {item.tier === 'premium' && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-400/30 text-white backdrop-blur-sm">
                    <FiAward className="text-sm" /> Premium Pick
                  </span>
                )}
                {item.tier === 'featured' && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-400/30 text-white backdrop-blur-sm">
                    <FiAward className="text-sm" /> Featured
                  </span>
                )}
              </div>
              <h1 className="text-3xl md:text-5xl font-heading font-bold text-white mb-3">{item.name}</h1>
              {item.location && (
                <div className="flex items-center gap-2 text-white/80 text-sm mb-4">
                  <FiMapPin className="text-white/60" />
                  <span>{item.location}{item.district ? `, ${item.district} District` : ''}</span>
                </div>
              )}
              <p className="text-white/90 text-base md:text-lg max-w-2xl leading-relaxed">{item.description}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl shadow-lg border border-slate-100 p-6 md:p-8"
              >
                <h2 className="text-xl font-heading font-bold text-slate-900 mb-4">Quick Info</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {item.duration && (
                    <div className="bg-slate-50 rounded-xl p-4 text-center">
                      <FiClock className="text-teal-500 text-xl mx-auto mb-1" />
                      <div className="text-lg font-bold text-slate-800">{item.duration}</div>
                      <div className="text-xs text-slate-500">Duration</div>
                    </div>
                  )}
                  {item.entryFee && (
                    <div className="bg-slate-50 rounded-xl p-4 text-center">
                      <FiDollarSign className="text-emerald-500 text-xl mx-auto mb-1" />
                      <div className="text-lg font-bold text-slate-800">{item.entryFee}</div>
                      <div className="text-xs text-slate-500">Entry Fee</div>
                    </div>
                  )}
                  {item.bestTime && (
                    <div className="bg-slate-50 rounded-xl p-4 text-center">
                      <FiSun className="text-amber-500 text-xl mx-auto mb-1" />
                      <div className="text-lg font-bold text-slate-800">{item.bestTime}</div>
                      <div className="text-xs text-slate-500">Best Time</div>
                    </div>
                  )}
                  {item.district && (
                    <div className="bg-slate-50 rounded-xl p-4 text-center">
                      <FiMapPin className="text-teal-500 text-xl mx-auto mb-1" />
                      <div className="text-lg font-bold text-slate-800">{item.district}</div>
                      <div className="text-xs text-slate-500">District</div>
                    </div>
                  )}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-2xl shadow-lg border border-slate-100 p-6 md:p-8"
              >
                <h2 className="text-xl font-heading font-bold text-slate-900 mb-4">About</h2>
                <div className="prose prose-slate max-w-none">
                  <p className="text-slate-600 leading-relaxed whitespace-pre-line">{item.detail || item.description}</p>
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl shadow-lg border border-slate-100 p-6 space-y-4"
            >
              <div>
                <h3 className="text-sm font-heading font-semibold text-slate-700 mb-3">Category</h3>
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-br ${meta.gradient} text-white`}>
                  {meta.label}
                </span>
              </div>
              <div className="pt-4 border-t border-slate-100">
                <h3 className="text-sm font-heading font-semibold text-slate-700 mb-3">Tier</h3>
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
                  item.tier === 'premium' ? 'bg-amber-100 text-amber-800' :
                  item.tier === 'featured' ? 'bg-blue-100 text-blue-800' :
                  'bg-slate-100 text-slate-600'
                }`}>
                  <FiAward className="text-sm" />
                  {item.tier === 'premium' ? 'Premium Pick' : item.tier === 'featured' ? 'Featured' : 'Free'}
                </span>
              </div>
              {item.coordinates && (
                <div className="pt-4 border-t border-slate-100">
                  <h3 className="text-sm font-heading font-semibold text-slate-700 mb-3">Location</h3>
                  <div className="text-xs text-slate-500 mb-3">
                    {item.coordinates[0]}°N, {item.coordinates[1]}°E
                    <div className="mt-1 text-teal-600 font-medium">
                      {distanceFromColombo(item.coordinates)} km from Colombo
                    </div>
                  </div>
                  <a
                    href={`https://www.google.com/maps/dir/?api=1&destination=${item.coordinates[0]},${item.coordinates[1]}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full min-h-[44px] rounded-xl bg-teal-50 text-teal-700 text-sm font-semibold hover:bg-teal-100 transition-all"
                  >
                    <FiNavigation /> Get Directions
                  </a>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
