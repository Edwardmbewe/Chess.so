'use client'

import { useContext } from 'react'
import { AuthContext } from '@/context/AuthContext'

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}

export const useTheme = () => {
  const [isDark, setIsDark] = useContext(ThemeContext) as [boolean, (value: boolean) => void]
  
  const toggleTheme = () => {
    const newValue = !isDark
    setIsDark(newValue)
    localStorage.setItem('chess-theme', newValue ? 'dark' : 'light')
    document.documentElement.classList.toggle('dark')
  }

  return { isDark, toggleTheme }
}

import { ThemeContext } from '@/context/AuthContext'
