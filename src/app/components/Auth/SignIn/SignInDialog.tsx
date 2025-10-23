'use client'

import React, { useState } from 'react'
import { Dialog, DialogTitle, DialogContent } from '@mui/material'
import { useAuth } from '@/contexts/AuthContext'
import SignInForm from './SignInForm'
import SignInSuccess from './SignInSuccess'

interface SignInDialogProps {
  open: boolean
  onClose: () => void
  onSwitchToSignUp: () => void
}

export default function SignInDialog({
  open,
  onClose,
  onSwitchToSignUp,
}: SignInDialogProps) {
  const [email, setEmail] = useState('')
  const [emailSent, setEmailSent] = useState(false)
  const { signInWithEmail, signInWithGoogle, error, clearError, loading } = useAuth()

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await signInWithEmail(email)
      setEmailSent(true)
    } catch (err) {
      console.error('Sign in error:', err)
    }
  }

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle()
      handleClose()
    } catch (err) {
      console.error('Google sign in error:', err)
    }
  }

  const handleClose = () => {
    setEmail('')
    setEmailSent(false)
    clearError()
    onClose()
  }

  const handleTryDifferentEmail = () => {
    setEmailSent(false)
    setEmail('')
  }

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ fontSize: '1.5rem', fontWeight: 700, mb: 2 }}>
        Sign In to BookNest
      </DialogTitle>

      <DialogContent>
        {emailSent ? (
          <SignInSuccess
            email={email}
            onTryDifferentEmail={handleTryDifferentEmail}
          />
        ) : (
          <SignInForm
            email={email}
            onEmailChange={setEmail}
            onEmailSubmit={handleEmailSignIn}
            onGoogleSignIn={handleGoogleSignIn}
            onSwitchToSignUp={() => {
              handleClose()
              onSwitchToSignUp()
            }}
            error={error}
            loading={loading}
          />
        )}
      </DialogContent>
    </Dialog>
  )
}
