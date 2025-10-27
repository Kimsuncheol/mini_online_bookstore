import React from 'react'
import Tabbar from '@/app/components/common/Tabbar/Tabbar'

interface BookLayoutProps {
  children: React.ReactNode
}

export default function BookLayout({ children }: BookLayoutProps) {
  return (
    <main>
      <Tabbar />
      {children}
    </main>
  )
}
