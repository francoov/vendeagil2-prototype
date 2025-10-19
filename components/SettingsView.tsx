'use client'

import { Bell, Mail, CreditCard, FileText, BarChart3, Code, Lock } from 'lucide-react'
import React, { useState } from 'react'
import PremiumModal from './PremiumModal'

export default function SettingsView() {
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [dailyEmailLimit, setDailyEmailLimit] = useState(20)
  
  // Estados para el modal - enfoque completamente nuevo
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalFeature, setModalFeature] = useState<any>(null)
  const [activeFeatures, setActiveFeatures] = useState<string[]>([])

  // Datos de las funcionalidades premium
  const premiumFeatures = {
    technicalAnalysis: {
      id: 'technicalAnalysis',
      title: 'Análisis de Bases Técnicas',
      description: 'Identifica puntos relevantes y tareas para completar licitaciones y compras ágiles',
      price: '$15.000',
      details: [
        'Análisis automático de bases técnicas de licitaciones',
        'Identificación de requisitos críticos y puntos clave',
        'Lista de tareas organizadas por prioridad',
        'Alertas de cumplimiento de requisitos técnicos',
        'Reportes detallados de análisis'
      ],
      benefits: [
        'Aumenta tus posibilidades de ganar licitaciones',
        'Reduce el tiempo de análisis manual',
        'Evita errores en la presentación de propuestas',
        'Mejora la calidad de tus ofertas'
      ]
    },
    whatsappNotifications: {
      id: 'whatsappNotifications',
      title: 'Notificaciones WhatsApp',
      description: 'Recibe alertas instantáneas sobre nuevas oportunidades directamente en tu WhatsApp',
      price: '$8.000',
      details: [
        'Notificaciones instantáneas por WhatsApp',
        'Alertas personalizables por tipo de oportunidad',
        'Notificaciones de vencimientos próximos',
        'Mensajes de oportunidades favoritas',
        'Configuración de horarios de notificación'
      ],
      benefits: [
        'No pierdas ninguna oportunidad importante',
        'Responde más rápido a las licitaciones',
        'Mantente informado en tiempo real',
        'Optimiza tu tiempo de trabajo'
      ]
    },
    predictiveAnalysis: {
      id: 'predictiveAnalysis',
      title: 'Análisis Predictivo',
      description: 'Predice oportunidades futuras basándose en patrones históricos y tendencias de mercado',
      price: '$25.000',
      details: [
        'Análisis de patrones históricos de licitaciones',
        'Predicción de oportunidades futuras',
        'Tendencias de mercado y estacionalidad',
        'Análisis de competencia y probabilidades',
        'Reportes predictivos mensuales'
      ],
      benefits: [
        'Anticípate a las oportunidades del mercado',
        'Planifica mejor tus recursos y estrategias',
        'Identifica nichos de mercado rentables',
        'Optimiza tu pipeline de oportunidades'
      ]
    },
    apiAccess: {
      id: 'apiAccess',
      title: 'Acceso API Vende Ágil',
      description: 'Automatizaciones propias con acceso completo a la API de Vende Ágil',
      price: '$20.000',
      details: [
        'Acceso completo a la API REST de Vende Ágil',
        'Documentación técnica detallada',
        'Soporte técnico para integraciones',
        'Webhooks para automatizaciones',
        'Límites generosos de requests'
      ],
      benefits: [
        'Automatiza tus procesos de negocio',
        'Integra con tus sistemas existentes',
        'Desarrolla soluciones personalizadas',
        'Escala tu operación eficientemente'
      ]
    }
  }

  // Función para abrir el modal - NO afecta ningún toggle
  const openModal = (featureId: string) => {
    setModalFeature(premiumFeatures[featureId as keyof typeof premiumFeatures])
    setIsModalOpen(true)
  }

  // Función para cerrar el modal
  const closeModal = () => {
    setIsModalOpen(false)
    setModalFeature(null)
  }

  // Función para activar funcionalidad
  const activateFeature = () => {
    if (modalFeature) {
      setActiveFeatures(prev => [...prev, modalFeature.id])
    }
    closeModal()
  }

  // Función para desactivar funcionalidad
  const deactivateFeature = (featureId: string) => {
    setActiveFeatures(prev => prev.filter(id => id !== featureId))
  }

  return (
    <div className="p-6 space-y-8">

      {/* Notificaciones */}
      <div className="bg-white dark:bg-dark-700 rounded-lg border border-gray-200 dark:border-gray-600 p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
            <Bell className="h-6 w-6 text-gray-600 dark:text-gray-400" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Notificaciones</h2>
            <p className="text-gray-600 dark:text-gray-400">Configura cómo y cuándo recibir notificaciones.</p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-900 dark:text-white">Notificaciones por correo</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Recibe alertas por correo electrónico sobre nuevas coincidencias.</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={emailNotifications}
                onChange={(e) => setEmailNotifications(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 dark:peer-focus:ring-primary/20 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-900 dark:text-white">Límite diario de correos</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Número máximo de correos que puedes recibir por día (por defecto: 20).</p>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="number"
                min="1"
                max="100"
                value={dailyEmailLimit}
                onChange={(e) => setDailyEmailLimit(Number(e.target.value))}
                className="w-20 bg-gray-100 dark:bg-dark-600 border border-gray-200 dark:border-dark-500 rounded px-3 py-1 text-gray-900 dark:text-white text-sm focus:outline-none focus:border-primary"
              />
              <span className="text-sm text-gray-500 dark:text-gray-400">correos/día</span>
            </div>
          </div>
        </div>
      </div>

      {/* Funcionalidades Avanzadas */}
      <div className="bg-white dark:bg-dark-700 rounded-lg border border-transparent p-6 premium-gradient-border">
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
            <CreditCard className="h-6 w-6 text-gray-600 dark:text-gray-400" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Funcionalidades Avanzadas</h2>
            <p className="text-gray-600 dark:text-gray-400">Activa funcionalidades premium con costo adicional para potenciar tu experiencia.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            {/* Análisis de Bases Técnicas */}
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-dark-600 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
                  <FileText className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white">Análisis de Bases Técnicas</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Identifica puntos relevantes y tareas para completar licitaciones</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {activeFeatures.includes('technicalAnalysis') ? (
                  <button
                    onClick={() => deactivateFeature('technicalAnalysis')}
                    className="relative inline-flex items-center cursor-pointer"
                  >
                    <div 
                      className="w-11 h-6 rounded-full transition-all"
                      style={{
                        background: 'linear-gradient(to right, #f27e4c, #ef5f6c)',
                      }}
                    >
                      <div className="w-5 h-5 bg-white rounded-full transition-all translate-x-full" style={{marginTop: '2px', marginLeft: '6px'}}></div>
                    </div>
                  </button>
                ) : (
                  <button
                    onClick={() => openModal('technicalAnalysis')}
                    className="relative inline-flex items-center cursor-pointer"
                  >
                    <div className="w-11 h-6 rounded-full transition-all bg-gray-200 dark:bg-gray-700">
                      <div className="w-5 h-5 bg-white rounded-full transition-all translate-x-0" style={{marginTop: '2px', marginLeft: '2px'}}></div>
                    </div>
                  </button>
                )}
              </div>
            </div>

            {/* Notificaciones WhatsApp */}
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-dark-600 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
                  <Bell className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white">Notificaciones WhatsApp</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Recibe alertas instantáneas por WhatsApp</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {activeFeatures.includes('whatsappNotifications') ? (
                  <button
                    onClick={() => deactivateFeature('whatsappNotifications')}
                    className="relative inline-flex items-center cursor-pointer"
                  >
                    <div 
                      className="w-11 h-6 rounded-full transition-all"
                      style={{
                        background: 'linear-gradient(to right, #f27e4c, #ef5f6c)',
                      }}
                    >
                      <div className="w-5 h-5 bg-white rounded-full transition-all translate-x-full" style={{marginTop: '2px', marginLeft: '6px'}}></div>
                    </div>
                  </button>
                ) : (
                  <button
                    onClick={() => openModal('whatsappNotifications')}
                    className="relative inline-flex items-center cursor-pointer"
                  >
                    <div className="w-11 h-6 rounded-full transition-all bg-gray-200 dark:bg-gray-700">
                      <div className="w-5 h-5 bg-white rounded-full transition-all translate-x-0" style={{marginTop: '2px', marginLeft: '2px'}}></div>
                    </div>
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {/* Análisis Predictivo */}
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-dark-600 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
                  <BarChart3 className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white">Análisis Predictivo</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Predice oportunidades futuras basándose en patrones históricos</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {activeFeatures.includes('predictiveAnalysis') ? (
                  <button
                    onClick={() => deactivateFeature('predictiveAnalysis')}
                    className="relative inline-flex items-center cursor-pointer"
                  >
                    <div 
                      className="w-11 h-6 rounded-full transition-all"
                      style={{
                        background: 'linear-gradient(to right, #f27e4c, #ef5f6c)',
                      }}
                    >
                      <div className="w-5 h-5 bg-white rounded-full transition-all translate-x-full" style={{marginTop: '2px', marginLeft: '6px'}}></div>
                    </div>
                  </button>
                ) : (
                  <button
                    onClick={() => openModal('predictiveAnalysis')}
                    className="relative inline-flex items-center cursor-pointer"
                  >
                    <div className="w-11 h-6 rounded-full transition-all bg-gray-200 dark:bg-gray-700">
                      <div className="w-5 h-5 bg-white rounded-full transition-all translate-x-0" style={{marginTop: '2px', marginLeft: '2px'}}></div>
                    </div>
                  </button>
                )}
              </div>
            </div>

            {/* Acceso API */}
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-dark-600 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
                  <Code className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white">Acceso API Vende Ágil</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Automatizaciones propias con acceso completo a la API</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {activeFeatures.includes('apiAccess') ? (
                  <button
                    onClick={() => deactivateFeature('apiAccess')}
                    className="relative inline-flex items-center cursor-pointer"
                  >
                    <div 
                      className="w-11 h-6 rounded-full transition-all"
                      style={{
                        background: 'linear-gradient(to right, #f27e4c, #ef5f6c)',
                      }}
                    >
                      <div className="w-5 h-5 bg-white rounded-full transition-all translate-x-full" style={{marginTop: '2px', marginLeft: '6px'}}></div>
                    </div>
                  </button>
                ) : (
                  <button
                    onClick={() => openModal('apiAccess')}
                    className="relative inline-flex items-center cursor-pointer"
                  >
                    <div className="w-11 h-6 rounded-full transition-all bg-gray-200 dark:bg-gray-700">
                      <div className="w-5 h-5 bg-white rounded-full transition-all translate-x-0" style={{marginTop: '2px', marginLeft: '2px'}}></div>
                    </div>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Premium Modal */}
      <PremiumModal
        isOpen={isModalOpen}
        onClose={closeModal}
        feature={modalFeature}
        onActivate={activateFeature}
      />
    </div>
  )
}