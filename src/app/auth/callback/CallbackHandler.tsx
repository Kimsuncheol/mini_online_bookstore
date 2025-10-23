'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Box, CircularProgress, Typography, Alert } from '@mui/material'
import { useAuth } from '@/contexts/AuthContext'

export default function CallbackHandler() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { completeSignInWithEmail, error, clearError } = useAuth()
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')
  const [errorMessage, setErrorMessage] = useState<string>('')

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Get email from URL query parameter
        const email = searchParams.get('email')

        if (!email) {
          setErrorMessage('Email not found in callback URL')
          setStatus('error')
          return
        }

        // Get email from localStorage if not in URL
        const savedEmail = typeof window !== 'undefined'
          ? localStorage.getItem('emailForSignIn')
          : null

        const emailToUse = email || savedEmail

        if (!emailToUse) {
          setErrorMessage('Email information missing. Please try signing in again.')
          setStatus('error')
          return
        }

        // Complete the email sign-in process
        await completeSignInWithEmail(emailToUse)
        setStatus('success')

        // Redirect to home page after successful sign-in
        // Use a small delay to show the success state
        setTimeout(() => {
          router.push('/')
        }, 1500)
      } catch (err) {
        console.error('Callback error:', err)
        const message = error || (err instanceof Error ? err.message : 'Failed to complete sign-in')
        setErrorMessage(message)
        setStatus('error')
      }
    }

    handleCallback()
  }, [searchParams, completeSignInWithEmail, error, router])

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        gap: 3,
        px: 2,
      }}
    >
      {status === 'loading' && (
        <>
          <CircularProgress size={60} />
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Completing your sign-in...
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Please wait while we verify your email
          </Typography>
        </>
      )}

      {status === 'success' && (
        <>
          <Box
            sx={{
              width: 80,
              height: 80,
              borderRadius: '50%',
              backgroundColor: '#4caf50',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography
              sx={{
                fontSize: 48,
                color: 'white',
              }}
            >
              ✓
            </Typography>
          </Box>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Sign-in Successful!
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Redirecting you to BookNest...
          </Typography>
        </>
      )}

      {status === 'error' && (
        <>
          <Alert severity="error" sx={{ maxWidth: 400 }}>
            {errorMessage}
          </Alert>
          <Typography variant="body2" color="textSecondary" sx={{ textAlign: 'center' }}>
            Please try signing in again or contact support if the problem persists.
          </Typography>
        </>
      )}
    </Box>
  )
}
