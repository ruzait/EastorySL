import { readFileSync, writeFileSync } from 'fs'

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

const richContent = {
  'nat-sinharaja': {
    description: "UNESCO-listed tropical rainforest biosphere reserve teeming with endemic flora, rare birds and ancient trees in Sri Lanka's wet zone.",
    detail: `<section class='destination-content'><h2>Overview</h2><p>Sinharaja Forest Reserve is Sri Lanka's last viable area of primary tropical rainforest and a UNESCO World Heritage Site. This biodiversity hotspot contains over 50% of Sri Lanka's endemic tree species along with rare birds, amphibians and insects found nowhere else on Earth.</p><h2>Why Visit Sinharaja?</h2><ul><li>UNESCO World Heritage tropical rainforest</li><li>Over 50% of Sri Lanka's endemic tree species</li><li>Home to rare endemic bird species</li><li>Pristine untouched ecosystem</li><li>Guided nature treks through ancient forest</li><li>Beautiful waterfalls and natural pools</li></ul><h2>Things to Do</h2><ul><li>🐦 Guided birdwatching walks</li><li>🥾 Forest trekking on ancient trails</li><li>📸 Wildlife and macro photography</li><li>🌿 Medicinal plant identification</li><li>💧 Swim in natural rock pools</li><li>🦋 Butterfly and insect watching</li></ul><h2>Best Time to Visit</h2><p>January – March for trekking. August – September for birdwatching.</p><h2>Facilities</h2><ul><li>Mandatory forest department guides</li><li>Basic rest houses at Kudawa and Pitadeniya entrances</li><li>Limited food facilities — bring supplies</li></ul></section>`,
  },
  'nat-knuckles': {
    description: "Rugged UNESCO-listed mountain massif with cloud forests, misty peaks and remote hiking trails in central Sri Lanka.",
    detail: `<section class='destination-content'><h2>Overview</h2><p>The Knuckles Mountain Range is a stunning UNESCO World Heritage Site named for its resemblance to a clenched fist. This rugged massif features cloud forests, grasslands, streams and some of Sri Lanka's most pristine mountain scenery with remote multi-day trekking routes.</p><h2>Why Visit the Knuckles?</h2><ul><li>UNESCO World Heritage biodiversity hotspot</li><li>Dramatic cloud forest landscapes</li><li>Remote multi-day trekking routes</li><li>Rich endemic flora and fauna</li><li>Village homestay experiences</li><li>Far from tourist crowds</li></ul><h2>Things to Do</h2><ul><li>🥾 Multi-day trekking expeditions</li><li>🏕️ Camping under the stars</li><li>🏘️ Village homestays with local families</li><li>📸 Landscape photography</li><li>🌿 Cloud forest flora walks</li><li>💧 River bathing in mountain streams</li></ul><h2>Best Time to Visit</h2><p>January – April (dry season for trekking). Avoid during heavy monsoon rains.</p><h2>Facilities</h2><ul><li>Local guides required for trekking</li><li>Village homestays and camping areas</li><li>No shops — carry all supplies</li></ul></section>`,
  },
  'nat-hortonplains': {
    description: "Misty highland plateau grassland leading to the sheer cliffs of World's End with Baker's Falls in Sri Lanka's hill country.",
    detail: `<section class='destination-content'><h2>Overview</h2><p>Horton Plains National Park is a stunning highland plateau of montane grasslands and cloud forest, most famous for the dramatic World's End escarpment — a sheer 880-meter drop offering breathtaking views across the southern lowlands.</p><h2>Why Visit Horton Plains?</h2><ul><li>World's End — 880m sheer cliff with panoramic views</li><li>Beautiful Baker's Falls waterfall</li><li>Misty cloud forest landscape</li><li>Endemic wildlife including sambar deer</li><li>Cool refreshing mountain climate</li></ul><h2>Things to Do</h2><ul><li>🥾 World's End trail (9km loop)</li><li>💧 Visit Baker's Falls</li><li>🦌 Spot sambar deer grazing</li><li>📸 Landscape photography</li><li>🌿 Cloud forest exploration</li></ul><h2>Best Time to Visit</h2><p>January – March for clearest views. Arrive by 6 AM before mist rolls in — this is essential for World's End views.</p><h2>Facilities</h2><ul><li>Park entrance with ticket office</li><li>Guides available at entrance</li><li>Basic rest facilities along trail</li></ul></section>`,
  },
  'nat-kanneliya': {
    description: "Pristine lowland rainforest reserve with waterfalls, canopy walks and endemic birdlife near Galle in southern Sri Lanka.",
    detail: `<section class='destination-content'><h2>Overview</h2><p>Kanneliya Forest Reserve is a pristine lowland rainforest in the Southern Province offering canopy walks, waterfalls and rich endemic birdlife as a less-visited alternative to Sinharaja.</p><h2>Things to Do</h2><ul><li>🥾 Forest trekking through ancient trees</li><li>🐦 Birdwatching for endemic species</li><li>🌿 Canopy walkway experience</li><li>💧 Waterfall swimming in natural pools</li></ul><h2>Best Time to Visit</h2><p>January – March (dry season for trekking)</p><h2>Facilities</h2><ul><li>Forest department guides available</li><li>Basic facilities at Deniyaya entrance</li></ul></section>`,
  },
  'nat-ritigala': {
    description: "Mystical forested mountain hiding ancient Buddhist monastery ruins among dense jungle in Sri Lanka's dry zone.",
    detail: `<section class='destination-content'><h2>Overview</h2><p>Ritigala Strict Nature Reserve is a mystical forested mountain hiding the ruins of an ancient Buddhist monastery. Atmospheric jungle treks lead through overgrown meditation paths, stone hospitals and moonstone-adorned monasteries hidden in the dense canopy.</p><h2>Things to Do</h2><ul><li>🥾 Explore ancient monastery ruins</li><li>🌿 Jungle trekking through dense forest</li><li>📸 Atmospheric misty photography</li><li>🦎 Wildlife and bird spotting</li><li>🧘 Experience the meditative atmosphere</li></ul><h2>Best Time to Visit</h2><p>January – September (dry months for comfortable trekking)</p><h2>Facilities</h2><ul><li>Entry ticket required at gate</li><li>Local guides recommended</li></ul></section>`,
  },
  'wf-diyaluma': {
    description: "Sri Lanka's second-tallest waterfall at 220m with spectacular natural infinity pools at the top for swimming.",
    detail: `<section class='destination-content'><h2>Overview</h2><p>Diyaluma Falls is Sri Lanka's second-tallest waterfall at 220 meters, famous for its spectacular multi-tiered cascade and the natural infinity pools at the top offering stunning panoramic valley views.</p><h2>Why Visit Diyaluma?</h2><ul><li>Sri Lanka's second-tallest waterfall (220m)</li><li>Natural infinity pools at the summit</li><li>Spectacular multi-tiered cascade</li><li>Stunning panoramic valley views</li><li>Free to visit</li></ul><h2>Things to Do</h2><ul><li>🥾 Hike to the top pools (30-45 min)</li><li>🏊 Swim in natural infinity pools</li><li>📸 Waterfall and landscape photography</li><li>🧗 Guided abseiling adventures</li><li>🌅 Enjoy panoramic valley views from the top</li></ul><h2>Best Time to Visit</h2><p>Year-round. Best water flow during monsoon months (October–January).</p><h2>Facilities</h2><ul><li>Free entry</li><li>Local guides recommended for the trail</li><li>No facilities at the top — bring water and snacks</li></ul></section>`,
  },
  'wf-bambarakanda': {
    description: "Sri Lanka's tallest waterfall at 263m, cascading dramatically down a forested cliff amid pine forests in the central highlands.",
    detail: `<section class='destination-content'><h2>Overview</h2><p>Bambarakanda Falls is Sri Lanka's tallest waterfall at 263 meters, cascading dramatically down a forested cliff face in the Badulla district surrounded by pine forests and cool mountain air.</p><h2>Things to Do</h2><ul><li>🥾 Trek through pine forest to the base</li><li>📸 Waterfall photography</li><li>🏕️ Nearby camping in the forest</li><li>🌿 Nature walks through the surrounding woodland</li></ul><h2>Best Time to Visit</h2><p>Year-round. Strongest water flow October – December.</p><h2>Facilities</h2><ul><li>Parking area near the trailhead</li><li>Basic rest facilities</li></ul></section>`,
  },
  'wf-ravana': {
    description: "Mythical roadside waterfall near Ella linked to the Ramayana legend with easy access and a natural swimming pool.",
    detail: `<section class='destination-content'><h2>Overview</h2><p>Ravana Falls is a stunning roadside waterfall near Ella linked to the ancient Ramayana legend where King Ravana is said to have hidden Princess Sita in a cave behind the cascading water.</p><h2>Things to Do</h2><ul><li>📸 Waterfall photography from the viewpoint</li><li>🏊 Swim in the natural pool at the base</li><li>🏔️ Easy walk from the main road</li><li>📚 Learn about the Ramayana legend</li></ul><h2>Best Time to Visit</h2><p>Year-round. Avoid swimming during heavy rain as the pool can be dangerous.</p><h2>Facilities</h2><ul><li>Free entry</li><li>Roadside parking available</li><li>Small shops and vendors nearby</li></ul></section>`,
  },
  'wf-stclairs': {
    description: "One of Sri Lanka's widest waterfalls — a stunning twin-cascade often called the Little Niagara set amid tea estates.",
    detail: `<section class='destination-content'><h2>Overview</h2><p>St. Clair's Falls is one of Sri Lanka's widest waterfalls, a stunning twin-cascade often called the Little Niagara of Sri Lanka, set amid lush tea estates in the central highlands near Talawakele.</p><h2>Things to Do</h2><ul><li>📸 Photograph the twin cascades from the viewpoint</li><li>🍵 Visit nearby tea plantations and factories</li><li>🌿 Scenic walks through tea country</li></ul><h2>Best Time to Visit</h2><p>Year-round. Best water flow during monsoon season.</p><h2>Facilities</h2><ul><li>Roadside viewpoint with parking</li><li>Free entry</li></ul></section>`,
  },
  'wf-devon': {
    description: "Spectacular 97m waterfall visible from a scenic roadside viewpoint cascading through tea estates in the hill country.",
    detail: `<section class='destination-content'><h2>Overview</h2><p>Devon Falls is a spectacular 97-meter waterfall visible from a scenic roadside viewpoint, cascading through lush tea estates in the central highlands near Talawakele.</p><h2>Things to Do</h2><ul><li>📸 Viewpoint photography</li><li>🍵 Tea estate visits nearby</li><li>🌿 Scenic drives through hill country</li></ul><h2>Best Time to Visit</h2><p>Year-round. Most impressive after rainfall.</p><h2>Facilities</h2><ul><li>Roadside viewpoint with parking</li><li>Free entry</li></ul></section>`,
  },
  'wf-bopath': {
    description: "Beautiful Bo-leaf shaped waterfall set in lush tropical greenery near Ratnapura with a natural swimming pool.",
    detail: `<section class='destination-content'><h2>Overview</h2><p>Bopath Ella Falls is a beautiful waterfall shaped like a Bo leaf (sacred fig leaf), set in lush tropical greenery near Ratnapura, Sri Lanka's gem-mining capital.</p><h2>Things to Do</h2><ul><li>🥾 Short trek through jungle to the falls</li><li>📸 Waterfall photography</li><li>🏊 Swim in the natural pool at the base</li></ul><h2>Best Time to Visit</h2><p>Year-round. Strongest flow during monsoon months.</p><h2>Facilities</h2><ul><li>Small entry fee</li><li>Basic facilities at the entrance</li></ul></section>`,
  },
  'wf-dunhinda': {
    description: "Misty 64m waterfall reached via a scenic forest walking trail through dense jungle near Badulla.",
    detail: `<section class='destination-content'><h2>Overview</h2><p>Dunhinda Falls is a beautiful 64-meter waterfall reached via a scenic walking trail through dense forest near Badulla, surrounded by mist and lush tropical vegetation.</p><h2>Things to Do</h2><ul><li>🥾 Scenic forest walk to the falls</li><li>📸 Misty waterfall photography</li><li>💧 View the falls from multiple angles</li></ul><h2>Best Time to Visit</h2><p>Year-round. Best flow during monsoon season.</p><h2>Facilities</h2><ul><li>Entry fee required</li><li>Trail from the main road</li></ul></section>`,
  },
  'wf-laxapana': {
    description: "Powerful highland waterfall feeding one of Sri Lanka's oldest hydroelectric plants amid misty mountain scenery.",
    detail: `<section class='destination-content'><h2>Overview</h2><p>Laxapana Falls is a powerful highland waterfall in the Maskeliya area, feeding one of Sri Lanka's oldest hydroelectric power plants amid misty mountain scenery.</p><h2>Things to Do</h2><ul><li>📸 Waterfall photography</li><li>🌿 Nature walks in the surrounding area</li><li>💧 View the falls from the viewpoint</li></ul><h2>Best Time to Visit</h2><p>Year-round</p><h2>Facilities</h2><ul><li>Free entry</li><li>Roadside access</li></ul></section>`,
  },
  'mtn-adamspeak': {
    description: "Sacred conical peak at 2,243m climbed overnight by pilgrims and hikers to watch a legendary sunrise from the summit.",
    detail: `<section class='destination-content'><h2>Overview</h2><p>Adam's Peak (Sri Pada) is a sacred conical mountain at 2,243 meters, climbed by pilgrims of four religions and hikers alike to witness a legendary sunrise from the summit where a mysterious shadow falls perfectly on the peak.</p><h2>Why Visit Adam's Peak?</h2><ul><li>Legendary sunrise from the summit</li><li>Sacred pilgrimage site for four religions</li><li>5,500+ steps to the top</li><li>Stunning mountain scenery on the ascent</li><li>The mysterious triangular shadow at dawn</li><li>Cool mountain air and cloud forest</li></ul><h2>Things to Do</h2><ul><li>🥾 Overnight climb (start 2-3 AM)</li><li>🌅 Watch the legendary sunrise</li><li>🙏 Visit the sacred footprint at the summit</li><li>📸 Photography of the mountain landscape</li><li>🍵 Enjoy warm tea at summit stalls</li></ul><h2>Best Time to Visit</h2><p>December – May (pilgrim season). The climb is closed during off-season due to weather.</p><h2>Facilities</h2><ul><li>Free entry</li><li>Tea stalls along the path</li><li>Warm clothing rental at the base</li><li>Multiple starting points: Ratnapura or Kuruwita</li></ul></section>`,
  },
  'mtn-ellarock': {
    description: "Popular hike through tea estates and forest to panoramic valley views, one of Ella's must-do activities.",
    detail: `<section class='destination-content'><h2>Overview</h2><p>Ella Rock is a popular hiking destination offering panoramic valley views after a scenic trek through tea estates, forest tunnels and railway tracks from the heart of Ella town.</p><h2>Things to Do</h2><ul><li>🥾 Hike through tea estates to the summit</li><li>📸 Panoramic valley photography</li><li>🚂 Walk along the railway track</li><li>🍵 Pass through working tea plantations</li></ul><h2>Best Time to Visit</h2><p>Year-round. Start early morning for clearest views.</p><h2>Facilities</h2><ul><li>Free entry</li><li>Start from Ella town or Kithal Ella station</li></ul></section>`,
  },
  'mtn-littleadamspeak': {
    description: "Easy scenic ridge walk with sweeping views over Ella Gap, perfect for all fitness levels and sunset photography.",
    detail: `<section class='destination-content'><h2>Overview</h2><p>Little Adam's Peak is an easy scenic ridge walk offering sweeping views over Ella Gap, perfect for all fitness levels with a short gentle climb through tea estates to stunning panoramic views.</p><h2>Things to Do</h2><ul><li>🥾 Easy ridge walk through tea estates</li><li>📸 Sweeping views over Ella Gap</li><li>🌅 Sunset photography from the summit</li><li>🍵 Walk through working tea plantations</li></ul><h2>Best Time to Visit</h2><p>Year-round. Best for sunset.</p><h2>Facilities</h2><ul><li>Free entry</li><li>Well-marked trail from Ella</li></ul></section>`,
  },
  'mtn-namunukula': {
    description: "Seven-peaked mountain range offering remote highland trekking through cloud forest and grassland near Badulla.",
    detail: `<section class='destination-content'><h2>Overview</h2><p>The Namunukula Range is a dramatic seven-peaked mountain range near Badulla offering remote highland trekking through cloud forest, grasslands and spectacular ridge walks far from the tourist crowds.</p><h2>Things to Do</h2><ul><li>🥾 Multi-day ridge trekking</li><li>🏕️ High-altitude camping</li><li>📸 Dramatic mountain photography</li><li>🌿 Cloud forest exploration</li></ul><h2>Best Time to Visit</h2><p>January – April (dry season for trekking)</p><h2>Facilities</h2><ul><li>Free entry</li><li>Local guides recommended</li><li>No facilities on the mountain — carry supplies</li></ul></section>`,
  },
  'mtn-pidurutalagala': {
    description: "Sri Lanka's highest peak at 2,524m with restricted summit access through cloud forest near Nuwara Eliya.",
    detail: `<section class='destination-content'><h2>Overview</h2><p>Pidurutalagala is Sri Lanka's highest peak at 2,524 meters, with a restricted summit road passing through cloud forest. The summit houses telecommunications equipment and offers clear-day views across the island.</p><h2>Things to Do</h2><ul><li>🏔️ Summit drive through cloud forest</li><li>📸 Panoramic views on clear days</li><li>🌿 Cloud forest nature walks</li></ul><h2>Best Time to Visit</h2><p>January – March for clearest views</p><h2>Facilities</h2><ul><li>Special permit required from military</li><li>Limited public access</li></ul></section>`,
  },
}

const categoryContent = {
  wildlife: (d) => ({
    description: `${d.name} is a renowned wildlife destination in Sri Lanka's ${d.district} district, offering exceptional safari experiences with diverse animal populations in their natural habitat.`,
    detail: `<section class='destination-content'><h2>Overview</h2><p>${esc(d.name)} is one of Sri Lanka's important wildlife destinations located in ${esc(d.location)}, ${esc(d.district)} district. ${esc(d.description)}</p><h2>Why Visit?</h2><ul><li>Exceptional wildlife viewing opportunities</li><li>Guided safari experiences</li><li>Diverse ecosystems and habitats</li><li>Photography opportunities</li><li>Nature immersion</li></ul><h2>Things to Do</h2><ul><li>🦁 Guided safari drives</li><li>📸 Wildlife photography</li><li>🐦 Birdwatching</li><li>🌅 Dawn and dusk game viewing</li><li>🌿 Nature walks</li></ul><h2>Best Time to Visit</h2><p>${esc(d.bestTime)}</p><h2>Facilities</h2><ul><li>Safari jeep hire available</li><li>Guides at park entrance</li><li>Paid entry (${esc(d.entryFee)})</li><li>Duration: ${esc(d.duration)}</li></ul></section>`,
  }),
  historical: (d) => ({
    description: `${d.name} is a significant historical and archaeological site in Sri Lanka, showcasing the island's rich cultural heritage spanning thousands of years.`,
    detail: `<section class='destination-content'><h2>Overview</h2><p>${esc(d.name)} is a remarkable historical site located in ${esc(d.location)}, ${esc(d.district)} district. ${esc(d.description)}</p><h2>Why Visit?</h2><ul><li>Rich historical and cultural significance</li><li>Ancient architecture and craftsmanship</li><li>UNESCO World Heritage recognition</li><li>Educational experience</li><li>Photography opportunities</li></ul><h2>Things to Do</h2><ul><li>🏛️ Explore ancient structures</li><li>📸 Architectural photography</li><li>📚 Learn about Sri Lankan history</li><li>🚶 Guided heritage walks</li></ul><h2>Best Time to Visit</h2><p>${esc(d.bestTime)}</p><h2>Facilities</h2><ul><li>Entry fee: ${esc(d.entryFee)}</li><li>Guides available</li><li>Duration: ${esc(d.duration)}</li></ul></section>`,
  }),
  religious: (d) => ({
    description: `${d.name} is a revered religious site in Sri Lanka, reflecting the island's deep spiritual heritage and architectural beauty.`,
    detail: `<section class='destination-content'><h2>Overview</h2><p>${esc(d.name)} is an important religious site located in ${esc(d.location)}, ${esc(d.district)} district. ${esc(d.description)}</p><h2>Why Visit?</h2><ul><li>Deep spiritual and cultural significance</li><li>Beautiful religious architecture</li><li>Peaceful atmosphere for reflection</li><li>Cultural learning experience</li></ul><h2>Things to Do</h2><ul><li>🙏 Visit the sacred shrine</li><li>📸 Architecture photography</li><li>🧘 Experience the peaceful atmosphere</li><li>📚 Learn about local religious traditions</li></ul><h2>Best Time to Visit</h2><p>${esc(d.bestTime)}</p><h2>Facilities</h2><ul><li>Entry: ${esc(d.entryFee)}</li><li>Dress code applies — cover shoulders and knees</li><li>Duration: ${esc(d.duration)}</li></ul></section>`,
  }),
  forts: (d) => ({
    description: `${d.name} is a well-preserved colonial fortification in Sri Lanka, reflecting centuries of European colonial influence and military architecture.`,
    detail: `<section class='destination-content'><h2>Overview</h2><p>${esc(d.name)} is a fascinating colonial fort located in ${esc(d.location)}, ${esc(d.district)} district. ${esc(d.description)}</p><h2>Why Visit?</h2><ul><li>Historic colonial architecture</li><li>Strategic coastal or inland location</li><li>Well-preserved ramparts and buildings</li><li>Cultural layering of multiple colonial powers</li></ul><h2>Things to Do</h2><ul><li>🏰 Walk the historic ramparts</li><li>📸 Fort and sunset photography</li><li>🏛️ Explore colonial buildings</li><li>🚶 Self-guided heritage walks</li></ul><h2>Best Time to Visit</h2><p>${esc(d.bestTime)}</p><h2>Facilities</h2><ul><li>Entry: ${esc(d.entryFee)}</li><li>Nearby restaurants and cafés</li><li>Duration: ${esc(d.duration)}</li></ul></section>`,
  }),
}

function buildDetail(d) {
  if (richContent[d.id]) return null
  if (categoryContent[d.category]) return categoryContent[d.category](d)
  return `<section class='destination-content'><h2>Overview</h2><p>${esc(d.description)}</p><h2>Why Visit?</h2><ul><li>Beautiful ${esc(d.category)} destination in Sri Lanka</li><li>Unique cultural and natural experience</li><li>Well-rated by visitors (${d.rating}/5)</li></ul><h2>Things to Do</h2><ul><li>📸 Photography</li><li>🚶 Explore the area</li><li>🌅 Enjoy scenic views</li></ul><h2>Best Time to Visit</h2><p>${esc(d.bestTime)}</p><h2>Practical Info</h2><ul><li><strong>Entry Fee:</strong> ${esc(d.entryFee)}</li><li><strong>Duration:</strong> ${esc(d.duration)}</li></ul></section>`
}

const src = readFileSync('src/data/destinations.js', 'utf8')
const match = src.match(/export const destinations = (\[[\s\S]*\])/)
const dests = eval(match[1])

let richCount = 0
let catCount = 0
let fbCount = 0

const updated = dests.map(d => {
  if (d.id === 'beach-mirissa') return d
  if (richContent[d.id]) { richCount++; return { ...d, ...richContent[d.id], image: d.image, googleMapsLink: d.googleMapsLink } }
  const catDet = buildDetail(d)
  if (catDet && categoryContent[d.category]) { catCount++; return { ...d, description: catDet.description || d.description, detail: catDet.detail || catDet } }
  fbCount++
  return d
})

let output = 'export const destinations = [\n'
updated.forEach((d) => {
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
console.log(`Done: ${richCount} custom + ${catCount} category-based + ${fbCount} generic fallback = ${richCount + catCount + fbCount} total`)
