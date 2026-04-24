'use client'

import { useAuth } from '@/hooks'
import { redirect } from 'next/navigation'

export default function Home() {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white dark:bg-chess-dark-bg">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-chess-green"></div>
      </div>
    )
  }

  if (!user) {
    redirect('/auth/login')
  }

  return (
    <div className="min-h-screen bg-white dark:bg-chess-dark-bg">
      {/* Main Content */}
      <main className="max-w-7xl mx-auto p-4">
        <div className="text-center py-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Welcome to Chess.so
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Your social chess platform. Play, share, connect!
          </p>
          <div className="flex gap-4 justify-center">
            <button className="btn btn-primary">Quick Pair</button>
            <button className="btn btn-secondary">Explore Videos</button>
          </div>
        </div>
      </main>
    </div>
  )
}
