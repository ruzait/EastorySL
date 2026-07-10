import Hero from '../components/home/Hero'
import Featured from '../components/home/Featured'
import CTA from '../components/home/CTA'
import TripFinder from '../components/home/TripFinder'
import AboutSriLanka from '../components/home/AboutSriLanka'
import GovTourismLinks from '../components/home/GovTourismLinks'
import SEO from '../components/seo/SEO'

export default function Home() {
  return (
    <>
      <SEO
        title="Sri Lanka Travel Guide"
        description="Discover the beauty of Sri Lanka — pristine beaches, rich cultural heritage, local businesses, and unforgettable travel experiences all in one place."
        keywords="Sri Lanka travel, Eastern Sri Lanka, Sri Lanka tourism, travel guide, Sri Lanka beaches"
        ogImage="/images/home/hero.png"
        ogUrl={`${import.meta.env.VITE_SITE_URL || 'https://eastorysl.netlify.app'}/`}
      />
      <Hero />
      <Featured />
      <CTA />
      <TripFinder />
      <AboutSriLanka />
      <GovTourismLinks />
    </>
  )
}
