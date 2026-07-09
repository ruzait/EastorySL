import { useState, useMemo, useCallback, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiMap, FiList, FiNavigation } from 'react-icons/fi'
import MapView from '../components/map/MapView'
import MapLayers from '../components/map/MapLayers'
import SEO from '../components/seo/SEO'
import MapPlaceList from '../components/map/MapPlaceList'
import MapSidePanel from '../components/map/MapSidePanel'
import { destinations } from '../data/destinations'
import { businesses } from '../data/businesses'
import { prideItems } from '../data/sriLankaPride'

const ALL_DATA = [
  ...destinations.map((d) => ({ ...d, _source: 'destinations' })),
  ...businesses.map((b) => ({ ...b, _source: 'businesses' })),
  ...prideItems.filter((p) => p.coordinates).map((p) => ({ ...p, _source: 'pride' })),
]

export default function Map() {
  const [activeLayers, setActiveLayers] = useState({
    destinations: true,
    beaches: true,
    businesses: true,
    cultural: false,
  })
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedItem, setSelectedItem] = useState(null)
  const [flyToCoord, setFlyToCoord] = useState(null)
  const [showLayers, setShowLayers] = useState(true)
  const [showList, setShowList] = useState(true)
  const [activeCategory, setActiveCategory] = useState(null)
  const [userLocation, setUserLocation] = useState(null)
  const [isLocating, setIsLocating] = useState(false)
  const [locateError, setLocateError] = useState(null)

  const filteredData = useMemo(() => {
    let data = ALL_DATA.filter((item) => {
      if (item._source === 'businesses') return activeLayers.businesses
      if (item._source === 'pride') return activeLayers.cultural
      if (item.category === 'beaches') return activeLayers.beaches
      return activeLayers.destinations
    })

    if (activeCategory) {
      const catMap = {
        'All Destinations': [
          'religious', 'historical', 'nature', 'cultural', 'adventure',
          'beaches', 'waterfalls', 'mountains', 'wildlife', 'parks',
          'forts', 'lakes & rivers', 'islands', 'botanical gardens',
          'scenic train journeys', 'viewpoints', 'marine attractions',
          'adventure activities', 'festivals & events',
        ],
        'Beaches': ['beaches'],
        'Waterfalls': ['waterfalls'],
        'Mountains': ['mountains'],
        'Historical Sites': ['historical'],
        'Religious Places': ['religious'],
        'Restaurants': [],
        'Hotels': ['Accommodation'],
        'Shopping': ['Shopping'],
        'Discover more': ['Tours', 'Water Sports'],
        'Museums': ['cultural', 'museums-galleries'],
        'Wildlife': ['wildlife'],
        'Parks': ['parks'],
      }
      const cats = catMap[activeCategory]
      if (cats) {
        data = data.filter((item) => cats.includes(item.category))
      }
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      data = data.filter(
        (item) =>
          item.name?.toLowerCase().includes(q) ||
          item.location?.toLowerCase().includes(q) ||
          item.district?.toLowerCase().includes(q) ||
          item.category?.toLowerCase().includes(q)
      )
    }

    return data
  }, [activeLayers, searchQuery, activeCategory])

  const handleToggleLayer = useCallback((id) => {
    setActiveLayers((prev) => ({ ...prev, [id]: !prev[id] }))
  }, [])

  const handleSelectItem = useCallback((item) => {
    setSelectedItem(item)
    if (item.coordinates) {
      setFlyToCoord(item.coordinates)
    }
  }, [])

  const handleClosePanel = useCallback(() => {
    setSelectedItem(null)
  }, [])

  const fetchLocation = useCallback((flyTo) => {
    if (!navigator.geolocation) {
      setLocateError('Geolocation is not supported by your browser')
      return
    }
    setIsLocating(true)
    setLocateError(null)
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const coord = [pos.coords.latitude, pos.coords.longitude]
        setUserLocation(coord)
        if (flyTo) setFlyToCoord(coord)
        setIsLocating(false)
        setLocateError(null)
      },
      (err) => {
        setIsLocating(false)
        setLocateError(
          err.code === 1 ? 'Location access denied. Please enable location permissions.'
          : err.code === 2 ? 'Location unavailable. Try again.'
          : 'Location request timed out. Try again.'
        )
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
    )
  }, [])

  const hasAutoLocated = useRef(false)

  useEffect(() => {
    if (!hasAutoLocated.current) {
      hasAutoLocated.current = true
      fetchLocation(false)
    }
  }, []) // eslint-disable-line

  const handleLocate = useCallback(() => {
    fetchLocation(true)
  }, [fetchLocation])

  return (
    <div className="h-full relative">
      <SEO
        title="Map"
        description="Explore Sri Lanka with our interactive map — find destinations, hotels, restaurants, and points of interest across the island."
        keywords="Sri Lanka map, Sri Lanka travel map, Sri Lanka attractions map, Eastern Sri Lanka map, Sri Lanka guide"
        ogImage="https://eastorysl.netlify.app/images/home/hero.png"
      />
      <div className="absolute inset-0 pt-16 md:pt-20">
        <div className="h-full flex overflow-hidden relative">
        <AnimatePresence>
          {showList && (
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="hidden md:block absolute left-0 top-0 bottom-0 z-20 overflow-hidden rounded-3xl shadow-[4px_0_24px_rgba(0,0,0,0.06)]"
              style={{ width: 340 }}
            >
              <div className="w-[340px] h-full">
                <MapPlaceList
                  items={filteredData}
                  selectedItem={selectedItem}
                  onSelect={handleSelectItem}
                  searchQuery={searchQuery}
                  onSearchChange={setSearchQuery}
                  activeCategory={activeCategory}
                  onCategoryChange={setActiveCategory}
                  onClose={() => setShowList(false)}
                />
              </div>
            </motion.div>
            )}
          </AnimatePresence>

        <div className="flex-1 relative">
          <MapView
            filteredData={filteredData}
            onSelectItem={handleSelectItem}
            flyToCoord={flyToCoord}
            selectedItem={selectedItem}
            userLocation={userLocation}
          />
        </div>

        <AnimatePresence>
          {selectedItem && (
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="hidden lg:block absolute right-0 top-0 bottom-0 z-20 overflow-hidden rounded-3xl shadow-[-4px_0_24px_rgba(0,0,0,0.06)]"
              style={{ width: 420 }}
            >
              <div className="w-[420px] h-full">
                <MapSidePanel item={selectedItem} onClose={handleClosePanel} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

        {!selectedItem && (
        <div className="fixed md:top-24 top-20 right-4 z-50 flex flex-col gap-2 items-end">
          <div className="flex items-center gap-2">
            <button
              onClick={handleLocate}
              disabled={isLocating}
              className={`touch-manipulation w-10 h-10 rounded-xl bg-white/90 backdrop-blur-xl shadow-lg border border-white/30 flex items-center justify-center transition-all duration-200 ${
                locateError
                  ? 'text-red-400 hover:text-red-500 border-red-200'
                  : userLocation
                    ? 'text-teal-600 bg-teal-50 border-teal-200'
                    : 'text-slate-500 hover:text-teal-600 hover:bg-white'
              }`}
              title={isLocating ? 'Locating...' : 'Show my location'}
              aria-label={isLocating ? 'Locating...' : 'Show my location'}
            >
              <FiNavigation className={`text-sm ${isLocating ? 'animate-spin' : ''}`} />
            </button>
            <button
              onClick={() => setShowLayers(!showLayers)}
              className="touch-manipulation w-10 h-10 rounded-xl bg-white/90 backdrop-blur-xl shadow-lg border border-white/30 flex items-center justify-center text-slate-500 hover:text-teal-600 hover:bg-white transition-all duration-200"
              title="Toggle layers"
              aria-label="Toggle map layers"
            >
              <FiMap className="text-sm" />
            </button>
          </div>
          {locateError && (
            <div className="w-56 p-2.5 bg-red-50 border border-red-200 rounded-lg shadow-lg">
              <p className="text-xs text-red-700">{locateError}</p>
            </div>
          )}
          {showLayers && (
            <MapLayers activeLayers={activeLayers} onToggle={handleToggleLayer} />
          )}
        </div>
        )}
      {!selectedItem && !showList && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40">
          <button
            onClick={() => setShowList(true)}
            className="touch-manipulation px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-xl shadow-xl border border-white/30 flex items-center gap-1.5 text-xs font-medium text-slate-700 hover:text-teal-600 transition-all duration-200"
          >
            <FiList size={13} /> {filteredData.length} places
          </button>
        </div>
      )}

      
      <AnimatePresence>
        {showList && (
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 z-20 md:hidden"
          >
            <div
              className="bg-white rounded-t-2xl shadow-2xl border-t border-slate-200 overflow-hidden"
              style={{ height: 'min(50vh, 420px)' }}
            >
              <button
                onClick={() => setShowList(false)}
                className="w-full flex justify-center pt-3 pb-2 shrink-0 cursor-pointer"
                aria-label="Close list"
              >
                <div className="w-10 h-1 rounded-full bg-slate-400" />
              </button>
              <MapPlaceList
                items={filteredData}
                selectedItem={null}
                onSelect={(item) => {
                  setShowList(false)
                  if (item.coordinates) {
                    setFlyToCoord(item.coordinates)
                  }
                }}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                activeCategory={activeCategory}
                onCategoryChange={setActiveCategory}
                onClose={() => setShowList(false)}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 z-30 lg:hidden"
          >
            <div
              className="bg-white rounded-t-2xl shadow-2xl border-t border-slate-200 overflow-hidden"
              style={{ height: 'min(60vh, 500px)' }}
            >
              <div className="flex justify-center pt-2 pb-1 shrink-0">
                <div className="w-10 h-1 rounded-full bg-slate-300" />
              </div>
              <MapSidePanel item={selectedItem} onClose={handleClosePanel} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  </div>
  )
}
