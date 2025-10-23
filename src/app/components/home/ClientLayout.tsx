'use client'

import React from 'react'
import Header from '../common/Header'
import { AuthProvider } from '@/contexts/AuthContext'

interface ClientLayoutProps {
  children: React.ReactNode
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  return (
    <AuthProvider>
      <Header />
      {children}
    </AuthProvider>
  )
}
