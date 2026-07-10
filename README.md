# Eastory SL — Sri Lanka Discovery Platform

> A tourism, culture, and local business discovery platform for Sri Lanka — built with React, featuring an interactive map, PWA support, and rich content pages.

![Version](https://img.shields.io/badge/version-1.0.0-0f766e?style=flat-square)
![React](https://img.shields.io/badge/React_19-61DAFB?style=flat-square&logo=react)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS_3-06B6D4?style=flat-square&logo=tailwind-css)
![Vite](https://img.shields.io/badge/Vite_8-646CFF?style=flat-square&logo=vite)
![License](https://img.shields.io/badge/license-MIT-0f766e?style=flat-square)

---

## Table of Contents

- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Routing & Pages](#routing--pages)
- [Page-by-Page Logic](#page-by-page-logic)
- [Data Files — How to Add New Content](#data-files--how-to-add-new-content)
  - [destinations.js](#destinationsjs)
  - [sriLankaPride.js](#srilankapridejs)
  - [businesses.js](#businessesjs)
  - [gallery.js](#galleryjs)
- [Categories Reference](#categories-reference)
- [Features](#features)
- [Getting Started](#getting-started)
- [Scripts](#scripts)
- [Environment Variables](#environment-variables)
- [Tips for New Developers](#tips-for-new-developers)

---

## Tech Stack

| Category | Choice |
|----------|--------|
| **Framework** | React 19 |
| **Bundler** | Vite 8 |
| **Styling** | Tailwind CSS 3 |
| **Routing** | React Router 7 |
| **Animations** | Framer Motion 12 |
| **Maps** | React Leaflet + Leaflet |
| **Icons** | React Icons (Feather, Game Icons, Font Awesome) |
| **SEO** | react-helmet-async |
| **Linting** | Oxlint |

---

## Project Structure

```
eastern-sri-lanka-hub/
├── public/
│   ├── images/               # Static image assets
│   ├── robots.txt            # Crawler rules + sitemap link
│   ├── sitemap.xml           # Auto-generated (221 URLs)
│   └── favicon.svg
│
├── scripts/
│   └── generate-sitemap.js   # Build-time sitemap generator
│
├── src/
│   ├── components/
│   │   ├── layout/           # Navbar, Footer, Layout, InstallPWA
│   │   ├── home/             # Hero, Featured, TripFinder, Stats, CTA, AboutSriLanka, GovLinks
│   │   ├── tourism/          # DestinationCard, DestinationGrid
│   │   ├── discover/         # BusinessCard, BusinessGrid
│   │   ├── pride/            # PrideCard
│   │   ├── map/              # MapView, MapSidePanel, MapPlaceList, MapLayers
│   │   ├── gallery/          # GalleryGrid
│   │   ├── seo/              # SEO.jsx (Helmet wrapper)
│   │   └── ui/               # AnimatedSection, SectionTitle, Badge, SearchBar, Logo
│   │
│   ├── pages/                # Route-level page components
│   ├── data/                 # Static content modules (the "database")
│   ├── hooks/                # useInView, usePWAInstall
│   ├── utils/                # distance.js, fallback.js, season.js
│   └── App.jsx               # Root with BrowserRouter + Routes
│
├── index.html
├── tailwind.config.js
├── vite.config.js
├── .env.example
└── package.json
```

---

## Routing & Pages

Defined in `src/App.jsx`. All routes are nested under `<Layout />` (Navbar + Footer wrapper).

| Route | Page Component | Description |
|-------|---------------|-------------|
| `/` | `Home` | Landing page with hero, featured destinations, trip finder, stats, CTA, about cards |
| `/destinations` | `Destinations` | Filterable/searchable grid of tourist spots |
| `/destinations/:category/:id` | `DestinationDetail` | Full detail page for a destination (SEO + JSON-LD) |
| `/sri-lanka-pride` | `SriLankaPride` | Filterable grid of heritage/culture items |
| `/sri-lanka-pride/:category/:id` | `PrideDetail` | Detail page for pride item (SEO + JSON-LD) |
| `/discover-more` | `DiscoverMore` | Filterable grid of local businesses |
| `/map` | `Map` | Full-screen Leaflet map with layers, side panel, mobile sheet |
| `/gallery` | `Gallery` | Masonry image grid with lightbox |
| `/advertise` | `Advertise` | Multi-step form for business listings |
| `/privacy-policy` | (inline) | Static placeholder |
| `/terms-of-service` | (inline) | Static placeholder |
| `*` | `NotFound` | 404 page |

---

## Page-by-Page Logic

### Home (`/`)
**File:** `src/pages/Home.jsx`

Imports and renders these child components in order:

| Component | Purpose |
|-----------|---------|
| `Hero` | Full-screen hero with title, subtitle, CTA buttons |
| `Featured` | Shows 6 destinations in-season for current month; "View Seasonal Destinations" links to `/destinations?month=Jul` |
| `TripFinder` | Interactive question-based trip finder |
| `Stats` | Counter stats (places, businesses, etc.) |
| `CTA` | Call-to-action card linking to `/sri-lanka-pride` |
| `AboutSriLanka` | 3 glassmorphism cards (Natural Paradise, Wildlife, Culture) with mobile scroll |
| `GovLinks` | Government resource links |

### Destinations (`/destinations`)
**File:** `src/pages/Destinations.jsx`

- Reads `?search=` and `?month=` from URL query params
- 18 category filter buttons (horizontal scroll with left/right arrows)
- `getSeasonalDestinations()` utility filters by `bestTime` field when `?month=` is set
- When `?month=` is active, no category button is highlighted (activeCategory = `''`)
- Clearing the season (by clicking a category or typing in search) removes `?month` from URL
- Cards link to `/destinations/:category/:id`
- Destinations sort by tier order: premium → featured → free

### Destination Detail (`/destinations/:category/:id`)
**File:** `src/pages/DestinationDetail.jsx`

- Looks up the item by matching both `id` and `category` from URL params
- Shows hero banner with category badge, tier badge (premium/featured), image, description
- Button group: "View Gallery" → `/gallery?item=<id>`, "View on Map" → `/map?item=<id>` (only shown if `coordinates` exists), Share button (Web Share API with clipboard fallback)
- **Quick Info** cards: duration, entry fee, best time, district
- **Main content** area: renders `item.detail` as HTML (dangerouslySetInnerHTML)
- **Sidebar**: category badge, coordinates, distance from Colombo, "Get Directions" Google Maps link
- JSON-LD structured data (TouristAttraction schema)

### Sri Lanka Pride (`/sri-lanka-pride`)
**File:** `src/pages/SriLankaPride.jsx`

- 9 category filter buttons + "Famous People" sub-category filter (National Heroes, Sports Legends, etc.)
- Reads `?category=` from URL params to pre-select a category
- Filters by category + sub-category + search query
- Cards link to `/sri-lanka-pride/:category/:id`

### Pride Detail (`/sri-lanka-pride/:category/:id`)
**File:** `src/pages/PrideDetail.jsx`

- Same layout as DestinationDetail but with category-specific metadata
- Different JSON-LD types depending on category: `TouristAttraction`, `Person` (famous-people), `TouristTrip` (road-trip-routes)
- Extra sections for:
  - **Routes**: shows number of stops and duration
  - **Famous People**: shows birth year and birthplace
  - **Seasonal Foods**: shows season months and season name
- Button group same as DestinationDetail (Gallery, Map, Share)

### Discover More (`/discover-more`)
**File:** `src/pages/DiscoverMore.jsx`

- 13 category filter buttons (Hotels, Surfing, Diving, etc.)
- Filters businesses by `subCategory` field + search
- Cards link to an external website or detail

### Map (`/map`)
**File:** `src/pages/Map.jsx`

- Combines destinations, businesses, and pride items into a single `ALL_DATA` array
- 4 layer toggles: All Destinations, Beaches, Businesses, Cultural
- Reads `?item=<id>` query param to auto-select and fly to a destination on load
- Desktop: left side panel (place list), right side panel (place details), map in center
- Mobile: bottom sheet for list, bottom sheet for details
- Location button (auto-locates on first load, can re-locate on click)
- Active category + search bar for filtering

### Gallery (`/gallery`)
**File:** `src/pages/Gallery.jsx`

- Builds image array from `buildGalleryImages()` which combines:
  - Primary images from each destination and pride item
  - Extra images from `galleryExtraSources` object
- Reads `?item=<id>` to auto-scroll to/set initial item
- 15 gallery category filters (All Photos, Beaches, Nature, etc.)

### Advertise (`/advertise`)
**File:** `src/pages/Advertise.jsx`

- 3-step form: Package selection → Business Details → Review & Submit
- 3 packages: Free ($0), Featured ($20/mo), Premium ($50/mo)
- Submits via WhatsApp (opens `wa.me/<number>?text=...`)
- WhatsApp number from `VITE_WHATSAPP_NUMBER` env var (default: `94771234567`)

---

## Data Files — How to Add New Content

All content is static data in `src/data/`. To add new items, simply append objects to the arrays.

### destinations.js

**File:** `src/data/destinations.js`
**Export name:** `destinations` (array of objects)

**Fields:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | string | **Yes** | Unique slug (e.g. `"beach-mirissa"`). Must be unique across ALL data files (used in map/gallery lookups). Convention: `{category}-{name-lowercase-dashed}`. |
| `name` | string | **Yes** | Display name |
| `location` | string | Yes | City/town name |
| `district` | string | Yes | District name (e.g. `"Matara"`) |
| `category` | string | **Yes** | Must match one of the 18 categories below (e.g. `"beaches"`, `"nature"`, `"historical"`) |
| `tier` | string | Yes | `"premium"`, `"featured"`, or `"free"` (controls sort order + badge display) |
| `description` | string | **Yes** | Short summary (1-2 sentences) |
| `detail` | string | Yes | Full HTML content (use template literal with `<section class="destination-content">` wrapper). Supports `<h2>`, `<p>`, `<ul>/<li>`, `<table>`. |
| `image` | string | **Yes** | Full URL to hero image |
| `bestTime` | string | Yes | Month range for seasonal filtering (e.g. `"November – April"`, `"Year-round"`). Multiple ranges separated by comma. |
| `entryFee` | string | No | e.g. `"Free"`, `"$10"`, `"LKR 5000"` |
| `duration` | string | No | e.g. `"3–5 hours"`, `"Full day"` |
| `coordinates` | object | No | `{ lat: number, lng: number }`. If present, enables "View on Map" button and distance calculation. |
| `googleMapsLink` | string | No | Direct Google Maps URL for "Get Directions" |

**Example:**
```js
{
  id: "beach-mirissa",
  name: "Mirissa Beach",
  location: "Mirissa",
  district: "Matara",
  category: "beaches",
  tier: "premium",
  description: "A picturesque crescent-shaped beach...",
  detail: `<section class="destination-content">
    <h2>Overview</h2>
    <p>Full description here...</p>
  </section>`,
  image: "https://raw.githubusercontent.com/eastorysl/storyimages/main/destination/MirissaBeach.jpg",
  bestTime: "November – April",
  entryFee: "Free",
  duration: "3–5 hours",
  coordinates: { lat: 5.9449, lng: 80.4578 },
  googleMapsLink: "https://maps.app.goo.gl/DibkumdrbekmhgVs6",
}
```

### sriLankaPride.js

**File:** `src/data/sriLankaPride.js`
**Export name:** `prideItems` (array of objects)

**Fields:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | string | **Yes** | Unique slug (e.g. `"ak-anuradhapura"`). Convention: `{category-abbreviation}-{name-lowercase-dashed}`. |
| `name` | string | **Yes** | Display name |
| `category` | string | **Yes** | Must match one of the 9 pride categories (e.g. `"ancient-kingdoms"`, `"famous-people"`) |
| `subCategory` | string | No | Only for `famous-people`: `"national-heroes"`, `"sports-legends"`, `"arts-entertainment"`, `"science-tech"`, `"writers-literature"`, `"global-achievers"` |
| `description` | string | **Yes** | Short summary |
| `detail` | string | Yes | Full HTML content (same format as destinations) |
| `image` | string | **Yes** | Full URL to hero image |
| `period` | string | No | Historical period (e.g. `"377 BCE - 1017 CE"`) — shown for ancient-kingdoms, etc. |
| `location` | string | No | Primary location |
| `origin` | string | No | Alternative location field for some pride items |
| `birthYear` | string | No | Birth year (for famous-people) |
| `birthPlace` | string | No | Birth place (for famous-people) |
| `coordinates` | object | No | `{ lat: number, lng: number }` |
| `googleMapsLink` | string | No | Google Maps URL |
| `stops` | number | No | Number of stops (for road-trip-routes) |
| `duration` | string | No | Trip duration (for road-trip-routes) |
| `seasonMonths` | string | No | Month range (for seasonal-foods, e.g. `"April – July"`) |
| `seasonName` | string | No | Season name (for seasonal-foods, e.g. `"Mango Season"`) |
| `type` | string | No | `"fruit"` or `"dish"` (for seasonal-foods sorting) |

### businesses.js

**File:** `src/data/businesses.js`
**Export name:** `businesses` (array of objects)

**Fields:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | string | **Yes** | Unique slug (e.g. `"hotel-dyke-rest"`) |
| `name` | string | **Yes** | Business name |
| `type` | string | Yes | Business type (e.g. `"guesthouse"`, `"hotel"`, `"restaurant"`) |
| `subCategory` | string | **Yes** | One of the Discover More filter categories (e.g. `"Guest Houses"`, `"Hotels"`, `"Surfing"`) |
| `category` | string | Yes | Top-level: `"Accommodation"`, `"Food & Dining"`, `"Activities & Tours"`, `"Shopping"`, `"Services"` |
| `location` | string | Yes | Full address |
| `district` | string | Yes | District name |
| `tier` | string | Yes | `"standard"`, `"featured"`, or `"premium"` |
| `rating` | number | No | Star rating (0-5) |
| `description` | string | **Yes** | Short summary |
| `image` | string | **Yes** | Full URL to image |
| `coordinates` | object | No | `{ lat: number, lng: number }` |
| `phone` | string | No | Contact phone |
| `website` | string | No | Website URL |
| `googleMapsLink` | string | No | Google Maps URL |
| `social` | object | No | `{ facebook: "url", instagram: "url", twitter: "url" }` |

### gallery.js

**File:** `src/data/gallery.js`

Two parts:

**1. Category definitions** — modify `galleryCategories` and `galleryCatIcons` arrays/objects to add new gallery filter categories.

**2. Extra images** — the `galleryExtraSources` object. Add more images to existing items or add new items:

```js
'your-item-id': {
  name: 'Display Name',
  category: 'beaches',        // must match a gallery category id
  location: 'City',
  page: 'destinations',       // 'destinations' or 'sri-lanka-pride'
  images: [
    'https://example.com/image1.jpg',
    'https://example.com/image2.jpg',
  ],
},
```

The `buildGalleryImages()` function automatically:
- Pulls primary images from all destinations (mapped via `destMap`)
- Pulls primary images from all pride items (mapped via `prideMap`)
- Merges extra images from `galleryExtraSources`

---

## Categories Reference

### Destinations (18 categories)

| `category` value (data) | Display label | Icon |
|------------------------|---------------|------|
| `beaches` | Beaches | GiBeachBall |
| `nature` | Nature | GiTreeBranch |
| `waterfalls` | Waterfalls | GiWaterfall |
| `mountains` | Mountains | GiMountainCave |
| `wildlife` | Wildlife | GiElephantHead |
| `parks` | Parks | GiForest |
| `historical` | Historical | FaLandmark |
| `religious` | Religious | FaChurch |
| `forts` | Forts | GiCastle |
| `lakes & rivers` | Lakes & Rivers | FiMap |
| `islands` | Islands | GiIsland |
| `botanical gardens` | Botanical Gardens | GiFlowerPot |
| `cultural` | Culture | FaMusic |
| `scenic train journeys` | Scenic Train Journeys | FaTrain |
| `viewpoints` | Viewpoints | GiBinoculars |
| `marine attractions` | Marine Attractions | GiDolphin |
| `adventure activities` | Adventure Activities | GiParachute |
| `festivals & events` | Festivals & Events | GiPartyPopper |

### Sri Lanka Pride (9 categories)

| `category` value (data) | Display label | Icon |
|------------------------|---------------|------|
| `ancient-kingdoms` | Ancient Kingdoms | GiCrown |
| `caves-geological-wonders` | Caves & Geology | GiCaveEntrance |
| `museums-galleries` | Museums & Galleries | FaLandmark |
| `cities-urban` | Cities & Urban | FaCity |
| `food-culinary` | Food & Culinary | FaUtensils |
| `seasonal-foods` | Seasonal Foods | GiFruitTree |
| `tea-spice-trails` | Tea & Spice Trails | GiTeapotLeaves |
| `road-trip-routes` | Road Trip Routes | FaRoute |
| `famous-people` | Famous People | FaUsers |

### Famous People Sub-Categories

| `subCategory` value | Display label |
|--------------------|---------------|
| `national-heroes` | National Heroes |
| `sports-legends` | Sports Legends |
| `arts-entertainment` | Arts & Entertainment |
| `science-tech` | Science & Technology |
| `writers-literature` | Writers & Literature |
| `global-achievers` | Global Achievers |

### Discover More (13 categories)

| `subCategory` value (data) | Display label | Icon |
|---------------------------|---------------|------|
| `Guest Houses` | (Hotels button) | FiHome |
| `Resorts` | Resorts | GiVillage |
| `Souvenir Shops` | Souvenir Shops | GiShop |
| `Surfing` | Surfing | GiSurfBoard |
| `Diving` | Diving | GiDivingHelmet |
| `Snorkeling` | Snorkeling | GiSnorkel |
| `Whale Watching` | Whale Watching | GiWhaleTail |
| `Hiking` | Hiking | GiHiking |
| `Cycling` | Cycling | FaBicycle |
| `Fishing` | Fishing | GiFishing |
| `Boat Tours` | Boat Tours | GiSailboat |
| `Safari` | Safari | GiCompass |
| `Photography Spots` | Photography Spots | GiPhotoCamera |

### Gallery (15 categories)

| `category` id | Label |
|--------------|-------|
| `all` | All Photos |
| `beaches` | Beaches |
| `nature` | Nature & Wildlife |
| `waterfalls` | Waterfalls |
| `historical` | Historical Sites |
| `religious` | Religious Places |
| `forts` | Forts |
| `cultural` | Cultural & Museums |
| `ancient-kingdoms` | Ancient Kingdoms |
| `food-culinary` | Food & Culinary |
| `cities-urban` | Cities & Urban |
| `famous-people` | Famous People |
| `accommodation` | Accommodation |
| `adventure` | Adventure & Activities |
| `shopping` | Shopping |

---

## Features

### Map
- Full-screen Leaflet map with clustered markers
- 4 layer toggles: All Destinations, Beaches, Businesses, Cultural
- Side panel (desktop) with place details; bottom sheet (mobile) with draggable place list
- Fly-to animation on place selection
- Geolocation support (auto-locate on first visit)
- `?item=` query param for deep-linking to a specific place

### PWA
- Install prompt via `beforeinstallprompt` event
- iOS detection with custom install instructions
- Download icon button in mobile navbar
- Persistent dismiss with `localStorage` flag
- Hidden when already installed (standalone mode)

### SEO & Structured Data
- Per-page meta tags via `react-helmet-async` (`src/components/seo/SEO.jsx`)
- JSON-LD structured data on detail pages (`TouristAttraction`, `Person`, `TouristTrip`)
- Auto-generated sitemap before each build
- `robots.txt` with polite crawl rules

#### OG Tags Per Page

The `<SEO>` component wraps `react-helmet-async` and sets: `og:type`, `og:title`, `og:description`, `og:url`, `og:image` (1200×630), `og:image:alt`, `og:image:type`, `og:site_name`, `og:locale`, plus `twitter:card` (summary_large_image), `twitter:title`, `twitter:description`, and `twitter:image`.

| Page | `title` | `description` | `ogImage` | `ogUrl` |
|------|---------|---------------|-----------|---------|
| **Home** `/` | `"Home"` | static text | `/images/home/hero.png` | auto (current URL) |
| **Destinations** `/destinations` | `"Destinations"` | static text | `/images/home/Destinations.png` | auto |
| **DestinationDetail** `/destinations/:cat/:id` | `{item.name}` (dynamic) | dynamic (description + location) | `{item.image}` (from data) | explicit full URL + `jsonLd` |
| **SriLankaPride** `/sri-lanka-pride` | `"Sri Lanka Pride"` | static text | `/images/home/Sri_Lanka_Pride.png` | auto |
| **PrideDetail** `/sri-lanka-pride/:cat/:id` | `{item.name}` (dynamic) | dynamic (description + period + location) | `{item.image}` (from data) | explicit full URL + `jsonLd` |
| **DiscoverMore** `/discover-more` | `"Discover More"` | static text | `/images/discover/hero.png` | auto |
| **Map** `/map` | `"Map"` | static text | `/images/home/hero.png` | auto |
| **Gallery** `/gallery` | `"Gallery"` | static text | `/images/home/Gallery.png` | auto |
| **Advertise** `/advertise` | `"Advertise With Us"` | static text | `/images/discover/hero.png` | auto |
| **NotFound** `*` | `"Page Not Found"` | static text | fallback (`/images/home/hero.png`) | auto |

- Detail pages also pass `jsonLd` for structured data.
- All listing pages pass `keywords`.
- `ogUrl` defaults to `window.location.href` when not explicitly passed.
- OG image falls back to `/images/home/hero.png` when no `ogImage` prop is provided.

### Seasonal Filtering
- `src/utils/season.js`: `isInSeason(bestTime, month)` checks if a destination's `bestTime` field includes a given month
- Used by `getSeasonalDestinations()` in `Destinations.jsx` and `Featured.jsx`
- Month is passed via `?month=` query param (3-letter abbreviation: Jan, Feb, Mar, etc.)

### Design System
- **Fonts:** Sansita (headings), Tinos (body)
- **Colors:** ocean (cyan), teal, sunset (amber), palm (green), coral (orange)
- **Glassmorphism** navbars and overlays
- **Gradient overlays** on hero sections
- **Scroll-reveal** via Intersection Observer (`AnimatedSection`)

---

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev          # → http://localhost:5173

# Build for production
npm run build        # generates sitemap + vite build

# Preview production build
npm run preview

# Generate sitemap only
npm run sitemap

# Lint
npm run lint
```

---

## Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start Vite dev server with HMR |
| `npm run build` | Generate sitemap + production build |
| `npm run preview` | Preview production build locally |
| `npm run sitemap` | Regenerate `public/sitemap.xml` from data |
| `npm run lint` | Run Oxlint |

---

## Environment Variables

Copy `.env.example` to `.env`:

```
VITE_SITE_URL=https://your-custom-domain.com
VITE_WHATSAPP_NUMBER=94771234567
```

If `VITE_SITE_URL` is unset, the app falls back to `https://eastorysl.netlify.app`.

---

## Tips for New Developers

### How to Add a New Destination

1. Open `src/data/destinations.js`
2. Append a new object to the `destinations` array
3. Required fields: `id`, `name`, `location`, `district`, `category`, `tier`, `description`, `image`, `bestTime`
4. Optional but recommended: `detail` (full HTML content), `coordinates`, `googleMapsLink`, `entryFee`, `duration`
5. If the destination has extra gallery images, add them to `galleryExtraSources` in `src/data/gallery.js`
6. Run `npm run build` to regenerate the sitemap

### How to Add a New Pride Item

1. Open `src/data/sriLankaPride.js`
2. Append a new object to the `prideItems` array
3. Required fields: `id`, `name`, `category`, `description`, `image`
4. If adding a famous person, include `subCategory`, `birthYear`, `birthPlace`
5. Run `npm run build`

### How to Add a New Business

1. Open `src/data/businesses.js`
2. Append a new object to the `businesses` array
3. Required fields: `id`, `name`, `subCategory`, `category`, `location`, `district`, `tier`, `description`, `image`
4. The `subCategory` must match one of the 13 Discover More categories to appear in filters

### How to Add a New Category

- **Destinations:** Add the `category` value to `catMeta` in `DestinationDetail.jsx`, add it to `categories` array and `catIcons` object in `Destinations.jsx`, add mapping in `categoryMap`, add mapping in gallery's `destMap` in `gallery.js`
- **Pride:** Add to `prideCategoryMap` in `SriLankaPride.jsx`, add to `catMeta` in `PrideDetail.jsx`, add to `catIcons`, add to gallery's `prideMap` in `gallery.js`
- **Discover More:** Add to `categories` and `catIcons` in `DiscoverMore.jsx`, set business `subCategory` to match

### Sitemap
- Generated by `scripts/generate-sitemap.js` 
- Reads all data files and builds URLs for every destination and pride item
- Run `npm run sitemap` or it runs automatically during `npm run build`

### Convention for `id` Values
- Destinations: `{category}-{name}` e.g. `beach-mirissa`, `fort-galle`
- Pride: `{category-abbr}-{name}` e.g. `ak-anuradhapura`, `fp-arinthika`
- Businesses: `{type}-{name}` e.g. `hotel-dyke-rest`, `restaurant-nihonbashi`
- **Important:** IDs must be globally unique across all data files (used for gallery linking, map deep-linking, and sitemap generation)

---

## License

MIT © Eastory SL
