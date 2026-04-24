import type { Metadata } from 'next'
import './globals.css'
import { Providers } from './providers'

export const metadata: Metadata = {
  title: 'Chess.so - Social Chess Platform',
  description: 'Play chess, share moments, connect with players worldwide',
  keywords: ['chess', 'social', 'gaming', 'online chess', 'multiplayer'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
