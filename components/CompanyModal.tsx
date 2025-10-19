'use client'

import { X, Save, Building2, FileText } from 'lucide-react'
import { useState } from 'react'

interface CompanyModalProps {
  isOpen: boolean
  onClose: () => void
  companyName: string
  currentDescription: string
  onSave: (description: string) => void
}

export default function CompanyModal({ 
  isOpen, 
  onClose, 
  companyName, 
  currentDescription, 
  onSave 
}: CompanyModalProps) {
  const [description, setDescription] = useState(currentDescription)

  if (!isOpen) return null

  const handleSave = () => {
    onSave(description)
    onClose()
  }

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={handleOverlayClick}
    >
      <div className="bg-white dark:bg-dark-700 rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-600">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Building2 className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Descripción de Empresa
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">{companyName}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-600 rounded-lg transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5" />
              <div>
                <h3 className="text-sm font-medium text-blue-900 dark:text-blue-300">
                  Información importante
                </h3>
                <p className="text-sm text-blue-700 dark:text-blue-400 mt-1">
                  Una descripción clara y detallada de tu empresa ayuda a mejorar la precisión de las coincidencias. 
                  Incluye los productos o servicios que ofreces, tu especialización y cualquier información relevante.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Descripción de la empresa
            </label>
            <div className="relative">
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full h-64 bg-gray-50 dark:bg-dark-600 border border-gray-200 dark:border-dark-500 rounded-lg px-4 py-3 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary resize-none text-left"
                placeholder="Describe tu empresa, productos y servicios que ofreces..."
                style={{ textAlign: 'left' }}
              />
            </div>
            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
              <span>Mínimo 50 caracteres recomendado</span>
              <span>{description.length} caracteres</span>
            </div>
          </div>

          {/* Sugerencias */}
          <div className="bg-gray-50 dark:bg-dark-600 rounded-lg p-4">
            <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
              Sugerencias para una mejor descripción:
            </h4>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li className="flex items-start space-x-2">
                <span className="text-primary mt-1">•</span>
                <span>Incluye los productos o servicios principales que ofreces</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-primary mt-1">•</span>
                <span>Menciona tu especialización o nicho de mercado</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-primary mt-1">•</span>
                <span>Especifica las regiones donde operas</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-primary mt-1">•</span>
                <span>Incluye certificaciones o acreditaciones relevantes</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-primary mt-1">•</span>
                <span>Añade información sobre tu experiencia y años en el mercado</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end space-x-3 p-6 border-t border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-dark-600">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 dark:text-gray-300 bg-white dark:bg-dark-700 border border-gray-200 dark:border-dark-500 rounded-lg hover:bg-gray-50 dark:hover:bg-dark-600 transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            disabled={description.length < 10}
            className="flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Save className="h-4 w-4" />
            <span>Guardar Descripción</span>
          </button>
        </div>
      </div>
    </div>
  )
}
