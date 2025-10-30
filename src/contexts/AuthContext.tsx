'use client'

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { User } from 'firebase/auth'
import {
  sendEmailSignInLink,
  completeEmailSignIn,
  signInWithGooglePopup,
  logOut,
  onAuthStateChangeListener,
} from '@/lib/firebase-auth'

interface AuthContextType {
  user: User | null
  displayName: string
  loading: boolean
  error: string | null
  signInWithEmail: (email: string) => Promise<void>
  completeSignInWithEmail: (email: string) => Promise<User>
  signInWithGoogle: () => Promise<User>
  logout: () => Promise<void>
  clearError: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [displayName, setDisplayName] = useState<string>('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const deriveDisplayName = (authUser: User | null): string => {
    if (!authUser) {
      return ''
    }
    const name = authUser.displayName?.trim()
    if (name) {
      return name
    }
    const emailLocalPart = authUser.email?.split('@')[0]
    return emailLocalPart ?? ''
  }

  // Listen to auth state changes on mount
  useEffect(() => {
    const unsubscribe = onAuthStateChangeListener((authUser) => {
      setUser(authUser)
      setDisplayName(deriveDisplayName(authUser))
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const handleError = (err: unknown): string => {
    if (err instanceof Error) {
      return err.message
    }
    return 'An unexpected error occurred'
  }

  const signInWithEmail = async (email: string) => {
    setLoading(true)
    setError(null)
    try {
      await sendEmailSignInLink(email)
    } catch (err) {
      const errorMsg = handleError(err)
      setError(errorMsg)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const completeSignInWithEmail = async (email: string): Promise<User> => {
    setLoading(true)
    setError(null)
    try {
      const user = await completeEmailSignIn(email)
      setUser(user)
      setDisplayName(deriveDisplayName(user))
      return user
    } catch (err) {
      const errorMsg = handleError(err)
      setError(errorMsg)
      throw err
    } finally {
      setLoading(false)
    }
  }


  const signInWithGoogle = async (): Promise<User> => {
    setLoading(true)
    setError(null)
    try {
      const user = await signInWithGooglePopup()
      setUser(user)
      setDisplayName(deriveDisplayName(user))
      return user
    } catch (err) {
      const errorMsg = handleError(err)
      setError(errorMsg)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const logout = async () => {
    setLoading(true)
    setError(null)
    try {
      await logOut()
      setUser(null)
      setDisplayName('')
    } catch (err) {
      const errorMsg = handleError(err)
      setError(errorMsg)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const clearError = () => {
    setError(null)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        displayName,
        loading,
        error,
        signInWithEmail,
        completeSignInWithEmail,
        signInWithGoogle,
        logout,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
