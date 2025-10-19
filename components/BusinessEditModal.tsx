'use client'

import React, { useState } from 'react'
import { X, Copy, Lightbulb, Save, RotateCcw } from 'lucide-react'

interface BusinessEditModalProps {
  isOpen: boolean
  onClose: () => void
  businessLine: {
    id: string
    name: string
    description: string
    fullDescription: string
  } | null
  onSave: (id: string, newDescription: string) => void
}

export default function BusinessEditModal({ isOpen, onClose, businessLine, onSave }: BusinessEditModalProps) {
  const [editedDescription, setEditedDescription] = useState('')
  const [copied, setCopied] = useState(false)

  // Inicializar el estado cuando se abre el modal
  React.useEffect(() => {
    if (isOpen && businessLine) {
      setEditedDescription(businessLine.fullDescription)
    }
  }, [isOpen, businessLine])

  const handleCopy = () => {
    navigator.clipboard.writeText(businessLine?.fullDescription || '')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleSave = () => {
    if (businessLine && editedDescription.trim()) {
      onSave(businessLine.id, editedDescription.trim())
      onClose()
    }
  }

  const handleReset = () => {
    setEditedDescription(businessLine?.fullDescription || '')
  }

  if (!isOpen || !businessLine) return null

  const recommendations = [
    "Menciona los años de experiencia en el mercado",
    "Incluye los tipos de clientes que atiendes (particulares, empresas, etc.)",
    "Destaca productos o servicios principales",
    "Agrega información sobre ubicación o cobertura geográfica",
    "Menciona certificaciones o reconocimientos importantes"
  ]

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-dark-800 rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Editar Descripción - {businessLine.name}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Recomendaciones */}
        <div className="mb-6">
          <div className="flex items-center space-x-2 mb-3">
            <Lightbulb className="h-4 w-4 text-yellow-500" />
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Recomendaciones para Mejorar
            </h3>
          </div>
          <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4 border border-yellow-200 dark:border-yellow-800">
            <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
              {recommendations.map((rec, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <span className="text-yellow-600 dark:text-yellow-400 mt-1">•</span>
                  <span>{rec}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Editor de descripción */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Descripción
            </h3>
            <div className="flex items-center space-x-3">
              <button
                onClick={handleCopy}
                className="flex items-center space-x-1 text-xs text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
              >
                <Copy className="h-3 w-3" />
                <span>{copied ? 'Copiado!' : 'Copiar'}</span>
              </button>
              <button
                onClick={handleReset}
                className="flex items-center space-x-1 text-xs text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
              >
                <RotateCcw className="h-3 w-3" />
                <span>Restaurar</span>
              </button>
            </div>
          </div>
          <textarea
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
            className="w-full h-40 bg-white dark:bg-dark-700 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
            placeholder="Escribe la descripción aquí..."
          />
          <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            {editedDescription.length} caracteres
          </div>
        </div>

        {/* Botones de acción */}
        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            disabled={!editedDescription.trim()}
            className="flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/80 disabled:bg-gray-300 dark:disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors"
          >
            <Save className="h-4 w-4" />
            <span>Guardar Cambios</span>
          </button>
        </div>
      </div>
    </div>
  )
}
