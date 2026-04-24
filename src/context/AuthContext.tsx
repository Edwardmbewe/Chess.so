'use client'

import React, { createContext, useEffect, useState } from 'react'
import { AuthUser } from '@/types'
import { authService } from '@/lib/services/auth.service'
import { userService } from '@/lib/services/user.service'

export const ThemeContext = createContext<[boolean, (value: boolean) => void] | undefined>(undefined)

interface AuthContextType {
  user: AuthUser | null
  loading: boolean
  error: string | null
  signUp: (email: string, password: string, username: string) => Promise<void>
  signIn: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isDark, setIsDark] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const authUser = await authService.getCurrentUser()
        if (authUser) {
          setUser(authUser as AuthUser)
        }
      } catch (err) {
        console.error('Auth check failed:', err)
      } finally {
        setLoading(false)
      }
    }

    checkAuth()

    // Load theme preference
    const savedTheme = localStorage.getItem('chess-theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const isDarkMode = savedTheme ? savedTheme === 'dark' : prefersDark
    setIsDark(isDarkMode)
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    }
  }, [])

  const signUp = async (email: string, password: string, username: string) => {
    try {
      setError(null)
      const data = await authService.signUp(email, password, username)
      if (data.user) {
        await userService.createUser(data.user.id, email, username)
        setUser(data.user as AuthUser)
      }
    } catch (err: any) {
      setError(err.message)
      throw err
    }
  }

  const signIn = async (email: string, password: string) => {
    try {
      setError(null)
      const data = await authService.signIn(email, password)
      if (data.user) {
        setUser(data.user as AuthUser)
      }
    } catch (err: any) {
      setError(err.message)
      throw err
    }
  }

  const signOut = async () => {
    try {
      setError(null)
      await authService.signOut()
      setUser(null)
    } catch (err: any) {
      setError(err.message)
      throw err
    }
  }

  return (
    <ThemeContext.Provider value={[isDark, setIsDark]}>
      <AuthContext.Provider
        value={{
          user,
          loading,
          error,
          signUp,
          signIn,
          signOut,
        }}
      >
        {children}
      </AuthContext.Provider>
    </ThemeContext.Provider>
  )
}
