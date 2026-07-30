import { FiImage, FiCamera } from 'react-icons/fi'
import { GiBeachBall, GiTreeBranch, GiWaterfall, GiCastle, GiCrown, GiCookingPot, GiMedal, GiBed, GiParachute, GiShoppingBag } from 'react-icons/gi'
import { FaLandmark, FaChurch, FaCity } from 'react-icons/fa'

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export const galleryCatIcons = {
  'all': FiImage,
  'beaches': GiBeachBall,
  'nature': GiTreeBranch,
  'waterfalls': GiWaterfall,
  'historical': FaLandmark,
  'religious': FaChurch,
  'forts': GiCastle,
  'cultural': FiCamera,
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

export const galleryExtraSources = {
  'beach-mirissa': {
    name: 'Mirissa Beach',
    category: 'beaches',
    location: 'Mirissa',
    page: 'destinations',
    images: [
      'https://raw.githubusercontent.com/eastorysl/storyimages/main/destination/mirissabeach2.jpg',
      'https://raw.githubusercontent.com/eastorysl/storyimages/main/destination/mirissabeach3.jpg',
      'https://raw.githubusercontent.com/eastorysl/storyimages/main/destination/mirissabeach4.jpg',
    ],
  },
  'beach-unawatuna': {
    name: 'Unawatuna Beach',
    category: 'beaches',
    location: 'Unawatuna',
    page: 'destinations',
    images: [
      'https://raw.githubusercontent.com/eastorysl/storyimages/main/destination/unawatunabeach2.jpg',
      'https://raw.githubusercontent.com/eastorysl/storyimages/main/destination/unawatunabeach3.jpg',
      'https://raw.githubusercontent.com/eastorysl/storyimages/main/destination/unawatunabeach4.jpg',
      'https://raw.githubusercontent.com/eastorysl/storyimages/main/destination/unawatunabeach5.jpg',
    ],
  },
  'ak-anuradhapura': {
    name: 'Kingdom of Anuradhapura',
    category: 'ancient-kingdoms',
    location: 'Anuradhapura',
    page: 'sri-lanka-pride',
    images: [
      'https://raw.githubusercontent.com/eastorysl/storyimages/main/pride/KingdomofAnuradhapura1.jpg',
      'https://raw.githubusercontent.com/eastorysl/storyimages/main/pride/KingdomofAnuradhapura2.png',
    ],
  },
  'ak-polonnaruwa': {
    name: 'Kingdom of Polonnaruwa',
    category: 'ancient-kingdoms',
    location: 'Polonnaruwa',
    page: 'sri-lanka-pride',
    images: [
      'https://raw.githubusercontent.com/eastorysl/storyimages/main/pride/KingdomofPolonnaruwa1.jpg',
      'https://raw.githubusercontent.com/eastorysl/storyimages/main/pride/KingdomofPolonnaruwa2.jpg',
      'https://raw.githubusercontent.com/eastorysl/storyimages/main/pride/KingdomofPolonnaruwa3.jpg',
    ],
  },
  'wf-bopath': {
    name: 'Bopath Ella Falls',
    category: 'waterfalls',
    location: 'Kuruwita',
    page: 'destinations',
    images: [
      'https://raw.githubusercontent.com/eastorysl/storyimages/main/destination/waterfals/BopathElla.jpg',
    ],
  },
  'beach-bentota': {
    name: 'Bentota Beach',
    category: 'beaches',
    location: 'Bentota',
    page: 'destinations',
    images: [
      'https://raw.githubusercontent.com/eastorysl/storyimages/main/destination/beaches/BentotaBeach2.jpg',
      'https://raw.githubusercontent.com/eastorysl/storyimages/main/destination/beaches/BentotaBeach3.jpg',
    ],
  },
  'beach-hikkaduwa': {
    name: 'Hikkaduwa Beach',
    category: 'beaches',
    location: 'Hikkaduwa',
    page: 'destinations',
    images: [
      'https://raw.githubusercontent.com/eastorysl/storyimages/main/destination/beaches/HikkaduwaBeach2.jpg',
      'https://raw.githubusercontent.com/eastorysl/storyimages/main/destination/beaches/HikkaduwaBeach3.jpg',
    ],
  },
  'beach-arugambay': {
    name: 'Arugam Bay',
    category: 'beaches',
    location: 'Arugam Bay',
    page: 'destinations',
    images: [
      'https://raw.githubusercontent.com/eastorysl/storyimages/main/destination/beaches/ArugamBay1.jpg',
      'https://raw.githubusercontent.com/eastorysl/storyimages/main/destination/beaches/ArugamBay2.jpg',
    ],
  },
  'beach-nilaveli': {
    name: 'Nilaveli Beach',
    category: 'beaches',
    location: 'Nilaveli',
    page: 'destinations',
    images: [
      'https://raw.githubusercontent.com/eastorysl/storyimages/main/destination/beaches/NilaveliBeach1.jpg',
    ],
  },
  'beach-tangalle': {
    name: 'Tangalle Beach',
    category: 'beaches',
    location: 'Tangalle',
    page: 'destinations',
    images: [
      'https://raw.githubusercontent.com/eastorysl/storyimages/main/destination/beaches/TangalleBeach2.jpg',
      'https://raw.githubusercontent.com/eastorysl/storyimages/main/destination/beaches/TangalleBeach4.jpg',
    ],
  },
  'beach-weligama': {
    name: 'Weligama Beach',
    category: 'beaches',
    location: 'Weligama',
    page: 'destinations',
    images: [
      'https://raw.githubusercontent.com/eastorysl/storyimages/main/destination/beaches/WeligamaBeach1.jpg',
    ],
  },
  'beach-negombo': {
    name: 'Negombo Beach',
    category: 'beaches',
    location: 'Negombo',
    page: 'destinations',
    images: [
      'https://raw.githubusercontent.com/eastorysl/storyimages/main/destination/beaches/NegomboBeach2.jpg',
    ],
  },
  'beach-kalpitiya': {
    name: 'Kalpitiya Beach',
    category: 'beaches',
    location: 'Kalpitiya',
    page: 'destinations',
    images: [
      'https://raw.githubusercontent.com/eastorysl/storyimages/main/destination/beaches/KalpitiyaBeach2.jpg',
      'https://raw.githubusercontent.com/eastorysl/storyimages/main/destination/beaches/KalpitiyaBeach3.jpg',
    ],
  },
  'beach-dalawella': {
    name: 'Dalawella Beach',
    category: 'beaches',
    location: 'Dalawella',
    page: 'destinations',
    images: [
      'https://raw.githubusercontent.com/eastorysl/storyimages/main/destination/beaches/DalawellaBeach2.jpg',
      'https://raw.githubusercontent.com/eastorysl/storyimages/main/destination/beaches/DalawellaBeach3.jpg',
    ],
  },
  'beach-hiriketiya': {
    name: 'Hiriketiya Beach',
    category: 'beaches',
    location: 'Dickwella',
    page: 'destinations',
    images: [
      'https://raw.githubusercontent.com/eastorysl/storyimages/main/destination/beaches/HiriketiyaBeach2.jpg',
      'https://raw.githubusercontent.com/eastorysl/storyimages/main/destination/beaches/HiriketiyaBeach3.jpg',
    ],
  },
  'beach-rekawa': {
    name: 'Rekawa Beach',
    category: 'beaches',
    location: 'Rekawa',
    page: 'destinations',
    images: [
      'https://raw.githubusercontent.com/eastorysl/storyimages/main/destination/beaches/RekawaBeach3.jpg',
    ],
  },
  'ak-kandy': {
    name: 'Kingdom of Kandy',
    category: 'ancient-kingdoms',
    location: 'Kandy',
    page: 'sri-lanka-pride',
    images: [
      'https://raw.githubusercontent.com/eastorysl/storyimages/main/pride/kingdom/KingdomofKandy1.jpg',
    ],
  },
  'ak-dambadeniya': {
    name: 'Kingdom of Dambadeniya',
    category: 'ancient-kingdoms',
    location: 'Dambadeniya, Kurunegala',
    page: 'sri-lanka-pride',
    images: [
      'https://raw.githubusercontent.com/eastorysl/storyimages/main/pride/kingdom/KingdomofDambadeniya2.jpg',
    ],
  },
  'ak-gampola': {
    name: 'Kingdom of Gampola',
    category: 'ancient-kingdoms',
    location: 'Gampola, Kandy',
    page: 'sri-lanka-pride',
    images: [
      'https://raw.githubusercontent.com/eastorysl/storyimages/main/pride/kingdom/KingdomofGampola1.png',
    ],
  },
}

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

  const prideMap = {
    'ancient-kingdoms': 'ancient-kingdoms',
    'food-culinary': 'food-culinary',
    'cities-urban': 'cities-urban',
    'famous-people': 'famous-people',
    'caves-geological-wonders': 'nature',
    'museums': 'cultural',
    'tea-spice-trails': 'food-culinary',
    'seasonal-foods': 'food-culinary',
  }

  const bizMap = {
    Hotels: 'accommodation',
    Resorts: 'accommodation',
    Villas: 'accommodation',
    'Guest Houses': 'accommodation',
    'Eco Lodges': 'accommodation',
    'Local Markets': 'shopping',
    Handicrafts: 'shopping',
    'Souvenir Shops': 'shopping',
    'Gems & Jewellery': 'shopping',
    'Batik & Clothing': 'shopping',
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
        dataCategory: d.category,
        location: d.location,
        itemId: d.id,
        page: 'destinations',
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
        dataCategory: p.category,
        location: p.location || p.origin || p.birthPlace || '',
        itemId: p.id,
        page: 'sri-lanka-pride',
      })
    }
  })

  businesses.forEach((b) => {
    const cat = bizMap[b.subCategory] || bizMap[b.type] || bizMap[b.category]
    if (cat) {
      images.push({
        id: b.id,
        src: b.image,
        alt: b.name,
        category: cat,
        dataCategory: b.subCategory || b.category,
        location: b.location,
        itemId: b.id,
      })
    }
  })

  Object.entries(galleryExtraSources).forEach(([sourceId, source]) => {
    const cat = prideMap[source.category] || destMap[source.category] || source.category
    source.images.forEach((src, i) => {
      images.push({
        id: `${sourceId}-extra-${i}`,
        src,
        alt: source.name,
        category: cat,
        dataCategory: source.category,
        location: source.location,
        itemId: sourceId,
        page: source.page,
      })
    })
  })

  return shuffle(images)
}
