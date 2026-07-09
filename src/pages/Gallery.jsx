import { useMemo } from 'react'
import SectionTitle from '../components/ui/SectionTitle'
import { galleryCategories, buildGalleryImages } from '../data/gallery'
import { destinations } from '../data/destinations'
import { businesses } from '../data/businesses'
import SEO from '../components/seo/SEO'
import { prideItems } from '../data/sriLankaPride'
import GalleryGrid from '../components/gallery/GalleryGrid'

export default function Gallery() {
  const galleryImages = useMemo(
    () => buildGalleryImages(destinations, businesses, prideItems),
    []
  )

  return (
    <div>
      <SEO
        title="Gallery"
        description="Browse stunning photos of Sri Lanka's landscapes, beaches, wildlife, cultural sites, and local businesses curated by Eastory SL."
        keywords="Sri Lanka photos, Sri Lanka gallery, Sri Lanka images, Sri Lanka pictures, Sri Lanka travel photography"
        ogImage="https://eastorysl.netlify.app/images/home/Gallery.png"
      />
      <section className="relative pt-28 md:pt-32 pb-10 md:pb-12 overflow-hidden px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0">
          <img src="/images/home/Gallery.png" alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900/85 via-teal-950/75 to-slate-900/85" />
        </div>
        <div className="container-custom relative z-10 text-center px-4 sm:px-6 lg:px-8">
          <SectionTitle
            as="h1"
            subtitle="Visual Journey"
            title="Gallery"
            description="Explore Sri Lanka through stunning photographs capturing its beaches, nature, culture, and heritage."
            light
          />
        </div>
      </section>
      <section className="section-padding">
        <div className="container-custom">
          <GalleryGrid images={galleryImages} categories={galleryCategories} />
        </div>
      </section>
    </div>
  )
}
