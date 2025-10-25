'use client'

import React, { useState } from 'react'
import { Dialog, DialogTitle, DialogContent } from '@mui/material'
import { useAuth } from '@/contexts/AuthContext'
import { signUp } from '@/app/api/user'
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
  const [apiError, setApiError] = useState('')

  const { signInWithEmail, signInWithGoogle, error, clearError, loading } = useAuth()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const validateForm = (): boolean => {
    setValidationError('')

    if (!email) {
      setValidationError('Email is required')
      return false
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setValidationError('Please enter a valid email address')
      return false
    }

    return true
  }

  const handleEmailSignUp = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    setApiError('')

    try {
      // Step 1: Create user in backend database
      const response = await signUp(email, displayName || undefined)
      console.log('User created in database:', response)

      // Step 2: Send Firebase email link for authentication
      await signInWithEmail(email)

      setSignUpSuccess(true)
    } catch (err) {
      console.error('Sign up error:', err)
      setApiError(err instanceof Error ? err.message : 'Failed to sign up')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleGoogleSignUp = async () => {
    setIsSubmitting(true)
    setApiError('')

    try {
      // Sign in with Google first
      const user = await signInWithGoogle()

      // Then create user in backend database
      if (user.email) {
        try {
          await signUp(user.email, user.displayName || undefined)
        } catch (err) {
          // If user already exists in backend, that's okay
          console.log('User may already exist in backend:', err)
        }
      }

      handleClose()
    } catch (err) {
      console.error('Google sign up error:', err)
      setApiError(err instanceof Error ? err.message : 'Failed to sign up with Google')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClose = () => {
    setEmail('')
    setDisplayName('')
    setSignUpSuccess(false)
    setValidationError('')
    setApiError('')
    clearError()
    onClose()
  }

  const combinedError = apiError || error
  const combinedLoading = loading || isSubmitting

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
            error={combinedError}
            validationError={validationError}
            loading={combinedLoading}
          />
        )}
      </DialogContent>
    </Dialog>
  )
}
