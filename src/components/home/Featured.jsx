import { useState, useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FiArrowRight, FiMapPin, FiSun, FiClock, FiDollarSign, FiAward, FiNavigation, FiCalendar } from 'react-icons/fi'

import { motion, AnimatePresence } from 'framer-motion'
import SectionTitle from '../ui/SectionTitle'
import Badge from '../ui/Badge'
import { destinations } from '../../data/destinations'
import { prideItems } from '../../data/sriLankaPride'
import { getSeasonalDestinations, getSeasonalFoods, monthName } from '../../utils/season'
import { distanceFromColombo } from '../../utils/distance'

const popularCategories = [
  'All', 'Beaches', 'Nature', 'Wildlife', 'Historical', 'Waterfalls', 'Cultural', 'Adventure Activities'
]

const catEmoji = {
  beaches: '\u{1F3D6}\u{FE0F}', nature: '\u{1F33F}', wildlife: '\u{1F981}', historical: '\u{1F3DB}\u{FE0F}',
  waterfalls: '\u{1F4A7}', cultural: '\u{1F3AD}', 'adventure-activities': '\u{1F9D7}',
  religious: '\u{1F6D5}', parks: '\u{1F3DE}\u{FE0F}', mountains: '\u{26F0}\u{FE0F}', forts: '\u{1F3F0}',
  'lakes & rivers': '\u{1F30A}', islands: '\u{1F3DD}\u{FE0F}', 'botanical gardens': '\u{1F33A}',
  'scenic train journeys': '\u{1F682}', viewpoints: '\u{1F441}\u{FE0F}', 'marine attractions': '\u{1F420}',
  'festivals & events': '\u{1F389}',
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
  const navigate = useNavigate()
  const tier = tierConfig[dest.tier] || tierConfig.free

  function handleClick(e) {
    if (e.target.closest('button')) return
    navigate(`/destinations/${encodeURIComponent(dest.category)}/${dest.id}`)
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      navigate(`/destinations/${encodeURIComponent(dest.category)}/${dest.id}`)
    }
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, delay: i * 0.06 }}
      viewport={{ once: true }}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="link"
      className="cursor-pointer h-full"
    >
      <div className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-slate-100 italic h-full flex flex-col">
        <div className="relative overflow-hidden h-48 sm:h-56">
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
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  window.open(`https://www.google.com/maps/dir/?api=1&destination=${dest.coordinates[0]},${dest.coordinates[1]}`, '_blank', 'noopener,noreferrer')
                }}
                className="inline-flex items-center justify-center gap-2 w-full min-h-[40px] px-4 py-2 rounded-xl bg-gradient-to-r from-teal-500 to-ocean-600 text-white text-sm font-semibold shadow-md shadow-teal-500/20 hover:shadow-teal-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
              >
                <FiNavigation className="text-sm" />
                Get Directions
              </button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}

function SeasonalFoodCard({ food, i }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, delay: i * 0.06 }}
      viewport={{ once: true }}
    >
      <Link to={`/sri-lanka-pride/seasonal-foods/${food.id}`} className="block cursor-pointer h-full">
        <div className="group rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-slate-100 hover:border-teal-200 h-full flex flex-col bg-white">
          <div className="relative h-48 sm:h-56 overflow-hidden">
            <img
              src={food.image}
              alt={food.name}
              loading="lazy"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-transparent" />
            <div className="absolute bottom-3 left-4 right-4">
              <h3 className="text-white font-heading font-bold text-lg leading-tight truncate">
                {food.name}
              </h3>
            </div>
          </div>
          <div className="p-4 flex flex-col flex-1">
            <p className="text-slate-600 text-sm leading-relaxed line-clamp-2 mb-3">
              {food.description}
            </p>
            <div className="flex items-center flex-wrap gap-x-3 gap-y-1 text-xs text-slate-500 mb-2">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-teal-50 text-teal-700 font-semibold">
                <FiCalendar className="text-[10px]" />
                {food.seasonMonths}
              </span>
              <span>
                {food.seasonName}
              </span>
            </div>
            {food.origin && (
              <div className="flex items-center gap-1 text-xs text-slate-500 mt-auto pt-2 border-t border-slate-100">
                <FiMapPin className="text-teal-500" />
                <span className="truncate">{food.origin}</span>
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
  const now = new Date()
  const currentMonth = monthName(now.getMonth() + 1)
  const monthLabel = now.toLocaleString('default', { month: 'long' })

  const { places, foods } = useMemo(() => {
    const dests = getSeasonalDestinations(destinations, currentMonth, activeCategory).slice(0, 3)
    const seasonalFoods = getSeasonalFoods(prideItems, currentMonth).slice(0, 3)
    return { places: dests, foods: seasonalFoods }
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
          description={`Top-rated destinations and seasonal fruits at their peak in ${monthLabel}.`}
        />

        {/* Filter bar */}
        <div className="flex gap-2 mb-8 overflow-x-auto scroll-smooth no-scrollbar justify-start lg:flex-wrap lg:justify-center lg:overflow-visible">
          {popularCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-sm font-bold font-['Poppins'] transition-all duration-300 whitespace-nowrap shrink-0 lg:whitespace-normal lg:shrink ${
                activeCategory === cat
                  ? 'bg-gradient-to-r from-teal-600 to-teal-500 text-white shadow-lg shadow-teal-500/30 scale-[1.02]'
                  : 'bg-white text-slate-600 border border-slate-200 hover:border-teal-300 hover:text-teal-600 hover:shadow-md hover:-translate-y-0.5'
              }`}
            >
              {cat !== 'All' && <span className="mr-1.5">{catEmoji[cat.toLowerCase().replace(/\s+/g, '-')]}</span>}
              {cat}
            </button>
          ))}
        </div>

        {/* Places row */}
        {places.length > 0 && (
          <div className="mb-8">
            <h3 className="text-sm font-heading font-bold text-slate-500 uppercase tracking-wider mb-4 text-center">
              Places to Visit
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 max-w-5xl mx-auto">
              <AnimatePresence mode="popLayout">
                {places.map((dest, i) => (
                  <SeasonalCard key={dest.id} dest={dest} i={i} />
                ))}
              </AnimatePresence>
            </div>
          </div>
        )}

        {/* Foods row */}
        {foods.length > 0 && (
          <div className="mb-10">
            <h3 className="text-sm font-heading font-bold text-slate-500 uppercase tracking-wider mb-4 text-center">
              In Season Now
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 max-w-5xl mx-auto">
              <AnimatePresence mode="popLayout">
                {foods.map((f, i) => (
                  <SeasonalFoodCard key={f.id} food={f} i={i} />
                ))}
              </AnimatePresence>
            </div>
          </div>
        )}

        {places.length === 0 && foods.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-400 text-sm">No seasonal picks found for {monthLabel}.</p>
          </div>
        )}

        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/destinations"
            className="group inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-gradient-to-r from-teal-600 to-ocean-500 text-white font-heading font-semibold italic text-sm shadow-lg shadow-teal-500/20 hover:shadow-xl hover:shadow-teal-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
          >
            View All Destinations
            <FiArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
          <Link
            to="/sri-lanka-pride?category=Seasonal+Foods"
            className="group inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-white text-slate-700 font-heading font-semibold italic text-sm border border-slate-200 shadow-sm hover:border-teal-300 hover:text-teal-700 hover:shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
          >
            Explore Seasonal Foods
            <FiArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>
      </div>
    </section>
  )
}