'use client'

import { Copy, Star, ExternalLink, Eye } from 'lucide-react'
import { useState } from 'react'

interface ListItemProps {
  id: string
  title: string
  description: string
  budget: string
  organization: string
  closingDate: string
  region: string
  isFavorite?: boolean
}

function ListItem({ id, title, description, budget, organization, closingDate, region, isFavorite = false }: ListItemProps) {
  const [favorite, setFavorite] = useState(isFavorite)

  return (
    <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <span className="text-sm text-gray-500 dark:text-gray-400 font-mono">{id}</span>
            <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
              <Copy className="h-4 w-4" />
            </button>
          </div>
          
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">{title}</h3>
          
          <p className="text-gray-600 dark:text-gray-300 text-sm mb-3 line-clamp-2">{description}</p>
          
          <div className="flex flex-wrap gap-4 text-sm">
            <div>
              <span className="text-gray-500 dark:text-gray-400">Presupuesto:</span>
              <span className="ml-1 font-semibold text-secondary">{budget}</span>
            </div>
            <div>
              <span className="text-gray-500 dark:text-gray-400">Organismo:</span>
              <span className="ml-1 text-gray-900 dark:text-white">{organization}</span>
            </div>
            <div>
              <span className="text-gray-500 dark:text-gray-400">Cierre:</span>
              <span className="ml-1 text-primary">{closingDate}</span>
            </div>
            <div>
              <span className="text-gray-500 dark:text-gray-400">Región:</span>
              <span className="ml-1 text-gray-900 dark:text-white">{region}</span>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col items-end space-y-2 ml-4">
          <button 
            onClick={() => setFavorite(!favorite)}
            className={`p-2 rounded-lg transition-colors ${
              favorite 
                ? 'text-primary bg-primary/10' 
                : 'text-gray-400 hover:text-primary hover:bg-primary/10'
            }`}
          >
            <Star className={`h-5 w-5 ${favorite ? 'fill-current' : ''}`} />
          </button>
          
          <div className="flex space-x-2">
            <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-dark-600 rounded-lg transition-colors">
              <Eye className="h-4 w-4" />
            </button>
            <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-dark-600 rounded-lg transition-colors">
              <ExternalLink className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

interface ListViewProps {
  matches: ListItemProps[]
}

export default function ListView({ matches }: ListViewProps) {
  return (
    <div className="space-y-4">
      {matches.map((match) => (
        <ListItem key={match.id} {...match} />
      ))}
    </div>
  )
}
