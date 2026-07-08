const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

export function monthName(n) {
  return monthNames[n - 1] || ''
}

export function isInSeason(bestTime, month) {
  if (!bestTime || bestTime === 'Year-round') return true

  const m = monthNames.indexOf(month)
  if (m === -1) return false

  const ranges = bestTime.split(',').map(s => s.trim())
  for (const range of ranges) {
    if (/^[A-Z][a-z]{2}-[A-Z][a-z]{2}$/.test(range)) {
      const [start, end] = range.split('-').map(s => monthNames.indexOf(s))
      if (start <= end) {
        if (m >= start && m <= end) return true
      } else {
        if (m >= start || m <= end) return true
      }
    }
    if (/^[A-Z][a-z]{2}$/.test(range) && range === month) return true
  }
  return false
}

export function getSeasonalDestinations(destinations, month, category = 'All') {
  let filtered = destinations.filter(d => isInSeason(d.bestTime, month))
  if (category !== 'All') {
    filtered = filtered.filter(d => d.category === category.toLowerCase().replace(/\s+/g, '-'))
  }
  return filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0))
}
