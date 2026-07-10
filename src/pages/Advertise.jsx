import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FiCheck, FiChevronRight, FiChevronLeft, FiArrowLeft } from 'react-icons/fi'
import { FaWhatsapp } from 'react-icons/fa'
import SectionTitle from '../components/ui/SectionTitle'
import SEO from '../components/seo/SEO'
import AnimatedSection from '../components/ui/AnimatedSection'

// WhatsApp number for business enquiries - update with your actual number
const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER || '94724362001'

const packages = [
  {
    id: 'free',
    name: 'Free Listing',
    price: '$0',
    period: '',
    description: 'Get your business listed on our platform with basic details.',
    popular: false,
    color: 'from-slate-500 to-slate-600',
    features: [
      'Business profile page',
      'Up to 3 photos',
      'Contact information',
      'Standard visibility',
    ],
  },
  {
    id: 'featured',
    name: 'Featured Listing',
    price: '$20',
    period: '/month',
    description: 'Stand out with enhanced visibility and priority placement.',
    popular: true,
    color: 'from-teal-500 to-ocean-500',
    features: [
      'Everything in Free',
      'Featured badge',
      'Up to 10 photos',
      'Top placement in category',
      'Social media promotion',
    ],
  },
  {
    id: 'premium',
    name: 'Premium Listing',
    price: '$50',
    period: '/month',
    description: 'Maximum exposure with dedicated marketing support.',
    popular: false,
    color: 'from-amber-500 to-sunset-500',
    features: [
      'Everything in Featured',
      'Unlimited photos & videos',
      'Homepage featured slot',
      'Dedicated blog post',
      'Social media takeover',
      'WhatsApp priority support',
      'Monthly analytics report',
    ],
  },
]

const steps = [
  { id: 1, label: 'Choose Package' },
  { id: 2, label: 'Business Details' },
  { id: 3, label: 'Review & Submit' },
]

export default function Advertise() {
  const [step, setStep] = useState(1)
  const [selectedPackage, setSelectedPackage] = useState(null)
  const [form, setForm] = useState({
    businessName: '',
    type: '',
    location: '',
    contact: '',
    email: '',
    description: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const updateForm = (key, value) => setForm((prev) => ({ ...prev, [key]: value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    const pkg = packages.find((p) => p.id === selectedPackage)
    const msg = `Hi! I'm interested in advertising with Eastory SL.\n\nBusiness: ${form.businessName}\nType: ${form.type}\nLocation: ${form.location}\nPhone: ${form.contact}\nEmail: ${form.email}\nPackage: ${pkg?.name || 'N/A'}\n\n${form.description}`
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank')
  }

  if (submitted) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="fixed inset-0 bg-cover bg-center" style={{ backgroundImage: 'url(/images/discover/hero.png)' }} />
        <div className="fixed inset-0 bg-gradient-to-br from-slate-900/85 via-teal-950/85 to-slate-900/85">
          <div className="absolute inset-0 opacity-10 bg-grid" />
        </div>
        <AnimatedSection className="relative z-10 text-center max-w-lg mx-auto px-4">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-teal-400 to-ocean-500 flex items-center justify-center mx-auto mb-6 shadow-xl shadow-teal-500/20">
            <FiCheck className="text-white text-3xl" />
          </div>
          <h2 className="text-3xl font-heading font-bold text-white mb-3">Thank You!</h2>
          <p className="text-slate-300 mb-2">Your request has been submitted successfully.</p>
          <p className="text-sm text-slate-400">We'll get back to you within 24 hours.</p>
          <Link
            to="/discover-more"
            className="inline-flex items-center gap-2 mt-8 px-6 py-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold text-sm hover:bg-white/20 transition-all duration-300"
          >
            <FiArrowLeft />
            Back to Discover more
          </Link>
        </AnimatedSection>
      </div>
    )
  }

  return (
    <div>
      <SEO
        title="Advertise With Us"
        description="Promote your business on Eastory SL. Reach thousands of travelers exploring Sri Lanka with our affordable advertising packages."
        keywords="advertise Sri Lanka, Sri Lanka business promotion, Sri Lanka travel advertising, promote tourism business Sri Lanka"
        ogImage="/images/discover/hero.png"
        ogUrl={`${import.meta.env.VITE_SITE_URL || 'https://eastorysl.netlify.app'}/advertise`}
      />
      <section className="relative pt-28 md:pt-32 pb-10 md:pb-12 overflow-hidden px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url(/images/discover/hero.png)' }} />
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/85 via-teal-950/85 to-slate-900/85">
          <div className="absolute inset-0 opacity-10 bg-grid" />
        </div>
        <div className="container-custom relative z-10 text-center px-4 sm:px-6 lg:px-8">
          <SectionTitle
            subtitle="Grow Your Business"
            title="Advertise With Us"
            description="Get your business in front of thousands of travelers exploring Sri Lanka. Choose the package that suits your needs."
            light
          />
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom max-w-4xl">
          <div className="flex items-center justify-center gap-4 mb-12">
            {steps.map((s) => (
              <div key={s.id} className="flex items-center gap-4">
                <div className={`flex items-center gap-2 ${
                  step >= s.id ? 'text-teal-600' : 'text-slate-300'
                }`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                    step >= s.id
                      ? 'bg-teal-600 text-white'
                      : 'bg-slate-100 text-slate-400'
                  }`}>
                    {step > s.id ? <FiCheck /> : s.id}
                  </div>
                  <span className="text-sm font-medium hidden sm:inline">{s.label}</span>
                </div>
                {s.id < steps.length && (
                  <div className={`w-12 h-0.5 transition-all duration-300 ${
                    step > s.id ? 'bg-teal-500' : 'bg-slate-200'
                  }`} />
                )}
              </div>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <h3 className="text-2xl font-heading font-bold text-slate-900 mb-8 text-center">
                  Choose Your Package
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6 mb-8">
                  {packages.map((pkg) => (
                    <button
                      key={pkg.id}
                      onClick={() => setSelectedPackage(pkg.id)}
                      className={`relative text-left p-6 rounded-2xl border-2 transition-all duration-300 ${
                        selectedPackage === pkg.id
                          ? 'border-teal-500 bg-teal-50/50 shadow-xl shadow-teal-500/10'
                          : 'border-slate-200 bg-white hover:border-teal-200 hover:shadow-lg'
                      }`}
                    >
                      {pkg.popular && (
                        <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-teal-500 to-ocean-500 text-white text-xs font-bold shadow-lg">
                          Most Popular
                        </span>
                      )}
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${pkg.color} flex items-center justify-center mb-4 shadow-lg`}>
                        <span className="text-white font-bold text-lg">{pkg.name[0]}</span>
                      </div>
                      <h4 className="font-heading font-bold text-lg text-slate-900 mb-1">{pkg.name}</h4>
                      <div className="mb-3">
                        <span className="text-3xl font-heading font-extrabold text-slate-900">{pkg.price}</span>
                        <span className="text-slate-400 text-sm">{pkg.period}</span>
                      </div>
                      <p className="text-sm text-slate-500 mb-4">{pkg.description}</p>
                      <ul className="space-y-2">
                        {pkg.features.map((f) => (
                          <li key={f} className="flex items-start gap-2 text-sm text-slate-600">
                            <FiCheck className="text-teal-500 mt-0.5 flex-shrink-0" />
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                    </button>
                  ))}
                </div>
                <div className="text-center">
                  <button
                    onClick={() => setStep(2)}
                    disabled={!selectedPackage}
                    className="btn-primary text-base px-8 py-4 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Continue
                    <FiChevronRight />
                  </button>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <h3 className="text-2xl font-heading font-bold text-slate-900 mb-8 text-center">
                  Business Details
                </h3>
                <form onSubmit={(e) => { e.preventDefault(); setStep(3) }} className="max-w-xl mx-auto space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Business Name *</label>
                    <input
                      type="text"
                      required
                      value={form.businessName}
                      onChange={(e) => updateForm('businessName', e.target.value)}
                      className="input-field"
                      placeholder="Your business name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Business Type *</label>
                    <select
                      required
                      value={form.type}
                      onChange={(e) => updateForm('type', e.target.value)}
                      className="input-field"
                    >
                      <option value="">Select type</option>
                      <option value="hotel">Hotel / Accommodation</option>
                      <option value="restaurant">Restaurant / Cafe</option>
                      <option value="shop">Shop / Retail</option>
                      <option value="service">Service Provider</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Location *</label>
                    <input
                      type="text"
                      required
                      value={form.location}
                      onChange={(e) => updateForm('location', e.target.value)}
                      className="input-field"
                      placeholder="City, Province"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">Phone *</label>
                      <input
                        type="tel"
                        required
                        value={form.contact}
                        onChange={(e) => updateForm('contact', e.target.value)}
                        className="input-field"
                        placeholder="+94 XX XXX XXXX"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">Email</label>
                      <input
                        type="email"
                        value={form.email}
                        onChange={(e) => updateForm('email', e.target.value)}
                        className="input-field"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Description</label>
                    <textarea
                      rows={4}
                      value={form.description}
                      onChange={(e) => updateForm('description', e.target.value)}
                      className="input-field resize-none"
                      placeholder="Tell us about your business..."
                    />
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3 pt-4">
                    <button type="button" onClick={() => setStep(1)} className="btn-secondary flex-1">
                      <FiChevronLeft />
                      Back
                    </button>
                    <button type="submit" className="btn-primary flex-1">
                      Review
                      <FiChevronRight />
                    </button>
                  </div>
                </form>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <h3 className="text-2xl font-heading font-bold text-slate-900 mb-8 text-center">
                  Review Your Submission
                </h3>
                <div className="max-w-xl mx-auto">
                  <div className="bg-slate-50 rounded-2xl p-6 mb-6 space-y-4">
                    <div className="flex justify-between items-center pb-4 border-b border-slate-200">
                      <span className="text-sm font-medium text-slate-500">Package</span>
                      <span className="font-bold text-slate-900">
                        {packages.find((p) => p.id === selectedPackage)?.name}
                      </span>
                    </div>
                    {Object.entries({
                      'Business Name': form.businessName,
                      'Type': form.type,
                      'Location': form.location,
                      'Phone': form.contact,
                      'Email': form.email || '—',
                    }).map(([key, value]) => (
                      <div key={key} className="flex justify-between items-center">
                        <span className="text-sm text-slate-500">{key}</span>
                        <span className="text-sm font-medium text-slate-900">{value}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <button onClick={() => setStep(2)} className="btn-secondary flex-1">
                      <FiChevronLeft />
                      Edit
                    </button>
                    <button onClick={handleSubmit} className="btn-primary flex-1">
                      <FaWhatsapp />
                      Send via WhatsApp
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  )
}


