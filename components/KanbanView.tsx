'use client'

import { Plus, Star } from 'lucide-react'
import { useState, useEffect } from 'react'

interface KanbanCard {
  id: string
  title: string
  description: string
  budget: string
  organization: string
  closingDate: string
  region: string
  isFavorite?: boolean
}

interface KanbanColumn {
  id: string
  title: string
  cards: KanbanCard[]
  color: string
}

interface KanbanViewProps {
  initialColumns?: KanbanColumn[]
  matches?: any[]
}

export default function KanbanView({ initialColumns, matches }: KanbanViewProps) {
  const [columns, setColumns] = useState<KanbanColumn[]>(
    initialColumns || [
      {
        id: 'new',
        title: 'Nuevas',
        color: 'bg-blue-100 dark:bg-blue-900/20',
        cards: [
          {
            id: '3704-229-COT25',
            title: 'Adquirir cordón eléctrico y luminarias de calle',
            description: 'Adquirir 200 metros de cordón eléctrico H05VVF 3x2, 50 mm, negro y 4 luminarias de calle domiciliaria 460 LM solar.',
            budget: '$600.000',
            organization: 'Ilustre Municipalidad de Cabo de Hornos',
            closingDate: '22 de octubre de 2025',
            region: 'Región de Magallanes y de la Antártica',
            isFavorite: false
          }
        ]
      },
      {
        id: 'reviewing',
        title: 'En Revisión',
        color: 'bg-blue-100 dark:bg-blue-900/20',
        cards: []
      },
      {
        id: 'interested',
        title: 'Interesado',
        color: 'bg-blue-100 dark:bg-blue-900/20',
        cards: []
      },
      {
        id: 'applied',
        title: 'Postulado',
        color: 'bg-blue-100 dark:bg-blue-900/20',
        cards: []
      }
    ]
  )

  const [newColumnTitle, setNewColumnTitle] = useState('')
  const [showAddColumn, setShowAddColumn] = useState(false)
  const [draggedCard, setDraggedCard] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const [dragPosition, setDragPosition] = useState({ x: 0, y: 0 })
  const [cardDimensions, setCardDimensions] = useState({ width: 0, height: 0 })

  // Distribuir las matches en las columnas cuando se reciban
  useEffect(() => {
    if (matches && matches.length > 0 && !initialColumns) {
      const favoritas = matches.filter(match => match.isFavorite).slice(0, 4)
      const interesadas = matches.filter(match => !match.isFavorite).slice(0, 4)
      const enRevision = matches.filter(match => !match.isFavorite).slice(4, 8)
      
      setColumns([
        {
          id: 'favorites',
          title: 'Favoritas',
          color: 'bg-blue-100 dark:bg-blue-900/20',
          cards: favoritas.map(match => ({
            id: match.id,
            title: match.title,
            description: match.description,
            budget: match.budget,
            organization: match.organization,
            closingDate: match.closingDate,
            region: match.region,
            isFavorite: match.isFavorite
          }))
        },
        {
          id: 'interested',
          title: 'Interesado',
          color: 'bg-blue-100 dark:bg-blue-900/20',
          cards: interesadas.map(match => ({
            id: match.id,
            title: match.title,
            description: match.description,
            budget: match.budget,
            organization: match.organization,
            closingDate: match.closingDate,
            region: match.region,
            isFavorite: match.isFavorite
          }))
        },
        {
          id: 'reviewing',
          title: 'En Revisión',
          color: 'bg-blue-100 dark:bg-blue-900/20',
          cards: enRevision.map(match => ({
            id: match.id,
            title: match.title,
            description: match.description,
            budget: match.budget,
            organization: match.organization,
            closingDate: match.closingDate,
            region: match.region,
            isFavorite: match.isFavorite
          }))
        },
        {
          id: 'applied',
          title: 'Postulado',
          color: 'bg-blue-100 dark:bg-blue-900/20',
          cards: []
        }
      ])
    }
  }, [matches, initialColumns])

  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (!isDragging || !draggedCard) return
      setDragPosition({ x: e.clientX, y: e.clientY })
    }

    const handleGlobalMouseUp = (e: MouseEvent) => {
      if (!isDragging || !draggedCard) return
      
      setIsDragging(false)
      
      // Encontrar la columna sobre la que se soltó
      const elementBelow = document.elementFromPoint(e.clientX, e.clientY)
      const columnElement = elementBelow?.closest('[data-column-id]') as HTMLElement
      
      if (columnElement) {
        const targetColumnId = columnElement.dataset.columnId
        if (targetColumnId) {
          // Encontrar la columna origen
          const sourceColumn = columns.find(col => col.cards.some(card => card.id === draggedCard))
          const targetColumn = columns.find(col => col.id === targetColumnId)
          
          if (sourceColumn && targetColumn && sourceColumn.id !== targetColumnId) {
            const cardToMove = sourceColumn.cards.find(card => card.id === draggedCard)
            if (cardToMove) {
              setColumns(columns.map(col => {
                if (col.id === sourceColumn.id) {
                  return { ...col, cards: col.cards.filter(card => card.id !== draggedCard) }
                }
                if (col.id === targetColumnId) {
                  return { ...col, cards: [...col.cards, cardToMove] }
                }
                return col
              }))
            }
          }
        }
      }
      
      setDraggedCard(null)
    }

    if (isDragging) {
      document.addEventListener('mousemove', handleGlobalMouseMove)
      document.addEventListener('mouseup', handleGlobalMouseUp)
    }

    return () => {
      document.removeEventListener('mousemove', handleGlobalMouseMove)
      document.removeEventListener('mouseup', handleGlobalMouseUp)
    }
  }, [isDragging, draggedCard, columns])

  const addNewColumn = () => {
    if (newColumnTitle.trim()) {
      const newColumn: KanbanColumn = {
        id: `column-${Date.now()}`,
        title: newColumnTitle,
        cards: [],
        color: 'bg-blue-100 dark:bg-blue-900/20'
      }
      setColumns([...columns, newColumn])
      setNewColumnTitle('')
      setShowAddColumn(false)
    }
  }

  const handleMouseDown = (e: React.MouseEvent, cardId: string) => {
    e.preventDefault()
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    })
    setCardDimensions({
      width: rect.width,
      height: rect.height
    })
    setDraggedCard(cardId)
    setIsDragging(true)
    setDragPosition({ x: e.clientX, y: e.clientY })
  }



  const ColumnCard = ({ card, columnId }: { card: KanbanCard, columnId: string }) => {
    // Función para truncar título a 55 caracteres
    const truncateTitle = (title: string, maxLength: number = 55) => {
      if (title.length <= maxLength) return title
      return title.substring(0, maxLength) + '...'
    }

    return (
      <div
        onMouseDown={(e) => handleMouseDown(e, card.id)}
        className={`drag-card bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg p-4 mb-3 hover:shadow-md transition-all cursor-grab select-none ${
          draggedCard === card.id ? 'opacity-50 shadow-lg z-50 dragging' : 'hover:scale-[1.02]'
        }`}
        style={{
          position: draggedCard === card.id ? 'fixed' : 'relative',
          left: draggedCard === card.id ? dragPosition.x - dragOffset.x : 'auto',
          top: draggedCard === card.id ? dragPosition.y - dragOffset.y : 'auto',
          pointerEvents: draggedCard === card.id ? 'none' : 'auto',
          width: draggedCard === card.id ? `${cardDimensions.width}px` : 'auto',
          height: draggedCard === card.id ? `${cardDimensions.height}px` : '160px', // Altura fija
          overflow: draggedCard === card.id ? 'hidden' : 'visible',
          boxSizing: 'border-box',
          minHeight: '160px', // Altura mínima fija
          maxHeight: '160px'  // Altura máxima fija
        }}
      >
        <div className="flex items-start justify-between mb-2">
          <span className="text-xs text-gray-500 dark:text-gray-400 font-mono">{card.id}</span>
        </div>
        
        <h4 
          className="font-semibold text-gray-900 dark:text-white text-sm mb-2 leading-tight"
          title={card.title} // Tooltip con título completo
        >
          {truncateTitle(card.title)}
        </h4>
        
        <div className="space-y-1 text-xs">
          <div className="flex justify-between">
            <span className="text-gray-500 dark:text-gray-400">Presupuesto:</span>
            <span className="font-semibold text-secondary">{card.budget}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 dark:text-gray-400">Cierre:</span>
            <span className="text-primary">{card.closingDate}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 dark:text-gray-400">Región:</span>
            <span className="text-gray-900 dark:text-white truncate ml-2">{card.region}</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex space-x-6 overflow-x-auto pb-4">
      {columns.map((column) => (
        <div key={column.id} className="flex-shrink-0 w-80">
          <div className={`${column.color} rounded-lg p-4`} data-column-id={column.id}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                {column.id === 'favorites' && (
                  <Star className="h-4 w-4 text-gray-400" />
                )}
                <h3 className="font-semibold text-gray-900 dark:text-white">{column.title}</h3>
              </div>
              <span className="bg-white dark:bg-dark-600 text-gray-600 dark:text-gray-300 text-xs px-2 py-1 rounded-full">
                {column.cards.length}
              </span>
            </div>
            
            <div className="min-h-[200px] transition-colors">
              {column.cards.map((card) => (
                <ColumnCard key={card.id} card={card} columnId={column.id} />
              ))}
            </div>
          </div>
        </div>
      ))}
      
      {/* Add Column Button */}
      <div className="flex-shrink-0 w-80">
        {showAddColumn ? (
          <div className="bg-white dark:bg-dark-700 border-2 border-dashed border-gray-300 dark:border-dark-600 rounded-lg p-4">
            <input
              type="text"
              placeholder="Nombre de la columna"
              value={newColumnTitle}
              onChange={(e) => setNewColumnTitle(e.target.value)}
              className="w-full bg-transparent border border-gray-200 dark:border-gray-600 rounded px-3 py-2 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-primary"
              autoFocus
            />
            <div className="flex space-x-2 mt-3">
              <button
                onClick={addNewColumn}
                className="bg-primary text-white px-3 py-1 rounded text-sm hover:bg-primary/80 transition-colors"
              >
                Agregar
              </button>
              <button
                onClick={() => {
                  setShowAddColumn(false)
                  setNewColumnTitle('')
                }}
                className="bg-gray-200 dark:bg-dark-600 text-gray-700 dark:text-gray-300 px-3 py-1 rounded text-sm hover:bg-gray-300 dark:hover:bg-dark-500 transition-colors"
              >
                Cancelar
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setShowAddColumn(true)}
            className="w-full bg-white dark:bg-dark-700 border-2 border-dashed border-gray-300 dark:border-dark-600 rounded-lg p-6 text-center hover:border-primary hover:text-primary transition-colors"
          >
            <Plus className="h-8 w-8 mx-auto mb-2 text-gray-400" />
            <span className="text-gray-600 dark:text-gray-300">Agregar Columna</span>
          </button>
        )}
      </div>

      <style jsx>{`
        .drag-card {
          user-select: none;
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
        }
        
        .drag-card[draggable="true"]:hover {
          transform: scale(1.02);
          transition: transform 0.2s ease;
        }
        
        .drag-card[draggable="true"]:active {
          transform: scale(1.05);
        }
        
        .drag-card:focus {
          outline: none;
        }
        
        .drag-card {
          height: 160px !important;
          min-height: 160px !important;
          max-height: 160px !important;
        }
        
        .drag-card.dragging {
          transform: none !important;
          width: ${cardDimensions.width}px !important;
          max-width: ${cardDimensions.width}px !important;
          min-width: ${cardDimensions.width}px !important;
          height: ${cardDimensions.height}px !important;
          max-height: ${cardDimensions.height}px !important;
          min-height: ${cardDimensions.height}px !important;
          overflow: hidden !important;
          box-sizing: border-box !important;
        }
        
        .drag-card.dragging * {
          transform: none !important;
          font-size: inherit !important;
          line-height: inherit !important;
          letter-spacing: inherit !important;
          word-spacing: inherit !important;
        }
      `}</style>
    </div>
  )
}
