import { readFileSync, writeFileSync } from 'fs'

const src = readFileSync('src/data/sriLankaPride.js', 'utf8')
const match = src.match(/export const prideItems = (\[[\s\S]*\])/)
const items = eval(match[1])

const removeIds = new Set([
  'cg-dambulla',
  'cg-adamspeak',
  'mg-nationalmuseum',
  'mg-teamuseum',
  'cu-gallefort',
])

const filtered = items.filter(item => !removeIds.has(item.id))

let js = 'export const prideItems = [\n'
filtered.forEach((item) => {
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
console.log(`Removed ${items.length - filtered.length} duplicates. Pride: ${items.length} → ${filtered.length} entries`)

// Show remaining by category
const cats = {}
filtered.forEach(p => { cats[p.category] = (cats[p.category]||0)+1 })
console.log('Categories:', JSON.stringify(cats))
