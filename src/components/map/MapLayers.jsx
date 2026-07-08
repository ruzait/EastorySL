import { FiEye, FiEyeOff, FiSun } from 'react-icons/fi'
import { HiOutlineLocationMarker, HiOutlineOfficeBuilding, HiOutlineCollection } from 'react-icons/hi'
import { motion } from 'framer-motion'

const layers = [
  { id: 'destinations', label: 'Destinations', icon: HiOutlineLocationMarker },
  { id: 'beaches', label: 'Beaches', icon: FiSun },
  { id: 'businesses', label: 'Discover more', icon: HiOutlineOfficeBuilding },
  { id: 'cultural', label: 'Cultural', icon: HiOutlineCollection },
]

export default function MapLayers({ activeLayers, onToggle }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -8, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -8, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className="bg-white/90 backdrop-blur-xl rounded-xl shadow-lg border border-white/30 overflow-hidden"
    >
      {layers.map((layer) => {
        const active = activeLayers[layer.id]
        const Icon = layer.icon
        return (
          <button
            key={layer.id}
            onClick={() => onToggle(layer.id)}
            className={`touch-manipulation flex items-center gap-2 w-full px-3 py-2.5 text-xs font-medium transition-all duration-200 cursor-pointer ${
              active
                ? 'text-slate-800 hover:bg-slate-50'
                : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50/50'
            } ${layer !== layers[layers.length - 1] ? 'border-b border-slate-100' : ''}`}
          >
            <Icon className={`text-sm ${active ? 'text-slate-700' : 'text-slate-400'}`} />
            <span className="flex-1 text-left italic">{layer.label}</span>
            {active ? (
              <FiEye className="text-teal-500 text-xs shrink-0" />
            ) : (
              <FiEyeOff className="text-slate-300 text-xs shrink-0" />
            )}
          </button>
        )
      })}
    </motion.div>
  )
}
