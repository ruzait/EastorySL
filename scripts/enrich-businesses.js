import { readFileSync, writeFileSync } from 'fs'

const src = readFileSync('src/data/businesses.js', 'utf8')
const match = src.match(/export const businesses = (\[[\s\S]*\])/)
const items = eval(match[1])

function gmap(coords) {
  if (!coords) return undefined
  return `https://www.google.com/maps/search/?api=1&query=${coords.lat},${coords.lng}`
}

function buildDetail(b) {
  const name = b.name
  const loc = b.location || ''
  const dist = b.district || ''
  const desc = b.description

  if (b.category === 'Accommodation') {
    const sub = b.subCategory || 'Hotel'
    return `<section class='destination-content'><h2>Overview</h2><p>${desc}</p><h2>Location</h2><p>${name} is located in ${loc}${dist ? ', ' + dist + ' district' : ''}, Sri Lanka.</p><h2>What ${sub} Offers</h2><ul><li>Comfortable rooms with modern amenities</li><li>${b.phone ? 'Easy contact via phone' : 'Online booking available'}</li><li>Convenient location for exploring the area</li><li>Warm hospitality and attentive service</li></ul><h2>Amenities</h2><ul><li>🛏️ Comfortable accommodation</li><li>📶 Wi-Fi access</li><li>🅿️ Parking facilities</li><li>🛎️ Front desk assistance</li><li>🍽️ Dining options nearby</li></ul><h2>Good to Know</h2><ul><li><strong>Check-in:</strong> Standard check-in from 14:00</li><li><strong>Check-out:</strong> Standard check-out by 12:00</li><li><strong>Location:</strong> ${loc}</li></ul></section>`
  }

  if (b.category === 'Shopping') {
    return `<section class='destination-content'><h2>Overview</h2><p>${desc}</p><h2>Location</h2><p>${name} is located in ${loc}${dist ? ', ' + dist + ' district' : ''}, Sri Lanka.</p><h2>What to Expect</h2><ul><li>Authentic local shopping experience</li><li>Quality products and souvenirs</li><li>Friendly and helpful staff</li><li>Convenient location for tourists</li></ul><h2>Shopping Tips</h2><ul><li>🛍️ Browse a wide selection of items</li><li>💰 Compare prices before buying</li><li>🎁 Great for souvenirs and gifts</li><li>📸 Ask before photographing items</li></ul><h2>Good to Know</h2><ul><li><strong>Location:</strong> ${loc}</li><li><strong>Best Time:</strong> Visit during business hours</li><li>${b.phone ? '<strong>Contact:</strong> ' + b.phone : 'Contact via listing'}</li></ul></section>`
  }

  if (b.category === 'Water Sports') {
    return `<section class='destination-content'><h2>Overview</h2><p>${desc}</p><h2>Location</h2><p>${name} is based in ${loc}${dist ? ', ' + dist + ' district' : ''}, Sri Lanka.</p><h2>What to Expect</h2><ul><li>Professional guidance and instruction</li><li>Quality equipment provided</li><li>Safety-first approach</li><li>Memorable ocean and nature experiences</li></ul><h2>Tips</h2><ul><li>🌊 Listen carefully to safety briefings</li><li>🧴 Apply reef-safe sunscreen</li><li>📸 Bring a waterproof camera if possible</li><li>💪 No prior experience required for most activities</li></ul><h2>Good to Know</h2><ul><li><strong>Location:</strong> ${loc}</li><li><strong>Best Conditions:</strong> Check seasonal availability</li><li>${b.phone ? '<strong>Book:</strong> ' + b.phone : 'Book via listing'}</li></ul></section>`
  }

  if (b.category === 'Tours') {
    return `<section class='destination-content'><h2>Overview</h2><p>${desc}</p><h2>Location</h2><p>${name} operates from ${loc}${dist ? ', ' + dist + ' district' : ''}, Sri Lanka.</p><h2>What to Expect</h2><ul><li>Expert local guides</li><li>Curated and well-planned itineraries</li><li>Insider knowledge of the region</li><li>Memorable and enriching experiences</li></ul><h2>Tips</h2><ul><li>🗺️ Book in advance during peak season</li><li>👟 Wear comfortable clothing and shoes</li><li>💧 Carry water and sun protection</li><li>📸 Bring a camera for scenic stops</li></ul><h2>Good to Know</h2><ul><li><strong>Pickup:</strong> ${loc}</li><li>${b.phone ? '<strong>Contact:</strong> ' + b.phone : 'Contact via listing'}</li></ul></section>`
  }

  return `<section class='destination-content'><h2>Overview</h2><p>${desc}</p><h2>Location</h2><p>${name} is located in ${loc || 'Sri Lanka'}.</p></section>`
}

const output = items.map(b => {
  const entry = { ...b }
  delete entry.rating
  entry.detail = buildDetail(b)
  if (b.coordinates && !b.googleMapsLink) {
    entry.googleMapsLink = gmap(b.coordinates)
  }
  return entry
})

let js = 'export const businesses = [\n'
output.forEach((b) => {
  js += '  {\n'
  js += `    id: ${JSON.stringify(b.id)},\n`
  js += `    name: ${JSON.stringify(b.name)},\n`
  js += `    type: ${JSON.stringify(b.type)},\n`
  js += `    subCategory: ${JSON.stringify(b.subCategory)},\n`
  js += `    category: ${JSON.stringify(b.category)},\n`
  js += `    location: ${JSON.stringify(b.location)},\n`
  if (b.district) js += `    district: ${JSON.stringify(b.district)},\n`
  js += `    tier: ${JSON.stringify(b.tier)},\n`
  js += `    description: ${JSON.stringify(b.description)},\n`
  js += `    detail: ${JSON.stringify(b.detail)},\n`
  js += `    image: ${JSON.stringify(b.image)},\n`
  if (b.coordinates) js += `    coordinates: { lat: ${b.coordinates.lat}, lng: ${b.coordinates.lng} },\n`
  if (b.phone) js += `    phone: ${JSON.stringify(b.phone)},\n`
  if (b.website) js += `    website: ${JSON.stringify(b.website)},\n`
  if (b.googleMapsLink) js += `    googleMapsLink: ${JSON.stringify(b.googleMapsLink)},\n`
  if (b.social && Object.keys(b.social).length) {
    js += `    social: { ${Object.entries(b.social).map(([k,v]) => `${k}: ${JSON.stringify(v)}`).join(', ')} },\n`
  }
  js += '  },\n'
})
js += ']\n'

writeFileSync('src/data/businesses.js', js)
console.log(`Enriched ${output.length} businesses (detail added, rating removed)`)
