'use client'

import { Moon } from 'lucide-react'
import { useTheme } from '../contexts/ThemeContext'

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <div className="flex items-center justify-center space-x-3">
      {/* Moon Icon */}
      <div className="flex items-center justify-center">
        <Moon className={`h-4 w-4 transition-colors duration-300 ${
          theme === 'dark' ? 'text-white' : 'text-gray-700'
        }`} />
      </div>
      
      {/* Toggle Switch */}
      <div className="relative flex items-center justify-center">
        <button
          onClick={toggleTheme}
          className={`w-6 h-1.5 rounded-full transition-all duration-300 focus:outline-none ${
            theme === 'dark' ? 'bg-gray-700' : 'bg-gray-300'
          }`}
          title={`Cambiar a tema ${theme === 'dark' ? 'claro' : 'oscuro'}`}
        >
          {/* Toggle Thumb */}
          <div 
            className={`absolute top-1/2 transform -translate-y-1/2 w-4 h-4 rounded-full transition-all duration-300 ${
              theme === 'dark' 
                ? 'right-0 translate-x-2 bg-secondary' 
                : 'left-0 -translate-x-2 bg-gray-600'
            }`}
          />
        </button>
      </div>
    </div>
  )
}
