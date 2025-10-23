'use client'

import React from 'react'
import {
  Box,
  TextField,
  Button,
  Typography,
  CircularProgress,
  Alert,
  Divider,
} from '@mui/material'
import GoogleIcon from '@mui/icons-material/Google'

interface SignUpFormProps {
  email: string
  displayName: string
  onEmailChange: (email: string) => void
  onDisplayNameChange: (displayName: string) => void
  onSubmit: (e: React.FormEvent) => Promise<void>
  onGoogleSignUp: () => Promise<void>
  onSwitchToSignIn: () => void
  error: string | null
  validationError: string
  loading: boolean
}

export default function SignUpForm({
  email,
  displayName,
  onEmailChange,
  onDisplayNameChange,
  onSubmit,
  onGoogleSignUp,
  onSwitchToSignIn,
  error,
  validationError,
  loading,
}: SignUpFormProps) {
  return (
    <Box component="form" onSubmit={onSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {error && <Alert severity="error">{error}</Alert>}
      {validationError && <Alert severity="warning">{validationError}</Alert>}

      {/* Display Name Input */}
      <TextField
        label="Full Name"
        type="text"
        fullWidth
        value={displayName}
        onChange={(e) => onDisplayNameChange(e.target.value)}
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
        onChange={(e) => onEmailChange(e.target.value)}
        disabled={loading}
        required
        placeholder="you@example.com"
        variant="outlined"
      />

      {/* Sign Up Button */}
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
          mt: 1,
        }}
      >
        {loading ? <CircularProgress size={24} color="inherit" /> : 'Continue with Email'}
      </Button>

      {/* Divider */}
      <Divider sx={{ my: 1 }}>OR</Divider>

      {/* Google Sign Up */}
      <Button
        fullWidth
        variant="outlined"
        startIcon={<GoogleIcon />}
        onClick={onGoogleSignUp}
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
            onClick={onSwitchToSignIn}
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
  )
}
