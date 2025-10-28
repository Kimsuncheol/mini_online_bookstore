import React from 'react'
import Tabbar from '@/app/components/common/Tabbar/Tabbar'

interface AuthorLayoutProps {
  children: React.ReactNode
}

export default function AuthorLayout({ children }: AuthorLayoutProps) {
  return (
    <main>
      <Tabbar />
      {children}
    </main>
  )
}
