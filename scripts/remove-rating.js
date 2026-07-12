import { readFileSync, writeFileSync } from 'fs'

const src = readFileSync('src/data/destinations.js', 'utf8')
const match = src.match(/export const destinations = (\[[\s\S]*\])/)
const dests = eval(match[1])

let output = 'export const destinations = [\n'
dests.forEach((d) => {
  output += '  {\n'
  output += `    id: ${JSON.stringify(d.id)},\n`
  output += `    name: ${JSON.stringify(d.name)},\n`
  output += `    location: ${JSON.stringify(d.location)},\n`
  output += `    district: ${JSON.stringify(d.district)},\n`
  output += `    category: ${JSON.stringify(d.category)},\n`
  output += `    tier: ${JSON.stringify(d.tier)},\n`
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
console.log(`Removed rating from ${dests.length} destinations`)
