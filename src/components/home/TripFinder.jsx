import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiSun, FiFeather, FiCamera, FiCoffee, FiTrendingUp, FiActivity, FiUser, FiHeart, FiUsers, FiDollarSign, FiStar, FiCalendar, FiClock, FiArrowRight, FiRefreshCw, FiMap, FiCompass } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { destinations } from '../../data/destinations'
import { handleImgError } from '../../utils/fallback'
const questions = [
  {
    id: 'experience',
    question: 'What kind of experience are you looking for?',
    icon: FiCompass,
    options: [
      { value: 'beaches', label: 'Beach & Relaxation', desc: 'Sun, sand, and calm waters', icon: FiSun },
      { value: 'nature', label: 'Nature & Wildlife', desc: 'National parks and scenery', icon: FiFeather },
      { value: 'culture', label: 'Culture & History', desc: 'Temples, forts, and heritage', icon: FiCamera },
      { value: 'mixed', label: 'A Bit of Everything', desc: 'A balanced experience', icon: FiCompass },
    ],
  },
  {
    id: 'style',
    question: 'What\'s your travel style?',
    icon: FiTrendingUp,
    options: [
      { value: 'relaxed', label: 'Relaxed & Easy', desc: 'Slow-paced, comfortable', icon: FiCoffee },
      { value: 'moderate', label: 'Balanced Explorer', desc: 'Mix of activity and leisure', icon: FiActivity },
      { value: 'adventurous', label: 'Adventurous', desc: 'Active and off-the-beaten-path', icon: FiTrendingUp },
    ],
  },
  {
    id: 'companions',
    question: 'Who are you traveling with?',
    icon: FiUsers,
    options: [
      { value: 'solo', label: 'Solo Traveler', desc: 'Exploring on my own', icon: FiUser },
      { value: 'couple', label: 'Couple', desc: 'Romantic getaway', icon: FiHeart },
      { value: 'family', label: 'Family', desc: 'Traveling with kids', icon: FiUsers },
      { value: 'group', label: 'Friends / Group', desc: 'Traveling with a group', icon: FiUsers },
    ],
  },
  {
    id: 'budget',
    question: 'What\'s your budget range?',
    icon: FiDollarSign,
    options: [
      { value: 'budget', label: 'Budget Friendly', desc: 'Affordable options', icon: FiDollarSign },
      { value: 'mid', label: 'Mid Range', desc: 'Comfortable and balanced', icon: FiDollarSign },
      { value: 'premium', label: 'Premium', desc: 'Top-tier experiences', icon: FiStar },
    ],
  },
  {
    id: 'duration',
    question: 'How long will you be staying?',
    icon: FiClock,
    options: [
      { value: 'weekend', label: 'Weekend Trip', desc: '2-3 days', icon: FiCalendar },
      { value: 'short', label: 'Short Stay', desc: '4-6 days', icon: FiCalendar },
      { value: 'extended', label: 'Extended Stay', desc: '7+ days', icon: FiCalendar },
    ],
  },
]

function recommendPlan(answers) {
  const { experience, companions, budget, duration } = answers

  const categoryMatch = {
    beaches: [],
    nature: ['nature'],
    culture: ['historical', 'religious'],
    wildlife: ['nature'],
  }

  let candidateDests = []
  if (experience === 'beaches') {
    candidateDests = destinations.filter((d) => d.category === 'beaches')
  } else {
    candidateDests = destinations
      .filter((d) => categoryMatch[experience]?.includes(d.category))
  }

  if (candidateDests.length < 2) {
    candidateDests = [...destinations]
  }

  const destCount = { weekend: 2, short: 3, extended: 4 }
  const topDests = candidateDests.slice(0, destCount[duration] || 3)

  let beachCandidates = destinations
    .filter((d) => d.category === 'beaches')

  const companionTips = {
    solo: ['Perfect for independent exploration', 'Great hostel & guesthouse options available'],
    couple: ['Romantic sunset spots across the island', 'Private tours create unforgettable memories'],
    family: ['Family-friendly accommodations widely available', 'Plenty of kid-friendly beaches and activities'],
    group: ['Group discounts at many attractions', 'Private transport recommended for flexibility'],
  }

  const budgetTips = {
    budget: ['Free entry to many temples and sites', 'Street food is delicious and affordable'],
    mid: ['Great value boutique hotels available', 'Private drivers offer affordable tours'],
    premium: ['Luxury resorts with world-class amenities', 'Private guides enhance the experience'],
  }

  return {
    destinations: topDests,
    beach: beachCandidates[0] || null,
    tips: [...(companionTips[companions] || []), ...(budgetTips[budget] || [])],
    bestTime: topDests[0]?.bestTime || 'Year-round',
  }
}

export default function TripFinder() {
  const [step, setStep] = useState('intro')
  const [currentQ, setCurrentQ] = useState(0)
  const [answers, setAnswers] = useState({})
  const [result, setResult] = useState(null)

  const plan = result

  function handleAnswer(value) {
    const newAnswers = { ...answers, [questions[currentQ].id]: value }
    setAnswers(newAnswers)

    if (currentQ < questions.length - 1) {
      setCurrentQ(currentQ + 1)
    } else {
      setStep('calculating')
      setTimeout(() => {
        setResult(recommendPlan(newAnswers))
        setStep('result')
      }, 1200)
    }
  }

  function handleBack() {
    if (currentQ > 0) setCurrentQ(currentQ - 1)
  }

  function handleReset() {
    setStep('intro')
    setCurrentQ(0)
    setAnswers({})
    setResult(null)
  }

  function handleStart() {
    setStep('quiz')
    setCurrentQ(0)
    setAnswers({})
    setResult(null)
  }

  return (
    <section className="section-padding bg-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'radial-gradient(circle at 30% 50%, #0d9488 0%, transparent 50%), radial-gradient(circle at 70% 50%, #0284c7 0%, transparent 50%)',
        }}
      />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200/50 to-transparent" />

      <div className="container-custom relative z-10">
        <AnimatePresence mode="wait">
          {step === 'intro' && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-2xl mx-auto text-center"
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-slate-900 mb-3">Find Your Perfect Trip</h2>
              <p className="text-slate-500 text-sm sm:text-base mb-6">
                Answer a few quick questions and we'll build a personalized itinerary for Eastern Sri Lanka.
              </p>
              <button
                onClick={handleStart}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-teal-600 to-ocean-500 text-white font-semibold hover:shadow-lg hover:shadow-teal-500/25 transition-all duration-300"
              >
                <FiMap />
                Start Planning
              </button>
            </motion.div>
          )}

          {step === 'quiz' && (
            <motion.div
              key="quiz"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="max-w-3xl mx-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-1.5">
                  {questions.map((_, i) => (
                    <div
                      key={i}
                      className={`h-1 rounded-full transition-all duration-500 ${
                        i <= currentQ ? 'bg-teal-500 w-5 sm:w-6' : 'bg-slate-200 w-1.5'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs text-slate-400 font-medium">
                  {currentQ + 1} / {questions.length}
                </span>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={currentQ}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="text-teal-600 font-semibold text-xs mb-1 uppercase tracking-wider">
                    {questions[currentQ].id}
                  </p>
                  <h3 className="text-lg sm:text-xl font-heading font-bold text-slate-900 mb-4">
                    {questions[currentQ].question}
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {questions[currentQ].options.map((opt) => {
                      const selected = answers[questions[currentQ].id] === opt.value
                      return (
                        <button
                          key={opt.value}
                          onClick={() => handleAnswer(opt.value)}
                          className={`group flex items-start gap-4 p-4 sm:p-5 rounded-2xl border-2 text-left transition-all duration-300 ${
                            selected
                              ? 'border-teal-500 bg-teal-50 shadow-lg shadow-teal-500/10'
                              : 'border-slate-200 bg-white hover:border-teal-200 hover:shadow-md'
                          }`}
                        >
                          <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                            selected
                              ? 'bg-gradient-to-br from-teal-500 to-ocean-500 text-white shadow-md shadow-teal-500/20'
                              : 'bg-slate-100 text-slate-500 group-hover:bg-teal-50 group-hover:text-teal-600'
                          }`}>
                            <opt.icon className="text-base" />
                          </div>
                          <div className="min-w-0">
                            <p className="font-semibold text-slate-900 text-sm">{opt.label}</p>
                            <p className="text-xs text-slate-500 mt-0.5">{opt.desc}</p>
                          </div>
                        </button>
                      )
                    })}
                  </div>
                </motion.div>
              </AnimatePresence>

              {currentQ > 0 && (
                <button
                  onClick={handleBack}
                  className="mt-2 min-h-[44px] px-4 text-xs text-slate-400 hover:text-teal-600 transition-colors font-medium"
                >
                  ← Back
                </button>
              )}
            </motion.div>
          )}

          {step === 'calculating' && (
            <motion.div
              key="calculating"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-12"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
                className="w-14 h-14 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-teal-500 to-ocean-500 flex items-center justify-center shadow-xl shadow-teal-500/20"
              >
                <FiCompass className="text-white text-2xl" />
              </motion.div>
              <p className="text-lg font-semibold text-slate-900">Planning your perfect trip...</p>
              <p className="text-sm text-slate-400 mt-1">Analyzing your preferences</p>
            </motion.div>
          )}

          {step === 'result' && plan && (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <div className="text-center mb-8">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
                  className="w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br from-teal-500 to-ocean-500 flex items-center justify-center shadow-lg shadow-teal-500/20"
                >
                  <FiMap className="text-white text-xl" />
                </motion.div>
                <h2 className="text-xl sm:text-2xl font-heading font-bold text-slate-900 mb-1">Your Personalized Plan</h2>
                <p className="text-sm text-slate-500">Based on your preferences, we recommend:</p>
              </div>

              <div className="max-w-4xl mx-auto space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {plan.destinations.map((dest, i) => (
                    <motion.div
                      key={dest.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + i * 0.1 }}
                      className="group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      <div className="relative h-32 sm:h-36 overflow-hidden">
                        <img
                          src={dest.image}
                          alt={dest.name}
                          loading="lazy"
                          onError={handleImgError}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
                        <div className="absolute bottom-2 left-3 right-3">
                          <h3 className="text-white font-heading font-bold text-sm sm:text-base leading-tight">{dest.name}</h3>
                          <span className="text-white/70 text-xs capitalize">{dest.category}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {plan.beach && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="flex items-start gap-3 p-4 rounded-2xl bg-gradient-to-br from-ocean-50 to-teal-50 border border-ocean-100"
                  >
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-ocean-500 to-teal-500 flex items-center justify-center flex-shrink-0 shadow-md">
                      <FiSun className="text-white text-base" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900 text-xs">Top Beach Pick</p>
                      <p className="text-slate-700 text-xs mt-0.5">
                        {plan.beach.name}
                      </p>
                      <p className="text-[11px] text-slate-500 mt-0.5">{plan.beach.description?.slice(0, 80)}...</p>
                    </div>
                  </motion.div>
                )}

                {plan.bestTime && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    className="flex items-center gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-100"
                  >
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-500 to-sunset-500 flex items-center justify-center flex-shrink-0 shadow-md">
                      <FiCalendar className="text-white text-base" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900 text-xs">Best Time to Visit</p>
                      <p className="text-slate-600 text-xs mt-0.5">{plan.bestTime}</p>
                    </div>
                  </motion.div>
                )}

                {plan.tips.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="p-4 rounded-2xl bg-gradient-to-br from-teal-50 to-emerald-50 border border-teal-100"
                  >
                    <p className="font-semibold text-slate-900 text-xs mb-2">Pro Tips</p>
                    <ul className="space-y-1.5">
                      {plan.tips.map((tip, i) => (
                        <li key={i} className="flex items-start gap-1.5 text-xs text-slate-600">
                          <span className="text-teal-500 mt-0.5">•</span>
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 }}
                  className="flex flex-col sm:flex-row items-center justify-center gap-2 pt-2"
                >
                  <Link
                    to="/destinations"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-teal-600 to-ocean-500 text-white font-semibold text-xs hover:shadow-lg hover:shadow-teal-500/25 transition-all duration-300"
                  >
                    Explore Destinations
                    <FiArrowRight />
                  </Link>
                  <button
                    onClick={handleReset}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-medium text-xs hover:border-teal-300 hover:text-teal-700 transition-all duration-300"
                  >
                    <FiRefreshCw />
                    Start Over
                  </button>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
