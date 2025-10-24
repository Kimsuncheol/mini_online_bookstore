import React from 'react'
import Tabbar from '../components/common/Tabbar/Tabbar'

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
      <Tabbar />
      {children}
    </main>
  )
}
