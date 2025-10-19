'use client'

import { useState } from 'react'
import RadarView from './RadarView'
import FiltersSection from './FiltersSection'

export default function DashboardView() {
  const [activeTab, setActiveTab] = useState<'compras-agiles' | 'licitaciones'>('compras-agiles')

  // Datos de ejemplo para el radar - Compras Ágiles
  const radarDataComprasAgiles = [
    {
      id: '1',
      amount: 1000000,
      daysToClose: 1,
      name: 'Materiales Eléctricos',
      description: 'Suministro de materiales eléctricos'
    },
    {
      id: '2',
      amount: 500000,
      daysToClose: 5,
      name: 'Construcción',
      description: 'Materiales de construcción'
    },
    {
      id: '3',
      amount: 1500000,
      daysToClose: 12,
      name: 'Ferretería',
      description: 'Herramientas y ferretería'
    },
    {
      id: '4',
      amount: 900000,
      daysToClose: 20,
      name: 'Plomería',
      description: 'Materiales de plomería'
    },
    {
      id: '5',
      amount: 3300000,
      daysToClose: 25,
      name: 'Techos',
      description: 'Materiales para techos'
    },
    {
      id: '6',
      amount: 1800000,
      daysToClose: 8,
      name: 'Pintura',
      description: 'Pinturas y accesorios'
    },
    {
      id: '7',
      amount: 6900000,
      daysToClose: 15,
      name: 'Carpintería',
      description: 'Materiales de carpintería'
    }
  ]

  // Datos de ejemplo para el radar - Licitaciones
  const radarDataLicitaciones = [
    {
      id: 'LIC-1',
      amount: 15000000,
      daysToClose: 5,
      name: 'Centro Comunitario',
      description: 'Construcción de centro comunitario'
    },
    {
      id: 'LIC-2',
      amount: 8500000,
      daysToClose: 12,
      name: 'Mantenimiento Municipal',
      description: 'Servicios de mantenimiento'
    },
    {
      id: 'LIC-3',
      amount: 25000000,
      daysToClose: 8,
      name: 'Hospital Regional',
      description: 'Equipamiento médico'
    },
    {
      id: 'LIC-4',
      amount: 12000000,
      daysToClose: 15,
      name: 'Red Eléctrica',
      description: 'Modernización eléctrica'
    },
    {
      id: 'LIC-5',
      amount: 18000000,
      daysToClose: 20,
      name: 'Terminal Buses',
      description: 'Construcción terminal'
    },
    {
      id: 'LIC-6',
      amount: 9800000,
      daysToClose: 3,
      name: 'Iluminación LED',
      description: 'Sistema iluminación'
    },
    {
      id: 'LIC-7',
      amount: 22000000,
      daysToClose: 25,
      name: 'Centro Deportivo',
      description: 'Complejo deportivo'
    }
  ]

  const currentRadarData = activeTab === 'compras-agiles' ? radarDataComprasAgiles : radarDataLicitaciones

  return (
    <div className="flex-1 flex flex-col">
      {/* Filtros con Pestañas */}
      <div id="filters-section">
        <FiltersSection 
          showTabs={true}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
      </div>

      {/* Radar */}
      <RadarView data={currentRadarData} />
    </div>
  )
}