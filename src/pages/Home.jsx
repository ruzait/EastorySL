import Hero from '../components/home/Hero'
import Featured from '../components/home/Featured'
import CTA from '../components/home/CTA'
import TripFinder from '../components/home/TripFinder'
import SEO from '../components/seo/SEO'

export default function Home() {
  return (
    <>
      <SEO
        description="Discover the beauty of Sri Lanka — pristine beaches, rich cultural heritage, local businesses, and unforgettable travel experiences all in one place."
        keywords="Sri Lanka travel, Eastern Sri Lanka, Sri Lanka tourism, travel guide, Sri Lanka beaches"
      />
      <Hero />
      <Featured />
      <CTA />
      <TripFinder />
    </>
  )
}
