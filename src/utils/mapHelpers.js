// Shared helpers for map components
// Centralized to avoid duplication across MapView, MapPlaceList, MapSidePanel

export function getCategoryLabel(item) {
  if (item.subCategory) return item.subCategory
  if (item.type === 'hotel') return 'Hotel'
  if (item.type === 'restaurant') return 'Restaurant'
  if (item.type === 'shop') return 'Shop'
  if (item.type === 'service') return 'Service'
  if (item.category === 'beaches') return 'Beach'
  if (item.period) return 'Cultural'
  return item.category || ''
}

export function getDetailPath(item) {
  if (item._source === 'destinations') return '/destinations/' + item.category + '/' + item.id
  if (item._source === 'pride') return '/sri-lanka-pride/' + item.category + '/' + item.id
  if (item._source === 'businesses') return '/discover-more'
  if (item.type) return '/discover-more'
  if (item.period) return '/sri-lanka-pride/' + item.category + '/' + item.id
  return '/destinations/' + item.category + '/' + item.id
}

export function getCategoryClass(item) {
  const colorMap = {
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
  if (item.type) {
    const labels = { hotel: 'Hotel', restaurant: 'Restaurant', shop: 'Shop', service: 'Service' }
    return colorMap[labels[item.type]] || colorMap.default
  }
  if (item.period) return colorMap.cultural
  return colorMap[item.category] || colorMap.default
}

export function getCategoryStyle(item) {
  if (item.type) return 'bg-gradient-to-r from-sunset-500 to-rose-500'
  if (item.category === 'beaches') return 'bg-gradient-to-r from-ocean-500 to-cyan-500'
  if (item.period) return 'bg-gradient-to-r from-coral-500 to-pink-500'
  return 'bg-gradient-to-r from-teal-500 to-emerald-500'
}
