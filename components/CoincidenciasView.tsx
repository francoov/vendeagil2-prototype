'use client'

import { useState } from 'react'
import { Grid, List, Kanban, Search, Info } from 'lucide-react'
import MatchCard from './MatchCard'
import ListView from './ListView'
import KanbanView from './KanbanView'
import FiltersSection from './FiltersSection'

type ViewType = 'cards' | 'list' | 'kanban'

interface CoincidenciasViewProps {
  matches: any[]
}

export default function CoincidenciasView({ matches }: CoincidenciasViewProps) {
  const [currentView, setCurrentView] = useState<ViewType>('cards')
  const [searchQuery, setSearchQuery] = useState('')
  const [showSearchInfo, setShowSearchInfo] = useState(false)

  const viewOptions = [
    { id: 'cards', label: 'Tarjetas', icon: Grid },
    { id: 'list', label: 'Lista', icon: List },
    { id: 'kanban', label: 'Tablero', icon: Kanban }
  ]

  const renderContent = () => {
    switch (currentView) {
      case 'list':
        return <ListView matches={matches} />
      case 'kanban':
        return <KanbanView matches={matches} />
      default:
        return (
          <div className="space-y-4">
            {matches.map((match) => (
              <MatchCard key={match.id} {...match} />
            ))}
          </div>
        )
    }
  }

  return (
    <div className="flex-1">
      {/* Header con buscador y selector de vista */}
      <div className="px-6 py-4 bg-white dark:bg-dark-800 border-b border-gray-200 dark:border-gray-600">
        <div className="flex items-center justify-between">
          {/* Buscador - Lado izquierdo */}
          <div className="w-[500px]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                id="search-bar"
                type="text"
                placeholder="Buscar por descripción, productos, monto, etc."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-gray-100 dark:bg-dark-700 border border-gray-200 dark:border-dark-600 rounded-lg pl-10 pr-10 py-2 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              />
              <button
                onMouseEnter={() => setShowSearchInfo(true)}
                onMouseLeave={() => setShowSearchInfo(false)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <Info className="h-4 w-4" />
              </button>
              
              {/* Search Info Tooltip */}
              {showSearchInfo && (
                <div className="absolute top-full left-0 mt-1 w-80 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-xs p-3 rounded-lg shadow-lg z-50">
                  <p className="font-medium mb-1">Información del buscador:</p>
                  <p>El buscador solo busca en las compras ágiles ya levantadas o coincidencias con tu empresa. No incluye nuevas oportunidades del mercado público.</p>
                </div>
              )}
            </div>
          </div>
          
          {/* Lado derecho - Contador y Selector de vista */}
          <div className="flex items-center space-x-4">
            {/* Contador de coincidencias */}
            <p className="text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">
              Mostrando {matches.length} de {matches.length} coincidencias
            </p>
            
            {/* Selector de vista */}
            <div className="flex bg-gray-100 dark:bg-dark-700 rounded-lg p-1">
              {viewOptions.map((option) => {
                const Icon = option.icon
                return (
                  <button
                    key={option.id}
                    onClick={() => setCurrentView(option.id as ViewType)}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      currentView === option.id
                        ? 'bg-white dark:bg-dark-600 text-gray-900 dark:text-white shadow-sm'
                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                    }`}
                    id="view-toggle"
                  >
                    <Icon className="h-4 w-4" />
                    <span>{option.label}</span>
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Filtros */}
      <div id="filters-section">
        <FiltersSection isKanbanView={currentView === 'kanban'} />
      </div>

      {/* Contenido */}
      <div className="p-6">
        {renderContent()}
      </div>
    </div>
  )
}
