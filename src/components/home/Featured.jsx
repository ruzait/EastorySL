import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { FiArrowRight, FiStar, FiMapPin, FiSun, FiClock, FiDollarSign, FiAward, FiNavigation } from 'react-icons/fi'
import { motion, AnimatePresence } from 'framer-motion'
import SectionTitle from '../ui/SectionTitle'
import Badge from '../ui/Badge'
import { destinations } from '../../data/destinations'
import { getSeasonalDestinations, monthName } from '../../utils/season'
import { distanceFromColombo } from '../../utils/distance'

const popularCategories = [
  'All', 'Beaches', 'Nature', 'Wildlife', 'Historical', 'Waterfalls', 'Cultural', 'Adventure Activities'
]

const catEmoji = {
  beaches: '🏖️', nature: '🌿', wildlife: '🦁', historical: '🏛️',
  waterfalls: '💧', cultural: '🎭', 'adventure-activities': '🧗',
  religious: '🛕', parks: '🏞️', mountains: '⛰️', forts: '🏰',
  'lakes & rivers': '🌊', islands: '🏝️', 'botanical gardens': '🌺',
  'scenic train journeys': '🚂', viewpoints: '👁️', 'marine attractions': '🐠',
  'festivals & events': '🎪',
}

const categoryColors = {
  religious: { badge: 'featured' },
  historical: { badge: 'premium' },
  nature: { badge: 'new' },
  beaches: { badge: 'free' },
  cultural: { badge: 'featured' },
}

const tierConfig = {
  premium: { badge: 'premium', label: 'Premium Pick' },
  featured: { badge: 'featured', label: 'Featured' },
  free: { badge: 'free', label: '' },
}

function SeasonalCard({ dest, i }) {
  const tier = tierConfig[dest.tier] || tierConfig.free

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, delay: i * 0.06 }}
      viewport={{ once: true }}
    >
      <Link to={`/destinations/${encodeURIComponent(dest.category)}/${dest.id}`} className="block cursor-pointer h-full">
        <div className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-slate-100 italic h-full flex flex-col">
          <div className={`relative overflow-hidden ${dest.tier === 'premium' ? 'h-56 sm:h-64' : 'h-48 sm:h-56'}`}>
            <img
              src={dest.image}
              alt={dest.name}
              loading="lazy"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-transparent" />
            <div className="absolute top-3 right-3 flex gap-2">
              {dest.tier && tier.label && (
                <Badge variant={tier.badge}>
                  <FiAward className="text-[10px]" />
                  {tier.label}
                </Badge>
              )}
              <Badge variant={categoryColors[dest.category]?.badge || 'free'}>
                {catEmoji[dest.category] || ''} {dest.category}
              </Badge>
            </div>
            <div className="absolute bottom-3 left-4 right-4">
              <div className="flex items-center gap-1 text-white text-xs mb-1">
                <FiMapPin className="text-teal-400" />
                <span className="text-white/80">{dest.location}</span>
              </div>
              <h3 className="text-white font-heading font-bold text-lg leading-tight truncate">
                {dest.name}
              </h3>
            </div>
          </div>
          <div className="p-4 flex flex-col flex-1">
            <p className="text-slate-600 text-sm leading-relaxed mb-3 line-clamp-2">
              {dest.description}
            </p>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500 mb-2">
              {dest.district && (
                <span className="flex items-center gap-1 text-slate-400">
                  <FiMapPin className="text-teal-500" />
                  {dest.district} District
                </span>
              )}
              {dest.coordinates && (
                <span className="flex items-center gap-1 text-slate-400">
                  <FiNavigation className="text-teal-500" />
                  {distanceFromColombo(dest.coordinates)} km
                </span>
              )}
            </div>
            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 mb-3">
              {dest.rating && (
                <span className="flex items-center gap-1">
                  <FiStar className="text-amber-500" />
                  <span className="font-semibold text-slate-700">{dest.rating}</span>
                </span>
              )}
              {dest.duration && (
                <span className="flex items-center gap-1">
                  <FiClock className="text-teal-500" />
                  {dest.duration}
                </span>
              )}
              {dest.entryFee && (
                <span className="flex items-center gap-1">
                  <FiDollarSign className="text-teal-500" />
                  {dest.entryFee}
                </span>
              )}
              {dest.bestTime && (
                <span className="flex items-center gap-1 ml-auto text-amber-600">
                  <FiSun className="text-amber-500" />
                  {dest.bestTime}
                </span>
              )}
            </div>
            {dest.coordinates && (
              <div className="pt-2 border-t border-slate-100 mt-auto">
                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=${dest.coordinates[0]},${dest.coordinates[1]}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 w-full min-h-[40px] px-4 py-2 rounded-xl bg-gradient-to-r from-teal-500 to-ocean-600 text-white text-sm font-semibold shadow-md shadow-teal-500/20 hover:shadow-teal-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
                >
                  <FiNavigation className="text-sm" />
                  Get Directions
                </a>
              </div>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

export default function Featured() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [showAllFilters, setShowAllFilters] = useState(false)
  const now = new Date()
  const currentMonth = monthName(now.getMonth() + 1)
  const monthLabel = now.toLocaleString('default', { month: 'long' })

  const seasonal = useMemo(() => {
    return getSeasonalDestinations(destinations, currentMonth, activeCategory).slice(0, 3)
  }, [currentMonth, activeCategory])

  return (
    <section className="section-padding relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50/50">
      <div className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'radial-gradient(circle at 25% 25%, #0d9488 0%, transparent 50%), radial-gradient(circle at 75% 75%, #0284c7 0%, transparent 50%)',
        }}
      />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-teal-200/40 to-transparent" />

      <div className="container-custom relative z-10">
        <SectionTitle
          subtitle={`Seasonal Picks — ${monthLabel}`}
          title={`Best Places to Visit in ${monthLabel}`}
          description={`Top-rated destinations perfect for a ${monthLabel} getaway — from misty mountains to sun-drenched beaches.`}
        />

        {/* Filter bar */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {popularCategories.slice(0, showAllFilters ? undefined : 5).map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-sm font-bold font-['Poppins'] transition-all duration-300 ${
                activeCategory === cat
                  ? 'bg-gradient-to-r from-teal-600 to-teal-500 text-white shadow-lg shadow-teal-500/30 scale-[1.02]'
                  : 'bg-white text-slate-600 border border-slate-200 hover:border-teal-300 hover:text-teal-600 hover:shadow-md hover:-translate-y-0.5'
              }`}
            >
              {cat !== 'All' && <span className="mr-1.5">{catEmoji[cat.toLowerCase().replace(/\s+/g, '-')]}</span>}
              {cat}
            </button>
          ))}
          {popularCategories.length > 5 && (
            <button
              onClick={() => setShowAllFilters(!showAllFilters)}
              className="px-3 py-2 rounded-xl text-xs font-bold font-['Poppins'] text-slate-400 hover:text-teal-600 transition-colors"
            >
              {showAllFilters ? 'Less' : `+${popularCategories.length - 5} more`}
            </button>
          )}
        </div>

        {/* 2x4 Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 max-w-5xl mx-auto mb-10">
          <AnimatePresence mode="popLayout">
            {seasonal.map((dest, i) => (
              <SeasonalCard key={dest.id} dest={dest} i={i} />
            ))}
          </AnimatePresence>
        </div>

        {seasonal.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-400 text-sm">No destinations found for this category in {monthLabel}.</p>
          </div>
        )}

        <div className="text-center">
          <Link
            to="/destinations"
            className="group inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-gradient-to-r from-teal-600 to-ocean-500 text-white font-heading font-semibold italic text-sm shadow-lg shadow-teal-500/20 hover:shadow-xl hover:shadow-teal-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
          >
            View All Destinations
            <FiArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>
      </div>
    </section>
  )
}
