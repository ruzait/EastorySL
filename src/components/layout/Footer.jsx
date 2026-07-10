import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FiMapPin, FiMail, FiArrowUp, FiSend, FiChevronRight } from 'react-icons/fi'
import { FaFacebook, FaYoutube, FaWhatsapp, FaUmbrellaBeach } from 'react-icons/fa'
import { GiLion, GiElephantHead } from 'react-icons/gi'
import Logo from '../ui/Logo'

const quickLinks = [
  { name: 'Destinations', path: '/destinations' },
  { name: 'Discover more', path: '/discover-more' },
  { name: 'Sri Lanka Pride', path: '/sri-lanka-pride' },
  { name: 'Gallery', path: '/gallery' },
  { name: 'Map', path: '/map' },
  { name: 'Advertise', path: '/advertise' },
]

const destinations = [
  { name: 'Mirissa Beach', path: '/destinations/beaches/beach-mirissa' },
  { name: 'Unawatuna Beach', path: '/destinations/beaches/beach-unawatuna' },
  { name: 'Kingdom of Anuradhapura', path: '/sri-lanka-pride/ancient-kingdoms/ak-anuradhapura' },
]

const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

export default function Footer() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
      setEmail('')
      setTimeout(() => setSubscribed(false), 3000)
    }
  }

  return (
    <footer className="relative bg-slate-950 text-white overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-teal-500 to-transparent" />
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 25% 25%, #0d9488 1px, transparent 1px), radial-gradient(circle at 75% 75%, #0d9488 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 py-12 lg:py-16">
          <div className="lg:col-span-4">
            <Link to="/" className="inline-flex items-center mb-5 group hover:opacity-80 transition-opacity">
              <Logo color="#FFFFFF" />
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed mb-6 max-w-xs">
              Your guide to exploring Sri Lanka — pristine beaches, ancient temples, vibrant culture, and unforgettable adventures.
            </p>
            <div className="flex items-center gap-2.5 mb-6">
              {[
                { icon: FaWhatsapp, href: 'https://wa.me/94771234567', label: 'WhatsApp' },
                { icon: FaFacebook, href: 'https://facebook.com', label: 'Facebook' },
                { icon: FaYoutube, href: 'https://youtube.com', label: 'YouTube' },
              ].map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-slate-800 hover:bg-teal-600 flex items-center justify-center text-slate-400 hover:text-white transition-all duration-300 hover:shadow-lg hover:shadow-teal-500/20 hover:-translate-y-0.5"
                  aria-label={s.label}>
                  <s.icon className="text-sm" />
                </a>
              ))}
            </div>
            <div className="flex flex-wrap gap-4 text-xs text-slate-500">
              <span className="flex items-center gap-1.5"><FaUmbrellaBeach className="text-teal-500" /> 120+ Destinations</span>
              <span className="flex items-center gap-1.5"><GiLion className="text-teal-500" /> 90+ Pride Entries</span>
              <span className="flex items-center gap-1.5"><GiElephantHead className="text-teal-500" /> 50+ Discover more</span>
            </div>
          </div>

          <div className="lg:col-span-2">
            <h4 className="font-heading font-bold text-sm text-white mb-5 uppercase tracking-wider flex items-center gap-2">
              <span className="w-5 h-px bg-teal-500 inline-block" />
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    onClick={scrollToTop}
                    className="group/link text-slate-400 hover:text-teal-400 text-sm transition-all duration-200 inline-flex items-center gap-1.5"
                  >
                    <FiChevronRight className="text-[10px] text-teal-500/0 group-hover/link:text-teal-500 -ml-4 group-hover/link:ml-0 transition-all duration-200" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h4 className="font-heading font-bold text-sm text-white mb-5 uppercase tracking-wider flex items-center gap-2">
              <span className="w-5 h-px bg-teal-500 inline-block" />
              Top Destinations
            </h4>
            <ul className="space-y-3">
              {destinations.map((d) => (
                <li key={d.name}>
                  <Link
                    to={d.path}
                    onClick={scrollToTop}
                    className="group/link text-slate-400 hover:text-teal-400 text-sm transition-all duration-200 inline-flex items-center gap-1.5"
                  >
                    <FiChevronRight className="text-[10px] text-teal-500/0 group-hover/link:text-teal-500 -ml-4 group-hover/link:ml-0 transition-all duration-200" />
                    {d.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h4 className="font-heading font-bold text-sm text-white mb-5 uppercase tracking-wider flex items-center gap-2">
              <span className="w-5 h-px bg-teal-500 inline-block" />
              Stay Updated
            </h4>
            <p className="text-slate-400 text-sm leading-relaxed mb-4">
              Get the latest travel tips and destination guides delivered to your inbox.
            </p>
            <form onSubmit={handleSubscribe} className="mb-5">
              <div className="relative">
                <FiMail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 text-sm" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full bg-slate-800/80 border border-slate-700 rounded-xl pl-10 pr-12 py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/20 transition-all duration-200"
                  required
                />
                <button
                  type="submit"
                  aria-label="Subscribe"
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg bg-teal-600 hover:bg-teal-500 flex items-center justify-center text-white transition-all duration-200 hover:scale-105"
                >
                  <FiSend className="text-xs" />
                </button>
              </div>
              {subscribed && (
                <p className="text-teal-400 text-xs mt-2 animate-pulse">Thanks for subscribing!</p>
              )}
            </form>
            <div className="p-4 rounded-xl bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-slate-700/50 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-teal-500 to-ocean-600 flex items-center justify-center">
                  <FiMapPin className="text-white text-xs" />
                </div>
                <span className="text-sm font-semibold text-white">List Your Business</span>
              </div>
              <p className="text-xs text-slate-400 mb-3">Get discovered by thousands of travelers.</p>
              <Link
                to="/advertise"
                onClick={scrollToTop}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-teal-400 hover:text-teal-300 transition-colors group"
              >
                Get Listed Free
                <FiArrowUp className="text-xs rotate-45 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="relative border-t border-slate-800">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-slate-500 text-xs sm:text-sm text-center sm:text-left">
              © {new Date().getFullYear()} <span className="text-teal-400">EastorySL</span>. All rights reserved. Pearl of the Indian Ocean.
            </p>
            <div className="flex items-center gap-6">
              <Link to="/privacy-policy" className="text-slate-500 hover:text-teal-400 text-xs transition-colors">Privacy Policy</Link>
              <span className="text-slate-700 text-xs">|</span>
              <Link to="/terms-of-service" className="text-slate-500 hover:text-teal-400 text-xs transition-colors">Terms of Service</Link>
              <button
                onClick={scrollToTop}
                className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-teal-600 flex items-center justify-center text-slate-400 hover:text-white transition-all duration-300 hover:shadow-lg hover:shadow-teal-500/20 hover:-translate-y-0.5"
                aria-label="Scroll to top"
              >
                <FiArrowUp />
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
