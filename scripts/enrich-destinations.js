import { readFileSync, writeFileSync } from 'fs'

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

const content = {
  'beach-unawatuna': {
    description: "A picturesque sheltered bay beach with calm turquoise waters, golden sands, and a relaxed tropical vibe perfect for swimming and snorkeling.",
    detail: `<section class='destination-content'><h2>Overview</h2><p>Unawatuna Beach is one of Sri Lanka's most popular beach destinations, known for its sheltered bay with calm turquoise waters, soft golden sands, and a vibrant mix of restaurants, boutiques, and guesthouses along the shore.</p><h2>Why Visit Unawatuna?</h2><ul><li>Calm, swimmable waters year-round</li><li>Beautiful crescent-shaped bay</li><li>Excellent snorkeling near the coral reef</li><li>Historic Japanese Peace Pagoda nearby</li><li>Vibrant beachside dining scene</li><li>Close to Galle Fort (15 minutes)</li><li>Laid-back backpacker and boutique hotel scene</li></ul><h2>Top Attractions</h2><ul><li>Unawatuna Beach</li><li>Japanese Peace Pagoda</li><li>Rumassala Rock (UNESCO-listed)</li><li>Galle Fort (nearby)</li><li>Dalawella Rope Swing</li><li>Unawatuna Turtle Hatchery</li></ul><h2>Things to Do</h2><ul><li>🤿 Snorkeling over the coral reef</li><li>🏊 Swimming in the calm bay</li><li>🚶 Walk to the Japanese Peace Pagoda</li><li>📸 Sunset photography from Rumassala</li><li>🍤 Enjoy fresh seafood at beachside cafés</li><li>🏄 Body surfing and boogie boarding</li><li>🛍️ Browse boutique shops along the beach road</li></ul><h2>Best Time to Visit</h2><table><thead><tr><th>Season</th><th>Months</th><th>Activities</th></tr></thead><tbody><tr><td>Dry Season</td><td>November – April</td><td>Swimming, snorkeling, beach activities</td></tr><tr><td>Shoulder Season</td><td>May – October</td><td>Quieter beach, occasional rain showers</td></tr></tbody></table><h2>Facilities</h2><ul><li>Boutique hotels and guesthouses</li><li>Beachfront restaurants and cafés</li><li>Dive centers</li><li>Surf schools</li><li>ATM facilities</li><li>Pharmacies and convenience stores</li><li>Tuk-tuk stands</li></ul></section>`,
    coordinates: { lat: 6.0108, lng: 80.2496 },
  },
  'beach-bentota': {
    description: "Golden sands with watersports, river safaris and upscale beachfront resorts in a luxury coastal setting.",
    detail: `<section class='destination-content'><h2>Overview</h2><p>Bentota Beach is one of Sri Lanka's premier resort destinations, offering golden sandy beaches, calm waters perfect for watersports, and a wide range of luxury beachfront hotels and resorts along the stunning coastline.</p><h2>Why Visit Bentota?</h2><ul><li>Premier watersports destination</li><li>Luxury beachfront resorts and spas</li><li>Madu River mangrove safari</li><li>Turtle hatchery visits</li><li>Calm waters ideal for families</li><li>Beautiful Bentota River for boat trips</li><li>Rich cultural sites nearby</li></ul><h2>Top Attractions</h2><ul><li>Bentota Beach</li><li>Madu River Safari</li><li>Bentota River</li><li>Kosgoda Turtle Hatchery</li><li>Brief Garden by Bevis Bawa</li><li>Lunuganga (Geoffrey Bawa's estate)</li></ul><h2>Things to Do</h2><ul><li>🚤 Jet skiing and banana boating</li><li>🏄 Windsurfing and kite surfing</li><li>🚣 Madu River mangrove boat safari</li><li>🐢 Visit the turtle hatchery</li><li>💆 Enjoy luxury spa treatments</li><li>🌅 Sunset cruise on Bentota River</li><li>📸 Visit Brief Garden</li></ul><h2>Best Time to Visit</h2><table><thead><tr><th>Season</th><th>Months</th><th>Activities</th></tr></thead><tbody><tr><td>Peak Season</td><td>November – April</td><td>Watersports, beach activities, river safaris</td></tr><tr><td>Off Season</td><td>May – October</td><td>Fewer crowds, calm mornings</td></tr></tbody></table><h2>Facilities</h2><ul><li>Luxury 5-star resorts</li><li>Boutique hotels</li><li>Watersports centers</li><li>Spa and wellness facilities</li><li>Beach restaurants</li><li>Shopping outlets</li><li>ATM facilities</li></ul></section>`,
    coordinates: { lat: 6.426, lng: 79.9955 },
  },
  'beach-hikkaduwa': {
    description: "Lively surf town beach known for coral reefs, turtles and beachside nightlife on the southwestern coast.",
    detail: `<section class='destination-content'><h2>Overview</h2><p>Hikkaduwa Beach is a vibrant coastal town famous for its coral sanctuary, sea turtle encounters, excellent surfing, and a lively nightlife scene that attracts surfers and beach lovers from around the world.</p><h2>Why Visit Hikkaduwa?</h2><ul><li>Famous coral sanctuary for snorkeling</li><li>Swim with sea turtles</li><li>Excellent surf breaks</li><li>Lively beach bars and nightlife</li><li>Buddhist temple and cultural sites</li><li>Art galleries and surf shops</li></ul><h2>Top Attractions</h2><ul><li>Hikkaduwa Coral Sanctuary</li><li>Turtle Point</li><li>Hikkaduwa National Park</li><li>Temple of the Moon Stone</li><li>Surfing breaks at Kabalana and Sea Turtle</li><li>Seenigama Muhudu Vihara</li></ul><h2>Things to Do</h2><ul><li>🤿 Snorkeling in the coral sanctuary</li><li>🐢 Swim with sea turtles at Turtle Point</li><li>🏄 Surfing at multiple breaks</li><li>🎵 Enjoy beachside nightlife</li><li>🛍️ Browse surf shops and art galleries</li><li>🌅 Watch sunset from the beach</li><li>🚤 Glass-bottom boat tours</li></ul><h2>Best Time to Visit</h2><table><thead><tr><th>Season</th><th>Months</th><th>Activities</th></tr></thead><tbody><tr><td>Peak Season</td><td>November – April</td><td>Beach activities, snorkeling, nightlife</td></tr><tr><td>Surf Season</td><td>April – October</td><td>Best surfing conditions</td></tr></tbody></table><h2>Facilities</h2><ul><li>Surf hostels and guesthouses</li><li>Boutique hotels</li><li>Beach bars and restaurants</li><li>Surf schools</li><li>Dive centers</li><li>ATM facilities</li></ul></section>`,
    coordinates: { lat: 6.1408, lng: 80.1017 },
  },
  'beach-arugambay': {
    description: "World-class right-hand point break and laid-back surf village on the remote east coast of Sri Lanka.",
    detail: `<section class='destination-content'><h2>Overview</h2><p>Arugam Bay is Sri Lanka's premier surf destination, a laid-back coastal village on the east coast known for its world-class right-hand point break, uncrowded lineups, and a relaxed bohemian atmosphere that draws surfers from across the globe.</p><h2>Why Visit Arugam Bay?</h2><ul><li>World-class right-hand point break</li><li>Uncrowded surf conditions</li><li>Multiple surf breaks within reach</li><li>Laid-back bohemian village vibe</li><li>Close to national parks and lagoons</li><li>Pristine east coast beaches</li></ul><h2>Top Attractions</h2><ul><li>Main Point (Arugam Bay surf break)</li><li>Pottuvil Point</li><li>Mamella Point</li><li>Kumana National Park (nearby)</li><li>Lagoon kayaking</li><li>Pristine east coast beaches</li></ul><h2>Things to Do</h2><ul><li>🏄 Surfing at world-class breaks</li><li>🐢 Turtle watching at Rekawa</li><li>🦎 Kumana National Park safari</li><li>🚣 Lagoon kayaking</li><li>🌅 Beach bonfires and sundowners</li><li>🚶 Explore the village by bicycle</li><li>🎣 Deep-sea fishing trips</li></ul><h2>Best Time to Visit</h2><table><thead><tr><th>Season</th><th>Months</th><th>Activities</th></tr></thead><tbody><tr><td>Surf Season</td><td>April – October</td><td>Best surf conditions, sunny weather</td></tr><tr><td>Off Season</td><td>November – March</td><td>Closed due to northeast monsoon</td></tr></tbody></table><h2>Facilities</h2><ul><li>Surf camps and guesthouses</li><li>Beach cafés and restaurants</li><li>Surf shops</li><li>Bike rentals</li><li>Limited ATM facilities</li></ul></section>`,
    coordinates: { lat: 6.84, lng: 81.8367 },
  },
  'beach-nilaveli': {
    description: "Long stretch of white sand near Pigeon Island, ideal for swimming, diving and snorkeling in crystal-clear waters.",
    detail: `<section class='destination-content'><h2>Overview</h2><p>Nilaveli Beach is a stunning stretch of pristine white sand located near Trincomalee on the east coast, offering crystal-clear waters, easy access to Pigeon Island National Park, and a peaceful tropical escape away from the crowds.</p><h2>Why Visit Nilaveli?</h2><ul><li>Pristine white sand beach</li><li>Gateway to Pigeon Island</li><li>Excellent snorkeling and diving</li><li>Calm, clear waters</li><li>Less crowded than south coast beaches</li><li>Nearby whale watching in Trincomalee</li></ul><h2>Top Attractions</h2><ul><li>Nilaveli Beach</li><li>Pigeon Island National Park</li><li>Trincomalee Harbour</li><li>Koneswaram Temple</li><li>Fort Frederick</li><li>Marble Beach</li></ul><h2>Things to Do</h2><ul><li>🤿 Snorkeling at Pigeon Island</li><li>🏊 Swimming in calm waters</li><li>🏝️ Day trip to Pigeon Island</li><li>🐋 Whale watching from Trincomalee</li><li>📸 Beach photography</li><li>🌅 Sunset walks</li></ul><h2>Best Time to Visit</h2><table><thead><tr><th>Season</th><th>Months</th><th>Activities</th></tr></thead><tbody><tr><td>Dry Season</td><td>May – September</td><td>Swimming, snorkeling, island trips</td></tr><tr><td>Whale Season</td><td>March – August</td><td>Whale watching in Trincomalee</td></tr></tbody></table><h2>Facilities</h2><ul><li>Beach resorts and hotels</li><li>Guesthouses</li><li>Beach restaurants</li><li>Dive centers</li><li>Tuk-tuk and taxi services</li></ul></section>`,
    coordinates: { lat: 8.7, lng: 81.1833 },
  },
  'beach-uppuveli': {
    description: "Quiet golden beach close to Trincomalee town, popular for sunrise walks and calm swimming.",
    detail: `<section class='destination-content'><h2>Overview</h2><p>Uppuveli Beach is a peaceful golden sand beach just north of Trincomalee, offering calm swimming waters, beautiful sunrise views, and a quiet alternative to the busier Nilaveli Beach.</p><h2>Why Visit Uppuveli?</h2><ul><li>Beautiful sunrise views</li><li>Quiet and uncrowded</li><li>Calm swimming waters</li><li>Close to Trincomalee town</li><li>Budget-friendly accommodation</li><li>Nearby dolphin watching</li></ul><h2>Things to Do</h2><ul><li>🌅 Sunrise beach walks</li><li>🏊 Swimming</li><li>🐋 Dolphin watching trips</li><li>🚶 Coastal walks to Nilaveli</li><li>🍤 Fresh seafood at local restaurants</li></ul><h2>Best Time to Visit</h2><table><thead><tr><th>Season</th><th>Months</th><th>Activities</th></tr></thead><tbody><tr><td>Dry Season</td><td>May – September</td><td>Beach activities, swimming</td></tr></tbody></table><h2>Facilities</h2><ul><li>Guesthouses and budget hotels</li><li>Local restaurants</li><li>Tuk-tuk services</li></ul></section>`,
    coordinates: { lat: 8.6033, lng: 81.205 },
  },
  'beach-pasikudah': {
    description: "Shallow, calm bay beach with warm water extending far offshore, perfect for families and weak swimmers.",
    detail: `<section class='destination-content'><h2>Overview</h2><p>Pasikudah Beach is a stunning shallow bay on the east coast where warm turquoise waters extend hundreds of meters offshore, making it one of Sri Lanka's safest and most family-friendly beaches.</p><h2>Why Visit Pasikudah?</h2><ul><li>Extremely shallow, calm waters</li><li>Safe for children and weak swimmers</li><li>Pristine coral reef nearby</li><li>Luxury resort development</li><li>Gateway to Batticaloa culture</li></ul><h2>Things to Do</h2><ul><li>🏊 Wade far out in the shallow bay</li><li>🤿 Snorkeling</li><li>🛶 Kayaking</li><li>🏖️ Beach walks</li><li>🐢 Turtle watching</li></ul><h2>Best Time to Visit</h2><table><thead><tr><th>Season</th><th>Months</th><th>Activities</th></tr></thead><tbody><tr><td>Dry Season</td><td>May – September</td><td>Swimming, snorkeling, beach activities</td></tr></tbody></table><h2>Facilities</h2><ul><li>Luxury resorts</li><li>Guesthouses</li><li>Beach restaurants</li></ul></section>`,
    coordinates: { lat: 7.9333, lng: 81.5667 },
  },
  'beach-tangalle': {
    description: "Wide, wild stretch of coastline with dramatic surf and turtle nesting sites on the deep south coast.",
    detail: `<section class='destination-content'><h2>Overview</h2><p>Tangalle Beach is a rugged stretch of wild coastline on Sri Lanka's south coast, featuring dramatic surf, secluded coves, turtle nesting sites, and some of the island's most atmospheric boutique hotels nestled among coconut groves.</p><h2>Why Visit Tangalle?</h2><ul><li>Wild, unspoiled coastline</li><li>Turtle nesting beaches</li><li>Dramatic surf</li><li>Secluded luxury resorts</li><li>Close to Yala and Rekawa</li><li>Authentic fishing village atmosphere</li></ul><h2>Things to Do</h2><ul><li>🐢 Night-time turtle watching</li><li>🏄 Surfing</li><li>🚶 Explore rocky coves</li><li>🐋 Whale watching trips</li><li>📸 Dramatic coastal photography</li></ul><h2>Best Time to Visit</h2><table><thead><tr><th>Season</th><th>Months</th><th>Activities</th></tr></thead><tbody><tr><td>Dry Season</td><td>November – April</td><td>Beach activities, turtle watching</td></tr></tbody></table><h2>Facilities</h2><ul><li>Boutique luxury hotels</li><li>Guesthouses</li><li>Local restaurants</li></ul></section>`,
    coordinates: { lat: 6.0242, lng: 80.7936 },
  },
  'beach-weligama': {
    description: "Wide sandy bay considered the best beginner surf spot in Sri Lanka with gentle waves and surf schools.",
    detail: `<section class='destination-content'><h2>Overview</h2><p>Weligama Beach is Sri Lanka's most popular beginner surf destination, offering a wide sandy bay with gentle, forgiving waves, multiple surf schools, and a friendly fishing-town atmosphere that makes it perfect for learning to surf.</p><h2>Why Visit Weligama?</h2><ul><li>Best beginner surf spot in Sri Lanka</li><li>Gentle, consistent waves</li><li>Multiple surf schools</li><li>Working fishing town atmosphere</li><li>Close to Mirissa and Matara</li></ul><h2>Things to Do</h2><ul><li>🏄 Learn to surf</li><li>🏊 Swimming</li><li>📸 Watch fishermen bring in the catch</li><li>🚶 Stroll the fishing harbor</li><li>🏖️ Relax on the wide sandy beach</li></ul><h2>Best Time to Visit</h2><table><thead><tr><th>Season</th><th>Months</th><th>Activities</th></tr></thead><tbody><tr><td>Dry Season</td><td>November – April</td><td>Surf lessons, beach activities</td></tr><tr><td>Surf Season</td><td>April – October</td><td>Bigger waves for intermediate surfers</td></tr></tbody></table><h2>Facilities</h2><ul><li>Surf schools and board rentals</li><li>Guesthouses and hotels</li><li>Local restaurants</li></ul></section>`,
    coordinates: { lat: 5.9743, lng: 80.4293 },
  },
  'beach-negombo': {
    description: "Convenient airport-adjacent beach lined with hotels, bars, fish markets and a lively fishing community.",
    detail: `<section class='destination-content'><h2>Overview</h2><p>Negombo Beach is a bustling coastal town just minutes from Bandaranaike International Airport, known for its lively fish markets, canal system, beachfront hotels, and as a convenient first or last stop for visitors to Sri Lanka.</p><h2>Why Visit Negombo?</h2><ul><li>Closest beach to the international airport</li><li>Lively fish market experience</li><li>Historic Dutch canal system</li><li>Beachfront dining and nightlife</li><li>Water sports and boat trips</li><li>Convenient transit stop</li></ul><h2>Things to Do</h2><ul><li>🐟 Visit the early-morning fish market</li><li>🚣 Dutch canal boat trip</li><li>🏊 Swimming</li><li>🛍️ Shopping at local markets</li><li>🌅 Sunset at the beach</li></ul><h2>Best Time to Visit</h2><table><thead><tr><th>Season</th><th>Months</th><th>Activities</th></tr></thead><tbody><tr><td>Peak Season</td><td>November – April</td><td>Beach activities, water sports</td></tr></tbody></table><h2>Facilities</h2><ul><li>Beachfront hotels</li><li>Restaurants and bars</li><li>Fish markets</li><li>ATM facilities</li><li>Taxi and tuk-tuk services</li></ul></section>`,
    coordinates: { lat: 7.2095, lng: 79.8353 },
  },
  'beach-kalpitiya': {
    description: "Remote peninsula beach known for kite-surfing winds, dolphin watching and pristine coastal landscapes.",
    detail: `<section class='destination-content'><h2>Overview</h2><p>Kalpitiya is a remote peninsula on Sri Lanka's northwest coast, famous for its world-class kite-surfing conditions, dolphin watching, pristine beaches, and rugged coastal landscapes that feel far removed from the tourist trail.</p><h2>Why Visit Kalpitiya?</h2><ul><li>World-class kite-surfing</li><li>Wild dolphin watching</li><li>Pristine, uncrowded beaches</li><li>Bar Reef snorkeling</li><li>Remote, off-the-beaten-path feel</li></ul><h2>Things to Do</h2><ul><li>🪁 Kite-surfing</li><li>🐬 Dolphin watching boat trips</li><li>🤿 Bar Reef snorkeling</li><li>🏝️ Island camping</li><li>🌅 Sunset over the lagoon</li></ul><h2>Best Time to Visit</h2><table><thead><tr><th>Season</th><th>Months</th><th>Activities</th></tr></thead><tbody><tr><td>Kite Season</td><td>May – October</td><td>Kite-surfing, dolphin watching</td></tr><tr><td>Dolphin Season</td><td>November – March</td><td>Dolphin watching, calm seas</td></tr></tbody></table><h2>Facilities</h2><ul><li>Kite-surfing camps</li><li>Guesthouses</li><li>Limited restaurants</li></ul></section>`,
    coordinates: { lat: 8.2333, lng: 79.7667 },
  },
  'beach-marble': {
    description: "Secluded naval-run beach with calm clear water framed by rocky headlands near Trincomalee.",
    detail: `<section class='destination-content'><h2>Overview</h2><p>Marble Beach is a secluded, pristine beach on the Trincomalee peninsula, known for its crystal-clear waters, rocky headlands, and quiet atmosphere as it is partially managed by the Sri Lankan Navy.</p><h2>Things to Do</h2><ul><li>🏊 Swimming in crystal-clear water</li><li>📸 Photography of rocky headlands</li><li>🚶 Coastal walks</li><li>🏖️ Relax on the quiet beach</li></ul><h2>Best Time to Visit</h2><table><thead><tr><th>Season</th><th>Months</th><th>Activities</th></tr></thead><tbody><tr><td>Dry Season</td><td>May – September</td><td>Swimming, beach activities</td></tr></tbody></table><h2>Facilities</h2><ul><li>Navy-run canteen</li><li>Basic facilities</li></ul></section>`,
    coordinates: { lat: 8.65, lng: 81.15 },
  },
  'beach-dalawella': {
    description: "Postcard beach with a famous rope swing over the ocean at sunset and calm snorkeling waters.",
    detail: `<section class='destination-content'><h2>Overview</h2><p>Dalawella Beach is a beautiful stretch of sand near Unawatuna, famous for its iconic ocean rope swing that has become one of Sri Lanka's most photographed spots, along with calm waters perfect for snorkeling.</p><h2>Why Visit Dalawella?</h2><ul><li>Famous ocean rope swing</li><li>Calm snorkeling waters</li><li>Beautiful sunset views</li><li>Near Unawatuna and Galle</li><li>Less crowded than Unawatuna</li></ul><h2>Things to Do</h2><ul><li>📸 Swing over the ocean</li><li>🤿 Snorkeling</li><li>🏊 Swimming</li><li>🌅 Sunset photography</li><li>🚶 Walk along the beach</li></ul><h2>Best Time to Visit</h2><table><thead><tr><th>Season</th><th>Months</th><th>Activities</th></tr></thead><tbody><tr><td>Dry Season</td><td>November – April</td><td>Swimming, swing, snorkeling</td></tr></tbody></table><h2>Facilities</h2><ul><li>Beach cafés</li><li>Guesthouses</li></ul></section>`,
    coordinates: { lat: 6.0, lng: 80.2333 },
  },
  'beach-hiriketiya': {
    description: "Horseshoe-shaped cove popular with surfers and boutique cafes in a scenic south coast setting.",
    detail: `<section class='destination-content'><h2>Overview</h2><p>Hiriketiya Beach is a stunning horseshoe-shaped cove on the south coast, popular with surfers and digital nomads for its laid-back vibe, excellent waves, and a growing scene of trendy cafés and boutique stays nestled among palm trees.</p><h2>Why Visit Hiriketiya?</h2><ul><li>Beautiful horseshoe-shaped cove</li><li>Consistent surf breaks</li><li>Trendy café scene</li><li>Boutique accommodation</li><li>Laid-back, creative community</li></ul><h2>Things to Do</h2><ul><li>🏄 Surfing</li><li>☕ Café hopping</li><li>🏊 Swimming in the cove</li><li>🧘 Yoga classes</li><li>📸 Photography</li></ul><h2>Best Time to Visit</h2><table><thead><tr><th>Season</th><th>Months</th><th>Activities</th></tr></thead><tbody><tr><td>Surf Season</td><td>November – April</td><td>Best surf conditions</td></tr><tr><td>Off Season</td><td>May – October</td><td>Bigger waves, fewer crowds</td></tr></tbody></table><h2>Facilities</h2><ul><li>Boutique hotels and villas</li><li>Trendy cafés and restaurants</li><li>Surf shops</li><li>Yoga studios</li></ul></section>`,
    coordinates: { lat: 5.9667, lng: 80.7 },
  },
  'beach-rekawa': {
    description: "Protected nesting beach where five species of sea turtles come ashore at night to lay eggs.",
    detail: `<section class='destination-content'><h2>Overview</h2><p>Rekawa Beach is one of the most important sea turtle nesting sites in Sri Lanka, where five of the world's seven species of sea turtles come ashore at night to lay their eggs along its protected coastline.</p><h2>Why Visit Rekawa?</h2><ul><li>Major turtle nesting site</li><li>Five species of sea turtles</li><li>Guided night-time turtle watching</li><li>Conservation-focused tourism</li><li>Quiet, unspoiled beach</li></ul><h2>Things to Do</h2><ul><li>🐢 Guided night turtle watching</li><li>🏖️ Beach walks</li><li>📷 Wildlife photography</li><li>📚 Learn about turtle conservation</li></ul><h2>Best Time to Visit</h2><table><thead><tr><th>Season</th><th>Months</th><th>Activities</th></tr></thead><tbody><tr><td>Nesting Season</td><td>Year-round (peak Jan–Apr)</td><td>Turtle nesting observation</td></tr></tbody></table><h2>Facilities</h2><ul><li>Turtle conservation center</li><li>Basic guesthouses</li></ul></section>`,
    coordinates: { lat: 6.045, lng: 80.85 },
  },
}

const fallbackDetail = (dest) => {
  const n = esc(dest.name)
  const d = esc(dest.description)
  const loc = esc(dest.location)
  const dist = esc(dest.district)
  return `<section class='destination-content'><h2>Overview</h2><p>${d}</p><h2>Location</h2><p>${n} is located in ${loc}, ${dist} district, Sri Lanka.</p><h2>Why Visit?</h2><ul><li>Beautiful ${esc(dest.category)} destination</li><li>Unique cultural and natural experience</li><li>Well-rated by visitors (${dest.rating}/5)</li></ul><h2>Things to Do</h2><ul><li>📸 Photography</li><li>🚶 Explore the area</li><li>🌅 Enjoy scenic views</li></ul><h2>Best Time to Visit</h2><p>${esc(dest.bestTime)}</p><h2>Practical Info</h2><ul><li><strong>Entry Fee:</strong> ${esc(dest.entryFee)}</li><li><strong>Duration:</strong> ${esc(dest.duration)}</li></ul></section>`
}

const src = readFileSync('src/data/destinations.js', 'utf8')
const match = src.match(/export const destinations = (\[[\s\S]*\])/)
const dests = eval(match[1])

const updated = dests.map(d => {
  if (d.id === 'beach-mirissa') return d
  const c = content[d.id]
  if (c) {
    return { ...d, ...c, image: d.image, googleMapsLink: d.googleMapsLink }
  }
  return { ...d, detail: fallbackDetail(d) }
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

const richCount = dests.filter(d => d.id !== 'beach-mirissa' && content[d.id]).length
const fbCount = dests.length - richCount - 1
console.log(`Updated: ${richCount} rich + ${fbCount} fallback (no content map yet) + 1 Mirissa (preserved)`)
