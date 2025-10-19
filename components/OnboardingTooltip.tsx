'use client'

import { X, ChevronLeft, ChevronRight, SkipForward } from 'lucide-react'
import { useOnboarding } from '../contexts/OnboardingContext'

export default function OnboardingTooltip() {
  const { 
    isOnboardingActive, 
    currentStep, 
    steps, 
    nextStep, 
    prevStep, 
    skipOnboarding,
    completeOnboarding 
  } = useOnboarding()

  if (!isOnboardingActive) return null

  const currentStepData = steps[currentStep]
  const progress = ((currentStep + 1) / steps.length) * 100

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-50 z-40" />
      
      {/* Tooltip */}
      <div className="fixed z-50 bg-white dark:bg-dark-700 rounded-lg shadow-xl border border-gray-200 dark:border-gray-600 p-6 max-w-sm">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
              <span className="text-primary font-semibold text-sm">{currentStep + 1}</span>
            </div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {currentStep + 1} de {steps.length}
            </span>
          </div>
          <button
            onClick={skipOnboarding}
            className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            title="Saltar tutorial"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 dark:bg-dark-600 rounded-full h-2 mb-4">
          <div 
            className="bg-primary h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Content */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            {currentStepData.title}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
            {currentStepData.description}
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between">
          <button
            onClick={prevStep}
            disabled={currentStep === 0}
            className="flex items-center space-x-1 px-3 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="text-sm">Anterior</span>
          </button>

          <div className="flex items-center space-x-2">
            <button
              onClick={skipOnboarding}
              className="flex items-center space-x-1 px-3 py-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
            >
              <SkipForward className="h-4 w-4" />
              <span className="text-sm">Saltar</span>
            </button>
            
            <button
              onClick={currentStep === steps.length - 1 ? completeOnboarding : nextStep}
              className="flex items-center space-x-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/80 transition-colors"
            >
              <span className="text-sm">
                {currentStep === steps.length - 1 ? 'Finalizar' : 'Siguiente'}
              </span>
              {currentStep < steps.length - 1 && <ChevronRight className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
