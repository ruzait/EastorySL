import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiMapPin, FiStar, FiClock, FiCalendar, FiNavigation } from 'react-icons/fi'
import { GiCrown, GiCaveEntrance, GiTeapotLeaves } from 'react-icons/gi'
import { FaLandmark, FaCity, FaUtensils, FaRoute, FaUsers } from 'react-icons/fa'
import Badge from '../ui/Badge'

const meta = {
  'ancient-kingdoms': { icon: GiCrown, label: 'Ancient', border: 'hover:border-amber-200', iconColor: 'text-amber-500' },
  'caves-geological-wonders': { icon: GiCaveEntrance, label: 'Geology', border: 'hover:border-stone-200', iconColor: 'text-stone-500' },
  'museums-galleries': { icon: FaLandmark, label: 'Museum', border: 'hover:border-indigo-200', iconColor: 'text-indigo-500' },
  'cities-urban': { icon: FaCity, label: 'Urban', border: 'hover:border-blue-200', iconColor: 'text-blue-500' },
  'food-culinary': { icon: FaUtensils, label: 'Food', border: 'hover:border-red-200', iconColor: 'text-red-500' },
  'tea-spice-trails': { icon: GiTeapotLeaves, label: 'Tea & Spice', border: 'hover:border-green-200', iconColor: 'text-green-500' },
  'road-trip-routes': { icon: FaRoute, label: 'Road Trip', border: 'hover:border-teal-200', iconColor: 'text-teal-500' },
  'famous-people': { icon: FaUsers, label: 'Famous', border: 'hover:border-rose-200', iconColor: 'text-rose-500' },
}

const accentGradients = {
  'ancient-kingdoms': 'from-amber-950 to-yellow-900',
  'caves-geological-wonders': 'from-stone-900 to-neutral-800',
  'museums-galleries': 'from-indigo-950 to-purple-900',
  'cities-urban': 'from-blue-950 to-cyan-900',
  'food-culinary': 'from-rose-950 to-red-900',
  'tea-spice-trails': 'from-emerald-950 to-green-900',
  'road-trip-routes': 'from-teal-950 to-sky-900',
  'famous-people': 'from-pink-950 to-rose-900',
}

const subBadgeMap = {
  'national-heroes': 'premium',
  'sports-legends': 'featured',
  'arts-entertainment': 'new',
  'science-tech': 'featured',
  'writers-literature': 'free',
  'global-achievers': 'premium',
}

const subLabelMap = {
  'national-heroes': 'National Heroes',
  'sports-legends': 'Sports Legends',
  'arts-entertainment': 'Arts & Film',
  'science-tech': 'Science & Tech',
  'writers-literature': 'Writers',
  'global-achievers': 'Global Achievers',
}

const spiceLabels = ['Mild', 'Medium', 'Spicy', 'Very Spicy', 'Inferno']

export default function PrideCard({ item, index }) {
  const m = meta[item.category] || meta['ancient-kingdoms']
  const Icon = m.icon
  const isFamous = item.category === 'famous-people'
  const isFood = item.category === 'food-culinary'

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
    >
      <Link
        to={`/sri-lanka-pride/${encodeURIComponent(item.category)}/${item.id}`}
        className={`group block bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-slate-100 ${m.border}`}
      >
        <div className={`relative h-48 sm:h-56 overflow-hidden ${isFamous ? 'flex items-center justify-center bg-slate-100' : ''}`}>
          <img
            src={item.image}
            alt={item.name}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-transparent" />
          <div className="absolute top-3 right-3 flex gap-2">
            {isFamous && item.subCategory && (
              <Badge variant={subBadgeMap[item.subCategory] || 'free'}>
                {subLabelMap[item.subCategory] || item.subCategory}
              </Badge>
            )}
            <div className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-gradient-to-br ${accentGradients[item.category] || accentGradients['ancient-kingdoms']} text-white shadow-lg`}>
              <span className="flex items-center gap-1">
                <Icon className="text-[10px]" />
                {m.label}
              </span>
            </div>
          </div>
          <div className="absolute bottom-3 left-4 right-4">
            <h3 className="text-white font-heading font-bold text-lg leading-tight truncate">
              {item.name}
            </h3>
            {(item.location || item.origin || item.birthPlace) && (
              <div className="flex items-center gap-1 text-white/70 text-xs mt-1">
                <FiMapPin className={m.iconColor} />
                <span>{item.location || item.origin || item.birthPlace}</span>
              </div>
            )}
          </div>
        </div>
        <div className="p-5">
          {isFood && item.spiceLevel && (
            <div className="flex items-center gap-2 mb-3">
              <div className="flex items-center gap-0.5">
                {[1, 2, 3, 4, 5].map((level) => (
                  <FiStar
                    key={level}
                    className={`text-xs ${level <= item.spiceLevel ? 'text-red-500 fill-red-500' : 'text-slate-200'}`}
                  />
                ))}
              </div>
              <span className="text-xs text-slate-400">{spiceLabels[item.spiceLevel - 1]}</span>
            </div>
          )}
          <p className="text-slate-600 text-sm leading-relaxed line-clamp-3 mb-3">
            {item.description}
          </p>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500">
            {item.period && (
              <span className="flex items-center gap-1 text-slate-400">
                <FiCalendar className={m.iconColor} />
                {item.period}
              </span>
            )}
            {item.duration && (
              <span className="flex items-center gap-1 text-slate-400">
                <FiClock className={m.iconColor} />
                {item.duration}
              </span>
            )}
            {item.stops && (
              <span className="flex items-center gap-1 text-slate-400">
                <FaRoute className={m.iconColor} />
                {item.stops} stops
              </span>
            )}
            {item.district && (
              <span className="flex items-center gap-1 text-slate-400">
                <FiMapPin className={m.iconColor} />
                {item.district}
              </span>
            )}
            {item.birthYear && (
              <span className="flex items-center gap-1 text-slate-400">
                <FiCalendar className={m.iconColor} />
                b. {item.birthYear}
              </span>
            )}
          </div>
          {item.coordinates && (
            <div className="mt-3 pt-3 border-t border-slate-100">
              <div
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  window.open(`https://www.google.com/maps/dir/?api=1&destination=${item.coordinates[0]},${item.coordinates[1]}`, '_blank', 'noopener,noreferrer')
                }}
                className="inline-flex items-center justify-center gap-2 w-full min-h-[40px] px-4 py-2 rounded-xl bg-slate-100 text-slate-600 text-xs font-semibold hover:bg-slate-200 hover:shadow-md transition-all duration-300 cursor-pointer"
              >
                <FiNavigation className="text-sm" />
                Get Directions
              </div>
            </div>
          )}
        </div>
      </Link>
    </motion.div>
  )
}
