'use client'

import { Box, Button, Typography, Alert } from '@mui/material'

interface SignInSuccessProps {
  email: string
  onTryDifferentEmail: () => void
}

export default function SignInSuccess({ email, onTryDifferentEmail }: SignInSuccessProps) {
  return (
    <Box sx={{ textAlign: 'center', py: 3 }}>
      <Alert severity="success" sx={{ mb: 2 }}>
        Check your email for a sign-in link! This link will expire in 24 hours.
      </Alert>
      <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
        We&apos;ve sent a secure link to <strong>{email}</strong>
      </Typography>
      <Button
        variant="text"
        onClick={onTryDifferentEmail}
        sx={{ color: 'primary.main' }}
      >
        Try a different email
      </Button>
    </Box>
  )
}
