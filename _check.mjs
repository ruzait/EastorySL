import { destinations } from './src/data/destinations.js'
const cats = [...new Set(destinations.map(d => d.category))].sort()
console.log(cats.join('\n'))
