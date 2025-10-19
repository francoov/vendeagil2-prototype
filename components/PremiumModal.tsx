'use client'

import { X, Star, CheckCircle, Shield, Zap, CreditCard } from 'lucide-react'
import Image from 'next/image'
import { useTheme } from '../contexts/ThemeContext'
import { useEffect, useState } from 'react'

interface PremiumModalProps {
  isOpen: boolean
  onClose: () => void
  feature: {
    id: string
    title: string
    description: string
    price: string
    details: string[]
    benefits: string[]
  }
  onActivate: () => void
}

export default function PremiumModal({ isOpen, onClose, feature, onActivate }: PremiumModalProps) {
  const { theme } = useTheme()
  
  if (!isOpen) return null

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center animate-modal-fade"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 999999,
        margin: 0,
        padding: '1rem'
      }}
    >
      <div className="bg-white dark:bg-dark-800 rounded-lg max-w-4xl w-full max-h-[80vh] overflow-y-auto animate-modal-slide">
        {/* Header with Logo */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-600">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <Image
                src={theme === 'dark' ? '/logo-vendeagil-white.png' : '/logo-vendeagil-dark.png'}
                alt="Vende Ágil"
                width={140}
                height={40}
                className="h-10 w-auto"
              />
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">Funcionalidades Premium</p>
                <p className="text-sm text-gray-700 dark:text-gray-300">Desbloquea el potencial completo de Vende Ágil</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <X className="h-5 w-5 text-gray-500 dark:text-gray-400" />
            </button>
          </div>
          
          {/* Animated Gradient Line */}
          <div className="h-1 bg-gradient-to-r from-orange-400 to-pink-500 rounded-full mb-4"></div>
          
          {/* Title and Description */}
          <div className="text-left">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{feature.title}</h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{feature.description}</p>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Features List */}
            <div className="bg-gray-50 dark:bg-dark-700 rounded-lg p-5">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-4 text-left">¿Qué incluye esta funcionalidad?</h4>
              <ul className="space-y-2">
                {feature.details.map((detail, index) => (
                  <li key={index} className="flex items-start space-x-3 text-left">
                    <CheckCircle className="h-4 w-4 text-secondary mt-1 flex-shrink-0" />
                    <span className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{detail}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Benefits */}
            <div className="bg-gray-50 dark:bg-dark-700 rounded-lg p-5">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-4 text-left">Beneficios para tu negocio</h4>
              <ul className="space-y-2">
                {feature.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start space-x-3 text-left">
                    <CheckCircle className="h-4 w-4 text-secondary mt-1 flex-shrink-0" />
                    <span className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-dark-700">
          <div className="flex items-center justify-between">
            <div className="flex flex-col space-y-2">
              <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                <CreditCard className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                <span>Se agregará {feature.price} a tu facturación mensual</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                <Shield className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                <span>Garantía de satisfacción de 30 días</span>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={onClose}
                className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={onActivate}
                className="text-white px-6 py-2 rounded-lg transition-all font-medium"
                style={{
                  background: 'linear-gradient(to right, #f27e4c, #ef5f6c)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'linear-gradient(to right, #e6733d, #e04a5a)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'linear-gradient(to right, #f27e4c, #ef5f6c)'
                }}
              >
                Activar Funcionalidad
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
