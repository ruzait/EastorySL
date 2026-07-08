import { useMemo, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FiMapPin, FiStar, FiSearch, FiX, FiChevronRight } from 'react-icons/fi'

const CATEGORIES = [
  'All Destinations', 'Beaches', 'Waterfalls', 'Mountains', 'Historical Sites',
  'Religious Places', 'Restaurants', 'Hotels', 'Shopping', 'Discover more',
  'Museums', 'Wildlife', 'Parks',
]

const categoryColors = {
  religious: 'bg-teal-100 text-teal-700',
  historical: 'bg-ocean-100 text-ocean-700',
  nature: 'bg-emerald-100 text-emerald-700',
  beaches: 'bg-ocean-100 text-ocean-700',
  cultural: 'bg-coral-100 text-coral-700',
  adventure: 'bg-sunset-100 text-sunset-700',
  Accommodation: 'bg-purple-100 text-purple-700',
  Dining: 'bg-sunset-100 text-sunset-700',
  Shopping: 'bg-pink-100 text-pink-700',
  'Water Sports': 'bg-ocean-100 text-ocean-700',
  Tours: 'bg-teal-100 text-teal-700',
  Hotel: 'bg-purple-100 text-purple-700',
  Restaurant: 'bg-sunset-100 text-sunset-700',
  Shop: 'bg-pink-100 text-pink-700',
  Service: 'bg-teal-100 text-teal-700',
  default: 'bg-slate-100 text-slate-600',
}

function getCategoryClass(item) {
  if (item.type) {
    const labels = { hotel: 'Hotel', restaurant: 'Restaurant', shop: 'Shop', service: 'Service' }
    return categoryColors[labels[item.type]] || categoryColors.default
  }
  if (item.period) return categoryColors.cultural
  return categoryColors[item.category] || categoryColors.default
}

function getCategoryLabel(item) {
  if (item.type) {
    const labels = { hotel: 'Hotel', restaurant: 'Restaurant', shop: 'Shop', service: 'Service' }
    return labels[item.type] || item.type
  }
  if (item.period) return 'Cultural'
  if (item.category === 'beaches') return 'Beach'
  return item.category
}

export default function MapPlaceList({ items, selectedItem, onSelect, searchQuery, onSearchChange, activeCategory, onCategoryChange, onClose }) {
  const listRef = useRef(null)
  const selectedRef = useRef(null)

  useEffect(() => {
    if (selectedRef.current && listRef.current) {
      const container = listRef.current
      const target = selectedRef.current
      container.scrollTo({
        top: target.offsetTop - container.offsetTop - 16,
        behavior: 'smooth',
      })
    }
  }, [selectedItem])

  const sorted = useMemo(() => {
    const tierOrder = { premium: 0, featured: 1, free: 2 }
    return [...items].sort((a, b) => (tierOrder[a.tier] ?? 2) - (tierOrder[b.tier] ?? 2))
  }, [items])

  return (
    <div className="h-full flex flex-col bg-white">
      <div className="shrink-0 border-b border-slate-100">
        <div className="px-4 pt-4 pb-3">
          <div className="flex items-center justify-between mb-3">
            <h1 className="text-sm font-heading font-semibold text-slate-800">
              Places
              <span className="ml-1.5 text-xs font-normal text-slate-400">({items.length})</span>
            </h1>
            {onClose && (
              <button onClick={onClose} className="touch-manipulation w-9 h-9 rounded-lg bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-600 transition-all duration-200">
                <FiX size={16} />
              </button>
            )}
          </div>
          <div className="relative">
            <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={15} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search places..."
              className="w-full pl-10 pr-9 py-2.5 rounded-xl bg-slate-100 border-0 text-xs text-slate-800 placeholder:text-slate-400 italic outline-none focus:bg-white focus:ring-2 focus:ring-teal-500/20 focus:shadow-sm transition-all duration-200"
            />
            {searchQuery && (
              <button onClick={() => onSearchChange('')} className="touch-manipulation absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center text-slate-400 hover:text-slate-600">
                <FiX size={16} />
              </button>
            )}
          </div>

          <div className="flex flex-wrap gap-1.5 mt-3">
            {CATEGORIES.slice(0, 6).map((cat) => {
              const isActive = activeCategory === cat
              return (
                <button
                  key={cat}
                  onClick={() => onCategoryChange(isActive ? null : cat)}
                  className={`touch-manipulation text-[11px] font-bold font-['Poppins'] px-3 py-1 rounded-full transition-all duration-200 ${
                    isActive
                      ? 'bg-teal-500 text-white shadow-sm shadow-teal-500/30'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-800'
                  }`}
                >
                  {cat}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      <div ref={listRef} className="flex-1 overflow-y-auto custom-scrollbar">
        <div className="p-3 space-y-2">
          {sorted.map((item, i) => {
            const isSelected = selectedItem?.id === item.id
            return (
              <motion.button
                key={item.id}
                ref={isSelected ? selectedRef : null}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: Math.min(i * 0.02, 0.3), duration: 0.3 }}
                onClick={() => onSelect(item)}
                className={`group w-full text-left rounded-xl overflow-hidden transition-all duration-200 cursor-pointer touch-manipulation ${
                  isSelected
                    ? 'bg-teal-50 ring-2 ring-teal-400 shadow-md shadow-teal-500/10'
                    : 'bg-white hover:bg-slate-50 shadow-sm hover:shadow-md'
                }`}
              >
                <div className="flex gap-3 p-2.5">
                  <div className="relative w-[72px] h-[72px] sm:w-20 sm:h-20 rounded-lg overflow-hidden shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className={`w-full h-full object-cover transition-transform duration-500 ${
                        isSelected ? 'scale-105' : 'group-hover:scale-110'
                      }`}
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    <span className={`absolute bottom-1 left-1 text-[8px] font-bold px-1.5 py-0.5 rounded-full shadow-sm ${getCategoryClass(item)}`}>
                      {getCategoryLabel(item)}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0 flex flex-col justify-center py-0.5">
                    <div className="flex items-start justify-between gap-1">
                      <h3 className="font-heading font-semibold text-sm text-slate-900 leading-snug line-clamp-1">
                        {item.name}
                      </h3>
                      {isSelected && (
                        <FiChevronRight className="text-teal-500 shrink-0 mt-0.5" size={14} />
                      )}
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      {item.rating && (
                        <span className="flex items-center gap-0.5 text-[11px] text-amber-600 font-semibold">
                          <FiStar className="fill-current" size={11} />
                          {item.rating}
                        </span>
                      )}
                      <span className="flex items-center gap-0.5 text-[11px] text-slate-400 truncate">
                        <FiMapPin className="shrink-0" size={11} />
                        {item.location || item.district}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-relaxed line-clamp-1 mt-1">
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.button>
            )
          })}
        </div>

        {sorted.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 px-8">
            <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center mb-4">
              <FiMapPin className="text-slate-400" size={22} />
            </div>
            <p className="text-sm font-semibold text-slate-500">No places found</p>
            <p className="text-xs text-slate-400 mt-1.5 text-center max-w-[200px]">
              Try adjusting your filters or search terms
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
