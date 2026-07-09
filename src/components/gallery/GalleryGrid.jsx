import { useState, useMemo, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiX, FiChevronLeft, FiChevronRight, FiMapPin } from 'react-icons/fi'
import { galleryCatIcons } from '../../data/gallery'

export default function GalleryGrid({ images, categories }) {
  const [activeCategory, setActiveCategory] = useState('all')
  const [selectedImage, setSelectedImage] = useState(null)
  const [scrollStart, setScrollStart] = useState(true)
  const [scrollEnd, setScrollEnd] = useState(false)
  const scrollRef = useRef(null)

  const updateScrollState = () => {
    const el = scrollRef.current
    if (!el) return
    setScrollStart(el.scrollLeft <= 2)
    setScrollEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 2)
  }

  const scroll = (dir) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: dir * 200, behavior: 'smooth' })
    }
  }

  useEffect(() => {
    updateScrollState()
    const onResize = () => updateScrollState()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  useEffect(() => {
    if (scrollRef.current) {
      const btn = scrollRef.current.querySelector('[data-active="true"]')
      if (btn) btn.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' })
    }
  }, [activeCategory])

  const filtered = useMemo(() => {
    if (activeCategory === 'all') return images
    return images.filter((img) => img.category === activeCategory)
  }, [images, activeCategory])

  const currentIndex = useMemo(() => {
    if (!selectedImage) return -1
    return filtered.findIndex((img) => img.id === selectedImage.id)
  }, [filtered, selectedImage])

  useEffect(() => {
    if (!selectedImage) return
    function handleKeyDown(e) {
      if (e.key === 'ArrowLeft' && currentIndex > 0) setSelectedImage(filtered[currentIndex - 1])
      else if (e.key === 'ArrowRight' && currentIndex < filtered.length - 1) setSelectedImage(filtered[currentIndex + 1])
      else if (e.key === 'Escape') setSelectedImage(null)
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [selectedImage, currentIndex, filtered])

  function handlePrev() {
    if (currentIndex > 0) setSelectedImage(filtered[currentIndex - 1])
  }

  function handleNext() {
    if (currentIndex < filtered.length - 1) setSelectedImage(filtered[currentIndex + 1])
  }

  return (
    <>
      <div className="flex items-center gap-1 mb-8">
        <button
          onClick={() => scroll(-1)}
          disabled={scrollStart}
          className={`hidden lg:flex min-h-[44px] w-12 items-center justify-center rounded-full border transition-all duration-300 shrink-0 ${
            scrollStart
              ? 'bg-slate-100 text-slate-300 border-slate-100 cursor-not-allowed'
              : 'bg-white text-slate-600 hover:bg-teal-50 hover:text-teal-700 border-slate-200'
          }`}
          aria-label="Scroll left"
        >
          <FiChevronLeft />
        </button>
        <div ref={scrollRef} onScroll={updateScrollState} className="flex gap-2 overflow-x-auto scroll-smooth no-scrollbar">
          {categories.map((cat) => {
            const Icon = galleryCatIcons[cat.id]
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                data-active={activeCategory === cat.id || undefined}
                className={`min-h-[44px] px-4 py-2 rounded-full text-sm font-bold font-['Poppins'] transition-all duration-300 whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                  activeCategory === cat.id
                    ? 'bg-teal-600 text-white shadow-lg shadow-teal-500/20'
                    : 'bg-white text-slate-600 hover:bg-teal-50 hover:text-teal-700 border border-slate-200'
                }`}
              >
                {Icon && <Icon className="text-sm" />}
                {cat.label}
              </button>
            )
          })}
        </div>
        <button
          onClick={() => scroll(1)}
          disabled={scrollEnd}
          className={`hidden lg:flex min-h-[44px] w-12 items-center justify-center rounded-full border transition-all duration-300 shrink-0 ${
            scrollEnd
              ? 'bg-slate-100 text-slate-300 border-slate-100 cursor-not-allowed'
              : 'bg-white text-slate-600 hover:bg-teal-50 hover:text-teal-700 border-slate-200'
          }`}
          aria-label="Scroll right"
        >
          <FiChevronRight />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map((image, i) => (
          <motion.button
            key={image.id}
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            onClick={() => setSelectedImage(image)}
            className="group relative rounded-2xl overflow-hidden aspect-[4/3] bg-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
          >
            <img
              src={image.src}
              alt={image.alt}
              loading="lazy"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
              <p className="text-white text-sm font-medium text-left leading-tight">{image.alt}</p>
              {image.location && (
                <p className="text-white/70 text-xs text-left mt-0.5 flex items-center gap-1">
                  <FiMapPin className="text-teal-400" />
                  {image.location}
                </p>
              )}
            </div>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button
              onClick={() => setSelectedImage(null)}
              aria-label="Close"
              className="absolute top-4 right-4 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors z-10"
            >
              <FiX className="text-xl" />
            </button>

            {currentIndex > 0 && (
              <button
                onClick={(e) => { e.stopPropagation(); handlePrev() }}
                aria-label="Previous image"
                className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors z-10"
              >
                <FiChevronLeft className="text-xl" />
              </button>
            )}
            {currentIndex < filtered.length - 1 && (
              <button
                onClick={(e) => { e.stopPropagation(); handleNext() }}
                aria-label="Next image"
                className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors z-10"
              >
                <FiChevronRight className="text-xl" />
              </button>
            )}

            <motion.div
              key={selectedImage.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-5xl w-full"
            >
              <img
                src={selectedImage.src}
                alt={selectedImage.alt}
                loading="lazy"
                className="w-full max-h-[80vh] object-contain rounded-2xl"
              />
              <div className="text-center mt-4">
                <p className="text-white text-lg font-medium">{selectedImage.alt}</p>
                {selectedImage.location && (
                  <p className="text-white/60 text-sm mt-1">{selectedImage.location}</p>
                )}
                <p className="text-white/40 text-xs mt-1">{currentIndex + 1} / {filtered.length}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
