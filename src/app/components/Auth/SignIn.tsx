'use client'

import React, { useState } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  TextField,
  Button,
  Typography,
  CircularProgress,
  Alert,
  Divider,
} from '@mui/material'
import GoogleIcon from '@mui/icons-material/Google'
import { useAuth } from '@/contexts/AuthContext'

interface SignInProps {
  open: boolean
  onClose: () => void
  onSwitchToSignUp: () => void
}

export default function SignIn({ open, onClose, onSwitchToSignUp }: SignInProps) {
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

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ fontSize: '1.5rem', fontWeight: 700, mb: 2 }}>
        Sign In to BookNest
      </DialogTitle>

      <DialogContent>
        {emailSent ? (
          // Email Sent Success State
          <Box sx={{ textAlign: 'center', py: 3 }}>
            <Alert severity="success" sx={{ mb: 2 }}>
              Check your email for a sign-in link! This link will expire in 24 hours.
            </Alert>
            <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
              We&apos;ve sent a secure link to <strong>{email}</strong>
            </Typography>
            <Button
              variant="text"
              onClick={() => {
                setEmailSent(false)
                setEmail('')
              }}
              sx={{ color: 'primary.main' }}
            >
              Try a different email
            </Button>
          </Box>
        ) : (
          // Sign In Form
          <Box component="form" onSubmit={handleEmailSignIn} sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
            {error && <Alert severity="error">{error}</Alert>}

            {/* Email Input */}
            <TextField
              label="Email Address"
              type="email"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              required
              placeholder="you@example.com"
              variant="outlined"
            />

            {/* Sign In Button */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading || !email}
              sx={{
                py: 1.5,
                fontSize: '1rem',
                fontWeight: 600,
                textTransform: 'none',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              }}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Continue with Email'}
            </Button>

            {/* Divider */}
            <Divider sx={{ my: 1 }}>OR</Divider>

            {/* Google Sign In */}
            <Button
              fullWidth
              variant="outlined"
              startIcon={<GoogleIcon />}
              onClick={handleGoogleSignIn}
              disabled={loading}
              sx={{
                py: 1.5,
                fontSize: '1rem',
                fontWeight: 600,
                textTransform: 'none',
                borderColor: '#e0e0e0',
              }}
            >
              Sign In with Google
            </Button>

            {/* Sign Up Link */}
            <Box sx={{ textAlign: 'center', mt: 2 }}>
              <Typography variant="body2" color="textSecondary">
                Don&apos;t have an account?{' '}
                <Button
                  variant="text"
                  onClick={() => {
                    handleClose()
                    onSwitchToSignUp()
                  }}
                  sx={{
                    p: 0,
                    textTransform: 'none',
                    color: 'primary.main',
                    fontWeight: 600,
                  }}
                >
                  Sign up
                </Button>
              </Typography>
            </Box>
          </Box>
        )}
      </DialogContent>
    </Dialog>
  )
}
