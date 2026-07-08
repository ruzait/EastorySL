import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiPlusCircle, FiArrowRight } from 'react-icons/fi'
import BusinessCard from './BusinessCard'

const tierOrder = { premium: 0, featured: 1, free: 2 }

function CtaCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="relative col-span-1 sm:col-span-2 lg:col-span-3 rounded-2xl overflow-hidden"
    >
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url(/images/home/hero.png)' }} />
      <div className="absolute inset-0 bg-gradient-to-r from-slate-900/85 via-slate-900/70 to-slate-900/40" />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-slate-900/20" />
      <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 px-6 md:px-10 py-8 md:py-10 text-center md:text-left">
        <div className="flex-1">
          <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm text-teal-200 text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full mb-3 border border-white/10">
            <FiPlusCircle className="text-sm" />
            Free Listing Available
          </div>
          <h3 className="text-2xl md:text-3xl font-heading font-bold text-white mb-2 leading-tight">
            Own a Business?{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-ocean-300 to-teal-200">
              Publish Your Place
            </span>
          </h3>
          <p className="text-slate-300 max-w-xl text-sm md:text-base leading-relaxed">
            Get your business in front of thousands of travelers exploring Sri Lanka.
          </p>
        </div>
        <Link
          to="/advertise"
          className="group inline-flex items-center gap-3 bg-gradient-to-r from-teal-500 to-ocean-600 text-white font-semibold px-8 py-3.5 rounded-xl shadow-2xl shadow-teal-500/25 hover:shadow-teal-500/40 hover:scale-105 active:scale-[1.02] transition-all duration-300 min-h-[48px] shrink-0"
        >
          <span>List Your Business</span>
          <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </motion.div>
  )
}

export default function BusinessGrid({ businesses }) {
  const sorted = useMemo(() => {
    return [...businesses].sort((a, b) => (tierOrder[a.tier] ?? 2) - (tierOrder[b.tier] ?? 2))
  }, [businesses])

  const items = []
  sorted.forEach((biz, i) => {
    if (sorted.length >= 3 && i === Math.floor(sorted.length / 2)) items.push(<CtaCard key="cta" />)
    items.push(<BusinessCard key={biz.id} business={biz} index={i} />)
  })

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
      {items}
    </div>
  )
}
