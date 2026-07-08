const fs = require('fs');

const dest = fs.readFileSync('src/data/destinations.js', 'utf8');
const biz = fs.readFileSync('src/data/businesses.js', 'utf8');

const destNames = dest.match(/name:\s*'([^']+)'/g).map(s => s.match(/'([^']+)'/)[1]);
const bizNames = biz.match(/name:\s*'([^']+)'/g).map(s => s.match(/'([^']+)'/)[1]);

console.log('Destinations count:', destNames.length);
console.log('Businesses count:', bizNames.length);

// Check exact name overlaps
const overlap = destNames.filter(n => bizNames.includes(n));
console.log('\nSame names in both:');
overlap.forEach(n => console.log('  -', n));

// Check partial/location overlaps
console.log('\nDestinations that might overlap with business locations:');
destNames.forEach(n => {
  bizNames.forEach(b => {
    if (b.includes(n) && n.length > 5) console.log(`  "${b}" contains "${n}"`);
  });
});
