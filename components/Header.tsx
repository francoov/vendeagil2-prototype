'use client'

import { Building2, Play } from 'lucide-react'

interface HeaderProps {
  currentBusiness: string
  currentView: string
  onExpandBusiness?: () => void
}

export default function Header({ currentBusiness, currentView, onExpandBusiness }: HeaderProps) {
  const getViewTitle = () => {
    switch (currentView) {
      case 'compras-agiles':
        return { title: 'Compras Ágiles', subtitle: 'Encuentra oportunidades de compras ágiles' }
      case 'licitaciones':
        return { title: 'Licitaciones', subtitle: 'Encuentra oportunidades de licitaciones' }
      case 'coincidencias':
        return { title: 'Coincidencias', subtitle: 'Encuentra oportunidades de negocio' }
      case 'dashboard':
        return { title: 'Radar de Oportunidades', subtitle: 'Visualiza las oportunidades según proximidad de cierre y monto' }
      case 'busqueda':
        return { title: 'Búsqueda de Compra', subtitle: 'Busca nuevas oportunidades' }
      case 'configuracion':
        return { title: 'Configuración', subtitle: 'Configura tus notificaciones, módulos y usuarios' }
      default:
        return { title: 'Vende Ágil', subtitle: 'Plataforma de oportunidades' }
    }
  }

  const { title, subtitle } = getViewTitle()

  return (
    <header className="bg-white dark:bg-dark-800 border-b border-gray-200 dark:border-gray-600 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* View Title and Subtitle */}
        <div>
          <h1 className="text-xl font-semibold text-gray-900 dark:text-white">{title}</h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">{subtitle}</p>
        </div>

        {/* Business Line Name and Demo Button */}
        <div className="flex items-center space-x-3">
          {/* Demo Button */}
          <button className="flex items-center space-x-2 bg-primary text-white px-3 py-2 rounded-lg hover:bg-primary/80 transition-colors">
            <Play className="h-4 w-4" />
            <span className="text-sm font-medium">Demo</span>
          </button>
          
          {/* Business Line Name */}
          <button 
            onClick={onExpandBusiness}
            className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-700 px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors cursor-pointer"
          >
            <Building2 className="h-4 w-4 text-gray-600 dark:text-gray-400" />
            <span className="text-sm text-gray-700 dark:text-gray-300 font-medium">{currentBusiness}</span>
          </button>
        </div>
      </div>
    </header>
  )
}