import React from 'react'

export const metadata = {
  title: 'Books | BookNest',
  description: 'Browse our collection of books and find your next great read',
}

interface BooksLayoutProps {
  children: React.ReactNode
}

export default function BooksLayout({ children }: BooksLayoutProps) {
  return (
    <main>
      {children}
    </main>
  )
}
