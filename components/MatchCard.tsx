'use client'

import { Copy, Star, Share2, Trash2 } from 'lucide-react'
import { useState } from 'react'

interface MatchCardProps {
  id: string
  title: string
  description: string
  publicationDate: string
  budget: string
  organization: string
  registeredDate: string
  closingDate: string
  region: string
  purchaseUnit: string
  matchReason: string
}

export default function MatchCard({
  id,
  title,
  description,
  publicationDate,
  budget,
  organization,
  registeredDate,
  closingDate,
  region,
  purchaseUnit,
  matchReason
}: MatchCardProps) {
  const [isFavorite, setIsFavorite] = useState(false)

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg p-6">
      {/* Header with ID and actions */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500 dark:text-gray-300">{id}</span>
          <button 
            onClick={() => handleCopy(id)}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-white"
          >
            <Copy className="h-4 w-4" />
          </button>
        </div>
        <div className="flex items-center space-x-3">
          <button 
            onClick={() => setIsFavorite(!isFavorite)}
            className="text-gray-400 hover:text-primary"
          >
            <Star className={`h-5 w-5 ${isFavorite ? 'fill-primary text-primary' : ''}`} />
          </button>
          <button className="text-gray-400 hover:text-gray-600 dark:hover:text-white">
            <Share2 className="h-5 w-5" />
          </button>
          <button className="text-gray-400 hover:text-red-400">
            <Trash2 className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Title and Description */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{title}</h2>
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{description}</p>
      </div>

      {/* Details Grid - Clean Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Left Column */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500 dark:text-gray-400">Presupuesto:</span>
            <span className="text-secondary font-semibold">{budget}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500 dark:text-gray-400">Fecha de cierre:</span>
            <span className="text-primary font-medium">{closingDate}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500 dark:text-gray-400">Fecha de Publicación:</span>
            <span className="text-gray-900 dark:text-white">{publicationDate}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500 dark:text-gray-400">Región:</span>
            <span className="text-gray-900 dark:text-white">{region}</span>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500 dark:text-gray-400">Organismo:</span>
            <span className="text-gray-900 dark:text-white text-right max-w-[60%]">{organization}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500 dark:text-gray-400">Unidad de Compra:</span>
            <span className="text-gray-900 dark:text-white">{purchaseUnit}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500 dark:text-gray-400">Registrada por Vende Ágil el:</span>
            <span className="text-gray-900 dark:text-white">{registeredDate}</span>
          </div>
        </div>
      </div>

      {/* Match Reason */}
      <div className="mb-6">
        <span className="text-sm text-gray-500 dark:text-gray-400">Razón del Match:</span>
        <p className="text-gray-900 dark:text-white leading-relaxed mt-1">{matchReason}</p>
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-4">
        <button className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/80 transition-colors">
          Ver en Mercado Público
        </button>
        <button className="border border-gray-400 text-gray-900 dark:text-white px-6 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
          Ver Productos
        </button>
      </div>
    </div>
  )
}
