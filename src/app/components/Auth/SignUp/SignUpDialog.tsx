'use client'

import React, { useState } from 'react'
import { Dialog, DialogTitle, DialogContent } from '@mui/material'
import { useAuth } from '@/contexts/AuthContext'
import SignUpForm from './SignUpForm'
import SignUpSuccess from './SignUpSuccess'

interface SignUpDialogProps {
  open: boolean
  onClose: () => void
  onSwitchToSignIn: () => void
}

export default function SignUpDialog({
  open,
  onClose,
  onSwitchToSignIn,
}: SignUpDialogProps) {
  const [email, setEmail] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [signUpSuccess, setSignUpSuccess] = useState(false)
  const [validationError, setValidationError] = useState('')

  const { signInWithEmail, signInWithGoogle, error, clearError, loading } = useAuth()

  const validateForm = (): boolean => {
    setValidationError('')

    if (!email) {
      setValidationError('Email is required')
      return false
    }

    return true
  }

  const handleEmailSignUp = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    try {
      // Use email link sign-in for sign-up (same as sign-in)
      await signInWithEmail(email)
      setSignUpSuccess(true)
    } catch (err) {
      console.error('Sign up error:', err)
    }
  }

  const handleGoogleSignUp = async () => {
    try {
      await signInWithGoogle()
      handleClose()
    } catch (err) {
      console.error('Google sign up error:', err)
    }
  }

  const handleClose = () => {
    setEmail('')
    setDisplayName('')
    setSignUpSuccess(false)
    setValidationError('')
    clearError()
    onClose()
  }

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ fontSize: '1.5rem', fontWeight: 700, mb: 2 }}>
        Create Your BookNest Account
      </DialogTitle>

      <DialogContent>
        {signUpSuccess ? (
          <SignUpSuccess email={email} onContinue={handleClose} />
        ) : (
          <SignUpForm
            email={email}
            displayName={displayName}
            onEmailChange={setEmail}
            onDisplayNameChange={setDisplayName}
            onSubmit={handleEmailSignUp}
            onGoogleSignUp={handleGoogleSignUp}
            onSwitchToSignIn={() => {
              handleClose()
              onSwitchToSignIn()
            }}
            error={error}
            validationError={validationError}
            loading={loading}
          />
        )}
      </DialogContent>
    </Dialog>
  )
}
