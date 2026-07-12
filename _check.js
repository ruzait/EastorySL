const d = require('./src/data/destinations').destinations
const cats = [...new Set(d.map(i => i.category))]
console.log(cats.sort().join('\n'))
