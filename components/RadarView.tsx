'use client'

import { useState, useEffect } from 'react'
import { useTheme } from '../contexts/ThemeContext'

interface RadarData {
  id: string
  amount: number
  daysToClose: number
  name: string
  description: string
}

interface RadarViewProps {
  data: RadarData[]
}

export default function RadarView({ data }: RadarViewProps) {
  const { theme } = useTheme()
  const [rotationAngle, setRotationAngle] = useState(0)
  const [zoomLevel, setZoomLevel] = useState(10)

  // Colores dinámicos según el tema
  const radarColors = {
    primary: theme === 'dark' ? '#4ecdc4' : '#ff6b6b',
    grid: theme === 'dark' ? '#4ecdc4' : '#6b7280',
    background: theme === 'dark' ? '#4ecdc4' : '#e5e7eb'
  }

  // Animación de la línea del radar
  useEffect(() => {
    let animationFrameId: number
    let lastTime = 0
    
    const animate = (currentTime: number) => {
      if (currentTime - lastTime >= 16) { // ~60 FPS
        setRotationAngle(prev => (prev + 0.625) % 360)
        lastTime = currentTime
      }
      animationFrameId = requestAnimationFrame(animate)
    }
    
    animationFrameId = requestAnimationFrame(animate)
    
    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId)
      }
    }
  }, [])

  // Función para calcular la posición de un punto basado en días hasta cierre
  const getPointPosition = (daysToClose: number, amount: number, index: number) => {
    // Máximo 30 días para el radio completo
    const maxDays = 30
    const normalizedDays = Math.min(daysToClose / maxDays, 1)
    
    // Radio máximo fijo (más grande)
    const maxRadius = 300
    const radius = normalizedDays * maxRadius
    
    // Ángulo fijo basado en el índice para distribución consistente
    const angle = (index * 51.4) % 360 // Distribución uniforme usando el índice
    const radians = (angle * Math.PI) / 180
    
    const x = radius * Math.cos(radians)
    const y = radius * Math.sin(radians)
    
    return { x, y, radius, angle }
  }

  // Centro fijo del radar
  const svgCenter = 400

  // Función para calcular el tamaño del punto basado en el monto y zoom
  const getPointSize = (amount: number) => {
    const minSize = 25
    const maxSize = 70
    const maxAmount = Math.max(...data.map(d => d.amount), 10000000)
    const normalizedAmount = amount / maxAmount
    const baseSize = minSize + (normalizedAmount * (maxSize - minSize))
    
    // Escalar el tamaño basado en el zoom (zoom más pequeño = puntos más pequeños)
    return baseSize * (zoomLevel / 20)
  }

  // Función para formatear el monto
  const formatAmount = (amount: number) => {
    if (amount >= 1000000) {
      return `${(amount / 1000000).toFixed(1)}M`
    } else if (amount >= 1000) {
      return `${(amount / 1000).toFixed(1)}K`
    }
    return amount.toString()
  }

  return (
    <div className="flex-1 bg-gray-50 dark:bg-dark-900 p-6">
      <div className="flex h-full">
        {/* Contenido principal del radar */}
        <div className="flex-1 flex flex-col">

          {/* Contenedor del radar */}
          <div className="flex-1 flex items-center justify-center">
            <div className="relative">
              {/* SVG del radar */}
              <svg 
                width="1200" 
                height="800" 
                className="drop-shadow-2xl"
                viewBox={`${400 - ((40 - zoomLevel) * 10)} ${400 - ((40 - zoomLevel) * 10)} ${(40 - zoomLevel) * 20} ${(40 - zoomLevel) * 20}`}
              >
                {/* Definir gradientes */}
                <defs>
                  <radialGradient id="radarGradient" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor={radarColors.background} stopOpacity="0.3" />
                    <stop offset="100%" stopColor={radarColors.background} stopOpacity="0.05" />
                  </radialGradient>
                  <linearGradient id="ringGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor={radarColors.grid} stopOpacity="0.8" />
                    <stop offset="100%" stopColor={radarColors.grid} stopOpacity="0.2" />
                  </linearGradient>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                    <feMerge> 
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>

                {/* Fondo del radar */}
                <circle
                  cx={svgCenter}
                  cy={svgCenter}
                  r="300"
                  fill="url(#radarGradient)"
                  className="drop-shadow-lg"
                />

                {/* Círculos concéntricos */}
                {Array.from({ length: 15 }, (_, i) => i + 1).map((ring) => (
                  <circle
                    key={ring}
                    cx={svgCenter}
                    cy={svgCenter}
                    r={ring * 20}
                    fill="none"
                    stroke="url(#ringGradient)"
                    strokeWidth="1.5"
                    opacity="0.6"
                  />
                ))}

                {/* Líneas radiales cada 30 grados */}
                {Array.from({ length: 12 }, (_, i) => {
                  const angle = (i * 30) * (Math.PI / 180)
                  const x = svgCenter + 300 * Math.cos(angle)
                  const y = svgCenter + 300 * Math.sin(angle)
                  
                  return (
                    <line
                      key={i}
                      x1={svgCenter}
                      y1={svgCenter}
                      x2={x}
                      y2={y}
                      stroke={radarColors.grid}
                      strokeWidth="0.5"
                      opacity="0.3"
                    />
                  )
                })}

                {/* Línea giratoria del radar - en el fondo */}
                <line
                  x1={svgCenter}
                  y1={svgCenter}
                  x2={svgCenter + 300 * Math.cos((rotationAngle * Math.PI) / 180)}
                  y2={svgCenter + 300 * Math.sin((rotationAngle * Math.PI) / 180)}
                  stroke={radarColors.grid}
                  strokeWidth="1.5"
                  opacity="0.4"
                  className="drop-shadow-lg"
                />

                {/* Centro del radar - en el fondo */}
                <circle
                  cx={svgCenter}
                  cy={svgCenter}
                  r="8"
                  fill={radarColors.grid}
                  opacity="0.6"
                />

                {/* Puntos de datos */}
                {data.map((point, index) => {
                  const position = getPointPosition(point.daysToClose, point.amount, index)
                  const size = getPointSize(point.amount)
                  const svgX = svgCenter + position.x
                  const svgY = svgCenter + position.y

                  return (
                    <g key={point.id}>
                      {/* Efecto de pulso */}
                      <circle
                        cx={svgX}
                        cy={svgY}
                        r={size / 2 + 5}
                        fill={radarColors.primary}
                        opacity="0.3"
                        className="animate-pulse"
                      />
                      {/* Punto principal */}
                      <circle
                        cx={svgX}
                        cy={svgY}
                        r={size / 2}
                        fill={radarColors.primary}
                        filter="url(#glow)"
                        className="cursor-pointer hover:opacity-80 transition-opacity drop-shadow-lg"
                      />
                      {/* Etiqueta del monto */}
                      <text
                        x={svgX}
                        y={svgY + 5}
                        textAnchor="middle"
                        fill="white"
                        fontSize={Math.max(8, 11 * (zoomLevel / 20))}
                        fontWeight="bold"
                        className="drop-shadow-lg pointer-events-none"
                      >
                        {formatAmount(point.amount)}
                      </text>
                    </g>
                  )
                })}

              </svg>
            </div>
          </div>
        </div>

        {/* Panel de control lateral */}
        <div className="w-80 ml-6">
          {/* Control de zoom */}
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg p-4 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Control de Zoom
            </h3>
            <div className="flex items-center justify-center space-x-4">
              <button
                onClick={() => setZoomLevel(Math.max(10, zoomLevel - 5))}
                className="w-10 h-10 bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 rounded-full flex items-center justify-center text-gray-800 dark:text-white font-bold text-xl transition-colors"
              >
                −
              </button>
              <div className="text-center">
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  Zoom: {zoomLevel}
                </span>
              </div>
              <button
                onClick={() => setZoomLevel(Math.min(30, zoomLevel + 5))}
                className="w-10 h-10 bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 rounded-full flex items-center justify-center text-gray-800 dark:text-white font-bold text-xl transition-colors"
              >
                +
              </button>
            </div>
          </div>

          {/* Guía del radar */}
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-300 mb-3 flex items-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              Guía del Radar
            </h3>
            <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-secondary rounded-full mr-2"></div>
                <span>Centro: Cierre próximo</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-secondary rounded-full mr-2"></div>
                <span>Exterior: Más tiempo</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-secondary rounded-full mr-2"></div>
                <span>Tamaño: Valor compra</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-secondary rounded-full mr-2"></div>
                <span>No verás puntos si no hay coincidencias activas</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #4ecdc4;
          cursor: pointer;
          border: 2px solid #fff;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
        .slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #4ecdc4;
          cursor: pointer;
          border: 2px solid #fff;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
      `}</style>
    </div>
  )
}