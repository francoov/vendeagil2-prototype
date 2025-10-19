'use client'

import { 
  LayoutDashboard, 
  Search, 
  Target, 
  Settings, 
  ChevronRight,
  Building2,
  Bell,
  Mail,
  Shield,
  BarChart3,
  Radar,
  LayoutList
} from 'lucide-react'
import React, { useState } from 'react'
import Image from 'next/image'
import { useTheme } from '../contexts/ThemeContext'
import ThemeToggle from './ThemeToggle'
import Logo from './Logo'
import { Edit2 } from 'lucide-react'
import BusinessEditModal from './BusinessEditModal'

interface SidebarProps {
  activeView: string
  onViewChange: (view: string) => void
  expandedBusiness?: boolean
  currentBusiness?: string
}

export default function Sidebar({ activeView, onViewChange, expandedBusiness, currentBusiness }: SidebarProps) {
  const { theme } = useTheme()
  const [expandedSections, setExpandedSections] = useState<string[]>(['business'])
  const [isAnimating, setIsAnimating] = useState(false)
  const [editingBusiness, setEditingBusiness] = useState<string | null>(null)
  const [hoveredBusiness, setHoveredBusiness] = useState<string | null>(null)

  // Manejar la expansión/contracción de la sección
  React.useEffect(() => {
    if (expandedBusiness) {
      // Expandir si no está expandido
      setExpandedSections(prev => 
        prev.includes('business') ? prev : [...prev, 'business']
      )
      // Activar animación
      setIsAnimating(true)
      // Desactivar animación después de 2 segundos
      setTimeout(() => setIsAnimating(false), 2000)
    } else {
      // Contraer si está expandido
      setExpandedSections(prev => 
        prev.filter(s => s !== 'business')
      )
    }
  }, [expandedBusiness])

  const toggleSection = (section: string) => {
    setExpandedSections(prev => 
      prev.includes(section) 
        ? prev.filter(s => s !== section)
        : [...prev, section]
    )
  }

  const handleSaveBusinessDescription = (id: string, newDescription: string) => {
    // Aquí podrías guardar en una base de datos o estado global
    console.log('Guardando descripción para:', id, newDescription)
    // Por ahora solo cerramos el modal
    setEditingBusiness(null)
  }

  const menuItems = [
    {
      id: 'dashboard',
      label: 'Radar de Oportunidades',
      icon: Radar,
      description: 'Visualiza oportunidades'
    },
    {
      id: 'busqueda',
      label: 'Búsqueda de Compra',
      icon: Search,
      description: 'Buscar nuevas oportunidades'
    }
  ]

  const coincidenciasSubmodules = [
    {
      id: 'compras-agiles',
      label: 'Compras Ágiles',
      icon: LayoutList,
      description: 'Ver compras ágiles'
    },
    {
      id: 'licitaciones',
      label: 'Licitaciones',
      icon: LayoutList,
      description: 'Ver licitaciones'
    }
  ]

  const businessLines = [
    { 
      id: 'caleta-orilla', 
      name: 'Caleta Orilla', 
      description: 'Ferretería y materiales',
      fullDescription: 'Caleta Orilla es una empresa especializada en ferretería y materiales de construcción. Ofrecemos una amplia gama de productos incluyendo cordones eléctricos, herramientas, materiales de construcción y productos para el hogar. Con más de 10 años de experiencia en el mercado, nos especializamos en atender tanto clientes particulares como empresas del sector construcción.'
    },
    { 
      id: 'tech-solutions', 
      name: 'Tech Solutions', 
      description: 'Tecnología e informática',
      fullDescription: 'Tech Solutions es una empresa líder en servicios de tecnología e informática. Ofrecemos soluciones integrales en desarrollo de software, consultoría tecnológica, sistemas de información y soporte técnico. Nuestro equipo de expertos brinda servicios a empresas de todos los tamaños, desde startups hasta corporaciones multinacionales.'
    },
    { 
      id: 'construccion-plus', 
      name: 'Construcción Plus', 
      description: 'Materiales de construcción',
      fullDescription: 'Construcción Plus es una empresa especializada en la comercialización de materiales de construcción de alta calidad. Distribuimos cemento, ladrillos, varillas de acero, pinturas y todos los insumos necesarios para proyectos de construcción. Trabajamos directamente con constructoras, arquitectos y empresas del rubro inmobiliario.'
    }
  ]

  return (
    <div className="w-64 bg-white dark:bg-dark-800 border-r border-gray-200 dark:border-gray-600 h-full flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-600">
        <div className="flex items-center justify-center space-x-4">
          <Logo className="h-12 w-auto" />
          <div id="theme-toggle">
            <ThemeToggle />
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav id="sidebar-nav" className="flex-1 p-4 space-y-2">
        {/* Dashboard */}
        {menuItems.filter(item => item.id === 'dashboard').map((item) => {
          const Icon = item.icon
          return (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                activeView === item.id
                  ? 'bg-primary text-white'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-700'
              }`}
              title={item.description}
            >
              <Icon className="h-5 w-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          )
        })}

        {/* Coincidencias - Expandible */}
        <div>
          <button
            onClick={() => toggleSection('coincidencias')}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left transition-colors ${
              activeView === 'compras-agiles' || activeView === 'licitaciones'
                ? 'bg-primary text-white'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-700'
            }`}
            title="Ver oportunidades de mercado"
          >
            <div className="flex items-center space-x-2">
              <LayoutList className="h-5 w-5" />
              <span className="font-medium">Coincidencias</span>
            </div>
            <ChevronRight 
              className={`h-4 w-4 transition-transform ${
                expandedSections.includes('coincidencias') ? 'rotate-90' : ''
              }`} 
            />
          </button>

          {expandedSections.includes('coincidencias') && (
            <div className="mt-2 space-y-1 ml-4">
              {coincidenciasSubmodules.map((submodule) => {
                const Icon = submodule.icon
                return (
                  <button
                    key={submodule.id}
                    onClick={() => onViewChange(submodule.id)}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors text-sm ${
                      activeView === submodule.id
                        ? 'bg-primary text-white'
                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-dark-700'
                    }`}
                    title={submodule.description}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{submodule.label}</span>
                  </button>
                )
              })}
            </div>
          )}
        </div>

        {/* Búsqueda de Compra */}
        {menuItems.filter(item => item.id === 'busqueda').map((item) => {
          const Icon = item.icon
          return (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                activeView === item.id
                  ? 'bg-primary text-white'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-700'
              }`}
              title={item.description}
            >
              <Icon className="h-5 w-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          )
        })}
      </nav>

      {/* Business Lines Section */}
      <div id="business-section" className="p-4 border-t border-gray-200 dark:border-gray-600">
        <button
          onClick={() => toggleSection('business')}
          className="w-full flex items-center justify-between px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-700 rounded-lg transition-colors"
        >
          <div className="flex items-center space-x-2">
            <Building2 className="h-5 w-5" />
            <span className="font-medium">Líneas de Negocio</span>
          </div>
          <ChevronRight 
            className={`h-4 w-4 transition-transform ${
              expandedSections.includes('business') ? 'rotate-90' : ''
            }`} 
          />
        </button>

        {expandedSections.includes('business') && (
          <div className="mt-2 space-y-1">
            {businessLines.map((line) => {
              const isCurrentBusiness = currentBusiness === line.name
              const isHovered = hoveredBusiness === line.id
              return (
                <div
                  key={line.id}
                  className="relative group"
                  onMouseEnter={() => setHoveredBusiness(line.id)}
                  onMouseLeave={() => setHoveredBusiness(null)}
                >
                  <button
                    className={`w-full flex items-start space-x-3 px-6 py-2 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-dark-700 rounded-lg transition-colors ${
                      isCurrentBusiness && isAnimating 
                        ? 'animate-pulse bg-secondary/10 border-2 border-secondary/30' 
                        : isCurrentBusiness
                        ? 'border-2 border-transparent'
                        : ''
                    }`}
                  >
                    <div className={`w-2 h-2 rounded-full mt-2 ${
                      isCurrentBusiness 
                        ? 'bg-secondary' 
                        : 'bg-gray-400'
                    }`}></div>
                    <div className="text-left flex-1">
                      <div className={`font-medium ${
                        isCurrentBusiness 
                          ? 'text-secondary' 
                          : ''
                      }`}>{line.name}</div>
                    </div>
                  </button>
                  
                  {/* Icono de editar que aparece en hover */}
                  {isHovered && (
                    <button
                      onClick={() => setEditingBusiness(line.id)}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors opacity-0 group-hover:opacity-100"
                    >
                      <Edit2 className="h-4 w-4" />
                    </button>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* Settings */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-600">
        <button
          id="settings-button"
          onClick={() => onViewChange('configuracion')}
          className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
            activeView === 'configuracion'
              ? 'bg-primary text-white'
              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-700'
          }`}
          title="Ajustes y preferencias"
        >
          <Settings className="h-5 w-5" />
          <span className="font-medium">Configuración</span>
        </button>
      </div>

      {/* User Profile */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-600">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-full overflow-hidden cursor-pointer">
            <Image
              src="/avatar.jpeg"
              alt="Avatar de usuario"
              width={32}
              height={32}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">María González</p>
            <div className="flex items-center space-x-2">
              <p className="text-xs text-gray-500 dark:text-gray-400">Demo</p>
              <span className="text-xs bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 px-2 py-0.5 rounded-full">
                10 días restantes
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de edición de líneas de negocio */}
      <BusinessEditModal
        isOpen={editingBusiness !== null}
        onClose={() => setEditingBusiness(null)}
        businessLine={businessLines.find(line => line.id === editingBusiness) || null}
        onSave={handleSaveBusinessDescription}
      />

    </div>
  )
}
