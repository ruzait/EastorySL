import { FiImage, FiCamera } from 'react-icons/fi'
import { GiBeachBall, GiTreeBranch, GiWaterfall, GiCastle, GiCrown, GiCookingPot, GiMedal, GiBed, GiParachute, GiShoppingBag } from 'react-icons/gi'
import { FaLandmark, FaChurch, FaCity } from 'react-icons/fa'

export const galleryCatIcons = {
  'all': FiImage,
  'beaches': GiBeachBall,
  'nature': GiTreeBranch,
  'waterfalls': GiWaterfall,
  'historical': FaLandmark,
  'religious': FaChurch,
  'forts': GiCastle,
  'cultural': undefined,
  'ancient-kingdoms': GiCrown,
  'food-culinary': GiCookingPot,
  'cities-urban': FaCity,
  'famous-people': GiMedal,
  'accommodation': GiBed,
  'adventure': GiParachute,
  'shopping': GiShoppingBag,
}

export const galleryCategories = [
  { id: 'all', label: 'All Photos' },
  { id: 'beaches', label: 'Beaches' },
  { id: 'nature', label: 'Nature & Wildlife' },
  { id: 'waterfalls', label: 'Waterfalls' },
  { id: 'historical', label: 'Historical Sites' },
  { id: 'religious', label: 'Religious Places' },
  { id: 'forts', label: 'Forts' },
  { id: 'cultural', label: 'Cultural & Museums' },
  { id: 'ancient-kingdoms', label: 'Ancient Kingdoms' },
  { id: 'food-culinary', label: 'Food & Culinary' },
  { id: 'cities-urban', label: 'Cities & Urban' },
  { id: 'famous-people', label: 'Famous People' },
  { id: 'accommodation', label: 'Accommodation' },
  { id: 'adventure', label: 'Adventure & Activities' },
  { id: 'shopping', label: 'Shopping' },
]

export const galleryImages = []

export function buildGalleryImages(destinations, businesses, prideItems) {
  const destMap = {
    beaches: 'beaches',
    nature: 'nature',
    wildlife: 'nature',
    parks: 'nature',
    mountains: 'nature',
    waterfalls: 'waterfalls',
    historical: 'historical',
    forts: 'forts',
    religious: 'religious',
    cultural: 'cultural',
    'botanical gardens': 'cultural',
    'scenic train journeys': 'cultural',
    viewpoints: 'nature',
    'lakes & rivers': 'nature',
    islands: 'nature',
    'marine attractions': 'nature',
    'adventure activities': 'adventure',
    'festivals & events': 'cultural',
  }

  const bizMap = {
    Hotels: 'accommodation',
    Resorts: 'accommodation',
    Surfing: 'adventure',
    Diving: 'adventure',
    Snorkeling: 'adventure',
    'Whale Watching': 'adventure',
    Hiking: 'adventure',
    Cycling: 'adventure',
    Fishing: 'adventure',
    'Boat Tours': 'adventure',
    Safari: 'adventure',
    'Photography Spots': 'cultural',
    'Souvenir Shops': 'shopping',
  }

  const prideMap = {
    'ancient-kingdoms': 'ancient-kingdoms',
    'food-culinary': 'food-culinary',
    'cities-urban': 'cities-urban',
    'famous-people': 'famous-people',
    'caves-geological-wonders': 'nature',
    'museums-galleries': 'cultural',
    'tea-spice-trails': 'food-culinary',
    'road-trip-routes': 'adventure',
    'seasonal-foods': 'food-culinary',
  }

  const images = []

  destinations.forEach((d) => {
    const cat = destMap[d.category]
    if (cat) {
      images.push({
        id: d.id,
        src: d.image,
        alt: d.name,
        category: cat,
        location: d.location,
      })
    }
  })

  businesses.forEach((b) => {
    const cat = bizMap[b.subCategory] || bizMap[b.category]
    if (cat) {
      images.push({
        id: b.id,
        src: b.image,
        alt: b.name,
        category: cat,
        location: b.location,
      })
    }
  })

  prideItems.forEach((p) => {
    const cat = prideMap[p.category]
    if (cat) {
      images.push({
        id: p.id,
        src: p.image,
        alt: p.name,
        category: cat,
        location: p.location || p.origin || p.birthPlace || '',
      })
    }
  })

  galleryImages.forEach((g) => {
    const cat = destMap[g.category] || g.category
    if (cat) {
      images.push({ id: g.id, src: g.src, alt: g.alt, category: cat, location: g.location || '' })
    }
  })

  return images.sort(() => Math.random() - 0.5)
}
