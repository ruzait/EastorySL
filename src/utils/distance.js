const COLOMBO = [6.9271, 79.8612]

function toRad(deg) {
  return (deg * Math.PI) / 180
}

export function distanceFromColombo(coords) {
  if (!coords || coords.length !== 2) return null
  const [lat, lng] = coords
  const [clat, clng] = COLOMBO
  const R = 6371
  const dlat = toRad(lat - clat)
  const dlng = toRad(lng - clng)
  const a =
    Math.sin(dlat / 2) ** 2 +
    Math.cos(toRad(clat)) * Math.cos(toRad(lat)) * Math.sin(dlng / 2) ** 2
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return Math.round(R * c)
}
