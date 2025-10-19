import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '../contexts/ThemeContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Vende Ágil - Coincidencias',
  description: 'Aplicación de coincidencias de mercado público',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <ThemeProvider>
          <div className="min-h-screen bg-gray-50 dark:bg-dark-900 transition-colors">
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
