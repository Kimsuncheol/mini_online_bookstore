import React, { ReactNode } from 'react'

interface SearchLayoutProps {
  children: ReactNode
}

export const metadata = {
  title: 'Search Books | BookNest',
  description: 'Search for books, authors, and categories with advanced search features and AI recommendations.',
}

export default function SearchLayout({ children }: SearchLayoutProps) {
  return (
    <div>
      {children}
    </div>
  )
}
