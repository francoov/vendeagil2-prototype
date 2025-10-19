'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface OnboardingStep {
  id: string
  title: string
  description: string
  target: string
  position: 'top' | 'bottom' | 'left' | 'right'
  component?: string
}

interface OnboardingContextType {
  isOnboardingActive: boolean
  currentStep: number
  steps: OnboardingStep[]
  startOnboarding: () => void
  nextStep: () => void
  prevStep: () => void
  skipOnboarding: () => void
  completeOnboarding: () => void
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined)

const defaultSteps: OnboardingStep[] = [
  {
    id: 'welcome',
    title: '¡Bienvenido a Vende Ágil!',
    description: 'Te guiaremos por las principales funcionalidades de la plataforma para que puedas aprovechar al máximo las oportunidades de mercado público.',
    target: 'sidebar',
    position: 'right'
  },
  {
    id: 'navigation',
    title: 'Navegación Principal',
    description: 'Desde aquí puedes acceder a todas las secciones: Dashboard, Coincidencias, Búsqueda de Compra y Configuración.',
    target: 'sidebar-nav',
    position: 'right'
  },
  {
    id: 'business-lines',
    title: 'Líneas de Negocio',
    description: 'Gestiona diferentes líneas de negocio y cambia entre ellas para ver oportunidades específicas de cada sector.',
    target: 'business-section',
    position: 'right'
  },
  {
    id: 'search-bar',
    title: 'Búsqueda Inteligente',
    description: 'El buscador te permite encontrar coincidencias específicas. Solo busca en compras ágiles ya levantadas o coincidencias con tu empresa.',
    target: 'search-bar',
    position: 'bottom'
  },
  {
    id: 'filters',
    title: 'Filtros Avanzados',
    description: 'Usa los filtros para encontrar exactamente lo que buscas: por monto, región, favoritos o fecha de cierre.',
    target: 'filters-section',
    position: 'bottom'
  },
  {
    id: 'view-options',
    title: 'Opciones de Vista',
    description: 'Cambia entre vista de tarjetas, lista o Kanban según tu preferencia. La vista Kanban te permite organizar oportunidades por estado.',
    target: 'view-toggle',
    position: 'bottom'
  },
  {
    id: 'theme-toggle',
    title: 'Personalización',
    description: 'Cambia entre tema claro y oscuro según tu preferencia. La configuración se guarda automáticamente.',
    target: 'theme-toggle',
    position: 'top'
  },
  {
    id: 'settings',
    title: 'Configuración',
    description: 'Accede a la configuración para personalizar notificaciones, límites de correo y activar módulos premium.',
    target: 'settings-button',
    position: 'right'
  }
]

export function OnboardingProvider({ children }: { children: ReactNode }) {
  const [isOnboardingActive, setIsOnboardingActive] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [steps] = useState(defaultSteps)

  useEffect(() => {
    const hasCompletedOnboarding = localStorage.getItem('onboarding-completed')
    if (!hasCompletedOnboarding) {
      // Iniciar onboarding automáticamente después de 2 segundos
      const timer = setTimeout(() => {
        setIsOnboardingActive(true)
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [])

  const startOnboarding = () => {
    setIsOnboardingActive(true)
    setCurrentStep(0)
  }

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      completeOnboarding()
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const skipOnboarding = () => {
    setIsOnboardingActive(false)
    localStorage.setItem('onboarding-completed', 'true')
  }

  const completeOnboarding = () => {
    setIsOnboardingActive(false)
    setCurrentStep(0)
    localStorage.setItem('onboarding-completed', 'true')
  }

  return (
    <OnboardingContext.Provider value={{
      isOnboardingActive,
      currentStep,
      steps,
      startOnboarding,
      nextStep,
      prevStep,
      skipOnboarding,
      completeOnboarding
    }}>
      {children}
    </OnboardingContext.Provider>
  )
}

export function useOnboarding() {
  const context = useContext(OnboardingContext)
  if (context === undefined) {
    throw new Error('useOnboarding must be used within an OnboardingProvider')
  }
  return context
}
