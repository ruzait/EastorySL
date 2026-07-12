import { readFileSync, writeFileSync } from 'fs'

const src = readFileSync('src/data/sriLankaPride.js', 'utf8')
const match = src.match(/export const prideItems = (\[[\s\S]*\])/)
const items = eval(match[1])

const githubImages = {
  'ak-anuradhapura': 'https://raw.githubusercontent.com/eastorysl/storyimages/main/pride/KingdomofAnuradhapura.png',
  'ak-polonnaruwa': 'https://raw.githubusercontent.com/eastorysl/storyimages/main/pride/KingdomofPolonnaruwa.png',
}

function gmap(coords) {
  if (!coords) return undefined
  return `https://www.google.com/maps/search/?api=1&query=${coords.lat},${coords.lng}`
}

function buildDetail(item) {
  const name = item.name
  const loc = item.location || item.birthPlace || ''
  const desc = item.description

  if (item.category === 'ancient-kingdoms') {
    return `<section class='destination-content'><h2>Overview</h2><p>${desc}</p><h2>Location</h2><p>${name} is located in ${loc}, Sri Lanka.${item.period ? ' Active period: ' + item.period + '.' : ''}</p><h2>Why Visit</h2><ul><li>UNESCO World Heritage connection</li><li>Ancient archaeological ruins</li><li>Rich cultural and historical heritage</li><li>Architectural marvels of ancient engineering</li></ul><h2>Historical Significance</h2><p>${name} played a vital role in shaping Sri Lanka's civilization. Its legacy includes advanced irrigation systems, monumental architecture, and a rich Buddhist heritage that continues to draw pilgrims and historians alike.</p><h2>Facilities</h2><ul><li>Archaeological sites and museums</li><li>Licensed tourist guides</li><li>Hotels and guesthouses nearby</li><li>Parking and rest areas</li><li>Public restrooms</li></ul></section>`
  }

  if (item.category === 'caves-geological-wonders') {
    return `<section class='destination-content'><h2>Overview</h2><p>${desc}</p><h2>Location</h2><p>${name} is located in ${loc}, Sri Lanka.${item.district ? ' District: ' + item.district + '.' : ''}</p><h2>Why Visit</h2><ul><li>Unique geological formations</li><li>Historical and archaeological significance</li><li>Natural beauty and exploration opportunities</li><li>Cultural and religious heritage</li></ul><h2>What to Expect</h2><p>${name} offers visitors a glimpse into Sri Lanka's rich geological and cultural tapestry. The site features remarkable natural formations alongside evidence of ancient human habitation and religious practice.</p><h2>Practical Info</h2><ul><li><strong>Best Time to Visit:</strong> Dry season months</li><li><strong>Duration:</strong> 1-3 hours</li><li><strong>Entry Fee:</strong> Varies by site</li></ul><h2>Facilities</h2><ul><li>Visitor information centers</li><li>Guided tours available</li><li>Parking facilities</li><li>Nearby restaurants and shops</li></ul></section>`
  }

  if (item.category === 'museums-galleries') {
    return `<section class='destination-content'><h2>Overview</h2><p>${desc}</p><h2>Location</h2><p>${name} is located in ${loc}, Sri Lanka.${item.district ? ' District: ' + item.district + '.' : ''}</p><h2>Why Visit</h2><ul><li>Explore Sri Lanka's rich cultural heritage</li><li>View priceless historical artifacts</li><li>Learn about art, history and archaeology</li><li>Family-friendly educational experience</li></ul><h2>What to Expect</h2><p>${name} showcases an impressive collection of artifacts, artwork, and historical exhibits that tell the story of Sri Lanka's rich cultural tapestry spanning thousands of years.</p><h2>Practical Info</h2><ul><li><strong>Best Time to Visit:</strong> Weekday mornings for fewer crowds</li><li><strong>Duration:</strong> 1-3 hours</li><li><strong>Entry Fee:</strong> Nominal fee for foreign visitors</li></ul><h2>Facilities</h2><ul><li>Air-conditioned exhibition halls</li><li>Museum shops</li><li>Rest areas and cafés</li><li>Accessible entrances</li></ul></section>`
  }

  if (item.category === 'cities-urban') {
    return `<section class='destination-content'><h2>Overview</h2><p>${desc}</p><h2>Location</h2><p>${name} is located in ${loc}, Sri Lanka.${item.district ? ' District: ' + item.district + '.' : ''}</p><h2>Why Visit</h2><ul><li>Blend of modern and colonial architecture</li><li>Vibrant local culture and cuisine</li><li>Shopping, dining and nightlife</li><li>Historical landmarks and temples</li><li>Gateway to surrounding attractions</li></ul><h2>Things to Do</h2><ul><li>🏛️ Explore historical landmarks</li><li>🛍️ Shop at local markets and malls</li><li>🍽️ Sample local street food</li><li>📸 Photograph colonial and modern architecture</li><li>🌅 Enjoy waterfront promenades</li></ul><h2>Best Time to Visit</h2><table><thead><tr><th>Season</th><th>Months</th><th>Highlights</th></tr></thead><tbody><tr><td>Dry Season</td><td>January – March</td><td>Perfect for sightseeing and walking tours</td></tr><tr><td>Inter-monsoon</td><td>April – May</td><td>Cultural festivals and events</td></tr><tr><td>Southwest Monsoon</td><td>June – September</td><td>Lush greenery, occasional showers</td></tr></tbody></table><h2>Facilities</h2><ul><li>Hotels and guesthouses for all budgets</li><li>Restaurants and cafés</li><li>Public transport and ride-hailing</li><li>ATMs and banks</li><li>Medical facilities</li></ul></section>`
  }

  if (item.category === 'food-culinary') {
    return `<section class='destination-content'><h2>Overview</h2><p>${desc}</p><h2>Origin</h2><p>This iconic dish is found ${loc ? 'across ' + loc : 'across Sri Lanka'}. ${name} is an essential part of Sri Lankan culinary identity.</p><h2>Why Try It</h2><ul><li>Authentic Sri Lankan flavor experience</li><li>Found at street stalls and fine dining alike</li><li>Reflects the island's multicultural culinary heritage</li><li>Affordable and widely available</li></ul><h2>How to Enjoy</h2><ul><li>🍽️ Try it at a local restaurant or hotel</li><li>🛒 Sample from street food vendors for the authentic taste</li><li>👨‍🍳 Take a cooking class to learn the recipe</li><li>📦 Perfect for takeaway</li></ul><h2>Best Time to Enjoy</h2><p>${name} is available year-round. Many versions are especially popular during festive seasons and celebrations.</p></section>`
  }

  if (item.category === 'road-trip-routes') {
    return `<section class='destination-content'><h2>Overview</h2><p>${desc}</p><h2>Route Details</h2><p><strong>Stops:</strong> ${item.stops || 'Various'}</p><p><strong>Duration:</strong> ${item.duration || 'Varies'}</p><h2>Why Drive This Route</h2><ul><li>Scenic landscapes and diverse terrain</li><li>Stop at iconic landmarks along the way</li><li>Flexible pace and itinerary</li><li>Authentic local experiences at every stop</li></ul><h2>Driving Tips</h2><ul><li>🚗 Start early to avoid traffic</li><li>⛽ Fill up fuel at major towns</li><li>📸 Carry a camera for photo stops</li><li>📱 Keep offline maps as backup</li><li>🌤️ Check weather conditions before departure</li></ul><h2>Best Time to Drive</h2><table><thead><tr><th>Season</th><th>Months</th><th>Notes</th></tr></thead><tbody><tr><td>Dry Season</td><td>January – March</td><td>Ideal driving conditions</td></tr><tr><td>Inter-monsoon</td><td>April – May</td><td>Good visibility, brief showers</td></tr><tr><td>Monsoon</td><td>June – September</td><td>Lush scenery, check road conditions</td></tr></tbody></table></section>`
  }

  if (item.category === 'tea-spice-trails') {
    return `<section class='destination-content'><h2>Overview</h2><p>${desc}</p><h2>Location</h2><p>${name} is located in ${loc}, Sri Lanka.${item.district ? ' District: ' + item.district + '.' : ''}</p><h2>Why Visit</h2><ul><li>Witness tea or spice cultivation firsthand</li><li>Learn about production processes</li><li>Fresh tastings and purchases</li><li>Beautiful plantation landscapes</li><li>Cultural insights into plantation communities</li></ul><h2>What to Expect</h2><p>${name} offers visitors an immersive experience into Sri Lanka's world-renowned tea and spice heritage. Walk through lush plantations, learn from expert planters, and taste the freshest produce.</p><h2>Best Time to Visit</h2><table><thead><tr><th>Season</th><th>Months</th><th>Experience</th></tr></thead><tbody><tr><td>Plucking Season</td><td>March – May</td><td>Watch active tea plucking</td></tr><tr><td>Spice Harvest</td><td>June – September</td><td>See spice harvesting in progress</td></tr><tr><td>Year-round</td><td>January – December</td><td>Garden visits and factory tours</td></tr></tbody></table><h2>Facilities</h2><ul><li>Plantation tours and factory visits</li><li>Tasting rooms and gift shops</li><li>On-site cafés and restaurants</li><li>Parking facilities</li><li>Licensed guides</li></ul></section>`
  }

  if (item.category === 'famous-people') {
    const birthInfo = item.birthYear ? ` Born in ${item.birthYear}${item.birthPlace ? ' in ' + item.birthPlace : ''}.` : ''
    return `<section class='destination-content'><h2>Overview</h2><p>${desc}${birthInfo}</p><h2>Legacy</h2><p>${name}'s contributions have left an enduring mark on Sri Lanka and the world. ${(item.subCategory === 'national-heroes' || item.subCategory === 'sports-legends') ? 'Their dedication and achievements continue to inspire generations of Sri Lankans.' : 'Their work and achievements continue to influence and inspire.'}</p><h2>Achievements</h2><ul><li>Notable contributions to ${item.subCategory === 'sports-legends' ? 'Sri Lankan sports' : item.subCategory === 'arts-entertainment' ? 'Sri Lankan arts and culture' : item.subCategory === 'science-tech' ? 'science and technology' : item.subCategory === 'writers-literature' ? 'literature and the arts' : 'Sri Lankan society and national identity'}</li><li>Recognized both nationally and internationally</li><li>Lasting influence on future generations</li></ul><h2>Remembering ${name}</h2><p>Today, ${name} is celebrated through monuments, institutions, and annual commemorations that honor their enduring contributions to Sri Lanka's rich cultural and historical heritage.</p></section>`
  }

  return `<section class='destination-content'><h2>Overview</h2><p>${desc}</p><h2>Location</h2><p>${name} is located in ${loc || 'Sri Lanka'}.</p><h2>Why Visit</h2><ul><li>Unique cultural experience</li><li>Historical significance</li><li>Beautiful surroundings</li></ul></section>`
}

const output = items.map(item => {
  const entry = { ...item }

  if (githubImages[item.id]) {
    entry.image = githubImages[item.id]
  }

  entry.detail = buildDetail(item)

  if (item.coordinates && !item.googleMapsLink) {
    entry.googleMapsLink = gmap(item.coordinates)
  }

  return entry
})

let js = 'export const prideItems = [\n'
output.forEach((item, i) => {
  js += '  {\n'
  js += `    id: ${JSON.stringify(item.id)},\n`
  js += `    name: ${JSON.stringify(item.name)},\n`
  js += `    category: ${JSON.stringify(item.category)},\n`
  if (item.subCategory) js += `    subCategory: ${JSON.stringify(item.subCategory)},\n`
  js += `    description: ${JSON.stringify(item.description)},\n`
  js += `    detail: ${JSON.stringify(item.detail)},\n`
  js += `    image: ${JSON.stringify(item.image)},\n`
  if (item.period) js += `    period: ${JSON.stringify(item.period)},\n`
  if (item.location) js += `    location: ${JSON.stringify(item.location)},\n`
  if (item.district) js += `    district: ${JSON.stringify(item.district)},\n`
  if (item.duration) js += `    duration: ${JSON.stringify(item.duration)},\n`
  if (item.stops) js += `    stops: ${JSON.stringify(item.stops)},\n`
  if (item.birthYear) js += `    birthYear: ${JSON.stringify(item.birthYear)},\n`
  if (item.birthPlace) js += `    birthPlace: ${JSON.stringify(item.birthPlace)},\n`
  if (item.coordinates) js += `    coordinates: { lat: ${item.coordinates.lat}, lng: ${item.coordinates.lng} },\n`
  if (item.googleMapsLink) js += `    googleMapsLink: ${JSON.stringify(item.googleMapsLink)},\n`
  js += '  },\n'
})
js += ']\n'

writeFileSync('src/data/sriLankaPride.js', js)
console.log(`Enriched ${output.length} pride items with detail + googleMapsLink`)
