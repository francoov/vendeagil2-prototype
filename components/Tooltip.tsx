'use client'

import { useState } from 'react'

interface TooltipProps {
  content: string
  children: React.ReactNode
  position?: 'top' | 'bottom' | 'left' | 'right'
  maxWidth?: string
  minWidth?: string
  maxHeight?: string
}

export default function Tooltip({ content, children, position = 'top', maxWidth = '300px', minWidth = '200px', maxHeight = '200px' }: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false)

  const getPositionClasses = () => {
    switch (position) {
      case 'top':
        return 'bottom-full left-1/2 transform -translate-x-1/2 mb-2'
      case 'bottom':
        return 'top-full left-1/2 transform -translate-x-1/2 mt-2'
      case 'left':
        return 'right-full top-1/2 transform -translate-y-1/2 mr-2'
      case 'right':
        return 'left-full top-1/2 transform -translate-y-1/2 ml-2'
      default:
        return 'bottom-full left-1/2 transform -translate-x-1/2 mb-2'
    }
  }

  const getArrowClasses = () => {
    switch (position) {
      case 'top':
        return 'top-full left-1/2 transform -translate-x-1/2 border-l-transparent border-r-transparent border-b-transparent border-t-gray-900 dark:border-t-gray-700'
      case 'bottom':
        return 'bottom-full left-1/2 transform -translate-x-1/2 border-l-transparent border-r-transparent border-t-transparent border-b-gray-900 dark:border-b-gray-700'
      case 'left':
        return 'left-full top-1/2 transform -translate-y-1/2 border-t-transparent border-b-transparent border-r-transparent border-l-gray-900 dark:border-l-gray-700'
      case 'right':
        return 'right-full top-1/2 transform -translate-y-1/2 border-t-transparent border-b-transparent border-l-transparent border-r-gray-900 dark:border-r-gray-700'
      default:
        return 'top-full left-1/2 transform -translate-x-1/2 border-l-transparent border-r-transparent border-b-transparent border-t-gray-900 dark:border-t-gray-700'
    }
  }

  return (
    <div 
      className="relative inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <div className={`absolute z-50 ${getPositionClasses()}`}>
          <div 
            className={`bg-gray-900 dark:bg-gray-700 text-white text-sm rounded-lg px-4 py-3 shadow-lg whitespace-normal break-words overflow-y-auto`}
            style={{ 
              maxWidth, 
              minWidth,
              maxHeight
            }}
          >
            {content}
            {/* Arrow */}
            <div className={`absolute w-0 h-0 border-4 ${getArrowClasses()}`}></div>
          </div>
        </div>
      )}
    </div>
  )
}
