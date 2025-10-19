'use client'

import { useState } from 'react'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import CoincidenciasView from '../components/CoincidenciasView'
import DashboardView from '../components/DashboardView'
import SettingsView from '../components/SettingsView'
import CompanyModal from '../components/CompanyModal'
import OnboardingTooltip from '../components/OnboardingTooltip'
import { OnboardingProvider } from '../contexts/OnboardingContext'

export default function Home() {
  const [currentView, setCurrentView] = useState('dashboard')
  const [currentBusiness, setCurrentBusiness] = useState('Caleta Orilla')
  const [isCompanyModalOpen, setIsCompanyModalOpen] = useState(false)
  const [expandedBusiness, setExpandedBusiness] = useState(false)
  const [companyDescription, setCompanyDescription] = useState(
    "Caleta Orilla es una empresa especializada en ferretería y materiales de construcción. Ofrecemos una amplia gama de productos incluyendo cordones eléctricos, herramientas, materiales de construcción y productos para el hogar. Con más de 10 años de experiencia en el mercado, nos especializamos en atender tanto clientes particulares como empresas del sector construcción."
  )

  // Datos de ejemplo con 10 coincidencias
  const matches = [
    {
      id: "3704-229-COT25",
      title: "Adquirir cordón eléctrico y luminarias de calle",
      description: "Adquirir 200 metros de cordón eléctrico H05VVF 3x2, 50 mm, negro y 4 luminarias de calle domiciliaria 460 LM solar.",
      publicationDate: "17 de octubre de 2025, 14:46",
      budget: "$600.000",
      organization: "Ilustre Municipalidad de Cabo de Hornos",
      registeredDate: "17 de octubre de 2025, 14:57",
      closingDate: "22 de octubre de 2025, 18:30",
      region: "Región de Magallanes y de la Antártica",
      purchaseUnit: "Adquisiciones",
      matchReason: "Caleta Orilla ofrece artículos de ferretería, que pueden incluir cordones eléctricos. Sin embargo, no menciona luminarias.",
      isFavorite: false
    },
    {
      id: "3704-230-COT26",
      title: "Suministro de materiales de construcción",
      description: "Adquisición de cemento, ladrillos, varillas de acero y otros materiales básicos para proyecto de construcción municipal.",
      publicationDate: "18 de octubre de 2025, 09:15",
      budget: "$1.2M",
      organization: "Municipalidad de Puerto Natales",
      registeredDate: "18 de octubre de 2025, 09:30",
      closingDate: "25 de octubre de 2025, 16:00",
      region: "Región de Magallanes y de la Antártica",
      purchaseUnit: "Obras Públicas",
      matchReason: "Caleta Orilla tiene experiencia en materiales de construcción y cuenta con stock disponible.",
      isFavorite: true
    },
    {
      id: "3704-231-COT27",
      title: "Servicios de mantenimiento eléctrico",
      description: "Servicios de mantenimiento preventivo y correctivo para sistemas eléctricos de edificios municipales.",
      publicationDate: "19 de octubre de 2025, 11:20",
      budget: "$450.000",
      organization: "Municipalidad de Porvenir",
      registeredDate: "19 de octubre de 2025, 11:45",
      closingDate: "28 de octubre de 2025, 14:00",
      region: "Región de Magallanes y de la Antártica",
      purchaseUnit: "Mantenimiento",
      matchReason: "Caleta Orilla puede ofrecer servicios eléctricos básicos y suministro de materiales eléctricos.",
      isFavorite: false
    },
    {
      id: "3704-232-COT28",
      title: "Compra de herramientas industriales",
      description: "Adquisición de herramientas para mantenimiento industrial incluyendo taladros, sierras y equipos de soldadura.",
      publicationDate: "20 de octubre de 2025, 08:30",
      budget: "$800.000",
      organization: "Empresa Nacional del Petróleo",
      registeredDate: "20 de octubre de 2025, 08:45",
      closingDate: "30 de octubre de 2025, 17:00",
      region: "Región de Magallanes y de la Antártica",
      purchaseUnit: "Mantenimiento Industrial",
      matchReason: "Caleta Orilla cuenta con amplio stock de herramientas industriales y ferretería especializada.",
      isFavorite: true
    },
    {
      id: "3704-233-COT29",
      title: "Suministro de pinturas y accesorios",
      description: "Compra de pinturas para exteriores, brochas, rodillos y accesorios para pintura de edificios municipales.",
      publicationDate: "21 de octubre de 2025, 13:15",
      budget: "$350.000",
      organization: "Municipalidad de Río Gallegos",
      registeredDate: "21 de octubre de 2025, 13:30",
      closingDate: "02 de noviembre de 2025, 12:00",
      region: "Región de Magallanes y de la Antártica",
      purchaseUnit: "Obras y Mantenimiento",
      matchReason: "Caleta Orilla ofrece productos de pintura y accesorios para construcción y mantenimiento.",
      isFavorite: false
    },
    {
      id: "3704-234-COT30",
      title: "Adquisición de equipos de seguridad",
      description: "Compra de cascos, guantes, arneses y equipos de protección personal para obra municipal.",
      publicationDate: "22 de octubre de 2025, 10:00",
      budget: "$280.000",
      organization: "Municipalidad de Ushuaia",
      registeredDate: "22 de octubre de 2025, 10:15",
      closingDate: "05 de noviembre de 2025, 16:30",
      region: "Región de Magallanes y de la Antártica",
      purchaseUnit: "Recursos Humanos",
      matchReason: "Caleta Orilla tiene stock de equipos de seguridad y protección personal para construcción.",
      isFavorite: true
    },
    {
      id: "3704-235-COT31",
      title: "Instalación de sistema de iluminación LED",
      description: "Proyecto de modernización de alumbrado público con tecnología LED para ahorro energético.",
      publicationDate: "23 de octubre de 2025, 15:45",
      budget: "$2.5M",
      organization: "Gobierno Regional de Magallanes",
      registeredDate: "23 de octubre de 2025, 16:00",
      closingDate: "10 de noviembre de 2025, 18:00",
      region: "Región de Magallanes y de la Antártica",
      purchaseUnit: "Infraestructura",
      matchReason: "Caleta Orilla puede suministrar materiales eléctricos para sistemas de iluminación.",
      isFavorite: false
    },
    {
      id: "3704-236-COT32",
      title: "Mantenimiento de instalaciones sanitarias",
      description: "Servicios de mantenimiento y reparación de sistemas sanitarios en edificios públicos.",
      publicationDate: "24 de octubre de 2025, 09:20",
      budget: "$420.000",
      organization: "Servicio de Salud Magallanes",
      registeredDate: "24 de octubre de 2025, 09:35",
      closingDate: "12 de noviembre de 2025, 14:00",
      region: "Región de Magallanes y de la Antártica",
      purchaseUnit: "Mantenimiento Hospitalario",
      matchReason: "Caleta Orilla puede ofrecer materiales y herramientas para mantenimiento sanitario.",
      isFavorite: true
    },
    {
      id: "3704-237-COT33",
      title: "Construcción de parque infantil",
      description: "Proyecto de construcción de área recreativa con materiales de construcción y mobiliario.",
      publicationDate: "25 de octubre de 2025, 11:30",
      budget: "$1.8M",
      organization: "Municipalidad de Punta Arenas",
      registeredDate: "25 de octubre de 2025, 11:45",
      closingDate: "15 de noviembre de 2025, 17:00",
      region: "Región de Magallanes y de la Antártica",
      purchaseUnit: "Desarrollo Comunitario",
      matchReason: "Caleta Orilla tiene experiencia en materiales de construcción para proyectos comunitarios.",
      isFavorite: false
    },
    {
      id: "3704-238-COT34",
      title: "Modernización de sistema eléctrico",
      description: "Actualización de tableros eléctricos y cableado para edificio administrativo municipal.",
      publicationDate: "26 de octubre de 2025, 14:10",
      budget: "$950.000",
      organization: "Municipalidad de Natales",
      registeredDate: "26 de octubre de 2025, 14:25",
      closingDate: "18 de noviembre de 2025, 16:00",
      region: "Región de Magallanes y de la Antártica",
      purchaseUnit: "Obras y Construcción",
      matchReason: "Caleta Orilla puede suministrar materiales eléctricos para modernización de sistemas.",
      isFavorite: true
    }
  ]

  const handleCompanyDescriptionSave = (newDescription: string) => {
    setCompanyDescription(newDescription)
  }

  // Datos de ejemplo para licitaciones
  const licitaciones = [
    {
      id: "LIC-2025-001",
      title: "Licitación para construcción de centro comunitario",
      description: "Construcción completa de centro comunitario incluyendo instalaciones eléctricas, sanitarias y equipamiento.",
      publicationDate: "15 de octubre de 2025, 10:00",
      budget: "$15.000.000",
      organization: "Municipalidad de Punta Arenas",
      registeredDate: "15 de octubre de 2025, 10:15",
      closingDate: "30 de noviembre de 2025, 17:00",
      region: "Región de Magallanes y de la Antártica",
      purchaseUnit: "Obras Públicas",
      matchReason: "Caleta Orilla puede participar como proveedor de materiales de construcción y ferretería para el proyecto.",
      isFavorite: false
    },
    {
      id: "LIC-2025-002",
      title: "Servicios de mantenimiento de infraestructura municipal",
      description: "Servicios integrales de mantenimiento para edificios municipales incluyendo sistemas eléctricos y de gas.",
      publicationDate: "16 de octubre de 2025, 14:30",
      budget: "$8.500.000",
      organization: "Municipalidad de Natales",
      registeredDate: "16 de octubre de 2025, 14:45",
      closingDate: "15 de noviembre de 2025, 16:00",
      region: "Región de Magallanes y de la Antártica",
      purchaseUnit: "Servicios Generales",
      matchReason: "Caleta Orilla puede ofrecer servicios de mantenimiento eléctrico y suministro de repuestos.",
      isFavorite: true
    },
    {
      id: "LIC-2025-003",
      title: "Adquisición de equipamiento para hospital regional",
      description: "Compra de equipamiento médico y sistemas de apoyo para el nuevo hospital regional de Magallanes.",
      publicationDate: "17 de octubre de 2025, 09:15",
      budget: "$25.000.000",
      organization: "Servicio de Salud Magallanes",
      registeredDate: "17 de octubre de 2025, 09:30",
      closingDate: "20 de noviembre de 2025, 18:00",
      region: "Región de Magallanes y de la Antártica",
      purchaseUnit: "Equipamiento Médico",
      matchReason: "Caleta Orilla puede participar en la provisión de sistemas eléctricos y de soporte para el equipamiento médico.",
      isFavorite: false
    },
    {
      id: "LIC-2025-004",
      title: "Modernización de red eléctrica municipal",
      description: "Proyecto de modernización y ampliación de la red eléctrica del centro histórico de Punta Arenas.",
      publicationDate: "18 de octubre de 2025, 11:45",
      budget: "$12.000.000",
      organization: "Municipalidad de Punta Arenas",
      registeredDate: "18 de octubre de 2025, 12:00",
      closingDate: "25 de noviembre de 2025, 17:30",
      region: "Región de Magallanes y de la Antártica",
      purchaseUnit: "Infraestructura",
      matchReason: "Caleta Orilla es especialista en materiales eléctricos y puede participar como proveedor principal.",
      isFavorite: true
    },
    {
      id: "LIC-2025-005",
      title: "Construcción de terminal de buses interurbano",
      description: "Construcción de terminal de buses con instalaciones comerciales y servicios complementarios.",
      publicationDate: "19 de octubre de 2025, 16:20",
      budget: "$18.000.000",
      organization: "Gobierno Regional de Magallanes",
      registeredDate: "19 de octubre de 2025, 16:35",
      closingDate: "28 de noviembre de 2025, 16:00",
      region: "Región de Magallanes y de la Antártica",
      purchaseUnit: "Infraestructura Regional",
      matchReason: "Caleta Orilla puede participar en la provisión de materiales de construcción y sistemas eléctricos.",
      isFavorite: false
    },
    {
      id: "LIC-2025-006",
      title: "Servicios de limpieza y mantenimiento de espacios públicos",
      description: "Servicios integrales de limpieza, mantenimiento y conservación de parques y espacios públicos municipales.",
      publicationDate: "20 de octubre de 2025, 08:45",
      budget: "$5.200.000",
      organization: "Municipalidad de Porvenir",
      registeredDate: "20 de octubre de 2025, 09:00",
      closingDate: "22 de noviembre de 2025, 15:00",
      region: "Región de Magallanes y de la Antártica",
      purchaseUnit: "Servicios Municipales",
      matchReason: "Caleta Orilla puede ofrecer herramientas y equipos para mantenimiento de espacios verdes.",
      isFavorite: false
    },
    {
      id: "LIC-2025-007",
      title: "Instalación de sistema de iluminación LED en calles principales",
      description: "Instalación completa de sistema de iluminación LED para principales avenidas del centro de Punta Arenas.",
      publicationDate: "21 de octubre de 2025, 13:10",
      budget: "$9.800.000",
      organization: "Municipalidad de Punta Arenas",
      registeredDate: "21 de octubre de 2025, 13:25",
      closingDate: "18 de noviembre de 2025, 17:00",
      region: "Región de Magallanes y de la Antártica",
      purchaseUnit: "Obras Públicas",
      matchReason: "Caleta Orilla tiene experiencia en sistemas de iluminación y puede ser proveedor principal del proyecto.",
      isFavorite: true
    },
    {
      id: "LIC-2025-008",
      title: "Construcción de centro deportivo municipal",
      description: "Construcción de complejo deportivo con canchas, gimnasio y servicios complementarios para la comunidad.",
      publicationDate: "22 de octubre de 2025, 10:30",
      budget: "$22.000.000",
      organization: "Municipalidad de Puerto Natales",
      registeredDate: "22 de octubre de 2025, 10:45",
      closingDate: "30 de noviembre de 2025, 16:30",
      region: "Región de Magallanes y de la Antártica",
      purchaseUnit: "Obras Públicas",
      matchReason: "Caleta Orilla puede participar en la provisión de materiales de construcción y sistemas eléctricos para el complejo deportivo.",
      isFavorite: false
    },
    {
      id: "LIC-2025-009",
      title: "Mantenimiento de sistemas de calefacción municipal",
      description: "Servicios de mantenimiento preventivo y correctivo para sistemas de calefacción de edificios municipales.",
      publicationDate: "23 de octubre de 2025, 15:15",
      budget: "$3.500.000",
      organization: "Municipalidad de Cabo de Hornos",
      registeredDate: "23 de octubre de 2025, 15:30",
      closingDate: "25 de noviembre de 2025, 14:00",
      region: "Región de Magallanes y de la Antártica",
      purchaseUnit: "Mantenimiento",
      matchReason: "Caleta Orilla puede ofrecer servicios de mantenimiento y repuestos para sistemas de calefacción.",
      isFavorite: false
    },
    {
      id: "LIC-2025-010",
      title: "Adquisición de equipamiento para biblioteca municipal",
      description: "Compra de mobiliario, equipamiento tecnológico y sistemas de climatización para nueva biblioteca municipal.",
      publicationDate: "24 de octubre de 2025, 12:00",
      budget: "$7.200.000",
      organization: "Municipalidad de Punta Arenas",
      registeredDate: "24 de octubre de 2025, 12:15",
      closingDate: "28 de noviembre de 2025, 17:00",
      region: "Región de Magallanes y de la Antártica",
      purchaseUnit: "Cultura y Educación",
      matchReason: "Caleta Orilla puede participar en la provisión de sistemas eléctricos y de climatización para la biblioteca.",
      isFavorite: true
    }
  ]

  const handleExpandBusiness = () => {
    setExpandedBusiness(prev => !prev)
  }

  const renderMainContent = () => {
    switch (currentView) {
      case 'dashboard':
        return <DashboardView />
      case 'compras-agiles':
        return <CoincidenciasView matches={matches} />
      case 'licitaciones':
        return <CoincidenciasView matches={licitaciones} />
      case 'coincidencias':
        return <CoincidenciasView matches={matches} />
      case 'busqueda':
        return (
          <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Búsqueda de Compra</h1>
            <p className="text-gray-600 dark:text-gray-400">Funcionalidad de búsqueda avanzada en desarrollo...</p>
          </div>
        )
      case 'configuracion':
        return <SettingsView />
      default:
        return <DashboardView />
    }
  }

  return (
    <OnboardingProvider>
      <div className="flex h-screen bg-gray-50 dark:bg-dark-900">
        {/* Sidebar */}
        <div id="sidebar" className="flex-shrink-0">
          <Sidebar 
            activeView={currentView} 
            onViewChange={setCurrentView} 
            expandedBusiness={expandedBusiness} 
            currentBusiness={currentBusiness} 
          />
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <Header currentBusiness={currentBusiness} currentView={currentView} onExpandBusiness={handleExpandBusiness} />
          
          {/* Content */}
          <div className="flex-1 overflow-auto">
            {renderMainContent()}
          </div>
        </div>

        {/* Company Modal */}
        <CompanyModal
          isOpen={isCompanyModalOpen}
          onClose={() => setIsCompanyModalOpen(false)}
          companyName={currentBusiness}
          currentDescription={companyDescription}
          onSave={handleCompanyDescriptionSave}
        />

        {/* Onboarding */}
        <OnboardingTooltip />
      </div>
    </OnboardingProvider>
  )
}
