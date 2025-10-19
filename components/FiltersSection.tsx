'use client'

import { RotateCcw, Star, FileSpreadsheet, ChevronDown } from 'lucide-react'
import { useState } from 'react'

interface FiltersSectionProps {
  isKanbanView?: boolean
  showTabs?: boolean
  activeTab?: 'compras-agiles' | 'licitaciones'
  onTabChange?: (tab: 'compras-agiles' | 'licitaciones') => void
}

export default function FiltersSection({ isKanbanView = false, showTabs = false, activeTab = 'compras-agiles', onTabChange }: FiltersSectionProps) {
  const [minAmount, setMinAmount] = useState(0)
  const [selectedRegion, setSelectedRegion] = useState('')
  const [sortBy, setSortBy] = useState('recent')
  const [showFavorites, setShowFavorites] = useState(false)

  return (
    <div className="bg-white dark:bg-dark-800 border-b border-gray-200 dark:border-gray-600 px-6 py-3">
      <div className="flex flex-wrap items-center gap-4">
        {/* Pestañas (solo para Dashboard) */}
        {showTabs && onTabChange && (
          <div className="flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1 mr-4">
            <button
              onClick={() => onTabChange('compras-agiles')}
              className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                activeTab === 'compras-agiles'
                  ? 'bg-white dark:bg-dark-600 text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              Compras Ágiles
            </button>
            <button
              onClick={() => onTabChange('licitaciones')}
              className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                activeTab === 'licitaciones'
                  ? 'bg-white dark:bg-dark-600 text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              Licitaciones
            </button>
          </div>
        )}
        {/* Filter Minimum Amount */}
        <div className="flex items-center space-x-2">
          <span className="text-xs text-gray-600 dark:text-gray-300">Monto Mín:</span>
          <div className="flex items-center space-x-1">
            <input
              type="number"
              value={minAmount}
              onChange={(e) => setMinAmount(Number(e.target.value))}
              className="w-14 bg-gray-100 dark:bg-dark-700 border border-gray-200 dark:border-dark-600 rounded px-2 py-1 text-gray-900 dark:text-white text-xs"
            />
            <div className="w-16 h-1 bg-gray-300 dark:bg-dark-600 rounded-full relative">
              <div 
                className="h-1 bg-primary rounded-full absolute left-0 top-0"
                style={{ width: `${(minAmount / 1000000) * 100}%` }}
              ></div>
            </div>
            <span className="text-xs text-gray-400">${minAmount.toLocaleString()}</span>
          </div>
          <button className="flex items-center space-x-1 text-gray-400 hover:text-white">
            <RotateCcw className="h-3 w-3" />
            <span className="text-xs">Reset</span>
          </button>
        </div>

        {/* Filter by Region */}
        <div className="flex items-center space-x-2">
          <span className="text-xs text-gray-600 dark:text-gray-300">Región:</span>
          <div className="relative">
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="bg-gray-100 dark:bg-dark-700 border border-gray-200 dark:border-dark-600 rounded px-2 py-1 text-gray-900 dark:text-white text-xs appearance-none pr-6"
            >
              <option value="">Seleccionar...</option>
              <option value="magallanes">Magallanes</option>
              <option value="metropolitana">Metropolitana</option>
              <option value="valparaiso">Valparaíso</option>
            </select>
            <ChevronDown className="absolute right-1 top-1/2 transform -translate-y-1/2 h-3 w-3 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* Solo mostrar estos filtros si NO es vista Kanban */}
        {!isKanbanView && (
          <>
            {/* Favorites Filter */}
            <button 
              onClick={() => setShowFavorites(!showFavorites)}
              className={`flex items-center space-x-1 px-2 py-1 rounded text-xs ${
                showFavorites 
                  ? 'bg-primary text-white' 
                  : 'bg-gray-100 dark:bg-dark-700 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              <Star className="h-3 w-3" />
              <span>Favoritas</span>
            </button>

            {/* Sort Options */}
            <div className="flex items-center space-x-2">
              <span className="text-xs text-gray-600 dark:text-gray-300">Orden:</span>
              <div className="flex bg-gray-100 dark:bg-dark-700 rounded">
                <button
                  onClick={() => setSortBy('closing')}
                  className={`px-2 py-1 text-xs rounded-l ${
                    sortBy === 'closing' 
                      ? 'bg-secondary text-white' 
                      : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  Cierre
                </button>
                <button
                  onClick={() => setSortBy('recent')}
                  className={`px-2 py-1 text-xs rounded-r ${
                    sortBy === 'recent' 
                      ? 'bg-secondary text-white' 
                      : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  Recientes
                </button>
              </div>
            </div>
          </>
        )}

        {/* Export Button - Siempre visible */}
        <button className="flex items-center space-x-1 bg-secondary text-white px-2 py-1 rounded text-xs hover:bg-secondary/80">
          <FileSpreadsheet className="h-3 w-3" />
          <span>Excel</span>
        </button>
      </div>
    </div>
  )
}
