'use client'

import { useTheme } from '../contexts/ThemeContext'
import Image from 'next/image'

interface LogoProps {
  className?: string
}

export default function Logo({ className = "h-8 w-auto" }: LogoProps) {
  const { theme } = useTheme()

  // Logo para tema claro (usar logo oscuro)
  const DarkLogo = () => (
    <Image
      src="/logo-vendeagil-dark.png"
      alt="Vende Ágil Logo"
        width={140}
        height={40}
      className={className}
      priority
    />
  )

  // Logo para tema oscuro (usar logo claro)
  const LightLogo = () => (
    <Image
      src="/logo-vendeagil-white.png"
      alt="Vende Ágil Logo"
        width={140}
        height={40}
      className={className}
      priority
    />
  )

  return theme === 'dark' ? <LightLogo /> : <DarkLogo />
}
