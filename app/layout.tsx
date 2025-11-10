import '../styles/globals.css'
import type { ReactNode } from 'react'

export const metadata = {
  title: 'caster-001',
  description: 'Farcaster mini app (MVP)'
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-gray-900">
        <main className="mx-auto max-w-4xl p-6">{children}</main>
      </body>
    </html>
  )
}
