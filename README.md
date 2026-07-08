# 🌐 Eastern Sri Lanka Hub

> **A premium discovery platform** — blending tourism, local business promotion, and cultural storytelling into one immersive React experience.

![Version](https://img.shields.io/badge/version-1.0.0-0f766e?style=flat-square)
![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?style=flat-square&logo=tailwind-css)
![Framer](https://img.shields.io/badge/Framer_Motion-0055FF?style=flat-square&logo=framer)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite)

---

## 📋 Table of Contents

- [Vision](#-vision)
- [Architecture](#-architecture)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Features](#-features)
- [Pages & Components](#-pages--components)
- [Animations & Interactions](#-animations--interactions)
- [Data Architecture](#-data-architecture)
- [Monetization Model](#-monetization-model)
- [Development Roadmap](#-development-roadmap)
- [Getting Started](#-getting-started)
- [Design System](#-design-system)

---

## 🎯 Vision

A **world-class Sri Lanka discovery platform** that connects tourism, local commerce, and community culture under one roof. Every pixel is crafted to evoke the warmth, beauty, and rhythm of the island.

### Core Pillars

| Pillar | Description |
|--------|-------------|
| 🏝️ **Tourism** | Showcase beaches, waterfalls, temples, and natural wonders with rich media and maps |
| 🛍️ **Local Business** | Elevate shops, restaurants, hotels through a tiered listing system |
| ⭐ **Community** | Highlight local personalities, leaders, and cultural landmarks |
| 💰 **Monetization** | Sustainable ad platform with featured listings and banner placements |

---

## 🏗️ Architecture

```
src/
├── components/         # Reusable UI building blocks
│   ├── layout/         # Navbar, Footer, Layout shell
│   ├── home/           # Hero, featured sections, stats
│   ├── tourism/        # Destination cards & detail views
│   ├── businesses/     # Business listing components
│   ├── gallery/        # Image grid & lightbox
│   ├── map/            # Map integration components
│   ├── advertise/      # Promotion form & packages
│   └── ui/             # Primitives: buttons, cards, badges
│
├── pages/              # Route-level page components
├── data/               # Static content & mock data
├── hooks/              # Custom React hooks (scroll, intersection observer)
├── animations/         # Framer Motion variants & presets
└── utils/              # Helpers & constants
```

### Data Flow

```
Static Data (JS modules)
    ↓
Page Components (data fetching & transform)
    ↓
Section Components (business logic)
    ↓
UI Components (pure presentation)
```

---

## 🧰 Tech Stack

| Category | Choice | Why |
|----------|--------|-----|
| **Framework** | React 18 | Component model, ecosystem, performance |
| **Bundler** | Vite 5 | Instant HMR, optimized builds |
| **Styling** | Tailwind CSS 3 | Utility-first, consistent design tokens |
| **Animation** | Framer Motion 11 | Declarative physics-based animations |
| **Routing** | React Router 6 | Nested routes, lazy loading |
| **Icons** | React Icons | Lightweight, on-demand SVG icons |
| **Maps** | React Leaflet | Open-source map with OSM tiles |
| **Gallery** | Custom lightbox + CSS Grid | No extra deps for image display |

---

## 📁 Project Structure

```
eastern-sri-lanka-hub/
├── public/
│   └── images/                  # Static image assets
│
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.jsx       # Sticky nav with mobile drawer
│   │   │   ├── Footer.jsx       # Multi-column footer
│   │   │   └── Layout.jsx       # Shell wrapper
│   │   │
│   │   ├── home/
│   │   │   ├── Hero.jsx         # Full-screen video/static hero
│   │   │   ├── Featured.jsx     # Featured destinations carousel
│   │   │   ├── Stats.jsx        # Animated counter section
│   │   │   └── CTA.jsx          # Call-to-action banners
│   │   │
│   │   ├── tourism/
│   │   │   ├── DestinationCard.jsx
│   │   │   └── DestinationGrid.jsx
│   │   │
│   │   ├── businesses/
│   │   │   ├── BusinessCard.jsx
│   │   │   └── BusinessGrid.jsx
│   │   │
│   │   ├── gallery/
│   │   │   └── GalleryGrid.jsx  # Masonry + lightbox
│   │   │
│   │   └── ui/
│   │       ├── AnimatedSection.jsx  # Scroll-reveal wrapper
│   │       ├── SectionTitle.jsx     # Typography component
│   │       ├── Badge.jsx            # Featured/premium badge
│   │       ├── SearchBar.jsx        # Reusable search
│   │       └── WhatsAppButton.jsx   # Floating action button
│   │
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── TouristPlaces.jsx
│   │   ├── Beaches.jsx
│   │   ├── ShopsBusinesses.jsx
│   │   ├── FamousPeople.jsx
│   │   ├── MapPage.jsx
│   │   ├── Gallery.jsx
│   │   └── Advertise.jsx
│   │
│   ├── data/
│   │   ├── destinations.js       # Tourist places dataset
│   │   ├── beaches.js            # Beaches dataset
│   │   ├── businesses.js         # Shops & businesses dataset
│   │   ├── famousPeople.js       # People & landmarks dataset
│   │   └── gallery.js            # Gallery images dataset
│   │
│   ├── animations/
│   │   └── variants.js           # Shared animation presets
│   │
│   ├── App.jsx                   # Root with router
│   ├── main.jsx                  # Entry point
│   └── index.css                 # Tailwind directives + globals
│
├── index.html
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── package.json
└── README.md
```

---

## ✨ Features

### 🌊 Scroll Animations
- **Reveal on scroll** — elements fade, slide, and scale into view using Intersection Observer
- **Parallax sections** — layered backgrounds that move at different speeds
- **Stagger children** — list items animate in sequence
- **Spring physics** — natural-feeling bounces on cards and buttons
- **Smooth scroll** — native `scroll-behavior: smooth` + anchor navigation

### 🎨 UI/UX Highlights
- **Glassmorphism** — frosted glass navbars and cards
- **Gradient overlays** — rich color transitions on hero sections
- **Micro-interactions** — hover scale, tap feedback, loading skeletons
- **Responsive** — mobile-first with fluid typography
- **Dark/light aware** — uses warm tropical palette throughout
- **WhatsApp float** — persistent contact button

### 🗺️ Map Integration
- Interactive Leaflet map with markers
- Clustered points for destinations & businesses
- Popup cards with images and links
- Smooth fly-to animations

---

## 📄 Pages & Components

### 🏠 Home Page
| Section | Component | Description |
|---------|-----------|-------------|
| Hero | `Hero.jsx` | Full-bleed hero with animated gradient overlay, search bar, CTA buttons |
| Featured | `Featured.jsx` | Horizontal carousel of top destinations with parallax tilt |
| Stats | `Stats.jsx` | Animated counters (e.g., "50+ Beaches", "200+ Businesses") |
| Popular | `DestinationGrid.jsx` | Grid of popular spots with reveal animation |
| CTA | `CTA.jsx` | "Start Your Journey" banner with wave animation |

### 🏝️ Tourist Places
- Filterable grid with search
- Category filters (Nature, Culture, Religious, Adventure)
- Card flip animation on hover
- Detail modal with map, images, info

### 🏖️ Beaches
- Dedicated beach showcase
- Rating system, best time to visit
- Distance from major cities
- Photo gallery per beach

### 🛍️ Shops & Businesses
- Listing with featured/premium badges
- Search by name, category, location
- Contact via WhatsApp button
- Business detail page with Google Maps

### ⭐ Famous People
- Profile cards with image, bio, achievements
- Category filters (Historical, Cultural, Sports, Politics)
- Timeline/legacy section

### 🗺️ Map Page
- Full-screen interactive map
- Layer toggle: Destinations / Beaches / Businesses
- Marker clustering for performance
- Click-to-explore popups

### 📸 Gallery
- Masonry grid layout
- Lightbox with keyboard navigation
- Category tabs
- Lazy loading with blur placeholder

### 💰 Advertise With Us
- Multi-step form with validation
- Package selection cards (Free / Featured / Premium)
- Animated progress indicator
- WhatsApp integration for inquiries

---

## 🎞️ Animations & Interactions

### Scroll-Reveal Pattern
```jsx
// components/ui/AnimatedSection.jsx
<AnimatedSection>
  <YourContent />
</AnimatedSection>
```

### Presets (in `animations/variants.js`)
| Variant | Effect |
|---------|--------|
| `fadeInUp` | Opacity 0→1, Y 60→0 |
| `fadeInLeft` | Opacity 0→1, X -60→0 |
| `fadeInRight` | Opacity 0→1, X 60→0 |
| `scaleIn` | Scale 0.8→1, opacity 0→1 |
| `staggerContainer` | Stagger children by 0.1s |
| `flipCard` | 3D Y-axis rotation on hover |

### Micro-Interactions
- **Navbar** — backdrop-blur on scroll, underline hover on links
- **Cards** — lift on hover, shadow depth change
- **Buttons** — scale 0.97 on tap, ripple effect
- **Images** — zoom on hover, lazy load blur
- **Counters** — incremental number animation on scroll into view

---

## 💾 Data Architecture

Each dataset is a JS module exporting an array of objects:

```js
// src/data/destinations.js
export const destinations = [
  {
    id: 'sigiriya',
    name: 'Sigiriya Rock Fortress',
    category: 'historical', // nature | religious | cultural | adventure
    description: '...',
    images: ['/images/sigiriya-1.jpg', ...],
    location: { lat: 7.957, lng: 80.760 },
    rating: 4.8,
    bestTime: 'Jan–Apr',
    entryFee: '$30 USD',
    features: ['UNESCO World Heritage', 'Sunrise View', ...],
  },
  // ...
];
```

### Data Collections
| File | Type | Fields |
|------|------|--------|
| `destinations.js` | Tourist places | name, category, description, images, location, rating, bestTime, entryFee, features |
| `beaches.js` | Beaches | name, description, images, location, rating, bestTime, activities, distance |
| `businesses.js` | Shops & businesses | name, type, description, images, location, contact, featured, package |
| `famousPeople.js` | People & landmarks | name, category, image, bio, achievements, birthPlace |
| `gallery.js` | Gallery images | src, alt, category, location |

---

## 💵 Monetization Model

### Tiered Business Listings

| Tier | Price | Features |
|------|-------|----------|
| **Free** | $0 | Basic details, standard visibility |
| **Featured** | $20/mo | Top placement ⭐, highlight badge, larger images |
| **Premium** | $50/mo | Hero position, video, WhatsApp priority, analytics |

### Advertisement Slots
- **Banner Ads** — 3 positions (Hero, Sidebar, Footer)
- **Sponsored Destinations** — featured on home page
- **Page Sponsorship** — exclusive brand per section

---

## 🛣️ Development Roadmap

### Phase 1 — Foundation (Week 1)
- [x] Project scaffold (Vite + React + Tailwind)
- [x] Routing setup
- [x] Design system & theme
- [x] Layout components (Navbar, Footer)
- [x] Animation presets

### Phase 2 — Content & Pages (Week 2)
- [x] Home page with all sections
- [x] Tourist Places page
- [x] Beaches page
- [x] Shops & Businesses page

### Phase 3 — Features (Week 3)
- [x] Famous People page
- [x] Map page with Leaflet
- [x] Gallery with lightbox
- [x] Advertise With Us form

### Phase 4 — Polish (Week 4)
- [x] Responsive audit
- [x] Performance optimization
- [x] Animation refinement
- [x] Content population

---

## 🚀 Getting Started

```bash
# Clone
git clone <repo-url>
cd eastern-sri-lanka-hub

# Install dependencies
npm install

# Development
npm run dev        # http://localhost:5173

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## 🎨 Design System

### Color Palette

```
Primary:   Teal    #0d9488 → #0f766e
Secondary: Amber   #f59e0b → #d97706
Accent:    Emerald #059669 → #047857
Ocean:     Blue    #06b6d4 → #0891b2
Warm:      Orange  #f97316 → #ea580c
Neutral:   Slate   #64748b → #475569
```

### Typography
- **Headings:** Poppins (sans-serif, 700–800 weight)
- **Body:** Inter (sans-serif, 400–500 weight)
- **Scale:** `clamp()` based fluid type (16px–72px)

### Spacing
- Utility-based (Tailwind spacing scale)
- Section padding: `py-16` to `py-24`
- Card gap: `gap-6` to `gap-8`

### Shadows
- Card: `shadow-lg` → `shadow-xl` on hover
- Glass: `backdrop-blur-xl bg-white/10`
- Glow: teal glow on interactive elements

---

## 🌟 Performance Targets

| Metric | Target |
|--------|--------|
| Lighthouse Performance | > 90 |
| First Contentful Paint | < 1.5s |
| Largest Contentful Paint | < 2.5s |
| Cumulative Layout Shift | < 0.1 |
| Bundle Size (gzip) | < 150KB |

---

## 🤝 Contributing

Contributions are welcome! Please follow the existing code style and ensure animations remain smooth.

---

## 📄 License

MIT © Eastern Sri Lanka Hub

---

> *"Crafted with care for the Pearl of the Indian Ocean"* 🏝️
