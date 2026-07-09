# Eastory SL — Sri Lanka Discovery Platform

> A tourism, culture, and local business discovery platform for Sri Lanka — built with React, featuring an interactive map, PWA support, and rich content pages.

![Version](https://img.shields.io/badge/version-1.0.0-0f766e?style=flat-square)
![React](https://img.shields.io/badge/React_19-61DAFB?style=flat-square&logo=react)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS_3-06B6D4?style=flat-square&logo=tailwind-css)
![Vite](https://img.shields.io/badge/Vite_8-646CFF?style=flat-square&logo=vite)
![License](https://img.shields.io/badge/license-MIT-0f766e?style=flat-square)

---

## Table of Contents

- [Pages](#pages)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Features](#features)
- [Data](#data)
- [Getting Started](#getting-started)
- [Scripts](#scripts)
- [Environment](#environment)
- [License](#license)

---

## Pages

| Route | Page | Description |
|-------|------|-------------|
| `/` | Home | Hero, seasonal picks, trip finder, stats, CTA |
| `/destinations` | Destinations | Filterable grid of tourist spots with detail pages |
| `/destinations/:category/:id` | DestinationDetail | Full destination page with SEO + JSON-LD |
| `/discover-more` | Discover More | Browse businesses and attractions |
| `/sri-lanka-pride` | Sri Lanka Pride | Cultural heritage, ancient kingdoms, wildlife, personalities |
| `/sri-lanka-pride/:category/:id` | PrideDetail | Detail page with SEO + JSON-LD |
| `/map` | Interactive Map | Full-screen Leaflet map with layer toggles, side panel, mobile list |
| `/gallery` | Gallery | Masonry image grid with lightbox |
| `/advertise` | Advertise | Tiered listing form (Free / Featured / Premium) |

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
| **Icons** | React Icons |
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
│   │   ├── home/             # Hero, Featured, TripFinder, Stats, CTA, About, GovLinks
│   │   ├── tourism/          # DestinationCard, DestinationGrid
│   │   ├── discover/         # BusinessCard, BusinessGrid
│   │   ├── pride/            # PrideCard
│   │   ├── map/              # MapView, MapSidePanel, MapPlaceList, MapLayers
│   │   ├── gallery/          # GalleryGrid
│   │   ├── seo/              # SEO.jsx (Helmet wrapper)
│   │   └── ui/               # AnimatedSection, SectionTitle, Badge, SearchBar, Logo
│   │
│   ├── pages/                # Route-level page components
│   ├── data/                 # Static content modules
│   ├── hooks/                # useInView, usePWAInstall
│   └── App.jsx               # Root with BrowserRouter + Routes
│
├── index.html
├── tailwind.config.js
├── vite.config.js
├── .env.example
└── package.json
```

---

## Features

### Map
- Full-screen Leaflet map with clustered markers
- Layer toggle: all destinations, beaches, culture & nature, businesses
- Side panel (desktop) with place details
- Bottom sheet (mobile) with draggable place list
- Fly-to animation on place selection (no auto-zoom-out)

### PWA
- Install prompt triggered via `beforeinstallprompt` event
- iOS detection with custom install instructions
- Download icon button in mobile navbar
- Persistent dismiss with `localStorage` flag
- Hidden when already installed (standalone mode)

### SEO & Structured Data
- Per-page meta tags via `react-helmet-async`
- JSON-LD structured data on detail pages (`TouristAttraction`, `Person`, `TouristTrip`)
- Auto-generated sitemap (221 URLs) before each build
- `robots.txt` with polite crawl rules and AI crawler allowances

### Animations
- Scroll-reveal via Intersection Observer (`AnimatedSection`)
- Float, wave, tilt, and pulse keyframes
- Staggered children, fade/slide/scale variants
- Spring-physics micro-interactions on cards and buttons

### Design System

- **Fonts:** Sansita (headings), Tinos (body)
- **Colors:** ocean (cyan), teal, sunset (amber), palm (green), coral (orange)
- **Glassmorphism** navbars and overlays
- **Gradient overlays** on hero sections

---

## Data

Static data modules in `src/data/`:

| File | Content | Records |
|------|---------|---------|
| `destinations.js` | Tourist destinations (beaches, nature, culture, religious, adventure) | ~150 |
| `businesses.js` | Local businesses (restaurants, hotels, shops, services) | ~80 |
| `sriLankaPride.js` | Heritage items (ancient kingdoms, wildlife, personalities, festivals) | ~100 |
| `gallery.js` | Gallery image metadata | ~50 |

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

## Environment

Copy `.env.example` to `.env` to override the production URL:

```
VITE_SITE_URL=https://your-custom-domain.com
```

If unset, the app falls back to `https://eastorysl.netlify.app`.

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

## License

MIT © Eastory SL
