import { readFileSync, writeFileSync } from 'fs'

const githubImages = {
  'beach-mirissa': 'https://raw.githubusercontent.com/eastorysl/storyimages/main/destination/MirissaBeach.jpg',
  'beach-unawatuna': 'https://raw.githubusercontent.com/eastorysl/storyimages/main/destination/UnawatunaBeach.jpg',
}

const monthMap = {
  'Jan': 'January', 'Feb': 'February', 'Mar': 'March', 'Apr': 'April',
  'May': 'May', 'Jun': 'June', 'Jul': 'July', 'Aug': 'August',
  'Sep': 'September', 'Oct': 'October', 'Nov': 'November', 'Dec': 'December',
}

function expandBestTime(raw) {
  if (!raw) return 'Year-round'
  return raw.replace(/\b(Jan|Feb|Mar|Apr|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\b/g, m => monthMap[m] || m)
    .replace(/–/g, '–')
    .replace(/,/g, ',')
}

function buildDetail(dest) {
  const escapedName = dest.name.replace(/&/g, '&amp;').replace(/</g, '&lt;')
  const escapedDesc = dest.description.replace(/&/g, '&amp;').replace(/</g, '&lt;')
  return `<section class='destination-content'><h2>Overview</h2><p>${escapedDesc}</p><h2>Location</h2><p>${escapedName} is located in ${dest.location}, ${dest.district} district, Sri Lanka.</p><h2>Practical Info</h2><ul><li><strong>Entry Fee:</strong> ${dest.entryFee}</li><li><strong>Duration:</strong> ${dest.duration}</li><li><strong>Best Time:</strong> ${dest.bestTime}</li></ul></section>`
}

function buildGoogleMapsLink(coords, name) {
  return `https://www.google.com/maps/search/?api=1&query=${coords.lat},${coords.lng}`
}

const src = readFileSync('src/data/destinations.js', 'utf8')
const match = src.match(/export const destinations = (\[[\s\S]*\])/)
if (!match) { console.error('Could not find destinations array'); process.exit(1) }

const dests = eval(match[1])

const updated = dests.map(d => ({
  ...d,
  image: githubImages[d.id] || d.image,
  bestTime: expandBestTime(d.bestTime),
  detail: buildDetail(d),
  googleMapsLink: buildGoogleMapsLink(d.coordinates, d.name),
}))

let output = 'export const destinations = [\n'
updated.forEach((d, i) => {
  output += '  {\n'
  output += `    id: ${JSON.stringify(d.id)},\n`
  output += `    name: ${JSON.stringify(d.name)},\n`
  output += `    location: ${JSON.stringify(d.location)},\n`
  output += `    district: ${JSON.stringify(d.district)},\n`
  output += `    category: ${JSON.stringify(d.category)},\n`
  output += `    tier: ${JSON.stringify(d.tier)},\n`
  output += `    rating: ${d.rating},\n`
  output += `    description: ${JSON.stringify(d.description)},\n`
  output += `    detail: ${JSON.stringify(d.detail)},\n`
  output += `    image: ${JSON.stringify(d.image)},\n`
  output += `    bestTime: ${JSON.stringify(d.bestTime)},\n`
  output += `    entryFee: ${JSON.stringify(d.entryFee)},\n`
  output += `    duration: ${JSON.stringify(d.duration)},\n`
  output += `    coordinates: { lat: ${d.coordinates.lat}, lng: ${d.coordinates.lng} },\n`
  output += `    googleMapsLink: ${JSON.stringify(d.googleMapsLink)},\n`
  output += '  },\n'
})
output += ']\n'

writeFileSync('src/data/destinations.js', output)
console.log(`Updated ${updated.length} destinations`)
