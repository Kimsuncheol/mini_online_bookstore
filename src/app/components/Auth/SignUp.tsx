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

interface SignUpProps {
  open: boolean
  onClose: () => void
  onSwitchToSignIn: () => void
}

export default function SignUp({ open, onClose, onSwitchToSignIn }: SignUpProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [signUpSuccess, setSignUpSuccess] = useState(false)
  const [validationError, setValidationError] = useState('')

  const { signUpWithEmail, signInWithGoogle, error, clearError, loading } = useAuth()

  const validateForm = (): boolean => {
    setValidationError('')

    if (!email || !password || !confirmPassword) {
      setValidationError('All fields are required')
      return false
    }

    if (password.length < 6) {
      setValidationError('Password must be at least 6 characters')
      return false
    }

    if (password !== confirmPassword) {
      setValidationError('Passwords do not match')
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
      await signUpWithEmail(email, password, displayName || undefined)
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
    setPassword('')
    setConfirmPassword('')
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
          // Success State
          <Box sx={{ textAlign: 'center', py: 3 }}>
            <Alert severity="success" sx={{ mb: 2 }}>
              Account created successfully! You&apos;re now signed in.
            </Alert>
            <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
              Welcome to BookNest! Start exploring our collection of books.
            </Typography>
            <Button
              variant="contained"
              onClick={handleClose}
              sx={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                textTransform: 'none',
              }}
            >
              Continue to BookNest
            </Button>
          </Box>
        ) : (
          // Sign Up Form
          <Box component="form" onSubmit={handleEmailSignUp} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {error && <Alert severity="error">{error}</Alert>}
            {validationError && <Alert severity="warning">{validationError}</Alert>}

            {/* Display Name Input */}
            <TextField
              label="Full Name"
              type="text"
              fullWidth
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              disabled={loading}
              placeholder="John Doe"
              variant="outlined"
            />

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

            {/* Password Input */}
            <TextField
              label="Password"
              type="password"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              required
              placeholder="At least 6 characters"
              variant="outlined"
              helperText="Must be at least 6 characters"
            />

            {/* Confirm Password Input */}
            <TextField
              label="Confirm Password"
              type="password"
              fullWidth
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              disabled={loading}
              required
              placeholder="Confirm your password"
              variant="outlined"
            />

            {/* Sign Up Button */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading || !email || !password || !confirmPassword}
              sx={{
                py: 1.5,
                fontSize: '1rem',
                fontWeight: 600,
                textTransform: 'none',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                mt: 1,
              }}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Create Account'}
            </Button>

            {/* Divider */}
            <Divider sx={{ my: 1 }}>OR</Divider>

            {/* Google Sign Up */}
            <Button
              fullWidth
              variant="outlined"
              startIcon={<GoogleIcon />}
              onClick={handleGoogleSignUp}
              disabled={loading}
              sx={{
                py: 1.5,
                fontSize: '1rem',
                fontWeight: 600,
                textTransform: 'none',
                borderColor: '#e0e0e0',
              }}
            >
              Sign Up with Google
            </Button>

            {/* Sign In Link */}
            <Box sx={{ textAlign: 'center', mt: 2 }}>
              <Typography variant="body2" color="textSecondary">
                Already have an account?{' '}
                <Button
                  variant="text"
                  onClick={() => {
                    handleClose()
                    onSwitchToSignIn()
                  }}
                  sx={{
                    p: 0,
                    textTransform: 'none',
                    color: 'primary.main',
                    fontWeight: 600,
                  }}
                >
                  Sign in
                </Button>
              </Typography>
            </Box>
          </Box>
        )}
      </DialogContent>
    </Dialog>
  )
}
