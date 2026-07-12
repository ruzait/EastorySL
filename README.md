# Eastory SL — Sri Lanka Discovery Platform

> Tourism, culture, and local business discovery platform for Sri Lanka — built with React, featuring an interactive map, PWA support, and rich content pages.

![Version](https://img.shields.io/badge/version-1.2.0-0f766e?style=flat-square)
![React](https://img.shields.io/badge/React_19-61DAFB?style=flat-square&logo=react)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS_3-06B6D4?style=flat-square&logo=tailwind-css)
![Vite](https://img.shields.io/badge/Vite_8-646CFF?style=flat-square&logo=vite)
![License](https://img.shields.io/badge/license-MIT-0f766e?style=flat-square)

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
| **Analytics** | Google Analytics 4 (G-9N173V8EG4) |
| **Linting** | Oxlint |

---

## Data Overview

| Section | File | Entries | Focus |
|---------|------|---------|-------|
| **Destinations** | `destinations.js` | 123 | Travel experiences — beaches, nature, adventure, culture |
| **Sri Lanka Pride** | `sriLankaPride.js` | 86 | Heritage & identity — kingdoms, food, people, tea trails |
| **Businesses** | `businesses.js` | 86 | Local services — hotels, shops, water sports, tours |

> Destinations and Sri Lanka Pride have **zero overlapping entries**. Each section covers unique content.

---

## Project Structure

```
eastory-sri-lanka-hub/
├── public/
│   ├── images/               # Static image assets
│   ├── robots.txt            # Crawler rules + sitemap link
│   ├── sitemap.xml           # Auto-generated (221+ URLs)
│   ├── ai.txt                # AI crawler instructions
│   ├── llms.txt              # LLM-friendly site summary
│   └── favicon.svg
│
├── scripts/
│   ├── generate-sitemap.js   # Build-time sitemap generator
│   ├── generate-og-pages.js  # Pre-renders OG tags for detail pages
│   ├── upgrade-destinations.js   # Adds detail, googleMapsLink to destinations
│   ├── enrich-destinations.js    # Rich content for beach destinations
│   ├── enrich-remaining.js       # Category-based + fallback content
│   ├── enrich-pride.js           # Adds detail, googleMapsLink to pride items
│   ├── enrich-businesses.js      # Adds detail to businesses, removes rating
│   └── remove-pride-dups.js      # Removes entries that overlap with destinations
│
├── src/
│   ├── components/
│   │   ├── layout/           # Navbar, Footer, Layout, InstallPWA
│   │   ├── home/             # Hero, Featured, TripFinder, CTA, AboutSriLanka, GovTourismLinks
│   │   ├── tourism/          # DestinationCard, DestinationGrid
│   │   ├── discover/         # BusinessCard, BusinessGrid
│   │   ├── pride/            # PrideCard
│   │   ├── map/              # MapView, MapSidePanel, MapPlaceList, MapLayers
│   │   ├── gallery/          # GalleryGrid
│   │   ├── seo/              # SEO.jsx (react-helmet-async wrapper)
│   │   └── ui/               # AnimatedSection, SectionTitle, Badge, SearchBar, Logo (inline SVG, dynamic color prop)
│   │
│   ├── pages/                # Route-level page components
│   ├── data/                 # Static content modules (the "database")
│   ├── hooks/                # useInView, usePWAInstall
│   ├── utils/                # distance.js, fallback.js, season.js, mapHelpers.js, analytics.js
│   └── App.jsx               # Root with BrowserRouter + Routes
│
├── netlify.toml              # Headers, redirects, prerender config
├── index.html                # Meta tags, GA4, Schema.org structured data
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
| `/` | `Home` | Landing page with hero, featured destinations, trip finder, CTA, about cards |
| `/destinations` | `Destinations` | Filterable/searchable grid of tourist spots |
| `/destinations/:category/:id` | `DestinationDetail` | Full detail page (SEO + JSON-LD) |
| `/sri-lanka-pride` | `SriLankaPride` | Filterable grid of heritage/culture items |
| `/sri-lanka-pride/:category/:id` | `PrideDetail` | Detail page (SEO + JSON-LD) |
| `/discover-more` | `DiscoverMore` | Filterable grid of local businesses |
| `/map` | `Map` | Full-screen Leaflet map with layers |
| `/gallery` | `Gallery` | Masonry image grid with lightbox |
| `/advertise` | `Advertise` | Multi-step form for business listings |
| `/privacy-policy` | (inline) | Static placeholder |
| `/terms-of-service` | (inline) | Static placeholder |
| `*` | `NotFound` | 404 page |

---

## Page-by-Page Logic

### Home (`/`)
**File:** `src/pages/Home.jsx`

| Component | Purpose |
|-----------|---------|
| `Hero` | Full-screen hero with title, subtitle, CTA buttons |
| `Featured` | Shows 6 destinations in-season for current month |
| `TripFinder` | Interactive 5-question quiz with 6 geographically-clustered destination cards |
| `CTA` | Call-to-action card linking to `/sri-lanka-pride` |
| `AboutSriLanka` | 3 glassmorphism cards (Natural Paradise, Wildlife, Culture) |
| `GovTourismLinks` | Government resource links |

### Destinations (`/destinations`)
**File:** `src/pages/Destinations.jsx`

- Hero banner with background image + "Home" button
- Reads `?search=` and `?month=` from URL query params
- 18 category filter buttons (horizontal scroll with left/right arrows)
- `getSeasonalDestinations()` filters by `bestTime` field when `?month=` is set
- Cards link to `/destinations/:category/:id`
- Sort order: premium → featured → free

### Destination Detail (`/destinations/:category/:id`)
**File:** `src/pages/DestinationDetail.jsx`

- Hero banner with "Home" + "Back to Destinations" buttons, category/tier badges, image, description
- Buttons: "View Gallery" → `/gallery?item=<id>`, "View on Map" → `/map?item=<id>`, Share (Web Share API)
- Quick Info cards: duration, entry fee, best time, district
- Main content renders `item.detail` as HTML
- Sidebar: category badge, coordinates, distance from Colombo, Google Maps link
- Similar Places: 5 random same-category items in sidebar (horizontal scroll on mobile)
- JSON-LD: `TouristAttraction` schema

### Sri Lanka Pride (`/sri-lanka-pride`)
**File:** `src/pages/SriLankaPride.jsx`

- Hero banner with background image + "Home" button
- 9 category filter buttons + "Famous People" sub-category filter
- Reads `?category=` from URL params to pre-select
- Cards link to `/sri-lanka-pride/:category/:id`

### Pride Detail (`/sri-lanka-pride/:category/:id`)
**File:** `src/pages/PrideDetail.jsx`

- Hero banner with "Home" + "Back to Sri Lanka Pride" buttons, category-specific metadata
- Main content renders `item.detail` as HTML
- JSON-LD types: `TouristAttraction`, `Person` (famous-people), `TouristTrip` (road-trip-routes)
- Extra sections: Routes (stops/duration), Famous People (birth year/place)
- Similar Places: 5 random same-category items in sidebar (horizontal scroll on mobile)

### Discover More (`/discover-more`)
**File:** `src/pages/DiscoverMore.jsx`

- Hero banner with background image + "Home" button
- 13 category filter buttons (Hotels, Surfing, Diving, etc.)
- Filters businesses by `subCategory` + search

### Map (`/map`)
**File:** `src/pages/Map.jsx`

- Combines destinations, businesses, and pride items into `ALL_DATA`
- 4 layer toggles: Destinations, Beaches, Discover more, Cultural
- Deep-linking via `?item=<id>` query param
- Desktop: left side panel + right detail panel + map center
- Mobile: bottom sheets for list and details
- Geolocation support (auto-locate on first visit)
- Business cards include "Show on Map" button
- No hero section (full-screen map layout)

### Gallery (`/gallery`)
**File:** `src/pages/Gallery.jsx`

- Hero banner with background image + "Home" button
- Images built from `buildGalleryImages()` (destinations + pride + extra gallery sources)
- Deep-linking via `?item=<id>`
- 15 gallery category filters
- Responsive grid: 5 columns (xl), 4 (lg), 3 (md), 2 (sm/mobile)
- Lightbox with keyboard navigation
- "View Page" link in lightbox to navigate to item detail page

### Advertise (`/advertise`)
**File:** `src/pages/Advertise.jsx`

- Hero banner with background image + "Home" button
- 3-step form: Package selection → Business Details → Review & Submit
- 3 packages: Free ($0), Featured ($20/mo), Premium ($50/mo)
- Submits via WhatsApp (`wa.me/<number>?text=...`)
- WhatsApp number from `VITE_WHATSAPP_NUMBER` env var (default: `94724362001`)
- Auto-scrolls to top on every step change and submission

---

## Data Files — How to Add New Content

All content is static data in `src/data/`. To add new items, append objects to the arrays.

### destinations.js

**Export:** `destinations` (array — 123 entries)

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | string | **Yes** | Unique slug. Convention: `{category}-{name-lowercase-dashed}` |
| `name` | string | **Yes** | Display name |
| `location` | string | Yes | City/town name |
| `district` | string | Yes | District name |
| `category` | string | **Yes** | One of 18 categories (e.g. `"beaches"`, `"nature"`) |
| `tier` | string | Yes | `"premium"`, `"featured"`, or `"free"` |
| `description` | string | **Yes** | Short summary (1-2 sentences) |
| `detail` | string | **Yes** | Full HTML content (rendered via `dangerouslySetInnerHTML`) |
| `image` | string | **Yes** | Full URL to hero image |
| `bestTime` | string | Yes | Month range (e.g. `"November – April"`, `"Year-round"`) |
| `entryFee` | string | No | e.g. `"Free"`, `"$10"`, `"LKR 5000"` |
| `duration` | string | No | e.g. `"3–5 hours"`, `"Full day"` |
| `coordinates` | object | No | `{ lat, lng }` — enables map button + distance calc |
| `googleMapsLink` | string | No | Direct Google Maps URL |

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
    <h2>Overview</h2><p>Full description here...</p>
    <h2>Things to Do</h2><ul><li>Activity 1</li></ul>
  </section>`,
  image: "https://raw.githubusercontent.com/eastorysl/storyimages/main/destination/MirissaBeach.jpg",
  bestTime: "November – April",
  entryFee: "Free",
  duration: "3–5 hours",
  coordinates: { lat: 5.9449, lng: 80.4578 },
  googleMapsLink: "https://www.google.com/maps/search/?api=1&query=5.9449,80.4578",
}
```

### sriLankaPride.js

**Export:** `prideItems` (array — 86 entries)

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | string | **Yes** | Unique slug. Convention: `{category-abbr}-{name}` |
| `name` | string | **Yes** | Display name |
| `category` | string | **Yes** | One of 8 pride categories |
| `subCategory` | string | No | For `famous-people` only |
| `description` | string | **Yes** | Short summary |
| `detail` | string | **Yes** | Full HTML content |
| `image` | string | **Yes** | Full URL to hero image |
| `period` | string | No | Historical period (e.g. `"377 BCE - 1017 CE"`) |
| `location` | string | No | Primary location |
| `district` | string | No | District name |
| `birthYear` | string | No | For famous-people |
| `birthPlace` | string | No | For famous-people |
| `coordinates` | object | No | `{ lat, lng }` |
| `googleMapsLink` | string | No | Google Maps URL |
| `stops` | string | No | For road-trip-routes |
| `duration` | string | No | For road-trip-routes |

> **No duplicate entries with destinations.** If a place exists in `destinations.js`, it should not appear here.

### businesses.js

**Export:** `businesses` (array — 86 entries)

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | string | **Yes** | Unique slug |
| `name` | string | **Yes** | Business name |
| `type` | string | Yes | e.g. `"guesthouse"`, `"hotel"`, `"shop"`, `"service"` |
| `subCategory` | string | **Yes** | One of 13 Discover More categories |
| `category` | string | Yes | Top-level: `"Accommodation"`, `"Shopping"`, `"Water Sports"`, `"Tours"` |
| `location` | string | Yes | Full address |
| `district` | string | Yes | District name |
| `tier` | string | Yes | `"standard"`, `"featured"`, or `"premium"` |
| `description` | string | **Yes** | Short summary |
| `detail` | string | **Yes** | Full HTML content |
| `image` | string | **Yes** | Full URL to image |
| `coordinates` | object | No | `{ lat, lng }` |
| `phone` | string | No | Contact phone |
| `website` | string | No | Website URL |
| `googleMapsLink` | string | No | Google Maps URL |
| `social` | object | No | `{ facebook, instagram, youtube }` |

### gallery.js

Two parts:

1. **Category definitions** — `galleryCategories` and `galleryCatIcons`
2. **Extra images** — `galleryExtraSources` object:

```js
'your-item-id': {
  name: 'Display Name',
  category: 'beaches',
  location: 'City',
  page: 'destinations',
  images: ['https://example.com/image1.jpg'],
}
```

`buildGalleryImages()` automatically merges primary images from all destinations + pride items with extra images.

---

## Categories Reference

### Destinations (18)

| `category` | Label | Icon |
|-----------|-------|------|
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

### Sri Lanka Pride (9)

| `category` | Label | Icon | Entries |
|-----------|-------|------|---------|
| `ancient-kingdoms` | Ancient Kingdoms | GiCrown | 10 |
| `caves-geological-wonders` | Caves & Geology | GiCaveEntrance | 8 |
| `museums-galleries` | Museums & Galleries | FaLandmark | 8 |
| `cities-urban` | Cities & Urban | FaCity | 9 |
| `food-culinary` | Food & Culinary | FaUtensils | 15 |
| `seasonal-foods` | Seasonal Foods | GiFruitTree | — |
| `tea-spice-trails` | Tea & Spice Trails | GiTeapotLeaves | 10 |
| `road-trip-routes` | Road Trip Routes | FaRoute | 10 |
| `famous-people` | Famous People | FaUsers | 16 |

### Famous People Sub-Categories

| `subCategory` | Label |
|---------------|-------|
| `national-heroes` | National Heroes |
| `sports-legends` | Sports Legends |
| `arts-entertainment` | Arts & Entertainment |
| `science-tech` | Science & Technology |
| `writers-literature` | Writers & Literature |
| `global-achievers` | Global Achievers |

### Discover More (13)

| `subCategory` | Label | Icon |
|--------------|-------|------|
| `Guest Houses` | Guest Houses | FiHome |
| `Hotels` | Hotels | FiHome |
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

### Gallery (15)

| `category` | Label |
|-----------|-------|
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

### TripFinder (Home page)
- 5-question interactive quiz (interests, travel style, companions, season, budget)
- Recommends 6 geographically-clustered destinations using Haversine distance
- `haversineDistance()` + `clusterByProximity()` functions for proximity-based selection
- All cards link to `/destinations/:category/:id` detail pages

### Map
- Full-screen Leaflet map with clustered markers
- 4 layer toggles: Destinations, Beaches, Discover more (businesses), Cultural (pride)
- Side panel (desktop) / bottom sheet (mobile)
- Fly-to animation on place selection
- Geolocation support (auto-locate on first visit)
- `?item=` query param for deep-linking
- Business cards with "Show on Map" button

### PWA
- Install prompt via `beforeinstallprompt` event
- iOS detection with custom install instructions
- Download icon button in mobile navbar
- Persistent dismiss with `localStorage` flag
- Hidden when already installed (standalone mode)

### SEO & Structured Data

#### Per-page meta tags (`src/components/seo/SEO.jsx`)
Each page sets: title, description, canonical, keywords, OG tags (title, description, url, image 1200x630, site_name, locale), Twitter cards (summary_large_image), and optional JSON-LD.

| Page | Title | ogImage | JSON-LD |
|------|-------|---------|---------|
| Home `/` | `"Explore Sri Lanka — Travel Guide"` | `/images/home/hero.png` | — |
| Destinations `/destinations` | `"Destinations"` | `/images/home/Destinations.png` | — |
| Destination Detail | `{item.name}` | `{item.image}` | `TouristAttraction` |
| Sri Lanka Pride | `"Sri Lanka Pride"` | `/images/home/Sri_Lanka_Pride.png` | — |
| Pride Detail | `{item.name}` | `{item.image}` | `TouristAttraction` / `Person` / `TouristTrip` |
| Discover More | `"Discover More"` | `/images/discover/hero.png` | — |
| Map | `"Map"` | `/images/home/hero.png` | — |
| Gallery | `"Gallery"` | `/images/home/Gallery.png` | — |
| Advertise | `"Advertise With Us"` | `/images/discover/hero.png` | — |
| 404 | `"Page Not Found"` | fallback | — |

#### Global structured data (`index.html`)
- `WebSite` — name, logo (`Asset 1.svg`), search action
- `Organization` — name, email (`eastory.sl@gmail.com`), phone (`+94724362001`), logo (`Asset 1.svg`), social links (Facebook, Instagram)

#### Pre-rendered OG pages (`scripts/generate-og-pages.js`)
Build script generates static HTML files for every destination and pride item so social media crawlers (WhatsApp, Facebook, Twitter) get proper OG tags even without executing JavaScript.

#### Other SEO files
- `robots.txt` — allows all crawlers including AI bots (GPTBot, Claude-Web, PerplexityBot, etc.)
- `sitemap.xml` — auto-generated (221+ URLs) via `scripts/generate-sitemap.js`
- `ai.txt` — explicit AI crawler permissions
- `llms.txt` — LLM-friendly site summary for AI assistants
- Google Search Console verified (`RHxeTdLuy3r5Re6516zQk4Qq2T1W06Cn1dhpEDCgKJk`)

### Seasonal Filtering
- `src/utils/season.js`: `isInSeason(bestTime, month)`
- Month passed via `?month=` query param (3-letter abbreviation)

### Design System
- **Fonts:** Sansita (headings), Tinos (body)
- **Colors:** ocean (cyan), teal, sunset (amber), palm (green), coral (orange)
- **Glassmorphism** navbars and overlays
- **Gradient overlays** on hero sections
- **Scroll-reveal** via Intersection Observer (`AnimatedSection`)
- **Responsive tables** — horizontal scroll on mobile, full layout on desktop

### Navigation
- **Home button** — Glass-morphism styled button on all page hero sections (except Map and 404)
- **Scroll-to-top** — Automatic scroll to top on every route change (`ScrollToTop.jsx`)
- **Back buttons** — Detail pages include "Back to [Parent]" navigation
- **Footer links** — Quick navigation to all main sections

---

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev          # → http://localhost:5173

# Build for production
npm run build        # generates sitemap + vite build + OG pages

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
| `npm run build` | Generate sitemap + production build + pre-render OG pages |
| `npm run preview` | Preview production build locally |
| `npm run sitemap` | Regenerate `public/sitemap.xml` from data |
| `npm run lint` | Run Oxlint |

### Data Enrichment Scripts

| Script | Description |
|--------|-------------|
| `node scripts/upgrade-destinations.js` | Adds `detail`, `googleMapsLink`, expands `bestTime` abbreviations |
| `node scripts/enrich-destinations.js` | Adds rich HTML content for 16 beach destinations |
| `node scripts/enrich-remaining.js` | Adds content for remaining destinations (custom + category-based + fallback) |
| `node scripts/enrich-pride.js` | Adds `detail` HTML and `googleMapsLink` to all pride items |
| `node scripts/enrich-businesses.js` | Adds `detail` HTML to businesses, removes `rating` field |
| `node scripts/remove-pride-dups.js` | Removes pride entries that duplicate destinations |

---

## Environment Variables

Copy `.env.example` to `.env`:

```
VITE_SITE_URL=https://eastorysl.netlify.app
VITE_WHATSAPP_NUMBER=94724362001
```

If `VITE_SITE_URL` is unset, the app falls back to `https://eastorysl.netlify.app`.

---

## Deployment (Netlify)

The `netlify.toml` handles:

- **Security headers** — X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Strict-Transport-Security, X-XSS-Protection, Permissions-Policy
- **Static file redirects** — sitemap.xml, robots.txt, ai.txt, llms.txt served as-is
- **Prerendering** — Only detail pages (`/destinations/*`, `/sri-lanka-pride/*`) for social media crawlers
- **SPA catch-all** — `/* → /index.html` (must be last)
- **Asset caching** — `/assets/*` gets 1-year immutable cache

---

## Tips for New Developers

### Adding a New Destination
1. Open `src/data/destinations.js`
2. Append a new object to the `destinations` array
3. Required: `id`, `name`, `location`, `district`, `category`, `tier`, `description`, `detail`, `image`, `bestTime`
4. Recommended: `coordinates`, `googleMapsLink`, `entryFee`, `duration`
5. If extra gallery images, add to `galleryExtraSources` in `src/data/gallery.js`
6. Run `npm run build` to regenerate sitemap

### Adding a New Pride Item
1. Open `src/data/sriLankaPride.js`
2. Append a new object to the `prideItems` array
3. Required: `id`, `name`, `category`, `description`, `detail`, `image`
4. For famous people: include `subCategory`, `birthYear`, `birthPlace`
5. **Do not duplicate** an entry that already exists in `destinations.js`
6. Run `npm run build`

### Adding a New Business
1. Open `src/data/businesses.js`
2. Append a new object to the `businesses` array
3. Required: `id`, `name`, `subCategory`, `category`, `location`, `district`, `tier`, `description`, `detail`, `image`
4. `subCategory` must match one of the 13 Discover More categories

### Adding a New Category
- **Destinations:** Update `catMeta` in `DestinationDetail.jsx`, `categories`/`catIcons`/`categoryMap` in `Destinations.jsx`, `destMap` in `gallery.js`
- **Pride:** Update `prideCategoryMap` in `SriLankaPride.jsx`, `catMeta` in `PrideDetail.jsx`, `catIcons`, `prideMap` in `gallery.js`
- **Discover More:** Update `categories`/`catIcons` in `DiscoverMore.jsx`, set business `subCategory` to match

### ID Conventions
- Destinations: `{category}-{name}` — e.g. `beach-mirissa`, `fort-galle`
- Pride: `{category-abbr}-{name}` — e.g. `ak-anuradhapura`, `fp-sangakkara`
- Businesses: `{type}-{name}` — e.g. `hotel-dyke-rest`, `restaurant-nihonbashi`
- **IDs must be globally unique** across all data files

---

## Contact

- **Email:** eastory.sl@gmail.com
- **Phone:** +94724362001
- **WhatsApp:** +94724362001
- **Facebook:** https://www.facebook.com/profile.php?id=61591629429221
- **Instagram:** https://www.instagram.com/eastory.sl
- **Website:** https://eastorysl.netlify.app

---

## License

MIT © Eastory SL
