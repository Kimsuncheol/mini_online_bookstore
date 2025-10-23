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

interface SignInFormProps {
  email: string
  onEmailChange: (email: string) => void
  onEmailSubmit: (e: React.FormEvent) => Promise<void>
  onGoogleSignIn: () => Promise<void>
  onSwitchToSignUp: () => void
  error: string | null
  loading: boolean
}

export default function SignInForm({
  email,
  onEmailChange,
  onEmailSubmit,
  onGoogleSignIn,
  onSwitchToSignUp,
  error,
  loading,
}: SignInFormProps) {
  return (
    <Box component="form" onSubmit={onEmailSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
      {error && <Alert severity="error">{error}</Alert>}

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
      <Divider sx={{ my: 1, fontSize: 10, color: 'text.secondary' }}>OR</Divider>

      {/* Google Sign In */}
      <Button
        fullWidth
        variant="outlined"
        startIcon={<GoogleIcon />}
        onClick={onGoogleSignIn}
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
            onClick={onSwitchToSignUp}
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
  )
}
