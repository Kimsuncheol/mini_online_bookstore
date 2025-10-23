'use client'

import React from 'react'
import Header from '../common/Header'
import { AuthProvider } from '@/contexts/AuthContext'
import { CartProvider } from '@/contexts/CartContext'

interface ClientLayoutProps {
  children: React.ReactNode
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  return (
    <AuthProvider>
      <CartProvider>
        <Header />
        {children}
      </CartProvider>
    </AuthProvider>
  )
}
